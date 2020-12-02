const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'stockX',
	aliases: ['stockx'],
	usesArgs: true,
	usage: '<name of item>',
	guildOnly: false,
	cooldown: 5,
	description: 'Check a listing on StockX.',
	execute(message, args) {
		const searchTerm = args.join(' ');
		const query = encodeURIComponent(searchTerm);
		const formData = JSON.stringify({
			params: `query=${query}&facets=*&filters=`,
		});
		const params = querystring.stringify({
			'x-algolia-agent': 'Algolia for vanilla JavaScript 3.32.0',
			'x-algolia-application-id': 'XW7SBCT9V6',
			'x-algolia-api-key': '6bfb5abee4dcd8cea8f0ca1ca085c2b3',
		});
		const stockXUrl = `https://xw7sbct9v6-dsn.algolia.net/1/indexes/products/query?${params}`;
		const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		fetch(stockXUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: formData,
		})
			.then((response) => response.json())
			.then(async ({ hits: results }) => {
				if (!results.length) {
					message.channel.send(
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
							? 'Multiple products found, we could not list them all here are the top 10.'
							: 'Multiple products found.';

					message.channel
						.send(
							`${initialText} React to select the correct product:\`\`\`${resultsText}\`\`\``,
						)
						.then((msg) => {
							topTen.forEach((__, index) => {
								msg.react(emojis[index]);
							});
						});
				}
			});
		// console.log('what am I awaiting here ', result.json());
	},
};
