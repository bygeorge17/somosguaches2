var passport = require('passport');
var FacebookStrategy=require('passport-facebook').Strategy;

var facebookConnection=function(app){
  console.log('Conexion con facebook lista');
  passport.use(new FacebookStrategy({
    clientID:"156232101849356",
    clientSecret:"676df6b9c9f868a8b37eec9a6bc0ae98",
    callbackURL:"http://localhost:3000/auth/facebook/callback"
  },function(accesToken,RefreshToken,profile,done){
    done(null,profile);
  }));
  app.get('/auth/facebook',passport.authenticate('facebook'));
  app.get('auth/facebook/callback',passport.authenticate('facebook',{succesRedirect:'perfil'}));
};
module.exports=facebookConnection;
