import { IonIcon, IonItem, IonText } from '@ionic/react';
import './CiderItem.css';

interface ContainerProps {
  cider:
  {
    "id": number,
    "eposName": string,
    "description": string,
    "displayRecords":
    {
      "id": number,
      "name": string,
      "description": string,
      "effectiveDate": string,
      "expiryDate": string,
      "image": string,
      "alt_text": null,
      "keywords": number[],
      "mayStock": number,
      "showPrices": number
    }[]
    ,
    "showCourseDialog": number,
    "defaultCourseId": number,
    "portions": any,
    "isInstruction": number,
    "categoryId": number,
    "subcategoryId": number,
    "minimumCustomerAge": number,
    "divisionId": number
  },
}

const CiderItem: React.FC<ContainerProps> = ({ cider }) => {

  return (
    <IonItem className='ale-list-item item md item-lines-default in-list' role='listitem'>
      <div className='ion-margin-vertical'>
        <h4>
          <span>{cider.displayRecords[0].name}</span>
          {/* <span className='menu-item-icons'>
            <span className="menu-item-icon d-flex ion-align-items-center"><IonIcon icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg>" color={color} className={"menu-item-icon_icon menu-item-icon_icon-" + color + "md ion-color ion-color-" + color} role="img"></IonIcon></span>
          </span> */}
        </h4>
        <IonText color="grey" className='text-sm ion-color text-semi-bold ion-color-grey md'>
          {cider.displayRecords[0].description}. {cider?.description}
        </IonText>
      </div>
    </IonItem>
  );
};

export default CiderItem;
