'use strict';

exports.task = {
  name:          'sendMail',
  description:   'My Task',
  frequency:     0,
  queue:         'default',
  middleware:    [],

  run: function(api, params, next){

    return api.pusher._sendMail(params).then(function(response) {
        
        return next(null, response);
	    })["catch"](function(err) {
		    
        api.log("Error sending mail", 'crit', err.message);
		    api.log(err.stack, 'error');
		    
        return next(err, null);
	    });

  }
};
