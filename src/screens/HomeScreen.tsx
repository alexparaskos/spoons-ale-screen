import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HomeScreen.css';
import HomePub from '../components/HomePub';
import { useContext } from 'react';
import { ConfigContext } from '../App';
import Footer from '../components/Footer';

const HomeScreen: React.FC = () => {
    const {
      config,
      setConfig
    } = useContext(ConfigContext);
    // console.log(config.homePubDetails)
  return (
    <IonPage>
      <IonHeader mode='ios'>
        <IonToolbar>
          <IonTitle>{config.homePubDetails?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{config.homePubDetails?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomePub />
      </IonContent>
      <Footer/>
    </IonPage>
  );
};

export default HomeScreen;
