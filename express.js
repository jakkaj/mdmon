const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');   
var marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

module.exports = class expressSetup{
   
    constructor(path, bs){
        this.path = path;
        this.app = express();
        this.bs = bs;
    }

    boot(){        
        return new Promise((good)=>{
            app.use(this.intercept.bind(this));
            app.use(require('connect-browser-sync')(this.bs));
            app.listen(3000, () => good());
        })
    }

    getBase(req){
        var url = req.url;
        var urlParts = url.split('/');
        
        var pBuild = "";
        
        for(var p=1; p < urlParts.length; p++){
            pBuild += urlParts[p] + "/";
        }
        if(pBuild[0] != "/"){
            pBuild = "/" + pBuild;
        }
        return pBuild;
    }

    baseDir(req, res, next){
        var url = req.url;
      
        var fullPath = path.join(this.path, url);
        fs.readdir(fullPath, (err, items) =>{
            
            var base = "<html><head>" + this.inject() + "</head><body>";

            for (var i=0; i<items.length; i++) {
                var pBuild = this.getBase(req);                
               
                base += `<a href=\"${pBuild}${items[i]}\">${items[i]}</a><br/>`;
               
            }

            base += "</body></html>"
            res.send(base);
            next();
        });
    }

    inject(){
        return "<script async=\"\" src=\"/browser-sync/browser-sync-client.js\"></script>";
    }

    intercept(req, res, next){

        var url = req.url;      

        // if(url.indexOf(".ico")!=-1){
        //     return;
        // }

        var fullPath = path.join(this.path, url);
        
        var stats = fs.lstatSync(fullPath);

        if(stats.isDirectory()){
            this.baseDir(req, res, next);
            return;
        }

        if(!fs.existsSync(fullPath)){
            res.send("Not found " + fullPath);
            return;
        }
        console.log(fullPath);
        var fileContent = fs.readFileSync(fullPath);

        if(url.indexOf(".md") !=-1){
            res.contentType("text/html");

            marked(fileContent.toString(), (err, content) =>{
                if (err){                   
                    res.send(fileContent);
                }else{
                    content += this.inject();
                    res.send(content);
                }

                next()
                
            });

            
        }else{
            res.contentType(fullPath);
            res.send(fileContent); 
            next()           
        }
        
        //res.send(req.url + " " + fullPath);
        
       
        
      }
    
    
  
    
   
} 

