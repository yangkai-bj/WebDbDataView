var __VERSION__ = {
    name: "Web DataView for SQLite Database of browser",
    version: "2.5.6",
    date: "2021/09/13",
    comment: [
        "-- 2021/03/08",
        "优化算法和压缩代码.",
        "增加图形背景参数.",
        "增加报表下载选择.",
        "增加报表分页参数.",
        "-- 2021/03/17",
        "增加日志隐藏.",
        "-- 2021/03/22",
        "修改数据视图显示方式.",
        "-- 2021/03/25",
        "优化数据集合排序算法.",
        "-- 2021/03/26",
        "增加数学函数.",
        "-- 2021/04/01",
        "增加数据分组切片.",
        "修改报表下载方式.",
        "-- 2021/04/13",
        "调整页面.",
        "-- 2021/04/16",
        "优化数据集合.",
        "-- 2021/04/29",
        "增加数据导入监控.",
        "-- 2021/05/03",
        "适配Echarts(5.1.0).",
        "适配Echarts-gl(2.0.4).",
        "-- 2021/05/15",
        "拆分图形和报表参数.",
        "-- 2021/06/01",
        "增加公共函数模块.",
        "增加脚本备份文件完整性校验.",
         "-- 2021/06/07",
        "修改脚本存储方式.",
        "-- 2021/06/11",
        "增加文件加密/解密模块.",
        "-- 2021/06/24",
        "增加外部数据读取模块.",
        "-- 2021/07/18",
        "调整部分组件加载方式.",
        "-- 2021/07/27",
        "优化文件加密/解密模块.",
        "-- 2021/07/29",
        "优化日志模块.",
        "-- 2021/08/06",
        "Echarts 5.1.2.",
        "-- 2021/08/12",
        "增加固定报表.",
    ],
    author: __SYS_LOGO_LINK__.author.decode(),
    url: __SYS_LOGO_LINK__.link.decode(),
    tel: __SYS_LOGO_LINK__.tel.decode(),
    email: __SYS_LOGO_LINK__.email.decode(),
};

var __LOGS__ = {
    days: 7,
    data: {},
    init: function () {
        let logs = getUserConfig("UserLogs");
        if (typeof logs != "undefined")
            __LOGS__.data = JSON.parse(logs);
        //############################
        //默认保留7天的日志
        //############################
        let list = [];
        for (let date in __LOGS__.data) {
            list.push(date);
        }
        list.sort(function (a, b) {
            return (new Date(a)) - (new Date(b))
        });
        if (list.length > __LOGS__.days) {
            let retain = list.slice(list.length - __LOGS__.days, list.length);
            let tmp = {};
            for (let i = 0; i < retain.length; i++) {
                tmp[retain[i]] = __LOGS__.data[retain[i]];
            }
            __LOGS__.data = tmp;
        }
    },

    saveas: function(date) {
        let sheets = [];
        let sheetNames = [];
        let comment = [
            ['Application:', __VERSION__.name],
            ['Version:', __VERSION__.version + " (" + __VERSION__.date + ")"],
            ['Creation time:', getNow()],
            ['Get help from:', __VERSION__.url],
        ];
        let aoa = [];
        let columns = ["日期", "时间", "日志", "警告"];
        aoa.push(columns);
        try {
            let logs = __LOGS__.data[date];
            for (let i = 0; i < logs.length; i++) {
                let log = logs[i];
                let row = [date];
                row.push(log.time);
                row.push(log.message.decode());
                row.push(log.warning);
                aoa.push(row);
            }
        }catch (e) {
        }
        sheets.push(aoa);
        let sheetname = date;
        sheetNames.push(sheetname);
        sheets.push(comment);
        sheetNames.push("Comment");
        openDownloadDialog(workbook2blob(sheets, sheetNames), __VERSION__.name.replaceAll(" ","_") + "_logs_" + date + ".xlsx");
    },

    add: function (log) {
        let date = log.time.format("yyyy-MM-dd");
        log.time = log.time.format("hh:mm:ss S");
        log.message = log.message.encode();
        if (typeof __LOGS__.data[date] == "undefined")
            __LOGS__.data[date] = [];
        __LOGS__.data[date].push(log);
        setUserConfig("UserLogs", JSON.stringify(__LOGS__.data));
    },

    viewError: function(error) {
        let names = {
            EvalError: "eval的使用与定义不一致",
            RangeError: "数值越界",
            ReferenceError: "非法或不能识别的引用数值",
            SyntaxError: "发生语法解析错误",
            TypeError: "操作数类型错误",
            URIError: "URI处理函数使用不当",
            QuotaExceededError: "超出存储限额"
        };
        __LOGS__.viewMessage(error.stack, true);

        let container = document.createElement("div");
        container.id = container.className = "error-dialog";

        let title = document.createElement("div");
        title.className = "container-title";
        let span = document.createElement("span");
        span.className = span.id = "error-title";
        span.innerHTML = "● " + (typeof names[error.name] != "undefined"? names[error.name]: "其他未定义错误");
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        close.className = "container-close";
        title.appendChild(close);
        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        let detail = document.createElement("div");
        detail.className = "detail";
        container.appendChild(detail);
        let code = document.createElement("code");
        code.className = "stack";
        code.innerHTML = error.stack.toString()
            .replace(error.name, "<span class='name'>" + error.name + "</span>")
            .replace(error.message, "<span class='message'>" + error.message + "</span>")
            .split("\n").join("<br> ● ") + "<hr>" + getUserConfig("CopyRight");
        detail.appendChild(code);

        let br = document.createElement("hr");
        br.className = "br";
        container.appendChild(br);

        let tool = document.createElement("div");
        container.appendChild(tool);
        tool.className = "groupbar";

        let confirm = document.createElement("div");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = close.onclick = function () {
            $("error-dialog").parentNode.removeChild($("error-dialog"));
        };
        tool.appendChild(confirm);

        let help = document.createElement("div");
        help.className = "button";
        help.innerText = "帮助";
        help.onclick = function () {
            window.open(__VERSION__.url);
        };
        tool.appendChild(help);
        setDialogDrag(title);
        setCenterPosition($("main"), container);
    },

    viewMessage: function (msg, warning) {
        let log = {
            time: new Date(),
            message: msg,
            warning: typeof warning == "undefined" ? false : warning
        };

        let msgbox = $("messageBox");
        let dt = document.createElement("dt");
        dt.type = "dt";
        dt.className = "dt";
        dt.innerText = log.time.format("yyyy-MM-dd hh:mm:ss S");
        let first = msgbox.firstChild;
        msgbox.insertBefore(dt, first);

        let message = document.createElement("dd");
        message.type = "dd";
        message.className = "message";
        if (warning)
            message.innerHTML = "<span style='color:red'>" + log.message + "</span>";
        else
            message.innerText = log.message;
        dt.appendChild(message);

        __LOGS__.add(log);

        //保留日志设置
        if (__CONFIGS__.MAXLOGS > 0) {
            let dts = msgbox.getElementsByClassName("dt");
            if (dts.length > __CONFIGS__.MAXLOGS) {
                msgbox.removeChild(dts[dts.length - 1]);
            }
        }
    }
}

var __XMLHTTP__ = {
    server: null,
    request: function () {
        let xhr = null;
        try {
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            }
            // else { // ie
            //     xhr = new ActiveObject("Microsoft.XMLHTTP");
            // }
        } catch (e) {
        }
        return xhr;
    },
    time: null,
    updatetime: null,
    abstract: null,
    elements: {},
    checking: {
        certificated: false,
    },
    hook: function (dom, timeout) {
        __XMLHTTP__.elements[dom.id] = dom;

        function startTime() {
            dom.innerHTML = "时间:" + (__XMLHTTP__.time == null ? "" : __XMLHTTP__.time.format("yyyy-MM-dd hh:mm")) + " 频率:" + Math.floor(timeout / 1000) + "秒";
            dom.title = "授时服务:\n" +
                (__XMLHTTP__.server == null ? "" : __XMLHTTP__.server) + "\n" +
                (__XMLHTTP__.abstract == null ? "" : __XMLHTTP__.abstract);

            if (typeof __XMLHTTP__.elements[dom.id] != "undefined") {
                if (__XMLHTTP__.time != null && __XMLHTTP__.updatetime != null) {
                    if (new Date() - __XMLHTTP__.updatetime < timeout) {
                        setTimeout(function () {
                            startTime();
                        }, timeout);
                    } else {
                        setTimeout(function () {
                            startTime();
                        }, 1000);
                    }
                } else {
                    setTimeout(function () {
                        startTime();
                    }, 1000);
                }
            }
            __XMLHTTP__.getResponse();
        }
        startTime();
    },
    unhook: function (dom) {
        delete __XMLHTTP__.elements[dom.id];
    },
    getResponse: function () {
        let xhr = __XMLHTTP__.request();
        // 通过get或HEAD的方式请求当前文件
        if (xhr != null) {
            xhr.open("GET", location.href + "?timestamp=" + new Date().format("yyyyMMddhhmmssS"), true);
            //增加时间戳，避免前端缓存导致客户端不更新。
            //不能跨域名
            xhr.onreadystatechange = function () {
                try {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //console.log(xhr.getAllResponseHeaders());
                        __XMLHTTP__.server = xhr.responseURL.split("/").slice(0, 3).join("/");
                        __XMLHTTP__.abstract = xhr.getResponseHeader("Server");
                        __XMLHTTP__.time = new Date(xhr.getResponseHeader("Date"));
                        __XMLHTTP__.localtime = new Date();
                    } else if (xhr.status == 404) {
                        __XMLHTTP__.server = null;
                        __XMLHTTP__.abstract = null;
                        __XMLHTTP__.time = null;
                        __XMLHTTP__.localtime = null;
                    }
                } catch (e) {
                    console.log("__XMLHTTP__getResponse:" + e);
                }
            };
            xhr.send();
        }
    },
    certificate: function (byServer) {
        let title = document.title;
        let scripts = [
            {name: "主程序", src: "WebDBDataView.js", type: "text/javascript", element: "script", load: false},
            {name: "主程序", src: "themes/default.css", type: "text/css", element: "link", load: false},
            {name: "主程序", src: "WebDBDataView.css", type: "text/css", element: "link", load: false},
            {name: "资料库", src: "themes/images.js", type: "text/javascript", element: "script", load: false},
            {name: "公共函数", src: "FunctionsComponent.js", type: "text/javascript", element: "script", load: false},
            {
                name: "Echarts",
                src: "echarts/v5.1/echarts.min.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {name: "脚本管理组件", src: "StorageSQLDialog.js", type: "text/javascript", element: "script", load: false},
            {name: "脚本管理组件", src: "StorageSQLDialog.css", type: "text/css", element: "link", load: false},
            {name: "Echarts", src: "echartsThemes.js", type: "text/javascript", element: "script", load: false},
            {name: "Echarts", src: "echartsView.js", type: "text/javascript", element: "script", load: false},
            {name: "二维码组件", src: "qrcode/qrcode.js", type: "text/javascript", element: "script", load: false},
            {
                name: "codemirror",
                src: "codemirror/codemirror.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {
                name: "codemirror",
                src: "codemirror/matchbrackets.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {name: "codemirror", src: "codemirror/sqlite.js", type: "text/javascript", element: "script", load: false},
            {
                name: "codemirror",
                src: "codemirror/javascript.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {
                name: "codemirror",
                src: "codemirror/show-hint.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {
                name: "codemirror",
                src: "codemirror/sql-hint.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {
                name: "codemirror",
                src: "codemirror/fullscreen.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {
                name: "codemirror",
                src: "codemirror/placeholder.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {name: "codemirror", src: "codemirror/dialog.js", type: "text/javascript", element: "script", load: false},
            {
                name: "codemirror",
                src: "codemirror/searchcursor.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {name: "codemirror", src: "codemirror/search.js", type: "text/javascript", element: "script", load: false},
            {
                name: "codemirror",
                src: "codemirror/jump-to-line.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
            {name: "codemirror", src: "codemirror/rulers.js", type: "text/javascript", element: "script", load: false},
            {name: "codemirror", src: "codemirror/codemirror.css", type: "text/css", element: "link", load: false},
            {name: "codemirror", src: "codemirror/theme/default.css", type: "text/css", element: "link", load: false},
            {name: "codemirror", src: "codemirror/fullscreen.css", type: "text/css", element: "link", load: false},
            {name: "codemirror", src: "codemirror/show-hint.css", type: "text/css", element: "link", load: false},
            {name: "codemirror", src: "codemirror/dialog.css", type: "text/css", element: "link", load: false},
            {name: "Excel组件", src: "sheetjs/xlsx.full.min.js", type: "text/javascript", element: "script", load: true},
            {name: "常用统计函数", src: "StatisticsComponent.js", type: "text/javascript", element: "script", load: true},
            {name: "文件加密组件", src: "FileSecurityComponent.js", type: "text/javascript", element: "script", load: true},
            {name: "数据读取组件", src: "DataReaderComponent.js", type: "text/javascript", element: "script", load: true},
            {
                name: "Echarts",
                src: "echarts/v5.1/echarts-gl.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: "echarts/v5.1/echarts-wordcloud.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: "echarts/v5.1/echarts-liquidfill.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {name: "回归函数组件", src: "echarts/v5.1/ecStat.js", type: "text/javascript", element: "script", load: true},
            {name: "世界地图组件", src: "echarts/map/world.js", type: "text/javascript", element: "script", load: true},
            {
                name: "中国地图组件",
                src: "echarts/map/china-and-region.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
        ];

        if (byServer) {
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].load)
                    document.title = "加载(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                else
                    document.title = "验证(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                let xhr = __XMLHTTP__.request();
                if (xhr != null) {
                    xhr.open("GET", scripts[i].src + "?timestamp=" + new Date().format("yyyyMMddhhmmssS"), true);
                    xhr.onreadystatechange = function () {
                        try {
                            if (xhr.readyState == 4 && xhr.status == 404)
                                __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")...fails.", true);
                            else if (xhr.readyState == 4 && xhr.status == 200) {
                                let url = xhr.responseURL.split("?")[0];
                                if (scripts[i].load == false) {
                                    url = url.split("/");
                                    __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + url[url.length - 1] + ")" + "...OK.");
                                } else {
                                    switch (scripts[i].element) {
                                        case "script":
                                            let script = document.createElement(scripts[i].element);
                                            script.type = scripts[i].type;
                                            script.id = "onload-" + scripts[i].element + "-" + i;
                                            script.src = xhr.responseURL.split("?")[0];
                                            document.head.appendChild(script);
                                            url = url.split("/");
                                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + url[url.length - 1] + ")" + "...OK.");
                                            break;
                                        case "link":
                                            let link = document.createElement(scripts[i].element);
                                            link.type = scripts[i].type;
                                            link.id = "onload-" + scripts[i].element + "-" + i;
                                            link.rel = "stylesheet";
                                            link.href = xhr.responseURL.split("?")[0];
                                            document.head.appendChild(link);
                                            url = url.split("/");
                                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + url[url.length - 1] + ")" + "...OK.");
                                            break;
                                    }
                                }
                            }
                        } catch (e) {
                        }
                    };
                    xhr.onload = function(){

                    };
                    xhr.onerror = function (e) {
                        if (scripts[i].load)
                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + scripts[i].src + ")..." + e, true);
                        else
                            __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")..." + e, true);
                    };
                    xhr.onabort = function () {
                         if (scripts[i].load)
                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + scripts[i].src + ")...中止.", true);
                        else
                            __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")...中止.", true);
                    };
                    xhr.ontimeout = function () {
                        if (scripts[i].load)
                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + scripts[i].src + ")...超时.", true);
                        else
                            __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")...超时.", true);
                    };

                    xhr.send(null);
                }
                sleep(100);
            }
        } else {
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].load) {
                    document.title = "加载(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    switch (scripts[i].element) {
                        case "script":
                            let script = document.createElement(scripts[i].element);
                            script.type = scripts[i].type;
                            script.id = "onload-" + scripts[i].element + "-" + i;
                            script.src = scripts[i].src;
                            document.head.appendChild(script);
                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + scripts[i].src + ")" + "...OK.");
                            break;
                        case "link":
                            let link = document.createElement(scripts[i].element);
                            link.type = scripts[i].type;
                            link.id = "onload-" + scripts[i].element + "-" + i;
                            link.rel = "stylesheet";
                            link.href = scripts[i].src;
                            document.head.appendChild(link);
                            __LOGS__.viewMessage("加载 " + scripts[i].name + "(" + scripts[i].src + ")" + "...OK.");
                            break;
                    }
                } else {
                    document.title = "验证(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    let checked = false;
                    switch (scripts[i].element) {
                        case "script":
                            let sc = document.getElementsByTagName("script");
                            for (let l = 0; l < sc.length; l++) {
                                if (sc[l].src.indexOf(scripts[i].src) >= 0) {
                                    checked = true;
                                    break;
                                }
                            }
                            break;
                        case "link":
                            let li = document.getElementsByTagName("link");
                            for (let l = 0; l < li.length; l++) {
                                if (li[l].href.indexOf(scripts[i].src) >= 0) {
                                    checked = true;
                                    break;
                                }
                            }
                            break;
                    }
                    if (checked)
                        __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")" + "...OK.");
                    else
                        __LOGS__.viewMessage("验证 " + scripts[i].name + "(" + scripts[i].src + ")" + "...fails.", true);
                }
                sleep(100);
            }
        }
        document.title = title;
        __XMLHTTP__.checking.certificated = true;
    }
};

