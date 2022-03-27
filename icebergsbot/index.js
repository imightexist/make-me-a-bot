const websocketClient = require('websocket').client;
const ws = new websocketClient();
const prefix = "!";
const vmName = "kekvm2" //will not be used
const name = "icebergsbot"
const address = "172.81.110.51:6004";

ws.on('connect',function(f){
  function send(str){
    f.sendUTF(encodeCommand(['chat',str]));
  }
  function rename(str){
    f.sendUTF(encodeCommand(['rename',str]));
  }
  f.on('message',function(msg){
    cmd = decodeCommand(msg.utf8Data);
    rename(name);
    f.sendUTF(encodeCommand(['connect',vmName]));
    
    if (cmd[0] == "chat"){
      if (cmd[1] == "jjjj"){
	      send("jjjj fuck off");
	      return;
      }
      if (cmd[1] == "bbbb"){
	      send("andrej trying to bypass blacklist???");
	      return;
      }
      if (cmd[2] == prefix + "help"){
        send("https://github.com/imightexist/make-me-a-bot/blob/main/icebergsbot/help.md");
      }
      if (cmd[2] == prefix + "endturn"){
        f.sendUTF(encodeCommand(['turn','0']));
      }
      if (cmd[2] == prefix + "taketurn"){
        f.sendUTF(encodeCommand(['turn','1']));
      }
      if (cmd[2].startsWith(prefix + "say ")){
        send(cmd[2].replace(prefix + "say ",""));
      }
    }
    
    setInterval(function(){
      if (f.connected){
        f.sendUTF("3.nop;")
      }
    },2500);
  });
});

function decodeCommand(cypher) {
	var sections = [];
	var bump = 0;
	while (sections.length <= 50 && cypher.length >= bump) {
		var current = cypher.substring(bump);
		var length = parseInt(current.substring(current.search(/\./) - 2));
		var paramater = current.substring(length.toString().length + 1, Math.floor(length / 10) + 2 + length);
		sections[sections.length] = paramater;
		bump += Math.floor(length / 10) + 3 + length;
	}
	sections[sections.length - 1] = sections[sections.length - 1].substring(0, sections[sections.length - 1].length - 1);
	return sections;
}
function encodeCommand(cypher) {
	var command = "";
	for (var i = 0; i < cypher.length; i++) {
		var current = cypher[i];
		command += current.length + "." + current;
		command += (i < cypher.length - 1 ? "," : ";");
	}
	return command;
}
ws.connect("ws://" + address,'guacamole');
