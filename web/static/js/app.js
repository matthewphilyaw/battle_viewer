// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

var canvas = document.getElementById('arena');
var ctx = canvas.getContext("2d");

function drawBot(ctx, p) {
  var preLineWidth = ctx.lineWidth;
  var preStroke = ctx.strokeStyle;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(p.x, p.y, 20, 0, Math.PI * 2, true);
  ctx.stroke();

  var preText = ctx.textAlign;
  var preBase = ctx.textBaseline;
  ctx.lineWidth = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText(p.name, p.x, p.y);
  ctx.textAlign = preText;
  ctx.textBaseline = ctx.textBaseline;
  ctx.lineWidth = preLineWidth;
}

function initCommand(canvas, ctx, data) {
    canvas.height = data.height;
    canvas.width = data.width;

    ctx.fillStyle = "darkGray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCommand(canvas, ctx, data) {
    ctx.fillStyle = "drakGray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var bots = data.bots;
    for (var i = 0; i < bots.length; i++) {
      drawBot(ctx, bots[i]);
    }
}

socket.on("command", data => {
    if (data.method === "init") {
        initCommand(canvas, ctx, data);
    }
    else if (data.method === "draw") {
        drawCommand(canvas, ctx, data);
    }
});
