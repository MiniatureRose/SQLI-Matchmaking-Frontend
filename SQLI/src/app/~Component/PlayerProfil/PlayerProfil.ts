import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-profil',
  templateUrl: './PlayeProfil.html',
  styleUrls: ['./PlayeProfil.css']
})
export class PlayeProfil {
  @Input() imageUrl: string = '';
  @Input() color: string = '';
}