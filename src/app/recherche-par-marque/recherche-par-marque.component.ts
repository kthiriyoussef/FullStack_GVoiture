import { Component, OnInit } from '@angular/core';
import { voiture } from '../voiture';
import { marque } from '../Marque';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styleUrls: ['./recherche-par-marque.component.css']
})
export class RechercheParMarqueComponent implements OnInit {
  voiture! : voiture[];
  IdMarque! : number;
  marques! : marque[];
  constructor(private voitureService :VoitureService) { }

  ngOnInit(): void {
    this.voitureService.listeMarques().
subscribe(marqs => {this.marques = marqs
console.log(marqs);
});
  }
  onChange() {
    this.voitureService.rechercherParMarque(this.IdMarque).
    subscribe(voit =>{this.voiture=voit});
    }

}
