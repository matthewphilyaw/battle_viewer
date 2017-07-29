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

var initData = null;
var pi = Math.PI;
var pi2 = pi * 2;

function clear(data) {
    var h = data.height;
    var w = data.width;

    ctx.fillStyle = data.arenaColor;
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = data.arenaBorderColor;

    ctx.strokeRect(2,2,w-2,h-2);

    ctx.setLineDash([5, 12]);

    ctx.beginPath();
    ctx.moveTo(5, h/2);
    ctx.lineTo(w, h/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w/2, 5);
    ctx.lineTo(w/2, h);
    ctx.stroke();

    ctx.setLineDash([]);
}

function drawHeading(bot) {
    var heading = bot.heading;

    var x = bot.x;
    var y = bot.y;

    var cx = (heading.length * Math.cos(heading.angle)) + x;
    var cy = (heading.length * Math.sin(heading.angle)) + y;

    ctx.beginPath();
    ctx.strokeStyle = heading.color;
    ctx.moveTo(x, y);
    ctx.lineTo(cx, cy);
    ctx.stroke();
}

function drawCannon(bot) {
    var cannon = bot.cannon;

    var x = bot.x;
    var y = bot.y;

    var cx = (cannon.length * Math.cos(cannon.angle)) + x;
    var cy = (cannon.length * Math.sin(cannon.angle)) + y;

    ctx.beginPath();
    ctx.strokeStyle = cannon.color;
    ctx.moveTo(x, y);
    ctx.lineTo(cx, cy);
    ctx.stroke();
}

function drawRadar(bot) {
    var radar = bot.radar;
    var halfArc = radar.arcAngle / 2;

    var x = bot.x;
    var y = bot.y;

    ctx.beginPath();
    ctx.strokeStyle = radar.color;
    ctx.moveTo(x, y);
    ctx.arc(
        x,
        y,
        radar.radius,
        radar.angle - halfArc,
        radar.angle + halfArc
    );
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawBot(bot) {
    var x = bot.x;
    var y = bot.y;

    ctx.strokeStyle = bot.color;
    ctx.beginPath();
    ctx.arc(x, y, bot.radius, 0, pi2);
    ctx.stroke();

    drawHeading(bot);
    drawCannon(bot);
    drawRadar(bot);
}

function initCommand(canvas, data) {
    initData = data;
    canvas.height = data.height;
    canvas.width = data.width;
    clear(initData);
}

function drawCommand(canvas, data) {
    clear(initData);

    var bots = data.bots;
    for (var i = 0; i < bots.length; i++) {
      drawBot(bots[i]);
    }
}

socket.on("command", data => {
    if (data.method === "init") {
        initCommand(canvas, data);
    }
    else if (data.method === "draw") {
        drawCommand(canvas, data);
    }
});
