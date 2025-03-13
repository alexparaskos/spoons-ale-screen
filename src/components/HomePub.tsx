import { IonCol, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { useEffect, useState } from 'react';
import defaultAles from "../defaultAles.json";
import permAles from "../permAles.json";
import AleItem from './AleItem';
interface ContainerProps {
}

const HomePub: React.FC<ContainerProps> = ({ }) => {
  let [ales, setAles] = useState(defaultAles)
  const activeAles = ales.filter((ale) => !ale.is_cellared)
  const cellaredAles = ales.filter((ale) => ale.is_cellared)
  const onPermAles = permAles.filter((ale) => ale.product == "IPA" || ale.product == "Abbot Ale")
  // const craft = iOrder.display.displayGroups.filter((i)=>i.groupId == 278943)[0].items.filter((i)=>i.itemType == "product");
  // const craft = iOrder.aztec.products.filter((i)=>i.subcategoryId == 11);
  // console.log(craft)

  useEffect(() => {
    fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/7206/ales.json")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setAles(data);
      })
  }, [])
  return (
    <IonGrid className='ion-no-padding'>
      <IonRow>
        <IonCol>
          <IonList lines="full" class="list-md-lines-full list-lines-full">
            <IonItem color="light-grey" lines='full' className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Our Ales on Sale Now</IonText>
            </IonItem>
            {onPermAles.concat(activeAles).map((ale) => {
              return { ...ale, price: true }
            }).map((i) => <AleItem ale={i} />)}
            <IonItem color="light-grey" lines='full' className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Our Guest Ciders</IonText>
            </IonItem>
          </IonList>
        </IonCol>
        <IonCol>
        <IonList lines="full" class="list-md-lines-full list-lines-full">
            <IonItem color="light-grey" lines='full' className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
            </IonItem>
            {cellaredAles.map((ale) => {
              return { ...ale, price: true }
            }).map((i) => <AleItem ale={i} />)}
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>

  );
};

export default HomePub;
