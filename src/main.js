"use strict";

var nombre = "David";
var travelMode;

// app ready 
window.addEventListener("load", function () {
	console.log('Hello World');
	initializeMD();
});

// custom google load map function
google.maps.event.addDomListener(window, "load", function () {

	var user_location = new UserLocation(function () {

		console.log("Located");
		console.log(user_location);
		console.log('Map Ready');

		travelMode = document.getElementById('travel-mode').value;

		if (travelMode == "0") {

			document.getElementById('travel-mode').addEventListener("change", function (ev) {
				document.getElementById('travel-screen').style.display = "none";
				travelMode = ev.target.value;
			});
		} else {
			document.getElementById('travel-screen').style.display = 'none';
		}

		// default map options
		var mapOptions = {
			zoom: 6,
			center: {
				lat: user_location.latitude,
				lng: user_location.longitude
			}
		};

		// map with default values
		var map_element = document.getElementById('map');
		var map = new google.maps.Map(map_element, mapOptions);

		// autocomplete element
		var search_input = document.getElementById('search-place');
		var autocomplete = new google.maps.places.Autocomplete(search_input);

		// create a marker
		var marker = new google.maps.Marker({
			map: map
		});

		// bind autocomplete to map
		autocomplete.bindTo("bounds", map);

		// event to sync to map
		google.maps.event.addListener(autocomplete, "place_changed", function () {
			console.log('Place Changed');
			// get new place
			var place = autocomplete.getPlace();
			console.log(place);
			if (place.geometry.viewport) {
				// geometry -> place info
				map.fitBounds(place.geometry.viewport);
				// recenter map and place the right zoom
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(15);
			}

			// changing the marker to the new place
			marker.setPlace({
				placeId: place.place_id,
				location: place.geometry.location
			});

			marker.setVisible(true);

			// calculate distnncia
			calculateDistance(place, user_location);
		});
	});
});

function calculateDistance(place, orig) {
	// origin is the current position under Lat/Lng
	var origin = new google.maps.LatLng(orig.latitude, orig.longitude);
	var service = new google.maps.DistanceMatrixService();

	service.getDistanceMatrix({
		// config json
		origins: [origin],
		destinations: [place.geometry.location],
		travelMode: google.maps.TravelMode[travelMode]
	}, function (res, status) {
		console.log(res);
		// executed when the distance service responses
		var info = res.rows[0].elements[0];
		// array bcause could be multiple origins and destinations
		console.log(info);

		// grabbing the distance
		var distance = info.distance.text;
		// grabbing the duration
		var duration = info.duration.text;

		document.getElementById('info').innerHTML = "\n\t\t\tYour distance is " + distance + " and estimated time travel is " + duration;
	});
}

function initializeMD() {
	$('select').formSelect();
}
