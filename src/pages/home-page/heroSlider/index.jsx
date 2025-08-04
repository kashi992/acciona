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
const HeroSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);
  const slides = [
    {
      id: 1,
         image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/theVision.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/theVision.png",
      title: "The Vision",
      path: "/vision",
    },
    {
      id: 2,
         image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/flyThrough.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/flyThrough.png",
      title: "Fly Through",
      path: "/fly-through",
    },
    {
      id: 3,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/constructionSequence.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/constructionSequence.png",
      title: "4D Construction Sequence",
      path: "/construction-sequence",
    },
    {
      id: 4,
    image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/socialProcurement.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/socialProcurement.png",
      title: "Social Procurement",
      path: "/social-procurement",
    },
    {
      id: 5,
    image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/community.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/community.png",
      title: "Community Engagement",
      path: "/community",
    },
    // {
    //   id: 6,
    //   image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon-black.png",
    //   imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon+(2).png",
    //   title: "Sustainability",
    //   path: "/sustainability",
    // },
    // {
    //   id: 7,
    //       image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon-black.png",
    //   imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon+(2).png",
    //   title: "The future",
    //   path: "/the-future",
    // },
    // {
    //   id: 7,
    //      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon-black.png",
    //   imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon+(2).png",
    //   title: "Interface and Integration",
    //   path: "/interface-and-integration",
    // },
    // {
    //   id: 8,
    //    image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon-black.png",
    //   imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/favicon+(2).png",
    //   title: "Social Inclusion",
    //   path: "/social-inclusion",
    // },
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
              slidesPerView: 5,
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
        <h1>Interactive Bid Portal</h1>
        <div className="line1 absolute top-0 right-[-70px]">
          <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_03.png" alt="" className="min-[1600px]:w-[478px] min-[1570px]:w-[400px] min-[575px]:w-[350px] w-[260px]" />
        </div>
        <div className="line2 absolute right-0 bottom-0">
          <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_04.png" alt="" className="min-[1570px]:w-[431px] min-[575px]:w-[300px] w-[135px]"/>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
