var TokenProvider = require('../lib/refresh'),
    GoogleTokenProvider = require('../lib/refresh').GoogleTokenProvider,
    testingKeys = require('../testing-keys');

describe('TokenProvider', function () {
  it('fails when url is missing', function () {
    (function(){
      new TokenProvider();
    }).should.throw('missing url parameter');
  });

  it('fails when refresh_token is missing', function () {
    (function(){
      new TokenProvider('http://mygoogle.com', {});
    }).should.throw('missing refresh_token parameter');
  });

  it('should provide a new token', function (done) {
    var tokenProvider = new TokenProvider(
        'https://accounts.google.com/o/oauth2/token', {
          refresh_token: testingKeys.refresh_token,
          client_id: testingKeys.client_id,
          client_secret: testingKeys.client_secret
        });

    tokenProvider.getToken(function(err, token){
      token.should.not.eql(testingKeys.access_token);
      done();
    });
  });

  it('should return the same token when calling two times in series', function (done) {
    var tokenProvider = new TokenProvider(
        'https://accounts.google.com/o/oauth2/token', {
          refresh_token: testingKeys.refresh_token,
          client_id: testingKeys.client_id,
          client_secret: testingKeys.client_secret
        });

    tokenProvider.getToken(function(err, token1){
      tokenProvider.getToken(function(err, token2){
        token2.should.eql(token1);
        done();
      });
    });
  });

  it('should return a new token when token is expired', function (done) {
    var tokenProvider = new TokenProvider(
        'https://accounts.google.com/o/oauth2/token', {
          refresh_token: testingKeys.refresh_token,
          client_id: testingKeys.client_id,
          client_secret: testingKeys.client_secret,
          expires_in_date: new Date(new Date().getTime() - 5000),
          access_token: 'foobarbaz'
        });

    tokenProvider.getToken(function(err, token){
      token.should.not.eql('foobarbaz');
      done();
    });
  });

  
  it('should allows to pass a curren token with expires_in property', function (done) {
    var tokenProvider = new TokenProvider(
        'https://accounts.google.com/o/oauth2/token', {
          refresh_token: testingKeys.refresh_token,
          client_id: testingKeys.client_id,
          client_secret: testingKeys.client_secret,
          expires_in: new Date().getTime() + 25 * 1000 * 1000,
          access_token: 'foobarbaz'
        });

    tokenProvider.getToken(function(err, token){
      token.should.eql('foobarbaz');
      done();
    });
  });

  it('should work with a GoogleTokenProvider', function (done) {
    var tokenProvider = new GoogleTokenProvider({
          refresh_token: testingKeys.refresh_token,
          client_id: testingKeys.client_id,
          client_secret: testingKeys.client_secret
        });

    tokenProvider.getToken(function(err, token){
      token.should.not.eql(testingKeys.access_token);
      done();
    });
  });
});