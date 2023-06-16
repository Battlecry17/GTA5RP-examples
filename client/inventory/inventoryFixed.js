//вызов html
let activeB = false;
const browserCharInventory = mp.browsers.new(
  "package://inventory/inventory.html"
);
browserCharInventory.active = false;

//export
exports.browserCharInventory = browserCharInventory;

//addbind
mp.events.add("bind0x49", () => {
  const currentKey = 0x49;
  mp.keys.bind(currentKey, true, function () {
    if (mp.players.local.isTypingInTextChat) return;
    if (activeB) {
      mp.events.call("client:enableInterface", currentKey);
      browserCharInventory.active = false;
      activeB = false;
    } else {
      mp.events.call("client:disableInterface", currentKey);
      browserCharInventory.active = true;
      activeB = true;
    }
  });
});

mp.events.add("equipClientHead", (item) => {
  mp.events.callRemote("itemChangeHead", item);
});

mp.events.add("equipClientTorso", (name) => {
  mp.events.callRemote("itemChangeTorso", name);
});

mp.events.add("equipClientLegs", (name) => {
  mp.events.callRemote("itemChangeLegs", name);
});

mp.events.add("equipClientShoes", (name) => {
  mp.gui.chat.push("WTF");
  mp.events.callRemote("itemChangeShoes", name);
});

mp.events.add("equipClientWeapon", (item) => {
  mp.events.callRemote("itemEquipWeapon", item);
});

mp.events.add("removeClientHead", () => {
  mp.events.callRemote("itemSetBlankHead");
});

mp.events.add("removeClientTorso", () => {
  mp.events.callRemote("itemSetBlankTorso");
});

mp.events.add("removeClientLegs", () => {
  mp.events.callRemote("itemSetBlankLegs");
});

mp.events.add("removeClientShoes", () => {
  mp.events.callRemote("itemSetBlankShoes");
});

mp.events.add("removeClientWeapon", () => {
  mp.events.callRemote("itemSetBlankWeapon");
});

mp.events.add("itemRestoreHealth", (item) => {
  mp.events.callRemote("itemRestoreHealth", item);
});

//заполнение инвентаря

function fillInventoryClient(object) {
  browserCharInventory.execute(`fillInventoryBrowser(${object})`);
}

mp.events.add("fillInventory", fillInventoryClient);

mp.events.add("client:fillEquipment", () => {
  browserCharInventory.execute(
    `fillClothesEquipped(${mp.players.local.getVariable(
      "headEquipment"
    )}, ${mp.players.local.getVariable(
      "topEquipment"
    )}, ${mp.players.local.getVariable(
      "pantsEquipment"
    )}, ${mp.players.local.getVariable(
      "shoesEquipment"
    )}, ${mp.players.local.getVariable("gender")})`
  );
});

mp.events.add("addSingleInventoryItem", (object) => {
  browserCharInventory.execute(`addItemFromOutside(${object})`);
});
