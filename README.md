# mdmon

Editing markdown in Visual Studio Code is awesome - it can even preview your mardown for you (`crtl-k, v`). The downside is you can't pop this preview screen on to another monitor!

mdmon allows you to review your rendered markdown in your browser of choice on your monitor of choice. 

It works by using [browser-sync](https://www.npmjs.com/package/browser-sync) in combination with [express](https://www.npmjs.com/package/express) to monitor and reload your files when they change. Markdown rendering is performed by [marked](https://www.npmjs.com/package/marked). 

```
npm install -g mdmon
```

```
mdmon --path /some/dir
```

Mdmon has simple folder browsing capability so you can point to the base folder of your project and navigate around to find the file you want to monitor. 





