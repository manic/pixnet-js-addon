(function($, undefined) {
    $.extend({
        pixAddonRelatedArticle: function(options) {
            var settings = $.extend({
                blog_relatedarticle: "site",
                blog_relatedarticleshow: "post",
                blog_relatedtemplate: "system"
            }, options || {});
            if (!settings.blog_relatedarticle) settings.blog_relatedarticle = 'site';
            if (!settings.blog_relatedarticleshow) settings.blog_relatedarticleshow = 'post';
            if (!settings.blog_relatedtemplate) settings.blog_relatedtemplate = 'system';
            if ( !window.location.href.match(/blog\/post/) && "post" == settings.blog_relatedarticleshow )  return;
            $.getScript('//s.pixfs.net/blog/related.min.js', function(){
                if ($('meta@[name=generator]').attr('content') == 'PChoc' && pix) {
                    $(function() {
                        var contentWidth = $('.article-content:first').width();
                        var count = Math.max(3, Math.min(5, Math.floor(contentWidth / 120)));
                        $('.article').relatedpost({
                            count: count,
                            container: '.article-content:first',
                            onVisible: function(source) {
                                if ('site' == settings.blog_relatedarticle) {
                                    if ('emma' == source || 'ad' == source) {
                                        var id = $('.title', this).attr('id').split('-')[1];
                                        return {
                                            postId: id,
                                            user: pix.owner
                                        };
                                    }
                                    if (source == 'techbang') {
                                        return {
                                            permallink: $('.title a', this).attr('href')
                                        };
                                    }
                                } else {
                                    if (source == 'emma') {
                                        var id = $('.title', this).attr('id').split('-')[1];
                                        return {
                                            postId: id,
                                            user: pix.owner
                                        };
                                    }
                                }
                            },
                            onShow: function(post, data) {
                                if ('system' == settings.blog_relatedtemplate) {
                                    var sameCount = 0;
                                    $(data).each(function (index, element) {
                                        if (element.source != 'emma') {
                                            return;
                                        }
                                        if (element.thumb == element.user.cavatar) {
                                            sameCount++;
                                        }
                                    });
                                    var style = sameCount > 2 ? 'list' : 'box';
                                } else {
                                    var style = settings.blog_relatedtemplate;
                                }
                                var count = style == 'list' ? 4 : this.count;
                                var posts = [];
                                var techbangPosts = [];
                                var ads = [];
                                $.each(data, function() {
                                    if (this.source == 'emma') {
                                        posts.push(this);
                                    } else if (this.source == 'techbang') {
                                        techbangPosts.push(this);
                                    } else if ('ad' == this.source) {
                                        ads.push(this);
                                    }
                                });
                                if (posts.length != 0 && techbangPosts.length > 0) {
                                    posts.splice.apply(posts, [count - 1, 0].concat(techbangPosts));
                                }
                                if (posts.length != 0 && ads.length) {
                                    posts.splice.apply(posts, [count - 1, 0].concat(ads));
                                }
                                return {
                                    posts: posts,
                                    style: style,
                                    count: count
                                };
                            }
                        });
                    });
                }
            });
        }});
})(jQuery);