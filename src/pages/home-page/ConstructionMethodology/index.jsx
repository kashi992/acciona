import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleFirstClick, handleAllClicks } from "../../../utils/TrackFirstClick";
import UseWatchTime from "../../../utils/UseWatchTime";

function ConstructionMethodology() {
  const [viewState, setViewState] = useState("thumbnail"); // "thumbnail" | "video"
  const [selectedIndex, setSelectedIndex] = useState(null); // 0..3
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fromSlideIndex = location.state?.fromSlideIndex || 0;

  // Track which IDs we've already sent first-click/all-clicks for (per session)
  const trackedIdsRef = useRef(new Set());

  // Central config for thumbnails/videos (easy to extend)
  const videos = useMemo(
    () => [
      {
        id: "ConMethVideo1",
        src: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/Hoteo_Bridge_Timeline.mp4",
        poster:
          "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/Hoteo_Bridge_Timeline_thumb.jpg",
        thumb:
          "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/Hoteo_Bridge_Timeline_thumb.jpg",
        alt: "Thumbnail Methodology 1",
        thumbTitle: "Hoteo Bridge",
      },
      // {
      //   id: "ConMethVideo2",
      //   src: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/COFFS_AERIAL_01_scale_2x_amq-13+(1).mp4",
      //   poster:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   thumb:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   alt: "Thumbnail Methodology 2",
      //         thumbTitle: "Bridge 1",
      // },
      // {
      //   id: "ConMethVideo3",
      //   // TODO: replace with your real file
      //   src: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/COFFS_AERIAL_01_scale_2x_amq-13+(1).mp4",
      //   poster:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   thumb:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   alt: "Thumbnail Methodology 3",
      //   thumbTitle: "Bridge 2",
      // },
      // {
      //   id: "ConMethVideo4",
      //   // TODO: replace with your real file
      //   src: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/COFFS_AERIAL_01_scale_2x_amq-13+(1).mp4",
      //   poster:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   thumb:
      //     "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/video-capture-t0002.47seg-8318_11zon.jpg",
      //   alt: "Thumbnail Methodology 4",
      //   thumbTitle: "Bridge 3",
      // },
    ],
    []
  );

  const currentVideo = selectedIndex != null ? videos[selectedIndex] : null;

  // Hook for watch-time tracking – activates only when video view is active
  UseWatchTime(videoRef, currentVideo?.id || "", viewState === "video");

  // Auto-play and attach play/pause listeners when entering video view
  useEffect(() => {
    if (viewState !== "video" || !videoRef.current || !currentVideo) return;

    const vid = videoRef.current;

    // kick off playback
    vid.play().catch(() => {
      // autoplay might be blocked; overlay click can handle play
    });
    setIsPlaying(!vid.paused);

    // one-time click tracking per video id per session
    if (!trackedIdsRef.current.has(currentVideo.id)) {
      handleFirstClick(currentVideo.id);
      handleAllClicks(currentVideo.id);
      trackedIdsRef.current.add(currentVideo.id);
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    vid.addEventListener("play", onPlay);
    vid.addEventListener("pause", onPause);

    return () => {
      vid.removeEventListener("play", onPlay);
      vid.removeEventListener("pause", onPause);
    };
  }, [viewState, currentVideo]);

  // Handlers
  function openVideoAt(index) {
    setSelectedIndex(index);
    setViewState("video");
  }

  function closeVideo() {
    // pause if open
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setViewState("thumbnail");
  }

  return (
    <div className="heroWrap">
      <div className="line1 absolute top-0 right-[-70px]">
        <img
          src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_03.png"
          alt=""
          className="min-[1600px]:w-[478px] min-[1570px]:w-[400px] min-[575px]:w-[350px] w-[260px]"
        />
      </div>
      <div className="line2 absolute right-0 bottom-0">
        <img
          src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_04.png"
          alt=""
          className="min-[1570px]:w-[431px] min-[575px]:w-[300px] w-[135px]"
        />
      </div>

      {viewState === "thumbnail" && (
        <div className="thumbnailsView h-full relative flex flex-col justify-center container">
          <h2 className="thumbTitle min-[1570px]:pb-4">Construction Methodology</h2>

          {/* 2x2 grid of thumbnails */}
          <div
            className="grid relative grid-cols-1 md:gap-4 gap-2 mx-auto min-[1690px]:max-w-[900px] w-full min-[1570px]:max-w-[800px] min-[1370px]:max-w-[600px] max-w-[500px]"
          >
            {videos.map((v, i) => (
              <div
                key={v.id}
                className="thumbnail cursor-pointer"
                onClick={() => openVideoAt(i)}
              >
                <div className="relative mx-auto w-full">
                  <img
                    src={v.thumb}
                    alt={v.alt}
                    className="w-full object-cover md:border-4 border-2 border-[#074D44] aspect-video"
                  />
                  <img
                    src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/playBtn.png"
                    alt="Play"
                    className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none m-auto md:w-[60px] w-[30px]"
                  />
                </div>
                <p className="min-[1681px]:text-[24px] min-[1370px]:text-[20px] text-[16px] text-[#074d44] text-center min-[1370px]:mt-3 mt-2 font-bold">
              {v.thumbTitle}
                </p>
              </div>
            ))}

            {/* Back to Main */}
            <button
              className="backButton cursor-pointer min-[1570px]:mt-6 mt-2"
              style={{gridColumn:"1/3"}}
              onClick={() =>
                navigate("/home", { state: { returnToSlide: fromSlideIndex } })
              }
            >
              Main Menu
            </button>
          </div>
        </div>
      )}

      {viewState === "video" && currentVideo && (
        <div className="videoView h-full relative flex flex-col justify-center container">
          <div className="relative min-[1680px]:w-[65%] min-[1200px]:w-[55%] w-full mx-auto">
            <video
              ref={videoRef}
              className="w-full h-full custom-video-player"
              src={currentVideo.src}
              controls
              poster={currentVideo.poster}
            />
            {!isPlaying && (
              <div
                className="absolute top-0 right-0 left-0 bottom-0 h-full w-full flex flex-col"
                onClick={() => videoRef.current && videoRef.current.play()}
              >
                <img
                  src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/playBtn.png"
                  alt=""
                  className="min-[1370px]:w-[110px] md:w-[80px] w-[55px] m-auto"
                />
              </div>
            )}

            {/* Close video */}
            <button
              className="absolute right-0 min-[1200px]:top-0 top-[-70px] z-10 min-[1200px]:translate-x-[150%]"
              onClick={closeVideo}
            >
              <img
                src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/crossIcon.png"
                alt="Back"
                className="min-[1680px]:w-[80px] min-[1680px]:h-[80px] min-[1370px]:h-[50px] min-[1370px]:w-[50px] w-[40px] h-[40px] rounded-full cursor-pointer"
              />
            </button>
          </div>

          <h2 className="VideoTitle">Construction Methodology</h2>
          <p className="text-center text-white min-[1680px]:text-[20px] font-semibold text-[18px]">
            {/* Optional description */}
          </p>
        </div>
      )}
    </div>
  );
}

export default ConstructionMethodology;
