let defaultStep = 0.1;
let oneStep = 1;
let currentSex = true;

showMaleBlocks();

//change sex
$(".buttonGender").click(function () {
  var genderB = $(this).attr("id");
  if (genderB == "maleButton") {
    showMaleBlocks();

    currentSex = true;
  } else if (genderB == "femaleButton") {
    showFemaleBlocks();

    currentSex = false;
  }
  mp.trigger("setClientCustomization", $(this).attr("name"), currentSex);
});

function showMaleBlocks() {
  $("#beard").show();
  $("#beardHr").show();

  $("#chestHairH6").show();
  $("#chestHairHr").show();
  $("#chestHairDiv").show();

  $("#blushH6").hide();
  $("#blushHr").hide();
  $("#blushDiv").hide();

  $("#lipstickH6").hide();
  $("#lipstickHr").hide();
  $("#lipstickDiv").hide();
}

function showFemaleBlocks() {
  $("#beard").hide();
  $("#beardHr").hide();

  $("#chestHairH6").hide();
  $("#chestHairHr").hide();
  $("#chestHairDiv").hide();

  $("#blushH6").show();
  $("#blushHr").show();
  $("#blushDiv").show();

  $("#lipstickH6").show();
  $("#lipstickHr").show();
  $("#lipstickDiv").show();
}

//смены атрибутов html

function changeHtmlTextCustomize(category, name, id) {
  switch (category) {
    case "mother":
      $("#motherSlot").text(name);
      callCustomization(category, parseInt(id));
      break;

    case "father":
      $("#fatherSlot").text(name);
      callCustomization(category, parseInt(id));
      break;

    case "hair":
      $("#hairCut").text("Вариант: " + name);
      callClothes(category, parseInt(name));
      break;

    case "hairColor":
      $("#insertImgHairColor").replaceWith(
        '<img id="insertImgHairColor" class="insertImgBlock" src="css/generalColors/' +
          name +
          '.png" alt="">'
      );
      callCustomization(category, parseInt(name));
      break;

    case "hairColor2":
      $("#insertImgHairColor2").replaceWith(
        '<img id="insertImgHairColor2" class="insertImgBlock" src="css/generalColors/' +
          name +
          '.png" alt="">'
      );
      callCustomization(category, parseInt(name));
      break;

    case "facialHairColor":
      $("#insertImgFaceColor").replaceWith(
        '<img id="insertImgFaceColor" class="insertImgBlock" src="css/generalColors/' +
          name +
          '.png" alt="">'
      );
      callHeadOverlay(category, parseInt(name));
      break;

    case "eyebrowsColor":
      $("#insertImgEyebrowsColor").replaceWith(
        '<img id="insertImgEyebrowsColor" class="insertImgBlock" src="css/generalColors/' +
          name +
          '.png" alt="">'
      );
      callHeadOverlay(category, parseInt(name));
      break;

    case "lipstickColor":
      $("#insertImgLipstickColor").replaceWith(
        '<img id="insertImgLipstickColor" class="insertImgBlock" src="css/generalColors/' +
          name +
          '.png" alt="">'
      );
      callHeadOverlay(category, parseInt(name));
      break;

    case "shoes":
      $("#shoesText").text("Вариант: " + name);
      callClothes(category, parseInt(name));
      break;

    case "pants":
      $("#pantsText").text("Вариант: " + name);
      callClothes(category, parseInt(name));
      break;

    case "torso":
      $("#torsoText").text("Вариант: " + name);
      callClothes(category, parseInt(name));
      break;
  }
}

//вызовы клиентской части

function callCustomization(name, value) {
  mp.trigger("setClientCustomization", name, value);
}

function callHeadOverlay(name, value) {
  mp.trigger("setClientHeadOverlay", name, value);
}

function callClothes(name, value) {
  mp.trigger("setClientClothes", name, parseInt(value));
}

function callEyecolor(value) {
  mp.trigger("changeClientEyeColor", value);
}

function changeTrackValue(outputClass, currentValue) {
  $(outputClass).val(currentValue);
}

function addElementStep(elemId, step) {
  let currentElemV = parseFloat($(elemId).val());
  let changedElemV = currentElemV + parseFloat(step);
  $(elemId).val(changedElemV);
  $(elemId).trigger("input");
}

