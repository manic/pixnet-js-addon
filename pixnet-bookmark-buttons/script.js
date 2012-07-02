(function( $, d, w, undefined ) {
    $.extend({
        pixBookmarkButtons: function( options ) {
            var settings = $.extend({
                enable_info: "true",
                enable_murmur: "true",
                enable_facebook_share: "true",
                enable_plurk: "true",
                enable_twitter: "true",
                enable_funp: "true",
                enable_google_plus: "true",
                enable_facebook_like: "true",
                position : "top",
                g_plus_size: "medium",
                g_plus_annotation: "none",
                fb_like_show_faces : "false",
                fb_like_colorscheme: "light",
                fb_like_layout: "button_count",
                demo: "false"
            }, options || {});
            // 只在單一文章頁才會作用。
            if ( !w.location.href.match(/blog\/post/) && "true" != settings.demo )  return;
            // load Google PlusScript
            window.___gcfg = {lang: 'zh-TW'};

            function generate_facebook_html(settings)
            {
                var width = 90;
                if ('box_count' == settings.fb_like_layout) {
                    width = 90;
                } else if ('standard' == settings.fb_like_layout) {
                    width = 450;
                } else if ('button_count' == settings.fb_like_layout) {
                    width = 90;
                }
                var facebook_like = '<div class="fb-like" data-send="false' +
                '" data-layout="' + settings.fb_like_layout +
                '" data-width="' + width +
                '" data-show-faces="' + settings.fb_like_show_faces +
                '" data-colorscheme="' + settings.fb_like_colorscheme +
                '"></div>&nbsp;';
                return facebook_like;
            }

            (function() {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
            })();

            $(function() {
                var href = $('div.article').find('h2 a').attr('href');
                var encode_href = encodeURIComponent(href);
                var ret_html = '';
                var $content = $('div.article-content');

                var murmur = '<a title="分享至MURMUR" data-bookmark-type="murmur"><img src="//s.pixfs.net/blog/images/common/murmur.gif" title="MURMUR" alt="MURMUR" border="0" style="width:20px;height:20px;"></a>&nbsp;';
                var facebook_share = '<a title="分享至facebook" data-bookmark-type="facebook"><img src="//s.pixfs.net/blog/images/common/facebook.gif" title="facebook" alt="facebook" border="0" style="width:18px;height:20px;"></a>&nbsp;';
                var plurk = '<a title="分享至PLURK" data-bookmark-type="plurk"><img src="//s.pixfs.net/blog/images/common/plurk.gif" title="PLURK" alt="PLURK" border="0" style="width:18px;height:20px;"></a>&nbsp;';
                var twitter = '<a title="分享至twitter" data-bookmark-type="twitter"><img src="//s.pixfs.net/blog/images/common/twitter.gif" title="twitter" alt="twitter" border="0" style="width:18px;height:20px;"></a>&nbsp;';
                var funp = '<iframe width="70" height="20" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" src="http://funp.com/tools/buttoniframe.php?s=24&amp;url=' + encode_href + '"></iframe>&nbsp;';
                var google_plus = '<g:plusone size="' + settings.g_plus_size +
                '" annotation="' + settings.g_plus_annotation + '"></g:plusone>&nbsp;';
                var facebook_like = generate_facebook_html(settings);

                $(document).delegate('a[data-bookmark-type]', 'click', function() {
                    var url = '', bookmark_type = $(this).data('bookmark-type'),
                    title = d.title.split('@')[0].replace(/([\s]*$)/g,''),
                    href = $('div.article').find('h2 a').attr('href'),
                    encode_href = encodeURIComponent(href);
                    if ('murmur' == bookmark_type) {
                        url = "http://murmur.tw/?sharelink=" + encode_href;
                    } else if ('facebook' == bookmark_type) {
                        url = 'http://www.facebook.com/share.php?u='+ encode_href +'&t='+encodeURIComponent(title);
                    } else if ('plurk' == bookmark_type) {
                        url = 'http://www.plurk.com/?qualifier=shares&status='+ encode_href;
                    } else if ('twitter' == bookmark_type) {
                        url = 'http://twitter.com/?status='+encodeURIComponent(href +' ('+ title + ')');
                    }
                    $.get('/blog/sharelog?url=' + encode_href + '&service=' + bookmark_type)
                    void(open(url));
                });

                // load FB script
                if ($('#fb-root').length == 0 && !w.FB) {
                    w.fbAsyncInit = function() {
                        FB.init({appId: '353650924654375', status: true, cookie: true, xfbml: true});
                    };
                    $('body').append('<div id="fb-root"></div>');
                    $.getScript(d.location.protocol + '//connect.facebook.net/zh_TW/all.js');
                }

                if ("true" == settings.enable_info) {
                    ret_html += '<span style="position:relative;top:-7px;">分享:</span>&nbsp;';
                }

                if ("true" == settings.enable_murmur) {
                    ret_html += murmur;
                }

                if ("true" == settings.enable_facebook_share) {
                    ret_html += facebook_share;
                }

                if ("true" == settings.enable_plurk) {
                    ret_html += plurk;
                }

                if ("true" == settings.enable_twitter) {
                    ret_html += twitter;
                }

                if ("true" == settings.enable_funp) {
                    ret_html += funp;
                }

                if ("true" == settings.enable_google_plus) {
                    ret_html += google_plus;
                }

                if ("true" == settings.enable_facebook_like) {
                    ret_html += facebook_like;
                }

                ret_html = '<div class="bookmark">' + ret_html + '</div>';
                if ("top" == settings.position) {
                    $content.prepend( ret_html );
                } else if ('bottom' == settings.position) {
                    $content.append( ret_html );
                } else {
                    $content.prepend( ret_html );
                    $content.append( ret_html );
                }
            });
        }
    });

})( jQuery, document, window );