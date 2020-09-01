const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Singularity bot is online!');
});

client.on('message', (message) => {
	if (message.content.match(/[hH]ow fly is/)) {
		message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	} else if (message.content === `${prefix}server`) {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
		);
	}
});

client.login(token);
