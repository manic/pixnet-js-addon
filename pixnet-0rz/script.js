(function( $, d, w, undefined ) {
    $.extend({
        pix0rz: function (options) {
            var settings = $.extend({
                lightboxable: "photo_page"
            }, options || {});
            if ( !w.location.href.match(/blog\/post/) && "true" != settings.demo )  return;

            $(function() {
                var href = $('div.article').find('h2 a').attr('href');
                $('div.forward').prepend('<form method="POST" id="0rz-form" action="http://0rz.tw/create" target="_blank"><input type="hidden" name="url" value="' + href + '"> </form><a href="#" data-0rz-url="true"><img src="//s.pixfs.net/blog/images/common/push_0rz_icon.gif">產生短網址</a>');
                $('a[data-0rz-url]').click(function() {
                    $('#0rz-form').submit();
                    return false;
                });
            });
        }
    });
})( jQuery, document, window );