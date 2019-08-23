const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./auth.json');

// fs is Node's native file system module
const fs = require('fs');

client.commands = new Discord.Collection();

// dynamically retrieves all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// node bot.js
// https://discordapp.com/api/oauth2/authorize?client_id=611771600156622869&permissions=387072&scope=bot

/*
If you need to access your client instance from inside one of your command files,
you can access it via message.client. If you need to access things such as external
files or modules, you should re-require them at the top of the file.
*/

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Prefix is currently ${prefix}.`);
});


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	console.log(`Command "${command}" made by ${message.author.username}`);
	
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	
});
client.login(token);