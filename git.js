let TOTALREPO = 5;
//Using integration github
var repositories = new Array();
var count=0;
const fetch = require("node-fetch");
module.exports.getAvatarUrl = getAvatarUrl;
module.exports.getRepositories = getRepositories;

async function getAvatarUrl(user){
  return fetch('https://api.github.com/users/'+user)
  .then(response => response.json())
  .then(data => {
    return data.avatar_url;
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
  })
  .catch(error => console.error(error));
}
