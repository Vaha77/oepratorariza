const bot = require("../core/bot")
const { Scenes, Markup } = require("telegraf");
const Users = require("../models/users");
const admin = new Scenes.BaseScene("admin");

admin.enter(ctx => {
    let txt = `Assalomu aleykum  <b>${ctx.from.first_name}</b> siz <b>Adminlik</b> huquqiga egasiz yangi dbda!`;
    ctx.replyWithHTML(txt, {
        ...Markup.keyboard([
            ["Xabar yuborish"],
            ["Foydalanuvchilar", "Adminlar"],
            ["Ikkinchi bosqichga o'tkazish"]
        ]).resize()
    }).catch(() => {})
})

admin.hears("Xabar yuborish", async ctx => {
    let txt = `Foydalanuvchilarga Xabar yuborish turini tanlang👇`;
    ctx.replyWithHTML(txt, {
        ...Markup.keyboard([
            ["Barchaga", "Bir kishiga"]
        ]).resize()
    }).catch(() => {})
})

admin.hears("Barchaga",ctx=>ctx.scene.enter("allSendMessage"));
admin.hears("Bir kishiga",ctx=>ctx.scene.enter("oneSendMessage"));
admin.hears("Ikkinchi bosqichga o'tkazish",ctx=>ctx.scene.enter("adminSendsetup2"));



const allSendMessage = new Scenes.WizardScene(
    "allSendMessage",
    async (ctx) => {
      ctx.deleteMessage().catch(() => {});
      await ctx.replyWithHTML("Barchaga Video, Photo, File va boshqa xabarlar yuborish shu yerga yozing!");
        return ctx.wizard.next();
      },
    
      async (ctx) => {
         if(!ctx.message) return;
        const users = await Users.find({isAdmin:false});
    
        if(ctx.message.text) {
          let text = ctx.message.text;
          let entities = ctx.message.entities;
          let reply_markup = ctx.message.reply_markup;
          
          users.forEach(item => {
           ctx.telegram.sendMessage(item.user_id, text, {
              entities,
              reply_markup
           }).catch(err => {});
          
          });
             await ctx.reply("Xabar yoborildi");
             return ctx.scene.enter("admin");
          };
    
    
    
        if(ctx.message.photo) {
          let photo_id = ctx.message.photo[0].file_id;
          let caption = ctx.message.caption;
          let caption_entities = ctx.message.caption_entities;
          let reply_markup = ctx.message.reply_markup;
          
          users.forEach(item => {
           ctx.telegram.sendPhoto(item.user_id, photo_id, {
              caption,
              caption_entities,
              reply_markup
           }).catch(err => {});
          
          });
             await ctx.reply("Xabar yoborildi");
             return ctx.scene.enter("admin");
          };
          
        
      
          if(ctx.message.video) {
            let video_id = ctx.message.video.file_id;
            let caption = ctx.message.caption;
            let caption_entities = ctx.message.caption_entities;
            let reply_markup = ctx.message.reply_markup;
            
            users.forEach(item => {
             ctx.telegram.sendVideo(item.user_id, video_id, {
                caption,
                caption_entities,
                reply_markup
             }).catch(err => {});
            
            });
    
            await ctx.reply("Xabar yoborildi");
            return ctx.scene.enter("admin");
      };
            
        
    
      if(ctx.message.document) {
        let file_id = ctx.message.document.file_id;
        let caption = ctx.message.caption;
        let caption_entities = ctx.message.caption_entities;
        let reply_markup = ctx.message.reply_markup;
        
        users.forEach(item => {
         ctx.telegram.sendDocument(item.user_id, file_id, {
            caption,
            caption_entities,
            reply_markup
         }).catch(err => {});
        
        });
    
        await ctx.reply("Xabar yoborildi");
        return ctx.scene.enter("admin");
       
      };
    
      });

      

      const oneSendMessage = new Scenes.WizardScene(
        "oneSendMessage",
        async (ctx) => {
        ctx.deleteMessage().catch(() => {});
        await ctx.replyWithHTML("Bir kishiga xabar yuborish uchun Foydalanuvchini <b>user_id</b> raqamini yuboring!")
          return ctx.wizard.next();
        },
      
        async ctx => {
        if(ctx.callbackQuery) return;
          if(!ctx.message && !ctx.message.text) return;
          const user_id = ctx.message.text;
          ctx.wizard.state.user_id = user_id;
          const user = await Users.findOne({user_id, isAdmin:false});
          if(!user) return ctx.reply("Foydalanuvchi topilmadi 😒");
          let txt = `<b>${user.full_name}</b> video, photo, text, file Yuborishingiz mumkin 👇`;
          ctx.replyWithHTML(txt);
          return ctx.wizard.next();
        },
      
        async (ctx) => {
        if(!ctx.message) return;
        const { user_id } = ctx.wizard.state;
        const user = await Users.findOne({user_id, isAdmin:false});
        
        if(ctx.message.text) {
          let text = ctx.message.text;
          let entities = ctx.message.entities;
          let reply_markup = ctx.message.reply_markup;
          
           ctx.telegram.sendMessage(user.user_id, text, {
              entities,
              reply_markup
           }).catch(err => {});
             await ctx.reply("Xabar yoborildi");
             return ctx.scene.enter("admin");
          };
      
      
      
        if(ctx.message.photo) {
          let photo_id = ctx.message.photo[0].file_id;
          let caption = ctx.message.caption;
          let caption_entities = ctx.message.caption_entities;
          let reply_markup = ctx.message.reply_markup;
          
           ctx.telegram.sendPhoto(user.user_id, photo_id, {
              caption,
              caption_entities,
              reply_markup
           }).catch(err => {});
          
             await ctx.reply("Xabar yoborildi");
             return ctx.scene.enter("admin");
          };
          
        
      
          if(ctx.message.video) {
            let video_id = ctx.message.video.file_id;
            let caption = ctx.message.caption;
            let caption_entities = ctx.message.caption_entities;
            let reply_markup = ctx.message.reply_markup;
            
             ctx.telegram.sendVideo(user.user_id, video_id, {
                caption,
                caption_entities,
                reply_markup
             }).catch(err => {});
            
      
            await ctx.reply("Xabar yoborildi");
            return ctx.scene.enter("admin");
      };
            
        
      
      if(ctx.message.document) {
        let file_id = ctx.message.document.file_id;
        let caption = ctx.message.caption;
        let caption_entities = ctx.message.caption_entities;
        let reply_markup = ctx.message.reply_markup;
        
         ctx.telegram.sendDocument(user.user_id, file_id, {
            caption,
            caption_entities,
            reply_markup
         }).catch(err => {});
        
      
        await ctx.reply("Xabar yoborildi");
        return ctx.scene.enter("admin");
       
      };
      
      
      });
      


