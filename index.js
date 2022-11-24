//write here
var bottoken = ''
//token is sent when the schedule is retrieved

//write each URLs got from  https://github.com/misenhower/splatoon3.ink/wiki/Data-Access
var SchedulesURL = ""
var SplatNetGearURL = ""
//You must read the policies


const Discord = require("discord.js");
const request = require('request');
const cron = require('node-cron');
const moment = require('moment');

//datas
var gesodata = ''
var stagedata = ''
var formatdata = {
  "gearPower": {
      "Ink Saver (Main)": {
          "name": "インク効率アップ(メイン)"
      },
      "Ink Saver (Sub)": {
          "name": "インク効率アップ(サブ)"
      },
      "Ink Recovery Up": {
          "name": "インク回復力アップ"
      },
      "Run Speed Up": {
          "name": "ヒト移動速度アップ"
      },
      "Swim Speed Up": {
          "name": "イカダッシュ速度アップ"
      },
      "Special Charge Up": {
          "name": "スペシャル増加量アップ"
      },
      "Special Saver": {
          "name": "スペシャル減少量ダウン"
      },
      "Special Power Up": {
          "name": "スペシャル性能アップ"
      },
      "Quick Respawn": {
          "name": "復活時間短縮"
      },
      "Quick Super Jump": {
          "name": "スーパージャンプ時間短縮"
      },
      "Sub Power Up": {
          "name": "サブ性能アップ"
      },
      "Ink Resistance Up": {
          "name": "相手インク影響軽減"
      },
      "Sub Resistance Up": {
          "name": "サブ影響軽減"
      },
      "Intensify Action": {
          "name": "アクション強化"
      },
      "Opening Gambit": {
          "name": "スタートダッシュ"
      },
      "Last-Ditch Effort": {
          "name": "ラストスパート"
      },
      "Tenacity": {
          "name": "逆境強化"
      },
      "Comeback": {
          "name": "カムバック"
      },
      "Ninja Squid": {
          "name": "イカニンジャ"
      },
      "Haunt": {
          "name": "リベンジ"
      },
      "Thermal Ink": {
          "name": "サーマルインク"
      },
      "Respawn Punisher": {
          "name": "復活ペナルティアップ"
      },
      "Ability Doubler": {
          "name": "追加ギアパワー倍化"
      },
      "Stealth Jump": {
          "name": "ステルスジャンプ"
      },
      "Object Shredder": {
          "name": "対物攻撃力アップ"
      },
      "Drop Roller": {
          "name": "受け身術"
      },
      "Unknown": {
          "name": "不明"
      }
  },
  "stages": {
      "Scorch Gorge": {
          "name": "ユノハナ大渓谷"
      },
      "Eeltail Alley": {
          "name": "ゴンズイ地区"
      },
      "Hagglefish Market": {
          "name": "ヤガラ市場"
      },
      "Undertow Spillway": {
          "name": "マテガイ放水路"
      },
      "Mincemeat Metalworks": {
          "name": "ナメロウ金属"
      },
      "Mahi-Mahi Resort": {
          "name": "マヒマヒリゾート&スパ"
      },
      "Museum d'Alfonsino": {
          "name": " キンメダイ美術館"
      },
      "Hammerhead Bridge": {
          "name": "マサバ海峡大橋"
      },
      "Wahoo World": {
          "name": "スメーシーワールド"
      },
      "MakoMart": {
          "name": "ザトウマーケット"
      },
      "Inkblot Art Academy": {
          "name": "海女美術大学"
      },
      "Sturgeon Shipyard": {
          "name": "チョウザメ造船"
      }
  },
  "brands": {
      "Zink": {
          "name": "アイロニック","Favored_Ability":"スーパージャンプ時間短縮"
      },
      "Cuttlegear": {
          "name": "アタリメイド","Favored_Ability":"なし"
      },
      "Tentatek": {
          "name": "アロメ","Favored_Ability":"インク回復力アップ"
      },
      "Zekko": {
          "name": "エゾッコ","Favored_Ability":"スペシャル減少量ダウン"
      },
      "Krak-On": {
          "name": "クラーゲス","Favored_Ability":"イカダッシュ速度アップ"
      },
      "Inkline": {
          "name": "シグレニ","Favored_Ability":"サブ影響軽減"
      },
      "Splash Mob": {
          "name": "ジモン","Favored_Ability":"インク効率アップ(メイン)"
      },
      "SquidForce": {
          "name": "バトロイカ","Favored_Ability":"相手インク影響軽減"
      },
      "Forge": {
          "name": "フォーリマ","Favored_Ability":"スペシャル性能アップ"
      },
      "Skalop": {
          "name": "ホタックス","Favored_Ability":"復活時間短縮"
      },
      "Firefin": {
          "name": "ホッコリー","Favored_Ability":"インク効率アップ(サブ)"
      },
      "Takoroka": {
          "name": "ヤコ","Favored_Ability":"スペシャル増加量アップ"
      },
      "Annaki": {
          "name": "アナアキ","Favored_Ability":"インク効率アップ(サブ)"
      },
      "Barazushi": {
          "name": "バラズシ","Favored_Ability":"アクション強化"
      },
      "Emberz": {
          "name": "シチリン","Favored_Ability":"アクション強化"
      },
      "Enperry": {
          "name": "エンペリー","Favored_Ability":"サブ性能アップ"
      },
      "Rockenberg": {
          "name": "ロッケンベルグ","Favored_Ability":"ヒト移動速度アップ"
      },
      "Toni Kensa": {
        "name": "タタキケンサキ","Favored_Ability":"インク効率アップ(メイン)"
    }
  },
  "coopStages": {
      "Spawning Grounds": {
          "name": "シェケナダム"
      },
      "Sockeye Station": {
          "name": "アラマキ砦"
      },
      "Gone Fission Hydroplant": {
          "name": "ムニ・エール海洋発電所"
      }
  },
  "weapons": {
      "Random":{
          "name":"ランダム武器"
      },
      "Blaster": {
          "name": "ホットブラスター"
      },
      "Clash Blaster": {
          "name": "クラッシュブラスター"
      },
      "Luna Blaster": {
          "name": "ノヴァブラスター"
      },
      "Range Blaster": {
          "name": "ロングブラスター"
      },
      "Rapid Blaster Pro": {
          "name": "Rブラスターエリート"
      },
      "Rapid Blaster": {
          "name": "ラピッドブラスター"
      },
      "Splat Brella": {
          "name": "パラシェルター"
      },
      "Tenta Brella": {
          "name": "キャンピングシェルター"
      },
      "Undercover Brella": {
          "name": "スパイガジェット"
      },
      "Inkbrush": {
          "name": "パブロ"
      },
      "Octobrush": {
          "name": "ホクサイ"
      },
      "Bamboozler 14 Mk I": {
          "name": "14式竹筒銃・甲"
      },
      "Classic Squiffer": {
          "name": "スクイックリンα"
      },
      "E-liter 4K": {
          "name": "リッター4K"
      },
      "E-liter 4K Scope": {
          "name": "4Kスコープ"
      },
      "Goo Tuber": {
          "name": "ソイチューバー"
      },
      "Splat Charger": {
          "name": "スプラチャージャー"
      },
      "Spatterscope": {
          "name": "スプラスコープ"
      },
      "Dapple Dualies": {
          "name": "スパッタリー"
      },
      "Dualie Squelchers": {
          "name": "デュアルスイーパー"
      },
      "Glooga Dualies": {
          "name": "ケルビン525"
      },
      "Splat Dualies": {
          "name": "スプラマニューバー"
      },
      "Dark Tetra Dualies": {
          "name": "クアッドホッパーブラック"
      },
      "Carbon Roller": {
          "name": "カーボンローラー"
      },
      "Dynamo Roller": {
          "name": "ダイナモローラー"
      },
      "Flingza Roller": {
          "name": "ヴァリアブルローラー"
      },
      "Splat Roller": {
          "name": "スプラローラー"
      },
      ".52 Gal": {
          "name": ".52ガロン"
      },
      ".96 Gal": {
          "name": ".96ガロン"
      },
      "Aerospray MG": {
          "name": "プロモデラーMG"
      },
      "H-3 Nozzlenose": {
          "name": "H3 リールガン"
      },
      "L-3 Nozzlenose": {
          "name": "L3リールガン"
      },
      "Jet Squelcher": {
          "name": "ジェットスイーパー"
      },
      "N-ZAP '85": {
          "name": "N-ZAP85"
      },
      "Squeezer": {
          "name": "ボトルカイザー"
      },
      "Splash-o-matic": {
          "name": "シャープマーカー"
      },
      "Splattershot": {
          "name": "スプラシューター"
      },
      "Splattershot Jr.": {
          "name": "わかばシューター"
      },
      "Splattershot Pro": {
          "name": "プライムシューター"
      },
      "Sploosh-o-matic": {
          "name": "ボールドマーカー"
      },
      "Bloblobber": {
          "name": "オーバーフロッシャー"
      },
      "Explosher": {
          "name": "エクスプロッシャー"
      },
      "Slosher": {
          "name": "バケットスロッシャー"
      },
      "Tri-Slosher": {
          "name": "ヒッセン"
      },
      "Sloshing Machine": {
          "name": "スクリュースロッシャー"
      },
      "Splatana Stamper": {
          "name": "ジムワイパー"
      },
      "Splatana Wiper": {
          "name": "ドライブワイパー"
      },
      "Ballpoint Splatling": {
          "name": "クーゲルシュライバー"
      },
      "Heavy Splatling": {
          "name": "バレルスピナー"
      },
      "Hydra Splatling": {
          "name": "ハイドラント"
      },
      "Mini Splatling": {
          "name": "スプラスピナー"
      },
      "Nautilus 47": {
          "name": "ノーチラス47"
      },
      "REEF-LUX 450": {
          "name": "LACT-450"
      },
      "Tri-Stringer": {
          "name": "トライストリンガー"
      }
  },
  "rules": {
      "Tower Control": {
          "name": "ガチヤグラ"
      },
      "Splat Zones": {
          "name": "ガチエリア"
      },
      "Rainmaker": {
          "name": "ガチホコバトル"
      },
      "Clam Blitz": {
          "name": "ガチアサリ"
      }
  },
  "GearTypes":{
      "HeadGear":{
          "name":"アタマ"
      },
      "ClothingGear":{
          "name":"フク"
      },
      "ShoesGear":{
          "name":"クツ"
      }
  }
}
//get gears
cron.schedule('0 0 1,5,9,13,17,21 * * *', () => {
  var options = {
    url:SplatNetGearURL,
    headers: {
        'User-Agent': 'Discordbot-bottoken-'+bottoken
    }
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      gesodata = JSON.parse(body);
      var now = new Date();
      var d = now.getDate()
      var h = now.getHours()
      var m = now.getMinutes()
      var s = now.getSeconds()
      console.log(`{${d}日${h}時${m}分${s}秒} [\x1b[32mリクエスト送信\x1b[0m]`)
    }
  }
  request.get(options, callback);
});
//get schedule
cron.schedule('0 0 1,3,5,7,9,11,13,15,17,19,21,23 * * *', () => {
  var options = {
    url: SchedulesURL,
    headers: {
      'User-Agent': 'Discordbot-bottoken-'+bottoken
    }
  };
  function gets(error, response, body) {
    if (!error && response.statusCode == 200) {
      stagedata = JSON.parse(body);
      var now = new Date();
      var d = now.getDate()
      var h = now.getHours()
      var m = now.getMinutes()
      var s = now.getSeconds()
      console.log(`{${d}日${h}時${m}分${s}秒} [\x1b[32mステージリクエスト送信\x1b[0m]`)
    }
  }
  request.get(options, gets);
});
//get time
function nowtime(){
  var now = new Date();
  d = now.getDate()
  h = now.getHours()
  m = now.getMinutes()
  s = now.getSeconds()
}

