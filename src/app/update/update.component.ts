import { Component, OnInit } from '@angular/core';
import { voiture } from '../voiture';
import { marque } from '../Marque';
import { VoitureService } from '../voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Image } from '../image';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
voitures!:voiture ;
Marque={
  idMarque:0,
  nomMarque:"",
  paysMarque:""
}
Image={
  idImage:0,
  name:"",
  type :"",
  image: [] 
}
  
/*voitureToUpdate=
  {
  idVoiture:0,
    modele:"",
    coleur:"",
    prix:0,
    relaseDate:'',
    marque:this.Marque,
    idMarque:0,
    nomMarque:"",
    image:this.Image,
    idImage:0,
    
};*/
voitureToUpdate=new voiture();

  updatedMarId: any;
  marques! : marque[];
  marque: marque[]=[];
   idMar:number=0;
   idImg!:number;
   myImage! : string;
   uploadedImage!: File;
isImageUpdated: Boolean=false;
  constructor(private voitureService :VoitureService,
    private activatedRoute: ActivatedRoute,
    private router :Router,) { }

  ngOnInit(): void {
   
    this.voitureService.listeMarques().
    subscribe(marqs => {this.marques = marqs;
    console.log(marqs);
    });

    this.voitureService.getVoitureid(this.activatedRoute.snapshot.params['id']).subscribe(voit =>{this.voitureToUpdate= voit;
    console.log(voit);
      /*this.idImg=voit.idImage;
    
    console.log(this.idImg)
      this.voitureService
    .loadImage(this.idImg)
    .subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
  });*/
} ) ;

    } 
    onImageUpload(event: any) {
      if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
      }
      }
      
      
    
    
    getVoiture(){
      this.voitureToUpdate=this.activatedRoute.snapshot.params['voit'];
    }
  
  updateVoiture(){
    this.voitureToUpdate.marque = this.marques.find(cat => cat.idMarque == this.voitureToUpdate.idMarque)!;
    this.voitureService
.updateVoiture(this.voitureToUpdate)
.subscribe((Voit) => {
this.router.navigate(['Voitures']);
});

}
onAddImageProduit() {
  this.voitureService
  .uploadImageVoit(this.uploadedImage,
  this.uploadedImage.name,this.voitureToUpdate.idVoiture)
  .subscribe( (img : Image) => {
  this.voitureToUpdate.images.push(img);
  });
  }
  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.voitureService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images
    const index = this.voitureToUpdate.images.indexOf(img, 0);
    if (index > -1) {
    this.voitureToUpdate.images.splice(index, 1);
    }
    });
    }
}
