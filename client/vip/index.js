const statsExport = require("./interface/playerStats/playerStats");
const statsExportBrowser = statsExport.browserInterfaceStats;

const browserInterfaceVip = mp.browsers.new("package://vip/vip.html");
browserInterfaceVip.active = false;

let pressedVip = false;

//addbind
mp.events.add("bind0x5A", () => {
  const currentKey = 0x5a;
  mp.keys.bind(currentKey, true, function () {
    if (mp.players.local.isTypingInTextChat) return;
    if (pressedVip) {
      mp.events.call("client:enableInterface", currentKey);
      browserInterfaceVip.active = false;
      pressedVip = false;
    } else {
      mp.events.call("client:disableInterface", currentKey);
      browserInterfaceVip.active = true;
      pressedVip = true;
    }
  });
});

mp.events.add("client:setDonatePrices", (prices) => {
  browserInterfaceVip.execute(
    `setDonatePrices(${JSON.stringify(
      JSON.parse(prices).nameChange
    )}, ${JSON.stringify(JSON.parse(prices).surnameChange)} ,${JSON.stringify(
      JSON.parse(prices).ageChange
    )}, ${JSON.stringify(JSON.parse(prices).licensePurchase)})`
  );
});

mp.events.add("client:changeName", (name) => {
  // statsExportBrowser.execute(`alterDocuments('name',${JSON.stringify(name)})`);
  mp.events.callRemote("server:changeName", name);
});

mp.events.add("client:changeLastname", (lastName) => {
  // statsExportBrowser.execute(`alterDocuments('surname',${JSON.stringify(lastName)})`);
  mp.events.callRemote("server:changeLastname", lastName);
});

mp.events.add("client:changeAge", (age) => {
  // statsExportBrowser.execute(`alterDocuments('age',${JSON.stringify(age)})`);
  mp.events.callRemote("server:changeAge", age);
});

mp.events.add("client:purchaseLicense", (age) => {
  // statsExportBrowser.execute(`alterDocuments('age',${JSON.stringify(age)})`);
  // mp.events.callRemote("server:changeAge", age);
});

mp.events.add("client:convertDonate", (value) => {
  mp.events.callRemote("server:convertDonate", value);
});

mp.events.add(
  "client:checkProceedDonateSpend",
  async (action, changeValueType) => {
    var response = await mp.events.callRemoteProc(
      "server:proceedDonate",
      action
    );

    if (typeof response == "number" || response == undefined) {
      if (response == undefined) response = 0;

      switch (action) {
        case "nameChange":
          mp.events.callRemote("server:changeName", changeValueType);
          break;
        case "surnameChange":
          mp.events.callRemote("server:changeLastname", changeValueType);
          break;
        case "ageChange":
          mp.events.callRemote("server:changeAge", changeValueType);
          break;
        case "licensePurchase":
          //сохранение в базу
          let responseL = await mp.events.callRemoteProc(
            "server:saveWeaponLicense"
          );
          mp.game.graphics.notify(
            " " +
              responseL[0] +
              " " +
              responseL[1] +
              " " +
              responseL[2] +
              " " +
              responseL[3] +
              " " +
              responseL[4] +
              " " +
              responseL[5]
          );
          statsExportBrowser.execute(
            `addWeaponLicense(${responseL[0]},${responseL[1]},${JSON.stringify(
              responseL[2]
            )},${JSON.stringify(responseL[3])},${JSON.stringify(
              responseL[4]
            )},${JSON.stringify(responseL[5])})`
          );

          break;
        default:
          mp.game.graphics.notify("No action available");
      }
      statsExportBrowser.execute(
        `alterDocuments(${JSON.stringify(action)},${JSON.stringify(
          changeValueType
        )})`
      );
    } else {
      mp.game.graphics.notify(response);
    }
  }
);

mp.events.addDataHandler("donate", (entity, donate, oldDonate) => {
  if (entity.handle === mp.players.local.handle) {
    browserInterfaceVip.execute(`setDonate(${donate})`);
  }
});
