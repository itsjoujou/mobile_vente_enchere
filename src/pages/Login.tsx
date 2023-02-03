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
import './Login.scss';

const Login: React.FC = () => {
    const[username, setUsername] = useState<string>("Miaa");
    const[password, setPassword] = useState<string>("root");

    const history = useHistory();
    const login = async(event: React.FormEvent) => {
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

        fetch('https://webserviceventeenchere-production.up.railway.app/authenticate/users', request)
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
                    history.push("/login");
                }
            }
        );
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="login-section ion-padding">
                    <div className='heading ion-padding'>
                        <h1>Welcome!</h1>
                        <p>Please Sign in to continue</p>
                    </div>
                    <div className='login-form ion-padding'>
                        <div className='form-input'>
                            <form onSubmit={login}>
                                <div className='form-input'>
                                    <IonIcon icon={personCircle}></IonIcon>
                                    <IonItem>
                                        <IonLabel position="floating">USERNAME</IonLabel>
                                        <IonInput value={username} name="username" onIonChange={(event) => setUsername(event.detail.value!)} />
                                    </IonItem>
                                </div>
                                <div className='form-input'>
                                    <IonIcon icon={lockClosed}></IonIcon>
                                    <IonItem>
                                        <IonLabel position="floating">PASSWORD</IonLabel>
                                        <IonInput value={password} type="password" name="password" onIonChange={(event) => setPassword(event.detail.value!)} />
                                    </IonItem>
                                </div>
                                <div className='action-buttons ion-padding'>
                                    <IonButton size="large" type="submit" className="login-button">Sign In</IonButton>
                                    <p>Don't have an account yet?</p>
                                    <IonButton size = "large" className="signup-button" fill="outline" href="/inscription">Sign up</IonButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Login;
