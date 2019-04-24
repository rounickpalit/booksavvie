import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { bookDetailsModel } from './bookdetails/bookDetailsModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private loggedInUsername: string;
  private securityQuestion: string;

  apiHost = 'https://bsapi1.gear.host/';
  // apiHost = 'http://localhost:3507/';

  constructor(private http: HttpClient) {
    this.loggedInUsername = localStorage.getItem('loggedInUsername');
    this.securityQuestion = localStorage.getItem('loggedInUsernameSecurityQuestion');
    if (this.loggedInUsername != null) {
      this.loggedInStatus = true;
    }
   }

  get getLoggedInUsername() {
    return this.loggedInUsername;
  }

  setLoggedInUsername(value: string) {
    this.loggedInUsername = value;
    localStorage.setItem('loggedInUsername', value);
  }

  setLoggedInStatus(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setSecurityQuestion(data: string) {
    localStorage.setItem('loggedInUsernameSecurityQuestion', data);
    this.securityQuestion = data;
  }

  get getSecurityQuestion() {
    return this.securityQuestion;
  }

  validateUser(username, password) {
    return this.http.post(this.apiHost + 'auth/validate-user', {
      usernameOrEmail: username,
      password: password
    }, httpOptions);
  }

  logoutUser() {
    this.setLoggedInStatus(false);
    this.setSecurityQuestion(null);
    localStorage.clear();
  }
}
