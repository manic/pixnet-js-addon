(function($, undefined) {
    $.extend({
        pixAddonCloudZoom: function(options) {
            var settings = $.extend({
                display_type : 0
            }, options || {});
            var display_opts = ['"position": "inside", "adjustX":-4, "adjustY":-4', '"adjustX":-10, "adjustY":-4', '"tint": "#ff0000", "tintOpacity":0.5 ,"smoothMove":5, "zoomWidth":480, "adjustY":-4, "adjustX":10'];

            var protocol = (("https:" == document.location.protocol) ? 'https' : 'http');
            $('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', protocol + '://libs.pixfs.net/jquery-plugins/cloud-zoom/1.0.2/cloud-zoom.css').appendTo('head');
            $(document).ready(function(){
                $('div.article-content').find('a.cloud-zoom img').filter(function () {
                    return $(this).attr('src').match(/\.(jpg|png|gif)/i);
                }).each(function() {
                    var alink = $(this).parent(), src;
                    src = $(this).attr('src').replace(/_[stqmnbl]/i, '_l');
                    if (alink.attr('href').match(/album\/photo/i)) {
                        alink.attr('href', src);
                    }
                    alink.attr('rel', display_opts[settings.display_type]);
                });
                $.getScript(protocol + '://s.pixfs.net/js/jquery.cloud-zoom/cloud-zoom.min.js?v=1', function(){jQuery('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();});
            });
        }});
})(jQuery);