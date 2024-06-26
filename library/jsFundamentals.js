//initial empty array for books
const myLibrary = [];

//button to open dialog for adding a book
const button = document.createElement('button');
button.textContent = 'Add new book';
document.body.appendChild(button)
button.onclick = function() {
    addBooktoLibrary()
};

//the container for all the books to be displayed
const container = document.createElement('div');
container.id = 'array-container';
document.body.appendChild(container);



//the form that shows up when the dialog is opened
function addBooktoLibrary(){
    //create dialog and form elements
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    form.method = 'dialog';

    //enter book title
    const title = document.createElement('input');
    title.type = 'text';
    title.placeholder = 'Enter book title';
    title.required = true;

    //enter book author
    const author = document.createElement('input');
    author.type = 'text';
    author.placeholder = 'Enter author name';
    author.required = true;

    //enter book title
    const pages = document.createElement('input');
    pages.type = 'number';
    pages.placeholder = 'Enter number of pages';
    pages.required = true;

    //enter book status
    const read = document.createElement('input');
    read.type = 'checkbox';
    const readLabel = document.createElement('label');
    readLabel.textContent = 'Have you read this book?';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Book';

    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(pages);
    form.appendChild(readLabel);
    form.appendChild(read);
    form.appendChild(submitButton);

    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();

    //creates the book object, appends to array, and iterates through array
    form.onsubmit = function() {
        const newBook = new Book(title.value, author.value, pages.value, read.checked);
        myLibrary.push(newBook)
        displayLibrary();
        dialog.close();
        dialog.remove();
    };
}

//creates the article for a book to be displayed
function addBookToLibraryDisplay(book, index) {
    const article = document.createElement('article');

    const title = document.createElement('p');
    title.textContent = `Title: ${book.title}`;
    
    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.numPages}`;

    const read = document.createElement('p');
    read.textContent = `Read: ${book.read ? "Yes" : "No"}`;

    const deleteBook = document.createElement('button');
    deleteBook.textContent = "Delete this book";
    deleteBook.onclick = function() {
        myLibrary.splice(index, 1); 
        displayLibrary(); 
    };

    article.appendChild(title);
    article.appendChild(author);
    article.appendChild(pages);
    article.appendChild(read);
    article.appendChild(deleteBook);

    container.appendChild(article);
}


//book constructor
function Book(title, author, numPages, read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

//helper function for readability
function displayLibrary() {
    container.innerHTML = ''; 

    for (let i = 0; i < myLibrary.length; i++) {
        addBookToLibraryDisplay(myLibrary[i], i);
    }
}