'use strict';

const app = app || {};

//const __API_URL__ = 'http://localhost:3000';
const __API_URL__ = 'https://'

authorData = function() {
    var template = Handlebars.compile($('#author-data-template').text());
    let data = {};
    return template(data);
  };