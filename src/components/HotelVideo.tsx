import './HotelVideo.css';

interface ContainerProps {
  name: string;
}

const HotelVideo: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="video-container">
      <video className="video" autoPlay loop muted src='/src/hotelVid.mp4'></video>
    </div>
  );
};

export default HotelVideo;
