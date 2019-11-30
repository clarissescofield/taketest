let TOTALREPO = 5;
//Using integration github
var repositories = new Array();
var count=0;
const fetch = require("node-fetch");
module.exports.getAvatarUrl = getAvatarUrl;
module.exports.getRepositories = getRepositories;
/*
async function getAvatarUrl(user){ //This method return a 'promise'
  let response = await fetch('https://api.github.com/users/'+user);
  let data = await response.json()
  return data.avatar_url;
}
*/
async function getAvatarUrl(user){
  return fetch('https://api.github.com/users/'+user)
  .then(response => response.json())
  .then(data => {
    return data.avatar_url;
    //console.log(data);
  })
  .catch(error => console.error(error));
};

async function getRepositories(user){
  return fetch('https://api.github.com/search/repositories?q=user:'+user+'+language:CSharp+sort:updated-asc')
  .then(response => response.json())
  .then(data => {
    for(count=0;count<TOTALREPO;count++){
      repositories.push({title: data.items[count].name, description: data.items[count].description});
    }
    return repositories;
     // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error));
}




/*


var log = {

            getAvatarUrl: async function getAvatarUrl(user){
              fetch('https://api.github.com/users/'+user)
              .then(response => response.json())
              .then(data => {
                var avatarUrl = data.avatar_url;
                console.log(avatarUrl);
                return avatarUrl;
                // Prints result from `response.json()` in getRequest
              })
              .catch(error => console.error(error));
            },
            getRepositories:function getRepositories(){
              fetch('https://api.github.com/search/repositories?q=user:takenet+language:CSharp+sort:updated-asc')
              .then(response => response.json())
              .then(data => {
                for(i=0;i<5;i++){
                  repositoriesName[i] = data.items[i].name;
                  repositoriesDescription[i] = data.items[i].description;
                }
                for(i=0;i<5;i++){
                  console.log(repositoriesName[i]);
                  console.log(repositoriesDescription[i]);
                }
                 // Prints result from `response.json()` in getRequest
              })
              .catch(error => console.error(error));
          }
  };

module.exports = log




/*
var avatarUrl = [];
var repositoriesName = [];
var repositoriesDescription = [];
var i=0;
const fetch = require("node-fetch");

module.exports.getAvatarUrl = function getAvatarUrl(user){
  fetch('https://api.github.com/users/'+user)
  .then(response => response.json())
  .then(data => {
    avatarUrl = data.avatar_url;
    // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error));
  return avatarUrl;
};


function getRepositories(){
  fetch('https://api.github.com/search/repositories?q=user:takenet+language:CSharp+sort:updated-asc')
  .then(response => response.json())
  .then(data => {
    for(i=0;i<5;i++){
      repositoriesName[i] = data.items[i].name;
      repositoriesDescription[i] = data.items[i].description;
    }
    for(i=0;i<5;i++){
      console.log(repositoriesName[i]);
      console.log(repositoriesDescription[i]);
    }
     // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error));
}*/
