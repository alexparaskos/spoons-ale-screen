import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import defaultAles from "../defaultAles.json";
import permAles from "../permAles.json";
import ciders from "../ciderTemp.json";
import AleItem from './AleItem';
import AutoScroll from './AutoScroll';
import CiderItem from './CiderItem';
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

const HomePub: React.FC<ContainerProps> = ({ }) => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  let [ales, setAles] = useState(defaultAles)
  const activeAles = ales.filter((ale) => !ale.is_cellared)
  let cellaredAles = ales.filter((ale) => ale.is_cellared)
  const onPermAles = permAles.filter((ale) => config.permAles.includes(ale.product))
  const activeCiders = ciders.filter((cider)=>config.ciders.includes(cider.product))
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

  const downloadAles = () => {
    console.log('Updating Ales')
    return fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/" + config.homePub + "/ales.json")
      .then(response => response.json())
      .then((data) => {
        console.log('Update successful')
        setAles(data);
      }).catch(() => {
        console.log('failed to fetch, attempting to login into spoons wifi')
        console.log('fetching /')
        fetch("http://spoons.alexparaskos.com", { method: "GET", cache: "no-store" })
          .then((response) => response.text())
          .then((data) => {
            console.log('1')
            console.log(data);
            if (data.includes("window.location")) {
              console.log('redirected to router')
            }
            const reDir = 'http://detectportal.firefox.com/success.txt'
            const secret = data.match(`fgtauth([^"]*)`)![1].slice(1)
            console.log('secret: ' + secret)
            const routerUrl = 'http://192.168.128.1:1000/fgtauth' + secret
            let body = '4Tredir=' + encodeURIComponent(reDir)
            body = body + '&' + 'magic=' + secret
            body = body + '&' + 'answer=1'
            console.log('fetching ' + routerUrl)
            console.log('body": ' + body)
            // fetch(routerUrl).then(() => {
            console.log('POSTING to: ' + routerUrl)
            navigator.sendBeacon(routerUrl,body)
          }).catch(() => console.log('failed post'))
      }).catch((e) => {
        console.log('Unable to log in to wifi;', e)
      })
  }
  useEffect(() => {
    downloadAles()
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
              {onPermAles.concat(activeAles).map((i, j) => {
                return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
            <IonCol size='6'>
              {onPermAles.concat(activeAles).map((i, j) => {
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
