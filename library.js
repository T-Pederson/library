let myLibrary = [];

// Constructor for new books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Update the page to include a new book the user submits via the new book form
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

// Loop through myLibrary and add all books as cards on the page
function updateLibrary() {
    // Clear list to prevent duplicating everything when adding a new book
    const cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
    // Create card, add content to card, and add card to page
    let bookCount = 0;
    for (let book in myLibrary) {
        const card = document.createElement("div");
        card.setAttribute("id", bookCount);
        bookCount++;
        for (let property in myLibrary[book]) {
            let info = document.createElement("p");
            info.innerText = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`
            card.appendChild(info);
        }
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.classList.add("removeButton")
        card.appendChild(removeButton);
        card.classList.add("card");
        document.querySelector(".cards").appendChild(card);
    }
    document.querySelectorAll(".removeButton").forEach(item => {
        item.addEventListener("click", removeBook);
    })
}

// Add ability to open/close the new book modal
const modal = document.querySelector(".modal");
document.querySelector("#newBook").onclick = () => modal.style.display = "block";
document.querySelector(".close").onclick = () => modal.style.display = "none";
window.onclick = (event) => { 
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Make remove button work
function removeBook () {
    let bookIndex = this.parentElement.id;
    myLibrary.splice(bookIndex, 1);
    updateLibrary();
}

// Make the add book button work
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