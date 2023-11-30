import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cercle-plan',
  templateUrl: './CerclePlan.html',
  styleUrls: ['./CerclePlan.css']
})
export class CerclePlanComponent {
  @Input() playersNumber : number = 10;
  @Input() playersInfo : {
    color: string;
    imageUrl: string;
  }[] = [ 
  ];
}
