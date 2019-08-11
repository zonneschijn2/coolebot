const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const bot = new discord.Client();

// Wanneer de bot ready is
bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Team Creation Discord", { type: "WATCHING" });

})



// Alles intialiseren & Alle commando's
bot.on("message", async message => {


    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    //Info commando
    if (command === `${prefix}info`) {

        var botIcon = bot.user.displayAvatarURL;

        var infoEmbed = new discord.RichEmbed()
            .setColor("#29e53f")
            .setThumbnail(botIcon)
            .addField("Team Creation", "Team Creation is a growing community, In this clan there are many Tournaments + many Clanwars")
            .addField("Commands", "To see all the commands you need to type !commands. You will get a list with all the commands in your DM")
            .addField("Maked on", "8/11/2019");
        return message.channel.send(infoEmbed);

    }

    //Alle serverinfo Commando
    if (command === `${prefix}serverinfo`) {

        var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
            .setColor("#29e53f")
            .setThumbnail(icon)
            .addField("Total Members", message.guild.memberCount)
            .addField("You are joined at", message.member.joinedAt)
            .addField("Maked on", "8/11/2019");

        return message.channel.send(serverEmbed);

    }

    //Wanneer de user !commands doet komen alle commands tevoorschijn
    if (command === `${prefix}commands`) {

        var text = "**__All Team Creation Commands:__ \n \n !info - Gives you all the information about the clan \n !serverinfo - Gives you all the information about the server \n !commands - Gives you all the server commands**"

        message.author.send(text)

    }

    //Kick commando
    if (command === `${prefix}kick`) {

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]))

        if (!kickUser) return message.channel.send("User is not found!");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry you are not a staff member so you cant do this!")

        if (kickUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You cant kick this user!")

        var kick = new discord.RichEmbed()
            .setDescription("Kick")
            .setColor("#ee0000")
            .addField("Kicked User", kickUser)
            .addField("Kicked by", message.author)
            .addField("Reason", reason)

        var kickChannel = message.guild.channels.find(`name`, "🤦punishments")
        if (!kickChannel) return message.guild.send("Cannot find the channel")

        message.guild.member(kickUser).kick(reason)

        kickChannel.send(kick)

        return;

    }

    if (command === `${prefix}ban`) {


        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]))

        if (!banUser) return message.channel.send("User is not found!");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry you are not a staff member so you cant do this!")

        if (banUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You cant ban this user!")

        var ban = new discord.RichEmbed()
            .setDescription("Ban")
            .setColor("#ee0000")
            .addField("Banned User", banUser)
            .addField("Banned by", message.author)
            .addField("Reason", reason)

        var banChannel = message.guild.channels.find(`name`, "🤦punishments")
        if (!banChannel) return message.guild.send("Cannot find the channel")

        message.guild.member(banUser).ban(reason)

        banChannel.send(ban)

        return;

        

    }

})



//Standard join roll
bot.on("guildMemberAdd", function (member) {
    member.send("Welcome, To tryout for the clan or interact with other people you need to message: Gersom#9671");
    member.send("He is going to tryout you.");
    member.send("If the tryout is done you can do everything in the server!");
    member.send("Good luck, Have fun!");

    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);
});



bot.login(botConfig.token);