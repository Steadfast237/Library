class Book {
  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }

  #isRead() {
    return this.read ? 'read' : 'not read yet';
  }

  #info() {
    return `${this.title} by ${this.author}, ${
      this.numberOfPages
    }, ${this.#isRead()}`;
  }

  toggleRead() {
    this.read = this.read ? false : true;
  }
}

class Library {
  #books = [];

  getBooks() {
    return this.#books;
  }

  addBook(book) {
    this.#books.push(book);
  }

  deleteBook(bookIndex) {
    this.#books = this.#books.filter((_, index) => index !== bookIndex);
  }

  updateBookStatus(bookIndex) {
    const book = this.#books[bookIndex];
    book.toggleRead();
  }
}

const ScreenController = function () {
  const library = new Library();
  const table = document.querySelector('table');
  const tbody = document.querySelector('tbody');
  const bookForm = document.querySelector('#book-form');

  const clickHandlerTable = function (e) {
    const target = e.target;

    if (target.tagName !== 'BUTTON') return;

    const action = target.dataset.action.split('_')[0];
    const bookIndex = Number(target.dataset.action.split('_')[1]);

    switch (action) {
      case 'read':
        library.updateBookStatus(bookIndex);
        updateTableScreen();
        break;

      case 'delete':
        library.deleteBook(bookIndex);
        updateTableScreen();
        break;
    }
  };

  const clickHandlerForm = function (e) {
    e.preventDefault();

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    library.addBook(
      new Book(title.value, author.value, pages.value, read.value)
    );

    // clean form fields
    title.value = null;
    author.value = null;
    pages.value = null;
    read.selectedIndex = 0;

    updateTableScreen();
  };

  const updateTableScreen = function () {
    tbody.textContent = '';

    library.getBooks().forEach((book, index) => {
      const tr = document.createElement('tr');

      const tdTitle = document.createElement('td');
      const tdAuthor = document.createElement('td');
      const tdPages = document.createElement('td');
      const tdRead = document.createElement('td');
      const tdActions = document.createElement('td');
      const btnRead = document.createElement('button');
      const btnDelete = document.createElement('button');

      tdActions.classList.add('actions');
      btnRead.classList.add('toggle-read');
      btnDelete.classList.add('delete');
      btnRead.dataset.action = `read_${index}`;
      btnDelete.dataset.action = `delete_${index}`;

      tdTitle.textContent = `${book.title}`;
      tdAuthor.textContent = `${book.author}`;
      tdPages.textContent = `${book.numberOfPages}`;
      tdRead.textContent = `${book.read}`;
      btnRead.textContent = book.read ? 'Mark as Read' : 'Mark as Unread';
      btnDelete.textContent = 'Delete';

      tdActions.appendChild(btnRead);
      tdActions.appendChild(btnDelete);

      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdRead);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  };

  table.addEventListener('click', clickHandlerTable);
  bookForm.addEventListener('submit', clickHandlerForm);

  updateTableScreen();
};

ScreenController();
