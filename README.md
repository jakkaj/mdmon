# mdmon

<a href="https://www.npmjs.com/package/mdmon">
    <svg width="100" viewBox="0 0 18 7">
	    <path fill="#CB3837" d="M0,0v6h5v1h4v-1h9v-6"></path>
	    <path fill="#FFF" d="M1,1v4h2v-3h1v3h1v-4h1v5h2v-4h1v2h-1v1h2v-4h1v4h2v-3h1v3h1v-3h1v3h1v-4"></path>
    </svg>
</a>

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





