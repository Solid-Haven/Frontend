import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // 페이지 새로고침 시 localStorage에서 JWT 토큰 & userId 불러오기
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
            fetchUserData(storedToken); // 자동으로 유저 정보 가져오기
        }
    }, []);

    // 백엔드에서 유저 정보 가져오는 함수
    const fetchUserData = async (token) => {
        try {
            const response = await fetch("/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // JWT 토큰 추가
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data); // 🔹 유저 정보 Context에 저장
            } else {
                console.error("토큰이 만료되었거나 유효하지 않음, 로그아웃 필요");
                logout();
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            logout();
        }
    };

    // 로그인 시 토큰 및 유저 정보 저장
    const login = (newToken, newUserId) => {
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("userId", newUserId);
        setToken(newToken);
        setUserId(newUserId);
        fetchUserData(newToken); // 로그인 후 자동으로 유저 정보 가져오기
    };

    // 로그아웃 시 모든 정보 삭제
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setToken(null);
        setUserId(null);
        setUserInfo(null);
    };

    return (
        <UserContext.Provider value={{ userId, token, userInfo, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
