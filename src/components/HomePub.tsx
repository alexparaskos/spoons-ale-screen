import { IonCol, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { useEffect, useState } from 'react';
import defaultAles from "../defaultAles.json";
import permAles from "../permAles.json";
import ciders from "../ciders.json";
import AleItem from './AleItem';
import AutoScroll from './AutoScroll';
import CiderItem from './CiderItem';
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
    <IonGrid className='ion-no-padding full-height'>
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
            {ciders.map((cider) => {
              return { ...cider, price: true }
            }).map((i) => <CiderItem cider={i} />)}
          </IonList>
        </IonCol>
        <IonCol>
          <IonItem color="light-grey" lines='full' className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
          </IonItem>
          <AutoScroll>
            <IonList lines="full" class="list-md-lines-full list-lines-full">

              {cellaredAles.map((ale) => {
                return { ...ale, price: true }
              }).map((i) => <AleItem ale={i} />)}
            </IonList>
          </AutoScroll>
        </IonCol>
      </IonRow>
    </IonGrid>

  );
};

export default HomePub;
