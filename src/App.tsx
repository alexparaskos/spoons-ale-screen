import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import SetupScreen from './screens/SetupScreen';
import MainScreen from './screens/MainScreen';
import { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
setupIonicReact();
export interface PubDetails {
  id: number;
  identifier: number;
  sitecore_id: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  town: string;
  county: string;
  post_code: string;
  country_code: string;
  country: string;
  telephone: string;
  latitude: string;
  longitude: string;
  email: null;
  type: string;
  is_closed: number;
  related_site: null;
  payment: {
      gateway: string;
      bnpp: {
          merchant_id: string;
          apple_pay_merchant_id: string;
      };
  };
  payment_methods_disabled: never[];
  temporary_closed: {
      closureTo: string;
      closureFrom: string;
      closureNotice: string;
      pubIsTemporaryClosed: boolean;
  };
  distance?: number;
}
export interface AleDetails {
  id: number;
  identifier: string;
  brewery: string;
  product: string;
  name: string;
  brewer_product: string;
  colour_code: string;
  abv: string;
  allergens: {
    eggs: string;
    fish: string;
    milk: string;
    nuts: string;
    lupin: string;
    celery: string;
    mustard: string;
    peanuts: string;
    molluscs: string;
    soyabeans: string;
    sesameSeed: string;
    crustaceans: string;
    sulphur_dioxide: string;
    cereals_containing_gluten: string;
    units: string;
    price_band: string;
    product_description: string;
    location: string;
    est_date: string;
    is_favourite: number;
    is_cellared: number;
    active_sales_areas: {
        id: number;
    }[];
};
}
type AreaPubs = {
  [key:string] : PubDetails
}
let defConfig: { homePub: string, homePubDetails: PubDetails, permAles: string[], areaPubs: AreaPubs, setup: boolean } = {
  homePub: "",
  homePubDetails: {
    id: 0,
    identifier: 0,
    sitecore_id: '',
    name: '',
    address_line_1: '',
    address_line_2: '',
    town: '',
    county: '',
    post_code: '',
    country_code: '',
    country: '',
    telephone: '',
    latitude: '',
    longitude: '',
    email: null,
    type: '',
    is_closed: 0,
    related_site: null,
    payment: {
      gateway: '',
      bnpp: {
        merchant_id: '',
        apple_pay_merchant_id: ''
      }
    },
    payment_methods_disabled: [],
    temporary_closed: {
      closureTo: '',
      closureFrom: '',
      closureNotice: '',
      pubIsTemporaryClosed: false
    }
  },
  permAles: [],
  areaPubs: {},
  setup: true,
}

function useInterval(callback: unknown, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    //@ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
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
                  <SetupScreen /> : <MainScreen />
                }
              </Route>
            </IonRouterOutlet>
          </IonTabs>
        </IonReactRouter>

      </IonApp>
    </ConfigContext.Provider>
  )
}

export default App;
