(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.twitt = $.illusions.twitt || {};

    $.extend($.illusions.twitt, {
        options:
            {
            },


        loadFeeds: function () {
            $.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=IllusionsLI&count=20&callback=?', function (data) {
                $.each(data, function (i, item) {
                    var ct = item.text;
                    ct = ct.replace(/http:\/\/\S+/g, '<a href="$&" target="_blank">$&</a>');
                    ct = ct.replace(/\s(@)(\w+)/g, ' @<a href="http://twitter.com/$2" target="_blank">$2</a>');
                    $("#jstweets").append('<div class="ui-corner-all">' + ct + '</div>');
                });
                $.illusions.increaseCompleteRequest();
            });
        },

        init: function (options) {
            $.extend($.illusions.twitt.options, options);
        }
    });

})(jQuery);