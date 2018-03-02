'use strict';

if(window.location.pathname !== '/') {
  page.base('/book-list-client');
}

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', app.bookView.initAddBook);
page('/books/aboutus', app.bookView.initAboutPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/admin', app.adminView.initAdminPage);

page();