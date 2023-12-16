import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cercle-plan',
  templateUrl: './CerclePlan.html',
  styleUrls: ['./CerclePlan.css']
})
export class CerclePlanComponent {
  @Input() playersNumber : number = 10;
  @Input() playersInfo : {
    // color: string;

    id: number;
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    profileImage: string;
    role: string
  }[] = [ 
  ];

  obtenirInitiales(player: {
    firstName: string;
    lastName: string;
}): string {
    // Vérifier si le player a un prénom et un nom définis
    if (player.firstName && player.lastName) {
        // Extraire les deux premières lettres du prénom et du nom
        const initiales = player.firstName.charAt(0) + player.lastName.charAt(0);
        return initiales.toUpperCase(); // Convertir en majuscules si nécessaire
    } else {
        return ''; // Si le prénom ou le nom est manquant, retourner une chaîne vide ou gérer l'erreur selon votre logique
    }
}

}
