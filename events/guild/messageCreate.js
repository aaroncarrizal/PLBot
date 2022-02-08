require ('dotenv').config();
module.exports = (Discord, client, message) =>{
    var prefix = process.env.PREFIX;
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(Discord,client,message,args,cmd);
    //if(command) command.execute(Discord,client,message,args,cmd,queue);
}