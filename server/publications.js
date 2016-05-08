Meteor.publish('getMessages', function messages(planet) {
   return Messages.find({planet: planet});
});

Meteor.publish(null,function planets() {
   return Planets.find();
});

Meteor.publish(null, function users() {
    return Meteor.users.find({});
});
