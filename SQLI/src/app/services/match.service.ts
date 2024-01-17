import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getMyMatches(userId: string): Observable<any[]> {
    const matches = this.http.get<any[]>(`${this.apiUrl}/match?type=coming&userId=${userId}&myMatches=true`);
    console.log(matches)
    return matches
  }

  getSuggestedMatches(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/match?type=coming&userId=${userId}&myMatches=false`);
  }

  getMatchDetails(matchId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/match/id?matchId=${matchId}`);
  }

  
}