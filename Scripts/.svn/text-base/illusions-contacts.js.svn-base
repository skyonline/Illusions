(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.contacts = $.illusions.contacts || {};

    $.extend($.illusions.contacts, {
        options:
            {
            },

        contactsPageShow: function (e, data) {
            //copy data from about page for now
            if ($('#contacts').find('div.content p').length == 0) {
                var data = $('#about').jqmData('about');
                $('item', data).each(function () {
                    var item = $(this);
                    $('#contacts').find('div.content').append($(item.find('mobilecontent').text()).slice(0, 3));
                });
            }
        },

        init: function (options) {
            $.extend($.illusions.contacts.options, options);

            //            $('#contacts').live('pagebeforeshow', function () {
            //                $('#contacts').find('div.content').empty();
            //            });

            $('#contacts').live('pageshow', $.illusions.contacts.contactsPageShow);
        }
    });

})(jQuery);