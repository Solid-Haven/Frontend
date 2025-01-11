import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FamilyMain, UserLogin, FamilyRegister, UserRegister } from "./pages/account"; // account 폴더에서 한 번에 가져오기
import FaceRegister from "./pages/face/faceRegister"; // 얼굴 등록 페이지
import Dashboard from "./pages/main/dashboard"; // 메인 대시보드

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FamilyMain />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/familyregister" element={<FamilyRegister />} />
                <Route path="/userregister" element={<UserRegister />} />
                <Route path="/faceregister" element={<FaceRegister />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
