import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext"; // Context 사용
import "../../styles/maskingSelection.css";

const MaskingSelection = () => {
    const [faceMasking, setFaceMasking] = useState(false);  // 얼굴 마스킹 여부
    const [bodyMasking, setBodyMasking] = useState(false);  // 신체 마스킹 여부
    const { userId } = useUser(); // Context에서 userId 가져오기
    const navigate = useNavigate();


    const handleSaveSelection = async () => {
        try {
            const response = await fetch("/face/masking-selection", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    user_id: userId,
                    face_masking: faceMasking,
                    body_masking: bodyMasking,
                }),
            });

            const data = await response.json();

            if(response.ok && data.success) {
                navigate("/dashboard");
            } else {
                alert(data.message || "마스킹 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("API 호출 오류: ", error);
            alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.")
        }
    };

    return (
        <div className="masking-selection-container">
            <h1>마스킹 여부 설정</h1>
            <div className="selection-group">
                <h2>얼굴 마스킹</h2>
                <div className="button-group">
                    <button
                        className={faceMasking ? "selected" : ""}
                        onClick={() => setFaceMasking(true)}
                    >
                        마스킹 적용
                    </button>
                    <button
                        className={!faceMasking ? "selected" : ""}
                        onClick={() => setFaceMasking(false)}
                    >
                        마스킹 미적용
                    </button>
                </div>
            </div>

            <div className="selection-group">
                <h2>신체 마스킹</h2>
                <div className="button-group">
                    <button
                        className={bodyMasking ? "selected" : ""}
                        onClick={() => setBodyMasking(true)}
                    >
                        마스킹 적용
                    </button>
                    <button
                        className={!bodyMasking ? "selected" : ""}
                        onClick={() => setBodyMasking(false)}
                    >
                        마스킹 미적용
                    </button>
                </div>
            </div>

            <button onClick={handleSaveSelection}>저장</button>
        </div>
    );
};

export default MaskingSelection;