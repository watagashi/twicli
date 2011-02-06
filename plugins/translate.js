langResources['Translate'] =	['翻訳','翻译'];
langResources['translate language'] =	['翻訳先の言語','翻译语言'];
langResources['Choose "translate" from ▼ to translate the tweet.'] =	['翻訳するにはツイートの▼メニューから"翻訳"を選んで下さい。','请点击发言中的▼并选择“翻译”进行翻译。'];


var translateLang = readCookie("lang") || "ja";
function setTranslateLang(lang) {
	translateLang = lang;
	writeCookie("lang", lang, 3652);
	alert(_('Choose "translate" from ▼ to translate the tweet.'));
}

registerPlugin({
	miscTab: function(ele) {
		var e = document.createElement("div");
		e.innerHTML = '<a href="javascript:var s = $(\'translate_pref\').style; s.display = s.display==\'block\'?\'none\':\'block\';void(0)"><b>▼'+_('Translate')+'</b></a>' +
			'<form id="translate_pref" style="display:none" onSubmit="setTranslateLang($(\'translateLang\').value); return false;">' +
			_('translate language')+': <input type="text" size="15" id="translateLang" value="'+translateLang+'">' +
			'<input type="image" src="images/go.png"></form>';
		$("pref").appendChild(e);
	},

	popup: function() {
		$('translate_status').href = "javascript:translateStatus('"+popup_ele.id+"')";
	}
});

function translateStatus(id) {
	xds.load_for_tab("http://www.google.com/uds/Gtranslate?v=1.0"+
				"&context=" + id.replace("-","_") +
				"&q=" + encodeURIComponent($(id).tw.text) +
				"&langpair=|"+translateLang, gTranslate);
}
function gTranslate(id, result, code, error, code2) {
	if (code != 200) {
		alert("Translate error " + code + ": " + error);
		return;
	}
	var target = $(id.replace("_","-"));
	if (!target) return;

	rep_top = cumulativeOffset(target)[1] + 20;
	$('reps').innerHTML = result.translatedText;
	$('rep').style.display = "block";
	$('rep').style.top = rep_top;
	user_pick1 = user_pick2 = null;
}

// Popup menu

var a = document.createElement('hr');
$('popup').appendChild(a)

a = document.createElement('a');
a.id = 'translate_status';
a.innerHTML = _('Translate');
$('popup').appendChild(a)
