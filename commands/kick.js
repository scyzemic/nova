module.exports = {
	name: 'kick',
	args: true,
	description: 'Whittle down your foes HP!',
	execute(message) {
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
	},
};
