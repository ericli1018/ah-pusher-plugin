'use strict';

exports.task = {
  name:          'AHPusherSendPush',
  description:   'ah-pusher-plugin send push',
  frequency:     0,
  queue:         'default',
  middleware:    [],
  run: function(api, params, next){
    return api.pusher.push.syncSend(params).then(function(response) {
        return next(null, response);
	    })["catch"](function(err) {
		    api.log("Error sending push", 'crit', err.message);
		    api.log(err.stack, 'error');
		    return next(err, null);
	    });
  }
};
