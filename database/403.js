var locations = []
var lat;
var longi;
function geo()
{ 
    function showLocation(position)
    {
	var lat= position.coords.latitude;
	var longi = position.coords.longitude;
    }
    function errorHandler(error)
    {
	console.log('Geolocation error : code '+ error.code +' - '+ error.message); 
	alert('Une erreur est survenue durant la géolocalisation. Veuillez réessayer plus tard ou contacter le support.');
    }
    if(navigator.geolocation)
    {
    
	navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
    }
    else
    {
	alert('Votre navigateur ne prend malheureusement pas en charge la géolocalisation.');
    }
}
var adresse = "france "
var geocoder = new google.maps.Geocoder();
geocoder.geocode({'address': adresse}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		var loc = results[0].geometry.location;
		lat = loc.k;
		longi = loc.D;
		 map.setCenter(loc);
		   // var marker = new google.maps.Marker({ map: map, position: loc});
		    if (results[0].geometry.viewport) 
			map.fitBounds(results[0].geometry.viewport);
		}
		});

function poup (){
    var getout = function(type){
	$.ajax({
	    url : "api.php",
	    type : "GET",
	    ContentType: 'application/json',
	    data : 'type='+'gas'+'&lat='+lat+"&long="+longi+'&rad=0.1',
	    success:function(data){console.log(data);},
	    error:function(jqxhr, status, msg){console.log(msg); console.log(status)}
	})
    }
    getout();
}
function textbout()
{
	if ($('#gas').val() == 1)
		$('#gas').text ="-";
	else
		$('#gas').text ="+";
	if($('#electric').val() == 1)
		$('#electric').text ="-";
	else
		$("#electric").text = '+';
}



$('refresh').click(function(){
		var ville = $('#ville').val()
		if ( $('gas').val() == 1 )
		{
		getout('gas');
		textbout();
		}
		if ( $('electric').val() == 1 )
		{ 
		getout('electric');
		textbout();
		}
		})

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(47.4,1.6),
    mapTypeControl: true,
    mapTypeControlOptions: {
	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
},
navigationControl: true,
navigationControlOptions: {
style: google.maps.NavigationControlStyle.SMALL,
position: google.maps.ControlPosition.TOP_RIGHT
},
scaleControl: true,
streetViewControl: false,
mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;


for (i = 0; i < locations.length; i++) {
	marker = new google.maps.Marker({
position: new google.maps.LatLng(locations[i][1], locations[i][2]),
map: map
});

google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
			}
			})(marker, i));
}
