import { FlowRouter } from 'meteor/kadira:flow-router';
import { layout } from '../imports/ui/layout/layout.js';
import { home } from '../imports/ui/home/home.js';
import { login } from '../imports/ui/login/login.js';
import { registration } from '../imports/ui/registration/registration.js';
import { chat } from '../imports/ui/chat/chat.js';


function checkLogin(){
  if(!Meteor.userId()){
    FlowRouter.go("login");
  }
}

function checkAlreadyLogged() {
  if(Meteor.userId()){
    FlowRouter.go("chat");
  }
}

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("home");
  }
});

FlowRouter.route('/login',{
  name:"login",
  triggersEnter: [checkAlreadyLogged],
  action: function(){
    BlazeLayout.render("login");
  }
});

FlowRouter.route('/registration',{
  name:"registration",
  triggersEnter: [checkAlreadyLogged],
  action: function(){
    BlazeLayout.render("registration");
  }
});

FlowRouter.route('/chat',{
  name:"chat",
  triggersEnter: [checkLogin],
  action: function(){
    BlazeLayout.render("chat", {content: "messages"});
  }
});
