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
  currentPage: number = 1;
  Unit : String = "min";

  constructor(private formBuilder: FormBuilder,private location: Location) {
    this.matchForm = this.formBuilder.group({
      sport: ['', Validators.required],
      //location: ['', Validators.required],
      dateDebut: ['', Validators.required],
      nbplayers: ['', Validators.required],
      nbsubstituts: ['', Validators.required],
      description: ['',Validators.required],
    });
}

  ngOnInit() {
  }

  choisirSport(sport: string) {
    const sportControl = this.matchForm.get('sport');
    if (sportControl) {
      sportControl.setValue(sport);
      this.nextPage();
    }
  }
  
  onSubmit() {
    if (this.matchForm.valid) {
      console.log('Formulaire soumis avec succées', this.matchForm.value);
    } else {
      console.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}