import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddVoitureComponent } from './add-voiture/add-voiture.component';
import {RechercheParMarqueComponent}from'./recherche-par-marque/recherche-par-marque.component';
import { RechercheParModeleComponent } from './recherche-par-modele/recherche-par-modele.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VoitureGuard } from './voiture.guard';
const routes: Routes = [
  {path: "updateVoiture/:id", component: UpdateComponent},
  {path:"Voitures",component: HomeComponent},
  {path:"AddVoiture",component: AddVoitureComponent,canActivate:[VoitureGuard]},
  {path:"RechercheParMarque",component: RechercheParMarqueComponent},
  {path:"RechercheParModele",component: RechercheParModeleComponent},
  {path:"Marques",component:ListeMarquesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
