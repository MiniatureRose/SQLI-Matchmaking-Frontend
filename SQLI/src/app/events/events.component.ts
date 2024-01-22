import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  matches: any[] = []; 
  sportVisibility: {[key: string]: boolean} = {};
  selectedOptions: string[] = [];
  FilterOptions: any[] = [];
  TrieOptions: string[] = [];
  sortOptions: string[] = [];
  showIncompleteOnly: boolean = false;
  startDate: string = "";
  endDate: string = "";

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      this.GetAllMatches();
      this.GetFilterOptions();
    }
    else{
      this.router.navigate(['/Authentification']);
    }
  }

  GetAllMatches() {
    this.http.get<any[]>('http://localhost:8081/match?type=all').subscribe(
      result => {
        result.forEach(match => {
          this.matches.push([match.match.id, match.match.organizer.id, match.match.name , match.match.date, match.match.sport.name, match.curPlayers.toString(), match.match.noPlayers, match.match.organizer.profileImage, match.match.organizer.firstName, match.match.organizer.lastName, match.match.status, match.teams[0]?.score, match.teams[1]?.score]);
        });
      },
      error => {
      }
    );
  }

  GetFilterOptions(){
    this.http.get<any[]>('http://localhost:8081/sport/all').subscribe(
      result => {
        result.forEach(sport => {
          this.FilterOptions.push(sport.name);
          this.sportVisibility[sport.name] = true; 
        });
      },
      error => {
      }
    );
  }

  onOptionSelected(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index > -1) {
      this.selectedOptions.splice(index, 1); 
    } else {
      this.selectedOptions.push(option); 
    }
    this.FilterOnSport();
  }

  FilterOnSport() {
    if (this.selectedOptions.length === 0) {
      Object.keys(this.sportVisibility).forEach(sport => {
        this.sportVisibility[sport] = true;
      });
    } else {
      Object.keys(this.sportVisibility).forEach(sport => {
        this.sportVisibility[sport] = this.selectedOptions.includes(sport);
      });
    }
  }

  sortMatches() {
    if (this.sortOptions.includes('date (ascending)')) {
      this.matches.sort((a, b) => new Date(a[3]).getTime() - new Date(b[3]).getTime());
    } else if(this.sortOptions.includes('date (descending)')){
      this.matches.sort((a, b) => new Date(b[3]).getTime() - new Date(a[3]).getTime());
    }
  }

  onSortOptionSelected(option: string) {
    const isDateSorting = option.startsWith('date');
    if (isDateSorting) {
      const otherDateOption = option === 'date (ascending)' ? 'date (descending)' : 'date (ascending)';
      const otherIndex = this.sortOptions.indexOf(otherDateOption);
      if (otherIndex > -1) {
        this.sortOptions.splice(otherIndex, 1);
      }
    }
    const index = this.sortOptions.indexOf(option);
    if (index === -1) {
      this.sortOptions.push(option);

    } else {
      this.sortOptions.splice(index, 1); 
    }
    if(option === 'incomplete'){
      this.toggleIncompleteMatches();
    }
    else{
      this.sortMatches();
    }
  }

  toggleIncompleteMatches() {
    this.showIncompleteOnly = !this.showIncompleteOnly;
  }

  isMatchIncomplete(match: any): boolean {
    return match[4] < 10; 
  }
  
  ShowMatch(sport: string, match: any): boolean {
    let sportCondition = this.selectedOptions.length === 0 || this.selectedOptions.includes(sport);
    let incompleteCondition = !this.showIncompleteOnly || this.isMatchIncomplete(match);
  
    return sportCondition && incompleteCondition;
  }

  setDebutFinDates(){
    console.log("Date de début:", this.startDate);
    console.log("Date de fin:", this.endDate);
  }
}
