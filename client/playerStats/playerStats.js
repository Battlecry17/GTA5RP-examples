const browserInterfaceStats = mp.browsers.new(
  "package://interface/playerStats/playerStats.html"
);
browserInterfaceStats.active = false;

exports.browserInterfaceStats = browserInterfaceStats;

mp.events.add("client:updateLvl", (exp) => {
  browserInterfaceStats.execute(`updateLvl(${exp})`);
});

mp.events.add("client:resetLvl", (exp) => {
  browserInterfaceStats.execute(`resetLvl(${exp})`);
});

let pressed = false;

//addbind
mp.events.add("bind0x4F", () => {
  const currentKey = 0x4f;
  mp.keys.bind(currentKey, true, function () {
    if (mp.players.local.isTypingInTextChat) return;
    if (pressed) {
      mp.events.call("client:enableInterface", currentKey);
      browserInterfaceStats.active = false;
      pressed = false;
    } else {
      mp.events.call("client:disableInterface", currentKey);
      browserInterfaceStats.active = true;
      pressed = true;
    }
  });
});

mp.events.add("client:addPassport", (name, surname, gender, iss, exp, id) => {
  browserInterfaceStats.execute(
    `addPassport(${name}, ${surname}, ${gender}, ${iss}, ${exp}, ${id})`
  );
});

mp.events.add("client:addDrivingL", () => {
  browserInterfaceStats.execute(
    `addLicense(${mp.players.local.getVariable(
      "name"
    )}, ${mp.players.local.getVariable(
      "surname"
    )}, ${mp.players.local.getVariable("age")}, ${mp.players.local.getVariable(
      "gender"
    )}, ${mp.players.local.getVariable("lDrivingID")}, ${JSON.stringify(
      mp.players.local.getVariable("lDrivingIss")
    )}, ${JSON.stringify(mp.players.local.getVariable("lDrivingExp"))})`
  );
});

mp.events.add("client:addWeaponsL", () => {
  browserInterfaceStats.execute(
    `addWeaponLicense(${mp.players.local.getVariable(
      "name"
    )}, ${mp.players.local.getVariable(
      "surname"
    )}, ${mp.players.local.getVariable(
      "gender"
    )}, ${mp.players.local.getVariable("lWeaponsID")}, ${JSON.stringify(
      mp.players.local.getVariable("lWeaponsIss")
    )}, ${JSON.stringify(mp.players.local.getVariable("lWeaponsExp"))})`
  );
});

mp.events.add("client:addMedicalL", () => {
  browserInterfaceStats.execute(
    `addMedicalLicense(${mp.players.local.getVariable(
      "name"
    )}, ${mp.players.local.getVariable("surname")}, ${JSON.stringify(
      mp.players.local.getVariable("lMedicalDate")
    )}, ${JSON.stringify(
      mp.players.local.getVariable("lMedicalDoctorFull")
    )}, ${JSON.stringify(
      mp.players.local.getVariable("lMedicalDoctorInitials")
    )})`
  );
});

mp.events.addDataHandler("job", function (entity, newJob, oldJob) {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceStats.execute(`updateJob(${newJob})`);
  }
});

mp.events.addDataHandler(
  "fraction",
  function (entity, newFraction, oldFraction) {
    if (entity.handle === mp.players.local.handle) {
      browserInterfaceStats.execute(`updateFraction(${newFraction})`);
    }
  }
);

mp.events.addDataHandler("money", (entity, newCash, oldCash) => {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceStats.execute(`updateMoney(${newCash})`);
  }
});

//types of items

const meal = [
  {
    type: "donut",
    food: 25,
    drinks: 0,
  },
  {
    type: "burger",
    food: 50,
    drinks: 0,
  },
  {
    type: "pizza",
    food: 100,
    drinks: 0,
  },
  {
    type: "coffe",
    food: 0,
    drinks: 25,
  },
  {
    type: "soda",
    food: 0,
    drinks: 50,
  },
  {
    type: "water",
    food: 0,
    drinks: 100,
  },
  {
    type: "soup",
    food: 25,
    drinks: 75,
  },
  {
    type: "chicken",
    food: 75,
    drinks: 25,
  },
];

mp.events.add("client:itemRestoreMeal", (item) => {
  var getMeal = meal.filter((obj) => {
    return obj.type == item;
  });
  mp.events.callRemote("server:itemRestoreMeal", JSON.stringify(getMeal));
});

mp.events.addDataHandler("hunger", (entity, hunger, oldhunger) => {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceStats.execute(`updateHunger(${Math.floor(hunger)})`);
    if (Math.floor(hunger) == 0) {
      setInterval(() => {
        mp.players.local.setHealth(mp.players.local.getHealth() + (100 - 1));
      }, 10000);
    }
  }
});

// mp.events.add("client:showPlayerHealth", () => {
//   mp.players.local.setHealth(mp.players.local.getHealth() + (100 - 1));
// });

mp.events.addDataHandler("thirst", (entity, thirst, oldthirst) => {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceStats.execute(`updateThirst(${Math.floor(thirst)})`);
    if (Math.floor(thirst) == 0) {
      mp.events.add("render", () => {
        mp.game.controls.disableControlAction(32, 21, true);
        mp.players.local.setSuffersCriticalHits(true);
      });
    } else {
      mp.events.add("render", () => {
        mp.game.controls.enableControlAction(32, 21, true);
        mp.players.local.setSuffersCriticalHits(false);
      });
    }
  }
});

mp.events.addDataHandler("level", (entity, level, oldlevel) => {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceStats.execute(
      `updateLvl(${parseFloat("0" + JSON.stringify(level).substring(1) * 100)})`
    );
  }
});

// mp.events.add("itemRestoreHungerThirst", (item) => {

// });

// mp.events.add('playerEnterColshape', () => {
//    // experience += 0.019;
//    experience += 5;
//    mp.gui.chat.push("Hey you got exp!" + experience);
//    });

//    mp.events.add('playerEnterVehicle', () => {
//    //  experience += 0.019;
//    experience += 5;
//     mp.gui.chat.push("Hey you got exp!" + experience);
//    });

//  function setExperienceToPlayer(){

//    let experience = 0;
//    let currentLvl = 1;
//    let maxLvl = 3;
//    let lvl2Exp = 100;
//    let lvl3Exp = 250;
//    let bankMoney = 0;
//    let cashMoney = 0;
//    let hunger = 100;
//    let thurst = 100;
//    let leisure = 100;

//       document.getElementById('experienceLvl').innerHTML = "Уровень: " + currentLvl + " из " + maxLvl;

//       setInterval(function(){
//          experience += 0.694;
//          hunger -= 1.851;
//          thurst -= 3.703;
//       }, 600000);

//       setInterval(function(){

//          if (experience < 100){
//             document.getElementById('experienceValue').innerHTML = experience + " из " + lvl2Exp;
//          }
//          else if (experience >= 100){
//             document.getElementById('experienceValue').innerHTML = experience + " из " + lvl3Exp;
//          }

//          document.getElementById('cashMoney').innerHTML = cashMoney + "$";
//          document.getElementById('bankMoney').innerHTML = bankMoney + "€";
//          document.getElementById('hunger').innerHTML = hunger + "%";
//          document.getElementById('thurst').innerHTML = thurst + "%";
//          document.getElementById('leisure').innerHTML = leisure + "%";

//          }, 50);
//          //600000

//       //  mp.events.callRemote("playerSaveExperience", experience);
//  }
