import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isProfileClickedSource = new BehaviorSubject<boolean>(false);
  private idMatchClickedSource = new BehaviorSubject<number>(0);
  isProfileClicked$ = this.isProfileClickedSource.asObservable();
  idMatch$ = this.idMatchClickedSource.asObservable();

  constructor() {}

  toggleProfileClicked(value: boolean) {
    this.isProfileClickedSource.next(value);
  }

  toggleMatchClicked(value: number) {
    this.idMatchClickedSource.next(value);
  }
}
