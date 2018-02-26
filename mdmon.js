#!/usr/bin/env node

var exp = require('./express');
var program = require('commander');
var args = process.argv;
var getPort = require('get-port');
var bs = require('browser-sync').create();


program
    .version('{$version}')
    .option("-p, --path [path]", "Path the the folder to monitor. May use '.' or full path. ")    
    .parse(args);

if (program.path) {
    monPath = program.path;
} else {
    monPath = process.cwd();
}

e = new exp(monPath, bs);

getPort().then(readyPort => {
    e.boot(readyPort).then(() => {
        getPort().then(proxyPort =>{
            bs.init({
                port: proxyPort,
                files:
                    [
                        monPath + "/**/*.*"
                    ],
                proxy: `localhost:${readyPort}`
            });
        });
       
    });
});


