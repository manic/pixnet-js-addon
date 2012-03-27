(function ($, undefined) {
  $.extend({
    pixLightBox: function (options) {
      var settings = $.extend({
        imageLoading: 'http://pic.pimg.tw/appmarket/1327917749-684327097.gif?v=1327917754',
        imageBtnPrev: 'http://pic.pimg.tw/appmarket/1327917749-4112462452.gif?v=1327917754',
        imageBtnNext: 'http://pic.pimg.tw/appmarket/1327917749-3184137596.gif?v=1327917754',
        imageBtnClose: 'http://pic.pimg.tw/appmarket/1327917749-2845253418.gif?v=1327917754',
        imageBlank: 'http://pic.pimg.tw/appmarket/1327917749-3598307766.gif?v=1327917754',
        txtImage: '圖片',
        txtOf: '之',
      }, options || {});
      var file_css = 'http://leandrovieira.com/projects/jquery/lightbox/css/jquery.lightbox-0.5.css',
          file_js = 'http://leandrovieira.com/projects/jquery/lightbox/js/jquery.lightbox-0.5.pack.js';
      if (document.createStyleSheet) {
        document.createStyleSheet(file_css);
      } else {
        $("head").append($("<link rel='stylesheet' href='" + file_css + "' type='text/css' media='screen' />"));
      }
      $.getScript(file_js, function (data, textStatus) {
        $('div.article-content').find('a img').filter(function () {
          return $(this).attr('src').match(/_[stqmnbl].(jpg|png|gif)$/);
        }).each(function () {
          var src = $(this).attr('src').replace(/_[stqmnbl]/i, '');
          $(this).parents('a').attr('href', src);
        });
        $('div.article-content').find('a').has('img').lightBox(settings);
      });
    }
  });
})(jQuery);