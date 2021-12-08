"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
io.on('connection', function (socket) {
    socket.on('join', function (room) {
        socket.join(room.code);
        socket.emit('statusJoin', { room: room.code, userId: room.id });
    });
    socket.on('chat', function (_a) {
        var message = _a.message, id = _a.id, date = _a.date, server = _a.server;
        console.log(message);
        socket.to(server).emit('messages', { message: message, id: id, date: date });
    });
});
server.listen(process.env.PORT || 3333, function () {
    console.log('Servidor iniciado! 😁');
});
