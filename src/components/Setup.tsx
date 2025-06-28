import { IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonCheckbox, IonListHeader, IonButton } from '@ionic/react';
import './Setup.css';
import { useContext } from 'react';
import { ConfigContext, PubDetails } from '../App';
import global from "../global.json";
import ciders from "../ciderTemp.json";
interface ContainerProps {

}
function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 3963; // radius of earth in miles
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
    + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
    (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

const Setup: React.FC<ContainerProps> = ({ }) => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  //@ts-ignore
  let venues: PubDetails[] = global.venues.filter((v) => v.latitude)
  if (config.homePubDetails?.name) {
    venues = venues.map((v) => {
      //@ts-ignore
      return ({ ...v, identifier: v.identifier.toString(), distance: distance(v.latitude, v.longitude, config.homePubDetails.latitude, config.homePubDetails.longitude) })
    })
    venues = venues.sort((a, b) => a.distance! - b.distance!)
    venues = venues.slice(1, 20)

  }
  return (
    <div>
      <IonList>
        <IonItem>
          <IonInput value={config.homePub} onIonInput={//@ts-ignore
            (e) => setConfig({ ...config, homePub: e.detail!.value, homePubDetails: global.venues.find((p) => p.identifier == e.detail!.value) })} label="Pub Number" placeholder='e.g. 7206'></IonInput>
        </IonItem>
        {config.homePubDetails?.name ? <>
          <IonItem>
            <IonInput label="Pub Name" value={config.homePubDetails?.name} readonly></IonInput>
          </IonItem>

          <IonItem>
            <IonSelect label="Permanent Ales" value={config.permAles} multiple={true} onIonChange={(e) => {
              setConfig(//@ts-ignore
                { ...config, permAles: e.detail.value })
            }}>
              <IonSelectOption value="IPA">Greene King IPA</IonSelectOption>
              <IonSelectOption value="Abbot Ale">Abbot Ale</IonSelectOption>
              <IonSelectOption value="Ruddles Best">Ruddles Best</IonSelectOption>
              <IonSelectOption value="Doom Bar">Doom Bar</IonSelectOption>
              <IonSelectOption value="80 Shilling">80 Shilling</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Guest Ciders" value={config.ciders} multiple={true} onIonChange={(e) => {
              setConfig(//@ts-ignore
                { ...config, ciders: e.detail.value })
            }}>
              {ciders.map((v, i) =><IonSelectOption key={i} value={v.product}>{v.product}</IonSelectOption>)}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Area Pubs" value={Object.keys(config.areaPubs)} multiple={true} onIonChange={(e) => {
              let area = venues.filter((v) => e.detail.value.includes(v.identifier))
              let areaPubs = {}
              area.forEach((pub) => {
                //@ts-ignore
                areaPubs[pub.identifier] = pub
              })
              setConfig(
                {
                  //@ts-ignore
                  ...config, areaPubs: areaPubs
                })
            }}>
              {venues.map((v) => {
                return <IonSelectOption key={v.identifier} value={v.identifier}>{v.name}</IonSelectOption>
              })}
            </IonSelect>
          </IonItem>
          {/* <IonItem>
            <IonSelect label="Guest Ciders" value={Object.keys(config.guestCiders)} multiple={true} onIonChange={(e) => {
              console.log(e.detail.value)
              // setConfig(
              //   {
              //     //@ts-ignore
              //     ...config, areaPubs: areaPubs
              //   })
            }}>
              {ciders.map((v) => {
                return <IonSelectOption key={v.eposName} value={v.eposName}>{v.displayRecords[0].name}</IonSelectOption>
              })}
            </IonSelect>
          </IonItem> */}
          <IonButton onClick={
            () => {
              localStorage.setItem("config", JSON.stringify(config));//@ts-ignore
              setConfig({ ...config, setup: false })
            }} expand="block">Done</IonButton></> : <></>}
      </IonList>

    </div>
  );
};

export default Setup;
