jQuery(document).ready(function($){
    jQuery("#content img").lazyload({
        effect:"fadeIn",
        placeholder: "http://appelsiini.net/projects/lazyload/img/grey.gif"
    });
});