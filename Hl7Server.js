var util = require("util"),
    l7 = require("L7"),  //https://github.com/medic/L7
    net = require("net");



var help = require('./Helpers.js');

function createHL7AckForMessageNumber(messageNumber, eventType) {
      var ack = 'MSH|^~\\&|||||' + help.generateTimeStamp() + '||ACK^'+eventType+'|'+ help.getUniqueMessageNumber() +'|T|2.5\rMSA|AA|' + messageNumber;
      return ack;
}

var server = net.createServer(function(stream) 
  {
    server.setMaxListeners(50);
    //set the text encoding
    stream.setEncoding("utf8");

    allowHalfOpen: false;

    //keep the connection open
    stream.setKeepAlive(true, 1000);

    //what to do on a connect.
    stream.addListener("connect", function() {
      util.log("Client connected");
      stream.write("hello\r\n");
    });

    //what to do when we recieve data
    stream.addListener("data", function(data) 
    {
      //output what we recieved to the console
      util.log("Received from client: " + data);

      var hl7msg = l7.parse(data)
      console.dir(hl7msg);
      var version = hl7msg.query('MSH|12')  // 2.3
      var messageType = hl7msg.query('MSH|9')
      var messageNum = hl7msg.query('MSH|10')
      //send it back to the client
      stream.write(createHL7AckForMessageNumber(messageNum,messageType));

      var server = 'amqp://localhost';
      var queue = 'exchange';
      var route = messageType;

      //send it to the queue.
      //get the dependency and open the connection to the rabbit mq installation
      var rabbit = require('rabbit.js').createContext(server);

      //once the connection is extablished
      rabbit.on('ready', function() {
      //create the publisher
        var pub = rabbit.socket('PUB');
      //connect the publisher to the exchange named 
        pub.connect(queue, function() {
          topic:messageType
        //upon connection,  send this
          pub.write(data, 'utf8');       
        });         
      });
      //sendRabbit.sendToRabbit("amqp://localhost", "foobar\testQueue", data, messageType) ;
    });

  //what to do when the client connection ends
  stream.addListener("end", function() {
    util.log("Client disconnected");    
  });

  //what to do if we close
  stream.addListener("close", function() {
    util.log("Disconnecting");    
  });

  //if an error occurs,  do this.
  stream.addListener("error", function(err) {
    util.log(err);
    stream.end();
  });
});

//start listening
server.listen(22575);

// stop the server after 10 secs
//setTimeout(function() {
//  server.close(); 
//}, 10000);