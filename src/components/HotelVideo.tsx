import './HotelVideo.css';
import hotelVid from "/src/hotelVid.mp4"
interface ContainerProps {
  name: string;
}

const HotelVideo: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="video-container">
      <video className="video" autoPlay loop muted src={hotelVid}></video>
    </div>
  );
};

export default HotelVideo;
