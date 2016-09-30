# ah-pusher-plugin

Send email or push notification.
Provider sync and async function to push or mail.

## install from npm

`npm install ah-pusher-plugin --save`

`npm run actionhero link -- --name=ah-pusher-plugin`

## config

Please look config file at `config/plugin/ah-pusher-plugin.js`

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