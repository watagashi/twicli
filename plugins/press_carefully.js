var pressOriginal = press;

press = function(e) {
	if (e != 1) key_press_detected = true;
	if (e != 1 && (e.keyCode != 13 && e.keyCode != 10 ||
		!decr_enter && (e.ctrlKey || e.shiftKey) || decr_enter && !(e.ctrlKey || e.shiftKey)) )
			return true;
	var st = document.frm.status;
	if (!key_press_detected) st.value = st.value.replace(/\n/g, "");
	if (st.value == '') {
		$("loading").style.display = "block";
		update();
		return false;
	}
	if (st.value.length > 140) {
		alert("This tweet is too long.");
		return false;
	}

	if(!confirm( "Sure?" )) return false;

	return pressOriginal.apply(this, arguments);
}
