import './chat.html';
import './planet.html';
import './message.html';
import './messages.html';
import './directMessage.html';



Template.chat.helpers({
  messages: function(planet) {
    return Messages.find({planet: planet});
  },
  currentUser: function() {
    return Meteor.user().username;
  },
  users: function() {
    return Meteor.users.find({_id:{$ne:Meteor.userId()}});
  },
  userCount: function() {;
    return Meteor.users.find({_id:{$ne:Meteor.userId()}}).count();
  },
  planets: function () {
    return Planets.find();
  },
  planetCount: function() {
    return Planets.find({}).count();
  },

});

Template.messages.helpers({
  messages: function() {
    let currentPlanet;
    if(Session.get('planet') == "") {
      currentPlanet = Session.get('user');
    } else {
      currentPlanet = Session.get('planet');
    }
    console.log(Meteor.userId());
    return Messages.find({'planetRoom': currentPlanet});
  },
});


Template.planet.helpers({
	active: function () {
		if (Session.get('planet') === this.name) {
      Session.set('user', "");
			return "active";
		} else {
			return "";
		}
	},
  getStatusSymbol: function(status) {
    if(status === "public") {
      // Hashtag icon
      return "\u0023";
    } else {
      // Lock icon
      return 	"\uD83D\uDD12";
    }
  }
});


Template.directMessage.helpers({
	active: function () {
		if (Session.get('user') === dm_generater(Meteor.user().username + this.username)) {
      Session.set('planet', "");
			return "active";
		} else {
			return "";
		}
	}
});



function getRoom() {
  if(Session.get('planet') == "") {
    return Session.get('user');
  } else {
    return Session.get('planet');
  }
}

function dm_generater(roomId) {
  //let dm = Session.get('user');

  let dm = roomId;

  let total = 0;

  for(let i = 0; i<dm.length; i++)
  {
    if(!isNaN(dm[i])) {
      total = total + parseInt(dm[i]);
    } else {
      if(dm.charCodeAt(i) >= 65 && dm.charCodeAt(i) <= 90) {
        // Uppercase ASCII
        total = total + (dm.charCodeAt(i) - 64);
      } else {
        // Lowercase ASCII
        total = total +  (dm.charCodeAt(i) - 96);
      }
    }
  }

  return total;

}

Template.chat.events = {
  'keypress input#message' : function(event) {

   const message = document.getElementById('message').value;

    if(event.which == 13 && message.trim() != '')
    {
      Messages.insert({
        user: Meteor.user().username,
        message: message,
        time: Date.now(),
        planetRoom: getRoom(),
      });

      document.getElementById('message').value = '';
      event.preventDefault();
    }
  },
  'click .planet-list': function(event) {
    Session.set('planet', this.name);
  },
  'click .directMessage-list': function(event) {
    Session.set('user', dm_generater(Meteor.user().username + this.username));
  },
  'click .create-planet-icon': function(event) {
    $('#create-planet-modal').modal('show');
  },
  'click .buttonCreatePlanet': function(event, template) {
    const planetInput = template.find('.inputCreatePlanet').value;

    if(planetInput.trim() != '') {
      Planets.insert({
        planetOwner: Meteor.user().username,
        name: planetInput,
        status: status,
      });
    }
  },
  'click .settings-icon': function(event) {
    $('#settings-modal').modal('show');
  },
  'click .buttonRemovePlanet': function(event, template) {

    const planetInput = template.find('.inputRemovePlanet').value;
    Meteor.call('removeNow', planetInput);
    /*
    // Verify ownership of planet
    if(Planets.find({name: planetInput, planetOwner: Meteor.user().username}).count() === 1) {
      // Verified --> remove planet
      console.log("you can remove!");
      Planets.remove({planetOwner: "Mike"});
    } else {
      console.log("you can't remove!");
    }
*/

  },


}
