//book.js
function Book(title, author, isAvailable = true) {   //Book Constructor
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}

module.exports = Book; // Export the Book constructor



//member.js
let Book = require('./book');  // Import the Book Constructor.
function Member(name) {      // Constructor of Member
    this.name = name;
    this.borrowBooks = [];
}

// Method to borrow a book
Member.prototype.borrowBook = function (book) {
    if (this.borrowBooks.length >= 3) {
        console.log(`${this.name} cannot borrow more than 3 books`);
        return;
    }
    if (book.isAvailable) {
        this.borrowBooks.push(book.title);
        book.isAvailable = false;
        console.log(`${this.name} can borrow "${book.title}" by ${book.author}`);
    } else {
        console.log(`Sorry, ${book.title} is already borrowed`);
    }
};

function PremiumMember(name) { // Constructor of PremiumMember
    Member.call(this, name);
    this.specialCollectionAccess = true;
}

// Inherit methods from Member
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

// Override borrowBook method for PremiumMember
PremiumMember.prototype.borrowBook = function (book) {
    if (this.borrowBooks.length >= 5) {
        console.log(`${this.name} cannot borrow more than 5 books`);
        return;
    }
    if (book.isAvailable || this.specialCollectionAccess) {
        this.borrowBooks.push(book.title);
        book.isAvailable = false; // Correctly using 'isAvailable'
        console.log(`${this.name} can borrow "${book.title}" by ${book.author}`);
    } else {
        console.log(`Sorry, ${book.title} is already borrowed`);
    }
};

module.exports = { Member, PremiumMember }; // Export Member and PremiumMember Constructors.


//app.js
// Import Book and Member and PremiumMember Constructors
let Book = require('./book'); // Ensure this path is correct
let { Member, PremiumMember } = require('./member'); // Ensure this path is correct

// Creating Book Instances
let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", true);
let book2 = new Book("1984", "George Orwell", true);
let book3 = new Book("To Kill a Mockingbird", "Harper Lee", true);
let book4 = new Book("Moby Dick", "Herman Melville", true);
let book5 = new Book("War and Peace", "Leo Tolstoy", true);

// Creating Regular Member and PremiumMember
let regularMember = new Member('John Doe');
let premiumMember = new PremiumMember('Jane Smith');

// Regular Member Borrowing Books
regularMember.borrowBook(book1);
regularMember.borrowBook(book2);
regularMember.borrowBook(book3);
regularMember.borrowBook(book4); // This should trigger the limit message

// PremiumMember Borrowing Books
premiumMember.borrowBook(book1);  // Premium member can borrow special collection book even if it's unavailable for regular members
premiumMember.borrowBook(book2);
premiumMember.borrowBook(book3);
premiumMember.borrowBook(book4);
premiumMember.borrowBook(book5);  // Premium member can borrow up to 5 books
premiumMember.borrowBook(book1);  // Trying to borrow a special collection book again

// Borrowing Unavailable Book
regularMember.borrowBook(book1);
premiumMember.borrowBook(book1);

// Using bind to create a bound function to borrow books.
let borrowForJohn = regularMember.borrowBook.bind(regularMember);
borrowForJohn(book1);  // This should also trigger the unavailable message