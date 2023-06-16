//Категория	(3 категории со своими функциями)
//Переменная (id скорее всего)
//Значение переменной

// require('./dbConnection');

var MotherBlend = 0,
  FatherBlend = 0,
  fBlendShape = 0,
  fBlendSkin = 0;
var HairHighlight = 0,
  HairColour = 0;
var NoseWidth = 0,
  NoseHeight = 0,
  NoseLength = 0,
  NoseBridge = 0,
  NoseTip = 0,
  NoseBridgeShift = 0;
var BrowHeight = 0,
  BrowWidth = 0;
var CBoneHeight = 0,
  CBoneWidth = 0,
  CheekWidth = 0;
var Eyes = 0;
var Lips = 0;
var JawWidth = 0,
  jawHeight = 0;
var ChinLength = 0,
  ChinPos = 0,
  ChinWidth = 0,
  ChinShape = 0;
var NeckWidth = 0;

var bGender = true;

mp.events.add("setCustomization", (player, name, value) => {
  switch (name) {
    case "gender":
      if (value == 1) {
        value = true;
      } else {
        value = false;
      }
      bGender = value; //true M false W
      break;
    case "mother":
      MotherBlend = value;
      break;
    case "father":
      FatherBlend = value;
      break;
    case "shape":
      fBlendShape = value;
      break;
    case "skin":
      fBlendSkin = value;
      break;
    case "hairColor":
      HairColour = value;
      break;
    case "hairColor2":
      HairHighlight = value;
      break;
    case "noseWidth":
      NoseWidth = value;
      break;
    case "noseHeight":
      NoseHeight = value;
      break;
    case "noseLength":
      NoseLength = value;
      break;
    case "noseBridge":
      NoseBridge = value;
      break;
    case "noseTip":
      NoseTip = value;
      break;
    case "noseBridgeShift":
      NoseBridgeShift = value;
      break;
    case "browHeight":
      BrowHeight = value;
      break;
    case "browWidth":
      BrowWidth = value;
      break;
    case "cBoneHeight":
      CBoneHeight = value;
      break;
    case "cBoneWidth":
      CBoneWidth = value;
      break;
    case "cheekWidth":
      CheekWidth = value;
      break;
    case "eyesShape":
      Eyes = value;
      break;
    case "lips":
      Lips = value;
      break;
    case "jawWidth":
      JawWidth = value;
      break;
    case "jawHeight":
      jawHeight = value;
      break;
    case "chinLength":
      ChinLength = value;
      break;
    case "chinPos":
      ChinPos = value;
      break;
    case "chinWidth":
      ChinWidth = value;
      break;
    case "chinShape":
      ChinShape = value;
      break;
    case "neckWidth":
      NeckWidth = value;
      break;

    default:
  }

  player.setCustomization(
    bGender,
    MotherBlend,
    FatherBlend,
    0,
    MotherBlend,
    FatherBlend,
    0,
    fBlendShape,
    fBlendSkin,
    0,
    1,
    HairColour,
    HairHighlight,
    [
      NoseWidth,
      NoseHeight,
      NoseLength,
      NoseBridge,
      NoseTip,
      NoseBridgeShift,
      BrowHeight,
      BrowWidth,
      CBoneHeight,
      CBoneWidth,
      CheekWidth,
      Eyes,
      Lips,
      JawWidth,
      jawHeight,
      ChinLength,
      ChinPos,
      ChinWidth,
      ChinShape,
      NeckWidth,
    ]
  );
});

var facialHairColor = 0;
var eyebrowsColor = 0;
var lipstickColor = 0;

var facialHair = -1;
var eyebrows = -1;
var lipstick = -1;

var blemishes = -1;
var ageing = -1;
var blush = -1;
var complexion = -1;
var sunDamage = -1;
var molesFreckles = -1;
var chestHair = -1;
var bodyBlemishes = -1;

