function getTide(){
var d = new Date();
   var curr_date = d.getDate();
   var curr_month = d.getMonth() + 1; //Months are zero based
   if(curr_month<10){
    curr_month ="0"+curr_month;
   }
   var curr_year = d.getFullYear();
   var today = curr_year + "" + curr_month +""+ curr_date;
console.log(today);
  var url = "http://www.corsproxy.com/tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&begin_date="+today+"&end_date="+today+"&datum=MLLW&station=8638610&time_zone=GMT&units=english&format=json";
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
