// Q3: Library Management System (Classes + Objects)
// Optional: node q3_library_management.js 9780140449136   (ISBN to issue)

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = false;        // every new book starts as available
  }

  // Returns true if the book was issued, false if it was already issued
  issueBook() {
    if (this.isIssued) return false;
    this.isIssued = true;
    return true;
  }

  // Returns true if the book was returned, false if it was not issued
  returnBook() {
    if (!this.isIssued) return false;
    this.isIssued = false;
    return true;
  }
}

const library = [
  new Book("The Odyssey", "Homer", "9780140449136"),
  new Book("Clean Code", "Robert C. Martin", "9780132350884"),
  new Book("You Don't Know JS", "Kyle Simpson", "9781491904244"),
  new Book("Eloquent JavaScript", "Marijn Haverbeke", "9781593279509"),
  new Book("Atomic Habits", "James Clear", "9780735211292"),
];

// Display all books that are not issued
function displayAvailableBooks() {
  const available = library.filter((book) => !book.isIssued);
  console.log(`--- Available books (${available.length}) ---`);
  available.forEach((book) => console.log(`${book.isbn} | ${book.title} by ${book.author}`));
}

// Search a book by ISBN and issue it
function issueBookByISBN(isbn) {
  const book = library.find((b) => b.isbn === isbn);
  if (!book) {
    console.log(`No book found with ISBN ${isbn}`);
  } else if (book.issueBook()) {
    console.log(`Issued: "${book.title}"`);
  } else {
    console.log(`Sorry, "${book.title}" is already issued.`);
  }
}

displayAvailableBooks();

console.log("\n>> User searches ISBN 9780132350884");
issueBookByISBN("9780132350884");
console.log(">> Same book again");
issueBookByISBN("9780132350884");
console.log(">> Unknown ISBN");
issueBookByISBN("0000000000000");

// If an ISBN was given on the command line, issue that one too
const isbnFromUser = typeof process !== "undefined" ? process.argv[2] : undefined;
if (isbnFromUser) {
  console.log(`\n>> User searches ISBN ${isbnFromUser} (from command line)`);
  issueBookByISBN(isbnFromUser);
}

console.log("");
displayAvailableBooks();

console.log("\n>> Returning Clean Code");
console.log(library[1].returnBook() ? "Returned successfully." : "Book was not issued.");
displayAvailableBooks();
