import './chat.html';


Template.messages.helpers({
        messages: function() {
        return Messages.find({}, { sort: { time: -1}});
        }
    });

Template.chatInput.events = {
      'click #sendButton' : function(event) {

       const name = document.getElementById('name');
       const message = document.getElementById('message');

       if(name.value == '') {
         name.value = 'Anonymous';
       }

       if(message.value != '') {
         Messages.insert({
           name: name.value,
           message: message.value,
           time: Date.now(),
         });
       }

       name.value = '';
       message.value = '';
     }
}
