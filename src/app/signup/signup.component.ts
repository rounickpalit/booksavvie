import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../assets/signupModel';
import { SecurityQuestionModel } from '../../assets/securityQuestionModel';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import regionsData from './../../assets/regions.json';
import securityQuestionData from './../../assets/securityQuestions.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  })
};

const regions = regionsData.regions;
const securityQuestions = securityQuestionData.questions;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  apiHost = 'https://bookrecommendapi.gear.host';
  // apiHost = "http://localhost:3507";

  signupModel = new SignupModel('', '', '', '', '');
  securityQuestionModel = new SecurityQuestionModel('', '');

  regionList: any;
  securityQuestionsList: any;

  passwordsDontMatch = false;
  signupButtonClicked = false;
  usernameExists = false;
  emailExists = false;
  securityQuestionFormVisibility = false;

  signupButtonText = 'Sign Up';
  securityQuestionButtonText = 'Finish';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.regionList = regions;
    this.securityQuestionsList = securityQuestions;
  }

  onSignupFormSubmit() {
    this.signupButtonClicked = true;
    console.log('Submitted');
    console.log(this.signupModel);
      if (this.signupModel.password !== this.signupModel.repeatPassword) {
        this.passwordsDontMatch = true;
        this.signupButtonClicked = false;
      } else {
        this.passwordsDontMatch = false;
        this.signupButtonText = 'verifying if username is available...';
        this.http.get(this.apiHost + '/user/email/' + this.signupModel.email + '/username/' + this.signupModel.username, httpOptions)
          .subscribe(response => {
            console.log(response);
            this.usernameExists = response['data'].usernameExists;
            this.emailExists = response['data'].emailExists;
            if (this.emailExists !== true && this.usernameExists !== true) {
              this.signupButtonText = 'getting you onboard...';
              this.securityQuestionFormVisibility = true;
            } else {
              this.signupButtonClicked = false;
              this.signupButtonText = 'Sign up';
            }
          }, err => {
            console.log(err);
          });
      }
  }

  onSecurityQuestionFormSubmit() {
    // signup API
    this.http.post(this.apiHost + '/user/add', {
      username: this.signupModel.username,
      email: this.signupModel.email,
      password: this.signupModel.password,
      region: this.signupModel.region,
      passwordQuestion: this.securityQuestionModel.securityQuestion,
      passwordAnswer: this.securityQuestionModel.securityAnswer
    }, httpOptions)
      .subscribe(response => {
        console.log('Sign up successful');
        alert('Signup successful!');
        this.auth.setLoggedInStatus(true);
        this.auth.setLoggedInUsername(response['data'].username);
        this.router.navigate(['new-user']);
      }, err => {});
  }

}
