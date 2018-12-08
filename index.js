const botsettings = require("./BotSettings.json");
const Discord = require("discord.js");
const moment = require("moment.js");
const fs =  require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.pounded = require("./pounded.json");
const token = botsettings.token
const prefix = botsettings.prefix
const suggchan = botsettings.suggestionchannelname
const OG = bot.guilds.find("id","355096982131441664")

const milestones =[
        5,
        25,
        50,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        1100,
        1200,
        1300,
        1400,
        1500,
        1600,
        1700,
        1800,
        1900,
        2000,
        2100,
        2200,
        2300,
        2400,
        2500,
        2600,
        2700,
        2800,
        2900,
        3000,
]


    fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0){
        console.log("commands folder is empty!");
        return;
    }

    console.log("loading commands")

    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})


bot.on ("ready", async () => {
    console.log(`bot is ready! : ${bot.user.username}`); 
    bot.user.setPresence({ status: 'online', game: { name: 'at Outpost Gamma' } });

    bot.setInterval(() => {
        for(let i in bot.pounded){
            let time = bot.pounded[i].time;
            if(!time) continue;
            let guildid = bot.pounded[i].guild;
            let guild = bot.guilds.get(guildid);
            if(!guild) continue;
            let member = guild.members.get(i);
            let poundedrole = guild.roles.find(r => r.name === "Pounded");
            if(!poundedrole) continue;

            if(Date.now() > time){
                console.log(`${i} will now leave the pound`)

                member.removeRole(poundedrole)
                delete bot.pounded[i];

                fs.writeFile("./pounded.json", JSON.stringify(bot.pounded), err =>{
                    if(err) throw err;
                    console.log(`${member.user.tag} has left the Pound`)
                });

            }

            

         }
    }, 2000)

//         function tuesdaybday() {
//             const OG = bot.guilds.find("id","355096982131441664")

//         console.log("day checked")
//         if (moment().format('dddd') == `Tuesday`){
//             console.log(`today is tuesday`)
//             OG.channels.find("id", "451914300768911370").overwritePermissions(OG.roles.find("name", `customer` ).id, {VIEW_CHANNEL: true})
//             OG.channels.find("id", "451914300768911370").send(``, {files: ['https://i.imgur.com/Ia6M2wS.png']})
//             //OG.channels.find("id", "451914300768911370").send(`it is tuesday ma dudes`)
//             //OG.channels.find("id", "451927197339353088").overwritePermissions(OG.roles.find("name", `customer` ).id, {VIEW_CHANNEL: true})
//         } else {
//             console.log(`today is not tuesday`)
//             OG.channels.find("id", "451914300768911370").overwritePermissions(OG.roles.find("name", `customer` ).id, {VIEW_CHANNEL: false})
//             //OG.channels.find("id", "451927197339353088").overwritePermissions(OG.roles.find("name", `customer` ).id, {VIEW_CHANNEL: false})
//         }

//         setTimeout(tuesdaybday, 86400000)
// //`1/8`
//         if (moment().format(`D/M`) == `1/8`){

//             OG.channels.find(`id`,`398136943176843264`).send(`
// 🎉 Birthday 🎉 
            
// its <@&399965785700958208>'s b-day! gamma bot is now  a whopping ${(moment().format(`YYYY`) - 2018)} year old!
                                    
// @eeeeeeeveryone`)
//         }

//     }

//     tuesdaybday()

 });

//command handler
bot.on("message",async message => {
    if(message.author.bot) return;
    if(message.channel.type === "DMChannel") return;

    let messageArray = message.cleanContent.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

    if(cmd){
    console.log(`    User: ${message.author.tag} [${message.author.id}]
    Server: ${message.guild.name} [${message.guild.id}]
    Channel: ${message.channel.name} [${message.channel.id}]
    Message: ${message.content}`)
    }
});
 
