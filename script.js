const myLibrary = [];
const addBook = document.querySelector('#add-book');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function openForm() {
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('page-mask').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('page-mask').style.display = 'none';
}

// window.onclick = () => closeForm();
