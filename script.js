let myLibrary = [];
const addBookBtn = document.getElementById('add-book');
const bookForm = document.getElementById('myForm');
const pageMask = document.getElementById('page-mask');
const cardContainer = document.getElementById('card-container');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function isInLibrary(newBook) {
  return myLibrary.some((book) => book.title === newBook.title);
}

function openForm() {
  bookForm.style.display = 'block';
  pageMask.style.display = 'block';
}

function closeForm() {
  const doubleError = document.querySelector('.doubleError');
  bookForm.style.display = 'none';
  pageMask.style.display = 'none';
  doubleError.remove();
}

function changeReadStatus(el, classname) {
  if (el.classList.contains(classname)) {
    el.classList.remove(classname);
  } else {
    el.classList.add(classname);
  }
}

function removeBookCard(e, book) {
  e.parentElement.remove();
  myLibrary = myLibrary.filter((el) => el.title !== book.title);
}

function addBookCard(newBook) {
  const bookReadStatus = document.getElementById('readStatus').checked;
  const bookCard = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const bookPages = document.createElement('p');
  const readBtn = document.createElement('button');
  const rmvBtn = document.createElement('button');

  bookCard.classList.add('card');
  readBtn.setAttribute('id', 'readToggle');
  readBtn.classList.add('readToggle');
  bookTitle.innerText = newBook.title;
  bookAuthor.innerText = newBook.author;
  bookPages.innerText = newBook.pages;
  readBtn.textContent = 'Read';
  rmvBtn.textContent = 'Remove';
  rmvBtn.setAttribute('id', 'removeBook');
  rmvBtn.addEventListener('click', (e) => { removeBookCard(e.target, newBook); });
  readBtn.addEventListener('click', (e) => { changeReadStatus(e.target, 'on'); });

  if (bookReadStatus === true) {
    readBtn.classList.add('on');
  }

  bookCard.append(bookTitle);
  bookCard.append(bookAuthor);
  bookCard.append(bookPages);
  bookCard.append(readBtn);
  bookCard.append(rmvBtn);
  cardContainer.append(bookCard);
}

function takeBookInputs() {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const bookPages = document.getElementById('pages').value;
  const bookReadStatus = document.getElementById('readStatus').checked;

  return new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
}

function addToLibrary(e) {
  e.preventDefault();
  const newBook = takeBookInputs();

  if (!isInLibrary(newBook)) {
    myLibrary.push(newBook);
    addBookCard(newBook);
    closeForm();
  } else {
    const doubleError = document.createElement('p');
    doubleError.textContent = 'This book already exists in your Library!';
    doubleError.style.color = 'red';
    doubleError.classList.add('doubleError');
    bookForm.append(doubleError);
  }
}

document.getElementById('addBookSubmit').addEventListener('click', addToLibrary);

addBookBtn.addEventListener('click', openForm);

pageMask.addEventListener('click', closeForm);
