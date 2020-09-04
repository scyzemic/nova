module.exports = {
	name: 'grantAccess',
	aliases: ['grant', 'access', 'letmein', 'code', 'secret', 'redpill'],
	guildOnly: true,
	usesArgs: true,
	cooldown: 100,
	usage: '<password>',
	description: 'See how far the rabbit hole goes!',
	execute(message) {
		const roleToGrant = message.guild.roles.cache.find((role) => role.name === 'coder');

		if (message.member.roles.cache.has(roleToGrant.id)) {
			return message.channel.send('nothing happened...');
		}

		try {
			message.member.roles.add(roleToGrant);

			message.channel.send("Hmm... doesn't seem like anything happened");

			const chan = message.guild.channels.cache.find(
				(channel) => channel.name === 'gen-tech-chat',
			);
			chan.send(`Welcome, ${message.author}!`);
		} catch (error) {
			console.error(error);
			message.channel.send('Something went wrong.');
		}
	},
};