mp.events.add("setHeadOverlay", (player, name, value) => {
  //потестить 0 в opacity

  switch (name) {
    case "blemishes":
      blemishes = value;
      player.setHeadOverlay(0, [blemishes, 1, 0, 0]);
      break;
    case "facialHair":
      facialHair = value;
      player.setHeadOverlay(1, [facialHair, 1, facialHairColor, 0]);
      break;
    case "facialHairColor":
      facialHairColor = value;
      player.setHeadOverlay(1, [facialHair, 1, facialHairColor, 0]);
      break;
    case "eyebrows":
      eyebrows = value;
      player.setHeadOverlay(2, [eyebrows, 1, eyebrowsColor, 0]);
      break;
    case "eyebrowsColor":
      eyebrowsColor = value;
      player.setHeadOverlay(2, [eyebrows, 1, eyebrowsColor, 0]);
      break;
    case "ageing":
      ageing = value;
      player.setHeadOverlay(3, [ageing, 1, 0, 0]);
      break;
    // case "makeup":
    //     player.setHeadOverlay(4, [value, 1, 0, 0]);
    // break;
    case "blush":
      blush = value;
      player.setHeadOverlay(5, [blush, 1, 0, 0]);
      break;
    case "complexion":
      complexion = value;
      player.setHeadOverlay(6, [complexion, 1, 0, 0]);
      break;
    case "sunDamage":
      sunDamage = value;
      player.setHeadOverlay(7, [sunDamage, 1, 0, 0]);
      break;
    case "lipstick":
      lipstick = value;
      player.setHeadOverlay(8, [lipstick, 1, lipstickColor, 0]);
      break;
    case "lipstickColor":
      lipstickColor = value;
      player.setHeadOverlay(8, [lipstick, 1, lipstickColor, 0]);
      break;
    case "molesFreckles":
      molesFreckles = value;
      player.setHeadOverlay(9, [molesFreckles, 1, 0, 0]);
      break;
    case "chestHair":
      chestHair = value;
      player.setHeadOverlay(10, [chestHair, 1, 0, 0]);
      break;
    case "bodyBlemishes":
      bodyBlemishes = value;
      player.setHeadOverlay(11, [bodyBlemishes, 1, 0, 0]);
      break;

    default:
  }

  // function callNaked(){
  //     player.setClothes(parseInt(3), parseInt(0), 0, parseInt(0));
  //     player.setClothes(parseInt(8), parseInt(-1), 0, parseInt(0));
  //     player.setClothes(parseInt(11), parseInt(-1), 0, parseInt(0));
  // }
});

var headAppearance = 0;
var torsoAppearance = 0;
var pantsAppearance = 0;
var shoesAppearance = 0;

var topAppearance = 0;
var underShirt = 0; //57 муж, 34 жен

mp.events.add("setClothes", (player, name, value) => {
  switch (name) {
    case "hair":
      headAppearance = value;
      player.setClothes(parseInt(2), parseInt(headAppearance), 0, parseInt(0));
      break;
    case "torso":
      topAppearance = value;
      torsoAppearance = 0;
      player.setClothes(parseInt(3), parseInt(torsoAppearance), 0, parseInt(0));
      player.setClothes(parseInt(11), parseInt(topAppearance), 0, parseInt(0));

      if (bGender) {
        underShirt = 57;
        player.setClothes(parseInt(8), parseInt(underShirt), 0, parseInt(0));
      } else {
        underShirt = 34;
        player.setClothes(parseInt(8), parseInt(underShirt), 0, parseInt(0));
      }
      break;
    case "pants":
      pantsAppearance = value;
      player.setClothes(parseInt(4), parseInt(pantsAppearance), 0, parseInt(0));
      break;
    case "shoes":
      shoesAppearance = value;
      player.setClothes(parseInt(6), parseInt(shoesAppearance), 0, parseInt(0));
      break;
    default:
  }
});

var eyesColor = 0;

