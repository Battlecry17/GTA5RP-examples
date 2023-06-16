$(".categoryButtons").click(function () {
  itemsCategories = ["food", "healthKit", "clothes", "weapon", "seeds"];

  displayCategoryBlocks = $(this).attr("id");

  if (displayCategoryBlocks == "common") {
    itemsCategories.map((key) => {
      $("." + key).show();
    });
  } else {
    itemsCategories.map((key) => {
      if (key != displayCategoryBlocks) {
        $("." + key).hide();
      } else {
        $("." + key).show();
      }
      $("." + key).show();
    });
  }
});

let slotsQuantity = 28;

for (let j = 1; j <= slotsQuantity; j++) {
  $("#commonBlock").append(`
        <div class="slotInventory" id="slot${j}"></div>
    `);
}

var item_isStackable = "";
var whatEquipElement;

function makeDraggable(dragObj) {
  $(dragObj).draggable({
    revert: function (isNotReverted) {
      $(this).parent().addClass("full");
      $(this).removeClass("invisible");
    },
    revertDuration: 0,
    scroll: false,
    helper: "clone",
    zIndex: 27,
    drag: function (event, ui) {
      $(this).addClass("invisible");
      $(ui.helper).addClass("filldrag");
      // item_isStackable = $(this).hasClass("stackable");
      whatEquipElement = $(this).parent().attr("id");
      whatParentElementClass = $(this).parent().attr("class");
      if ($(this).parent().hasClass("full")) {
        $(this).parent().removeClass("full");
      }
    },
  });
}

$(".slotInventory").droppable({
  accept: ".fill",
  drop: function (event, ui) {
    var item = $(this).find(".fill");
    if (item.length == 0) {
      $(this).addClass("full");
      ui.draggable.detach().appendTo($(this));

      whatParentElementClass = "inventoryParts"
        ? triggerEventListener(document.getElementById(ui.draggable.attr("id")))
        : console.log("not equip container");

      if (whatEquipElement == "headInventoryPart") {
        $("#headInventoryPart").css(
          "background-image",
          "url(./css/Items/edited/background/head.png)"
        );
        mp.trigger("removeClientHead");
      } else if (whatEquipElement == "torsoInventoryPart") {
        $("#torsoInventoryPart").css(
          "background-image",
          "url(./css/Items/edited/background/torso.png)"
        );
        mp.trigger("removeClientTorso");
      } else if (whatEquipElement == "legsInventoryPart") {
        $("#legsInventoryPart").css(
          "background-image",
          "url(./css/Items/edited/background/pants.png)"
        );
        mp.trigger("removeClientLegs");
      } else if (whatEquipElement == "shoesInventoryPart") {
        $("#shoesInventoryPart").css(
          "background-image",
          "url(./css/Items/edited/background/shoes.png)"
        );
        mp.trigger("removeClientShoes");
      } else if (whatEquipElement == "weaponInventoryPart") {
        $("#weaponInventoryPart").css(
          "background-image",
          "url(./css/Items/edited/background/weapon.png)"
        );
        mp.trigger("removeClientWeapon");
      }
    } else if (item_isStackable == true && item.children("fill")) {
      // ui.draggable.detach();
      // ui.draggable.animate(ui.draggable.data().origPosition, "slow");
    }
    ui.draggable.removeClass("invisible");
  },
});

$("#headInventoryPart").droppable({
  accept: ".head",
  drop: function (event, ui) {
    var item = $(this).find(".head");
    if (item.length == 0) {
      $(this).css("background-image", "none");
      mp.trigger("equipClientHead", ui.draggable.attr("name"));
      $(this).addClass("full");
      ui.draggable.removeClass("invisible");
      ui.draggable.detach().appendTo($(this));
      removeEventList(ui.draggable.attr("id"));
    }
  },
});

$("#torsoInventoryPart").droppable({
  accept: ".torso",
  drop: function (event, ui) {
    var item = $(this).find(".torso");
    if (item.length == 0) {
      $(this).css("background-image", "none");
      mp.trigger("equipClientTorso", ui.draggable.attr("name"));
      $(this).addClass("full");
      ui.draggable.removeClass("invisible");
      ui.draggable.detach().appendTo($(this));
      removeEventList(ui.draggable.attr("id"));
    }
  },
});

$("#legsInventoryPart").droppable({
  accept: ".legs",
  drop: function (event, ui) {
    var item = $(this).find(".legs");
    if (item.length == 0) {
      $(this).css("background-image", "none");
      mp.trigger("equipClientLegs", ui.draggable.attr("name"));
      $(this).addClass("full");
      ui.draggable.removeClass("invisible");
      ui.draggable.detach().appendTo($(this));
      removeEventList(ui.draggable.attr("id"));
    }
  },
});

