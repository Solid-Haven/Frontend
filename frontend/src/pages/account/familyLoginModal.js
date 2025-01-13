import React, { useState } from "react";
import "../../styles/modal.css"; // CSS 파일 추가

const FamilyLoginModal = ({ onClose }) => {
    const [familyCode, setFamilyCode] = useState("");
    const [familyPassword, setFamilyPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("/account/family-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    family_code: familyCode,
                    family_password: familyPassword,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("가족 인증 성공!");
            } else {
                setMessage(data.message || "가족 인증 실패!");
            }
        } catch (error) {
            console.error("가족 로그인 오류:", error);
            setMessage("서버와 연결할 수 없습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h2>가족 로그인</h2>
                <input
                    type="text"
                    placeholder="가족 코드를 입력하세요"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="가족 비밀번호를 입력하세요"
                    value={familyPassword}
                    onChange={(e) => setFamilyPassword(e.target.value)}
                />
                {message && <p className="modal-message">{message}</p>}
                <div className="modal-buttons">
                    <button onClick={handleLogin} className="submit-button">로그인</button>
                    <button onClick={onClose} className="cancel-button">닫기</button>
                </div>
            </div>
        </div>
    );
};

export default FamilyLoginModal;
