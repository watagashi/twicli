function link(link) {
	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);
	var url = link.href;

	$('rep').style.display = "block";
	$('reps').innerHTML = '<div id="innerlinkUrl"><a href="' + url 
		+ '">' + url + '</a></div><iframe id="innerlink" src="' + url
		+ '" style="width:100%; height: 350px; display:block">'
	$('rep').style.top = rep_top;
	user_pick1 = user_pick2 = null;
	return false;
}