//slash commands
const interactiondata = [
    {name: "geso",description: "ゲソタウンのギアをすべて取得。"},
    {name: "help",description:"ヘルプコマンド"},
    {name: "update",description:"コマンド追加用"},
    {name: "turf",description: "ナワバリのステージを取得します。",options: [{type: "INTEGER",name: "int",description: "何個先のスケジュールまで表示するか書いてください。(デフォルト2最大5)",required: false}]   },
    {name: "series",description: "チャレンジのステージを取得します。",options: [{type: "INTEGER",name: "int",description: "何個先のスケジュールまで表示するか書いてください。(デフォルト2最大5)",required: false}]   },
    {name: "open",description: "オープンのステージを取得します。",options: [{type: "INTEGER",name: "int",description: "何個先のスケジュールまで表示するか書いてください。(デフォルト2最大5)",required: false}]   },
    {name: "coop",description: "サーモンランの情報を取得します。",options: [{type: "INTEGER",name: "int",description: "何個先のスケジュールまで表示するか書いてください。(デフォルト2最大5)",required: false}]   },
];

const sclient= new Discord.Client({
  intents: Object.keys(Discord.Intents.FLAGS)
});
sclient.on('ready', () => {
  nowtime()
  console.log(`{${d}日${h}時${m}分${s}秒} [\x1b[35mパッケージバージョン:${Discord.version}\x1b[0m] スプラ3BOT起動完了`);
  sclient.user.setActivity(sclient.guilds.cache.size + 'サーバーに参加中｜s3.help', {
    type: 'PLAYING'
  });
  //ゲソタウンデータ取得
  var options = {
    url: SplatNetGearURL,
    headers: {
        'User-Agent': 'Discordbot-bottoken-'+bottoken
    }
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      gesodata = JSON.parse(body);
      nowtime()
      console.log(`{${d}日${h}時${m}分${s}秒} リクエスト送信`)
    }
  }
  request.get(options, callback);  
  //ステージ取得
  var options = {
    url: SchedulesURL,
    headers: {
    'User-Agent': 'Discordbot-bottoken-'+bottoken
    }
  };
  function gets(error, response, body) {
    if (!error && response.statusCode == 200) {
      stagedata = JSON.parse(body);
      nowtime()
      console.log(`{${d}日${h}時${m}分${s}秒} ステージリクエスト送信`)
    }
  }
  request.get(options, gets);
});
sclient.on("messageCreate", async message => {
  if (message.author.bot) return;
  if(!message.guild)return;
  if(!message.channel.permissionsFor(sclient.user.id).has('ADMINISTRATOR')){
  }else{
      if(!message.channel.permissionsFor(sclient.user.id).has('SEND_MESSAGES')) return;
      if(!message.channel.permissionsFor(sclient.user.id).has('ATTACH_FILES')) return;
      if(!message.channel.permissionsFor(sclient.user.id).has('READ_MESSAGE_HISTORY')) return;
  }
  if(message.content == 's3.help'){
    
      const emb= new Discord.MessageEmbed()
      .setDescription('```s3.slash => スラッシュコマンドをサーバーに追加します。\nスラッシュコマンドについては/helpより確認いただけます。```')
      .setColor('7b68ee')
      message.reply({embeds: [emb], ephemeral: true })
  }
  if(message.content == 's3.slash'){
    await sclient.application.commands.set(interactiondata, message.guild.id);
  }
})
sclient.on('guildCreate', async guild => {
   sclient.user.setActivity(sclient.guilds.cache.size + 'サーバーに参加中｜s3.help', {
    type: 'PLAYING'
  });
  await sclient.application.commands.set(interactiondata, guild.id);
})
sclient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
      return;
  }
  nowtime()
  console.log(`{${d}日${h}時${m}分${s}秒} [\x1b[34mコマンドの使用\x1b[0m] ${interaction.guild.name}:${interaction.guild.id}　でコマンドが${interaction.member.id}によって使用`);
  if (interaction.commandName === 'geso') {
    //ピックアップギア
    var pickupbrand = gesodata.data.gesotown.pickupBrand
    var pickupembeds = []
    for (let i = 0; i < 3; i++) {
      var MainJP = formatdata.gearPower[pickupbrand.brandGears[i].gear.primaryGearPower.name].name
      var FavoJP = formatdata.brands[pickupbrand.brandGears[i].gear.brand.name].Favored_Ability
      var BrandJP = formatdata.brands[pickupbrand.brandGears[i].gear.brand.name].name
      var GearType = formatdata.GearTypes[pickupbrand.brandGears[i].gear.__typename].name
      if((pickupbrand.brandGears[i].gear.additionalGearPowers).length == 1){
        pickupembeds.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(pickupbrand.brandGears[i].gear.name)
        .setDescription(pickupbrand.brandGears[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(pickupbrand.brandGears[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '❌', inline: true },
          { name: '追加ギアパワー3', value: '❌', inline: true },
        )
        .setImage(pickupbrand.brandGears[i].gear.image.url)
        .setTimestamp(pickupbrand.saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: pickupbrand.brandGears[i].gear.brand.image.url }))
      }
      if((pickupbrand.brandGears[i].gear.additionalGearPowers).length == 2){
        pickupembeds.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(pickupbrand.brandGears[i].gear.name)
        .setDescription(pickupbrand.brandGears[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(pickupbrand.brandGears[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '⭕', inline: true },
          { name: '追加ギアパワー3', value: '❌', inline: true },
        )
        .setImage(pickupbrand.brandGears[i].gear.image.url)
        .setTimestamp(pickupbrand.saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: pickupbrand.brandGears[i].gear.brand.image.url }))
      }
      if((pickupbrand.brandGears[i].gear.additionalGearPowers).length == 3){
        pickupembeds.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(pickupbrand.brandGears[i].gear.name)
        .setDescription(pickupbrand.brandGears[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(pickupbrand.brandGears[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '⭕', inline: true },
          { name: '追加ギアパワー3', value: '⭕', inline: true },
        )
        .setImage(pickupbrand.brandGears[i].gear.image.url)
        .setTimestamp(pickupbrand.saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: pickupbrand.brandGears[i].gear.brand.image.url }))
      }
    }
    //普通のギア
    var limited = gesodata.data.gesotown.limitedGears
    var limitedgearembed = []
    for (let i = 0; i < 6; i++) {
      var MainJP = formatdata.gearPower[limited[i].gear.primaryGearPower.name].name
      var FavoJP = formatdata.brands[limited[i].gear.brand.name].Favored_Ability
      var BrandJP = formatdata.brands[limited[i].gear.brand.name].name
      var GearType = formatdata.GearTypes[limited[i].gear.__typename].name
      if((limited[i].gear.additionalGearPowers).length == 1){
        limitedgearembed.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(limited[i].gear.name)
        .setDescription(limited[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(limited[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '❌', inline: true },
          { name: '追加ギアパワー3', value: '❌', inline: true },
        )
        .setImage(limited[i].gear.image.url)
        .setTimestamp(limited[i].saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: limited[i].gear.brand.image.url }))
      }
      if((limited[i].gear.additionalGearPowers).length == 2){
        limitedgearembed.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(limited[i].gear.name)
        .setDescription(limited[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(limited[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '⭕', inline: true },
          { name: '追加ギアパワー3', value: '❌', inline: true },
        )
        .setImage(limited[i].gear.image.url)
        .setTimestamp(limited[i].saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: limited[i].gear.brand.image.url }))
      }
      if((limited[i].gear.additionalGearPowers).length == 3){
        limitedgearembed.push(new Discord.MessageEmbed()
        .setColor(0xff0099)
        .setTitle(limited[i].gear.name)
        .setDescription(limited[i].price.toString() +"ゲソ")
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .setThumbnail(limited[i].gear.primaryGearPower.image.url)
        .addFields(
          { name: 'ギアの種類', value: GearType, inline: true },
          { name: 'メインギアパワー', value: MainJP, inline: true },
          { name: '付きやすいギアパワー', value: FavoJP, inline: true },
          { name: '\u200B', value: '\u200B'},
          { name: '追加ギアパワー1', value: '⭕', inline: true },
          { name: '追加ギアパワー2', value: '⭕', inline: true },
          { name: '追加ギアパワー3', value: '⭕', inline: true },
        )
        .setImage(limited[i].gear.image.url)
        .setTimestamp(limited[i].saleEndTime)
        .setFooter({ text: 'ブランド：'+BrandJP, iconURL: limited[i].gear.brand.image.url }))
      }
    }
    await interaction.reply({embeds: [pickupembeds[0],pickupembeds[1],pickupembeds[2],limitedgearembed[0],limitedgearembed[1],limitedgearembed[2],limitedgearembed[3],limitedgearembed[4],limitedgearembed[5]], ephemeral: true })
  
  }
  if (interaction.commandName === 'help') {
    const emb= new Discord.MessageEmbed()
      .setDescription('```/help => コレです\n/update => 新しいコマンドが実装された際は各自実行することで使えるようになります。\n/geso => 現在のゲソタウンのギアをすべて表示します。\n/turf {数字} => ナワバリバトルのスケジュールを{数字}先まで表示します\n/series {数字} => バンカラマッチチャレンジのスケジュールを{数字}先まで表示します\n/open {数字} => バンカラマッチオープンのスケジュールを{数字}先まで表示します\n/coop {数字} => サーモンランのスケジュールを{数字}先まで表示します\n\n```')
      .setColor('7b68ee')
      interaction.reply({embeds: [emb], ephemeral: true })
  }
  if (interaction.commandName === 'update'){
    await sclient.application.commands.set(interactiondata, interaction.guild.id);
  }
  if(interaction.commandName === 'turf'){
    var turfSC = stagedata.data.regularSchedules
    var festSC = stagedata.data.festSchedules
    var turfembed = []
    var limit = 2
    //int確認
    if(interaction.options.getInteger('int') < 1||interaction.options.getInteger('int') > 5){
      if(interaction.options.getInteger('int') < 1)limit = 1;
      if(interaction.options.getInteger('int') > 5)limit = 5;
    }else{
      limit = interaction.options.getInteger('int')
    }
    var festcount = 0
    for (let i = 0; i < limit ; i++) {
      if(turfSC.nodes[i].festMatchSetting == null){
        var Stage1JP = formatdata.stages[turfSC.nodes[i].regularMatchSetting.vsStages[0].name].name
        var Stage2JP = formatdata.stages[turfSC.nodes[i].regularMatchSetting.vsStages[1].name].name
        turfembed.push(new Discord.MessageEmbed()
        .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
        .setColor(0xff0099)
        .setTitle('ナワバリバトル')
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .addFields({ name: '開催時間', value: `${moment(turfSC.nodes[i].startTime).date()}日${moment(turfSC.nodes[i].startTime).hours()}:00～${moment(turfSC.nodes[i].endTime).date()}日${moment(turfSC.nodes[i].endTime).hours()}:00`},
        { name: 'ステージ1', value: Stage1JP, inline: true },
        { name: 'ステージ2', value: Stage2JP, inline: true },
        { name: '\u200B', value: '\u200B'}
        )
        .setImage(turfSC.nodes[i].regularMatchSetting.vsStages[0].image.url)
        )
        turfembed.push(new Discord.MessageEmbed()
        .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
        .setImage(turfSC.nodes[i].regularMatchSetting.vsStages[1].image.url))
      }else{
        festcount++
          var Stage1JP = formatdata.stages[festSC.nodes[festcount - 1].festMatchSetting.vsStages[0].name].name
          var Stage2JP = formatdata.stages[festSC.nodes[festcount - 1].festMatchSetting.vsStages[1].name].name
          turfembed.push(new Discord.MessageEmbed()
          .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(festcount))
          .setColor(0xff0099)
          .setTitle('フェスマッチ : ナワバリバトル')
          .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
          .addFields({ name: '開催時間', value: `${moment(festSC.nodes[i].startTime).date()}日${moment(festSC.nodes[i].startTime).hours()}:00～${moment(festSC.nodes[i].endTime).date()}日${moment(festSC.nodes[i].endTime).hours()}:00`},
          { name: 'ステージ1', value: Stage1JP, inline: true },
          { name: 'ステージ2', value: Stage2JP, inline: true },
          { name: '\u200B', value: '\u200B'}
          )
          .setImage(festSC.nodes[festcount - 1].festMatchSetting.vsStages[0].image.url)
          )
          turfembed.push(new Discord.MessageEmbed()
          .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(festcount))
          .setImage(festSC.nodes[festcount - 1].festMatchSetting.vsStages[1].image.url))
      }
    }
    //フェスなどで取得できないとき
    if(turfembed.length == 0){
      turfembed.push(new Discord.MessageEmbed()
      .setColor(0xff0099)
      .setTitle('現在フェスのためナワバリバトルは行われていません。')
      )
    }
    interaction.reply({embeds: turfembed, ephemeral: true })
  }
  if(interaction.commandName === 'series'){
    var bankarasc =  stagedata.data.bankaraSchedules
    var cembed = []
    var limitc = 2
    //int確認
    if(interaction.options.getInteger('int') < 1||interaction.options.getInteger('int') > 5){
      if(interaction.options.getInteger('int') < 1)limit = 1;
      if(interaction.options.getInteger('int') > 5)limit = 5;
    }else{
      limitc = interaction.options.getInteger('int')
    }
    for (let i = 0; i < limitc ; i++) {
      if(bankarasc.nodes[i].bankaraMatchSettings !== null){
      var rule = formatdata.rules[bankarasc.nodes[i].bankaraMatchSettings[0].vsRule.name].name
      var Stage1JP = formatdata.stages[bankarasc.nodes[i].bankaraMatchSettings[0].vsStages[0].name].name
      var Stage2JP = formatdata.stages[bankarasc.nodes[i].bankaraMatchSettings[0].vsStages[1].name].name
      if(bankarasc.nodes[i].festMatchSetting == null){
        cembed.push(new Discord.MessageEmbed()
        .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
        .setColor(0xff0099)
        .setTitle(`バンカラマッチチャレンジ---${rule}`)
        .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
        .addFields({ name: '開催時間', value: `${moment(bankarasc.nodes[i].startTime).date()}日${moment(bankarasc.nodes[i].startTime).hours()}:00～${moment(bankarasc.nodes[i].endTime).date()}日${moment(bankarasc.nodes[i].endTime).hours()}:00`},
        { name: 'ステージ1', value:  Stage1JP, inline: true },
        { name: 'ステージ2', value:  Stage2JP, inline: true }
        )
        .setImage(bankarasc.nodes[i].bankaraMatchSettings[0].vsStages[0].image.url)
      )
      cembed.push(new Discord.MessageEmbed()
      .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
      .setImage(bankarasc.nodes[i].bankaraMatchSettings[0].vsStages[1].image.url))
      }
    }
    }
    //フェスなどで取得できないとき
    if(cembed.length == 0){
      cembed.push(new Discord.MessageEmbed()
      .setColor(0xff0099)
      .setTitle('現在フェスのためバンカラマッチは行われていません。')
      )
    }
    interaction.reply({embeds: cembed, ephemeral: true })
  }
  if(interaction.commandName === 'open'){
    var bankarasc =  stagedata.data.bankaraSchedules
    var oembed = []
    var limito = 2
    //int確認
    if(interaction.options.getInteger('int') < 1||interaction.options.getInteger('int') > 5){
      if(interaction.options.getInteger('int') < 1)limit = 1;
      if(interaction.options.getInteger('int') > 5)limit = 5;
    }else{
      limito = interaction.options.getInteger('int')
    }
    
    for (let i = 0; i < limito ; i++) {
      if(bankarasc.nodes[i].bankaraMatchSettings !== null){
          var rule = formatdata.rules[bankarasc.nodes[i].bankaraMatchSettings[1].vsRule.name].name
          var Stage1JP = formatdata.stages[bankarasc.nodes[i].bankaraMatchSettings[1].vsStages[0].name].name
          var Stage2JP = formatdata.stages[bankarasc.nodes[i].bankaraMatchSettings[1].vsStages[1].name].name
          if(bankarasc.nodes[i].festMatchSetting == null){
            oembed.push(new Discord.MessageEmbed()
            .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
            .setColor(0xff0099)
            .setTitle(`バンカラマッチオープン---${rule}`)
            .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
            .addFields({ name: '開催時間', value: `${moment(bankarasc.nodes[i].startTime).date()}日${moment(bankarasc.nodes[i].startTime).hours()}:00～${moment(bankarasc.nodes[i].endTime).date()}日${moment(bankarasc.nodes[i].endTime).hours()}:00`},
            { name: 'ステージ1', value: Stage1JP, inline: true },
            { name: 'ステージ2', value: Stage2JP, inline: true }
          )
          .setImage(bankarasc.nodes[i].bankaraMatchSettings[1].vsStages[0].image.url)
          )
          oembed.push(new Discord.MessageEmbed()
          .setURL('https://discord.com/channels/588336492049465364/588343228063940619/1038374680240861234%index='+String(i))
          .setImage(bankarasc.nodes[i].bankaraMatchSettings[1].vsStages[1].image.url))
          }

      }
    }
    //フェスなどで取得できないとき
    if(oembed.length == 0){
      oembed.push(new Discord.MessageEmbed()
      .setColor(0xff0099)
      .setTitle('現在フェスのためバンカラマッチは行われていません。')
      )
    }
    interaction.reply({embeds: oembed, ephemeral: true })
  }
  if(interaction.commandName === 'coop'){
    var coopsc =  stagedata.data.coopGroupingSchedule.regularSchedules
    var coopembeds = []
    var limitco = 2
    //int確認
    if(interaction.options.getInteger('int') < 1||interaction.options.getInteger('int') > 5){
      if(interaction.options.getInteger('int') < 1)limit = 1;
      if(interaction.options.getInteger('int') > 5)limit = 5;
    }else{
      limitco = interaction.options.getInteger('int')
    }
    for (let i = 0; i < limitco ; i++) {
      var weapon1 = formatdata.weapons[coopsc.nodes[i].setting.weapons[0].name].name
      var weapon2 = formatdata.weapons[coopsc.nodes[i].setting.weapons[1].name].name
      var weapon3 = formatdata.weapons[coopsc.nodes[i].setting.weapons[2].name].name
      var weapon4 = formatdata.weapons[coopsc.nodes[i].setting.weapons[3].name].name
      var stage = formatdata.coopStages[coopsc.nodes[i].setting.coopStage.name].name
      coopembeds.push(new Discord.MessageEmbed()
      .setColor(0xff0099)
      .setTitle(`${stage}`)
      .setAuthor({ name: 'Splatoon3.inkにより出力', iconURL: 'https://splatoon3.ink/assets/little-buddy.445c3c88.png', url: 'https://github.com/misenhower/splatoon3.ink' })
      .addFields({ name: '開催時間', value: `${moment(coopsc.nodes[i].startTime).date()}日${moment(coopsc.nodes[i].startTime).hours()}:00～${moment(coopsc.nodes[i].endTime).date()}日${moment(coopsc.nodes[i].endTime).hours()}:00`},
      { name: '武器1', value: weapon1, inline: true},
      { name: '武器2', value: weapon2, inline: true},
      { name: '\u200B', value: '\u200B'},
      { name: '武器3', value: weapon3, inline: true},
      { name: '武器4', value: weapon4, inline: true}
      )
      .setImage(coopsc.nodes[i].setting.coopStage.image.url)
    )
    }
    interaction.reply({embeds: coopembeds, ephemeral: true })
  }
});
sclient.on('guildDelete', async guild => {
  sclient.user.setActivity(sclient.guilds.cache.size + 'サーバーに参加中｜s3.help', {
   type: 'PLAYING'
 });
})
sclient.login(bottoken);