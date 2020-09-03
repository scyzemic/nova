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
		message.channel.send('Pong.');
	} else if (command === 'server') {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
		);
	} else if (command === 'user-info') {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
		);
	} else if (command === 'so-fly') {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`,
			);
		}
		return message.channel.send(`${args[0]} is soooo fly!`);
	} else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();
		const hitChance = Math.random() * 10;

		if (hitChance <= 5.5) {
			message.channel.send(
				`You Missed! ${taggedUser.username}, gives you a charly horse. You lose 10HP`,
			);
		} else {
			message.channel.send(`You kicked ${taggedUser.username}, they lose 5HP`);
		}
	} else if (
		(command === 'prune' &&
			message.guild.member(message.author).roles.highest.name === 'Owner') ||
		message.guild.member(message.author).roles.highest.name === 'Admin'
	) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send("that doesn't seem to be a valid number.");
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch((err) => {
			console.error(err);
			message.channel.send(
				'there was an error trying to prune messages in this channel',
			);
		});
	} else if (command === 'gift') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to gift them!');
		}

		const taggedUser = message.mentions.users.first();
		const hitChance = Math.random() * 10;

		if (hitChance <= 3.5) {
			message.channel.send(
				`You reach into your pocket, but only lint greets you.... you thank ${taggedUser.username} kindly and walk away :derp_squirt:`,
			);
		} else {
			message.channel.send(
				`You gifted ${taggedUser.username} for their troubles, they gain 5G`,
			);
		}
	}
});

// Login to Discord with the bots token
client.login(token);
