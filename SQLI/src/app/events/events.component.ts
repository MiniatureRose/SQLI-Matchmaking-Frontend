import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.GetAllMatches();
    this.GetFilterOptions();
  }

  GetAllMatches() {
    this.http.get<any[]>('http://localhost:8080/match?type=all').subscribe(
      result => {
        result.forEach(match => {
          this.matches.push([match.name , new Date(match.date), match.sport.name, "10", match.noPlayers]);
        });
      },
      error => {
      }
    );
  }

  GetFilterOptions(){
    this.http.get<any[]>('http://localhost:8080/data/sport/all').subscribe(
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
      this.matches.sort((a, b) => a[1].getTime() - b[1].getTime());
    } else if(this.sortOptions.includes('date (descending)')){
      this.matches.sort((a, b) => b[1].getTime() - a[1].getTime());
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

}
