# mdmon

<a href="https://www.npmjs.com/package/mdmon">
    <svg width="100" viewBox="0 0 18 7">
	    <path fill="#CB3837" d="M0,0v6h5v1h4v-1h9v-6"></path>
	    <path fill="#FFF" d="M1,1v4h2v-3h1v3h1v-4h1v5h2v-4h1v2h-1v1h2v-4h1v4h2v-3h1v3h1v-3h1v3h1v-4"></path>
    </svg>
</a>

Editing markdown in Visual Studio Code is awesome - it can even preview your mardown for you (`crtl-k, v`). The downside is you can't pop this preview screen on to another monitor!

`mdmon` allows you to review your rendered markdown in your browser of choice on your monitor of choice using a familiar GitHub style theme.  

It works by using [browser-sync](https://www.npmjs.com/package/browser-sync) in combination with [express](https://www.npmjs.com/package/express) to monitor and reload your files when they change. Markdown rendering is performed by [marked](https://www.npmjs.com/package/marked). 

```
npm install -g mdmon
```

```
mdmon --path /some/dir
```

Mdmon has simple folder browsing capability so you can point to the base folder of your project and navigate around to find the file you want to monitor. 

![mdmon](https://user-images.githubusercontent.com/5225782/36623877-38635068-195d-11e8-8269-f7a01c564a25.gif)


<img src="https://user-images.githubusercontent.com/5225782/36624454-9f953f02-1963-11e8-8093-469ccc444d4b.PNG" width="500"/>


<img width="200" src="https://user-images.githubusercontent.com/5225782/36624457-aacd2ee8-1963-11e8-8a8e-1841508b1d36.PNG"/>



