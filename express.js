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

    boot(port){        
        return new Promise((good)=>{
            app.use(this.intercept.bind(this));
            app.use(require('connect-browser-sync')(this.bs));
            app.listen(port, () => good());
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
            
            var base = "<h1>mdmon</h1>";
            base+= "<h4>" + fullPath + "</h4>";
            for (var i=0; i<items.length; i++) {
                var pBuild = this.getBase(req);                
               
                base += `<a href=\"${pBuild}${items[i]}\">${items[i]}</a><br/>`;
               
            }

            

            var replContent = this._getLocalPackageFile("packageHtml/template.htm");
            replContent = replContent.replace("{{content}}", base);
            replContent = replContent.replace("{{title}}", path.basename(fullPath));
            res.send(replContent);
            next();
        });
    }

    _getLocalPackageFile(rel){
        var fullPath = path.join(__dirname, rel);        
        return fs.readFileSync(fullPath).toString();
    }

    intercept(req, res, next){

        var url = req.url;      
        
        if(url.indexOf("/packageHtml/") !=-1){
        
            var staticContent = this._getLocalPackageFile(url);
            if(url.indexOf(".css")!=-1){
                res.contentType("text/css");
            }else if(url.indexOf(".js")!=-1){
                res.contentType("application/javascript");
            }
            res.send(staticContent);
            next();
            return;
         }

        var fullPath = path.join(this.path, url);
        
        if(!fs.existsSync(fullPath)){
            res.send("Not found " + fullPath);
            return;
        }

        var stats = fs.lstatSync(fullPath);       

        if(stats.isDirectory()){
            this.baseDir(req, res, next);
            return;
        }        
        
        var fileContent = fs.readFileSync(fullPath);

        if(url.indexOf(".md") !=-1){
            res.contentType("text/html");

            marked(fileContent.toString(), (err, content) =>{
                if (err){                   
                    res.send(fileContent);
                }else{
                    var replContent = this._getLocalPackageFile("packageHtml/template.htm");
                    replContent = replContent.replace("{{content}}", content);
                    replContent = replContent.replace("{{title}}", path.basename(fullPath));
                    res.send(replContent);
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

