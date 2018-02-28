'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', app.bookView.initAddBook);
page('/books/:id', app.bookView.initDetailPage);


page();