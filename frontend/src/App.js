import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext"; // UserContext import
import { UserLogin, UserRegister, AccountMain } from "./pages"; // account 폴더에서 한 번에 가져오기
import { FaceRegister, MaskingSelection } from "./pages"
import { Dashboard, VideoList, MyPage } from "./pages"

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* 로그인, 회원가입 관련 페이지지 */}
                    <Route path="/" element={<AccountMain />} />
                    <Route path="/userlogin" element={<UserLogin />} />
                    <Route path="/userregister" element={<UserRegister />} />

                    {/* 얼굴 등록 및 마스킹 설정 페이지 */}
                    <Route path="/faceregister" element={<FaceRegister />} />
                    <Route path="/maskingselection" element={<MaskingSelection />} />

                    {/* 대시보드 */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/videolist" element={<VideoList />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </Router>
        </UserProvider>
        
    );
};

export default App;
