import './EmptyComponent.css';

interface ContainerProps {
  name: string;
}

const EmptyComponent: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div>
      
    </div>
  );
};

export default EmptyComponent;