var __CONFIGS__ = {
    STORAGE: {
        DATABASES: "__WEB_SQLITE_DATABASES__",
        SCRIPTS: "__WEB_SQLITE_SCRIPTS__",
        DATASET: "__WEB_SQLITE_DATASET__",
        CONFIGS: "__WEB_SQLITE_USER_CONFIGS__"
    },
    DATABASES: [],
    CURRENT_DATABASE: {index: 0, value: null, connect: null},
    TABLES: [],
    CURRENT_TABLE: {name: "", sql: "", structure: {}, type: ""},
    MAXLOGS: 1000
};

 var __IMPORT__ = {
     Table: {value: "", name: "数据表", type: "view"},
     Charset: {value: 1, name: "字符集", type: "select", options: ["GBK", "UTF-8"]},
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
 };

 var __COLUMN__ = {
     check: {value: false, name: "选择", type: "checkbox", width: "50px"},
     name: {value: "", name: "名称", type: "input", width: "100px"},
     type: {
         value: 0,
         name: "类型",
         type: "select",
         options: ["integer", "varchar", "nvarchar", "decimal", "float", "date", "datetime", "boolean", "blob"],
         width: "75px"
     },
     length: {value: 0, name: "长度", type: "input", width: "25px"},
     scale: {value: 0, name: "小数位数", type: "input", width: "50px"},
     allowNull: {value: "Y", name: "允许空值", type: "select", options: ["Y", "N"], width: "50px"},
     index: {value: false, name: "索引", type: "checkbox", width: "50px"},
     auto_increment: {value: false, name: "自增", type: "checkbox", width: "50px"},
     column_default: {value: null, name: "默认值", type: "input", width: "50px"},
 };
 var __DATASET__ = {
     toFullScreen: false,
     result: [
         //{eventid:null, title:[],sql: null,columns:[],data:[],parameter:null,time:null, type:null}
     ],
     default: {sheet: 0, column: null, cell: [], tab: 0},
     pages: {total: 0, default: 1},
     //页数计算根据__DATASET__.configs.reportPageSize.value计算.
     table: {
         entity: null,
         tomove: null,
         init: function (tb) {
             this.entity = tb;
             this.entity.style.fontSize = __DATASET__.configs.reportFontSize.value;
             this.entity.style.minWidth = __DATASET__.configs.reportMinWidth.value;
             this.entity.style.maxWidth = __DATASET__.configs.reportMaxWidth.value;
             let table = this;
             function setEvent(ob) {
                 for (let i = 0; i < ob.length; i++) {
                     if (ob[i].type == "td") {
                         ob[i].ondblclick = function () {
                             let msg = "";
                             let value = JSON.parse(this.getAttribute("value"));
                             for (let key in value) {
                                 msg += key + ": " + JSON.stringify(value[key]) + ";\n";
                             }
                             __LOGS__.viewMessage(msg);
                         };
                     }

                     ob[i].onmousedown = function () {
                         table.tomove = this;
                         if (event.offsetX > table.tomove.offsetWidth - 5) {
                             table.tomove.mouseDown = true;
                             table.tomove.oldX = event.x;
                             table.tomove.oldWidth = table.tomove.offsetWidth;
                         }
                         if (event.offsetY > table.tomove.offsetHeight - 5) {
                             table.tomove.mouseDown = true;
                             table.tomove.oldY = event.y;
                             table.tomove.oldHeight = table.tomove.offsetHeight;
                         }
                     };

                     ob[i].onmouseup = function () {
                         if (table.tomove == null)
                             table.tomove = this;
                         table.tomove.mouseDown = false;
                         table.tomove.style.cursor = 'default';
                         table.tomove = null;
                     };

                     ob[i].onmousemove = function () {
                         if (event.offsetX > this.offsetWidth - 5)
                             this.style.cursor = 'col-resize';
                         else if (event.offsetY > this.offsetHeight - 5)
                             this.style.cursor = 'row-resize';
                         else
                             this.style.cursor = 'default';
                         if (table.tomove == null)
                             table.tomove = this;
                         if (table.tomove.mouseDown != null && table.tomove.mouseDown == true) {
                             if ((table.tomove.oldWidth + (event.x - table.tomove.oldX)) > 0) {
                                 table.tomove.width = table.tomove.oldWidth + (event.x - table.tomove.oldX);
                                 table.tomove.style.width = table.tomove.width;
                                 table.tomove.style.cursor = 'col-resize';
                                 for (let j = 0; j < table.entity.rows.length; j++) {
                                     table.entity.rows[j].cells[table.tomove.cellIndex].width = table.tomove.width;
                                 }
                                 table.entity.offsetWidth += (event.x - table.tomove.oldX);
                             }
                             if ((table.tomove.oldHeight + (event.y - table.tomove.oldY)) > 0) {
                                 table.tomove.height = table.tomove.oldHeight + (event.y - table.tomove.oldY);
                                 table.tomove.style.height = table.tomove.height;
                                 table.tomove.style.cursor = 'row-resize';
                                 let cell = table.tomove.parentNode.getElementsByTagName("td");
                                 for (let r = 0; r < cell.length; r++) {
                                     cell[r].height = table.tomove.height;
                                 }
                                 table.entity.offsetHeight += (event.y - table.tomove.oldY);
                             }
                         }
                     };
                 }
             }

             let tr = table.entity.getElementsByTagName("tr");
             for (let i = 0; i < tr.length; i++) {
                 tr[i].onmouseleave = function () {
                     if (table.tomove != null) {
                         table.tomove.mouseDown = false;
                         table.tomove.style.cursor = 'default';
                         table.tomove = null;
                     }
                 };
             }

             let ths = table.entity.getElementsByTagName("th");
             setEvent(ths);
             let tds = table.entity.getElementsByTagName("td");
             setEvent(tds);

         },
     },
     configs: {
         hr_view: {name: "显示设置", value: "", type: "hr"},
         reportMinWidth: {
             name: "最小宽度",
             value: "50%",
             options: ["30%", "50%", "100%", "120%", "130%", "140%", "150%"],
             type: "select"
         },
         reportMaxWidth: {
             name: "最大宽度",
             value: "200%",
             options: ["100%", "200%", "300%", "400%", "500%"],
             type: "select"
         },
         reportFontFamily: {
             name: "报表字体",
             value: "default",
             type: "input"
         },
         reportFontSize: {
             name: "报表字号",
             value: "100%",
             options: ["100%", "110%", "120%", "130%", "140%", "150%"],
             type: "select"
         },
         reportFontStyle: {
             name: "字体样式",
             value: "default",
             options: ["default", "italic", "oblique"],
             type: "select"
         },
         reportFontWeight: {
             name: "字体粗细",
             value: "default",
             options: ["default", "lighter", "bold", "bolder"],
             type: "select"
         },
         reportRowHeight: {
             name: "报表行高",
             value: "default",
             options: ["default", "30px", "35px", "40px", "45px", "50px", "55px", "60px"],
             type: "select"
         },
         reportScale:{
             name: "小数位数",
             value: 6,
             type: "input"
         },
         hr_page: {name: "分页设置", value: "", type: "hr"},
         reportPageSize: {
             name: "每页", value: 100,
             options: [
                 new Option("25行", 25),
                 new Option("50行", 50),
                 new Option("100行", 100),
                 new Option("200行", 200),
                 new Option("300行", 300),
                 new Option("400行", 400),
                 new Option("500行", 500),
                 new Option("1000行", 1000),
             ],
             type: "select"
         },
         hr_download: {name: "下载设置", value: "", type: "hr"},
         reportDownload: {
             name: "下载方式",
             value: "current",
             options: [new Option("当前数据集", "current"), new Option("所有数据集-合并为单一工作簿", "all-single"), new Option("所有数据集-拆分为多个工作簿", "all-multi")],
             type: "select"
         },
         reportDownloadDelay: {
             name: "下载延时(毫秒)",
             value: 1000,
             type: "input"
         },
     },
     getDatasetConfigs: function (parent) {
        let config = getUserConfig("datasetConfig");
        if (config != null) {
            config = JSON.parse(config);
            for (key in config) {
                try {
                    __DATASET__.configs[key].value = config[key];
                } catch (e) {
                }
            }
        }

        let container = document.createElement("div");
        container.type = "div";
        container.className = "dataset-configs-Content";
        container.id = "dataset-configs-Content";

        let title = document.createElement("div");
        title.className = "container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 报表设置 ";
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        close.className = "container-close";
        title.appendChild(close);
        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        let itemcontainer = document.createElement("div");
        itemcontainer.id = itemcontainer.className = "dataset-configs-container";
        container.appendChild(itemcontainer);

        for (let name in __DATASET__.configs) {
            d = document.createElement("div");
            d.className = "dataset-configs-item";
            itemcontainer.appendChild(d);
            let s = document.createElement("span");
            s.className = "dataset-config-name";
            s.innerHTML = __DATASET__.configs[name].name + ":";
            d.appendChild(s);
            if (__DATASET__.configs[name].type == "input") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "input";
                input.className = "dataset-configs-editinput";
                input.value = __DATASET__.configs[name].value;
                input.onchange = function () {
                    __DATASET__.configs[this.id].value = this.value;
                };
                if (typeof __DATASET__.configs[name].title != "undefined")
                    input.title = __DATASET__.configs[name].title;
                else
                    input.title = __DATASET__.configs[name].name;
                d.appendChild(input);
            } else if (__DATASET__.configs[name].type == "select") {
                let input = document.createElement("select");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "select";
                input.className = "dataset-configs-editinput";
                for (let i = 0; i < __DATASET__.configs[name].options.length; i++) {
                    if (typeof __DATASET__.configs[name].options[i] === "object")
                        input.options.add(__DATASET__.configs[name].options[i]);
                    else
                        input.options.add(new Option(__DATASET__.configs[name].options[i]));
                }
                input.value = __DATASET__.configs[name].value;
                input.onchange = function () {
                    __DATASET__.configs[this.id].value = this.value;
                };
                if (typeof __DATASET__.configs[name].title != "undefined")
                    input.title = __DATASET__.configs[name].title;
                else
                    input.title = __DATASET__.configs[name].name;
                d.appendChild(input);
            } else if (__DATASET__.configs[name].type == "color") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "color";
                input.className = "dataset-configs-editinput";
                input.value = __DATASET__.configs[name].value;
                input.onchange = function () {
                    __DATASET__.configs[this.id].value = this.value;
                };
                if (typeof __DATASET__.configs[name].title != "undefined")
                    input.title = __DATASET__.configs[name].title;
                else
                    input.title = __DATASET__.configs[name].name;
                d.appendChild(input);
            } else if (__DATASET__.configs[name].type == "hr") {
                s.innerHTML = "[ " + __DATASET__.configs[name].name + " ]";
                s.style.color = "var(--main-title-color)";
                let c = document.createElement("div");
                c.style.width = "70%";
                c.style.cssFloat = "right";
                d.appendChild(c);
                d.id = name;
                let h = document.createElement("hr");
                h.style.marginTop = "10px";
                c.appendChild(h)
                //d.innerHTML = "";
                //d.appendChild(h);
            }
        }

        let br = document.createElement("hr");
        br.className = "br";
        container.appendChild(br);

        let c = document.createElement("div");
        c.className = "groupbar";
        container.appendChild(c);

        let b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "确定";
        b.onclick = function () {
            let configs = $("dataset-configs-container").getElementsByClassName("dataset-configs-editinput");
            let config = {};
            for (let i = 0; i < configs.length; i++) {
                __DATASET__.configs[configs[i].id].value = configs[i].value;
                config[configs[i].id] = configs[i].value;
            }
            setUserConfig("datasetConfig", JSON.stringify(config));

            if (__DATASET__.result.length > 0) {
                viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default);
            }

            let m = $("dataset-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "重置";
        b.onclick = close.onclick = function () {
            let r = confirm("您确定要重置全部报表参数吗?");
            if (r) {
                setUserConfig("datasetConfig", JSON.stringify({}));
                let m = $("dataset-configs-Content");
                m.parentNode.removeChild(m);
                alert("所有参数已恢复为系统初始值,系统将重新载入页面...");
                location.reload();
            }
        };
        c.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            let m = $("dataset-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);

        setDialogDrag(title);

        return container;
    }
 };

 var __SQLEDITOR__ = {
     title: null,
     codeMirror: null,
     parameter: {},
     charset: {value: 1, name: "字符集", type: "select", options: ["GBK", "UTF-8"]},
     modes: {SQL: "text/x-sqlite",函数: "text/javascript"},
     themes: {
         默认: {name: "default", href: "codemirror/theme/default.css"},
         黑色: {name: "black", href: "codemirror/theme/black.css"},
         粉色: {name: "pink", href: "codemirror/theme/pink.css"},
         墨绿: {name: "blackish-green", href: "codemirror/theme/blackish-green.css"},
         蓝色: {name: "duotone-light", href: "codemirror/theme/duotone-light.css"},
         深蓝: {name: "cobalt", href: "codemirror/theme/cobalt.css"},
         幻想: {name: "rubyblue", href: "codemirror/theme/rubyblue.css"},
         初心: {name: "solarized light", href: "codemirror/theme/solarized.css"},
         宁静: {name: "darcula", href: "codemirror/theme/darcula.css"},
         优雅: {name: "elegant", href: "codemirror/theme/elegant.css"},
         矩阵: {name: "the-matrix", href: "codemirror/theme/the-matrix.css"},
         锐利: {name: "yonce", href: "codemirror/theme/yonce.css"},
         黄昏: {name: "zenburn", href: "codemirror/theme/zenburn.css"},
         黯然: {name: "eclipse", href: "codemirror/theme/eclipse.css"},
         透明: {name: "transparent", href: "codemirror/theme/transparent.css"}
     },
     fontSize: {
         options: {
             "100%": "100%",
             "110%": "110%",
             "120%": "120%",
             "130%": "130%",
             "140%": "140%",
             "150%": "150%"
         },
         default: 1
     },
     options: {
         mode: "text/x-sqlite",
         theme: "mdn-like",
         indentWithTabs: true,
         smartIndent: true,
         lineNumbers: true,
         matchBrackets: true,
         autofocus: true,
         gutters: ["CodeMirror-linenumbers", "breakpoints"],
         extraKeys: {
             "F10": "autocomplete",
             "F11": function (cm) {
                 cm.setOption("fullScreen", !cm.getOption("fullScreen"));
             },
             "Esc": function (cm) {
                 if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
             },
             "Shift-F": "findPersistent"
         },
         hintOptions: {tables: {}}
     },
     init: function (textarea) {
         let messasge = "初始化脚本编辑器";
         try {
             textarea.placeholder = "\n" +
                 "F10 自动完成\n" +
                 "F11 全屏编辑切换;Esc 取消全屏\n" +
                 "Ctrl-Z 撤销键入\n" +
                 "Ctrl-Y 恢复键入\n" +
                 "Shift-F 查找\n" +
                 "Shift-Ctrl-F 查找替换\n" +
                 "Shift-Ctrl-R 查找全部并替换\n";
             this.codeMirror = CodeMirror.fromTextArea(textarea, this.options);
             let colors = ["#fcc", "#ccf", "#fcf", "#aff", "#cfc", "#f5f577"];
             let rulers = [];
             for (let i = 1; i <= 6; i++) {
                 rulers.push({color: colors[i], column: i * 40, lineStyle: "dotted"});
                 //solid//dashed//dash-dot//dotted
             }
             this.codeMirror.setOption("rulers", rulers);
             this.codeMirror.on("gutterClick", function (cm, n) {
                 let info = cm.lineInfo(n);
                 cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : marker());
             });

             function marker() {
                 let marker = document.createElement("div");
                 marker.style.color = "#822";
                 marker.innerHTML = "●";
                 return marker;
             }
             __LOGS__.viewMessage(messasge + "...OK.");
         } catch (e) {
             __LOGS__.viewMessage(messasge + "...fails.");
         }
     }
 };

 function sleep(delay) {
    let endTime = new Date().getTime() + parseInt(delay);
    while (new Date().getTime() < endTime) ;
    //用时间来控制延时,突破浏览器同时下载任务限制.
}

function transferData(structure,row) {
    //####################################
    //用于数据导入的行数据转换
    //读取当前数据表结构
    //####################################
    let _row = [];
    try {
        let types = structure["data"];
        if (types.length <= row.length) {
            for (let i = 0; i < types.length; i++) {
                let type = types[i].Type.value;
                let p = type.indexOf("(");
                if (p > 0) {
                    type = type.substring(0, p);
                }
                switch (type.toUpperCase()) {
                    case "DATE":
                        _row.push(new Date(row[i]).format("yyyy-MM-dd"));
                        break;
                    case "DATETIME":
                        _row.push(new Date(row[i]).format("yyyy-MM-dd hh:mm:ss.S"));
                        break;
                    case "INT":
                        _row.push(Number.parseInt(row[i]));
                        break;
                    case "DECIMAL":
                        _row.push(Number.parseFloat(row[i]));
                        break;
                    case "FLOAT":
                        _row.push(Number.parseFloat(row[i]));
                        break;
                    default:
                        _row.push(row[i]);
                        break;
                }
            }
        }
    } catch (e) {

    }
    return _row;
}

function importData() {
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
        let container = $("progress-detail");
        let item = document.createElement("div");
        item.className = "progress-detail-item";
        item.id = "progress-detail-item-" + packet.index;
        container.appendChild(item);
        let first = container.firstChild;
        container.insertBefore(item, first);

        let d_index = document.createElement("span");
        d_index.className = "progress-detail-item-index";
        d_index.innerText = packet.index;
        d_index.setAttribute("index", packet.index);
        d_index.title = packet.sql;
        item.appendChild(d_index);
        let d_size = document.createElement("span");
        d_size.className = "progress-detail-item-size";
        d_size.innerHTML = Math.round(getByteLength(packet.data.toString()) * 100 / 1024) / 100 + "Kb";
        d_size.title = packet.data.toString();
        item.appendChild(d_size);
        let d_error = document.createElement("span");
        d_error.className = "progress-detail-item-error";
        d_error.innerHTML = (packet.error == null ? "&ensp;" : getSubString(packet.error, 0, 30) + "...");
        d_error.title = packet.error;
        item.appendChild(d_error);
        return item;
    }

    function scrollto() {
        let items = $("progress-detail").getElementsByClassName("progress-detail-item");
        items[items.length - 1].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
        try {
            let sep = __IMPORT__.Separator.value;
            let lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\r\n");
            if (lines.length == 1)
                lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\n");
            let table = __CONFIGS__.CURRENT_TABLE.name;
            __IMPORT__.SourceFile.total = lines.length - 1;
            //不含表头
            __IMPORT__.SourceFile.count = 0;
            __IMPORT__.SourceFile.imported = 0;
            __IMPORT__.SourceFile.failed = 0;
            __IMPORT__.SourceFile.error = [];
            __IMPORT__.SourceFile.row = null;
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
                        __IMPORT__.SourceFile.sql = sql = sql.replace("{VALUES}", values);
                        __LOGS__.viewMessage(sql);
                    } else if (data.length >= __CONFIGS__.CURRENT_TABLE.structure.data.length) {
                        let row = data.slice(0, __CONFIGS__.CURRENT_TABLE.structure.data.length);
                        tx.executeSql(sql, row, function (tx, results) {
                                __IMPORT__.SourceFile.count += 1;
                                __IMPORT__.SourceFile.imported += results.rowsAffected;
                                let pre = Math.floor(__IMPORT__.SourceFile.count * 100 / __IMPORT__.SourceFile.total);
                                if (typeof pres[pre] !== "undefined") {
                                    if ((pre % 10 == 0 && pres[pre] == false) || __IMPORT__.SourceFile.count == __IMPORT__.SourceFile.total) {
                                        pres[pre] = true;
                                        let packet = {
                                            index: __IMPORT__.SourceFile.count,
                                            sql: __IMPORT__.SourceFile.sql,
                                            data: row,
                                            error: __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%)",
                                            beginTime: null,
                                            endTime: getNow()
                                        };
                                        __IMPORT__.SourceFile.error.push(packet);
                                        viewPacket(packet);
                                        scrollto();
                                        __LOGS__.viewMessage("Imported : " + __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%)")
                                    }
                                }
                            },
                            function (tx, error) {
                                __IMPORT__.SourceFile.count += 1;
                                __IMPORT__.SourceFile.failed += 1;
                                let pre = Math.floor(__IMPORT__.SourceFile.count * 100 / __IMPORT__.SourceFile.total);
                                let packet = {
                                    index: __IMPORT__.SourceFile.count,
                                    sql: __IMPORT__.SourceFile.sql,
                                    data: row,
                                    error: __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%),\n" + error.message,
                                    beginTime: null,
                                    endTime: getNow()
                                };
                                __IMPORT__.SourceFile.error.push(packet);
                                viewPacket(packet);
                                scrollto();
                                __LOGS__.viewMessage("Imported : " + __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%),\n" + error.message)
                            });
                    } else {
                        __IMPORT__.SourceFile.count += 1;
                        __IMPORT__.SourceFile.failed += 1;
                        let pre = Math.floor(__IMPORT__.SourceFile.count * 100 / __IMPORT__.SourceFile.total);
                        let packet = {
                            index: __IMPORT__.SourceFile.count,
                            sql: __IMPORT__.SourceFile.sql,
                            data: data,
                            error: __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%),\n" + "数据解析后长度小于数据库结构.",
                            beginTime: null,
                            endTime: getNow()
                        };
                        __IMPORT__.SourceFile.error.push(packet);
                        viewPacket(packet);
                        scrollto();
                        __LOGS__.viewMessage("Imported : " + __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%),\n" + "数据解析后长度小于数据库结构.")
                    }
                } catch (e) {
                    __IMPORT__.SourceFile.count += 1;
                    __IMPORT__.SourceFile.failed += 1;
                    let pre = Math.floor(__IMPORT__.SourceFile.count * 100 / __IMPORT__.SourceFile.total);
                    let packet = {
                        index: __IMPORT__.SourceFile.count,
                        sql: __IMPORT__.SourceFile.sql,
                        data: data,
                        error: __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%)" + e,
                        beginTime: null,
                        endTime: getNow()
                    };
                    __IMPORT__.SourceFile.error.push(packet);
                    viewPacket(packet);
                    scrollto();
                    __LOGS__.viewMessage("Imported : " + __IMPORT__.SourceFile.imported + " / " + __IMPORT__.SourceFile.count + "(" + pre + "%),\n" + e)
                }
            }
            //由于tx.executeSql异步执行，连续事务执行时间不可预计，不能添加事后统计，只能事中统计.
        } catch (e) {
            alert(e);
        }
    });
}

function getAbsolutePosition(obj)
//获取控件绝对位置
{
    let position = {"left":0,"top":0,"width":0,"height":0};
    let w=0,h=0;
    position.width = obj.offsetWidth;
    position.height = obj.offsetHeight;
    while(obj.offsetParent)
    {
        w += obj.offsetLeft;
        h += obj.offsetTop;
        obj = obj.offsetParent;
    }
    position.left = w;
    position.top = h;
    return position;
}

function structInspect(data,sep){
    // 数据结构检测
    // 获取可导入数据
    // 即数据分割后相同宽度最多的行.
    let addup = [];

    function washData(d){
        let row = [];
        for(let i=0;i<d.length;i++){
            if (d[i].trim() != "" && d[i] != null)
                row.push(d[i]);
        }
        return row;
    }

    function addUp(row, id){
        let index = null;
        for (let i=0;i<addup.length;i++){
            if (addup[i].columns == row.length) {
                index = i;
                break;
            }
        }
        if (index == null)
            addup.push({columns:row.length,start:id,count:1,lines:[row]});
        else {
            addup[index].count += 1;
            addup[index].lines.push(row);
        }
    }

    function getStart(){
        let index = 0;
        let max = 0;
        for(let i=0;i<addup.length;i++){
            if (addup[i].count > max){
                index = i;
                max = addup[i].count;
            }
        }
        return addup[index];
    }

    for (let i =0;i<data.length;i++){
        addUp(washData(data[i].trim().split(sep)),i);
    }

    return getStart();
}

