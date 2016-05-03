import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  'removeNow'(planetInput) {
    // Verify ownership of planet
    if(Planets.find({name: planetInput, planetOwner: Meteor.user().username}).count() === 1) {
      // Verified --> remove planet
      Planets.remove({ $and:[{planetOwner: "Mike"}, {name: planetInput}]});
    } else {
      console.log("you can't remove!");
    }
  },
  'planetAccess'(username, currentPlanet) {
    // If user owns planet that is private -> give other user access to planet
    Planets.update( {$and:[{name: currentPlanet}, {planetOwner: Meteor.user().username}, {status: "private"}]}, { $push: { access: username}}, {upsert: false});
  },
});
