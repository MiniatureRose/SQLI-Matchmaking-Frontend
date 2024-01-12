import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../~Component/SharedService/SharedService';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  @Input() idMatch: number = 0;
  @Input() idOrganiser: number = 0;
  @Input() name: string = '';
  @Input() imageUrl: string = '';
  @Input() date: string = '';
  @Input() sport: string = '';
  @Input() size: number = 0;
  @Input() nbPlayer: number = 0;

  constructor(private router:Router, private sharedservice:SharedService) { }

  ngOnInit(): void {
  }

  isFull(): boolean {
    return this.size === this.nbPlayer;
  }

  toMatcheDetails() {
    // this.sharedservice.toggleMatchClicked(this.idMatch); //TMP
    localStorage.setItem('idMatch', this.idMatch.toString()); // Stocker dans le localStorage
    localStorage.setItem('idOrganiser', this.idOrganiser.toString()); // Stocker dans le localStorage
    this.router.navigate(['/matche-details']);
  }


}
