var page = require('webpage').create();
page.open('http://localhost:59202/README.md', function() {
  page.render('temp.pdf');
  phantom.exit();
});