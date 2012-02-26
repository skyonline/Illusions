// Ajax scripts 
//************************************************************************
$(document).ajaxStart(function () {
    $('<div class="ajax_overlay" id="ajaxLoader"><div class="ajax_loader"></div></div>').appendTo($.mobile.pageContainer);
}).ajaxStop(function () {
    $('#ajaxLoader').fadeOut('fast', function () {
        $(this).remove();
    });
});

// Map scripts 
//************************************************************************
var mapdata = { destination: new google.maps.LatLng(40.767671, -73.295897) };

$('#map').live("pageinit", function () {
    getClubLocation($('#map_square'));
    $('#map_square').click(function () {
        $.mobile.changePage($('#page-map'), {});
    });
});


function fadingMsg(locMsg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + locMsg + "</h1></div>")
    .css({ "display": "block", "opacity": 0.8, "top": $(window).scrollTop() + 100 })
    .appendTo($.mobile.pageContainer)
    .delay(2200)
    .fadeOut(1000, function () {
        $(this).remove();
    });
}

function getClubLocation(mapForm, callback) {
    mapForm.gmap({ 'center': mapdata.destination,
        'zoom': 12,
        'mapTypeControl': false,
        'navigationControl': false,
        'streetViewControl': false
    })
    .bind('init', function (evt, map) {
        mapForm.gmap('addMarker', { 'position': map.getCenter(), 'animation': google.maps.Animation.DROP },
                    function (map, marker) {
                        mapForm.gmap('addInfoWindow', { 'position': marker.getPosition(), 'content': 'Illusions Gentlmen\'s Club' },
                                        function (iw) {
                                            $(marker).click(function () {
                                                iw.open(map, marker);
                                                map.panTo(marker.getPosition());
                                            });
                                        });
                    });
        callback();
    });
}

$('#page-map').live("pageshow", function () {
    getClubLocation($('#map_canvas'), function () { $('.refresh').trigger('tap'); });
});

$('.refresh').live("tap", function () {

    var currentPosition = {};
    //navigator.geolocation.watchPosition(function (position) {
        // Real App code
        //currentPosition.latitude = position.coords.latitude;
        //currentPosition.longitude = position.coords.longitude;
        //*********

        //Test App code
        currentPosition.latitude = 40.8;
        currentPosition.longitude = -73.4;
        $('#map_canvas').gmap('displayDirections',
                { 'origin': new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
                    'destination': mapdata.destination,
                    'travelMode': google.maps.DirectionsTravelMode.DRIVING
                },
                  { 'panel': document.getElementById('dir_panel') },
                    function (result, status) {
                        if (status === 'OK') {
                            var center = result.routes[0].bounds.getCenter();
                            $('#map_canvas').gmap('option', 'center', center);
                            $('#map_canvas').gmap('refresh');
                        } else {
                            fadingMsg("Too far from you, to get directions.");
                            getClubLocation();
                        }
                    });
   // }, function (error) {
     //   fadingMsg("Sorry, can't find you");
    //});
    // END: Tracking location with test lat/long coordinates
    $(this).removeClass($.mobile.activeBtnClass);
    return false;
});

$('#dir_panel').live("tap", function () {
    $.mobile.changePage($('#page-map'), {});
});

$('#page-dir').live("pageshow", function () {
    fadingMsg("Tap any instruction<br/>to see details on map");
});

// Gallery ENTRY scripts
//************************************************************************

$('#galleryEntry').live('pageshow', galleryEntryPageShow);

