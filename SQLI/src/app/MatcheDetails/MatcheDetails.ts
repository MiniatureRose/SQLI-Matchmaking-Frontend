import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SharedService } from '../~Component/SharedService/SharedService';

@Component({
  selector: 'app-matche-details',
  templateUrl: './MatcheDetails.html',
  styleUrls: ['./MatcheDetails.css']
})
export class MatcheDetails {
  @Input() idMatch : number = 2;
  @Input() playersNumber : number = 10;
  matchInfos : {type : string; imageUrl:string} = {type : "foot", imageUrl: "/assets/Matches.svg"}
  complete : boolean = false;

  firstTeam : { profileImage: string; }[] = [ ] ;
  secondTeam : { profileImage: string; }[] = [ ] ;
  playersInfo : {
    // color: string;
    id: number;

    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    profileImage: string;
    role: string

  }[] = [ 
    // {profileImage : "/assets/Player1.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player2.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player3.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player4.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player5.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player6.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player7.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player8.svg"}, 
    // {color : "#3062C8", profileImage : "/assets/Player9.svg"}, 
  ];

  constructor(private sharedservice:SharedService, private http: HttpClient) { }
  ngOnInit(){
    this.sharedservice.idMatch$.subscribe(value=>{
      this.idMatch=value;
      console.log(value);
      
      ///////
      const apiUrl = `http://localhost:8081/data/match/${this.idMatch}/users`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      

      this.http.get<any>(apiUrl, { headers }).subscribe(
        (response) => {
          this.playersInfo = response;
          console.log('Réponse du serveur :', response);
        },
        (error) => {
          console.error('Erreur lors de la requête POST :', error);
        }
      );
      ///////



      // this.playersInfo = [{profileImage : "/assets/Player1.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player7.svg"}, 
      // {profileImage : "/assets/Player2.svg"}]
    })

    // if(this.playersInfo.length>1) {
    //   this.complete=(true)
    // }

  }


  manualChoice() {

  }

  aletoireChoice() {
    const players = this.playersInfo.slice(0, this.playersNumber);
    const half = Math.ceil(players.length / 2);

    this.firstTeam = players.slice(0, half).map(player => ({ ...player }));
    this.secondTeam = players.slice(half).map(player => ({ ...player }));

    this.complete=(this.playersNumber<=this.playersInfo.length)

    console.log("fistTeam : " , "$fistTeam")
  }

  automaticChoice() {

  }

  registerMatch() {
    const apiUrl = 'http://localhost:8081/create/matchuser';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      const userId = localStorage.getItem('userId'); // Retrieve user ID from storage

      const data = {
        "user_id": userId,
        "match_id": this.idMatch
      };
      this.http.post(apiUrl, data, { headers }).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
        },
        (error) => {
          console.error('Erreur lors de la requête POST :', error);
        }
      );


      // update users list 
  }

}
