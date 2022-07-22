
const __DATA_READER__ = {
     Charset: {value: 0, name: "字符集", type: "select", options: ["GBK", "UTF-8"]},
     Separator: {value: ",", name: "分隔符", type: "select", options: [["逗号", ","], ["竖线", "|"], ["Tab", "\t"]]},
     SourceFile: {
         value: null,
         name: "源文件",
         type: "file",
         data: [],
         total: 0,
         count: 0,
         progress: null
     },
     Selected: {value: -1, name: "数据集", type: "select", options: []},
 };

function getReadProgress() {
    let container = document.createElement("div");
    container.id = "ui-progress";
    let v = document.createElement("div");
    container.appendChild(v);
    v.id = "ui-progress-value";
    __DATA_READER__.SourceFile.progress = setInterval(function () {
        Timer();
    }, 50);

    function Timer() {
        try {
            let value = __DATA_READER__.SourceFile.count / __DATA_READER__.SourceFile.total;
            let v = $("ui-progress-value");
            v.style.width = (value * 100) + "%";
            v.innerText = __DATA_READER__.SourceFile.count + " / " + __DATA_READER__.SourceFile.total;
            if (value == 1)
                Stop(__DATA_READER__.SourceFile.progress);
        } catch (e) {
        }
    }

    function Stop(progress) {
        clearInterval(progress);
    }

    return container;
}

function getDataReader(parent, callback) {
    function readExcelFile(file, sheets) {
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
                __DATA_READER__.SourceFile.data.push(csv);
                sheets.options.add(new Option(sheetNames[i], i));
                //return csv;
            }
            __DATA_READER__.Selected.value = sheets.selectedIndex = 0;
        };
        try {
            reader.readAsBinaryString(file);
        } catch (e) {
            reader.readAsArrayBuffer(file);
            rABS = false;
        }
    }

    __DATA_READER__.SourceFile.count = 0;
    __DATA_READER__.SourceFile.total = 0;

    if (parent == "auto" || parent == null) {
        if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
            parent = __CONFIGS__.FULLSCREEN.element;
        } else {
            parent = document.body;
        }
    }

    let container = document.createElement("div");
    container.id = "ui_dataReader";
    container.className = "ui-container-background";
    parent.appendChild(container);

    let content = document.createElement("div");
    content.type = "div";
    content.id = "import-configs-content";
    content.className = "ui-container-body"
    container.appendChild(content);

    let title = document.createElement("div");
    title.className = "ui-container-title";
    title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

    let span = document.createElement("span");
    span.innerHTML = "读取外部数据";
    title.appendChild(span);
    let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
    close.className = "ui-container-close";
    title.appendChild(close);
    content.appendChild(title);

    let hr = document.createElement("hr");
    hr.className = "ui-container-hr";
    content.appendChild(hr);

    for (let name in __DATA_READER__) {
        let item = document.createElement("div");
        item.className = "ui-container-item";
        content.appendChild(item);
        let itemname = document.createElement("span");
        itemname.className = "ui-container-item-name";
        itemname.innerHTML = __DATA_READER__[name].name + " : ";
        item.appendChild(itemname);
        let itemvalue = null;
        if (name == "Charset" || name == "Separator" || name == "Selected") {
            itemvalue = document.createElement("select");
            itemvalue.className = "ui-container-item-select";
            itemvalue.id = name;
            for (let i = 0; i < __DATA_READER__[name].options.length; i++) {
                if (isArray(__DATA_READER__[name].options[i]))
                    itemvalue.options.add(new Option(__DATA_READER__[name].options[i][0], __DATA_READER__[name].options[i][1]));
                else
                    itemvalue.options.add(new Option(__DATA_READER__[name].options[i], i));
            }
            itemvalue.value = __DATA_READER__[name].value;
            itemvalue.onchange = function () {
                __DATA_READER__[this.id].value = this.value;
            };
        } else if (name == "SourceFile") {
            itemvalue = UI.fileChoice(name,
                "70%",
                "right",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv",
                false,
                function (files) {
                    try {
                        let file = files[0];
                        let filetype = file.name.split(".")[1];
                        __DATA_READER__.SourceFile.value = file.name;
                        __DATA_READER__.SourceFile.data = [];
                        let selectDataSet = $("Selected");
                        for (let i = selectDataSet.length - 1; i >= 0; i--) {
                            selectDataSet.remove(i);
                        }
                        if (filetype.toUpperCase() == "TXT" || filetype.toUpperCase() == "CSV") {
                            let reader = new FileReader();
                            reader.onload = function () {
                                __DATA_READER__.SourceFile.data.push(this.result);
                                selectDataSet.options.add(new Option("默认", 0));
                                __DATA_READER__.Selected.value = selectDataSet.selectedIndex = 0;
                            };
                            reader.readAsText(file, __DATA_READER__.Charset.options[__DATA_READER__.Charset.value]);
                        } else if (filetype.toUpperCase() == "XLS" || filetype.toUpperCase() == "XLSX") {
                            readExcelFile(file, selectDataSet);
                        } else {
                            UI.alert.show("提示", "仅适用于XLSX、XLS、TXT和CSV文件。");
                            return;
                        }
                    } catch (e) {
                        UI.alert.show("提示", "请选择需要读取的文件.")
                    }
                });
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
    b.innerHTML = "读取";
    b.onclick = function () {
        if ($("Selected").length > 0) {
            $("ui-progress-container").appendChild(getReadProgress());
            callback(readData());
        } else
            UI.alert.show("提示", "请选择需要读取的文件及数据集合.");
    };
    tool.appendChild(b);

    b = document.createElement("button");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = close.onclick = function () {
        parent.removeChild($("ui_dataReader"));
    };
    tool.appendChild(b);

    dragControl.hook(title, content, container.id, function (left, top) {
        content.style.left = left + "px";
        content.style.top = top + "px"
    });
}

function checkColumnName(columns, name, count) {
    let checked = true;
    if (count < 255) {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].name === (count>0?name + "(" + count + ")":name)) {
                count += 1;
                checked = false;
                break;
            }
        }
        if (checked) {
            return count;
        } else {
            return checkColumnName(columns, name, count);
        }
    } else
        return count;
}

