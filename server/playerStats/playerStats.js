// let lastExp;
// let decreaseHungerCol = 0.013;
// let decreaseThirstCol = 0.026;
// let decreaseHungerEv = 0.5;
// let decreaseThirstEv = 1;
// var afkInterval;

//В дальнешем добавить проверку на афк персонажа if afk - выключать интервал (оптимизация)

//обновлять
//Добавить старт ивента после входа персонажа в игру
mp.events.add("server:startAfkUpdateCounters", (player) => {
  setInterval(function () {
    player.setVariable("hunger", player.getVariable("hunger") - 0.1851);
    player.setVariable("thirst", player.getVariable("thirst") - 0.3703);

    if (player.getVariable("hunger") < 0) {
      player.setVariable("hunger", 0);
    }
    mp.db.query(
      "UPDATE `acc_characters` SET `hunger` = ? WHERE `char_id` = ?",
      [player.getVariable("hunger"), player.charID]
    );

    if (player.getVariable("thirst") < 0) {
      player.setVariable("thirst", 0);
    }
    mp.db.query(
      "UPDATE `acc_characters` SET `thirst` = ? WHERE `char_id` = ?",
      [player.getVariable("thirst"), player.charID]
    );
  }, 60000);

  setInterval(function () {
    if (JSON.stringify(player.lastPos) !== JSON.stringify(player.position)) {
      var lastExp = player.getVariable("level");

      if (Math.floor(player.getVariable("level")) <= 3) {
        player.setVariable(
          "level",
          player.getVariable("level") + 0.000694 / player.multiplier
        );
        player.call("client:updateLvl", [
          parseFloat(
            "0" + JSON.stringify(player.getVariable("level")).substring(1) * 100
          ),
        ]);
        mp.db.query(
          "UPDATE `acc_characters` SET `level` = ? WHERE `char_id` = ?",
          [player.getVariable("level"), player.charID]
        );
      }

      if (
        Math.floor(player.getVariable("level")) > Math.floor(lastExp) &&
        Math.floor(player.getVariable("level")) <= 3
      ) {
        player.setVariable("level", Math.floor(player.getVariable("level")));
        player.call("client:resetLvl", [
          Math.floor(player.getVariable("level")),
        ]);
      }
      lastExp = player.getVariable("level");
    }
    player.lastPos = player.position;
  }, 60000);
});

mp.events.add("server:itemRestoreMeal", (player, object) => {
  var newHunger = player.getVariable("hunger") + JSON.parse(object)[0].food;
  if (newHunger > 100) newHunger = 100;
  player.setVariable("hunger", newHunger);

  var newThirst = player.getVariable("thirst") + JSON.parse(object)[0].drinks;
  if (newThirst > 100) newThirst = 100;
  player.setVariable("thirst", newThirst);
});
