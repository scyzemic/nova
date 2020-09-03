module.exports = {
	name: 'so-fly',
	usesArgs: true,
	usage: '<name>',
	guildOnly: true,
	description: 'So flyyy!',
	execute(message, args) {
		message.channel.send(`${args[0]} is soooo fly!`);
	},
};
