function link(link) {
	var url = link.href;

	for(var i=0; i<denyIframe.length; i++)
		if(denyIframe[i].test(url)) return true;

	if(!confirm("Open in twicli?\n(If you select 'Cancel', open new window.)"))
		return true;

	user_pick1 = user_pick2 = null;

	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);

	$('reps').innerHTML = '<div id="innerlinkUrl"><a target="_blank" href="'
		+ url + '">' + url + '</a></div><iframe id="innerlink" src="' + url
		+ '" style="width:100%; height: 350px; display:block; background-color:Window;">'
	$('rep').style.top = rep_top;
	$('rep').style.display = "block";

	return false;
}

var denyIframe = [];

(function(){
	var s = document.createElement("script");
	s.src = "http://gist.github.com/636424.txt";
	s.type = "text/javascript";
	document.body.appendChild(s);
}());
