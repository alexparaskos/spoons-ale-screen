import {  IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './AreaAles.css';
import {useContext, useEffect, useRef, useState } from 'react';
import defaultAles from "../defaultAles.json";
import permAles from "../permAles.json";
import AleItem from './AleItem';
import { ConfigContext } from '../App';
interface ContainerProps {
}

function useInterval(callback: unknown, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    //@ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const AreaAles: React.FC<ContainerProps> = ({ }) => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  const contentRef = useRef<HTMLIonContentElement>(null);
  let [position, setPosition] = useState(0)
  const transition = () => {
    if (contentRef.current) {
      if (position == 0) {
        contentRef.current?.scrollToBottom(5000)
        setPosition(1)
      } else {
        contentRef.current?.scrollToTop(5000)
        setPosition(0)
      }
    }
  }
  // const downloadAles = () => {
  //   console.log('Updating Ales')
  //   return fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/" + config.homePub + "/ales.json")
  //     .then(response => response.json())
  //     .then((data) => {
  //       setAles(data);
  //     })
  // // }
  // useEffect(() => {
  //   downloadAles()
  // }, [])
  // useInterval(downloadAles, 300000)
  useInterval(transition, 15000)

  return (
    <IonContent ref={contentRef}>
      <IonGrid className='ion-no-padding full-height'>
        <IonRow>
          <IonCol>
            <IonList lines="inset" class="list-md-lines-full list-lines-full">
              <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
                <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Real ales on sale now</IonText>
              </IonItemDivider>
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
