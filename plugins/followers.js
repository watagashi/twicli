langResources['Color followers'] =	['フォロワーを色付け','给关注者添加颜色'];
langResources['Tweets coloring'] =	['ツイートが次のように色付けされます','发言将会以这些颜色区分'];
langResources['follower: black  non-follower: blue'] =	['フォロワー: 黒　非フォロワー: 青','关注者：黑色  非关注者：蓝色'];
langResources['Renew'] =	['更新','更新关注者数据'];
langResources['Off'] =	['無効','关闭颜色区分'];

var followers_ids_list = [];
xds.load(twitterAPI + 'followers/ids.json', twfcRenewAuto);
function twfcRenewAuto(list) {
	twfcRenew(list, true);
}
var followers_ids = [];
for (var i = 0; i < followers_ids_list.length; i++)
	followers_ids[followers_ids_list[i]] = 1;

registerPlugin({
	miscTab: function(ele) {
		var e = document.createElement("div");
		e.innerHTML = '<form onSubmit="twfcFollwersIDsRenew(); return false;">'+_('Color followers')+': <span id="followers_status">'+(followers_ids_list.length?"on("+followers_ids_list.length+")":"off")+'</span> <input type="submit" value="'+_('Renew')+'"><input type="button" onClick="twfcFollwersIDsClear()" value="'+_('Off')+'"> <a href="javascript:alert(\''+_('Tweets coloring')+':\\n  '+_('follower: black  non-follower: blue')+'\')">[?]</a></form>';
		ele.appendChild(e);
		var hr = document.createElement("hr");
		hr.className = "spacer";
		ele.appendChild(hr);
	},
	newMessageElement: function(ele, tw) {
		if (!display_as_rt && tw.retweeted_status && tw.retweeted_status.user)
			tw = tw.retweeted_status;
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
	var status = document.getElementById("followers_status");
	if (status) status.innerHTML = "loading...";
	xds.load(twitterAPI + 'followers/ids.json', twfcRenew);
}
function twfcRenew(list, notUpdateFollowersStatus) {
	twfcFollwersIDsClear();
	followers_ids_list = list;
	followers_ids = [];
	for (var i = 0; i < list.length; i++)
		followers_ids[list[i]] = 1;
	if (notUpdateFollowersStatus) return;
	var status = document.getElementById("followers_status");
	if (status) status.innerHTML = "on (" + list.length + ")";
}
