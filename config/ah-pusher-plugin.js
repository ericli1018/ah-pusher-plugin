exports['default'] = {
  pusher: function(api){
    return {
      Mail: {
        options: {
          service: 'smtp',
          transport: 'smtp',
		      pool: true,
          host: "smtp.amsalp.com.tw",
          port: 25,
          secure: false,
          name: "smtp-mailer",
          auth: {
            user: "no-replay@amsalp.com.tw",
            pass: "zaq1XSW@"
          }
        },
        /*
        Default options when sending email.
        Define other fields here if you wish.
         */
        mailOptions: {
          from: "no-replay@amsalp.com.tw",
          template: "default"
        },

        /*
        Email templates directory.
        Defaults to root `templates` directory.
         */
        templates: __dirname + "/../templates"
      },
      Push: {
        gcm: {
          id: null, // PUT YOUR GCM SERVER API KEY,
          msgcnt: 1,
          dataDefaults: {
            delayWhileIdle: false,
            timeToLive: 4 * 7 * 24 * 3600, // 4 weeks
            retries: 4,
          },
          // Custom GCM request options https://github.com/ToothlessGear/node-gcm#custom-gcm-request-options
          options: {},
        },
        apn: {
          gateway: 'gateway.sandbox.push.apple.com',
          badge: 1,
          defaultData: {
            expiry: 4 * 7 * 24 * 3600, // 4 weeks
            sound: 'ping.aiff'
          },
          // See all available options at https://github.com/argon/node-apn/blob/master/doc/connection.markdown
          options: {},
          // I.e., change .cert location file:
          // options: {
          //    cert: "/certs/ios/mycert.cert" // {Buffer|String} The filename of the connection certificate to load from disk, or a Buffer/String containing the certificate data. (Defaults to: cert.pem)
          // }
        },
        adm: {
          client_id: null, // PUT YOUR ADM CLIENT ID,
          client_secret: null, // PUT YOUR ADM CLIENT SECRET,
          expiresAfter: 4 * 7 * 24 * 3600, // 4 weeks
          // Custom ADM request options, same as https://github.com/ToothlessGear/node-gcm#custom-gcm-request-options
          options: {},
        },
      }
    };
  }
};
