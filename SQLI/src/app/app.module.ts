import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { ButtonIconComponent } from './~Component/ButtonIcon/ButtonIcon';
import { ButtonComponent } from './~Component/Button/Button';
import { Table } from './~Component/Table/Table';
import { Profil } from './~Component/Profil/Profil';
import { Icon } from './~Component/Icon/Icon';
import { ListButtons } from './~Component/ListButtons/ListButtons';
import { InfoField } from './~Component/InfoField/InfoField';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { ButtonItemComponent } from './~Component/ButtonItem/ButtonItem';
import { MatcheDetails } from './MatcheDetails/MatcheDetails';
import { CerclePlanComponent } from './~Component/CerclePlan/CerclePlan';
import { NewMatchComponent } from './new-match/new-match.component';

import { multiChoiceList } from './~Component/multiChoiceList/multiChoiceList';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthentificationComponent,
    EventsComponent,
    SignupComponent,
    ButtonIconComponent,
    ButtonComponent,
    Profil,
    Table,
    Icon,
    ListButtons,
    MatchComponent,
    HomeComponent,
    InfoField,
    ButtonItemComponent,
    MatcheDetails,
    CerclePlanComponent,
    NewMatchComponent,
    multiChoiceList,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
