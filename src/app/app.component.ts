import { Component } from '@angular/core';
import { VoitureService } from './voiture.service';
import { voiture } from './voiture';


import { marque } from './Marque';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionvoiture';
 
  
  
  constructor(public authService: AuthService,
    private router :Router){};
  ngOnInit(): void {
    this.authService.loadToken();
if (this.authService.getToken()==null ||
 this.authService.isTokenExpired())
this.router.navigate(['/login']);

  }
  onLogout(){
    this.authService.logout();
  }
 
  
    
    
}
