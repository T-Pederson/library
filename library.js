let myLibrary = [];

// Constructor for new books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Create form for the user to fill out to add a book to the list, then update the page to include the new book
function addBookToLibrary() {
    let title = document.querySelector("[name=title]").value;
    let author = document.querySelector("[name=author]").value;
    let pages = document.querySelector("[name=pages]").value;
    let read;
    if (document.querySelector("#read").checked) {
        read = "Yes";
    } else {
        read = "No";
    }
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
    modal.style.display = "none";
}

// Function to loop through myLibrary and add all books from this as cards on the page
function updateLibrary() {
    // Clear list to prevent duplicating everything when adding a new book
    const cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
    // Loop through entire library and add all books as cards
    for (let book in myLibrary) {
        const card = document.createElement("div");
        for (let property in myLibrary[book]) {
            let info = document.createElement("p");
            info.innerText = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`
            card.appendChild(info);
        }
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.classList.add("deleteButton")
        card.appendChild(deleteButton);
        card.classList.add("card");
        document.querySelector(".cards").appendChild(card);
    }
}

// assign modal element to variable and add functionality to open/close modal
const modal = document.querySelector(".modal");
document.querySelector("#newBook").onclick = () => modal.style.display = "block";
document.querySelector(".close").onclick = () => modal.style.display = "none";
window.onclick = (event) => { 
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelector("#addBook").addEventListener("click", addBookToLibrary);


// Temp function to add a default book for setting layout/design
function tempBook() {
    let title = "Goodnight Moon";
    let author = "Margaret Wise Brown";
    let pages = "32";
    let read = "Yes";
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
}

tempBook();
tempBook();
tempBook();
tempBook();