import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import HomePub from '../components/HomePub';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader mode='ios'>
        <IonToolbar>
          <IonTitle>The Crown Inn</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">The Crown Inn</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomePub />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
