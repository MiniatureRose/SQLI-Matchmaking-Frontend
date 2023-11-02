import { Component, Injectable } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn: 'root', // Indique que ce service sera un service global
})
export class HeaderComponent {
  
}
