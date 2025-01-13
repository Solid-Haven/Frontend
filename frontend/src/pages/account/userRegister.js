import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
    const [username, setUsername] = useState(""); // 사용자 이름
    const [email, setEmail] = useState(""); // 사용자 이메일
    const [password, setPassword] = useState(""); // 사용자 비밀번호
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
    const navigate = useNavigate(); // 페이지 이동 훅

    const handleSubmit = async () => {
        try {
            const response = await fetch("/account/user-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }), // JSON 형식으로 데이터 전송
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("회원가입이 완료되었습니다!");
                navigate("/userlogin");
            } else {
                setErrorMessage(data.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            setErrorMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <div className="register-container">
            <h1>사용자 회원가입</h1>

            <div className="form-group">
                <label htmlFor="username">사용자 이름</label>
                <input
                    type="text"
                    id="username"
                    placeholder="사용자 이름을 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={handleSubmit} className="button">
                회원가입
            </button>
        </div>
    );
};

export default UserRegister;
