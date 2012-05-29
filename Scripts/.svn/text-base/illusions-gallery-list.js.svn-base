(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.gallery = $.illusions.gallery || {};
    $.illusions.gallery.list = $.illusions.gallery.list || {};

    $.extend($.illusions.gallery.list, {
        options:
            {
                oldEntryData: {}
            },

        galleryEntryLoadCallback: function (data) {
            var galleryId = this.getUrlParam('docid');
            $.illusions.gallery.list.options.oldEntryData[galleryId] = data;
            this.imagesLoad(data);
            $("#galleryEntry").jqmData('galleryEntry', $.illusions.gallery.list.options.oldEntryData);
        },

        loadEntryData: function (item) {
            var id = $(item).find('id').text();
            var galleryEntry = new $.dataload({ loadUrl: 'http://illusionsli.com/index.php?id=201&docid=' + id,
                pageId: 'galleryEntry',
                loadCallback: $.illusions.gallery.list.galleryEntryLoadCallback
            });
        },

        galleryListLoadCallback: function (data) {
            $.illusions.options.requests += $('item', data).length;
            this.imagesLoad(data);
            $('item', data).each(function () {
                $.illusions.gallery.list.loadEntryData($(this));
            });

        },

        menuClickBind: function (catListView) {
            $(catListView).find($('li a')).each(function () {
                $(this).live("click", function () {
                    var data_id = $(this).attr("data-category-id");
                    if (data_id != null) {
                        $("#galleryEntry").jqmData('data-category-id', data_id);
                        $.mobile.changePage($("#galleryEntry"));
                    }
                });
            });
        },

        galleryEntryPageShow: function () {
            var category = $('#galleryEntry').jqmData("data-category-id");
            var data = $(this).jqmData('galleryEntry')[category];
            var imageContainer = $('#galleryEntry').find($('#Gallery'));
            $(imageContainer).children().remove('li');

            $('item', data).each(function () {
                var item = $(this);
                $(imageContainer).append('<li><a href="' + item.find('image').text() + '" rel="external"><img src="' + item.find('image').text() +
                '" alt="" style="width:200px; height:200px; background: url(css/images/ajax-loader.gif) no-repeat center;" /></a></li>');
            });
            $('#Gallery a').photoSwipe({ captionAndToolbarAutoHideDelay: 0, captionAndToolbarShowEmptyCaptions: false });
        },

        galleryListPageShow: function () {
            var data = $(this).jqmData('galleryList');
            var catListView = $(this).find($('#catList'));
            $(catListView).children().remove('li');
            $('item', data).each(function () {
                var item = $(this);
                var img = $('<img style="width:100%; height:70px;"/>').attr('src', item.find('image').text());
                var listItem = $('<li><a href="#" data-category-id="' + item.find('id').text() + '"><div style="text-align:center; float: left; width: 25%; height: 70px; border: 3px solid #c0c0c0; -webkit-border-radius: 3px; -moz-border-radius: 3px; -khtml-border-radius: 3px";></div><div style="display: inline-block; margin: 10px; width: 65%"><h6>'
                + item.find('title').text() + '</h6></div></a></li>');
                listItem.find('div:first').prepend(img);
                $(catListView).append(listItem);
            });
            $(catListView).listview("refresh");
            $.illusions.gallery.list.menuClickBind(catListView);
            $('#galleryEntry').live('pageshow', $.illusions.gallery.list.galleryEntryPageShow);
        },

        init: function (options) {
            $.extend($.illusions.gallery.list.options, options);

            $('#galleryList').live('pageshow', $.illusions.gallery.list.galleryListPageShow);
        }
    });

})(jQuery);