
function getStorageSql(key) {
    try {
        let storage = window.localStorage;
        let sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, '{}');
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        return sqllist[key].sql.decode();
    } catch (e) {
        __LOGS__.viewError("auto", e);
        return null;
    }
}

function saveStorageSql(key, sql) {
    try {
        let storage = window.localStorage;
        let sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, '{}');
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        sqllist[key] = {sql: sql.encode(), time: getNow()};
        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

var UI = {
    splitFileBlob: {
        title: null,
        show: function (message, parent, callback) {
            let packets = [];

            function blobSlice(blob, start, end) {
                if (blob.slice) {
                    return blob.slice(start, end);
                } else if (blob.webkitSlice) {
                    return blob.webkitSlice(start, end);
                } else if (blob.mozSlice) {
                    return blob.mozSlice(start, end);
                } else {
                    return null;
                }
            }

            function initTable(content) {
                content.innerHTML = "";
                let table = document.createElement("table");
                table.id = "ui_read_file_blob_packets_table";
                table.className = "table";
                table.style.width = "100%";
                content.appendChild(table);
                let ths = [
                    {name: "选择", width: "32px", align: "center", type: "checkbox"},
                    {name: "序号", width: "40px", align: "center", type: "th"},
                    {name: "↣", width: "100px", align: "center", type: "th"},
                    {name: "↢", width: "100px", align: "center", type: "th"},
                    // {name: "末尾值", width: "40px", align: "center", type: "th"},
                    {name: "位移", width: "40px", align: "center", type: "th"},
                    {name: "大小", width: "100px", align: "center", type: "th"},
                    {name: "结余", width: "200px", align: "left", type: "th"}
                ];

                let tr = document.createElement("tr");
                tr.className = "tr";
                table.appendChild(tr);
                for (let i = 0; i < ths.length; i++) {
                    let th = document.createElement("th");
                    th.className = "th";
                    if (ths[i].type == "th") {
                        th.style.textAlign = ths[i].align;
                        th.style.width = ths[i].width;
                        th.innerText = ths[i].name;
                    } else {
                        let check = document.createElement("input");
                        check.type = "checkbox";
                        check.className = "packet-checkall";
                        check.style.width = "18px";
                        check.onclick = function () {
                            let pks = $("ui_read_file_blob_packets_table").getElementsByClassName("packet-check");
                            for (let i = 0; i < pks.length; i++) {
                                pks[i].checked = this.checked;
                                this.checked ? pks[i].setAttribute("checked", "checked") : pks[i].removeAttribute("checked");
                            }
                        };
                        th.style.textAlign = "center";
                        th.appendChild(check);
                    }
                    tr.appendChild(th);
                }
            }

            function showPacket(index, packet) {
                let table = $("ui_read_file_blob_packets_table");
                let tr = document.createElement("tr");
                tr.className = "tr";
                if (table.getElementsByTagName("tr").length % 2 > 0) {
                    tr.className = "alt-line";
                }
                tr.onclick = function () {
                if (this.getElementsByClassName("packet-check")[0].checked == true)
                    this.getElementsByClassName("packet-check")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("packet-check")[0].setAttribute("checked", "checked");
                };
                table.appendChild(tr);
                let td = document.createElement("td");
                td.style.textAlign = "center";
                let check = document.createElement("input");
                check.type = "checkbox";
                check.className = "packet-check";
                check.id = "packet-check-" + index;
                check.style.width = "18px";
                td.style.textAlign = "center";
                td.appendChild(check);
                tr.appendChild(td);

                td = document.createElement("td");
                td.style.textAlign = "center";
                td.innerText = index;
                tr.appendChild(td);
                td = document.createElement("td");
                td.style.textAlign = "center";
                td.innerText = packet.start;
                tr.appendChild(td);
                td = document.createElement("td");
                td.style.textAlign = "center";
                td.innerText = packet.end;
                tr.appendChild(td);
                // td = document.createElement("td");
                // td.style.textAlign = "center";
                // td.innerText = packet.code;
                // tr.appendChild(td);
                td = document.createElement("td");
                td.style.textAlign = "center";
                td.innerText = packet.pos;
                tr.appendChild(td);
                td = document.createElement("td");
                td.style.textAlign = "right";
                td.innerText = getFileSizeString(packet.end - packet.start + packet.pos - (index < (packets.length - 1) ? (packet.tail != null ? packet.tail.getBytesSize() : 0) : 0), " B");
                tr.appendChild(td);
                td = document.createElement("td");
                td.style.textAlign = "left";
                td.innerText = packet.tail != null ? packet.tail : "";
                tr.appendChild(td);
            }

            function initPackets(file) {
                packets = [];
                initTable($("ui_read_file_blob_table_content"));
                let packetsize = Number($("read_file_blob_packet_size").value);
                if (file.size > packetsize) {
                    let packetcount = file.size % packetsize > 0 ? Math.floor(file.size / packetsize) + 1 : Math.floor(file.size / packetsize);
                    $("read_file_blob_file_name").value = file.name;
                    $("read_file_blob_file_name").title = file.size + " B";
                    $("ui_read_file_blob_progress").value = 0;
                    $("ui_read_file_blob_progress").max = packetcount;
                    for (let i = 0; i < packetcount; i++) {
                        let start = i * packetsize;
                        let end = (i + 1) * packetsize;
                        let blob = blobSlice(file, start, end);
                        let reader = new FileReader();
                        reader["packet"] = {
                            start: start,
                            end: end < (file.size - 1) ? end : (file.size - 1),
                            pos: 0,
                            code: null,
                            tail: null
                        };
                        packets.push(reader.packet);
                        reader["id"] = i;
                        reader.onload = function (event) {
                            this.packet.code = this.result.charCodeAt(this.result.length - 1);
                            if (this.packet.code == 65533) {
                                //判断末尾是否是不完整汉字
                                this.packet.pos = -1;
                            }
                            showPacket(this.id + 1, this.packet);
                            $("ui_read_file_blob_progress").value ++;
                        };
                        let secquence = Promise.resolve();
                        secquence.then(
                            reader.readAsText(blob, $("read_file_blob_charset").value)
                        );
                    }
                    $("ui_read_file_blob_open").style.display = "block";
                    $("ui_read_file_blob_count").style.display = "block";
                    $("ui_read_file_blob_split").style.display = "none";
                } else {
                    $("ui_read_file_blob_open").style.display = "block";
                    $("ui_read_file_blob_count").style.display = "none";
                    $("ui_read_file_blob_split").style.display = "none";
                    UI.alert.show("大数据文件拆分", "文件长度(" + getFileSizeString(file.size, " B") + ")小于所选包大小(" + getFileSizeString(packetsize, " B") + ").", "auto", null);
                }
            }

            this.title = message;
            let container = document.createElement("div");
            container.id = "ui_read_file_blob";
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
            content.className = "ui-container-body";
            content.style.width = "600px";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let item = document.createElement("div");
            item.className = "ui-container-item";
            // item.style.cssText = "width:100%;";
            span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.innerHTML = "源文件:";
            item.appendChild(span);
            let blob_filename = document.createElement("input");
            blob_filename.setAttribute("readonly", "readonly");
            blob_filename.id = "read_file_blob_file_name";
            blob_filename.className = "ui-container-item-input";
            item.appendChild(blob_filename);
            let source = document.createElement("input");
            source.id = "source_file";
            source.className = "ui-container-item-file";
            source.type = "file";
            source.style.display = "none";
            // source.multiple = "multiple";
            source.style.width = "70%";
            source.onchange = function () {
                if (this.files.length > 0)
                    initPackets(this.files[0]);
                else {
                    $("read_file_blob_file_name").value = "";
                    initTable($("ui_read_file_blob_table_content"));
                    $("ui_read_file_blob_open").style.display = "block";
                    $("ui_read_file_blob_count").style.display = "none";
                    $("ui_read_file_blob_split").style.display = "none";
                }
            };
            item.appendChild(source);
            content.appendChild(item);

            item = document.createElement("div");
            item.className = "ui-container-item";
            // item.style.cssText = "width:100%;";
            span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.innerHTML = "字符集:";
            item.appendChild(span);
            let blob_charset = document.createElement("select");
            blob_charset.id = "read_file_blob_charset";
            blob_charset.className = "ui-container-item-select";
            blob_charset.add(new Option("UTF-8", "UTF-8"));
            blob_charset.add(new Option("GBK", "GBK"));
            blob_charset.onchange = function () {
                if ($("source_file").files.length > 0) {
                    initPackets($("source_file").files[0]);
                }
            };
            item.appendChild(blob_charset);
            content.appendChild(item);

            item = document.createElement("div");
            item.className = "ui-container-item";
            span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.innerHTML = "包大小:";
            item.appendChild(span);
            let blob_size = document.createElement("select");
            blob_size.id = "read_file_blob_packet_size";
            blob_size.className = "ui-container-item-select";
            // blob_size.add(new Option("0.5MB", 1024 * 1024 * 0.5));
            blob_size.add(new Option("1 MB", 1024 * 1024 * 1));
            blob_size.add(new Option("2 MB", 1024 * 1024 * 2));
            blob_size.add(new Option("3 MB", 1024 * 1024 * 3));
            blob_size.add(new Option("4 MB", 1024 * 1024 * 4));
            blob_size.add(new Option("5 MB", 1024 * 1024 * 5));
            // blob_size.add(new Option("10MB", 1024 * 1024 * 10));
            // blob_size.add(new Option("20MB", 1024 * 1024 * 20));
            // blob_size.add(new Option("30MB", 1024 * 1024 * 30));
            // blob_size.add(new Option("40MB", 1024 * 1024 * 40));
            // blob_size.add(new Option("50MB", 1024 * 1024 * 50));
            blob_size.onchange = function () {
                if ($("source_file").files.length > 0) {
                    initPackets($("source_file").files[0]);
                }
            };
            item.appendChild(blob_size);
            content.appendChild(item);

            item = document.createElement("div");
            item.className = "ui-container-item";
            item.style.height = "20px";
            let progressBar = document.createElement("progress");
            progressBar.value = 0;
            progressBar.max = 100;
            progressBar.style.cssText = "width:100%;height:3px;cursor:pointer;";
            progressBar.id = "ui_read_file_blob_progress";
            item.appendChild(progressBar);
            content.appendChild(item);

            let div = document.createElement("div");
            div.id = "ui_read_file_blob_table_content";
            div.className = "ui-container-scroll-div";
            content.appendChild(div);
            initTable(div);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.id = "ui_read_file_blob_open";
            button.innerText = "打开";
            button.style.cssFloat = "left";
            button.onclick = function () {
                $("source_file").click();
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.id = "ui_read_file_blob_count";
            button.innerText = "分割";
            button.style.cssFloat = "left";
            button.style.display = "none";
            button.onclick = function () {
                initTable($("ui_read_file_blob_table_content"));
                let file = $("source_file").files[0];
                let pos = 0;
                $("ui_read_file_blob_progress").value = 0;
                $("ui_read_file_blob_progress").max = packets.length;
                for (let i = 0; i < packets.length; i++) {
                    let start = packets[i].start + pos;
                    let end = packets[i].end + packets[i].pos;
                    let blob = blobSlice(file, start, end);
                    let reader = new FileReader();
                    reader["id"] = i;
                    reader.onload = function (event) {
                        let index = this.result.lastIndexOf("\r\n") + 2;
                        packets[this.id].tail = this.result.substr(index, this.result.length - index - 1);
                        if (packets[this.id].tail.charCodeAt(packets[this.id].tail.length - 1) == 65533) {
                            //再次判断末尾是否是不完整汉字
                            packets[this.id].tail = packets[this.id].tail.substr(0, packets[this.id].tail.length - 1);
                            packets[this.id].pos += -1;
                        }
                        showPacket(this.id + 1, packets[this.id]);
                        $("ui_read_file_blob_progress").value++;
                    };
                    let secquence = Promise.resolve();
                    secquence.then(
                    reader.readAsText(blob, $("read_file_blob_charset").value)
                    );
                    pos = packets[i].pos;
                }
                $("ui_read_file_blob_open").style.display = "block";
                $("ui_read_file_blob_count").style.display = "none";
                $("ui_read_file_blob_split").style.display = "block";
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.id = "ui_read_file_blob_split";
            button.innerText = "保存";
            button.style.cssFloat = "left";
            button.style.display = "none";
            button.onclick = function () {
                let file = $("source_file").files[0];
                let pos = 0;
                $("ui_read_file_blob_progress").value = 0;
                $("ui_read_file_blob_progress").max = packets.length;
                for (let i = 0; i < packets.length; i++) {
                    let start = packets[i].start + pos;
                    let end = packets[i].end + packets[i].pos;
                    let blob = blobSlice(file, start, end);
                    let reader = new FileReader();
                    reader["id"] = i;
                    reader.onload = function (event) {
                        let result = null;
                        if (reader.id > 0) {
                            result = packets[this.id - 1].tail.concat(this.result);
                        } else {
                            result = this.result;
                        }
                        if (reader.id < packets.length - 1)
                            result = result.substr(0, result.lastIndexOf("\r\n"));
                        callback({result: result, name: file.name.split(".")[0] + "_" + (this.id + 1) + ".txt"});
                        $("ui_read_file_blob_progress").value++;
                    };
                    if ($("packet-check-" + (i + 1)).checked == true) {
                        let secquence = Promise.resolve();
                        secquence.then(
                            reader.readAsText(blob, $("read_file_blob_charset").value)
                        );
                        pos = packets[i].pos;
                        sleep(500);
                    }
                }
            };
            tools.appendChild(button);

            close.onclick = function () {
                parent.removeChild($("ui_read_file_blob"));
            };

            setDialogDrag(title);
        },
    },

    uploadFile: function (message, parent, callback, args) {
        let configs = {
            ATTACHMENT_EXPIRY_DATE: {name: "有效期", value: "7", type: "input"},
            ATTACHMENT_EXPIRY_DATE_UNIT: {
                name: "单位", value: "D", options: [new Option("天", "D"), new Option("小时", "H"), new Option("分钟", "M")],
                type: "select"
            },
            ATTACHMENT_MAX_NUM_VISITS: {name: "访问限制", value: "", type: "input"},
            ATTACHMENT_IP_PATTERN: {name: "网络限制", value: "*.*.*.*", type: "input"}
        };

        let cf = getUserConfig("mailAttachConfig");
        if (cf != null) {
            cf = JSON.parse(cf);
            configs.ATTACHMENT_EXPIRY_DATE.value = cf.expiryDate.term;
            configs.ATTACHMENT_EXPIRY_DATE_UNIT.value = cf.expiryDate.unit;
            configs.ATTACHMENT_MAX_NUM_VISITS.value = cf.max_num_visits;
            configs.ATTACHMENT_IP_PATTERN.value = cf.ip_pattern;
        }

        let path = args.path;
        let user = args.user.hex_md5_hash();
        let results = [];

        function getFileName(expiryDate, max_num_visits, ip_pattern, type) {
            let index = Math.floor(Math.random() * 1000);
            let options = {
                name: new Date().format("yyyyMMddhhmmssS"),
                index: index,
                max_num_visits: max_num_visits,
                expiry_date: expiryDate,
                ip_pattern: ip_pattern,
                type: type
            };
            return JSON.stringify(options);
        }

        function upload(file, name, uploadedCallback) {
            let xhr = new XMLHttpRequest();
            let ot = new Date().getTime();
            let oloaded = 0;
            let result = {
                name: null,
                url: null
            };

            $("ui_upload_cancel_" + name).onclick = function () {
                xhr.abort();
            };

            let form = new FormData();
            let filename = file.name.split(".");
            result.name = filename.slice(0, filename.length - 1).join(".");
            form.append("file", file, name);
            xhr.open("post", path + "/" + user, true);
            xhr.onload = function (evt) {
                //传输结束执行
                //根据服务器返回信息判断是否上传成功.不同的服务器接口不同。
                //以下是MySQL_Query_Analysis_server的接口返回
                let res = jsonParse(evt.target.responseText);
                if (res.state !== 1) {
                    UI.alert.show("提示",
                        "文件上传失败!" +
                        "<li>" + res.message + "</li>" +
                        "<li>" + res.path + "</li>" +
                        "<li>" + res.client + "</li>",
                        "auto");
                } else {
                    result.url = evt.target.responseURL + "/" + res.message;
                    if (typeof uploadedCallback !== "undefined")
                        uploadedCallback(result);
                }
            };
            xhr.onerror = function (evt) {
                UI.alert.show("提示",
                    "服务器未受理,上传失败!" +
                    "<li>路径:" + path + "</li>" +
                    "<li>文件:" + file.name + "</li>" +
                    "<li>请与系统管理员联系.</li>",
                    "auto");
            };
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    $("ui_upload_progress_" + name).max = evt.total;
                    $("ui_upload_progress_" + name).value = evt.loaded;
                    $("ui_upload_percentage_" + name).innerHTML = "进度：" + getFileSizeString(evt.loaded, " B") + " " + Math.round(evt.loaded / evt.total * 100) + "%";
                }

                let nt = new Date().getTime();//获取当前时间
                let pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
                ot = new Date().getTime(); //重新赋值时间，用于下次计算
                let perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
                oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
                //上传速度计算
                let speed = perload / pertime;//单位b/s
                let bspeed = speed;
                let units = 'B/s';//单位名称
                if (speed / 1024 > 1) {
                    speed = speed / 1024;
                    units = 'KB/s';
                }
                if (speed / 1024 > 1) {
                    speed = speed / 1024;
                    units = 'MB/s';
                }
                speed = speed.toFixed(1);

                let resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
                $("ui_upload_time_" + name).innerHTML = '，速度：' + speed + units + '，剩余时间：' + resttime + 's';
                if (bspeed == 0)
                    $("ui_upload_time_" + name).innerHTML = '上传已取消';
            };
            xhr.upload.onloadstart = function () {
                ot = new Date().getTime();
                oloaded = 0;
            };
            xhr.send(form);
        };

        let container = document.createElement("div");
        container.id = "ui_upload_file";
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
        content.className = "ui-container-body";
        content.style.width = "500px";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● " + message;
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let item = document.createElement("div");
        item.style.cssText = "width:100%;display:none";
        let source = document.createElement("input");
        source.type = "file";
        source.multiple = "multiple";
        source.style.width = "100%";
        source.id = "upload_file";
        source.onchange = function () {
            for (let i = 0; i < this.files.length; i++) {
                let expiryDate = {
                    term: Math.trunc(Number($("file_expiry_date").value)),
                    unit: $("file_expiry_unit").value
                };
                let max_num_visits = Math.trunc(Number($("file_max_num_visits").value));
                let ip_pattern = $("file_ip_pattern").value;
                let filename = this.files[i].name.split(".");
                let type = filename[filename.length - 1];
                let index = getFileName(expiryDate, max_num_visits, ip_pattern, type);
                let item = document.createElement("div");
                item.id = index;
                item.style.cssText = "width:100%;min-height:55px";
                $("ui_upload_file_messages").appendChild(item);

                let title = document.createElement("div");
                title.style.cssText = "width:100%;height:26px;cursor: pointer;margin-bottom:0px";
                item.appendChild(title);
                let name = document.createElement("span");
                name.innerText = "● " + this.files[i].name;
                name.style.cssText = "width:80%;height:100%;margin:0px;" +
                    "cursor: pointer;float:left;overflow: hidden;" +
                    "white-space: nowrap;" +
                    "word-break: keep-all;" +
                    "text-overflow: ellipsis;" +
                    "-o-text-overflow: ellipsis;";
                title.appendChild(name);
                let cancel = document.createElement("span");
                cancel.innerText = "✘";
                cancel.id = "ui_upload_cancel_" + index;
                cancel.style.cssText = "width:5%;height:100%;margin:0px;cursor:pointer;float:right;";
                title.appendChild(cancel);

                let msg = document.createElement("div");
                msg.style.cssText = "width:100%;height:26px;";
                item.appendChild(msg);
                let percentage = document.createElement("span");
                percentage.id = "ui_upload_percentage_" + index;
                msg.appendChild(percentage);
                let uploadtime = document.createElement("span");
                uploadtime.id = "ui_upload_time_" + index;
                msg.appendChild(uploadtime);

                let progressBar = document.createElement("progress");
                progressBar.value = 0;
                progressBar.max = 100;
                progressBar.style.cssText = "width:100%;height:5px;cursor:pointer;";
                progressBar.id = "ui_upload_progress_" + index;
                item.appendChild(progressBar);

                upload(this.files[i], index, function (result) {
                    results.push(result);
                });
            }
        };
        item.appendChild(source);
        content.appendChild(item);

        item = document.createElement("div");
        item.style.cssText = "width:100%;max-height:50px;overflow:hidden;border-bottom: 1px solid var(--main-border-color)";
        item.id = "ui_upload_file_param";
        content.appendChild(item);
        span = document.createElement("span");
        span.innerHTML = "➢ " + configs.ATTACHMENT_EXPIRY_DATE.name;
        item.appendChild(span);
        let expiry = document.createElement("input");
        expiry.id = "file_expiry_date";
        expiry.value = configs.ATTACHMENT_EXPIRY_DATE.value;
        expiry.style.width = "40px";
        expiry.style.textAlign = "center";
        expiry.style.border = "0px";
        item.appendChild(expiry);
        let expiryunit = document.createElement("select");
        expiryunit.id = "file_expiry_unit";
        expiryunit.style.border = "0px";
        for (let i = 0; i < configs.ATTACHMENT_EXPIRY_DATE_UNIT.options.length; i++) {
            expiryunit.options.add(configs.ATTACHMENT_EXPIRY_DATE_UNIT.options[i]);
        }
        item.appendChild(expiryunit);

        span = document.createElement("span");
        span.innerHTML = "&emsp;" + configs.ATTACHMENT_MAX_NUM_VISITS.name;
        item.appendChild(span);
        let visits = document.createElement("input");
        visits.id = "file_max_num_visits";
        visits.style.width = "40px";
        visits.style.textAlign = "center";
        visits.value = configs.ATTACHMENT_MAX_NUM_VISITS.value;
        visits.style.border = "0px";
        item.appendChild(visits);
        span = document.createElement("span");
        span.innerHTML = "次";
        item.appendChild(span);

        span = document.createElement("span");
        span.innerHTML = "&emsp;" + configs.ATTACHMENT_IP_PATTERN.name;
        item.appendChild(span);
        let pattern = document.createElement("input");
        pattern.id = "file_ip_pattern";
        pattern.style.width = "115px";
        pattern.style.textAlign = "center";
        pattern.value = configs.ATTACHMENT_IP_PATTERN.value;
        pattern.style.letterSpacing = "1px";
        pattern.style.border = "0px";
        item.appendChild(pattern);

        span = document.createElement("span");
        span.innerHTML = "&emsp;❖";
        span.style.cursor = "pointer";
        span.onclick = function () {
            UI.alert.show("有效期、访问限制次数和网络限制",
                "<li>有效期必须大于0(天/小时/分钟)</li>" +
                "<li>访问限制次数不能小于0次,如果设置为0时,系统将不限制访问次数</li>" +
                "<li>网络限制参数指定了可以访问该文件的网络地址</li>", "auto");
        };
        item.appendChild(span);

        item = document.createElement("div");
        item.style.cssText = "width:100%;min-height:200px;max-height:550px;overflow:scroll";
        item.id = "ui_upload_file_messages";
        content.appendChild(item);

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tools = document.createElement("div");
        tools.className = "groupbar";
        tools.style.width = "90%";
        content.appendChild(tools);

        let button = document.createElement("button");
        button.className = "button";
        button.id = "ui-upload-file-confirm";
        button.innerText = "确定";
        button.style.cssFloat = "right";
        button.onclick = close.onclick = function () {
            if (typeof callback !== "undefined")
                callback(results);
            parent.removeChild($("ui_upload_file"));
        };
        tools.appendChild(button);

        button = document.createElement("button");
        button.className = "button";
        button.id = "ui-upload-file-ok";
        button.innerText = "选择";
        button.style.cssFloat = "right";
        button.onclick = function () {
            let expiryDate = Math.trunc(Number($("file_expiry_date").value));
            let max_num_visits = Math.trunc(Number($("file_max_num_visits").value));
            let ip_pattern = $("file_ip_pattern").value.split(".");
            if (expiryDate != "NaN" && max_num_visits != "NaN")
                if (expiryDate > 0 && max_num_visits >= 0 && ip_pattern.length == 4) {
                    $("upload_file").click();
                    let configs = {
                        expiryDate: {term: expiryDate, unit: $("file_expiry_unit").value},
                        max_num_visits: max_num_visits,
                        ip_pattern: $("file_ip_pattern").value
                    };
                    setUserConfig("mailAttachConfig", JSON.stringify(configs));
                } else if (expiryDate <= 0)
                    UI.alert.show("注意", "有效期必须大于0(天/小时/分钟).", "auto");
                else if (max_num_visits < 0)
                    UI.alert.show("注意", "访问限制次数必须大于或等于0次(0次:不限制).", "auto");
                else if (ip_pattern.length != 4)
                    UI.alert.show("注意", "请输入正确的网络限制参数,如:" +
                        "<li>*.*.*.* (不做限制)</li>" +
                        "<li>12.*.*.* (以12开始的所有地址)</li>" +
                        "<li>12.0.*.* (以12.0开始的所有地址)</li>" +
                        "<li>其他依次类推</li>", "auto");
                else
                    UI.alert.show("注意", "请输入正确的有效期、访问限制次数或网路限制参数." +
                        "<li>有效期必须大于0(天/小时/分钟)</li>" +
                        "<li>访问限制次数不能小于0次,如果设置为0时,系统将不限制访问次数</li>" +
                        "<li>网络限制参数指定了可以访问该文件的网络地址</li>", "auto");
        };
        tools.appendChild(button);

        close.onclick = function () {
            parent.removeChild($("ui_upload_file"));
        };
        tools.appendChild(button);
        setDialogDrag(title);
        $("ui-upload-file-ok").focus();
    },

    QRCode: function(parent, text, options, callback) {
        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }
        let container = document.createElement("div");
        container.id = "ui-qrcode-component";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "qrcode-component";
        content.className = "ui-container-body";
        content.style.width = "600px";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 二维码";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
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
        b.innerHTML = "图像";
        b.onclick = function () {
            $("qrcode-container").style.display = "block";
            $("qrcode-detail").style.display = "none";
            let tb = this.parentNode.getElementsByClassName("tabButton");
            for (let i = 0; i < tb.length; i++) {
                tb[i].style.background = "var(--toolbar-background-color)";
            }
            this.style.background = "var(--toolbar-button-hover-background-color)";
        };
        tabtools.appendChild(b);
        b = document.createElement("a");
        b.className = "tabButton";
        b.innerHTML = "代码";
        b.onclick = function () {
            $("qrcode-container").style.display = "none";
            $("qrcode-detail").style.display = "block";
            let tb = this.parentNode.getElementsByClassName("tabButton");
            for (let i = 0; i < tb.length; i++) {
                tb[i].style.background = "var(--toolbar-background-color)";
            }
            this.style.background = "var(--toolbar-button-hover-background-color)";
        };
        tabtools.appendChild(b);
        content.appendChild(tabtools);

        let contentContainer = document.createElement("div");
        contentContainer.className = "tabToolbar-content-container";
        contentContainer.id = "qrcode-container";
        contentContainer.style.overflow = "hidden";
        contentContainer.style.width = "100%";
        contentContainer.style.height = "370.8px";
        content.appendChild(contentContainer);

        let imagecontainer = document.createElement("div");
        imagecontainer.style.cssText = "width: 100%;" +
            "height: 100%;" +
            "overflow: scroll;" +
            "position: relative;" +
            "float: left;";
        contentContainer.appendChild(imagecontainer);
        let image = document.createElement("div");
        imagecontainer.appendChild(image);
        image.id = "qrcode-image";
        image.style.cssText = "position: absolute;" +
            "border:1px solid " + options.color + ";" +
            "margin:5px;padding:5px;" +
            "top: 50%;" +
            "left: 50%;" +
            "transform: translate(-50%, -50%);";
        new QRCode("qrcode-image", {
            text: text,
            width: options.width,
            height: options.height,
            colorDark: options.color,
            colorLight: options.background,
            correctLevel: QRCode.CorrectLevel.H
        });

        contentContainer = document.createElement("div");
        contentContainer.className = "tabToolbar-content-container";
        contentContainer.id = "qrcode-detail";
        contentContainer.style.overflow = "hidden";
        contentContainer.style.width = "100%";
        contentContainer.style.height = "370.8px";
        contentContainer.style.display = "none";
        content.appendChild(contentContainer);

        let codecontainer = document.createElement("div");
        codecontainer.style.cssText = "width: 100%;" +
            "height: 100%;" +
            // "overflow: scroll;" +
            "position: relative;" +
            "float: left;";
        contentContainer.appendChild(codecontainer);

        let code = document.createElement("textarea");
        code.className = "ui-container-item-input";
        code.id = "ui_qrcode_code";
        code.type = "textarea";
        code.style.cssText = "width: 100%;" +
            "height: 100%;" +
            "resize: none;";
        codecontainer.appendChild(code);

        close.onclick = function () {
            parent.removeChild($("ui-qrcode-component"));
        };
        setDialogDrag(title);
        setTimeout(function () {
            let img = $("qrcode-image").getElementsByTagName("img")[0];
            $("ui_qrcode_code").value = img.src;
            if (typeof callback !== "undefined") {
                callback($("ui_qrcode_code").value);
            }
        }, 1000);
    },

    tooltip: function(dom, text) {
        dom.onmouseenter = function () {
            if (typeof $("tooltip-" + this.id) !== "undefined") {
                let parent = document.body;
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                }
                let tip = document.createElement("div");
                tip.className = "ui-tooltip";
                tip.id = "tooltip-" + dom.id;
                let posi = getAbsolutePosition(dom);
                let parentposi = getAbsolutePosition(parent);
                if ((posi.top - 52) < 0)
                    tip.style.top = (posi.top + posi.height) + "px";
                else
                    tip.style.top = (posi.top - 52) + "px";
                if ((posi.left + 100) < parentposi.width)
                    tip.style.left = (posi.left + posi.width) + "px";
                else
                    tip.style.left = (posi.left - 100) + "px";
                tip.style.width = "100px";
                tip.style.height = "40px";
                tip.style.borderRadius = "5px";
                tip.style.backgroundImage = "url(" + __SYS_IMAGES_PNG__.mouse.image + ")";
                tip.style.backgroundRepeat = "no-repeat";
                tip.style.backgroundPosition = "right bottom";
                tip.style.backgroundSize = "24px 24px";
                let span = document.createElement("span");
                span.className = "message";
                span.innerHTML = text;
                tip.appendChild(span);
                parent.appendChild(tip);
            }
        };
        dom.onmouseleave = function () {
            if ($("tooltip-" + this.id) != null) {
                $("tooltip-" + this.id).parentNode.removeChild($("tooltip-" + this.id))
            }
        };
    },
    help: function(dom, key, parent, message, callback) {
        let posi = getAbsolutePosition(dom);
        let container = document.createElement("div");
        container.id = "ui_help";
        container.className = "ui-container-background";

        if (parent === "auto" || parent == null || typeof parent == "undefined") {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }
        let parentposi = getAbsolutePosition(parent);
        parent.appendChild(container);
        let content = document.createElement("div");
        content.className = "ui-container-help";
        content.style.backgroundImage = "url(" + __SYS_IMAGES_PNG__.mouse.image + ")";
        content.style.backgroundRepeat = "no-repeat";
        content.style.backgroundPosition = "right bottom";
        content.style.backgroundSize = "48px 48px";
        container.appendChild(content);

        let msg = document.createElement("div");
        msg.className = "message";
        msg.innerHTML = (typeof __VERSION__.helps[key] !== "undefined" ? __VERSION__.helps[key] : (typeof message =="undefined"?__VERSION__.helps["other"]: message)) +
            "<hr><span style='font-size: 30%'>" + getUserConfig("CopyRight") + "</span>";
        msg.onclick = function() {
            if (typeof callback !== "undefined")
                callback();
        };
        content.appendChild(msg);
        content.onmouseleave = function () {
            parent.removeChild($("ui_help"));
        };
        let contentposi = getAbsolutePosition(content);
        if ((posi.left + posi.width + contentposi.width) < parentposi.width)
            content.style.left = (posi.left + posi.width) + "px";
        else
            content.style.left = (posi.left - contentposi.width) + "px";
        if ((posi.top + posi.height + contentposi.height) < parentposi.height)
            content.style.top = posi.top + "px";
        else
            content.style.top = (posi.top - contentposi.height) + "px";
    },
    alert: {
        title: null,
        message: null,
        show: function (notice, message, parent, callback) {
            this.title = notice;
            this.message = message;
            let container = document.createElement("div");
            container.id = "ui_alert";
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
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src =__SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.alert,__THEMES__.get().color,"100px","100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "font-size: 90%;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            item.appendChild(image);
            let msg = document.createElement("div");
            msg.style.cssText = "cursor: pointer;" +
                "width:70%;" +
                "float: left;" +
                //"white-space: auto;" +
                "white-space: normal;word-break: break-all;word-wrap: break-word;" +
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "color: var(--main-title-color);" +
                "line-height: 1.5;" +
                "display: inline-block;" +
                "vertical-align: middle;" +
                "text-align: left;" +
                "font-size: 100%;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);" +
                "min-height: 100px;max-height:200px;" +
                "overflow:scroll;";
            msg.innerHTML = message;
            item.appendChild(msg);
            content.appendChild(item);

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);
            let button = document.createElement("button");
            button.className = "button";
            button.id = "ui-alert-ok";
            button.innerText = "确定";
            button.style.cssFloat = "right";
            button.onclick = close.onclick = function () {
                if (typeof callback === "function")
                    callback();
                parent.removeChild($("ui_alert"));
            };
            tools.appendChild(button);
            setDialogDrag(title);
            $("ui-alert-ok").focus();
        },
    },
    confirm: {
        title: null,
        message: null,
        show: function (notice, message, parent, callback, args) {
            //callback:回调函数,
            //args:回调函数参数,根据实际需要可以不传递\可以是单一参数\可以是数组\可以是对象.
            this.title = notice;
            this.message = message;
            let container = document.createElement("div");
            container.id = "ui_confirm";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.confirm,__THEMES__.get().color,"100px","100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "font-size: 90%;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            item.appendChild(image);
            let msg = document.createElement("span");
            msg.style.cssText = "cursor: pointer;" +
                "width:70%;" +
                "float: left;" +
                "white-space: auto;" +
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "color: var(--main-title-color);" +
                "line-height: 1.5;" +
                "display: inline-block;" +
                "vertical-align: middle;" +
                "text-align: left;" +
                "font-size: 100%;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);" +
                "min-height: 100px;";
            msg.innerHTML = message;
            item.appendChild(msg);
            content.appendChild(item);

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.id = "ui-confirm-no";
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = close.onclick = function () {
                parent.removeChild($("ui_confirm"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.innerText = "确定";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                parent.removeChild($("ui_confirm"));
                if (typeof callback == "function") {
                    if (typeof args !== "undefined")
                        callback(args);
                    else
                        callback();
                }
            };
            tools.appendChild(button);
            setDialogDrag(title);
            $("ui-confirm-no").focus();
        },
    },
    prompt: {
        title: null,
        items: {},
        show: function (message, items, parent, callback, args) {
            //items:{item:default,...}
            //return: items:{item:value,item:value,....}
            function setFocus(domid) {
                let inputs = document.getElementsByClassName("ui-container-item-input");
                let focus = -1;
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].id === domid) {
                        focus = i + 1;
                        break;
                    }
                }
                if (focus == inputs.length)
                    $("ui-prompt-ok").focus();
                else
                    inputs[focus].focus();
            }
            this.title = message;
            this.items = items;
            let container = document.createElement("div");
            container.id = "ui_prompt";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.prompt,__THEMES__.get().color,"100px","100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            itemcontent.appendChild(image);

            for (let key in this.items) {
                let it = items[key];
                let item = document.createElement("div");
                item.className = "ui-container-item";
                item.style.width = "70%";
                item.style.cssFloat = "right";
                span = document.createElement("span");
                span.className = "ui-container-item-name ";
                span.title = key;
                span.innerText = key + " : ";
                item.appendChild(span);
                let input = document.createElement("input");
                input.className = "ui-container-item-input";
                input.id = "ui_prompt_value_" + key;
                input.value = it;
                input.onkeypress = function(event) {
                let keyCode = event.keyCode ? event.keyCode : event.which ?
                    event.which : event.charCode;
                if (keyCode == 13) {
                    setFocus(this.id);
                }
            };
                item.appendChild(input);
                itemcontent.appendChild(item);
            }
            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = close.onclick = function () {
                parent.removeChild($("ui_prompt"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.id = "ui-prompt-ok";
            button.className = "button";
            button.innerText = "确定";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                for (let key in UI.prompt.items) {
                    UI.prompt.items[key] = document.getElementById("ui_prompt_value_" + key).value;
                }
                if (typeof callback == "function") {
                    if (typeof args == "undefined")
                        callback(UI.prompt.items);
                    else
                        callback(args, UI.prompt.items);
                }
                parent.removeChild($("ui_prompt"));
            };
            tools.appendChild(button);
            setDialogDrag(title);
            document.getElementsByClassName("ui-container-item-input")[0].focus();
        },
    },
    choise: {
        title: null,
        items: {},
        show: function (message, items, type, parent, callback, args) {
            //type: radio;checkbox
            //items: {title:{value:value,checked:true},title:{value:value,checked:false}...}
            //return: items
            this.title = message;
            this.items = items;
            let container = document.createElement("div");
            container.id = "ui_choise";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);

            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.choice,__THEMES__.get().color,"100px","100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            itemcontent.appendChild(image);

            for (let key in this.items) {
                let it = items[key];
                let item = document.createElement("div");
                item.className = "ui-container-item";
                item.style.width = "70%";
                item.style.cssFloat = "right";
                let input = document.createElement("input");
                input.type = type;
                if (type == "checkbox")
                    input.className = "ui-container-item-checkbox";
                else
                    input.className = "ui-container-item-radio";
                input.name = "ui_choise_value";
                input.id = input.value = key;
                input.checked = it.checked;
                input.onclick = function () {
                    if (type == "checkbox") {
                        UI.choise.items[this.id].checked = this.checked;
                    }
                    if (type == "radio") {
                        let radio = document.getElementsByName("ui_choise_value");
                        for (let i = 0; i < radio.length; i++) {
                            if (radio[i].checked) {
                                UI.choise.items[radio[i].id].checked = true;
                            } else {
                                UI.choise.items[radio[i].id].checked = false;
                            }
                        }
                    }
                };
                item.appendChild(input);
                let span = document.createElement("span");
                span.className = "ui-container-item-name";
                span.title = span.innerText = key;
                item.appendChild(span);
                itemcontent.appendChild(item);
            }

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = close.onclick = function () {
                parent.removeChild($("ui_choise"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.innerText = "确定";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                if (typeof callback == "function") {
                    if (typeof args == "undefined")
                        callback(UI.choise.items);
                    else
                        callback(args, UI.choise.items);
                }
                parent.removeChild($("ui_choise"));
            };
            tools.appendChild(button);
            setDialogDrag(title);
        },
    },
    userLogin: {
        title: null,
        show: function (message, parent, callback, args) {
            //return: {name:name,password:password}
            this.title = message;
            let container = document.createElement("div");
            container.id = "ui_user_login";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;font-size:120%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.user,__THEMES__.get().color,"100px","100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            itemcontent.appendChild(image);
            let item = document.createElement("div");
            item.className = "ui-container-item";
            item.style.width = "70%";
            item.style.cssFloat = "right";

            span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.title = "用户名称";
            span.innerText = "用户" + " : ";
            item.appendChild(span);
            let input = document.createElement("input");
            input.className = "ui-container-item-input";
            input.id = "ui_user_login_value_name";
            input.value = "";
            input.placeholder = "名称";
            input.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__SYS_IMAGES_SVG__.user,__THEMES__.get().color,"16px","16px");
            input.style.backgroundRepeat = "no-repeat";
            input.style.backgroundPosition = "right";
            input.style.backgroundSize = "16px 16px";
            item.appendChild(input);
            input.onkeypress = function(event) {
                let keyCode = event.keyCode ? event.keyCode : event.which ?
                    event.which : event.charCode;
                if (keyCode == 13) {
                    $("ui_user_login_value_password").focus();
                }

            };
            itemcontent.appendChild(item);

            item = document.createElement("div");
            item.className = "ui-container-item";
            item.style.width = "70%";
            item.style.cssFloat = "right";
            span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.title = "用户密码";
            span.innerText = "密码" + " : ";
            item.appendChild(span);
            input = document.createElement("input");
            input.className = "ui-container-item-input";
            input.id = "ui_user_login_value_password";
            input.type = "password";
            input.value = "";
            input.placeholder = "☀☀☀☀☀☀☀☀";
            input.style.backgroundImage =  __SYS_IMAGES_SVG__.getUrl(__SYS_IMAGES_SVG__.key,__THEMES__.get().color,"16px","16px");
            input.style.backgroundRepeat = "no-repeat";
            input.style.backgroundPosition = "right";
            input.style.backgroundSize = "16px 16px";
            input.onkeypress = function(event){
                let keyCode = event.keyCode ? event.keyCode : event.which ?
                    event.which : event.charCode;
                if (keyCode == 13) {
                    $("ui_user_login_to").focus();
                }
            };
            item.appendChild(input);
            itemcontent.appendChild(item);

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            close.onclick = function () {
                location.reload();
            };

            let button = document.createElement("button");
            button.className = "button";
            button.innerText = "登录";
            button.id = "ui_user_login_to";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                let password = {
                    name: document.getElementById("ui_user_login_value_name").value,
                    password: document.getElementById("ui_user_login_value_password").value
                };
                if (typeof callback == "function") {
                    if (typeof args == "undefined")
                        callback(password);
                    else
                        callback(args, password);
                }
                parent.removeChild($("ui_user_login"));
            };
            tools.appendChild(button);
            setDialogDrag(title);
            $("ui_user_login_value_name").focus();
        },
    },
    password: {
        title: null,
        items: {},
        show: function (message, items, parent, callback, args) {
            //items:{item:null,...}
            //return: items:{item:password,item:password,....}
            function setFocus(domid) {
                let inputs = document.getElementsByClassName("ui-container-item-input");
                let focus = -1;
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].id === domid) {
                        focus = i + 1;
                        break;
                    }
                }
                if (focus == inputs.length)
                    $("ui-password-ok").focus();
                else
                    inputs[focus].focus();
            }
            this.title = message;
            this.items = items;
            let container = document.createElement("div");
            container.id = "ui_password";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.className = "ui-container-body";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● " + this.title;
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc(__SYS_IMAGES_SVG__.password,__THEMES__.get().color,"100px","100px")
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "background-color: transparent;" +
                "color: var(--main-title-color);";
            itemcontent.appendChild(image);

            for (let key in this.items) {
                let placeholder = items[key];
                let item = document.createElement("div");
                item.className = "ui-container-item";
                item.style.width = "70%";
                item.style.cssFloat = "right";
                span = document.createElement("span");
                span.className = "ui-container-item-name ";
                span.title = key;
                span.innerText = key + " : ";
                item.appendChild(span);
                let input = document.createElement("input");
                input.type = "password";
                input.className = "ui-container-item-input";
                input.id = "ui_password_value_" + key;
                input.placeholder = "☀☀☀☀☀☀☀☀";
                input.title = placeholder;
                input.style.backgroundImage =  __SYS_IMAGES_SVG__.getUrl(__SYS_IMAGES_SVG__.key,__THEMES__.get().color,"16px","16px");
                input.style.backgroundRepeat = "no-repeat";
                input.style.backgroundPosition = "right";
                input.style.backgroundSize = "16px 16px";
                input.onkeypress = function (event) {
                    let keyCode = event.keyCode ? event.keyCode : event.which ?
                        event.which : event.charCode;
                    if (keyCode == 13) {
                        setFocus(this.id);
                    }
                };
                item.appendChild(input);
                itemcontent.appendChild(item);
            }
            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = close.onclick = function () {
                parent.removeChild($("ui_password"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.id = "ui-password-ok";
            button.innerText = "确定";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                for (let key in UI.password.items) {
                    UI.password.items[key] = document.getElementById("ui_password_value_" + key).value;
                }
                if (typeof callback == "function") {
                    if (typeof args == "undefined")
                        callback(UI.password.items);
                    else
                        callback(args, UI.password.items);
                }
                parent.removeChild($("ui_password"));
            };
            tools.appendChild(button);
            setDialogDrag(title);
            document.getElementsByClassName("ui-container-item-input")[0].focus();
        },
    },
    sqlManagerDialog: {
        type: {
            open: "open",
            save: "save",
            backup: "backup",
        },
        show: function (parent, callback, args) {
            let type = typeof args.type != "undefined" ? args.type : "";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }

            function getSQLList(table) {
                table.innerText = "";
                let tr = document.createElement("tr");
                table.appendChild(tr);
                let th = document.createElement("th");
                th.style.width = "40px";
                let check = document.createElement("input");
                check.type = "checkbox";
                check.className = "sqls-checkall";
                check.style.width = "35px";
                check.onclick = function () {
                    let sqls = $("sql-Manager-Content-table").getElementsByClassName("check");
                    for (let i = 0; i < sqls.length; i++) {
                        sqls[i].checked = this.checked;
                        this.checked ? sqls[i].setAttribute("checked", "checked") : sqls[i].removeAttribute("checked");
                    }
                };
                th.style.textAlign = "center";
                th.appendChild(check);
                tr.appendChild(th);
                th = document.createElement("th");
                th.style.width = "40px";
                th.innerText = "序号";
                tr.appendChild(th);
                th = document.createElement("th");
                th.innerText = "脚本名称";
                tr.appendChild(th);
                th = document.createElement("th");
                th.style.width = "120px";
                th.innerText = "编辑时间";
                tr.appendChild(th);
                let storage = window.localStorage;
                let sqllist = {};
                if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
                    storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
                else {
                    sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                }
                let i = 0;
                for (let name in sqllist) {
                    tr = document.createElement("tr");
                    if (i % 2 > 0) {
                        tr.className = "alt-line";
                        //单数行
                    }
                    tr.setAttribute("name", name);
                    tr.onclick = function () {
                        let name = $("sql-Manager-Content-name");
                        let sql = $("sql-Manager-Content-sql");
                        name.value = this.getAttribute("name");
                        sql.value = getStorageSql(this.getAttribute("name"));
                        if (this.getElementsByClassName("check")[0].checked == true)
                            this.getElementsByClassName("check")[0].removeAttribute("checked");
                        else
                            this.getElementsByClassName("check")[0].setAttribute("checked", "checked");
                        $("table-container").style.display = "none";
                        $("edit-container").style.display = "block";
                    };
                    table.appendChild(tr);

                    let td = document.createElement("td");
                    let check = document.createElement("input");
                    check.type = "checkbox";
                    check.className = "check";
                    check.style.width = "35px";
                    td.appendChild(check);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.style.width = "36px";
                    td.style.textAlign = "center";
                    td.innerText = i + 1;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = td.title = name;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.style.width = "120px";
                    td.innerText = td.title = sqllist[name].time;
                    tr.appendChild(td);
                    i += 1;
                }
            }

            let container = document.createElement("div");
            container.id = "ui_sqlManagerDialog";
            container.className = "ui-container-background";
            parent.appendChild(container);

            let content = document.createElement("div");
            content.id = "sql-Manager-Content";
            content.className = "ui-container-body";
            content.style.width = "500px";
            content.style.height = "365px";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● 脚本管理 ";
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let d = document.createElement("div");
            d.className = "tabToolbar";
            let b = document.createElement("a");
            b.className = "tabButton";
            b.innerHTML = "列表";
            b.onclick = function () {
                $("table-container").style.display = "block";
                $("edit-container").style.display = "none";
                let tb = this.parentNode.getElementsByClassName("tabButton");
                for (let i = 0; i < tb.length; i++) {
                    tb[i].style.background = "var(--toolbar-background-color)";
                }
                this.style.background = "var(--toolbar-button-hover-background-color)";
            };
            d.appendChild(b);
            b = document.createElement("a");
            b.className = "tabButton";
            b.innerHTML = "详细";
            b.onclick = function () {
                $("table-container").style.display = "none";
                $("edit-container").style.display = "block";
                let tb = this.parentNode.getElementsByClassName("tabButton");
                for (let i = 0; i < tb.length; i++) {
                    tb[i].style.background = "var(--toolbar-background-color)";
                }
                this.style.background = "var(--toolbar-button-hover-background-color)";
            };
            d.appendChild(b);
            content.appendChild(d);

            let contentContainer = document.createElement("div");
            contentContainer.className = contentContainer.id = "content-content";
            contentContainer.style.cssText = "width: 100%;" +
                "height: 250px;";
            content.appendChild(contentContainer);

            let tablecontainer = document.createElement("div");
            tablecontainer.className = tablecontainer.id = "table-container";
            tablecontainer.style.cssText = "width: 100%;" +
                "height: 100%;" +
                "overflow: scroll;" +
                "position: relative;" +
                "float: left;";
            if (type === UI.sqlManagerDialog.type.save) {
                tablecontainer.style.display = "none";
            } else
                tablecontainer.style.display = "block";
            contentContainer.appendChild(tablecontainer);
            let sqltable = document.createElement("table");
            tablecontainer.appendChild(sqltable);
            sqltable.id = "sql-Manager-Content-table";
            sqltable.className = "table";
            sqltable.style.tableLayout = "fixed";
            sqltable.style.width = "100%";
            getSQLList(sqltable);

            let editcontainer = document.createElement("div");
            editcontainer.className = editcontainer.id = "edit-container";
            editcontainer.style.cssText = "width: 100%;" +
                "height: 100%;" +
                "position: relative;" +
                "float: left;";
            if (type === UI.sqlManagerDialog.type.save) {
                editcontainer.style.display = "block";
            } else
                editcontainer.style.display = "none";
            contentContainer.appendChild(editcontainer);
            let sqlname = document.createElement("input");
            sqlname.id = sqlname.className = "sql-Manager-Content-name";
            sqlname.style.cssText = "margin-bottom: 1px;" +
                "margin-top: 1px;" +
                "width: 98.9%;" +
                "cursor: pointer;" +
                "color: var(--toolbar-background-color);" +
                "outline-style: none;" +
                "border:1px solid var(--main-border-color);" +
                "border-radius: 5px;" +
                "outline-style: none;";
            sqlname.placeholder = "请输入脚本名称.";
            editcontainer.appendChild(sqlname);

            let edit = document.createElement("textarea");
            edit.className = edit.id = "sql-Manager-Content-sql";
            edit.style.cssText = "position: relative;" +
                "float: left;" +
                "width: 98.9%;" +
                "height: 90.5%;" +
                "resize: none;" +
                "font-size: 90%;" +
                "color: var(--toolbar-background-color);" +
                "border-radius: 5px;" +
                "outline-style: none;" +
                "border:1px solid var(--main-border-color);";
            edit.type = "textarea";
            edit.setAttribute("readonly", "readonly");
            edit.value = typeof args.sql !== "undefined" ? args.sql : "";
            editcontainer.appendChild(edit);

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tool = document.createElement("div");
            tool.className = "groupbar";
            content.appendChild(tool);

            if (type === UI.sqlManagerDialog.type.open) {
                let open = document.createElement("button");
                open.className = "button";
                open.innerText = "打开";
                open.onclick = function () {
                    let sql = {title: $("sql-Manager-Content-name").value, sql: $("sql-Manager-Content-sql").value};
                    if (typeof callback == "function") {
                        if (typeof args == "undefined")
                            callback(sql);
                        else
                            callback(args, sql);
                    }
                    parent.removeChild($("ui_sqlManagerDialog"));
                };
                tool.appendChild(open);
            }

            if (type === UI.sqlManagerDialog.type.save) {
                let add = document.createElement("button");
                add.className = "button";
                add.innerText = "保存";
                add.onclick = function () {
                    let sql = {title: $("sql-Manager-Content-name").value, sql: $("sql-Manager-Content-sql").value};
                    if (sql.title.value != "" && sql.sql != "") {
                        saveStorageSql(sql.title, sql.sql);
                        getSQLList($("sql-Manager-Content-table"))
                    }
                    if (typeof callback == "function") {
                        if (typeof args == "undefined")
                            callback(sql);
                        else
                            callback(args, sql);
                    }
                    parent.removeChild($("ui_sqlManagerDialog"));
                };
                tool.appendChild(add);
            }

            if (type === UI.sqlManagerDialog.type.open) {
                let del = document.createElement("button");
                del.className = "button";
                del.innerText = "删除";
                del.onclick = function () {
                    let title = $("sql-Manager-Content-name").value;
                    if (title != "") {
                        let storage = window.localStorage;
                        let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                        delete sqllist[title];
                        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                        getSQLList($("sql-Manager-Content-table"));
                        $("table-container").style.display = "block";
                        $("edit-container").style.display = "none";
                    }
                };
                tool.appendChild(del);
            }

            if (type === UI.sqlManagerDialog.type.open) {
                let rename = document.createElement("button");
                rename.className = "button";
                rename.innerText = "重命名";
                rename.onclick = function () {
                    let title = $("sql-Manager-Content-name").value;
                    UI.prompt.show("输入", {"新的脚本名称": title}, "auto", function (args, values) {
                        let newname = values["新的脚本名称"];
                        let title = args["title"];
                        let storage = window.localStorage;
                        let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                        let exist = false;
                        for (sqlname in sqllist) {
                            if (sqlname == newname.trim()) {
                                exist = true;
                                break;
                            }
                        }
                        if (!exist) {
                            if (title != "" && newname.trim() != "") {
                                let tmp = {};
                                for (sqlname in sqllist) {
                                    if (sqlname == title) {
                                        tmp[newname] = sqllist[sqlname];
                                    } else {
                                        tmp[sqlname] = sqllist[sqlname];
                                    }
                                }
                                storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(tmp));
                                getSQLList($("sql-Manager-Content-table"));
                                $("table-container").style.display = "block";
                                $("edit-container").style.display = "none";
                            }
                        } else
                            UI.alert.show("提示", "名称 " + newname + " 已经存在，请重新命名.")
                    }, {title: title});
                };
                tool.appendChild(rename);
            }

            if (type === UI.sqlManagerDialog.type.backup) {
                let saveas = document.createElement("button");
                saveas.className = "button";
                saveas.innerText = "备份";
                saveas.onclick = function () {
                    let storage = window.localStorage;
                    let sqllist = {};
                    if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
                        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
                    else {
                        sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                    }
                    let hash = JSON.stringify(sqllist).hex_md5_hash();
                    let wr = {
                        appName: __VERSION__.name,
                        backup: sqllist,
                        hash: hash,
                        date: getNow()
                    };
                    //使用UTF8编码规则.
                    let blob = new Blob([str2ab(JSON.stringify(wr))], {type: "application/octet-stream"});
                    openDownloadDialog(blob, __VERSION__.name + " SQL backup.json");
                };
                tool.appendChild(saveas);
            }

            let input = document.createElement("input");
            input.type = "file";
            input.id = "openJson";
            input.style.display = "none";
            input.className = "openJson";
            input.accept = "text/plain,application/json";
            input.onchange = function () {
                if (window.FileReader) {
                    try {
                        let file = this.files[0];
                        let reader = new FileReader();
                        reader.onload = function () {
                            try {
                                let js = JSON.parse(this.result);
                                let sqllist = js.backup;
                                let hash = js.hash;
                                if (JSON.stringify(sqllist).hex_md5_hash() === hash) {
                                    UI.confirm.show("警告", "您确定使用备份文件覆盖当前存储的所有脚本吗?<span style='font-size:5px;'><dl>"
                                        + "<li>文件名称:&emsp;" + file.name + "</li>"
                                        + "<li>文件大小:&emsp;" + file.size + " bytes</li>"
                                        + "<li>文件类型:&emsp;" + file.type + "</li>"
                                        + "<li>数据来源:&emsp;" + js.appName + "</li>"
                                        + "<li>校验代码:&emsp;" + hash + "</li>"
                                        + "<li>备份时间:&emsp;" + ((typeof js.date) == "undefined" ? file.lastModified.Format("yyyy-MM-dd hh:mm:ss.S") : js.date) + "</li></dl></span>", "auto", function (args) {
                                        let storage = window.localStorage;
                                        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(args.sqllist));
                                        getSQLList($("sql-Manager-Content-table"));
                                        $("table-container").style.display = "block";
                                        $("edit-container").style.display = "none";
                                    }, {sqllist: sqllist});
                                } else {
                                    UI.alert.show("提示", "备份文件校验错误!<span style='font-size:50%;'><dl>"
                                        + "<li>文件名称:&emsp;" + file.name + "</li>"
                                        + "<li>文件大小:&emsp;" + file.size + " Bytes</li>"
                                        + "<li>文件类型:&emsp;" + file.type + "</li>"
                                        + "<li>数据来源:&emsp;" + js.appName + "</li>"
                                        + "<li>校验代码:&emsp;" + hash + "</li>"
                                        + "<li>备份时间:&emsp;" + ((typeof js.date) == "undefined" ? file.lastModified.Format("yyyy-MM-dd hh:mm:ss.S") : js.date) + "</li></dl></span>")
                                }
                            } catch (e) {
                                UI.alert.show("提示", "该文件不是标准化的备份文件,请重新选择!<span style='font-size:50%;'><dl>"
                                    + "<li>文件名称:&emsp;" + file.name + "</li>"
                                    + "<li>文件大小:&emsp;" + file.size + " Bytes</li>"
                                    + "<li>文件类型:&emsp;" + file.type + "</li><dl></span>")
                            }
                        };
                        //使用UTF8编码规则.
                        reader.readAsText(file, "UTF-8");
                    } catch (e) {
                        UI.alert.show("提示", "请选择需要导入的文件.")
                    }
                } else {
                    UI.alert.show("注意", "本应用适用于Chrome或Edge浏览器。")
                }
            };
            tool.appendChild(input);

            if (type === UI.sqlManagerDialog.type.backup) {
                let loadfile = document.createElement("button");
                loadfile.className = "button";
                loadfile.innerText = "恢复";
                loadfile.onclick = function () {
                    $("openJson").click();
                };
                tool.appendChild(loadfile);
            }

            let exit = document.createElement("button");
            exit.className = "button";
            exit.innerText = "取消";
            exit.onclick = close.onclick = function () {
                parent.removeChild($("ui_sqlManagerDialog"));
            };
            tool.appendChild(exit);
            setDialogDrag(title);
        }
    },

    getSubtotal: function (parent, colid, callback) {
        let dataset = __DATASET__.result[__DATASET__.default.sheet];
        let columns = [];
        for (let i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        function addSubtotal(columns, i) {
            let tr = document.createElement("tr");
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            tr.onclick = function () {
                if (this.getElementsByClassName("check")[0].checked == true)
                    this.getElementsByClassName("check")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("check")[0].setAttribute("checked", "checked");
            };
            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "check";
            check.style.width = "32px";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.style.width = "32px";
            td.style.textAlign = "center";
            let cols = document.createElement("select");
            cols.type = "select";
            cols.className = "subtotal_object";
            for (let c = 0; c < columns.length; c++) {
                cols.options.add(new Option(columns[c], columns[c]));
            }
            td.appendChild(cols);
            tr.appendChild(td);

            td = document.createElement("td");
            let ways = document.createElement("select");
            ways.type = "select";
            ways.className = "subtotal_type";
            let methods = [
                {name: "计数", value: "COUNT"},
                {name: "数字计数", value: "NUMCOUNT"},
                {name: "求和", value: "SUM"},
                {name: "最小值", value: "MIN"},
                {name: "最大值", value: "MAX"},
                {name: "算术平均", value: "AVERAGE"},
                {name: "中位数", value: "MEDIAN"},
                {name: "方差", value: "VARIANCE"},
                {name: "标准差", value: "STDEV"},
                {name: "标准误差", value: "STERR"},
                {name: "全距", value: "RANGE"}
            ];
            for (let c = 0; c < methods.length; c++) {
                ways.options.add(new Option(methods[c].name, methods[c].value));
            }
            tr.appendChild(td);
            td.appendChild(ways);
            return tr;
        }

        let container = document.createElement("div");
        container.id = "ui_subtotal";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "subtotal-Content";
        content.className = "ui-container-body";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 分类计算";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let d = document.createElement("div");
        content.appendChild(d);
        d.style.height = "22px";
        span = document.createElement("span");
        span.innerHTML = "分类字段:";
        d.appendChild(span);
        let cols = document.createElement("select");
        cols.type = "select";
        cols.id = "subtotal_groupby";
        cols.style.width = "80%";
        cols.style.cssFloat = "right";
        cols.options.add(new Option("全部", ""));
        for (let c = 0; c < columns.length; c++) {
            cols.options.add(new Option(columns[c], columns[c]));
        }
        if (colid != null) {
            cols.selectedIndex = colid + 1;
        }
        d.appendChild(cols);

        let tableContent = document.createElement("div");
        tableContent.className = "ui-container-scroll-div";
        content.appendChild(tableContent);

        let table = document.createElement("table");
        tableContent.appendChild(table);
        table.id = "subtotal-dialog-table";
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
        check.style.width = "32px";
        check.onclick = function () {
            let columns = $("subtotal-dialog-table").getElementsByClassName("check");
            for (let i = 0; i < columns.length; i++) {
                columns[i].checked = this.checked;
                this.checked ? columns[i].setAttribute("checked", "checked") : columns[i].removeAttribute("checked");
            }
        };
        th.style.textAlign = "center";
        th.appendChild(check);
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "统计对象";
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "统计方式";
        tr.appendChild(th);

        table.appendChild(addSubtotal(columns, 0));

        d = document.createElement("div");
        content.appendChild(d);
        let merge = document.createElement("input");
        merge.type = "checkbox";
        merge.id = "subtotal_merge";
        merge.style.marginTop = "4px";
        merge.style.cssFloat = "left";
        merge.style.width = "28px";
        d.appendChild(merge);
        span = document.createElement("span");
        span.innerHTML = "合并结果";
        span.style.cssFloat = "left";
        d.appendChild(span);

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        content.appendChild(tool);

        let add = document.createElement("button");
        add.className = "button";
        add.innerText = "增加";
        add.onclick = function () {
            let table = $("subtotal-dialog-table");
            table.appendChild(addSubtotal(columns, table.getElementsByTagName("tr").length - 1));
        };
        tool.appendChild(add);

        let del = document.createElement("button");
        del.className = "button";
        del.innerText = "删除";
        del.onclick = function () {
            let table = $("subtotal-dialog-table");
            let columns = table.getElementsByTagName("tr");
            if (columns.length > 2) {
                for (let i = columns.length - 1; i > 1; i--) {
                    let checks = columns[i].getElementsByClassName("check");
                    if (checks[0].checked == true) {
                        table.removeChild(columns[i]);
                    }
                }
            } else {
                UI.alert.show("提示", "至少保留一个统计对象.");
            }
        };
        tool.appendChild(del);

        let confirm = document.createElement("button");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let merge = $("subtotal_merge").checked;
            let column = $("subtotal_groupby").value;
            let obj = document.getElementsByClassName("subtotal_object");
            let typ = document.getElementsByClassName("subtotal_type");
            let columns = [];
            let data = [];
            let sets = null;
            for (let i = 0; i < obj.length; i++) {
                let target = obj[i].value;
                if (merge) {
                    //横向合并集合
                    let result = subtotal(column, target, typ[i].value);
                    if (columns.length == 0) {
                        columns = result["columns"];
                        data = result["data"];
                    } else {
                        let col = result["columns"][1];
                        col.id = columns.length;
                        columns.push(col);
                        for (let x = 0; x < result["data"].length; x++) {
                            let r = result["data"][x];
                            for (let c = 0; c < data.length; c++) {
                                let row = data[c];
                                if (row[column == "" ? "全部" : column].value == r[column == "" ? "全部" : column].value) {
                                    let cell = r[col.name];
                                    cell.colid = col.id;
                                    row[col.name] = cell;
                                    break;
                                }
                            }
                        }
                    }
                } else
                    sets = subtotal(column, target, typ[i].value);
            }
            if (merge) {
                let title = __DATASET__.result[__DATASET__.default.sheet].title;
                sets = {
                    eventid: getEventIndex(),
                    columns: columns,
                    data: data,
                    title: title,
                    sql: __DATASET__.result[__DATASET__.default.sheet].sql,
                    type: __DATASET__.result[__DATASET__.default.sheet].type,
                    parameter: __DATASET__.result[__DATASET__.default.sheet].title.parameter,
                    time: getNow()
                }
            }
            if (typeof callback == "function") {
                callback(sets);
            }
            parent.removeChild($("ui_subtotal"));
        };
        tool.appendChild(confirm);

        let cancel = document.createElement("button");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = close.onclick = function () {
            parent.removeChild($("ui_subtotal"));
        };
        tool.appendChild(cancel);
        setDialogDrag(title);
    },


    getDataSlice: function (parent, callback) {
        function getGroups(setid, start, end, groupby) {
            let data = __DATASET__.result[setid].data;
            let groups = [];
            for (let i = 0; i < data.length; i++) {
                if (i >= start && i <= end) {
                    let row = data[i];
                    let ex = false;
                    for (let t = 0; t < groups.length; t++) {
                        if (groups[t] === row[groupby].value) {
                            ex = true;
                            break;
                        }
                    }
                    if (ex == false) {
                        groups.push(row[groupby].value);
                    }
                }
            }
            return groups;
        }

        function dataSlice(setid, cols, begin, end, groupby, groupvalue) {
            let columns = __DATASET__.result[setid].columns;
            let sql = __DATASET__.result[setid].sql;
            let title = __DATASET__.result[setid].title.slice();
            if (groupvalue != null)
                title.push(groupvalue);
            //else
            //    title.push("result of Data slicing");
            let type = __DATASET__.result[setid].type;
            let parameter = __DATASET__.result[setid].parameter;
            let col_tmp = [];
            let id = 0;
            for (let i = 0; i < cols.length; i++) {
                if (cols[i].checked == true) {
                    for (let c = 0; c < columns.length; c++) {
                        if (cols[i].name == columns[c].name) {
                            let col = columns[c];
                            col.id = id;
                            col_tmp.push(col);
                            break;
                        }
                    }
                    id++;
                }
            }
            let rowid = 0;
            let data = __DATASET__.result[setid].data;
            let dataset = [];
            for (let i = 0; i <= data.length; i++) {
                let row = data[i];
                if (i >= begin && i <= end) {
                    let r = {};
                    for (let c = 0; c < col_tmp.length; c++) {
                        let cell = row[col_tmp[c].name];
                        cell.rowid = rowid;
                        cell.colid = col_tmp[c].id;
                        r[col_tmp[c].name] = cell;
                    }
                    if (groupby == "none") {
                        dataset.push(r);
                        rowid++;
                    } else {
                        if (row[groupby].value == groupvalue) {
                            dataset.push(r);
                            rowid++;
                        }
                    }
                }
            }
            return {
                eventid: getEventIndex(),
                title: title,
                sql: sql,
                type: type,
                parameter: parameter,
                columns: col_tmp,
                data: dataset,
                time: getNow()
            };
        }

        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_dataSlice";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "data-slice-Content";
        content.className = "ui-container-body";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 数据切片";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tableContent = document.createElement("div");
        tableContent.className = "ui-container-scroll-div";
        content.appendChild(tableContent);

        let table = document.createElement("table");
        tableContent.appendChild(table);
        table.id = "data-slice-table";
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
            let columns = $("data-slice-table").getElementsByClassName("data-slice-column-check");
            for (let i = 0; i < columns.length; i++) {
                columns[i].checked = this.checked;
                this.checked ? columns[i].setAttribute("checked", "checked") : columns[i].removeAttribute("checked");
            }
        };
        th.style.textAlign = "center";
        th.appendChild(check);
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "切片字段";
        tr.appendChild(th);
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        for (let i = 0; i < columns.length; i++) {
            tr = document.createElement("tr");
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("data-slice-column-check")[0].checked == true)
                    this.getElementsByClassName("data-slice-column-check")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("data-slice-column-check")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "data-slice-column-check";
            check.style.width = "18px";
            check.setAttribute("name", columns[i].name);
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.style.width = "36px";
            td.style.textAlign = "center";
            td.innerText = columns[i].name;
            tr.appendChild(td);
        }

        let d = document.createElement("div");
        content.appendChild(d);
        span = document.createElement("span");
        span.innerText = "切片范围 : [";
        d.appendChild(span);
        let range_begin = document.createElement("input");
        range_begin.id = "data-slice-range-begin";
        range_begin.style.width = "50px";
        range_begin.style.textAlign = "center";
        range_begin.value = 1;
        d.appendChild(range_begin);
        span = document.createElement("span");
        span.innerText = " - ";
        d.appendChild(span);
        let range_end = document.createElement("input");
        range_end.id = "data-slice-range-end";
        range_end.style.width = "50px";
        range_end.style.textAlign = "center";
        range_end.value = __DATASET__.result[__DATASET__.default.sheet].data.length;
        d.appendChild(range_end);
        span = document.createElement("span");
        span.innerText = "] 分组 : ";
        d.appendChild(span);
        let groupBy = document.createElement("select");
        groupBy.id = "data-slice-groupby";
        groupBy.style.width = "100px";
        groupBy.options.add(new Option("不分组", "none"));
        for (let i = 0; i < columns.length; i++) {
            groupBy.options.add(new Option(columns[i].name, columns[i].name));
        }
        d.appendChild(groupBy);

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        content.appendChild(tool);
        let confirm = document.createElement("button");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let values = [];
            let cols = $("data-slice-table").getElementsByClassName("data-slice-column-check");
            let begin = Number($("data-slice-range-begin").value) - 1;
            let end = Number($("data-slice-range-end").value) - 1;
            let groupby = $("data-slice-groupby").value;
            let groups = [];
            let setid = __DATASET__.default.sheet;
            if (groupby != "none") {
                groups = getGroups(setid, begin, end, groupby);
            }
            if (groups.length > 0) {
                for (let g = 0; g < groups.length; g++) {
                    values.push(dataSlice(setid, cols, begin, end, groupby, groups[g]));
                }
            } else
                values.push(dataSlice(setid, cols, begin, end, "none", null));

            if (typeof callback == "function") {
                callback(values);
            }
            parent.removeChild($("ui_dataSlice"));
        };
        tool.appendChild(confirm);

        let cancel = document.createElement("button");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = close.onclick = function () {
            parent.removeChild($("ui_dataSlice"));
        };
        tool.appendChild(cancel);

        setDialogDrag(title);

    },

    getDataFilter: function (parent, colid, callback) {
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        let data = __DATASET__.result[__DATASET__.default.sheet].data;

        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_dataFilter";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "data-filter-Content";
        content.className = "ui-container-body";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 筛选字段 [ " + columns[Number(colid)].name + " ]";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tableContent = document.createElement("div");
        tableContent.className = "ui-container-scroll-div";
        content.appendChild(tableContent);

        let table = document.createElement("table");
        tableContent.appendChild(table);
        table.id = "data-filter-table";
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
            let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
            for (let i = 0; i < filters.length; i++) {
                filters[i].checked = this.checked;
                this.checked ? filters[i].setAttribute("checked", "checked") : filters[i].removeAttribute("checked");
            }
        };
        th.style.textAlign = "center";
        th.appendChild(check);
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "筛选条件";
        tr.appendChild(th);

        let values = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let value = row[columns[Number(colid)].name].value;
            let is = false;
            for (let v = 0; v < values.length; v++) {
                if (value == values[v]) {
                    is = true;
                    break;
                }
            }
            if (is == false)
                values.push(value);
        }

        values = sortAsc(values);

        for (let i = 0; i < values.length; i++) {
            tr = document.createElement("tr");
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("data-filter-check")[0].checked == true)
                    this.getElementsByClassName("data-filter-check")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("data-filter-check")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "data-filter-check";
            check.style.width = "18px";
            check.setAttribute("value", values[i]);
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.style.width = "36px";
            td.style.textAlign = "center";
            td.innerText = values[i];
            tr.appendChild(td);
        }

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        content.appendChild(tool);

        let checknone = document.createElement("button");
        checknone.className = "button";
        checknone.innerText = "反选";
        checknone.onclick = function () {
            let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].checked) {
                    filters[i].checked = false;
                    filters[i].removeAttribute("checked");
                } else {
                    filters[i].checked = true;
                    filters[i].setAttribute("checked", "checked");
                }
            }
        };
        tool.appendChild(checknone);

        let confirm = document.createElement("button");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let values = [];
            let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].checked == true)
                    values.push(filters[i].getAttribute("value"))
            }
            let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
            let dataset = [];

            let rowid = 0;
            let data = __DATASET__.result[__DATASET__.default.sheet].data;
            let title = __DATASET__.result[__DATASET__.default.sheet].title;
            let sql = __DATASET__.result[__DATASET__.default.sheet].sql;
            let type = __DATASET__.result[__DATASET__.default.sheet].type;
            let parameter = __DATASET__.result[__DATASET__.default.sheet].parameter;
            let column = columns[Number(colid)].name;
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                for (let v = 0; v < values.length; v++) {
                    if (row[column].value == values[v]) {
                        let r = {};
                        for (let col in row) {
                            let cell = row[col];
                            cell.rowid = rowid;
                            r[col] = cell;
                        }
                        dataset.push(r);
                        rowid++;
                        break;
                    }
                }
            }
            //title.push("result of Data filter");
            if (typeof callback == "function")
                callback({
                    eventid: getEventIndex(),
                    title: title,
                    sql: sql,
                    type: type,
                    parameter: parameter,
                    columns: columns,
                    data: dataset,
                    time: getNow()
                });
            parent.removeChild($("ui_dataFilter"));
        };
        tool.appendChild(confirm);

        let cancel = document.createElement("button");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = close.onclick = function () {
            parent.removeChild($("ui_dataFilter"));
        };
        tool.appendChild(cancel);

        setDialogDrag(title);
    },

    setColumnFormat: function (parent, colid, callback) {
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        let style = {};
        try {
            style = __DATASET__.result[__DATASET__.default.sheet].data[0][columns[Number(colid)].name].style;
        } catch (e) {
        }

        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_columnFormat";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "table-data-format";
        content.className = "ui-container-body";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 格式设置 [ " + columns[Number(colid)].name + " ]";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let items = document.createElement("div");
        items.className = "ui-container-scroll-div";
        content.appendChild(items);

        let item = document.createElement("div");
        item.className = "ui-container-item";
        items.appendChild(item);
        let name = document.createElement("span");
        name.className = "ui-container-item-name";
        name.innerText = "对齐 : ";
        item.appendChild(name);
        let param = document.createElement("select");
        param.className = "ui-container-item-select";
        param.id = "text-align";
        let methods = [
            {name: "左对齐", value: "left"},
            {name: "居中", value: "center"},
            {name: "右对齐", value: "right"}
        ];
        for (let c = 0; c < methods.length; c++) {
            param.options.add(new Option(methods[c].name, methods[c].value));
        }
        param.value = style[param.id];
        item.appendChild(param);

        item = document.createElement("div");
        item.className = "ui-container-item";
        items.appendChild(item);
        name = document.createElement("span");
        name.className = "ui-container-item-name";
        name.innerText = "颜色 : ";
        item.appendChild(name);
        param = document.createElement("input");
        param.className = "ui-container-item-select";
        param.id = "color";
        param.type = "color";
        param.value = style[param.id];
        item.appendChild(param);
        items.appendChild(item);

        item = document.createElement("div");
        item.className = "ui-container-item";
        items.appendChild(item);
        name = document.createElement("span");
        name.className = "ui-container-item-name";
        name.innerText = "字号 : ";
        item.appendChild(name);
        param = document.createElement("select");
        param.className = "ui-container-item-select";
        param.id = "font-size";
        methods = [
            {name: "100%", value: "100%"},
            {name: "110%", value: "110%"},
            {name: "120%", value: "120%"},
            {name: "130%", value: "130%"},
            {name: "140%", value: "140%"},
            {name: "150%", value: "150%"}
        ];
        for (let c = 0; c < methods.length; c++) {
            param.options.add(new Option(methods[c].name, methods[c].value));
        }
        param.value = style[param.id];
        item.appendChild(param);
        items.appendChild(item);

        item = document.createElement("div");
        item.className = "ui-container-item";
        items.appendChild(item);
        name = document.createElement("span");
        name.className = "ui-container-item-name";
        name.innerText = "样式 : ";
        item.appendChild(name);
        param = document.createElement("select");
        param.className = "ui-container-item-select";
        param.id = "font-style";
        methods = [
            {name: "正常", value: "normal"},
            {name: "斜体", value: "italic"}
        ];
        for (let c = 0; c < methods.length; c++) {
            param.options.add(new Option(methods[c].name, methods[c].value));
        }
        param.value = style[param.id];
        item.appendChild(param);
        items.appendChild(item);

        item = document.createElement("div");
        item.className = "ui-container-item";
        items.appendChild(item);
        name = document.createElement("span");
        name.className = "ui-container-item-name";
        name.innerText = "加粗 : ";
        item.appendChild(name);
        param = document.createElement("select");
        param.className = "ui-container-item-select";
        param.id = "font-weight";
        methods = [
            {name: "normal", value: "normal"},
            {name: "lighter", value: "lighter"},
            {name: "bold", value: "bold"},
            {name: "bolder", value: "bolder"}
        ];
        for (let c = 0; c < methods.length; c++) {
            param.options.add(new Option(methods[c].name, methods[c].value));
        }
        param.value = style[param.id];
        item.appendChild(param);
        items.appendChild(item);

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        content.appendChild(tool);
        tool.className = "groupbar";

        let confirm = document.createElement("button");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let param = $("table-data-format").getElementsByClassName("ui-container-item-select");
            let format = {};
            for (let i = 0; i < param.length; i++) {
                format[param[i].id] = param[i].value;
            }
            let data = __DATASET__.result[__DATASET__.default.sheet].data;
            for (let i = 0; i < data.length; i++) {
                let row = data[i]
                for (let col in row) {
                    if (row[col].colid == Number(colid))
                        row[col].style = format;
                }
            }
            if (typeof callback == "function")
                callback(__DATASET__.default.sheet);
            parent.removeChild($("ui_columnFormat"));
        };
        tool.appendChild(confirm);

        let cancel = document.createElement("button");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = close.onclick = function () {
            parent.removeChild($("ui_columnFormat"));
        };
        tool.appendChild(cancel);
        setDialogDrag(title);
    },
};

