import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../.services/book.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchQuery: string;

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
    bookImgUrl: ''
  };

  searchedBooksList = [];

  addedToReadingList: any = [];

  noResultForSearchDiv = false;

  loadingDiv: boolean;

  constructor(route: ActivatedRoute, private bookService: BookService) {
    // this.searchQuery = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadingDiv = false;
    // this.loadSearchResults(this.searchQuery);
  }

  loadSearchResults() {
    this.loadingDiv = true;
    console.log('Search Query is ' + this.searchQuery);
    this.bookService.getBooksSearchResults(this.searchQuery)
      .subscribe(res => {
        this.loadingDiv = false;
        this.searchedBooksList = res['data'];
      }, err => {});
  }

  addBookToReadingList(bookId: any) {
    this.addedToReadingList.push(bookId);
    this.bookService.addBookToReadingList(bookId)
      .subscribe(res => {}, err => {});
  }

  viewDetailsClicked(book: any) {
    this.selectedBookDetails = book;
    console.log(this.selectedBookDetails);
    // this.bookRating = book.ratingScore;
    // this.selectedBookDetails.looksInterestingFlag = 'Looks interesting?';
  }

}
