import { Component, OnInit } from '@angular/core';
import { searchModel } from '../../assets/searchModel';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookService } from '../.services/book.service';
import { ImageHandlerService } from '../.services/image-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  })
};

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  model = new searchModel('');

  noResultForSearchDiv = false;
  loadingDiv: boolean;

  recommendedBookList: [];


  recommendationsList: {};

  selectedBookDetails = {
    bookId: '',
    bookName: '',
    author: {
      firstName: '',
      lastName: '',
      summary: '',
      authorImgUrl: ''
    },
    bookSummary: '',
    ratingScore: '',
    bookImgUrl: '',
    looksInterestingFlag: ''
  };

  bookRating = 0;

  addedToReadingList: any = [];

  constructor(private http: HttpClient,
              private router: Router,
              private bookService: BookService,
              private imageHandler: ImageHandlerService) { }

  ngOnInit() {
    this.loadRecommendations();
  }

  loadRecommendations() {
    this.recommendedBookList = [];
    this.loadingDiv = true;
    this.bookService.getRecommendations()
      .subscribe(response => {
        this.loadingDiv = false;
        if (response['data'] != null) {

          this.recommendedBookList = response['data'];
        } else {
          console.log('no recommendations fetched');
        }
      }, err => {
        console.log(err);
      });
  }

  onSearchClick() {

  }

  viewDetailsClicked(book: any) {
    this.selectedBookDetails = book;
    console.log(this.selectedBookDetails);
    this.bookRating = book.ratingScore;
    this.selectedBookDetails.looksInterestingFlag = 'Looks interesting?';
  }

  addBookToReadingList(bookId: any) {
    this.addedToReadingList.push(bookId);
    this.bookService.addBookToReadingList(bookId)
      .subscribe(res => {
        // this.recommendedBookList.splice(0, this.recommendedBookList.length);
        // alert('Added to your Reading List');
        // this.loadRecommendations();
      }, err => {});
  }

  onGenreClick(genreName: string) {
    this.loadingDiv = true;
    this.recommendedBookList = [];
    this.bookService.getRecommendationsBasedOnGenre(genreName)
      .subscribe(res => {
        this.loadingDiv = false;
        console.log(res);
        this.recommendedBookList = res['data'];
      }, err => {});
  }

}
