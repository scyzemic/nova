module.exports = {
	name: 'gift',
	args: true,
	description: 'Reward your friends for helping you out!',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to gift them!');
		}

		const taggedUser = message.mentions.users.first();
		const hitChance = Math.random() * 10;

		if (hitChance <= 3.5) {
			message.channel.send(
				'You reach into your pocket, but only lint greets you... You smile and walk away',
			);
		} else {
			message.channel.send(
				`You gifted ${taggedUser.username} for their troubles, they gain 5G`,
			);
		}
	},
};