mp.events.add("changeEyeColor", (player, value) => {
  eyesColor = value;
  player.eyeColor = parseInt(eyesColor);
});

mp.events.add("server:resetCharAppearance", (player) => {
  player.eyeColor = 0;
  headAppearance =
    torsoAppearance =
    topAppearance =
    pantsAppearance =
    shoesAppearance =
    underShirt =
      0;

  player.setClothes(parseInt(2), parseInt(0), 0, parseInt(0));
  player.setClothes(parseInt(3), parseInt(0), 0, parseInt(0));
  player.setClothes(parseInt(11), parseInt(0), 0, parseInt(0));
  player.setClothes(parseInt(8), parseInt(57), 0, parseInt(0));
  player.setClothes(parseInt(4), parseInt(0), 0, parseInt(0));
  player.setClothes(parseInt(6), parseInt(0), 0, parseInt(0));

  facialHairColor = eyebrowsColor = lipstickColor = 0;
  facialHair =
    eyebrows =
    lipstick =
    blemishes =
    ageing =
    blush =
    complexion =
    sunDamage =
    molesFreckles =
    chestHair =
    bodyBlemishes =
      -1;

  for (i = 0; i <= 11; i++) {
    player.setHeadOverlay(i, [-1, 1, 0, 0]);
  }

  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(i, [-1, 1, 0, 0]);
  // player.setHeadOverlay(8, [-1, 1, 0, 0]);
  // player.setHeadOverlay(8, [-1, 1, 0, 0]);
  // player.setHeadOverlay(9, [-1, 1, 0, 0]);
  // player.setHeadOverlay(10, [-1, 1, 0, 0]);
  // player.setHeadOverlay(11, [-1, 1, 0, 0]);

  MotherBlend =
    FatherBlend =
    fBlendShape =
    fBlendSkin =
    HairHighlight =
    HairColour =
    NoseWidth =
    NoseHeight =
    NoseLength =
    NoseBridge =
    NoseTip =
    NoseBridgeShift =
    BrowHeight =
    BrowWidth =
    CBoneHeight =
    CBoneWidth =
    CheekWidth =
    Eyes =
    Lips =
    JawWidth =
    jawHeight =
    ChinLength =
    ChinPos =
    ChinWidth =
    ChinShape =
    NeckWidth =
      0;
  bGender = true;

  player.setCustomization(
    bGender,
    MotherBlend,
    FatherBlend,
    0,
    MotherBlend,
    FatherBlend,
    0,
    fBlendShape,
    fBlendSkin,
    0,
    1,
    HairColour,
    HairHighlight,
    [
      NoseWidth,
      NoseHeight,
      NoseLength,
      NoseBridge,
      NoseTip,
      NoseBridgeShift,
      BrowHeight,
      BrowWidth,
      CBoneHeight,
      CBoneWidth,
      CheekWidth,
      Eyes,
      Lips,
      JawWidth,
      jawHeight,
      ChinLength,
      ChinPos,
      ChinWidth,
      ChinShape,
      NeckWidth,
    ]
  );
});

