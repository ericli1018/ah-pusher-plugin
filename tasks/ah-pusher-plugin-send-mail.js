'use strict';

exports.task = {
  name:          'AHPusherSendMail',
  description:   'ah-pusher-plugin send mail',
  frequency:     0,
  queue:         'default',
  middleware:    [],
  run: function(api, params, next){
    return api.pusher.mail.syncSend(params).then(function(response) {
        return next(null, response);
	    })["catch"](function(err) {
		    api.log("Error sending mail", 'crit', err.message);
		    api.log(err.stack, 'error');
		    return next(err, null);
	    });
  }
};
