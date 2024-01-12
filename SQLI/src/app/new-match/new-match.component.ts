import { Component,  OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {
  matchForm: FormGroup;
  sports: string[] = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer']; // Local array of sports

  constructor(private formBuilder: FormBuilder,private location: Location) {
    this.matchForm = this.formBuilder.group({
      sport: ['', Validators.required],
      address: ['', Validators.required],
      dateDebut: ['', Validators.required],
      nbplayers: ['', Validators.required],
      nbsubstituts: ['', Validators.required],
      description: ['',Validators.required],
    });
}

  ngOnInit() {
    // In future, replace the above local array with a call to the backend to fetch sports
    // this.loadSportsFromBackend();
  }

  // Placeholder for future backend integration
  loadSportsFromBackend() {
    // Example: this.yourService.getSports().subscribe(sports => this.sports = sports);
  }
  
  onSubmit() {
    if (this.matchForm.valid) {
      console.log('Formulaire soumis avec succées', this.matchForm.value);
    } else {
      console.error('Veuillez remplir tous les champs obligatoires.');
    }
  }


}