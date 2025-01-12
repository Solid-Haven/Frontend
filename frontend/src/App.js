import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FamilyMain, UserLogin, FamilyRegister, UserRegister } from "./pages/account"; // account 폴더에서 한 번에 가져오기
import { FaceRegister, MaskingSelection } from "./pages/face"
import Dashboard from "./pages/main/dashboard"; // 메인 대시보드

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인, 회원가입 관련 페이지지 */}
                <Route path="/" element={<FamilyMain />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/familyregister" element={<FamilyRegister />} />
                <Route path="/userregister" element={<UserRegister />} />

                {/* 얼굴 등록 및 마스킹 설정 페이지 */}
                <Route path="/faceregister" element={<FaceRegister />} />
                <Route path="/maskingselection" element={<MaskingSelection />} />

                {/* 대시보드 */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
