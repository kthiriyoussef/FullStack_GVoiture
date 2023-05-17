import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';
import { marque } from '../Marque';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styleUrls: ['./liste-marques.component.css']
})
export class ListeMarquesComponent implements OnInit {
marques!:marque[];
updatedMarq:marque = {"idMarque":0,"nomMarque":"","paysMarque":""};
ajout:boolean=true;
  constructor(private voitureService:VoitureService) { }

  ngOnInit(): void {
    this.voitureService.listeMarques().subscribe(marqs=>{this.marques=marqs;
    console.log(marqs)})
  }
  marqueUpdated(marq:marque){
    console.log("Marq updated event",marq);
    this.voitureService.ajouterMarque(marq).
     subscribe( ()=> this.chargerMarques());
    }
    chargerMarques(){
      this.voitureService.listeMarques().
      subscribe(marq => {this.marques = marq;
      console.log(marq);
      });
      }
      updateCat(marq:marque) {
        this.updatedMarq=marq;
        this.ajout=false; 
        }


}
