'use strict';

var app = app || {};

((module) => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('#book-list').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-books').text(`Total Books: ${app.Book.all.length}`);
  };

  module.bookView = bookView;

})(app);

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});