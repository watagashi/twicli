registerPlugin({
	init: function() {
		if(!navigator.geolocation) {
			try {
				navigator.geolocation = google.gears.factory.create("beta.geolocation");
			} catch(e) {
				// Not found Gears.
			}
		}
	}
});

if(!navigator.geolocation) {
	var gearsInit = document.createElement("script");
	gearsInit.src = "http://code.google.com/intl/ja/apis/gears/gears_init.js";
	gearsInit.type = "text/javascript";
	document.body.appendChild(gearsInit);
}

