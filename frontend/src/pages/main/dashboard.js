import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용
import "../../styles/dashboard.css"; // 스타일 적용 (필요 시)
import { useUser } from "../../components/context/UserContext"; // UserContext 사용

const Dashboard = () => {
    const { userId, setUserId } = useUser(); // Context에서 user_id 가져오기
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserId(null); // Context 초기화
        navigate("/"); // 메인 페이지로 이동
    };


    return (
        <div className="dashboard-container">
            <h1>대시보드</h1>
            <div className="button-group">
                <button onClick={() => navigate("/videolist")} className="button">
                    영상 리스트
                </button>
                <button onClick={() => navigate("/mypage")} className="button">
                    마이 페이지
                </button>
                <button onClick={handleLogout} className="button logout">
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