$("#shoesInventoryPart").droppable({
  accept: ".shoes",
  drop: function (event, ui) {
    var item = $(this).find(".shoes");
    if (item.length == 0) {
      $(this).css("background-image", "none");
      mp.trigger("equipClientShoes", ui.draggable.attr("name"));
      $(this).addClass("full");
      ui.draggable.removeClass("invisible");
      ui.draggable.detach().appendTo($(this));
      removeEventList(ui.draggable.attr("id"));
    }
  },
});

$("#weaponInventoryPart").droppable({
  accept: ".weapon",
  drop: function (event, ui) {
    var item = $(this).find(".weapon");
    if (item.length == 0) {
      $(this).css("background-image", "none");
      mp.trigger("equipClientWeapon", ui.draggable.attr("name"));
      $(this).addClass("full");
      ui.draggable.removeClass("invisible");
      ui.draggable.detach().appendTo($(this));
      removeEventList(ui.draggable.attr("id"));
    }
  },
});

function removeEventList(elemId) {
  document
    .getElementById(elemId)
    .removeEventListener("contextmenu", rightClickEvent);
}

//обработка по ячейкам с json файла (добавление класса full чтобы нельзя было поместить несколько предметов в одну ячейку)

// // right-click panel

const contextMenu = document.getElementById("context-menu");
const bodyscope = document.querySelector("body");
const useButton = document.querySelector("#useButton");
const infoButton = document.querySelector("#infoButton");
const dropMenu = document.getElementById("dropYesNo");
const dropButton = document.querySelector("#dropButton");
const dropButtonNo = document.querySelector("#dropNo");
const dropButtonYes = document.querySelector("#dropYes");
var currentContainerItem = [];
var containerParentId;

const normalizePosition = (mouseX, mouseY) => {
  // check whether mouse position and width of context menu exceed body width and height
  // return true if does
  const outOfBoundsOnX =
    mouseX + contextMenu.clientWidth > bodyscope.clientWidth;
  const outOfBoundsOnY =
    mouseY + contextMenu.clientHeight > bodyscope.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  if (outOfBoundsOnX) {
    normalizedX = bodyscope.clientWidth - contextMenu.clientWidth;
  }

  if (outOfBoundsOnY) {
    normalizedY = bodyscope.clientHeight - contextMenu.clientHeight;
  }

  return {
    normalizedX,
    normalizedY,
  };
};

function rightClickEvent(event) {
  event.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = event;

  const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

  contextMenu.style.top = `${normalizedY}px`;
  contextMenu.style.left = `${normalizedX}px`;

  contextMenu.classList.remove("visible");

  setTimeout(() => {
    contextMenu.classList.add("visible");
  });
  currentContainerItem[0] = event.target.classList;
  currentContainerItem[1] = event.target.getAttribute("name");
  currentContainerItem[2] = event.target;
  currentContainerItem[3] = event.target.getAttribute("id");
  containerParentId = event.target.parentElement.getAttribute("id");
}

function triggerEventListener(object) {
  object.addEventListener("contextmenu", rightClickEvent);
}

bodyscope.addEventListener("mousedown", (e) => {
  if (e.target.offsetParent != contextMenu) {
    contextMenu.classList.remove("visible");
  }
});

useButton.addEventListener("click", () => {
  if (currentContainerItem[0].contains("food")) {
    mp.trigger("client:itemRestoreMeal", currentContainerItem[1]);
    document.getElementById(currentContainerItem[3]).remove();
    $("#" + containerParentId).removeClass("full");
  } else if (currentContainerItem[0].contains("healthKit")) {
    mp.trigger("itemRestoreHealth", currentContainerItem[1]);
    $("." + currentContainerItem[1]).remove();
  } else if (currentContainerItem[0].contains("clothes")) {
    removeEventList(currentContainerItem[3]);
    if (currentContainerItem[1].includes("head")) {
      mp.trigger("equipClientHead", currentContainerItem[1]);
      useClothes("#headInventoryPart");
    }
    if (currentContainerItem[1].includes("torso")) {
      mp.trigger("equipClientTorso", currentContainerItem[1]);
      useClothes("#torsoInventoryPart");
    }
    if (currentContainerItem[1].includes("legs")) {
      mp.trigger("equipClientLegs", currentContainerItem[1]);
      useClothes("#legsInventoryPart");
    }
    if (currentContainerItem[1].includes("shoes")) {
      mp.trigger("equipClientShoes", currentContainerItem[1]);
      useClothes("#shoesInventoryPart");
    }
    //доп слот лица для маски в правом меню инвентаря (эквип)
    // if (currentContainerItem[1].includes("masks")) {
    //     console.log('Masks item used');
    //     mp.trigger('equipClientMasks', currentContainerItem[1]);
    //     useClothes('#shoesInventoryPart');
    // }
  } else if (currentContainerItem[0].contains("weapon")) {
    removeEventList(currentContainerItem[3]);

    mp.trigger("equipClientWeapon", currentContainerItem[1]);
    useClothes("#weaponInventoryPart");
  } else {
    console.log("Invalid item used");
  }
  contextMenu.classList.remove("visible");
  console.log(containerParentId);
  $("#" + containerParentId).removeClass("full");
});

