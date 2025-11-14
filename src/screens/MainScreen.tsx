import './MainScreen.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useContext, useEffect, useRef, useState } from 'react';
import HomeScreen from './HomeScreen';
import HotelVideo from '../components/HotelVideo';
import { ConfigContext } from '../App';

const MainScreen: React.FC = () => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const videoRef = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    //@ts-ignore
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const handleSlideChange = (swiper: { activeIndex: number; }) => {
    if (videoRef.current) {
      if (swiper.activeIndex == 1) {
        //@ts-ignore
        videoRef.current.play();
        //@ts-ignore
        console.log('play ' + videoRef.current.currentTime)
      } else {
        //@ts-ignore
        videoRef.current.pause();
        //@ts-ignore
        console.log('pause ' + videoRef.current.currentTime)
      }
    }
  };
  if (!config.hotels) return <HomeScreen />
  return (
    <Swiper
      // spaceBetween={30}
      // centeredSlides={true}
      onSlideChange={handleSlideChange}
      autoplay={{
        delay: 50000,
        disableOnInteraction: false,
      }}
      rewind
      // pagination={{
      // clickable: true,
      // }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"
    >
      <SwiperSlide><HomeScreen /></SwiperSlide>
      {/* <SwiperSlide><HotelScreen /></SwiperSlide> */}
      <SwiperSlide><HotelVideo videoRef={videoRef} /></SwiperSlide>
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
  // <HomeScreen />
  // )
};

export default MainScreen;