mp.events.add("generateChar", (player, gender) => {
  var bGender = gender; //true M false W
  let fathers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    42, 43, 44,
  ]; //24
  let mothers = [
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 45,
  ]; //22
  let torsoMale = [71, 80, 271];
  let torsoFemale = [49, 280, 377];
  let legsMale = [1, 3, 5];
  let legsFemale = [2, 3, 12];
  let shoesMale = [1, 4, 5];
  let shoesFemale = [1, 3, 5];

  //face and properties

  let generalHairColor = Math.floor(Math.random() * 64);

  MotherBlend = mothers[Math.floor(Math.random() * 22)];
  FatherBlend = fathers[Math.floor(Math.random() * 24)];
  fBlendShape = Math.floor(Math.random() * 12);
  mothers.length;
  fBlendSkin = Math.floor(Math.random() * 12);
  HairHighlight = Math.floor(Math.random() * 64);
  HairColour = generalHairColor;
  facialHairColor = generalHairColor;
  eyebrowsColor = generalHairColor;

  NoseWidth = Math.random() * (1.0 - -1.0) + -1.0;
  NoseHeight = Math.random() * (1.0 - -1.0) + -1.0;
  NoseLength = Math.random() * (1.0 - -1.0) + -1.0;
  NoseBridge = Math.random() * (1.0 - -1.0) + -1.0;
  NoseTip = Math.random() * (1.0 - -1.0) + -1.0;
  NoseBridgeShift = Math.random() * (1.0 - -1.0) + -1.0;
  BrowHeight = Math.random() * (1.0 - -1.0) + -1.0;
  BrowWidth = Math.random() * (1.0 - -1.0) + -1.0;
  CBoneHeight = Math.random() * (1.0 - -1.0) + -1.0;
  CBoneWidth = Math.random() * (1.0 - -1.0) + -1.0;
  CheekWidth = Math.random() * (1.0 - -1.0) + -1.0;
  Eyes = Math.random() * (1.0 - -1.0) + -1.0;
  Lips = Math.random() * (1.0 - -1.0) + -1.0;
  JawWidth = Math.random() * (1.0 - -1.0) + -1.0;
  jawHeight = Math.random() * (1.0 - -1.0) + -1.0;
  ChinLength = Math.random() * (1.0 - -1.0) + -1.0;
  ChinPos = Math.random() * (1.0 - -1.0) + -1.0;
  ChinWidth = Math.random() * (1.0 - -1.0) + -1.0;
  ChinShape = Math.random() * (1.0 - -1.0) + -1.0;
  NeckWidth = Math.random() * (1.0 - -1.0) + -1.0;

  player.setCustomization(
    bGender,
    MotherBlend,
    FatherBlend,
    0,
    MotherBlend,
    FatherBlend,
    0,
    fBlendShape,
    fBlendSkin,
    0,
    1,
    HairColour,
    HairHighlight,
    [
      NoseWidth,
      NoseHeight,
      NoseLength,
      NoseBridge,
      NoseTip,
      NoseBridgeShift,
      BrowHeight,
      BrowWidth,
      CBoneHeight,
      CBoneWidth,
      CheekWidth,
      Eyes,
      Lips,
      JawWidth,
      jawHeight,
      ChinLength,
      ChinPos,
      ChinWidth,
      ChinShape,
      NeckWidth,
    ]
  );

  eyesColor = Math.floor(Math.random() * 32);
  player.eyeColor = eyesColor;

  //headOverlay
  eyebrowsColor = generalHairColor;
  eyebrows = Math.floor(Math.random() * 34);
  blemishes = Math.floor(Math.random() * 24);
  ageing = Math.floor(Math.random() * 15);
  complexion = Math.floor(Math.random() * 12);
  sunDamage = Math.floor(Math.random() * 11);
  molesFreckles = Math.floor(Math.random() * 18);
  bodyBlemishes = Math.floor(Math.random() * 12);

  player.setHeadOverlay(0, [
    blemishes,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);
  player.setHeadOverlay(2, [eyebrows, 1, eyebrowsColor, eyebrowsColor]);
  player.setHeadOverlay(3, [
    ageing,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);
  player.setHeadOverlay(6, [
    complexion,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);
  player.setHeadOverlay(7, [
    sunDamage,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);
  player.setHeadOverlay(9, [
    molesFreckles,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);
  player.setHeadOverlay(11, [
    bodyBlemishes,
    1,
    Math.floor(Math.random() * 64),
    Math.floor(Math.random() * 64),
  ]);

  // player.setHeadOverlay(12, [Math.floor(Math.random() * 2), 1, Math.floor(Math.random() * 64), Math.floor(Math.random() * 64)]);
  // player.setHeadOverlay(4, [Math.floor(Math.random() * 74), 1, Math.floor(Math.random() * 64), Math.floor(Math.random() * 64)]);

  //clothes

  if (bGender) {
    headAppearance = Math.floor(Math.random() * 75);
    chestHair = Math.floor(Math.random() * 17);
    facialHair = Math.floor(Math.random() * 29);
    facialHairColor = generalHairColor;
    player.setHeadOverlay(1, [facialHair, 1, facialHairColor, facialHairColor]);
    player.setHeadOverlay(10, [
      chestHair,
      1,
      generalHairColor,
      generalHairColor,
    ]);
    player.setClothes(2, headAppearance, 0, 0);
    underShirt = 57;
    player.setClothes(parseInt(8), parseInt(underShirt), 0, parseInt(0));
    pantsAppearance = legsMale[Math.floor(Math.random() * 3)];
    player.setClothes(parseInt(4), parseInt(pantsAppearance), 0, parseInt(0));
    shoesAppearance = shoesMale[Math.floor(Math.random() * 3)];
    player.setClothes(parseInt(6), parseInt(shoesAppearance), 0, parseInt(0));
    topAppearance = torsoMale[Math.floor(Math.random() * 3)];
    torsoAppearance = 0;
    player.setClothes(parseInt(3), parseInt(torsoAppearance), 0, parseInt(0));
    player.setClothes(parseInt(11), parseInt(topAppearance), 0, parseInt(0));
    lipstick = -1;
    lipstickColor = 0;
    blush = -1;
  } else {
    headAppearance = Math.floor(Math.random() * 79);
    lipstick = Math.floor(Math.random() * 10);
    lipstickColor = Math.floor(Math.random() * 64);
    // blush = Math.floor(Math.random() * 33);
    // player.setHeadOverlay(5, [blush, 1, Math.floor(Math.random() * 64), Math.floor(Math.random() * 64)]);
    player.setClothes(2, headAppearance, 0, 0);
    player.setHeadOverlay(8, [lipstick, 1, lipstickColor, lipstickColor]);
    underShirt = 34;
    player.setClothes(parseInt(8), parseInt(underShirt), 0, parseInt(0));
    pantsAppearance = legsFemale[Math.floor(Math.random() * 3)];
    player.setClothes(parseInt(4), parseInt(pantsAppearance), 0, parseInt(0));
    shoesAppearance = shoesFemale[Math.floor(Math.random() * 3)];
    player.setClothes(parseInt(6), parseInt(shoesAppearance), 0, parseInt(0));
    topAppearance = torsoFemale[Math.floor(Math.random() * 3)];
    torsoAppearance = 0;
    player.setClothes(parseInt(3), parseInt(torsoAppearance), 0, parseInt(0));
    player.setClothes(parseInt(11), parseInt(topAppearance), 0, parseInt(0));
    chestHair = 0;
    facialHair = -1;
    facialHairColor = 0;
  }
});

mp.events.addProc("createChar", async (player, name, surname, age) => {
  //убрать костыль
  var mysql = require("mysql2");

  var con = mysql.createConnection({
    host: "localhost",
    database: "gtasr",
    user: "root",
    password: "",
  });
  //костыль

  // function getFckingId(callback) {
  //     con.query('INSERT INTO `acc_characters` (`acc_id`, `name`, `surname`, `age`, `creationDate`) VALUES (?, ?, ?, ?, ?);', [player.accid, name, surname, age, Date.now()], function(err, result) {
  //         if (err)
  //             callback(err, null);
  //         else
  //             callback(null, result.insertId);
  //     });
  // }

  // await getFckingId(function(err, data) {
  //     if (err) {
  //         console.log("ERROR : ", err);
  //     } else {
  //         player.charID = data;
  //     }
  // });

  let promise = new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO `acc_characters` (`acc_id`, `name`, `surname`, `age`, `creationDate`) VALUES (?, ?, ?, ?, ?);",
      [player.accid, name, surname, age, Date.now()],
      function (err, result) {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

  return promise.then(
    (result) => {
      player.charID = result.insertId;

      let dbParents = {
        mother: MotherBlend,
        father: FatherBlend,
        shape: fBlendShape,
        skin: fBlendSkin,
      };
      let dbHair = {
        hair: headAppearance,
        hairColor: HairColour,
        hairColor2: HairHighlight,
      };
      let dbAppearance = {
        noseWidth: NoseWidth,
        noseHeight: NoseHeight,
        noseLength: NoseLength,
        noseBridge: NoseBridge,
        noseTip: NoseTip,
        noseBridgeShift: NoseBridgeShift,
        browHeight: BrowHeight,
        browWidth: BrowWidth,
        cBoneHeight: CBoneHeight,
        cBoneWidth: CBoneWidth,
        cheekWidth: CheekWidth,
        eyes: Eyes,
        lips: Lips,
        jawWidth: JawWidth,
        jawHeight: jawHeight,
        chinLength: ChinLength,
        chinPos: ChinPos,
        chinWidth: ChinWidth,
        chinShape: ChinShape,
        neckWidth: NeckWidth,
      };
      let dbClothes = {
        mask: 0,
        torso: torsoAppearance,
        pants: pantsAppearance,
        shoes: shoesAppearance,
        undershit: underShirt,
        bodyarmor: 0,
        top: topAppearance,
      };
      let dbFeatures = {
        blemishes: blemishes,
        facialHair: facialHair,
        eyebrows: eyebrows,
        ageing: ageing,
        blush: blush,
        complexion: complexion,
        sunDamage: sunDamage,
        lipstick: lipstick,
        molesFreckles: molesFreckles,
        chestHair: chestHair,
        bodyBlemishes: bodyBlemishes,
      };
      let dbAccessory = {
        hat: -1,
        glasses: -1,
        ear: -1,
        watches: -1,
        bracelets: -1,
      };

      //Убрать костыль (уже можно убрать походу)
      setTimeout(function () {
        con.query(
          "INSERT INTO `customization` (`char_id`, `gender`, `parents`, `appearance`, `hair`, `clothes`, `features`, `accessory`, `eyebrowscolor`, `beardcolor`, `eyescolor`, `lipstickcolor`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            parseInt(player.charID),
            bGender,
            JSON.stringify(dbParents),
            JSON.stringify(dbAppearance),
            JSON.stringify(dbHair),
            JSON.stringify(dbClothes),
            JSON.stringify(dbFeatures),
            JSON.stringify(dbAccessory),
            parseInt(eyebrowsColor),
            parseInt(facialHairColor),
            parseInt(eyesColor),
            parseInt(lipstickColor),
          ],
          function (err, result) {
            if (err) console.log(err);
          }
        );
        con.query(
          `UPDATE accounts SET char_id${player.slotID} = ? WHERE acc_id = ?;`,
          [player.charID, player.accid]
        );
      }, 3000);
      //костыль

      player.position = new mp.Vector3(
        -1029.7786865234375,
        -2728.6826171875,
        13.756636619567871
      );

      player.setVariable("headEquipment", headAppearance);
      player.setVariable("topEquipment", topAppearance);
      player.setVariable("pantsEquipment", pantsAppearance);
      player.setVariable("shoesEquipment", shoesAppearance);
      player.setVariable("torsoEquipment", torsoAppearance);
      player.setVariable("underShirtEquipment", underShirt);

      return true;
    },
    (error) => {
      console.log("Rejected: " + error);
      return false;
    }
  );
});

mp.events.add("saveCharSlotId", (player, slotID) => {
  player.slotID = slotID;
});

mp.events.add("server:setCharCreatorPosition", (player) => {
  player.position = new mp.Vector3(
    -1056.17392578125,
    -2717.38955078125,
    0.8002493381500244
  );
  player.heading = 45;
  player.playAnimation(
    "move_strafe@first_person@generic",
    "stand_outro",
    1,
    50
  );
});

mp.events.add("loadCharAppearance", async (player, slotID) => {
  player.position = new mp.Vector3(
    -574.4974975585938,
    -210.08531188964844,
    38.21971130371094
  );

  try {
    var appearanceCharId = await mp.db.query(
      `SELECT char_id${slotID} FROM accounts WHERE acc_id = ?`,
      [player.accid]
    );
  } catch (e) {
    gm.errorHandler(e);
  }

  var charID = parseInt(Object.values(appearanceCharId[0][0])[0]);
  player.charID = charID;
  player.setVariable("charID", charID);
  const [rows] = await mp.db.query(
    "SELECT * FROM `customization` WHERE `char_id` = ?",
    [charID]
  );

  player.setVariable("gender", rows[0].gender);

  player.setVariable("headEquipment", JSON.parse(rows[0].accessory).hat);
  player.setVariable("topEquipment", JSON.parse(rows[0].clothes).top);
  player.setVariable("pantsEquipment", JSON.parse(rows[0].clothes).pants);
  player.setVariable("shoesEquipment", JSON.parse(rows[0].clothes).shoes);
  player.setVariable("torsoEquipment", JSON.parse(rows[0].clothes).torso);
  player.setVariable(
    "underShirtEquipment",
    JSON.parse(rows[0].clothes).undershit
  );

  // console.log(player.getVariable('shoesEquipment'));

  player.setProp(0, JSON.parse(rows[0].accessory).hat, 0);

  for (const [key, value] of Object.entries(JSON.parse(rows[0].hair))) {
    if (key == "hair") {
      mp.events.call("setClothes", player, key, parseInt(value));
    } else {
      mp.events.call("setCustomization", player, key, parseInt(value));
    }
  }

  for (const [key, value] of Object.entries(JSON.parse(rows[0].parents))) {
    mp.events.call("setCustomization", player, key, parseInt(value));
  }
  for (const [key, value] of Object.entries(JSON.parse(rows[0].appearance))) {
    mp.events.call("setCustomization", player, key, parseFloat(value));
  }

  for (const [key, value] of Object.entries(JSON.parse(rows[0].clothes))) {
    mp.events.call("setClothes", player, key, value);
  }
  for (const [key, value] of Object.entries(JSON.parse(rows[0].features))) {
    mp.events.call("setHeadOverlay", player, key, parseInt(value));
  }

  mp.events.call(
    "setHeadOverlay",
    "eyebrowsColor",
    parseInt(rows[0].eyebrowscolor)
  );
  mp.events.call(
    "setHeadOverlay",
    "facialHairColor",
    parseInt(rows[0].beardcolor)
  );
  mp.events.call("changeEyeColor", parseInt(rows[0].eyescolor));
  mp.events.call(
    "setHeadOverlay",
    "lipstickColor",
    parseInt(rows[0].lipstickcolor)
  );

  mp.events.call(
    "setCustomization",
    player,
    "gender",
    player.getVariable("gender")
  );

  //пролупать accessory когда добавлю
});

mp.events.add("server:charSelectMenu", (player) => {
  player.position = new mp.Vector3(
    -574.4974975585938,
    -210.08531188964844,
    43.21971130371094
  );
  player.heading = 31;
  player.playAnimation(
    "move_strafe@first_person@generic",
    "stand_outro",
    1,
    50
  );
  player.dimension = player.accid;
  player.heading = 31;
});

mp.events.add("server:enterGameLastLocation", async (player) => {
  var [charInfoRows] = await mp.db.query(
    "SELECT `position`, `heading` FROM `acc_characters` WHERE `char_id` = ?",
    [player.charID]
  );
  if (charInfoRows[0].position !== null) {
    player.position = new mp.Vector3(JSON.parse(charInfoRows[0].position));
    player.heading = charInfoRows[0].heading;
  }
});
