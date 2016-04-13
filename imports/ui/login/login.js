import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



import './login.html';



Template.login.events = {
  'click #loginButton' : function(event) {

    event.preventDefault();

    const username = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    Meteor.loginWithPassword(username, password, function(error){
    if(error){
        console.log(error.reason);
    } else {
        FlowRouter.go("chat");
    }
});





    }
}
