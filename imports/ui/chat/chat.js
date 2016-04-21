import './chat.html';
import './planet.html';
import './message.html';
import './messages.html';



Template.chat.helpers({
  messages: function(planet) {
    return Messages.find({planet: planet});
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
  }
});

Template.messages.helpers({
  messages: function() {
    const currentPlanet = Session.get('planet');
    return Messages.find({'planetRoom': currentPlanet});
  },
});




Template.planet.helpers({
	active: function () {
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
      planetRoom: Session.get('planet'),
    });

      document.getElementById('message').value = '';
      event.preventDefault();
    }
  },
  'click .planet-list': function(event) {
    console.log(this.name);
    Session.set('planet', this.name);
  }
}
