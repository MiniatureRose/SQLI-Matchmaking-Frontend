import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getMyMatches(userId: string): Observable<any[]> {
    const matches = this.http.get<any[]>(`${this.apiUrl}/match/mymatches?type=coming&user=${userId}`);
    console.log(matches)
    return matches
  }

  getSuggestedMatches(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/match?type=coming`);
  }

  getMatchDetails(matchId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/match/${matchId}`);
  }
}