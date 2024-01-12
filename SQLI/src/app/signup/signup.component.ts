import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isPasswordVisible: boolean = false;
  signupForm: FormGroup;
  phonePattern: RegExp = /^\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/;
  emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  emailexists?: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router, private cdRef: ChangeDetectorRef,private popupService: PopupService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      profile_image : ['', ],
      role : ['user', ]
    });
  }

  togglePasswordVisibility() {
    this.popupService.openPopup();

    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get formControls() {
    return this.signupForm.controls;
  }

  Emailexists(){
    return this.emailexists;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const apiUrl = 'http://localhost:8081/create/user';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const data = this.signupForm.value;

      console.log('Données du formulaire envoyées :', data);

      this.http.post(apiUrl, data, { headers }).subscribe(
        (response: ServerResponse) => {
          console.log('Réponse du serveur :', response.message);
          if(response.message === "Email is already taken!"){
            console.log('allo');
            this.emailexists = true;
            console.log('emailexists mis à jour :', this.emailexists);
            this.cdRef.detectChanges();
          }
          else{
            //this.router.navigate(['/Authentification']);
            this.popupService.openPopup();
          }
        },
        (error) => {
          console.error('Erreur lors de la requête POST :', error);
        }
      );
    } else {
      console.log('Le formulaire contient des erreurs');
    }
  }
}

interface ServerResponse {
  success?: boolean;
  message?: string;
}