import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path: 'Authentification', component : AuthentificationComponent},
  {path: 'Events', component : EventsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
