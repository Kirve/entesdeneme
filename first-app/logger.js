const EventEmitter = require('events');

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
    log(message){
        //Send a http request
        console.log(message);
        
    //Raise a event
    this.emit('messageLogged', {id: 1,url:'http://'});
    }
}

module.exports = Logger;
//module.exports.log = log;
