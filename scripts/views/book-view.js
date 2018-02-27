'use strict';

var app = app || {};

((module) => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('#about').hide();
    $('#error-view').hide();
    $('#book-list').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-books').text(`Total Books: ${app.Book.all.length}`);
  };

  module.bookView = bookView;

})(app);