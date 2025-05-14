import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonFooter, IonIcon, IonItem, IonList, IonText, IonToolbar } from '@ionic/react';
import './Footer.css';
import { AleDetails, ConfigContext } from '../App';

let sections = [
  { title: 'Legal', items: ['Privacy Policy', 'Terms of Service', 'Privacy Policy', 'Terms of Service'] },
  { title: 'Support', items: ['Contact', 'Help Center'] },
  { title: 'Company', items: ['About', 'Careers'] },
];
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
const HorizontalStickyFooter: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  const contentRef = useRef<HTMLIonContentElement>(null);
  let [position, setPosition] = useState(0)

  // console.log(config.areaPubs)
  let emptyAles: { [key: string]: AleDetails[] } = {}
  const [ales, setAles] = useState(emptyAles);
  const downloadAles = () => {
    Promise.all(Object.values(config.areaPubs).map((pub) => {
      return fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/" + pub.identifier + "/ales.json")
        .then(response => response.json())
        .then((data) => {//@ts-ignore
          return { [pub.identifier]: data.filter((ale) => !ale.is_cellared) }
        })
    }))
      .then((data) => {
        var areaPubs = data.reduce((obj, item) => ({ ...obj, [Object.keys(item)[0]]: Object.values(item)[0] }), {});
        setAles(areaPubs)
      })
  }
  // console.log(ales)
  useEffect(() => {
    downloadAles()
  }, [config.areaPubs])
  // console.log(config.areaPubs)
  useInterval(downloadAles, 300000)
  // Simple auto-scroll effect1
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    let reqId: number;
    let scrollLeft = 0;

    const step = () => {
      if (!scrollEl) return;
      scrollLeft += 0.5;
      if (scrollLeft >= scrollEl.scrollWidth / 2) {
        scrollLeft = 0;
      }
      scrollEl.scrollLeft = scrollLeft;
      reqId = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(reqId);
  }, [ales]);
  console.log(ales)
  if (Object.keys(ales).length == 0) return <></>
  return (
    <IonFooter>
      <IonToolbar className="footer-toolbar">
        <div className="scroll-container" ref={scrollRef}>
          {Object.values(config.areaPubs).map((pub, index) => (
            <div className="scroll-section" key={index}>
              <div className="section-header">{pub.name} {pub.distance}</div>
              <div className="section-items">
                {ales[pub.identifier].map((ale, i) => (
                  <span className="scroll-item" key={i}>
                    {ale.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default HorizontalStickyFooter;