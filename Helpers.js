var responseMessageNumber = 0;

function zeroFill(number, width ) {
  width -= number.toString().length;
  if ( width > 0 ) {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}


exports.generateTimeStamp = function() {
  var now = new Date();

  var month = zeroFill(now.getUTCMonth() + 1, 2);
  var date = zeroFill(now.getUTCDate(), 2);
  var hours = zeroFill(now.getUTCHours(), 2);
  var minutes = zeroFill(now.getUTCMinutes(), 2);
  var seconds = zeroFill(now.getUTCSeconds(), 2);

  var timestamp = now.getUTCFullYear().toString()
    + month 
    + date
    + hours 
    + minutes 
    + seconds
    + '.'
    + now.getUTCMilliseconds().toString()
    + '+0000' 
    return timestamp;
}

exports.getUniqueMessageNumber = function() {
  responseMessageNumber = responseMessageNumber + 1;
  return responseMessageNumber;
}