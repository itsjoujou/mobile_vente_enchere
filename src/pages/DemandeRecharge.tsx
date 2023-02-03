import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage
} from '@ionic/react';
import { useState } from "react";
import { useHistory } from "react-router";
import './DemandeRecharge.scss';

const DemandeRecharge: React.FC = () => {
    const [montant, setMontant] = useState(0.0);
    const history = useHistory();

    const demandeRecharge = async(event: React.FormEvent) => {
        event.preventDefault();
        const bearerToken = JSON.parse(localStorage.getItem("bearer-token")!);

        if (bearerToken === null && new Date().getTime() > new Date(bearerToken.expired_at).getTime()) {
            history.push('/login');
        }
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idUser": bearerToken.id,
                "montant": montant
            })
        };

        fetch('https://webserviceventeenchere-production.up.railway.app/demandes_recharge', request);
        history.push('/home');
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <form className="ion-padding" onSubmit={demandeRecharge}>
                    <IonItem>
                        <IonLabel position="floating">Montant</IonLabel>
                        <IonInput name="montant" onIonChange={(event) => setMontant(Number(event.detail.value!))} />
                    </IonItem>
                    <br />
                    <IonButton type="submit" className="ion-margin-top">Confirmer</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default DemandeRecharge;
