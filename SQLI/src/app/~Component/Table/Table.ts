import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedService } from "../SharedService/SharedService";

@Component({
    selector : 'app-table',
    templateUrl : './Table.html',
    styleUrls : ['./Table.css']
})

export class Table {
    constructor(private sharedService: SharedService) {
        
    }

    @Input() title : string = '';
    @Input() closeFunction!: () => void;

    closeTable() {
        this.sharedService.toggleProfileClicked(false);
      }
}