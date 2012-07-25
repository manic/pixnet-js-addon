(function ($, undefined) {
    $.extend({
        pixGritterMessage: function (options) {

            function showMsg(msg)
            {
                $.gritter.add({
                    title: msg.title,
                    text: msg.description,
                    image: msg.image_url,
                    sticky: false
                });
            }

            function sort_unique(arr) {
                arr = arr.sort(function (a, b) { return a*1 - b*1; });
                var ret = [arr[0]];
                for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
                    if (arr[i-1] !== arr[i]) {
                        ret.push(arr[i]);
                    }
                }
                return ret;
            }

            function main()
            {
                var cookie_name = 'pix_app_gritter_messages';
                $.getJSON('http://vote.pixplug.in/gritter_messages?user=' + pix.owner + '&callback=?', function(ret) {
                    if (ret.error) return true;
                    for (var i in ret.gritter_messages) {
                        var msg = ret.gritter_messages[i], ids;
                        if ($.cookie(cookie_name) != null) {
                            ids = $.cookie(cookie_name).split(',');
                        } else {
                            ids = [];
                        }
                        if ($.inArray(msg.id.toString(), ids) > -1) continue;
                        showMsg(ret.gritter_messages[i]);
                        ids.push(msg.id);
                        $.cookie(cookie_name, sort_unique(ids).join(','));
                    }
                });
            }

            function loadGritter(settings)
            {
                $.getScript(file_js, function (data, textStatus) {
                    $.extend($.gritter.options, {
                        position: settings.position,
                        time: parseInt(settings.time)
                    });
                    main();
                });
            }

            var settings = $.extend({
                position: "top-right",
                time: 7000
            }, options || {});

            var file_css = 'http://libs.pixfs.net/jquery-plugins/gritter/1.7.4/jquery.gritter.css?v=4',
            file_cookie_js = 'http://libs.pixfs.net/jquery-plugins/cookie/1.0/jquery.cookie.js';
            file_js = 'http://libs.pixfs.net/jquery-plugins/gritter/1.7.4/jquery.gritter.min.js';

            if (document.createStyleSheet) {
                document.createStyleSheet(file_css);
            } else {
                $("head").append($("<link rel='stylesheet' href='" + file_css + "' type='text/css' media='screen' />"));
            }

            if (!$.cookie) {
                $.getScript(file_cookie_js, function (data, textStatus) {
                    loadGritter(settings);
                });
            } else {
                loadGritter(settings);
            }

        }
    });
})(jQuery);