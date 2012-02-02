langResources['blocking'] =	['ブロックしている'];

function switchBlocking() {
	cur_page = 1;
	fav_mode = 9;
	$("tw2c").innerHTML = "";
	xds.load_for_tab(twitterAPI + 'blocks/blocking/ids.json?suppress_response_codes=true', twUsersLookup);
}
function switchFollowing() {
	cur_page = 1;
	fav_mode = 2;
	$("tw2c").innerHTML = "";
	xds.load_for_tab(twitterAPI + 'friends/ids.json?screen_name=' + last_user +
			'&suppress_response_codes=true', twUsersLookup);
}
function switchFollower() {
	cur_page = 1;
	fav_mode = 3;
	$("tw2c").innerHTML = "";
	xds.load_for_tab(twitterAPI + 'followers/ids.json?screen_name=' + last_user +
			'&suppress_response_codes=true', twUsersLookup);
}

var twUserIds = [];
var twUsers_per_users = 100;

function twUsersLookup(tw) {

	if (tw.error) return error(tw.error);
	twUserIds = tw.ids||tw;
	xds.load_for_tab(twitterAPI + 'users/lookup.json' +
			'?user_id=' + twUserIds.splice(0, twUsers_per_users).join() +
			'&include_entities=true&suppress_response_codes=true', twUsers);
}
function twUsers(tw) {
	if (tw.error) return error(tw.error);
	var tmp = $("tmp");
	if (tmp && tmp.parentNode) tmp.parentNode.removeChild(tmp);
	var tw2 = tw.map(function(x){
		if (!x.status) x.status = {'text':'', id:0, 'created_at':x.created_at};
		x.status.user = x;
		return x.status;
	});
	twShowToNode(tw2, $("tw2c"), false, cur_page > 1, false, false, false, false, false, true);
	if (twUserIds.length) {
		$("tw2c").appendChild(nextButton('next'));
		get_next_func = function() {
			cur_page++;
			xds.load_for_tab(twitterAPI + 'users/lookup.json' +
					'?user_id=' + twUserIds.splice(0, twUsers_per_users).join() +
					'&include_entities=true&suppress_response_codes=true', twUsers);
		};
	}
}
function makeUserInfoHTML(user) {
	return '<table><tr><td><a target="twitter" href="' + twitterURL + 'account/profile_image/'+
			user.screen_name+'"><img class="uicon2" src="' + user.profile_image_url + '"></a></td><td id="profile"><div>' +
			(user.verified ? '<img class="verified" alt="verified" src="images/verified.png">' : '') +
			(user.protected ? '<img class="lock" alt="lock" src="http://assets0.twitter.com/images/icon_lock.gif">' : '') +
			'<b>' + user.screen_name + '</b> / <b>' + user.name + '</b></div>' +
			(user.location ? '<div><b>'+_('Location')+'</b>: ' + user.location + '</div>' : '') +
			(user.url ? '<div><b>'+_('URL')+'</b>: <a target="_blank" href="' + user.url + '" onclick="return link(this);">' + user.url + '</a></div>' : '') +
			'<div>' + (user.description ? user.description : '<br>') +
			'</div><b><a href="' + twitterURL + user.screen_name + '/following" onclick="switchFollowing();return false;">' + user.friends_count + '<small>'+_('following')+'</small></a> / ' + 
						'<a href="' + twitterURL + user.screen_name + '/followers" onclick="switchFollower();return false;">' + user.followers_count + '<small>'+_('followers')+'</small></a>' +
						(user.screen_name == myname ?  ' / <a href="' + twitterURL + user.screen_name + '" onclick="switchBlocking();return false;"><small>'+_('blocking')+'</small></a>' : '') +
			'<br><a href="' + twitterURL + user.screen_name + '" onclick="switchStatus();return false;">' + user.statuses_count + '<small>'+_('tweets')+'</small></a> / ' +
						'<a href="' + twitterURL + user.screen_name + '/favorites" onclick="switchFav();return false;">' + user.favourites_count + '<small>'+_('favs')+'</small></a></b>' +
			'</td></tr></table>'+
			(user.screen_name != myname ? '<a class="button upopup" href="#" onClick="userinfo_popup_menu(\'' + user.screen_name + '\',' + user.id + ', this); return false;"><small><small>▼</small></small></a>' : '')+
			'<a target="twitter" href="' + twitterURL + user.screen_name + '">[Twitter]</a>' +
			'<a href="' + twitterURL + user.screen_name + '/following/tweets" onclick="switchFollowingTL();return false;">[TL]</a> ';
}
