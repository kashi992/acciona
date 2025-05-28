export const handleFirstClick = async (videoId) => {
  if (!sessionStorage.getItem("firstClickSent")) {
    try {
      const ipRes = await fetch("https://ipinfo.io/json?token=0451d8a1ae05e5");
      const ipData = await ipRes.json();

      await fetch("https://ax3oqjtahf.execute-api.us-east-1.amazonaws.com/prod/track-first-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          ip: ipData.ip,
          timestamp: new Date().toISOString(),
        }),
      });

      sessionStorage.setItem("firstClickSent", "true");
    } catch (error) {
      console.error("Error tracking first click:", error);
    }
  }
};

export const handleAllClicks = async (videoId) => {
  try {
    const ipRes = await fetch("https://ipinfo.io/json?token=0451d8a1ae05e5");
    const ipData = await ipRes.json();

    await fetch("https://ax3oqjtahf.execute-api.us-east-1.amazonaws.com/prod/allClicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId,
        ip: ipData.ip,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Error tracking all clicks:", error);
  }
};
