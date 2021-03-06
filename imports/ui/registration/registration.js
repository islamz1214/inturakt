import { Template } from 'meteor/templating';

import './registration.html';

Template.registration.events = {
  'click #registerButton' : function(event) {

    const username = document.getElementById('username').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
    });

    if(username != '' && email != '' && password != '') {
      FlowRouter.go("login");
    }
  }
}
