module.exports = {
	name: 'user',
	description: 'clears messages that belong to specific users.',
	execute(message, args) {
		if (!message.mentions.users.size) {
			message.reply('you need to tag atleast one user!!');
		}
		else{
			const taggedUsers = message.mentions.users;

			message.channel.fetchMessages().then(collected => {
				collected.map(item => {
					if(taggedUsers.has(item.author.id)){
						item.delete()
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
		}
	},
};