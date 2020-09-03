const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// Create a new Discord client instance
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Read command file names
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

// Set commands to client.commands Collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Listen for 'ready' event
// This event only triggers once after login
client.once('ready', () => {
	console.log('Singularity bot is online!');
});

// Listen for 'message' event
client.on('message', (message) => {
	// exit early if message doesn't start with the prefix
	// or the message author is a bot (so we don't have infinite loops)
	const fanFavorite = message.content.match(/[hH]ow fly (is|are)/);
	const isValidCommand = fanFavorite || message.content.startsWith(prefix);
	if (!isValidCommand || message.author.bot) return;

	// parse the message content, list of string w/o the prefix
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	// parse the command word from the list
	// TODO - find a way to do this without side effects
	const command = args.shift().toLocaleLowerCase();

	if (fanFavorite) {
		message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	} else if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command === 'server') {
		client.commands.get('server').execute(message, args);
	} else if (command === 'user-info') {
		client.commands.get('user-info').execute(message, args);
	} else if (command === 'so-fly') {
		client.commands.get('so-fly').execute(message, args);
	} else if (command === 'kick') {
		client.commands.get('kick').execute(message, args);
	} else if (
		(command === 'prune' &&
			message.guild.member(message.author).roles.highest.name === 'Owner') ||
		message.guild.member(message.author).roles.highest.name === 'Admin'
	) {
		client.commands.get('prune').execute(message, args);
	} else if (command === 'gift') {
		client.commands.get('gift').execute(message, args);
	}
});

// Login to Discord with the bots token
client.login(token);
