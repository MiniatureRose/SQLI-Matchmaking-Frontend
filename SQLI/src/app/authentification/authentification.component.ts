import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
// Appelez la méthode pour masquer le Header
  
export class AuthentificationComponent{
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;

  

  constructor(private http: HttpClient, private router:Router) {
  }


 
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    const apiUrl = 'http://localhost:8080/auth/signin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data={'email': this.email, 'password': this.password};
    console.log(data);
    
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
