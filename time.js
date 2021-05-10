function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}

function getTime() {
    let today = new Date();
    let y = today.getFullYear();
    let month = today.getMonth() + 1;
    let d = today.getDate();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    // 在小于10的数字前加一个‘0’
    postMessage(y + "/" + checkTime(month) + "/" + checkTime(d) + "\n" + checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s));
    setTimeout(getTime, 1000);
}
getTime();
