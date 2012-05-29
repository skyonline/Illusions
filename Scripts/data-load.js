$.dataload = function (o) {

    this.options =
                {
                    loadUrl: undefined,
                    loadCallback: function (data) { $.illusions.increaseCompleteRequest(); },
                    pageId: undefined,
                    getUrlParam: function (paramName) {
                        var results = new RegExp('[\\?&]' + paramName + '=([^&#]*)').exec(this.loadUrl);
                        return results[1] || 0;
                    },
                    
                    imagesLoad: function (data) {
                        var itemsCounter = 0;
                        var allCount = $('item', data).length;
                        $('item', data).each(function () {
                            var item = $(this);
                            var imgLoad = new Image();
                            $(imgLoad).load(function () {
                                // $('#loadData .upload-container').progressbar({ value: 50 + itemsCounter * 50 / 100 });
                                itemsCounter++;
                                if (itemsCounter == allCount) {
                                    $.illusions.increaseCompleteRequest();
                                }
                                
                            }).attr('src', item.find('image').text());
                        });
                    }
                    
                };
    $.extend(this.options, o);

    this.completeLoad = function (data) {
        this.options.loadCallback(data);
    };

    this.loadData = function () {
        this.xhr = new XMLHttpRequest();
        var _dataload = this;
        this.xhr.onload = function () {
            var responseText = this.responseText;
            if (!responseText)
                return;
            var data = $.parseXML(responseText);
            $('#' + _dataload.options.pageId).jqmData(_dataload.options.pageId, data);
            _dataload.completeLoad(data);
        };

        this.xhr.open('GET', this.options.loadUrl, true);

        this.xhr.onprogress = function (e) {
            $('#loadData .upload-container').progressbar(
                {
                    value: 100 * ($.illusions.options.requestCompleted + (e.position / e.totalSize)) / $.illusions.options.requests
                });
        };

        try {
            this.xhr.send();
        }
        catch (e) {
            //NOTE: Error handling here
        };
    };

    this.loadData();
};

