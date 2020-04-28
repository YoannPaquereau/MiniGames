const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');

const users = require('./routes/api/users');
const friends = require('./routes/api/friends');


var roomdata = require('roomdata');

const app = express();
var server = require('http').createServer(app)

server.listen(8080, '127.0.0.1');
var io = require('socket.io').listen(server);


app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(
        db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err))
;

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/friends', friends);


var rooms = 0;

io.sockets.on('connection', function (socket) {
    socket.on('createGame', function(data) {
        roomdata.joinRoom(socket, 'room-' + ++rooms);
        roomdata.set(socket, 'players', {player1: data.player, player2: ""});
        socket.emit('newGame', { room:"room-" + rooms });
    });

    socket.on('joinGame', function(data) {
        var room = io.nsps['/'].adapter.rooms[data.room];
        if (room && room.length == 1) {
            roomdata.joinRoom(socket, data.room);
            if (data.player.id === roomdata.get(socket, 'players').player1.id) {
                roomdata.leaveRoom(socket);
                socket.emit('err', {message: 'Partie pleine ou indisponible'});
            }

            else {
                var gameBoard = [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""]
                ];
                roomdata.set(socket, "checkbox", gameBoard);
                roomdata.set(socket, "countTurn", 1);
                 roomdata.get(socket, 'players').player2 = data.player;
                 var turn = Math.floor(Math.random() * (3 - 1) + 1);
                 if (turn == 1)
                    turn = roomdata.get(socket, 'players').player1;
                else
                    turn = roomdata.get(socket, 'players').player2;
    
                    io.in(data.room).emit('startGame', { room: data.room, turn: turn, players: roomdata.get(socket, "players")});
            }
        }
        else {
            socket.emit('err', {message: 'Partie pleine ou indisponible'});
        }
    });

    socket.on('sendTick', function(data) {
        if (roomdata.get(socket, "checkbox")[data.line][data.column] == "") {
            var count = roomdata.get(socket, "countTurn") + 1;
            roomdata.set(socket, "countTurn", count);
            roomdata.get(socket, "checkbox")[data.line][data.column] = data.player;
            otherPlayer = (data.player.id == roomdata.get(socket, "players").player1.id) ? roomdata.get(socket, "players").player1 : roomdata.get(socket, "players").player2; 

            io.in(data.room).emit('drawCase', { checkbox: roomdata.get(socket, "checkbox") , player2: otherPlayer });
            if (!endGame(data.player, roomdata.get(socket, "checkbox"))) {
                if (roomdata.get(socket, "countTurn") > 9)
                    io.in(data.room).emit('draw', "");
                else
                    io.in(data.room).emit('changeTurn', { player: data.player });
            }
            else
                io.in(data.room).emit('endgame', { player: data.player });
        }
        else {
            socket.emit('retry', "");
        }
    });
});

function endGame(playerCheck, checkbox) {
    var end = false;
    var count= 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (checkbox[i][j].id == playerCheck.id) ++count;
        }
        if (count == 3) {
            end = true;
            i = 3;
        }
        else count = 0;
    }

    if (!end) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (checkbox[j][i].id == playerCheck.id) ++count;
            }
            if (count == 3) {
                end = true;
                i = 3;
            }
            else count = 0;
        }

        if (!end) {
            if ((checkbox[0][0].id == checkbox[1][1].id == checkbox[2][2].id == playerCheck.id) || (checkbox[0][2].id == checkbox[1][1].id == checkbox[2][0].id == playerCheck.id)) {
                end = true;
            }
        }
    }

    return end;
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));