const fs = module.require("fs");
const pound = "the-pound"

var msgs = [
    "Pounded lol",
    "you have been sent to the pound kid",
    "you gon fucked up",
    "you've made some poor live choices guy",
    "you've been sent the pound kid, better get you act together",
    "pissed off a mod and is now in the pound",
    "gon' and bullied someone, their in the pound now",
    "has ended up in the pound",
    "has been sentenced to the pound",
    "welcome to the pound kid, have a long hard think about your actions",
    "you've been sent the pound kid, have a long hard think about what you've done",
    "this is why you don't piss off the mods mate"
];

module.exports.run = async (bot, message, args) => {
        //!pound @user , !pound userid

        //check if the commander has the correct premissions to execute this command, if not return
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");
        //if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))

        //get the user to pound, if there is none return
        let topound = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        if (!topound) return message.channel.send ("You didn't @mention a user!");

        //check the the user isnt pounding themselves
        if(topound.id === message.author.id) return message.channel.send("Why would you want to send yourself to the pound?")
        if(topound.id == 399965358146191361) return message.channel.send(`Nice try ${message.author.username}, but i'm not that dumb ;p` )

        //check if the poundee has a higher role in the hierarchy,if yes ruturn
        if (topound.highestRole.position >=message.member.highestRole.position) return message.channel.send("you connot pound a user who has a equal or higher role than yourself")

        let role = message.guild.roles.find(r => r.name === "Pounded")//check to see if the Pounded role already exists
        if(!role) {
            try {
                role = await message.guild.createRole({         //create the Pounded role
                       name: "Pounded",
                       color: "#d3660e",
                       hoist: true,
                       Permissions: []
               });
   
                message.guild.channels.forEach(async (channel, id) =>{   //assign channel spesific premissions to the Pounded role
                   await channel.overwritePermissions(role, {
                       SEND_MESSAGES: false,
                       ADD_REACTIONS: false,
                       SEND_TTS_MESSAGES: false,
                       ATTACH_FILES: false,
                       CONNECT: false,
                       SPEAK: false

                   });
                
               });
   
           } catch(e){
               console.log(e.stack)
           }       
        }

        if(topound.roles.has(role.id)) return message.channel.send(`${topound} is already in the pound`)

        bot.pounded[topound.id] = {
            username: topound.user.tag,
            guild: message.guild.id,
            time: Date.now() + parseInt(args[1]) *1000
        }

        await topound.addRole(role);

        fs.writeFile("./pounded.json", JSON.stringify(bot.pounded, null, 4), err =>{
            if(err) throw err;
            if(args[1]){
            message.channel.send(`${topound} has been sent to the pound for ${args[1]} seconds`);
            console.log(`${topound.user.tag} has been sent to the Pound for ${args[1]} seconds`)
            }else {
            message.channel.send(`${topound} has been sent to the pound`);
            console.log(`${topound.user.tag} has been sent to the Pound`) 
            }
        })



        var len = Math.floor((Math.random(msgs.length)*100000)/(100000/msgs.length))
        // console.log(len)

        //message.channel.send(`${topound} has been sent to the pound`);
        message.guild.channels.find("id", "398991322331217933").send(`${topound} ${msgs[len]}`)


    }    


module.exports.help ={
    name: "pound"
}