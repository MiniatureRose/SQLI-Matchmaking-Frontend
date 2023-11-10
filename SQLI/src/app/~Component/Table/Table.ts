import { Component, Input } from "@angular/core";

@Component({
    selector : 'app-table',
    templateUrl : './Table.html',
    styleUrls : ['./Table.css']
})

export class Table {
    @Input() title : string = '';

}