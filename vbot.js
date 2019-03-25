// Authorize the bot with the following url:
// https://discordapp.com/oauth2/authorize?client_id=559449003796725804&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

let botToken;
let knownCommands;

console.log('reading token file...');
fs.readFile('token.dat', 'utf8', (err, token) => {
  if (err) throw err;
  // login to the guild...
  client.login(token);
});

client.on('ready', () => {
  startUp();
});

// The main message router...
client.on('message', receivedMessage => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) {
    return;
  }
  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.startsWith('!')) {
    processCommand(receivedMessage);
  }
});

function startUp(restarting) {
  if (restarting) console.log('restarting...');

  console.log('reading knowncomands...');
  fs.readFile('knowncommands.json', (err, data) => {
    if (err) throw err;
    knownCommands = JSON.parse(data);
    console.log('setting bot status message...');
    client.user.setActivity('what you type...', { type: 'WATCHING' });
    console.log('Vbot is ready.');
    console.log(knownCommands);
  });
}

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  let cmdParts = fullCommand.split(' ');
  let command = cmdParts[0].toLowerCase();
  let arguments = cmdParts.slice(1);

  switch (command) {
    case 'help':
      helpCommand(arguments, receivedMessage);
      break;
    case 'boot':
      bootUser(arguments, receivedMessage);
      break;
    case 'restart':
      startUp(true);
      break;
    default:
      getResponse('huh.txt').then(message => {
        receivedMessage.channel.send(message);
      });
      break;
  }
}

function bootUser(arguments, receivedMessage) {
  const message = [];
  if (arguments.length) {
    message.push('Hey @everyone, ' + receivedMessage.author.toString() + ' ');
    message.push('tried to boot someone from the guild!!');
    receivedMessage.channel.send(message.join(''));
  } else {
    getResponse('boot.txt').then(message => {
      receivedMessage.channel.send(message);
    });
  }
}

function helpCommand(arguments, receivedMessage) {
  if (!arguments.length) {
    getResponse('help.txt').then(message => {
      receivedMessage.channel.send(message);
    });
  } else if (knownCommands.includes(arguments[0])) {
    getResponse(arguments[0] + '.txt').then(message => {
      receivedMessage.channel.send(message);
    });
  } else {
    getResponse('unknown.txt').then(message => {
      receivedMessage.channel.send(message);
    });
  }
}

async function getResponse(command) {
  return await readFile('./responses/' + command, 'utf8');
}
