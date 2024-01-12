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
  matchInfos : {imageUrl:string} = { imageUrl: "/assets/Matches.svg"} //TMP
  complete : boolean = false;

  firstTeam : { profileImage: string; }[] = [ ] ;
  secondTeam : { profileImage: string; }[] = [ ] ;
  // playersInfo: { id: number; firstName: string; lastName: string; profileImage: string; }[] = [];

  matchData: {id:number, noPlayers:number, sportName:string, location:string} = {id : 1, noPlayers:10, sportName:"", location:""};
  

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
      this.getMatchData(this.idMatch);
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

  getMatchData(id: number) {
    const apiUrl = `http://localhost:8081/match/id?matchId=${id}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.matchData = {
          id: response.id,
          noPlayers: response.noPlayers,
          sportName: response.sport.name,
          location: response.field.location
          
        };
        console.log('Réponse du serveur :', this.matchData);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      }
    );
  }
  


  manualChoice() {

  }

  aleatoireChoice() {
      let players = this.playersInfo.slice(0, this.playersNumber);
  
      // Mélange aléatoire des joueurs
      for (let i = players.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [players[i], players[j]] = [players[j], players[i]];
      }
    
      const half = Math.ceil(players.length / 2);
    
      this.firstTeam = players.slice(0, half);
      this.secondTeam = players.slice(half);
    
      this.complete = (this.playersNumber <= this.playersInfo.length);
    
      console.log("firstTeam : ", this.firstTeam);
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
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage

    const apiUrl = `http://localhost:8081/match/unjoin?userId=${userId}&matchId=${this.idMatch}`;
    this.http.delete(apiUrl).subscribe(
        (response) => {
            console.log('Réponse du serveur :', response);
            this.getPlayersData(); // Mise à jour des données après désinscription
        },
        (error) => {
            console.error('Erreur lors de la requête DELETE :', error);
        }
    );
}


  isIn() {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
    const numericUserId = userId !== null ? Number(userId) : null;

    return this.playersInfo.some(player => player.id === numericUserId);
}



  // TMP idOrganiser in localstorage
  isOrganiser() {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
    const organiserId = localStorage.getItem('idOrganiser'); // Retrieve user ID from storage
    return(userId===organiserId)
  }

  deleteMatch(){
    //Todo
  }
}
