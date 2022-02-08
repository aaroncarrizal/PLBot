const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
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

//const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'pause', 'fs'],
    description: 'Joins and plays a song',
    async execute(Discord,client,message,args,cmd) {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) {
            let n = Math.random()
            if (n > 0.5) {
                message.reply('Métete a un vc primero we');
            } else {
                message.reply('¿Te puedes meter a un VC primero? uwu :point_right: :point_left:');
            }
        }

        const server_queue = queue.get(message.guild.id);
        console.log(queue.get(message.guild.id))

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send('Alivianeme con una cancion padrino');
            let song = {};
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = {
                    title: song_info.videoDetails.title,
                    url: song_info.videoDetails.video_url,
                    thumb: song_info.videoDetails.thumbnails[0].url,
                    desc: song_info.videoDetails.description,
                    auth: song_info.videoDetails.author
                }
            } else {
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url,
                        thumb: video.thumbnail,
                        desc: video.description,
                        auth: video.author
                    }
                } else {
                    message.channel.send('Esa madre no está en YT');
                }
            }


            if (!server_queue) {
                const player = createAudioPlayer();
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                    audio_player: player
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
                try {
                    const connection1 = await joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    });
                    queue_constructor.connection = connection1;
                    video_player(message.guild, queue_constructor.songs[0], client, queue);
                } catch (err) {
                    queue.delete(message.guild.id)
                    message.channel.send('Hubo un error :frowning: :point_right: :point_left:');
                    throw err;
                }

            } else {
                server_queue.songs.push(song);
                const emb = new Discord.MessageEmbed();
                emb.setTitle(`:arrow_right: ${song.title} agregada a la queue:`)
                    .setAuthor('PLBot', 'https://cdn.discordapp.com/avatars/821913573332353096/d1892f53e0f424f46c99aef169da877d.webp?size=4096')
                    .setColor('ORANGE');
                for (x in server_queue.songs) {
                    emb.addField(`${parseInt(x)+1}.- `, `${server_queue.songs[x].title}`, false)
                }
                return message.channel.send({
                    embeds: [emb]
                });
            }
        }
        if (cmd === 'fs') skip_song(message, server_queue);
        if (cmd === 'stop' || cmd === 'pause') stop_song(message, server_queue);

    }
}
const video_player = async (guild, song, client, queue) => {
    const song_queue = queue.get(guild.id);
    const Discord = require('discord.js');
    if (!song) {
        //queue.delete(guild.id);
        song_queue.audio_player.stop();
        return;
    } else {
        const stream = ytdl(song.url, {
            filter: 'audioonly'
        });
        let resource = createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
        });
        song_queue.audio_player.play(resource);
        song_queue.connection.subscribe(song_queue.audio_player);
        song_queue.audio_player.on(AudioPlayerStatus.Idle, () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
        const emb = new Discord.MessageEmbed();
        emb.setTitle(':loud_sound: Reproduciendo:')
            .setAuthor('PLBot', 'https://cdn.discordapp.com/avatars/821913573332353096/d1892f53e0f424f46c99aef169da877d.webp?size=4096')
            .setColor('RED')
            .setDescription(`***${song.title}***`)
            .setThumbnail(`${song.thumb}`)
            .setTimestamp()
            .setURL(song.url)
            .setFooter(song.auth.name);
        //client.user.setActivity(`${song.auth.name}`,{type:'LISTENING'});
        await song_queue.text_channel.send({
            embeds: [emb]
        });
    }
}

const skip_song = (message, server_queue) => {
    if (!server_queue) return message.channel.send(`No hay canciones en la queue`);
    server_queue.songs.shift();
    video_player(message.guild, server_queue.songs[0]);
}

const stop_song = (message, server_queue) => {
    const Discord = require('discord.js');
    if (!server_queue) return message.channel.send(`No hay canciones en la queue`);
    const emb = new Discord.MessageEmbed();
    const song = server_queue.songs[0]
    emb.setAuthor('PLBot', 'https://cdn.discordapp.com/avatars/821913573332353096/d1892f53e0f424f46c99aef169da877d.webp?size=4096')
        .setColor('RED')
        .setDescription(`***${song.title}***`)
        .setThumbnail(`${song.thumb}`)
        .setTimestamp()
        .setFooter(song.auth.name);
    //client.user.setActivity(`${song.auth.name}`,{type:'LISTENING'});
    if (server_queue.audio_player.state.status == AudioPlayerStatus.Paused) {
        server_queue.audio_player.unpause();
        emb.setTitle(':white_check_mark: Despausado')
    } else {
        server_queue.audio_player.pause();
        emb.setTitle(':no_entry: Pausado')
    }
    message.channel.send({
        embeds: [emb]
    });
}