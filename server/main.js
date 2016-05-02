import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  'removeNow'(planetInput) {
    // Verify ownership of planet
    if(Planets.find({name: planetInput, planetOwner: Meteor.user().username}).count() === 1) {
      // Verified --> remove planet
      console.log("you can remove!");
      Planets.remove({planetOwner: "Mike"});
    } else {
      console.log("you can't remove!");
    }
  },
});
