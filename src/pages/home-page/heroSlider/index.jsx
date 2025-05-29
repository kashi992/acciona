import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "./index.css"; // For custom styles
import { useNavigate, useLocation } from "react-router-dom";

import vision from "../../../assets/images/Vision.png";
import visionR from "../../../assets/images/Vision-r.png";
import safety from "../../../assets/images/Safety.png";  
import safetyR from "../../../assets/images/Safety-r.png";  
import methodology from "../../../assets/images/Methodology.png";
import methodologyR from "../../../assets/images/Methodology-r.png";
import community from "../../../assets/images/Community.png";
import communityR from "../../../assets/images/Community-r.png";
import sustainability from "../../../assets/images/Sustainability.png";
import sustainabilityR from "../../../assets/images/Sustainability-r.png";

const HeroSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);
  const slides = [
    {
      id: 6,
      image: methodology,
      imageR: methodologyR,
      title: "Methodology",
      path: "/construction-methodology",
    },
    {
      id: 1,
      image: vision,
      imageR: visionR,
      title: "The Vision",
      path: "/vision",
    },
    {
      id: 2,
      image: safety,
         imageR: safetyR,
      title: "Safety",
      path: "/safety",
    },
    {
      id: 7,
      image: community,
      imageR: communityR,
      title: "Community",
      path: "/community",
    },
    {
      id: 3,
      image: sustainability,
      imageR: sustainabilityR,
      title: "Sustainability",
      path: "/system-engineering",
    },
    {
      id: 4,
        image:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo5.png",
        imageR:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo5.png",
      title: "Sydney Metro Facility",
      path: "/sydney-metro-facility",
    },
    {
      id: 5,
      image:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo3.png",
      imageR:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo3.png",
      title: "Interface and Integration",
      path: "/interface-and-integration",
    },
    {
      id: 8,
      image:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo6.png",
      imageR:
        "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/heroLogo6.png",
      title: "Social Inclusion",
      path: "/social-inclusion",
    },
  ];

  const handleSlideClick = (slide) => {
    navigate(slide.path);
  };
  // ⬇️ Slide to the correct slide after mount
  useEffect(() => {
    const returnToSlide = location.state?.returnToSlide;
    if (returnToSlide !== undefined && swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(returnToSlide);
    }
  }, [location.state]);

  return (
    <section className="heroWrap">
      <div className="container">
        <h1> 2025 INTERACTIVE BID PORTAL </h1>
        <Swiper
          ref={swiperRef}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={4}
          slidesPerGroup={2}
          spaceBetween={80}
          loop={false}
          pagination={true}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="heroSwiper"
          breakpoints={{
            // when window width is <= 499px
            0: {
              slidesPerView: 1,
              spaceBetweenSlides: 30,
              centeredSlides: false,
              slidesPerGroup: 1,
            },
            575: {
              slidesPerView: 3,
              spaceBetween: 50,
              centeredSlides: false,
            },
            // when window width is <= 999px
            999: {
              slidesPerView: 3,
              spaceBetween: 60,
              centeredSlides: false,
            },
            // when window width is <= 999px
            1200: {
              spaceBetween: 80,
              slidesPerGroup: 3,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 80,
              slidesPerGroup: 3,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 80,
              slidesPerGroup: 3,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              // onClick={() => handleSlideClick(slide)} // Open thumbnails view
              onClick={() =>
                navigate(slide.path, { state: { fromSlideIndex: index } })
              }
            >
              <div className="sliderContent">
                <div className="slideImg">
                  <img className="slideImgN" src={slide.image} alt={`Slide ${slide.id}`} />
                  <img className="slideImgR" src={slide.imageR} alt={`Slide ${slide.id}`} />
                </div>
                <h2 className="sf">{slide.title}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;