//steal welcome message from rin and repost it in lounge
bot.on("message",async message => {

    //check if message autheor is rin bot
    if (message.author.id == "320458922580377602"){
        //console.log(`message by rin bot`)
        //if attachment exists find url then post url in lounge
        if (message.attachments.exists("filename","welcome.png")){
            //console.log(`attachment exists`)
                var welmsg = await message.guild.channels.get(`355096982131441665`).send(``, {

                    files: [
                        message.attachments.find("filename","welcome.png").url
                    ]        

                  })

                  for (i = 0;i < milestones.length; i++){

                    if (message.guild.memberCount == milestones[i]){
            
                        console.log(`hit member mile stone ${milestones[i]}`)
                        message.guild.channels.find(`id`,`398136943176843264`).send(`
⚠ announcement ⚠ 

We've reached ${milestones[i]} members! lets aim for ${milestones[i+1]} next!
                        
@eeeeeeeveryone`)

                        message.guild.channels.find(`id`,`452434189350862858`).send(`hit ${milestones[i]} members. next miles stone ${milestones[i+1]}`)

                        
                    }
                }

                  //console.log(`sent message now reacting `)
                  rlen = 11
                  for (i = 0;i < rlen; i++){
                    var emojis = message.guild.emojis.array()
                    var rnnd = Math.floor((Math.random(emojis.length)*100000)/(100000/emojis.length))
                    welmsg.react(emojis[rnnd])
                    }
                    //console.log(`reactions done`)
        } 
    }
    
});

//add customer role & do the table gibberish
bot.on ("guildMemberAdd", async member => {

    console.log("member joined")
    console.log(`${member.guild.memberCount}th member`)

    //checks if server is OG
    if(member.guild.id == `355096982131441664`){


    await member.addRole("400303146968285195");//Member
    await member.addRole("400400467559055372");//day 1

    //tsudere role for not scorpion colour
    if(member.user.id === "397959240917975049"){
        console.log("member is notscorpion24100");
        await member.addRole("398157820048048128");
    };
    

    //ping user in info channel
    if (member.guild.channels.exists("id", `398136862105141257`)){
        var infomsg = await member.guild.channels.find("id", `398136862105141257`).send(`<@${member.id}>`)
        infomsg.delete()
    }

    // create 20 table roles, check if each role already exists individualy ,(also for channels)
    var len = 20
    var tables = [];
        //this loop creates missing table channels and applies premissions
        for (i = 0;i < len; i++){
                if (!member.guild.roles.exists("name", `Table #${i + 1}` )){
                    await member.guild.createRole({
                    name: `Table #${i + 1}`,
                    hoist: true,
                    Permissions: []
                });
            }

                //create an array containig every table role name
                tables[i] = (`Table #${i + 1}`);   


                //create a new text channel for current table and dissable viewing for @everyone
                if (!member.guild.channels.exists("name", `table-${i + 1}` )){
                    await member.guild.createChannel(`table-${i + 1}`, "text",[{
                        id:member.guild.id,
                        deny:0x00000400
                    }])
                    
            }

            var tchan = member.guild.channels.find("name", `table-${i + 1}`)

            //apply premmissions to current text channel
            //console.log(tchan.ParentID)//('451837012497137675')
            tchan.overwritePermissions(member.guild.roles.find("name", `Table #${i + 1}` ).id, {VIEW_CHANNEL: true})//table role
            tchan.overwritePermissions(`398140531265241089`, {VIEW_CHANNEL: true}) //staff
            tchan.overwritePermissions(`399327558920962068`, {VIEW_CHANNEL: true})//interns
            tchan.overwritePermissions(`398225433285492748`, {VIEW_CHANNEL: false})//bots
            tchan.overwritePermissions(`452254719738380288`, {VIEW_CHANNEL: true})//tbots



        //voice channel

                    //create a new voice channel with currnet table and dissable viewing for @everyone
                    if (!member.guild.channels.exists("name", `Table #${i + 1}` )){
                        await member.guild.createChannel(`Table #${i + 1}`, "voice",[{
                            id:member.guild.id,
                                        deny:0x00000400
                        }])
                                
                }

                var vchan = member.guild.channels.find("name", `Table #${i + 1}` )
                
                //apply premmissions to current voice channel
                //console.log(tchan.ParentID)//('451837012497137675')
                vchan.overwritePermissions(member.guild.roles.find("name", `Table #${i + 1}` ).id, {VIEW_CHANNEL: true})
                vchan.overwritePermissions(`398140531265241089`, {VIEW_CHANNEL: true}) //staff
                vchan.overwritePermissions(`399327558920962068`, {VIEW_CHANNEL: true})//interns
                vchan.overwritePermissions(`398225433285492748`, {VIEW_CHANNEL: false})//bots
                vchan.overwritePermissions(`452254719738380288`, {VIEW_CHANNEL: true})//tbots
        
    }

        //assign new members to the table role with least members (fuck that use an rnd im lazy)
        if(member.user.bot) return;
        var num = Math.floor(((Math.random(len)*100000)/(100000/len)));
        var table = tables[num]
        var id = member.guild.roles.find("name", table).id
        await member.addRole(id);
        await member.addRole(`512787396522278922`);//assign the table divider role
        console.log(`new member has been given role Table #${num+ 1}`);

            if (tablechanid = member.guild.channels.find("name", `table-${num + 1}`)){
                var tablechanid = member.guild.channels.find("name", `table-${num + 1}`).id
            }


        var tmsg1 = [
            `welcome <@${member.id}>! you are in <#${tablechanid}>`,
            `welcome to table <#${tablechanid}> <@${member.id}>!`,
            `<@${member.id}>, welcome to <#${tablechanid}>`,
            `<#${tablechanid}> give a warm welcome to your newest member <@${member.id}>! 
<@${member.id}>`,
        ];

        var tmsg2 = [
            `give out a friendly hi to your fellow table-mates!`,
            `give your new friends a friendly hello`,
            `,looks like your stuck in the "special" table, don't worry, im sure you'll survive`,
            `say hello to your new table-friends-for-life`,
            `give a friendly greeting to your new table buddies`,
            `i'm sure everyone here is as exited to meet you as you are exited to be here`,
        ];

        var rnnd = Math.floor((Math.random(tmsg1.length)*100000)/(100000/tmsg1.length))
        var rnnnd = Math.floor((Math.random(tmsg2.length)*100000)/(100000/tmsg2.length))


        //var tblmenmsg = await member.guild.channels.find("name", `table-${num + 1}`).send(`${tmsg1[rnnd]} ${tmsg2[rnnnd]}`) 
        

    }
}); 

