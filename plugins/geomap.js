function makeHTML(tw, no_name, pid) {
	var rt = tw.retweeted_status;
	var rs = tw.retweeted_status || tw;
	var rt_mode = !!(display_as_rt || fav_mode == 2 || fav_mode == 3);
	var t = rt_mode ? tw : rs;
	var text = t.text;
	var un = t.user.screen_name;
	if (display_as_rt || fav_mode == 2 || fav_mode == 3)
		text = rt && rt.user ? "RT @" + rt.user.screen_name + ":" + rt.text : tw.text;
	var id = tw.id_str || tw.id;
	var id2 = t.id_str || t.id;
	var eid = pid+'-'+id;
	var in_reply_to = t.in_reply_to_status_id_str || t.in_reply_to_status_id;
	return /*fav*/ (t.d_dir ? '' : '<img alt="☆" class="fav" src="http://assets3.twitter.com/images/icon_star_'+(!rt&&rs.favorited?'full':'empty')+'.gif" ' +
			'onClick="fav(this,\'' + id + '\')"' + (pid ? ' id="fav-'+eid+'"' : '') + '>')+
		 (!no_name || (!display_as_rt && rt) ?
			//ユーザアイコン
			(t.user.url ? '<a target="_blank" href="'+t.user.url+'" onclick="return link(this);">' : '') +
			'<img class="uicon" src="' + t.user.profile_image_url + '">' + (t.user.url ? '</a>' : '') +
			//名前
			'<a href="' + twitterURL + un + '" onClick="switchUserTL(this.parentNode,'+rt_mode+');return false"><span class="uid">' + un + '</span>' +
			 /*プロフィールの名前*/ (t.user.name!=un ? '<span class="uname">('+insertPDF(t.user.name)+')</span>' : '') + '</a>'
		: '') +
		 /* verified? */ (!no_name && t.user.verified ? '<img alt="verified" id="verified-' + eid + '" class="verified" src="images/verified.png">' : '') +
		 /* protected? */ (t.user.protected ? '<img alt="lock" id="lock-' + eid + '" class="lock" src="http://assets0.twitter.com/images/icon_lock.gif">' : '') +
		/*ダイレクトメッセージの方向*/ (t.d_dir == 1 ? '<span class="dir">→</span> ' : t.d_dir == 2 ? '<span class="dir">←</span> ' : '') +
		//本文 (https〜をリンクに置換 + @を本家リンク+JavaScriptに置換)
		" <span id=\"text-" + eid + "\" class=\"status\">" +
		text.replace(/https?:\/\/[^\/\s]*[\w!#$%&'()*+,.\/:;=?@~-]+(?=&\w+;)|https?:\/\/[^\/\s]*[\w!#$%&'()*+,.\/:;=?@~-]+|[@＠]([\/\w-]+)|(\W|_|^)([#＃])(\w+)(?=\W|$)/g, function(_,u,t,h,s){
				if (!u && !h) {
					var paren = '';
					if (_.substr(_.length-1) == ')') { // 末尾の")"はURLに含めない
						_ = _.substr(0, _.length-1);
						paren = ')';
					}
					return "<a class=\"link\" target=\"_blank\" href=\""+_+"\" onclick=\"return link(this);\">"+_+"</a>"+paren;
				}
				if (h == "#" || h == "＃") {
					if (s.match(/^\d+$/)) return _;
					return t+"<a target=\"_blank\" class=\"hashtag\" title=\"#"+s+"\" href=\"http://search.twitter.com/search?q="+encodeURIComponent("#"+s)+"\">"+h+s+"</a>";
				}
				if (u.indexOf('/') > 0) return "<a target=\"_blank\" href=\""+twitterURL+u+"\" onclick=\"return link(this);\">"+_+"</a>";
				return "<a href=\""+twitterURL+u+"\" onClick=\"switchUser('"+u+"'); return false;\" >"+_+"</a>";
			}).replace(/\r?\n|\r/g, "<br>") + '</span>' +
		//Retweet情報
		' <span id="rtinfo-'+eid+'" class="rtinfo">' +
		(!display_as_rt && rt ? "<img src=\"images/rt.png\" alt=\"RT\">by <img src=\""+tw.user.profile_image_url+"\" alt=\""+tw.user.screen_name+"\" class=\"rtuicon\"><a href=\""+twitterURL+tw.user.screen_name+"\" onclick=\"switchUserTL(this.parentNode.parentNode, true);return false\">" + tw.user.screen_name + "</a> " :'') + '</span>' +
		//日付
		' <span id="utils-'+eid+'" class="utils">' +
		'<span class="prop"><a class="date" target="twitter" href="'+twitterURL+(t.d_dir ? '#!/messages' : un+'/statuses/'+id2)+'">' + dateFmt(t.created_at) + '</a>' +
		//クライアント
		(t.source ? '<span class="separator"> / </span><span class="source">' + t.source.replace(/<a /,'<a target="twitter"') + '</span>' : '') + '</span>' +
		//Geolocation
		(rs.geo && rs.geo.type == 'Point' ? '<a class="button geomap" id="geomap-' + eid + '" target="_blank" href="http://maps.google.com?q=' + rs.geo.coordinates.join(',') + '" onclick="return link(this);"><img src="images/marker.png" alt="geolocation" title="' + rs.geo.coordinates.join(',') + '"></a>' : '') +
		(!rs.geo && rs.place ? '<a class="button placemap" id="geomap-' + eid + '" target="_blank" href="http://maps.google.com?q=' + encodeURIComponent(rs.place.full_name) + '" onclick="return link(this);"><img src="images/marker.png" alt="geolocation" title="' + rs.place.full_name.replace(/'/g,"&apos;") + '"></a>' : '') +
		//返信先を設定
		' <a class="button reply" href="javascript:replyTo(\'' + un + "','" + id2 + '\')"><img src="images/reply.png" alt="↩" width="14" height="14"></a>' +
		//返信元へのリンク
		(in_reply_to ? ' <a class="button inrep" href="#" onClick="dispReply(\'' + un + '\',\'' + in_reply_to + '\',this); return false;"><img src="images/inrep.png" alt="☞" width="14" height="14"></a>' : '') +
		//popupメニュー表示
		'&nbsp;&nbsp;&nbsp;<a class="button popup" href="#" onClick="popup_menu(\'' + un + "','" + id2 + '\', this); return false;"><small><small>▼</small></small></a>' +
		'</span><div class="dummy"></div>';
}

registerPlugin({
	newMessageElement: function(elem, tw) {
		var rs = tw.retweeted_status || tw;
		if (!rs.geo || rs.geo.type != 'Point') return;
		
		var geomap = null; // find "geomap" in elem
		for (var i = 0; i < elem.childNodes.length; i++) {
			var util = elem.childNodes[i];
			if (util.className != "utils") continue;
			for (var j = 0; j < util.childNodes.length; j++) {
				var uc = util.childNodes[j];
				if (uc.className == 'button geomap') {
					geomap = uc;
					break;
				}
			}
		}
		if (!geomap) return alert("geomap not found!!");
		
		geomap.onclick = function() {
			display_map(rs.geo.coordinates, geomap);
			return false;
		};
	}
});

function display_map(coordinates, elem) {
	rep_top = Math.max(cumulativeOffset(elem)[1] + 20, $("control").offsetHeight);
	var win_h = window.innerHeight || document.documentElement.clientHeight;
	$('reps').innerHTML = '<div id="map_canvas" style="width: 100%; height: '+Math.ceil(win_h*0.67)+'px;">';
	$('rep').style.top = rep_top;
	$('rep').style.display = "block";
	make_geo_map(coordinates);
	scrollToDiv($('rep'));
	user_pick1 = user_pick2 = null;
}

function make_geo_map(coordinates) {
	var latlng = new google.maps.LatLng(coordinates[0], coordinates[1]);
	var map = new google.maps.Map(document.getElementById("map_canvas"),
		{zoom: 13, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP});
	var marker = new google.maps.Marker({position: latlng, map: map});

	if (coordinates[2]) {
		mapAccCircleOption.radius = coordinates.pop();
		var accCircle = new google.maps.Circle(mapAccCircleOption);
		accCircle.setCenter(latlng);
		accCircle.setMap(map);
	}

	google.maps.event.addListener(marker, 'click', function(event) {
		window.open('http://maps.google.com?q='+coordinates.join(","));
	});
}

var mapAccCircleOption = {
	fillColor:      '#f37171',
	fillOpacity:    0.3,
	strokeColor:    '#f37171',
	strokeOpacity:  0.7,
	strokeWeight:   4
};

registerPlugin({
	newMessageElement: function(elem, tw) {
		var rs = tw.retweeted_status || tw;
		if (!rs.place || rs.geo) return;
		
		var geomap = null; // find "geomap" in elem
		for (var i = 0; i < elem.childNodes.length; i++) {
			var util = elem.childNodes[i];
			if (util.className != "utils") continue;
			for (var j = 0; j < util.childNodes.length; j++) {
				var uc = util.childNodes[j];
				if (uc.className == 'button placemap') {
					geomap = uc;
					break;
				}
			}
		}
		if (!geomap) return alert("placemap not found!!");
		
		geomap.onclick = function() {
			display_placemap(rs.place, geomap);
			return false;
		};
	}
});

function display_placemap(place, elem) {
	rep_top = Math.max(cumulativeOffset(elem)[1] + 20, $("control").offsetHeight);
	var win_h = window.innerHeight || document.documentElement.clientHeight;
	$('reps').innerHTML = '<div id="map_canvas" style="width: 100%; height: '+Math.ceil(win_h*0.67)+'px;">';
	$('rep').style.top = rep_top;
	$('rep').style.display = "block";
	make_geo_placemap(place);
	scrollToDiv($('rep'));
	user_pick1 = user_pick2 = null;
}

function make_geo_placemap(place) {
	var box_coords = place.bounding_box.coordinates[0];
	var la = 0,lo = 0;
	for (var i=0; i<box_coords.length; i++) {
		lo += box_coords[i][0];
		la += box_coords[i][1];
	}
	lo /= box_coords.length;
	la /= box_coords.length;
	var latlng = new google.maps.LatLng(la, lo);
	var map = new google.maps.Map(document.getElementById("map_canvas"),
		{zoom: 13, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP});
	var polygon = new google.maps.Polygon({position: latlng, map: map});
}

document.write('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>');
