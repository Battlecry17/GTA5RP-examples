var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gtaSR",
});

con.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Database -OK');
    }
});

mp.events.add("playerJoin", (player) => {
    let query = "SELECT inventory FROM acc_characters WHERE char_id = 2;"

    con.query(query, (err, result) => {
        var getRidOfInv = JSON.parse(result[0].inventory);
        var clientOrientedFormat = JSON.stringify(getRidOfInv);
        player.call(`fillInventory`, [clientOrientedFormat]);
        console.log(d);
    })
});

// const medKits = [{
//         type: "healthKitSmall",
//         restore: 25
//     },
//     {
//         type: "heathKitMiddle",
//         restore: 50
//     },
//     {
//         type: "healthKitLarge",
//         restore: 100
//     }
// ];

// mp.events.add("itemRestoreHealth", (player, item) => {
//     switch (item) {
//         case medKits[0].type:
//             player.health += medKits[0].restore;
//             break;

//         case medKits[1].type:
//             player.health += medKits[1].restore;
//             break;

//         case medKits[2].type:
//             player.health += medKits[2].restore;
//             break;
//     }
// });

const clothes = ["head", "torso", "legs", "boots"];


mp.events.add("itemChangeHead", (player, item) => {
    item = item.replace(/\D/g, '');
    player.setProp(parseInt(0), parseInt(item), parseInt(0));
});

mp.events.add("itemChangeTorso", (player, item) => {
    item = item.replace(/\D/g, '');
    player.setClothes(parseInt(3), parseInt(0), 0, parseInt(0));
    player.setClothes(parseInt(8), parseInt(15), 0, parseInt(0));
    player.setClothes(parseInt(11), parseInt(item), 0, parseInt(0));
});

mp.events.add("itemChangeLegs", (player, item) => {
    item = item.replace(/\D/g, '');
    player.setClothes(parseInt(4), parseInt(item), 0, parseInt(0));
});

mp.events.add("itemChangeShoes", (player, item) => {
    item = item.replace(/\D/g, '');
    player.setClothes(parseInt(6), parseInt(item), 0, parseInt(0));
});

mp.events.add("itemEquipWeapon", (player, item) => {
    player.giveWeapon(mp.joaat(item), 30);
});

//Remove items

mp.events.add("itemSetBlankHead", (player) => {
    player.setProp(parseInt(0), parseInt(11), parseInt(0));
});

mp.events.add("itemSetBlankTorso", (player) => {
    player.setClothes(parseInt(3), parseInt(15), 0, parseInt(0));
    player.setClothes(parseInt(11), parseInt(15), 0, parseInt(0));
});

mp.events.add("itemSetBlankLegs", (player) => {
    player.setClothes(parseInt(4), parseInt(21), 0, parseInt(0));
});

mp.events.add("itemSetBlankShoes", (player) => {
    player.setClothes(parseInt(6), parseInt(34), 0, parseInt(0));
});

mp.events.add("itemSetBlankWeapon", (player) => {
    player.removeWeapon(player.weapon);
    player.giveWeapon(mp.joaat("weapon_unarmed"), 1000);
});