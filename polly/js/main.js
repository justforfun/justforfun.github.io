// Fetch the signed URL from the API Gateway and play.
var fetchVoice = function(speakText) {
    var reqListener = function() {
        document.getElementById('response-status').innerHTML = 'Arrivata la risposta';
        try {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            console.log (JSON.stringify(json));
            var url = json.presignedUrl;
            console.log(url);

            // Terrible hack because the codec type can't be inferred from the signed URL.
            Howler.codecs = function() { return true; }
            var sound = new Howl({src: [url], autoplay: true});
        } catch (e) {
            console.log('json error: ', e);
        }
    }

    var errorListener = function() {
        document.getElementById('response-status').innerHTML = 'there was an error.';

        console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.addEventListener('error', errorListener);
    
    // Rate-limited and usage-throttled API Gateway
    //oReq.open('GET', 'https://rdh13jptya.execute-api.eu-west-1.amazonaws.com/prod/pollyExecute?speakText=' + encodeURIComponent(speakText));
    oReq.open('POST', 'https://rdh13jptya.execute-api.eu-west-1.amazonaws.com/prod/pollyExecute?speakText=' + encodeURIComponent(speakText));
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //oReq.setRequestHeader('x-api-key', 'SKmFbj2luu9VmIFUGywkc2UtCpAB7GDo4R7Qpv95');
    oReq.send('speakText=' + encodeURIComponent(speakText));
    document.getElementById('response-status').innerHTML = 'loading...';
};

// Listener for button
var speakText = function() {
    var speakText = document.getElementById('speakText').value;
    if (!speakText) {
        return;
    }

    fetchVoice(speakText);
};
document.getElementById('speakSubmit').addEventListener('click', speakText, false);
