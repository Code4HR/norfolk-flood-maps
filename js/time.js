console.log(Date.now());
function getTide(){
  var url = "http://www.corsproxy.com/tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&begin_date=20140525&end_date=20140525&datum=MLLW&station=8638610&time_zone=GMT&units=english&format=json";
$.getJSON( url, function( data ) {
  // var items = [];
  // $.each( data, function( key, val ) {
  //   items.push( "<li id='" + key + "'>" + val + "</li>" );
  // });
  //
  // $( "<ul/>", {
  //   "class": "my-new-list",
  //   html: items.join( "" )
  // }).appendTo( "body" );
  console.log(data);
  time=data;
  });
}
var time =getTide();
