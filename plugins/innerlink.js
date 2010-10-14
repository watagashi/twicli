function link(link) {
	var denyIframe = [
		/^https?:\/\/(www\.)?twitter\.com\b/,
		/^http:\/\/(www\.)?ustream\.tv\b/, /^http:\/\/ustre\.am\b/,
		/^http:\/\/blogs\.msdn\.com\/b\/ie\b/
	];
	var url = link.href;

	for(var i=0; i<denyIframe.length; i++)
		if(denyIframe[i].test(url)) return true;

	if(!confirm("Open in twicli?\n(If you select 'Cancel', open new window.)"))
		return true;

	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);

	$('rep').style.display = "block";
	$('reps').innerHTML = '<div id="innerlinkUrl"><a target="_blank" href="'
		+ url + '">' + url + '</a></div><iframe id="innerlink" src="' + url
		+ '" style="width:100%; height: 350px; display:block; background-color:Window;">'
	$('rep').style.top = rep_top;
	user_pick1 = user_pick2 = null;
	return false;
}
