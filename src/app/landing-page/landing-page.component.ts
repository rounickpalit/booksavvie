import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  about: boolean;

  constructor() { }

  ngOnInit() {
    this.about = true;
  }

  openHomePage() {
    this.about = true;
  }

  openAboutPage() {
    this.about = false;
  }
}