function getStructFromData() {
    let sep = __IMPORT__.Separator.value;
    let lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\r\n");
    if (lines.length == 1)
        lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\n");

    let start = structInspect(lines.slice(0,lines.length>1000?1000:lines.length),sep);
    //检测样本为前1000条数据
    let columns = start.lines[0];
    let data = start.lines[1];

    let stru = [];
    for (let i=0;i<columns.length;i++) {
        let col = {};
        for (let index in __COLUMN__) {
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
}

function createTable(structure) {
    let container = document.createElement("div");
    container.type = "div";
    container.className = "create-table-Content";
    container.id = "create-table-Content";

    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 创建数据表 ";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let tableTitle = document.createElement("input");
    tableTitle.id = "table-Title";
    tableTitle.placeholder = "请输入数据表名称.";
    if (structure != null)
        tableTitle.value = structure["title"];
    tableTitle.style.width = "99.2%";
    container.appendChild(tableTitle);

    let tablecontainer = document.createElement("div");
    tablecontainer.className = "table-container";
    container.appendChild(tablecontainer);

    let tb = document.createElement("table");
    tablecontainer.appendChild(tb);
    tb.className = "table";
    tb.style.width = "100%";
    tb.id = "table-Content";
    let tr = document.createElement("tr");
    tb.appendChild(tr);
    for (let index in __COLUMN__) {
        let th = document.createElement("th");
        tr.appendChild(th);
        if (index != "check")
            th.innerText = __COLUMN__[index].name;
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
        for (let index in __COLUMN__) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let attri;
            if (__COLUMN__[index].type == "select") {
                attri = document.createElement("select");
                attri.className = index;
                attri.type = __COLUMN__[index].type;
                for (let i = 0; i < __COLUMN__[index].options.length; i++) {
                    attri.options.add(new Option(__COLUMN__[index].options[i], __COLUMN__[index].options[i]));
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
                attri.type = __COLUMN__[index].type;

                if (attri.type == "checkbox") {
                    if (structure == null) {
                        if (__COLUMN__[index].value == true) {
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
                        attri.value = __COLUMN__[index].value;
                    else
                        attri.value = structure["stru"][rows][index];
                }
            }
            attri.style.width = __COLUMN__[index].width;
            td.appendChild(attri);
        }
    }

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    tool.style.cssFloat = "left";
    container.appendChild(tool);

    let add = document.createElement("a");
    add.className = "button";
    add.innerHTML = "增加";
    add.setAttribute("tb", tb.id);
    add.onclick = function () {
        let table = $("table-Content");
        let tr = document.createElement("tr");
        if ((table.getElementsByTagName("tr").length-1) % 2 > 0) {
            tr.className = "alt-line";
            //单数行
        }
        table.appendChild(tr);
        for (let index in __COLUMN__) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let attri;
            if (__COLUMN__[index].type == "select") {
                attri = document.createElement("select");
                attri.className = index;
                attri.type = __COLUMN__[index].type;
                for (let i = 0; i < __COLUMN__[index].options.length; i++) {
                    attri.options.add(new Option(__COLUMN__[index].options[i], __COLUMN__[index].options[i]));
                }
            } else {
                attri = document.createElement("input");
                attri.className = index;
                attri.type = __COLUMN__[index].type;

                if (attri.type == "checkbox") {
                    if (__COLUMN__[index].value == true) {
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
                    attri.value = __COLUMN__[index].value;
                }
            }
            attri.style.width = __COLUMN__[index].width;
            td.appendChild(attri);
        }
    };
    tool.appendChild(add);

    let del = document.createElement("a");
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
            alert("至少保留一个字段.");
        }
    };
    tool.appendChild(del);

    let b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "创建";
    b.onclick = function () {
        if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
            alert("请选择数据库.");
            return;
        }
        if (checkStorage()) {
            __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                let table = $("table-Content");
                let rows = table.getElementsByTagName("tr");
                let stru = [];
                for (let i = 1; i < rows.length; i++) {
                    let col = {};
                    for (let index in __COLUMN__) {
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
                    let sql = getCreateTableSql(title.value, stru);
                    __LOGS__.viewMessage(sql);
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
                        function (tx, error) {
                            __LOGS__.viewMessage(error.message);
                        });
                }
                else
                    alert("请输入数据表名称.");
            });
        }
    };
    tool.appendChild(b);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = close.onclick = function () {
        let container = $("create-table-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);

    setDialogDrag(title);

    return container;
}

function  getCreateTableSql(title, stru) {
    //根据选项生成建表SQL
    let cols = " (";
    let key = "";
    let key_count = 0;
    let auto_increment = null;
    for (let i=0;i<stru.length;i++) {
        if (stru[i].index == true) {
            key += stru[i].name + ",";
            key_count += 1;
            if (auto_increment == null && stru[i].auto_increment  && stru[i].type == "integer")
                auto_increment = stru[i].name;
        }
    }

    for (let i=0;i<stru.length;i++) {
        if (stru[i].check == true && stru[i].name != "") {
            cols += stru[i].name + " " + stru[i].type;
            if (stru[i].type =="decimal" || stru[i].type == "float"){
                cols +="(" + stru[i].length + "," + stru[i].scale + ")";
            }
            if (stru[i].type =="nvarchar" || stru[i].type == "varchar"){
                cols +="(" + stru[i].length + ")";
            }
            if (stru[i].allowNull == "N" || stru[i].index == true || (stru[i].column_default != null && stru[i].column_default.trim() != "")){
                cols += " NOT NULL";
            } else {
                cols += " NULL";
            }
            if (key_count == 1 && stru[i].index == true ){
                cols += " PRIMARY KEY";
                if (stru[i].name == auto_increment){
                    cols += " autoincrement,";
                } else {
                    cols += ",";
                }
            }else if(stru[i].column_default != null && stru[i].column_default.trim() != "") {
                cols += " DEFAULT " + stru[i].column_default + ",";
            } else {
                cols += ",";
            }
        }
    }
    let sql = "CREATE TABLE " + title + cols.substring(0,cols.length-1);
    if (key_count > 1){
        sql += ",PRIMARY KEY (" + key.substring(0, key.lastIndexOf(",")) + "))"
    } else{
        sql += ")"
    }
    return sql;
}

function createDatabase(){
    let __DATABASE__ = {
        Name: {value: "", name: "库名称", type: "text"},
        Version: {value: 1.0, name: "版本号", type: "text"},
        Description: {value: "", name: "库描述", type: "text"},
        Size: {value: "1024*1024*1024", name: "库容量", type: "text"}
    };
    let container = document.createElement("div");
    container.type = "div";
    container.className = "create-database-Content";
    container.id = "create-database-Content";

    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 创建数据库 ";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    for (let name in __DATABASE__) {
        let d = document.createElement("div");
        container.appendChild(d);
        let s = document.createElement("span");
        s.innerHTML = __DATABASE__[name].name + ":";
        d.appendChild(s);
        if (__DATABASE__[name].type == "text"){
            let input = document.createElement("input");
            input.id = name;
            input.type = "text";
            input.value = __DATABASE__[name].value;
            input.onchange = function(){
                __DATABASE__[this.id].value = this.value;
            };
            d.appendChild(input);
        }
    }

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    tool.style.cssFloat= "left";
    container.appendChild(tool);

    let b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "创建";
    b.onclick = function(){
        if (checkStorage()) {
            if (__DATABASE__.Name.value.trim() != "") {
                let db = {
                    name: __DATABASE__.Name.value,
                    version: __DATABASE__.Version.value,
                    description: __DATABASE__.Description.value,
                    size: __DATABASE__.Size.value
                };
                let storage = window.localStorage;
                let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                let index = -1;
                for (let i=0;i<dbs.length;i++){
                    if (dbs[i].name == __DATABASE__.Name.value) {
                        index = i;
                        break;
                    }
                }
                if (index == -1)
                    dbs.push(db);
                else {
                    let isOver = confirm("数据库 " + __DATABASE__.Name.value + " 已经存在,是否修改相关信息?");
                    if (isOver)
                        dbs[index] = db;
                }
                storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                viewDatabases();
                let container =$("create-database-Content");
                container.parentNode.removeChild(container);
            } else
                alert("请输入数据库名称.");
        }
    };
    tool.appendChild(b);
    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = close.onclick = function(){
        let container=$("create-database-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);

    setDialogDrag(title);

    return container;
}

function getImportContent() {
     __IMPORT__.SourceFile.count = 0;
     __IMPORT__.SourceFile.total = 0;

    let container = document.createElement("div");
    container.type = "div";
    container.className = container.id = "import-configs-content";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 导入数据";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    for (let name in __IMPORT__) {
        let item = document.createElement("div");
        item.className = "import-configs-item";
        container.appendChild(item);
        let itemname = document.createElement("span");
        itemname.className = "import-configs-name";
        itemname.innerHTML = __IMPORT__[name].name + " : ";
        item.appendChild(itemname);
        let itemvalue = null;
        if (name == "Table") {
            itemvalue = document.createElement("input");
            itemvalue.className = "import-configs-value";
            itemvalue.id = name;
            itemvalue.readOnly = true;
            itemvalue.value = __CONFIGS__.CURRENT_TABLE.name;
        } else if (name == "Charset" || name == "Separator" || name == "SelectedDataSet") {
            itemvalue = document.createElement("select");
            itemvalue.className = "import-configs-value";
            itemvalue.id = name;
            for (let i = 0; i < __IMPORT__[name].options.length; i++) {
                if (isArray(__IMPORT__[name].options[i]))
                    itemvalue.options.add(new Option(__IMPORT__[name].options[i][0], __IMPORT__[name].options[i][1]));
                else
                    itemvalue.options.add(new Option(__IMPORT__[name].options[i], i));
            }
            itemvalue.value = __IMPORT__[name].value;
            itemvalue.onchange = function () {
                __IMPORT__[this.id].value = this.value;
            };
        } else if (name == "SourceFile") {
            itemvalue = document.createElement("input");
            itemvalue.className = "import-configs-value";
            itemvalue.id = name;
            itemvalue.type = __IMPORT__[name].type;
            if (itemvalue.type == "file") {
                itemvalue.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                itemvalue.onchange = function () {
                    if (window.FileReader) {
                        try {
                            let file = this.files[0];
                            let filetype = file.name.split(".")[1];
                            __IMPORT__.SourceFile.value = file.name;
                            __IMPORT__.SourceFile.data = [];
                            let selectDataSet = $("SelectedDataSet");
                            for (let i = selectDataSet.length - 1; i >= 0; i--) {
                                selectDataSet.remove(i);
                            }
                            if (filetype.toUpperCase() == "TXT" || filetype.toUpperCase() == "CSV") {
                                let reader = new FileReader();
                                reader.onload = function () {
                                    __IMPORT__.SourceFile.data.push(this.result);
                                    selectDataSet.options.add(new Option("默认", 0));
                                    __IMPORT__.SelectedDataSet.value = selectDataSet.selectedIndex = 0;
                                };
                                reader.readAsText(file, __IMPORT__.Charset.options[__IMPORT__.Charset.value]);
                            } else if (filetype.toUpperCase() == "XLS" || filetype.toUpperCase() == "XLSX") {
                                readExcelFile(file);
                            } else {
                                showMessage("仅适用于XLSX、XLS、TXT和CSV文件。");
                                return;
                            }
                        } catch (e) {
                            alert("请选择需要导入的文件.")
                        }
                        $("progress-container").innerText = "";
                    } else {
                        showMessage("本应用适用于Chrome或Edge浏览器。")
                    }
                };
            }
        }
        item.appendChild(itemvalue);
    }

    let progress = document.createElement("div");
    progress.id = "progress-container";
    container.appendChild(progress);

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    tool.style.cssFloat= "left";
    tool.style.width = "100%";
    container.appendChild(tool);

    let b = document.createElement("a");
    b.className = "button";
    b.id = "import-button";
    b.innerHTML = "导入";
    b.onclick = function(){
        if (__CONFIGS__.CURRENT_TABLE.name == "" || __CONFIGS__.CURRENT_TABLE.type == "view"){
            let conf = confirm("您没有选择数据表，是否要根据数据结构创建一个名称为 " + __IMPORT__.SourceFile.value.split(".")[0] + " 的新表?");
            if (conf) {
                let title = __IMPORT__.SourceFile.value.split(".")[0];
                let tb = createTable({"title": title, "stru": getStructFromData()});
                setCenterPosition($("page"),tb);
                $("import-configs-content").parentNode.removeChild($("import-configs-content"));
            }
        } else {
            $("progress-container").appendChild(getImportProgress());
            if ($("SelectedDataSet").length > 0) {
                importData();
            } else
                alert("请选择需要导入的文件及数据集合.");
            //let container =$("import-configs-content");
            //container.parentNode.removeChild(m);
        }
    };
    tool.appendChild(b);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = close.onclick = function(){
        let container =$("import-configs-content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);

    setDialogDrag(title);

    return container;
}

function getImportProgress() {
    let container = document.createElement("div");
    container.id = "progress";
    let v = document.createElement("div");
    container.appendChild(v);
    v.id = "progress-value";
    let detail = document.createElement("div");
    detail.id = "progress-detail";
    container.appendChild(detail);

    __IMPORT__.SourceFile.progress = setInterval(function () {
        Timer()
    }, 50);

    function Timer() {
        try {
            let value = __IMPORT__.SourceFile.count / __IMPORT__.SourceFile.total;
            let v = $("progress-value");
            v.style.width = (value * 100) + "%";
            v.innerText = __IMPORT__.SourceFile.count + " / " + __IMPORT__.SourceFile.total;
            if (value == 1)
                Stop(__IMPORT__.SourceFile.progress);
        } catch (e) {
        }
    }

    function Stop(progress) {
        clearInterval(progress);
    }

    return container;
}

function checkStorage(){
    try {
        if (typeof window.localStorage !== undefined)
            return true;
        else
            return false;
    }catch (e) {
        return false;
    }
}

function getUserConfig(key) {
    try {
        let storage = window.localStorage;
        if (storage.getItem(__CONFIGS__.STORAGE.CONFIGS) == null) {
            let th = {};
            storage.setItem(__CONFIGS__.STORAGE.CONFIGS, JSON.stringify(th));
        }
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.CONFIGS));
        return configs[key];
    }catch (e) {
        __LOGS__.viewError(e);
        return null;
    }
}

function setUserConfig(key,value) {
    try {
        let storage = window.localStorage;
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.CONFIGS));
        configs[key] = value;
        storage.setItem(__CONFIGS__.STORAGE.CONFIGS, JSON.stringify(configs));
    }catch (e) {
        __LOGS__.viewError(e);
    }
}

function viewDatabases(){
    let message = "读取数据库列表...";
    try {
        let storage = window.localStorage;
        if (storage.getItem(__CONFIGS__.STORAGE.DATABASES) == null) {
            storage.setItem(__CONFIGS__.STORAGE.DATABASES, "[]")
        }
        let dbslist = $("sidebar-dbs");
        dbslist.innerText = "";
        let ul = document.createElement("ul");
        ul.style.width = "80%";
        ul.style.position = "relative";
        dbslist.appendChild(ul);
        __CONFIGS__.DATABASES = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
        for (let i = 0; i < __CONFIGS__.DATABASES.length; i++) {
            if (__CONFIGS__.DATABASES[i].name != null) {
                let li = document.createElement("li");
                li.className = "database-list";
                let a = document.createElement("a");
                a.className = "list";
                a.innerText = __CONFIGS__.DATABASES[i].name;
                a.setAttribute("index", i);
                a.id = __CONFIGS__.DATABASES[i].name;
                a.onclick = function () {
                    let dbs = $("sidebar-dbs");
                    let l = dbs.getElementsByClassName("list");
                    for (let i = 0; i < l.length; i++) {
                        l[i].style.fontWeight = "normal";
                    }
                    this.style.fontWeight = "bold";
                    viewTables(this.getAttribute("index"));
                    __CONFIGS__.CURRENT_TABLE.name = "";
                    __CONFIGS__.CURRENT_TABLE.sql = "";
                    __CONFIGS__.CURRENT_TABLE.structure = [];
                    __CONFIGS__.CURRENT_TABLE.type = "";
                    //显示库信息
                    $("ul-db-" + this.id).innerText = "";
                    if ($("ul-db-" + this.id).getAttribute("isOpen") == "false") {
                        for (let key in __CONFIGS__.CURRENT_DATABASE.value) {
                            let l = document.createElement("li");
                            $("ul-db-" + this.id).appendChild(l);
                            let inf = document.createElement("a");
                            inf.className = "list";
                            inf.innerText = key + ": " + __CONFIGS__.CURRENT_DATABASE.value[key];
                            l.appendChild(inf);
                        }
                        $("ul-db-" + this.id).setAttribute("isOpen", "true");
                    } else {
                        $("ul-db-" + this.id).setAttribute("isOpen", "false");
                    }
                };
                li.appendChild(a);
                let dul = document.createElement("ul");
                dul.id = "ul-db-" + __CONFIGS__.DATABASES[i].name;
                dul.setAttribute("isOpen", "false");
                li.appendChild(dul);
                ul.appendChild(li);
            }
        }
        __LOGS__.viewMessage(message + "OK.");
    }catch (e) {
        __LOGS__.viewMessage(message + "fails.\n" + e, true);
    }
}

function viewTables(index) {
    let database = __CONFIGS__.DATABASES[index];
    let db = openDatabase(database.name, database.version, database.description, eval(database.size));
    __CONFIGS__.CURRENT_DATABASE.index = index;
    __CONFIGS__.CURRENT_DATABASE.value = database;
    __CONFIGS__.CURRENT_DATABASE.connect = db;
    __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
        let sql = "SELECT type, name, tbl_name as 'tablename', rootpage, '' AS 'remarks' FROM sqlite_master WHERE type in ('table','view') and tbl_name not like '%_SYSTEM_%' and tbl_name <> 'sqlite_sequence' " +
            "UNION ALL " +
            "SELECT type, name, tbl_name as 'tablename', rootpage, 'Temporary' AS 'remarks' FROM sqlite_temp_master WHERE type = 'table' and tbl_name not like '%_SYSTEM_%' " +
            "ORDER BY type, tbl_name";
        tx.executeSql(sql, [], function (tx, results) {
                let tbs = $("sidebar-tbs");
                tbs.innerText = "";
                let ul = document.createElement("ul");
                ul.style.width = "80%";
                ul.style.position = "relative";
                tbs.appendChild(ul);
                let len = results.rows.length;
                let tables = [];
                let hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
                for (let i = 0; i < len; i++) {
                    if (results.rows.item(i).tablename != "__WebKitDatabaseInfoTable__" && results.rows.item(i).tablename != "") {
                        let li = document.createElement("li");
                        li.className = "table-list";
                        let a = document.createElement("a");
                        li.appendChild(a);
                        a.className = "list";
                        hintOptions.tables[results.rows.item(i).tablename] = [];
                        __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);
                        a.innerText = results.rows.item(i).tablename;
                        a.id = results.rows.item(i).tablename;
                        a.setAttribute("type", results.rows.item(i).type);
                        tables.push(results.rows.item(i).tablename);
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
                        a.onclick = function () {
                            __CONFIGS__.CURRENT_TABLE.name = this.id;
                            __CONFIGS__.CURRENT_TABLE.type = this.getAttribute("type");
                            __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                                let sql = "select sql from sqlite_master where type in ('table','view') and name='" + __CONFIGS__.CURRENT_TABLE.name + "'";
                                //仅获取表结构，忽略视图.
                                __LOGS__.viewMessage(sql);
                                tx.executeSql(sql, [],
                                    function (tx, results) {
                                        let len = results.rows.length;
                                        if (len > 0) {
                                            __LOGS__.viewMessage("数据库返回 " + len + " 条记录.");
                                            __CONFIGS__.CURRENT_TABLE.sql = results.rows.item(0).sql;
                                            if (__CONFIGS__.CURRENT_TABLE.type == "table")
                                                __CONFIGS__.CURRENT_TABLE.structure = getTableStructure(results.rows.item(0).sql);
                                            else
                                                __CONFIGS__.CURRENT_TABLE.structure = [];
                                            //显示表结构
                                            $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).innerText = "";
                                            if ($("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).getAttribute("isOpen") == "false") {
                                                let columns = [];
                                                for (let m = 0; m < __CONFIGS__.CURRENT_TABLE.structure.data.length; m++) {
                                                    let l = document.createElement("li");
                                                    $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).appendChild(l);
                                                    let col = document.createElement("span");
                                                    col.className = "column-name";
                                                    col.id = __CONFIGS__.CURRENT_TABLE.name + "." + __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
                                                    columns.push(__CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value);
                                                    col.innerText = __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
                                                    col.draggable = "true";
                                                    col.ondragstart = function (event) {
                                                        event.dataTransfer.setData("Text", event.target.id);
                                                    };
                                                    l.appendChild(col);
                                                    let typ = document.createElement("span");
                                                    typ.className = "column-type";
                                                    typ.innerText = __CONFIGS__.CURRENT_TABLE.structure.data[m]["Type"].value;
                                                    l.appendChild(typ);
                                                }
                                                let hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
                                                hintOptions.tables[__CONFIGS__.CURRENT_TABLE.name] = columns;
                                                __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);

                                                $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).setAttribute("isOpen", "true");
                                            } else {
                                                $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).setAttribute("isOpen", "false");
                                            }
                                        }
                                    },
                                    function (tx, err) {
                                        __LOGS__.viewMessage(err.message);
                                        __CONFIGS__.CURRENT_TABLE.sql = "";
                                        __CONFIGS__.CURRENT_TABLE.structure = {"columns": [], "data": []};
                                        __CONFIGS__.CURRENT_TABLE.type = "";
                                    });
                            });

                            let tbs = $("sidebar-tbs");
                            let l = tbs.getElementsByClassName("list");
                            for (let i = 0; i < l.length; i++) {
                                l[i].style.fontWeight = "normal";
                            }
                            this.style.fontWeight = "bold";
                        };
                        let colul = document.createElement("ul");
                        colul.id = "ul-tb-" + results.rows.item(i).tablename;
                        colul.setAttribute("isOpen", "false");
                        li.appendChild(colul);
                        ul.appendChild(li);
                    }
                }
                __CONFIGS__.TABLES = tables;
            },
            function (tx, err) {
                __LOGS__.viewMessage(err.message);
            });
    });
}

function orderDatasetBy(dataset, colid) {
    // 对数据排序
    // 中文比较大小使用localeCompare
    function exchange(r1, r2) {
        for (col in r1) {
            for (attr in r1[col]) {
                if (attr != "rowid" && attr != "colid") {
                    let tmp = r1[col][attr];
                    r1[col][attr] = r2[col][attr];
                    r2[col][attr] = tmp;
                }
            }
        }
    }

    let columns = dataset.columns;
    let data = dataset.data;
    switch (columns[colid].order) {
        case "":
            columns[colid].order = "asc";
            break;
        case "asc":
            columns[colid].order = "desc";
            break;
        case "desc":
            columns[colid].order = "asc";
            break;
    }
    for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < i; x++) {
            switch (columns[colid].order) {
                case "asc":
                    if (data[i][columns[colid].name].type == "number") {
                        if (data[i][columns[colid].name].value < data[x][columns[colid].name].value) {
                            exchange(data[i], data[x]);
                        }
                    } else if (data[i][columns[colid].name].type == "object") {
                        exchange(data[i], data[x]);
                    } else {
                        if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) < 0) {
                            exchange(data[i], data[x]);
                        }
                    }
                    break;
                case "desc":
                    if (data[i][columns[colid].name].type == "number") {
                        if (data[i][columns[colid].name].value > data[x][columns[colid].name].value) {
                            exchange(data[i], data[x]);
                        }
                    } else if (data[i][columns[colid].name].type == "object") {
                        exchange(data[i], data[x]);
                    } else {
                        if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) > 0) {
                            exchange(data[i], data[x]);
                        }
                    }
                    break;
            }
        }
    }
    return dataset;
}

function datasetTranspose(index) {
    //数据转置
    try {
        let columns = __DATASET__.result[index].columns;
        let data = __DATASET__.result[index].data;
        //let title = (typeof __DATASET__.result[index].title == "undefined")? []:__DATASET__.result[index].title;
        let dataset = {columns: [], data: []};
        let col = {
            id: 0,
            name: columns[0].name,
            order: "",
            type: "string",
            style: columns[0].style
        };
        dataset.columns.push(col);
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            col = {
                id: i + 1,
                name: row[columns[0].name].value,
                order: "",
                type: row[columns[0].name].type,
                style: row[columns[0].name].style
            };
            dataset.columns.push(col);
        }

        for (let c = 1; c < columns.length; c++) {
            let nr = {};
            nr[columns[0].name] = {
                rowid: c - 1,
                colid: 0,
                value: columns[c].name,
                type: "string",
                style: columns[c].style
            };
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                nr[row[columns[0].name].value] = {
                    rowid: c - 1,
                    colid: i + 1,
                    value: row[columns[c].name].value,
                    type: row[columns[c].name].type,
                    style: row[columns[c].name].style
                };
            }
            dataset.data.push(nr);
        }
        __DATASET__.result[index].data = dataset.data;
        __DATASET__.result[index].columns = dataset.columns;
    } catch (e) {
        __LOGS__.viewError(e);
    }
}

