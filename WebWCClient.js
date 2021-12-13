
var messageType = {
    message: "__MSG__",
    quit: "__QUIT__",
    login: "__LOGIN__",
    shutdown: "__SHUTDOWN__",
    regist: "__REG__",
    permission: "__PERMISSION__",
    data: "__DATASET__",
    selectSql: "__SELECT__",
    tablesList: "__TABLES_LIST__",
    tableInfo: "__TABLE_INFO__",
    tableFullInfo: "__TABLE_FULL_INFO__",
    insertSql: "__INSERT__",
    dropTable: "__DROP_TABLE__",
    updateSql: "__UPDATE__",
    createTable: "__CREATE_TABLE__",
    deleteSql: "__DELETE__",
    importData: "__IMPORT__",
    userlogin: "__USER_LOGIN__",
    dbMessage: "__DATABASE_MESSAGE__"
};

function getWebSocket(hosturl) {
    try {
        let websocket = new WebSocket(hosturl);
        websocket.onopen = function (msg) {
            __CONFIGS__.CURRENT_DATABASE.state = websocket.readyState;
            __LOGS__.viewMessage("正在登录 " + __CONFIGS__.CURRENT_DATABASE.service.url + " 请等待...");
        };
        websocket.onmessage = function (msg) {
            __CONFIGS__.CURRENT_DATABASE.state = websocket.readyState;
            let message = eval("(" + msg.data.substr(0, msg.data.lastIndexOf("}") + 1) + ")");
            transferMessage(message);
        };
        websocket.onclose = function (msg) {
            __CONFIGS__.CURRENT_DATABASE.state = websocket.readyState;
            __LOGS__.viewMessage("数据库连接 " + __CONFIGS__.CURRENT_DATABASE.service.url + " 已关闭。", true);
        };
        websocket.onerror = function (msg) {
            __CONFIGS__.CURRENT_DATABASE.state = websocket.readyState;
            __LOGS__.viewMessage("无法链接到 " + __CONFIGS__.CURRENT_DATABASE.service.url + "。");
        };

        return websocket;
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
    return null;
}

function transferMessageToDataset(eventid, msg) {
    let col = msg["columns"];
    let dataset = msg["dataset"];
    let total = msg["total"];
    let index = -1;
    let columns = [];
    let data = [];
    try {
        let floatFormat = "#,##0.";
        for (let i = 0; i < Number(__DATASET__.configs.reportScale.value); i++) {
            floatFormat += "0";
        }
        for (let i = 0; i < col.length; i++) {
            columns.push({id: i, name: col[i], style: {textAlign: "center"}, order: "", type: "string"});
        }
        for (let i = 0; i < dataset.length; i++) {
            let row = {};
            let r = dataset[i];
            for (let c = 0; c < columns.length; c++) {
                let _value = r[c];
                let _type = (_value != null ? _value.toString().getStringDataType() : null);
                let _format = null;
                let _align = "left";
                let _color = "black";
                switch (_type) {
                    case "float":
                        _type = "number";
                        _value = Number.parseFloat(r[c]);
                        _format = floatFormat;
                        _align = "right";
                        break;
                    case "int":
                        _type = "number";
                        _value = Number.parseInt(r[c]);
                        _format = "#,##0";
                        _align = "right";
                        if (c == 0 && Number.isSafeInteger(_value))
                            _align = "center";
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
                        _format = null;
                        _align = "left";
                }
                if (_type == "number" && _value < 0)
                    _color = "red";
                if (c == 0)
                    _align = "center";

                row[columns[c].name] = {
                    rowid: i,
                    colid: c,
                    value: _value,
                    type: _type,
                    format: _format,
                    style: {"text-align": _align, "color": _color},
                };
            }
            data.push(row);
        }
        index = __DATASET__.getResultIndex(eventid);
        dataset = __DATASET__.result[index];
        dataset.columns = columns;
        dataset.total = total;
        let rowid = dataset.data.length;
        for (let r = 0; r < data.length; r++) {
            let row = data[r];
            for (let col in row) {
                let cell = row[col];
                cell.rowid = rowid + r;
            }
        }
        dataset.data = dataset.data.concat(data);
        if (dataset.data.length == total || dataset.data.length % 100 == 0)
            __LOGS__.viewMessage("Event: " + dataset.eventid + " [" + dataset.data.length + "/" + total + "] records");

    } catch (ex) {
        __LOGS__.viewMessage(this.name + ":" + ex, true);
    }
}


function jsonParse(message) {
    try {
        //需要将所有Python数据集中的None转换为Null,如果JSON.parse转换失败,则采用eval转换,前提是定义None=null.
        message = message.substr(0, message.lastIndexOf("}") + 1);
        //因为最后一个'}'后可能有隐藏字符,强制抽取第一个'{'和最后一个'}'之间内容.
        let target = message;
        try {
            target = target.replaceAll("'", '"');
            //因JSON规范要求,强制替换字符串中所有单引号为双引号
            //需要检查WS服务中各交易数据格式...
            target = JSON.parse(target);
        } catch (e) {
            //如果JSON.parse失败,则采用eval转换.
            try {
                let None = null;
                //定义eval过程中针对 None的转换
                target = eval("(" + message + ")");
            } catch (e) {
                __LOGS__.viewError("auto", e);
                target = null;
            }
        }
        return target;
    }catch (e) {
        __LOGS__.viewError("auto", e);
        return null;
    }
}

function transferMessage(msg) {
    switch (msg["type"]) {
        case messageType.tablesList:
            try {
                let message = jsonParse(msg["message"].decode());
                let data = message["dataset"];
                let tbs = $("sidebar-tbs");
                tbs.innerText = "";
                let ul = document.createElement("ul");
                ul.style.width = "80%";
                ul.style.position = "relative";
                tbs.appendChild(ul);
                let tables = [];
                let hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
                for (let i = 0; i < data.length; i++) {
                    let li = document.createElement("li");
                    li.className = "table-list";
                    let a = document.createElement("div");
                    li.appendChild(a);
                    a.className = "table-name";
                    hintOptions.tables[data[i][1]] = [];
                    __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);
                    a.innerText = data[i][1];
                    a.setAttribute("type", data[i][0]);
                    a.id = data[i][1];
                    a.draggable = "true";
                    a.ondragstart = function (event) {
                        let sql = "/*脚本案例*/\r\n" +
                            "SELECT\r\n" +
                            "* \r\n" +
                            "/*字段列表*/\r\n" +
                            "FROM \r\n" +
                            "{table}\r\n" +
                            "ORDER BY 1";
                        event.dataTransfer.setData("Text", sql.replace("{table}", event.target.id));
                    };
                    tables.push(data[i][1]);
                    a.onclick = function () {
                        __CONFIGS__.CURRENT_TABLE.name = this.id;
                        __CONFIGS__.CURRENT_TABLE.type = this.getAttribute("type");
                        try {
                            let eventid = getEventIndex();
                            let msg = {
                                database: __CONFIGS__.CURRENT_DATABASE.name,
                                table: this.id
                            };
                            let msgs = {
                                type: messageType.tableInfo,
                                eventid: eventid,
                                message: JSON.stringify(msg).encode(),
                            };
                            __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msgs))
                        } catch (e) {
                            __LOGS__.viewError("auto", e);
                        }

                        let tbs = $("sidebar-tbs");
                        let l = tbs.getElementsByClassName("table-name");
                        for (let i = 0; i < l.length; i++) {
                            l[i].style.fontWeight = "normal";
                        }
                        this.style.fontWeight = "bold";
                    };
                    let colul = document.createElement("ul");
                    colul.id = "ul-tb-" + data[i][1];
                    colul.setAttribute("isOpen", "false");
                    li.appendChild(colul);
                    ul.appendChild(li);
                }
                __CONFIGS__.TABLES = tables;
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.tableInfo:
            try {
                let message = jsonParse(msg["message"].decode());
                let data = message["dataset"];
                if (__CONFIGS__.CURRENT_DATABASE.name == message["database"]) {
                    let ul = $("ul-tb-" + message["table"]);
                    if (ul.getAttribute("isOpen") == "false") {
                        let types = [];
                        let columns = [];
                        for (let i = 0; i < data.length; i++) {
                            let li = document.createElement("li");

                            let col = document.createElement("div");
                            li.appendChild(col);
                            col.className = "column-name";
                            col.id = message["table"] + "." + data[i][0];
                            columns.push(data[i][0]);
                            col.innerHTML = col.title = data[i][0];
                            col.draggable = "true";
                            if (data[i][6] !== "")
                                col.title = data[i][6];
                            col.ondragstart = function (event) {
                                event.dataTransfer.setData("Text", event.target.id);
                            };

                            let typ = document.createElement("div");
                            typ.className = "column-type";
                            typ.innerText = typ.title = data[i][1];
                            li.appendChild(typ);
                            ul.appendChild(li);

                            let type = {
                                name: data[i][0],
                                type: data[i][1],
                                datatype: data[i][2],
                                length: data[i][3],
                                isnull: data[i][4],
                                'default': data[i][5],
                                comment: data[i][6]
                            };
                            types.push(type);
                        }
                        let hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
                        hintOptions.tables[__CONFIGS__.CURRENT_TABLE.name] = columns;
                        __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);
                        __CONFIGS__.CURRENT_TABLE.structure = {columns: columns, data: types};
                        ul.setAttribute("isOpen", "true");
                    } else {
                        ul.innerHTML = "";
                        ul.setAttribute("isOpen", "false");
                    }
                }
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.data:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0)
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.tableFullInfo:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0)
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.dropTable:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
                getTables();
                __CONFIGS__.CURRENT_TABLE.name = "";
                __CONFIGS__.CURRENT_TABLE.sql = "";
                __CONFIGS__.CURRENT_TABLE.structure = [];
                __CONFIGS__.CURRENT_TABLE.type = "";
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.createTable:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
                sleep(1000);
                getTables();
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.updateSql:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.insertSql:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.deleteSql:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.importData:
            MySQL.import.update(msg);
            break;
        case messageType.login:
            try {
                let message = jsonParse(msg["message"].decode());
                __CONFIGS__.CURRENT_DATABASE.value["Localhost"] = message["host"];
                __CONFIGS__.CURRENT_DATABASE.value["Token"] = message["token"];//.toHex().toUpperCase();
                let db = $("ul-db-" + __CONFIGS__.CURRENT_DATABASE.name);
                db.innerText = "";
                for (let key in __CONFIGS__.CURRENT_DATABASE.value) {
                    let l = document.createElement("li");
                    db.appendChild(l);
                    let inf = document.createElement("div");
                    inf.className = "list";
                    if (key != "Password")
                        inf.innerHTML = key + ":&ensp;" + __CONFIGS__.CURRENT_DATABASE.value[key];
                    else
                        inf.innerHTML = key + ":&ensp;" + "●●●●●●●●";
                    l.appendChild(inf);
                }
                db.setAttribute("isOpen", "true");
                __LOGS__.viewMessage("Localhost: " + __CONFIGS__.CURRENT_DATABASE.value.Localhost + "\nToken: " + __CONFIGS__.CURRENT_DATABASE.value.Token);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.userlogin:
            try {
                let message = msg["message"].decode();
                __LOGS__.viewMessage(message);
                getTables();
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.dbMessage:
            try {
                let eventid = msg["eventid"];
                let message = jsonParse(msg["message"].decode());
                transferMessageToDataset(eventid, message);
                viewDataset(__DATASET__.getResultIndex(eventid), 0);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
        case messageType.message:
            try {
                let message = msg["message"].decode();
                __LOGS__.viewMessage(message);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
            break;
    }
}

function getTables() {
    if (__CONFIGS__.CURRENT_DATABASE.name != null) {
        let msg = {database: __CONFIGS__.CURRENT_DATABASE.name};
        let eventid = getEventIndex();
        msg = {
            type: messageType.tablesList,
            eventid: eventid,
            message: JSON.stringify(msg).encode()
        };
        __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msg));
    }
}

window.onbeforeunload = function() {
    try {
        let msg = {type: messageType.quit, message: ""};
        if (__CONFIGS__.CURRENT_DATABASE.service != null) {
            __LOGS__.viewMessage("关闭数据库连接(" + __CONFIGS__.CURRENT_DATABASE.name + ")请等待...", true);
            __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msg));
            __CONFIGS__.CURRENT_DATABASE.service.close();
            __CONFIGS__.CURRENT_DATABASE.service = null;
        }
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
};


