# ah-pusher-plugin

Send email or push notification.
Provider sync and async function to push or mail.

## config

Please look config file

## using async function

You must setting `config/tasks.js` `scheduler: true`, `minTaskProcessors > 0` and `maxTaskProcessors > 0` to use

## email
### api.pusher.mail.asyncSend(options,cb);
### api.pusher.mail.syncSend(options,cb);

```
var options = {
  mail: {
    to: 'example@example.com.tw',
    subject: 'Say Hello From AH!'
  },
  locals: {
    body: 'Hello! This is a test mail.'
  },
  template: 'default'
};
```

```
cb(err){
    //do something
}
```

## push
### api.pusher.push.asyncSend(options, cb);
### api.pusher.push.syncSend(options, cb);

```
var options = {
  deviceIds: [ 'DEVICE_ID' ],
  data: {
    title: 'New push notification',
    message: 'Powered by AppFeel',
    otherfields: 'optionally add more data'
  }
};
```

```
cb(err){
    //do something
}
```