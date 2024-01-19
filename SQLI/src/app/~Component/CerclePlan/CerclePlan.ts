import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cercle-plan',
  templateUrl: './CerclePlan.html',
  styleUrls: ['./CerclePlan.css']
})
export class CerclePlanComponent {
  @Input() playersNumber : number = 7;
  @Input() rank : number = 1000;
  @Input() playersInfo : {
    //color: string;
    firstName : string;
    lastName : string;
    rank : number;
    profileImage: string;
  }[] = [ 
  ];
}
