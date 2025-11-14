import { IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { useContext, useEffect, useRef, useState } from 'react';
import defaultAles from "../defaultAles.json";
import ciders from "../ciderTemp.json";
import AleItem from './AleItem';
import permAles from "../permAles.json"
import CiderItem from './CiderItem';
import { ConfigContext, PubDetails } from '../App';
import { downloadAles } from './downloadAles';
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

const HomePub: React.FC<ContainerProps> = ({ }) => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  let [ales, setAles] = useState(defaultAles)
  const activeAles = ales.filter((ale) => !ale.comingSoon)
  let cellaredAles = ales.filter((ale) => ale.comingSoon)
  const onPermAles = permAles.filter((ale) => config.permAles.includes(ale.name))
  const activeCiders = ciders.filter((cider) => config.ciders.includes(cider.product))
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
  useEffect(() => {
    downloadAles(config.homePub, setAles)
  }, [])
  useInterval(downloadAles, 300000 / 5)
  useInterval(transition, 10000)
  return (
    <IonContent ref={contentRef}>
      <IonGrid className='ion-no-padding full-height'>
        <IonList lines="inset" class="list-md-lines-full list-lines-full">
          <IonRow>
            <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Real ales on sale now</IonText>
            </IonItemDivider>
            <IonCol size='6'>
              {//@ts-ignore
                onPermAles.concat(activeAles).map((i, j) => {
                  return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
            </IonCol>
            <IonCol size='6'>
              {//@ts-ignore
                onPermAles.concat(activeAles).map((i, j) => {
                  return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
            </IonCol>
          </IonRow>
          {activeCiders.length ? <><IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Guest Ciders</IonText>
          </IonItemDivider>
            <IonRow>
              <IonCol size='6'>
                {activeCiders.map((i, j) => {
                  return !(j % 2) ? <CiderItem cider={i} key={j} /> : <></>
                })}
              </IonCol>
              <IonCol size='6'>
                {activeCiders.map((i, j) => {
                  return !!(j % 2) ? <CiderItem cider={i} key={j} /> : <></>
                })}
              </IonCol>
            </IonRow></>
            : <></>
          }
          {cellaredAles ? <><IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
          </IonItemDivider>
            <IonRow>
              <IonCol size='6'>
                {cellaredAles.map((i, j) => {
                  return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
              </IonCol>
              <IonCol size='6'>
                {cellaredAles.map((i, j) => {
                  return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
              </IonCol>
            </IonRow></>
            : <></>
          }


          {/* <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
          </IonItemDivider>
          <IonRow>
            <IonCol size='6'>
              {cellaredAles.map((i, j) => {
                return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
            <IonCol size='6'>
              {cellaredAles.map((i, j) => {
                return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
          </IonRow> */}
        </IonList>
      </IonGrid>
    </IonContent>

  );
};

export default HomePub;
