'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', app.bookView.initAddBook);
page('/books/aboutus', app.bookView.initAboutPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/admin', app.adminView.initAdminPage);

page();