admin.hears("Foydalanuvchilar", async ctx => {
    const length = await Users.countDocuments();
    if(length) return ctx.reply("Foydalanuvchilar: "+length+ " ta").catch(() => {});
   return ctx.reply("Foydalanuvchilar topilmadi").catch(() => {});
})

const adminSendsetup2 = new Scenes.WizardScene(
    "adminSendsetup2",
    async ctx => {
      if(!ctx.message && !ctx.message.text) return;
    let txt = ` Foydalanuvchini ikkinchi etabga o'tkazish uchun <b>user_id</b> raqamini yuboring!`;
    await ctx.replyWithHTML(txt).catch(() => {})
    await ctx.wizard.next();
},

async ctx => {
    ctx.wizard.state.user = {};
    if(!ctx.message && ctx.message.text) return;
    const user_id = ctx.message.text;
    const user = await Users.findOne({user_id});
    if(!user) return ctx.reply("bunday foydalanuvchi topilmadi");
    ctx.wizard.state.user = user;
    let txt = `<b>${user.first_name}</b> ga ikkichi Bosqich yuborilsinmi ?`;
    await ctx.replyWithHTML(txt,{
        ...Markup.inlineKeyboard([
           Markup.button.callback("O'tkazish","setup3_next")
        ]).catch(() => {})
    });
    return ctx.wizard.next();
},

async ctx => {
if(!ctx.callbackQuery && ctx.callbackQuery.data !== "setup3_next") return;
await ctx.deleteMessage().catch(() => {})
const {user_id, first_name } = ctx.wizard.state.user;
console.log(user_id)
let txt = `Assalomu aleykum <b>${first_name}</b>
siz birinchi Savollardan muofiqiyatli tarzda ro'yhatdan 
o'tdingiz <b>Sizdan ikkichi bosqichdan</b> o'tishingizni so'raymiz.
`;
  await ctx.telegram.sendMessage(user_id, txt, {
        parse_mode:"HTML",
        ...Markup.inlineKeyboard([
            Markup.button.callback("Ikkinchi bosqichdan o'tish","start_setup2")
        ]).catch(() => {})
    });
    txt = `${first_name}ga Savollar yuborildi`;
    await ctx.replyWithHTML(txt).catch(() => {})
   return await ctx.scene.leave();

}


);


oneSendMessage.command("/start", ctx => ctx.scene.enter("start"))
oneSendMessage.hears("🏠 Bosh menu", ctx => ctx.scene.enter("start"))

allSendMessage.command("/start", ctx => ctx.scene.enter("start"))
allSendMessage.hears("🏠 Bosh menu", ctx => ctx.scene.enter("start"));
adminSendsetup2.command("/start", ctx => ctx.scene.enter("start"))

admin.hears("Adminlar", async ctx => {
    const admins = await Users.find({isAdmin:true})
    if(!admins) return ctx.reply("bot adminlari mavjud emas!").catch(() => {})
    let txt = ``;
    admins.forEach((admin,index)=> {
        txt += `<b>${admin.first_name}</b> <i>${admin.user_id}</i>\n`;
    })

    ctx.replyWithHTML(txt);

})

module.exports = {
    admin,
    allSendMessage,
    oneSendMessage,
    adminSendsetup2
};