langResources["Open in twicli?\n(If you select 'Cancel', open new window.)"] =	["twicli の中で開きますか?\n([キャンセル] を選べば新しいウィンドウで開きます。)"];

function link(link) {
	var url = link.href;
	var gwt = "http://www.google.com/gwt/x?u=";
	var win_h = window.innerHeight || document.documentElement.clientHeight;

	for(var i=0; i<denyIframe.length; i++)
		if(denyIframe[i].test(url)) return true;

	if(!confirm(_("Open in twicli?\n(If you select 'Cancel', open new window.)")))
		return true;

	user_pick1 = user_pick2 = null;

	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);

	$('reps').innerHTML = '<div id="innerlinkUrl"><a target="_blank" href="'
		+ url + '">' + url + '</a></div><iframe id="innerlink" src="' + gwt
		+ encodeURIComponent(url)
		+ '" style="border:0; width:100%; height:'+Math.ceil(win_h*0.5)
		+'px; display:block; background-color:Window;">';
	$('rep').style.top = rep_top;
	$('rep').style.display = "block";
	scrollToDiv($('rep'));

	return false;
}

var denyIframe = [];

(function(){
	var s = document.createElement("script");
	s.src = "https://raw.github.com/gist/636424/deny_iframe.js";
	s.type = "text/javascript";
	document.body.appendChild(s);
}());
