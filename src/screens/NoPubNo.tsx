import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './NoPubNo.css';
import EnterPubNo from '../components/EnterPubNo';

const NoPubNo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter Pub Number</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Set Up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EnterPubNo pubNo={''} />
      </IonContent>
    </IonPage>
  );
};

export default NoPubNo;
