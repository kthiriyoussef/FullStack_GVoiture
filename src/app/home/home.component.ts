import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';
import { voiture } from '../voiture';
import { Image } from '../image';

import { marque } from '../Marque';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  voiture :voiture[]=[];
  idMar!:number;
  marque: marque[]=[];
  p: number = 1;
  filterterm!:string;
  constructor(private voitureService :VoitureService,
    public authService: AuthService){};

  ngOnInit(): void {
    this.voitureService.getVoiture().subscribe((voitu => {
      console.log(voitu);
      this.voiture = voitu;
      this.voiture.forEach((voit) => {
        this.voitureService
        .getImagesVoit(voit.idVoiture)
        .subscribe((img: Image) => {
        voit.imageStr = 'data:' + voit.images[0].type + ';base64,' + voit.images[0].image;});
      })
      }));
      this.voitureService.listeMarques().subscribe((marq=>{
        console.log(marq);
        this.marque=marq;
      }))
      
    }
    
    confirmDelete(id: number) {
      if (confirm('Are you sure you want to delete this Voiture?')) {
        this.voitureService.deleteVoiture(id).subscribe(() => {
          console.log('Object deleted successfully!');
          this.ngOnInit();
        });
      }
    }
  }
