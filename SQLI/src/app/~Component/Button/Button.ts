import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './Button.html',
  styleUrls: ['./Button.css']
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Output() toggleEdit: EventEmitter<void> = new EventEmitter<void>();
  @Input() buttonColor: string = '#3062C8';

  func() {
    this.toggleEdit.emit(); // Déclenche l'action dans le composant parent
  }

}