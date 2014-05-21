norfolk_flood_maps
==================

Norfolk GIS Flood data

Norfolk Flood Maps Data Layers
---
ArcGIS 10.0
http://gisapp1.norfolk.gov/ArcGIS/rest/services
http://giswebapp1/ArcGIS/rest/services/Norfolk_Tide_Gauge_Map/MapServer


These maps are precalculated from collected city data over a three year span.

some information on layers

- All layers are rendered by server
- Rounded up to .5 foot
- Should be accessible by any map layer on the web ex (leaflet, esri-js,google maps)
- see example in repo(coming)  



http://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20140516&end_date=20140517&datum=MLLW&station=8638610&time_zone=GMT&units=english&interval=&format=json

```
predictions: [
{
t: "2014-05-16 00:00", // time
v: "1.946" //predicted height in feet
},
...
]
```


High tide prediction in relation to time
- http://tidesandcurrents.noaa.gov/waterlevels.html?id=8638610
- http://tidesandcurrents.noaa.gov/api/
- http://www.nws.noaa.gov/mdl/etsurge/index.php?page=stn&region=me&type=both&stn=vahamp


Map Samples
---
orf.maps.arcgis.com

user: codeforamerica
pass: codeforamerica

http://orf.maps.arcgis.com/home/gallery.html#c=organization&o=numviews

find the different maps


Tide Gauge Map
http://bit.ly/1mhIR2B

APIs
---
ArcGis JS - https://developers.arcgis.com/javascript/jshelp/whats_new.html
Leaflet/Esri - https://github.com/esri/esri-leaflet

Flood Map Examples
---
http://flood.firetree.net/?ll=43.3251,-101.6015&z=13&m=7
