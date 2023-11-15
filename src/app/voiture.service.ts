import { Injectable } from '@angular/core';
import { voiture } from './voiture';
import { Image } from './image';
import { marque } from './Marque';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} ),

};
@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  hostUrl='http://localhost:8080';
  constructor(private http: HttpClient,private authService:AuthService,) { }
  getVoiture(): Observable<voiture[]>{
    
    return this.http.get<voiture[]>(environment.hostUrl+'/Miniprojet/api/all');
  }
  addVoiture(voiture: voiture) {
    
    return this.http.post(environment.hostUrl+'/Miniprojet/api/addVoit', voiture);
  }
  getVoitureid(id: number): Observable<any> {
    
    return this.http.get<voiture[]>(environment.hostUrl+`/Miniprojet/api/getbyid/${id}`);
  }
  updateVoiture( updatedObject: Object): Observable<voiture[]> {
   
    return this.http.put<voiture[]>(environment.hostUrl+`/Miniprojet/api/updateVoit`, updatedObject);
  }
  deleteVoiture (id: number){
   
    return this.http.delete(environment.hostUrl+`/Miniprojet/api/delVoit/${id}`);
  }
  listeMarques():Observable<marque[]>{
    
    
    return this.http.get<marque[]>(environment.hostUrl+"/Miniprojet/api/marque");
    }
    rechercherParMarque(idMar: number):Observable< voiture[]> {
      
      return this.http.get<voiture[]>(environment.hostUrl+`/Miniprojet/api/voitMarq/${idMar}`);
      }
      rechercherParModele(modele: String):Observable< voiture[]> {
        
        return this.http.get<voiture[]>(environment.hostUrl+`/Miniprojet/api/voitByModel/${modele}`);
        }
  ajouterMarque( marq: marque):Observable<marque>{
    
          return this.http.post<marque>(environment.hostUrl+`/Miniprojet/marqrest`, marq);
          }
          uploadImage(file: File, filename: string): Observable<Image>{
            const imageFormData = new FormData();
            imageFormData.append('image', file, filename);
            return this.http.post<Image>(environment.hostUrl+`/Miniprojet/api/image/upload`, imageFormData);
            }
            loadImage(id: number): Observable<Image> {
              
              return this.http.get<Image>(environment.hostUrl+ `/Miniprojet/api/image/get/info/${id}`);
              }
              uploadImageVoit(file: File, filename: string, idVoit:number): Observable<any>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                
                return this.http.post(environment.hostUrl+`/Miniprojet/api/image/uplaodImageVoit/${idVoit}`, imageFormData);
                }
                supprimerImage(id : number) {
                  return this.http.delete(environment.hostUrl+`/Miniprojet/api/image/delete/${id}`, httpOptions);
                  }
              getImagesVoit(id:number): Observable<Image>{
                return  this.http.get<Image>(environment.hostUrl+ `/Miniprojet/api/image/getImagesVoit/${id}`);
              }
            
  
}
