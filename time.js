function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}

function getDoing() {
    let today = new Date();
    let y = today.getFullYear();
    let month = today.getMonth() + 1;
    let d = today.getDate();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    // 在小于10的数字前加一个‘0’
    let message = {
        type: "time",
        value: y + "/" + checkTime(month) + "/" + checkTime(d) + "\n" + checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s)
    };
    postMessage(JSON.stringify(message));

    message = {type: "certificate", value: true};
    postMessage(JSON.stringify(message));
    setTimeout(getDoing, 1000);
}
getDoing();
