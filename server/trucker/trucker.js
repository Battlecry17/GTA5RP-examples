// Work part

let trucksPos = {
  x: 342.8888244628906,
  y: -2544.36083984375,
  z: 5.712589263916016,
};
let truckTruckerJob;
const truckerSalary = [30, 60, 120];
let truckRoute;

const truckType = mp.joaat("benson");

mp.events.add("server:startTruckerJob", (player, route) => {
  truckRoute = route;
  player.setVariable("job", 4);
  mp.db.query("UPDATE `acc_characters` SET `job` = ? WHERE `char_id` = ?", [
    player.getVariable("job"),
    player.charID,
  ]);
  truckTruckerJob = mp.vehicles.new(
    truckType,
    new mp.Vector3(trucksPos.x, trucksPos.y, trucksPos.z)
  );
  player.customashveh = truckTruckerJob;
  player.customashveh.setVariable("isServerVeh", true);
  player.putIntoVehicle(truckTruckerJob, 0);
});

mp.events.add("removePlayerFromVehicle", (player) => {
  player.removeFromVehicle();
});

mp.events.add("server:endTruckerJob", (player, jobStatus) => {
  truckTruckerJob.destroy();

  if (jobStatus) {
    player.setVariable(
      "money",
      parseInt(player.getVariable("money")) +
        parseInt(truckerSalary[truckRoute])
    );
    mp.db.query("UPDATE `acc_characters` SET `money` = ? WHERE `char_id` = ?", [
      player.getVariable("money"),
      player.charID,
    ]);
  }
});

//Нормальный спавн дальнобоев
// setInterval(function(){
//     if (truck1 == undefined){
//         truck1 = mp.vehicles.new(truckType, new mp.Vector3(trucksPos[0].x, trucksPos[0].y, trucksPos[0].z));
//     }
//     if (truck2 == undefined){
//         truck2 = mp.vehicles.new(truckType, new mp.Vector3(trucksPos[1].x, trucksPos[1].y, trucksPos[1].z));
//     }
// }, 10000);
