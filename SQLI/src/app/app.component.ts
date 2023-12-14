import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { PopupService } from './popup.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SQLI';
  showHeader = true;
  showFooter = true;

  constructor(private modalService: NgbModal, private router: Router, private popupService: PopupService) {} 

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  openPopup() {
    this.popupService.openPopup();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/Authentification' || event.url === '/signup' ) { 
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }
}
