import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Enchere } from '../data/encheres';
import EnchereCard from '../components/EnchereCard';

const Home: React.FC = () => {
  const [encheres, setEncheres] = useState<Enchere[]>([]);
  const history = useHistory();
  
  const getEncheres = async() => {
      try {
          const bearerToken = JSON.parse(localStorage.getItem("bearer-token")!);
          if (bearerToken === null) {
              history.push('/login');
          }
    
          const response = await fetch(`https://webserviceventeenchere-production.up.railway.app/encheres/history/${bearerToken.id}`);
          const json = await response.json();
          console.log(json.data);
          setEncheres(json.data);
      } catch (error) {
          console.error(error);
      }
  }

  useIonViewWillEnter(() => {
      getEncheres();
  }, []);

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>History</IonTitle>
              </IonToolbar>
          </IonHeader>
          
          <IonContent fullscreen>
              <IonList>
                  {encheres.map(enchere =>
                      <EnchereCard enchere={enchere} key={enchere.id} />
                  )}
              </IonList>
          </IonContent>
    </IonPage>
  );
}

export default Home;
