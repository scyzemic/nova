module.exports = {
	name: 'so-fly',
	args: true,
	usage: '<name>',
	description: 'So flyyy!',
	execute(message, args) {
		message.channel.send(`${args[0]} is soooo fly!`);
	},
};
