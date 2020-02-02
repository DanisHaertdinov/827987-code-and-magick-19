'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var NUMBER_OF_MOCKS = 4;

var setup = document.querySelector('.setup');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementOfArray = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var showSetup = function () {
  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');
};

var createWizardMock = function () {
  return {
    name: getRandomElementOfArray(NAMES) + ' ' + getRandomElementOfArray(LAST_NAMES),
    coatColor: getRandomElementOfArray(COAT_COLORS),
    eyesColor: getRandomElementOfArray(EYES_COLORS)
  };
};

var collectWizardsMocks = function (number) {
  var mocksArray = [];
  for (var i = 0; i < number; i++) {
    mocksArray.push(createWizardMock());
  }
  return mocksArray;
};

var createWizard = function (wizardMock) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizard = similarWizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = wizardMock.name;
  wizard.querySelector('.wizard-coat').style.fill = wizardMock.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = wizardMock.eyesColor;
  return wizard;
};

var showWizards = function (wizarsdMocks) {
  var fragment = document.createDocumentFragment();
  wizarsdMocks.forEach(function (wizardMock) {
    fragment.appendChild(createWizard(wizardMock));
  });
  setup.querySelector('.setup-similar-list').appendChild(fragment);
};

showSetup();
var wizardsMocks = collectWizardsMocks(NUMBER_OF_MOCKS);
showWizards(wizardsMocks);