var SQLite = {
    columnStruct: {
        check: {value: false, name: "选择", type: "checkbox", width: "50px"},
        name: {value: "", name: "名称", type: "input", width: "100px"},
        type: {
            value: 0,
            name: "类型",
            type: "select",
            "options": ["int", "varchar", "nvarchar", "decimal", "float", "date", "datetime", "boolean", "blob"],
            width: "75px"
        },
        length: {value: 0, name: "长度", type: "input", width: "25px"},
        scale: {value: 0, name: "小数位数", type: "input", width: "50px"},
        allowNull: {value: true, name: "允许空值", type: "select", "options": ["Y", "N"], width: "50px"},
        index: {value: false, name: "索引", type: "checkbox", width: "50px"},
        auto_increment: {value: false, name: "自增", type: "checkbox", width: "50px"},
        column_default: {value: null, name: "默认值", type: "input", width: "50px"},
        comment: {value: "", name: "注释", type: "input", width: "50px"},
    },
    dbManager:function(message, parent, callback, args) {
        let __DATABASE__ = {
            Name: {
                value: "",
                name: "库名称",
                type: "text",
                image: __SYS_IMAGES_SVG__.getUrl(__SYS_IMAGES_SVG__.database, __THEMES__.get().color, "16px", "16px")
            },
            Database: {value: null, name: "库文件", type: "text"},
            Version: {value: 1.0, name: "版本号", type: "text"},
            Description: {value: "", name: "库描述", type: "text"},
            Size: {value: "1024*1024*1024", name: "库容量", type: "text"}
        };
        if (typeof args.index !== "undefined" && typeof args.db !== "undefined") {
            __DATABASE__.Name.value = args.index;
            __DATABASE__.Database = args.db.Database;
            __DATABASE__.Version.value = args.db.Version;
            __DATABASE__.Description.value = args.db.Description;
            __DATABASE__.Size.value = args.db.Size;
        }
        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_createDatabase";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.className = "ui-container-body";
        content.id = "create-database-Content";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● " + message +" ";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        for (let name in __DATABASE__) {
            if (name !== "Database") {
                let item = document.createElement("div");
                item.className = "ui-container-item";
                content.appendChild(item);
                let span = document.createElement("span");
                span.className = "ui-container-item-name";
                span.innerHTML = __DATABASE__[name].name + ":";
                item.appendChild(span);
                if (__DATABASE__[name].type == "text") {
                    let input = document.createElement("input");
                    input.className = "ui-container-item-input";
                    input.id = name;
                    input.type = "text";
                    input.value = __DATABASE__[name].value;
                    if (typeof __DATABASE__[name].image !== "undefined") {
                        input.style.backgroundImage = __DATABASE__[name].image;
                        input.style.backgroundRepeat = "no-repeat";
                        input.style.backgroundPosition = "right";
                        input.style.backgroundSize = "16px 16px";
                    }
                    input.onchange = function () {
                        __DATABASE__[this.id].value = this.value;
                    };
                    item.appendChild(input);
                }
            }
        }

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        tool.style.cssFloat = "left";
        content.appendChild(tool);

        let b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "保存";
        b.onclick = function () {
            if (checkStorage()) {
                if (__DATABASE__.Name.value.trim() != "") {
                    let db = {
                        name: __DATABASE__.Name.value,
                        db: {
                            Database: __DATABASE__.Database.value == null ? getEventIndex() : __DATABASE__.Database.value,
                            Version: __DATABASE__.Version.value,
                            Description: __DATABASE__.Description.value,
                            Size: __DATABASE__.Size.value
                        }
                    };
                    callback(args, db);
                    parent.removeChild($("ui_createDatabase"));
                } else
                    UI.alert.show("提示", "请输入数据库名称.");
            }
        };
        tool.appendChild(b);
        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            parent.removeChild($("ui_createDatabase"));
        };
        tool.appendChild(b);

        setDialogDrag(title);
    },

    createTable:function(parent, structure, callback) {
        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                parent = __CONFIGS__.FULLSCREEN.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_createTable";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.className = "ui-container-body";
        content.style.width = "550px";
        content.id = "create-table-Content";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 创建数据表 ";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tableTitle = document.createElement("input");
        tableTitle.id = "table-Title";
        tableTitle.placeholder = "请输入数据表名称.";
        if (structure != null)
            tableTitle.value = structure["title"];
        tableTitle.style.width = "99.2%";
        content.appendChild(tableTitle);

        let tablecontainer = document.createElement("div");
        tablecontainer.className = "ui-container-scroll-div";
        content.appendChild(tablecontainer);

        let tb = document.createElement("table");
        tablecontainer.appendChild(tb);
        tb.className = "table";
        tb.style.width = "100%";
        tb.id = "table-Content";
        let tr = document.createElement("tr");
        tb.appendChild(tr);
        for (let index in SQLite.columnStruct) {
            let th = document.createElement("th");
            tr.appendChild(th);
            if (index != "check")
                th.innerText = SQLite.columnStruct[index].name;
            else {
                let check = document.createElement("input");
                check.type = "checkbox";
                check.className = "columns-checkall";
                check.style.width = "18px";
                check.onclick = function () {
                    let columns = $("table-Content").getElementsByClassName("check");
                    for (let i = 0; i < columns.length; i++) {
                        columns[i].checked = this.checked;
                        this.checked ? columns[i].setAttribute("checked", "checked") : columns[i].removeAttribute("checked");
                    }
                };
                th.style.textAlign = "center";
                th.appendChild(check);
            }
        }
        let cols = 3;
        if (structure != null)
            cols = structure["stru"].length;

        for (let rows = 0; rows < cols; rows++) {
            tr = document.createElement("tr");
            if (rows % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            tb.appendChild(tr);
            for (let index in SQLite.columnStruct) {
                let td = document.createElement("td");
                tr.appendChild(td);
                let attri;
                if (SQLite.columnStruct[index].type == "select") {
                    attri = document.createElement("select");
                    attri.className = index;
                    attri.type = SQLite.columnStruct[index].type;
                    for (let i = 0; i < SQLite.columnStruct[index].options.length; i++) {
                        attri.options.add(new Option(SQLite.columnStruct[index].options[i], SQLite.columnStruct[index].options[i]));
                    }
                    if (structure != null)
                        for (let s = 0; s < attri.options.length; s++) {
                            if (attri.options[s].value == structure["stru"][rows][index]) {
                                attri.selectedIndex = s;
                                break;
                            }
                        }
                } else {
                    attri = document.createElement("input");
                    attri.className = index;
                    attri.type = SQLite.columnStruct[index].type;

                    if (attri.type == "checkbox") {
                        if (structure == null) {
                            if (SQLite.columnStruct[index].value == true) {
                                attri.setAttribute("checked", "checked");
                            }
                        } else if (structure["stru"][rows][index] == true) {
                            attri.setAttribute("checked", "checked");
                        }
                        attri.onclick = function () {
                            if (this.checked == false) {
                                this.removeAttribute("checked");
                            } else {
                                this.setAttribute("checked", "checked");
                            }
                        }
                    } else {
                        if (structure == null)
                            attri.value = SQLite.columnStruct[index].value;
                        else
                            attri.value = structure["stru"][rows][index];
                    }
                }
                attri.style.width = SQLite.columnStruct[index].width;
                td.appendChild(attri);
            }
        }

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        tool.style.cssFloat = "left";
        content.appendChild(tool);

        let add = document.createElement("button");
        add.className = "button";
        add.innerHTML = "增加";
        add.setAttribute("tb", tb.id);
        add.onclick = function () {
            let table = $("table-Content");
            let tr = document.createElement("tr");
            if ((table.getElementsByTagName("tr").length - 1) % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);
            for (let index in SQLite.columnStruct) {
                let td = document.createElement("td");
                tr.appendChild(td);
                let attri;
                if (SQLite.columnStruct[index].type == "select") {
                    attri = document.createElement("select");
                    attri.className = index;
                    attri.type = SQLite.columnStruct[index].type;
                    for (let i = 0; i < SQLite.columnStruct[index].options.length; i++) {
                        attri.options.add(new Option(SQLite.columnStruct[index].options[i], SQLite.columnStruct[index].options[i]));
                    }
                } else {
                    attri = document.createElement("input");
                    attri.className = index;
                    attri.type = SQLite.columnStruct[index].type;

                    if (attri.type == "checkbox") {
                        if (SQLite.columnStruct[index].value == true) {
                            attri.setAttribute("checked", "checked");
                        }
                        attri.onclick = function () {
                            if (this.checked == false) {
                                this.removeAttribute("checked");
                            } else {
                                this.setAttribute("checked", "checked");
                            }
                        }
                    } else {
                        attri.value = SQLite.columnStruct[index].value;
                    }
                }
                attri.style.width = SQLite.columnStruct[index].width;
                td.appendChild(attri);
            }
        };
        tool.appendChild(add);

        let del = document.createElement("button");
        del.className = "button";
        del.innerHTML = "删除";
        del.onclick = function () {
            let table = $("table-Content");
            let columns = table.getElementsByTagName("tr");
            if (columns.length > 2) {
                for (let i = columns.length - 1; i > 1; i--) {
                    let checks = columns[i].getElementsByClassName("check");
                    if (checks[0].checked == true) {
                        table.removeChild(columns[i]);
                    }
                }
            } else {
                UI.alert.show("提示", "至少保留一个字段.");
            }
        };
        tool.appendChild(del);

        let b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "创建";
        b.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                UI.alert.show("提示", "请选择数据库.");
                return;
            }
            if (checkStorage()) {
                let table = $("table-Content");
                let rows = table.getElementsByTagName("tr");
                let stru = [];
                for (let i = 1; i < rows.length; i++) {
                    let col = {};
                    for (let index in SQLite.columnStruct) {
                        let column = rows[i].getElementsByClassName(index)[0];
                        if (column.type == "checkbox") {
                            col[index] = column.checked;
                        } else {
                            col[index] = column.value;
                        }
                    }
                    stru.push(col);
                }
                let title = $("table-Title");
                if (title.value != "") {
                    let sql = SQLite.getTableSQL(title.value, stru);
                    __LOGS__.viewMessage(sql);
                    callback({title: title.value,sql:sql});
                } else
                    UI.alert.show("提示", "请输入数据表名称.");
            }
        };
        tool.appendChild(b);

        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            parent.removeChild($("ui_createTable"));
        };
        tool.appendChild(b);

        setDialogDrag(title);
    },
    import: {
        configs: {
            Table: {value: "", name: "数据表", type: "view"},
            Charset: {value: 0, name: "字符集", type: "select", options: ["GBK", "UTF-8"]},
            Separator: {value: ",", name: "分隔符", type: "select", options: [["逗号", ","], ["竖线", "|"], ["Tab", "\t"]]},
            SourceFile: {
                value: null,
                name: "源文件",
                type: "file",
                data: [],
                total: 0,
                count: 0,
                imported: 0,
                failed: 0,
                sql: null,
                error: [],
                progress: null
            },
            SelectedDataSet: {value: -1, name: "数据集", type: "select", options: []},
        },
        dataStruct: function () {
            let sep = SQLite.import.configs.Separator.value;
            let lines = SQLite.import.configs.SourceFile.data[SQLite.import.configs.SelectedDataSet.value].split("\r\n");
            if (lines.length == 1)
                lines = SQLite.import.configs.SourceFile.data[SQLite.import.configs.SelectedDataSet.value].split("\n");

            let start = SQLite.structInspect(lines.slice(0, lines.length > 1000 ? 1000 : lines.length), sep);
            //检测样本为前1000条数据
            let columns = start.lines[0];
            let data = start.lines[1];

            let stru = [];
            for (let i = 0; i < columns.length; i++) {
                let col = {};
                for (let index in SQLite.columnStruct) {
                    switch (index) {
                        case "check":
                            col[index] = true;
                            break;
                        case "name":
                            col[index] = columns[i];
                            break;
                        case "type":
                            col[index] = data[i].toString().getStringDataType();
                            break;
                        case "length":
                            switch (col["type"]) {
                                case "int":
                                    col[index] = 6;
                                    break;
                                case "date":
                                    col[index] = 10;
                                    break;
                                case "datetime":
                                    col[index] = 25;
                                    break;
                                case "float":
                                    col[index] = 19;
                                    break;
                                default:
                                    col[index] = 125;

                            }
                            break;
                        case "scale":
                            switch (col["type"]) {
                                case "float":
                                    col[index] = 6;
                                    break;
                                default:
                                    col[index] = 0;
                            }
                            break;
                        case "allowNull":
                            col[index] = "Y";
                            break;
                        case "index":
                            col[index] = false;
                            break;
                        case "auto_increment":
                            col[index] = false;
                            break;
                        case "column_default":
                            col[index] = null;
                            break;
                    }
                }
                stru.push(col);
            }
            return stru;
        },
        readExcelFile: function (file, sheets) {
            function getData(result, sep) {
                let data = [];
                let lines = result.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    data.push(lines[i].split(sep));
                }
                return data;
            }

            function fixData(data) {
                //文件流转BinaryString
                let tmp = "";
                let l = 0;
                let w = 10240;
                for (; l < data.byteLength / w; ++l) tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return tmp;
            }

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
                for (let i = 0; i < sheetNames.length; i++) {
                    let worksheet = workbook.Sheets[sheetNames[i]];
                    let csv = XLSX.utils.sheet_to_csv(worksheet);
                    SQLite.import.configs.SourceFile.data.push(csv);
                    sheets.options.add(new Option(sheetNames[i], i));
                    //return csv;
                }
                SQLite.import.configs.SelectedDataSet.value = sheets.selectedIndex = 0;
            };
            try {
                reader.readAsBinaryString(file);
            } catch (e) {
                reader.readAsArrayBuffer(file);
                rABS = false;
            }
        },
        run: function () {
            //#######################################
            //默认行分隔符:\r\n
            //数据分隔符:支持|,\t
            //#######################################

            function getByteLength(val) {
                let len = 0;
                for (let i = 0; i < val.length; i++) {
                    //（unicode:汉字的编码大于255）
                    if (val.charCodeAt(i) < 0 || val.charCodeAt(i) > 255)
                        len = len + 2;
                    else
                        len = len + 1;
                }
                return len;
            }

            function getSubString(val, start, length) {
                let value = "";
                let len = 0;
                for (let i = 0; i < val.length; i++) {
                    if (i >= start) {
                        if (val.charCodeAt(i) < 0 || val.charCodeAt(i) > 255)
                            len = len + 2;
                        else
                            len = len + 1;
                        value += val.charAt(i);
                    }
                    if (len == length)
                        break;
                }
                return value;
            }

            function viewPacket(packet) {
                let container = $("ui-progress-detail");
                let item = document.createElement("div");
                item.className = "ui-progress-detail-item";
                item.id = "ui-progress-detail-item-" + packet.index;
                container.appendChild(item);

                let d_index = document.createElement("span");
                d_index.className = "ui-progress-detail-item-index";
                d_index.innerText = packet.index;
                d_index.setAttribute("index", packet.index);
                d_index.title = packet.sql;
                item.appendChild(d_index);
                let d_size = document.createElement("span");
                d_size.className = "ui-progress-detail-item-size";
                d_size.innerHTML = Math.round(getByteLength(packet.data.toString()) * 100 / 1024) / 100 + "Kb";
                d_size.title = packet.data.toString();
                item.appendChild(d_size);
                let d_error = document.createElement("span");
                d_error.className = "ui-progress-detail-item-error";
                d_error.innerHTML = (packet.error == null ? "&ensp;" : getSubString(packet.error, 0, 30) + "...");
                d_error.title = packet.error;
                item.appendChild(d_error);
                return item;
            }

            function scrollto(item) {
                let element = null;
                if (typeof item === "undefined") {
                    let items = $("ui-progress-detail").getElementsByClassName("ui-progress-detail-item");
                    element = items[items.length - 1]
                } else
                    element = item;
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }

            __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                try {
                    let sep = SQLite.import.configs.Separator.value;
                    let lines = SQLite.import.configs.SourceFile.data[SQLite.import.configs.SelectedDataSet.value].split("\r\n");
                    if (lines.length == 1)
                        lines = SQLite.import.configs.SourceFile.data[SQLite.import.configs.SelectedDataSet.value].split("\n");
                    let table = __CONFIGS__.CURRENT_TABLE.name;
                    SQLite.import.configs.SourceFile.total = lines.length - 1;
                    //不含表头
                    SQLite.import.configs.SourceFile.count = 0;
                    SQLite.import.configs.SourceFile.imported = 0;
                    SQLite.import.configs.SourceFile.failed = 0;
                    SQLite.import.configs.SourceFile.error = [];
                    SQLite.import.configs.SourceFile.row = null;
                    let pres = {
                        10: false,
                        20: false,
                        30: false,
                        40: false,
                        50: false,
                        60: false,
                        70: false,
                        80: false,
                        90: false,
                        100: false
                    };
                    let sql = "insert into " + table + " values ({VALUES})";
                    //不要加字段列表，否则仅能导入两列数据.
                    for (let i = 0; i < lines.length; i++) {
                        let data = transferData(__CONFIGS__.CURRENT_TABLE.structure, lines[i].trim().split(sep));
                        try {
                            if (i == 0) {
                                let values = "?";
                                for (let c = 1; c < data.length; c++) {
                                    values += ",?";
                                }
                                SQLite.import.configs.SourceFile.sql = sql = sql.replace("{VALUES}", values);
                                __LOGS__.viewMessage(sql);
                            } else if (data.length >= __CONFIGS__.CURRENT_TABLE.structure.data.length) {
                                let row = data.slice(0, __CONFIGS__.CURRENT_TABLE.structure.data.length);
                                tx.executeSql(sql, row, function (tx, results) {
                                        SQLite.import.configs.SourceFile.count += 1;
                                        SQLite.import.configs.SourceFile.imported += results.rowsAffected;
                                        let pre = Math.floor(SQLite.import.configs.SourceFile.count * 100 / SQLite.import.configs.SourceFile.total);
                                        if (typeof pres[pre] !== "undefined") {
                                            if ((pre % 10 == 0 && pres[pre] == false) || SQLite.import.configs.SourceFile.count == SQLite.import.configs.SourceFile.total) {
                                                pres[pre] = true;
                                                let packet = {
                                                    index: SQLite.import.configs.SourceFile.count,
                                                    sql: SQLite.import.configs.SourceFile.sql,
                                                    data: row,
                                                    error: SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%)",
                                                    beginTime: null,
                                                    endTime: getNow()
                                                };
                                                SQLite.import.configs.SourceFile.error.push(packet);
                                                scrollto(viewPacket(packet));
                                                __LOGS__.viewMessage("Imported : " + SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%)")
                                            }
                                        }
                                    },
                                    function (tx, error) {
                                        SQLite.import.configs.SourceFile.count += 1;
                                        SQLite.import.configs.SourceFile.failed += 1;
                                        let pre = Math.floor(SQLite.import.configs.SourceFile.count * 100 / SQLite.import.configs.SourceFile.total);
                                        let packet = {
                                            index: SQLite.import.configs.SourceFile.count,
                                            sql: SQLite.import.configs.SourceFile.sql,
                                            data: row,
                                            error: SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%),\n" + error.message,
                                            beginTime: null,
                                            endTime: getNow()
                                        };
                                        SQLite.import.configs.SourceFile.error.push(packet);
                                        scrollto(viewPacket(packet));
                                        __LOGS__.viewMessage("Imported : " + SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%),\n" + error.message)
                                    });
                            } else {
                                SQLite.import.configs.SourceFile.count += 1;
                                SQLite.import.configs.SourceFile.failed += 1;
                                let pre = Math.floor(SQLite.import.configs.SourceFile.count * 100 / SQLite.import.configs.SourceFile.total);
                                let packet = {
                                    index: SQLite.import.configs.SourceFile.count,
                                    sql: SQLite.import.configs.SourceFile.sql,
                                    data: data,
                                    error: SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%),\n" + "数据解析后长度小于数据库结构.",
                                    beginTime: null,
                                    endTime: getNow()
                                };
                                SQLite.import.configs.SourceFile.error.push(packet);
                                scrollto(viewPacket(packet));
                                __LOGS__.viewMessage("Imported : " + SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%),\n" + "数据解析后长度小于数据库结构.")
                            }
                        } catch (e) {
                            SQLite.import.configs.SourceFile.count += 1;
                            SQLite.import.configs.SourceFile.failed += 1;
                            let pre = Math.floor(SQLite.import.configs.SourceFile.count * 100 / SQLite.import.configs.SourceFile.total);
                            let packet = {
                                index: SQLite.import.configs.SourceFile.count,
                                sql: SQLite.import.configs.SourceFile.sql,
                                data: data,
                                error: SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%)" + e,
                                beginTime: null,
                                endTime: getNow()
                            };
                            SQLite.import.configs.SourceFile.error.push(packet);
                            scrollto(viewPacket(packet));
                            __LOGS__.viewMessage("Imported : " + SQLite.import.configs.SourceFile.imported + " / " + SQLite.import.configs.SourceFile.count + "(" + pre + "%),\n" + e)
                        }
                    }
                    //由于tx.executeSql异步执行，连续事务执行时间不可预计，不能添加事后统计，只能事中统计.
                } catch (e) {
                    UI.alert.show("提示", e);
                }
            });
        },
        progress: function() {
            let container = document.createElement("div");
            container.id = "ui-progress";
            let v = document.createElement("div");
            container.appendChild(v);
            v.id = "ui-progress-value";
            let detail = document.createElement("div");
            detail.id = "ui-progress-detail";
            container.appendChild(detail);

            SQLite.import.configs.SourceFile.progress = setInterval(function () {
                Timer()
            }, 50);

            function Timer() {
                try {
                    let value = SQLite.import.configs.SourceFile.count / SQLite.import.configs.SourceFile.total;
                    let v = $("ui-progress-value");
                    v.style.width = (value * 100) + "%";
                    v.innerText = SQLite.import.configs.SourceFile.count + " / " + SQLite.import.configs.SourceFile.total;
                    if (value == 1)
                        Stop(SQLite.import.configs.SourceFile.progress);
                } catch (e) {
                }
            }

            function Stop(progress) {
                clearInterval(progress);
            }

            return container;
        },
        start: function (parent) {
            SQLite.import.configs.SourceFile.count = 0;
            SQLite.import.configs.SourceFile.total = 0;

            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
                    parent = __CONFIGS__.FULLSCREEN.element;
                } else {
                    parent = document.body;
                }
            }

            let container = document.createElement("div");
            container.id = "ui_importData";
            container.className = "ui-container-background";
            parent.appendChild(container);

            let content = document.createElement("div");
            content.className = "ui-container-body";
            content.id = "import-configs-content";
            container.appendChild(content);

            let title = document.createElement("div");
            title.className = "ui-container-title";
            let span = document.createElement("span");
            span.innerHTML = "● 导入数据";
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage(__SYS_IMAGES_SVG__.close,__THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            for (let name in SQLite.import.configs) {
                let item = document.createElement("div");
                item.className = "ui-container-item";
                content.appendChild(item);
                let itemname = document.createElement("span");
                itemname.className = "ui-container-item-name";
                itemname.innerHTML = SQLite.import.configs[name].name + " : ";
                item.appendChild(itemname);
                let itemvalue = null;
                if (name == "Table") {
                    itemvalue = document.createElement("input");
                    itemvalue.className = "ui-container-item-input";
                    itemvalue.id = name;
                    itemvalue.readOnly = true;
                    itemvalue.value = __CONFIGS__.CURRENT_TABLE.name;
                } else if (name == "Charset" || name == "Separator" || name == "SelectedDataSet") {
                    itemvalue = document.createElement("select");
                    itemvalue.className = "ui-container-item-input";
                    itemvalue.id = name;
                    for (let i = 0; i < SQLite.import.configs[name].options.length; i++) {
                        if (isArray(SQLite.import.configs[name].options[i]))
                            itemvalue.options.add(new Option(SQLite.import.configs[name].options[i][0], SQLite.import.configs[name].options[i][1]));
                        else
                            itemvalue.options.add(new Option(SQLite.import.configs[name].options[i], i));
                    }
                    itemvalue.value = SQLite.import.configs[name].value;
                    itemvalue.onchange = function () {
                        SQLite.import.configs[this.id].value = this.value;
                    };
                } else if (name == "SourceFile") {
                    itemvalue = document.createElement("input");
                    itemvalue.className = "ui-container-item-input";
                    itemvalue.id = name;
                    itemvalue.type = SQLite.import.configs[name].type;
                    if (itemvalue.type == "file") {
                        itemvalue.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                        itemvalue.onchange = function () {
                            if (window.FileReader) {
                                try {
                                    let file = this.files[0];
                                    let filetype = file.name.split(".")[1];
                                    SQLite.import.configs.SourceFile.value = file.name;
                                    SQLite.import.configs.SourceFile.data = [];
                                    let selectDataSet = $("SelectedDataSet");
                                    for (let i = selectDataSet.length - 1; i >= 0; i--) {
                                        selectDataSet.remove(i);
                                    }
                                    if (filetype.toUpperCase() == "TXT" || filetype.toUpperCase() == "CSV") {
                                        let reader = new FileReader();
                                        reader.onload = function () {
                                            SQLite.import.configs.SourceFile.data.push(this.result);
                                            selectDataSet.options.add(new Option("默认", 0));
                                            SQLite.import.configs.SelectedDataSet.value = selectDataSet.selectedIndex = 0;
                                        };
                                        reader.readAsText(file, SQLite.import.configs.Charset.options[SQLite.import.configs.Charset.value]);
                                    } else if (filetype.toUpperCase() == "XLS" || filetype.toUpperCase() == "XLSX") {
                                        SQLite.import.readExcelFile(file, selectDataSet);
                                    } else {
                                        UI.alert.show("提示", "仅适用于XLSX、XLS、TXT和CSV文件。");
                                        return;
                                    }
                                } catch (e) {
                                    UI.alert.show("提示", "请选择需要导入的文件.")
                                }
                                $("ui-progress-container").innerText = "";
                            } else {
                                UI.alert.show("提示", "本应用适用于Chrome或Edge浏览器。")
                            }
                        };
                    }
                }
                item.appendChild(itemvalue);
            }

            let progress = document.createElement("div");
            progress.id = "ui-progress-container";
            content.appendChild(progress);

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tool = document.createElement("div");
            tool.className = "groupbar";
            tool.style.cssFloat = "left";
            tool.style.width = "100%";
            content.appendChild(tool);

            let b = document.createElement("button");
            b.className = "button";
            b.id = "import-button";
            b.innerHTML = "导入";
            b.onclick = function () {
                if (__CONFIGS__.CURRENT_TABLE.name == "" || __CONFIGS__.CURRENT_TABLE.type == "view") {
                    UI.confirm.show("注意", "您没有选择数据表，是否要根据数据结构创建一个名称为 " + SQLite.import.configs.SourceFile.value.split(".")[0] + " 的新表?", "auto", function () {
                        let title = SQLite.import.configs.SourceFile.value.split(".")[0];
                        SQLite.createTable("auto", {"title": title, "stru": SQLite.import.dataStruct()}, function(values) {
                            let sql = values.sql;
                            __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                                tx.executeSql(sql, [],
                                    function (tx, results) {
                                        let aff = results.rowsAffected;
                                        let len = results.rows.length;
                                        if (aff > 0) {
                                            __LOGS__.viewMessage(aff + " 条记录被修改.")
                                        }
                                        if (aff == 0 && len == 0) {
                                            __LOGS__.viewMessage("数据库没有返回数据和消息.")
                                        }
                                        viewTables(__CONFIGS__.CURRENT_DATABASE.index);
                                    },
                                    function (tx, e) {
                                        __LOGS__.viewError(e);
                                    });
                            });
                        });
                        parent.removeChild($("ui_importData"));
                    });
                } else {
                    $("ui-progress-container").appendChild(SQLite.import.progress());
                    if ($("SelectedDataSet").length > 0) {
                        SQLite.import.run();
                    } else
                        UI.alert.show("提示", "请选择需要导入的文件及数据集合.");
                }
            };
            tool.appendChild(b);

            b = document.createElement("button");
            b.className = "button";
            b.innerHTML = "退出";
            b.onclick = close.onclick = function () {
                parent.removeChild($("ui_importData"));
            };
            tool.appendChild(b);

            setDialogDrag(title);
        },
    },
    structInspect: function (data, sep) {
        // 数据结构检测
        // 获取可导入数据
        // 即数据分割后相同宽度最多的行.
        let addup = [];

        function washData(d) {
            let row = [];
            for (let i = 0; i < d.length; i++) {
                if (d[i].trim() != "" && d[i] != null)
                    row.push(d[i]);
            }
            return row;
        }

        function addUp(row, id) {
            let index = null;
            for (let i = 0; i < addup.length; i++) {
                if (addup[i].columns == row.length) {
                    index = i;
                    break;
                }
            }
            if (index == null)
                addup.push({columns: row.length, start: id, count: 1, lines: [row]});
            else {
                addup[index].count += 1;
                addup[index].lines.push(row);
            }
        }

        function getStart() {
            let index = 0;
            let max = 0;
            for (let i = 0; i < addup.length; i++) {
                if (addup[i].count > max) {
                    index = i;
                    max = addup[i].count;
                }
            }
            return addup[index];
        }

        for (let i = 0; i < data.length; i++) {
            addUp(washData(data[i].trim().split(sep)), i);
        }

        return getStart();
    },
    getTableSQL: function(title, stru) {
        //根据选项生成建表SQL
        let cols = " (";
        let key = "";
        let key_count = 0;
        let auto_increment = null;
        for (let i = 0; i < stru.length; i++) {
            if (stru[i].index == true) {
                key += stru[i].name + ",";
                key_count += 1;
                if (auto_increment == null && stru[i].auto_increment && stru[i].type == "integer")
                    auto_increment = stru[i].name;
            }
        }

        for (let i = 0; i < stru.length; i++) {
            if (stru[i].check == true && stru[i].name != "") {
                cols += stru[i].name + " " + stru[i].type;
                if (stru[i].type == "decimal" || stru[i].type == "float") {
                    cols += "(" + stru[i].length + "," + stru[i].scale + ")";
                }
                if (stru[i].type == "nvarchar" || stru[i].type == "varchar") {
                    cols += "(" + stru[i].length + ")";
                }
                if (stru[i].allowNull == "N" || stru[i].index == true || (stru[i].column_default != null && stru[i].column_default.trim() != "")) {
                    cols += " NOT NULL";
                } else {
                    cols += " NULL";
                }
                if (key_count == 1 && stru[i].index == true) {
                    cols += " PRIMARY KEY";
                    if (stru[i].name == auto_increment) {
                        cols += " autoincrement,";
                    } else {
                        cols += ",";
                    }
                } else if (stru[i].column_default != null && stru[i].column_default.trim() != "") {
                    cols += " DEFAULT " + stru[i].column_default + ",";
                } else {
                    cols += ",";
                }
            }
        }
        let sql = "CREATE TABLE " + title + cols.substring(0, cols.length - 1);
        if (key_count > 1) {
            sql += ",PRIMARY KEY (" + key.substring(0, key.lastIndexOf(",")) + "))"
        } else {
            sql += ")"
        }
        return sql;
    },
};