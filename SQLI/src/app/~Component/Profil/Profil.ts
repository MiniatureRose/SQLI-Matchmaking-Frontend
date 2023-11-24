import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../SharedService/SharedService';


@Component({
  selector: 'app-profil',
  templateUrl: './Profil.html',
  styleUrls: ['./Profil.css']
})
export class Profil {

  isEditMode = false;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private router:Router, private sharedService: SharedService) {
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    // this.cdr.detectChanges(); // Détecte les changements dans le composant parent
  }

  navigateToMatches() {
      this.sharedService.toggleProfileClicked(false);
      this.router.navigate(['/matches']);
    }

  navigateToHistory() {
    this.sharedService.toggleProfileClicked(false);
    this.router.navigate(['/history']);
  }
  
  navigateToStatistics() {
    this.sharedService.toggleProfileClicked(false);
    this.router.navigate(['/statistics']);
  }
}