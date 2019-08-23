module.exports = {
	name: 'help',
	description: 'contains instructions for bot usage.',
	execute(message, args) {
		const instructions = 'To clear up to 100 messages that aren\'t older than 2 weeks type &clear\nTo clear messages that belong to specific users type &user <@user1> <@user2> <@user3> ...\nTo clear messages that DO NOT belong to specific users type &not <@user1> <@user2> <@user3> ...';
		message.author.send(instructions);
	},
};