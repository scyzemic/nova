module.exports = {
	name: 'destiny',
	aliases: ['destiny'],
	guildOnly: true,
	usesArgs: false,
	cooldown: 100,
	description: 'Join the Destiny branch of the community!',
	execute(message) {
		const roleToGrant = message.guild.roles.cache.find(
			(role) => role.name === 'guardian',
		);

		if (message.member.roles.cache.has(roleToGrant.id)) {
			return message.channel.send('Looks like you already have that role');
		}

		try {
			message.member.roles.add(roleToGrant);

			message.delete({ timeout: 3000 });

			const chan = message.guild.channels.cache.find(
				(channel) => channel.name === 'destiny-general',
			);
			chan.send(`${message.author}, Welcome Guardian!`);
		} catch (error) {
			console.error(error);
			message.channel.send('Something went wrong.');
		}
	},
};
