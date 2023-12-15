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
  @Input() name: string | null = '';
  @Input() imageUrl: string | null = '';
  @Input() date: string | null = '';
  @Input() sport: string | null = '';
  @Input() size: number  = 0;
  @Input() nbPlayer: number = 0;

  constructor(private router:Router, private sharedservice:SharedService) { }

  ngOnInit(): void {
  }

  isFull(): boolean {
    return this.size === this.nbPlayer;
  }

  toMatcheDetails() {
    this.sharedservice.toggleMatchClicked(this.idMatch); //TMP
    this.router.navigate(['/matche-details']);
  }


}
