export class bookModel {
    constructor(
      public bookName: string,
      public authorID: string,
      public bookSummary: string,
      public region: string,
      public publishingHouse: string,
      public releaseDate: string,
      public isBestSeller: string,
      public genreCodes: string,
      public bookRating: number,
      public bookImgUrl: string
    ) {  } 
}