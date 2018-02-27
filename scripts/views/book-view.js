'use strict';

const app = app || {};


((module) => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('#about').hide();
    $('.book-view').show()//TODO build book-view
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  };

})(app);