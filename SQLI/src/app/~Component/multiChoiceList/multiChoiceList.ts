import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-multi-choice-list',
  templateUrl: './multiChoiceList.html',
  styleUrls: ['./multiChoiceList.css']
})

export class multiChoiceList {
  @Input() imageUrl : string = ""
  @Input() title : string = ""
  @Input() options : string[] =[];
  @Input() selectedOptions: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onOptionSelect(option: string) {
    this.showDropdown = false; 
    this.optionSelected.emit(option); 
  }

  // Méthode pour vérifier si une option est sélectionnée
  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

}