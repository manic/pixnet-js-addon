(function($) {
    $(function() {
	$('div.article').each(function() {
	    $(this).find('div.article-content:first').prepend('<iframe src="http://www.facebook.com/plugins/like.php?href=' + encodeURI($(this).find('h2 a').attr('href')) + '&amp;layout=standard&amp;show_faces=false&amp;width=600&amp;action=like&amp;font=verdana&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:600px; height:35px;" allowTransparency="true"></iframe>');
	});
    });
})(jQuery);

