import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleFirstClick, handleAllClicks } from "../../../utils/TrackFirstClick";
import UseWatchTime from "../../../utils/UseWatchTime";

const ConstructionMethodology = () => {
    const [viewState, setViewState] = useState("thumbnail"); // States: "thumbnail", "video"
    const [selectedVideo, setSelectedVideo] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const fromSlideIndex = location.state?.fromSlideIndex || 0;
    const [isPlaying, setIsPlaying] = useState(''); // Controls playback state
    const videoRef = useRef(null);
const hasTrackedRef = useRef(false);
    const videoId = selectedVideo === 1 ? "ConMethVideo1" : "ConMethVideo2";
        UseWatchTime(videoRef, selectedVideo === 1 ? "ConMethVideo1" : "ConMethVideo2", viewState === "video");
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
    }, [viewState, selectedVideo]);
    

    
    return (
        <>
            {viewState === "thumbnail" && (
                <div className="thumbnailsView h-full relative flex flex-col justify-center container">
                     <h2 className="thumbTitle">
                    Construction Methodology
                    </h2>
                    <div className="thumbnails grid relative xl:grid-cols-1 gap-8 mx-auto">
                        {/* Thumbnail 1*/}
                        <div
                            className={`thumbnail cursor-pointer`}
                            onClick={() => {
                                setSelectedVideo(1);
                                setViewState("video")
                            }}
                        >
                            <div className="relative mx-auto w-full bg-white rounded-[10px] min[1370px]:p-3 p-2 mb-2">
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg"
                                    alt="Thumbnail Methodology 1"
                                    className="w-full min-[1680px]:h-[450px] min-[1370px]:h-[370px] xl:h-[300px] lg:h-[400px] md:h-[300px] object-cover h-[200px] thumbnailImg __thumbnailImg"
                                    
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
                         {/* Thumbnail 2*/}
                         {/* <div
                            className={`thumbnail cursor-pointer`}
                            onClick={() => {
                                setSelectedVideo(2);
                                setViewState("video");
                            }}
                        >
                            <div className="relative mx-auto w-full bg-white rounded-[10px] min[1370px]:p-3 p-2 mb-2">
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg"
                                    alt="Thumbnail Methodology 2"
                                    className="w-full min-[1680px]:h-[450px] min-[1370px]:h-[370px] xl:h-[300px] lg:h-[400px] md:h-[300px] object-cover h-[200px] thumbnailImg __thumbnailImg"
                                    
                                />
                                <img
                                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/playBtn.png"
                                    alt="Play"
                                    className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none m-auto min-[1370px]:w-[110px] w-[80px]"
                                />
                            </div>
                            <p className="sf min-[1680px]:text-[30px] min-[1370px]:text-[24px] text-[18px] text-white text-center min-[1370px]:mt-5 mt-2 font-bold">
                            </p>
                        </div> */}
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

            {viewState === "video" && selectedVideo && (
              <div className="videoView h-full relative flex flex-col justify-center container">
              <div className="relative min-[1680px]:w-[65%] min-[1200px]:w-[55%] w-full mx-auto">
                  {/* Video Player */}
                  <video
                  ref={videoRef}
                      className="w-full h-full custom-video-player"
                      src={
                          selectedVideo === 1
                              ? "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/COFFS_AERIAL_01_scale_2x_amq-13+(1).mp4"
                              : "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/COFFS_AERIAL_01_scale_2x_amq-13+(1).mp4"
                      }
                      controls
                      poster={
                        selectedVideo === 1
                            ? "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg"
                            : "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg"
                    }
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
        Construction Methodology
              </h2>
              <p className="text-center text-white min-[1680px]:text-[20px] font-semibold text-[18px]">
              
              </p>
          </div>
            )}
        </>
    );
};

export default ConstructionMethodology;
