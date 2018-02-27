'use strict';

const app = app || {};

//const __API_URL__ = 'http://localhost:3000';
const __API_URL__ = 'https://bp-bw-booklist.herokuapp.com';

((module) =>{
  function errorCB(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
  }

  Book.prototype.toHTML = function () {
    let template = Handlebars.compile($('#book-template').text());
    return template(this);
  };

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCB);
  };

  module.Book = Book;
})(app);

