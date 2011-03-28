langResources['$1 is verified account.'] =	['$1は認証済みアカウントです。'];

registerPlugin({
	newUserInfoElement:
		function(elem, user) {
			if (!user.verified) return;
			$("profile").innerHTML += "<br><span class=\"verified\">"
				+ _('$1 is verified account.', user.screen_name)+'</span>';
		}
});