function readData() {
    //#######################################
    //默认行分隔符:\r\n
    //数据分隔符:支持|,\t
    //#######################################

    try {
        let sep = __DATA_READER__.Separator.value;
        let lines = __DATA_READER__.SourceFile.data[__DATA_READER__.Selected.value].split("\r\n");
        if (lines.length == 1)
            lines = __DATA_READER__.SourceFile.data[__DATA_READER__.Selected.value].split("\n");
        let options = $("Selected").getElementsByTagName("option");
        let id = $("Selected").value;
        let sheetName = null;
        for (let i =0;i<options.length;i++) {
            if (options[i].value == id){
                sheetName = options[i].innerHTML;
                break;
            }
        }
        let columns = [];
        let data = [];

        __DATA_READER__.SourceFile.total = lines.length;
        for (let i = 0; i < lines.length; i++) {
             __DATA_READER__.SourceFile.count = i+ 1;
            //##################################
            //取表头
            //##################################
            if (i == 0) {
                let cols = lines[i].split(sep);
                for (let c = 0; c < cols.length; c++) {
                    let name = cols[c].length>0? cols[c]:"undefinded";
                    let checked = checkColumnName(columns, name, 0);
                    if (checked > 0 )
                        name += ("(" + checked + ")");
                    columns.push({
                        id: c,
                        name: name,
                        style: {textAlign: "center"},
                        order: "",
                        type: "string"
                    });
                }
            } else {
                //##################################
                //取数据
                //##################################
                let floatFormat = "#,##0.";
                for (let i = 0; i < Number(__DATASET__.configs.reportScale.value); i++) {
                    floatFormat += "0";
                }

                let row = {};
                let r = lines[i].split(sep);
                for (let c = 0; c < columns.length; c++) {
                    let _value = r[c];
                    let _type = ((typeof _value) !== "undefined" ? _value.getStringDataType() : "string");
                    let _format = null;
                    let _align = "left";
                    let _color = "black";
                    let type = _type;
                    switch (_type) {
                        case "float":
                            type = "number";
                            if ((_value + '').indexOf('.') !== -1) {
                                _format = floatFormat;
                                _align = "right";
                            } else {
                                _format = "#,##0";
                                _align = "right";
                            }
                            _value = parseFloat(_value);
                            break;
                        case "int":
                            type = "number";
                            _format = "#,##0";
                            _align = "right";
                            _value = parseInt(_value);
                            break;
                        case "date":
                            _format = "yyyy-MM-dd";
                            _align = "center";
                            break;
                        case "datetime":
                            _format = "yyyy-MM-dd hh:mm:ss";
                            _align = "center";
                            break;
                        default:
                            type = "string";
                            _format = null;
                            _align = "left";
                    }
                    if (type == "number" && _value < 0)
                        _color = "red";
                    if (c == 0)
                        _align = "center";

                    row[columns[c].name] = {
                        rowid: i,
                        colid: c,
                        value: _value,
                        type: type,
                        format: _format,
                        style: {"text-align": _align, "color": _color},
                    };
                }
                data.push(row);
            }
        }
        return {
            eventid: getEventIndex(),
            title: [__DATA_READER__.SourceFile.value.split(".")[0], sheetName],
            sql: __DATA_READER__.SourceFile.value + ":" + sheetName,
            type: __DATA_READER__.SourceFile.value.split(".")[1],
            parameter: [],
            columns: columns,
            data: data,
            time: getNow()
        };
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

var splitFileBlob = {
    title: null,
    show: function (message, parent, callback) {
        let packets = [];

        function blobSlice(blob, start, end) {
            if (blob.slice) {
                return blob.slice(start, end);
            }
            else if (blob.webkitSlice) {
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
                        $("ui_read_file_blob_progress").value++;
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = this.title;
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
// item.appendChild(UI.fileChoice("read_file_blob_file_name", "70%", "right"));

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

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
    },
};