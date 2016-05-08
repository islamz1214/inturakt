import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  'removeNow'(planetInput) {
    // Verify ownership of planet
    if(Planets.find({name: planetInput, planetOwner: Meteor.user().username}).count() === 1) {
      // Verified --> remove planet
      Planets.remove({ $and:[{planetOwner: Meteor.user().username}, {name: planetInput}]});
      Messages.remove({planetRoom: planetInput});
    }
  },
  'planetAccess'(username, currentPlanet) {
    // If user owns planet that is private -> give other user access to planet
    Planets.update( {$and:[{name: currentPlanet},
                    {planetOwner: Meteor.user().username},
                    {status: "private"}]},
                    {$push: { access: username}},
                    {upsert: false});
  },
  'insertMessage'(message, room) {
     Messages.insert({
       userId: Meteor.userId(),
       user: Meteor.user().username,
       message: message,
       time: Date.now(),
       planetRoom: room,
     });
  },
  'createPublicPlanet'(planetInput) {
    Planets.insert({
      name: planetInput,
      status: "public",
      planetOwner: Meteor.user().username,
    });
  },
  'createPrivatePlanet'(planetInput) {
    Planets.insert({
      name: planetInput,
      status: "private",
      planetOwner: Meteor.user().username,
      access: [Meteor.user().username],
    });
  }


});


//main.js -> server
