function showCharScreenInfo(
  slotID,
  charId,
  name,
  surname,
  cash,
  bankCash,
  organization,
  job
) {
  let trueId = slotID.replace("char_id", "");
  document.getElementById("createChar" + trueId).style.display = "none";
  document.getElementById("charInfoContainer" + trueId).style.display = "block";
  document.getElementById("charNameSurname" + trueId).innerHTML =
    name + " " + surname;
  document.getElementById("charCash" + trueId).innerHTML = "$" + cash;
  // document.getElementById("charBank" + trueId).innerHTML = '$' + bankCash ;
  switch (organization) {
    case 3:
      organization = "LSPD";
      break;
    case 5:
      organization = "Медики";
      break;
    case 11:
      organization = "The Families";
      break;
    case 12:
      organization = "The Ballas";
      break;
    case 13:
      organization = "The Vagos";
      break;
    case 14:
      organization = "The Marabunta";
      break;
    default:
      organization = "Не состоит в организации";
  }
  switch (job) {
    case 1:
      job = "Грузчик";
      break;
    case 2:
      job = "Уборщик";
      break;
    case 3:
      job = "Водитель автобуса";
      break;
    case 4:
      job = "Дальнобойщик";
      break;
    case 5:
      job = "Фермер";
      break;
    default:
      job = "Безработный";
  }

  document.getElementById("charOrganization" + trueId).innerHTML = organization;
  document.getElementById("charJob" + trueId).innerHTML = job;
}
$(".char1LastLocationSpawn").click(function () {
  $(".char1LastLocationColumn").toggle();
  $(".char2LastLocationColumn").hide();
  $(".char3LastLocationColumn").hide();
});
$(".char2LastLocationSpawn").click(function () {
  $(".char2LastLocationColumn").toggle();
  $(".char1LastLocationColumn").hide();
  $(".char3LastLocationColumn").hide();
});
$(".char3LastLocationSpawn").click(function () {
  $(".char3LastLocationColumn").toggle();
  $(".char1LastLocationColumn").hide();
  $(".char2LastLocationColumn").hide();
});
$(".createChar").click(function () {
  mp.trigger("openCharCreation", $(this).attr("value"));
});
//нажимаешь на выбор локации - применяется внешность
//нажимаешь на точку спавна - сохраняются все нужные переменные
$(".charLastLocationSpawn").click(function () {
  mp.trigger("client:loadCharAppearance", $(this).attr("value"));
});
$(".lastLocation").click(function () {
  mp.trigger("client:enterGameLastLocation");
  mp.trigger("client:enterGameGeneral");
  mp.trigger("client:loadGeneralInterface");
});
let saveCharID;
$(".deleteB").click(function () {
  $("#deleteConfirm").show();
  saveCharID = $(this).attr("id").replace(/\D/g, "");
  document.getElementById("deleteText").innerHTML =
    "Вы действительно хотите удалить персонажа <i>" +
    document.getElementById("charNameSurname" + saveCharID).innerText +
    "</i> ?";
});

function deleteCharacter() {
  $("#deleteConfirm").hide();
  mp.trigger("client:deleteChar", saveCharID - 1);
  $("#createChar" + saveCharID).show();
  $("#charInfoContainer" + saveCharID).hide();
}
