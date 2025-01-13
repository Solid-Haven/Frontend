import React, { useEffect, useState } from "react";
import "../../styles/myPage.css"; // CSS 파일 import
import { useUser } from "../../components/context/UserContext"; // UserContext 사용
import { useNavigate } from "react-router-dom";
import FamilyLoginModal from "../account/familyLoginModal"; // 로그인 모달 컴포넌트
import FamilyRegisterModal from "../account/familyRegisterModal"; // 회원가입 모달 컴포넌트

const MyPage = () => {
    const { userId } = useUser(); // Context에서 userId 가져오기
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [familyCode, setFamilyCode] = useState("");
    const [isFaceRegistered, setIsFaceRegistered] = useState(false); // 얼굴 등록 여부
    const [maskingStatus, setMaskingStatus] = useState({ face_masking: false, body_masking: false }); // 마스킹 여부
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [showFamilyLogin, setShowFamilyLogin] = useState(false); // 가족 로그인 모달 상태
    const [showFamilyRegister, setShowFamilyRegister] = useState(false); // 가족 회원가입 모달 상태

    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/account/user-info?user_id=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setErrorMessage(""); // 오류 메시지 초기화
                    setUserName(data.user_name || "[정보 없음]");
                    setEmail(data.email || "[정보 없음]");
                    setFamilyCode(data.family_code ? data.family_code : "등록된 가족이 없습니다");
                    setIsFaceRegistered(data.is_face_registered || false); // 얼굴 등록 여부
                } else {
                    setErrorMessage("표시할 수 없습니다");
                    resetUserInfo();
                }
            } catch (error) {
                setErrorMessage("표시할 수 없습니다");
                resetUserInfo();
            }
        };

        const fetchMaskingStatus = async () => {
            try {
                const response = await fetch(`/account/masking-status?user_id=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMaskingStatus({
                        face_masking: data.face_masking || false,
                        body_masking: data.body_masking || false,
                    });
                } else {
                    console.error("마스킹 상태를 가져오는 중 오류 발생:", response.status);
                }
            } catch (error) {
                console.error("마스킹 상태를 가져오는 중 오류 발생:", error);
            }
        };

        if (userId) {
            fetchUserInfo();
            fetchMaskingStatus();
        } else {
            setErrorMessage("표시할 수 없습니다");
            resetUserInfo();
        }
    }, [userId]);

    const resetUserInfo = () => {
        setUserName("");
        setEmail("");
        setFamilyCode("");
        setIsFaceRegistered(false);
        setMaskingStatus({ face_masking: false, body_masking: false });
    };

    return (
        <div className="my-page-container">
            <h1>마이 페이지</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="user-info">
                <p><strong>사용자 이름:</strong> {userName || "[정보 없음]"}</p>
                <p><strong>이메일:</strong> {email || "[정보 없음]"}</p>
                <div className="family-info">
                    <p><strong>가족 코드:</strong> {familyCode || "[정보 없음]"}</p>
                    <div className="family-action-buttons-inline">
                        <button className="button" onClick={() => setShowFamilyLogin(true)}>가족 로그인</button>
                        <button className="button" onClick={() => setShowFamilyRegister(true)}>가족 회원가입</button>
                    </div>
                </div>
                <p><strong>얼굴 등록 여부:</strong> {isFaceRegistered ? "등록 완료" : "등록되지 않음"}</p>
                <button
                    className="button"
                    onClick={() => navigate("/faceregister")} // 얼굴 재등록 페이지로 이동
                >
                    얼굴 재등록
                </button>
                <p><strong>마스킹 여부:</strong></p>
                <p>얼굴 마스킹: {maskingStatus.face_masking ? "적용" : "미적용"}</p>
                <p>신체 마스킹: {maskingStatus.body_masking ? "적용" : "미적용"}</p>
                <button
                    className="button"
                    onClick={() => navigate("/maskingselection")} // 마스킹 재선택 페이지로 이동
                >
                    마스킹 여부 재선택
                </button>
            </div>
            <p className="info-message">가족이 등록되지 않았다면 가족 회원가입을 진행해주세요.</p>

            {/* 가족 로그인 모달 */}
            {showFamilyLogin && (
                <FamilyLoginModal onClose={() => setShowFamilyLogin(false)} />
            )}

            {/* 가족 회원가입 모달 */}
            {showFamilyRegister && (
                <FamilyRegisterModal onClose={() => setShowFamilyRegister(false)} />
            )}
        </div>
    );
};

export default MyPage;
