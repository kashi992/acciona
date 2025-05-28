import { useEffect, useRef } from "react";

const UseWatchTime = (videoRef, videoId, shouldTrack = true) => {
  const watchStartRef = useRef(null);
  const watchedTimeRef = useRef(0);
  const hasTriggeredRef = useRef(false);

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime ?? 0;

    if (watchStartRef.current === null) {
      watchStartRef.current = currentTime;
      return;
    }

    const delta = currentTime - watchStartRef.current;

    if (delta > 0) {
      watchedTimeRef.current += delta;
      watchStartRef.current = currentTime;
    }
const video = videoRef.current;
    const watchTime = watchedTimeRef.current;

    if (video?.duration && !hasTriggeredRef.current) {
      const watchRatio = watchTime / video.duration;

      if (watchRatio >= 0.7) {
        hasTriggeredRef.current = true; // ✅ prevent re-trigger

        submitWatch(video.duration, watchTime);
      }
    }
  };

  // const handleSendWatchTime = async () => {
  //   const watchTime = watchedTimeRef.current;
  //   const video = videoRef.current;

  //   if (!watchTime || watchTime < 5) {
  //     console.warn("⏱ Skipping short watch time:", watchTime);
  //     return;
  //   }

  //   if (!video || !video.duration) {
  //     console.warn("❌ Video or duration not available.");
  //     return;
  //   }

  //   const duration = video.duration;

  //   try {
  //     const ipRes = await fetch("https://ipinfo.io/json?token=0451d8a1ae05e5");
  //     const ip = (await ipRes.json()).ip;

  //   await fetch("https://db30bn6w66.execute-api.us-east-1.amazonaws.com/prod/trackWatchTime", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         videoId,
  //         watchTime,
  //         videoDuration: duration,
  //         ip,
  //         timestamp: new Date().toISOString(),
  //       }),
  //     });
  //     // const result = await response.text();
  //     // console.log("✅ Watch time API response:", response.status, result);
  //   } catch (err) {
  //     console.error("Watch time submission error:", err);
  //   }
  // };

  const submitWatch = async (videoDuration, watchTime) => {
    try {
      const ipRes = await fetch("https://ipinfo.io/json?token=0451d8a1ae05e5");
      const ip = (await ipRes.json()).ip;

      await fetch("https://db30bn6w66.execute-api.us-east-1.amazonaws.com/prod/trackWatchTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          watchTime,
          videoDuration,
          ip,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("❌ Watch time submission failed", err);
    }
  };

  useEffect(() => {
    if (!shouldTrack) return;

    const timeoutId = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleTimeUpdate); // ✅ Final progress check
      window.addEventListener("beforeunload", handleTimeUpdate);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          handleTimeUpdate(); // Last check
        }
      });
    }, 300);

    return () => {
      const video = videoRef.current;
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleTimeUpdate);
      }
      window.removeEventListener("beforeunload", handleTimeUpdate);
      document.removeEventListener("visibilitychange", handleTimeUpdate);
    };
  }, [videoId, shouldTrack]);
};

export default UseWatchTime;
