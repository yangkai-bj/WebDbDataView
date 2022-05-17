function getMailComponent(parent) {
    let MAIL_TOTAL_MAXLENGTH = 4000;
    let MAIL_INDEX_MAXLENGTH = 55;
    let MAIL_MAILTO_MAXLENGTH = 50;
    let MAIL_CC_MAXLENGTH = 10;
    let MAIL_BCC_MAXLENGTH = 5;
    let MAIL_SUBJECT_MAXLENGTH = 128;
    let MAIL_BODY_MAXLENGTH = 500;
    let MAIL_ATTACHMENTS_MAXLENGTH = 15;

    let COLUMNS = ["索引", "主送", "主题", "正文", "抄送", "密送", "附件"];
    let MAILS = {
        // "测试": {
        // mailto: ["yangkai.bj@ccb.com"],
        // subject: "测试",
        // body: "测试",
        // cc: ["yangkai.bj@ccb.com"],
        // bcc: ["yangkai.bj@ccb.com"],
        // attach: ["http://127.0.0.1;http://127.0.0.1"],
        // checked: false
        // }
    };

    function fixFileName(str) {
        //文件名称合法性修正。
        let sts = ['\\', '\/', ':', '*', '?', '"', '<', '>', '[', ']', '|'];
        for (let i = 0; i < sts.length; i++) {
            str = str.replaceAll(sts[i], "#");
        }
        return str;
    }

    function getEncodeUrl(source) {
        source = source.toString();
        let code = {
            反斜线: {source: '\\', target: '%5C'},
            斜线: {source: '\/', target: '%2F'},
            回车: {source: '\r', target: '%0D'},
            换行: {source: '\n', target: '%0A'},
            空格: {source: ' ', target: '%20'},
            逗号: {source: ',', target: '%2C'},
            双引号: {source: '"', target: '%22'},
            tab: {source: '\t', target: '%09'}
        };
        for (let key in code) {
            source = source.replaceAll(code[key].source, code[key].target);
        }
        return source;
    }

    function getDecodeUrl(source) {
        source = source.toString();
        let code = {
            反斜线: {source: '\\', target: '%5C'},
            斜线: {source: '\/', target: '%2F'},
            回车: {source: '\r', target: '%0D'},
            换行: {source: '\n', target: '%0A'},
            空格: {source: ' ', target: '%20'},
            逗号: {source: ',', target: '%2C'},
            双引号: {source: '"', target: '%22'},
            tab: {source: '\t', target: '%09'}
        };
        for (let key in code) {
            source = source.replaceAll(code[key].target, code[key].source);
        }
        return source;
    }

    function getAttachValue(parent) {
        let list = parent.getElementsByClassName("attach");
        let attachments = [];
        for (let i = 0; i < list.length; i++) {
            if (i <= (MAIL_ATTACHMENTS_MAXLENGTH - 1)) {
                let attach = list[i].getAttribute("name") + "<" + list[i].getAttribute("url") + ">";
                attachments.push(attach);
            } else {
                UI.alert.show("提示", "最多允许" + MAIL_ATTACHMENTS_MAXLENGTH + "个附件.", "auto");
                break;
            }
        }
        return attachments.join(";");
    }

    function setAttachItems(parent, values) {
        parent.innerText = "";
        let list = values.split(";").wash();
        for (let i = 0; i < list.length; i++) {
            if (i <= (MAIL_ATTACHMENTS_MAXLENGTH - 1)) {
                let item = list[i].split("<");
                let result = {name: null, url: null};
                if (item.length >= 2) {
                    result.name = item[0];
                    result.url = item[1].split(">")[0];
                } else {
                    let url = item[0].split("/");
                    result.name = url[url.length - 1];
                    result.url = item[0];
                }
                let attach = document.createElement("a");
                attach.className = "attach";
                let radio = document.createElement("input");
                radio.id = result.name;
                radio.type = "radio";
                radio.name = "attach";
                radio.style.cssText = "vertical-align:-3px;";
                attach.appendChild(radio);
                let name = document.createElement("span");
                name.innerText = attach.title = result.name;
                attach.appendChild(name);
                attach.href = result.url;
                attach.target = "_blank";
                attach.setAttribute("name", result.name);
                attach.setAttribute("url", result.url);
                attach.style.cssText = "padding:0px 0;width:20%;" +
                    "cursor: pointer;float:left;overflow: hidden;" +
                    "white-space: nowrap;" +
                    "word-break: keep-all;" +
                    "text-overflow: ellipsis;" +
                    "-o-text-overflow: ellipsis;" +
                    "border-bottom:1px solid var(--main-border-color)";
                parent.appendChild(attach);
            } else {
                UI.alert.show("提示", "最多允许" + MAIL_ATTACHMENTS_MAXLENGTH + "个附件.", "auto");
                break;
            }
        }
    }

    function checkMailFormat(maillist){
        let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let result = maillist.reduce(function(rel,item) {
            if (pattern.test(item) != true)
                rel.push(item);
            return rel;
        },[]);
        return result;
    }

    function getMail(key) {
        let mail = MAILS[key];
        $("ui_mail_index").value = key;
        $("ui_mail_mailto").value = getDecodeUrl(mail.mailto.join(";"));
        $("ui_mail_cc").value = getDecodeUrl(mail.cc.join(";"));
        $("ui_mail_bcc").value = getDecodeUrl(mail.bcc.join(";"));
        $("ui_mail_subject").value = getDecodeUrl(mail.subject);
        $("ui_mail_body").value = getDecodeUrl(mail.body);
        setAttachItems($("ui_mail_attach_container"), getDecodeUrl(mail.attach.join(";")));

        $("mails-container").style.display = "none";
        $("mail-detail").style.display = "block";
    }

    function getLink(key, mail) {
        let text = ["mailto:" + mail.mailto.join(";")];
        let items = [];
        if (mail.cc.length > 0 && mail.cc.join(";") != "")
            items.push("cc=" + mail.cc.join(";"));
        if (mail.bcc.length > 0 && mail.bcc.join(";") != "")
            items.push("bcc=" + mail.bcc.join(";"));
        if (mail.subject.length > 0)
            items.push("subject=" + mail.subject.toString());
        let body = [];
            body.push("❀" + key + "%0D%0A");
        if (mail.body.length > 0 || mail.attach.length > 0) {
            if (mail.body.length > 0 && mail.body.trim() != "")
                body.push(mail.body.toString());
            if (mail.attach.length > 0 && mail.attach.join("%0D%0A") != "")
                body.push("%0D%0A☘附件:%0D%0A" + mail.attach.join("%0D%0A"));
        }
        items.push("body=" + body.join("%0D%0A"));
        text.push(items.join("&"));
        text = text.join("?");
        //text = encodeURIComponent(text);
        //text = encodeURI(text);
        return text;
    }

    function getMailList(table) {
        table.innerText = "";
        let tr = document.createElement("tr");
        tr.className = "tr";
        table.appendChild(tr);

        let th = document.createElement("th");
        th.style.width = "36px";
        let check = document.createElement("input");
        check.type = "checkbox";
        check.className = "mail-checkbox-all";
        check.style.width = check.style.height = "16px";
        check.onchange = function () {
            for (let key in MAILS) {
                MAILS[key].checked = this.checked;
            }
            let checkboxes = $1("mail-checkbox");
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = this.checked;
                this.checked ? checkboxes[i].setAttribute("checked", "checked") : checkboxes[i].removeAttribute("checked");
            }
        };
        th.style.textAlign = "center";
        th.appendChild(check);
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "36px";
        th.innerText = "序号";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "130px";
        th.innerText = "索引";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "120px";
        th.innerText = "主送";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "150px";
        th.innerText = "主题";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "120px";
        th.innerText = "正文";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "120px";
        th.innerText = "抄送";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "120px";
        th.innerText = "密送";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "120px";
        th.innerText = "附件链接";
        tr.appendChild(th);
        let i = 0;
        for (let key in MAILS) {
            let mail = MAILS[key];
            let tr = document.createElement("tr");
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            tr.setAttribute("value", key);
            table.appendChild(tr);

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "mail-checkbox";
            check.style.width = check.style.height = "16px";
            check.setAttribute("value", key);
            if (MAILS[key].checked)
                check.setAttribute("checked", "checked");
            check.onchange = function () {
                if (this.checked)
                    this.removeAttribute("checked");
                else
                    this.setAttribute("checked", "checked");
                MAILS[this.getAttribute("value")].checked = this.checked;
            };
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.style.width = "36px";
            td.style.textAlign = "center";
            td.innerText = i + 1;
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "130px";
            let link = document.createElement("a");
            link.className = "mail-link";
            link.hreflang = "zh-cn";
            link.type = "text/html";
            link.innerText = key;
            link.href = getLink(key, mail);
            link.target = null;
            //必须增加,否则将导致主页面退出
            link.title = link.href.getBytesSize() > MAIL_TOTAL_MAXLENGTH ? "邮件整体超过" + MAIL_TOTAL_MAXLENGTH + "字节,可能无法发送." : link.href.getBytesSize() + " 字节 / " + MAIL_TOTAL_MAXLENGTH + " 字节";
            td.appendChild(link);
            tr.appendChild(td);

            td = document.createElement("td");
            td.style.width = "120px";
            td.innerText = getDecodeUrl(mail.mailto.join(";"));
            td.title = mail.mailto.length + " 人";
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "150px";
            td.innerText = getDecodeUrl(mail.subject);
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "120px";
            td.style.textAlign = "right";
            td.innerText = getFileSizeString(mail.body.getBytesSize(), " 字节") + " / " + MAIL_BODY_MAXLENGTH + " 字节";
            td.title = mail.body.getBytesSize() > MAIL_BODY_MAXLENGTH ? "正文超过" + MAIL_BODY_MAXLENGTH + "字节,可能无法发送." : "";
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "120px";
            td.innerText = getDecodeUrl(mail.cc.join(";"));
            td.title = mail.cc.length + " 人";
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "120px";
            td.innerText = getDecodeUrl(mail.bcc.join(";"));
            td.title = mail.bcc.length + " 人";
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };

            td = document.createElement("td");
            td.style.width = "120px";
            td.style.textAlign = "center";
            td.innerText = mail.attach.length + " 个";
            td.title = "最多允许" + MAIL_ATTACHMENTS_MAXLENGTH + "个附件.";
            tr.appendChild(td);
            td.onclick = function () {
                getMail(this.parentNode.getAttribute("value"));
            };
            i += 1;
        }
    }

    if (parent == "auto" || parent == null) {
        if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
            parent = __CONFIGS__.FULLSCREEN.element;
        } else {
            parent = document.body;
        }
    }

    let container = document.createElement("div");
    container.id = "ui-mail-component";
    container.className = "ui-container-background";
    parent.appendChild(container);

    let content = document.createElement("div");
    content.id = "mail-component";
    content.className = "ui-container-body";
    content.style.width = "600px";
    container.appendChild(content);

    let title = document.createElement("div");
    title.className = "ui-container-title";
    title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name,__THEMES__.get().color, "24px", "24px");

    let span = document.createElement("span");
    span.innerHTML = "邮件编辑";
    title.appendChild(span);
    let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
    close.className = "ui-container-close";
    title.appendChild(close);
    content.appendChild(title);

    let hr = document.createElement("hr");
    hr.className = "ui-container-hr";
    content.appendChild(hr);

    let tabtools = document.createElement("div");
    tabtools.className = "tabToolbar";
    tabtools.id = "imageTabToolbar";
    let b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "列表";
    b.onclick = function () {
        $("mails-container").style.display = "block";
        $("mail-detail").style.display = "none";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        this.style.background = "var(--toolbar-button-hover-background-color)";
    };
    tabtools.appendChild(b);
    b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "详细";
    b.onclick = function () {
        $("mails-container").style.display = "none";
        $("mail-detail").style.display = "block";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        this.style.background = "var(--toolbar-button-hover-background-color)";
    };
    tabtools.appendChild(b);
    content.appendChild(tabtools);

    let source = document.createElement("input");
    source.type = "file";
    source.id = "source-mail-file";
    source.style.display = "none";
    source.onchange = function () {
        function fixData(data) {
            //文件流转BinaryString
            let tmp = "";
            let l = 0;
            let w = 10240;
            for (; l < data.byteLength / w; ++l) tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return tmp;
        }

        let file = this.files[0];
        let reader = new FileReader();
        let rABS = true;
        reader.onload = function (e) {
            let data = e.target.result;
            let workbook;
            if (rABS) {
                workbook = XLSX.read(data, {type: "binary"});
            } else {
                workbook = XLSX.read(btoa(fixData(data)), {type: "base64"});
            }
            let sheetNames = workbook.SheetNames;
            let items = {};
            let dataset = [];
            for (let i = 0; i < sheetNames.length; i++) {
                let worksheet = workbook.Sheets[sheetNames[i]];
                let csv = XLSX.utils.sheet_to_csv(worksheet);
                dataset.push(csv);
                items[sheetNames[i]] = {value: i, checked: false};
            }
            UI.choise.show("请选择", items, "radio", "auto", function (dataset, values) {
                for (let key in values) {
                    if (values[key].checked) {
                        let sep = ",";
                        let lines = dataset[values[key].value].split("\r\n");
                        if (lines.length == 1)
                            lines = dataset[values[key].value].split("\n");

                        MAILS = {};
                        for (let i = 0; i < lines.length; i++) {
                            if (i >= 1) {
                                let row = lines[i].split(sep);
                                if (row.length >= 7) {
                                    MAILS[row[0]] = {
                                        mailto: row[1].split(";").wash(),
                                        subject: row[2],
                                        body: row[3],
                                        cc: row[4].split(";").wash(),
                                        bcc: row[5].split(";").wash(),
                                        attach: row[6].split(";").wash(),
                                        checked: false
                                    }
                                }
                            }
                        }
                        getMailList($("mails-list-table"));
                    }
                }
            }, dataset);
        };
        try {
            reader.readAsBinaryString(file);
        } catch (e) {
            reader.readAsArrayBuffer(file);
            rABS = false;
        }
        this.value = null;
    };
    content.appendChild(source);

    let contentContainer = document.createElement("div");
    contentContainer.className = "tabToolbar-content-container";
    contentContainer.id = "mails-container";
    contentContainer.style.overflow = "hidden";
    contentContainer.style.width = "100%";
    contentContainer.style.height = "370.8px";
    content.appendChild(contentContainer);

    let mailscontainer = document.createElement("div");
    mailscontainer.className = mailscontainer.id = "table-container";
    mailscontainer.style.cssText = "width: 100%;" +
        "height: 100%;" +
        "overflow: scroll;" +
        "position: relative;" +
        "float: left;";
    contentContainer.appendChild(mailscontainer);
    let table = document.createElement("table");
    mailscontainer.appendChild(table);
    table.id = "mails-list-table";
    table.className = "table";
    table.style.tableLayout = "fixed";
    table.style.width = "100%";
    getMailList(table);

    let maildetail = document.createElement("div");
    maildetail.className = "tabToolbar-content-container";
    maildetail.id = "mail-detail";
    maildetail.style.cssText = "width: 100%;\n" +
        "height: 370.8px;\n" +
        "display: none;padding-top:6px";
    content.appendChild(maildetail);

    let item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.paddingTop = "3px";
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.title = "索引";
    span.innerText = "索引" + " : ";
    span.style.cssText = "margin-left:10px;width:50px;";
    item.appendChild(span);
    let input = document.createElement("input");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_index";
    input.value = "";
    input.title = "最多 " + MAIL_INDEX_MAXLENGTH + " 字节";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.getBytesSize() + "字节 / " + MAIL_INDEX_MAXLENGTH + "字节";
        if (this.value.getBytesSize() > MAIL_INDEX_MAXLENGTH)
            UI.alert.show("注意", "邮件索引不能超过" + MAIL_INDEX_MAXLENGTH + "字节", "auto");
    };
    input.style.width = "88%";
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.paddingTop = "3px";
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.title = "主送";
    span.innerText = "主送" + " : ";
    span.style.cssText = "margin-left:10px;width:50px;";
    item.appendChild(span);
    input = document.createElement("input");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_mailto";
    input.value = "";
    input.title = "最多 " + MAIL_MAILTO_MAXLENGTH + " 人";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.split(";").wash().length + "人 / " + MAIL_MAILTO_MAXLENGTH + "人";
        if (this.value.split(";").wash() > MAIL_MAILTO_MAXLENGTH)
            UI.alert.show("注意", "邮件主送不能超过" + MAIL_MAILTO_MAXLENGTH + "人", "auto");
    };
    input.style.width = "88%";
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.paddingTop = "3px";
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.title = "抄送";
    span.innerText = "抄送" + " : ";
    span.style.cssText = "margin-left:10px;width:50px;";
    item.appendChild(span);
    input = document.createElement("input");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_cc";
    input.value = "";
    input.title = "最多 " + MAIL_CC_MAXLENGTH + " 人";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.split(";").wash().length + "人 / " + MAIL_CC_MAXLENGTH + "人";
        if (this.value.split(";").wash() > MAIL_CC_MAXLENGTH)
            UI.alert.show("注意", "邮件抄送不能超过" + MAIL_CC_MAXLENGTH + "人", "auto");
    };
    input.style.width = "88%";
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.paddingTop = "3px";
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.title = "密送";
    span.innerText = "密送" + " : ";
    span.style.cssText = "margin-left:10px;width:50px;";
    item.appendChild(span);
    input = document.createElement("input");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_bcc";
    input.value = "";
    input.title = "最多 " + MAIL_BCC_MAXLENGTH + " 人";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.split(";").wash().length + "人 / " + MAIL_BCC_MAXLENGTH + " 人";
        if (this.value.split(";").wash() > MAIL_BCC_MAXLENGTH)
            UI.alert.show("注意", "邮件密送不能超过" + MAIL_BCC_MAXLENGTH + "人", "auto");
    };
    input.style.width = "88%";
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.paddingTop = "3px";
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.title = "主题";
    span.innerText = "主题" + " : ";
    span.style.cssText = "margin-left:10px;width:50px;";
    item.appendChild(span);
    input = document.createElement("input");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_subject";
    input.value = "";
    input.title = "最长 " + MAIL_SUBJECT_MAXLENGTH + " 字节";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.getBytesSize() + "字节 / " + MAIL_SUBJECT_MAXLENGTH + "字节";
        if (this.value.getBytesSize() > MAIL_SUBJECT_MAXLENGTH)
            UI.alert.show("注意", "邮件主题不能超过" + MAIL_SUBJECT_MAXLENGTH + "字节", "auto");
    };
    input.style.width = "88%";
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.height = "150px";
    input = document.createElement("textarea");
    input.className = "ui-container-item-input";
    input.id = "ui_mail_body";
    input.type = "textarea";
    input.style.cssText = "width: 94.5%;" +
        "height: 100%;" +
        "resize: none;" +
        "margin-left:10px;padding-left: 10px;";
    input.value = "";
    input.title = "最长 " + MAIL_BODY_MAXLENGTH + " 字节";
    input.onkeypress = input.onchange = input.oncut = input.ondragend = input.oninput = function () {
        this.title = this.value.getBytesSize() + "字节 / " + MAIL_BODY_MAXLENGTH + "字节";
        if (this.value.getBytesSize() > MAIL_BODY_MAXLENGTH)
            UI.alert.show("注意", "邮件正文不能超过" + MAIL_BODY_MAXLENGTH + "字节", "auto");
    };
    item.appendChild(input);
    maildetail.appendChild(item);

    item = document.createElement("div");
    item.className = "ui-container-item";
    item.style.width = "100%";
    item.style.height = "75px";

    let div = document.createElement("div");
    div.style.cssText = "width:10%;height:100%;position: relative;float:left;";
    item.appendChild(div);
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.innerText = "附件";
    span.style.cssText = "width:100%;height:26%;text-align:center";
    div.appendChild(span);

    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.appendChild(__SYS_IMAGES_SVG__.getImage("add", __THEMES__.get().color,"20px", "20px", null, __THEMES__.get().hover));
    //span.innerHTML = "[➕]";
    span.title = "上传附件";
    span.style.cssText = "width:100%;height:26%;margin:0px;cursor:pointer;text-align:center;color: brown;font-weight: bolder;";
    span.onclick = function () {
        UI.uploadFile("上传附件", "auto", function (results) {
            let list = $("ui_mail_attach_container");
            for (let i = 0; i < results.length; i++) {
                if (list.getElementsByClassName("attach").length < MAIL_ATTACHMENTS_MAXLENGTH) {
                    let result = results[i];
                    let attach = document.createElement("a");
                    attach.className = "attach";
                    let radio = document.createElement("input");
                    radio.id = result.name;
                    radio.type = "radio";
                    radio.name = "attach";
                    radio.style.cssText = "vertical-align:-3px;";
                    attach.appendChild(radio);
                    let name = document.createElement("span");
                    name.innerText = attach.title = result.name;
                    attach.appendChild(name);
                    attach.href = result.url;
                    attach.target = "_blank";
                    attach.setAttribute("name", result.name);
                    attach.setAttribute("url", result.url);
                    attach.style.cssText = "padding:0px 0;width:20%;" +
                        "cursor: pointer;float:left;overflow: hidden;" +
                        "white-space: nowrap;" +
                        "word-break: keep-all;" +
                        "text-overflow: ellipsis;" +
                        "-o-text-overflow: ellipsis;" +
                        "border-bottom:1px solid var(--main-border-color)";
                    list.appendChild(attach);
                } else {
                    UI.alert.show("提示", "最多允许" + MAIL_ATTACHMENTS_MAXLENGTH + "个附件.", "auto");
                    break;
                }
            }
        }, {
            path: location.href.split("/").slice(0, location.href.split("/").length - 1).join("/") + __CONFIGS__.TEMPORARY_FILES,
            user: (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "None")
        });
    };
    div.appendChild(span);
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.appendChild(__SYS_IMAGES_SVG__.getImage("subtract", __THEMES__.get().color,"20px", "20px", null, __THEMES__.get().hover));
    // span.innerHTML = "[➖]";
    span.title = "删除附件";
    span.style.cssText = "width:100%;height:26%;margin:0px;cursor:pointer;text-align:center;color: brown;font-weight: bolder;";
    span.onclick = function () {
        let radio = $("ui_mail_attach_container").getElementsByTagName("input");
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                $("ui_mail_attach_container").removeChild(radio[i].parentNode);
                break;
            }
        }
    };
    div.appendChild(span);
    div.appendChild(span);
    span = document.createElement("span");
    span.className = "ui-container-item-name";
    span.appendChild(__SYS_IMAGES_SVG__.getImage("del", __THEMES__.get().color,"20px", "20px", null, __THEMES__.get().hover));
    // span.innerHTML = "[❌]";
    span.title = "清空附件";
    span.style.cssText = "width:100%;height:26%;margin:0px;cursor:pointer;text-align:center;color: brown;font-weight: bolder;";
    span.onclick = function () {
        $("ui_mail_attach_container").innerText = "";
    };
    div.appendChild(span);

    let attach = document.createElement("div");
    attach.id = "ui_mail_attach_container";
    attach.style.cssText = "width:85%;position: relative;float:right;height:100%;";
    item.appendChild(attach);

    maildetail.appendChild(item);

    let br = document.createElement("hr");
    br.className = "br";
    content.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    content.appendChild(tool);

    let add = document.createElement("div");
    add.className = "button";
    add.id = "add";
    add.innerText = "新增";
    add.onclick = function () {
        $("mails-container").style.display = "none";
        $("mail-detail").style.display = "block";
        $("ui_mail_index").value = "";
        $("ui_mail_mailto").value = "";
        $("ui_mail_cc").value = "";
        $("ui_mail_bcc").value = "";
        $("ui_mail_subject").value = "";
        $("ui_mail_body").value = "";
        $("ui_mail_attach_container").innerText = "";
    };
    tool.appendChild(add);

    let save = document.createElement("div");
    save.className = "button";
    save.id = "save";
    save.innerText = "保存";
    save.onclick = function () {
        $("mails-container").style.display = "none";
        $("mail-detail").style.display = "block";
        if ($("ui_mail_index").value.length > 0 && $("ui_mail_mailto").value.length) {
            let mail = {
                mailto: getEncodeUrl($("ui_mail_mailto").value).split(";").wash(),
                cc: getEncodeUrl($("ui_mail_cc").value).split(";").wash(),
                bcc: getEncodeUrl($("ui_mail_bcc").value).split(";").wash(),
                subject: getEncodeUrl($("ui_mail_subject").value),
                body: getEncodeUrl($("ui_mail_body").value),
                attach: getEncodeUrl(getAttachValue($("ui_mail_attach_container"))).split(";").wash(),
                checked: false
            };
            let mailto_checked = checkMailFormat($("ui_mail_mailto").value.split(";").wash());
            let cc_checked = checkMailFormat($("ui_mail_cc").value.split(";").wash());
            let bcc_checked = checkMailFormat($("ui_mail_bcc").value.split(";").wash());
            if (mailto_checked.length > 0)
                UI.alert.show("主送邮箱校验错误", "<li>" + mailto_checked.join("</li><li>") + "</li>", "auto");
            else if (cc_checked.length > 0)
                UI.alert.show("抄送邮箱校验错误", "<li>" + cc_checked.join("</li><li>") + "</li>", "auto");
            else if (bcc_checked.length > 0)
                UI.alert.show("密送邮箱校验错误", "<li>" + bcc_checked.join("</li><li>") + "</li>", "auto");
            else {
                MAILS[$("ui_mail_index").value] = mail;
                UI.alert.show("提示", " 邮件已保存."
                    + "<li>索引: " + $("ui_mail_index").value + "</li>"
                    + "<li>主题: " + getDecodeUrl(mail.subject) + "</li>"
                    + "<li>主送: " + mail.mailto.length + "人</li>"
                    + "<li>抄送: " + mail.cc.length + "人</li>"
                    + "<li>密送: " + mail.bcc.length + "人</li>"
                    + "<li>正文: " + mail.body.getBytesSize() + "字节</li>"
                    + "<li>附件: " + mail.attach.length + "个</li>",
                    "auto",
                    function () {
                        $("mails-container").style.display = "block";
                        $("mail-detail").style.display = "none";
                        getMailList($("mails-list-table"));
                    });
            }
        } else
            UI.alert.show("注意", "请填写邮件索引和主送.", "auto");
    };
    tool.appendChild(save);

    let del = document.createElement("div");
    del.className = "button";
    del.id = "del";
    del.innerText = "删除";
    del.onclick = function () {
        $("mails-container").style.display = "block";
        $("mail-detail").style.display = "none";
        UI.confirm.show("注意", "您确定要删除选中的邮件吗?", "auto", function () {
            for (let key in MAILS) {
                if (MAILS[key].checked) {
                    delete MAILS[key];
                }
            }
        });
        getMailList($("mails-list-table"));
    };
    tool.appendChild(del);

    let show = document.createElement("button");
    show.className = "button";
    show.innerText = "导入";
    show.onclick = function () {
        $("mails-container").style.display = "block";
        $("mail-detail").style.display = "none";
        $("source-mail-file").click();
    };
    tool.appendChild(show);

    let downModel = document.createElement("div");
    downModel.className = "button";
    downModel.id = "downModel";
    downModel.innerText = "导出";
    downModel.onclick = function () {
        $("mails-container").style.display = "block";
        $("mail-detail").style.display = "none";
        let sheets = [];
        let sheetNames = ["邮件模板"];
        let aoa = [];
        aoa.push(COLUMNS);
        if (JSON.stringify(MAILS) === "{}") {
            let row = [
                "索引", "主送列表(多人以分号连接)", "主题(标点符号必须使用全角字符)", "正文(标点符号必须使用全角字符，单元格内不能强制换行)", "抄送列表(多人以分号连接)", "密送列表(多人以分号连接)", "附件链接列表(多附件以分号连接)"
            ];
            aoa.push(row);
        } else {
            for (let key in MAILS) {
                let mail = MAILS[key];
                let row = [
                    key,
                    mail.mailto.join(";"),
                    mail.subject.toString(),
                    mail.body.toString(),
                    mail.cc.join(";"),
                    mail.bcc.join(";"),
                    mail.attach.join(";")
                ];
                aoa.push(row);
            }
        }

        sheets.push(aoa);
        UI.prompt.show("输入", {"文件名称": ""}, "auto", function (args, values) {
            let title = fixFileName(values["文件名称"]);
            if (title.trim() != "") {
                openDownloadDialog(workbook2blob(args.sheets, args.sheetNames), title + ".xlsx");
            }
        }, {sheets: sheets, sheetNames: sheetNames});

    };
    tool.appendChild(downModel);

    let send = document.createElement("div");
    send.className = "button";
    send.id = "send";
    send.innerText = "发送";
    send.onclick = function () {
        $("mails-container").style.display = "block";
        $("mail-detail").style.display = "none";
        let links = $1("mail-link");
        for (let i = 0; i < links.length; i++) {
            if (MAILS[links[i].innerText].checked) {
                setTimeout(function () {
                    window.open(links[i].href, links[i].target);
                    //不能使用location.href,否则覆盖当前地址导致WebSocket服务器断开.
                    //window.open中target=null.
                    //不能解决同时弹出多个窗口.
                }, 1000)
            }
        }
    };
    tool.appendChild(send);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        parent.removeChild($("ui-mail-component"));
    };
    tool.appendChild(cancel);
    setDialogDrag(title);
}