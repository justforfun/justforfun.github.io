'use strict';

importScripts('indexdbwrapper.js', 'parse-1.4.2.js');


/***
var YAHOO_WEATHER_API_ENDPOINT = 'https://query.yahooapis.com/' +
  'v1/public/yql?q=select%20*%20from%20weather.forecast%20where%' +
  '20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where' +
  '%20text%3D%22london%2C%20uk%22)&format=json&env=store%3A%2F%2' +
  'Fdatatables.org%2Falltableswithkeys';
***/

// var YAHOO_WEATHER_API_ENDPOINT='http://data.kataweb.it/storage/static/iwatch/iwatch-push-sent.html';  
var YAHOO_WEATHER_API_ENDPOINT='https://justforfun.github.io/endpoint.html';  
//var YAHOO_WEATHER_API_ENDPOINT='https://justforfun.github.io/rep-endpoint.json';  

var KEY_VALUE_STORE_NAME = 'key-value-store';

var idb;


// Parse Parameteers
// Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, PARSE_MASTER_KEY);
var PARSE_APPLICATION_ID='OtIe34Q9MQ6gwtjO1q5XOryZ5cowx6W2NOw9KEsR';
var PARSE_JAVASCRIPT_KEY='9w4oZHDrl1Rb5TxVLwsyFeaWkw6wULLwEqMswCeY';



// avoid opening idb until first call
function getIdb() {
  if (!idb) {
    idb = new IndexDBWrapper('key-value-store', 1, function(db) {
      db.createObjectStore(KEY_VALUE_STORE_NAME);
    });
  }
  return idb;
}

function showNotification(title, body, icon, data) {
  var notificationOptions = {
    body: body,


    // icona con logo Rep.it
    icon: icon ? icon : 'images/icon-152.png',
    tag: 'simple-push-demo-notification',
    data: data
  };
  if (self.registration.showNotification) {
    self.registration.showNotification(title, notificationOptions);
    return;
  } else {
    new Notification(title, notificationOptions);
  }
}

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  console.log('PARSE_APPLICATION_ID:' + PARSE_APPLICATION_ID);
  

  //if (!Parse) {
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  //};
  console.log('Parse Inizializzato');
  
  //console.log('Parse Config:' + JSON.stringify(Parse.Config.current());
  /***
  var dimensions = {
    browser: 'Chrome',
    version: '43'
  };

  Parse.Analytics.track('push_received', dimensions).then(function(result) {
    // loaded
    console.log('Evento loggato', result);
  }, function(err) {
    // failed
    console.log('Errore', err);
  });
  ***/

  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch(YAHOO_WEATHER_API_ENDPOINT).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }

      // Examine the text in the response
      return response.json().then(function(data) {
        console.log('Data = ', JSON.stringify(data));
        
        /***
        if (data.query.count === 0) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error();
        }
        ***/
        
        var title = 'Repubblica.it';
        //var message = data.query.results.channel.item.condition.text;
        console.log('Testo alert', data.alert.text);
        var message = data.alert;
        
        /***
        var icon = data.query.results.channel.image.url ||
          'images/touch/chrome-touch-icon-192x192.png';
        ***/

        //var icon = 'images/icon-152.png';
        var icon = data.img || 'images/icon-152.png';
        
        var notificationTag = 'simple-push-demo-notification';

        // Add this to the data of the notification
        // var urlToOpen = data.query.results.channel.link;
        var urlToOpen = 'http://larep.it/'+ data.u;

        if (!Notification.prototype.hasOwnProperty('data')) {
          // Since Chrome doesn't support data at the moment
          // Store the URL in IndexDB
          getIdb().put(KEY_VALUE_STORE_NAME, notificationTag, urlToOpen);
        }

        var notificationFilter = {
          tag: 'simple-push-demo-notification'
        };

        var notificationData = {
          url: urlToOpen
        };

        if (self.registration.getNotifications) {
          return self.registration.getNotifications(notificationFilter)
            .then(function(notifications) {
              if (notifications && notifications.length > 0) {
                // Start with one to account for the new notification
                // we are adding
                var notificationCount = 1;
                for (var i = 0; i < notifications.length; i++) {
                  var existingNotification = notifications[i];
                  if (existingNotification.data &&
                    existingNotification.data.notificationCount) {
                    notificationCount += existingNotification.data.notificationCount;
                  } else {
                    notificationCount++;
                  }
                  existingNotification.close();
                }
                message = 'Hai ' + notificationCount +
                  ' aggiornamenti da Repubblica.it.';
                notificationData.notificationCount = notificationCount;
              }

              return showNotification(title, message, icon, notificationData);
            });
        } else {
          return showNotification(title, message, icon, notificationData);
        }
      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';

      return showNotification(title, message);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);

  if (Notification.prototype.hasOwnProperty('data')) {
    console.log('Using Data');
    var url = event.notification.data.url;
    event.waitUntil(clients.openWindow(url));
  } else {
    event.waitUntil(getIdb().get(KEY_VALUE_STORE_NAME, event.notification.tag).then(function(url) {
      // At the moment you cannot open third party URL's, a simple trick
      // is to redirect to the desired URL from a URL on your domain
      var redirectUrl = '/redirect.html?redirect=' +
        url;
      return clients.openWindow(redirectUrl);
    }));
  }
});