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
  isread : boolean = false;


  constructor(private elementRef: ElementRef, private http: HttpClient) {
   }

  ngOnInit(): void {
    if (this.notification) {
      this.isread = this.notification.isRead;
    }
  }

  onNotificationClick(){
    if (!this.notification.isRead){
      this.isread = true;
      const apiUrl = `http://localhost:8081/notification/MAR?notificationId=${this.notification.id}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(apiUrl, {}, { headers }).subscribe(
        (response) => {
          console.log('notification marked as read');
      },
        error => {
        }
      );
      this.notification.isRead = true;
    }
  }

  Ondeleteclick() {
    this.isdeleted = true;
    const apiUrl = `http://localhost:8081/notification?notificationId=${this.notification.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.delete(apiUrl, { headers }).subscribe(
      response => {
        console.log('notification deleted');
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
  
}
