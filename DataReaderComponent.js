
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
    let span = document.createElement("span");
    span.innerHTML = "● 读取外部数据";
    title.appendChild(span);
    let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", null, __THEMES__.get().hover);
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
            itemvalue = document.createElement("input");
            itemvalue.className = "ui-container-item-input";
            itemvalue.id = name;
            itemvalue.type = __DATA_READER__[name].type;
            if (itemvalue.type == "file") {
                itemvalue.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                itemvalue.onchange = function () {
                    if (window.FileReader) {
                        try {
                            let file = this.files[0];
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

    setDialogDrag(title);
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