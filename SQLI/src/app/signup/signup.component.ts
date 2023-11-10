import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isPasswordVisible: boolean = false;
  Nom: String = '';
  Prenom: String = '';
  Phone: String = '';
  Email: String = '';
  Password: String = '';

  constructor(private http: HttpClient, private router:Router) {
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    const apiUrl = 'http://localhost:8080/auth/signup';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data={'firstname': this.Prenom, 'lastname': this.Nom,'email': this.Email,'phone' : this.Phone, 'password': this.Password};
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