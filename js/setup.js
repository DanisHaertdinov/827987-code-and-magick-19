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
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var NUMBER_OF_MOCKS = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireBallWrapper = setup.querySelector('.setup-fireball-wrap');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementOfArray = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var showSetup = function () {
  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', setupEscPressHandler);
};

var hideSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', setupEscPressHandler);
};

var setupEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY && setupUserNameInput !== document.activeElement) {
    hideSetup();
  }
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

var showWizards = function (wizardsMocks) {
  var fragment = document.createDocumentFragment();
  wizardsMocks.forEach(function (wizardMock) {
    fragment.appendChild(createWizard(wizardMock));
  });
  setup.querySelector('.setup-similar-list').appendChild(fragment);
};

setupOpen.addEventListener('click', function () {
  showSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    showSetup();
  }
});

setupClose.addEventListener('click', function () {
  hideSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    hideSetup();
  }
});

var changeWizardItemColor = function (item, itemName, colorStyle, colors) {
  var color = getRandomElementOfArray(colors);
  setup.querySelector('input[name="' + itemName + '-color"]').value = color;
  item.style[colorStyle] = color;
};

wizardCoat.addEventListener('click', function (evt) {
  changeWizardItemColor(evt.target, 'coat', 'fill', COAT_COLORS);
});

wizardEyes.addEventListener('click', function (evt) {
  changeWizardItemColor(evt.target, 'eyes', 'fill', EYES_COLORS);
});

fireBallWrapper.addEventListener('click', function (evt) {
  changeWizardItemColor(evt.target, 'fireball', 'backgroundColor', FIREBALL_COLORS);
});

var wizardsMocks = collectWizardsMocks(NUMBER_OF_MOCKS);
showWizards(wizardsMocks);
