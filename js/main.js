function getDateString(d) {
    var day = d.getDate(),
        month = d.getMonth() + 1, // Months are zero based
        year = d.getFullYear();

    if (month < 10) {
        month = "0" + month;
    }
    return year + "" + month + "" + day;
}

function getTide() {

    var td = new Date(),
        yd = new Date(),
        today = '',
        yesterday = '';

    yd.setDate(td.getDate() - 1);

    today = getDateString(td);
    yesterday = getDateString(yd);

    var url = "http://www.corsproxy.com/tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&begin_date=" + yesterday + "&end_date=" + today + "&datum=MLLW&station=8638610&time_zone=GMT&units=english&format=json";

    $.getJSON(url, function (data) {
        tidalData = [];
        _.each(data.data, function (data) {
            // round data and add to tidalData array.
            tidalData.push(roundHalf(data.v));
        });
        updateTidalText(tidalData[tidalData.length - 1]);
    });
}

function updateTidalText(ft) {
    $('#tidal_value').text(ft);
}

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

function updateTime(value) {

    var ctvIndex = tidalData.length - value,
        minutesAgo = (240 - value) * 6,
        hours = 0,
        minutes = 0;

    if (ctvIndex > 0) {
        curTidalVal = tidalData[ctvIndex];
    } else {
        curTidalVal = "n/a";
    }

    hours = Math.floor(minutesAgo / 60);
    minutes = minutesAgo % 60;
    hPlural = hours == 1 ? '' : 's';
    mPlural = minutes == 1 ? '' : 's';

    $('#time').text(hours + ' hour' + hPlural + ' and ' + minutes + ' minute' + mPlural + ' ago');
    $('#tidal_value').text(curTidalVal);
}

function showControls() {
    var t = document.getElementById("title");
    var c = document.getElementById("controlContainer");
    if (c.className == "control-container") {
        t.className = "title expand";
        c.className = "control-container hide";
    } else {
        t.className = "title contract";
        c.className = "control-container";
    }
}

//Identifying Dynamic Map Service Features
// map.on("click", function (e) {
//     dynLayer.identify(e.latlng, function (data) {
//         console.log(data);
//         if (data.results.length > 0) {
//             //Popup text should be in html format.  Showing the Storm Name with the type
//             popupText = "<b>" + (data.results[0].attributes.EVENTID || data.results[0].attributes.NAME) + "<b>";
//
//             //Add Popup to the map when the mouse was clicked at
//             var popup = L.popup()
//                 .setLatLng(e.latlng)
//                 .setContent(popupText)
//                 .openOn(map);
//         }
//     });
// });

 //Slider
function updateLayer(value) {
    //mapquest.setOpacity(value);
    console.log(value);

    // if there's a current layer, remove it.
    if (dynLayer) {
        map.removeLayer(dynLayer);
    }

    if (!layerCache[value]) {
        layerCache[value] = L.esri.dynamicMapLayer("http://orfmaps.norfolk.gov/orfgis/rest/services/TITAN/TITAN_FDG_20140528/MapServer/", {
            opacity: 0.5,
            layers: [0, 1, value]
        });
    }
    dynLayer = layerCache[value];

    map.addLayer(dynLayer);
    console.log(map);
    $("#size").text((value) / 2 + " feet");
}

 //find me
function onLocationFound(e) {
    var radius = e.accuracy / 2;
    console.log(e.latlng);
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

var map = null,
    dynLayer = null,
    layerCache = {},
    tidalData = getTide();

$(function () {

    map = L.map('map').setView([36.86, -76.3], 12);

    //Add Oceans Basemaps.
    L.esri.basemapLayer("ImageryLabels").addTo(map);
    L.esri.basemapLayer("Imagery").addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    // map.locate({
    //     setView: true,
    //     maxZoom: 16
    // });

    updateLayer(20);

    $('#depth_slider').on('change', function () {
        updateLayer($(this).val());
    });

    $('#time_slider').on('change', function () {
        updateTime($(this).val());
    });
});
