'use strict';

//var REPUBBLICA_ENDPOINT = 'https://data.kataweb.it/storage/static/iwatch/iwatch-push-sent.html';
var REPUBBLICA_ENDPOINT = 'https://justforfun.github.io/rep-endpoint.json';


self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Repubblica.it';
  var body = 'We have received a push message.';
  var icon = '/images/icon-192x192.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    fetch(REPUBBLICA_ENDPOINT).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }

    // Examine the text in the response
      return response.json().then(function(data) {
        console.log('Data = ', JSON.stringify(data));
        if (data.query.count === 0) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error();
        }

        
        var message = data.TESTO.text;  
        icon = data.img;
        console.log(message);
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
   }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';

      return showNotification(title, message);
    }) 
//  );
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));

});
