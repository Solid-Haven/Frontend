import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation으로 전달받은 state 읽기
import "../../styles/login.css";

const UserLogin = () => {
    const [username, setUsername] = useState(""); // 사용자 이름 입력 값
    const [email, setEmail] = useState(""); // 이메일 입력 값
    const [password, setPassword] = useState(""); // 비밀번호 입력 값
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    const navigate = useNavigate(); // 페이지 이동 훅
    const location = useLocation(); // 전달받은 state 읽기

    const familyCode = location.state?.familyCode || ""; // familyMain에서 전달받은 familyCode

    const handleLogin = async () => {
        try {
            const response = await fetch("/account/user-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    family_code: familyCode,
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                navigate("/dashboard");
            } else {
                setErrorMessage(data.message || "로그인에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            setErrorMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <div className="login-container">
            <h1>사용자 로그인</h1>
            <div className="form-group">
                <label htmlFor="username">사용자 이름</label>
                <input
                    type="text"
                    id="username"
                    placeholder="사용자 이름을 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
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
                    className="input"
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
                    className="input"
                />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={handleLogin} className="button">
                로그인
            </button>
        </div>
    );
};

export default UserLogin;
