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
    navigator.geolocation.watchPosition(function (position) {
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
    }, function (error) {
        fadingMsg("Sorry, can't find you");
    });
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
    var imageContainer = $('#galleryEntry').find($('#Gallery'));
    $(imageContainer).children().remove('li');
    var category = $(this).jqmData("data-category-id");
    //get data from service
    var jsonTestString;
    if (category == 1) {
        jsonTestString = '{"imageList":[{"full":"images/gallery/full/001.jpg","thumb":"images/gallery/thumb/001.jpg", "alt":"pic1"},{"full":"images/gallery/full/002.jpg","thumb":"images/gallery/thumb/002.jpg", "alt":"pic2"}' +
               ',{"full":"images/gallery/full/003.jpg","thumb":"images/gallery/thumb/003.jpg", "alt":"pic3"},{"full":"images/gallery/full/004.jpg","thumb":"images/gallery/thumb/004.jpg", "alt":"pic4"},{"full":"images/gallery/full/005.jpg","thumb":"images/gallery/thumb/005.jpg", "alt":"pic5"}' +
              ',{"full":"images/gallery/full/006.jpg","thumb":"images/gallery/thumb/006.jpg", "alt":"pic6"},{"full":"images/gallery/full/007.jpg","thumb":"images/gallery/thumb/007.jpg", "alt":"pic7"},{"full":"images/gallery/full/008.jpg","thumb":"images/gallery/thumb/008.jpg", "alt":"pic8"}' +
              ',{"full":"images/gallery/full/009.jpg","thumb":"images/gallery/thumb/009.jpg", "alt":"pic9"},{"full":"images/gallery/full/010.jpg","thumb":"images/gallery/thumb/010.jpg", "alt":"pic10"},{"full":"images/gallery/full/011.jpg","thumb":"images/gallery/thumb/011.jpg", "alt":"pic11"}]}';
    }
    else {
        $(imageContainer).append('<li><p> This gallery is empty.</p><li>');
        return true;
    }

    var imageObjects = $.parseJSON(jsonTestString)["imageList"];
    if (imageObjects != null && imageObjects.length > 0) {
        for (var i = 0; i < imageObjects.length; i++) {
            $(imageContainer).append('<li><a href="' + imageObjects[i].full + '" rel="external"><img src="' + imageObjects[i].thumb + '" alt="' + imageObjects[i].alt + '" /></a></li>');
        }
        $('#Gallery a').photoSwipe();
    }

    return true;

}


// Gallery LIST scripts
//************************************************************************

$('#galleryList').live('pageshow', galleryListPageShow);



function galleryListPageShow() {
    //get data from service
    var jsonTestString = '{"catList":[{"id":1, "Name": "Birthday party"},{"id":2, "Name":"New year party"},{"id":3, "Name":"Christmas party"}]}';
    var catList = $.parseJSON(jsonTestString)["catList"];
    var catListView = $(this).find($('#catList'));
    $(catListView).children().remove('li');
    for (var i = 0; i < catList.length; i++) {
        $(catListView).append('<li><a href="#" data-category-id="' + catList[i].id + '">' + catList[i].Name + '</a></li>');
    }
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

// Events pages scripts
//************************************************************************

$('#homePage').live('pageshow', function (e, data) {
    $('#reserveCalee').text('#homePage');
});

$('#events').live('pageshow', function (e, data) {
    $('#reserveCalee').text('#events');
});

$('#reserve').live('pageshow', function (e, data) {
    var eventData = $('#eventDate', data.prevPage).text();
    var eventTime = $('#eventTime', data.prevPage).text();
    $('#mydate').val(eventData);
    $('#time').val(eventTime);
});
