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
  profileImage: string ="";
  firstName:string ="";
  lastName:string="";
  role:string="";
  email:string="";
  user: any[] = []; 

  
  isProfileClicked: boolean = false; 
  isPlusClicked: boolean = false;

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient, private router:Router, private sharedService: SharedService) {  }

  ngOnInit() {
    this.getUserInfos();
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

  getUserInfos(){
    if(this.firstName === "" && this.lastName === "" && this.profileImage=== ""){
      const userId = localStorage.getItem('userId'); 
      const apiUrl = 'http://localhost:8081';
      const current_user = this.http.get<any>(`${apiUrl}/user/id?id=${userId}`); 
      current_user.subscribe(result=>{
        console.log(result);
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.profileImage= result.profileImage;
        this.role = result.role;
        this.email = result.email;
        console.log(result.email);
      })
    }
  }

  logOutUser() {
    localStorage.clear();
    // window.location.reload();
    window.location.href = 'http://localhost:4200/Authentification';

  }
}
