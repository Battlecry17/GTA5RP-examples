function calculateConvert(value) {
  document.getElementById("convertLabel").innerHTML =
    value + "donate$ = " + value * 10 + "$";
}

function removeText(id) {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("age").value = "";
}

function setDonatePrices(nameCh, surnameCh, ageCh, licenseCh) {
  document.getElementById("fname").innerHTML = "Смена имени: " + nameCh;
  document.getElementById("lname").innerHTML = "Смена фамилии: " + surnameCh;
  document.getElementById("age").innerHTML = "Смена возраста: " + ageCh;
  document.getElementById("gunLicense").innerHTML =
    "Лицензия на владение оружием: " + licenseCh;
}

function setDonate(dMoney) {
  document.getElementById("donateValue").innerHTML = dMoney;
  document.getElementById("convert").setAttribute("max", dMoney);
}
