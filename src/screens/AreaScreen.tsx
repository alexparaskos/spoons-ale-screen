import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AreaScreen.css';
import AreaAles from '../components/AreaAles';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader mode='ios'>
        <IonToolbar>
          <IonTitle>In the Area</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">In the Area</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AreaAles/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
