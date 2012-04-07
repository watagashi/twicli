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
var max_users_lookup = 100;

function twUsersLookup(tw) {

	if (tw.error) return error(tw.error);
	twUserIds = tw.ids||tw;
	xds.load_for_tab(twitterAPI + 'users/lookup.json' +
			'?user_id=' + twUserIds.splice(0, max_users_lookup).join() +
			'&include_entities=true&suppress_response_codes=true', twUsers);
}
function twUsers(tw) {
	if (tw.error) return error(tw.error);
	if (tw.errors) return error(tw.errors[0].message, tw.errors);
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
					'?user_id=' + twUserIds.splice(0, max_users_lookup).join() +
					'&include_entities=true&suppress_response_codes=true', twUsers);
		};
	}
}

registerPlugin({
	newUserInfoElement: function(ele, user) {
		if (user.screen_name != myname) return;
		ele.innerHTML += '<a href="' + twitterURL + user.screen_name + '" onclick="switchBlocking();return false;">[Blocking]</a>';
	}
});
