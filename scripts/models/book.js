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

  Book.all = [];

  Book.loadAll = rows =>
    Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCB);

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCB);

  Book.createBook = (book) => {
    $.post(`${__API_URL__}/api/v1/books/add`, book)
      .then(() => page('/'))
      .catch(errorCB);
  };

  Book.delete = (bookId) => {
    if (localStorage.admin === 'true') {
      $.ajax({
        url: `${__API_URL__}/api/v1/books/${bookId}`,
        method: 'DELETE'
      })
        .then(() => page('/'))
        .catch(errorCB);
    } else module.adminView.initAdminPage();
  };

  Book.updateBook = (book) => {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book.book_id}`,
      method: 'PUT',
      data: book
    })
      .then(() => page('/'))
      .catch(errorCB);
  };

  module.Book = Book;

})(app);