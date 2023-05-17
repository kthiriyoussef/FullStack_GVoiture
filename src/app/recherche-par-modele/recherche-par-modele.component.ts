import { Component, OnInit } from '@angular/core';
import { voiture } from '../voiture';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-recherche-par-modele',
  templateUrl: './recherche-par-modele.component.html',
  styleUrls: ['./recherche-par-modele.component.css']
})
export class RechercheParModeleComponent implements OnInit {
voiture!:voiture[];
allvoitures!:voiture[];
ModeleVoiture!:string;
searchTerm!: string;

  constructor(private voitureService :VoitureService) { }

  ngOnInit(): void {
    this.voitureService.getVoiture().subscribe(voit => {
      console.log(voit);
      this.allvoitures = voit;
      });
  }
  /*rechercherModele(){
    this.voitureService.rechercherParModele(this.ModeleVoiture).
    subscribe(voit => {
    this.voiture = voit;
    console.log(voit)});
    }*/
    onKeyUp(filterText : string){
      this.voiture = this.allvoitures.filter(item =>
      item.modele.toLowerCase().includes(filterText));
      }

}
