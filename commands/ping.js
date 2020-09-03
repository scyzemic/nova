module.exports = {
	name: 'ping',
	description: 'Ping!',
	guildOnly: true,
	execute(message) {
		message.channel.send('Pong.');
	},
};
