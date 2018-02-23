#!/usr/bin/env node

var exp = require('./express');

var argv = require('yargs').argv;


var bs = require('browser-sync').create();

var monPath = argv.path;

if(monPath === undefined){
    console.log("No Arguments! Please run with --path 'somePath'");
    process.exit();    
}





e = new exp(monPath, bs);

e.boot().then(()=>{
    bs.init({
        port: 5000,      
        files:
        [
            monPath + "/**/*.*"
        ],
        proxy: "localhost:3000"
    });
});

