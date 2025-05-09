import './MainScreen.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import HomeScreen from './HomeScreen';
import AreaScreen from './AreaScreen';

const fetchAndConnect = (url: string) => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      return data
    }).catch((err) => {
      console.log(err)
      return err
    })
}

const download = (url: string) => {
  fetchAndConnect
}

const MainScreen: React.FC = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    //@ts-ignore
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  useEffect(()=>{
    fetchAndConnect('https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/7206/ales.json')
  },[])
  return (
    <Swiper
      spaceBetween={30}
      // centeredSlides={true}
      autoplay={{
        delay: 25000,
        disableOnInteraction: false,
      }}
      // pagination={{
      // clickable: true,
      // }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="mySwiper"
    >
      <SwiperSlide><HomeScreen /></SwiperSlide>
      <SwiperSlide><AreaScreen /></SwiperSlide>
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
};

export default MainScreen;
