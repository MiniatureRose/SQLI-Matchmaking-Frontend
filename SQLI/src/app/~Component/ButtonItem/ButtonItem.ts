import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-item',
  templateUrl: './ButtonItem.html',
  styleUrls: ['./ButtonItem.css']
})
export class ButtonItemComponent {
  @Input() imageUrl: string = '';
  @Input() buttonText: string = '';
  @Input() width: number=250;
}