var server = http.Server(app);
var io = require("socket.io")(server);

// socket stuff
io.on("connection", function(socket) {
    console.log("new connection");

    socket.emit("connection", {
        time: new Date().getTime()
    });

    socket.emit("join", function(data) {
        console.log("join", data);

        if (!ecRooms.hasOwnProperty(data.room)) {
            ecRooms[data.room] = {
                users: {}
            }
        }

        var room = ecRooms[data.room];
        var nick = data.nick;

        if (room.users.hasOwnProperty(nick)) {
            socket.emit("nick_reject", {
                reason: "Nick already in use"
            });
        } else {
            room.users[nick] = {
                ec: {
                    score: 0,
                    turn: false
                },
                socket: socket
            };

            for (var nick in room.users) {
                if (room.users.hasOwnProperty(nick)) {
                    room.users[nick].socket.emit("join", {
                        nick: nick
                    });
                }
            }
        }
    });
});

module.exports = io;
