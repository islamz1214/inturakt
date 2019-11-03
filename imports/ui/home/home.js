import { Template } from 'meteor/templating';

import './home.html';

Template.home.events = {
  'click #homeLogin' : function(event) {
    FlowRouter.go("login");
  }
}
