import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service'; // Update this path according to your project structure

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myMatches: any[] = [];
  suggestedMatches: any[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
    if (userId) {
      this.loadMatches(userId);
    }
  }

  private loadMatches(userId: string) {
    this.matchService.getMyMatches(userId).subscribe(matches => {
      this.myMatches = this.processMatchData(matches);
    });

    this.matchService.getSuggestedMatches(userId).subscribe(matches => {
      this.suggestedMatches = this.processMatchData(matches);
    });
  }

  private processMatchData(matches: any[]): any[] {
    return matches.map(match => ({
        ...match,
        organizerName: match.organizer?.firstName + ' ' + match.organizer?.lastName,
        profileImageUrl: match.organizer?.profileImage || 'assets/Salim.svg', // Default image if null
        capacity: match.noPlayers,
        sportName: match.sport?.name,
        matchDate: match.date,
        matchDuration: match.duration,
        registeredPlayers: match.noPlayers
    }));
  }
}
