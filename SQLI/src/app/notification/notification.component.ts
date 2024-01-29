import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	cssPrefix = 'toolbar-notification';
  	isOpen: boolean = true;
  	@Input() notifications: any[] =[];
  	
  	constructor(private elementRef: ElementRef, private http: HttpClient) { }

  	ngOnInit() {
  	}

    onMarkAllAsReadClick(){
      const userId = localStorage.getItem('userId');
      const apiUrl = `http://localhost:8081/notification/MAAR?userId=${userId}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(apiUrl, {}, { headers }).subscribe(
        (response) => {
          console.log('notification marked as read');
      },
        error => {
        }
      );
    }

    getUnreadMessages(){
      const unread = this.notifications.filter(notification => notification.isRead === false).length;
      return unread;
    }
}
