module.exports = {
	name: 'kick',
	usesArgs: true,
	usage: '<user>',
	guildOnly: true,
	cooldown: 5,
	description: 'Whittle down your foes HP!',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();
		const hitChance = Math.random() * 10;

		if (hitChance <= 1) {
			message.channel.send(
				`Critical hit! ${taggedUser.username}, you kicked them so hard, some coinds came loose. You gain 10G`,
			);
		} else if (hitChance <= 5.5) {
			message.channel.send(
				`You Missed! ${taggedUser.username}, gives you a charly horse. You lose 10HP`,
			);
		} else {
			message.channel.send(`You kicked ${taggedUser.username}, they lose 5HP`);
		}
	},
};
