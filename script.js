"use strict";
const uncryptButton = document.querySelector(".uncryptButton");
const cryptButton = document.querySelector(".cryptButton");
const textToCrypt = document.querySelector(".textToCrypt");
const textToUncrypt = document.querySelector(".textToUncrypt");
const firstSettings = document.querySelector(".firstSettings");
const secondSettings = document.querySelector(".secondSettings");
const thirdSettings = document.querySelector(".thirdSettings");
const firstCircuit = document.querySelector(".firstCircuit");
const secondCircuit = document.querySelector(".secondCircuit");
const thirdCircuit = document.querySelector(".thirdCircuit");
let firstCircuitIndex = 0;
let secondCircuitIndex = 0;
let thirdCircuitIndex = 0;
const alphabeth =
  " bacdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZěščřžýáíéúů?.-,1234567890";
const keys = [
  " XZNýBGJHpžcQD6.8YVTěK=FUC4/2IAšSRxří%z17čnlwebgjhqd*yvOMPtk3?5áfuomiéLWEasr9,",
  " i/ý2*yvLWšEaIASRx%zř1=QTwé5fuočmgnZNFUC4ebáX3žPtklB7?pcGjhD6.8YíVqděKOMJHsr9,",
  " JHpTěXájhqd*čSVtk3?Bvšc=LWEaU%YgsQýIAGbZéNRxyOMPD68íKC4/eožmir.92F5fuz17nřlw,",
];
let currentKey = [];

const resetValues = function () {
  firstCircuit.value = 0;
  secondCircuit.value = 0;
  thirdCircuit.value = 0;
  textToUncrypt.value = "";
  textToCrypt.value = "";
  firstSettings.checked = false;
  secondSettings.checked = false;
  thirdSettings.checked = false;
  currentKey = [];
};

const moveFirstCircuit = function () {
  moveSecondCircuit();
  moveLetter();
  if (firstCircuitIndex != 66) firstCircuitIndex++;
  else firstCircuitIndex = 0;
};

const moveSecondCircuit = function () {
  moveThirdCircuit();
  moveLetter();
  if (secondCircuitIndex == 67) secondCircuitIndex = 0;
  else secondCircuitIndex++;

  if (
    secondCircuitIndex == 0 ||
    secondCircuitIndex == 15 ||
    secondCircuitIndex == 30 ||
    secondCircuitIndex == 45 ||
    secondCircuitIndex == 60
  )
    moveFirstCircuit();
};

const moveThirdCircuit = function () {
  moveLetter();
  if (thirdCircuitIndex != 66) {
    thirdCircuitIndex++;
  } else thirdCircuitIndex = 0;

  if (
    thirdCircuitIndex == 0 ||
    thirdCircuitIndex == 15 ||
    thirdCircuitIndex == 30 ||
    thirdCircuitIndex == 45 ||
    thirdCircuitIndex == 60
  )
    moveSecondCircuit();
};

const moveLetter = function () {
  const letter = currentKey.pop();
  currentKey.unshift(letter);
};

const checkSettings = function () {
  let key = 0;
  firstCircuitIndex = firstCircuit.value;
  secondCircuitIndex = secondCircuit.value;
  thirdCircuitIndex = thirdCircuit.value;

  if (firstSettings.checked) key = 0;
  else if (secondSettings.checked) key = 1;
  else if (thirdSettings.checked) key = 2;

  setCrypt(key);
};

const setCrypt = function (keyIndex) {
  currentKey = [];
  for (const letter of keys[keyIndex]) {
    currentKey.push(letter);
  }

  for (let i = 0; i < thirdCircuitIndex; i++) moveThirdCircuit();
  for (let i = 0; i < secondCircuitIndex; i++) moveSecondCircuit();
  for (let i = 0; i < firstCircuitIndex; i++) moveFirstCircuit();
};
resetValues();

cryptButton.addEventListener("click", function (e) {
  e.preventDefault();
  //check settings
  checkSettings();
  //clear text to uncrypt
  textToUncrypt.value = "";
  //checking if text is there
  if (!textToCrypt.value) return;
  let cryptedText = "";

  for (const letter of textToCrypt.value) {
    const keyLetter = currentKey[alphabeth.indexOf(letter)];
    if (!keyLetter) cryptedText += letter;
    else cryptedText += keyLetter;
    moveThirdCircuit();
  }

  textToUncrypt.value = cryptedText;
});

uncryptButton.addEventListener("click", function (e) {
  e.preventDefault();
  //check settings
  checkSettings();
  //clear text to crypt
  textToCrypt.value = "";
  //checking if text is there
  if (!textToUncrypt.value) return;
  let uncryptedText = "";

  for (const letter of textToUncrypt.value) {
    const keyLetter = alphabeth[currentKey.indexOf(letter)];
    if (!keyLetter) uncryptedText += letter;
    else uncryptedText += keyLetter;
    moveThirdCircuit();
  }
  textToCrypt.value = uncryptedText;
});

cryptButton.addEventListener("mouseover", function () {
  cryptButton.classList.toggle("btnHovered");
});

cryptButton.addEventListener("mouseout", function () {
  cryptButton.classList.toggle("btnHovered");
});

uncryptButton.addEventListener("mouseover", function () {
  uncryptButton.classList.toggle("btnHovered");
});

uncryptButton.addEventListener("mouseout", function () {
  uncryptButton.classList.toggle("btnHovered");
});

cryptButton.addEventListener("click", function () {
  cryptButton.classList.toggle("btnClicked");
  setTimeout(function () {
    cryptButton.classList.toggle("btnClicked");
  }, 100);
});

uncryptButton.addEventListener("click", function () {
  uncryptButton.classList.toggle("btnClicked");
  setTimeout(function () {
    uncryptButton.classList.toggle("btnClicked");
  }, 100);
});
