import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SharedService } from '../~Component/SharedService/SharedService';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatchService } from '../services/match.service';



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
  
  score : boolean = false;
  type : string = "";
  // matchData: {id:number, noPlayers:number, sportName:string, location:string, pending:boolean, confirmed: boolean, canceled: boolean} = {id : 1, noPlayers:10, sportName:"", location:"", pending:false , confirmed: false, canceled: false};
  // firstTeamTmp : { id: number; firstName: string; lastName: string; profileImage: string; }[] = [ ] ;
  // secondTeamTmp : { id: number; firstName: string; lastName: string; profileImage: string; }[] = [ ] ;
  // playersInfo : { id: number; firstName: string; lastName: string; profileImage: string;
  // }[] = [ 
  //   { id:11, firstName: "string", lastName: "string", profileImage : "/assets/Player1.svg"}, 
  //   { id:12, firstName: "string", lastName: "string", profileImage : "/assets/Player1.svg"}, 
  //   { id:13, firstName: "string", lastName: "string", profileImage : "/assets/Player2.svg"}, 
  //   { id:14, firstName: "string", lastName: "string", profileImage : "/assets/Player3.svg"}, 
  //   { id:15, firstName: "string", lastName: "string", profileImage : "/assets/Player4.svg"}, 
  //   { id:16, firstName: "string", lastName: "string", profileImage : "/assets/Player5.svg"}, 
  //   { id:17, firstName: "string", lastName: "string", profileImage : "/assets/Player6.svg"}, 
  //   { id:18, firstName: "string", lastName: "string", profileImage : "/assets/Player7.svg"}, 
  //   { id:19, firstName: "string", lastName: "string", profileImage : "/assets/Player8.svg"}, 
  //   { id:20, firstName: "string", lastName: "string", profileImage : "/assets/Player9.svg"}, 
  // ];
  matchData: any = {};
  playersInfo : any[] = [ ] ;
  firstTeamTmp : any[] = [ ] ;
  secondTeamTmp :any[] = [ ] ;
  
  
  constructor(private sharedservice:SharedService,private matchService: MatchService, private http: HttpClient) { }
  
  ngOnInit() {
    // Récupération de idMatch du localStorage
    const storedIdMatch = localStorage.getItem('idMatch');
    if (storedIdMatch) {
      this.idMatch = Number(storedIdMatch);
      this.getPlayersData(); // Appeler pour initialiser les données avec la nouvelle idMatch
      this.getMatchData(this.idMatch);
      this.getTeamsData(this.idMatch);
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
    this.matchService.getMatchDetails(id).subscribe((response: any) => {
      this.matchData = {
        id: response.id,
        noPlayers: response.noPlayers,
        sportName: response.sport.name,
        location: response.field.location,
        pending: response.status=="PENDING", 
        confirmed: response.status=="CONFIRMED", 
        canceled: response.status=="CANCELED"
        
      };
      console.log('Réponse du serveur :', this.matchData);
    },
    (error) => {
      console.error('Erreur lors de la requête GET :', error);
    });

  }

  getTeamsData(id: number) {
    const apiUrl = `http://localhost:8081/match/teams?matchId=${id}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.length==2){
          console.log(response);
          this.firstTeamTmp = response[0].players.map((player: any) => ({
            id : player.id,
            firstName: player.firstName, 
            lastName: player.lastName, 
            profileImage : player.profileImage
          }));
          this.secondTeamTmp = response[1].players.map((player: any) => ({
            id : player.id,
            firstName: player.firstName, 
            lastName: player.lastName, 
            profileImage : player.profileImage
          }));
        }
      
        console.log('Réponse du serveur :', this.matchData);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      }
    );
  }


  


  manualChoice() {
    //TMP
    this.firstTeamTmp=[];
    this.secondTeamTmp=[];
    
    this.type = "manual";
  }

  randomChoice() {
    this.type = "random";
      
    let players = this.playersInfo.slice(0, this.matchData.noPlayers);
  
      // Mélange aléatoire des joueurs
      for (let i = players.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [players[i], players[j]] = [players[j], players[i]];
      }
    
      const half = Math.ceil(players.length / 2);
    
      this.firstTeamTmp = players.slice(0, half);
      this.secondTeamTmp = players.slice(half);
    
    
      console.log("firstTeam : ", this.firstTeamTmp);

  }
  
  automaticChoice() {
    //this.confirmMatch();
    this.type = "auto";
  }

  
  confirmMatch() {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
    const matchId = localStorage.getItem('idMatch'); // Retrieve user ID from storage

    this.makeTeams();
    const apiUrl = `http://localhost:8081/match/confirm?userId=${userId}&matchId=${matchId}`;
    return this.http.put(apiUrl, {}).subscribe(
      (response) => {
            // TMP
        this.getMatchData(Number(matchId));
        // this.getTeamsData(Number(matchId));

        console.log('Match confirmé avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la confirmation du match :', error);
        // Gestion de l'erreur
      }
    );
  }
  
  makeTeams() {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
    const matchId = localStorage.getItem('idMatch'); // Retrieve user ID from storage

    const data = [
      {"teamName": "Team1", "playersIds": this.firstTeamTmp.map(player=>player.id) },
      {"teamName": "Team2", "playersIds": this.secondTeamTmp.map(player=>player.id) },
  ];
    const apiUrlMake = `http://localhost:8081/match/make/manual?userId=${userId}&matchId=${matchId}`;
    this.http.post(apiUrlMake, data).subscribe(
        (response) => {
            console.log('Match make avec succès :', response);
            this.getMatchData(Number(matchId));
        },
        (error) => {
            console.error('Erreur lors du make du match :', error);
        }
    );
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
  }

  unjoinMatch() {
    const userId = localStorage.getItem('userId');
    const apiUrl = `http://localhost:8081/match/unjoin?userId=${userId}&matchId=${this.idMatch}`;
    this.http.delete(apiUrl).subscribe(
        (response) => {
            console.log('Réponse du serveur :', response);
            this.getPlayersData();
        },
        (error) => {
            console.error('Erreur lors de la requête DELETE :', error);
        }
    );
}


  isIn() {
    const userId = localStorage.getItem('userId');
    const numericUserId = userId !== null ? Number(userId) : null;

    return this.playersInfo.some(player => player.id === numericUserId);
}



  // TMP idOrganiser in localstorage
  isOrganiser() {
    const userId = localStorage.getItem('userId');
    const organiserId = localStorage.getItem('idOrganiser');
    return(userId===organiserId)
  }

  deleteMatch(){
    const userId = localStorage.getItem('userId');

    const apiUrl = `http://localhost:8081/match/cancel?userId=${userId}&matchId=${this.idMatch}`;
    this.http.put(apiUrl, {}).subscribe(
        (response) => {
            console.log('Réponse du serveur :', response);
            this.getMatchData(this.idMatch);
            // this.getPlayersData(); // Mise à jour des données après désinscription
        },
        (error) => {
            console.error('Erreur lors de la requête post :', error);
        }
    );
  
  }

  changeTeams(){
    // status --> PENDING
  }

  recordScores(){

  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
