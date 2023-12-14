import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {}

  Redirect_authentification(): void {
    this.router.navigate(['/Authentification']);
    this.closeDialog();
  }

  handleClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  closeDialog(): void { 
    this.dialogRef.close();
  }
}