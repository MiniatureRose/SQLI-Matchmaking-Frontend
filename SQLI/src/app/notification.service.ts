import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081';
  private userId = localStorage.getItem('userId');
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications: Observable<any[]> = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  private startPolling(): void {
    if (this.userId) {
      timer(0, 1000) // toute les secondes
        .pipe(switchMap(() => this.fetchNotifications()))
        .subscribe(
          (notifications) => this.notificationsSubject.next(notifications),
          (error) => console.error('Error fetching notifications:', error)
        );
    } else {
      console.error("User ID not found in localStorage");
    }
  }

  private fetchNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications/user/${this.userId}`); 
  }
}
