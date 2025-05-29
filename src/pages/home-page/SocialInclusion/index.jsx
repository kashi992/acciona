import React, { useState, useRef, useEffect } from "react";
import { handleFirstClick, handleAllClicks } from "../../../utils/TrackFirstClick";
import UseWatchTime from "../../../utils/UseWatchTime";
import { useNavigate, useLocation } from "react-router-dom";

const SocialInclusion = () => {
    const [viewState, setViewState] = useState("thumbnail"); // States: "thumbnail", "video"
    const location = useLocation();
    const navigate = useNavigate();
    const fromSlideIndex = location.state?.fromSlideIndex || 0;
    const [isPlaying, setIsPlaying] = useState(''); // Controls playback state
    const videoRef = useRef(null);
const hasTrackedRef = useRef(false);
    const videoId = "SocialVideo";
      UseWatchTime(videoRef, "SocialVideo", viewState === "video");
    // Play video when switching to "video" view
    useEffect(() => {
        if (viewState === "video" && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);

            // Add event listeners for play and pause detection
              if (!hasTrackedRef.current) {
            handleFirstClick(videoId);
            handleAllClicks(videoId);
            hasTrackedRef.current = true;
        }
            // Add event listeners for play and pause detection
            videoRef.current.addEventListener("play", () => setIsPlaying(true));
            videoRef.current.addEventListener("pause", () => setIsPlaying(false));
        }
    }, [viewState]);
      
      

    return (
        <>
            {viewState === "thumbnail" && (
                <div className="thumbnailsView h-full relative flex flex-col justify-center container">
                     <h2 className="thumbTitle">
                    Social Inclusion
                    </h2>
                    <div className="thumbnails grid relative grid-cols-1 items-center mx-auto">
                        {/* Thumbnail */}
                        <div
                            className={`thumbnail cursor-pointer`}
                            onClick={() => setViewState("video")}
                        >
                            <div className="relative mx-auto w-full bg-white rounded-[10px] min[1370px]:p-3 p-2 mb-2">
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/socialInclusionThumb.jpg"
                                    alt="Thumbnail Social Inclusion"
                                    className="w-full thumbnailImg object-cover"
                                />
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/playBtn.png"
                                    alt="Play"
                                    className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none m-auto min-[1370px]:w-[110px] w-[80px]"
                                />
                            </div>
                            <p className="sf min-[1680px]:text-[30px] min-[1370px]:text-[24px] text-[18px] text-white text-center min-[1370px]:mt-5 mt-2 font-bold">
                            </p>
                        </div>
                         {/* Back Button */}
                        <button
                            className="backButton cursor-pointer"
                            onClick={() => navigate("/home", { state: { returnToSlide: fromSlideIndex } })}
                        >
                         Main Menu 
                        </button>
                    </div>
                   
                </div>
            )}

            {viewState === "video" && (
                <div className="videoView h-full relative flex flex-col justify-center container">
                    <div className="relative min-[1680px]:w-[65%] min-[1200px]:w-[55%] w-full mx-auto">
                        {/* Video Player */}
                        <video
                        ref={videoRef}
                            className="w-full h-full custom-video-player"
                            src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/%23INCLUSION_MASTER_250325.mp4.mp4"
                            controls
                            poster="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/socialInclusionThumb.jpg"
                        />
                        {!isPlaying && (
                            <div className={`absolute top-0 right-0 left-0 bottom-0 h-ull w-full flex flex-col`} onClick={() => videoRef.current.play()}>
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/playBtn.png"
                                    alt=""
                                    className="min-[1370px]:w-[110px] md:w-[80px] w-[55px] m-auto"
                                />
                            </div>
                        )}
                        {/* Back Button */}
                        <button
                            className="absolute right-0 min-[1200px]:top-0 top-[-70px] z-10 min-[1200px]:translate-x-[150%]"
                            onClick={() => setViewState("thumbnail")}
                        >
                            <img
                                src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/crossIcon.png"
                                alt="Back"
                                className="min-[1680px]:w-[80px] min-[1680px]:h-[80px] min-[1370px]:h-[50px] min-[1370px]:w-[50px] w-[40px] h-[40px] rounded-full cursor-pointer"
                            />
                        </button>
                    </div>

                    {/* Video Title and Description */}
                    <h2 className="VideoTitle">
                    Social Inclusion
                    </h2>
                    <p className="text-center text-white min-[1680px]:text-[20px] font-semibold text-[18px]">
                    </p>
                </div>
            )}
        </>
    );
};

export default SocialInclusion;
