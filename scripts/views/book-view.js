'use strict';

var app = app || {};

((module) => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('#book-view').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-books').text(`Total Books: ${app.Book.all.length}`);
  };

  bookView.initDetailPage = function() {
    $('.container').hide();
    $('#detail-view').show();
    $('#detail-view').append(app.Book.displayDetails());
  };

  module.bookView = bookView;

})(app);

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});