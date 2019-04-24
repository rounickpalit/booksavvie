import { Component, OnInit } from '@angular/core';
import { searchModel } from '../../assets/searchModel';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // apiHost = 'https://bookrecommendapi.gear.host/';
  // apiHost = "http://localhost:3507/";

  model = new searchModel('');
  loggedInUsername : string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedInUsername = this.auth.getLoggedInUsername;
  }

  onBookSearchSubmit() {
    console.log('search clicked');
    this.router.navigate(['search/', this.model.searchQuery]);
  }

  logout() {
    this.auth.logoutUser();
    this.router.navigateByUrl('');
  }

}
