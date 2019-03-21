/*jshint esversion: 6 */

newFunction();
function newFunction() {
    "use strict";
}

var rethinkdb = require('rethinkdb');
var async = require('async');

class db{
    setupDb(){
        var self = this;
        async.waterfall([
            //database connection
            function(callback){
                self.connectToRethinkDbServer(function(err,connection){
                    if(err){
                        return callback(true,"Error");
                    }
                    callback(null,connection);
                });
            },
            //create database
            function(connection,callback){
                rethinkdb.dbCreate('polls').run(connection, function(err,result){
                    if(err){
                        console.log("Database already created.");
                    }else{
                        console.log("Created new database");
                    }
                    callback(null,connection);
                });
            },
            //create table
            function(connection,callback){
                rethinkdb.db('polls').tableCreate('poll').run(connection, function(err,result){
                    connection.close();
                    if(err){
                        console.log("Table already created.");
                    }else{
                        console.log("Created new table");
                    }
                    callback(null,"Database is setup correctly.");
                });
            }
        ], function(err,data){
            console.log(data);
        });
    }

    connectToRethinkDbServer(callback) {
        rethinkdb.connect({
            host:'localhost',
            port: 28015
        }, function(err,connection){
            callback(err,connection);
        });
    }
    connectToDb(callback) {
        rethinkdb.connect({
            host:'localhost',
            port:3000,
            db:'polls'
        }, function(err,connection) {
            callback(err,connection);
        });
    }
}


module.exports=db;
