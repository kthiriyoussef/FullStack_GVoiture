import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { marque } from '../Marque';
import { Input } from '@angular/core';

@Component({
  selector: 'app-update-marque',
  templateUrl: './update-marque.component.html',
  styleUrls: ['./update-marque.component.css']
})
export class UpdateMarqueComponent implements OnInit {
  
  constructor() { }
  @Input()
marques! : marque;
@Output()
marqueUpdated = new EventEmitter<marque>();
@Input()
ajout!:boolean;
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.marques);

  }
  saveMarque(){
    this.marqueUpdated.emit(this.marques);
    }

}
