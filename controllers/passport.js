const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["access_token"];
    }

    return token;
  };

passport.use(
   
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey:process.env.LOGIN_TOKEN,
         
      },
      (payload, done) => {
       
        User.findById({ _id: payload.sub }, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      } 
    )
  );

  passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        user.comparePassword(password, done);
      });
    })
  );