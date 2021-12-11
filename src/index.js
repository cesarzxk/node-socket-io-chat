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
        var message = _a.message, id = _a.id, date = _a.date, server = _a.server, time = _a.time, key = _a.key;
        socket.to(server).emit('messages', { message: message, id: id, date: date, time: time, key: key });
    });
    socket.on('deleteMessage', function (_a) {
        var key = _a.key, server = _a.server;
        socket.to(server).emit('deleteMessage', key);
    });
});
server.listen(process.env.PORT || 3333, function () {
    console.log('Servidor iniciado! 😁');
});
