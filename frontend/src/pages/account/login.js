import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용
import "../../styles/login.css"; // CSS 파일 경로

const Login = () => {
    const [email, setEmail] = useState(""); // 이메일 입력 상태
    const [password, setPassword] = useState(""); // 비밀번호 입력 상태
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    const navigate = useNavigate(); // 페이지 이동 훅

    // 이메일 및 비밀번호 검증 함수
    const validateLogin = async (email, password) => {
        // 예시: 유효한 사용자 정보
        const validUsers = [
            { email: "test1@example.com", password: "password1" },
            { email: "test2@example.com", password: "password2" },
        ];

        // 입력값이 유효한지 확인
        return validUsers.some(
            (user) => user.email === email && user.password === password
        );
    };

    // 로그인 버튼 클릭 시 호출
    const handleLogin = async () => {
        setErrorMessage(""); // 오류 메시지 초기화

        // 유효성 검사 호출
        const isValid = await validateLogin(email, password);
        if (isValid) {
            // 로그인 성공 시 메인 페이지(또는 다른 페이지)로 이동
            navigate("/dashboard");
        } else {
            // 로그인 실패 시 오류 메시지 표시
            setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
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
            {/* 오류 메시지 */}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="button-group">
                <button onClick={handleLogin} className="button">
                    로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
