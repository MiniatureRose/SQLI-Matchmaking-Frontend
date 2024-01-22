import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-field',
  templateUrl: './InfoField.html',
  styleUrls: ['./InfoField.css']
})

export class InfoField {
    @Input() title: String="";
    @Input() content: String="";
    @Input() isEditMode = false;

    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      if (!this.isEditMode) {
        console.log('Nouveau contenu : ', this.content);
      }
    }
  }