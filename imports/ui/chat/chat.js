import './chat.html';


Template.chat.helpers({
  messages: function() {
    return Messages.find({});
  },
  currentUser: function() {
    return Meteor.user().username;
  },
  users: function() {
    return Meteor.users.find({});
  },
  userCount: function() {;
    return Meteor.users.find({}).count();
  },
  planets: function () {
    return Planets.find();
  },
  planetCount: function() {
    return Planets.find({}).count();
  },
  active: function() {
    if (Session.get('planet') === this.name) {
      return "active";
    } else {
      return "";
    }
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
  },
  'click .planet-list.active': function(event) {
    Session.set('channel', this.name);
  }
}
