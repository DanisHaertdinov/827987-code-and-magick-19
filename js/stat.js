'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_COLOR = '#fff';
var CLOUD_PADDING = 20;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_LINE_HEIGHT = 20;
var TEXT_FONT_STYLE = '16px PT Mono';
var TEXT_COLOR = '#000';
var WIN_TEXT = ['Ура вы победили!', 'Список результатов:'];
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_MARGIN = 25;

var getRandomNumber = function (maxValue) {
  return Math.ceil(Math.random() * maxValue);
};

var getMaxValueOfArr = function (arr) {
  var maxValue = 0;
  arr.forEach(function (el) {
    if (el > maxValue) {
      maxValue = el;
    }
  });
  return maxValue;
};

var getRandomSaturationColor = function (hue) {
  return 'hsl(' + hue + ',' + getRandomNumber(100) + '%, 50%)';
};

var renderHistogram = function (ctx, names, times) {
  var highestTime = Math.floor(getMaxValueOfArr(times));

  times.forEach(function (time, index) {
    time = Math.floor(time);
    var columnX = CLOUD_X + CLOUD_PADDING + COLUMN_MARGIN + (COLUMN_WIDTH + COLUMN_MARGIN * 2) * index;
    var columnHeight = COLUMN_MAX_HEIGHT * time / highestTime;
    var columnY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING - TEXT_LINE_HEIGHT - columnHeight;
    var columnColor = getRandomSaturationColor(240);
    if (names[index] === 'Вы') {
      columnColor = 'red';
    }
    renderRect(ctx, columnX, columnY, COLUMN_WIDTH, columnHeight, columnColor);
    renderString(ctx, time, columnX, columnY - TEXT_LINE_HEIGHT);
    renderString(ctx, names[index], columnX, columnY + columnHeight);

  });
};

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
var renderString = function (ctx, string, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'middle';
  ctx.font = TEXT_FONT_STYLE;
  y += TEXT_LINE_HEIGHT / 2;
  ctx.fillText(string, x, y);
};

var renderMultiLineText = function (ctx, textArr, x, firstLineY) {
  var y = firstLineY;
  var lineHeight = TEXT_LINE_HEIGHT;
  textArr.forEach(function (line, index) {
    y += lineHeight * index;
    renderString(ctx, line, x, y);
  });
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  renderMultiLineText(ctx, WIN_TEXT, CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
  renderHistogram(ctx, names, times);
};
