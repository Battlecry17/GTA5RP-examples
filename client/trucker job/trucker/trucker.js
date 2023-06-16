const browser = mp.browsers.new("package://jobs/trucker/trucker.html");
browser.active = false;

let truckerShapeSize = 3;
let colshapeDeliv;
let blipDeliv;
let currentDelivMarker;
let coordsDeliv = [
  {
    x: 351.7056579589844,
    y: -2459.9140625,
    z: 5.402505397796631,
  }, // x: -684.8331298828125, y: -107.96709442138672, z: 37.748321533203125
  {
    x: 2468.625732421875,
    y: 4110.46533203125,
    z: 37.06470489501953,
  },
  {
    x: -102.12691497802734,
    y: 6500.0625,
    z: 30.49089241027832,
  },
];

let pointSize = 3;
let atWork = 0;
let checkpointReturn = [
  353.1026306152344, -2522.604736328125, 4.942408084869385,
]; //костыль - сделать .active вместо destroy
let finishPoint = mp.colshapes.newSphere(
  checkpointReturn[0],
  checkpointReturn[1],
  checkpointReturn[2],
  pointSize
);

let truckNpcCoords = [334.3670654296875, -2548.193115234375, 6.220844268798828];
let npcTruckerLabel = [
  334.3670654296875, -2548.193115234375, 7.220844268798828,
];

let npcTrucker = mp.game.joaat("s_m_m_trucker_01");
let npcTruckerRotation;

let truckerPed = mp.peds.new(
  npcTrucker,
  new mp.Vector3(truckNpcCoords[0], truckNpcCoords[1], truckNpcCoords[2]),
  0
);
let truckerLabel = mp.labels.new(
  `Нажмите ~HUD_COLOUR_NET_PLAYER29~E~n~[Устройство дальнобойщиком]`,
  npcTruckerLabel,
  {
    los: true,
    font: 4,
    drawDistance: 5,
  }
);
let truckerShape = mp.colshapes.newSphere(
  truckNpcCoords[0],
  truckNpcCoords[1],
  truckNpcCoords[2],
  truckerShapeSize
);

mp.events.add("playerEnterColshape", (shape) => {
  if (shape == finishPoint && checkPlayerInVehicle()) {
    blipDeliv.destroy();
    colshapeDeliv.destroy();
    currentDelivMarker.destroy();
    mp.gui.chat.push(`You succesefully completed the job!`);
    mp.events.callRemote("server:endTruckerJob", true);
    atWork = 0;
  }

  if (shape == colshapeDeliv && checkPlayerInVehicle()) {
    mp.gui.chat.push(`Please hold on for 5 seconds!`);
    mp.players.local.vehicle.freezePosition(true);
    disablePControls(true);
    setTimeout(function () {
      mp.players.local.vehicle.freezePosition(false);
      disablePControls(false);
      blipDeliv.destroy();
      colshapeDeliv.destroy();
      currentDelivMarker.destroy();
      mp.gui.chat.push(`You succesefully delivered a cargo.`);
      truckerDeliverPoints(
        checkpointReturn[0],
        checkpointReturn[1],
        checkpointReturn[2],
        1
      );
    }, 5000);
  }
  if (shape == truckerShape) {
    mp.keys.bind(0x45, true, function () {
      if (mp.players.local.isTypingInTextChat) return;
      if (parseFloat(mp.players.local.getVariable("level")) >= 2) {
        mp.gui.cursor.show(true, true);
        mp.gui.chat.activate(false);
        browser.execute(`showGeneral()`);
        setTimeout(() => {
          browser.active = true;
        }, 200);
        mp.gui.cursor.show(true, true);
        mp.gui.chat.activate(false);
      } else {
        mp.game.graphics.notify(
          "Вам нужно иметь хотя бы 2 уровень чтобы начать работу!"
        );
      }
    });
  }
});

mp.events.add("playerExitColshape", (shape) => {
  if (shape == truckerShape) {
    mp.keys.unbind(0x45, true);
  }
});

function disablePControls(controlsState) {
  mp.events.add("render", () => {
    if (controlsState) {
      mp.game.controls.disableControlAction(32, 75, true);
    } else {
      mp.game.controls.enableControlAction(32, 75, true);
    }
  });
}

// function playerEnterVehicleHandler(vehicle) {
// let modelCheck = mp.game.joaat("benson");
//     if (vehicle.model == modelCheck && atWork == 0){
//     }
//  }
//  mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);

function checkPlayerInVehicle() {
  if (!localPlayer.vehicle) {
    return false;
  }
  return true;
}

mp.events.add("playerLeaveVehicle", (vehicle) => {
  if (atWork == 1) {
    browser.execute(`showQuit()`);
    setTimeout(() => {
      browser.active = true;
    }, 200);
    mp.gui.cursor.show(true, true);
    mp.gui.chat.activate(false);
  }
});

mp.events.add("startTruckerWork", (route) => {
  mp.events.callRemote("server:startTruckerJob", route);
  atWork = 1;
  browser.active = false;
  mp.gui.cursor.show(false, false);
  mp.gui.chat.activate(true);
  truckerDeliverPoints(
    coordsDeliv[route].x,
    coordsDeliv[route].y,
    coordsDeliv[route].z
  );
});

function truckerDeliverPoints(x, y, z) {
  blipDeliv = mp.blips.new(1, new mp.Vector3(x, y, z), {
    scale: 1,
    color: 1,
    shortRange: false,
  });
  blipDeliv.setRoute(true);
  colshapeDeliv = mp.colshapes.newSphere(x, y, z, pointSize);
  currentDelivMarker = mp.markers.new(1, new mp.Vector3(x, y, z), pointSize, {
    direction: new mp.Vector3(x, y, z),
    rotation: new mp.Vector3(0, 0, 0),
    color: [245, 226, 208, 255],
    visible: true,
    dimension: 0,
  });
}

mp.events.add("finishTruckerWork", () => {
  browser.active = false;
  mp.gui.cursor.show(false, false);
  mp.gui.chat.activate(true);
  blipDeliv.destroy();
  colshapeDeliv.destroy();
  currentDelivMarker.destroy();
  atWork = 0;
  mp.events.callRemote("server:endTruckerJob", false);
});

mp.events.add("continueTruckerWork", (vehicle) => {
  if (atWork == 1) {
    browser.active = false;
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);

    setTimeout(function () {
      if (!checkPlayerInVehicle()) {
        blipDeliv.destroy();
        colshapeDeliv.destroy();
        currentDelivMarker.destroy();
        mp.events.callRemote("server:deleteBusVeh");
      }
    }, 60000);
  }
});

mp.events.add("destroyTruckerBr", () => {
  mp.gui.cursor.show(false, false);
  mp.gui.chat.activate(true);
  browser.active = false;
  mp.events.callRemote("removePlayerFromVehicle");
});
