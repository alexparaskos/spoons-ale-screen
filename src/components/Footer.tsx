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
      return fetch("https://ca.jdw-apps.net/api/v0.1/jdw/venues/" + pub.identifier + "/ales", {
        headers: { Authorization: 'Bearer SFS9MMnn5deflq0BMcUTSijwSMBB4mc7NSG2rOhqb2765466' }
      }).then(response => response.json())
        .then((data) => {//@ts-ignore
          return { [pub.identifier]: data.data.filter((ale) => !ale.comingSoon) }
        })
    }))
      .then((data) => {
        console.log(data)
        var areaPubs = data.reduce((obj, item) => ({ ...obj, [Object.keys(item)[0]]: Object.values(item)[0] }), {});
        setAles(areaPubs)
      })
  }
  // console.log(ales)
  useEffect(() => {
    downloadAles()
  }, [config.areaPubs])
  console.log(ales)
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
      scrollLeft += 1.3;
      if (scrollLeft >= scrollEl.scrollWidth / 2) {
        scrollLeft -= scrollEl.scrollWidth / 2;
      }
      scrollEl.scrollLeft = scrollLeft;
      reqId = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(reqId);
  }, [ales]);

  if (Object.keys(ales).length == 0) return <></>
  return (
    <IonFooter>
      <IonToolbar className="footer-toolbar">
        <div className="scroll-container" ref={scrollRef}>
          {[...Object.values(config.areaPubs), ...Object.values(config.areaPubs)].map((pub, index) => (
            <div className="scroll-section" key={index}>
              <div className=" ale-list-item section-header ion-padding-horizontal">
                <div className='ion-margin-vertical bg-light-grey'>
                  <h5>
                    <span>{pub.name}</span>
                  </h5>
                  <span> {pub.address_line_2 ? pub.address_line_2 : pub.town} - {pub.distance!.toPrecision(2)} mi</span>
                </div>
              </div>
              <div className="section-items">
                {ales[pub.identifier].map((ale, i) => {
                  let color = "ale-pale"
                  color = "ale-"+ale?.type?.key
                  return (
                    <div className='ale-list-item pl-16' key={i}>
                      <div className='ion-margin-vertical'>
                        <h5>
                          <span> <b>{ale.brewery}</b> {ale.name}</span>
                          <span className='menu-item-icons'>
                            <span className="menu-item-icon d-flex ion-align-items-center"><IonIcon icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg>" color={color} className={"menu-item-icon_icon menu-item-icon_icon-" + color + "md ion-color ion-color-" + color} role="img"></IonIcon></span>
                          </span>
                        </h5>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default HorizontalStickyFooter;