const express = require("express");

const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const app = express();

app.use(express.json());


// DISCORD SETTINGS

const GUILD_ID = "1500601982740856875";

const TICKET_CATEGORY = "1521521002545152170";

const STAFF_ROLE = "1520900962867216506";




// START WEBSITE API

function startWebsiteAPI(client){


    app.post("/create-order", async (req, res) => {


        try {


            const {
                customer,
                service,
                package,
                price,
                notes

            } = req.body;



            const guild = client.guilds.cache.get(GUILD_ID);



            if(!guild){

                return res.status(404).json({

                    error: "Server not found"

                });

            }




            const ticket = await guild.channels.create({

                name:

                `ticket-${customer}`

                .toLowerCase()

                .replace(/[^a-z0-9]/g, ""),


                type: ChannelType.GuildText,


                parent: TICKET_CATEGORY,


                permissionOverwrites:[


                    {

                        id: guild.roles.everyone.id,

                        deny:[

                            PermissionFlagsBits.ViewChannel

                        ]

                    },



                    {

                        id: STAFF_ROLE,

                        allow:[

                            PermissionFlagsBits.ViewChannel,

                            PermissionFlagsBits.SendMessages,

                            PermissionFlagsBits.ReadMessageHistory

                        ]

                    }


                ]


            });







            const embed = new EmbedBuilder()

            .setColor("#B30000")

            .setTitle("💎 Sinner Services Order Ticket")

            .setDescription(`

**Customer**

${customer}



**Service**

${service}



**Package**

${package}



**Price**

$${price}



**Notes**

${notes || "None"}



━━━━━━━━━━━━━━

Sinner Services

`)

            .setTimestamp();







            const buttons = new ActionRowBuilder()

            .addComponents(


                new ButtonBuilder()

                .setCustomId("claim_ticket")

                .setLabel("👋 Claim")

                .setStyle(ButtonStyle.Primary),



                new ButtonBuilder()

                .setCustomId("close_ticket")

                .setLabel("🔒 Close")

                .setStyle(ButtonStyle.Danger),



                new ButtonBuilder()

                .setCustomId("transcript")

                .setLabel("📄 Transcript")

                .setStyle(ButtonStyle.Secondary)


            );








            await ticket.send({


                content:

                `<@&${STAFF_ROLE}> New website order!`,


                embeds:[embed],


                components:[buttons]


            });







            res.json({


                success:true,


                ticketID: ticket.id


            });





        }


        catch(error){


            console.error(

                "Website Ticket Error:",

                error

            );


            res.status(500).json({


                error:"Failed to create ticket"


            });


        }


    });






    app.listen(3000,()=>{


        console.log(

            "🌐 Website API Online"

        );


    });


}



module.exports = startWebsiteAPI;
