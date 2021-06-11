var __hexcase__ = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var __b64pad__  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var __chrsz__   = 16;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) {
        event = new MouseEvent('click');
    } else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

function getImageBase64Code() {
    let container = document.createElement("div");
    container.id = "image-base64-code";
    container.className = "table-data-format";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 图片转码";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let filecontainer = document.createElement("div");
    filecontainer.className = filecontainer.id = "edit-container";
    container.appendChild(filecontainer);
    let source = document.createElement("input");
    source.type = "file";
    source.id = "source-image-file";
    source.placeholder = "请选择图片文件.";
    filecontainer.appendChild(source);

    let edit = document.createElement("textarea");
    edit.id = "source-image-file-code";
    edit.style.cssText = "width: 98.9%;\n" +
        "height: 300px;\n" +
        "resize: none;";
    edit.type = "textarea";
    edit.setAttribute("readonly", "readonly");
    filecontainer.appendChild(edit);

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "转换";
    confirm.onclick = function () {
        ///检验是否为图像文件
        let file = $("source-image-file").files[0];
        if (!/image\/\w+/.test(file.type)) {
            alert("请选择图片文件！");
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $("source-image-file-code").value = this.result;
        }
    };
    tool.appendChild(confirm);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("image-base64-code").parentNode.removeChild($("image-base64-code"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

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

    function fileEncrypt(data, key, name, type, size) {
        try {
            let hash1 = data.hex_md5_hash();
            data = data.encrypt(key);
            let js = {
                name: {title: name.str2binary(), size: name.length},
                file: data,
                type: type,
                size: size,
                hash1: hash1,
                hash2: data.hex_md5_hash(),
                time: getNow()
            };
            let blob = new Blob([s2ab(JSON.stringify(js))], {type: "application/octet-stream"});
            openDownloadDialog(blob, name + ".encrypted");
            return {
                name: name,
                type: js.type,
                size: js.size + " bytes",
                hash1: js.hash1,
                hash2: js.hash2,
                time: js.time,
                commit: "加密成功"
            };
        } catch (e) {
            return {
                name: name,
                type: type,
                size: size + " bytes",
                commit: "加密失败",
                error: e,
            };
        }
    }

    function fileDecrypt(data, key) {
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
            infor.name = js.name.title.binary2str().substring(0, js.name.size);
            infor.type = js.type;
            infor.size = js.size + " bytes";
            let hash2 = js.file.hex_md5_hash();
            infor.hash2 = [js.hash2, "[" + (js.hash2 == hash2?"✓":"✗") + "]"].join(" ");
            if (js.hash2 == hash2) {
                data = js.file.decrypt(key);
                let size = data.length;
                if (js.size <= size) {
                    data = data.substring(0, js.size);
                    let hash1 = data.hex_md5_hash();
                    infor.hash1 = [js.hash1, "[" + (js.hash1 == hash1?"✓":"✗") + "]"].join(" ");
                    if (js.hash1 == hash1) {
                        let blob = new Blob([s2ab(data)], {type: js.type});
                        openDownloadDialog(blob, js.name.title.binary2str().substring(0, js.name.size));
                        infor.commit = "解密成功";
                    } else {
                        infor.commit = "解密失败";
                        infor.error = "原始文件完整性校验未通过";
                    }
                } else {
                    infor.commit = "解密失败";
                    infor.error = "解密密码错误";
                }
            } else {
                infor.commit = "解密失败";
                infor.error = "加密文件完整性校验未通过";
            }
        } catch (e) {
            infor.commit = "非加密文件,无法解密";
            infor.error = e;
        }
        return infor;
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
            tr.appendChild(td);
        }
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

    let filecontainer = document.createElement("div");
    filecontainer.className = filecontainer.id = "edit-container";
    container.appendChild(filecontainer);
    let source = document.createElement("input");
    source.type = "file";
    source.multiple = "multiple";
    source.style.width = "100%";
    source.id = "source-encrypt-file";
    source.style.display = "none";
    source.onchange = function () {
        viewFiles($("table-container"), this.files);
    };
    filecontainer.appendChild(source);

    let tablecontainer = document.createElement("div");
    tablecontainer.id = "table-container";
    tablecontainer.style.cssText = "width: 98.9%;\n" +
        "height: 300px;\n" +
        "overflow: scroll;\n" +
        "float: left;font-size:90%;";
    tablecontainer.type = "div";
    container.appendChild(tablecontainer);
    viewFiles(tablecontainer, source.files);

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
    };
    tool.appendChild(openfiles);

    let encrypt = document.createElement("div");
    encrypt.className = "button";
    encrypt.innerText = "加密";
    encrypt.onclick = function () {
        let files = $("source-encrypt-file").files;
        if (files.length > 0) {
            let key = prompt("请输入加密密码:");
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if ($(file.name).getElementsByClassName("file-check")[0].checked == true && key.length > 0) {
                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "队列等候...";
                    try {
                        if (file.size <= 10 * 1024 * 1024) {
                            let reader = new FileReader();
                            reader.readAsBinaryString(file);
                            reader.onloadstart = function() {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "读取文件...";
                            };
                            reader.onload = function () {
                                let inf = "";
                                if (key.length > 0) {
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在加密...";
                                    let infor = fileEncrypt(this.result, key, file.name, file.type, file.size);
                                    for (let name in infor) {
                                        let toname = "";
                                        switch (name) {
                                            case "name":
                                                toname = "文件名称";
                                                break;
                                            case "type":
                                                toname = "文件类型";
                                                break;
                                            case "size":
                                                toname = "文件大小";
                                                break;
                                            case "hash1":
                                                toname = "原始校验";
                                                break;
                                            case "hash2":
                                                toname = "加密校验";
                                                break;
                                            case "time":
                                                toname = "加密时间";
                                                break;
                                            case "commit":
                                                toname = "执行情况";
                                                break;
                                            case "error":
                                                toname = "错误信息";
                                                break;
                                        }
                                        inf += "●" + toname + ": " + (infor[name]==null?"":infor[name]) + "\n";
                                    }
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = infor.commit;
                                    $(file.name).getElementsByClassName("file-comment")[0].title = inf;
                                } else
                                    $(file.name).getElementsByClassName("file-comment")[0].innerText = "请输入加密密码!";
                            }
                        } else
                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "加密文件不能大于10M.";
                    } catch (e) {
                        $(file.name).getElementsByClassName("file-comment")[0].innerText = e;
                    }
                    sleep(1000);
                }
            }
        }
    };
    tool.appendChild(encrypt);

    let decrypt = document.createElement("div");
    decrypt.className = "button";
    decrypt.innerText = "解密";
    decrypt.onclick = function () {
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
                        reader.onloadstart = function(){
                            $(file.name).getElementsByClassName("file-comment")[0].innerText = "读取文件...";
                        };
                        reader.onload = function () {
                            let inf = "";
                            if (key.length > 0) {
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = "正在解密...";
                                let infor = fileDecrypt(this.result, key);
                                for (let name in infor) {
                                    let toname = "";
                                    switch (name) {
                                        case "name":
                                            toname = "文件名称";
                                            break;
                                        case "type":
                                            toname = "文件类型";
                                            break;
                                        case "size":
                                            toname = "文件大小";
                                            break;
                                        case "hash1":
                                            toname = "原始校验";
                                            break;
                                        case "hash2":
                                            toname = "加密校验";
                                            break;
                                        case "commit":
                                            toname = "执行情况";
                                            break;
                                        case "error":
                                            toname = "错误信息";
                                            break;
                                    }
                                    inf += "●" + toname + ": " + (infor[name]==null?"":infor[name]) + "\n";
                                }
                                $(file.name).getElementsByClassName("file-comment")[0].innerText = infor.commit;
                                $(file.name).getElementsByClassName("file-comment")[0].title = inf;
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

function getNow() {
    let date = new Date();
    return date.format("yyyy-MM-dd hh:mm:ss S")
}

String.prototype.toBoolean = function(){
    let str = this.toString().toLowerCase().trim();
    if (str == "true" || str == "false")
        return eval(str);
    else
        return false
};

String.prototype.encrypt = function(pwd) {
    let str = this.str2binary().toString();
    if (pwd == null || pwd.length <= 0) {
        alert("Please enter a password with which to encrypt the message.");
        return null;
    }
    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
    let incr = Math.ceil(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
        alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
        return null;
    }
    let salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i++) {
        enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
        if (enc_chr < 16) {
            enc_str += "0" + enc_chr.toString(16);
        } else enc_str += enc_chr.toString(16);
        prand = (mult * prand + incr) % modu;
    }
    salt = salt.toString(16);
    while (salt.length < 8) salt = "0" + salt;
    enc_str += salt;
    return enc_str;

}

String.prototype.decrypt = function(pwd) {
    let str = this.toString();
    if (str == null || str.length < 8) {
        alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
        return;
    }
    if (pwd == null || pwd.length <= 0) {
        alert("Please enter a password with which to decrypt the message.");
        return;
    }
    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
    let incr = Math.round(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    let salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i += 2) {
        enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
        enc_str += String.fromCharCode(enc_chr);
        prand = (mult * prand + incr) % modu;
    }
    return enc_str.split(",").binary2str();
}

function hex_md5(s) {
    return core_md5(s.str2binary(), s.length * __chrsz__).binary2hex();
}

function b64_md5(s) {
    return binl2b64(core_md5(s.str2binary(), s.length * __chrsz__));
}

function hex_hmac_md5(key, data) {
    return core_hmac_md5(key, data).binary2hex();
}

function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        let olda = a;
        let oldb = b;
        let oldc = c;
        let oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data) {
    let bkey = key.str2binary();
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * __chrsz__);

    let ipad = Array(16), opad = Array(16);
    for (let i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    let hash = core_md5(ipad.concat(data.str2binary()), 512 + data.length * __chrsz__);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    let lsw = (x & 0xFFFF) + (y & 0xFFFF);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

String.prototype.str2binary = function(chrsz){
    //如需支持中文转换,chrsz = 16
    if (typeof chrsz === "undefined")
        chrsz = __chrsz__;
    let bin = Array();
    let mask = (1 << __chrsz__) - 1;
    for (var i = 0; i < this.length * chrsz; i += chrsz)
        bin[i >> 5] |= (this.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

Array.prototype.binary2str = function (chrsz){
    //如需支持中文转换,__chrsz__ = 16
    if (typeof chrsz === "undefined")
        chrsz = __chrsz__;
    let str = "";
    let mask = (1 << chrsz) - 1;
    for (var i = 0; i < this.length * 32; i += chrsz)
        str += String.fromCharCode((this[i >> 5] >>> (i % 32)) & mask);
    return str;

}

function str2ab(str) {
    //使用UTF8编码规则,涉及中文的转换.
    let codes = [];
    for (let i = 0; i != str.length; ++i) {
        let code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            codes.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            codes.push((192 | (31 & (code >> 6))));
            codes.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            codes.push((224 | (15 & (code >> 12))));
            codes.push((128 | (63 & (code >> 6))));
            codes.push((128 | (63 & code)))
        }
    }
    let buf = new ArrayBuffer(codes.length);
    let result = new Uint8Array(buf);
    for (let i = 0; i < codes.length; i++) {
        result[i] = codes[i] & 0xff;
    }
    return result;
}

function ab2str(array) {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

Array.prototype.binary2hex = function() {
    let hex_tab = __hexcase__ ? "0123456789ABCDEF" : "0123456789abcdef";
    let str = "";
    for (let i = 0; i < this.length * 4; i++) {
        str += hex_tab.charAt((this[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((this[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

String.prototype.hex2binary = function () {
    //从 binary2hex 来，但回不去了，有待研究
    let i = 0, l = this.length-1, bytes = [];
    for (i; i < l; i += 2) {
        bytes.push(parseInt(this.substr(i, 2), 16))
    }
    return bytes;
}

function binl2b64(binarray) {
    let tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i += 3) {
        let triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (let j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += __b64pad__;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}

String.prototype.hex_md5_hash = function(){
    return hex_md5(this.toString());
};

String.prototype.b64_md5_hash = function(){
    return b64_md5(this.toString());
};

String.prototype.hex_hmac_md5 = function(key){
    return hex_hmac_md5(key,this.toString());
};

String.prototype.b64_hmac_md5 = function(key){
    return b64_hmac_md5(key,this.toString());
};

Date.prototype.format = function(fmt) {
    //#######################################################################
    // 来自网络算法,用于日期格式定义，不支持yyyyMMdd格式
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    //#######################################################################
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                     //日
        "h+": this.getHours(),                    //小时
        "m+": this.getMinutes(),                  //分
        "s+": this.getSeconds(),                  //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
        "S": this.getMilliseconds()              //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.isNumber = function(){
     //用于判断字符串是否是符合数字
    let str = this.toString();
    let reg = new RegExp(/^([-+])?\d+(\.[0-9]{1,19})?$/);
    //let result = reg.exec(str);
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isIDnumber = function(){
    //用于简单判断18位身份证号码
    //校验年份范围1900-2099
    let str = this.toString();
    let reg = RegExp(/^\d{6}((19|20)\d{2}(01|02|03|04|05|06|07|08|09|10|11|12)(01|02|03|04|05|06|07|08|09|10|11|12|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\d{3}[0-9xX])/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isPhoneNumber = function(){
    //用于简单判断是否是手机号码
    let str = this.toString();
    let reg = RegExp(/^1[3|4|5|7|8]\d{9}/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isDatetime = function () {
    let str = this.toString();
    try {
        let d = new Date(str);
        if (d.toString() == "Invalid Date")
            return false;
        else
            return true;
    } catch (e) {
        return false;
    }
};

String.prototype.replaceAll = function(search, replacement) {
    // 没有解决search参数中存在正则表达式符号的问题,
    // 不能采用replace(new RegExp(search, 'g'), replacement)方法;
    let target = this;
    try {
        while (target.includes(search)) {
            target = target.replace(search, replacement);
        }
    }catch (e) {
        console.log(e);
    }
    return target;
};

String.prototype.DataType = function(){
      //判断字符是否符合数字规则
     let str = this.trim();
     try {
         if (str.isDatetime() && str.length == 10)
             return "date";
         else if (str.isDatetime() && str.indexOf(":") != -1)
             return "datetime";
         else if (str.isIDnumber() || str.isPhoneNumber())
             return "nvarchar";
         else if (str.isNumber() && isNaN(Number.parseInt(str)) == false && str.length < 18 && str.indexOf(".") == -1)
             return "int";
         else if (str.isNumber() && isNaN(Number.parseFloat(str)) == false && ((str.length < 18 && str.indexOf(".") == -1) || (str.indexOf(".") < 18 && str.indexOf(".")>=0)))
             return "float";
         else
             return "nvarchar"
     }
     catch (e){
         return "nvarchar"
     }
}

String.prototype.toArray = function(def,sep) {
    //def:默认值,所有转换尝试失败后返回值,如果没有设置返回[];
    //sep:如果JSON和eval转换尝试失败后,采用分隔符进行分隔;
    let str = this.trim();
    let tmp = [];
    try {
        tmp = JSON.parse(str);
        if (Array.isArray(tmp)) {
            return tmp;
        } else {
            throw new Error("err");
        }
    } catch (e) {
        try {
            tmp = eval(str.replaceAll("'", '"'));
            if (Array.isArray(tmp)) {
                return tmp;
            } else {
                throw new Error("err");
            }
        } catch (e) {
            try {
                if (typeof sep != "undefined") {

                    if (str.indexOf("[") == 0)
                        str = str.substring(str.indexOf("[") + 1, str.length - 1);
                    if (str.lastIndexOf("]") == str.length - 1)
                        str = str.substring(0, str.lastIndexOf("]"));
                    return str.split(sep).reduce(function (tmp, item) {
                        if (item.DataType() == "int" || item.DataType() == "float") {
                            tmp.push(Number(item));
                        } else {
                            tmp.push(item);
                        }
                        return tmp;
                    }, []);
                } else {
                    throw new Error("err");
                }
            } catch (e) {
                if (typeof def != "undefined")
                    return def;
                else
                    return [];
            }
        }
    }
};

String.prototype.toHex = function() {
    return this.str2binary().binary2hex();
    //let val = "";
    //for (let i = 0; i < str.length; i++) {
    //    if (val == "") {
    //        val = str.charCodeAt(i).toString(16);
    //    } else {
    //        val += str.charCodeAt(i).toString(16);
    //    }
    //}
    //return val;
};

String.prototype.fromHextoAscii = function() {
    var symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
    var loAZ = "abcdefghijklmnopqrstuvwxyz";
    symbols += loAZ.toUpperCase();
    symbols += "[\\]^_`";
    symbols += loAZ;
    symbols += "{|}~";

    valueStr = this.toString().toLowerCase();
    var hex = "0123456789abcdef";
    var text = "";
    var i = 0;

    for (i = 0; i < valueStr.length; i = i + 2) {
        var char1 = valueStr.charAt(i);
        if (char1 == ':') {
            i++;
            char1 = valueStr.charAt(i);
        }
        var char2 = valueStr.charAt(i + 1);
        var num1 = hex.indexOf(char1);
        var num2 = hex.indexOf(char2);
        var value = num1 << 4;
        value = value | num2;

        var valueInt = parseInt(value);
        var symbolIndex = valueInt - 32;
        var ch = '?';
        if (symbolIndex >= 0 && value <= 126) {
            ch = symbols.charAt(symbolIndex)
        }
        text += ch;
    }
    return text;
}

function $(id){
     try{
         return document.getElementById(id);
     } catch (e) {
         return null;
     }
 }

 String.prototype.encode = function() {
    let str = this.toString();
    let encodedStr = "" ;
    if (str == "")
        return encodedStr ;
    else {
        for (let i = 0 ; i < str.length ; i ++){
            encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
        }
    }
    return encodedStr;
 };

String.prototype.decode = function() {
    let str = this.toString();
    let decodeStr = "";
    if (str == "")
        return decodeStr ;
　　let toParse = str.split(";");
　　for (let i=0;i<toParse.length;i++) {
　　　　let s = toParse[i];
　　　　decodeStr += String.fromCharCode(parseInt(s.substring(2)))
　　}
　　return decodeStr;
}

Number.prototype.format = function(pattern) {
    // 用法
    // formatNumber(12345.999,'#,##0.0000') = 12,345.9990;
    // formatNumber(12345.999,'#,##0.##');
    // formatNumber(123,'000000');
    let num = this;
    let is = false;
    if (num < 0)
        is = true;
    num = Math.abs(num);
    let strarr = num ? num.toString().split('.') : ['0'];
    let fmtarr = pattern ? pattern.split('.') : [''];
    let retstr = '';
    // 整数部分
    let str = strarr[0];
    let fmt = fmtarr[0];
    let i = str.length - 1;
    let comma = false;
    for (let f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            let l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
            }
        }
        else retstr = str.substr(0, i + 1) + retstr;
    }
    retstr = retstr + '.';
    // 处理小数部分
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (let f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i < str.length) retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length) retstr += str.substr(i++, 1);
                else retstr += '0';
                break;
        }
    }
    return is ? "-" + retstr.replace(/^,+/, '').replace(/\.$/, '') : retstr.replace(/^,+/, '').replace(/\.$/, '');
};

function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    let count = 0;
    for (let i in object) count++;
    return count;
}

function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true);//默认为true
}

function CompareObj(objA, objB, flag) {
    if (!isObj(objA) && !isObj(objB)){
        flag = objA==objB;
    }
    else {
        for (let key in objA) {
            if (!flag) //跳出整个循环
                break;
            if (!objB.hasOwnProperty(key)) {
                flag = false;
                break;
            }
            if (!isArray(objA[key])) { //子级不是数组时,比较属性值
                if (objB[key] != objA[key]) {
                    flag = false;
                    break;
                }
            } else {
                if (!isArray(objB[key])) {
                    flag = false;
                    break;
                }
                let oA = objA[key], oB = objB[key];
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (let k in oA) {
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = CompareObj(oA[k], oB[k], flag);
                }
            }
        }
    }
    return flag;
}

function getFileSizeString(size, unit) {
    /*
        转换文件长度
        1DB = 1024NB；
        1NB = 1024BB，
        1BB = 1024YB；
        1YB = 1024ZB；
        1ZB = 1024EB；
        1EB = 1024PB；
        1PB = 1024TB；
        1TB = 1024GB；
        1GB = 1024MB；
        1MB = 1024KB；
        1KB = 1024B
        采用递归运算,形式参数为指针类型
    */
    if (size < 1024 || unit == "DB")
        return Math.round(size * 100) / 100  + unit;
    else {
        if (unit == " B") {
            unit = "KB";
        }
        else if (unit == "KB") {
            unit = "MB";
        }
        else if (unit == "MB") {
            unit = "GB";
        }
        else if (unit == "GB") {
            unit = "TB";
        }
        else if (unit == "TB") {
            unit = "PB";
        }
        else if (unit == "PB") {
            unit = "EB";
        }
        else if (unit == "EB") {
            unit = "ZB";
        }
        else if (unit == "ZB") {
            unit = "YB";
        }
        else if (unit == "YB") {
            unit = "BB";
        }
        else if (unit == "BB") {
            unit = "NB";
        }
        else {
            unit = "DB";
        }
        return getFileSizeString(size/1024, unit);
    }
}
