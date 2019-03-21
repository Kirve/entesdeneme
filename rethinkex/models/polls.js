/*jshint esversion: 6 */


newFunction();
function newFunction() {
    "use strict";
}

var rethinkdb = require('rethinkdb');
var dbci = require('./db');
var db = new dbci();
var async = require('async');



class polls{
    addNewPolls(pollData, callback){
        //callback sayısını önlemek için
        async.waterfall([
            //database connection
            function(callback){
                db.connectToDb(function(err,connection){
                    if(err){
                        return callback(true,"Error adding new poll");
                    }
                    callback(null,connection);
                });
            },
            function(connection,callback){
                rethinkdb.table('poll').insert({
                    "question" : pollData.question,
                    "polls" : pollData.polls
                }).run(connection,function(err,result){
                    connection.close();
                    if(err){
                        return callback(true,"Error");
                    }
                    callback(null,result);
                });
            }
        ], function(err,data){
            callback(err===null ? false: true,data);
        });
    }
    //poll oylama
    votePollOption(pollData,callback){
        async.waterfall([
            function(callback){
                db.connectToDb(function(err,connection){
                    if(err){
                        return callback(true,"error vote");
                    }
                    callback(null,connection);
                });
            },
            function(connection,callback){
                rethinkdb.table('poll').get(pollData.id).run(connection,function(err,result){
                    if(err){
                        return callback(true,"Error fetching polls to database");
                    }
                    for(var pollCounter = 0; pollCounter<result.polls.length; pollCounter++){
                        if(result.polls[pollCounter].option === pollData.option){
                            result.polls[pollCounter].vote += 1;
                            break;
                        }
                    }

                    rethinkdb.table('polls').get(pollData.id).update(result).run(connection, function(err,result){
                        connection.close();
                        if(err){
                            return callback(true, "Error updating vote");
                        }
                        callback(null,result);
                    });
                });
            }
        ], function(err,data){
            callback(err===null ? false: true,data);
        });
    }
    getAllPolls(callback){
        async.waterfall([
            function(callback){
                db.connectToDb(function(err,connection){
                    if(err) {
                        return callback(true, "Error connecting");
                    }
                    callback(null,connection);
                });
            },
            function(connection,callback){
                rethinkdb.table('poll').run(connection,function(err,cursor){
                    connection.close();
                    if(err){
                        return callback(true,"Error fetching");
                    }
                    cursor.toArray(function(err,result){
                        if(err){
                            return callback(true,"Error reading cursor");
                        }
                        callback(null,result);
                    });
                });
            }
        ], function(err,data){
            callback(err===null ? false : true,data);
        });
    }
}
module.exports = polls;
