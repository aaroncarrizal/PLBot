module.exports = {
    name: 'embed',
    aliases: ['e'],
    description: 'prueba',
    execute(Discord,client,message,args,cmd) {
        const emb = new Discord.MessageEmbed();
        emb.setDescription("Hola")
        message.reply({
            embeds: [emb]
        })
    }
}