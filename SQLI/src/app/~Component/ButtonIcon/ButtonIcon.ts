import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './ButtonIcon.html',
  styleUrls: ['./ButtonIcon.css']
})
export class ButtonComponent {
  @Input() imageUrl: string = '';
  @Input() buttonText: string = '';
  @Input() width: number=92;
}