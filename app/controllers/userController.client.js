'use strict';
/*global appUrl,    ajaxFunctions*/
(function () {
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id/';
   console.log(apiUrl);
   
   function updateHtmlElement (data, element, userProperty) {
      
    element.innerHTML = data[userProperty];
   }
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      
        console.log('this is data------');
      console.log(data);
        console.log('end is data------');
        var userObject = JSON.parse(data);
      updateHtmlElement(userObject, displayName, 'displayName');
      //updateHtmlElement(userObject, displayName, 'name');

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
         //updateHtmlElement(userObject, profileUsername, 'screen_name');   
      }

      if (profileRepos !== null) {
         //updateHtmlElement(userObject, profileRepos, 'publicRepos');   
         updateHtmlElement(userObject, profileRepos, 'totalFollowers');   
      }
   }));
})();