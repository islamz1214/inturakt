import { FlowRouter } from 'meteor/kadira:flow-router';

import { layout } from '../imports/ui/layout/layout.js';
import { home } from '../imports/ui/home/home.js';
import { login } from '../imports/ui/login/login.js';
import { registration } from '../imports/ui/registration/registration.js';
import { chat } from '../imports/ui/chat/chat.js';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/login',{
  name:"login",
  action: function(){
    BlazeLayout.render("login");
  }
});

FlowRouter.route('/registration',{
  name:"registration",
  action: function(){
    BlazeLayout.render("registration");
  }
});

FlowRouter.route('/chat',{
  name:"chat",
  action: function(){
    BlazeLayout.render("chat");
  }
});
