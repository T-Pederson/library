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
    // If title, author or pages is blank don't let the user add the book
    if (title.value == "" || author.value == "" || pages.value == "") {
        return;
    }
    // Assign form elements to variables
    let title = document.querySelector("[name=title]");
    let author = document.querySelector("[name=author]");
    let pages = document.querySelector("[name=pages]");
    let read = document.querySelector("#read");
    // Add the book to the myLibrary array, update the library, close the modal, and reset the form fields
    myLibrary.push(new Book(title.value, author.value, pages.value, read.checked));
    updateLibrary();
    modal.style.display = "none";
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

// Loop through myLibrary and add all books as cards on the page
function updateLibrary() {
    // Clear list to prevent duplicating everything when adding a new book
    clearLibrary();
    // Create card, add content to card, and add card to page
    createCard();
    // Make remove buttons work
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

// Make remove buttons work
function removeBook () {
    let bookIndex = this.parentElement.id;
    myLibrary.splice(bookIndex, 1);
    updateLibrary();
}

// Helper function to clear library when updating library
function clearLibrary () {
    const cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
}

// Helper function to create new cards when updating library
function createCard () {
    // Start counter to assign index location to each card
    let bookCount = 0;
    // Loop through myLibrary and create a card div for each, assign index as id
    for (let book in myLibrary) {
        const card = document.createElement("div");
        card.setAttribute("id", bookCount);
        card.classList.add("card");
        bookCount++;
        // Loop through book properties and add content to the newly created card
        for (let property in myLibrary[book]) {
            if (property == "read") {
                // Create slider to toggle read status
                let sliderDiv = document.createElement("div");
                card.appendChild(sliderDiv);
                let span = document.createElement("span");
                span.innerText = "Read:";
                sliderDiv.appendChild(span);
                let label = document.createElement("label");
                label.classList.add("switch");
                sliderDiv.appendChild(label);
                let readStatus = document.createElement("input");
                readStatus.type = "checkbox";
                readStatus.id = "read";
                label.appendChild(readStatus);
                let slider = document.createElement("span");
                slider.classList.add("slider", "round");
                label.appendChild(slider);
                // Detect the status of the slider from the user submitted form
                if (myLibrary[book][property] == true) {
                    readStatus.checked = true;
                }
            } else {
                // Create text for title, author and page count
                let info = document.createElement("p");
                info.innerText = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[book][property]}`
                card.appendChild(info);
            }
        }
        // Create remove button
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.classList.add("removeButton")
        card.appendChild(removeButton);
        // Add card to cards list
        document.querySelector(".cards").appendChild(card);
    }
}

// Make clicking the add book button work
document.querySelector("#addBook").addEventListener("click", addBookToLibrary);

// Add a default book to give user some context
function tempBook() {
    let title = "Goodnight Moon";
    let author = "Margaret Wise Brown";
    let pages = "32";
    let read = true;
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
}

tempBook();