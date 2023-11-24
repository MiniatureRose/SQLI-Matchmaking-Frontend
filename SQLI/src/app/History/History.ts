import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './History.html',
  styleUrls: ['./History.css']
})
export class History {
  constructor(private http: HttpClient, private router:Router) {
  }


}