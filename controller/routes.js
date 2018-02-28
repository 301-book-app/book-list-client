'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:id', app.Book.initDetailPage);
page('/books/new', app.Book.initAddBook);


page();