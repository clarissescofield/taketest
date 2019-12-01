//ChatBot connecting
let BlipSdk = require('blip-sdk');
let WebSocketTransport = require('lime-transport-websocket');
let Lime = require('lime-js');


// Put your identifier and access key here
let IDENTIFIER = 'takechat';
let ACCESS_KEY = 'RGY0cVhjNUk1Q0pUbGtOaFRmMTk=';

// Create a client instance passing the identifier and accessKey of your chatbot
let client = new BlipSdk.ClientBuilder()
    .withIdentifier(IDENTIFIER)
    .withAccessKey(ACCESS_KEY)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client.connect() // This method return a 'promise'.
    .then(() => console.log('Listening...'))
    .catch((err) => console.error(err));

let TOTALREPO = 5;
var states = [];
var count = 0;
var avatar;
var repositories =  new Array();
var messageCarousel;
var content = {itemType: "application/vnd.lime.document-select+json"};
var user = "takenet";
let github = require('./git.js')


async function sendRepositories(user){
  avatar = await github.getAvatarUrl(user);
  repositories = await github.getRepositories(user);
  try{
    client.addMessageReceiver((message) => message.type === 'text/plain', function(message){
      // Process received message
    /*  if (typeof states[message.from] === 'undefined'){
         client.sendMessage({
              type: "text/plain",
              content: "Oi john john",
              to: message.from});
      }*/

      messageCarousel = {
                      id: Lime.Guid(),
                      type: "application/vnd.lime.collection+json",
                      to: message.from,
                      content: {
                          itemType: "application/vnd.lime.document-select+json",
                          items: []
                      }
      };
      for (count=0;count<TOTALREPO;count++){
        messageCarousel.content.items[count] = generateCarousel(count,repositories[count].title, repositories[count].description, avatar);
      }
      client.sendMessage(messageCarousel);
    });
  } catch{
    console.error("MessageReceiver error");
  }
}

function generateCarousel(position,name, description,avatar){
    messageCarousel.content.items[position] = {
      header: {
          type: "application/vnd.lime.media-link+json",
          value: {
              title: name,
              text: description,
              type: "image/jpeg",
              uri: avatar
          }
      }
    };
    return messageCarousel.content.items[position];
}

sendRepositories("takenet");