function galleryEntryPageShow(e, data) {

    //get data from service
    var xhr = new XMLHttpRequest();
    var responseText;
    var category = $('#galleryEntry').jqmData("data-category-id");
    xhr.open('GET', 'http://illusionsli.com/index.php?id=201&docid=' + category, true);
    xhr.onload = function () {
        responseText = xhr.responseText;
        if (!responseText)
            return;
        var xml = $.parseXML(responseText);
        var imageContainer = $('#galleryEntry').find($('#Gallery'));
        $(imageContainer).children().remove('li');
        if (!responseText) {
            return;
        }
        $('item', xml).each(function () {
            var item = $(this);
            $(imageContainer).append('<li><a href="' + item.find('image').text() + '" rel="external"><img src="' + item.find('thumb').text() +
             '" alt="" style="width:200px; height:200px; background: url(images/ajax-loader.gif) no-repeat center;" /></a></li>');
        });
        $('#Gallery a').photoSwipe();
    }
    try {
        xhr.send();
    }
    catch (e) {
    };

    //    var jsonTestString;
    //    if (category == 1) {
    //        jsonTestString = '{"imageList":[{"full":"images/gallery/full/001.jpg","thumb":"images/gallery/thumb/001.jpg", "alt":"pic1"},{"full":"images/gallery/full/002.jpg","thumb":"images/gallery/thumb/002.jpg", "alt":"pic2"}' +
    //               ',{"full":"images/gallery/full/003.jpg","thumb":"images/gallery/thumb/003.jpg", "alt":"pic3"},{"full":"images/gallery/full/004.jpg","thumb":"images/gallery/thumb/004.jpg", "alt":"pic4"},{"full":"images/gallery/full/005.jpg","thumb":"images/gallery/thumb/005.jpg", "alt":"pic5"}' +
    //              ',{"full":"images/gallery/full/006.jpg","thumb":"images/gallery/thumb/006.jpg", "alt":"pic6"},{"full":"images/gallery/full/007.jpg","thumb":"images/gallery/thumb/007.jpg", "alt":"pic7"},{"full":"images/gallery/full/008.jpg","thumb":"images/gallery/thumb/008.jpg", "alt":"pic8"}' +
    //              ',{"full":"images/gallery/full/009.jpg","thumb":"images/gallery/thumb/009.jpg", "alt":"pic9"},{"full":"images/gallery/full/010.jpg","thumb":"images/gallery/thumb/010.jpg", "alt":"pic10"},{"full":"images/gallery/full/011.jpg","thumb":"images/gallery/thumb/011.jpg", "alt":"pic11"}]}';
    //    }
    //    else {
    //        $(imageContainer).append('<li><p style="margin:10px;text-align:center;"> This gallery is empty.</p><li>');
    //        return true;
    //    }

    //var imageObjects = $.parseJSON(jsonTestString)["imageList"];
    //if (imageObjects != null && imageObjects.length > 0) {
    //    for (var i = 0; i < imageObjects.length; i++) {
    //        $(imageContainer).append('<li><a href="' + imageObjects[i].full + '" rel="external"><img src="' + imageObjects[i].thumb + '" alt="' + imageObjects[i].alt + '" /></a></li>');
    //    }

    //}
    return true;

}


// Gallery LIST scripts
//************************************************************************

$('#galleryList').live('pageshow', galleryListPageShow);

function galleryListPageShow() {
    if ($('#galleryList').find('ul').html() != '') {
        return;
    }
    //get data from service
    var xhr = new XMLHttpRequest();
    var responseText;
    xhr.open('GET', 'http://www.illusionsli.com/index.php?id=201&docid=203', true);
    xhr.onload = function () {
        responseText = xhr.responseText;
        if (!responseText)
            return;
        var xml = $.parseXML(responseText);
        var catListView = $(this).find($('#catList'));
        $(catListView).children().remove('li');
        $('item', xml).each(function () {
            var item = $(this);
            //var jsonTestString = '{"catList":[{"id":1, "Name": "Birthday party"},{"id":2, "Name":"New year party"},{"id":3, "Name":"Christmas party"}]}';
            //var catList = $.parseJSON(jsonTestString)["catList"];
            //for (var i = 0; i < catList.length; i++) {
            //$(catListView).append('<li><a href="#" data-category-id="' + item.find('id').text() + '">' + item.find('title').text() + '</a></li>');
            var img = $('<img src="images/blank.png" style="width:100%; height:70px; background: url(images/ajax-loader.gif) no-repeat center;"/>')
            .load(function () {
                var that = $(this), imgLoad = new Image();
                $(imgLoad).load(function () {
                    $(that).attr('src', $(this).attr('src'));
                }).attr('src', item.find('thumb').text())
            });
            var listItem = $('<li><a href="#" data-category-id="' + item.find('id').text() + '"><div style="text-align:center; float: left; width: 25%; height: 70px; border: 3px solid #c0c0c0; -webkit-border-radius: 3px; -moz-border-radius: 3px; -khtml-border-radius: 3px";></div><div style="display: inline-block; margin: 10px; width: 65%"><h6>'
             + item.find('title').text() + '</h6></div></a></li>');
            listItem.find('div:first').prepend(img);
            $(catListView).append(listItem);
            //}
        });
        $(catListView).listview("refresh");
        $(catListView).find($('li a')).each(function () {
            $(this).live("click", function () {
                var data_id = $(this).attr("data-category-id");
                if (data_id != null) {
                    $("#galleryEntry").jqmData('data-category-id', data_id);
                    $.mobile.changePage($("#galleryEntry"));
                }
            });
        });
    }
    try {
        xhr.send();
    }
    catch (e) {
    };
}

// Events list pages scripts
//************************************************************************

$('#homePage').live('pageshow', function (e, data) {
    $('#reserveCalee').text('#homePage');
});


