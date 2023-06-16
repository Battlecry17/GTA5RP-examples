const browserCharWeaponsMarket = mp.browsers.new(
  "package://stores/weapons_store/index.html"
);
browserCharWeaponsMarket.active = false;

const wShapesCoords = [
  { x: 842.04296875, y: -1035.3199462890625, z: 28.194843292236328 },
  { x: -661.7811279296875, y: -933.5894165039062, z: 21.829214096069336 },
  { x: 809.6522827148438, y: -2159.026611328125, z: 29.61899757385254 },
  { x: 23.04176902770996, y: -1105.7158203125, z: 29.797008514404297 },
  { x: 253.62637329101562, y: -50.97411346435547, z: 69.94105529785156 },
];

let collshapeSpawn = [];
const npcWeaponsStore = mp.game.joaat("s_m_m_ammucountry");
const npcWeaponsRotation = [0, 170, 0, 140, 70];

function foodShopsSpawn() {
  for (let i = 0; i < wShapesCoords.length; i++) {
    mp.labels.new(
      `Нажмите ~HUD_COLOUR_NET_PLAYER29~E~n~[Купить оружие]`,
      new mp.Vector3(
        wShapesCoords[i].x,
        wShapesCoords[i].y,
        1 + wShapesCoords[i].z
      ),
      {
        los: false,
        font: 1,
        drawDistance: 10,
      }
    );
    collshapeSpawn[i] = mp.colshapes.newSphere(
      wShapesCoords[i].x,
      wShapesCoords[i].y,
      wShapesCoords[i].z,
      3
    );
    mp.peds.new(
      npcWeaponsStore,
      wShapesCoords[i],
      npcWeaponsRotation[i],
      mp.players.local.dimension
    );
  }
}
foodShopsSpawn();

mp.events.add("playerEnterColshape", (shape) => {
  if (
    collshapeSpawn.some((someShape) => {
      return someShape == shape;
    })
  ) {
    mp.keys.bind(0x45, true, function () {
      if (mp.players.local.isTypingInTextChat) return;
      browserCharWeaponsMarket.execute(
        `setMoney(${mp.players.local.getVariable("money")})`
      );
      browserCharWeaponsMarket.active = true;
      mp.gui.cursor.show(true, true);
      mp.gui.chat.activate(false);
      mp.game.controls.disableAllControlActions(0);
      mp.keys.bind(0x1b, true, function () {
        browserCharWeaponsMarket.active = false;
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
      });
    });
  }
});

function fillWeaponsStoreClient(object) {
  browserCharWeaponsMarket.execute(`fillWeaponsStoreBrowser(${object})`);
}

mp.events.add("fillWeaponsStore", fillWeaponsStoreClient);

mp.events.add("client:closeClothes", () => {
  browserCharWeaponsMarket.active = false;
});

mp.events.add("client:updateMWeapons", () => {
  browserCharClothesMarket.execute(
    `setMoney(${mp.players.local.getVariable("money")})`
  );
});
