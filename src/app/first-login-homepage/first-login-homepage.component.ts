import { Component, OnInit } from '@angular/core';
import { searchModel } from '../../assets/searchModel';
// import { bookModel } from '../../assets/bookModel';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookService } from '../.services/book.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  })
};

@Component({
  selector: 'app-first-login-homepage',
  templateUrl: './first-login-homepage.component.html',
  styleUrls: ['./first-login-homepage.component.css']
})
export class FirstLoginHomepageComponent implements OnInit {

  apiHost = 'https://bookrecommendapi.gear.host/';

  model = new searchModel('');
  selectedBookDetails = {
    bookName: '',
    author: {
      firstName: '',
      lastName: '',
      summary: ''
    },
    bookSummary: '',
    bookRating: '',
    bookImgUrl: ''
  };
  searchedBooksList = [];
  haveReadItButtonClass = 'btn btn-info btn-sm btn-outline-secondary';
  nextStepFinishButtonText = 'Next Step';
  selectedReadBookIds = [];
  selectedGenreList: number[];

  bookRating = 0;

  noResultForSearchDiv = false;

  headerText: string;
  stepOneCompleted: boolean;
  searchedGenreList: any;

  ratedBookList: number[];
  currentRate: number;

  genreListToBeAdded = [];

  bookElement_i: number;

  loadingDiv: boolean;

  ratingFlag = [];

  constructor(private http: HttpClient, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.stepOneCompleted = false;
    this.headerText = 'What books have you already read?';
    this.selectedGenreList = [];
    this.ratedBookList = [];
    this.loadingDiv = false;
  }

  onSubmit() {
    this.loadingDiv = true;
    this.searchedBooksList = [];
    this.searchedGenreList = [];
    console.log('search button clicked...');

    if (this.stepOneCompleted === false) {
      console.log('searching for books');
      // this.http.get(this.apiHost + "rounickp" +"/books/search/" + this.model.searchQuery, httpOptions)
      this.bookService.getBooksSearchResults(this.model.searchQuery)
      .subscribe(response => {
        this.loadingDiv = false;
        // console.log(response);
        this.searchedBooksList = response['data'];
        if (this.searchedBooksList == null) {
          this.searchedBooksList = [];
          this.noResultForSearchDiv = true;
        } else {
          this.noResultForSearchDiv = false;
        }
        // console.log(this.searchedBooksList);
      },
        err => {
          console.log(err);
      });
    } else {
      console.log('searching for genres');
      this.bookService.getGenresSearchResults(this.model.searchQuery)
        .subscribe(response => {
          this.loadingDiv = false;
          this.searchedGenreList = response['data'];
          if (this.searchedGenreList == null) {
            this.searchedGenreList = [];
            this.noResultForSearchDiv = true;
          } else {
            this.noResultForSearchDiv = false;
          }
          console.log(this.searchedGenreList);
        },
        err => {

        });
    }
  }

// https://stackoverflow.com/questions/41428435/how-to-change-class-of-individual-elements-inside-ngfor?rq=1

  markAsRead(bookId: number) {
    console.log('index clicked : ' + bookId);
    // this.haveReadItButtonClass = "btn btn-success btn-sm btn-outline-secondary";

    // console.log(bookId + " marked as Read");
    this.selectedReadBookIds.push(bookId);
    this.bookService.addBookToReadingList(bookId)
      .subscribe(response => {

        console.log(response);
        if (response['data'].addedToReadingList === true) {

          console.log(bookId + ' Book added to Reading List');

          this.bookService.markBookAsCompleted(bookId)
            .subscribe(response => {
              console.log(response);
              if (response['data'].markedAsCompleted === true) {
                console.log(bookId + ' marked as completed');
                // this.selectedReadBookIds.push(bookId);
                this.ratingFlag.push(bookId);
              } else {
                console.log('Book not marked as completed');
                let index = this.selectedReadBookIds.indexOf(bookId);
                this.selectedReadBookIds.splice(index, 1);
              }

            }, err => {
              console.log(err);
            });
        } else {
          console.log('Book not added to Reading list');
        }
      }, err => {
        console.log(err);
      });
  }

  // https://ng-bootstrap.github.io/#/components/rating/api
  ratingClicked(bookId: number) {
      this.ratedBookList.push(bookId);
      this.bookElement_i = 0;
      this.searchedBooksList.forEach(bookElement => {
        if (bookElement.bookId == bookId) {
          this.searchedBooksList[this.bookElement_i].ratingScore = this.currentRate;
        }
        this.bookElement_i += 1;
      });
      console.log(bookId + ' has been rated ' + this.currentRate);
      console.log(this.searchedBooksList);
      console.log('Rated Book List : ' + this.ratedBookList);
      this.addRating(bookId, this.currentRate, 'rounickp');
      setTimeout(() => {
        const index = this.ratingFlag.indexOf(bookId);
      this.ratingFlag.splice(index, 1);
      }, 1000);
  }

  async addRating(bookId: number, rating: number, username: string) {
    await this.http.post(this.apiHost + 'rounickp' + '/books/rating/add', {
      bookId: bookId,
      rating: this.currentRate
    }, httpOptions)
      .subscribe(response => {
        console.log('rating added');
      }, err => {
        console.log('rating not added');
      });
  }

  onGenreClick(genreId: number) {
    console.log(genreId + ' genre clicked');
    this.selectedGenreList.push(genreId);
  }

  onNextStepClick() {
    console.log('onNextStepClick');
    this.stepOneCompleted = true;
    this.headerText = 'Now let us know the genres you are interested in';
    this.searchedBooksList.splice(0, this.searchedBooksList.length);
    this.nextStepFinishButtonText = 'Finish';
    this.model = new searchModel('');
    this.noResultForSearchDiv = false;
    this.bookService.getAllGenres()
      .subscribe(response => {
        this.searchedGenreList = response['data'];
      }, err => {});
  }

  onLastStepClick() {
    console.log('onLastStepClick');
    this.genreListToBeAdded = [];
    this.selectedGenreList.forEach(genreItem => {
      this.genreListToBeAdded.push(this.searchedGenreList.find(x => x.genreId === genreItem));
    });
    console.log(this.genreListToBeAdded);
    // API map genres to user
    console.log(this.selectedGenreList);
    if (this.genreListToBeAdded.length > 0) {
      // this.http.post(this.apiHost + "rounickp" + "/books/genres/add", this.genreListToBeAdded, httpOptions)
      this.bookService.mapGenresToUser(this.genreListToBeAdded)
      .subscribe(response => {
        if (response['data'].genresAdded === true) {
          console.log('Genres mapped to user');
          this.router.navigateByUrl('home');
        } else {
          console.log('Genres could not be mapped to user. ' + response['metadata'].description);
        }
      }, err => {
        console.log('Some error occured. ' + err.message);
      });
    } else {
      this.router.navigateByUrl('home');
    }
  }

  viewDetailsClicked(book: any) {
    this.selectedBookDetails = book;
    console.log(this.selectedBookDetails);
    this.bookRating = book.ratingScore;
  }

}
