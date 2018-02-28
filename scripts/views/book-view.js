'use strict';

var app = app || {};

((module) => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('#book-view').show();
    $('#book-list').empty();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-books').text(`Total Books: ${app.Book.all.length}`);
  };

  bookView.initAboutPage = () => {
    $('.container').hide();
    $('#about-view').show();
  };

  bookView.initDetailPage = (ctx) => {
    $('.container').hide();
    $('#detail-view').show();
    $('.detail').empty();
    let template = Handlebars.compile($('#detail-template').html());
    $('#detail-view').append(template(ctx));
  };

  bookView.initAddBook = () => {
    $('.container').hide();
    $('#form-view').show();
    $('#add-form').on('submit', event => {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.createBook(book);
    });
  };

  module.bookView = bookView;

})(app);

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});