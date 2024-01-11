import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SharedService } from '../~Component/SharedService/SharedService';

@Component({
  selector: 'app-matche-details',
  templateUrl: './MatcheDetails.html',
  styleUrls: ['./MatcheDetails.css']
})
export class MatcheDetails {
  private _idMatch: number = 2;
  @Input() set idMatch(value: number) {
    this._idMatch = value;
    localStorage.setItem('idMatch', value.toString()); // Stocker dans le localStorage
  }
  get idMatch(): number {
    return this._idMatch;
  }
  
  @Input() playersNumber : number = 4;
  matchInfos : {type : string; imageUrl:string} = {type : "foot", imageUrl: "/assets/Matches.svg"}
  complete : boolean = false;

  firstTeam : { profileImage: string; }[] = [ ] ;
  secondTeam : { profileImage: string; }[] = [ ] ;
  // playersInfo: { id: number; firstName: string; lastName: string; profileImage: string; }[] = [];

  
  playersInfo : {
    id: number; firstName: string; lastName: string; profileImage: string;
  }[] = [ 
    { id:11, firstName: "string", lastName: "string", profileImage : "/assets/Player1.svg"}, 
    { id:12, firstName: "string", lastName: "string", profileImage : "/assets/Player1.svg"}, 
    { id:13, firstName: "string", lastName: "string", profileImage : "/assets/Player2.svg"}, 
    { id:14, firstName: "string", lastName: "string", profileImage : "/assets/Player3.svg"}, 
    { id:15, firstName: "string", lastName: "string", profileImage : "/assets/Player4.svg"}, 
    { id:16, firstName: "string", lastName: "string", profileImage : "/assets/Player5.svg"}, 
    { id:17, firstName: "string", lastName: "string", profileImage : "/assets/Player6.svg"}, 
    { id:18, firstName: "string", lastName: "string", profileImage : "/assets/Player7.svg"}, 
    { id:19, firstName: "string", lastName: "string", profileImage : "/assets/Player8.svg"}, 
    { id:20, firstName: "string", lastName: "string", profileImage : "/assets/Player9.svg"}, 
  ];

  constructor(private sharedservice:SharedService, private http: HttpClient) { }
  
  ngOnInit() {
    // Récupération de idMatch du localStorage
    const storedIdMatch = localStorage.getItem('idMatch');
    if (storedIdMatch) {
      this.idMatch = Number(storedIdMatch);
      this.getPlayersData(); // Appeler pour initialiser les données avec la nouvelle idMatch
    } else {
      console.error("Aucun idMatch trouvé dans le localStorage");
      // Gérer le cas où idMatch n'est pas disponible
    }
  }

  getPlayersData() {
    const apiUrl = `http://localhost:8081/match/players?matchId=${this.idMatch}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.playersInfo = response.map((player: any) => ({
          id: player.id,
          firstName: player.firstName,
          lastName: player.lastName,
          profileImage: player.profileImage
        }));
        console.log('Réponse du serveur :', response);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      }
    );
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

  joinMatch() {
    const apiUrl = 'http://localhost:8081/match/join';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      const userId = localStorage.getItem('userId'); // Retrieve user ID from storage

      const data = {
        "userId": userId,
        "matchId": this.idMatch
      };
      this.http.post(apiUrl, data, { headers }).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getPlayersData(); // Mise à jour des données après l'adhésion

        },
        (error) => {
          console.error('Erreur lors de la requête POST :', error);
        }
      );


      // update users list 
  }

  // TMP : post to delete
  unjoinMatch() {
    const apiUrl = 'http://localhost:8081/match/unjoin';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      const userId = localStorage.getItem('userId'); // Retrieve user ID from storage

      const data = {
        "userId": userId,
        "matchId": this.idMatch
      };
      this.http.post(apiUrl, data, { headers }).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getPlayersData(); // Mise à jour des données après l'adhésion

        },
        (error) => {
          console.error('Erreur lors de la requête POST :', error);
        }
      );


      // update users list 
  }

}
