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

    function filesEncrypt(js, data, key, name, type, size) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.encrypt(key);
            let title = str2ab(name).toString().encrypt(key);
            let file = {
                name: {
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

    function fileEncrypt(data, key, name, type, size) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.encrypt(key);
            let title = str2ab(name).toString().encrypt(key);
            let js = {
                files: [],
                time: getNow()
            };
            let jsfile = {
                name:
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

    function fileDecrypt(data, key) {
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
                let title = (jsfile.name.name.length >= jsfile.name.size ? jsfile.name.name.substring(0, jsfile.name.size) : jsfile.name.name);
                let name = ab2str(title.decrypt(key).split(","));
                if (name.hex_md5_hash() == jsfile.name.hash.source && title.hex_md5_hash() == jsfile.name.hash.target) {
                    infor.name = ((name.hex_md5_hash() == jsfile.name.hash.source && title.hex_md5_hash() == jsfile.name.hash.target) ? name : "未知");
                    infor.type = jsfile.type;
                    infor.size = getFileSizeString(jsfile.size, " B");
                    let hash2 = jsfile.file.hex_md5_hash();
                    infor.hash2 = [jsfile.hash.target, "[" + (jsfile.hash.target == hash2 ? "✓" : "✗") + "]"].join(" ");
                    if (jsfile.hash.target == hash2) {
                        let file = jsfile.file.decrypt(key);
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
        } catch (e) {
            infor.commit = false;
            infor.error = e;
            infors.push(infor);
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
        th.style.width = "50px";
        th.innerText = "序号";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "200px";
        th.innerText = "文件名称";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "72px";
        th.innerText = "文件大小";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "200px";
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
            td.style.width = "50px";
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
            td.style.width = "36px";
            td.style.textAlign = "right";
            td.innerText = getFileSizeString(files[i].size, " B");
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
            }
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
    inforcontainer.appendChild(viewInfors({}));

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

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
        for(let i =0;i<tb.length;i++){
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let files = $("source-encrypt-file").files;
        if (files.length > 0) {
            let key = prompt("请输入8位加密密码:");
            if (key != prompt("请再次输入加密密码:")) {
                alert("两次密码输入不一致.");
            } else if (key.length != 8) {
                alert("请输入8位加密密码.");
            } else {
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
                                        let infor = fileEncrypt(this.result, key, file.name, file.type, file.size);
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
                let key = prompt("请输入8位加密密码:");
                if (key != prompt("请再次输入加密密码:")) {
                    alert("两次密码输入不一致.");
                } else if (key.length != 8) {
                    alert("请输入8位加密密码.");
                } else {
                    let pkname = prompt("请输入打包文件名称:");
                    let js = {
                        files: [],
                        time: getNow()
                    };
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                            try {
                                if (file.size <= 10 * 1024 * 1024) {
                                    let reader = new FileReader();
                                    reader.readAsBinaryString(file);
                                    reader.onloadstart = function () {
                                        $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在加密....";
                                    };
                                    reader.onload = function () {
                                        let deinfs = [];
                                        let deinf = {};
                                        if (key.length > 0) {
                                            let infor = filesEncrypt(js, this.result, key, file.name, file.type, file.size);
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
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "加密文件不能大于10MB.";
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
                                let infors = fileDecrypt(this.result, key);
                                let count = 0;
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
                                                infor.commit ? count++ : count += 0;
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

                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "解密 " + count + " 个文件";
                                $(file.name).getElementsByClassName("file-comment")[0].title = "点击获取详细信息";
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
    };
    tool.appendChild(decrypt);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("file-encrypt-decrypt").parentNode.removeChild($("file-encrypt-decrypt"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}
