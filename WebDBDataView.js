const __VERSION__ = {
    name: "Web DataView for SQLite Database of browser",
    version: "3.0.0",
    date: "2021/11/02",
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
        "-- 2021/09/22",
        "Echarts 5.2.1.",
        "-- 2021/10/08",
        "优化EchartsView.",
        "-- 2021/10/15",
        "导出XML报表.",
        "-- 2021/10/18",
        "增加UI组件.",
    ],
    author: __SYS_LOGO_LINK__.author.decode(),
    url: __SYS_LOGO_LINK__.link.getee.decode(),
    tel: __SYS_LOGO_LINK__.tel.decode(),
    email: __SYS_LOGO_LINK__.email.decode(),
    logo: __SYS_LOGO_LINK__.image,
    notes: ""
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
        setUserConfig("UserLogs", JSON.stringify(__LOGS__.data));
    },

    delete: function(date){
        if (typeof __LOGS__.data[date] != "undefined") {
            delete __LOGS__.data[date];
            setUserConfig("UserLogs", JSON.stringify(__LOGS__.data));
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

    viewError: function(parent, error) {
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
        container.id = "ui_error";
        container.className = "ui-container-background";

        if (parent === "auto" || parent == null || typeof parent == "undefined") {
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
            } else {
                parent = document.body;
            }
        }
        parent.appendChild(container);

        let content = document.createElement("div");
        content.id = "error-dialog";
        content.className = "ui-container-body";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        let span = document.createElement("span");
        span.className = span.id = "error-title";

        span.innerHTML = "● " + (typeof names[error.name] !== "undefined" ? names[error.name] : "其他未定义错误");
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let detail = document.createElement("div");
        detail.className = "ui-container-scroll-div";
        content.appendChild(detail);
        let code = document.createElement("code");
        code.className = "stack";
        code.innerHTML = error.stack.toString()
            .replace(error.name, "<span class='name'>" + error.name + "</span>")
            .replace(error.message, "<span class='message'>" + error.message + "</span>")
            .split("\n").join("<br> ● ") + "<hr>" + getUserConfig("CopyRight") + "<br>" +
            "<a href =" + __VERSION__.url + " target = '_blank'>" + __VERSION__.url + "</a>";
        detail.appendChild(code);

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        content.appendChild(tool);
        tool.className = "groupbar";

        let confirm = document.createElement("button");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = close.onclick = function () {
            parent.removeChild($("ui_error"));
        };
        tool.appendChild(confirm);

        let help = document.createElement("button");
        help.className = "button";
        help.innerText = "帮助";
        help.onclick = function () {
            window.open(__VERSION__.url);
        };
        tool.appendChild(help);
        setDialogDrag(title);
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
        dt.id = dt.innerText = log.time.format("yyyy-MM-dd hh:mm:ss S");
        let tocopy = document.createElement("span");
        tocopy.innerHTML= "⇢";
        tocopy.className = "copy";
        tocopy.title = "复制";
        tocopy.onclick = function(){
            let target = this.parentNode.getElementsByClassName("message")[0];
            setClipboardListener(target);
            document.execCommand("copy");
            UI.alert.show("提示","日志内容已复制到粘贴板.");
        };
        dt.appendChild(tocopy);

        let first = msgbox.firstChild;
        msgbox.insertBefore(dt, first);

        let message = document.createElement("dd");
        message.type = "dd";
        message.className = "message";
        message.innerText = log.message;
        if (warning)
            message.style.color = "red";
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
            console.log("__XMLHTTP__.request:" + e);
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
        let index = dom.id;
        __XMLHTTP__.elements[index] = dom;

        function startTime(index) {
            __XMLHTTP__.elements[index].innerHTML = "时间:" + (__XMLHTTP__.time == null ? "" : __XMLHTTP__.time.format("yyyy-MM-dd hh:mm")) + " 更新频率:" + getTimesLengthString(timeout, "毫秒");
            __XMLHTTP__.elements[index].title = "授时服务:\n" +
                (__XMLHTTP__.server == null ? "" : __XMLHTTP__.server) + "\n" +
                (__XMLHTTP__.abstract == null ? "" : __XMLHTTP__.abstract);

            if (typeof __XMLHTTP__.elements[index] != "undefined") {
                if (__XMLHTTP__.updatetime != null) {
                    if ((new Date() - __XMLHTTP__.updatetime) < timeout) {
                        setTimeout(function () {
                            startTime(index);
                        }, timeout);
                    } else {
                        __XMLHTTP__.getResponse();
                        setTimeout(function () {
                            startTime(index);
                        }, 0);
                    }
                } else {
                    __XMLHTTP__.getResponse();
                    setTimeout(function () {
                        startTime(index);
                    }, 0);
                }
            }
        }
        startTime(index);
    },
    unhook: function (dom) {
        delete __XMLHTTP__.elements[dom.id];
    },
    getResponse: function () {
        let xhr = __XMLHTTP__.request();
        // 通过get或HEAD的方式请求当前文件
        if (xhr != null) {
            __LOGS__.viewMessage("发送授时请求...");
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
                        __XMLHTTP__.updatetime = new Date();
                    } else if (xhr.status == 404) {
                        __XMLHTTP__.server = null;
                        __XMLHTTP__.abstract = null;
                        __XMLHTTP__.time = null;
                        __XMLHTTP__.updatetime = null;
                    }
                } catch (e) {
                    console.log("__XMLHTTP__.getResponse:" + e);
                }
            };
            xhr.send();
        }
    },
    certificate: function (byServer) {
        let echartsPath = "echarts/V5.2.1";
        let title = document.title;
        let scripts = [
            {name: "主程序", src: "WebDBDataView.js", type: "text/javascript", element: "script", load: false},
            {name: "主程序", src: "themes/default.css", type: "text/css", element: "link", load: false},
            {name: "主程序", src: "WebDBDataView.css", type: "text/css", element: "link", load: false},
            {name: "主程序", src: "UI-A.js", type: "text/javascript", element: "script", load: false},
            {name: "资料库", src: "images.js", type: "text/javascript", element: "script", load: false},
            {name: "公共函数", src: "FunctionsComponent.js", type: "text/javascript", element: "script", load: false},
            {
                name: "Echarts",
                src: echartsPath + "/echarts.min.js",
                type: "text/javascript",
                element: "script",
                load: false
            },
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
            {name: "文件加密组件", src: "FileSecurityComponent.js", type: "text/javascript", element: "script", load: false},
            {name: "数据读取组件", src: "DataReaderComponent.js", type: "text/javascript", element: "script", load: true},
            {
                name: "Echarts",
                src: echartsPath + "/echarts-gl.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: echartsPath + "/echarts-wordcloud.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: echartsPath + "/echarts-liquidfill.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {name: "回归函数组件", src: echartsPath + "/ecStat.js", type: "text/javascript", element: "script", load: true},
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
                            console.log("__XMLHTTP__.certificate:" + e);
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
    MAXLOGS: 1000,
    fullScreen: {element: null},
};

 var __DATASET__ = {
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
         reportType: {
             name: "文件类型",
             value: "xlsx",
             options: [new Option("Excel", "xlsx"), new Option("XML", "xml")],
             type: "select"
         },
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
     setDatasetConfigs: function (parent, callback) {
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

         if (parent == "auto" || parent == null) {
             if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                 parent = __CONFIGS__.fullScreen.element;
             } else {
                 parent = document.body;
             }
         }

         let container = document.createElement("div");
         container.id = "ui_datasetConfigs";
         container.className = "ui-container-background";
         parent.appendChild(container);

         let content = document.createElement("div");
         content.className = "ui-container-body";
         content.id = "dataset-configs-Content";
         container.appendChild(content);

         let title = document.createElement("div");
         title.className = "ui-container-title";
         let span = document.createElement("span");
         span.innerHTML = "● 报表设置 ";
         title.appendChild(span);
         let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
         close.className = "ui-container-close";
         title.appendChild(close);
         content.appendChild(title);

         let hr = document.createElement("hr");
         hr.className = "ui-container-hr";
         content.appendChild(hr);

         let itemcontainer = document.createElement("div");
         itemcontainer.id = itemcontainer.className = "ui-container-scroll-div";
         content.appendChild(itemcontainer);

         for (let name in __DATASET__.configs) {
             let item = document.createElement("div");
             item.className = "ui-container-item";
             itemcontainer.appendChild(item);
             let span = document.createElement("span");
             span.className = "ui-container-item-name";
             span.innerHTML = __DATASET__.configs[name].name + ":";
             item.appendChild(span);
             if (__DATASET__.configs[name].type == "input") {
                 let input = document.createElement("input");
                 input.style.cssFloat = "right";
                 input.id = name;
                 input.type = "input";
                 input.className = "ui-container-item-input";
                 input.value = __DATASET__.configs[name].value;
                 input.onchange = function () {
                     __DATASET__.configs[this.id].value = this.value;
                 };
                 if (typeof __DATASET__.configs[name].title != "undefined")
                     input.title = __DATASET__.configs[name].title;
                 else
                     input.title = __DATASET__.configs[name].name;
                 item.appendChild(input);
             } else if (__DATASET__.configs[name].type == "select") {
                 let input = document.createElement("select");
                 input.style.cssFloat = "right";
                 input.id = name;
                 input.type = "select";
                 input.className = "ui-container-item-input";
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
                 item.appendChild(input);
             } else if (__DATASET__.configs[name].type == "color") {
                 let input = document.createElement("input");
                 input.style.cssFloat = "right";
                 input.id = name;
                 input.type = "color";
                 input.className = "ui-container-item-input";
                 input.value = __DATASET__.configs[name].value;
                 input.onchange = function () {
                     __DATASET__.configs[this.id].value = this.value;
                 };
                 if (typeof __DATASET__.configs[name].title != "undefined")
                     input.title = __DATASET__.configs[name].title;
                 else
                     input.title = __DATASET__.configs[name].name;
                 item.appendChild(input);
             } else if (__DATASET__.configs[name].type == "hr") {
                 span.innerHTML = "[ " + __DATASET__.configs[name].name + " ]";
                 span.style.fontWeight = "bolder";
                 span.style.color = "var(--main-title-color)";
                 let c = document.createElement("div");
                 c.style.width = "70%";
                 c.style.cssFloat = "right";
                 item.appendChild(c);
                 item.id = name;
                 let h = document.createElement("hr");
                 h.style.marginTop = "10px";
                 c.appendChild(h)
                 //d.innerHTML = "";
                 //d.appendChild(h);
             }
         }

         hr = document.createElement("hr");
         hr.className = "ui-container-hr";
         content.appendChild(hr);

         let c = document.createElement("div");
         c.className = "groupbar";
         content.appendChild(c);

         let b = document.createElement("button");
         b.className = "button";
         b.innerHTML = "确定";
         b.onclick = function () {
             let configs = $("ui_datasetConfigs").getElementsByClassName("ui-container-item-input");
             let config = {};
             for (let i = 0; i < configs.length; i++) {
                 __DATASET__.configs[configs[i].id].value = configs[i].value;
                 config[configs[i].id] = configs[i].value;
             }
             setUserConfig("datasetConfig", JSON.stringify(config));
             callback();
             parent.removeChild($("ui_datasetConfigs"));
         };
         c.appendChild(b);

         b = document.createElement("button");
         b.className = "button";
         b.innerHTML = "重置";
         b.onclick = close.onclick = function () {
             UI.confirm.show("注意", "您确定要重置全部报表参数吗?", "auto", function () {
                 setUserConfig("datasetConfig", JSON.stringify({}));
                 parent.removeChild($("ui_datasetConfigs"));
                 UI.alert.show("提示", "所有参数已恢复为系统初始值,系统将重新载入页面...");
                 location.reload();
             });
         };
         c.appendChild(b);

         b = document.createElement("button");
         b.className = "button";
         b.innerHTML = "退出";
         b.onclick = close.onclick = function () {
             parent.removeChild($("ui_datasetConfigs"));
         };
         c.appendChild(b);

         setDialogDrag(title);
     },
     getResultIndex: function(eventid) {
         let index = null;
         for (let i = 0; i < __DATASET__.result.length; i++) {
             if (__DATASET__.result[i].eventid == eventid) {
                 index = i;
                 break;
             }
         }
         return index;
     },
     getResult: function(eventid) {
         let result = null;
         for (let i = 0; i < __DATASET__.result.length; i++) {
             if (__DATASET__.result[i].eventid == eventid) {
                 result = __DATASET__.result[i];
                 break;
             }
         }
         return result;
     },
     removeResult: function(eventid) {
         let result = false;
         for (let i = 0; i < __DATASET__.result.length; i++) {
             if (__DATASET__.result[i].eventid == eventid) {
                 __DATASET__.result.splice(i, 1);
                 result = true;
                 break;
             }
         }
         return result;
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

function checkStorage() {
    try {
        if (typeof window.localStorage !== undefined)
            return true;
        else
            return false;
    } catch (e) {
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
    } catch (e) {
        __LOGS__.viewError("getUserConfig:" + e);
        return null;
    }
}


function setUserConfig(key,value) {
    try {
        let storage = window.localStorage;
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.CONFIGS));
        configs[key] = value;
        storage.setItem(__CONFIGS__.STORAGE.CONFIGS, JSON.stringify(configs));
    } catch (e) {
        __LOGS__.viewError(e);
    }
}

function viewDatabases() {
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
                            let inf = document.createElement("div");
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
    } catch (e) {
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
                        let a = document.createElement("div");
                        li.appendChild(a);
                        a.className = "table-name";
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
                                                    let col = document.createElement("div");
                                                    col.className = "column-name";
                                                    col.id = __CONFIGS__.CURRENT_TABLE.name + "." + __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
                                                    columns.push(__CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value);
                                                    col.innerText = col.title = __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
                                                    col.draggable = "true";
                                                    col.ondragstart = function (event) {
                                                        event.dataTransfer.setData("Text", event.target.id);
                                                    };
                                                    l.appendChild(col);
                                                    let typ = document.createElement("div");
                                                    typ.className = "column-type";
                                                    typ.innerText = typ.title = __CONFIGS__.CURRENT_TABLE.structure.data[m]["Type"].value;
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
                            let l = tbs.getElementsByClassName("table-name");
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
        for (let col in r1) {
            for (let attr in r1[col]) {
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
                    if (data[i][columns[colid].name].type == "number" && data[x][columns[colid].name].type == "number") {
                        if (data[i][columns[colid].name].value < data[x][columns[colid].name].value) {
                            exchange(data[i], data[x]);
                        }
                    } else if (data[i][columns[colid].name].type == "object" || data[x][columns[colid].name].type == "object") {
                        //exchange(data[i], data[x]);
                    } else {
                        if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) < 0 && data[i][columns[colid].name].type == data[x][columns[colid].name].type) {
                            exchange(data[i], data[x]);
                        }
                    }
                    break;
                case "desc":
                    if (data[i][columns[colid].name].type == "number" && data[x][columns[colid].name].type == "number") {
                        if (data[i][columns[colid].name].value > data[x][columns[colid].name].value) {
                            exchange(data[i], data[x]);
                        }
                    } else if (data[i][columns[colid].name].type == "object" || data[x][columns[colid].name].type == "object") {
                        //exchange(data[i], data[x]);
                    } else {
                        if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) > 0 && data[i][columns[colid].name].type == data[x][columns[colid].name].type) {
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

function execute(title) {
    if (__CONFIGS__.CURRENT_DATABASE.connect != null) {
        __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
            let selection = "";
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();
            if (__SQLEDITOR__.parameter == null)
                selection = fillSqlParam(selection);
            else {
                for (let param in __SQLEDITOR__.parameter) {
                    selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
                    title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
                }
            }

            title = title.split("_");

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
                                    eventid: getEventIndex(),
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
        UI.alert.show("提示", "请选择数据库!");
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

function executeFunction(title) {
    let selection = "";
    if (__SQLEDITOR__.codeMirror.somethingSelected())
        selection = __SQLEDITOR__.codeMirror.getSelection();
    else
        selection = __SQLEDITOR__.codeMirror.getValue();
    if (__SQLEDITOR__.parameter == null)
        selection = fillSqlParam(selection);
    else {
        for (let param in __SQLEDITOR__.parameter) {
            selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
            title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
        }
    }

    title = title.split("_");

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
        eventid: getEventIndex(),
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
    return {
        eventid: getEventIndex(),
        columns: columns,
        data: data,
        title: ["table structure"],
        type: "text/x-sqlite"
    };
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
    ctx.drawImage(__SYS_IMAGES__.getLogoImage(__SYS_IMAGES__.mouse, 30, 30), 0, 20, 30, 30);
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

function userLogin() {
    UI.userLogin.show("用户登录", "auto", function (values) {
        let users = getUserConfig("Users");
        users = JSON.parse(users.decode());
        let user = users[values.name];
        if (typeof user === "undefined") {
            UI.alert.show("用户登录", values.name + " 用户不存在!", "auto", function () {
                userLogin();
            });
        } else {
            if (user.password !== values.password.hex_md5_hash()) {
                UI.alert.show("用户登录", "用户密码验证(MD5)未通过!", "auto", function () {
                    userLogin();
                });
            } else {
                let image = $("user").getElementsByTagName("img")[0];
                image.src = __SYS_IMAGES__.logined.image;
                let span = document.createElement("span");
                span.innerHTML = values.name;
                $("user").appendChild(span);
            }
        }
    });
}

function init() {
    if (initConfigs()) {
        initMenus();
        setPageThemes();
        viewDatabases();
        setDataPageTools(0);
        getEchartsClock();

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
        try {
            let users = getUserConfig("Users");
            if (users == null) {
                UI.confirm.show("注意", "您没有创建系统用户,是否需要立即创建?", "auto", function () {
                    UI.prompt.show("请输入用户名称", {"用户名称": ""}, "auto", function (values) {
                        let name = values["用户名称"].trim();
                        if (name.length >= 2) {
                            UI.password.show("用户 " + name + " 的登录密码", {
                                "登录密码": "",
                                "确认密码": ""
                            }, "auto", function (args, values) {
                                let name = args["name"];
                                let users = {};
                                let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                                //必须是8位密码,且必须包含字符和数字
                                let key = values["登录密码"];
                                if (key != values["确认密码"]) {
                                    UI.alert.show("提示", "两次密码输入不一致.", "auto");
                                } else if (pattern.test(key) == false) {
                                    UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字.", "auto");
                                } else {
                                    users[name] = {
                                        password: values["确认密码"].hex_md5_hash(),
                                        date: getNow()
                                    };
                                    setUserConfig("Users", JSON.stringify(users).encode());
                                    location.reload();
                                }
                            }, {name: name});
                        } else
                            UI.alert.show("注意", "用户名称长度不符合系统要求!", "auto");
                    });
                });
            } else {
                userLogin();
            }
        } catch (e) {
            __LOGS__.viewError("auto", e);
        }
        //#########################body init end#######################################
    }
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

            $("main-title").appendChild(__SYS_IMAGES__.getLogoImage(__VERSION__.logo));
            $("main-title").ondblclick = function () {
                requestFullScreen(document.body);
            };

            let image = document.createElement("img");
            image.src = __SYS_IMAGES__.login.image;
            $("user").appendChild(image);

            let helpurl = document.getElementsByClassName("help-url");
            for(let i=0;i<helpurl.length;i++){
                helpurl[i].herf = helpurl[i].innerHTML = __VERSION__.url;
            }

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

            getQRCode($("page"), 90, 90, __VERSION__.url, __SYS_IMAGES__.echo);
            resize();

            let config = getUserConfig("echartsconfig");
            if (config != null) {
                config = JSON.parse(config);
                for (let key in config) {
                    try {
                        __ECHARTS__.configs[key].value = config[key];
                    } catch (e) {
                    }
                }
            }

            config = getUserConfig("datasetConfig");
            if (config != null) {
                config = JSON.parse(config);
                for (let key in config) {
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

            __LOGS__.viewMessage(message + "...OK.");
            checked = true;
        } catch (e) {
            __LOGS__.viewMessage(message + "...fails<br>Error:" + e, true);
            checked = false;
        }
    } else {
        UI.alert.show("提示","当前浏览器不支持Local Storage,建议使用Chrome或Edge浏览器.");
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
        crdb.className = "button";
        crdb.innerText = "新增";
        crdb.id = "create-database";
        crdb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_database));
        let help_crdb = $("help-create-database");
        crdb.onclick = help_crdb.onclick = function () {
            SQLite.createDatabase("auto");
        };
        dbstools.appendChild(crdb);
        setTooltip(crdb, "创建数<br>据库");

        let rmdb = document.createElement("div");
        rmdb.className = "button";
        rmdb.innerText = "删除";
        rmdb.id = "delete-database";
        rmdb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.drop_database));
        rmdb.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                UI.alert.show("提示", "请选择数据库.");
                return;
            }
            UI.confirm.show("注意", "确定要删除数据库 " + __CONFIGS__.CURRENT_DATABASE.value.name + " 吗?", "auto", function () {
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
            });
        };
        dbstools.appendChild(rmdb);
        setTooltip(rmdb, "删除<br>数据库");

        let dbinfo = document.createElement("div");
        dbinfo.className = "button";
        dbinfo.id = "test-button";
        dbinfo.innerText = "调试";
        dbinfo.style.display = "none";
        dbinfo.onclick = function () {
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
            //     UI.alert.show("提示","脚本转换完成!")
            // } catch (e) {
            //     UI.alert.show("提示",e);
            // }
            //##########################################
        };
        dbstools.appendChild(dbinfo);
        setTooltip(dbinfo, "脚本<br>转换");

        let about = document.createElement("div");
        about.className = "charButton";
        about.innerHTML = "☂";
        about.id = "about-and-help";
        about.style.cssFloat = "right";
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
        crtb.className = "button";
        crtb.id = "create-table";
        crtb.innerText = "新增";
        crtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_table));
        let help_crtb = $("help-create-table");
        crtb.onclick = help_crtb.onclick = function () {
            SQLite.createTable("auto", null, function (values) {
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
        };
        tbstools.appendChild(crtb);
        setTooltip(crtb, "创建<br>数据表");

        let importtb = document.createElement("div");
        importtb.className = "button";
        importtb.innerText = "导入";
        importtb.id = "import-to-table";
        importtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.import));
        let help_importtb = $("help-import-data");
        importtb.onclick = help_importtb.onclick = function () {
            SQLite.import.start("auto");
        };
        tbstools.appendChild(importtb);
        setTooltip(importtb, "导入<br>外部数据");

        let exConstr = document.createElement("div");
        exConstr.className = "button";
        exConstr.innerText = "结构";
        exConstr.id = "show-table-construct";
        exConstr.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.table_construct));
        exConstr.onclick = function () {
            let result = __CONFIGS__.CURRENT_TABLE.structure;
            result["eventid"] = getEventIndex();
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
        rmtb.className = "button";
        rmtb.innerText = "删除";
        rmtb.id = "drop-table";
        rmtb.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.drop_table));
        rmtb.onclick = function () {
            UI.confirm.show("注意", "确定要删除数据表(视图) " + __CONFIGS__.CURRENT_TABLE.name + " 吗?", "auto", function () {
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
            });
        };
        tbstools.appendChild(rmtb);
        setTooltip(rmtb, "删除当前<br>数据表");

        //#######################################
        //初始化SQL菜单
        //#######################################
        let sqltools = $("sql-tools");
        sqltools.ondblclick = function () {
            requestFullScreen($("main"));
        };

        let newsql = document.createElement("div");
        newsql.className = "button";
        newsql.innerText = "新建";
        newsql.id = "create-new-sql";
        newsql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_sql));
        let help_createsql = $("help-create-sql");
        newsql.onclick = help_createsql.onclick = function () {
            let openfile = $("open-sql-file");
            openfile.value = "";
            __SQLEDITOR__.title = null;
            $("sql-title").innerText = "";
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
                        __SQLEDITOR__.title = $("sql-title").innerText = file.name.split(".")[0];
                    };
                    reader.readAsText(file, __SQLEDITOR__.charset.options[__SQLEDITOR__.charset.value]);
                } catch (e) {
                    UI.alert.show("提示", "请选择需要导入的脚本文件.")
                }
            } else {
                UI.alert.show("提示", "本应用适用于Chrome浏览器或IE10及以上版本。")
            }
        };
        sqltools.appendChild(input);

        let opensql = document.createElement("div");
        opensql.className = "button";
        opensql.innerText = "打开";
        opensql.id = "open-sql";
        opensql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.open_sql));
        let help_opensql = $("help-open-sql");
        opensql.onclick = help_opensql.onclick = function () {
            UI.sqlManagerDialog.show("auto", function (args, values) {
                __SQLEDITOR__.title = $("sql-title").innerText = values.title;
                __LOGS__.viewMessage("Open " + __SQLEDITOR__.options.mode + " : " + __SQLEDITOR__.title);
                __SQLEDITOR__.codeMirror.setValue(values.sql);
            }, {type: UI.sqlManagerDialog.type.open});
        };
        sqltools.appendChild(opensql);
        setTooltip(opensql, "打开<br>脚本");

        let saveto = document.createElement("div");
        saveto.className = "button";
        saveto.innerText = "保存";
        saveto.id = "sql-save-to";
        saveto.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.save_sql));
        let help_savesql = $("help-save-sql");
        saveto.onclick = help_savesql.onclick = function () {
            if (__SQLEDITOR__.title == null) {
                UI.sqlManagerDialog.show("auto", function (args, values) {
                    __SQLEDITOR__.title = $("sql-title").innerText = values.title;
                    __LOGS__.viewMessage("Save " + __SQLEDITOR__.options.mode + " : " + __SQLEDITOR__.title);
                }, {type: UI.sqlManagerDialog.type.save, sql: __SQLEDITOR__.codeMirror.getValue()});
            } else {
                let title = __SQLEDITOR__.title;
                let sql = __SQLEDITOR__.codeMirror.getValue();
                UI.confirm.show("注意", "您确定覆盖保存脚本 " + title + " 吗?", "auto", function (args) {
                    if (args.title != "" && args.sql != "") {
                        saveStorageSql(args.title, args.sql);
                        __LOGS__.viewMessage("Save " + __SQLEDITOR__.options.mode + " : " + __SQLEDITOR__.title);
                    } else
                        UI.alert.show("提示", "脚本及脚本名称不能为空!");
                }, {title: title, sql: sql});
            }
        };
        sqltools.appendChild(saveto);
        setTooltip(saveto, "保存<br>脚本");

        let loadfile = document.createElement("div");
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
        saveas.className = "button";
        saveas.innerText = "导出";
        saveas.id = "sql-save-as";
        saveas.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.unload_sql));
        let help_downloadsql = $("help-download-sql");
        saveas.onclick = help_downloadsql.onclick = function () {
            UI.prompt.show("输入", {"文件名称": __SQLEDITOR__.title != null ? __SQLEDITOR__.title.split("_")[0] : ""}, "auto", function (args, values) {
                let title = values["文件名称"];
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
            }, {});
        };
        sqltools.appendChild(saveas);
        setTooltip(saveas, "导出<br>脚本");

        let backup = document.createElement("div");
        backup.className = "button";
        backup.innerText = "备份";
        backup.id = "backup-sql-to-file";
        backup.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.unload_sql));
        backup.onclick = function () {
            UI.sqlManagerDialog.show("auto", function (args, values) {

            }, {type: UI.sqlManagerDialog.type.backup});
        }
        sqltools.appendChild(backup);
        setTooltip(backup, "脚本<br>备份");

        let execsql = document.createElement("div");
        execsql.className = "button";
        execsql.innerText = "提交";
        execsql.id = "execute-sql";
        execsql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.execute_sql));
        let help_execsql = $("help-execute-sql");
        execsql.onclick = help_execsql.onclick = function () {
            if (checkStorage()) {
                let selection = "";
                if (__SQLEDITOR__.codeMirror.somethingSelected())
                    selection = __SQLEDITOR__.codeMirror.getSelection();
                else
                    selection = __SQLEDITOR__.codeMirror.getValue();
                let reg = new RegExp(/\{[\[\]\:\,\;\-\"\'a-zA-Z0-9\u4e00-\u9fa5]+\}/, "g");
                let params = selection.match(reg);
                if (params != null) {
                    //参数去重
                    let temp = {};
                    for (let i = 0; i < params.length; i++) {
                        let key = params[i].substring(params[i].indexOf("{") + 1, params[i].indexOf("}"));
                        temp[key] = typeof __SQLEDITOR__.parameter[key] !== "undefined" ? __SQLEDITOR__.parameter[key] : "";
                    }
                    params = temp;
                    UI.prompt.show("输入脚本参数", params, "auto", function (args, values) {
                        for (let key in values) {
                            __SQLEDITOR__.parameter[key] = values[key];
                        }
                        if (__SQLEDITOR__.title != null) {
                            let title = __SQLEDITOR__.title;
                            if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                                execute(title);
                            if (__SQLEDITOR__.options.mode == "text/javascript")
                                executeFunction(title)
                        } else {
                            UI.prompt.show("输入", {"集合名称": ""}, "auto", function (args, values) {
                                let title = __SQLEDITOR__.title = $("sql-title").innerText = values["集合名称"];
                                if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                                    execute(title);
                                if (__SQLEDITOR__.options.mode == "text/javascript")
                                    executeFunction(title);
                            }, {})
                        }

                    }, {});
                } else {
                    if (__SQLEDITOR__.title != null) {
                        let title = __SQLEDITOR__.title;
                        if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                            execute(title);
                        if (__SQLEDITOR__.options.mode == "text/javascript")
                            executeFunction(title)
                    } else {
                        UI.prompt.show("输入", {"集合名称": ""}, "auto", function (args, values) {
                            let title = __SQLEDITOR__.title = values["集合名称"];
                            if (__SQLEDITOR__.options.mode == "text/x-sqlite")
                                execute(title);
                            if (__SQLEDITOR__.options.mode == "text/javascript")
                                executeFunction(title);
                        }, {})
                    }
                }
            }
        };
        sqltools.appendChild(execsql);
        setTooltip(execsql, "执行脚本<br>获取数据");

        let sqltitle = document.createElement("div");
        sqltitle.id = "sql-title";
        sqltitle.style.cssFloat = "left";
        sqltools.appendChild(sqltitle);

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

        let datasetSource = document.createElement("select");
        datasetSource.type = "select";
        datasetSource.id = "set-dataset-source";
        datasetSource.style.cssFloat = "right";
        for (let m in __SQLEDITOR__.modes) {
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

        //#######################################
        //初始化消息菜单
        //#######################################
        let detailtools = $("detail-tools");
        detailtools.ondblclick = function () {
            requestFullScreen($("detail"));
        };

        let toDisplay = document.createElement("div");
        toDisplay.className = "charButton";
        toDisplay.innerHTML = "∼";//"»";
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
        clean.className = "charButton";
        clean.innerHTML = "&#9850";
        clean.id = "logs-clear";
        // clean.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.clear_logs));
        clean.onclick = function () {
            let msgbox = $("messageBox");
            msgbox.innerHTML = "";
        };
        detailtools.appendChild(clean);
        setTooltip(clean, "清除终<br>端日志");

        let savelogs = document.createElement("div");
        savelogs.className = "charButton";
        savelogs.id = "save-logs";
        savelogs.innerHTML = "&#8675";
        savelogs.style.cssFloat = "right";
        savelogs.onclick = function () {
            let logslist = {};
            for (let d in __LOGS__.data) {
                logslist[d] = {value: d, checked: false};
            }
            UI.choise.show("请选择需要下载的日志", logslist, "checkbox", "auto", function (args, values) {
                let count = 0;
                for (let d in values) {
                    if (values[d].checked) {
                        let date = values[d].value;
                        __LOGS__.saveas(date);
                        sleep(1000);
                        count++;
                    }
                }
                if (count > 0) {
                    UI.confirm.show("注意", "日志 " + count + " 已下载到本地,是否从系统删除?", "auto", function (args) {
                        for (let d in args) {
                            if (args[d].checked)
                                __LOGS__.delete(args[d].value);
                        }
                    }, values);
                }
            }, {});
        };
        detailtools.appendChild(savelogs);
        setTooltip(savelogs, "下载<br>日志");

        let logs = document.createElement("div");
        logs.id = "logs-records";
        logs.className = "charButton";
        logs.innerHTML = "≢";
        logs.style.cursor = "pointer";
        logs.style.cssFloat = "right";
        let logItems = {
            "50条": {value: 10, checked: Number(getUserConfig("pagelogs")) == 10 ? "true" : false},
            "100条": {value: 100, checked: Number(getUserConfig("pagelogs")) == 100 ? "true" : false},
            "1000条": {title: 1000, checked: Number(getUserConfig("pagelogs")) == 1000 ? "true" : false},
            "5000条": {title: 5000, checked: Number(getUserConfig("pagelogs")) == 5000 ? "true" : false},
            "10000条": {title: 10000, checked: Number(getUserConfig("pagelogs")) == 10000 ? "true" : false},
        };
        __CONFIGS__.MAXLOGS = Number(getUserConfig("pagelogs"));
        logs.onclick = function () {
            UI.choise.show("设置显示日志最大记录数", logItems, "radio", "auto", function (args, values) {
                for (let key in values) {
                    if (values[key].checked) {
                        __CONFIGS__.MAXLOGS = values[key].value;
                        setUserConfig("pagelogs", values[key].value);
                        let msgbox = $("messageBox");
                        if (__CONFIGS__.MAXLOGS > 0) {
                            while (msgbox.getElementsByClassName("dt").length > __CONFIGS__.MAXLOGS) {
                                msgbox.removeChild(msgbox.getElementsByClassName("dt")[msgbox.getElementsByClassName("dt").length - 1])
                            }
                        }
                    }
                }
            }, {});
        };
        detailtools.appendChild(logs);

        setTooltip(logs, "显示日志<br>记录数");

        //#######################################
        //初始化数据菜单
        //#######################################
        let datatools = $("data-tools");
        datatools.ondblclick = function () {
            requestFullScreen($("main"));
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
                                        __SQLEDITOR__.title = $("sql-title").innerText = report.dataset.title.join("_");
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
                                    __LOGS__.viewMessage(file.name + " ...校验失败,文件或被篡改.", true);
                            } else {
                                __LOGS__.viewMessage(file.name + " ...格式错误.", true);
                            }
                        } else {
                            __LOGS__.viewMessage(file.name + " ...格式错误.", true);
                        }
                    }
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            } else {
                UI.alert.show("提示", "本应用适用于Chrome或Edge浏览器。")
            }
        };
        datatools.appendChild(input);

        let openEchartsFile = document.createElement("div");
        datatools.appendChild(openEchartsFile);
        openEchartsFile.className = "charButton";
        openEchartsFile.innerText = "✓";
        openEchartsFile.style.cssFloat = "left";
        openEchartsFile.onclick = $("open-html-report").onclick = function () {
            $("open-echarts-file").click();
        };
        setTooltip(openEchartsFile, "打开<br>报表");

        let dataReader = document.createElement("div");
        datatools.appendChild(dataReader);
        dataReader.className = "charButton";
        dataReader.innerText = "⚘";
        dataReader.style.cssFloat = "left";
        dataReader.id = "data-reader";
        dataReader.onclick = $("read-xls-file").onclick = function () {
            getDataReader("auto", function (values) {
                __DATASET__.result.push(values);
                viewDataset(__DATASET__.result.length - 1, 0);
            });
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
                UI.getDataSlice("auto", function (values) {
                    for (let i = 0; i < values.length; i++) {
                        __DATASET__.result.push(values[i]);
                    }
                    viewDataset(__DATASET__.result.length - 1, 0);
                })
            }
        };
        setTooltip(dataslice, "数据<br>切片");

        let subtotal = document.createElement("div");
        datatools.appendChild(subtotal);
        subtotal.className = "charButton";
        subtotal.innerHTML = "&#931";//"Σ";
        subtotal.id = "dataset-subtotal";
        let help_datasetsubtotal = $("help-dataset-subtotal");
        subtotal.onclick = help_datasetsubtotal.onclick = function () {
            if (__DATASET__.result.length > 0) {
                UI.getSubtotal("auto", null, function (values) {
                    __DATASET__.result.push(values);
                    viewDataset(__DATASET__.result.length - 1, 0);
                });
            }
        };
        setTooltip(subtotal, "分类<br>计算");

        let download = document.createElement("div");
        datatools.appendChild(download);
        download.className = "charButton";
        download.innerHTML = "&#8675";//"⇣";
        download.id = "dataset-download";
        let help_datasetdownload = $("help-dataset-download");
        download.onclick = help_datasetdownload.onclick = function () {
            function removingRedundant(names, sheetName, index) {
                sheetName = fixFileName(sheetName);
                let x = (typeof index === "undefined" ? 0 : index);
                let name = (x == 0 ? sheetName : sheetName + "(" + x + ")");
                let exist = false;
                for (let i = 0; i < names.length; i++) {
                    if (names[i].toUpperCase() == name.toUpperCase()) {
                        exist = true;
                        x++;
                        break;
                    }
                }
                if (exist) {
                    return removingRedundant(names, sheetName, x);
                } else {
                    names.push(name);
                    return names
                }
            }

            function fixFileName(str) {
                //文件名称合法性修正。
                let sts = ['\\', '\/', ':', '*', '?', '"', '<', '>', '[', ']', '|'];
                for (let i = 0; i < sts.length; i++) {
                    str = str.replaceAll(sts[i], "#");
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
                    let dataset = null;
                    let title = null;
                    switch (__DATASET__.configs.reportType.value) {
                        case "xlsx":
                            dataset = __DATASET__.result[__DATASET__.default.sheet];
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
                            sheetNames = removingRedundant(sheetNames, dataset.title[dataset.title.length - 1]);
                            sheets.push(comment);
                            sheetNames = removingRedundant(sheetNames, "Comment");
                            UI.prompt.show("输入", {"文件名称": dataset.title.join("_")}, "auto", function (args, values) {
                                let title = fixFileName(values["文件名称"]);
                                if (title.trim() != "") {
                                    openDownloadDialog(workbook2blob(args.sheets, args.sheetNames), title + ".xlsx");
                                }
                            }, {sheets: sheets, sheetNames: sheetNames});
                            break;
                        case "xml":
                            dataset = __DATASET__.result[__DATASET__.default.sheet];
                            UI.prompt.show("输入", {"文件名称": dataset.title.join("_")}, "auto", function (args, values) {
                                let title = fixFileName(values["文件名称"]);
                                if (title.trim() != "")
                                    getXMLFile(title, args.dataset);
                            }, {dataset: [dataset]});
                            break;
                    }
                } else if (__DATASET__.configs.reportDownload.value == "all-single") {
                    if (__DATASET__.result.length <= 255) {
                        if (__DATASET__.result.length > 0)
                            UI.confirm.show("注意", "您确定下载 " + __DATASET__.result.length + " 个工作表吗?", "auto", function () {
                                let title = null;
                                switch (__DATASET__.configs.reportType.value) {
                                    case "xlsx":
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
                                            sheetNames = removingRedundant(sheetNames, dataset.title[dataset.title.length - 1]);
                                        }
                                        sheets.push(comment);
                                        sheetNames = removingRedundant(sheetNames, "Comment");
                                        UI.prompt.show("输入", {"文件名称": ""}, "auto", function (args, values) {
                                            let title = fixFileName(values["文件名称"]);
                                            if (title.trim() != "") {
                                                openDownloadDialog(workbook2blob(args.sheets, args.sheetNames), title + ".xlsx");
                                            }
                                        }, {sheets: sheets, sheetNames: sheetNames});
                                        break;
                                    case "xml":
                                        UI.prompt.show("输入", {"文件名称": ""}, "auto", function (args, values) {
                                            let title = fixFileName(values["文件名称"]);
                                            if (title.trim() != "")
                                                getXMLFile(title, args["dataset"]);
                                        }, {dataset: __DATASET__.result});
                                        break;
                                }
                            });
                    } else
                        UI.alert.show("提示", "一个工作簿最多允许有255个数据表!");
                } else if (__DATASET__.configs.reportDownload.value == "all-multi") {
                    if (__DATASET__.result.length <= 255) {
                        if (__DATASET__.result.length > 0)
                            UI.confirm.show("注意", "您确定下载 " + __DATASET__.result.length + " 个工作簿吗?", "auto", function () {
                                let dataset = null;
                                switch (__DATASET__.configs.reportType.value) {
                                    case "xlsx":
                                        for (let d = 0; d < __DATASET__.result.length; d++) {
                                            sheets = [];
                                            sheetNames = [];
                                            dataset = __DATASET__.result[d];
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
                                            sheetNames = removingRedundant(sheetNames, dataset.title[dataset.title.length - 1]);
                                            sheets.push(comment);
                                            sheetNames = removingRedundant(sheetNames, "Comment");
                                            openDownloadDialog(workbook2blob(sheets, sheetNames), fixFileName(dataset.title.join("_")) + ".xlsx");
                                            if (d < (__DATASET__.result.length - 1)) {
                                                let delay = (aoa.length * columns.length) >= 10000 ? (aoa.length * columns.length / 10000) : 1;
                                                sleep(__DATASET__.configs.reportDownloadDelay.value * delay);
                                            }
                                        }
                                        break;
                                    case "xml":
                                        for (let d = 0; d < __DATASET__.result.length; d++) {
                                            dataset = __DATASET__.result[d];
                                            let title = fixFileName(dataset.title.join("_"));
                                            getXMLFile(title, [dataset]);
                                            if (d < (__DATASET__.result.length - 1)) {
                                                let delay = (dataset["data"].length * dataset["columns"].length) >= 10000 ? (dataset["data"].length * dataset["columns"].length / 10000) : 1;
                                                sleep(__DATASET__.configs.reportDownloadDelay.value * delay);
                                            }
                                        }
                                        break;
                                }
                            });
                    } else
                        UI.alert.show("提示", "同时下载的工作簿个数不允许超过255个!");
                }
            }
        };
        setTooltip(download, "下载<br>数据集");

        let remove = document.createElement("div");
        datatools.appendChild(remove);
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
            let histories = Object.keys(__ECHARTS__.history).length;
            if (histories > 0) {
                UI.confirm.show("提示", "是否需要删除缓存视图数据:<dl><li>历史视图( " + histories + "项 )</li><li>组合视图( " + __ECHARTS__.sets.data.length + "项 )</li></dl>", "auto", function (args) {
                    __ECHARTS__.clearHistory();
                }, {});
            }
        };
        setTooltip(removeall, "删除缓存<br>视图数据");

        let fileSecurity = document.createElement("div");
        datatools.appendChild(fileSecurity);
        fileSecurity.className = "charButton";
        fileSecurity.innerText = "☍";
        fileSecurity.onclick = $("file-security").onclick = function () {
            getFileSecurity("auto");
        };
        setTooltip(fileSecurity, "文件加密<br>解密");

        let datasetSetting = document.createElement("div");
        datatools.appendChild(datasetSetting);
        datasetSetting.className = "charButton";
        datasetSetting.innerText = "┅";
        datasetSetting.id = "dataset-setting";
        datasetSetting.onclick = function () {
            __DATASET__.setDatasetConfigs("auto", function () {
                if (__DATASET__.result.length > 0) {
                    viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default);
                }
            });
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
                if (__DATASET__.result.length > 0) {
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
                }
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
            __ECHARTS__.setEchartsConfigs("auto", function (configs) {
                let container = $("tableContainer");
                try {
                    if (__DATASET__.result.length > 0) {
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
                            __DATASET__["result"][__DATASET__.default.sheet],
                            configs);
                        setDragNook(container, echart.getAttribute("_echarts_instance_"));
                    }
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            });
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

                if (__DATASET__.result.length > 0) {
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
                }
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
                if (__DATASET__.result.length > 0) {
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
                }
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        datatools.appendChild(echartsType);
        setTooltip(echartsType, "视图<br>类型");

        let echarts = document.createElement("div");
        datatools.appendChild(echarts);
        echarts.className = "charButton";
        echarts.innerText = "❖";
        echarts.style.cssFloat = "right";
        echarts.id = "dataset-to-charts";
        let help_echarts = $("help-dataset-echarts");
        echarts.onclick = help_echarts.onclick = function () {
            try {
                if (__DATASET__.result.length > 0) {
                    let container = $("tableContainer");
                    try {
                        container.removeAttribute("_echarts_instance_");
                        echarts.getInstanceByDom(container).dispose();
                    } catch (e) {
                    }
                    let dataset = __DATASET__.result[__DATASET__.default.sheet];
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
                }
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        setTooltip(echarts, "绘制<br>视图");

        //其他工具
        $("image-base64").onclick = function () {
            getImageBase64Code("auto");
        };
        //创建系统用户
        $("create-sys-user").onclick = function () {
            UI.prompt.show("创建用户", {"用户名称": ""}, "auto", function (values) {
                let name = values["用户名称"].trim();
                if (name.length >= 2) {
                    let users = {};
                    try {
                        users = JSON.parse(getUserConfig("Users").decode());
                    } catch (e) {
                    }
                    if (typeof users[name] === "undefined") {
                        UI.password.show("用户 " + name + " 的登录密码", {
                            "登录密码": "",
                            "确认密码": ""
                        }, "auto", function (args, values) {
                            let name = args["name"];
                            let users = args["users"];
                            let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                            //必须是8位密码,且必须包含字符和数字
                            let key = values["登录密码"];
                            if (key != values["确认密码"]) {
                                UI.alert.show("提示", "两次密码输入不一致.", "auto");
                            } else if (pattern.test(key) == false) {
                                UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字.", "auto");
                            } else {
                                users[name] = {
                                    password: values["确认密码"].hex_md5_hash(),
                                    date: getNow()
                                };
                                setUserConfig("Users", JSON.stringify(users).encode());
                                location.reload();
                            }
                        }, {name: name, users: users})
                    } else
                        UI.alert.show("提示", "该用户名称已存在！", "auto");
                } else
                    UI.alert.show("注意", "用户名称长度不符合系统要求!", "auto");
            });
        };
        __LOGS__.viewMessage(message + "...OK.");
    } catch (e) {
        __LOGS__.viewMessage(message + "...fails.\n" + e, true);
    }
}

