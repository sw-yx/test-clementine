'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                if (err) {return done(err);}

                if (user) {return done(null, user);} 
                else {
                    var newUser = new User();
                    console.log('this is profile------');
                    console.log(profile);
                    console.log('end of profile------');
                    newUser.twitter.id = profile.id;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.totalFollowers = profile._json.followers_count;
                    newUser.nbrClicks.clicks = 0;
                    newUser.save(function (err) {
                        if (err) {throw err;}
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    /*In the above code, we're instantiating a new GitHub Strategy object, and setting the authorization properties of that object to the configuration file we completed earlier. Passport will use this information to authorize that our application has the privilege of accessing the GitHub API.
    The first 3 argumentions for this function (token, refreshToken, profile) contain objects with information provided back from the GitHub API. Once we receive this information back, it's Passport's job to determine whether or not this user exists in the application database.

Let's take a look at what this function is doing so far:

process.nextTick() is Node syntax that makes the code asynchronous. Node will wait until the current "tick" of the event loop completes before executing the callback function. This essentially makes Node wait until the user information comes back from GitHub before processing the results

User.findOne({...}) will search the database for a username where github.id is equal to the profile.id from the arguments passed back from GitHub. This should look really familiar to the queries in the clickHandler object we modified earlier.

function (err, user) {...} is a callback function which will execute only when the database query has been completed.

if (err) {...}: if the query returns an error, then pass the done argument to Passport with the err object.

if (user) {...}: if a user is found, then return that user object to the Passport authentication function.API
    */
};

/*
In serializeUser, we're passing in a callback function with the user object and done as arguments. done is a function native to Passport, which tells Passport to proceed in the authentication process. When done(null, user.id) is called, Passport takes this information and passes it to the authenticate function. The information is stored in the req.session.passport.user user object.

When subsequent calls are made, Passport will deserialize this information, and search our User model for the deserialized ID. This information is then stored in the req.user object.

Serialization is not an easy subject -- especially in the beginning. For now, it's mostly just important to understand:

Information sent over the network is compressed into bytes (serialization) and stored within a session (a small amount of persistant storage)
The user information submitted via serialization must then be de-compressed
Afterward, the database is searched to find the user information that corresponds to the matching user ID and provided back to the browser
*/