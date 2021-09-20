const {
    joinVoiceChannel
} = require('@discordjs/voice');
const {
    createAudioPlayer
} = require('@discordjs/voice');
const {
    createAudioResource,
    StreamType
} = require('@discordjs/voice');
const {
    AudioPlayerStatus
} = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'hace que el bot se desconecte',
    execute(Discord,client,message,args,cmd){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        connection.destroy();
        message.channel.send('Ya me voy')
    }
}