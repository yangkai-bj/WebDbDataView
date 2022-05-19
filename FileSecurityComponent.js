
function getFileSecurity(parent) {
    function sleep(delay) {
        let endTime = new Date().getTime() + parseInt(delay);
        while (new Date().getTime() < endTime) ;
        //用时间来控制延时,突破浏览器同时下载任务限制.
    }

    function getHTML(title, data, hash, time, validPeriod) {
        return "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "<meta charset='utf-8'>\n" +
            "<title>" + title + "</title>\n" +
            "<meta name='description' content='This is an encrypted file. Please use Chrome or Edge browser to open it. " +
            "The password is an 8-bit string containing numbers and English characters; Generally, the period of validity " +
            "is set for the encrypted document. If the period of validity is exceeded, the document cannot be decrypted; " +
            "In decryption, the time-service must be provided by the time-server used in encryption, not other time-servers " +
            "or local time; Double MD5 (plaintext and ciphertext) verification is used for the whole document and each node, " +
            "Any editing or tampering will result in document invalidation;The App Only encryption / decryption calculation is provided. " +
            "Plaintext encryption within 20m is supported. The calculation runs in the local browser throughout the process. " +
            "No files are uploaded and no parameters are recorded. It is applicable to confidential data or files that need " +
            "to be circulated in the intranet for a short time; It is not recommended to use confidential documents that need " +
            "to be kept for a long time because it cannot ensure a long-term and stable time-server with the same domain name'>\n" +
            "<meta name='author' content='杨凯'>\n" +
            "<meta name='date' content='" + time + "'>\n" +
            "<style>\n" +
            "body{background-color: dimgrey;color: whitesmoke;font-family: Arial, Verdana}\n" +
            "h2{margin: auto;width: 80%;text-align: left;white-space: normal;word-break: break-all;word-wrap: break-word;}\n" +
            "div{margin: auto;padding-left: 5px;padding-right: 5px;;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: hidden;height: 100%}\n" +
            "code{font-family: Verdana,Arial;font-size: 10px;width: 100%;white-space: normal;word-break: break-all;word-wrap: break-word;}\n" +
            "h6{margin: auto;width: 80%;text-align: center}\n" +
            "a{font-size: 80%;padding-left: 5px;padding-right: 5px;color: snow;background-color: sandybrown;outline-style: none;border-radius: 4px;}\n" +
            "span{font-size: 80%;padding-left: 5px;padding-right: 5px;color: snow;background-color: #00A7AA;outline-style: none;border-radius: 4px;}\n" +
            "</style>\n" +
            "</head>\n" +
            "<body>\n" +
            "<h2>&emsp;&emsp;本文档是&ensp;<span>" + title + "</span>&ensp;的加密文件,请" +
            "使用&ensp;<span>Google Chrome</span>&ensp;或&ensp;<span>Microsoft Edge</span>&ensp;浏览器打开," +
            "点击进入&ensp;" + data.application.link + "&ensp;可解密此文档;密码是包含数字" +
            "和英文字母的8位字符串;一般情况下,加密文档设置了有效期,如果超出有效期,文档将不" +
            "能解密;解密时必须由加密时所采用的同域名服务器提供授时服务;文档整体和各节点采" +
            "用双重(明文和密文)MD5验证,任何编辑或篡改都将导致文档失效;解密后,此文档的信息" +
            "安全责任同时移交,请务必遵守相关制度规定." +
            "&ensp;" + data.application.link + "&ensp;仅提供加密和解密计算,全程本地运行,不" +
            "上传,不留痕;适用于需短期在内网流转的涉密数据或文档;因暂不能提供长期稳定的授时服务" +
            "器,对需长期保存的重要文档,不建议使用.</h2>" +
            "<div>\n" +
            "<span>密文</span><code>" + JSON.stringify(data) + "</code>\n" +
            "<span>Hash</span><code>" + hash + "</code>\n" +
            "<span>创建时间</span><code>" + time + "</code><span>期限</span><code>" + validPeriod + "</code>\n" +
            "</div>\n" +
            "<h6>适用于<a href = 'https://www.google.cn/chrome/index.html' target='_blank'>Google Chrome</a>或<a href = 'https://www.microsoft.com/zh-cn/edge?form=MY01BV&OCID=MY01BV&r=1' target='_blank'>Microsoft Edge</a>浏览器&emsp;技术支持: 杨凯&emsp;电话: (010)63603329&emsp;邮箱: <a href='mailto:yangkai.bj@ccb.com'>yangkai.bj@ccb.com</a></h6>\n" +
            "</body>\n" +
            "</html>";
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
            let eDate = str2ab(JSON.stringify(expiryDate)).toString();
            let eDateHash = eDate.hex_md5_hash();
            eDate = eDate.Encrypt(key, mode);
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
                date: eDate,
                size: eDate.length,
                hash: {
                    source: eDateHash,
                    target: eDate.hex_md5_hash()
                }
            };
            js.files.push(file);
            return {
                name: name,
                type: type,
                size: getFileSizeString(size, " B"),
                hash1: file.hash.source,
                hash2: file.hash.target,
                time: expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss"),
                commit: true,
                error: null
            };
        } catch (e) {
            return {
                name: name,
                type: type,
                size: getFileSizeString(size, " B"),
                hash1: null,
                hash2: null,
                time: expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss"),
                commit: false,
                error: e
            };
        }
    }

    function fileEncrypt(js, data, key, name, type, size, mode, expiryDate) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.Encrypt(key, mode);
            let title = str2ab(name).toString().Encrypt(key, mode);
            let eDate = str2ab(JSON.stringify(expiryDate)).toString();
            let eDateHash = eDate.hex_md5_hash();
            eDate = eDate.Encrypt(key, mode);
            js.expiry = {
                date: eDate,
                size: eDate.length,
                hash: {
                    source: eDateHash,
                    target: eDate.hex_md5_hash()
                }
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
            let blob = new Blob([str2ab(getHTML(name, js, JSON.stringify(js).hex_md5_hash(), expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss"), (expiryDate.validPeriod == 0 ? "长期" : expiryDate.validPeriod + "天")))], {type: "text/html"});
            openDownloadDialog(blob, name.split(".")[0] + ".encrypted.html");
            sleep((jsfile.size / 1024 / 1024 <= 1 ? 1 : jsfile.size / 1024 / 1024) * 1000);
            return {
                name: name,
                type: jsfile.type,
                size: getFileSizeString(jsfile.size, " B"),
                hash1: jsfile.hash.source,
                hash2: jsfile.hash.target,
                time: expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss"),
                commit: true,
                error: null
            };
        } catch (e) {
            return {
                name: name,
                type: type,
                size: getFileSizeString(size, " B"),
                hash1: null,
                hash2: null,
                time: expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss"),
                commit: false,
                error: e
            };
        }
    }

    function checkExpiryDate(expiry, key, mode, server) {
        let checked = {
            server: null,
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
                checked.server = (expiryDate.server == "undefined" ? null : expiryDate.server);
                checked.validPeriod = expiryDate.validPeriod;
                checked.startDate = new Date(expiryDate.startDate);
                checked.endDate = new Date(expiryDate.startDate);
                checked.endDate.setDate(checked.endDate.getDate() + checked.validPeriod);
                checked.days = Math.floor((server.time - checked.startDate) / (1 * 24 * 60 * 60 * 1000));
                if (checked.server == server.server || checked.server == null) {
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
                    checked.information = "当前授时服务器非加密授时服务器.";
                }
            } else {
                checked.information = "解密密码错误";
            }
        } catch (e) {
            checked.information = "解密密码错误," + e;
        }
        return checked;
    }

    function fileDecrypt(filename, data, key, server) {
        let infors = [];
        let infor = {};
        try {
            let js = JSON.parse(data);
            let expiryDate = checkExpiryDate(js.expiry, key, js.mode, server);
            $(filename).getElementsByClassName("file-expiryDate")[0].innerText = (expiryDate.validPeriod == 0 ? "长期" : (expiryDate.endDate == null ? "" : expiryDate.endDate.format("yyyy-MM-dd")));
            if (expiryDate.checked) {
                let count = 0;
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
                                    count++;
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
            td.onclick = function () {
                if (this.getAttribute("de-infs") != "undefined") {
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
    container.id = "ui_fileSecurity";
    container.className = "ui-container-background";
    if (parent === "auto" || parent == null || typeof parent == "undefined") {
        if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
            parent = __CONFIGS__.FULLSCREEN.element;
        } else {
            parent = document.body;
        }
    }
    parent.appendChild(container);

    let content = document.createElement("div");
    content.id = "file-encrypt-decrypt";
    content.className = "ui-container-body";
    content.style.width = "600px";
    container.appendChild(content);

    let title = document.createElement("div");
    title.className = "ui-container-title";
    title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name,__THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

    let span = document.createElement("span");
    span.innerHTML = "文件加密/解密";
    title.appendChild(span);
    let close = __SYS_IMAGES_SVG__.getImage("close",__THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
    close.className = "ui-container-close";
    title.appendChild(close);
    content.appendChild(title);

    let hr = document.createElement("hr");
    hr.className = "ui-container-hr";
    content.appendChild(hr);

    let d = document.createElement("div");
    content.appendChild(d);
    d.className = "tabToolbar";
    let b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "文件列表";
    b.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
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
        for (let i = 0; i < tb.length; i++) {
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
    content.appendChild(source);

    let tablecontainer = document.createElement("div");
    tablecontainer.className = "tabToolbar-content-container";
    tablecontainer.id = "table-container";
    tablecontainer.style.cssText = "width: 98.9%;\n" +
        "height: 300px;\n" +
        "overflow: scroll;\n" +
        "float: left;font-size:90%;";
    tablecontainer.type = "div";
    content.appendChild(tablecontainer);
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
    content.appendChild(inforcontainer);
    inforcontainer.appendChild(viewInfors([]));

    d = document.createElement("div");
    content.appendChild(d);
    span = document.createElement("span");
    span.className = "http-server-datetime";
    span.id = "http-server-datetime-" + new Date().format("yyyyMMddhhmmssS");
    __XMLHTTP__.hook(span, 60000);
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
    enmode.options.add(new Option("DES3", 1));
    enmode.options.add(new Option("Normal", 0));
    enmode.title = "加密方式";
    d.appendChild(enmode);

    hr = document.createElement("hr");
    hr.className = "ui-container-hr";
    content.appendChild(hr);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    content.appendChild(tool);

    let openfiles = document.createElement("button");
    openfiles.className = "button";
    openfiles.innerText = "打开";
    openfiles.onclick = function () {
        $("source-encrypt-file").click();
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";
    };
    tool.appendChild(openfiles);

    let encrypt = document.createElement("button");
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

        let server = {server: __XMLHTTP__.server, time: __XMLHTTP__.time, url: __XMLHTTP__.url};
        if (server.time != null) {
            let files = $("source-encrypt-file").files;
            if (files.length > 0) {
                UI.password.show("文件加密", {
                    "加密密码": "请输入8位密码,且必须包含英文字母和数字.",
                    "再次输入": ""
                }, "auto", function (args, values) {
                    let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/
                    //必须是8位密码,且必须包含字符和数字
                    let key = values["加密密码"];
                    if (key != values["再次输入"]) {
                        UI.alert.show("提示", "两次密码输入不一致.");
                    } else if (pattern.test(key) == false) {
                        UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字.");
                    } else {
                        let mode = $("encrypt-mode").value;
                        for (let i = 0; i < files.length; i++) {
                            let file = files[i];
                            let deinfs = [];
                            if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                                try {
                                    if (file.size <= 20 * 1024 * 1024) {
                                        let reader = new FileReader();
                                        reader.readAsBinaryString(file);
                                        reader.onloadstart = function () {
                                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在加密...";
                                        };
                                        reader.onload = function () {
                                            let deinf = {};
                                            let expiryDate = {
                                                server: server.server,
                                                startDate: server.time,
                                                validPeriod: Number($("encrypt-expiry-date").value),
                                                timestamp: new Date().format("yyyyMMddhhmmssS")
                                            };
                                            if (key.length > 0 && key != null) {
                                                let js = {
                                                    application: {
                                                        link: "<a href='" + window.location.href.split("?")[0] + "'>" + __VERSION__.name + "</a>",
                                                        version: __VERSION__.version,
                                                        help: __VERSION__.url
                                                    },
                                                    mode: mode,
                                                    expiry: {},
                                                    files: []
                                                };
                                                let infor = fileEncrypt(js, this.result, key, file.name, file.type, file.size, mode, expiryDate);
                                                let endDate = new Date(expiryDate.startDate);
                                                endDate.setDate(endDate.getDate() + expiryDate.validPeriod);
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
                                            } else
                                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "请输入8位加密密码!";
                                        }
                                    } else
                                        $(file.name).getElementsByClassName("file-comment")[0].innerText = "明文不能大于20MB.";
                                } catch (e) {
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                                }
                                sleep(1000);
                            }
                        }
                    }
                }, {});
            }
        } else {
            UI.alert.show("提示", "连接授时服务器失败,不能执行文件加密操作.");
        }
    };
    tool.appendChild(encrypt);

    let encryptToPacket = document.createElement("button");
    encryptToPacket.className = "button";
    encryptToPacket.innerText = "打包加密";
    encryptToPacket.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let server = {server: __XMLHTTP__.server, time: __XMLHTTP__.time, url: __XMLHTTP__.url};
        if (server.time != null) {
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
                if (checkedAll.size <= 20 * 1024 * 1024) {
                    UI.password.show("文件加密", {
                        "加密密码": "请输入8位密码,且必须包含英文字母和数字.",
                        "再次输入": ""
                    }, "auto", function (args, values) {
                        let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                        //必须是8位密码,且必须包含字符和数字
                        let key = values["加密密码"];
                        if (key !== values["再次输入"]) {
                            UI.alert.show("提示", "两次密码输入不一致.");
                        } else if (pattern.test(key) == false) {
                            UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字.");
                        } else {
                            UI.prompt.show("输入", {"打包文件名称": ""}, "auto", function (args, values) {
                                let pkname = values["打包文件名称"];
                                let mode = args["mode"];
                                let js = args["js"];
                                let files = args["files"];
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
                                                    let expiryDate = {
                                                        server: server.server,
                                                        startDate: server.time,
                                                        validPeriod: Number($("encrypt-expiry-date").value),
                                                        timestamp: new Date().format("yyyyMMddhhmmssS")
                                                    };
                                                    if (key.length > 0) {
                                                        let infor = filesEncrypt(js, this.result, key, file.name, file.type, file.size, mode, expiryDate);
                                                        let endDate = new Date(expiryDate.startDate);
                                                        endDate.setDate(endDate.getDate() + expiryDate.validPeriod);
                                                        $(file.name).getElementsByClassName("file-expiryDate")[0].innerText = (expiryDate.validPeriod == 0 ? "长期" : endDate.format("yyyy-MM-dd"));
                                                        for (let name in infor) {
                                                            let toname = "";
                                                            switch (name) {
                                                                case "name":
                                                                    toname = "文件名称";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "left"
                                                                    };
                                                                    break;
                                                                case "type":
                                                                    toname = "文件类型";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "left"
                                                                    };
                                                                    break;
                                                                case "size":
                                                                    toname = "文件大小";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "right"
                                                                    };
                                                                    break;
                                                                case "hash1":
                                                                    toname = "原文校验";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "left"
                                                                    };
                                                                    break;
                                                                case "hash2":
                                                                    toname = "密文校验";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "left"
                                                                    };
                                                                    break;
                                                                case "commit":
                                                                    toname = "执行情况";
                                                                    infor.commit = (infor.commit ? "加密成功" : "加密失败");
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "center"
                                                                    };
                                                                    break;
                                                                case "error":
                                                                    toname = "错误信息";
                                                                    deinf[toname] = {
                                                                        value: infor[name],
                                                                        textAlign: "left"
                                                                    };
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
                                                        let time = expiryDate.startDate.format("yyyy-MM-dd hh:mm:ss");
                                                        let validPeriod = (expiryDate.validPeriod == 0 ? "长期" : expiryDate.validPeriod + "天");
                                                        let blob = new Blob([str2ab(getHTML((pkname.length > 0 ? pkname : "未命名"), js, JSON.stringify(js).hex_md5_hash(), time, validPeriod))], {type: "text/html"});
                                                        openDownloadDialog(blob, (pkname.length > 0 ? pkname : "未命名") + ".encrypted.html");
                                                    }
                                                }
                                            } else
                                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "明文不能大于20MB.";
                                        } catch (e) {
                                            $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                                        }
                                    }
                                }
                            }, {
                                mode: $("encrypt-mode").value,
                                js: {
                                    application: {
                                        link: "<a href='" + window.location.href.split("?")[0] + "'>" + __VERSION__.name + "</a>",
                                        version: __VERSION__.version,
                                        help: __VERSION__.url
                                    },
                                    mode: $("encrypt-mode").value,
                                    expiry: {},
                                    files: []
                                },
                                files: files
                            });
                        }
                    }, {});
                }
                else {
                    UI.alert.show("提示", "明文累计不能大于20MB.");
                }
            }
        } else {
            UI.alert.show("提示", "连接授时服务器失败,不能执行文件加密操作.");
        }
    };
    tool.appendChild(encryptToPacket);

    let decrypt = document.createElement("button");
    decrypt.className = "button";
    decrypt.innerText = "解密";
    decrypt.onclick = function () {
        $("table-container").style.display = "block";
        $("infor-container").style.display = "none";
        let tb = $("file-encrypt-decrypt").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        let server = {server: __XMLHTTP__.server, time: __XMLHTTP__.time, url: __XMLHTTP__.url};
        if (server.time != null) {
            let files = $("source-encrypt-file").files;
            if (files.length > 0) {
                UI.password.show("文件解密", {"解密密码": "请输入8位密码,且必须包含英文字母和数字."}, "auto", function (args, values) {
                    let key = values["解密密码"];
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
                                        let reg = new RegExp(/\<code>(.*)\<\/code>/, "g");
                                        let codes = this.result.match(reg);
                                        let infors = null;
                                        if (codes != null) {
                                            if (codes.length >= 2) {
                                                let ciphertext = codes[0];
                                                let hash = codes[1];
                                                ciphertext = ciphertext.substring(ciphertext.indexOf("<code>") + 6, ciphertext.indexOf("</code>"));
                                                hash = hash.substring(hash.indexOf("<code>") + 6, hash.indexOf("</code>"));
                                                if (ciphertext.hex_md5_hash() == hash)
                                                    infors = fileDecrypt(file.name, ciphertext, key, server);
                                                else
                                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "密文校验失败,文件或被篡改";
                                            } else {
                                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "该文档非加密文件";
                                            }
                                        } else {
                                            infors = fileDecrypt(file.name, this.result, key, server);
                                            //$(file.name).getElementsByClassName("file-comment")[0].innerText = "该文档非加密文件";
                                        }
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
                }, {});
            }
        } else {
            UI.alert.show("提示", "连接授时服务器失败,不能执行文件解密操作.");
        }
    };
    tool.appendChild(decrypt);

    let cancel = document.createElement("button");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        __XMLHTTP__.unhook($1("http-server-datetime",0));
        parent.removeChild($("ui_fileSecurity"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}
