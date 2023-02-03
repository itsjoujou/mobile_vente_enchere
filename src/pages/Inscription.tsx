import {
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage
} from '@ionic/react';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import { personCircle, lockClosed } from 'ionicons/icons';
import './Inscription.scss';

const Inscription: React.FC = () => {
    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");

    const history = useHistory();
    const signUp = async(event: React.FormEvent) => {
        event.preventDefault();
        
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        };

        fetch('http://localhost:8080/users/new_account', request)
            .then(response => response.json())
            .then(json => {
                if (json.data != null) {
                    localStorage.setItem("bearer-token", JSON.stringify(
                        {
                            id: json.data.id,
                            username: json.data.username,
                            token: json.data.token,
                            dateExpirationToken: json.data.dateExpirationToken,
                            validiteToken: json.data.validiteToken
                        }
                    ));

                    history.push("/home");
                } else {
                    history.push("/inscription");
                }
            });
    }

    return (
        <IonPage>
        <IonContent fullscreen>
            <div className="login-section ion-padding">
                <div className='heading ion-padding'>
                    <h1>Welcome!</h1>
                    <p>Create a new account</p>
                </div>
                <div className='login-form ion-padding'>
                    <div className='form-input'>
                        <form onSubmit={signUp}>
                            <div className='form-input'>
                                <IonIcon icon={personCircle}></IonIcon>
                                <IonItem>
                                    <IonLabel position="floating">USERNAME</IonLabel>
                                    <IonInput name="username" onIonChange={(event) => setUsername(event.detail.value!)} />
                                </IonItem>
                            </div>
                            <div className='form-input'>
                                <IonIcon icon={lockClosed}></IonIcon>
                                <IonItem>
                                    <IonLabel position="floating">PASSWORD</IonLabel>
                                    <IonInput type="password" name="password" onIonChange={(event) => setPassword(event.detail.value!)} />
                                </IonItem>
                            </div>
                            <div className='action-buttons ion-padding'>
                                <IonButton size="large" type="submit" className="login-button">Sign Up</IonButton>
                                <p>Already have an account?</p>
                                <IonButton size = "large" className="signup-button" fill="outline" href="/login">Sign In</IonButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
    );
}

export default Inscription;
