import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isProfileClickedSource = new BehaviorSubject<boolean>(false);
  isProfileClicked$ = this.isProfileClickedSource.asObservable();

  constructor() {}

  toggleProfileClicked(value: boolean) {
    this.isProfileClickedSource.next(value);
  }
}
