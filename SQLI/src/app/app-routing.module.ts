import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { EventsComponent } from './events/events.component';
import { History } from './History/History';
import { MatchesComponent } from './Matches/Matches';
import { SignupComponent } from './signup/signup.component';
import { Statistics } from './Statistics/Statistics';

const routes: Routes = [
  {path: 'Authentification', component : AuthentificationComponent},
  {path: 'Events', component : EventsComponent},
  {path: 'signup', component : SignupComponent},
  {path: 'matches', component : MatchesComponent},
  {path: 'history', component : History},
  {path: 'statistics', component : Statistics},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
