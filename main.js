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
	const fanFavorite = message.content.match(/[hH]ow fly (is|are)/);
	const isValidCommand = fanFavorite || message.content.startsWith(prefix);

	if (!isValidCommand || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLocaleLowerCase();

	if (fanFavorite) {
		return message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command');
	}
});

// Login to Discord with the bots token
client.login(token);
