import { Component, OnInit } from '@angular/core';
import { voiture } from '../voiture';
import { marque } from '../Marque';
import { Image } from '../image';
import { VoitureService } from '../voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.css']
})
export class AddVoitureComponent implements OnInit {
newvoiture=new voiture();
marques:marque[]=[];
idMar!:number;
uploadedImage!: File;
imagePath: any;
  constructor(private voitureService :VoitureService,
    private activatedRoute: ActivatedRoute,
    private router :Router,) { }

  ngOnInit(): void {
    this.voitureService.listeMarques().
subscribe(marqs => {this.marques = marqs;
  
console.log(marqs);
  })}
  addVoiture(){
    this.voitureService
.uploadImage(this.uploadedImage, this.uploadedImage.name)
.subscribe((img: Image) => {
this.newvoiture.image=img;
this.newvoiture.marque = this.marques.find(marqs => marqs.idMarque == this.newvoiture.idMarque)!;
this.voitureService
.addVoiture(this.newvoiture)
.subscribe(() => {
this.router.navigate(['Voitures']);
});
});

  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }


}
