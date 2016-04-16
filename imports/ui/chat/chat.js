import './chat.html';



Template.chat.helpers({
  messages: function() {
    return Messages.find({});
  },
  currentUser: function() {
    return Meteor.user().username;
  },
  users: function() {
    //return Meteor.users.find({});
    return Meteor.users.find({});
  },
  userCount: function() {
    //return Meteor.users.find({});
    return Meteor.users.find({}).count();
  }

});

Template.chat.events = {
  'keypress input#message' : function(event) {

   const message = document.getElementById('message').value;

    if(event.which == 13 && message != '')
    {
      Messages.insert({
        user: Meteor.user().username,
        message: message,
        time: Date.now(),
      });

      document.getElementById('message').value = '';
      event.preventDefault();
    }
  }
}
