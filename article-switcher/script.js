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

  function generateSideLiHtml($el)
  {
    if ($el.data('thumb')) {
        image = '<img src="' + $el.data('thumb') + '" width="90" height="90" class="article-image">';
    }
    ret = '<li><a href="' + $el.attr('href') + '"><div class="article-image-box">' + image + '</div><span class="article-text">' + $el.text() + '</span></a></li>';
    return ret;
  }


  $.extend({
    pixArticleSwitcher: function (options) {
      var settings = $.extend({
        mode: "two-side",
        default_css: "on",
        color: "black"
      }, options || {});
      var arrows = {
          "black": {
              "left": "http://pic.pimg.tw/appmarket/1337245961-1958403486.png?v=1337245962",
              "right": "http://pic.pimg.tw/appmarket/1337245961-1895570752.png",
              "color": "#969597"
          },
          "pink": {
              "left": "http://channel.pixnet.net/lovely/images/arrow-filter-left.png",
              "right": "http://channel.pixnet.net/lovely/images/arrow-filter-right.png",
              "color": "#f19ec2"
          },
          "yellow": {
              "left": "http://pic.pimg.tw/appmarket/1337245961-4175304074.png",
              "right": "http://pic.pimg.tw/appmarket/1337245961-1235054658.png",
              "color": "#FFD4A7"
          },
          "blue": {
              "left": "http://pic.pimg.tw/appmarket/1337245961-522079231.png",
              "right": "http://pic.pimg.tw/appmarket/1337245961-849513824.png",
              "color": "#ABDCFF"
          },
          "white": {
              "left": "http://pic.pimg.tw/appmarket/1337245961-609852530.png",
              "right": "http://pic.pimg.tw/appmarket/1337245961-1557330822.png",
              "color": "#f8f7f8"
          }
      };
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
            $('#pix_article_switch .prev_article .title_display').css('background-image', "url(" + arrows[settings.color]['left'] + ")").css('border-color', arrows[settings.color]['color']);
            $('#pix_article_switch .prev_article span').css('background-image', 'url(' + arrows[settings.color]['left'] + ')');
            $('#pix_article_switch .next_article .title_display').css('background-image', "url(" + arrows[settings.color]['right'] + ")").css('border-color', arrows[settings.color]['color']);
            $('#pix_article_switch .next_article span').css('background-image', 'url(' + arrows[settings.color]['right'] + ')');
            $('#pix_article_switch .date').css('background-color', arrows[settings.color]['color']);
        } else {
            $('div.article-content').append('<div id="pix_article_switch_content"><h5>上一篇文章與下一篇文章</h5><ul>' + generateSideLiHtml($prev) + generateSideLiHtml($next) + '</ul></div>');
        }
      });
    }
  });
})(jQuery);
