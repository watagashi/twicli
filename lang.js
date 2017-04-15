var langNames = { 'en': 'English', 'ja': '日本語 (Japanese)' , 'zh-cn': '简体中文 (Simplified Chinese)'};
var langList = ['ja','zh-cn']; // 'en' shouldn't be added here
var langResources = {
	'Twitter / user': ['Twitter / ユーザ','Twitter / 用户'],
	'Twitter / tweet': ['Twitter / ツイート','Twitter / 发言'],
	'Delete tweet': ['ツイートを削除','删除该发言'],
	'Retweet': ['リツイート','官方锐推'],
	'Quote with RT:': ['RT:を付けて引用','加入RT:引用回复'],
	'Insert URL': ['URLを挿入 (コメント付きRT)','插入URL'],
	'Block this user': ['ユーザをブロック', '加入黑名单'],
	'Unblock this user': ['ユーザをブロック解除', '从黑名单中去除'],
	'Report as spam': ['スパム報告', '举报垃圾信息'],
	'GeoTagging': ['ジオタグ','地理标签'],
	'Location':	['場所','方位'],
	'URL':	['URL','URL'],
	'following':	['人をフォロー','关注该用户'],
	'followers':	['人がフォロー','关注的用户'],
	'tweets':	['ツイート','发言'],
	'favs':	['fav','收藏'],
	'Follow $1':	['$1をフォロー','关注$1'],
	'Remove $1':	['$1をリムーブ','取消关注$1'],
	'$1 is following you!':	['$1はあなたをフォローしています!','$1正在关注你！'],
	'Images':	['画像','图像'],
	'Upload images':	['画像をアップロード','加载图像'],
	'show user info':	['ユーザ情報を表示','显示用户详细信息'],
	'Log out':	['ログアウト','注销'],
	'Preferences':	['設定','选项'],
	'Theme':	['テーマ','主題'],
	'language':	['言語','语言'],
	'max #msgs in TL':	['TLの最大表示数','TL最大显示发言数'],
	'#msgs in TL on update (max=800)':	['起動時のTL取得数(最大800)','启动后取得TL数目(最大为800条)'],
	'#msgs in user on update (max=800)':	['ユーザTL取得数(最大800)','用户界面取得TL数目(最大为800条)'],
	'update interval':	['自動更新間隔','自动更新时间间隔'],
	'Update after post':	['発言後に自動更新','在发言之后自动更新'],
	'since_id check':	['TL取得時にsince_idを使用','在取得TL的时候使用since_id'],
	'Show not-following replies in TL':	['フォローしていない返信もTLに表示','没有关注的用户的回复也在TL上显示'],
	'Reply to all':	['全員に返信','为全体人员回复'],
	'Show retweets in "RT:" form':	['リツイートを"RT:〜"形式で表示','官方锐推也用RT:～来显示'],
	'Auto-resize field':	['発言欄のサイズを自動調整','输入框大小自动调整'],
	'Post length counter':	['残り文字数を表示','显示发言的剩余字数'],
	'Post with ctrl/shift+enter':	['ctrl+enter/shift+enterで発言','敲击Ctrl+回车或Shift+回车来发言'],
	'Confirm before closing tabs': ['タブを閉じる前に確認','确认闭标签'],
	'Confirm before deleting tweets': ['ツイート削除の前に確認'],
	'Confirm before retweet': ['リツイートする前に確認'],
	'Enable GeoTagging':	['ジオタグ(位置情報)を有効に','开启地理标签（方位信息）'],
	'Use HTTPS':	['HTTPSを使用','使用HTTPS'],
	'Tweet via GAE server':	['GAEサーバ経由でツイート','使用GAE server'],
	'Show header image':	['ヘッダ画像を表示','显示横幅图像'],
	'Drag&drop image upload':	['ドラッグ&ドロップで画像を追加','由阻力添加图象'],
	'Footer':	['フッター','加尾修饰'],
	'Plugins':	['プラグイン','插件'],
	'user stylesheet':	['ユーザスタイルシート','用户自定义样式表'],
	'Twitter API status':	['Twitter APIの状態','TwitterAPI状态'],
	'hourly limit':	['1時間当たりの制限','一小时之内API限制'],
	'reset at':	['リセット日時','重置时刻'],
	'Save':	['保存','保存'],
	'Twitter API error': ['Twitter APIエラー',null],
	'API error (Twitter may be over capacity?)': ['APIエラー(Twitter過負荷?)',null],
	'This tweet is too long.': ['ツイートが長すぎます。','发送字数过多。'],
	'Your settings are saved. Please reload to apply plugins.': ['設定を保存しました。プラグインの変更を反映するにはリロードが必要です。','选项已保存。请刷新页面以应用插件的修改。'],
	'Plugin error': ['プラグインのエラー','插件发生了错误'],
	'Are you sure to logout? You need to re-authenticate twicli at next launch.': ['ログアウトしてもよろしいですか? 次回起動時には再認証が必要になります。','确定要注销？下次启动的时候需要重新进行认证。'],
	'Retweet to your followers?': ['あなたのフォロワーにこのツイートをRT(リツイート)してもよろしいですか?'],
	'This tweet is protected; Are you sure to retweet?': ['このツイートはプロテクトされています。本当にRTしますか?','该发言已被用户锁定。你确定要RT吗？'],
	'This tweet is protected; Are you sure to insert URL?': ['このツイートはプロテクトされています。本当にURLを挿入しますか?','该发言已被用户锁定。你确定要插入URL？'],
	'This tweet is protected.': ['このツイートはプロテクトされています。', '该发言已被用户锁定。'],
	'Are you sure to delete this tweet?': ['このツイートを削除してもよろしいですか?','确定要删除该发言？'],
	'Are you sure to remove $1?': ['本当に $1 をリムーブしますか?','确定要取消关注$1吗？'],
	'Are you sure to block $1?': ['本当に $1 をブロックしますか?','真的要把 $1 加入黑名单么？'],
	'Are you sure to report $1 as spam?': ['本当に $1 をスパムとして報告しますか?','真的要举报 $1 么？'],
	'An external plugin is specified. This plugin can fully access to your account.\nAre you sure to load this?': ['外部プラグインが指定されています。このプラグインはあなたのアカウントに自由にアクセス可能になります。本当にロードしてもよろしいですか?','你欲加载外部地址上的插件。这个插件将自由访问你的帐号信息。确认加载？'],
	'Cannot access to direct messages. Please re-auth twicli for DM access.': ['ダイレクトメッセージにアクセスできません。お手数ですが再度認証を行ってください。'],
	'Cannot tweet from twicli? Please try logging out of Twitter web site...': ['もしツイートがうまくできない場合、TwitterのWebサイトからログアウトすると成功することがあります。'],
	'Cannot get TL. Please try $1logout of Twitter web site$2.': ['TLを取得できません。$1TwitterのWebサイトからログアウト$2してみてください。'],
	'Too many requests: Twitter API $1 is rate limited; reset in $2': ['リクエスト回数超過: Twitter API「$1」は$2後まで制限されています。'],
	'This image is larger than $1MB.': ['この画像のサイズは$1MBを超えています。'],
	'An old HTML file is loaded. Please reload it. If the problem is not fixed, please try erasing caches.': ['古いHTMLファイルがロードされています。リロードしてみて下さい。それでも解決しない場合はキャッシュを削除してみて下さい。'],
	'Download': ['ダウンロード'],
	'Upload': ['アップロード'],
	'Are you sure to upload your settings to the server? The settings are only downloadable from the current account. Authentication information is not included.': ['設定をサーバにアップロードしてもよろしいですか? なおダウンロードは現在のアカウントからのみ可能です。また認証に関する情報は送信されません。'],
	'Are you sure to download your settings from the server? Current settings are overwritten.': ['設定をサーバからダウンロードしてもよろしいですか? 現在の設定は上書きされます。'],
	'Your settings are uploaded successfully.': ['設定のアップロードに成功しました。'],
	'Failed to download settings. (Error $1)': ['設定のダウンロードに失敗しました。(エラー $1)'],
	'Your settings are downloaded. Please reload to enable them.': ['設定がダウンロードされました。有効にするにはリロードしてください。'],
	'Failed to upload settings. (Error $1)': ['設定のアップロードに失敗しました。(エラー $1)']
};
