const donatePrices = {
    'nameChange': 200,
    'surnameChange': 200,
    'ageChange': 200,
    'licensePurchase': 400
};

mp.events.add("server:setDonate", (player) => {
    player.call("client:setDonatePrices", [JSON.stringify(donatePrices)]);
});

//отдельно от остальной логики обработки донатов
mp.events.add("server:convertDonate", async(player, donate) => {
    let currentMoney = player.getVariable('money');
    let currentDonate = player.getVariable('donate');
    if (currentDonate >= donate) {
        player.setVariable('donate', parseInt(currentDonate) - parseInt(donate));
        player.setVariable('money', parseInt(currentMoney) + parseInt(donate * 10));
        await mp.db.query('UPDATE `accounts` SET `donate` = ? WHERE `acc_id` = ?', [player.getVariable('donate'), player.accid]);
        await mp.db.query('UPDATE `acc_characters` SET `money` = ? WHERE `char_id` = ?', [player.getVariable('money'), player.charID]);
    } else {
        console('Fcking cheater has no donate money');
    }
});

mp.events.add('server:changeName', (player, name) => {
    try {
        mp.db.query('UPDATE `acc_characters` SET `name` = ? WHERE `char_id` = ?', [name, player.charID]);
    } catch (e) {
        gm.errorHandler(e)
    };
});

mp.events.add('server:changeLastname', (player, lastName) => {
    try {
        mp.db.query('UPDATE `acc_characters` SET `surname` = ? WHERE `char_id` = ?', [lastName, player.charID]);
    } catch (e) {
        gm.errorHandler(e)
    };
});

mp.events.add('server:changeAge', (player, age) => {
    try {
        mp.db.query('UPDATE `acc_characters` SET `age` = ? WHERE `char_id` = ?', [age, player.charID]);
    } catch (e) {
        gm.errorHandler(e)
    };
});

mp.events.addProc('server:saveWeaponLicense', (player) => {
    mp.db.query('UPDATE `acc_characters` SET `lic_weapons` = 1 WHERE `char_id` = ?', [player.charID]);

    let lWeaponsDate = new Date().getDate();

    if (new Date().getDate() < 10) {
        lWeaponsDate = '0' + lWeaponsDate;
    }

    var date = new Date();
    date.setDate(date.getDate() + 365);
    let lWeaponsID = player.charID + new Date().toLocaleDateString().replace(/[^a-zA-Z0-9 ]/g, '');
    let lWeaponsIss = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
    let lWeaponsExp = new Date().getDate() + '-' + new Date().getMonth() + '-' + date.getFullYear();

    mp.db.query('UPDATE `acc_characters` SET `documents` = JSON_SET(documents, "$.lWeaponsID", ?, "$.lWeaponsIss", ?, "$.lWeaponsExp", ?) WHERE char_id = ?', [lWeaponsID, lWeaponsIss, lWeaponsExp, player.charID]);
    //потестить
    return [player.getVariable('name'), player.getVariable('surname'), player.getVariable('gender'), lWeaponsID, lWeaponsIss, lWeaponsExp];
});

async function checkLicense(ID) {
    [aaa] = await mp.db.query('SELECT lic_weapons FROM acc_characters WHERE char_id = ?', [ID]);
    if (aaa[0].lic_weapons == 0) {
        return true;
    } else {
        return false;
    }
}

mp.events.addProc('server:proceedDonate', async(player, action) => {
    let currentDonate = player.getVariable('donate');
    if (currentDonate >= donatePrices[action]) {
        if (action == 'licensePurchase' && !checkLicense(player.charID)) { //идиотизм с checkLicense
            return 'You already have license!';
        } else {
            player.setVariable('donate', currentDonate - parseInt(donatePrices[action]));
            currentDonate = player.getVariable('donate');
            await mp.db.query('UPDATE accounts SET donate = ? WHERE acc_id = ?', [currentDonate, player.accid]);

            return currentDonate;
        }

    } else if (currentDonate < donatePrices[action]) {
        return 'Not enough donate money';
    }
});

mp.events.add("server:giveDonate", (player, method, donate) => {
    console.log('Donate from ' + method);
    player.setVariable('donate', player.getVariable('donate') + parseInt(donate));

    // player.donate = player.donate + parseInt(donate);
    // player.call('client:setDonate', player.donate);
});