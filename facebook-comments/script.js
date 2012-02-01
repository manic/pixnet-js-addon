(function( $, d, undefined ) {
    $.extend({
        pixFacebookComments: function( options ) {
            var settings = $.extend({
                num_posts: 5,
                width: "600",
                colorscheme: 'light',
            }, options || {});
            // 只在單一文章頁才會作用。
            if ( !window.location.href.match(/blog\/post/) )  return;
            $(function() {
                window.fbAsyncInit = function() {
                    FB.init({appId: '353650924654375', status: true, cookie: true, xfbml: true});
                };
                $('body').append('<div id="fb-root"></div>');
                $.getScript(d.location.protocol + '//connect.facebook.net/zh_TW/all.js');
                var $div = $('<div class="fb-comments">');
                $div.attr({
                    'data-href': window.location.href,
                    'data-num-posts': settings.num_posts,
                    'data-width': settings.width
                });
                if ('dark' == settings.colorscheme) $div.attr('data-colorscheme', 'dark');
            });
        }
    });

})( jQuery, document );