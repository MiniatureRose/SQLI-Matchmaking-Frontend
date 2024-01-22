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
  @Input() score1 : number = 0;
  @Input() score2 : number = 0;

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
    localStorage.setItem('matchId', this.idMatch.toString());
    localStorage.setItem('organiserId', this.idOrganiser.toString());
    this.router.navigate(['/matche-details']);
  }
}
