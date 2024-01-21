import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getUserData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/id?id=${userId}`);
  }

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

  getPlayersData(matchId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/match/players?matchId=${matchId}`);
  }

  getTeamsData(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/match/teams?matchId=${id}`);
  }

  postAutomaticChoice(matchId: number, userId:number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/match/make/auto?userId=${userId}&matchId=${matchId}&model=even`, {});
  }

  postMakeTeams(matchId: number, userId:number, data:any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/match/make/manual?userId=${userId}&matchId=${matchId}`, data);
  }

  postJoinMatch(data : any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/match/join`, data);
  }

  deleteJoinMatch(matchId: number, userId:number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}match/unjoin?userId=${userId}&matchId=${matchId}`);
  }

  putOpenMatch(matchId: number, userId:number): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/match/pend?userId=${userId}&matchId=${matchId}`, {});
  }

  putCloseMatch(matchId: number, userId:number): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/match/close?userId=${userId}&matchId=${matchId}`, {});
  }

  putdeleteMatch(matchId: number, userId:number): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/match/cancel?userId=${userId}&matchId=${matchId}`, {});
  }

  postRecordScores(userId:number, data : any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/match/record?recorderId=${userId}&model=default`, data);
  }

  putConfirmMatch(matchId: number, userId:number): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/match/confirm?userId=${userId}&matchId=${matchId}`, {});
  }


}