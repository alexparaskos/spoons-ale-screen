import React, { useRef } from 'react';
import './HotelSlider.css';
interface ContainerProps {
}
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import ExploreContainer from './ExploreContainer';

const HotelSlider: React.FC<ContainerProps> = ({ }) => {
  return (
    <Swiper
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      effect={'fade'}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      // onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"

    >
      <SwiperSlide><ExploreContainer name={"Global"} /></SwiperSlide>
      <SwiperSlide><ExploreContainer name={"1"} /></SwiperSlide>
      <SwiperSlide><ExploreContainer name={"2"} /></SwiperSlide>
      <SwiperSlide><ExploreContainer name={"3"} /></SwiperSlide>

      {/* <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div> */}
    </Swiper>
  )
};

export default HotelSlider;