function useClothes(slot) {
  $(slot).css("background-image", "none");
  $(slot).addClass("full");
  $(slot).append(currentContainerItem[2]);
}

dropButton.addEventListener("click", () => {
  document.getElementById("dropQuestion").innerHTML =
    "Вы действительно хотите выбросить " +
    document.getElementById(currentContainerItem[3]).innerText;
  dropMenu.style.display = "inline-block";
  contextMenu.classList.remove("visible");
});

dropButtonNo.addEventListener("click", () => {
  // dropMenu.classList.remove("visible");
  dropMenu.style.display = "none";
});

dropButtonYes.addEventListener("click", () => {
  document.getElementById(currentContainerItem[3]).remove();
  $("#" + containerParentId).removeClass("full");
  // dropMenu.classList.remove('visible');
  dropMenu.style.display = "none";
});

function fillInventoryBrowser(invObject) {
  for (var i = 0; i < invObject.length; i++) {
    $(invObject[i].slot).append(
      `<div class="fill ` +
        invObject[i].type +
        " " +
        invObject[i].category +
        " " +
        invObject[i].name +
        `" name="` +
        invObject[i].name +
        `" id="` +
        invObject[i].id +
        `"> </div>`
    );
    //  id="` + invObject[i].id +`"

    $(invObject[i].slot).addClass("full");
  }

  let clickScope = document.querySelectorAll(".fill");
  for (var clickScopeSingle of clickScope) {
    triggerEventListener(clickScopeSingle);
  }

  makeDraggable(".fill");
}

let emptySlot;

function addItemFromOutside(object) {
  for (var i = 1; i <= slotsQuantity; i++) {
    emptySlot = "#slot" + i;
    var item = $(emptySlot).find(".fill");
    if (item.length == 0) {
      //костыль
      var correctCategory;
      var correctName;
      if (object.type == "clothes") {
        correctCategory = object.category.slice(1);
        correctName = correctCategory + object.name;
      } else {
        correctCategory = object.category;
        correctName = object.name;
      }

      //поправить данные в json
      let kostyilID = String(Math.floor(Math.random() * 100000));
      $(emptySlot).append(
        `<div class="fill  ` +
          object.type +
          " " +
          correctCategory +
          " " +
          correctName +
          `" name="` +
          correctName +
          `" id="` +
          kostyilID +
          `"></div>`
      );
      document.getElementById(kostyilID).style.backgroundImage =
        "url(" + object.img + ")";

      //Сцанный костыль
      makeDraggable("#" + kostyilID);
      triggerEventListener(document.getElementById(kostyilID));

      $("#" + kostyilID)
        .parent()
        .addClass("full");
      break;
    }
  }
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

function fillClothesEquipped(head, torso, legs, shoes, gender) {
  //в будущем передавать и обрабатывать объекты
  if (gender == 1) {
    gender = "male";
  } else {
    gender = "female";
  }
  //сделать проверку на наличие эквипа

  for (i = 0; i < 4; i++) {
    if (arguments[i] != 0) {
      let kostyilID = String(Math.floor(Math.random() * 100000));
      $("#" + getParamNames(fillClothesEquipped)[i] + "InventoryPart").append(
        `<div class="fill clothes` +
          " " +
          getParamNames(fillClothesEquipped)[i] +
          " " +
          arguments[i] +
          `" name="` +
          getParamNames(fillClothesEquipped)[i] +
          arguments[i] +
          `" id="` +
          kostyilID +
          `"></div>`
      );
      $("#" + getParamNames(fillClothesEquipped)[i] + "InventoryPart").addClass(
        "full"
      );

      document.getElementById(kostyilID).style.backgroundImage =
        "url(./css/clothes/head/male/Prop_M_0_161.png)";
      // 'url(./css/clothes/' + getParamNames(fillClothesEquipped)[i] + '/' + gender + '/)'

      makeDraggable("#" + kostyilID);
    }
  }
}
