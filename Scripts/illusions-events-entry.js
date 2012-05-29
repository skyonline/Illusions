(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.events = $.illusions.events || { };
    $.illusions.events.entry = $.illusions.events.entry || {};

    $.extend($.illusions.events.entry, {
        options:
            {
            },
        // Event ENTRY pages scripts
        //************************************************************************
        eventEntryPageShow: function () {
            xmlItem = $(this).jqmData('event-xml-item');
            var content = $(this).find('.content');
            content.find('h3').html(xmlItem.find('title').text());

            var that = $(content.find('img')), imgLoad = new Image();
            $(imgLoad).load(function () {
                $(that).attr('src', $(this).attr('src'));
            }).attr('src', xmlItem.find('image').text());

            content.find('p').html(xmlItem.find('introtext').text());

        },

        eventEntryPageHide: function () {
            $(this).find('img').attr('src', null);
            $(this).find('p').html('');
        },

        init: function (options) {
            $.extend($.illusions.events.entry.options, options);

            $('#eventEntry').live('pageshow', $.illusions.events.entry.eventEntryPageShow);
            $('#eventEntry').live('pagehide', $.illusions.events.entry.eventEntryPageHide);
        }
    });

})(jQuery);