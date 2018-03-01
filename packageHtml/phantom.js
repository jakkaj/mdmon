var page = require('webpage').create();
page.viewportSize = { width: 650, height: 720 };

page.settings.dpi = "96";

page.open('{{sourceUrl}}', function () {
  window.setTimeout(function () {
    page.includeJs("//code.jquery.com/jquery-1.10.1.min.js", function () {
      var size = page.evaluate(function () {
        return {width: width = $(document).width(), height : $(document).height() };
      });

      size.margin=60;

      page.paperSize = size;
      page.render('{{outputPage}}');
      phantom.exit();
    });
  }, 400);

});