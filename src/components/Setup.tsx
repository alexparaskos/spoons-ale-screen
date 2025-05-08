import { IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonCheckbox, IonListHeader, IonButton } from '@ionic/react';
import './Setup.css';
import { useContext } from 'react';
import { ConfigContext } from '../App';

import global from "../global.json";
import { configure } from '@testing-library/react';

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
  let venues = global.venues.filter((v)=>v.latitude)
  if (config.homePubDetails) {
    venues = venues.map((v) => {
      return ({ ...v, distance: distance(v.latitude, v.longitude, config.homePubDetails.latitude, config.homePubDetails.longitude) })
    })
    venues = venues.sort((a, b) => a.distance - b.distance)
    venues = venues.slice(1, 20)

  }
  return (
    <div>
      <IonList>
        <IonItem>
          <IonInput value={config.homePub} onIonChange={(e) => setConfig({ ...config, homePub: e.detail!.value, homePubDetails: global.venues.find((p) => p.identifier == e.detail!.value) })} label="Pub Number" placeholder='7206'></IonInput>
        </IonItem>

        <IonItem>
          <IonInput label="Pub Name" value={config.homePubDetails?.name} readonly></IonInput>
        </IonItem>
        {config.homePub ? <>
          <IonItem>
            <IonSelect label="Permanent Ales" value={config.permAles} multiple={true} onIonChange={(e) => { setConfig({ ...config, permAles: e.detail.value }) }}>
              <IonSelectOption value="IPA">Greene King IPA</IonSelectOption>
              <IonSelectOption value="Abbot Ale">Abbot Ale</IonSelectOption>
              <IonSelectOption value="Ruddles Best">Ruddles Best</IonSelectOption>
              <IonSelectOption value="Doom Bar">Doom Bar</IonSelectOption>
              <IonSelectOption value="80 Shilling">80 Shilling</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>

            <IonSelect label="Area Pubs" value={config.permAles} multiple={true} onIonChange={(e) => { console.log(e.detail.value) }}>
              {venues.map((v) => {
                return <IonSelectOption key={v.identifier} value={v.identifier}>{v.name}</IonSelectOption>
              })}
            </IonSelect>

          </IonItem></> : <></>}
      </IonList>
      <IonButton disabled={!config.homePub} onClick={() => setConfig({ ...config, setup: false })} expand="block">Done</IonButton>
    </div>
  );
};

export default Setup;
