import { Categorie } from "./categories";
import { Image } from "./images";

export interface Enchere {
    id: number,
    dateFin: string,
    enchereActuelle: number,
    categorie: Categorie,
    idUser: number,
    caption: string,
    image: Image,
    statut: string
}
