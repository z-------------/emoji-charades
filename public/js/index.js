var socket = io();

socket.on("connection", function(data) {
    console.log(data);
});

socket.on("join", function(data) {
    console.log(data);
});

socket.on("nick_reject", function(data) {
    console.log(data);
});
