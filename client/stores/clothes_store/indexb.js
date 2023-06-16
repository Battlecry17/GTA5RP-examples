$(".filterButtons").click(function () {
  //Добавить категорий

  if (globalGender) {
    let sections = [
      "#MheadWeapons",
      "#masksWeapons",
      "#MlegsWeapons",
      "#MshoesWeapons",
      "#MtorsoWeapons",
    ];
    for (i = 0; i < sections.length; i++) {
      $(sections[i]).hide();
    }
    if ((sections[i] = "#masksWeapons")) {
      $("#" + this.id.slice(0, -1)).show();
    }
    $("#M" + this.id.slice(0, -1)).show();
  } else if (!globalGender) {
    let sections = [
      "#FheadWeapons",
      "#masksWeapons",
      "#FlegsWeapons",
      "#FshoesWeapons",
      "#FtorsoWeapons",
    ];
    for (i = 0; i < sections.length; i++) {
      $(sections[i]).hide();
    }
    if ((sections[i] = "#masksWeapons")) {
      $("#" + this.id.slice(0, -1)).show();
    } else {
      $("#F" + this.id.slice(0, -1)).show();
    }
  }
});

function infoWeaponElement() {}

let globalWeaponObj;
let globalSelectedSlot;
let globalGender;

function fillWeaponsStoreBrowser(weaponObj, gender) {
  //только img и цена
  globalGender = gender;

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
  }
  if (gender) {
    $("#MheadWeapons").show();
  } else {
    $("#FheadWeapons").show();
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
    "clothes",
    1
  );
});

function setMoney(money) {
  document.getElementById("playerMoney").innerText = "$" + money;
}
