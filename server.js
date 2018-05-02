const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(8000);
const io = require("socket.io")(server);
var chat_log = [];

io.on("connection", function(socket){
    socket.emit("past_chat", {chat_log: chat_log});
    socket.on("send_message", function(data){
        var msg = {name: data.name, msg: data.msg};
        chat_log.push(msg);
        io.emit("broadcast_msg", msg);
    })
});