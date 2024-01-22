import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	cssPrefix = 'toolbar-notification';
  isOpen: boolean = true;
  @Input() notifications: any[] =[];
    	
  constructor(private elementRef: ElementRef) { }
  
  ngOnInit() {
    console.log(this.notifications);
  }
  select() {
  	
  	}
    
}
