import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HomeScreen.css';
import Setup from '../components/Setup';

interface ContainerProps {
}
const HomeScreen: React.FC<ContainerProps> = () => {
  return (
    <IonPage>
      <IonHeader mode='ios'>
        <IonToolbar>
          <IonTitle>Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Setup</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Setup/>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
