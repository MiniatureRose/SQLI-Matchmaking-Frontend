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
  private _matchId: number = 2;
  @Input() set matchId(value: number) {
    this._matchId = value;
    localStorage.setItem('matchId', value.toString());
  }
  get matchId(): number {
    return this._matchId;
  }
  
  userId: number = 0;
  score : boolean = false;
  type : string = "";
  matchData: any = {};
  playersInfo : any[] = [ ] ;
  teams : any[] = [];
  isAdmin: boolean = false; 


  constructor(private sharedservice:SharedService,private matchService: MatchService, private http: HttpClient) { }
  
  ngOnInit() {
    const storedMatchId = localStorage.getItem('matchId');
    const storedUserId = localStorage.getItem('userId');
    if (storedMatchId && storedUserId ) {
      this.matchId = Number(storedMatchId);
      this.userId = Number(storedUserId);
      this.checkAdmin();
      this.getPlayersData();
      this.getMatchData(this.matchId);
      this.getTeamsData(this.matchId);
    } else {
      console.error("Aucun idMatch trouvé dans le localStorage");
    }
  }


  /*****************  Get data *****************/
  getPlayersData() {
    this.matchService.getPlayersData(this.matchId).subscribe(
      (response: any) => {
        this.playersInfo = response;
        console.log('Réponse du serveur :', response);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      }
    );
  }

  getMatchData(id: number) {
    this.matchService.getMatchDetails(id).subscribe(
      (response: any) => {
        this.matchData = {
          id: response.match.id,
          noPlayers: response.match.noPlayers,
          sportName: response.match.sport.name,
          location: response.match.field.location,
          status: response.match.status,
        };
        console.log('Réponse du serveur :', this.matchData);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      });

  }

  getTeamsData(id: number) {
    this.matchService.getTeamsData(this.matchId).subscribe(
      (response: any) => {
        this.teams=response;      
        console.log('Réponse du serveur :', this.teams);
      },
      (error) => {
        console.error('Erreur lors de la requête GET :', error);
      }
    );
  }
  

  /*****************  Type of Team Choice *****************/
  manualChoice() {
    //TMP
    this.teams=[];
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
      this.teams=[{players:players.slice(0, half)},{players:players.slice(half)} ]
  }
  
  automaticChoice() {
    this.type = "auto";

    this.matchService.postAutomaticChoice(this.matchId, this.userId).subscribe(
      (response: any) => {
        this.getTeamsData(this.matchId);

        console.log('Match confirmé avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la confirmation du match :', error);
      }
    );

  }
  

  /*****************  Join and unjoin Match *****************/
  joinMatch() {
    const data = {
      "userId": this.userId,
      "matchId": this.matchId
    };
    this.matchService.postJoinMatch(data).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        this.getPlayersData();
      },
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
      }
    );
  }

  unjoinMatch() {
    this.matchService.deleteJoinMatch(this.matchId, this.userId).subscribe(
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
    const numericUserId = this.userId !== null ? this.userId : null;

    return this.playersInfo.some(player => player.id === numericUserId);
}


  /*****************  User role *****************/
  // TMP organiserId in localstorage
  isOrganiser() {
    const organiserId = localStorage.getItem('organiserId');
    return(this.userId===Number(organiserId))
  }

  checkAdmin() { 
    this.matchService.getUserData(this.userId).subscribe(
      (response: any) => {
        this.isAdmin = response.role === "ADMIN";
      },
      (error) => {
        console.error('Erreur lors de la requête get :', error);
      }  
    );
  }

  /*****************  change the match status *****************/
  openMatch(){
    this.matchService.putOpenMatch(this.matchId, this.userId).subscribe(
      (response) => {
        this.getMatchData(this.matchId);
        console.log('Match ouvet avec succès :', response);
      },
      (error) => {
        console.error("Erreur lors de l'ouverture du match :", error);
      }
    );
  }
  
  closeMatch(){
    this.matchService.putCloseMatch(this.matchId, this.userId).subscribe(
      (response) => {
        this.getMatchData(this.matchId);
        console.log('Match fermé avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la fermeture du match :', error);
      }
    );
  }

  deleteMatch(){
    this.matchService.putdeleteMatch(this.matchId, this.userId).subscribe(
        (response) => {
            console.log('Réponse du serveur :', response);
            this.getMatchData(this.matchId);
        },
        (error) => {
            console.error('Erreur lors de la requête post :', error);
        }
    );
  
  }
  
  // TMP
  makeTeams() {
    const data = [
      {"teamName": "Team1", "playersIds": this.teams[0].players.map((player:any)=>player.id) },
      {"teamName": "Team2", "playersIds": this.teams[1].players.map((player:any)=>player.id) },
    ];

    this.matchService.postMakeTeams(this.matchId, this.userId, data).subscribe(
      (response: any) => {
    
          console.log('Match make avec succès :', response);
  
          this.matchService.putConfirmMatch(this.matchId, this.userId).subscribe(
            (response) => {
              this.getMatchData(this.matchId);
              this.getTeamsData(this.matchId);
              console.log('Match confirmé avec succès :', response);
            },
            (error) => {
              console.error('Erreur lors de la confirmation du match :', error);
            }
          );
        },
        (error) => {
            console.error('Erreur lors du make du match :', error);
            this.matchService.putConfirmMatch(this.matchId, this.userId).subscribe(
              (response) => {
                this.getMatchData(this.matchId);
                this.getTeamsData(this.matchId);
                console.log('Match confirmé avec succès :', response);
              },
              (error) => {
                console.error('Erreur lors de la confirmation du match :', error);
              }
            );
        }
    );
  }

  confirmMatch() {
    this.makeTeams();
    //TMP
    this.getMatchData(this.matchId);

  }

  recordScores(){
    const data = [
      {"teamId": this.teams[0].id, "score": this.teams[0].score },
      {"teamId": this.teams[1].id, "score": this.teams[1].score },
    ];
    this.matchService.postRecordScores(this.userId, data).subscribe(
      (response) => {
          this.getMatchData(this.matchId);
          window.location.reload();
      },
      (error) => {
          console.error('Erreur lors de la saisie du score du match :', error);
      }
    );
  }


  changeTeams(){
    this.openMatch();
    this.closeMatch();
  }

  /*****************  ... *****************/

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

  averageEloEquipe(equipe: any[]): number {
    if (equipe.length === 0) {
      return 0;
    }
  
    const sommeDesRanks = equipe.reduce((somme, joueur) => somme + joueur.rank, 0);
    const moyenne = sommeDesRanks / equipe.length;
  
    return moyenne;
  }

}
