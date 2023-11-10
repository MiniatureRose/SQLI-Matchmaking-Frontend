import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './Icon.html',
  styleUrls: ['./Icon.css']
})
export class Icon {
  @Input() imageUrl: string = '';
}