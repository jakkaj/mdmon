var page = require('webpage').create();
page.viewportSize = { width: 800, height: 1080 };
page.open('{{sourceUrl}}', function() {
    
  page.render('{{outputPage}}');
  phantom.exit();
});