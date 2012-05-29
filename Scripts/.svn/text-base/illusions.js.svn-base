
(function ($) {
    $.illusions = $.illusions || {};

    $.extend($.illusions, {
        options:
            {
                requests: 4, //contacts + events + aboutus + gallery list with + twits
                requestCompleted: 0
            },

        increaseCompleteRequest: function () {
            $.illusions.options.requestCompleted++;
            if ($.illusions.options.requests == $.illusions.options.requestCompleted) {
                $.mobile.changePage('#homePage');
            }
        },

        loadDataInit: function () {
            $('#loadData .upload-container').progressbar({ value: 0 });

            var contactsLoad = new $.dataload({ loadUrl: 'http://illusionsli.com/index.php?id=205&docid=175',
                pageId: 'contacts'
            });
            var eventsLoad = new $.dataload({ loadUrl: 'http://illusionsli.com/index.php?id=201&docid=186',
                pageId: 'eventsList',
                loadCallback: $.illusions.events.list.eventListLoadCallBack
            });
            var aboutUsLoad = new $.dataload({ loadUrl: 'http://illusionsli.com/index.php?id=205&docid=1',
                pageId: 'about'
            });
            var galleryList = new $.dataload({ loadUrl: 'http://www.illusionsli.com/index.php?id=201&docid=203',
                pageId: 'galleryList',
                loadCallback: $.illusions.gallery.list.galleryListLoadCallback
            });
        },

        init: function (options) {
            $.extend($.illusions.options, options);
            $.illusions.loadDataInit();
            $.illusions.twitt.loadFeeds();
            $.illusions.maps.init({ lat: 40.7, long: -73.3 });
            $.illusions.home.init();
            $.illusions.contacts.init();
            $.illusions.about.init();
            $.illusions.events.entry.init();
            $.illusions.events.list.init();
            $.illusions.gallery.list.init();
            $.illusions.reserve.init();
        }
    });
})(jQuery);