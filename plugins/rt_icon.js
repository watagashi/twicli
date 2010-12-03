if (!display_as_rt) registerPlugin({
	newMessageElement: function (el, tw) {
		if (display_as_rt || !tw.retweeted_status) return;

		var uicon = document.createElement("img");
		uicon.className = "uicon";
		uicon.style.cssFloat = "none";
		uicon.style.height = "1em";
		uicon.style.width = "1em";
		uicon.src = tw.user.profile_image_url;

		var spans = el.getElementsByTagName("span");
		for ( var i = 0; i<spans.length; i++)
			if (spans[i].className == "utils" ) {
				spans[i].insertBefore(uicon, spans[i].getElementsByTagName("a")[0]);
				break;
			}
	}
});
