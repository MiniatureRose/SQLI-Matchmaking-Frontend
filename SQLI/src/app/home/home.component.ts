import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myMatches: any[] = [];
  suggestedMatches: any[] = [];
  canceledMatches: any[] = [];

  constructor(private matchService: MatchService, private router:Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      this.loadMatches(userId);
    }
    else{
      this.router.navigate(['/Authentification']);
    }
  }

  private loadMatches(userId: string) {
    this.matchService.getMyMatches(userId).subscribe(matches => {
      this.myMatches = matches.filter(match=>match.status !== 'CANCELED');
    });
    

    this.matchService.getSuggestedMatches(userId).subscribe(matches => {
      this.suggestedMatches = matches;
    });

    this.matchService.getCanceledMatches().subscribe(matches => {
      this.canceledMatches = matches;
    });

    console.log(this.myMatches);
    console.log(this.suggestedMatches);
  }
}
