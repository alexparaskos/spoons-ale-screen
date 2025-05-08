import './HotelTest.css';

interface ContainerProps {
  name: string;
}
const HotelTest: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div>
      <svg viewBox="0 0 975 1110">
        <g fill="none" stroke="green" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
          <path stroke="darkRED" stroke-width="0.8" d="${path(counties)}"></path>
          <path stroke="BLUE" stroke-width="2" d="${path(states)}"></path>
          <path d="${path(nation)}"></path>
        </g>
      </svg>
    </div>
  );
};

export default HotelTest;
