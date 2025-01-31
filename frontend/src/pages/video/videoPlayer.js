import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";
import "../../styles/videoPlayer.css"; // 스타일 추가

const VideoPlayer = () => {
    const { videoId } = useParams(); // URL에서 videoId 가져오기
    const { token } = useUser();
    const [videoData, setVideoData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         if (!token) {
    //             setErrorMessage("로그인이 필요합니다.");
    //             return;
    //         }

    //         try {
    //             const response = await fetch(`/videos/${videoId}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             });

    //             const data = await response.json();

    //             if (response.ok) {
    //                 setVideoData(data.data);
    //             } else {
    //                 setErrorMessage(data.message || "영상을 불러오지 못했습니다.");
    //             }
    //         } catch (error) {
    //             console.error("API 호출 오류:", error);
    //             setErrorMessage("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    //         }
    //     };

    //     fetchVideo();
    // }, [videoId, token]);

    // ✅ 백엔드 연결 전 테스트할 경우 아래 주석 해제
    useEffect(() => {
        const mockVideos = [
            {
                video_id: "1",
                title: "2025-01-19 10:00 영상",
                masked_video_path: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                uploaded_at: "2025-01-19T10:00:00Z",
            },
            {
                video_id: "2",
                title: "2025-01-19 10:05 영상",
                masked_video_path: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
                uploaded_at: "2025-01-19T10:05:00Z",
            },
            {
                video_id: "3",
                title: "2025-01-19 14:30 영상",
                masked_video_path: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
                uploaded_at: "2025-01-19T14:30:00Z",
            },
            {
                video_id: "4",
                title: "2025-01-20 14:35 영상",
                masked_video_path: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
                uploaded_at: "2025-01-20T14:35:00Z",
            },
            {
                video_id: "5",
                title: "2025-01-20 14:40 영상",
                masked_video_path: "https://samplelib.com/lib/preview/mp4/sample-25s.mp4",
                uploaded_at: "2025-01-20T14:40:00Z",
            },
        ];

        // videoId에 해당하는 Mock 데이터 가져오기
        const foundVideo = mockVideos.find(video => video.video_id === videoId);
        
        if (foundVideo) {
            setVideoData(foundVideo);
        } else {
            setErrorMessage("해당 영상을 찾을 수 없습니다.");
        }
    }, [videoId]);

    return (
        <div className="video-player-container">
            <h1>📺 영상 재생</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {videoData ? (
                <div className="video-content">
                    <h2>{videoData.title}</h2>
                    <video controls>
                        <source src={videoData.masked_video_path} type="video/mp4" />
                        해당 브라우저에서는 동영상을 재생할 수 없습니다.
                    </video>
                    <p>📅 업로드 시간: {new Date(videoData.uploaded_at).toLocaleString()}</p>
                </div>
            ) : (
                <p>영상을 불러오는 중...</p>
            )}
        </div>
    );
};

export default VideoPlayer;
