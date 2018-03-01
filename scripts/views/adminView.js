'use strict';

var app = app || {};

// const __API_URL__ = 'http://localhost:3000';
// const __API_URL__ = 'https://bp-bw-booklist.herokuapp.com';

((module) => {
  const adminView = {};

  adminView.initAdminPage = () => {
    $('.container').hide();
    $('#admin-view').show();
    $('#admin-form').on('submit', adminView.verify);
  };

  adminView.verify = (event) => {
    event.preventDefault();

    let tokenEntered = event.target.passphrase.value;
console.log(tokenEntered);
    $.get(`${__API_URL__}/admin`, {tokenEntered})
      .then(verified => {
        console.log(verified);
        if (verified) {
          localStorage.admin = true;
          page('/');
        } else {
          localStorage.admin = false;
          page('/');
        }
      })
      .catch(app.errorCB);
  };

  module.adminView = adminView;

})(app);