Helper function to get always an oauth 2 valid token given a refresh token. 

[The mechanism is explained here](http://tools.ietf.org/html/draft-ietf-oauth-v2-10#section-4.2).

If the token has expired, it will fetch a newone, otherwise it will return the current access token. 


## Install  

    npm install refresh-token

## Usage

~~~javascript
var TokenProvider = require('refresh-token');

var tokenProvider = new TokenProvider('http://token-url', {
    refresh_token: 'refresh token', 
    client_id:     'client id', 
    client_secret: 'client secret'
    /* you can pass an access token optionally
    access_token:  'fdlaksd',
    expires_in:    2133
    */
  });

tokenProvider.getToken(function (err, token) {
 //token will be a valid access token.
});
~~~

There is also a GoogleTokenProvider which has the url already set:

~~~javascript
var GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;

var tokenProvider = new GoogleTokenProvider({
    refresh_token: 'refresh token', 
    client_id:     'client id', 
    client_secret: 'client secret'
  });
~~~

## License 

**MIT**

