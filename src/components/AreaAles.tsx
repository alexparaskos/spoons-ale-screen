import { IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './AreaAles.css';
import { useContext, useEffect, useRef, useState } from 'react';
import AleItem from './AleItem';
import defaultAles from "../defaultAles.json";
import { AleDetails, ConfigContext } from '../App';
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
  console.log(config.areaPubs)
  let emptyAles: { [key: string]: AleDetails } = {}
  const [ales, setAles] = useState(emptyAles);
  const downloadAles = () => {
    Promise.all(Object.values(config.areaPubs).map((pub) => {
      return fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/" + pub.identifier + "/ales.json")
        .then(response => response.json())
        .then((data) => {
          return { [pub.identifier]: data.filter((ale) => !ale.is_cellared) }
        })
    }))
      .then((data) => {
        var areaPubs = data.reduce((obj, item) => ({ ...obj, [Object.keys(item)[0]]: Object.values(item)[0] }), {});
        setAles(areaPubs)
      })
  }
  console.log(ales)
  useEffect(() => {
    downloadAles()
  }, [config.areaPubs])
  // console.log(config.areaPubs)
  useInterval(downloadAles, 300000)
  useInterval(transition, 10000)
  return (
    <IonContent ref={contentRef}>
      <IonGrid className='ion-no-padding full-height'>
        <IonRow>
          <IonCol>
            <IonList lines="inset" class="list-md-lines-full list-lines-full">
              {Object.keys(ales).map((pub, i) => {
                return i % 2 ? <>
                  <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
                    <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>{config.areaPubs[pub].name}, {config.areaPubs[pub].address_line_2 ? config.areaPubs[pub].address_line_2 : config.areaPubs[pub].town} - {config.areaPubs[pub].distance!.toPrecision(2)} mi</IonText>
                  </IonItemDivider>
                  {ales[pub].map((ale) => {
                    return { ...ale, price: true }
                  }).map((i, j) => <AleItem ale={i} key={j} />)}
                </> : <></>
              })}
            </IonList>
          </IonCol>
          <IonCol>
            <IonList lines="inset" class="list-md-lines-full list-lines-full">
              {Object.keys(ales).map((pub, i) => {
                return !(i % 2) ? <>
                  <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
                    <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>{config.areaPubs[pub].name}, {config.areaPubs[pub].address_line_2 ? config.areaPubs[pub].address_line_2 : config.areaPubs[pub].town} - {config.areaPubs[pub].distance!.toPrecision(2)} mi</IonText>
                  </IonItemDivider>
                  {ales[pub].map((ale) => {
                    return { ...ale, price: true }
                  }).map((i, j) => <AleItem ale={i} key={j} />)}
                </> : <></>
              })}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>

  );
};

export default AreaAles;
