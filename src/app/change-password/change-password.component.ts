import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private auth: AuthService) { this.securityQuestion = this.auth.getSecurityQuestion; }

  securityQuestion: string;

  ngOnInit() {
    this.securityQuestion = this.auth.getSecurityQuestion;
  }

  onPasswordChangeSubmit() {

  }
}
