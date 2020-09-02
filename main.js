const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// Create a new Discord client instance
const client = new Discord.Client();

// Listen for 'ready' event
// This event only triggers once after login
client.once('ready', () => {
	console.log('Singularity bot is online!');
});

// Listen for 'message' event
client.on('message', (message) => {
	// exit early if message doesn't start with the prefix
	// or the message author is a bot (so we don't have infinite loops)
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// parse the message content, list of string w/o the prefix
	const args = message.content.slice(prefix.length).trim().split(' ');
	// parse the command word from the list
	// TODO - find a way to do this without side effects
	const command = args.shift().toLocaleLowerCase();

	if (message.content.match(/[hH]ow fly is/)) {
		message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	} else if (command === 'server') {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
		);
	} else if (command === 'user-info') {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
		);
	} else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`,
			);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
});

// Login to Discord with the bots token
client.login(token);
