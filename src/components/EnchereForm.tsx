import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    useIonViewWillEnter} from '@ionic/react';
import { useHistory } from 'react-router';
import { Categorie } from '../data/categories';
import React, { useState } from 'react';
import './EnchereForm.scss';

const EnchereForm: React.FC = () => {
    const [caption, setCaption] = useState("");
    const [montantDebutEnchere, setMontantDebutEnchere] = useState<any>();
    const [duree, setDuree] = useState<any>();
    const [idCategorie, setIdCategorie] = useState<number>();
    const [categories, setCategories] = useState<Categorie[]>([]);
    const images : string[] = [];
    const history = useHistory();
    
    const getCategories = async() => {
        try {
            const bearerToken = JSON.parse(localStorage.getItem("bearer-token")!);
            if (bearerToken === null) {
                history.push('/login');
            }

            const response = await fetch('https://webserviceventeenchere-production.up.railway.app/categories');
            const json = await response.json();
            setCategories(json.data);
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleFileInput = async(event: React.ChangeEvent<HTMLInputElement>) => {
        for (let i = 0; i < event.target.files!.length; i++) {
            const file = event.target.files![i];
            const reader = new FileReader();
            reader.onloadend = () => {
                let base64 = reader.result as string;
                images.push(base64);
            }

            reader.readAsDataURL(file);
        }
    }

    const addEnchere = async(event: React.FormEvent) => {
        event.preventDefault();

        const bearerToken = JSON.parse(localStorage.getItem("bearer-token")!);
        if (new Date().getTime() > new Date(bearerToken.dateExpirationToken).getTime() || bearerToken.validiteToken === false) {
            history.push('/login');
        }
        
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "enchere": {
                    "idUser": bearerToken.id,
                    "caption": caption,
                    "montantDebutEnchere": montantDebutEnchere,
                    "duree": duree,
                    "categorie": {
                        "id": idCategorie
                    }
                },
                "images": {
                    "base64": images
                }
            })
        };

        fetch('https://webserviceventeenchere-production.up.railway.app/encheres', request)
            .then(response => {
                history.push('/home');
            })
            .catch(error => console.log(error));
    };

    useIonViewWillEnter(() => {
        getCategories();
    }, []);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>New Auction</IonCardSubtitle>
                <IonCardTitle>Add auction</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <form className="ion-padding" onSubmit={addEnchere}>
                <IonItem>
                    <IonTextarea
                        placeholder="Description du lot..."
                        value={caption}
                        onIonChange={ev => setCaption(ev.target.value!)}
                        rows={2}
                        autoGrow={true}
                        mode="ios"
                        required
                    ></IonTextarea>
                </IonItem>

                <IonItem>
                    <IonSelect
                        mode="ios"
                        placeholder="Choisir catégorie"
                        onIonChange={ev => setIdCategorie(ev.target.value!)}
                    >
                        {categories.map(categorie =>
                            <IonSelectOption value={categorie.id} key={categorie.id}>
                                {categorie.libelleCategorie}
                            </IonSelectOption>
                        )}
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel>Prix</IonLabel>
                    <IonInput
                        type="number"
                        value={montantDebutEnchere}
                        onIonChange={ev => setMontantDebutEnchere(ev.target.value!)}
                        placeholder="Prix minimal"
                        min={0}
                    ></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Durée</IonLabel>
                    <IonInput
                        type="number"
                        value={duree}
                        onIonChange={ev => setDuree(ev.target.value!)}
                        placeholder="Durée de l'enchère"
                        min={0}
                        step="any"
                    ></IonInput>
                </IonItem>

                <IonItem lines='none'>
                    <input type="file" id="file" multiple onChange={handleFileInput} hidden />
                    <label htmlFor="file" id="selector">Upload image</label>
                </IonItem>
                <br />
                <div className="signin-btns">
                    <IonButton type="submit" fill='solid' class='formbtn'>Valider</IonButton>
                </div>
                </form>            
            </IonCardContent>
        </IonCard>
    );
}

export default EnchereForm;
