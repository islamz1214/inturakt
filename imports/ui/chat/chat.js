import './chat.html';
import './planet.html';
import './message.html';
import './messages.html';
import './directMessage.html';



let giphyMessage;

Template.chat.helpers({
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
  planetAccess: function() {
    const currentPlanet = Session.get('planet');
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
    return Messages.find({'planetRoom': currentPlanet});
  },
  userIconColor: function(user) {
    var doc = Meteor.users.findOne({'username': user}, {'iconColor':1});
    return doc.iconColor;
  }

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

Template.chat.events = {
  'keypress input#message' : function(event) {
    let message = document.getElementById('message').value;

    const match = message.match(/^-giphy(.*)/);

    if(event.which == 13 && message.trim() != '')
    {
      if(match) {
        // GIF message
      	message = match[1];
        giphyPicker(message, function() {
          Meteor.call('insertMessage', giphyMessage, getRoom());
          document.getElementById('message').value = '';
        });
        event.preventDefault();
      } else {
        Meteor.call('insertMessage', message, getRoom());
        document.getElementById('message').value = '';
        event.preventDefault();
      }
    }
  },
  'click .sendMessageButton' : function(event) {
    let message = document.getElementById('message').value;

    const match = message.match(/^-giphy(.*)/);

    if(message.trim() != '')
    {
      if(match) {
        // GIF message
      	message = match[1];
        giphyPicker(message, function() {
          Meteor.call('insertMessage', giphyMessage, getRoom());
          document.getElementById('message').value = '';
        });
        event.preventDefault();
      } else {
        Meteor.call('insertMessage', message, getRoom());
        document.getElementById('message').value = '';
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  },
  'click .planet-list': function(event) {
    Session.set('planet', this.name);
    if(Planets.find({ $and:[{name: Session.get('planet')}, {access: { $exists: false}}]}).count() === 1) {
      console.log("public room");
      Session.set('planet', this.name);
    } else if (Planets.find({ $and:[{name: Session.get('planet')}, {access: Meteor.user().username}]}).count() === 1) {
      console.log("has access");
      Session.set('planet', this.name);
    } else {
      console.log("access denied");
      Session.set('planet', 'Universe');
    }
  },
  'click .directMessage-list': function(event) {
    Session.set('user', dm_generater(Meteor.user().username + this.username));
  },
  'click .create-planet-icon': function(event) {
    $('#create-planet-modal').modal('show');
  },
  'click .createPlanetButton': function(event, template) {
    const planetInput = template.find('.createPlanetInput').value;

    if(document.getElementById('private-radio').checked) {
      if(planetInput.trim() != '') {
        Meteor.call('createPrivatePlanet', planetInput);
      }
    } else if(document.getElementById('public-radio').checked) {
      if(planetInput.trim() != '') {
        Meteor.call('createPublicPlanet', planetInput);
      }
    } else {
      console.log("Planet not created");
    }

    template.find('.createPlanetInput').value = "";
  },
  'click .settings-icon': function(event) {
    $('#settings-modal').modal('show');
  },
  'click .removePlanetButton': function(event, template) {
    const planetInput = template.find('.removePlanetInput').value;
    Meteor.call('removeNow', planetInput);
    template.find('.removePlanetInput').value = ""
  },
  'click .planetAccessButton' : function(event, template) {
    const userAccess = template.find('.planetAccessInput').value;
    const currentPlanet = Session.get('planet')
    Meteor.call('planetAccess', userAccess, currentPlanet);
    template.find('.planetAccessInput').value = "";
  },
  'click .logoutButton' : function(event) {
    Meteor.logout();
    FlowRouter.go("login");
  },
  'click .setIconColorButton' : function (event, template) {
    const iconColor = template.find('.iconColorInput').value;
    Meteor.call('setIconColor', iconColor);
  }
}

function getRoom() {
  if(Session.get('planet') == "") {
    return Session.get('user');
  } else {
    return Session.get('planet');
  }
}

function dm_generater(roomId) {
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

function giphyPicker(message, callback) {

	request = new XMLHttpRequest;
	request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+message, true);

	request.onload = function() {

		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
      giphyMessage = '<img src = "'+data+'" id="giphyIMG">';
      callback(giphyMessage);
    } else {
			console.log('reached giphy, but API returned an error');
		 }
	};

	request.onerror = function() {
		console.log('connection error');
	};

	request.send();
}