function substractElementStep(elemId, step) {
  let currentElemV = parseFloat($(elemId).val());
  let changedElemV = currentElemV - parseFloat(step);
  $(elemId).val(changedElemV);
  $(elemId).trigger("input");
}

let primaryBlocks = [
  ".genderBlock",
  ".geneticsBlock",
  ".hairstyleBlock",
  ".beardBlock",
  ".eyesBlock",
  ".eyebrowsBlock",
  ".foreheadBlock",
  ".noseBlock",
  ".lipsBlock",
  ".cheekbonesBlock",
  ".jawBlock",
  ".chinBlock",
  ".neckBlock",
  ".featuresBlock",
  ".clothesBlock",
];
let secondaryBlocks = [
  "#changeFatherBlock",
  "#changeMotherBlock",
  "#malechangeHairBlock",
  "#femalechangeHairBlock",
  "#changeHairColorBlock",
  "#changeAdditionalHairColorBlock",
  "#changeBeardColorBlock",
  "#changeEyesColorBlock",
  "#changeEyebrowsColorBlock",
  "#changeLipsColorBlock",
  "#changeTopMale",
  "#changeTopFemale",
  "#changeLegsMale",
  "#changeLegsFemale",
  "#changeShoesMale",
  "#changeShoesFemale",
];

$(".appearanceButtons").click(function () {
  let currentBlock = "." + $(this).attr("id") + "Block";

  let i = 0;
  while (i < primaryBlocks.length) {
    $(primaryBlocks[i]).hide();
    i++;
  }

  i = 0;
  while (i < secondaryBlocks.length) {
    $(secondaryBlocks[i]).hide();
    i++;
  }

  $(currentBlock).toggle();

  if ($(this).attr("id") == "gender" || $(this).attr("id") == "clothes") {
    mp.trigger("client:bodyCreatorCamera");
  } else {
    mp.trigger("client:faceCreatorCamera");
  }
});

$(".buttonEdit").click(function () {
  i = 0;
  while (i < secondaryBlocks.length) {
    $(secondaryBlocks[i]).hide();
    i++;
  }

  if ($(this).attr("id") == "changeHair") {
    checkSex("hair");
  } else if ($(this).attr("id") == "changeTop") {
    checkSex("torso");
  } else if ($(this).attr("id") == "changeLegs") {
    checkSex("legs");
  } else if ($(this).attr("id") == "changeShoes") {
    checkSex("shoes");
  } else {
    let currentBlock = "#" + $(this).attr("id") + "Block";

    $(currentBlock).toggle();
  }
});

function checkSex(section) {
  if (currentSex & (section == "hair")) {
    $("#malechangeHairBlock").show();
  } else if (!currentSex & (section == "hair")) {
    $("#femalechangeHairBlock").show();
  } else if (currentSex & (section == "torso")) {
    $("#changeTopMale").show();
  } else if (!currentSex & (section == "torso")) {
    $("#changeTopFemale").show();
  } else if (currentSex & (section == "legs")) {
    $("#changeLegsMale").show();
  } else if (!currentSex & (section == "legs")) {
    $("#changeLegsFemale").show();
  } else if (currentSex & (section == "shoes")) {
    $("#changeShoesMale").show();
  } else if (!currentSex & (section == "shoes")) {
    $("#changeShoesFemale").show();
  }
}

// заливка причесок, родителей, цветов

var changeHaircut = `onclick="changeHtmlTextCustomize($(this).attr('class'), parseInt($(this).attr('name')), 0)"`;
var changeColors = `onclick="changeHtmlTextCustomize($(this).attr('class'), parseInt($(this).attr('name')), 0)"`;
var changeParentsAction = `onclick="changeHtmlTextCustomize($(this).attr('class'), $(this).attr('name'), $(this).attr('id'))"`;