//suggestion channel reactions
bot.on("message",async message =>{
    if(message.channel.name === suggchan) {
        await message.react("✅");
        message.react("❌");
    } 
});


//pin any messages with more than {pincount} pins but if in table channel pin with one reaction
bot.on("message",async message =>{
    var pins = 0
    var pincount = 5

        //console.log(`pin counting1`)
    var reactions = await message.awaitReactions(reaction => {
            //console.log(`reaction detected`)
            if (reaction.emoji.name == "📌"){

                if (message.channel.name.startsWith(`table-`)){
                    message.pin()
                }else{
                        pins = pins + 1
                        if(pins == 1){
                            let msg = message.channel.send(`if ${pincount} people react with a pin the message will be pinned`)
                        }
                }
            }

        },{time : 100000});

        //console.log(pins)
        if (!message.channel.name.startsWith(`table-`)){
                if (pins > 0){
                    if (pins >= pincount){
                        message.pin()
                    }else{
                        message.channel.send('times up you werent pinned')
                    }
                }
            } 

});


// bot.on("message",async message =>{
//     if (message.channel.is = `512772586979983361`){
//         if (command.startsWith(`.iam`) || command.startsWith(`.iamn`)){

//         }
//     }
// });


//bot channel helper (you need to be in  x channel to use x bot)
// bot.on("message",async message =>{
//     //discord rpg
//     if(message.channel.id == `399675859566460928` || message.channel.id == `399676842652598272`){
//     }else{
//          if (message.toString().startsWith("#!")){
//              message.channel.send(`you have to be in <#399675859566460928> or <#399676842652598272> to use <@170915625722576896>`)
//          }

//     }
// });

bot.login(token);