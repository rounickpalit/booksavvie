import { Component, OnInit } from '@angular/core';
import { bookDetailsModel } from './bookDetailsModel';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  // bookModel = new bookDetailsModel('Deception Point', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.', 4);
  // booktitle = this.bookModel.bookTitle;
  // bookbody = this.bookModel.bookBody;

  selectedBookDetails = {
    bookName: '',
    author: {
      firstName: '',
      lastName: '',
      summary: ''
    },
    bookSummary: '',
    bookRating: ''
  };

  bookRating = 0;

  constructor() { 
    
  }

  ngOnInit() {
    


  }

}
