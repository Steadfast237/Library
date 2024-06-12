// Book Constructor
function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  const read = this.isRead ? 'read' : 'not read yet';

  return `${this.title} by ${this.author}, ${this.numberOfPages}, ${read}`;
};

Book.prototype.toggleRead = function () {
  this.isRead = this.isRead === true ? false : true;
};

// Library
let books = [
  new Book('test_1', 'author_1', 4, true),
  new Book('test_2', 'author_2', 12, true),
  new Book('test_3', 'author_3', 10, false),
];

function addBook(book) {
  books.push(book);
}

function deleteBook(index) {
  books = books.filter((_, id) => id !== index);
}

function updateBook(index) {
  book = books[index];
  book.toggleRead();
}

function getBooks() {
  return books;
}

// DOM
const form = document.querySelector('.form');
const tbody = document.querySelector('.tbody');

function addBookToLibrary(e) {
  e.preventDefault();

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  addBook(newBook);

  tbody.textContent = null;
  displayBooks();
  addClick();

  title.value = null;
  author.value = null;
  pages.value = null;
  read.checked = null;
}

function deleteBookFromLibrary(e) {
  deleteBook(Number(e.target.dataset.position));

  tbody.textContent = null;
  displayBooks();
  addClick();
}

function displayBooks() {
  books.forEach((book, id) => {
    const tr = document.createElement('tr');

    const index = document.createElement('td');
    const title = document.createElement('td');
    const author = document.createElement('td');
    const pages = document.createElement('td');
    const read = document.createElement('button');
    const deleteBtn = document.createElement('button');

    index.textContent = id;
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.numberOfPages;

    read.textContent = book.isRead;
    read.dataset.position = `${id}`;
    read.setAttribute('class', 'btn-status');

    deleteBtn.textContent = 'delete';
    deleteBtn.dataset.position = `${id}`;
    deleteBtn.setAttribute('class', 'btn-del');

    tr.appendChild(index);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(read);
    tr.appendChild(deleteBtn);

    tbody.appendChild(tr);
  });
}

function addClick() {
  const delButtons = document.querySelectorAll('.btn-del');
  const statusButtons = document.querySelectorAll('.btn-status');

  delButtons.forEach((btn) =>
    btn.addEventListener('click', deleteBookFromLibrary)
  );

  statusButtons.forEach((btn) =>
    btn.addEventListener('click', function (e) {
      updateBook(Number(e.target.dataset.position));

      tbody.textContent = null;
      displayBooks();
      addClick();
    })
  );
}

displayBooks();
addClick();
form.addEventListener('submit', addBookToLibrary);