$(document).ready(function () {
  showMaleBlocks();

  let fathersQuantity = 23;
  let fathersArr = [
    "Benjamin",
    "Daniel",
    "Joshua",
    "Noah",
    "Andrew",
    "Joan",
    "Alex",
    "Isaac",
    "Evan",
    "Ethan",
    "Vincent",
    "Angel",
    "Diego",
    "Adrian",
    "Gabriel",
    "Michael",
    "Santiago",
    "Kevin",
    "Louis",
    "Samuel",
    "Anthony",
    "John",
    "Niko",
    "Claude",
  ];
  i = 0;

  while (i <= fathersQuantity) {
    $(".fatherSecondaryBlock").append(
      '<a class="father" name="' +
        fathersArr[i] +
        '" id="' +
        i +
        '"' +
        changeParentsAction +
        '><div class="generalImgBlock"><img class="generalImg generalParents" src="css/Fathers/' +
        fathersArr[i] +
        '.png" alt=""><h6 class="geneticOptionText">' +
        fathersArr[i] +
        "</h6></div>"
    );
    i++;
  }

  let mothersQuantity = 21;
  let mothersArr = [
    "Hannah",
    "Audrey",
    "Jasmine",
    "Giselle",
    "Amelia",
    "Isabella",
    "Zoe",
    "Ava",
    "Camilla",
    "Violet",
    "Sophia",
    "Eveline",
    "Nicole",
    "Ashley",
    "Grace",
    "Brianna",
    "Natalie",
    "Olivia",
    "Elizabeth",
    "Charlotte",
    "Emma",
    "Misty",
  ];
  i = 0;

  while (i <= mothersQuantity) {
    $(".motherSecondaryBlock").append(
      '<a class="mother" name="' +
        mothersArr[i] +
        '" id="' +
        i +
        '" ' +
        changeParentsAction +
        '><div class="generalImgBlock"><img class="generalImg generalParents" src="css/Mothers/' +
        mothersArr[i] +
        '.png" alt=""><h6 class="geneticOptionText">' +
        mothersArr[i] +
        "</h6></div>"
    );
    i++;
  }

  let maleHaicuts = 74;
  i = 0;

  while (i <= maleHaicuts) {
    if (i !== 24) {
      $(".malehaircutSecondaryBlock").append(
        '<a id="f' +
          i +
          '" class="hair" name="' +
          i +
          '"' +
          changeHaircut +
          '><div class="generalImgBlock"><img class="generalImg" src="css/male/m' +
          i +
          '.jpg" alt=""></div>'
      );
    }
    i++;
  }

  let femaleHaicuts = 76;
  i = 0;

  while (i <= femaleHaicuts) {
    if (i !== 24) {
      $(".femalehaircutSecondaryBlock").append(
        '<a id="f' +
          i +
          '" class="hair" name="' +
          i +
          '"' +
          changeHaircut +
          '><div class="generalImgBlock"><img class="generalImg" src="css/female/f' +
          i +
          '.jpg" alt=""></div>'
      );
    }
    i++;
  }

  let hairColors = 63;
  i = 0;
  while (i <= hairColors) {
    $(".hairColorSecondaryBlock").append(
      '<a id="hc' +
        i +
        '" class="hairColor" name="' +
        i +
        '"' +
        changeColors +
        '><div class="colorImgBlock"><img class="generalImg" src="css/generalColors/' +
        i +
        '.png" alt=""></div></a>'
    );
    $(".addHairColorSecondaryBlock").append(
      '<a id="hcs' +
        i +
        '" class="hairColor2" name="' +
        i +
        '"' +
        changeColors +
        '><div class="colorImgBlock"><img class="generalImg" src="css/generalColors/' +
        i +
        '.png" alt=""></div></a>'
    );
    $(".beardColorBlock").append(
      '<a id="bc' +
        i +
        '" class="facialHairColor" name="' +
        i +
        '"' +
        changeColors +
        '><div class="colorImgBlock"><img class="generalImg" src="css/generalColors/' +
        i +
        '.png" alt=""></div></a>'
    );
    $(".eyebrowsColorBlock").append(
      '<a id="ec' +
        i +
        '" class="eyebrowsColor" name="' +
        i +
        '"' +
        changeColors +
        '><div class="colorImgBlock"><img class="generalImg" src="css/generalColors/' +
        i +
        '.png" alt=""></div></a>'
    );
    $(".lipsColorBlock").append(
      '<a id="lc' +
        i +
        '" class="lipstickColor" name="' +
        i +
        '"' +
        changeColors +
        '><div class="colorImgBlock"><img class="generalImg" src="css/generalColors/' +
        i +
        '.png" alt=""></div></a>'
    );
    i++;
  }
});
