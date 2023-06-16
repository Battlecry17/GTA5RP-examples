const browserCharFoodMarket = mp.browsers.new(
  "package://stores/food_store/index.html"
);
browserCharFoodMarket.active = false;

const fShapesCoords = [
  { x: -2966.4453125, y: 390.40960693359375, z: 15.043313980102539 },
  { x: -1485.919189453125, y: -378.2875061035156, z: 40.163429260253906 },
  { x: -1222.35400390625, y: -908.5040893554688, z: 12.32635498046875 },
  { x: 1134.21630859375, y: -982.0906372070312, z: 46.41584014892578 },
];

let collshapeSpawn = [];
const npcStore = mp.game.joaat("mp_m_shopkeep_01");
const npcFoodRotation = [100, 130, 40, 280];

function foodShopsSpawn() {
  for (let i = 0; i < fShapesCoords.length; i++) {
    mp.labels.new(
      `Нажмите ~HUD_COLOUR_NET_PLAYER29~E~n~[Купить продовольствие]`,
      new mp.Vector3(
        fShapesCoords[i].x,
        fShapesCoords[i].y,
        1 + fShapesCoords[i].z
      ),
      {
        los: false,
        font: 1,
        drawDistance: 10,
      }
    );
    collshapeSpawn[i] = mp.colshapes.newSphere(
      fShapesCoords[i].x,
      fShapesCoords[i].y,
      fShapesCoords[i].z,
      3
    );
    mp.peds.new(
      npcStore,
      fShapesCoords[i],
      npcFoodRotation[i],
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
      browserCharFoodMarket.execute(
        `setMoney(${mp.players.local.getVariable("money")})`
      );
      browserCharFoodMarket.active = true;
      mp.gui.cursor.show(true, true);
      mp.gui.chat.activate(false);
      mp.keys.bind(0x1b, true, function () {
        browserCharFoodMarket.active = false;
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
      });
    });
  }
});

function fillFoodStoreClient(object) {
  browserCharFoodMarket.execute(`fillWeaponsStoreBrowser(${object})`);
}

mp.events.add("fillFoodStore", fillFoodStoreClient);

mp.events.add("client:closeFood", () => {
  browserCharFoodMarket.active = false;
});

mp.events.add("client:updateMFood", () => {
  browserCharClothesMarket.execute(
    `setMoney(${mp.players.local.getVariable("money")})`
  );
});
