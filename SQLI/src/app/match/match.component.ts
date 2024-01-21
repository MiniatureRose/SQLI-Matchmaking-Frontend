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
  
  @Input() status: string = "PENDING";
  @Input() score : any[] = [1, 2];


  // @Input() status: string = "CONFIRMED";
  // @Input() status: string = "CANCELED";

  constructor(private router:Router, private sharedservice:SharedService) { }

  ngOnInit(): void {
  }

  isFull(): boolean {
    return this.size === this.nbPlayer;
  }

  
  isCanceled(): boolean {
    return this.status === "CANCELED";
  }

  toMatcheDetails() {
    // this.sharedservice.toggleMatchClicked(this.idMatch); //TMP
    localStorage.setItem('matchId', this.idMatch.toString()); // Stocker dans le localStorage
    localStorage.setItem('organiserId', this.idOrganiser.toString()); // Stocker dans le localStorage
    this.router.navigate(['/matche-details']);
  }


}
