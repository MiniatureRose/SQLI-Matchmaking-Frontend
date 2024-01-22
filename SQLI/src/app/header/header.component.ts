import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../~Component/SharedService/SharedService';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileImage: string = "";
  firstName: string = "";
  lastName: string = "";
  role: string = "";
  email: string = "";
  notifications: any[] = [];

  isProfileClicked: boolean = false;
  isPlusClicked: boolean = false;
  isNotifClicked: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getUserInfos();
    this.sharedService.isProfileClicked$.subscribe(value => {
      this.isProfileClicked = value;
    });

    this.notificationService.notifications.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  toggleProfile() {
    this.isPlusClicked = false;
    this.isNotifClicked = false;
    this.sharedService.toggleProfileClicked(!this.isProfileClicked);
  }

  togglePlus() {
    this.isProfileClicked = false;
    this.isNotifClicked = false;
    this.isPlusClicked = !this.isPlusClicked;
  }

  toggleNotif() {
    this.isProfileClicked = false;
    this.isNotifClicked = !this.isNotifClicked;
    this.isPlusClicked = false;
    console.log(this.notifications);
    this.notifications.forEach(notification=>{
      console.log(notification.message);
      console.log(notification.dateCreated);
    });
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

  getUserInfos() {
    if (this.firstName === "" && this.lastName === "" && this.profileImage === "") {
      const userId = localStorage.getItem('userId');
      const apiUrl = 'http://localhost:8081';
      const current_user = this.http.get<any>(`${apiUrl}/data/user?id=${userId}`);
      current_user.subscribe(result => {
        console.log(result);
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.profileImage = result.profileImage;
        this.role = result.role;
        this.email = result.email;
        console.log(result.email);
      })
    }
  }

  getUnreadMessages(){
    const unread = this.notifications.filter(notification => !notification.read).length;
    return unread;
  }
}
