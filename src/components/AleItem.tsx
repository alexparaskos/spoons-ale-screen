import { IonIcon, IonItem, IonText } from '@ionic/react';
import './AleItem.css';

interface ContainerProps {
  ale: {
    price: boolean;
    brewery: string;
    product: string;
    colour_code: string;
    abv: string;
    units: string;
    product_description: string;
    is_cellared: number;
  };
}

const AleItem: React.FC<ContainerProps> = ({ ale }) => {
  let color = "ale-pale"
  if (ale.colour_code == "2") {
    color = "ale-golden"
  } else if (ale.colour_code == "3" || ale.colour_code == "4") {
    color = "ale-amber"
  } else if (ale.colour_code == "5") {
    color = "ale-dark"
  }
  return (
    <IonItem className='ale-list-item'>
      <div className='ion-margin-vertical'>
        <h4>
          <span>{ale.brewery} {ale.product}</span>
          <span className='menu-item-icons'>
            <span className="menu-item-icon d-flex ion-align-items-center"><IonIcon icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg>" color={color} className={"menu-item-icon_icon menu-item-icon_icon-" + color + "md ion-color ion-color-" + color} role="img"></IonIcon></span>
          </span>
        </h4>
        <IonText color="grey" className='text-sm ion-color text-semi-bold ion-color-grey md'>
          {ale.abv}% ABV {ale.units} units. {ale.product_description}
        </IonText>
      </div>
    </IonItem>
  );
};

export default AleItem;
