const browserCharClothesMarket = mp.browsers.new(
  "package://stores/clothes_store/index.html"
);
browserCharClothesMarket.active = false;

const cShapesCoords = [
  { x: -1448.9620361328125, y: -238.1493377685547, z: 49.81348419189453 },
  { x: -708.8590087890625, y: -151.9205780029297, z: 37.41513442993164 },
  { x: -164.9451904296875, y: -302.7015075683594, z: 39.73328399658203 },
  { x: -1194.6038818359375, y: -767.5560913085938, z: 17.31633949279785 },
  { x: 127.26622009277344, y: -223.38003540039062, z: 54.55783462524414 },
  { x: 613.0763549804688, y: 2761.83740234375, z: 42.088134765625 },
  { x: -3169.06494140625, y: 1044.080810546875, z: 20.86321258544922 },
  { x: 73.94172668457031, y: -1392.6947021484375, z: 29.376144409179688 },
];

let collshapeSpawn = [];
const npcClothesStore = mp.game.joaat("s_f_y_shop_mid");
const npcClothesRotation = [60, 120, -90, 210, 90, 280, 90, 300];

function clothesShopsSpawn() {
  for (let i = 0; i < cShapesCoords.length; i++) {
    mp.labels.new(
      `Нажмите ~HUD_COLOUR_NET_PLAYER29~E~n~[Купить одежду]`,
      new mp.Vector3(
        cShapesCoords[i].x,
        cShapesCoords[i].y,
        1 + cShapesCoords[i].z
      ),
      {
        los: false,
        font: 1,
        drawDistance: 10,
      }
    );
    collshapeSpawn[i] = mp.colshapes.newSphere(
      cShapesCoords[i].x,
      cShapesCoords[i].y,
      cShapesCoords[i].z,
      3
    );
    mp.peds.new(
      npcClothesStore,
      cShapesCoords[i],
      npcClothesRotation[i],
      mp.players.local.dimension
    );
  }
}
clothesShopsSpawn();

mp.events.add("playerEnterColshape", (shape) => {
  if (
    collshapeSpawn.some((someShape) => {
      return someShape == shape;
    })
  ) {
    mp.keys.bind(0x45, true, function () {
      if (mp.players.local.isTypingInTextChat) return;
      browserCharClothesMarket.execute(
        `setMoney(${mp.players.local.getVariable("money")})`
      );
      browserCharClothesMarket.active = true;
      mp.gui.cursor.show(true, true);
      mp.gui.chat.activate(false);
      mp.game.controls.disableAllControlActions(0);
      mp.keys.bind(0x1b, true, function () {
        browserCharClothesMarket.active = false;
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
      });
    });
  }
});

//общий unbind
mp.events.add("playerExitColshape", () => {
  mp.keys.unbind(0x45, true);
  mp.keys.unbind(0x1b, true);
});

mp.keys.bind(0x4a, true, function () {
  if (mp.players.local.isTypingInTextChat) return;
  if (activeB == false) {
    browserCharClothesMarket.active = true;
    activeB = true;
    mp.gui.cursor.show(true, true);
  } else if (activeB == true) {
    browserCharClothesMarket.active = false;
    activeB = false;
    mp.gui.cursor.show(false, false);
  }
});

function fillClothesStoreClient(object, gender) {
  browserCharClothesMarket.execute(
    `fillWeaponsStoreBrowser(${object},${gender})`
  );
}

mp.events.add("fillClothesStore", fillClothesStoreClient);

mp.events.add("client:closeClothes", () => {
  browserCharClothesMarket.active = false;
});

mp.events.add("client:updateMClothes", () => {
  browserCharClothesMarket.execute(
    `setMoney(${mp.players.local.getVariable("money")})`
  );
});
