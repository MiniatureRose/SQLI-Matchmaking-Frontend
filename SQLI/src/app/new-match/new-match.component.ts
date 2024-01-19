import { Component,  OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    
    return selectedDate < today ? { 'pastDate': { value: control.value } } : null;
  };
}

interface ServerResponse {
  success?: boolean;
  message?: string;
}

interface Sport {
  id : number;
  name: string;
  noTeams: number;
}


interface Field {
  id : number;
  name: string;
  location: string;
  noPlayers: number;
}

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})


export class NewMatchComponent implements OnInit {
  
  matchForm: FormGroup;
  successMessage: string = '';
  sports: Sport[] = [];
  fields: Field[] = [];
  isNewField: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    const organizerId = localStorage.getItem('userId'); 
    this.matchForm = this.formBuilder.group({
      name: ['', Validators.required],
      organizerId: [organizerId || '', Validators.required],
      fieldId: ['', Validators.required],
      sportId: ['', Validators.required],
      date: ['', [Validators.required, futureDateValidator()]],
      duration: ['', [Validators.required, Validators.min(1)]],
      noPlayers: ['', [Validators.required, Validators.min(0)]],
      nbSubs: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadSports();
    this.loadFields();
  }

  loadSports() {
    const sportsUrl = 'http://localhost:8081/sport/all';
    this.http.get<Sport[]>(sportsUrl).subscribe(
      (sports) => {
        this.sports = sports;
      },
      (error) => {
        console.error('Erreur lors du chargement des sports :', error);
      }
    );
  }



  loadFields() {
    const fieldsUrl = 'http://localhost:8081/field/all';
    this.http.get<Field[]>(fieldsUrl).subscribe(
      (fields) => {
        this.fields = fields;
      },
      (error) => {
        console.error('Erreur lors du chargement des terrains :', error);
      }
    );
  }

  
  toggleNewField() {
    this.isNewField = !this.isNewField;
    if (this.isNewField) {
      this.matchForm.get('field')?.reset();
      this.matchForm.get('field')?.clearValidators();
      this.matchForm.get('newFieldName')?.setValidators(Validators.required);
      this.matchForm.get('newFieldLocation')?.setValidators(Validators.required);
    } else {
      this.matchForm.get('newFieldName')?.reset();
      this.matchForm.get('newFieldLocation')?.reset();
      this.matchForm.get('newFieldName')?.clearValidators();
      this.matchForm.get('newFieldLocation')?.clearValidators();
      this.matchForm.get('field')?.setValidators(Validators.required);
    }
    this.matchForm.get('field')?.updateValueAndValidity();
    this.matchForm.get('newFieldName')?.updateValueAndValidity();
    this.matchForm.get('newFieldLocation')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.matchForm.valid) {
      const apiUrl = 'http://localhost:8081/match/create';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      const formData = {
        ...this.matchForm.value,
        date: new Date(this.matchForm.value.date).toISOString(),
        duration: `PT${this.matchForm.value.duration * 60}S`,
      };

      console.log(formData);

      this.http.post(apiUrl, formData, { headers }).subscribe(
      (response: ServerResponse) => {
        this.successMessage = 'Match créé avec succès !';
        console.log('Réponse du serveur :', response.message);
      },
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
        this.successMessage = ''; // Réinitialiser le message de succès en cas d'erreur
      }
    );
  } else {
    console.log('Le formulaire contient des erreurs');
    this.successMessage = ''; // Réinitialiser le message de succès si le formulaire est invalide
  }
}
goToHomePage() {
    this.router.navigate(['/Home']); // Assurez-vous que le chemin correspond à votre route d'accueil
  }
}
