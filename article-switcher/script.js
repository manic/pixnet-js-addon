(function ($, undefined) {
  function generateLiHtml(mode, $el)
  {
    var span_txt, ret;
    if (mode == 'prev') {
        span_txt = '上一則';
    } else {
        span_txt = '下一則';
    }
    ret = '<li class="' + mode + '_article"><a href="' + $el.attr('href') + '"><span>' + span_txt + '</span><div class="title_display"><p>' + $el.text() + '</p></div></a></li>';
    return ret;
  }

  $.extend({
    pixArticleSwitcher: function (options) {
      var settings = $.extend({
        mode: "two-side"
      }, options || {});
      var file_css = 'http://tech.manic.tw/pixnet-js-addon/article-switcher/article_switcher.css';
      if (document.createStyleSheet) {
        document.createStyleSheet(file_css);
      } else {
        $("head").append($("<link rel='stylesheet' href='" + file_css + "' type='text/css' media='screen' />"));
      }
      $(function() {
        var $prev = $('a[rel="prev"]'), $next = $('a[rel="next"]'), container_width = $('#container3').width(),
            li_prev = '', li_next = '';
        if ($prev.length > 0) {
            li_prev = generateLiHtml('prev', $prev);
        }
        if ($next.length > 0) {
            li_next = generateLiHtml('next', $next);
        }
        $('body').append('<div id="pix_article_switch"><ul>' + li_prev + li_next + '</ul></div>');
      });
    }
  });
})(jQuery);