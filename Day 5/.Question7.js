//book.js
function Book(title, author, year) {           //Book Constructor Function

    this.title = title;
    this.author = author;
    this.year = year;
}
Book.prototype.getsummary = function () {      //Adding getsummary Method.
    console.log(`${this.title} by ${this.author}, Published in ${this.year}`);
};

module.exports = Book;            //Export the Book Constructor to be used in Other Module.



//books.js
let Book = require(`./book`);       //Import the Book Constructor.

let books = [     //Array of Book
    new Book("The Great Gatsby", "F.Scott Fitzgerald", 1925),
    new Book("1984", "George Orwell", 1949),
    new Book("To Kill a Mockingbird", "Harper Lee", 1960)

];
module.exports = books;         //Exporting the array of books


//app.js
let books = require(`./books`);       //Import the array of Book instance.
let bookSummaries = books.map(book => book.getsummary());           //using map create one array of bookSummaries

console.log(bookSummaries); 
