'use strict';

//node-pushnotifications https://github.com/appfeel/node-pushnotifications

var PushNotifications = require('node-pushnotifications');
var nmailer = require('nodemailer');
var emailTemplates = require('email-templates');
var Q = require('q');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    var configMail = api.config.pusher.Mail;
    var configPush = api.config.pusher.Push;
    
    api.pusher = {};
    
    /* Mail */
    api.pusher.sendMailTransport = nmailer.createTransport(configMail.options);
		
    api.pusher.sendMail = function(options, cb){
      /* add to task queue */
      api.tasks.enqueue('sendMail', options, 'default', function(error, done) {
        
        if(error)
          cb(true);
        else
          cb();

      });
    };

    api.pusher._sendMail = function(options, cb){
      
      //var options = {
      //  mail: {
      //    to: 'ericli1018@yahoo.com.tw',
      //    subject: 'Say Hello From IO!'
      //  },
      //  locals: {
      //    body: 'Hello! This is a test mail.'
      //  },
      //  template: 'default'
      //};

      if (!(options.mail && options.locals)){
        throw new Error("Invalid options. Must contain template, mail, and locals property");
      }
      if (!options.mail.from){
        options.mail.from = configMail.mailOptions.from;
      }
      if(!options.template){
        options.template = configMail.mailOptions.template;
      }

      return Q.nfcall(emailTemplates, configMail.templates).then(function(template) {
          return Q.nfcall(template, options.template, options.locals);
      }).then(function(resolved) {
          options.mail.html = resolved[0];
          options.mail.text = resolved[1];
          return Q.ninvoke(api.pusher.sendMailTransport, "sendMail", options.mail);
      }).nodeify(cb);
    };

    /* init node-pushnotifications */
    api.pusher.push = new PushNotifications(configPush);
    
    api.pusher.sendPush = function(options, cb){
      /* add to task queue */
      api.tasks.enqueue('sendPush', options, 'default', function(error, done) {
        
        if(error)
          cb(true);
        else
          cb();

      });
    }

    api.pusher._sendPush = function(options, cb){

      //var options = {
      //  deviceIds: [ 'DEVICE_ID' ],
      //  data: {
      //    title: 'New push notification',
      //    message: 'Powered by AppFeel',
      //    otherfields: 'optionally add more data'
      //  }
      //};

      api.pusher.push.send(options.deviceIds, options.data, function (result) {
        if(result === true)
          cb();
        else
          cb(result);
      });
    }
    
    next();
  },
  start: function(api, next){
    next();
  },
  stop: function(api, next){
    next();
  }
};
