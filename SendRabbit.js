exports.sendToRabbit = function(server, queue, data, route) {

  var rabbit = require('rabbit.js').createContext(server);
  //once the connection is extablished
  rabbit.on('ready', function() {
    //create the publisher
    var pub = rabbit.socket('PUB');
    //connect the publisher to the exchange named in queue
    pub.connect(queue, function() {
      //add queue routing key
      topic:route
      //upon connection,  send this
      pub.write(data, 'utf8');       
    });         
  });
}