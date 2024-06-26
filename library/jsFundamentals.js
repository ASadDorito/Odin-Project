const myLibrary = [];

const button = document.createElement('button');
button.textContent = 'Add new book';
document.body.appendChild(button)

const container = document.createElement('div');
container.id = 'array-container';
document.body.appendChild(container);

button.onclick = function() {
    addBooktoLibrary()
};



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

    form.onsubmit = function() {
        const newBook = new Book(title.value, author.value, pages.value, read.checked);
        myLibrary.push(newBook)
        container.innerHTML = ''
        for(let i = 0; i < myLibrary.length; i++) {
            addBookToLibraryDisplay(myLibrary[i]);
        }
        dialog.close();
        dialog.remove();
    };
}



function addBookToLibraryDisplay(book) {
    const article = document.createElement('article');

    const title = document.createElement('p');
    title.textContent = `Title: ${book.title}`;
    
    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.numPages}`;

    const read = document.createElement('p');
    read.textContent = `Read: ${book.read ? "Yes" : "No"}`;

    article.appendChild(title);
    article.appendChild(author);
    article.appendChild(pages);
    article.appendChild(read);

    container.appendChild(article);
}



function Book(title, author, numPages, read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}