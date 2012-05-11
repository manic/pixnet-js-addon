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
        lightboxable: "photo_page"
      }, options || {});
      var file_css = 'http://libs.pixfs.net/jquery.lightbox/0.5/jquery.lightbox.css',
          file_js = 'http://libs.pixfs.net/jquery.lightbox/0.5/jquery.lightbox.pack.js';
      if (document.createStyleSheet) {
        document.createStyleSheet(file_css);
      } else {
        $("head").append($("<link rel='stylesheet' href='" + file_css + "' type='text/css' media='screen' />"));
      }
      $.getScript(file_js, function (data, textStatus) {
        $('div.article-content').find('a img').filter(function () {
          return $(this).attr('src').match(/\.(jpg|png|gif)/i);
        }).each(function () {
            var alink = $(this).parents('a'), src;
            src = $(this).attr('src').replace(/_[stqmnbl]/i, '_l');
            if (alink.attr('href').match(/\.(jpg|png|gif)/i)) { // 連結本身是原圖的，就只是加上 LightBox class
                alink.addClass('pixLightBox');
            } else if (settings.lightboxable == 'photo_page') {
                if (alink.attr('href').match(/album\/photo/i)) {  // 只有連回相簿頁的圖片才加連結
                  alink.attr('href', src).addClass('pixLightBox');
                }
            } else {
              alink.attr('href', src).addClass('pixLightBox');
            }
        });
        $('div.article-content').find('a.pixLightBox').has('img').lightBox(settings);
      });
    }
  });
})(jQuery);