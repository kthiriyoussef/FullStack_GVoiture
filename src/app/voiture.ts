import { marque } from "./Marque"
import { Image } from "./image"

export class voiture{
    idVoiture!: number
    modele!:string
    coleur!:string
    prix!: number
    relaseDate!:any
    marque!:marque
    idMarque!:number
    nomMarque!:string
    image! : Image
    imageStr!:string
    idImage!:number
    images!: Image[];


}