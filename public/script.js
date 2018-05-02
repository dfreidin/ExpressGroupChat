$(document).ready(function(){
    var name
    while(!name) {
        name = window.prompt("Please enter your name");
    }
    var socket = io();
    socket.on("past_chat", function(data){
        var chat = "";
        for(var i=0; i<data.chat_log.length; i++) {
            chat += "<p>" + data.chat_log[i].name + ":\t" + data.chat_log[i].msg + "</p>";
        }
        $("#chat").html(chat);
    });
    socket.on("broadcast_msg", function(data){
        $("#chat").append("<p>" + data.name + ":\t" + data.msg + "</p>");
    });
    $("#send_msg").click(function(){
        var msg = $("#message").val();
        if(msg) {
            socket.emit("send_message", {name: name, msg: msg});
            $("#message").val("");
        }
    });
});