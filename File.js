const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const BOT_TOKEN = "MTM1MDUxNzUzMDk1NDk1Njg4MQ.GPEGvU.zsJ-7vtwKbrWB1zBXAAcyqG5x2rB41ByYiyug8"; // Replace with your bot token
const SERVER_ID = "1350515209588179055"; // Replace with your server's ID

const categories = {
    "💰 Paid PC Games": ["Elden Ring", "Baldur's Gate 3", "Hogwarts Legacy", "Resident Evil 4 Remake", 
                         "The Witcher 3", "Cyberpunk 2077", "Starfield", "FIFA 24", "Forza Horizon 5", "Red Dead Redemption 2"],
    "💰 Paid Android Games": ["Minecraft PE", "Stardew Valley", "Grand Theft Auto: SA", "Monopoly+", "Farming Simulator"],
    "💰 Paid iOS Games": ["Minecraft PE", "Bloons TD 6", "Don't Starve", "Terraria", "Plague Inc."],
    
    "🔥 Cracked PC Games": ["Grand Theft Auto V", "Red Dead Redemption 2", "Cyberpunk 2077"],
    "⚙️ Modded PC Games": ["Minecraft Mods", "Skyrim Mods", "Terraria Mods"],
    "🔥 Cracked Android Games": ["Minecraft PE", "Stardew Valley", "Bloons TD 6"],
    "⚙️ Modded Android Games": ["Subway Surfers (Mod)", "Clash Royale (Mod)", "PUBG Mobile (Mod)"],
    "🔥 Cracked iOS Games": ["Minecraft PE", "Monopoly+", "Farming Simulator"],
    "⚙️ Modded iOS Games": ["Clash of Clans (Mod)", "GTA: SA (Mod)", "Plague Inc. (Mod)"],

    "🔥 Cracked Android Apps": ["Spotify Premium", "YouTube Vanced", "Netflix Mod", "Adobe Lightroom", "Kinemaster Pro"],
    "⚙️ Modded Android Apps": ["Lucky Patcher", "App Cloner Mod", "Snapchat Mod", "Instagram Mod", "GB WhatsApp"],
    "💰 Paid Android Apps": ["Tasker", "Nova Launcher Prime", "Poweramp", "Threema", "Torque Pro"],

    "🔥 Cracked iOS Apps": ["Spotify++", "YouTube++", "Netflix++", "Procreate Mod", "LumaFusion Cracked"],
    "⚙️ Modded iOS Apps": ["TutuApp", "AppValley", "iSpoofer", "iGameGuardian", "AltStore Mods"],
    "💰 Paid iOS Apps": ["Procreate", "LumaFusion", "GoodNotes 5", "Things 3", "Notability"]
};

// Essential server channels
const essentialChannels = [
    { name: "📜-rules", type: 0 }, 
    { name: "👋-welcome", type: 0 },
    { name: "📢-announcements", type: 0 },
    { name: "💬-general-chat", type: 0 },
    { name: "❓-support", type: 0 },
    { name: "💡-suggestions", type: 0 }
];

client.once('ready', async () => {
    console.log(`${client.user.tag} is online!`);

    const guild = client.guilds.cache.get(SERVER_ID);
    if (!guild) return console.log("Guild not found!");

    // Create essential channels
    for (const channelInfo of essentialChannels) {
        await guild.channels.create({
            name: channelInfo.name,
            type: channelInfo.type
        });
    }

    // Create game and app categories
    for (const [categoryName, channels] of Object.entries(categories)) {
        const category = await guild.channels.create({
            name: categoryName,
            type: 4 // Category
        });

        for (const channel of channels) {
            await guild.channels.create({
                name: channel.toLowerCase().replace(/ /g, "-"),
                type: 0, // Text channel
                parent: category.id
            });
        }
    }

    console.log("Server setup completed successfully!");
});

client.login(BOT_TOKEN);
