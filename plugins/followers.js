var followers_limit = 200;
var followers_ids_list = (readCookie('followers_ids') || '');
var followers_idx = 0, followers_ids_slice;
while(true) {
	followers_ids_slice = readCookie('followers_ids' + (followers_idx++)||'')
	if(!followers_ids_slice) break;
	followers_ids_list = followers_ids_list.concat(followers_ids_slice);
}
followers_ids_list = followers_ids_list != '' ? followers_ids_list.split(',') : [];
var followers_ids = [];
for (var i = 0; i < followers_ids_list.length; i++)
	followers_ids[followers_ids_list[i]] = 1;

registerPlugin({
	miscTab: function(ele) {
		var e = document.createElement("div");
		e.innerHTML = '<form onSubmit="twfcFollwersIDsRenew(); return false;">Color followers: <span id="followers_status">'+(followers_ids_list.length?"on("+followers_ids_list.length+")":"off")+'</span> <input type="submit" value="Renew"><input type="button" onClick="twfcFollwersIDsClear()" value="Off"> <a href="javascript:alert(\'Status Coloring:\\n  follower: black  non-follower: blue\')">[?]</a></form>';
		ele.appendChild(e);
		var hr = document.createElement("hr");
		hr.className = "spacer";
		ele.appendChild(hr);
	},
	newMessageElement: function(ele, tw) {
		if (followers_ids_list.length && myid != tw.user.id && !followers_ids[tw.user.id])
			for (var i = 0; i  < ele.childNodes.length; i++)
				if (ele.childNodes[i].className == "status")
					ele.childNodes[i].className += " non-follower";
	}
});

function twfcFollwersIDsClear() {
	followers_ids_list = followers_ids = [];
	var status = document.getElementById("followers_status");
	if (status) status.innerHTML = "off";
	deleteCookie('followers_ids');

	var followers_idx = 0, followers_ids_slice;
	while(true) {
		followers_ids_slice = readCookie('followers_ids' + followers_idx||'')
		if(!followers_ids_slice) break;
		deleteCookie('followers_ids' + (followers_idx++));
	}
}
function twfcFollwersIDsRenew() {
	$("loading").style.display = "block";
	var status = document.getElementById("followers_status");
	if (status) status.innerHTML = "loading...";
	xds.load(twitterAPI + 'followers/ids.json', twfcRenew);
}
function twfcRenew(list) {
	followers_ids_list = list;
	followers_ids = [];
	var begin = 0, end = followers_limit;
	var followers_idx = 0;
	for (var i = 0; i < list.length; i++) {
		followers_ids[list[i]] = 1;
		if(end < i) {
			writeCookie('followers_ids' + (followers_idx++), list.slice(begin, end).join(","), 3652);
			begin = end;
			end += followers_limit;
		}
	}
	writeCookie('followers_ids' + (followers_idx++), list.slice(begin).join(","), 3652);
	writeCookie('followers_ids', list.join(","), 3652);
	var status = document.getElementById("followers_status");
	if (status) status.innerHTML = "on (" + list.length + ")";
	$("loading").style.display = "none";
}
