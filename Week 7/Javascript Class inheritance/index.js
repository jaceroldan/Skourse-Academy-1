class Library {
    constructor(){
        this.numOfBooksRead = 0,
        this.numOfBooksNotRead = 0;
        this.nextBook = "";
        this.currentBook = "";
        this.arrayBooks = [];
        this.lastBook = "";
        
    }

    addBook(book){
         this.arrayBooks.push(book)
         ++this.numOfBooksNotRead;
         
         if(!this.currentBook){
            this.currentBook = book;
         }
         else if(!this.nextBook){
            this.nextBook = book;
         }

    }

    finishedCurrentBook(){
        if(this.currentBook){
            ++this.numOfBooksRead;
            this.lastBook = this.currentBook;
            if(this.nextBook){
                this.currentBook = this.nextBook;
                this.nextBook = this.arrayBooks[(this.arrayBooks.indexOf(this.currentBook) +1)];
                if(!this.nextBook){
                    this.nextBook = "No more Text Books"
                }
            }
            
    }

  
    }
}
class Book {
    constructor(author,title,genre,dateRead){
        this.author = author,
        this.title = title,
        this.genre = genre,
        this.dateRead = dateRead

    }
}

const Book1 = new Book("Elvin","Book of Pandora","Scie-fi","02/02/2020");
const Book2 = new Book("Rey","Book of Sins","Fiction","02/02/2020");
const Book3 = new Book("Rey","Book of Cuteness","Fiction","02/02/2020");
const Book4 = new Book("Rey2","Book of Awesome","Documentary","03/12/2020");
const Library1 = new Library();
Library1.addBook(Book1);
Library1.addBook(Book2);
Library1.addBook(Book3);
Library1.addBook(Book4);
console.log(Library1)

Library1.finishedCurrentBook(Book1);
Library1.finishedCurrentBook(Book2);

