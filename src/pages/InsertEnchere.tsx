import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import EnchereForm from '../components/EnchereForm';
import './InsertEnchere.css';

const InsertEnchere: React.FC = () => {
    return (
        <IonPage>
            <IonHeader class='ion-no-border'>
                <IonToolbar>
                    <IonTitle>New Auction</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <EnchereForm />
            </IonContent>
        </IonPage>
    );
};

export default InsertEnchere;
