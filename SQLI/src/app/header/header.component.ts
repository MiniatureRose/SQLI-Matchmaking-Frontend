import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../~Component/SharedService/SharedService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  
  isProfileClicked: boolean = false; // Variable pour suivre l'état du clic sur l'image du profil
  isPlusClicked: boolean = false;

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient, private router:Router, private sharedService: SharedService) {  }

  ngOnInit() {
    this.sharedService.isProfileClicked$.subscribe(value => {
      this.isProfileClicked = value;
    });
  }

  // Fonction pour basculer l'état du clic
  toggleProfile() {
    this.isPlusClicked = false;
    // this.isProfileClicked = !this.isProfileClicked;
    this.sharedService.toggleProfileClicked(!this.isProfileClicked);
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
  
  navigateToHome() {
    this.isPlusClicked = false;
    this.isProfileClicked = false;
    this.router.navigate(['/Home']);
  }

  toNewMatch() {
    this.router.navigate(['/NewMatch']);
  }
}
