$(".filterButtons").click(function () {
  //Добавить категорий
  let sections = [
    "#meleeWeapons",
    "#pistolWeapons",
    "#submachineWeapons",
    "#shotgunWeapons",
    "#riflesWeapons",
    "#throwableWeapons",
  ];
  for (i = 0; i < sections.length; i++) {
    $(sections[i]).hide();
  }
  $("#" + this.id.slice(0, -1)).show();
});

function infoWeaponElement() {}

var globalWeaponObj;
var globalSelectedSlot;

function fillWeaponsStoreBrowser(weaponObj) {
  //только img и цена

  for (var i = 0; i < weaponObj.length; i++) {
    let appendToSlot = "weaponSlot" + i;

    $("#" + weaponObj[i].category + "Weapons").append(
      `<div class="weaponsShopSlots ` +
        weaponObj[i].category +
        `Slots" id="` +
        appendToSlot +
        `"></div>`
    );

    let appendSlotId = "objectIn" + appendToSlot;

    let appendSlot =
      `<div class="weaponsProduct ` +
      weaponObj[i].type +
      " " +
      weaponObj[i].category +
      " " +
      weaponObj[i].name +
      `" id="` +
      appendSlotId +
      `" value=` +
      i +
      `> 
            <img src=` +
      weaponObj[i].img +
      ` class="generalItemImg" value=` +
      i +
      `>
            <h1 class="weaponsCost">$ ` +
      weaponObj[i].price +
      `</h1>
            </div>`;

    $("#" + appendToSlot).append(appendSlot);

    // document.getElementById(appendSlotId).style.backgroundImage = weaponObj[i].img;
  }
  weaponsEventListener();
  globalWeaponObj = weaponObj;
}

function callAndFillElement(event) {
  weaponElementValue = event.target.getAttribute("value");
  globalSelectedSlot = weaponElementValue;
  weaponElementWhole = globalWeaponObj[parseInt(weaponElementValue)];

  document.getElementById("weaponText").innerText = weaponElementWhole.title;
  document.getElementById("weaponImg").src = weaponElementWhole.imgLarge;
  document.getElementById("weaponDescription").innerText =
    weaponElementWhole.description;
  document.getElementById("weaponPrice").innerText =
    "Цена: $" + weaponElementWhole.price;

  document.getElementById("weaponsInfo").style.display = "inline-block";
}
//Сделать клик именно по div, а не img
function weaponsEventListener() {
  let clickElements = document.querySelectorAll(".generalItemImg");
  for (var clickElementSingle of clickElements) {
    clickElementSingle.addEventListener("click", callAndFillElement);
  }
}
document.getElementById("buyB").addEventListener("click", (event) => {
  weaponElementWhole = globalWeaponObj[parseInt(globalSelectedSlot)];
  mp.trigger(
    "client:checkProceedMoney",
    weaponElementWhole.price,
    "inventory",
    JSON.stringify(weaponElementWhole),
    "weapons",
    1
  );
});

function setMoney(money) {
  document.getElementById("playerMoney").innerText = "$" + money;
}
