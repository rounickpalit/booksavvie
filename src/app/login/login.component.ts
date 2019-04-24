import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../assets/loginModel';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiHost = 'https://bookrecommendapi.gear.host/';
  // apiHost = "http://localhost:1550/";

  model = new LoginModel('', '');
  userAuthenticated: boolean;
  isFirstLogin: boolean;
  loginButtonClass = 'btn btn-success';
  loginButtonText: string;
  loginButtonClicked: boolean;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.loginButtonClicked = false;
    this.loginButtonText = 'Login';
    this.userAuthenticated = true;
    if (this.auth.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    // console.log('Submitted');
    // console.log('Username:', this.model.username);
    // console.log('Password:', this.model.password);

    this.loginButtonText = 'logging in';
    this.loginButtonClicked = true;

    this.http.post('https://bookrecommendapi.gear.host/auth/validate-user', {
      usernameOrEmail: this.model.username,
      password: this.model.password
    }, httpOptions)
        .subscribe(response => {
          console.log(response);
          this.userAuthenticated = response['data'].userExists;
          if (this.userAuthenticated === true) {
            // check new user or returning user
            this.isFirstLogin = response['data'].isNewUser;
            if (this.isFirstLogin === true) {
              this.router.navigate(['new-user']);
            } else {
              this.router.navigate(['home']);
            }
          } else {
            this.userAuthenticated = false;
            // this.loginButtonClass = "btn btn-danger";
            this.model.password = '';
            this.loginButtonClicked = false;
            this.loginButtonText = 'Login';
            setTimeout(function() {
              console.log('test');
              this.userAuthenticated = true;
              this.loginButtonClass = 'btn btn-success';
            }, 2000);
          }
        }, err => {
          console.log(err);
        });


  }



  onLoginSubmit() {

    this.loginButtonText = 'logging in';
    this.loginButtonClicked = true;
    this.userAuthenticated = true;

    this.auth.validateUser(this.model.username, this.model.password).subscribe(response => {
      console.log(response);
      if (response['data'].userExists === true) {
        this.auth.setLoggedInStatus(true);
        this.auth.setLoggedInUsername(response['data'].username);
        this.auth.setSecurityQuestion(response['data'].securityQuestion);
        // check new user or returning user
        this.isFirstLogin = response['data'].isNewUser;
        if (this.isFirstLogin === true) {
          this.router.navigate(['new-user']);
        } else {
          this.router.navigate(['home']);
        }
      } else {
        this.auth.logoutUser();
        this.loginButtonClicked = false;
        this.model.password = '';

        this.loginButtonText = 'Login';
        this.userAuthenticated = false;
      }
    }, err => {
      console.log('User not logged in', err);
    });

  }

}
