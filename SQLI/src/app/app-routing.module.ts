import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { EventsComponent } from './events/events.component';
import { History } from './History/History';
import { MatcheDetails } from './MatcheDetails/MatcheDetails';
import { MatchesComponent } from './Matches/Matches';
import { SignupComponent } from './signup/signup.component';
import { Statistics } from './Statistics/Statistics';
import { NewMatchComponent } from './new-match/new-match.component';

const routes: Routes = [
  {path: 'Home', component : HomeComponent},
  {path: 'Authentification', component : AuthentificationComponent},
  {path: 'Events', component : EventsComponent},
  {path: 'NewMatch', component : NewMatchComponent},
  {path: 'signup', component : SignupComponent},
  {path: 'matches', component : MatchesComponent},
  {path: 'history', component : History},
  {path: 'statistics', component : Statistics},
  {path: 'matche-details', component : MatcheDetails},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