$('#eventsList').live('pageshow', function (e, data) {
    var now = new Date();
    var lastLoaded = $('#eventsList').jqmData('loadTime');
    if (lastLoaded) {
        if ((now - lastLoaded) / 1000 % 60 < 60) {
            return;
        }
    }

    $('#eventsList').jqmData('loadTime', now);

    var eventListView = $(this).find($('#eventListView'));
    eventListView.children().remove('li');

    var xhr = new XMLHttpRequest();

    var responseText;
    xhr.open('GET', 'http://illusionsli.com/index.php?id=201&docid=186', true);

    xhr.onload = function () {
        responseText = xhr.responseText;
        if (!responseText)
            return;
        var xml = $.parseXML(responseText);
        $('item', xml).each(function () {
            var item = $(this);
            var img = $('<img src="images/blank.png" style="width:100%; height:70px; background: url(images/ajax-loader.gif) no-repeat center;"/>')
            .load(function () {
                var that = $(this), imgLoad = new Image();
                $(imgLoad).load(function () {
                    $(that).attr('src', $(this).attr('src'));
                }).attr('src', item.find('thumb').text())
            });
            var link = $('<a href="#"><div style="text-align:center; float: left; width: 25%; height: 70px; border: 3px solid #c0c0c0; -webkit-border-radius: 3px; -moz-border-radius: 3px; -khtml-border-radius: 3px";></div><div style="display: inline-block; margin: 10px; width: 65%"><h6>'
             + item.find('title').text() + '</h6></div></a>');
            link.find('div:first').prepend(img);
            link.bind("click", function () {
                $("#eventEntry").jqmData('event-xml-item', item);
                $.mobile.changePage($('#eventEntry'));
            });
            eventListView.append($('<li></li>').append($(link)));
            eventListView.listview("refresh");
        });
        //'<div style="float: left; width: 25%; height: 70px; background: url(images/ajax-loader.gif); background-position: 190px 660px; border: 3px solid #c0c0c0; -webkit-border-radius: 3px; -moz-border-radius: 3px; -khtml-border-radius: 3px;></div>'
        //$(that).css('background', 'url(' + $(this).attr('src') + ')');
    }

    try {
        xhr.send();
    }
    catch (e) {
        // here show error message.
    };

});

// Event ENTRY pages scripts
//************************************************************************

$('#eventEntry').live('pageshow', function (e, data) {
    xmlItem = $(this).jqmData('event-xml-item');
    var content = $(this).find('.content');
    content.find('h3').html(xmlItem.find('title').text());

    var that = $(content.find('img')), imgLoad = new Image();
    $(imgLoad).load(function () {
        $(that).attr('src', $(this).attr('src'));
    }).attr('src', xmlItem.find('image').text())

    content.find('p').html(xmlItem.find('introtext').text());

    content.find('#btnReserve').unbind("click");
    content.find('#btnReserve').bind("click", function () {
        //$("#reserve").jqmData('event-xml-item', xmlItem);
        $.mobile.changePage($('#reserve'));
    });
});

$('#eventEntry').live('pagehide', function (e, data) {
    $(this).find('img').attr('src', null);
    $(this).find('p').html('');
});

//$('#reserve').live('pageshow', function (e, data) {
//    xmlItem = $(this).jqmData('event-xml-item');
//    if (xmlItem) {
//        $('#mydate').val(xmlItem.date);
//        $('#time').val(xmlItem.time);
//        $(this).jqmData('event-xml-item', null);
//    }
//    else {
//        $('#mydate').val('');
//        $('#time').val('');
//    }
//});

// ABOUT US page scripts
//************************************************************************

$('#about').live('pageshow', function (e, data) {
    if ($('#about').find('div.content').html() == '') {

        var xhr = new XMLHttpRequest();
        var responseText;
        xhr.open('GET', 'http://illusionsli.com/index.php?id=205&docid=1', true);

        xhr.onload = function () {
            responseText = xhr.responseText;
            if (!responseText)
                return;
            var xml = $.parseXML(responseText);
            $('item', xml).each(function () {
                var item = $(this);
                var content = $(item.find('mobilecontent').text());
                var phone = $(content.find('span span')[1]);
                phone.html('<a href="tel:' + phone.text() + '">' + phone.text() + "</a>");
                $('#about').find('div.content').append(content);

            });
        }

        try {
            xhr.send();
        }
        catch (e) {
        };
    }
});

// CONTACT US page scripts
//************************************************************************

$('#contacts').live('pageshow', function (e, data) {
    if ($('#contacts').find('div.content').html() == '') {

        var xhr = new XMLHttpRequest();
        var responseText;
        xhr.open('GET', 'http://illusionsli.com/index.php?id=205&docid=175', true);

        xhr.onload = function () {
            responseText = xhr.responseText;
            if (!responseText)
                return;
            var xml = $.parseXML(responseText);
            $('item', xml).each(function () {
                var item = $(this);
                //$('#contacts').find('div.content').append(item.find('description').text());
                $('#contacts').find('div.content').append(item.find('mobilecontent').text());
            });
        }

        try {
            xhr.send();
        }
        catch (e) {
        };
    }
});