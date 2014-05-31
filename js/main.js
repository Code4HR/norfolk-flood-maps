function getTide() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    var curr_year = d.getFullYear();
    var today = curr_year + "" + curr_month + "" + curr_date;
    console.log(today);
    var url = "http://www.corsproxy.com/tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&begin_date=" + today + "&end_date=" + today + "&datum=MLLW&station=8638610&time_zone=GMT&units=english&format=json";
    $.getJSON(url, function (data) {
        var time = [];
        _.each(data.data, function (data) {
            //round the data
            time.push(roundHalf(data.v));
            //push it
            //add as slider lookup
        });
        console.log(time);
    });
}

function roundHalf(num) {
    num = Math.round(num * 2) / 2;
    return num;
}

function updateTime(value) {
    var d = new Date();
    $("otherSlide").val(d.getMinutes() / 6);
    var minutes = value;
    var hours = Math.floor(minutes / 60);
    $("#time").text(Date.now());
    // console.log(minutes);
    // console.log(hours);
    // console.log(hours + ""+minutes);
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
    time = getTide();

$(function () {

    map = L.map('map').setView([36.86, -76.3], 12);

    //Add Oceans Basemaps.
    L.esri.basemapLayer("ImageryLabels").addTo(map);
    L.esri.basemapLayer("Imagery").addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate({
        setView: true,
        maxZoom: 16
    });

    updateLayer(20);
});
