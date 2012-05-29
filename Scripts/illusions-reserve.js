(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.reserve = $.illusions.reserve || {};

    $.extend($.illusions.reserve, {
        options:
            {
            },

        reservePageShow: function (e, data) {
            $('#reserveButton').click(function () {
                if ($('#reserveDate').val() != "" && $('#reserveTime').val() != "") {
                    return true;
                }
                return false;
            });
        },

        init: function (options) {
            $.extend($.illusions.reserve.options, options);

            $('#reserve').live('pageshow', $.illusions.reserve.reservePageShow);
        }
    });

})(jQuery);