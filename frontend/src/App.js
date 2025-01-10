import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FamilyMain from "./pages/account/familyMain"; // 위 Register 컴포넌트 경로
import UserLogin from "./pages/account/userLogin"; // login.js 경로
import FamilyRegister from "./pages/account/familyRegister";    // familyRegister 경로

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FamilyMain />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/familyregister" element={<FamilyRegister />} />
            </Routes>
        </Router>
    );
};

export default App;
