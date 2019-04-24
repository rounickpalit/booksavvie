import { Component, OnInit } from '@angular/core';
import { bookModel } from '../../assets/bookModel';
import { authorModel } from '../../assets/authorModel';
import { genreModel } from '../../assets/genreModel';
import regionsData from './../../assets/regions.json';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ImageHandlerService } from '../.services/image-handler.service';
// declare var require: any;
// const image2base64 = require('../../../node_modules/image-to-base64');

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  })
};

const regions = regionsData.regions;

// const image2base64 = new image();

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  apiHost = 'https://bsapi1.gear.host/';
  // apiHost = 'http://localhost:3507/';

  book: any;
  author: any;
  genre: any;

  addBookForm: any;
  addAuthorForm: any;
  addGenreForm: any;

  bookModel: any;
  authorModel: any;
  genreModel: any;

  statusMessage: any;

  genreList = [];
  authorList = [];

  regionList: any;

  // bookThumbnail: File;
  bookThumbnail: string;
  encodedBookThumbnail: Blob;

  constructor(private http: HttpClient, private imageHandler: ImageHandlerService) { }

  ngOnInit() {
    this.book = 'Book';
    this.author = 'Author';
    this.genre = 'Genre';

    this.regionList = regions;

    this.addBookForm = false;
    this.addAuthorForm = false;
    this.addGenreForm = false;

    this.bookModel = new bookModel('', '', '', '', '', '', '', '', 0, '');
    this.authorModel = new authorModel('', '', '', '', '');
    this.genreModel = new genreModel('', '');
  }

  loadGenres() {
    this.http.get(this.apiHost + 'books/genres/all', httpOptions).subscribe(response => {
      if (response['metadata'].status === 'OK') {
        this.genreList = response['data'];
        console.log(this.genreList);
      }
    }, err => {
      console.log(err);
    });
  }

  loadAuthors() {
    this.http.get(this.apiHost + 'books/author/all', httpOptions).subscribe(response => {
      if (response['metadata'].status === 'OK') {
        this.authorList = response['data'];
      }
    }, err => {
      console.log(err);
    });
  }

  launchAddBookForm() {
    this.addBookForm = true;
    this.addAuthorForm = false;
    this.addGenreForm = false;
    this.bookModel = new bookModel('', '', '', '', '', '', '', '', 0, '');
    this.statusMessage = '';
    this.loadGenres();
    this.loadAuthors();
  }

  launchAddAuthorForm() {
    this.addAuthorForm = true;
    this.addBookForm = false;
    this.addGenreForm = false;
    this.authorModel = new authorModel('', '', '', '', '');
    this.statusMessage = '';
  }

  launchAddGenreForm() {
    this.addAuthorForm = false;
    this.addBookForm = false;
    this.addGenreForm = true;
    this.genreModel = new genreModel('', '');
    this.statusMessage = '';
  }

  convertToDataUrl(bookThumbnail: any) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let encodedString = '';
    this.imageHandler.toDataURL(proxyUrl + bookThumbnail, function(dataUrl: any) {
      encodedString = dataUrl;
      this.encodedBookThumbnail = dataUrl;
      console.log(dataUrl);

      // let image = new Image();
      // image.src = this.encodedBookThumbnail;
      // console.log(image);
    });
    console.log(encodedString);
  }

  onAddBookFormSubmit() {
    // this.convertToDataUrl(this.bookThumbnail);
    // let image = new Image();
    // image.src = this.encodedBookThumbnail;
    // console.log(image);
    // console.log('image to base64: ' + this.convertToDataUrl(this.bookThumbnail));

    this.http.post(this.apiHost + 'books/add', {
      bookName: this.bookModel.bookName,
      author: { authorId: this.bookModel.authorId },
      bookSummary: this.bookModel.bookSummary,
      region: this.bookModel.region,
      publishingHouse: this.bookModel.publishingHouse,
      isBestSeller: this.bookModel.isBestSeller,
      releaseDate: this.bookModel.releaseDate,
      genreCodes: this.bookModel.genreCodes,
      bookImgUrl: this.bookModel.bookImgUrl
    }, httpOptions)
      .subscribe(response => {
        console.log(response);
        const bookId = response['data'].bookId;
        console.log('Book ID : ' + bookId);
        this.statusMessage = 'Added! Book ID is ' + bookId;
        this.bookModel = new bookModel('', '', '', '', '', '', '', '', 0, '');
      }, err => {
        console.log(err);
        this.statusMessage = 'Could not be added. Please check logs.';
      });
  }

  onAddAuthorFormSubmit() {

  }

  onAddGenreFormSubmit() {

  }

}
