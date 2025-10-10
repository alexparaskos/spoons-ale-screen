import { useRef } from 'react';
import './HotelVideo.css';
interface ContainerProps {
  videoRef: React.MutableRefObject<null>
}

const HotelVideo: React.FC<ContainerProps> = ({ videoRef }) => {
  return (
    <div className="video-container">
      <video ref={videoRef} className="video" preload="auto" playsInline loop muted src="assets/hotelVid.mp4"></video>
    </div>
  );
};

export default HotelVideo;
