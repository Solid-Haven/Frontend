import React, { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const UserContext = createContext();

// Context Provider 생성
export const UserProvider = ({ children }) => {
    // user_id를 상태로 관리 (초기값: 로컬 스토리지에서 가져오기)
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("user_id") || null;
    });

    // user_id가 변경되면 로컬 스토리지에 저장
    useEffect(() => {
        if (userId) {
            localStorage.setItem("user_id", userId); // 로컬 스토리지에 저장
        } else {
            localStorage.removeItem("user_id"); // 로그아웃 시 삭제
        }
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 쉽게 사용하도록 커스텀 Hook 제공
export const useUser = () => useContext(UserContext);
