#!/usr/bin/env node

var exp = require('./express');

var args = process.argv;

var bs = require('browser-sync').create();

if(args.length <= 2){
    console.log("No Arguments! Please run with a full path or . for the current path");
    process.exit();
}

var monPath = "";

for(var i = 2; i < args.length; i++){
    monPath += args[i] + " ";
}

monPath = monPath.trim();

if(monPath == "."){
    monPath = process.cwd();
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

