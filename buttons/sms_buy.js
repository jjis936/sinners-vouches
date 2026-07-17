const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");
const { getSession, setSession } = require("../smsSessions");
const { countrySlug } = require("../smsData");
const { createNumberOrder } = require("../database/numbers");

const fivesim = require("../providers/fivesim");
const smspool = require("../providers/smspool");


function actionRow(){
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("sms_check")
            .setLabel("📩 Check SMS")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("sms_resend")
            .setLabel("🔁 Resend / Retry")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("sms_cancel")
            .setLabel("🚫 Cancel & Refund")
            .setStyle(ButtonStyle.Danger)
    );
}


module.exports = {

    customId: "sms_buy",

    async execute(interaction){

        const session = getSession(interaction.user.id);

        if(!session || !session.provider || !session.service || !session.country){
            return interaction.reply({
                content: "❌ Your session expired. Run `/getnumber` again.",
                ephemeral: true
            });
        }

        await interaction.deferUpdate();

        const slug = countrySlug(session.country, session.provider);

        let purchase;

        try{

            if(session.provider === "5sim"){
                purchase = await fivesim.buyNumber(slug, session.service);
            }else{
                purchase = await smspool.buyNumber(slug, session.service);
            }

        }catch(error){

            return interaction.editReply({
                content: `❌ Purchase failed: ${error.message}`,
                embeds: [],
                components: []
            });

        }

        const order = createNumberOrder({
            buyer: interaction.user.id,
            provider: session.provider,
            service: session.service,
            country: session.country,
            phone: purchase.phone,
            providerOrderId: purchase.orderId
        });

        setSession(interaction.user.id, {
            providerOrderId: purchase.orderId,
            localOrderId: order.id
        });

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} NUMBER READY`)
            .setDescription(
                `☎️ **Number**\n${purchase.phone}\n\n` +
                `🧾 **Order**\n${order.id}\n\n` +
                `Use this number on the target site, then press **Check SMS**.`
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` })
            .setTimestamp();

        await interaction.editReply({
            embeds: [embed],
            components: [actionRow()]
        });

    }

};
