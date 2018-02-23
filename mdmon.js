
var exp = require('./express');
var monPath = "C:\\Temp\\demotemp\\demo12";
var bs = require('browser-sync').create();

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

