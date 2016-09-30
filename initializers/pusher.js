'use strict';

//node-mailer https://github.com/nodemailer/nodemailer
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
    api.pusher.mail = {};

    api.pusher.mail.transport = nmailer.createTransport(configMail.options);
		
    api.pusher.mail.asyncSend = function(options, cb){
      /* add to task queue */
      api.tasks.enqueue('AHPusherSendMail', options, 'default', function(error, done) {
        
        if(error)
          cb(true);
        else
          cb();

      });
    };

    api.pusher.mail.syncSend = function(options, cb){
      
      //var options = {
      //  mail: {
      //    to: 'example@example.com.tw',
      //    subject: 'Say Hello From AH!'
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
          return Q.ninvoke(api.pusher.mail.transport, "sendMail", options.mail);
      }).nodeify(cb);
    };

    /* init node-pushnotifications */
    api.pusher.push = {}

    api.pusher.push.transport = new PushNotifications(configPush);
    
    api.pusher.push.asyncSend = function(options, cb){
      /* add to task queue */
      api.tasks.enqueue('AHPusherSendPush', options, 'default', function(error, done) {
        
        if(error)
          cb(true);
        else
          cb();

      });
    }

    api.pusher.push.syncSend = function(options, cb){

      //var options = {
      //  deviceIds: [ 'DEVICE_ID' ],
      //  data: {
      //    title: 'New push notification',
      //    message: 'Powered by AppFeel',
      //    otherfields: 'optionally add more data'
      //  }
      //};

      api.pusher.push.transport.send(options.deviceIds, options.data, function (result) {
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
