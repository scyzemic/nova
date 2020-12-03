const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Singularity bot is online!');
});

client.on('message', (message) => {
	const fanFavorite = message.content.match(/[hH]ow fly (is|are)/);
	const isValidCommand = fanFavorite || message.content.startsWith(prefix);

	if (!isValidCommand || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (fanFavorite) {
		return message.channel.send(
			"they're so fly that when Jim Jones sees them, he goes, BALLIIINNNN!!!",
		);
	}

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.roles && message.channel.type !== 'dm') {
		const { roles } = message.guild.member(message.author);
		const hasPermission = roles.cache.filter((role) => command.roles.includes(role.name));

		if (!hasPermission) {
			return message.reply(
				"you don't have permission to use that command, please ask an Admin for help.",
			);
		}
	}

	if (command.usesArgs && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Cooldowns
	if (!cooldowns.has(commandName)) {
		cooldowns.set(commandName, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(commandName);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1,
				)} more second(s) before reusing the \`${commandName}\` command.`,
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command');
	}
});

client.login(process.env.TOKEN);

module.exports = {
	client,
};