function viewDataset(index, pageindex) {
    if (__DATASET__.result.length > 0) {
        __DATASET__.default.sheet = index;
        __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__DATASET__.configs.reportPageSize.value));
        __DATASET__.default.tab = Math.floor(__DATASET__.default.sheet/10);
        if (typeof  pageindex != "undefined")
            __DATASET__.pages.default = pageindex;
        setDataPageTools(index);
    }

    let container = $("tableContainer");
    try {
        container.removeAttribute("_echarts_instance_");
        echarts.getInstanceByDom(container).dispose();
    } catch (e) {
    }
    container.innerText = "";
    let columns = __DATASET__.result[index].columns;
    let data = __DATASET__.result[index].data;
    let table = document.createElement("table");
    table.className = table.id = "table";
    if (__DATASET__.configs.reportFontFamily.value != "default")
        table.style.fontFamily = __DATASET__.configs.reportFontFamily.value;
    if (__DATASET__.configs.reportFontWeight.value != "default")
        table.style.fontWeight = __DATASET__.configs.reportFontWeight.value;
    if (__DATASET__.configs.reportFontStyle.value != "default")
        table.style.fontStyle = __DATASET__.configs.reportFontStyle.value;

    let tr = document.createElement("tr");
    tr.type = "tr";
    if (__DATASET__.configs.reportRowHeight.value != "default")
        tr.style.height = __DATASET__.configs.reportRowHeight.value;
    table.appendChild(tr);

    for (let c = 0; c < columns.length; c++) {
        let th = document.createElement("th");
        th.type = "th";
        let menu = document.createElement("li");
        menu.className = "menu";
        menu.setAttribute("colid", c);
        menu.innerText = "︙";
        menu.appendChild(getColumnMenu(c));
        menu.onmouseenter = function () {
            let menu = document.getElementById("table-column-menu-" + this.getAttribute("colid"));
            menu.style.display = "block";
        };
        menu.onmouseleave = function () {
            let menu = document.getElementById("table-column-menu-" + this.getAttribute("colid"));
            menu.style.display = "none";
        };
        th.appendChild(menu);

        let column = document.createElement("span");
        column.className = "column";
        column.innerText = columns[c].name;
        column.style.textAlign = columns[c].style.textAlign;
        switch (columns[c].order) {
            case "":
                column.title = "● " + columns[c].name;
                break;
            case "asc":
                column.title = "▲ " + columns[c].name;
                break;
            case "desc":
                column.title = "▼ " + columns[c].name;
                break;
        }
        column.setAttribute("colid", c);
        column.onclick = function () {
            let index = __DATASET__.default.sheet;
            orderDatasetBy(__DATASET__.result[index], this.getAttribute("colid"));
            viewDataset(index, 0);
        };
        th.appendChild(column);
        tr.appendChild(th);
    }

    let floatFormat = "#,##0.";
    for (let i = 0; i < Number(__DATASET__.configs.reportScale.value); i++) {
        floatFormat += "0";
    }
    for (let i = 0; i < data.length; i++) {
        if (i >= __DATASET__.pages.default * Number(__DATASET__.configs.reportPageSize.value) && i < (__DATASET__.pages.default + 1) * Number(__DATASET__.configs.reportPageSize.value)) {
            let tr = document.createElement("tr");
            tr.type = "tr";
            if (__DATASET__.configs.reportRowHeight.value != "default")
                tr.style.height = __DATASET__.configs.reportRowHeight.value;
            tr.id = i;
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);
            let row = data[i];
            for (let c = 0; c < columns.length; c++) {
                let item = row[columns[c].name];
                let td = document.createElement("td");
                td.type = "td";
                td.id = item.rowid + "," + item.colid;
                td.setAttribute("name", columns[c].name);
                td.setAttribute("value", JSON.stringify(item));
                try {
                    if (item.value != null) {
                        if (item.type == "number") {
                            let f = item.format;
                            if ((item.value + '').indexOf('.') !== -1) {
                                f = floatFormat;
                                item.value = Math.round(item.value * Math.pow(10,Number(__DATASET__.configs.reportScale.value))) / Math.pow(10,Number(__DATASET__.configs.reportScale.value));
                            } else {
                                if (columns[c]["format"] !== "undefined") {
                                    if (item.format != columns[c].format)
                                        f = columns[c].format;
                                }
                            }
                            td.innerText = item.value.format(f);
                            item.format = columns[c]["format"] = f;
                        } else if (item.type == "date" || item.type == "datetime")
                            td.innerText = new Date(item.value).format(item.format);
                        else
                            td.innerText = item.value;
                    } else
                        td.innerText = "";
                    let _style = "";
                    for (let key in item.style) {
                        _style += key + ": " + item.style[key] + ";";
                    }
                    td.style.cssText = _style;
                } catch (e) {
                    td.innerText = row[columns[c].name].value;
                }
                tr.appendChild(td);
            }
        }
    }
    __DATASET__.table.init(table);
    container.appendChild(table);
}

function fillSqlParam(sql) {
    let reg = new RegExp(/\{[a-zA-Z0-9\u4e00-\u9fa5]+\}/, "g");
    let params = sql.match(reg);
    if (params != null) {
        //参数去重
        let temp = [];
        for (let i = 0; i < params.length; i++) {
            if (temp.indexOf(params[i]) === -1)
                temp.push(params[i]);
        }
        params = temp.slice(0);
        for (let i = 0; i < params.length; i++) {
            let param = params[i].toString();
            param = param.substring(param.indexOf("{") + 1, param.indexOf("}"));
            let value = prompt(param + " : ");
            if (value != null)
                sql = sql.replaceAll(params[i].toString(), value.toString());
        }
    }
    return sql;
}

function execute() {
    if (__CONFIGS__.CURRENT_DATABASE.connect != null) {
        __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
            let selection = "";
            let title = __SQLEDITOR__.title;
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();
            if (__SQLEDITOR__.parameter == null)
                selection = fillSqlParam(selection);
            else {
                for (let param in __SQLEDITOR__.parameter) {
                    selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
                    if (title != null)
                        title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
                }
            }
            if (title != null) {
                title = title.split("_");
                __ECHARTS__.configs.titleText.value = title[0];
                if (title.length > 1) {
                    __ECHARTS__.configs.titleSubText.value = title.slice(1).join(" ");
                } else {
                    __ECHARTS__.configs.titleSubText.value = "";
                }
            } else
                title = [];
            let sqls = [];
            if (selection.trim() != "") {
                __LOGS__.viewMessage(selection);
                sqls = selection.split(";");

                for (let s = 0; s < sqls.length; s++) {
                    let sql = sqls[s].slice(0).trim();
                    if (sql.trim() == "")
                        continue;
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            let aff = results.rowsAffected;
                            let len = results.rows.length;
                            if (len > 0) {
                                __LOGS__.viewMessage("数据库返回 " + len + " 条记录.");
                                //##################################
                                //取表头
                                //##################################
                                let columns = [];
                                let co = 0;
                                let r = JSON.parse(JSON.stringify(results.rows.item(0)));
                                for (let key in r) {
                                    columns.push({
                                        id: co,
                                        name: key,
                                        style: {textAlign: "center"},
                                        order: "",
                                        type: "string"
                                    });
                                    co += 1;
                                }
                                //##################################
                                //取数据
                                //##################################
                                let data = [];
                                let floatFormat = "#,##0.";
                                for (let i = 0; i < Number(__DATASET__.configs.reportScale.value); i++) {
                                    floatFormat += "0";
                                }
                                for (let i = 0; i < len; i++) {
                                    let row = {};
                                    let r = JSON.parse(JSON.stringify(results.rows.item(i)));
                                    for (let c = 0; c < columns.length; c++) {
                                        let _value = r[columns[c].name];
                                        let _type = getTypeOf(_value);
                                        let _format = null;
                                        let _align = "left";
                                        let _color = "black";
                                        switch (_type) {
                                            case "number":
                                                if ((_value + '').indexOf('.') !== -1) {
                                                    _format = floatFormat;
                                                    _align = "right";
                                                } else {
                                                    _format = "#,##0";
                                                    _align = "right";
                                                }
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
                                __DATASET__.result.push({
                                    title: title,
                                    sql: sql,
                                    type: __SQLEDITOR__.options.mode,
                                    parameter: __SQLEDITOR__.parameter,
                                    columns: columns,
                                    data: data,
                                    time: getNow()
                                });

                                if (__DATASET__.result.length > 0) {
                                    viewDataset(__DATASET__.result.length - 1, 0);
                                }
                            }
                            if (aff > 0) {
                                __LOGS__.viewMessage(aff + " 条记录被修改.")
                            }
                            if (aff == 0 && len == 0) {
                                __LOGS__.viewMessage("数据库没有返回数据和消息.")
                            }
                        },
                        function (tx, err) {
                            __LOGS__.viewMessage(err.message);
                        });
                }
            }
        });
    } else {
        alert("请选择数据库!");
    }
}

function fixMathFunctionString(str) {
    //用于修正函数字符串
    try {
        var reg = RegExp(/(\d+|\))([a-zA-Z\(]+)/, "g");
        var result = str.match(reg, "g");
        for (var i = 0; i < result.length; i++) {
            result[i].toString().match(reg, "g");
            str = str.replace(result[i].toString(), RegExp.$1 + "*" + RegExp.$2);
        }
    } catch (e) {
    }
    return str;
}

function executeFunction() {
    let selection = "";
    let title = __SQLEDITOR__.title;
    if (__SQLEDITOR__.codeMirror.somethingSelected())
        selection = __SQLEDITOR__.codeMirror.getSelection();
    else
        selection = __SQLEDITOR__.codeMirror.getValue();
    if (__SQLEDITOR__.parameter == null)
        selection = fillSqlParam(selection);
    else {
        for (let param in __SQLEDITOR__.parameter) {
            selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
            if (title != null)
                title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
        }
    }
    if (title != null) {
        title = title.split("_");
        __ECHARTS__.configs.titleText.value = title[0];
        if (title.length > 1) {
            __ECHARTS__.configs.titleSubText.value = title.slice(1).join(" ");
        } else {
            __ECHARTS__.configs.titleSubText.value = "";
        }
    } else
        title = [];
    let funs = [];
    if (selection.trim() != "") {
        funs = selection.split(";");
        __LOGS__.viewMessage(selection);

        let data = [];
        let xRange = __ECHARTS__.configs.mathFunctionXRange.value.toArray([-100, 100], ",");
        for (let x = xRange[0]; x <= xRange[1]; x += Number(__ECHARTS__.configs.mathFunctionXGrainSize.value)) {
            let row = [x];
            for (let s = 0; s < funs.length; s++) {
                let f = funs[s].toString();
                try {
                    f = fixMathFunctionString(funs[s].toString());
                    if (f.trim() != "") {
                        let val = eval("(" + f + ")");
                        row.push(val);
                    } else
                        row.push(null);
                } catch (e) {
                    row.push(f);
                    __LOGS__.viewMessage(e + "\n" + funs[s].toString() + " -> " + f);
                }
            }
            data.push(row);
        }
        __DATASET__.result.push(transferResultDataset(funs, data, title, __SQLEDITOR__.parameter));

        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.result.length - 1, 0);
        }
    }
}

