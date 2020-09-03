module.exports = {
	name: 'steal',
	aliases: ['pick-pocket', 'rob'],
	usesArgs: true,
	usage: '<user>',
	guildOnly: true,
	cooldown: 5,
	description: 'Dip into someones pocket!',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply(
				'you need to tag a user in order to steal from them!',
			);
		}

		const taggedUser = message.mentions.users.first();
		const hitChance = Math.random() * 10;

		if (hitChance <= 6) {
			message.channel.send(
				`You reach for ${taggedUser.username}'s pocket, but they catch you. You lose 3HP.`,
			);
		} else {
			message.channel.send(
				`Success! you take 20G from ${taggedUser.username}, the poor fool`,
			);
		}
	},
};
