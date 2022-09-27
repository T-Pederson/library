let myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let title = prompt("Title?");
    let author = prompt("Author?");
    let pages = prompt("Pages?");
    let read = prompt("Read yet?");
    myLibrary.push(new Book(title, author, pages, read));
}

Book.prototype.info = function() {
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
}

document.querySelector("button").addEventListener("click", addBookToLibrary);

