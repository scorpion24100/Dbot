const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    //!unpound @user , !unpound userid

       //check if the commander has the correct premissions to execute this command, if not return
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");
       //if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))

       //get the user to unpound, if there is none return
       let tounpound = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
       if (!tounpound) return message.channel.send ("You didn't @mention a user!");

       //check the the user isnt unmuting themselves
       if(tounpound.id === message.author.id) return message.channel.send("you cannot unpound yourself")

       //check if the mutee has a higher role in the hierarchy,if yes ruturn
       if (tounpound.highestRole.position >=message.member.highestRole.position) return message.channel.send("you connot unpound a user who has a equal or higher role than yourself")

       let role = message.guild.roles.find(r => r.name === "Pounded")//check to see if the role already exists
 
       if (!role || !tounpound.roles.has(role.id)) return message.channel.send("this user isn't in the pound")

       await tounpound.removeRole(role);

       delete bot.pounded[tounpound.id];

       fs.writeFile("./pounded.json", JSON.stringify(bot.pounded), err =>{
           if(err) throw err;
           console.log(`${tounpound.user.tag} has left the Pound`)
       });



       message.channel.send(`${tounpound} has been unpound`)

       return; 
}

module.exports.help ={
   name: "unpound"
}