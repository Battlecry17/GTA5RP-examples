const fs = require('fs');

let rawdataWeapons = fs.readFileSync(__dirname + '/weaponsStore.json', (err) => {
    if (err) throw err;
});
let stringWeapons = JSON.stringify(JSON.parse(rawdataWeapons));

let rawdataClothes = fs.readFileSync(__dirname + '/clothesStore.json', (err) => {
    if (err) throw err;
});
let stringClothes = JSON.stringify(JSON.parse(rawdataClothes));

let rawdataFood = fs.readFileSync(__dirname + '/foodStore.json', (err) => {
    if (err) throw err;
});
let stringFood = JSON.stringify(JSON.parse(rawdataFood));


mp.events.add("setStores", (player) => {
    player.call(`fillWeaponsStore`, [stringWeapons]);
    player.call(`fillClothesStore`, [stringClothes, player.getVariable('gender')]); //test - true
    player.call(`fillFoodStore`, [stringFood]);
});