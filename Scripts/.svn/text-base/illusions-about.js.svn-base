(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.about = $.illusions.about || {};

    $.extend($.illusions.about, {
        options:
            {
            },

        aboutPageShow: function (e, data) {
            if ($('#about').find('div.content p').length == 0) {
                var data = $(this).jqmData('about');
                $('item', data).each(function () {
                    var item = $(this);
                    var content = $(item.find('mobilecontent').text());
                    var phone = $(content.find('span span')[1]);
                    phone.html('<a class="illusions-link" href="tel:' + phone.text() + '">' + phone.text() + "</a>");
                    $('#about').find('div.content').html(content);

                });
            }
        },

        init: function (options) {
            $.extend($.illusions.about.options, options);

            $('#about').live('pageshow', $.illusions.about.aboutPageShow);
        }
    });

})(jQuery);