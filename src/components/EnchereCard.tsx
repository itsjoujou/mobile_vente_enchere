import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonImg
} from '@ionic/react';
import { Enchere } from '../data/encheres';
import './EnchereCard.css';

interface EnchereCardProps {
    enchere: Enchere
}

const EnchereCard: React.FC<EnchereCardProps> = ({enchere}) => {
    return (
        <IonCard class='ion-margin-bottom'>
            <IonImg src={enchere.image.base64[0]} />
            <IonCardHeader>
                <IonCardSubtitle>{enchere.categorie.libelleCategorie}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {enchere.caption.slice(0, 30)}...
                <p>
                    Prix actuel : {enchere.enchereActuelle} MGA
                </p>
                <p>
                    Fin : {enchere.dateFin}
                </p>
                <p>{enchere.statut}</p>
            </IonCardContent>
        </IonCard>
    );
};

export default EnchereCard;
