// client id: 559449003796725804
// client secret: Ns08ZxdkX9fmim9NsmW3hkwCvmi4GkHk
// bot secret token: NTU5NDQ5MDAzNzk2NzI1ODA0.D3lnAg.deA_BKDY8Q0nGhWn_HX2012kDPo
// permissions integer: 1275210880
//   View Audit Log
//   Change Nickname
//   Manage Nicknames
//   View Channels
//   Send Text Messages (like SMS??)
//   Manage Messages
//   Mention Everyone
// Authorize the bot with the following url:
// https://discordapp.com/oauth2/authorize?client_id=559449003796725804&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  // List servers the bot is connected to
  console.log('Vbot is ready.');
  client.user.setActivity('what you type...', { type: 'WATCHING' });
});

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

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  let cmdParts = fullCommand.split(' ');
  let command = cmdParts[0].toLowerCase();
  let arguments = cmdParts.slice(1);

  if (command === 'help') {
    helpCommand(arguments, receivedMessage);
  } else {
    receivedMessage.channel.send(
      "I don't understand the command '" + command + "'. Try `!help`"
    );
  }
}

function helpCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
    receivedMessage.channel.send(
      'It looks like you want help with ' + arguments
    );
  } else {
    // receivedMessage.channel.send(
    //   "I don't know how to help you with " + arguments + ". Try `!help [topic]`"
    // );
    receivedMessage.channel.send(
      "I don't know what you want help with. Try `!help [topic]`"
    );
  }
}

bot_secret_token =
  'NTU5NDQ5MDAzNzk2NzI1ODA0.D3l8Cg.XGt6NWYio9Iq1Vm0GzXkfq5Yhmk';

client.login(bot_secret_token);
