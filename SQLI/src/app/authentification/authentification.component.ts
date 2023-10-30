import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})

export class AuthentificationComponent{
  email: string = '';
  password: string = '';
  
  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'URL_DE_VOTRE_API';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data={'email': this.email, 'password': this.password};
    this.http.post(apiUrl, data, { headers }).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
      },
      
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
      }
    );

  }
  
}
