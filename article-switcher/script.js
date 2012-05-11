(function ($, undefined) {
  function generateLiHtml(mode, $el)
  {
    var span_txt, ret, date = '', image = '', date_string = '';
    if ($el.data('public-at')) {
        date = new Date(parseInt($el.data('public-at') + '000'));
        date_string = '<div class="date">' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '</div>';
    }
    if ($el.data('thumb')) {
        image = '<img src="' + $el.data('thumb') + '" width="90" height="90">';
    }
    if (mode == 'prev') {
        span_txt = '上一則';
    } else {
        span_txt = '下一則';
    }
    ret = '<li class="' + mode + '_article"><a href="' + $el.attr('href') + '"><span>' + span_txt + '</span><div class="title_display">' + image + date_string + '<p>' + $el.text() + '</p></div></a></li>';
    return ret;
  }

  $.extend({
    pixArticleSwitcher: function (options) {
      var settings = $.extend({
        mode: "two-side",
        default_css: "on"
      }, options || {});
      if ('on' == settings.default_css) {
          var file_css = 'http://tech.manic.tw/pixnet-js-addon/article-switcher/article_switcher.css';
          if (document.createStyleSheet) {
              document.createStyleSheet(file_css);
          } else {
              $("head").append($("<link rel='stylesheet' href='" + file_css + "' type='text/css' media='screen' />"));
          }
      }

      $(function() {
        var $prev = $('a[rel="prev"]'), $next = $('a[rel="next"]'), container_width = $('#container3').width() + 120,
            li_prev = '', li_next = '';
        if ($prev.length > 0) {
            li_prev = generateLiHtml('prev', $prev);
        }
        if ($next.length > 0) {
            li_next = generateLiHtml('next', $next);
        }
        if ('two-side' == settings.mode) {
            $('body').append('<div id="pix_article_switch"><ul>' + li_prev + li_next + '</ul></div>');
            $('#pix_article_switch').width(container_width).css('margin-left', '-' + container_width / 2 + 'px');
        } else {
            $('div.article-content').append('<div id="pix_article_switch_content"><ul>' + li_prev + li_next + '</ul></div>');
        }
      });
    }
  });
})(jQuery);
