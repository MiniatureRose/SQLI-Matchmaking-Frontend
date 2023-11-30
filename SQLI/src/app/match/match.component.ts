import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  @Input() name: string = '';
  @Input() imageUrl: string = '';
  @Input() date: string = '';
  @Input() sport: string = '';
  @Input() size: number = 0;
  @Input() nbPlayer: number = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  isFull(): boolean {
    return this.size === this.nbPlayer;
  }

  toMatcheDetails() {
    this.router.navigate(['/matche-details']);
  }


}
