require ('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({
    intents:
    [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

const fs = require('fs');
//const { type } = require('os');
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const queue = new Map();
['command_handler','event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(Discord,client,queue);
})

client.login(process.env.DISCORD_TOKEN);