
function getFileSecurity() {
    function sleep(delay) {
        let endTime = new Date().getTime() + parseInt(delay);
        while (new Date().getTime() < endTime) ;
        //用时间来控制延时,突破浏览器同时下载任务限制.
    }

    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function filesEncrypt(js, data, key, name, type, size, mode, expiryDate) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.Encrypt(key, mode);
            let title = str2ab(name).toString().Encrypt(key, mode);
            expiryDate = str2ab(expiryDate).toString();
            let expiryDateHash = expiryDate.hex_md5_hash();
            expiryDate = expiryDate.Encrypt(key, mode);
            let file = {
                title: {
                    name: title,
                    size: title.length,
                    hash: {
                        source: name.hex_md5_hash(),
                        target: title.hex_md5_hash()
                    }
                },
                file: data,
                type: type,
                size: size,
                hash: {
                    source: hash1,
                    target: data.hex_md5_hash()
                }
            };
            js.expiry = {
                date: expiryDate,
                size: expiryDate.length,
                hash: {
                    source: expiryDateHash,
                    target: expiryDate.hex_md5_hash()
                }
            };
            js.files.push(file);
            return {
                name: name,
                type: type,
                size: getFileSizeString(size," B"),
                hash1: file.hash.source,
                hash2: file.hash.target,
                time: js.time,
                commit: true,
                error: null
            };
        } catch (e) {
            return {
                name: name,
                type: type,
                size: getFileSizeString(size," B"),
                hash1: null,
                hash2: null,
                time: js.time,
                commit: false,
                error: e
            };
        }
    }

    function fileEncrypt(data, key, name, type, size, mode, expiryDate) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.Encrypt(key, mode);
            let title = str2ab(name).toString().Encrypt(key, mode);
            expiryDate = str2ab(expiryDate).toString();
            let expiryDateHash = expiryDate.hex_md5_hash();
            expiryDate = expiryDate.Encrypt(key, mode);
            let js = {
                application:{url:"<a href='" + window.location.href.split("?")[0] + "'>" + __VERSION__ .name + "</a>", version:__VERSION__.version, help: __VERSION__.url},
                mode: mode,
                expiry: {
                    date: expiryDate,
                    size: expiryDate.length,
                    hash: {
                        source: expiryDateHash,
                        target: expiryDate.hex_md5_hash()
                    }
                },
                files: [],
                time: getNow(),
            };
            let jsfile = {
                title:
                    {
                        name: title,
                        size: title.length,
                        hash: {
                            source: name.hex_md5_hash(),
                            target: title.hex_md5_hash()
                        }
                    },
                file: data, type: type, size: size,
                hash: {
                    source: hash1,
                    target: data.hex_md5_hash()
                }
            };
            js.files.push(jsfile);
            let blob = new Blob([s2ab(JSON.stringify(js))], {type: "application/octet-stream"});
            openDownloadDialog(blob, name + ".encrypted");
            sleep((jsfile.size/1024/1024 <= 1?1:jsfile.size/1024/1024) * 1000);
            return {
                name: name,
                type: jsfile.type,
                size: getFileSizeString(jsfile.size," B"),
                hash1: jsfile.hash.source,
                hash2: jsfile.hash.target,
                time: js.time,
                commit: true,
                error: null
            };
        } catch (e) {
            return {
                name: name,
                type: type,
                size: getFileSizeString(size," B"),
                commit: false,
                error: e,
            };
        }
    }

    function checkExpiryDate(expiry, key, mode, now){
        let checked = {
            startDate: null,
            validPeriod: null,
            endDate: null,
            days: null,
            checked: false,
            information: null
        };
        let expiryDate = null;
        try {
            expiryDate = ab2str(expiry.date.Decrypt(key, mode).split(","));
            if (expiry.date.toString().hex_md5_hash() == expiry.hash.target && str2ab(expiryDate).toString().hex_md5_hash() == expiry.hash.source) {
                expiryDate = JSON.parse(expiryDate);
                checked.validPeriod = Number(expiryDate.validPeriod);
                checked.startDate = new Date(expiryDate.startDate);
                checked.endDate = new Date(expiryDate.startDate);
                checked.endDate.setDate(checked.endDate.getDate() + checked.validPeriod);
                checked.days = Math.floor((now - checked.startDate) / (1 * 24 * 60 * 60 * 1000));
                if (checked.days <= checked.validPeriod || checked.validPeriod == 0) {
                    checked.checked = true;
                    checked.information = "加密文件有效期验证通过";
                } else {
                    if ((checked.days - checked.validPeriod) <= 9)
                        checked.information = ("加密文件有效期已超出 " + (checked.days - checked.validPeriod) + " 天");
                    else
                        checked.information = "加密文件有效期已超出";
                }
            } else {
                checked.information = "解密密码错误";
            }
        } catch (e) {
            checked.information = "解密密码错误," + e;
        }
        return checked;
    }

    function fileDecrypt(filename, data, key, now) {
        let infors = [];
        let infor = {
            name: null,
            type: null,
            size: null,
            hash1: null,
            hash2: null,
            commit: null,
            error: null
        };
        try {
            let js = JSON.parse(data);
            let expiryDate = checkExpiryDate(js.expiry, key, js.mode, now);
            $(filename).getElementsByClassName("file-expiryDate")[0].innerText = (expiryDate.validPeriod==0?"长期":(expiryDate.endDate==null?"":expiryDate.endDate.format("yyyy-MM-dd")));
            if (expiryDate.checked) {
                let count = 0 ;
                for (let index = 0; index < js.files.length; index++) {
                    infor = {
                        name: null,
                        type: null,
                        size: null,
                        hash1: null,
                        hash2: null,
                        commit: null,
                        error: null
                    };
                    let jsfile = js.files[index];
                    let title = (jsfile.title.name.length >= jsfile.title.size ? jsfile.title.name.substring(0, jsfile.title.size) : jsfile.title.name);
                    let name = ab2str(title.Decrypt(key, js.mode).split(","));
                    if (name.hex_md5_hash() == jsfile.title.hash.source && title.hex_md5_hash() == jsfile.title.hash.target) {
                        infor.name = ((name.hex_md5_hash() == jsfile.title.hash.source && title.hex_md5_hash() == jsfile.title.hash.target) ? name : "未知");
                        infor.type = jsfile.type;
                        infor.size = getFileSizeString(jsfile.size, " B");
                        let hash2 = jsfile.file.hex_md5_hash();
                        infor.hash2 = [jsfile.hash.target, "[" + (jsfile.hash.target == hash2 ? "✓" : "✗") + "]"].join(" ");
                        if (jsfile.hash.target == hash2) {
                            let file = jsfile.file.Decrypt(key, js.mode);
                            let size = file.length;
                            if (jsfile.size <= size) {
                                file = file.substring(0, jsfile.size);
                                let hash1 = file.hex_md5_hash();
                                infor.hash1 = [jsfile.hash.source, "[" + (jsfile.hash.source == hash1 ? "✓" : "✗") + "]"].join(" ");
                                if (jsfile.hash.source == hash1) {
                                    let blob = new Blob([s2ab(file)], {type: jsfile.type});
                                    openDownloadDialog(blob, infor.name);
                                    sleep((jsfile.size / 1024 / 1024 <= 1 ? 1 : jsfile.size / 1024 / 1024) * 1000);
                                    infor.commit = true;
                                    count ++;
                                } else {
                                    infor.commit = false;
                                    infor.error = "原文完整性校验未通过";
                                }
                            } else {
                                infor.commit = false;
                                infor.error = "解密密码错误";
                            }
                        } else {
                            infor.commit = false;
                            infor.error = "密文完整性校验未通过";
                        }
                    } else {
                        infor.commit = false;
                        infor.error = "文件名称校验未通过";
                    }
                    infors.push(infor);
                }
                $(filename).getElementsByClassName("file-comment")[0].innerText = "解密 " + count + " 个文件";
            } else {
                $(filename).getElementsByClassName("file-comment")[0].innerText = expiryDate.information;
            }
        } catch (e) {
            $(filename).getElementsByClassName("file-comment")[0].innerText = "非加密文件或文件被破坏,无法解密";
        }
        return infors;
    }

    function viewFiles(tablecontainer, files) {
        tablecontainer.innerHTML = "";
        let table = document.createElement("table");
        tablecontainer.appendChild(table);
        table.id = "file-list-table";
        table.className = "table";
        table.style.width = "100%";
        table.style.tableLayout = "fixed";

        table.innerText = "";
        let tr = document.createElement("tr");
        tr.className = "tr";
        table.appendChild(tr);
        let th = document.createElement("th");
        th.className = "th";
        th.style.width = "32px";
        let check = document.createElement("input");
        check.type = "checkbox";
        check.className = "file-checkall";
        check.style.width = "18px";
        check.onclick = function () {
            let files = $("file-list-table").getElementsByClassName("file-check");
            for (let i = 0; i < files.length; i++) {
                files[i].checked = this.checked;
                this.checked ? files[i].setAttribute("checked", "checked") : files[i].removeAttribute("checked");
            }
        };
        th.style.textAlign = "center";
        th.appendChild(check);
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "40px";
        th.innerText = "序号";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "200px";
        th.innerText = "文件名称";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "62px";
        th.innerText = "文件大小";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "72px";
        th.innerText = "有效日期";
        tr.appendChild(th);


        th = document.createElement("th");
        th.className = "th";
        th.style.width = "100px";
        th.innerText = "加密/解密";
        tr.appendChild(th);

        for (let i = 0; i < files.length; i++) {
            tr = document.createElement("tr");
            tr.id = files[i].name;
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("file-check")[0].checked == true)
                    this.getElementsByClassName("file-check")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("file-check")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "file-check";
            check.style.width = "18px";
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.className = "file-id";
            td.style.width = "40px";
            td.style.textAlign = "center";
            td.innerText = (i + 1);
            tr.appendChild(td);

            td = document.createElement("td");
            td.className = "file-name";
            td.style.width = "50px";
            td.style.textAlign = "left";
            td.innerText = td.title = files[i].name;
            tr.appendChild(td);

            td = document.createElement("td");
            td.className = "file-size";
            td.style.width = "30px";
            td.style.textAlign = "right";
            td.innerText = getFileSizeString(files[i].size, " B");
            tr.appendChild(td);

            td = document.createElement("td");
            td.className = "file-expiryDate";
            td.style.width = "36px";
            td.style.textAlign = "center";
            td.innerText = "";
            tr.appendChild(td);

            td = document.createElement("td");
            td.className = "file-comment";
            td.style.width = "36px";
            td.style.textAlign = "center";
            td.innerText = "";
            td.onclick = function(){
                if (this.getAttribute("de-infs")!="undefined") {
                    let js = JSON.parse(this.getAttribute("en-de-infors"));
                    $("infor-container").innerHTML = "";
                    $("infor-container").appendChild(viewInfors(js));
                    $("table-container").style.display = "none";
                    $("infor-container").style.display = "block";
                    let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
                    for (let i = 0; i < tb.length; i++) {
                        tb[i].style.background = "var(--toolbar-background-color)";
                    }
                    tb[1].style.background = "var(--toolbar-button-hover-background-color)";
                }
            };
            tr.appendChild(td);
        }
    }

    function viewInfors(js) {
        let table = document.createElement("table");
        table.id = "infor-list-table";
        table.className = "table";
        table.style.width = "100%";
        table.style.tableLayout = "fixed";

        table.innerText = "";
        let tr = document.createElement("tr");
        tr.className = "tr";
        table.appendChild(tr);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "35px";
        th.innerText = "序号";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "文件名称";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "文件类型";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "文件大小";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "原文校验";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "密文校验";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "执行情况";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "50px";
        th.innerText = "其他信息";
        tr.appendChild(th);

        if (js != null) {
            for (let i = 0; i < js.length; i++) {
                let j = js[i];
                tr = document.createElement("tr");
                if (i % 2 > 0) {
                    tr.className = "alt-line";
                    //单数行
                }
                table.appendChild(tr);
                let td = document.createElement("td");
                td.innerText = (i + 1);
                td.style.textAlign = "center";
                tr.appendChild(td);
                for (let name in j) {
                    td = document.createElement("td");
                    td.style.textAlign = j[name].textAlign;
                    td.innerHTML = td.title = (j[name].value == null ? " " : j[name].value);
                    tr.appendChild(td);
                }
            }
        }
        return table;
    }

    let container = document.createElement("div");
    container.id = "file-encrypt-decrypt";
    container.className = "table-data-format";
    container.style.width = "600px";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 文件加密/解密";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let d = document.createElement("div");
    container.appendChild(d);
    d.className = "tabToolbar";
    let b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "文件列表";
    b.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        this.style.background = "var(--toolbar-button-hover-background-color)";
    };
    d.appendChild(b);
    b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "详细信息";
    b.onclick = function () {
        $("table-container").style.display = "none";
        $("infor-container").style.display = "block";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        this.style.background = "var(--toolbar-button-hover-background-color)";
    };
    d.appendChild(b);

    let source = document.createElement("input");
    source.type = "file";
    source.multiple = "multiple";
    source.style.width = "100%";
    source.id = "source-encrypt-file";
    source.style.display = "none";
    source.onchange = function () {
        viewFiles($("table-container"), this.files);
    };
    container.appendChild(source);

    let tablecontainer = document.createElement("div");
    tablecontainer.className = "tabToolbar-content-container";
    tablecontainer.id = "table-container";
    tablecontainer.style.cssText = "width: 98.9%;\n" +
        "height: 300px;\n" +
        "overflow: scroll;\n" +
        "float: left;font-size:90%;";
    tablecontainer.type = "div";
    container.appendChild(tablecontainer);
    viewFiles(tablecontainer, source.files);

    let inforcontainer = document.createElement("div");
    inforcontainer.className = "tabToolbar-content-container";
    inforcontainer.id = "infor-container";
    inforcontainer.style.cssText = "width: 98.9%;\n" +
        "height: 300px;\n" +
        "overflow: scroll;\n" +
        "display: none;\n" +
        "float: left;font-size:90%;";
    inforcontainer.type = "div";
    container.appendChild(inforcontainer);
    inforcontainer.appendChild(viewInfors([]));

    d = document.createElement("div");
    container.appendChild(d);
    span = document.createElement("span");
    span.className = "http-server-datetime";
    span.id = "http-server-datetime-" + new Date().format("yyyyMMddhhmmssS")
    span.style.cssFloat = "left";
    __XMLHTTP__.hook(span, 1000);
    d.appendChild(span);

    let expirydate = document.createElement("select");
    expirydate.id = "encrypt-expiry-date";
    expirydate.style.cssFloat = "right";
    expirydate.options.add(new Option("1天", 1));
    expirydate.options.add(new Option("3天", 3));
    expirydate.options.add(new Option("5天", 5));
    expirydate.options.add(new Option("7天", 7));
    expirydate.options.add(new Option("10天", 10));
    expirydate.options.add(new Option("15天", 15));
    expirydate.options.add(new Option("30天", 30));
    expirydate.options.add(new Option("长期", 0));
    expirydate.title = "有效期限";
    d.appendChild(expirydate);

    let enmode = document.createElement("select");
    enmode.id = "encrypt-mode";
    enmode.style.cssFloat = "right";
    enmode.options.add(new Option("NORMAL", 0));
    enmode.options.add(new Option("DES3", 1));
    enmode.title = "加密方式";
    d.appendChild(enmode);

    // let br = document.createElement("hr");
    // br.className = "br";
    // container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let openfiles = document.createElement("div");
    openfiles.className = "button";
    openfiles.innerText = "打开";
    openfiles.onclick = function () {
        $("source-encrypt-file").click();
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";
    };
    tool.appendChild(openfiles);

    let encrypt = document.createElement("div");
    encrypt.className = "button";
    encrypt.innerText = "加密";
    encrypt.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let serverTime = __XMLHTTP__.time;
        if (serverTime != null) {
            let files = $("source-encrypt-file").files;
            if (files.length > 0) {
                let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/
                //必须是8位密码,且必须包含字符和数字
                let key = prompt("请输入8位加密密码:");
                if (key != prompt("请再次输入加密密码:")) {
                    alert("两次密码输入不一致.");
                } else if (pattern.test(key) == false) {
                    alert("请输入8位密码,且必须包含英文字母和数字.");
                } else {
                    let mode = $("encrypt-mode").value;
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        let deinfs = [];
                        if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                            try {
                                if (file.size <= 10 * 1024 * 1024) {
                                    let reader = new FileReader();
                                    reader.readAsBinaryString(file);
                                    reader.onloadstart = function () {
                                        $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在加密...";
                                    };
                                    reader.onload = function () {
                                        let deinf = {};
                                        if (key.length > 0 && key != null) {
                                            let expiryDate = {
                                                startDate: serverTime,
                                                validPeriod: $("encrypt-expiry-date").value
                                            };
                                            let infor = fileEncrypt(this.result, key, file.name, file.type, file.size, mode, JSON.stringify(expiryDate));
                                            let endDate = new Date(expiryDate.startDate);
                                            endDate.setDate(endDate.getDate() + Number(expiryDate.validPeriod));
                                            $(file.name).getElementsByClassName("file-expiryDate")[0].innerText = (expiryDate.validPeriod == 0 ? "长期" : endDate.format("yyyy-MM-dd"));
                                            for (let name in infor) {
                                                let toname = "";
                                                switch (name) {
                                                    case "name":
                                                        toname = "文件名称";
                                                        deinf[toname] = {value: infor[name], textAlign: "left"};
                                                        break;
                                                    case "type":
                                                        toname = "文件类型";
                                                        deinf[toname] = {value: infor[name], textAlign: "left"};
                                                        break;
                                                    case "size":
                                                        toname = "文件大小";
                                                        deinf[toname] = {value: infor[name], textAlign: "right"};
                                                        break;
                                                    case "hash1":
                                                        toname = "- 原文校验";
                                                        deinf[toname] = {value: infor[name], textAlign: "left"};
                                                        break;
                                                    case "hash2":
                                                        toname = "密文校验";
                                                        deinf[toname] = {value: infor[name], textAlign: "left"};
                                                        break;
                                                    case "commit":
                                                        toname = "执行情况";
                                                        infor.commit = (infor.commit ? "加密成功" : "加密失败");
                                                        deinf[toname] = {value: infor[name], textAlign: "center"};
                                                        break;
                                                    case "error":
                                                        toname = "- 错误信息";
                                                        deinf[toname] = {value: infor[name], textAlign: "left"};
                                                        break;
                                                }
                                            }
                                            deinfs.push(deinf);
                                            $(file.name).getElementsByClassName("file-comment")[0].innerText = infor.commit;
                                            $(file.name).getElementsByClassName("file-comment")[0].title = "点击获取详细信息";
                                            $(file.name).getElementsByClassName("file-comment")[0].setAttribute("en-de-infors", JSON.stringify(deinfs));
                                        } else
                                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "请输入8位加密密码!";
                                    }
                                } else
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "加密文件不能大于10MB.";
                            } catch (e) {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                            }
                            sleep(1000);
                        }
                    }
                }
            }
        } else {
            alert("连接授时服务器失败.");
        }
    };
    tool.appendChild(encrypt);

    let encryptToPacket = document.createElement("div");
    encryptToPacket.className = "button";
    encryptToPacket.innerText = "打包加密";
    encryptToPacket.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let serverTime = __XMLHTTP__.time;
        if (serverTime != null) {
            let files = $("source-encrypt-file").files;
            if (files.length > 0) {
                let checkedAll = {
                    count: 0,
                    size: 0
                };
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    let fc = $(file.name).getElementsByClassName("file-check")[0];
                    if (fc.checked == true) {
                        checkedAll.count++;
                        checkedAll.size += files[i].size;
                    }
                }
                if (checkedAll.size <= 10 * 1024 * 1024) {
                    let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/
                    //必须是8位密码,且必须包含字符和数字
                    let key = prompt("请输入8位加密密码:");
                    if (key != prompt("请再次输入加密密码:")) {
                        alert("两次密码输入不一致.");
                    } else if (pattern.test(key) == false) {
                        alert("请输入8位密码,且必须包含英文字母和数字.");
                    } else {
                        let pkname = prompt("请输入打包文件名称:");
                        let mode = $("encrypt-mode").value;
                        let js = {
                            application: {url: "<a href='" + window.location.href.split("?")[0] + "'>" + __VERSION__ .name + "</a>", version:__VERSION__.version, help: __VERSION__.url},
                            mode: mode,
                            expiry: {},
                            files: [],
                            time: getNow()
                        };

                        for (let i = 0; i < files.length; i++) {
                            let file = files[i];
                            if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                                try {
                                    if (file.size <= 20 * 1024 * 1024) {
                                        let reader = new FileReader();
                                        reader.readAsBinaryString(file);
                                        reader.onloadstart = function () {
                                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在加密....";
                                        };
                                        reader.onload = function () {
                                            let deinfs = [];
                                            let deinf = {};
                                            if (key.length > 0) {
                                                let expiryDate = {
                                                    startDate: serverTime,
                                                    validPeriod: $("encrypt-expiry-date").value
                                                };
                                                let infor = filesEncrypt(js, this.result, key, file.name, file.type, file.size, mode, JSON.stringify(expiryDate));
                                                let endDate = new Date(expiryDate.startDate);
                                                endDate.setDate(endDate.getDate() + Number(expiryDate.validPeriod));
                                                $(file.name).getElementsByClassName("file-expiryDate")[0].innerText = (expiryDate.validPeriod == 0 ? "长期" : endDate.format("yyyy-MM-dd"));
                                                for (let name in infor) {
                                                    let toname = "";
                                                    switch (name) {
                                                        case "name":
                                                            toname = "文件名称";
                                                            deinf[toname] = {value: infor[name], textAlign: "left"};
                                                            break;
                                                        case "type":
                                                            toname = "文件类型";
                                                            deinf[toname] = {value: infor[name], textAlign: "left"};
                                                            break;
                                                        case "size":
                                                            toname = "文件大小";
                                                            deinf[toname] = {value: infor[name], textAlign: "right"};
                                                            break;
                                                        case "hash1":
                                                            toname = "原文校验";
                                                            deinf[toname] = {value: infor[name], textAlign: "left"};
                                                            break;
                                                        case "hash2":
                                                            toname = "密文校验";
                                                            deinf[toname] = {value: infor[name], textAlign: "left"};
                                                            break;
                                                        case "commit":
                                                            toname = "执行情况";
                                                            infor.commit = (infor.commit ? "加密成功" : "加密失败");
                                                            deinf[toname] = {value: infor[name], textAlign: "center"};
                                                            break;
                                                        case "error":
                                                            toname = "错误信息";
                                                            deinf[toname] = {value: infor[name], textAlign: "left"};
                                                            break;
                                                    }
                                                }
                                                deinfs.push(deinf);

                                                $(file.name).getElementsByClassName("file-comment")[0].innerText = infor.commit;
                                                $(file.name).getElementsByClassName("file-comment")[0].title = "点击获取详细信息";
                                                $(file.name).getElementsByClassName("file-comment")[0].setAttribute("en-de-infors", JSON.stringify(deinfs));
                                                sleep((file.size / 1024 / 1024 <= 1 ? 1 : file.size / 1024 / 1024) * 1000);
                                            }
                                            if (js.files.length == checkedAll.count) {
                                                let blob = new Blob([s2ab(JSON.stringify(js))], {type: "application/octet-stream"});
                                                openDownloadDialog(blob, (pkname.length > 0 ? pkname : "未命名") + ".encrypted");
                                            }
                                        }
                                    } else
                                        $(file.name).getElementsByClassName("file-comment")[0].innerText = "加密文件不能大于20MB.";
                                } catch (e) {
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                                }
                            }
                        }
                    }
                }
                else {
                    alert("打包文件累计不能大于10MB.");
                }
            }
        } else {
            alert("连接授时服务器失败.");
        }
    };
    tool.appendChild(encryptToPacket);

    let decrypt = document.createElement("div");
    decrypt.className = "button";
    decrypt.innerText = "解密";
    decrypt.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let serverTime = __XMLHTTP__.time;
        if (serverTime != null) {
            let files = $("source-encrypt-file").files;
            if (files.length > 0) {
                let key = prompt("请输入解密密码:");
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                        $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                        try {
                            let reader = new FileReader();
                            reader.readAsBinaryString(file);
                            reader.onloadstart = function () {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在解密...";
                            };
                            reader.onload = function () {
                                if (key.length > 0) {
                                    let deinfs = [];
                                    let infors = fileDecrypt(file.name, this.result, key, serverTime);
                                    for (let i = 0; i < infors.length; i++) {
                                        let deinf = {};
                                        let infor = infors[i];
                                        for (let name in infor) {
                                            let toname = "";
                                            switch (name) {
                                                case "name":
                                                    toname = "文件名称";
                                                    deinf[toname] = {value: infor[name], textAlign: "left"};
                                                    break;
                                                case "type":
                                                    toname = "文件类型";
                                                    deinf[toname] = {value: infor[name], textAlign: "left"};
                                                    break;
                                                case "size":
                                                    toname = "文件大小";
                                                    deinf[toname] = {value: infor[name], textAlign: "right"};
                                                    break;
                                                case "hash1":
                                                    toname = "原文校验";
                                                    deinf[toname] = {value: infor[name], textAlign: "left"};
                                                    break;
                                                case "hash2":
                                                    toname = "密文校验";
                                                    deinf[toname] = {value: infor[name], textAlign: "left"};
                                                    break;
                                                case "commit":
                                                    toname = "执行情况";
                                                    infor.commit = (infor.commit ? "解密成功" : "解密失败");
                                                    deinf[toname] = {value: infor[name], textAlign: "center"};
                                                    break;
                                                case "error":
                                                    toname = "错误信息";
                                                    deinf[toname] = {value: infor[name], textAlign: "left"};
                                                    break;
                                            }
                                        }
                                        deinfs.push(deinf);
                                    }
                                    $(file.name).getElementsByClassName("file-comment")[0].title = ($(file.name).getElementsByClassName("file-comment")[0].innerText + "\n点击获取详细信息");
                                    $(file.name).getElementsByClassName("file-comment")[0].setAttribute("en-de-infors", JSON.stringify(deinfs));
                                } else
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "请输入解密密码";
                            }
                        } catch (e) {
                            $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                        }
                    }
                }
            }
        } else {
            alert("连接授时服务器失败.");
        }
    };
    tool.appendChild(decrypt);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        __XMLHTTP__.unhook(document.getElementsByClassName("http-server-datetime")[0]);
        $("file-encrypt-decrypt").parentNode.removeChild($("file-encrypt-decrypt"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}
