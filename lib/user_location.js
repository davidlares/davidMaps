class UserLocation {
	
	constructor(callback) {
		// Geolocation -> Navigator (native API HTML)
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((geo) => {
				this.latitude = geo.coords.latitude
				this.longitude = geo.coords.longitude
				callback()
			});
		} else {
			alert("Your browser does not supports");
		}
	}
}
