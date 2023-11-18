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
    
    return this.http.get<voiture[]>(this.hostUrl+'/Miniprojet/api/all');
  }
  addVoiture(voiture: voiture):Observable<number> {
    
    return this.http.post<number>(this.hostUrl+'/Miniprojet/api/addVoiture', voiture);
  }
  getVoitureid(id: number): Observable<any> {
    
    return this.http.get<voiture[]>(this.hostUrl+`/Miniprojet/api/getbyid/${id}`);
  }
  updateVoiture( updatedObject: Object): Observable<voiture[]> {
   
    return this.http.put<voiture[]>(this.hostUrl+`/Miniprojet/api/updateVoit`, updatedObject);
  }
  deleteVoiture (id: number){
   
    return this.http.delete(this.hostUrl+`/Miniprojet/api/delVoit/${id}`);
  }
  listeMarques():Observable<marque[]>{
    
    
    return this.http.get<marque[]>(this.hostUrl+"/Miniprojet/api/marque");
    }
    rechercherParMarque(idMar: number):Observable< voiture[]> {
      
      return this.http.get<voiture[]>(this.hostUrl+`/Miniprojet/api/voitMarq/${idMar}`);
      }
      rechercherParModele(modele: String):Observable< voiture[]> {
        
        return this.http.get<voiture[]>(this.hostUrl+`/Miniprojet/api/voitByModel/${modele}`);
        }
  ajouterMarque( marq: marque):Observable<marque>{
    
          return this.http.post<marque>(this.hostUrl+`/Miniprojet/marqrest`, marq);
          }
          uploadImage(file: File, filename: string): Observable<Image>{
            const imageFormData = new FormData();
            imageFormData.append('image', file, filename);
            return this.http.post<Image>(this.hostUrl+`/Miniprojet/api/image/upload`, imageFormData);
            }
            loadImage(id: number): Observable<Image> {
              
              return this.http.get<Image>(this.hostUrl+ `/Miniprojet/api/image/get/info/${id}`);
              }
              uploadImageVoit(file: File, filename: string, idVoit:number): Observable<any>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                
                return this.http.post(this.hostUrl+`/Miniprojet/api/image/uplaodImageVoit/${idVoit}`, imageFormData);
                }
                supprimerImage(id : number) {
                  return this.http.delete(this.hostUrl+`/Miniprojet/api/image/delete/${id}`, httpOptions);
                  }
              getImagesVoit(id:number): Observable<Image>{
                return  this.http.get<Image>(this.hostUrl+ `/Miniprojet/api/image/getImagesVoit/${id}`);
              }
            
            
  
}
