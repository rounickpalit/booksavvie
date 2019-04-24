import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { AddDataComponent } from './add-data/add-data.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FirstLoginHomepageComponent } from './first-login-homepage/first-login-homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { searchModel } from 'src/assets/searchModel';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'new-user', component: FirstLoginHomepageComponent, canActivate: [AuthGuard]},
  {path: 'bookdetails', component: BookdetailsComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AddDataComponent, canActivate: [AuthGuard]},
  {path: 'reading-list', component: ReadingListComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchResultComponent, canActivate: [AuthGuard]},
  {path: 'landingpage', component: LandingPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LandingPageComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