function transferResultDataset(funs, dataset, title, parameter) {
    let col = ["X"].concat(funs);
    let columns = [];
    for (let i = 0; i < col.length; i++) {
        columns.push({id: i, name: col[i], type: "string", style: {textAlign: "center"}, order: ""});
    }
    let data = [];
    let floatFormat = "#,##0.";
    for (let i = 0; i < Number(__DATASET__.configs.reportScale.value); i++) {
        floatFormat += "0";
    }
    for (let i = 0; i < dataset.length; i++) {
        let row = {};
        let r = dataset[i];
        for (let c = 0; c < columns.length; c++) {
            let _value = r[c];
            let _type = _value.toString().getStringDataType();
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

    return {
        title: title,
        sql: funs.join(";\n"),
        type: __SQLEDITOR__.options.mode,
        parameter: parameter,
        columns: columns,
        total: data.length,
        data: data,
        time: getNow()
    };
}

function getTableStructure(sql) {
    //从SQL中解析数据表结构.
    let columns = [];
    columns.push({id: 0, name: "Name", style: {textAlign: "center"}, order: ""});
    columns.push({id: 1, name: "Type", style: {textAlign: "center"}, order: ""});
    columns.push({id: 2, name: "Nullable", style: {textAlign: "center"}, order: ""});
    columns.push({id: 3, name: "Index", style: {textAlign: "center"}, order: ""});
    columns.push({id: 4, name: "Autoincrement", style: {textAlign: "center"}, order: ""});
    columns.push({id: 5, name: "Default", style: {textAlign: "center"}, order: ""});
    let data = [];
    let cols = sql.substring(sql.indexOf("(") + 1, sql.lastIndexOf(")"));
    cols = cols.split(",");
    let tmp = [];
    let isAdd = false;
    for (let i = 0; i < cols.length; i++) {
        let col = cols[i].slice().replace(/[\r\n]/g, "").trim();
        if (col != "") {
            if (isAdd == true) {
                tmp[tmp.length - 1] += ("," + col);
                if (col.indexOf(")") >= 0 && col.indexOf("(") == -1)
                    isAdd = false;
            } else {
                tmp.push(col);
                if (col.indexOf("(") >= 0 && col.indexOf(")") == -1)
                    isAdd = true;
            }
        }
    }
    cols = [];
    let indexkey = [];
    for (let i = 0;i < tmp.length; i++) {
        let col = tmp[i].slice();
        if (col.toUpperCase().indexOf("PRIMARY KEY") == 0 && col.indexOf("(") > 10 && col.lastIndexOf(")") > 11 ) {
            try {
                indexkey = col.substring(col.indexOf("(") + 1, col.lastIndexOf(")")).split(",");
            } catch (e) {
            }
        } else {
            cols.push(col);
        }
    }

    for (let i = 0; i < cols.length; i++) {
        let col = cols[i].split(" ");
        let row = {};
        for (let c = 0; c < columns.length; c++) {
            row[columns[c].name] = {
                rowid: i,
                colid: c,
                value: null,
                type: "string",
                format: null,
                style: {
                    "text-align": "center", "color": "black"
                }
            };
        }
        row.Name.value = col[0].slice();
        row.Name.style["text-align"] = "left";
        try {
            row.Type.value = col[1].slice();
            row.Type.style["text-align"] = "left";
        }catch (e) {
            row.Type.value = "";
        }
        try {
            row.Nullable.value = ((col[2].toUpperCase() == "NOT" && col[3].toUpperCase() == "NULL") ? "NO" : "YES");
        } catch (e) {
            row.Nullable.value = "YES";
        }
        try {
            row.Default.value = (col[4].toUpperCase() == "DEFAULT" ? col[5] : "");
        } catch (e) {
            row.Default.value = "";
        }
        try {
            row.Index.value = ((col[4].toUpperCase() == "PRIMARY" && col[5].toUpperCase() == "KEY") ? "YES" : "NO");
        } catch (e) {
            row.Index.value = "NO"
        }
        try {
            row.Autoincrement.value = (col[6].toUpperCase() == "AUTOINCREMENT" ? "YES" : "NO");
        } catch (e) {
            row.Autoincrement.value = "NO";
        }
        data.push(row);

    }
    if (indexkey.length > 0) {
        for (let i = 0; i < indexkey.length; i++) {
            let key = indexkey[i].slice().replace(/[\r\n]/g, "").trim();
            for (let t = 0; t < data.length; t++) {
                try {
                    if (data[t]["Name"].value == key) {
                        data[t]["Index"].value = "YES";
                    }
                } catch (e) {
                }
            }
        }
    }
    return {columns: columns, data: data, title: [], type: "text/x-sqlite"};
}

function workbook2blob(sheets, sheetNames) {
    let workbook = {
            SheetNames: [],
            Sheets: {}
        };
    for (let i =0;i <sheets.length;i++) {
        let name;
        try {
            name = sheetNames[i] || 'sheet' + (i + 1);
        } catch (e) {
            name = 'sheet' + (i + 1);
        }
        workbook.SheetNames.push(name);
        workbook.Sheets[name] = XLSX.utils.aoa_to_sheet(sheets[i]);
    }
	// 生成excel的配置项
	let wopts = {
		bookType: 'xlsx',
		bookSST: false,
		type: 'binary'
	};
	let wbout = XLSX.write(workbook, wopts);
	let blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		let buf = new ArrayBuffer(s.length);
		let view = new Uint8Array(buf);
		for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

function appState(title, message) {
    $("time").width = 150;
    $("time").height = 50;
    $("time").title = title;
    let ctx = $("time").getContext("2d");
    ctx.drawImage(__SYS_IMAGES__.getLogoImage(__SYS_IMAGES__.child, 30, 30), 0, 20, 30, 30);
    ctx.save();
    ctx.translate($("time").width / 2, $("time").height / 2);
    ctx.font = '12px Arial';
    ctx.fillStyle = "#FF8000";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';//'middle';
    ctx.fillText(message, 0, 10);
    ctx.restore();
}

function drawClock(data) {
     $("time").title = data;
    let times = data.toString().split("\n")[1].split(":");
    $("time").width = 50;
    $("time").height = 50;
    let ctx = $("time").getContext("2d");

    let clockRadius = Math.min($("time").width / 2, $("time").height / 2);
    let hours = Number(times[0]);
    let minutes = Number(times[1]);
    let seconds = Number(times[2]);

    hours = hours > 12 ? hours - 12 : hours;
    let hour = hours + minutes / 60;
    let minute = minutes + seconds / 60;
    ctx.drawImage(__SYS_IMAGES__.getLogoImage(__SYS_IMAGES__.h24[minutes % 24], 50, 50), 0, 0, 50, 50);
    ctx.save();

    ctx.translate($("time").width / 2, $("time").height / 2);
    ctx.beginPath();

    // draw numbers
    ctx.font = '9px Arial';
    ctx.fillStyle = "lightseagreen";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let n = 1; n <= 12; n++) {
        if (n == 3 || n == 6 || n == 9 || n == 12)
            ctx.fillStyle = "#FF8000";
        else
            ctx.fillStyle = "lightseagreen";
        let theta = (n - 3) * (Math.PI * 2) / 12;
        let x = clockRadius * 0.9 * Math.cos(theta);
        let y = clockRadius * 0.9 * Math.sin(theta);
        ctx.fillText("•", x, y);
    }
    ctx.fillStyle = "lightseagreen";

    ctx.save();
    let theta = (hour - 3) * 2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-1, -1.5);
    ctx.lineTo(-1, 1.5);
    ctx.lineTo(clockRadius * 0.6, 1);
    ctx.lineTo(clockRadius * 0.6, -1);
    ctx.fill();
    ctx.restore();

    // draw minute
    ctx.save();
    theta = (minute - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-1, -1);
    ctx.lineTo(-1, 1);
    ctx.lineTo(clockRadius * 0.7, 0.5);
    ctx.lineTo(clockRadius * 0.7, -0.5);
    ctx.fill();
    ctx.restore();

    // draw second
    ctx.save();
    theta = (seconds - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-7, -1);
    ctx.lineTo(-7, 1);
    ctx.lineTo(clockRadius * 0.8, 0.5);
    ctx.lineTo(clockRadius * 0.8, -0.5);
    ctx.fillStyle = "#FF8000";
    ctx.fill();
    ctx.restore();
    ctx.restore();
}

function initConfigs() {
    let checked = false;
    if (checkStorage()) {
        let message = "初始化系统参数";
        try {
            __LOGS__.init();
            __LOGS__.viewMessage(__VERSION__.name + "\n版本代码:" + __VERSION__.version + "\n发布日期:" + __VERSION__.date);

            let img = getUserConfig("BackgroundImage");
            if (img != null) {
                try {
                    img = JSON.parse(img);
                    document.body.style.backgroundImage = img.image;
                    document.body.style.backgroundRepeat = img.repeat;
                    document.body.style.backgroundSize = img.size;
                    document.body.style.backgroundAttachment = img.attachment;
                } catch (e) {
                }
            }

            $("main-title").appendChild(__SYS_IMAGES__.getLogoImage(__SYS_IMAGES__.logo_echarts));
            $("main-version").innerText = __VERSION__.version;
            $("main-version").title = "发布日期: " + __VERSION__.date + "\n ● ...\n ● " + __VERSION__.comment.splice(__VERSION__.comment.length % 10 + (Math.floor(__VERSION__.comment.length / 10) - 1) * 10).join("\n ● ");
            let copyright = __VERSION__.author + " ☎ " + __VERSION__.tel + " ✉ <a href='mailto:" + __VERSION__.email + "'>" + __VERSION__.email + "</a>";
            setUserConfig("CopyRight", copyright);
            $("copyright").innerHTML = copyright;
            $("footer").style.display = getUserConfig("help");
            $("detail").style.display = getUserConfig("displayLogs");
            if ($("detail").style.display == "none") {
                $("page").onmousemove = function () {
                    let active = 3;
                    if (event.x > getAbsolutePosition($("page")).width - active) {
                        $("detail").style.display = "block";
                        setUserConfig("displayLogs", "block");
                        $("page").onmousemove = null;
                    }
                    resize();
                };
            }
            $("themes").setAttribute("href", getUserConfig("pagethemes") == null ? "themes/default.css" : getUserConfig("pagethemes"));

            let config = getUserConfig("echartsconfig");
            if (config != null) {
                config = JSON.parse(config);
                for (key in config) {
                    try {
                        __ECHARTS__.configs[key].value = config[key];
                    } catch (e) {
                    }
                }
            }

            config = getUserConfig("datasetConfig");
            if (config != null) {
                config = JSON.parse(config);
                for (key in config) {
                    try {
                        __DATASET__.configs[key].value = config[key];
                    } catch (e) {
                    }
                }
            }

            let map = getUserConfig("localMap");
            if (map != null) {
                geoCoordMap.LocalMap = map;
            }
            if (getUserConfig("geoCoordMapCity") != null) {
                let coord = JSON.parse(getUserConfig("geoCoordMapCity"));
                geoCoordMap.City = coord;
            }
            if (getUserConfig("geoCoordMapCustom") != null) {
                let coord = JSON.parse(getUserConfig("geoCoordMapCustom"));
                geoCoordMap.Custom = coord;
            }

            getQRCode($("page"), 90, 90, __VERSION__.url, __SYS_IMAGES__.echo);
            resize();
            __LOGS__.viewMessage(message + "...OK.");
            checked = true;
        } catch (e) {
            __LOGS__.viewMessage(message + "...fails.\n" + e, true);
            checked = false;
        }
    } else {
        alert("当前浏览器不支持Local Storage,建议使用Chrome或Edge浏览器.");
        checked = false;
    }
    return checked;
}

function initMenus() {
    let message = "初始化系统菜单";
    //#######################################
    //初始化数据库菜单
    //#######################################
    try {
        let dbstools = $("sidebar-dbs-tools");

        let crdb = document.createElement("div");
        crdb.type = "div";
        crdb.className = "button";
        crdb.innerText = "新增";
        crdb.id = "create-database";
        crdb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_database));
        let help_crdb = $("help-create-database");
        crdb.onclick = help_crdb.onclick = function () {
            let db = createDatabase();
            setCenterPosition($("page"), db);
        };
        dbstools.appendChild(crdb);
        setTooltip(crdb, "创建数<br>据库");

        let rmdb = document.createElement("div");
        rmdb.type = "div";
        rmdb.className = "button";
        rmdb.innerText = "删除";
        rmdb.id = "delete-database";
        rmdb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.drop_database));
        rmdb.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                alert("请选择数据库.");
                return;
            }
            let r = confirm("确定要删除数据库 " + __CONFIGS__.CURRENT_DATABASE.value.name + " 吗?");
            if (r == true) {
                if (checkStorage()) {
                    if (__CONFIGS__.CURRENT_DATABASE.value != null) {
                        let storage = window.localStorage;
                        let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                        let list = [];
                        for (let i = 0; i < dbs.length; i++) {
                            if (i != __CONFIGS__.CURRENT_DATABASE.index) {
                                list.push(dbs[i]);
                            }
                        }
                        storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(list));
                        viewDatabases();
                        __CONFIGS__.CURRENT_DATABASE.index = 0;
                        __CONFIGS__.CURRENT_DATABASE.value = null;
                        __CONFIGS__.CURRENT_DATABASE.connect = null;
                        __CONFIGS__.CURRENT_TABLE.name = "";
                        __CONFIGS__.CURRENT_TABLE.sql = "";
                        __CONFIGS__.CURRENT_TABLE.structure = [];
                        __CONFIGS__.CURRENT_TABLE.type = "";
                    }
                }
            }
        };
        dbstools.appendChild(rmdb);
        setTooltip(rmdb, "删除<br>数据库");

        let dbinfo = document.createElement("div");
        dbinfo.type = "div";
        dbinfo.className = "button";
        dbinfo.id = "test-button";
        dbinfo.innerText = "调试";
        dbinfo.style.display = "none";
        dbinfo.onclick = function () {

            function test() {
                try {
                   console.log(a[1]);
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            }
            test();
            //##########################################
            //字符串可传输编码转化
            // let a = "2021/00/02 12:12:100";
            // console.log(a.toDatetime("yyyy-MM-dd hh:mm:ss"));

            //##########################################
            //字符串可传输编码转化
            // let a = "yangkai.bj@ccb.com";
            // console.log(a.encode());
            //##########################################
            //图片转base64代码
            // let tb = getImageBase64Code();
            // setCenterPosition($("page"), tb);
            //##########################################

            //存量脚本升级转换
            // try {
            //     let storage = window.localStorage;
            //     let sqllist = {};
            //     if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            //         storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
            //     else {
            //         sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            //     }
            //     for (let name in sqllist) {
            //         let sql;
            //         if (typeof sqllist[name] == "object") {
            //             if (typeof sqllist[name].sql == "undefined" && typeof sqllist[name].time == "undefined") {
            //                 sql = sqllist[name];
            //                 sqllist[name] = {sql: sql, time: getNow()};
            //             }
            //         } else if (typeof sqllist[name] == "string") {
            //             sql = sqllist[name].decode().str2binary();
            //             sqllist[name] = {sql: sql, time: getNow()};
            //         }
            //     }
            //     storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            //     alert("脚本转换完成!")
            // } catch (e) {
            //     alert(e);
            // }
            //##########################################
        };
        dbstools.appendChild(dbinfo);
        setTooltip(dbinfo, "脚本<br>转换");

        let about = document.createElement("div");
        about.type = "div";
        about.className = "button";
        about.id = "about-and-help";
        about.innerText = "帮助";
        about.style.cssFloat = "right";
        about.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.help));
        about.onclick = function () {
            if ($("footer").style.display) {
                if ($("footer").style.display == "block")
                    $("footer").style.display = "none";
                else
                    $("footer").style.display = "block";
            } else
                $("footer").style.display = "none";
            setUserConfig("help", $("footer").style.display);
            resize()
        };
        dbstools.appendChild(about);
        setTooltip(about, "显示或关<br>闭帮助");


        //#######################################
        //初始化数据表菜单
        //#######################################
        let tbstools = $("sidebar-tbs-tools");
        tbstools.innerText = "";
        let crtb = document.createElement("div");
        crtb.type = "div";
        crtb.className = "button";
        crtb.id = "create-table";
        crtb.innerText = "新增";
        crtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_table));
        let help_crtb = $("help-create-table");
        crtb.onclick = help_crtb.onclick = function () {
            let tb = createTable(null);
            setCenterPosition($("page"), tb);
        };
        tbstools.appendChild(crtb);
        setTooltip(crtb, "创建<br>数据表");

        let importtb = document.createElement("div");
        importtb.type = "div";
        importtb.className = "button";
        importtb.innerText = "导入";
        importtb.id = "import-to-table";
        importtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.import));
        let help_importtb = $("help-import-data");
        importtb.onclick = help_importtb.onclick = function () {
            let im = getImportContent();
            setCenterPosition($("page"), im);
        };
        tbstools.appendChild(importtb);
        setTooltip(importtb, "导入<br>外部数据");

        let exConstr = document.createElement("div");
        exConstr.type = "div";
        exConstr.className = "button";
        exConstr.innerText = "结构";
        exConstr.id = "show-table-construct";
        exConstr.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.table_construct));
        exConstr.onclick = function () {
            let result = __CONFIGS__.CURRENT_TABLE.structure;
            result["title"] = [__CONFIGS__.CURRENT_TABLE.name];
            result["sql"] = __CONFIGS__.CURRENT_TABLE.sql;
            result["parameter"] = null;
            result["time"] = getNow();
            __DATASET__.result.push(result);
            __DATASET__.default.sheet = __DATASET__.result.length - 1;
            viewDataset(__DATASET__.default.sheet, 0);
            __LOGS__.viewMessage(__CONFIGS__.CURRENT_TABLE.name + ":\n" + __CONFIGS__.CURRENT_TABLE.sql);
        };
        tbstools.appendChild(exConstr);
        setTooltip(exConstr, "获取数据<br>表结构");

        let rmtb = document.createElement("div");
        rmtb.type = "div";
        rmtb.className = "button";
        rmtb.innerText = "删除";
        rmtb.id = "drop-table";
        rmtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.drop_table));
        rmtb.onclick = function () {
            let r = confirm("确定要删除数据表(视图) " + __CONFIGS__.CURRENT_TABLE.name + " 吗?");
            if (r == true) {
                if (checkStorage()) {
                    __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                        let sql = "drop " + __CONFIGS__.CURRENT_TABLE.type + " " + __CONFIGS__.CURRENT_TABLE.name;
                        __LOGS__.viewMessage(sql);
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
                                __CONFIGS__.CURRENT_TABLE.name = "";
                                __CONFIGS__.CURRENT_TABLE.sql = "";
                                __CONFIGS__.CURRENT_TABLE.structure = [];
                                __CONFIGS__.CURRENT_TABLE.type = "";
                            },
                            function (tx, error) {
                                __LOGS__.viewMessage(error.message);
                            });
                    });
                }
            }
        };
        tbstools.appendChild(rmtb);
        setTooltip(rmtb, "删除当前<br>数据表");

        //#######################################
        //初始化SQL菜单
        //#######################################
        let sqltools = $("sql-tools");
        sqltools.ondblclick = function () {
            __DATASET__.toFullScreen = requestFullScreen($("main"));
        };

        let newsql = document.createElement("div");
        newsql.type = "div";
        newsql.className = "button";
        newsql.innerText = "新建";
        newsql.id = "create-new-sql";
        newsql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_sql));
        let help_createsql = $("help-create-sql");
        newsql.onclick = help_createsql.onclick = function () {
            let openfile = $("open-sql-file");
            openfile.value = "";
            __SQLEDITOR__.title = __ECHARTS__.configs.titleText.value = __ECHARTS__.configs.titleSubText.value = null;
            __SQLEDITOR__.codeMirror.setValue("");
            if (this.id == "help-create-sql") {
                let sql = "/*脚本案例*/\r\n" +
                    "SELECT\r\n" +
                    "* \r\n" +
                    "/*字段列表*/\r\n" +
                    "FROM \r\n" +
                    "{数据表}\r\n" +
                    "ORDER BY 1";
                __SQLEDITOR__.codeMirror.setValue(sql);
            }

        };
        sqltools.appendChild(newsql);
        setTooltip(newsql, "新建<br>脚本");

        let input = document.createElement("input");
        input.type = "file";
        input.id = "open-sql-file";
        input.style.display = "none";
        input.className = "openfile";
        input.onchange = function () {
            if (window.FileReader) {
                try {
                    let file = this.files[0];
                    let reader = new FileReader();
                    reader.onload = function () {
                        __SQLEDITOR__.codeMirror.setValue(this.result);
                        __SQLEDITOR__.title = __ECHARTS__.configs.titleText.value = __ECHARTS__.configs.titleSubText.value = null;
                    };
                    reader.readAsText(file, __SQLEDITOR__.charset.options[__SQLEDITOR__.charset.value]);
                } catch (e) {
                    alert("请选择需要导入的脚本文件.")
                }
            } else {
                showMessage("本应用适用于Chrome浏览器或IE10及以上版本。")
            }
        };
        sqltools.appendChild(input);

        let opensql = document.createElement("div");
        opensql.type = "div";
        opensql.className = "button";
        opensql.innerText = "打开";
        opensql.id = "open-sql";
        opensql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.open_sql));
        let help_opensql = $("help-open-sql");
        opensql.onclick = help_opensql.onclick = function () {
            let tb = storageSqlDialog("", __SQLEDITOR__);
            setCenterPosition($("main"), tb)
        };
        sqltools.appendChild(opensql);
        setTooltip(opensql, "打开<br>脚本");

        let saveto = document.createElement("div");
        saveto.type = "div";
        saveto.className = "button";
        saveto.innerText = "保存";
        saveto.id = "sql-save-to";
        saveto.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.save_sql));
        let help_savesql = $("help-save-sql");
        saveto.onclick = help_savesql.onclick = function () {
            if (__SQLEDITOR__.title == null) {
                let sql = __SQLEDITOR__.codeMirror.getValue();
                let tb = storageSqlDialog(sql, __SQLEDITOR__, "_TO_SAVE_");
                setCenterPosition($("main"), tb)
            } else {
                let name = __SQLEDITOR__.title;
                let res = confirm("您确定覆盖保存脚本 " + name + " 吗?");
                if (res == true) {
                    let sql = __SQLEDITOR__.codeMirror.getValue();
                    if (name != "" && sql != "") {
                        saveStorageSql(name, sql);
                    } else
                        alert("脚本及脚本名称不能为空!");
                }
            }
        };
        sqltools.appendChild(saveto);
        setTooltip(saveto, "保存<br>脚本");

        let loadfile = document.createElement("div");
        loadfile.type = "div";
        loadfile.className = "button";
        loadfile.innerText = "导入";
        loadfile.id = "load-sql-file";
        loadfile.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.load_sql));
        let help_loadsql = $("help-load-sql");
        loadfile.onclick = help_loadsql.onclick = function () {
            $("open-sql-file").click();
        };
        sqltools.appendChild(loadfile);
        setTooltip(loadfile, "导入<br>脚本");

        let saveas = document.createElement("div");
        saveas.type = "div";
        saveas.className = "button";
        saveas.innerText = "导出";
        saveas.id = "sql-save-as";
        saveas.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.unload_sql));
        let help_downloadsql = $("help-download-sql");
        saveas.onclick = help_downloadsql.onclick = function () {
            let title = __SQLEDITOR__.title != null ? __SQLEDITOR__.title.split("_")[0] : prompt("请输入文件名称:");
            if (title != null && title.trim() != "") {
                let blob = null;
                switch (__SQLEDITOR__.options.mode) {
                    case "text/x-sqlite":
                        blob = new Blob([str2ab(__SQLEDITOR__.codeMirror.getValue())], {type: "text/plain"});
                        //application/octet-stream   扩展名:*
                        openDownloadDialog(blob, title + ".sql");
                        break;
                    case "text/javascript":
                        blob = new Blob([str2ab(__SQLEDITOR__.codeMirror.getValue())], {type: "application/x-javascript"});
                        openDownloadDialog(blob, title + ".js");
                        break;
                }
            }
        };
        sqltools.appendChild(saveas);
        setTooltip(saveas, "导出<br>脚本");

        let execsql = document.createElement("div");
        execsql.type = "div";
        execsql.className = "button";
        execsql.innerText = "提交";
        execsql.id = "exec-sql";
        execsql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.execute_sql));
        let help_execsql = $("help-execute-sql");
        execsql.onclick = help_execsql.onclick = function () {
            if (checkStorage()) {
                let selection = "";
                if (__SQLEDITOR__.codeMirror.somethingSelected())
                    selection = __SQLEDITOR__.codeMirror.getSelection();
                else
                    selection = __SQLEDITOR__.codeMirror.getValue();
                let paramdialog = getParamDialog(__SQLEDITOR__.title, selection);
                if (paramdialog != null) {
                    setCenterPosition($("main"), paramdialog)
                } else {
                    if (__SQLEDITOR__.title != null) {
                        let title = __SQLEDITOR__.title.split("_");
                        __ECHARTS__.configs.titleText.value = title[0];
                        if (title.length > 1) {
                            __ECHARTS__.configs.titleSubText.value = title[1];
                        } else {
                            __ECHARTS__.configs.titleSubText.value = "";
                        }
                    }
                    if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                        execute();
                    if (__SQLEDITOR__.options.mode == "text/javascript")
                        executeFunction()
                }
            }
        };
        sqltools.appendChild(execsql);
        setTooltip(execsql, "执行脚本<br>获取数据");

        let datasetSource = document.createElement("select");
        datasetSource.type = "select";
        datasetSource.id = "set-dataset-source";
        datasetSource.style.cssFloat = "left";
        for (m in __SQLEDITOR__.modes) {
            datasetSource.options.add(new Option(m, __SQLEDITOR__.modes[m]));
        }
        try {
            let mode = getUserConfig("editermode");
            if (mode != null) {
                __SQLEDITOR__.options.mode = datasetSource.value = mode;
            } else
                datasetSource.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        datasetSource.onchange = function () {
            __SQLEDITOR__.options.mode = datasetSource.value = this.value;
            __SQLEDITOR__.codeMirror.setOption("mode", this.value);
            setUserConfig("editermode", this.value);
        };
        sqltools.appendChild(datasetSource);
        setTooltip(datasetSource, "编辑器<br>模式");

        let tofull = document.createElement("div");
        sqltools.appendChild(tofull);
        tofull.className = "charButton";
        tofull.innerText = "❏";
        tofull.style.cssFloat = "right";
        tofull.id = "set-editer-to-full";
        tofull.onclick = function () {
            __SQLEDITOR__.codeMirror.setOption("fullScreen", !__SQLEDITOR__.codeMirror.getOption("fullScreen"));
        };
        setTooltip(tofull, "全屏<br>编辑");

        let editorCharset = document.createElement("select");
        editorCharset.type = "select";
        editorCharset.id = "set-editer-chartset";
        for (let i = 0; i < __SQLEDITOR__.charset.options.length; i++) {
            editorCharset.options.add(new Option(__SQLEDITOR__.charset.options[i], i));
        }
        try {
            let charset = getUserConfig("editercharset");
            if (charset != null) {
                __SQLEDITOR__.charset.value = editorCharset.selectedIndex = charset;
            } else
                editorCharset.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        editorCharset.onchange = function () {
            __SQLEDITOR__.charset.value = this.value;
            setUserConfig("editercharset", this.value);
        };
        sqltools.appendChild(editorCharset);
        setTooltip(editorCharset, "导入脚本<br>字符编码");

        //#######################################
        //必须先行实体化编辑器,否则不能预埋参数
        //#######################################
        $("sqlediter").style.width = (getAbsolutePosition($("sqlContainer")).width - 2) + "px";
        __SQLEDITOR__.init($("sqlediter"));

        let setFontSize = document.createElement("select");
        setFontSize.type = "select";
        setFontSize.id = "set-editer-font-size";
        for (let size in __SQLEDITOR__.fontSize.options) {
            setFontSize.options.add(new Option(size, __SQLEDITOR__.fontSize.options[size]));
        }
        setFontSize.style.cssFloat = "right";
        setFontSize.selectedIndex = __SQLEDITOR__.fontSize.default;
        try {
            let fontsize = getUserConfig("editerfontsize");
            if (fontsize != null) {
                setFontSize.value = getUserConfig("editerfontsize");
                let editor = document.getElementsByClassName("CodeMirror")[0];
                editor.style.fontSize = setFontSize.value
            } else
                setFontSize.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        setFontSize.onchange = function () {
            let editor = document.getElementsByClassName("CodeMirror")[0];
            editor.style.fontSize = this.value;
            setUserConfig("editerfontsize", this.value);
        };
        sqltools.appendChild(setFontSize);
        setTooltip(setFontSize, "编辑器<br>字号");

        let editorThemes = document.createElement("select");
        editorThemes.type = "select";
        editorThemes.id = "set-editer-theme";
        for (let theme in __SQLEDITOR__.themes) {
            editorThemes.options.add(new Option(theme));
        }
        try {
            let themename = getUserConfig("editerthemes");
            if (themename != null) {
                editorThemes.value = themename;
                let theme = __SQLEDITOR__.themes[themename];
                $("sqlediterTheme").setAttribute("href", theme.href);
                __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
            } else
                editorThemes.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        editorThemes.onchange = function () {
            let theme = __SQLEDITOR__.themes[this.value];
            $("sqlediterTheme").setAttribute("href", theme.href);
            __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
            setUserConfig("editerthemes", this.value);
        };
        sqltools.appendChild(editorThemes);
        setTooltip(editorThemes, "编辑器<br>主题");

        //#######################################
        //初始化消息菜单
        //#######################################
        let detailtools = $("detail-tools");

        let toDisplay = document.createElement("div");
        toDisplay.type = "div";
        toDisplay.className = "charButton";
        toDisplay.innerHTML = "&#187";//"»";
        toDisplay.id = "display-log";
        toDisplay.onclick = function () {
            if ($("detail").style.display != "none") {
                $("detail").style.display = "none";
                setUserConfig("displayLogs", "none");
                resize();
                $("page").onmousemove = function () {
                    let active = 3;
                    if (event.x > getAbsolutePosition($("page")).width - active) {
                        $("detail").style.display = "block";
                        setUserConfig("displayLogs", "block");
                        $("page").onmousemove = null;
                    }
                    resize();
                };
            }
        };
        detailtools.appendChild(toDisplay);
        setTooltip(toDisplay, "隐藏<br>日志");

        let clean = document.createElement("div");
        clean.type = "div";
        clean.className = "button";
        clean.innerText = "清空";
        clean.id = "clean-log";
        clean.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.clear_logs));
        clean.onclick = function () {
            let msgbox = $("messageBox");
            msgbox.innerHTML = "";
        };
        detailtools.appendChild(clean);
        setTooltip(clean, "清除终<br>端日志");

        let logs = document.createElement("select");
        logs.type = "select";
        logs.id = "log-records";
        logs.options.add(new Option("1000条", 1000));
        logs.options.add(new Option("5000条", 5000));
        logs.options.add(new Option("10000条", 10000));
        logs.options.add(new Option("全部", 0));
        try {
            let re = getUserConfig("pagelogs");
            if (re != null)
                logs.value = getUserConfig("pagelogs");
            else
                logs.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        logs.onchange = function () {
            __CONFIGS__.MAXLOGS = this.value;
            setUserConfig("pagelogs", this.value);
            let msgbox = $("messageBox");
            if (__CONFIGS__.MAXLOGS > 0) {
                while (msgbox.getElementsByClassName("dt").length > __CONFIGS__.MAXLOGS) {
                    msgbox.removeChild(msgbox.getElementsByClassName("dt")[msgbox.getElementsByClassName("dt").length - 1])
                }
            }
        };
        detailtools.appendChild(logs);
        setTooltip(logs, "显示日志<br>记录数");

        let savelogs = document.createElement("select");
        savelogs .type = "select";
        savelogs .id = "save-logs";
        let list = [];
        for(let date in __LOGS__.data){
            list.push(date);
        }
        list.sort(function(a,b){return (new Date(b)) - (new Date(a))});
        //倒序排序
        for(let i=0;i<list.length;i++){
            savelogs .options.add(new Option(list[i], list[i]));
        }
        savelogs.onchange = function () {
            __LOGS__.saveas(this.value);
        };
        detailtools.appendChild(savelogs);
        setTooltip(savelogs, "查阅<br>日志");

        //#######################################
        //初始化数据菜单
        //#######################################
        let datatools = $("data-tools");
        datatools.ondblclick = function () {
            __DATASET__.toFullScreen = requestFullScreen($("main"));
        };

        input = document.createElement("input");
        input.type = "file";
        input.id = "open-echarts-file";
        input.style.display = "none";
        input.className = "openfile";
        input.onchange = function () {
            if (window.FileReader) {
                try {
                    let file = this.files[0];
                    let reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onloadstart = function () {

                    };
                    reader.onload = function () {
                        let reg = new RegExp(/\<code>(.*)\<\/code>/, "g");
                        let codes = this.result.match(reg);
                        if (codes != null) {
                            if (codes.length >= 4) {
                                let ciphertext = codes[0];
                                let hash = codes[1];
                                ciphertext = ciphertext.substring(ciphertext.indexOf("<code>") + 6, ciphertext.indexOf("</code>"));
                                hash = hash.substring(hash.indexOf("<code>") + 6, hash.indexOf("</code>"));
                                if (ciphertext.hex_md5_hash() == hash) {
                                    ciphertext = ciphertext.decode();
                                    try {
                                        let report = JSON.parse(ciphertext);
                                        let container = $("tableContainer");
                                        try {
                                            container.removeAttribute("_echarts_instance_");
                                            echarts.getInstanceByDom(container).dispose();
                                        } catch (e) {
                                        }
                                        __DATASET__.result.push(report.dataset);
                                        __DATASET__.default.sheet = __DATASET__.result.length - 1;
                                        $("open-sql-file").value = "";
                                        $("dataset-select-echarts-theme").value = __ECHARTS__.configs.echartsTheme.value = report.configs.echartsTheme.value;
                                        $("dataset-select-echarts-type").value = __ECHARTS__.configs.echartsType.value = report.configs.echartsType.value;
                                        __SQLEDITOR__.title = __ECHARTS__.configs.titleText.value = __ECHARTS__.configs.titleSubText.value = report.dataset.title[0];
                                        __SQLEDITOR__.codeMirror.setValue(report.dataset.sql);
                                        viewDataset(__DATASET__.default.sheet, 0);
                                        let _width = (getAbsolutePosition(container).width * 1) + "px";
                                        let _height = (getAbsolutePosition(container).height * 1) + "px";
                                        container.innerHTML = "";
                                        let echart = getEcharts(
                                            container,
                                            _width,
                                            _height,
                                            __DATASET__.result[__DATASET__.default.sheet],
                                            report.configs);
                                        setDragNook(container, echart.getAttribute("_echarts_instance_"));
                                        $("open-echarts-file").value = "";
                                        __LOGS__.viewMessage("读取 " + file.name + " ...OK.");
                                    } catch (e) {
                                        __LOGS__.viewError(e);
                                    }
                                } else
                                   __LOGS__.viewMessage(file.name  + " ...校验失败,文件或被篡改.", true);
                            } else {
                                __LOGS__.viewMessage(file.name  + " ...格式错误.", true);
                            }
                        } else {
                            __LOGS__.viewMessage(file.name + " ...格式错误.", true);
                        }
                    }
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            } else {
                showMessage("本应用适用于Chrome或Edge浏览器。")
            }
        };
        datatools.appendChild(input);

        let openEchartsFile = document.createElement("div");
        datatools.appendChild(openEchartsFile);
        openEchartsFile.type = "div";
        openEchartsFile.className = "charButton";
        openEchartsFile.innerText = "✓";
        openEchartsFile.style.cssFloat = "left";
        openEchartsFile.onclick = $("open-html-report").onclick = function () {
            $("open-echarts-file").click();
        };
        setTooltip(openEchartsFile, "打开<br>报表");

        let dataReader = document.createElement("div");
        datatools.appendChild(dataReader);
        dataReader.type = "div";
        dataReader.className = "charButton";
        dataReader.innerText = "⚘";
        dataReader.style.cssFloat = "left";
        dataReader.id = "data-reader";
        dataReader.onclick = $("read-xls-file").onclick = function () {
            let reader = getDataReaderContent();
            setCenterPosition($("main"), reader);
        };
        setTooltip(dataReader, "读取外<br>部数据");

        let datatran = document.createElement("div");
        datatools.appendChild(datatran);
        datatran.className = "charButton";
        datatran.innerHTML = "&#9735";//"☇"
        datatran.id = "dataset-transpose";
        let help_datasettranspose = $("help-dataset-transpose");
        datatran.onclick = help_datasettranspose.onclick = function () {
            if (__DATASET__.result.length > 0) {
                datasetTranspose(__DATASET__.default.sheet);
                viewDataset(__DATASET__.default.sheet, 0);
            }
        };
        setTooltip(datatran, "转置<br>数据");

        let dataslice = document.createElement("div");
        datatools.appendChild(dataslice);
        dataslice.className = "charButton";
        dataslice.innerHTML = "&#9839";//"♯";
        dataslice.id = "dataset-slice";
        let help_datasetslice = $("help-dataset-slice");
        dataslice.onclick = help_datasetslice.onclick = function () {
            if (__DATASET__.result.length > 0) {
                let dataslice = getDataSlice();
                setCenterPosition($("main"), dataslice);
            }
        };
        setTooltip(dataslice, "数据<br>切片");

        let subtotal = document.createElement("div");
        datatools.appendChild(subtotal);
        subtotal.type = "div";
        subtotal.className = "charButton";
        subtotal.innerHTML = "&#931";//"Σ";
        subtotal.id = "dataset-subtotal";
        let help_datasetsubtotal = $("help-dataset-subtotal");
        subtotal.onclick = help_datasetsubtotal.onclick = function () {
            if (__DATASET__.result.length > 0) {
                let subtotal = getSubtotal();
                setCenterPosition($("main"), subtotal);
            }
        };
        setTooltip(subtotal, "分类<br>计算");

        let download = document.createElement("div");
        datatools.appendChild(download);
        download.type = "div";
        download.className = "charButton";
        download.innerHTML = "&#8675";//"⇣";
        download.id = "dataset-download";
        let help_datasetdownload = $("help-dataset-download");
        download.onclick = help_datasetdownload.onclick = function () {
            function removingRedundant(sheetNames) {
                //sheet名称重复处理.
                for (let i = 0; i < sheetNames.length; i++) {
                    let x = 0;
                    for (let t = i + 1; t < sheetNames.length; t++) {
                        if (sheetNames[t] === sheetNames[i]) {
                            x += 1;
                            sheetNames[t] += "(" + x + ")";
                        }
                    }
                }
                return sheetNames;
            }

            function fixFileName(str) {
                //文件名称合法性修正。
                let sts = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];
                for (let i = 0; i < sts.length; i++) {
                    str.replaceAll(sts[i], "");
                }
                return str;
            }

            if (__DATASET__.result.length > 0) {
                let sheets = [];
                let sheetNames = [];
                let comment = [
                    ['Application:', __VERSION__.name],
                    ['Version:', __VERSION__.version + " (" + __VERSION__.date + ")"],
                    ['Creation time:', getNow()],
                    ['Get help from:', __VERSION__.url],
                ];
                if (__DATASET__.configs.reportDownload.value == "current") {
                    let dataset = __DATASET__.result[__DATASET__.default.sheet];
                    comment.push([dataset.type + ":", dataset.sql]);
                    let aoa = [];
                    let columns = dataset["columns"].reduce(function (tmp, column) {
                        tmp.push(column.name);
                        return tmp;
                    }, []);
                    aoa.push(columns);
                    for (let i = 0; i < dataset["data"].length; i++) {
                        let r = dataset["data"][i];
                        let row = [];
                        for (let c = 0; c < columns.length; c++) {
                            row.push(r[columns[c]].value);
                        }
                        aoa.push(row);
                    }
                    sheets.push(aoa);
                    let sheetname = typeof dataset.title == "undefined" ? "Current" :
                        (dataset.title.length == 0 ? "Current" :
                            (dataset.title[dataset.title.length - 1] == "" ? "Current" : dataset.title[dataset.title.length - 1]));
                    sheetNames.push(sheetname);
                    sheets.push(comment);
                    sheetNames.push("Comment");
                    let title = dataset.title.length > 0 ? dataset.title[0] : prompt("请输入文件名称:");
                    if (title.trim() != "")
                        openDownloadDialog(workbook2blob(sheets, removingRedundant(sheetNames)), title + ".xlsx");
                } else if (__DATASET__.configs.reportDownload.value == "all-single") {
                    if (__DATASET__.result.length <= 255) {
                        let res = true;
                        if (__DATASET__.result.length > 3)
                            res = confirm("您确定下载 " + __DATASET__.result.length + " 个工作表吗?");
                        if (res == true) {
                            for (let d = 0; d < __DATASET__.result.length; d++) {
                                let dataset = __DATASET__.result[d];
                                comment.push([dataset.type + ":", dataset.sql]);
                                let aoa = [];
                                let columns = dataset["columns"].reduce(function (tmp, column) {
                                    tmp.push(column.name);
                                    return tmp;
                                }, []);
                                aoa.push(columns);
                                for (let i = 0; i < dataset["data"].length; i++) {
                                    let r = dataset["data"][i];
                                    let row = [];
                                    for (let c = 0; c < columns.length; c++) {
                                        row.push(r[columns[c]].value);
                                    }
                                    aoa.push(row);
                                }
                                sheets.push(aoa);
                                let sheetname = typeof dataset.title == "undefined" ? "Sheet" + (d + 1) :
                                    (dataset.title.length == 0 ? "Sheet" + (d + 1) :
                                        (dataset.title[dataset.title.length - 1] == "" ? "Sheet" + (d + 1) : fixFileName(dataset.title[dataset.title.length - 1])));
                                sheetNames.push(sheetname);
                            }
                            sheets.push(comment);
                            sheetNames.push("Comment");
                            let title = prompt("请输入文件名称:");
                            if (title != null && title.trim() != "")
                                openDownloadDialog(workbook2blob(sheets, removingRedundant(sheetNames)), fixFileName(title) + ".xlsx");
                        }
                    } else
                        alert("一个工作簿最多允许有255个数据表!");
                } else if (__DATASET__.configs.reportDownload.value == "all-multi") {
                    if (__DATASET__.result.length <= 255) {
                        let res = true;
                        if (__DATASET__.result.length > 3)
                            res = confirm("您确定下载 " + __DATASET__.result.length + " 个工作簿吗?");
                        if (res == true) {
                            for (let d = 0; d < __DATASET__.result.length; d++) {
                                sheets = [];
                                sheetNames = [];
                                let dataset = __DATASET__.result[d];
                                comment = [
                                    ['Application:', __VERSION__.name],
                                    ['Version:', __VERSION__.version + " (" + __VERSION__.date + ")"],
                                    ['Creation time:', getNow()],
                                    ['Get help from:', __VERSION__.url],
                                    [dataset.type + ":", dataset.sql]
                                ];
                                let aoa = [];
                                let columns = dataset["columns"].reduce(function (tmp, column) {
                                    tmp.push(column.name);
                                    return tmp;
                                }, []);
                                aoa.push(columns);
                                for (let i = 0; i < dataset["data"].length; i++) {
                                    let r = dataset["data"][i];
                                    let row = [];
                                    for (let c = 0; c < columns.length; c++) {
                                        row.push(r[columns[c]].value);
                                    }
                                    aoa.push(row);
                                }
                                sheets.push(aoa);
                                let sheetname = typeof dataset.title == "undefined" ? "Sheet" + (d + 1) :
                                    (dataset.title.length == 0 ? "Sheet" + (d + 1) :
                                        (dataset.title[dataset.title.length - 1] == "" ? "Sheet" + (d + 1) : fixFileName(dataset.title[dataset.title.length - 1])));
                                sheetNames.push(sheetname);
                                sheets.push(comment);
                                sheetNames.push("Comment");
                                openDownloadDialog(workbook2blob(sheets, removingRedundant(sheetNames)), sheetname + ".xlsx");
                                if (d < (__DATASET__.result.length - 1)) {
                                    let delay = (aoa.length * columns.length) >= 10000 ? (aoa.length * columns.length / 10000) : 1;
                                    sleep(__DATASET__.configs.reportDownloadDelay.value * delay);
                                }
                            }
                        }
                    } else
                        alert("同时下载的工作簿个数不允许超过255个!");
                }
            }
        };
        setTooltip(download, "下载<br>数据集");

        let remove = document.createElement("div");
        datatools.appendChild(remove);
        remove.type = "div";
        remove.className = "charButton";
        remove.innerHTML = "&#10007";//"✗";
        remove.id = "dataset-remove";
        let help_datasetremove = $("help-dataset-remove");
        remove.onclick = help_datasetremove.onclick = function () {
            if (__DATASET__.result.length > 0) {
                __DATASET__.result.splice(__DATASET__.default.sheet, 1);
                if (__DATASET__.default.sheet >= __DATASET__.result.length)
                    __DATASET__.default.sheet = __DATASET__.result.length - 1;

                if (__DATASET__.result.length > 0) {
                    viewDataset(__DATASET__.default.sheet, 0);
                } else {
                    $("tableContainer").innerText = "";
                    __DATASET__.default.tab = 0;
                    setDataPageTools(0);
                }
            }
        };
        setTooltip(remove, "删除<br>数据集");

        let removeall = document.createElement("div");
        datatools.appendChild(removeall);
        removeall.type = "div";
        removeall.className = "charButton";
        removeall.innerHTML = "&#9850";//"♻";
        removeall.id = "dataset-removeall";
        removeall.onclick = function () {
            if (__DATASET__.result.length > 0) {
                __DATASET__.result = [];
                __DATASET__.default.tab = 0;
                $("tableContainer").innerText = "";
                setDataPageTools(0);
            }
        };
        setTooltip(removeall, "删除所有<br>数据集");

        let fileSecurity = document.createElement("div");
        datatools.appendChild(fileSecurity);
        fileSecurity.type = "div";
        fileSecurity.className = "charButton";
        fileSecurity.innerText = "☍";
        fileSecurity.onclick = $("file-security").onclick = function () {
            setCenterPosition($("main"), getFileSecurity());
        };
        setTooltip(fileSecurity, "文件加密<br>解密");

        let datasetSetting = document.createElement("div");
        datatools.appendChild(datasetSetting);
        datasetSetting.type = "div";
        datasetSetting.className = "charButton";
        datasetSetting.innerText = "┅";
        datasetSetting.id = "dataset-setting";
        datasetSetting.onclick = function () {
            let configs = __DATASET__.getDatasetConfigs($("tableContainer"));
            setCenterPosition($("main"), configs);

        };
        setTooltip(datasetSetting, "报表<br>设置");

        let analysis = document.createElement("div");
        analysis.style.display = "none";
        datatools.appendChild(analysis);
        analysis.className = "button";
        analysis.innerText = "Analysis";
        analysis.style.cssFloat = "left";
        analysis.id = "Analysis";
        analysis.onclick = function () {
            let dataset = __DATASET__.result[__DATASET__.default.sheet];
            let columns = [];
            let data = [];
            for (let i = 0; i < dataset["columns"].length; i++) {
                columns.push(dataset["columns"][i].name);
            }
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                let row = [];
                for (let c = 0; c < columns.length; c++) {
                    row.push(r[columns[c]].value);
                }
                data.push(row);
            }
            let storage = window.localStorage;
            storage.setItem(__CONFIGS__.STORAGE.DATASET, JSON.stringify({
                "columns": columns,
                "data": data,
                "title": "Web SQLite DataView",
                "sub": "Developer: Yangkai"
            }));
            window.open("analysis.html");
        };
        setTooltip(analysis, "Analysis");

        let toMultiEcharts = document.createElement("div");
        datatools.appendChild(toMultiEcharts);
        toMultiEcharts.className = "charButton";
        toMultiEcharts.innerText = "☶";
        toMultiEcharts.style.cssFloat = "right";
        toMultiEcharts.id = "dataset-to-multi-echarts";
        toMultiEcharts.onclick = $("help-dataset-to-multi-echarts").onclick = function () {
            $("page").appendChild(getMultiEcharts());
        };
        toMultiEcharts.ondragenter = function (event) {
            if (event.target.id == "dataset-to-multi-echarts") {
                event.target.style.border = "1px dotted red";
            }
        };
        toMultiEcharts.ondragover = function (event) {
            if (event.target.id == "dataset-to-multi-echarts") {
                event.preventDefault();
            }
        };
        toMultiEcharts.ondrop = function (event) {
            if (event.target.id == "dataset-to-multi-echarts") {
                event.target.style.border = "0px dotted var(--main-border-color)";
                let id = event.dataTransfer.getData("Text");
                __ECHARTS__.sets.add(id);
            }
        };
        toMultiEcharts.ondragleave = function (event) {
            if (event.target.id == "dataset-to-multi-echarts") {
                event.target.style.border = "1px dotted var(--main-border-color)";
            }
        };
        setTooltip(toMultiEcharts, "视图<br>组合");

        let toecharts = document.createElement("div");
        datatools.appendChild(toecharts);
        toecharts.className = "charButton";
        toecharts.innerText = "❏";
        toecharts.style.cssFloat = "right";
        toecharts.id = "dataset-to-echarts";
        toecharts.onclick = function () {
            try {
                let mecharts = document.createElement("div");
                mecharts.className = "echarts";
                mecharts.id = "echarts-full-screen";
                mecharts.style.width = (getAbsolutePosition($("page")).width + 10) + "px";
                mecharts.style.height = (getAbsolutePosition($("page")).height + 25) + "px";
                mecharts.style.top = "0px";
                mecharts.style.left = "0px";
                window.addEventListener("keydown", function (e) {
                    //keypress无法获取Esc键值,keydown和keyup可以.
                    let keycode = e.which || e.keyCode;
                    if (keycode == 27) {
                        if ($("echarts-full-screen") != null) {
                            try {
                                echarts.getInstanceByDom($("echarts-full-screen")).dispose();
                            } catch (e) {
                            }
                            $("echarts-full-screen").parentElement.removeChild($("echarts-full-screen"));
                        }
                    }
                });
                let echart = getEcharts(
                    mecharts,
                    (getAbsolutePosition($("page")).width + 5) + "px",
                    (getAbsolutePosition($("page")).height + 20) + "px",
                    __DATASET__.result[__DATASET__.default.sheet],
                    __ECHARTS__.configs);
                setDragNook(mecharts, echart.getAttribute("_echarts_instance_"));
                $("page").appendChild(mecharts);
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        setTooltip(toecharts, "显示<br>大视图");

        let toconfigs = document.createElement("div");
        datatools.appendChild(toconfigs);
        toconfigs.className = "charButton";
        toconfigs.innerText = "┅";
        toconfigs.style.cssFloat = "right";
        toconfigs.id = "dataset-to-configs";
        let help_echartsConfigs = $("help-select-echarts-configs");
        toconfigs.onclick = help_echartsConfigs.onclick = function () {
            let configs = __ECHARTS__.getEchartsConfigs($("tableContainer"));
            setCenterPosition($("main"), configs);
        };
        setTooltip(toconfigs, "更多图<br>形参数");

        let echartsThemes = document.createElement("select");
        echartsThemes.className = "select";
        echartsThemes.type = "select";
        echartsThemes.id = "dataset-select-echarts-theme";
        let help_echartsThemes = $("help-select-echarts-themes");
        for (let i = 0; i < __ECHARTS__.configs.echartsTheme.options.length; i++) {
            let option = __ECHARTS__.configs.echartsTheme.options[i];
            echartsThemes.options.add(new Option(option.innerText, option.value));
            help_echartsThemes.options.add(new Option(option.innerText, option.value));
        }
        echartsThemes.value = help_echartsThemes.value = __ECHARTS__.configs.echartsTheme.value;
        echartsThemes.onchange = help_echartsThemes.onchange = function () {
            try {
                __ECHARTS__.configs.echartsTheme.value = this.value;
                let config = {};
                for (let key in __ECHARTS__.configs) {
                    config[key] = __ECHARTS__.configs[key].value;
                }
                setUserConfig("echartsconfig", JSON.stringify(config));

                let container = $("tableContainer");
                try {
                    container.removeAttribute("_echarts_instance_");
                    echarts.getInstanceByDom(container).dispose();
                } catch (e) {
                }
                let _width = (getAbsolutePosition(container).width * 1) + "px";
                let _height = (getAbsolutePosition(container).height * 1) + "px";
                container.innerHTML = "";
                let echart = getEcharts(
                    container,
                    _width,
                    _height,
                    __DATASET__.result[__DATASET__.default.sheet],
                    __ECHARTS__.configs);
                setDragNook(container, echart.getAttribute("_echarts_instance_"));
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        datatools.appendChild(echartsThemes);
        setTooltip(echartsThemes, "视图<br>主题");

        let echartsType = document.createElement("select");
        echartsType.type = "select";
        echartsType.id = "dataset-select-echarts-type";
        let help_echartsType = $("help-select-echarts-type");
        for (let i = 0; i < __ECHARTS__.configs.echartsType.options.length; i++) {
            let option = __ECHARTS__.configs.echartsType.options[i];
            echartsType.options.add(new Option(option.innerText, option.value));
            help_echartsType.options.add(new Option(option.innerText, option.value));
        }
        echartsType.value = help_echartsType.value = __ECHARTS__.configs.echartsType.value;
        echartsType.onchange = help_echartsType.onchange = function () {
            try {
                __ECHARTS__.configs.echartsType.value = this.value;
                let config = {};
                for (let key in __ECHARTS__.configs) {
                    config[key] = __ECHARTS__.configs[key].value;
                }
                setUserConfig("echartsconfig", JSON.stringify(config));

                let container = $("tableContainer");
                try {
                    container.removeAttribute("_echarts_instance_");
                    echarts.getInstanceByDom(container).dispose();
                } catch (e) {
                }
                let _width = (getAbsolutePosition(container).width * 1) + "px";
                let _height = (getAbsolutePosition(container).height * 1) + "px";
                container.innerHTML = "";
                let echart = getEcharts(
                    container,
                    _width,
                    _height,
                    __DATASET__.result[__DATASET__.default.sheet],
                    __ECHARTS__.configs);
                setDragNook(container, echart.getAttribute("_echarts_instance_"));
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        datatools.appendChild(echartsType);
        setTooltip(echartsType, "视图<br>类型");

        let echarts = document.createElement("div");
        datatools.appendChild(echarts);
        echarts.className = "button";
        echarts.innerText = "视图";
        echarts.style.cssFloat = "right";
        echarts.id = "dataset-to-charts";
        echarts.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.echarts));
        let help_echarts = $("help-dataset-echarts");
        echarts.onclick = help_echarts.onclick = function () {
            try {
                let container = $("tableContainer");
                try {
                    container.removeAttribute("_echarts_instance_");
                    echarts.getInstanceByDom(container).dispose();
                } catch (e) {
                }
                let dataset = __DATASET__.result[__DATASET__.default.sheet];
                if (dataset.title.length != 0) {
                    __ECHARTS__.configs.titleText.value = dataset.title[0];
                    if (dataset.title.length > 1) {
                        __ECHARTS__.configs.titleSubText.value = dataset.title.slice(1).join(" ");
                    } else {
                        __ECHARTS__.configs.titleSubText.value = "";
                    }
                }

                let _width = (getAbsolutePosition(container).width * 1) + "px";
                let _height = (getAbsolutePosition(container).height * 1) + "px";
                container.innerHTML = "";
                let echart = getEcharts(
                    container,
                    _width,
                    _height,
                    dataset,
                    __ECHARTS__.configs);
                setDragNook(container, echart.getAttribute("_echarts_instance_"));
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        setTooltip(echarts, "绘制<br>视图");

        //其他工具
        $("image-base64").onclick = function () {
            setCenterPosition($("page"), getImageBase64Code());
        };
        __LOGS__.viewMessage(message + "...OK.");
    } catch (e) {
        __LOGS__.viewMessage(message + "...fails.\n" + e, true);
    }
}

function init() {
    if (initConfigs()) {
        sleep(100);
        initMenus();
        sleep(100);
        setPageThemes();
        sleep(100);
        viewDatabases();
        sleep(100);
        setDataPageTools(0);
        window.onresize = function () {
            resize();
        };

        try {
            //Worker需要在服务器上运行
            if (typeof(Worker) !== "undefined") {
                appState("服务器运行.", "Web service •••");
                let worker = new Worker("time.js");
                worker.onmessage = function (event) {
                    let message = JSON.parse(event.data);
                    switch (message.type) {
                        case "time":
                            drawClock(message.value);
                            break;
                        case "certificate":
                            if (__XMLHTTP__.checking.certificated == false)
                                __XMLHTTP__.certificate(true);
                            break;
                    }
                }
            }
            else {
                //worker.terminate();
                //worker = undefined;
                appState("本地运行.", "Local file •••");
                if (__XMLHTTP__.checking.certificated == false)
                    __XMLHTTP__.certificate(false);
            }
        } catch (e) {
            appState("本地运行.", "Local file •••");
            if (__XMLHTTP__.checking.certificated == false)
                __XMLHTTP__.certificate(false);
        }
    }
    //#########################body init end#######################################
}

function getQRCode(parent,width,height,text,logoImage) {
    try {
        let qr = document.createElement("div");
        qr.id = qr.className = "qrcode";
        parent.appendChild(qr);
        qr.style.width = width + "px";
        qr.style.height = height + "px";
        qr.style.top = (getAbsolutePosition(parent).height - height + 5) + "px";
        qr.style.left = (getAbsolutePosition(parent).width - width - 10) + "px";
        let logo = __SYS_IMAGES__.getLogoImage(logoImage);
        logo.id = "qrcode_logo";
        logo.style.width = width / 4.0 + "px";
        logo.style.height = width / 4.0 * (logoImage.width / logoImage.height) + "px";
        logo.style.marginLeft = (width - width / 4.0) / 2 + "px";
        logo.style.marginTop = (height - width / 4.0 * (logoImage.width / logoImage.height)) / 2 + "px";
        qr.appendChild(logo);

        new QRCode("qrcode", {
            text: text,
            width: width,
            height: height,
            colorDark: "#000000",
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (e) {
        __LOGS__.viewError(e);
    }
}

function getBrowserSize(){
    let winWidth = 0;
    let winHeight = 0;
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }

    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }
    return {
        width: winWidth,
        height: winHeight
    };
};
function resize() {
    //#######################################
    //由于使用百分比设置节点大小容易造成屏幕跳动，将节点大小调整为绝对值.
    //#######################################
    $("page").style.width = (getBrowserSize().width - 10) + "px";
    $("page").style.height = (getBrowserSize().height - 30) + "px";
    $("header").style.width = $("footer").style.width = (getBrowserSize().width - 15) + "px";
    $("MainContainer").style.height = (getBrowserSize().height - getAbsolutePosition($("header")).height - getAbsolutePosition($("footer")).height - 32) + "px";
    $("main").style.width = (getBrowserSize().width - getAbsolutePosition($("sidebar")).width - getAbsolutePosition($("detail")).width - 15) + "px";
    $("tableContainer").style.height = (getAbsolutePosition($("main")).height -
        getAbsolutePosition($("sql-tools")).height -
        getAbsolutePosition($("sqlContainer")).height -
        getAbsolutePosition($("data-tools")).height -
        getAbsolutePosition($("data-page-tools")).height - 5) + "px";
    $("sidebar-tbs").style.height = (getAbsolutePosition($("sidebar")).height -
        getAbsolutePosition($("sidebar-dbs-tools")).height -
        getAbsolutePosition($("sidebar-dbs")).height -
        getAbsolutePosition($("sidebar-tbs-tools")).height) + "px";
    $("messageContainer").style.height = (getAbsolutePosition($("detail")).height -
        getAbsolutePosition($("detail-tools")).height) + "px";

    $("qrcode").style.top = (getAbsolutePosition($("page")).height - getAbsolutePosition($("qrcode")).height + 5) + "px";
    $("qrcode").style.left = (getAbsolutePosition($("page")).width - getAbsolutePosition($("qrcode")).width - 10) + "px";
}

function isScroll(el) {
     //检查节点是否 出现滚动条
    let elems = el ? [el] : [document.documentElement, document.body];
    let scrollX = false, scrollY = false;
    for (let i = 0; i < elems.length; i++) {
        let o = elems[i];
        // test horizontal
        let sl = o.scrollLeft;
        o.scrollLeft += (sl > 0) ? -1 : 1;
        o.scrollLeft !== sl && (scrollX = scrollX || true);
        o.scrollLeft = sl;
        // test vertical
        let st = o.scrollTop;
        o.scrollTop += (st > 0) ? -1 : 1;
        o.scrollTop !== st && (scrollY = scrollY || true);
        o.scrollTop = st;
    }
    // ret
    return {
        scrollX: scrollX,
        scrollY: scrollY
    };
 }

function readExcelFile(file) {
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
        let selectDataSet = $("SelectedDataSet");
        for (let i = 0; i < sheetNames.length; i++) {
            let worksheet = workbook.Sheets[sheetNames[i]];
            let csv = XLSX.utils.sheet_to_csv(worksheet);
            __IMPORT__.SourceFile.data.push(csv);
            selectDataSet.options.add(new Option(sheetNames[i], i));
            //return csv;
        }
        __IMPORT__.SelectedDataSet.value = selectDataSet.selectedIndex = 0;
    };
    try {
        reader.readAsBinaryString(file);
    } catch (e) {
        reader.readAsArrayBuffer(file);
        rABS = false;
    }
}

function getSubtotal(colid) {
    let dataset = __DATASET__.result[__DATASET__.default.sheet];
    let columns = [];
    for (let i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    let container = document.createElement("div");
    container.id = "subtotal-Content";
    container.className = "subtotal-Content";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 分类计算";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let d = document.createElement("div");
    container.appendChild(d);
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
    if (typeof colid != "undefined") {
        cols.selectedIndex = colid + 1;
    }
    d.appendChild(cols);

    let tableContent = document.createElement("div");
    tableContent.className = "scroll-Content";
    container.appendChild(tableContent);

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
    container.appendChild(d);
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

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let add = document.createElement("div");
    add.className = "button";
    add.innerText = "增加";
    add.onclick = function () {
        let table = $("subtotal-dialog-table");
        table.appendChild(addSubtotal(columns, table.getElementsByTagName("tr").length - 1));
    };
    tool.appendChild(add);

    let del = document.createElement("div");
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
            alert("至少保留一个统计对象.");
        }
    };
    tool.appendChild(del);

    let confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function () {
        let merge = $("subtotal_merge").checked;
        let column = $("subtotal_groupby").value;
        let obj = document.getElementsByClassName("subtotal_object");
        let typ = document.getElementsByClassName("subtotal_type");
        let columns = [];
        let data = [];
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
                __DATASET__.result.push(subtotal(column, target, typ[i].value));
        }
        if (merge) {
            let title = __DATASET__.result[__DATASET__.default.sheet].title;
            //title.push("SUBTOTAL");
            __DATASET__.result.push({
                columns: columns,
                data: data,
                title: title,
                sql: __DATASET__.result[__DATASET__.default.sheet].sql,
                type: __DATASET__.result[__DATASET__.default.sheet].type,
                parameter: __DATASET__.result[__DATASET__.default.sheet].title.parameter,
                time: getNow()
            });
        }
        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.result.length - 1, 0);
        }

        $("subtotal-Content").parentNode.removeChild($("subtotal-Content"));
    };
    tool.appendChild(confirm);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("subtotal-Content").parentNode.removeChild($("subtotal-Content"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

function addSubtotal(columns,i) {
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
        {name:"计数",value:"COUNT"},
        {name:"数字计数",value:"NUMCOUNT"},
        {name:"求和",value:"SUM"},
        {name:"最小值",value:"MIN"},
        {name:"最大值",value:"MAX"},
        {name:"算术平均",value:"AVERAGE"},
        {name:"中位数",value:"MEDIAN"},
        {name:"方差",value:"VARIANCE"},
        {name:"标准差",value:"STDEV"},
        {name:"标准误差",value:"STERR"},
        {name:"全距",value:"RANGE"}
        ];
    for (let c = 0; c < methods.length; c++) {
        ways.options.add(new Option(methods[c].name, methods[c].value));
    }
    tr.appendChild(td);
    td.appendChild(ways);
    return tr;
}

function getParamDialog(titles, sql) {
    let reg = new RegExp(/\{[\[\]\:\,\;\-\"\'a-zA-Z0-9\u4e00-\u9fa5]+\}/, "g");
    let params = sql.match(reg);
    if (params != null) {
        //参数去重
        let temp = [];
        for (let i = 0; i < params.length; i++) {
            if (temp.indexOf(params[i]) === -1)
                temp.push(params[i]);
        }
        params = temp.slice(0);

        let container = document.createElement("div");
        container.id = container.className = "sql-param-dialog";

        let title = document.createElement("div");
        title.className = "container-title";
        let span = document.createElement("span");
        span.className = span.id = "sql-param-title";
        span.innerHTML = (titles == null ? "●" : "● " + titles.split("_")[0]);
        if (titles != null) {
            if (titles.split("_").length > 1)
                span.title = titles.split("_").join("\n● ");
        }
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        close.className = "container-close";
        title.appendChild(close);
        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        for (let i = 0; i < params.length; i++) {
            let item = document.createElement("div");
            item.className = "sql-param-dialog-item";
            container.appendChild(item);

            let param = params[i].toString().substring(params[i].indexOf("{") + 1, params[i].indexOf("}"));

            let itemname = document.createElement("span");
            itemname.className = "sql-param-dialog-name";
            itemname.innerHTML = param + " : ";
            item.appendChild(itemname);

            let itemvalue = document.createElement("input");
            itemvalue.className = "sql-param-dialog-value";
            itemvalue.setAttribute("param", param);
            if (typeof __SQLEDITOR__.parameter[param] != "undefined")
                itemvalue.value = __SQLEDITOR__.parameter[param];
            item.appendChild(itemvalue);
        }

        let br = document.createElement("hr");
        br.className = "br";
        container.appendChild(br);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        container.appendChild(tool);

        let confirm = document.createElement("div");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let param = {};
            let params = document.getElementsByClassName("sql-param-dialog-value");
            for (let i = 0; i < params.length; i++) {
                if (params[i].value != null)
                    param[params[i].getAttribute("param")] = params[i].value;
            }
            __SQLEDITOR__.parameter = param;
            if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                execute();
            if (__SQLEDITOR__.options.mode == "text/javascript")
                executeFunction();
            $("sql-param-dialog").parentNode.removeChild($("sql-param-dialog"));
        };
        tool.appendChild(confirm);

        let cancel = document.createElement("div");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = close.onclick = function () {
            $("sql-param-dialog").parentNode.removeChild($("sql-param-dialog"));
        };
        tool.appendChild(cancel);

        setDialogDrag(title);

        return container;
    } else {
        return null
    }
}

function getDataSlice() {
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
        let type = __DATASET__.result[setid].type;
        if (groupvalue != null)
            title.push(groupvalue);
        //else
        //    title.push("result of data slicing");
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
        __DATASET__.result.push({
            title: title,
            sql: sql,
            type: type,
            parameter: parameter,
            columns: col_tmp,
            data: dataset,
            time: getNow()
        });
    }

    let container = document.createElement("div");
    container.id = "data-slice-Content";
    container.className = "data-slice-Content";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 数据切片";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let tableContent =document.createElement("div");
    tableContent.className = "scroll-Content";
    container.appendChild(tableContent);

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
    check.onclick = function(){
        let columns = $("data-slice-table").getElementsByClassName("data-slice-column-check");
        for (let i=0;i<columns.length;i++){
            columns[i].checked = this.checked;
            this.checked?columns[i].setAttribute("checked", "checked"):columns[i].removeAttribute("checked");
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
    container.appendChild(d);
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

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);
    let confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function () {
        let cols = $("data-slice-table").getElementsByClassName("data-slice-column-check");
        let begin = Number($("data-slice-range-begin").value) - 1;
        let end = Number($("data-slice-range-end").value) - 1;
        let groupby = $("data-slice-groupby").value;
        let groups = [];
        let setid = __DATASET__.default.sheet;
        if (groupby != "none"){
            groups = getGroups(setid, begin, end, groupby);
        }
        if (groups.length>0) {
            for (let g = 0; g < groups.length; g++) {
                dataSlice(setid, cols,begin,end, groupby ,groups[g]);
            }
        } else
            dataSlice(setid, cols, begin, end, "none", null);

        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.result.length - 1, 0);
        }
        $("data-slice-Content").parentNode.removeChild($("data-slice-Content"));
    };
    tool.appendChild(confirm);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("data-slice-Content").parentNode.removeChild($("data-slice-Content"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

function getDataFilter(colid) {
    let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
    let data = __DATASET__.result[__DATASET__.default.sheet].data;

    let container = document.createElement("div");
    container.id = "data-filter-Content";
    container.className = "data-filter-Content";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 筛选字段 [ " + columns[Number(colid)].name + " ]";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let tableContent =document.createElement("div");
    tableContent.className = "scroll-Content";
    container.appendChild(tableContent);

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
    check.onclick = function(){
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (let i=0;i<filters.length;i++){
            filters[i].checked = this.checked;
            this.checked?filters[i].setAttribute("checked", "checked"):filters[i].removeAttribute("checked");
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
        for(let v=0;v<values.length;v++){
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

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let checknone = document.createElement("div");
    checknone.className = "button";
    checknone.innerText = "反选";
    checknone.onclick = function(){
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (let i=0;i<filters.length;i++){
            if (filters[i].checked) {
                filters[i].checked = false;
                filters[i].removeAttribute("checked");
            } else {
                filters[i].checked = true;
                filters[i].setAttribute("checked","checked");
            }
        }
    };
    tool.appendChild(checknone);

    let confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function() {
        let values = [];
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (let i=0;i<filters.length;i++){
            if (filters[i].checked == true)
                values.push(filters[i].getAttribute("value"))
        }
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        let dataset = [];

        let rowid = 0;
        let data = __DATASET__.result[__DATASET__.default.sheet].data;
        let title =  __DATASET__.result[__DATASET__.default.sheet].title;
        let sql = __DATASET__.result[__DATASET__.default.sheet].sql;
        let type = __DATASET__.result[__DATASET__.default.sheet].type;
        let parameter = __DATASET__.result[__DATASET__.default.sheet].parameter;
        let column = columns[Number(colid)].name;
        for (let i=0; i<data.length;i++) {
            let row = data[i];
            for (let v=0;v<values.length;v++){
                if (row[column].value == values[v]){
                    let r ={};
                    for(let col in row){
                        let cell = row[col];
                        cell.rowid = rowid;
                        r[col] = cell;
                    }
                    dataset.push(r);
                    rowid ++;
                    break;
                }
            }
        }
        //title.push("result of Data filter");
        __DATASET__.result.push({
            title: title,
            sql: sql,
            type: type,
            parameter: parameter,
            columns: columns,
            data: dataset,
            time: getNow()
        });
        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.result.length - 1, 0);
        }

        $("data-filter-Content").parentNode.removeChild($("data-filter-Content"));
    };
    tool.appendChild(confirm);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("data-filter-Content").parentNode.removeChild($("data-filter-Content"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

function getColumnMenu(colid) {
    let ul = document.createElement("ul");
    ul.id = "table-column-menu-" + colid;
    ul.className = "table-column-menu";
    ul.onmouseleave = function(){
        this.style.display = "none";
    };

    let li = document.createElement("li");
    li.id = "table-column-menu-filter";
    li.innerHTML = "&emsp;● 筛选";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        if (__DATASET__.result.length > 0) {
            let datafilter = getDataFilter(this.getAttribute("colid"));
            setCenterPosition($("main"),datafilter);
        }
    };
    ul.appendChild(li);

    li = document.createElement("li");
    li.id = "table-column-menu-formater";
    li.innerHTML = "&emsp;● 格式";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        let formater = getFormat(this.getAttribute("colid"));
        setCenterPosition($("main"),formater);
    };
    ul.appendChild(li);

    li = document.createElement("li");
    li.id = "table-column-menu-subtotal";
    li.innerHTML = "&emsp;● 分类计算";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        let subtotal = getSubtotal(Number(this.getAttribute("colid")));
        setCenterPosition($("main"),subtotal);
    };
    ul.appendChild(li);

    return ul;
}

function getFormat(colid) {
    let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
    let style = {};
    try {
        style = __DATASET__.result[__DATASET__.default.sheet].data[0][columns[Number(colid)].name].style;
    }catch (e) {
    }

    let container = document.createElement("div");
    container.id = "table-data-format";
    container.className = "table-data-format";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 格式设置 [ " + columns[Number(colid)].name + " ]";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let items = document.createElement("div");
    items.className = "scroll-Content";
    container.appendChild(items);

    let item = document.createElement("div");
    item.className = "table-data-format-item";
    items.appendChild(item);
    let name = document.createElement("span");
    name.innerText = "对齐 : ";
    item.appendChild(name);
    let param = document.createElement("select");
    param.className = "format-set";
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
    item.className = "table-data-format-item";
    items.appendChild(item);
    name = document.createElement("span");
    name.innerText = "颜色 : ";
    item.appendChild(name);
    param = document.createElement("input");
    param.className = "format-set";
    param.id = "color";
    param.type = "color";
    param.value = style[param.id];
    item.appendChild(param);
    items.appendChild(item);

    item = document.createElement("div");
    item.className = "table-data-format-item";
    items.appendChild(item);
    name = document.createElement("span");
    name.innerText = "字号 : ";
    item.appendChild(name);
    param = document.createElement("select");
    param.className = "format-set";
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
    item.className = "table-data-format-item";
    items.appendChild(item);
    name = document.createElement("span");
    name.innerText = "样式 : ";
    item.appendChild(name);
    param = document.createElement("select");
    param.className = "format-set";
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
    item.className = "table-data-format-item";
    items.appendChild(item);
    name = document.createElement("span");
    name.innerText = "加粗 : ";
    item.appendChild(name);
    param = document.createElement("select");
    param.className = "format-set";
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

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function() {
        let param = $("table-data-format").getElementsByClassName("format-set");
        let format = {};
        for(let i=0;i<param.length;i++){
            format[param[i].id] = param[i].value;
        }
        let data = __DATASET__.result[__DATASET__.default.sheet].data;
        for(let i =0;i<data.length;i++){
            let row = data[i]
            for (let col in row){
                if (row[col].colid == Number(colid))
                    row[col].style = format;
            }
        }
        viewDataset(__DATASET__.default.sheet);
        $("table-data-format").parentNode.removeChild($("table-data-format"));
    };
    tool.appendChild(confirm);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        $("table-data-format").parentNode.removeChild($("table-data-format"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

function setTooltip(parent, text) {
    parent.onmouseenter = function () {
        let tip = document.createElement("span");
        tip.className = "tooltip";
        tip.id = "tooltip-" + parent.id;
        tip.innerHTML = text;
        let posi = getAbsolutePosition(parent);
        tip.style.top = (posi.top - 42) + "px";
        tip.style.left = posi.left + "px";
        tip.style.width = posi.width + "px";
        tip.style.height = (posi.height - 5) + "px";
        $("page").appendChild(tip);
    };
    parent.onmouseleave = function () {
        $("page").removeChild($("tooltip-" + parent.id))
    }
}

function setPageThemes() {
    let message = "设置应用页面主题...";
    try {
        let themes = $("help-select-user-themes");
        themes.options.add(new Option("默认", "themes/default.css"));
        themes.options.add(new Option("黑色", "themes/black.css"));
        themes.options.add(new Option("粉色", "themes/pink.css"));
        themes.options.add(new Option("墨绿", "themes/blackish-green.css"));
        themes.options.add(new Option("蓝色", "themes/blue.css"));
        try {
            let theme = getUserConfig("pagethemes");
            if (theme != null)
                themes.value = getUserConfig("pagethemes");
            else
                themes.selectedIndex = 0;
        } catch (e) {
            __LOGS__.viewError(e);
        }
        themes.onchange = function () {
            setUserConfig("pagethemes", this.value);
            $("themes").setAttribute("href", getUserConfig("pagethemes"));
            //同步编辑主题
            $("set-editer-theme").value = this.options[this.selectedIndex].innerText;
            let theme = __SQLEDITOR__.themes[$("set-editer-theme").value];
            $("sqlediterTheme").setAttribute("href", theme.href);
            __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
            setUserConfig("editerthemes", $("set-editer-theme").value);

            let img = {
                 image: "var(--main-background-image)",
                 repeat: "var(--main-background-image-repeat)",
                 size: "var(--main-background-image-size)",
                 attachment: "var(--main-background-image-attachment)"
             };
             setUserConfig("BackgroundImage", JSON.stringify(img));
             document.body.style.backgroundImage = img.image;
             document.body.style.backgroundRepeat = img.repeat;
             document.body.style.backgroundSize = img.size;
             document.body.style.backgroundAttachment = img.attachment;
        };

        let mapconfig = $("help-local-map-config");
        let localmap = $("help-local-map");
        mapconfig.onclick = localmap.onclick = function () {
            let config = geoCoordMap.getMapConfig();
            setCenterPosition($("page"), config);
        }
        __LOGS__.viewMessage(message + "OK.");
    }catch (e) {
        __LOGS__.viewMessage(message + "fails.\n" + e, true);
    }
}

function setCenterPosition(parent, obj) {
    parent.appendChild(obj);
    let parentposi = getAbsolutePosition(parent);
    let objposi = getAbsolutePosition(obj);
    let top = (parentposi.height - objposi.height) / 2;
    let left = (parentposi.width - objposi.width) / 2;
    obj.style.top = top + "px";
    obj.style.left = left + "px";
}

function setEchartDrag(ec) {
    ec.ondragenter = function (event) {
        if (event.target.className == "multi-echarts-view-contain") {
            event.target.style.border = "1px dotted red";
        }
    };
    ec.ondragover = function (event) {
        if (event.target.className == "multi-echarts-view-contain") {
            event.preventDefault();
        }
    };
    ec.ondrop = function (event) {
        if (event.target.className == "multi-echarts-view-contain") {
            try {
                echarts.getInstanceByDom(this).dispose();
            } catch (e) {
            }
            event.target.style.border = "0px dotted var(--main-border-color)";
            let id = event.dataTransfer.getData("Text");
            let history = __ECHARTS__.history[id];
            if (history != null) {
                history = JSON.parse(history);
                try {
                    let posi = getAbsolutePosition(this);
                    let _width = posi.width + "px";
                    let _height = posi.height + "px";
                    let e = getEcharts(
                        this,
                        _width,
                        _height,
                        history.dataset,
                        history.configs);
                    setDragNook(e, e.getAttribute("_echarts_instance_"));
                    setEchartDrag(this);
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            } else {
                setMultiEchartsView(this, id);
                this.style.border = "0px dotted var(--main-border-color)";
            }
        }
    };
    ec.ondragleave = function (event) {
        if (event.target.className == "multi-echarts-view-contain") {
            event.target.style.border = "1px dotted var(--main-border-color)";
        }
    };
}

function setMultiEchartsView(parent, template) {
    parent.innerHTML = "";
    let views = __ECHARTS__.layouts[template];
    for (let i = 0; i < views.data.length; i++) {
        let view = views.data[i];
        let contain = document.createElement("div");
        contain.className = "multi-echarts-view-contain";
        contain.style.position = views.position;
        switch (views.position) {
            case "static":
                //contain.style.left = view[0] + "%";
                //contain.style.top = view[1] + "%";
                contain.style.width = view[2] + "%";
                contain.style.height = view[3] + "%";
            case "relative":
                contain.style.left = view[0] + "%";
                contain.style.top = view[1] + "%";
                contain.style.width = view[2] + "%";
                contain.style.height = view[3] + "%";

            case "absolute":
                contain.style.left = view[0] + "%";
                contain.style.top = view[1] + "%";
                contain.style.width = view[2] + "%";
                contain.style.height = view[3] + "%";
        }
        parent.appendChild(contain);
        contain.style.lineHeight = getAbsolutePosition(parent).height * view[3] / 100 + "px";
        contain.innerHTML = "请从右侧拖入布局框架或从左侧拖入数据视图。";
        setEchartDrag(contain);
    }
    if (parent.className == "multi-echarts-view-contain") {
        parent.ondragenter = null;
        parent.ondrop = null;
        parent.ondragleave = null;
        //注销父级容器的拖入功能
    }
}

function getLayoutslist(parent) {
    parent.innerHTML = "";
    let toolbar = document.createElement("div");
    parent.appendChild(toolbar);
    toolbar.className = "toolbar";
    let b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "重置";
    b.onclick = function () {
        $("multi-echarts-view").innerHTML = "请从右侧拖入您需要的布局框架。";
    };
    toolbar.appendChild(b);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "新增";
    b.onclick = function () {
        let name = prompt("请输入布局名称:");
        let ex = false;
        if (name != null && name != "") {
            for (n in __ECHARTS__.layouts) {
                if (n == name) {
                    ex = true;
                    break;
                }
            }
            if (ex == true)
                alert("名称 " + name + " 已经存在.");
            else {
                __ECHARTS__.layouts[name] = {data: [[0, 0, 99, 99],], position: "absolute"};
                getLayoutslist($("multi-layouts-list"))
            }
        }
    };
    toolbar.appendChild(b);
    for (let name in __ECHARTS__.layouts) {
        let row = document.createElement("div");
        row.className = "multi-layouts-list-row";
        row.id = name;

        let title = document.createElement("div");
        let text = document.createElement("span");
        title.appendChild(text);
        text.innerHTML = name;
        row.appendChild(title);

        let save = document.createElement("span");
        save.className = "clickable";
        save.innerText = "✔";
        save.setAttribute("id", name);
        save.onclick = function () {
            try {
                let name = this.getAttribute("id");
                let value = $("multi-layouts-list-row-edit-" + name).value;
                __ECHARTS__.layouts[name].data = JSON.parse(value);
                alert("布局 " + name + " 修改成功.")
            }catch (e) {
                alert("布局格式输入错误，请检查！\r\n请遵循[左边距%,上边距%,宽度%,高度%]设置.")
            }
        };
        title.appendChild(save);

        let detail = document.createElement("div");
        let edit = document.createElement("textarea");
        edit.className = "multi-layouts-list-row-edit";
        edit.id = "multi-layouts-list-row-edit-" + name;
        edit.type = "textarea";
        edit.value = JSON.stringify(__ECHARTS__.layouts[name].data);
        detail.appendChild(edit);
        row.appendChild(detail);

        parent.appendChild(row);
        row.draggable = "true";
        row.ondragstart = function (event) {
            event.dataTransfer.setData("Text", event.target.id);
        };
    }
}

function getMultiEcharts() {
    try {
        let multiEcharts = document.createElement("div");
        multiEcharts.className = "echarts";
        multiEcharts.id = "multi-echarts";
        multiEcharts.style.width = (getAbsolutePosition($("page")).width + 10) + "px";
        multiEcharts.style.height = (getAbsolutePosition($("page")).height + 25) + "px";
        multiEcharts.style.top = "0px";
        multiEcharts.style.left = "0px";

        let echartsList = document.createElement("div");
        echartsList.id = echartsList.className = "multi-echarts-list";
        multiEcharts.appendChild(echartsList);

        for (let i = 0; i < __ECHARTS__.sets.data.length; i++) {
            let history = JSON.parse(__ECHARTS__.history[__ECHARTS__.sets.data[i]]);
            let row = document.createElement("div");
            row.className = "multi-echarts-list-row";
            row.id = history.id;

            let title = document.createElement("div");
            let text = document.createElement("span");
            title.appendChild(text);
            text.innerHTML = history.configs.titleText.value != "" ? history.configs.titleText.value : history.id;
            row.appendChild(title);

            let del = document.createElement("span");
            del.className = "clickable";
            del.innerText = "✘";
            del.setAttribute("id", history.id);
            del.onclick = function () {
                let row = $(this.getAttribute("id"));
                let data = [];
                for (let i = 0; i < __ECHARTS__.sets.data.length; i++) {
                    if (__ECHARTS__.sets.data[i] != this.getAttribute("id"))
                        data.push(__ECHARTS__.sets.data[i]);
                }
                __ECHARTS__.sets.data = data;
                row.parentElement.removeChild(row);
            };
            title.appendChild(del);

            let detail = document.createElement("div");
            let type = document.createElement("span");
            type.innerText = getOptionName(__ECHARTS__.configs.echartsType.options, history.configs.echartsType.value);
            detail.appendChild(type);
            let themes = document.createElement("span");
            themes.innerText = getOptionName(__ECHARTS__.configs.echartsTheme.options, history.configs.echartsTheme.value);
            detail.appendChild(themes);
            row.appendChild(detail);

            echartsList.appendChild(row);
            row.draggable = "true";
            row.ondragstart = function (event) {
                event.dataTransfer.setData("Text", event.target.id);
            };
        }

        let layoutsList = document.createElement("div");
        layoutsList.id = layoutsList.className = "multi-layouts-list";
        multiEcharts.appendChild(layoutsList);
        getLayoutslist(layoutsList);

        let multiEchartsViews = document.createElement("div");
        multiEchartsViews.className = multiEchartsViews.id = "multi-echarts-view";
        multiEcharts.appendChild(multiEchartsViews);
        multiEchartsViews.style.lineHeight = getAbsolutePosition($("page")).height + "px";
        multiEchartsViews.innerHTML = "请从右侧拖入您需要的布局框架。";
        multiEchartsViews.onmousemove = function () {
            let active = 3;
            if (event.x < active && (event.y*100/getAbsolutePosition($("multi-echarts-view")).height >= 25 && event.y*100/getAbsolutePosition($("multi-echarts-view")).height <= 75)) {
                $("multi-echarts-list").style.display = "block";
            } else {
                $("multi-echarts-list").style.display = "none";
            }

            if (event.x> getAbsolutePosition($("multi-echarts-view")).width - active
                && (event.y*100/getAbsolutePosition($("multi-echarts-view")).height >= 25 && event.y*100/getAbsolutePosition($("multi-echarts-view")).height <= 75)){
                $("multi-layouts-list").style.display = "block";
                $("multi-layouts-list").style.left = (getAbsolutePosition($("multi-echarts-view")).width - 305) + "px"
            } else {
                $("multi-layouts-list").style.display = "none";
            }
        };
        multiEchartsViews.ondragenter = function (event) {
            if (event.target.className == "multi-echarts-view") {
                event.target.style.opacity = 0.5
            }
        };
        multiEchartsViews.ondragover = function (event) {
            if (event.target.className == "multi-echarts-view") {
                event.preventDefault();
            }
        };
        multiEchartsViews.ondrop = function (event) {
            if (event.target.className == "multi-echarts-view") {
                event.target.style.opacity = 1
                let id = event.dataTransfer.getData("Text");
                setMultiEchartsView(this, id);
            }
        };
        multiEchartsViews.ondragleave = function (event) {
            if (event.target.className == "multi-echarts-view") {
                event.target.style.opacity = 1
            }
        };

        window.addEventListener("keydown", function (e) {
            //keypress无法获取Esc键值,keydown和keyup可以.
            let keycode = e.which || e.keyCode;
            if (keycode == 27) {
                if ($("multi-echarts") != null) {
                    let mul = $("multi-echarts").getElementsByClassName("multi-echarts-view-contain");
                    for (i = 0; i < mul.length; i++) {
                        try {
                            echarts.getInstanceByDom(mul[i]).dispose();
                        }catch (e) {
                        }
                    }
                    $("multi-echarts").parentElement.removeChild($("multi-echarts"));
                }
            }
        });
        return multiEcharts;
    } catch (e) {
        __LOGS__.viewError(e);
    }
}

function setDragNook(parent, id) {
    function setDrag(nook) {
        nook.ondragstart = function (event) {
            event.dataTransfer.setData("Text", event.target.id);
        };
        nook.ondragenter = function (event) {
            if (event.target.className == "drag-nook") {
                event.target.parentNode.style.border = "1px dotted red";
            }
        };
        nook.ondragover = function (event) {
            if (event.target.className == "drag-nook") {
                event.preventDefault();
            }
        };
        nook.ondrop = function (event) {
            if (event.target.className == "drag-nook") {
                let parent = this.parentNode;
                try {
                    echarts.getInstanceByDom(parent).dispose();
                } catch (e) {
                }
                parent.style.border = "0px dotted var(--main-border-color)";
                let id = event.dataTransfer.getData("Text");
                let history = __ECHARTS__.history[id];
                if (history != null) {
                    history = JSON.parse(history);
                    try {
                        let posi = getAbsolutePosition(parent);
                        let _width = posi.width + "px";
                        let _height = posi.height + "px";
                        let e = getEcharts(
                            parent,
                            _width,
                            _height,
                            history.dataset,
                            history.configs);
                        setDragNook(e, e.getAttribute("_echarts_instance_"));
                        setEchartDrag(parent);
                    } catch (e) {
                        __LOGS__.viewError(e);
                    }
                } else {
                    setMultiEchartsView(parent, id);
                    parent.style.border = "0px dotted var(--main-border-color)";
                }
            }
        };
        nook.ondragleave = function (event) {
            if (event.target.className == "drag-nook") {
                event.target.parentNode.style.border = "1px dotted var(--main-border-color)";
            }
        };
    }

    let nook = document.createElement("div");
    nook.className = "drag-nook";
    nook.id = id;
    nook.draggable = "true";
    nook.style.right = "0%";
    nook.style.top = "0%";
    nook.style.borderTop = "2px solid var(--drag-border-color)";
    nook.style.borderRight = "2px solid var(--drag-border-color)";
    parent.appendChild(nook);
    setDrag(nook);

    nook = document.createElement("div");
    nook.className = "drag-nook";
    nook.id = id;
    nook.draggable = "true";
    nook.style.left = "0%";
    nook.style.top = "0%";
    nook.style.borderTop = "2px solid var(--drag-border-color)";
    nook.style.borderLeft = "2px solid var(--drag-border-color)";
    parent.appendChild(nook);
    setDrag(nook);

    nook = document.createElement("div");
    nook.className = "drag-nook";
    nook.id = id;
    nook.draggable = "true";
    nook.style.left = "0%";
    nook.style.bottom = "0%";
    nook.style.borderBottom = "2px solid var(--drag-border-color)";
    nook.style.borderLeft = "2px solid var(--drag-border-color)";
    parent.appendChild(nook);
    setDrag(nook);

    nook = document.createElement("div");
    nook.className = "drag-nook";
    nook.id = id;
    nook.draggable = "true";
    nook.style.right = "0%";
    nook.style.bottom = "0%";
    nook.style.borderBottom = "2px solid var(--drag-border-color)";
    nook.style.borderRight = "2px solid var(--drag-border-color)";
    parent.appendChild(nook);
    setDrag(nook);
}

//用于处理对话框拖动
var dragParams = {
    target: null,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
//拖拽的实现
function setDialogDrag(bar, callback) {
    //获取相关CSS属性
    function getCss(o, key) {
        if (o)
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
        else
            return null;
    }

    bar.onmousedown = function (event) {
        dragParams.flag = true;
        if (dragParams.target !=null)
            dragParams.target.style.zIndex = 9998;
        dragParams.target = this.parentNode;
        dragParams.target.style.zIndex = 9999;
        if (getCss(dragParams.target, "left") !== "auto") {
            dragParams.left = getCss(dragParams.target, "left");
        }
        if (getCss(dragParams.target, "top") !== "auto") {
            dragParams.top = getCss(dragParams.target, "top");
        }
        if (!event) {
            event = window.event;
            //防止IE文字选中
            bar.onselectstart = function () {
                return false;
            }
        }
        let e = event;
        dragParams.currentX = e.clientX;
        dragParams.currentY = e.clientY;
    };
    document.onmouseup = function () {
        dragParams.flag = false;
        if (getCss(dragParams.target, "left") !== "auto") {
            dragParams.left = getCss(dragParams.target, "left");
        }
        if (getCss(dragParams.target, "top") !== "auto") {
            dragParams.top = getCss(dragParams.target, "top");
        }
    };
    document.onmousemove = function (event) {
        let e = event ? event : window.event;
        if (dragParams.flag) {
            let nowX = e.clientX, nowY = e.clientY;
            let disX = nowX - dragParams.currentX, disY = nowY - dragParams.currentY;
            dragParams.target.style.left = parseInt(dragParams.left) + disX + "px";
            dragParams.target.style.top = parseInt(dragParams.top) + disY + "px";
        }

        if (typeof callback == "function") {
            callback(parseInt(dragParams.left) + disX, parseInt(dragParams.top) + disY);
        }
    }
}

function setDataPageTools(index) {
    let main = document.getElementById("data-page-tools");
    main.innerHTML = "";

    if (__DATASET__.default.tab > 0) {
        let backward = document.createElement("span");
        backward.className = "data-page-tools-tab";
        backward.id = "data-page-tools-backward";
        backward.innerHTML = "•••";
        main.appendChild(backward);
        backward.onclick = function () {
            __DATASET__.default.tab -= 1;
            setDataPageTools(__DATASET__.default.sheet);
        };
    }

    for (let i = __DATASET__.default.tab*10; i < __DATASET__.result.length && i < (__DATASET__.default.tab+1)*10; i++) {
        let tab = document.createElement("span");
        tab.className = "data-page-tools-tab";
        tab.innerHTML = i + 1;
        tab.setAttribute("index", i);
        if (i == __DATASET__.default.sheet) {
            tab.style.background = "var(--tab-selected-backgroud-color)";
            tab.style.color = "var(--tab-selected-color)";
        }
        tab.title = "●" + __DATASET__.result[i].title.join("\n- ");
        tab.onclick = function () {
            let index = Number(this.getAttribute("index"));
            __DATASET__.default.sheet = index;
            __DATASET__.pages.default = 0;
            viewDataset(index, 0);
        }
        main.appendChild(tab);
    }
    if ((__DATASET__.default.tab+1)*10 < __DATASET__.result.length) {
        let forward = document.createElement("span");
        forward.className = "data-page-tools-tab";
        forward.id = "data-page-tools-forward";
        forward.innerHTML = "•••";
        main.appendChild(forward);
        forward.onclick = function () {
            __DATASET__.default.tab += 1;
            setDataPageTools(__DATASET__.default.sheet);
        }
    }

    let todown = document.createElement("span");
    todown.className = "data-page-tools-page";
    todown.id = "todown";
    todown.innerHTML = "›";//"»";
    todown.onclick = function() {
        let label = $("data-page-tools-current");
        if (__DATASET__.result.length > 0) {
            if (__DATASET__.pages.default < __DATASET__.pages.total - 1) {
                __DATASET__.pages.default += 1;
                label.innerText = (__DATASET__.pages.default + 1) + " ● " + __DATASET__.pages.total;
                viewDataset(__DATASET__.default.sheet);
            }
        } else {
            label.innerText = " ● ";
        }
    }
    main.appendChild(todown);

    let curr = document.createElement("span");
    curr.id = "data-page-tools-current";
    if (__DATASET__.result.length > 0) {
        curr.innerText = (__DATASET__.pages.default + 1) + " ● " + __DATASET__.pages.total;
    }  else {
        curr.innerText = " ● ";
    }
    curr.onclick = function() {
        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.default.sheet);
        } else {
            curr.innerHTML = " ● ";
        }
    };
    main.appendChild(curr);

    let toup = document.createElement("span");
    toup.className = "data-page-tools-page";
    toup.id = "toup";
    toup.innerHTML = "‹";//"«";
    toup.onclick = function() {
        let label = $("data-page-tools-current");
        if (__DATASET__.result.length > 0) {
            if (__DATASET__.pages.default > 0) {
                __DATASET__.pages.default -= 1;
                label.innerText = (__DATASET__.pages.default + 1) + " ● " + __DATASET__.pages.total;
                viewDataset(__DATASET__.default.sheet);
            }
        } else {
            label.innerText = " ● ";
        }
    }
    main.appendChild(toup);
}


function getImageBase64Code() {
    function handler(event) {
        event.clipboardData.setData('text/plain', $("source-image-file-code").value);
        event.preventDefault();
        alert("代码已复制到粘贴板.");
    }

    document.addEventListener('copy', handler);   // 增加copy监听

    let container = document.createElement("div");
    container.id = "image-base64-code";
    container.className = "table-data-format";
    container.style.width = "600px";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 设置背景";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let tabtools = document.createElement("div");
    tabtools.className = "tabToolbar";
    tabtools.id = "imageTabToolbar";
    let b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "图片";
    b.onclick = function () {
        $("image-container").style.display = "block";
        $("source-image-file-code").style.display = "none";
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
        $("image-container").style.display = "none";
        $("source-image-file-code").style.display = "block";
        let tb = this.parentNode.getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        this.style.background = "var(--toolbar-button-hover-background-color)";
    };
    tabtools.appendChild(b);
    container.appendChild(tabtools);

    let source = document.createElement("input");
    source.type = "file";
    source.id = "source-image-file";
    source.style.display = "none";
    source.onchange = function () {
        if (this.files.length > 0) {
            let file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("请选择图片文件！");
                return false;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $("image-container").innerHTML = "";
                let image = document.createElement("img");
                image.id = "source-image-file-image";
                image.type = "img";
                image.src = $("source-image-file-code").value = this.result;
                image.style.display = "none";
                image.onload = function () {
                    this.alt = this.title = $("source-image-file").files[0].name + "\nwidth:" + this.width + "\nheight:" + this.height;
                    this.setAttribute("_width_", this.width);
                    this.setAttribute("_height_", this.height);

                    function getSize(w, h, width, height) {
                        if (width > w || height > h) {
                            if (width > w) {
                                height = height / (width / w);
                                width = w;
                            }
                            if (height > h) {
                                width = width / (height / h);
                                height = h;
                            }
                        }
                        return [width, height];
                    }

                    let parent = getAbsolutePosition($("image-container"));
                    let size = getSize(parent.width, parent.height, this.width, this.height);
                    this.width = size[0];
                    this.height = size[1];
                    this.style.margin = "auto";
                    this.style.display = "block";
                    this.style.padding = (parent.height - size[1]) / 2 + "px 0";
                };
                $("image-container").appendChild(image);
            };
        } else
            $("image-container").innerHTML = "";
    };
    container.appendChild(source);

    let filecontainer = document.createElement("div");
    filecontainer.className = "tabToolbar-content-container";
    filecontainer.id = "image-container";
    filecontainer.style.width = "100%";
    filecontainer.style.height = "370.8px";
    container.appendChild(filecontainer);

    let imagecode = document.createElement("textarea");
    imagecode.id = "source-image-file-code";
    imagecode.style.cssText = "width: 100%;\n" +
        "height: 370.8px;\n" +
        "resize: none;" +
        "display: none;" +
        "font-size: 90%;\n";
    imagecode.type = "textarea";
    container.appendChild(imagecode);

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let show = document.createElement("div");
    show.className = "button";
    show.innerText = "打开";
    show.onclick = function () {
        $("image-container").style.display = "block";
        $("source-image-file-code").style.display = "none";

        let tb = $("imageTabToolbar").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";

        $("source-image-file").click();
    };
    tool.appendChild(show);

    let toimage = document.createElement("div");
    toimage.className = "button";
    toimage.id = "toimage";
    toimage.innerText = "解析";
    toimage.onclick = close.onclick = function () {
        $("image-container").innerHTML = "";
        let image = document.createElement("img");
        image.id = "source-image-file-image";
        image.type = "img";
        image.src = $("source-image-file-code").value;
        image.style.display = "none";
        image.onload = function () {
            this.alt = this.title = "width:" + this.width + "\nheight:" + this.height;
            this.setAttribute("_width_", this.width);
            this.setAttribute("_height_", this.height);

            function getSize(w, h, width, height) {
                if (width > w || height > h) {
                    if (width > w) {
                        height = height / (width / w);
                        width = w;
                    }
                    if (height > h) {
                        width = width / (height / h);
                        height = h;
                    }
                }
                return [width, height];
            }

            let parent = getAbsolutePosition($("image-container"));
            let size = getSize(parent.width, parent.height, this.width, this.height);
            this.width = size[0];
            this.height = size[1];
            this.style.margin = "auto";
            this.style.display = "block";
            this.style.padding = (parent.height - size[1]) / 2 + "px 0";
        };
        $("image-container").appendChild(image);
        $("image-container").style.display = "block";
        $("source-image-file-code").style.display = "none";

        let tb = $("imageTabToolbar").getElementsByClassName("tabButton");
        for (let i = 0; i < tb.length; i++) {
            tb[i].style.background = "var(--toolbar-background-color)";
        }
        tb[0].style.background = "var(--toolbar-button-hover-background-color)";
    };
    tool.appendChild(toimage);

    let copyto = document.createElement("div");
    copyto.className = "button";
    copyto.id = "copyto";
    copyto.innerText = "复制";
    copyto.onclick = close.onclick = function () {
        document.execCommand('copy');   // 执行copy命令触发监听
    };
    tool.appendChild(copyto);

    let setBackgroundImage = document.createElement("div");
    setBackgroundImage.className = "button";
    setBackgroundImage.id = "toBackgroundImage";
    setBackgroundImage.innerText = "设置背景";
    setBackgroundImage.onclick = function () {
        let file = $("source-image-file").files[0];
        if (file.size <= 0.5 * 1024 * 1024) {
            if ($("source-image-file-code").value.length != 0) {
                let img = {
                    image: "url(" + $("source-image-file-code").value + ")",
                    repeat: "var(--main-background-image-repeat)",
                    size: "var(--main-background-image-size)",
                    attachment: "var(--main-background-image-attachment)"
                };
                let image = $("source-image-file-image");
                let w = Number(image.getAttribute("_width_"));
                let h = Number(image.getAttribute("_height_"));
                if (w / screen.availWidth > 0.8 && h / screen.availHeight > 0.8) {
                    img.repeat = "no-repeat";
                    img.size = "100% 100%";
                    img.attachment = "fixed";
                } else if (w / screen.availWidth > 0.8) {
                    img.repeat = "repeat";
                    img.size = "100% auto";
                    img.attachment = "scroll";
                } else if (h / screen.availHeight > 0.8) {
                    img.repeat = "repeat";
                    img.size = "auto 100%";
                    img.attachment = "scroll";
                } else {
                    img.repeat = "repeat";
                    img.size = "auto auto";
                    img.attachment = "scroll";
                }

                setUserConfig("BackgroundImage", JSON.stringify(img));
                document.body.style.backgroundImage = img.image;
                document.body.style.backgroundRepeat = img.repeat;
                document.body.style.backgroundSize = img.size;
                document.body.style.backgroundAttachment = img.attachment;

                let name = "透明";
                $("set-editer-theme").value = name;
                let theme = __SQLEDITOR__.themes[name];
                $("sqlediterTheme").setAttribute("href", theme.href);
                __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
                setUserConfig("editerthemes", name);
            }
        } else {
            alert("背景图片文件(" + Math.round(file.size / 1024 / 1024 * 100) / 100 + "MB)不能大于 0.5MB.")
        }
    };
    tool.appendChild(setBackgroundImage);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        document.removeEventListener('copy', handler);   // 移除copy监听，不产生影响
        $("image-base64-code").parentNode.removeChild($("image-base64-code"));
    };
    tool.appendChild(cancel);

    setDialogDrag(title);

    return container;
}

