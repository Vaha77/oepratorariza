const { Markup, Scenes } = require("telegraf");
const Users = require("../models/users");
const { getNumber } = require("../keyboards");

const start = new Scenes.WizardScene(
    "start",
    async ctx => {
        const user = await Users.findOne({ user_id: ctx.from.id });
        if (user && user.isAdmin) return ctx.scene.enter("admin");
        let txt = `Assalomu aleykum, hurmatli ${ctx.from.first_name}
Operator lavozimi  uchun anketa to'ldiring`;
        await ctx.replyWithHTML(txt).catch(() => {})
        txt = `Ism familya (IFO) yozing`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz1 = ctx.message.text;
        txt = `Tug‘ilgan kun oy yilingizni yozing`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },


    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz2 = ctx.message.text;
        txt = `Yashash manzilingiz`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz3 =ctx.message.text;
        txt = `Tel raqamingizni yozing`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz4 =ctx.message.text;
        txt = `operatorlikda tajribangiz qancha ?`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz5 =ctx.message.text;  
      txt = `Uzoq masofada yotib qolib ishlay olasizmi? `;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },


    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz6 =ctx.message.text;
        txt = `Qancha muddat biz bilan ishlay olasiz ?`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz7 =ctx.message.text;
        txt = `Eng katta maqsadingiz nima ?`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },

    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz8 =ctx.message.text;
        txt = `Nechta hodimni boshqara olasiz ?`;
        await ctx.replyWithHTML(txt).catch(() => {})
        return ctx.wizard.next();
    },


    async ctx => {
        if(ctx.callbackQuery) return;
        if(ctx.message && !ctx.message.text) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
        ctx.wizard.state.quiz9 =ctx.message.text;
       
            const {
                quiz1,
                quiz2,
                quiz3,
                quiz4,
                quiz5,
                quiz6,
                quiz7,
                quiz8,
                quiz9
            } = ctx.wizard.state;

       


let txt = `<b>Malumotlaringiz hammasi to'g'rimi ?</b>\n
_UserID : <code>${ctx.from.id}</code>
_Username: <b>${ctx.from.username ? "@"+ctx.from.username:"nomalum"}</b>
_Ism Familya: <b>${quiz1}</b>
_Tug'ilgan kun: <b>${quiz2}</b>
_Yashash joyi : <b>${quiz3}</b>
_Tel: <b>${quiz4}</b>
_Operatorlik tajribasi: <b>${quiz5}</b>
_Uzoq masofada ishlashi: <b>${quiz6}</b>
_Ishlash muddati: <b>${quiz7}</b>
_Eng katta maqsadi:<b>${quiz8}</b>
_Nechta hodim bilan ishay olishi: <b>${quiz9}</b>

`;
    
    
            ctx.replyWithHTML(txt, {
                ...Markup.inlineKeyboard([
                    Markup.button.callback("Ha", "yes"),
                    Markup.button.callback("Yoq", "no")
                ], { columns: 2 })
            });
            return ctx.wizard.next();
    
    },
    
        


    async ctx => {
        ctx.deleteMessage().catch(() => {});
    if(ctx.message && ctx.message.text == "/start") return ctx.scene.reenter();
        if (!ctx.callbackQuery) return;
        if (ctx.callbackQuery.data == "yes") {
          
            const {
                quiz1,
                quiz2,
                quiz3,
                quiz4,
                quiz5,
                quiz6,
                quiz7,
                quiz8,
                quiz9
            } = ctx.wizard.state;
   
    

            const user = await Users.findOne({ user_id:ctx.from.id });
            if (!user) {
                await new Users({
                    user_id: ctx.from.id,
                    username: ctx.from.username ? "@" + ctx.from.username : "nomalum",
                    first_name:ctx.from.first_name
                }).save();

            }


            txt = `Sizni so'rovingiz qabul qilindi. Bergan javoblaringizga qarab uch ish kunida siz bilan bo'g'lanishadi Agar bo'g'lanilmasa  demak siz qabul qilinmagansiz. E'tiboringiz uchun rahmat ✅`;

            await ctx.replyWithHTML(txt).catch(() => {})

txt = `<b>ANKETA</b>\n
_UserID : <code>${ctx.from.id}</code>
_Username: <b>${ctx.from.username ? "@"+ctx.from.username:"nomalum"}</b>
_Ism Familya: <b>${quiz1}</b>
_Tug'ilgan kun: <b>${quiz2}</b>
_Yashash joyi : <b>${quiz3}</b>
_Tel: <b>${quiz4}</b>
_Operatorlik tajribasi: <b>${quiz5}</b>
_Uzoq masofada ishlashi: <b>${quiz6}</b>
_Ishlash muddati: <b>${quiz7}</b>
_Eng katta maqsadi:<b>${quiz8}</b>
_Nechta hodim bilan ishay olishi: <b>${quiz9}</b>
`;

      const admins = await Users.find({ isAdmin: true });

            admins.forEach(async admin => {
                try {
                    await ctx.telegram.sendMessage(admin.user_id, txt, {
                        parse_mode: "HTML"
                    }).catch(() => {})
    
                    return ctx.scene.leave();
                } catch (error) {
                    if(error) console.log(error.message)
                    return ctx.scene.leave();

                }
            });

        } else {
            ctx.deleteMessage().catch(() => {});
            let txt = `<b>Anteka Boshidan To'ldiring 🔽</b>`;
            await ctx.replyWithHTML(txt).catch(() => {})
            await ctx.scene.reenter();
        }
    }


);




module.exports = start;