(function( $, undefined ) {
    $.extend({
        pixAddonFacebookPushButton: function( options ) {
            var settings = $.extend({
                show_faces : "true",
                position : "top",
                colorscheme: "light",
                width : "600"
            }, options || {});
            var height = 30;
            if ("true" == settings.show_faces) {
                height = 80;
            }
            $( "div.article" ).each(function() {
                var e = $(this).find("div.article-content:first");
                var button = '<iframe src="http://www.facebook.com/plugins/like.php?href='
                + encodeURI($(this).find("h2 a").attr("href")) + '&amp;layout=standard'
                + '&amp;show_faces=' + settings.show_faces
                + '&amp;width=' + settings.width
                + '&amp;action=like'
                + '&amp;font=verdana'
                + '&amp;colorscheme=' + settings.colorscheme
                + '&amp;height=' + height + '" scrolling="no" frameborder="0" style="border:none; '
                + 'overflow:hidden; width:' + settings.width + 'px'
                + '; height:' + height + 'px;" allowTransparency="true"></iframe><br />';
                if ("top" === settings.position) {
                    e.prepend( button );
                } else {
                    e.append( button );
                }
            });
        }
    });
})( jQuery );