function getEchartsClock() {
    try {
        if (__DATASET__.result.length == 0) {
            try {
                container.removeAttribute("_echarts_instance_");
                echarts.getInstanceByDom(container).dispose();
            } catch (e) {
            }
            let container = $("tableContainer");
            let width = (getAbsolutePosition(container).width * 1) + "px";
            let height = (getAbsolutePosition(container).height * 1) + "px";
            let configs = JSON.stringify(__ECHARTS__.configs);
            configs = JSON.parse(configs);
            //复制configs
            configs.echartsType.value = "Clock";
            configs.titleDisplay.value = "false";
            configs.renderer.value = "canvas";
            configs.toolboxDisplay.value = "false";
            let echart = getEcharts(
                container,
                width,
                height,
                null,
                configs);
        }
    } catch (e) {
        __LOGS__.viewError(e);
    }
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

function setTooltip(parent, text) {
    parent.onmouseenter = function () {
        if (parent.className == "charButton") {
            if (typeof $("tooltip-" + parent.id) !== "undefined") {
                let tip = document.createElement("span");
                tip.className = "tooltip-charButton";
                tip.id = "tooltip-" + parent.id;
                tip.innerHTML = text;
                let posi = getAbsolutePosition(parent);
                tip.style.top = (posi.top - 40)+ "px";
                tip.style.left = (posi.left - 18) + "px";
                tip.style.width = posi.width * 2 + "px";
                tip.style.height = (posi.height - 8) + "px";
                $("page").appendChild(tip);
            }
        } else {
            if (typeof $("tooltip-" + parent.id) !== "undefined") {
                let tip = document.createElement("span");
                tip.className = "tooltip-button";
                tip.id = "tooltip-" + parent.id;
                tip.innerHTML = text;
                let posi = getAbsolutePosition(parent);
                tip.style.top = (posi.top - 42) + "px";
                tip.style.left = posi.left + "px";
                tip.style.width = (typeof width == "undefined" ? posi.width : width) + "px";
                tip.style.height = (posi.height - 5) + "px";
                $("page").appendChild(tip);
            }
        }
    };
    parent.onmouseleave = function () {
        if (typeof $("tooltip-" + parent.id) !== "undefined")
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
            geoCoordMap.setMapConfig("auto");
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
        UI.prompt.show("输入", {"布局名称": ""}, "auto", function (args, values) {
            let name = values["布局名称"];
            let ex = false;
            if (name != "") {
                for (let n in __ECHARTS__.layouts) {
                    if (n == name) {
                        ex = true;
                        break;
                    }
                }
                if (ex == true)
                    UI.alert.show("提示", "名称 " + name + " 已经存在.");
                else {
                    __ECHARTS__.layouts[name] = {data: [[0, 0, 99, 99],], position: "absolute"};
                    getLayoutslist($("multi-layouts-list"))
                }
            }
        }, {});
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
                UI.alert.show("提示","布局 " + name + " 修改成功.")
            }catch (e) {
                UI.alert.show("提示","布局格式输入错误，请检查！\r\n请遵循[左边距%,上边距%,宽度%,高度%]设置.")
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
            text.innerHTML = history.dataset.title[0];
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


function getImageBase64Code(parent) {
    if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
            } else {
                parent = document.body;
            }
        }

        let container = document.createElement("div");
        container.id = "ui_imageBase";
        container.className = "ui-container-background";
        parent.appendChild(container);

    let content = document.createElement("div");
    content.id = "image-base64-code";
    content.className = "ui-container-body";
    content.style.width = "600px";
    container.appendChild(content);

    let title = document.createElement("div");
    title.className = "ui-container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 设置背景";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
    content.appendChild(tabtools);

    let source = document.createElement("input");
    source.type = "file";
    source.id = "source-image-file";
    source.style.display = "none";
    source.onchange = function () {
        if (this.files.length > 0) {
            let file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                UI.alert.show("提示","请选择图片文件！");
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
    content.appendChild(source);

    let filecontainer = document.createElement("div");
    filecontainer.className = "tabToolbar-content-container";
    filecontainer.id = "image-container";
    filecontainer.style.width = "100%";
    filecontainer.style.height = "370.8px";
    content.appendChild(filecontainer);

    let imagecode = document.createElement("textarea");
    imagecode.id = "source-image-file-code";
    imagecode.style.cssText = "width: 100%;\n" +
        "height: 370.8px;\n" +
        "resize: none;" +
        "display: none;" +
        "font-size: 90%;\n";
    imagecode.type = "textarea";
    content.appendChild(imagecode);

    let br = document.createElement("hr");
    br.className = "br";
    content.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    content.appendChild(tool);

    let show = document.createElement("button");
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

    let toimage = document.createElement("button");
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
        setClipboardListener($("source-image-file-code"));
        document.execCommand('copy');   // 执行copy命令触发监听
        UI.alert.show("提示","已复制到粘贴板.");
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
            UI.alert.show("提示","背景图片文件(" + Math.round(file.size / 1024 / 1024 * 100) / 100 + "MB)不能大于 0.5MB.")
        }
    };
    tool.appendChild(setBackgroundImage);

    let cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = close.onclick = function () {
        // document.removeEventListener('copy', handler);   // 移除copy监听，不产生影响
        parent.removeChild($("ui_imageBase"));
    };
    tool.appendChild(cancel);
    setDialogDrag(title);
}

function  setClipboardListener(target) {
    function handler(event) {
        if (typeof target.value != "undefined")
            event.clipboardData.setData("text/plain", target.value);
        else
            event.clipboardData.setData("text/plain", target.innerText);
        event.preventDefault();
    }
    document.addEventListener("copy", handler);   // 增加copy监听
}

function getXMLFile(title, workbook) {
    function removingRedundant(names, sheetName, index) {
        sheetName = sheetName.split("*").join("#").split("?").join("#").split("[").join("#").split("]").join("#").split("\\").join("#").split("\/").join("#");
        let x = (typeof index === "undefined" ? 0 : index);
        let name = (x == 0 ? sheetName : sheetName + "(" + x + ")");
        let exist = false;
        for (let i = 0; i < names.length; i++) {
            if (names[i].toUpperCase() == name.toUpperCase()) {
                exist = true;
                x++;
                break;
            }
        }
        if (exist) {
            return removingRedundant(names, sheetName, x);
        } else {
            names.push(name);
            return names
        }
    }

    try {
        let sheetNames = [];
        let xml = '<?xml version="1.0"?>' +
            '<?mso-application progid="Excel.Sheet"?>' +
            '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' +
            ' xmlns:o="urn:schemas-microsoft-com:office:office"' +
            ' xmlns:x="urn:schemas-microsoft-com:office:excel"' +
            ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' +
            ' xmlns:html="http://www.w3.org/TR/REC-html40">' +
            '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">' +
            '<Author>' + __VERSION__.name.split("<").join("&lt;").split(">").join("&gt;") + '</Author>' +
            '<LastAuthor></LastAuthor>' +
            '<Created>' + new Date() + '</Created>' +
            '<Version>1.0.0</Version>' +
            '</DocumentProperties>' +
            '<Styles>' +
            '<Style ss:ID="Default" ss:Name="Normal">' +
            '<Alignment ss:Vertical="Center"/>' +
            '<Borders/>' +
            '<Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"/>' +
            '<Interior/>' +
            '<NumberFormat ss:Format="#,##0.00_ "/>' +
            '<Protection/>' +
            '</Style>' +
            '</Styles>';
        for (let index = 0; index < workbook.length; index++) {
            let dataset = workbook[index];
            sheetNames = removingRedundant(sheetNames, dataset.title[dataset.title.length - 1]);
            xml += '<Worksheet ss:Name="' + sheetNames[index].split("<").join("&lt;").split(">").join("&gt;") + '">\n' +
                '<Table ss:ExpandedColumnCount="' + dataset["columns"].length + '" ss:ExpandedRowCount="' + dataset["data"].length + 1 + '">';
            let cols = dataset["columns"].reduce(function (tmp, column) {
                tmp += '<Cell><Data ss:Type="String">' + column.name.split("<").join("&lt;").split(">").join("&gt;") + '</Data></Cell>';
                return tmp;
            }, '<Row>');
            cols += '</Row>';
            xml += cols;
            for (let i = 0; i < dataset["data"].length; i++) {
                let items = dataset["data"][i];
                let row = '<Row>';
                for (let c = 0; c < dataset["columns"].length; c++) {
                    let item = items[dataset["columns"][c].name];
                    let cell = '<Cell><Data ss:Type="' + (item.type == 'number' ? 'Number' : 'String') + '">' + (item.type == 'number' ? item.value : (typeof item.value !== "undefined" ? item.value.split("<").join("&lt;").split(">").join("&gt;") : "")) + '</Data></Cell>';
                    row += cell;
                }
                row += '</Row>';
                xml += row;
            }
            xml += '</Table>\n</Worksheet>';
        }
        xml += '</Workbook>';
        let blob = new Blob([str2ab(xml)], {type: 'text/xml'});
        openDownloadDialog(blob, title + '.xml')
    } catch (e) {
        __LOGS__.viewError(e);
    }
}
