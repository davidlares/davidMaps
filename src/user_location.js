"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserLocation = function UserLocation(callback) {
	var _this = this;

	_classCallCheck(this, UserLocation);

	// Geolocation -> Navigator (native API HTML)
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (geo) {
			_this.latitude = geo.coords.latitude;
			_this.longitude = geo.coords.longitude;
			callback();
		});
	} else {
		alert("Your browser does not supports");
	}
};
