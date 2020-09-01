const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Singularity bot is online!');
});

client.on('message', (message) => {
	if (message.content.match(/[hH]ow fly is/)) {
		message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	}
});

client.login(token);
