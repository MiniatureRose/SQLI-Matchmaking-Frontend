import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getMyMatches(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/matchuser?type=coming&user=${userId}`);
  }

  getSuggestedMatches(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/match?type=coming`);
  }
}
