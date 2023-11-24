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
        // Enregistrez ici le contenu mis à jour dans votre backend ou effectuez des opérations nécessaires
        console.log('Nouveau contenu : ', this.content);
      }
    }
  }