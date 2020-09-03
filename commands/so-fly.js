module.exports = {
	name: 'so-fly',
	args: true,
	description: 'So flyyy!',
	execute(message, args) {
		message.channel.send(`${args[0]} is soooo fly!`);
	},
};
