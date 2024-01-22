import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ApiResponse {
  message: string;
  userId: string;
}

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
  
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
    const apiUrl = 'http://localhost:8081/auth/signin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data={'email': this.email, 'password': this.password};
    console.log(data);
    
    this.http.post<ApiResponse>(apiUrl, data, { headers }).subscribe(
      (response) => {
        if (response && response.message === 'User signed in successfully!') {
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/Home']);
        }
      },
      
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
      }
    );
  }
  
}
