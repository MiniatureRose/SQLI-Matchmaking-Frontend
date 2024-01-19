import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './Icon.html',
  styleUrls: ['./Icon.css']
})
export class Icon {
  @Input() imageUrl: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() width: number=52;
  @Input() color: string="#FFBB24";
  @Input() rank: number=12

  @Input() isHovered: boolean = false;
  hover: boolean = false;

  onMouseEnter() {
    this.hover = true;
  }

  onMouseLeave() {
    this.hover = false;
  }

}