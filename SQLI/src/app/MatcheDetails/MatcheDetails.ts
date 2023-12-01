import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matche-details',
  templateUrl: './MatcheDetails.html',
  styleUrls: ['./MatcheDetails.css']
})
export class MatcheDetails {
  @Input() playersNumber : number = 10;
  matchInfos : {type : string; imageUrl:string} = {type : "foot", imageUrl: "/assets/Matches.svg"}
  complete : boolean = false;

  firstTeam : { color: string; imageUrl: string; }[] = [ ] ;
  secondTeam : { color: string; imageUrl: string; }[] = [ ] ;
  playersInfo : {
    color: string;
    imageUrl: string;
  }[] = [ 
    {color : "#3062C8", imageUrl : "/assets/Player1.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player2.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player3.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player4.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player5.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player6.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player7.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player8.svg"}, 
    {color : "#3062C8", imageUrl : "/assets/Player9.svg"}, 
  ];



  manualChoice() {

  }

  aletoireChice() {
    const players = this.playersInfo.slice(0, this.playersNumber);
    const half = Math.ceil(players.length / 2);

    this.firstTeam = players.slice(0, half).map(player => ({ ...player }));
    this.secondTeam = players.slice(half).map(player => ({ ...player }));

    this.complete=(this.playersNumber<=this.playersInfo.length)

    console.log("fistTeam : " , "$fistTeam")
  }

  automaticChoice() {

  }

}
