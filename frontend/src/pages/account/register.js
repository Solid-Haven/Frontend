import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 react-router-dom
import "../../styles/register.css"; // CSS 파일 경로

const Register = () => {
    const [showFamilyCodeModal, setShowFamilyCodeModal] = useState(false); // 모달 표시 상태
    const [familyCode, setFamilyCode] = useState(""); // 가족 코드 입력 값
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    // 가족 코드 입력 모달 열기
    const handleOpenFamilyCodeModal = () => {
        setShowFamilyCodeModal(true); // 모달 열기
        setErrorMessage(""); // 기존 오류 메시지 초기화
    };

    // 가족 회원가입 버튼 클릭 시 동작
    const handleFamilyRegister = () => {
        console.log("가족 회원가입 페이지로 이동 (추후 구현)");
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setShowFamilyCodeModal(false); // 모달 닫기
        setFamilyCode(""); // 입력 값 초기화
        setErrorMessage(""); // 오류 메시지 초기화
    };

    // 가족 코드 유효성 검사 함수
    const validateFamilyCode = async (code) => {

        const validCodes = ["12345", "67890"]; // 예시 유효한 가족 코드
        return validCodes.includes(code);
    };

    // 가족 코드 제출 처리
    const handleSubmitFamilyCode = async () => {
        console.log("입력된 가족 코드:", familyCode);

        const isValid = await validateFamilyCode(familyCode); // 유효성 검사 호출
        if (isValid) {
            // 유효하면 login.js로 이동
            navigate("/login");
        } else {
            // 유효하지 않으면 오류 메시지 표시
            setErrorMessage("유효하지 않은 가족 코드입니다. 다시 시도해주세요.");
        }

        /* 백이랑 연결시
        try {
            const response = await fetch("/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ family_code: familyCode }) // JSON 형식으로 가족 코드 전송
            });

            const data = await response.json(); // 응답 JSON 파싱

            if (response.ok && data.success) {
                // 성공 시 로그인 페이지로 이동
                navigate(data.redirect_url || "/login");
            } else {
                // 실패 시 오류 메시지 표시
                setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다.");
            }
        } catch (error) {
            // 네트워크 오류 등 예외 처리
            console.error("API 호출 오류:", error);
            setErrorMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
        */
    };

    return (
        <div className="register-container">
            <h1>Solid Haven</h1>
            <div className="button-group">
                <button onClick={handleOpenFamilyCodeModal} className="button">
                    가족 로그인하기
                </button>
                <button onClick={handleFamilyRegister} className="button">
                    가족 회원가입하기
                </button>
            </div>

            {/* 가족 코드 입력 모달 */}
            {showFamilyCodeModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>가족 코드 입력</h2>
                        <input
                            type="text"
                            placeholder="가족 코드를 입력하세요"
                            value={familyCode}
                            onChange={(e) => setFamilyCode(e.target.value)}
                            className="input"
                        />
                        {/* 오류 메시지 표시 */}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <div className="modal-buttons">
                            <button onClick={handleSubmitFamilyCode} className="button">
                                제출
                            </button>
                            <button onClick={handleCloseModal} className="button">
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
