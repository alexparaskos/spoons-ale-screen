import { IonIcon, IonItem, IonText } from '@ionic/react';
import './AleItem.css';
import { AleDetails } from '../App';

interface ContainerProps {
  ale: AleDetails
}

const AleItem: React.FC<ContainerProps> = ({ ale }) => {
  let color = "ale-pale"
  color = "ale-" + ale?.type?.key
  return (
    <IonItem className='ale-list-item'>
      <div className='ion-margin-vertical'>
        <h5>
          <span>{ale.brewery} - {ale.name}</span>
          <span className='menu-item-icons'>
            <span className="menu-item-icon d-flex ion-align-items-center"><IonIcon icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg>" color={color} className={"menu-item-icon_icon menu-item-icon_icon-" + color + "md ion-color ion-color-" + color} role="img"></IonIcon></span>
          </span>
        </h5>
        <IonText color="grey" className='text-sm ion-color text-semi-bold ion-color-grey md'>
          {ale.abv}% ABV - {ale.description}
        </IonText>
      </div>
    </IonItem>
  );
};

export default AleItem;
