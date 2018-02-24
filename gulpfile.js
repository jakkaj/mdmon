var gulp = require('gulp');
var argv = require('yargs').argv;
var bs = require('browser-sync').create();

var exp = require('./express');
var monPath = argv.path;


if(monPath === undefined){
    console.log("No Arguments! Please run with --path 'somePath'");
    process.exit();    
}

gulp.task('watcher', function(){
    gulp.watch(monPath + "/**/*.*", ()=>{
        bs.reload();
    });
})

gulp.task('browser-sync', function () {
    console.log(`Gonna monitor ${monPath}`);
    bs.init({
        port: 5000,      
        files:
        [
            monPath + "/**/*.*"
        ],
        proxy: "localhost:3000"
    });
});

gulp.task('express', function(cb){
    e = new exp(monPath, bs);
    e.boot().then(cb);          
});

gulp.task('default', ['express', 'browser-sync', 'watcher']);