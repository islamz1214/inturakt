import './chat.html';



Template.chat.helpers({
        messages: function() {
        console.log(Meteor.user().emails[0].address);
        return Messages.find({}, { sort: { time: -1}});
      },
      currentUser: function() {
      return Meteor.user().username;
  }
    });

Template.chat.events = {
      'click #sendButton' : function(event) {

       const name = document.getElementById('name');
       const message = document.getElementById('message');

       if(name.value == '') {
         name.value = 'Anonymous';
       }

       if(message.value != '') {
         Messages.insert({
           user: Meteor.user().username,
           message: message.value,
           time: Date.now(),
         });
       }

       name.value = '';
       message.value = '';
     }
}
