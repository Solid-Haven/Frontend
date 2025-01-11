import React, { useState } from "react";
import "../../styles/faceRegister.css";

const FaceRegister = () => {
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
    const [message, setMessage] = useState(""); // 결과 메시지

    // 파일 선택 핸들러
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // 사진 등록 요청
    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("파일을 선택해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/face/face-register-photo", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("얼굴 등록이 완료되었습니다!");
            } else {
                setMessage(data.message || "얼굴 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            setMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    // 실시간 등록 요청
    const handleRealtimeRegister = async () => {
        try {
            const response = await fetch("/face/face-register-realtime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: 2 }), // 사용자 ID 전송 (예시)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("실시간 얼굴 등록이 완료되었습니다!");
            } else {
                setMessage(data.message || "실시간 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            setMessage("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <div className="face-register-container">
            <h1>얼굴 등록</h1>

            {/* 사진 등록 */}
            <div className="register-section">
                <h2>사진으로 등록하기</h2>
                <div className="file-upload">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button onClick={handleFileUpload} className="button">
                        사진 업로드
                    </button>
                </div>
            </div>

            {/* 실시간 등록 */}
            <div className="register-section">
                <h2>실시간 등록</h2>
                <button onClick={handleRealtimeRegister} className="button">
                    실시간 얼굴 등록 시작
                </button>
            </div>

            {/* 결과 메시지 */}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default FaceRegister;
