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

  bookView.initDetailPage = (ctxBook) => {
    $('.container').hide();
    $('#detail-view').show();
    $('#detail-view').empty();
    let template = Handlebars.compile($('#detail-template').html());
    $('#detail-view').append(template(ctxBook));
    $('#update-form-view').hide();
    $('#delete-button').on('click', (event) => {
      module.Book.delete(event.target.attributes['data-id'].value);
    });
    $('#update-button').on('click', () => {
      if (localStorage.admin === 'true') {
        $('#update-form-view').show();
        $('#update-form').on('submit', (event) => {
          event.preventDefault();

          let book = {
            book_id: $('#update-form button').data('id'),
            title: event.target.title.value,
            author: event.target.author.value,
            isbn: event.target.isbn.value,
            image_url: event.target.image_url.value,
            description: event.target.description.value,
          };
          module.Book.updateBook(book);
          page('/');
        });
      }
      else module.adminView.initAdminPage();
    });
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