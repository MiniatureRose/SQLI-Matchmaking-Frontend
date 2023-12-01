import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multi-choice-list',
  templateUrl: './multiChoiceList.html',
  styleUrls: ['./multiChoiceList.css']
})

export class multiChoiceList {
  @Input() imageUrl : string = ""
  @Input() title : string = ""
}