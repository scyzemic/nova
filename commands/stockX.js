const fetch = require('node-fetch');
const querystring = require('querystring');
// const { client } = require('./../main');

const params = querystring.stringify({
	'x-algolia-agent': 'Algolia for vanilla JavaScript 3.32.0',
	'x-algolia-application-id': 'XW7SBCT9V6',
	'x-algolia-api-key': '6bfb5abee4dcd8cea8f0ca1ca085c2b3',
});

const stockXUrl = `https://xw7sbct9v6-dsn.algolia.net/1/indexes/products/query?${params}`;
const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = {
	name: 'stockX',
	aliases: ['stockx'],
	usesArgs: true,
	usage: '<name of item>',
	guildOnly: false,
	cooldown: 5,
	description: 'Check a listing on StockX.',
	async execute(authorMessage, args) {
		const searchTerm = args.join(' ');
		const query = encodeURIComponent(searchTerm);
		const formData = JSON.stringify({
			params: `query=${query}&facets=*&filters=`,
		});

		const response = await fetch(stockXUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: formData,
		});

		const { hits: results } = await response.json();

		if (!results.length) {
			authorMessage.channel.send(
				"StockX didn't send anything back, this might not be in their database.",
			);
		} else if (results.length === 1) {
			// show the listing
		} else if (results.length >= 2) {
			// show top 10
			const topTen = results.slice(0, 10);

			const resultsText = topTen.reduce(
				(finalText, result, idx) => `${finalText}${idx + 1}. ${result.name}\n`,
				'',
			);

			const initialText =
				results.length > 10
					? 'Multiple products found, showing the top 10.'
					: 'Multiple products found.';

			const resultsMessage = await authorMessage.channel.send(
				`${initialText} React to select the correct product:\`\`\`${resultsText}\`\`\``,
			);

			topTen.forEach(async (__, index) => await resultsMessage.react(emojis[index]));

			// TODO: find out why filter() is running for every reaction from line 62
			const filter = (reaction, user) => {
				// TODO: figure out how to match reaction.emoji with ones in emojis array (top of file)
				// looks like reaction.emoji.name will do it
				console.log('reaction => ', reaction.emoji.name);
				console.log('user => ', user.id, user.username);
				console.log(
					'authorMessage.author => ',
					authorMessage.author.id,
					authorMessage.author.username,
				);
				emojis.includes(reaction.emoji.name) && user.id === authorMessage.author.id;
			};

			try {
				const collected = await resultsMessage.awaitReactions(filter, {
					idle: 30000,
					max: 1,
					time: 10000,
					errors: ['time'],
				});

				console.log(collected.first());
			} catch (e) {
				console.log('there was an error: ', e);
			}

			// .catch(() => {
			// 	authorMessage.channel.send(
			// 		'Took to long to select an option. Please try again',
			// 	);
			// });
		}
	},
};
