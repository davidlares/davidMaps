const nombre = "David";
var travelMode;

// app ready 
window.addEventListener("load", () => {
	console.log('Hello World');
	initializeMD();
});

// custom google load map function
google.maps.event.addDomListener(window,"load", () => {
	
	const user_location = new UserLocation(() => {

		console.log("Located");
		console.log(user_location);
		console.log('Map Ready');

		travelMode = document.getElementById('travel-mode').value;
			
		if(travelMode == "0") {

			document.getElementById('travel-mode').addEventListener("change", (ev) => {
				document.getElementById('travel-screen').style.display = "none";
				travelMode = ev.target.value;
			});
		
		} else {
			document.getElementById('travel-screen').style.display = 'none';
		}
	
		// default map options
		const mapOptions = {
			zoom: 6,
			center: {
				lat: user_location.latitude,
				lng: user_location.longitude
			}
		};

		// map with default values
		const map_element = document.getElementById('map');
		const map = new google.maps.Map(map_element,mapOptions);	
		
		// autocomplete element
		const search_input = document.getElementById('search-place');
		const autocomplete = new google.maps.places.Autocomplete(search_input)

		// create a marker
		const marker = new google.maps.Marker({
			map: map,
		});

		// bind autocomplete to map
		autocomplete.bindTo("bounds",map);

		// event to sync to map
		google.maps.event.addListener(autocomplete,"place_changed", () => {
			console.log('Place Changed'); 
			// get new place
			const place = autocomplete.getPlace();
			console.log(place);
			if(place.geometry.viewport){
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
			})

			marker.setVisible(true);

			// calculate distnncia
			calculateDistance(place,user_location)
		});

	});

});

function calculateDistance(place,orig){
	// origin is the current position under Lat/Lng
	var origin = new google.maps.LatLng(orig.latitude,orig.longitude);
	var service = new google.maps.DistanceMatrixService();

	service.getDistanceMatrix({
		// config json
		origins: [origin], 
		destinations: [place.geometry.location],
		travelMode: google.maps.TravelMode[travelMode]
	}, (res,status) => {
		console.log(res);
		// executed when the distance service responses
		const info = res.rows[0].elements[0];
		// array bcause could be multiple origins and destinations
		console.log(info)

		// grabbing the distance
		const distance = info.distance.text;
		// grabbing the duration
		const duration = info.duration.text;
	
		document.getElementById('info').innerHTML = `
			Your distance is ${distance} and estimated time travel is ${duration}`
	});
}

function initializeMD(){
	$('select').formSelect();
}

