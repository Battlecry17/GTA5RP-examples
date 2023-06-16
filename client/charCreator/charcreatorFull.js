const browserCharInfoScreen = mp.browsers.new(
  "package://charCreator/index.html"
);
browserCharInfoScreen.active = false;
const browserCharCreation = mp.browsers.new(
  "package://charCreator/charcreatorFull.html"
);
browserCharCreation.active = false;

mp.events.add("openSelectChar", () => {
  browserCharInfoScreen.active = true;
  let charSelectCamera = mp.cameras.new(
    "default",
    new mp.Vector3(-576.4974975585938, -207.08531188964844, 38.51971130371094),
    new mp.Vector3(0, 0, 0),
    40
  );

  charSelectCamera.pointAtCoord(
    -574.4974975585938,
    -211.08531188964844,
    38.21971130371094
  );
  charSelectCamera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  mp.events.callRemote("server:charSelectMenu");

  browserCharCreation.active = false;
});

mp.events.add("openCharCreation", (slotID) => {
  browserCharInfoScreen.active = false;
  browserCharCreation.active = true;

  mp.events.callRemote("server:setCharCreatorPosition");
  mp.events.callRemote("saveCharSlotId", slotID);
  mp.events.callRemote("server:resetCharAppearance");

  mp.events.call("client:bodyCreatorCamera");
});

mp.events.add(
  "editCharInfoData",
  (slotID, charId, name, surname, money, bankMoney, fraction, job) => {
    //применение dimension?
    browserCharInfoScreen.execute(
      `showCharScreenInfo(${slotID},${charId},${name},${surname},${money},${bankMoney},${fraction},${job})`
    );
  }
);

mp.events.add("client:bodyCreatorCamera", () => {
  bodyCamera = mp.cameras.new(
    "default",
    new mp.Vector3(-1058.47392578125, -2715.18955078125, 1.4002493381500244),
    new mp.Vector3(0, 0, 0),
    40
  );
  bodyCamera.pointAtCoord(
    -1056.17392578125,
    -2717.38955078125,
    0.8002493381500244
  );

  bodyCamera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add("client:faceCreatorCamera", () => {
  faceCamera = mp.cameras.new(
    "default",
    new mp.Vector3(-1056.97392578125, -2716.68955078125, 1.4502493381500244),
    new mp.Vector3(0, 0, 0),
    40
  );
  faceCamera.pointAtCoord(
    -1056.17392578125,
    -2717.38955078125,
    1.4502493381500244
  );

  faceCamera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add("generateSignalClient", (charGender) => {
  mp.events.callRemote("generateChar", charGender);
});

mp.events.add("setClientCustomization", (name, value) => {
  mp.events.callRemote("setCustomization", name, value);
});
mp.events.add("setClientHeadOverlay", (name, value) => {
  mp.events.callRemote("setHeadOverlay", name, value);
});
mp.events.add("setClientClothes", (name, value) => {
  mp.events.callRemote("setClothes", name, value);
});

mp.events.add("changeClientEyeColor", (value) => {
  mp.events.callRemote("changeEyeColor", value);
});

mp.events.add("createCharClient", async (name, surname, age) => {
  const response = await mp.events.callRemoteProc(
    "createChar",
    name,
    surname,
    age
  );
  if (response == true) {
    browserCharCreation.active = false;
    mp.events.call("client:enterGameGeneral");
  } else {
    mp.console.logInfo("WTFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
  }
});

mp.events.add("client:loadCharAppearance", (slotID) => {
  mp.events.callRemote("loadCharAppearance", slotID);
});

mp.events.add("client:enterGameLastLocation", () => {
  browserCharInfoScreen.active = false;
  mp.events.callRemote("server:enterGameLastLocation");
});

mp.events.add("client:enterGameGeneral", () => {
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
  mp.players.local.freezePosition(false);
  mp.gui.chat.show(true);
  mp.game.ui.displayHud(true); //какие спектры применения?
  mp.game.ui.displayRadar(true);
  mp.events.callRemote("server:enterGameGeneral");
  mp.events.call("client:fillEquipment");
  mp.events.call("client:enableInterface", "dummy");

  mp.console.logInfo("Trigger twice", true, true);

  if (mp.players.local.getVariable("lic_b") == 1) {
    mp.events.call("client:addDrivingL");
  }
  if (mp.players.local.getVariable("lic_weapons") == 1) {
    mp.events.call("client:addWeaponsL");
  }
  if (mp.players.local.getVariable("lic_medical") == 1) {
    mp.events.call("client:addMedicalL");
  }

  // for (let i = 0; i < bindKeys.length; i++) {
  //   mp.events.call(`bind${bindKeys[i]}`);
  // }

  mp.game.gxt.set("PM_PAUSE_HDR", "My Server Name");

  function syncTime() {
    var date = new Date();
    mp.game.time.setClockTime(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }
  setInterval(syncTime, 10000);
});

mp.events.add("render", () => {
  mp.game.ui.hideHudComponentThisFrame(3); //можно спрятать любой интерфейс по цифрам
  mp.players.local.setSuffersCriticalHits(false);
});

mp.events.add("client:deleteChar", (slot) => {
  mp.events.callRemote("server:deleteChar", slot);
});
