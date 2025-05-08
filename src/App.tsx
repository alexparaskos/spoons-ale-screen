import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './screens/HomeScreen';
import Tab2 from './screens/AreaScreen';
import Tab3 from './screens/NoPubNo';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import AreaScreen from './screens/AreaScreen';
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import NoPubNo from './screens/NoPubNo';
import { useState } from 'react';
import { createContext } from 'react';
setupIonicReact();

let defConfig = {
  homePub: "",
  homePubDetails: {},
  permAles: [],
  areaPubs: [],
  setup: true,
}
export const ConfigContext = createContext({ config: defConfig, setConfig: (p0: { homePub: string; }) => { } });
const App: React.FC<RouteComponentProps> = () => {
  const [config, setConfig] = useState(defConfig)
  return (
    <ConfigContext.Provider value={{
      config,//@ts-ignore
      setConfig
    }}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/">
                {config.setup ?
                  <SetupScreen /> : <HomeScreen />
                }
              </Route>
              {/* <Route path="/" component={HomeScreen} /> */}
              {/* <Route exact path="/" component={NoPubNo} /> */}
              {/* <Route path="/" component={Setup} /> */}
              <Route path="/area" component={AreaScreen} />
            </IonRouterOutlet>
            {/* <IonTabBar slot="bottom" */}
            {/* <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
          </IonTabs>
        </IonReactRouter>

      </IonApp>
    </ConfigContext.Provider>
  )
}

export default App;
