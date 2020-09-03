module.exports = {
	name: 'so-fly',
	description: 'So flyyy!',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`,
			);
		}
		return message.channel.send(`${args[0]} is soooo fly!`);
	},
};
