import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './Icon.html',
  styleUrls: ['./Icon.css']
})
export class Icon {
  @Input() imageUrl: string = '';
  @Input() width: number=52;
  @Input() color: string="#FFBB24"

}