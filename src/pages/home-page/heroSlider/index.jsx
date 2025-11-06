import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "./index.css"; // For custom styles
import { useNavigate, useLocation } from "react-router-dom";
import swiperPrev from "../../../assets/images/leftChev.svg";
import swiperNext from "../../../assets/images/rightChev.svg";
import Modal from './Modal';
const HeroSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);
   const prevRef  = useRef(null);
  const nextRef  = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const slides = [
    {
      id: 1,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/theVision.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/theVision.png",
      title: "The Vision",
        path: "/the-vision",
 disabled: true,
    },
    {
      id: 2,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/flyThrough.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/flyThrough.png",
      title: "Fly Through",
      path: "/fly-through",
      disabled: false,
    },
    {
      id: 3,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/constructionSequence.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/constructionSequence.png",
      title: "4D Construction Sequence",
      path: "/construction-sequence",
      disabled: false,
    },
    {
      id: 4,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/socialProcurement.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/socialProcurement.png",
      title: "Social Procurement",
      path: "/social-procurement",
      disabled: true,
    },
    {
      id: 5,
      image: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/community.png",
      imageR: "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/community.png",
      title: "Community Engagement",
      path: "/community",
      disabled: true,
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

   const handleSlideClick = (slide, index) => {
    if (slide.disabled) {
      // Show modal for disabled slides
      setIsModalOpen(true);
    } else {
      // Navigate normally for enabled slides
      navigate(slide.path, { state: { fromSlideIndex: index } });
    }
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
        <div className="swiperContainer">
          {/* <button ref={prevRef} className="swiperPrev"><img src={swiperPrev} alt="" /></button>
          <button ref={nextRef} className="swiperNext"><img src={swiperNext} alt="" /></button> */}
          <Swiper
            ref={swiperRef}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={80}
            loop={false}
            pagination={true}
           navigation={{
              // these get overwritten by onBeforeInit
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
               onBeforeInit={(swiper) => {
              // swap out the default selectors for your refs
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="heroSwiper"
            breakpoints={{
              // when window width is <= 499px
              0: {
                slidesPerView: 1,
                spaceBetween: 30,
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
          slidesPerGroup: 1,
              },
              1680: {
                slidesPerView: 4,
                spaceBetween: 80,
             slidesPerGroup: 1,
              },
              1920: {
                slidesPerView: 4,
                spaceBetween: 80,
              slidesPerGroup: 1,
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={slide.id}
           onClick={() => handleSlideClick(slide, index)}
                // onClick={() =>
                //   navigate(slide.path, { state: { fromSlideIndex: index } })
                // }
              >
                <div className="sliderContent">
                  <div className={`slideImg ${slide.disabled ? "greySlide" : ""} ${slide.id === 5 ? "communityIcon" : ""}`}>
                    <img className="slideImgN" src={slide.image} alt={`Slide ${slide.id}`} />
                    <img className="slideImgR" src={slide.imageR} alt={`Slide ${slide.id}`} />
                  </div>
                  <h2 className="sf">{slide.title}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* <h1>Interactive Bid Portal</h1> */}
        <div className="line1 absolute top-0 right-[-70px]">
          <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_03.png" alt="" className="min-[1600px]:w-[478px] min-[1570px]:w-[400px] min-[575px]:w-[350px] w-[260px]" />
        </div>
        <div className="line2 absolute right-0 bottom-0">
          <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/line_04.png" alt="" className="min-[1570px]:w-[431px] min-[575px]:w-[300px] w-[135px]" />
        </div>

        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Content Not Available"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#074d44] mb-4">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">
            This video isn't available until the 28th November
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-[#074d44] text-white rounded hover:bg-black transition-colors"
          >
            OK
          </button>
        </div>
      </Modal>
      </div>
    </section>
  );
};

export default HeroSlider;
