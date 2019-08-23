module.exports = {
	name: 'clear',
	description: 'clears up to 100 messages that aren\'t older than 2 weeks.',
	execute(message, args) {
		message.channel.bulkDelete(100,true).catch(err => {
			message.reply("Cannot clear, no messages that aren't older than 2 weeks!!");
		});
	},
};