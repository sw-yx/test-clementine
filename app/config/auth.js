/*
Authorization Configuration
We need a way to reference the app-specific GitHub authentication information so that GitHub can confirm the application has permission to access its API and retrieve user information. Previously, we created a .env file and stored our private keys within. We'll need to reference the Node process.env object somewhere in our to retrieve this information.

We'll use this information when we contact the GitHub API with Passport, so we'll export it and make it available to require in other parts of our app. Create a new file named auth.js in the /app/config directory.We
*/

'use strict';

module.exports = {
    //'githubAuth': {
    'twitterAuth': {
        'consumerKey': process.env.TWITTER_KEY,//process.env.GITHUB_KEY,
        'consumerSecret': process.env.TWITTER_SECRET,//process.env.GITHUB_SECRET,
        'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
    }
};