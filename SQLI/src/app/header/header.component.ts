import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private http: HttpClient, private router:Router) {
  }
  
  isProfileClicked: boolean = false; // Variable pour suivre l'état du clic sur l'image du profil
  isPlusClicked: boolean = false;

  // Fonction pour basculer l'état du clic
  toggleProfile() {
    this.isPlusClicked = false;
    this.isProfileClicked = !this.isProfileClicked;
  }
  togglePlus() {
    this.isProfileClicked = false;
    this.isPlusClicked = !this.isPlusClicked;
  }

  navigateToEvent() {
    this.isPlusClicked = false;
    this.isProfileClicked = false;
    this.router.navigate(['/Events']);
  }

}
