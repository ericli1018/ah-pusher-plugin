'use strict';

exports.task = {
  name:          'sendPush',
  description:   'My Task',
  frequency:     0,
  queue:         'default',
  middleware:    [],

  run: function(api, params, next){
    return api.pusher._sendPush(params).then(function(response) {
        
        return next(null, response);
	    })["catch"](function(err) {
		    
        api.log("Error sending Push", 'crit', err.message);
		    api.log(err.stack, 'error');
		    
        return next(err, null);
	    });
  }
};
