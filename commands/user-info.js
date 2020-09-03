module.exports = {
	name: 'user-infop',
	description: 'User info!',
	guildOnly: true,
	execute(message) {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
		);
	},
};
