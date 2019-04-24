import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BookService } from '../.services/book.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {

  readingList: any;
  bookRating = 4;

  noResultForReadingList: boolean;

  removedBooks = [0];
  markedCompletedBooks = [0];
  markedCurrentlyReadingBooks = [0];

  loadingDiv: boolean;

  selectedBookDetails = {
    book: {
      bookId: 0,
      bookName: '',
      author: {
        firstName: '',
        lastName: '',
        summary: '',
        authorImgUrl: ''
      },
      bookSummary: '',
      bookRating: '',
      bookImgUrl: ''
    },
    isReading: '',
    isCompleted: ''
  };

  constructor(private http: HttpClient, private bookService: BookService) { }

  ngOnInit() {
    this.loadingDiv = true;
    this.noResultForReadingList = false;
    this.loadReadingList();
    this.removedBooks.pop();
  }

  loadReadingList() {
    this.bookService.getReadingList()
      .subscribe(response => {
        if (response['metadata'].status === 'OK') {
          this.readingList = response['data'];

          this.loadingDiv = false;
          if (this.readingList.length === 0) {
            this.noResultForReadingList = true;
          }

          this.readingList.forEach(element => {
            if (element.isReading === true && element.isCompleted === true) {
              element.isCompleted = '# completed reading';
            } else if (element.isReading === true && element.isCompleted === false) {
              element.isCompleted = '# currently reading';
            } else if (element.isReading === false && element.isCompleted === false) {
              element.isCompleted = '# want to read';
            }
            let time = element.lastUpdate.slice(11, 13);
            let amOrPm = 'am';
            if (time > 12) {
              time = time - 12;
              amOrPm = 'pm';
            }
            const date = new Date(element.lastUpdate.slice(0, 4), element.lastUpdate.slice(5, 7), element.lastUpdate.slice(8, 10));
            element.lastUpdate = date.getDate().toString() + ' ' + date.toLocaleString('en-us', { month: 'long' }) + '\''
             + date.getFullYear().toString().slice(2, 4) + ' ' + time + element.lastUpdate.slice(13, 16) + amOrPm;
          });
          console.log(this.readingList);
        }
      }, err => {});
  }

  onBookClick(book: any) {
    this.selectedBookDetails = book;
  }

  getTrimmedBookSummary(bookId: number) {
    return this.readingList. book.bookSummary.slice(1, 350)
  }

  markBookAsCurrentlyReading(bookId: number) {
    this.markedCurrentlyReadingBooks.push(bookId);
    this.bookService.markBookAsCurrentlyReading(bookId)
      .subscribe(res => {
        this.loadReadingList();
      }, err => {
        console.log(err);
        this.markedCurrentlyReadingBooks.pop();
      });
  }

  markAsCompleted(bookId: any) {
    this.markedCompletedBooks.push(bookId);
    this.bookService.markBookAsCompleted(bookId)
      .subscribe(res => {
        this.loadReadingList();
      }, err => {
        console.log(err);
        this.markedCompletedBooks.pop();
      });
  }

  removeFromReadingList(bookId: any) {
    this.removedBooks.push(bookId);
    this.bookService.removeFromReadingList(bookId)
      .subscribe(res => {
        alert('Successfully removed from your Reading List!');
        this.loadReadingList();
      }, err => {
        console.log(err);
        this.removedBooks.pop();
      });
  }

}
