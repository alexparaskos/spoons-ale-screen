import { IonItem, IonInput } from '@ionic/react';
import './EnterPubNo.css';

interface ContainerProps {
  pubNo: string;
}
function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 3963; // radius of earth in miles
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
    + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
    (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}
const EnterPubNo: React.FC<ContainerProps> = ({ pubNo }) => {
  let venues = global.venues
  venues = venues.map((v) => {
    return ({ ...v, distance: distance(v.latitude,v.longitude,pub.latitude,pub.longitude)})
  })
  venues = venues.sort((a, b) => a.distance - b.distance)

  return (
    <div>
      <IonItem>
        <IonInput type="number" label="Pub Number" placeholder='7206'></IonInput>
      </IonItem>
    </div>
  );
};

export default EnterPubNo;
