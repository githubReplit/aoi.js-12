const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
token: process.env.token,
prefix: process.env.prefix,
intents: "all"
})

bot.onMessage() //Allows to execute Commands

bot.command({
name: "ping", //Trigger name (command name)
code: `Pong! $pingms` //Code inside of string
})

bot.readyCommand({
    channel: "", //Optional channnel ID
    code: `$log[Ready on $userTag[$clientID]]`
})

//Music Commands
 
bot.command({
 name: "play",
 aliases: ['p'],
 code: `
$color[RANDOM]
$thumbnail[$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;thumbnail]]
$title[**Song Added to Queue**]
$description[**Succesfully added** [$songInfo[title]\\]($songInfo[url]) to the **Queue**]
$addField[:stopwatch:| Duration:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;duration]__**]
$addField[:dvd: | Views:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;views]__**]
$addField[:coffee: | Author:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;uploader_name]__**]
$addField[:clock10: Uploaded:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;uploaded]__**]
$playSong[$message;1m;{title:Error}{description:**⛔ There was an error while making the request**}{color:RED}]
$onlyIf[$message!=;{title:Error}{description:**⛔ I need Song name to find a** \`song\`...}]
$onlyIf[$voiceID!=;**⛔ You are Not in a Voice channel! Join a voice channel**]
$cooldown[5s;Wait **%time%** to use this command again]`
})
 
bot.command({
name: "pause",
code: `$pauseSong
**⏸️ Paused**
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "resume",
code: `$resumeSong
**▶️ Resumed**
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "loop",
code: `$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Loop now **on**];false;Loop now **off**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "nowplaying",
aliases: "np",
code: `$author[Now playing;https://cdn.discordapp.com/emojis/729630163750354955.gif?size=1024]
$title[$songInfo[title]]
$description[$addField[Duration;$songInfo[duration]]
$addField[URL;$songInfo[url]]]
$footer[$botPingms to load it.]
$thumbnail[$songInfo[thumbnail]]
$color[a09fff]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "stop",
code: `$stopSong
$sendMessage[⏹️ Stopped.;no]
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]
$deleteIn[5s]`
})
 
 
bot.command({
name: "skip",
code: `$skipSong
⏩ Skipped!
$onlyIf[$queueLength>1;Only have **$queueLength song**]
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]
$onlyIf[$voiceID!=;**⛔ You need to join the voice channel first**]`
})
 
 
bot.command({
name: "clearqueue",
code: `$clearSongQueue
$stopSong
$editIn[125ms;✅ Cleared queue. from **$queueLength song** to **0**] ⚠️ Clearing...
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]`
})
 
bot.command({
name: "queue",
code: `$queue[1;30]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "volume", 
code: `$volume[$message[1]]
$onlyIf[$message[1]<101;**⛔ Max volume 100%**]
$onlyIf[$charCount[$message[1]]<4;Failed.]
$onlyIf[$isNumber[$message[1]]==true;Must number!]
$onlyIf[$message[1]!=;**⛔ Volume can change 0 - 100**]
$editIn[1s;**✅ Changed to $message[1]%**] **Changing..**
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]
$onlyIf[$voiceID!=;**⛔ You need to join the voice channel first**]`
})