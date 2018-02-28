'use strict';

var app = app || {};

// const __API_URL__ = 'http://localhost:3000';
const __API_URL__ = 'https://bp-bw-booklist.herokuapp.com';

((module) => {
  function errorCB(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').html());
    return template(this);
  };

  Book.prototype.displayDetails = function (data) {
    let template = Handlebars.compile($('#detail-template').html());
    return template(data);
  };

  Book.all = [];

  Book.loadAll = rows =>
    Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCB);

  Book.fetchOne = () =>
    $.get(`${__API_URL__}/api/v1/books/:id`)
      .then(results => Book.details = new Book(results))
      .catch(errorCB)
      .then(Book.displayDetails(Book.details))
      .catch(errorCB);

  Book.createBook = (book) => {
    $.post(`${__API_URL__}/api/v1/books/add`, book)
      .then(page('/'))
      .catch(errorCB);
  };

  Book.stats = () => {
    return {
      numBooks: Book.all.length,
    };
  };

  module.Book = Book;

})(app);