import { IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { createRef, useEffect, useRef, useState } from 'react';
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
  let cellaredAles = ales.filter((ale) => ale.is_cellared)
  const onPermAles = permAles.filter((ale) => ale.product == "IPA" || ale.product == "Abbot Ale")
  let top = true
  const contentRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => {
      if (contentRef.current) {
        // @ts-ignore
        contentRef.current?.scrollToBottom(500)
        top = false
        scrollTop()
      }
    }, 2000)
  }
  const scrollTop = () => {
    setTimeout(() => {
      if (contentRef.current) {
        // @ts-ignore
        contentRef.current?.scrollToTop(500)
        top = true
        scrollBottom()
      }
    }, 2000)
  }

  const scrollToggle = () => {
    if (top) {
      scrollBottom()
    } else {
      scrollTop()
    }
  }

  if (cellaredAles.length > 6) {
    cellaredAles = cellaredAles.splice(0, 12)
    if (contentRef.current) {
      scrollToggle()
    }
  }
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
    <IonContent ref={contentRef}>
      <IonGrid className='ion-no-padding full-height'>
        <IonRow>
          <IonCol>
            <IonList lines="inset" class="list-md-lines-full list-lines-full">
              <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
                <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Real ales on sale now</IonText>
              </IonItemDivider>
              {onPermAles.concat(activeAles).map((ale) => {
                return { ...ale, price: true }
              }).map((i) => <AleItem ale={i} />)}
              <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
                <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Our guest ciders</IonText>
              </IonItemDivider>
              {ciders.map((cider) => {
                return { ...cider, price: true }
              }).map((i) => <CiderItem cider={i} />)}
            </IonList>
          </IonCol>
          <IonCol>
            <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
            </IonItemDivider>
            <IonList lines="inset" class="list-md-lines-full list-lines-full">

              {cellaredAles.map((ale) => {
                return { ...ale, price: true }
              }).map((i) => <AleItem ale={i} />)}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>

  );
};

export default HomePub;
