import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FamilyRegister = () => {
    const [email, setEmail] = useState("");     // 가족 대표 이메일
    const [familyName, setFamilyName] = useState("");   // 가족 이름
    const [password, setPassword] = useState("");   // 패스워드
    const [errorMessage, setErrorMessage] = useState("");   // 오류 메시지
    const [familyCode, setFamilyCode] = useState("");   // 생성된 가족 코드
    const navigate = useNavigate();  // 페이지 이동 훅

    const handleSubmit = async () => {
        // 백엔드와 연결시 사용
        try {
            const response = await fetch("/account/family-register", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    email: email,
                    family_name: familyName,
                    password: password
                })  // JSON 형식으로 데이터 전송
            });

            const data = await response.json();

            if(response.ok && data.success) {
                alert("가족 회원가입이 완료되었습니다!");
                setFamilyCode(data.family_code); // 가족 코드 저장
            } else {
                setErrorMessage(data.message || "회원가입에 실패했습니다. 다시 시도해주세요.")
            }
        } catch (error) {
            console.error("API 호출 오류: ", error);
            setErrorMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <div className="register-container">
            <h1>가족 회원가입</h1>
            {!familyCode ? (
                <>
                    <div className="form-group">
                        <label>가족 대표 이메일</label>
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>가족 이름</label>
                        <input
                            type="text"
                            placeholder="가족 이름을 입력하세요"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>패스워드</label>
                        <input
                            type="password"
                            placeholder="패스워드를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleSubmit} className="button">
                        회원가입
                    </button>
                </>
            ) : (
                <div>
                    <h2>가족 회원가입이 완료되었습니다!</h2>
                    <p>가족 코드: <strong>{familyCode}</strong></p>
                    <button onClick={() => navigate("/")} className="button">
                        메인으로 이동
                    </button>
                </div>
            )}
        </div>
    );
};

export default FamilyRegister;