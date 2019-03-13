/*jshint esversion: 6 */
//http module
const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url ==='/'){
        res.write('Hello boy');
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');


/*function sayHello(name){
    console.log("Hello "+name)
}

const EventEmitter = require('events');


const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.on('messageLogged',(arg) => {
    console.log('Listener called.',arg);
});

logger.log('yılan');
*/

/*
const fs = require('fs');


const files = fs.readdirSync('./');
console.log(files);


fs.readdir('$', function(err, files){
    if(err) console.log('Error',err);
    else console.log('Result',files)
});
*/
/*
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Free memory '+ freeMemory);

console.log(`Total memory: ${totalMemory}`);
*/

/*
const parth = require('path');
var pathObj = parth.parse(__filename);
console.log(pathObj);
*/
/*

sayHello("Serdar");
*/