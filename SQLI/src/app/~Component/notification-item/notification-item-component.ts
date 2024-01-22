import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item-component.html',
  styleUrls: ['./notification-item-component.css']
})
export class NotificationItemComponent implements OnInit {
  isdeleted : boolean = false;
  @Input() notification : any ;
  isread: boolean = false;


  constructor(private elementRef: ElementRef, private http: HttpClient) {
   }

  ngOnInit(): void {
    if (this.notification) {
      this.isread = this.notification.read;
    }
  }

  onNotificationClick(){
    if (!this.notification.read){
      this.isread = true;
      const apiUrl = `http://localhost:8081/notifications/MAR?notificationId=${this.notification.id}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(apiUrl, {}, { headers }).subscribe(
        (response) => {
          console.log('notification marked as read');
      },
        error => {
        }
      );
    }
  }

  Ondeleteclick(){
    this.isdeleted = true;
    const apiUrl = `http://localhost:8081/notifications/deleteNotification?notificationId=${this.notification.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiUrl, {}, { headers }).subscribe(
      (response) => {
        console.log('notification deleted');
    },
      error => {
      }
    );
  }
}
