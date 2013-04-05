var net = require('net');
var util = require('util');

//send a data packet (message) to a server/port combo.

function sendAMessage(msg) {
  	var client = net.createConnection(22575);
	client.setEncoding("UTF8");
	client.addListener("connect", function() {
	    // connected to TCP server.
    	util.log('connected');
    	client.write(msg);
    	client.end();
  	});
	client.addListener("data", function(data) {
  		util.log("Response from server: " + data);
  	});
}

sendAMessage("MSH|^~\\&|REG^REG^|XYZ|GOBLET|ZYX|20050912110538|SI&U|SIU^S12|4676115|P|2.3PID|||353966||SMITH^JOHN^^^^||19820707|F||C|108 MAIN STREET ^^ANYTOWN^TX^77777^^|HARV|(512)555-0170|||||00362103|123-45-6789||||||||||||SCH|1||||||NEW||||20050912110230^20050912110430||||||||||||||||||^^^^^^||3|PV1||O|SEROT|3|||1284^JOHNSON^MIKE^S.^^MD~|||SEROT||||1|||1284^JOHNSON^MIKE^S.^^ MD|SERIES|787672|B|||||||||N||||||||||||A|||20050912110230|||||| PV2|||HAND BRACE NEEDS REPAIRED|||||||||||20050912||||||||||A||20050725|||||O||||||NK1|0001|HULK^INCREDIBLE|M|123 FAKE ST^^OUTLAND^^00000|123456789||");
//sendAMessage("MSH|^~\\&|REG^REG^|XYZ|GOBLET|ZYX|20050912110538|SI&U|ADT^A02|4676115|P|2.3PID|||353966||SMITH^JOHN^^^^||19820707|F||C|108 MAIN STREET ^^ANYTOWN^TX^77777^^|HARV|(512)555-0170|||||00362103|123-45-6789||||||||||||SCH|1||||||NEW||||20050912110230^20050912110430||||||||||||||||||^^^^^^||3|PV1||O|SEROT|3|||1284^JOHNSON^MIKE^S.^^MD~|||SEROT||||1|||1284^JOHNSON^MIKE^S.^^ MD|SERIES|787672|B|||||||||N||||||||||||A|||20050912110230|||||| PV2|||HAND BRACE NEEDS REPAIRED|||||||||||20050912||||||||||A||20050725|||||O||||||NK1|0001|HULK^INCREDIBLE|M|123 FAKE ST^^OUTLAND^^00000|123456789||");
