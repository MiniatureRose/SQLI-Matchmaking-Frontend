import { HttpClient } from '@angular/common/http';
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

  ngOnInit() {
    // Appelez la méthode pour masquer le Header dans ngOnInit
  }

 
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.router.navigate(['/events']);
    /*
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
*/
  }
  
}
