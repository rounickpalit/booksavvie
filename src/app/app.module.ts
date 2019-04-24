import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { AddDataComponent } from './add-data/add-data.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FirstLoginHomepageComponent } from './first-login-homepage/first-login-homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchResultComponent } from './search-result/search-result.component';


// const appRoutes: Routes = [
//   {path: 'home',component:HomepageComponent},
//   {path: 'new-user',component:FirstLoginHomepageComponent},
//   {path: 'bookdetails',component:BookdetailsComponent},
//   {path: 'login',component:LoginComponent},
//   {path: 'signup',component:SignupComponent},
//   {path: 'admin',component:AddDataComponent},
//   {path: '',component:LoginComponent},
//   {path: '**',component:NotFoundComponent}
//   // {path: '**',redirectTo:'/notfound.html'},
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    BookdetailsComponent,
    AddDataComponent,
    SignupComponent,
    NotFoundComponent,
    FirstLoginHomepageComponent,
    NavbarComponent,
    ReadingListComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    LandingPageComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // RouterModule.forRoot(
    //   appRoutes
    // ),
    NgbModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
