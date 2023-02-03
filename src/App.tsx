import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { home, addCircle, card, enter } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import InsertEnchere from './pages/InsertEnchere';
import DemandeRecharge from './pages/DemandeRecharge';

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

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
            <Route path="/" exact={true}>
                <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/inscription" exact={true}>
              <Inscription />
            </Route>
            <Route path="/encheres/new" exact={true}>
              <InsertEnchere />
            </Route>
            <Route path="/recharges/new" exact={true}>
              <DemandeRecharge />
            </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
            <IonTabButton tab="history" href="/home">
                  <IonIcon icon={home} />
                  <IonLabel>History</IonLabel>
              </IonTabButton>
              <IonTabButton tab="new-auction" href="/encheres/new">
                  <IonIcon icon={addCircle} />
                  <IonLabel>New Auction</IonLabel>
              </IonTabButton>
              <IonTabButton tab="request" href="/recharges/new">
                  <IonIcon icon={card} />
                  <IonLabel>Request</IonLabel>
              </IonTabButton>
              <IonTabButton tab="log-in" href="/login">
                  <IonIcon icon={enter} />
                  <IonLabel>Log In</IonLabel>
            </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
