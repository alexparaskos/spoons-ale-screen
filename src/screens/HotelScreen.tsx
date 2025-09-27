import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HotelScreen.css';
import { useContext } from 'react';
import { ConfigContext } from '../App';
import HotelSlider from '../components/HotelSlider';

const HotelScreen: React.FC = () => {
    const {
      config,
      setConfig
    } = useContext(ConfigContext);
    // console.log(config.homePubDetails)
  return (
    <IonPage>
      <IonHeader mode='ios'>
        <IonToolbar>
          <IonTitle>Wetherspoon Hotels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hotels in the area</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <HotelSlider />
      </IonContent>
    </IonPage>
  );
};

export default HotelScreen;
