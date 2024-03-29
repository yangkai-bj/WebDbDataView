
const __CONFIGS__ = {
    STORAGE: {
        DATABASES: "__WEB_SQLITE_DATABASES__",
        SCRIPTS: "__WEB_SQLITE_SCRIPTS__",
        DATASET: "__WEB_SQLITE_DATASET__",
        CONFIGS: "__WEB_SQLITE_CONFIGS__",
        LOGS: "__WEB_SQLITE_LOGS__",
    },
    DATABASES: [],
    CURRENT_DATABASE: {index: null, value: null, connect: null},
    TABLES: [],
    CURRENT_TABLE: {name: null, sql: "", structure: {}, type: ""},
    FULLSCREEN: {element: null},
    TEMPORARY_FILES: "/upload"
};

var __LOGS__ = {
    user: {},
    data: {},
    configs: {
        logsDays: {
            name: "保留日志天数",
            value: "7",
            options: ["3", "4", "5", "6", "7"],
            type: "select"
        },
        logsDaySize: {
            name: "每天日志条数",
            value: "100",
            options: ["100","200","300", "400", "500"],
            type: "select"
        },
        logsPageSize: {
            name: "页面日志条数",
            value: "50",
            options: ["50", "100", "500"],
            type: "select"
        },
        logsOrderby: {
            name: "日志排序方式",
            value: "DESC",
            options: ["ASC", "DESC"],
            type: "select"
        },
    },
    init: function () {
        let config = getUserConfig("logsConfig");
        if (config != null) {
            config = JSON.parse(config);
            for (let key in config) {
                try {
                    this.configs[key].value = config[key];
                } catch (e) {
                }
            }
        } else {
            setUserConfig("logsConfig", JSON.stringify(this.getConfigItems()));
        }

        let logs = getUserLogs();
        if (typeof logs != "undefined") {
            try {
                logs = JSON.parse(logs);
                let list = [];
                for (let day in logs) {
                    list.push(day);
                }
                list.sort(function (a, b) {
                    return (new Date(a)) - (new Date(b))
                });
                let days = Number(this.configs.logsDays.value);
                if (list.length > days) {
                    let retain = list.slice(list.length - days);
                    let results = retain.reduce(function (result, day) {
                            result[day] = logs[day];
                            return result;
                        },
                        {});
                    this.data = results;
                    setUserLogs(JSON.stringify(results));
                } else
                    this.data = logs;
            }catch (e) {
                console.log(e);
            }
        }
    },

    getConfigItems: function(){
        let configs = {};
        for(let key in this.configs){
            configs[key]  = this.configs[key].value;
        }
        return configs;
    },

     getConfigs: function(){
        let configs = {};
        for(let key in this.configs) {
            let config = this.configs[key];
            configs[key] = {
                name: config.name,
                type: config.type,
                value: config.value
            };
        }
        return configs;
    },

    setConfigs: function (parent, callback) {
        let config = getUserConfig("logsConfig");
        if (config != null) {
            config = JSON.parse(config);
            for (let key in config) {
                try {
                    this.configs[key].value = config[key];
                } catch (e) {
                }
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
        container.id = "ui_logsConfigs";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.className = "ui-container-body";
        content.id = "logs-configs-Content";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "日志设置 ";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let itemcontainer = document.createElement("div");
        itemcontainer.id = itemcontainer.className = "ui-container-scroll-div";
        content.appendChild(itemcontainer);

        for (let name in this.configs) {
            let item = document.createElement("div");
            item.className = "ui-container-item";
            itemcontainer.appendChild(item);
            let span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.innerHTML = this.configs[name].name + ":";
            item.appendChild(span);
            if (this.configs[name].type == "input") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "input";
                input.className = "ui-container-item-input";
                input.value = this.configs[name].value;
                input.onchange = function () {
                    __LOGS__.configs[this.id].value = this.value;
                };
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "select") {
                let input = document.createElement("select");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "select";
                input.className = "ui-container-item-input";
                for (let i = 0; i < this.configs[name].options.length; i++) {
                    if (typeof this.configs[name].options[i] === "object")
                        input.options.add(this.configs[name].options[i]);
                    else
                        input.options.add(new Option(this.configs[name].options[i]));
                }
                input.value = this.configs[name].value;
                input.onchange = function () {
                    __LOGS__.configs[this.id].value = this.value;
                };
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "color") {
                let input = UI.colorChoice(name, this.configs[name].value, function (value) {
                    __LOGS__.configs[this.id].value = this.value;
                });
                input.style.cssFloat = "right";
                input.id = name;
                input.className = "ui-container-item-color";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "boolean") {
                let input = UI.booleanChoice(this.configs[name].value.toBoolean(), function (value) {
                    __LOGS__.configs[name].value = (value ? "true" : "false");
                });
                input.id = name;
                input.className = "ui-container-item-boolean";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "range") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "range";
                input.min = __LOGS__.configs[name].attribute.min;
                input.max = __LOGS__.configs[name].attribute.max;
                input.step = __LOGS__.configs[name].attribute.step;
                input.className = "ui-container-item-range";
                input.title = __LOGS__.configs[name].value;
                input.value = Number(__LOGS__.configs[name].value.replace(new RegExp(__LOGS__.configs[name].attribute.unit, "g"), ""));
                input.onchange = function () {
                    __LOGS__.configs[this.id].value = this.title = (this.value + __LOGS__.configs[this.id].attribute.unit);
                };
                item.appendChild(input);
            } else if (this.configs[name].type == "ranges") {
                let input = UI.rangesChoice(
                    __LOGS__.configs[name].attribute.min,
                    __LOGS__.configs[name].attribute.max,
                    __LOGS__.configs[name].attribute.unit,
                    __LOGS__.configs[name].value,
                    function (value) {
                        __LOGS__.configs[name].value = value;
                    });
                input.id = name;
                input.className = "ui-container-item-ranges";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "number") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "number";
                input.min = __LOGS__.configs[name].attribute.min;
                input.max = __LOGS__.configs[name].attribute.max;
                input.step = __LOGS__.configs[name].attribute.step;
                input.className = "ui-container-item-number";
                input.title = __LOGS__.configs[name].value;
                input.value = __LOGS__.configs[name].value;
                input.onkeypress = function () {
                    return false;
                };
                input.onchange = function () {
                    __LOGS__.configs[this.id].value = this.title = this.value;
                };
                item.appendChild(input);
            } else if (this.configs[name].type == "hr") {
                span.innerHTML = "[ " + this.configs[name].name + " ]";
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
            setUserConfig("logsConfig", JSON.stringify(__LOGS__.getConfigItems()));
            callback();
            parent.removeChild($("ui_logsConfigs"));
        };
        c.appendChild(b);

        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "重置";
        b.onclick = close.onclick = function () {
            UI.confirm.show("注意", "您确定要重置全部日志参数吗?", "auto", function () {
                setUserConfig("logsConfig", JSON.stringify({}));
                parent.removeChild($("ui_logsConfigs"));
                UI.alert.show("提示", "日志参数已恢复为系统初始值,系统将重新载入页面...");
                location.reload();
            });
        };
        c.appendChild(b);

        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            parent.removeChild($("ui_logsConfigs"));
        };
        c.appendChild(b);

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
    },

    delete: function (date) {
        if (typeof this.data[date] != "undefined") {
            delete this.data[date];
            setUserLogs(JSON.stringify(this.data));
        }
    },

    saveas: function (date) {
        let sheets = [];
        let sheetNames = [];
        let comment = [
            ['Application:', __VERSION__.name],
            ['Version:', __VERSION__.version + " (" + __VERSION__.date + ")"],
            ['Creation time:', getNow()],
            ['Get help from:', __VERSION__.url],
        ];
        let aoa = [];
        let columns = ["日期", "时间", "日志", "警告", "允许复制"];
        aoa.push(columns);
        try {
            let logs = this.data[date];
            for (let i = 0; i < logs.length; i++) {
                let log = logs[i];
                let row = [date];
                row.push(log.time);
                row.push(log.message.decode());
                row.push(log.warning);
                row.push(log.copyto);
                aoa.push(row);
            }
        } catch (e) {
        }
        sheets.push(aoa);
        let sheetname = date;
        sheetNames.push(sheetname);
        sheets.push(comment);
        sheetNames.push("Comment");
        openDownloadDialog(workbook2blob(sheets, sheetNames), __VERSION__.name.replaceAll(" ", "_") + "_logs_" + date + ".xlsx");
    },

    add: function (log) {
        let date = log.time.format("yyyy-MM-dd");
        log.time = log.time.format("hh:mm:ss S");
        log.message = log.message.encode();
        if (typeof this.data[date] == "undefined")
            this.data[date] = [];
        if (this.data[date].length == Number(this.configs.logsDaySize.value) - 10)
            UI.alert.show("注意", "当前日志数量上限为" + this.configs.logsDaySize.value + "，系统将自动清理过往日志。");
        if (this.data[date].length >= Number(this.configs.logsDaySize.value))
            this.data[date] = this.data[date].slice(1);
        this.data[date].push(log);
        setUserLogs(JSON.stringify(this.data));
    },

    viewError: function (parent, error) {
        let names = {
            EvalError: "eval的使用与定义不一致",
            RangeError: "数值越界",
            ReferenceError: "非法或不能识别的引用数值",
            SyntaxError: "发生语法解析错误",
            TypeError: "操作数类型错误",
            URIError: "URI处理函数使用不当",
            QuotaExceededError: "超出存储限额"
        };
        this.viewMessage(error.stack, true);

        let container = document.createElement("div");
        container.id = "ui_error";
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
        content.id = "error-dialog";
        content.className = "ui-container-body";
        content.style.width = "550px";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
        let span = document.createElement("span");
        span.className = span.id = "error-title";

        span.innerHTML = (typeof names[error.name] !== "undefined" ? names[error.name] : "其他未定义错误");
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
    },
    viewMessage: function (msg, warning, copyto, type) {
        let log = {
            time: new Date(),
            message: msg,
            warning: typeof warning == "undefined" ? false : warning,
            copyto: typeof copyto === 'undefined' ? false : ((typeof warning == "undefined" ? false : warning) ? true : copyto),
            type: typeof type === 'undefined' ? 'text' : type,
        };

        let msgbox = $("messageBox");
        let dt = document.createElement("dt");
        dt.type = "dt";
        dt.className = "dt";
        dt.id = dt.innerText = log.time.format("yyyy-MM-dd hh:mm:ss S");
        if (log.copyto) {
            let copyto = __SYS_IMAGES_SVG__.getImage("copy", __THEMES__.get().color, "18px", '18px', __THEMES__.get().hover);
            copyto.title = "复制";
            copyto.style.cssFloat = "right";
            copyto.onclick = function () {
                let target = this.parentNode.getElementsByClassName("message")[0];
                setClipboardListener(target);
                document.execCommand("copy");
                UI.alert.show("提示", "日志内容已复制到粘贴板.");
            };
            dt.appendChild(copyto);
        }

        if (this.configs.logsOrderby.value == "DESC") {
            let first = msgbox.firstChild;
            msgbox.insertBefore(dt, first);
        } else
            msgbox.appendChild(dt);
        dt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            //滚动参数
            //behavior: 定义缓动动画， "auto", "instant", 或 "smooth"。默认为 "auto"。
            //block: "start", "center", "end", 或 "nearest"。默认为 "start"。
            //inline:"start", "center", "end", 或 "nearest"。默认为 "nearest"。

        let message = document.createElement("dd");
        message.type = "dd";
        message.className = "message";
        if (log.type == "text")
             message.innerText = log.message;
        else
            message.innerHTML = log.message;
        if (warning)
            message.style.color = "red";
        dt.appendChild(message);
        __LOGS__.add(log);

        //保留日志设置
        let logsPageSize = Number(__LOGS__.configs.logsPageSize.value);
        if (logsPageSize > 0) {
            let dts = msgbox.getElementsByClassName("dt");
            if (dts.length > logsPageSize) {
                if (__LOGS__.configs.logsOrderby.value == "DESC")
                    msgbox.removeChild(dts[dts.length - 1]);
                else
                    msgbox.removeChild(dts[0]);
            }
        }
        return message;
    }
};

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
    sent: false,
    abstract: null,
    elements: {},
    checking: {
        certificated: false,
    },
    getTime: function (index, timeout) {
        let userTimelength = getTimesLength(timeout, "毫秒");
        this.elements[index].innerHTML = "时间:" + (this.time == null ? "" : this.time.format("yyyy-MM-dd hh:mm")) + " 更新频率:" + (userTimelength.value + userTimelength.unit);
        this.elements[index].title = "授时服务:\n" +
            (this.server == null ? "" : this.server) + "\n" +
            (this.abstract == null ? "" : this.abstract);

        if (typeof this.elements[index] != "undefined") {
            if (this.updatetime != null) {
                if ((new Date() - this.updatetime) < timeout) {
                    setTimeout(function () {
                        __XMLHTTP__.getTime(index, timeout);
                    }, timeout);
                } else {
                    if (this.sent == false)
                        this.getResponse();
                    setTimeout(function () {
                        __XMLHTTP__.getTime(index, timeout);
                    }, 0);
                }
            } else {
                if (this.sent == false)
                    this.getResponse();
                setTimeout(function () {
                    __XMLHTTP__.getTime(index, timeout);
                }, 0);
            }
        }
    },
    hook: function (dom, timeout) {
        let index = dom.id;
        this.elements[index] = dom;
        this.getTime(index, timeout);
    },
    unhook: function (dom) {
        delete this.elements[dom.id];
    },
    getResponse: function () {
        let xhr = this.request();
        // 通过get或HEAD的方式请求当前文件
        if (xhr != null) {
            let message = __LOGS__.viewMessage("发送授时请求...");
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
                        message.innerText += "授时: " + __XMLHTTP__.time.format("yyyy/MM/dd hh:mm");
                    } else if (xhr.status == 404) {
                        __XMLHTTP__.server = null;
                        __XMLHTTP__.abstract = null;
                        __XMLHTTP__.time = null;
                        __XMLHTTP__.updatetime = null;
                    }
                } catch (e) {
                    console.log("__XMLHTTP__getResponse:" + e);
                } finally {
                    __XMLHTTP__.sent = false;
                }
            };
            xhr.send(null);
            this.sent = true;
        }
    },
    certificate: function (byServer) {
        let title = document.title;
        let scripts = [
            {name: "主程序", src: "configs.js", type: "text/javascript", element: "script", load: false},
            {name: "主程序", src: "WebDBDataView.js", type: "text/javascript", element: "script", load: false},
            {name: "主程序", src: "themes/default.css", type: "text/css", element: "link", load: false},
            {name: "主程序", src: "WebDBDataView.css", type: "text/css", element: "link", load: false},
            {name: "主程序", src: "UI.js", type: "text/javascript", element: "script", load: false},
            {name: "资源库", src: "resources.js", type: "text/javascript", element: "script", load: false},
            {name: "公共函数", src: "FunctionsComponent.js", type: "text/javascript", element: "script", load: false},
            {
                name: "Echarts",
                src: __ECHARTS__.configs.version.value,
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
            {name: "ecStat", src: "echarts/ecStat.min.js", type: "text/javascript", element: "script", load: true},
            {
                name: "Echarts",
                src: "echarts/echarts-gl.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: "echarts/echarts-wordcloud.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {
                name: "Echarts",
                src: "echarts/echarts-liquidfill.min.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {name: "世界地图组件", src: "echarts/map/world.js", type: "text/javascript", element: "script", load: true},
            {
                name: "中国地图组件",
                src: "echarts/map/china-and-region.js",
                type: "text/javascript",
                element: "script",
                load: true
            },
            {name: "常用统计函数", src: "StatisticsComponent.js", type: "text/javascript", element: "script", load: true},
            {name: "固定报表组件", src: "report.js", type: "text/javascript", element: "script", load: true},
            {name: "文件加密组件", src: "FileSecurityComponent.js", type: "text/javascript", element: "script", load: true},
            {name: "数据读取组件", src: "DataReaderComponent.js", type: "text/javascript", element: "script", load: true},
            {name: "批量邮件组件", src: "MailComponent.js", type: "text/javascript", element: "script", load: true},
        ];

        if (byServer) {
            for (let i = 0; i < scripts.length; i++) {
                let message = null;
                if (scripts[i].load) {
                    document.title = "加载(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    message = __LOGS__.viewMessage("加载 " + scripts[i].name + "...");
                } else {
                    document.title = "验证(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    message = __LOGS__.viewMessage("验证 " + scripts[i].name + "...");
                }

                let xhr = this.request();
                xhr["message"] = message;
                if (xhr != null) {
                    xhr.open("GET", scripts[i].src + "?timestamp=" + new Date().format("yyyyMMddhhmmssS"), true);
                    xhr.onreadystatechange = function () {
                        try {
                            if (xhr.readyState == 4 && xhr.status == 404)
                                this.message.innerText += (scripts[i].src + "...fails.");
                            else if (xhr.readyState == 4 && xhr.status == 200) {
                                let url = xhr.responseURL.split("?")[0];
                                if (scripts[i].load == false) {
                                    url = url.split("/");
                                    this.message.innerText += (url[url.length - 1] + "...OK.");
                                } else {
                                    switch (scripts[i].element) {
                                        case "script":
                                            let script = document.createElement(scripts[i].element);
                                            script.type = scripts[i].type;
                                            script.id = "onload-" + scripts[i].element + "-" + i;
                                            script.src = xhr.responseURL.split("?")[0];
                                            document.head.appendChild(script);
                                            url = url.split("/");
                                            this.message.innerText += (url[url.length - 1] + "...OK.");
                                            break;
                                        case "link":
                                            let link = document.createElement(scripts[i].element);
                                            link.type = scripts[i].type;
                                            link.id = "onload-" + scripts[i].element + "-" + i;
                                            link.rel = "stylesheet";
                                            link.href = xhr.responseURL.split("?")[0];
                                            document.head.appendChild(link);
                                            url = url.split("/");
                                            this.message.innerText += (url[url.length - 1] + "...OK.");
                                            break;
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("__XMLHTTP__.certificate:" + e);
                        }
                    };
                    xhr.onload = function () {

                    };
                    xhr.onerror = function (e) {
                        this.message += e;
                    };
                    xhr.onabort = function () {
                        this.message += "中止.";
                    };
                    xhr.ontimeout = function () {
                        this.message += "超时.";
                    };

                    xhr.send(null);
                }
                sleep(100);
            }
        } else {
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].load) {
                    document.title = "加载(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    let message = __LOGS__.viewMessage("加载 " + scripts[i].name + "...");
                    switch (scripts[i].element) {
                        case "script":
                            let script = document.createElement(scripts[i].element);
                            script.type = scripts[i].type;
                            script.id = "onload-" + scripts[i].element + "-" + i;
                            script.src = scripts[i].src;
                            document.head.appendChild(script);
                            message.innerText += (scripts[i].src + "...OK.");
                            break;
                        case "link":
                            let link = document.createElement(scripts[i].element);
                            link.type = scripts[i].type;
                            link.id = "onload-" + scripts[i].element + "-" + i;
                            link.rel = "stylesheet";
                            link.href = scripts[i].src;
                            document.head.appendChild(link);
                            message.innerText += (scripts[i].src + "...OK.");
                            break;
                    }
                } else {
                    document.title = "验证(" + Math.floor((i + 1) * 100 / scripts.length) + "%)" + scripts[i].name + "...";
                    let message = __LOGS__.viewMessage("验证 " + scripts[i].name + "...");
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
                    message.innerText += (scripts[i].src + "..." + (checked ? "OK." : "fails."));
                }
                sleep(100);
            }
        }
        document.title = title;
        this.checking.certificated = true;
    }
};

var __SQLEDITOR__ = {
    title: null,
    codeMirror: null,
    parameter: {},
    configs: {
        codeMirrorTheme: {
            name: "主题",
            value: JSON.stringify({name: "default", href: "codemirror/theme/default.css"}),
            options: [
                new Option("默认", JSON.stringify({name: "default", href: "codemirror/theme/default.css"})),
                new Option("黑色", JSON.stringify({name: "black", href: "codemirror/theme/black.css"})),
                new Option("粉色", JSON.stringify({name: "pink", href: "codemirror/theme/pink.css"})),
                new Option("墨绿", JSON.stringify({
                    name: "blackish-green",
                    href: "codemirror/theme/blackish-green.css"
                })),
                new Option("蓝色", JSON.stringify({name: "cobalt", href: "codemirror/theme/cobalt.css"})),
                new Option("深蓝", JSON.stringify({name: "duotone-light", href: "codemirror/theme/duotone-light.css"})),
                new Option("幻想", JSON.stringify({name: "rubyblue", href: "codemirror/theme/rubyblue.css"})),
                new Option("初心", JSON.stringify({name: "solarized light", href: "codemirror/theme/solarized.css"})),
                new Option("宁静", JSON.stringify({name: "darcula", href: "codemirror/theme/darcula.css"})),
                new Option("优雅", JSON.stringify({name: "elegant", href: "codemirror/theme/elegant.css"})),
                new Option("矩阵", JSON.stringify({name: "the-matrix", href: "codemirror/theme/the-matrix.css"})),
                new Option("锐利", JSON.stringify({name: "yonce", href: "codemirror/theme/yonce.css"})),
                new Option("黄昏", JSON.stringify({name: "zenburn", href: "codemirror/theme/zenburn.css"})),
                new Option("黯然", JSON.stringify({name: "eclipse", href: "codemirror/theme/eclipse.css"})),
                new Option("透明", JSON.stringify({name: "transparent", href: "codemirror/theme/transparent.css"})),
            ],
            type: "select"
        },
        codeMirrorMode: {
            name: "模式",
            value: "text/x-mysql",
            options: [new Option("MySQL", "text/x-mysql"), new Option("SQLite", "text/x-sqlite"), new Option("HTML", "text/html"), new Option("函数", "text/javascript")],
            type: "select"
        },
        codeMirrorHeight: {
            name: "高度",
            value: "250px",
            type: "range",
            attribute: {min: 250, max: 500, step: 10, unit: "px"}
        },
        codeMirrorFontSize: {
            name: "字号",
            value: "90%",
            type: "range",
            attribute: {min: 90, max: 150, step: 10, unit: "%"}
        },
        codeMirrorRulers: {
            name: "标尺数量",
            value: 6,
            type: "number", attribute: {min: 0, max: 10, step: 1}
        },
        codeMirrorRulerWidth: {
            name: "标尺宽度",
            value: "40",
            type: "range",
            attribute: {min: 10, max: 100, step: 10, unit: ""}
        },

        codeMirrorLineNumber: {
            name: "显示行号",
            value: "true",
            type: "boolean"
        },
        codeMirrorSmartIndent: {
            name: "智能缩进",
            value: "true",
            type: "boolean"
        },
        codeMirrorMatchBrackets: {
            name: "匹配括号",
            value: "true",
            type: "boolean"
        },
        codeMirrorAutofocus: {
            name: "自动焦点",
            value: "true",
            type: "boolean"
        },
        codeMirrorBreakpoints: {
            name: "显示断点",
            value: "false",
            type: "boolean"
        },
        codeMirrorCharset: {
            name: "字符集",
            value: "UTF-8",
            options: [new Option("UTF-8", "UTF-8"), new Option("GBK", "GBK")],
            type: "select"
        },
    },

    getConfigItems: function () {
        let configs = {};
        for (let key in this.configs) {
            configs[key] = this.configs[key].value;
        }
        return configs;
    },

    getConfigs: function () {
        let configs = {};
        for (let key in this.configs) {
            let config = this.configs[key];
            configs[key] = {
                name: config.name,
                type: config.type,
                value: config.value
            };
        }
        return configs;
    },

    reset: function () {
        try {
            if (this.codeMirror != null) {
                this.codeMirror.setOption("mode", (this.configs.codeMirrorMode.value == "text/html" ? "text/javascript" : this.configs.codeMirrorMode.value));
                let theme = JSON.parse(this.configs.codeMirrorTheme.value);
                $("sqlediterTheme").href = theme.href;
                this.codeMirror.setOption("theme", theme.name);
                let colors = ["#fcc", "#ccf", "#fcf", "#aff", "#cfc", "#f5f577"];
                let rulers = [];
                if (Number(this.configs.codeMirrorRulers.value) >= 1) {
                    for (let i = 1; i <= Number(this.configs.codeMirrorRulers.value); i++) {
                        rulers.push({
                            color: colors[i % colors.length],
                            column: i * Number(this.configs.codeMirrorRulerWidth.value),
                            lineStyle: "dotted"
                        });
                        //solid//dashed//dash-dot//dotted
                    }
                }
                this.codeMirror.setOption("rulers", rulers);
                this.codeMirror.setOption("lineNumbers", this.configs.codeMirrorLineNumber.value.toBoolean());
                this.codeMirror.setOption("smartIndent", this.configs.codeMirrorSmartIndent.value.toBoolean());
                this.codeMirror.setOption("matchBrackets", this.configs.codeMirrorMatchBrackets.value.toBoolean());
                this.codeMirror.setOption("autofocus", this.configs.codeMirrorAutofocus.value.toBoolean());
                this.codeMirror.setOption("gutters", [
                    this.configs.codeMirrorLineNumber.value.toBoolean() ? "CodeMirror-linenumbers" : "",
                    this.configs.codeMirrorBreakpoints.value.toBoolean() ? "breakpoints" : ""
                ]);
                let mirr = $("sqlContainer").getElementsByTagName("div");
                for (let i = 0; i < mirr.length; i++) {
                    if (mirr[i].className.split(" ")[0] == "CodeMirror") {
                        mirr[i].style.fontSize = this.configs.codeMirrorFontSize.value;
                        mirr[i].style.height = "100%";
                    }
                }
            }
        } catch (e) {
            __LOGS__.viewError("auto", e);
        }
    },

    init: function (textarea) {
        let messasge = __LOGS__.viewMessage("初始化脚本编辑器...");
        try {
            let theme = JSON.parse(this.configs.codeMirrorTheme.value);
            $("sqlediterTheme").href = theme.href;
            let colors = ["#fcc", "#ccf", "#fcf", "#aff", "#cfc", "#f5f577"];
            let rulers = [];
            if (Number(this.configs.codeMirrorRulers.value) >= 1) {
                for (let i = 1; i <= Number(this.configs.codeMirrorRulers.value); i++) {
                    rulers.push({
                        color: colors[i % colors.length],
                        column: i * Number(this.configs.codeMirrorRulerWidth.value),
                        lineStyle: "dotted"
                    });
                    //solid//dashed//dash-dot//dotted
                }
            }
            let options = {
                mode: (this.configs.codeMirrorMode.value == "text/html" ? "text/javascript" : this.configs.codeMirrorMode.value),
                theme: theme.name,
                indentWithTabs: true,
                smartIndent: this.configs.codeMirrorSmartIndent.value.toBoolean(),
                lineNumbers: this.configs.codeMirrorLineNumber.value.toBoolean(),
                matchBrackets: this.configs.codeMirrorMatchBrackets.value.toBoolean(),
                autofocus: this.configs.codeMirrorAutofocus.value.toBoolean(),
                rulers: rulers,
                gutters: [
                    this.configs.codeMirrorLineNumber.value.toBoolean() ? "CodeMirror-linenumbers" : "",
                    this.configs.codeMirrorBreakpoints.value.toBoolean() ? "breakpoints" : ""
                ],
                extraKeys: {
                    "F10": "autocomplete",
                    "F11": function (cm) {
                        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                    },
                    "Esc": function (cm) {
                        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                    },
                    "Shift-F":
                        "findPersistent"
                },
                hintOptions: {
                    tables: {}
                }
            };

            textarea.placeholder = "\n" +
                "F10 自动完成\n" +
                "F11 全屏编辑切换;Esc 取消全屏\n" +
                "Ctrl-Z 撤销键入\n" +
                "Ctrl-Y 恢复键入\n" +
                "Shift-F 查找\n" +
                "Shift-Ctrl-F 查找替换\n" +
                "Shift-Ctrl-R 查找全部并替换\n";
            this.codeMirror = CodeMirror.fromTextArea(textarea, options);
            this.codeMirror.on("gutterClick", function (cm, n) {
                function marker() {
                    let marker = document.createElement("div");
                    marker.style.color = __THEMES__.get().color;
                    marker.innerHTML = "●";
                    return marker;
                }

                let info = cm.lineInfo(n);
                cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : marker());
            });
            let mirr = $("sqlContainer").getElementsByTagName("div");
            for (let i = 0; i < mirr.length; i++) {
                if (mirr[i].className.split(" ")[0] == "CodeMirror") {
                    mirr[i].style.fontSize = this.configs.codeMirrorFontSize.value;
                    mirr[i].style.height = "100%";
                }
            }
            messasge.innerText += "OK.";
        } catch (e) {
            messasge.innerText += ("fails.<br>" + e);
            __LOGS__.viewError("auto", e);
        }
    },
    setConfigs: function (parent, callback) {
        let config = getUserConfig("codeMirrorConfig");
        if (config != null) {
            config = JSON.parse(config);
            for (let key in config) {
                try {
                    this.configs[key].value = config[key];
                } catch (e) {
                }
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
        container.id = "ui_codeMirrorConfigs";
        container.className = "ui-container-background";
        parent.appendChild(container);

        let content = document.createElement("div");
        content.className = "ui-container-body";
        content.id = "codeMirror-configs-Content";
        container.appendChild(content);

        let title = document.createElement("div");
        title.className = "ui-container-title";
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
        let span = document.createElement("span");
        span.innerHTML = "编辑器设置";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let itemcontainer = document.createElement("div");
        itemcontainer.id = itemcontainer.className = "ui-container-scroll-div";
        content.appendChild(itemcontainer);

        for (let name in this.configs) {
            let item = document.createElement("div");
            item.className = "ui-container-item";
            itemcontainer.appendChild(item);
            let span = document.createElement("span");
            span.className = "ui-container-item-name";
            span.innerHTML = this.configs[name].name + ":";
            item.appendChild(span);
            if (this.configs[name].type == "input") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "input";
                input.className = "ui-container-item-input";
                input.value = this.configs[name].value;
                input.onchange = function () {
                    __SQLEDITOR__.configs[this.id].value = this.value;
                };
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "select") {
                let input = document.createElement("select");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "select";
                input.className = "ui-container-item-input";
                for (let i = 0; i < this.configs[name].options.length; i++) {
                    if (typeof this.configs[name].options[i] === "object")
                        input.options.add(this.configs[name].options[i]);
                    else
                        input.options.add(new Option(this.configs[name].options[i]));
                }
                input.value = this.configs[name].value;
                input.onchange = function () {
                    __SQLEDITOR__.configs[this.id].value = this.value;
                };
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "color") {
                let input = UI.colorChoice(name, this.configs[name].value, function (value) {
                    __SQLEDITOR__.configs[name].value = value;
                });
                input.id = name;
                input.className = "ui-container-item-color";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "boolean") {
                let input = UI.booleanChoice(this.configs[name].value.toBoolean(), function (value) {
                    __SQLEDITOR__.configs[name].value = (value ? "true" : "false");
                });
                input.id = name;
                input.className = "ui-container-item-boolean";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "range") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "range";
                input.min = __SQLEDITOR__.configs[name].attribute.min;
                input.max = __SQLEDITOR__.configs[name].attribute.max;
                input.step = __SQLEDITOR__.configs[name].attribute.step;
                input.className = "ui-container-item-range";
                input.title = __SQLEDITOR__.configs[name].value;
                input.value = Number(__SQLEDITOR__.configs[name].value.replace(new RegExp(__SQLEDITOR__.configs[name].attribute.unit, "g"), ""));
                input.onchange = function () {
                    __SQLEDITOR__.configs[this.id].value = this.title = (this.value + __SQLEDITOR__.configs[this.id].attribute.unit);
                };
                item.appendChild(input);
            } else if (this.configs[name].type == "ranges") {
                let input = UI.rangesChoice(
                    __SQLEDITOR__.configs[name].attribute.min,
                    __SQLEDITOR__.configs[name].attribute.max,
                    __SQLEDITOR__.configs[name].attribute.unit,
                    __SQLEDITOR__.configs[name].value,
                    function (value) {
                        __SQLEDITOR__.configs[name].value = value;
                    });
                input.id = name;
                input.className = "ui-container-item-ranges";
                if (typeof this.configs[name].title != "undefined")
                    input.title = this.configs[name].title;
                else
                    input.title = this.configs[name].name;
                item.appendChild(input);
            } else if (this.configs[name].type == "number") {
                let input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "number";
                input.min = __SQLEDITOR__.configs[name].attribute.min;
                input.max = __SQLEDITOR__.configs[name].attribute.max;
                input.step = __SQLEDITOR__.configs[name].attribute.step;
                input.className = "ui-container-item-number";
                input.title = __SQLEDITOR__.configs[name].value;
                input.value = __SQLEDITOR__.configs[name].value;
                input.onkeypress = function () {
                    return false;
                };
                input.onchange = function () {
                    __SQLEDITOR__.configs[this.id].value = this.title = this.value;
                };
                item.appendChild(input);
            } else if (this.configs[name].type == "hr") {
                span.innerHTML = "[ " + this.configs[name].name + " ]";
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
            setUserConfig("codeMirrorConfig", JSON.stringify(__SQLEDITOR__.getConfigItems()));
            $("sqlContainer").style.height = __SQLEDITOR__.configs.codeMirrorHeight.value;
            callback();
            parent.removeChild($("ui_codeMirrorConfigs"));
            resize();
        };
        c.appendChild(b);

        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "重置";
        b.onclick = close.onclick = function () {
            UI.confirm.show("注意", "您确定要重置全部编辑器参数吗?", "auto", function () {
                setUserConfig("codeMirrorConfig", JSON.stringify({}));
                parent.removeChild($("ui_codeMirrorConfigs"));
                UI.alert.show("提示", "编辑器参数已恢复为系统初始值,系统将重新载入页面...");
                location.reload();
            });
        };
        c.appendChild(b);

        b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            parent.removeChild($("ui_codeMirrorConfigs"));
        };
        c.appendChild(b);

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
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
    dbManager: function (message, parent, callback, args) {
        let __DATABASE__ = {
            Name: {
                value: "",
                name: "库名称",
                type: "text",
                image: __SYS_IMAGES_SVG__.getUrl("database", __THEMES__.get().color, "16px", "16px")
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
        let span = document.createElement("span");
        span.innerHTML = message + " ";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
    },

    createTable: function (parent, structure, callback) {
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
        let span = document.createElement("span");
        span.innerHTML = "创建数据表 ";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
                    callback({title: title.value, sql: sql});
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

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
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
        progress: function () {
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
            title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
            let span = document.createElement("span");
            span.innerHTML = "导入数据";
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
                    itemvalue = UI.fileChoice(
                        name,
                        "70%",
                        "left",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv",
                        false,
                        function (files) {
                            try {
                                let file = files[0];
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
            b.innerHTML = "导入";
            b.onclick = function () {
                if (__CONFIGS__.CURRENT_TABLE.name == null || __CONFIGS__.CURRENT_TABLE.type == "view") {
                    UI.confirm.show("注意", "您没有选择数据表，是否要根据数据结构创建一个名称为 " + SQLite.import.configs.SourceFile.value.split(".")[0] + " 的新表?", "auto", function () {
                        let title = SQLite.import.configs.SourceFile.value.split(".")[0];
                        SQLite.createTable("auto", {
                            "title": title,
                            "stru": SQLite.import.dataStruct()
                        }, function (values) {
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

            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
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
    getTableSQL: function (title, stru) {
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

function viewDatabases() {
    let message = __LOGS__.viewMessage("读取数据库列表...");
    try {
        let storage = window.localStorage;
        if (storage.getItem(__CONFIGS__.STORAGE.DATABASES) == null) {
            storage.setItem(__CONFIGS__.STORAGE.DATABASES, "{}")
        }
        let dbslist = $("sidebar-dbs");
        dbslist.innerText = "";
        let ul = document.createElement("ul");
        ul.style.width = "80%";
        ul.style.position = "relative";
        dbslist.appendChild(ul);
        __CONFIGS__.DATABASES = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
        for (let name in __CONFIGS__.DATABASES) {
            let li = document.createElement("li");
            li.className = "database-list";
            li.style.listStyleImage = __SYS_IMAGES_SVG__.getUrl("sqlite", __THEMES__.get().color, "24px", "24px");
            let a = document.createElement("a");
            a.className = "list";
            a.innerText = name;
            a.setAttribute("index", name);
            a.id = name;
            a.onclick = function () {
                let dbs = $("sidebar-dbs");
                let l = dbs.getElementsByClassName("list");
                for (let i = 0; i < l.length; i++) {
                    l[i].style.fontWeight = "normal";
                }
                this.style.fontWeight = "bold";
                viewTables(this.getAttribute("index"));
                __CONFIGS__.CURRENT_TABLE.name = null;
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

            let del = __SYS_IMAGES_SVG__.getImage("del", __THEMES__.get().color, "18px", "18px", __THEMES__.get().hover);
            del.setAttribute("index", name);
            del.style.cssFloat = "right";
            del.title = "删除";
            del.onclick = function () {
                let name = this.getAttribute("index");
                UI.confirm.show("注意", "确定要删除数据库 " + name + " 吗?", "auto", function () {
                    let storage = window.localStorage;
                    let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                    delete dbs[name];
                    storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                    viewDatabases();
                    if (__CONFIGS__.CURRENT_DATABASE.index === name) {
                        __CONFIGS__.CURRENT_DATABASE.index = null;
                        __CONFIGS__.CURRENT_DATABASE.value = null;
                        __CONFIGS__.CURRENT_DATABASE.connect = null;
                        __CONFIGS__.CURRENT_TABLE.name = null;
                        __CONFIGS__.CURRENT_TABLE.sql = "";
                        __CONFIGS__.CURRENT_TABLE.structure = [];
                        __CONFIGS__.CURRENT_TABLE.type = "";
                        $("sidebar-tbs").innerText = "";
                    }
                });
            };

            li.appendChild(del);
            let ed = __SYS_IMAGES_SVG__.getImage("edit", __THEMES__.get().color, "18px", "18px", __THEMES__.get().hover);
            ed.setAttribute("index", name);
            ed.style.cssFloat = "right";
            ed.title = "编辑";
            ed.onclick = function () {
                let name = this.getAttribute("index");
                let storage = window.localStorage;
                let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                SQLite.dbManager("修改数据库", "auto", function (args, values) {
                    let storage = window.localStorage;
                    let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                    if (typeof dbs[values.name] === "undefined" || args.index === values.name) {
                        if (args.index !== values.name)
                            delete dbs[args.index];
                        dbs[values.name] = values.db;
                        storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                        viewDatabases();
                    } else {
                        UI.alert.show("注意", "数据库 " + values.name + " 已经存在.", "auto");
                    }
                }, {index: name, db: dbs[name]});
            };
            li.appendChild(ed);

            let dul = document.createElement("ul");
            dul.id = "ul-db-" + name;
            dul.setAttribute("isOpen", "false");
            li.appendChild(dul);
            ul.appendChild(li);
        }
        message.innerText += "OK.";
    } catch (e) {
        message.innerText += "fails.";
        __LOGS__.viewError("auto", e);
    }
}

function viewTables(index) {
    let database = __CONFIGS__.DATABASES[index];
    let db = openDatabase(database.Database, database.Version, database.Description, eval(database.Size));
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
                        li.style.listStyleImage = __SYS_IMAGES_SVG__.getUrl("table", __THEMES__.get().color, "16px", "16px");
                        let a = document.createElement("a");
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
                                                    columns.push(__CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value);
                                                    let l = document.createElement("li");
                                                    $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).appendChild(l);
                                                    let col = document.createElement("div");
                                                    col.className = "column-name";
                                                    col.id = __CONFIGS__.CURRENT_TABLE.name + "." + __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
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
                        let del = __SYS_IMAGES_SVG__.getImage("del", __THEMES__.get().color, "18px", "18px", __THEMES__.get().hover);
                        del.setAttribute("type", results.rows.item(i).type);
                        del.setAttribute("name", results.rows.item(i).tablename);
                        del.style.cssFloat = "right";
                        del.title = "删除";
                        del.onclick = function () {
                            UI.confirm.show("注意", "确定要删除数据表(视图) " + this.getAttribute("name") + " 吗?", "auto", function (args) {
                                __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                                    let sql = "DROP " + args.type + " " + args.name;
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
                                            if (__CONFIGS__.CURRENT_TABLE.name === args.name) {
                                                __CONFIGS__.CURRENT_TABLE.name = null;
                                                __CONFIGS__.CURRENT_TABLE.sql = "";
                                                __CONFIGS__.CURRENT_TABLE.structure = [];
                                                __CONFIGS__.CURRENT_TABLE.type = "";
                                            }
                                        },
                                        function (tx, error) {
                                            __LOGS__.viewMessage(error.message);
                                        });
                                })
                            }, {name: this.getAttribute("name"), type: this.getAttribute("type")});
                        };
                        li.appendChild(del);

                        let rename = __SYS_IMAGES_SVG__.getImage("edit", __THEMES__.get().color, "18px", "18px", __THEMES__.get().hover);
                        rename.setAttribute("type", results.rows.item(i).type);
                        rename.setAttribute("name", results.rows.item(i).tablename);
                        rename.style.cssFloat = "right";
                        rename.title = "重命名";
                        rename.onclick = function () {
                            UI.prompt.show("请输入新的表(视图)名称", {"名称":{value:this.getAttribute("name"), type:"input"}}, "auto", function (args, values) {
                                __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                                    let sql = "ALTER " + args.type  + " " + args.name + " RENAME TO " + values["名称"];
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
                                            if (__CONFIGS__.CURRENT_TABLE.name === args.name) {
                                                __CONFIGS__.CURRENT_TABLE.name = null;
                                                __CONFIGS__.CURRENT_TABLE.sql = "";
                                                __CONFIGS__.CURRENT_TABLE.structure = [];
                                                __CONFIGS__.CURRENT_TABLE.type = "";
                                            }
                                        },
                                        function (tx, error) {
                                            __LOGS__.viewMessage(error.message);
                                        });
                                })
                            }, {name: this.getAttribute("name"), type: this.getAttribute("type")});
                        };
                        li.appendChild(rename);

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

function viewDataset(index, pageindex, syncSql) {
    if (__DATASET__.result.length > 0) {
        __DATASET__.default.sheet = index;
        __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__DATASET__.configs.reportPageSize.value));
        __DATASET__.default.tab = Math.floor(__DATASET__.default.sheet / 10);
        if (typeof  pageindex != "undefined")
            __DATASET__.pages.default = pageindex;
        setDataPageTools(index);
    }

    let container = $("tableContainer");
    try {
        container.removeAttribute("_echarts_instance_");
        echarts.getInstanceByDom(container).clear();
        echartsInstance.dispose();
    } catch (e) {
    }

    if (typeof syncSql === "undefined")
        syncSql = true;
    if (syncSql) {
        __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = __DATASET__.result[index].title[0];
        __SQLEDITOR__.codeMirror.setValue(__DATASET__.result[index].sql);
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
            viewDataset(index, 0, false);
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
                                item.value = Math.round(item.value * Math.pow(10, Number(__DATASET__.configs.reportScale.value))) / Math.pow(10, Number(__DATASET__.configs.reportScale.value));
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

function execute(name) {
    function fillParams(str) {
        let s = str;
        if (__SQLEDITOR__.parameter !== null) {
            for (let param in __SQLEDITOR__.parameter) {
                s = s.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
            }
        }
        return s;
    }

    if (__CONFIGS__.CURRENT_DATABASE.connect != null) {
        __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
            let selection = "";
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();

            let title = fillParams(name).split("_");

            let sqls = [];
            if (selection.trim() != "") {
                __LOGS__.viewMessage(selection, false, true);
                sqls = selection.split(";");

                for (let s = 0; s < sqls.length; s++) {
                    let sql = sqls[s].slice(0).trim();
                    if (sql.trim() == "")
                        continue;
                    tx.executeSql(fillParams(sql), [],
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
                                    name: name,
                                    title: title,
                                    sql: sql,
                                    type: __SQLEDITOR__.configs.codeMirrorMode.value,
                                    parameter: __SQLEDITOR__.parameter,
                                    columns: columns,
                                    data: data,
                                    time: getNow()
                                });

                                if (__DATASET__.result.length > 0) {
                                    viewDataset(__DATASET__.result.length - 1, 0, false);
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

function executeFunction(name) {
    function fillParams(str) {
        let s = str;
        if (__SQLEDITOR__.parameter !== null) {
            for (let param in __SQLEDITOR__.parameter) {
                s = s.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
            }
        }
        return s;
    }
    let selection = "";
    if (__SQLEDITOR__.codeMirror.somethingSelected())
        selection = __SQLEDITOR__.codeMirror.getSelection();
    else
        selection = __SQLEDITOR__.codeMirror.getValue();
    selection = fillParams(selection);

    let title = fillParams(name).split("_");

    let funs = [];
    if (selection.trim() != "") {
        funs = selection.split(";");
        __LOGS__.viewMessage(selection, false, true);

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
        __DATASET__.result.push(transferResultDataset(name, funs, data, title, __SQLEDITOR__.parameter));

        if (__DATASET__.result.length > 0) {
            viewDataset(__DATASET__.result.length - 1, 0, false);
        }
    }
}

function transferResultDataset(name, funs, dataset, title, parameter) {
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
        name: name,
        title: title,
        sql: funs.join(";\n"),
        type: __SQLEDITOR__.configs.codeMirrorMode.value,
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
        name: "table structure",
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
    ctx.drawImage(__SYS_IMAGES_PNG__.getImage(__SYS_IMAGES_PNG__.mouse, 30, 30), 0, 20, 30, 30);
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
    try {
        UI.userLogin.show("用户登录", "auto", function (values) {
            let users = getUserConfig("Users");
            users = JSON.parse(users.decode());
            let user = users[values.name];
            if (typeof user === "undefined") {
                UI.alert.show("用户登录", values.name + " 用户不存在!", "auto", function () {
                    userLogin();
                });
            } else {
                if (user.password.value !== values.password.hex_md5_hash()) {
                    UI.alert.show("用户登录", "用户密码验证(MD5)未通过!", "auto", function () {
                        userLogin();
                    });
                } else {
                    const USER_INFOR = {
                        "电话": {value: "TEL", card: "TEL"},
                        "手机": {value: "PHONE", card: "TEL"},
                        "传真": {value: "FAX", card: "FAX"},
                        "邮箱": {value: "EMAIL", card: "EMAIL"},
                        "组织": {value: "ORG", card: "ORG"},
                        "职位": {value: "TIL", card: "TIL"},
                        "地址": {value: "ADR", card: "ADR"},
                        "网址": {value: "URL", card: "URL"},
                        "备忘": {value: "NOTE", card: "NOTE"},
                    };
                    $("user").innerText = "";
                    let user = __SYS_IMAGES_SVG__.getImage("user_edit", __THEMES__.get().color, "32px", "32px", __THEMES__.get().hover);
                    $("user").appendChild(user);
                    user.onclick = function () {
                        if (typeof __LOGS__.user.name !== "undefined") {
                            let name = __LOGS__.user.name;
                            UI.password.show("修改 " + name + " 的登录密码", {
                                "旧的密码": "",
                                "新的密码": "",
                                "确认密码": ""
                            }, "auto", function (args, values) {
                                if (__LOGS__.user.attribute.password.value === values["旧的密码"].hex_md5_hash()) {
                                    let name = args["name"];
                                    let users = getUserConfig("Users");
                                    users = JSON.parse(users.decode());
                                    let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                                    //必须是8位密码,且必须包含字符和数字
                                    let key = values["新的密码"];
                                    if (key != values["确认密码"]) {
                                        UI.alert.show("提示", "两次密码输入不一致。", "auto");
                                    } else if (pattern.test(key) == false) {
                                        UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字。", "auto");
                                    } else {
                                        users[name].password = {
                                            value: values["确认密码"].hex_md5_hash(),
                                            date: new Date(),
                                            age: 180
                                        };
                                        setUserConfig("Users", JSON.stringify(users).encode());
                                        location.reload();
                                    }
                                } else
                                    UI.alert.show("注意", "原密码校验错误。", "auto");
                            }, {name: name});
                        }
                    };
                    let span = document.createElement("span");
                    span.id = "user-name";
                    span.innerHTML = values.name;
                    __LOGS__.user = {name: values.name, attribute: users[values.name]};
                    $("user").appendChild(span);
                    span.onmouseenter = function () {
                        let userTimelength = getTimesLength((new Date() - new Date(__LOGS__.user.attribute.date)), "毫秒");
                        let passwordTimelength = getTimesLength((new Date() - new Date(__LOGS__.user.attribute.password.date)), "毫秒");
                        UI.help(span, "none", "auto", __LOGS__.user.name +
                            "<span style='font-size:80%'><li>已使用" + (userTimelength.value + userTimelength.unit) + "</li>" +
                            "<li>密码期限" + (passwordTimelength.unit == "天" ? (__LOGS__.user.attribute.password.age - passwordTimelength.value) + "天" : __LOGS__.user.attribute.password.age + "天") + "</li></span>" +
                            (typeof __LOGS__.user.attribute.QRCODE !== "undefined" ? "<img width='130' height='130' style= 'margin:3px;padding:3px; border:1px solid var(--toolbar-color);float:left' src='" + __LOGS__.user.attribute.QRCODE + "'></img>" : ""),
                            function () {
                                let items = {};
                                for (let key in USER_INFOR) {
                                    items[key] = {
                                        value: (typeof __LOGS__.user.attribute[USER_INFOR[key].value] !== "undefined" ? __LOGS__.user.attribute[USER_INFOR[key].value] : ""),
                                        type: "input"
                                    };
                                }
                                UI.prompt.show(__LOGS__.user.name + " 用户信息",
                                    items, "auto", function (values) {
                                        let users = getUserConfig("Users");
                                        users = JSON.parse(users.decode());
                                        for (let key in USER_INFOR) {
                                            users[__LOGS__.user.name][USER_INFOR[key].value] = __LOGS__.user.attribute[USER_INFOR[key].value] = values[key];
                                        }
                                        setUserConfig("Users", JSON.stringify(users).encode());

                                        UI.confirm.show("提示", "是否生成用户二维码?", "auto", function () {
                                            let mecard = "MECARD:";
                                            mecard += "N:" + __LOGS__.user.name + ";";
                                            for (let key in USER_INFOR) {
                                                values[key] !== "" ? (mecard += USER_INFOR[key].card + ":" + values[key] + ";") : mecard += "";
                                            }
                                            UI.prompt.show("二维码参数", {
                                                "颜色": {value: __THEMES__.get().color, type: "color"},
                                                "背景": {value: "#ffffff", type: "color"},
                                                "宽度": {value: "300", type: "input"},
                                                "高度": {value: "300", type: "input"},
                                            }, "auto", function (args, values) {
                                                let options = {
                                                    color: values["颜色"],
                                                    background: values["背景"],
                                                    width: Number(values["宽度"]),
                                                    height: Number(values["高度"])
                                                };
                                                UI.QRCode("auto", args.mecard, options, function (src) {
                                                    let users = getUserConfig("Users");
                                                    users = JSON.parse(users.decode());
                                                    users[__LOGS__.user.name]["QRCODE"] = __LOGS__.user.attribute["QRCODE"] = src;
                                                    setUserConfig("Users", JSON.stringify(users).encode());
                                                });
                                            }, {mecard: mecard});
                                        });
                                    });
                            });
                    };
                    let passwordTimelength = getTimesLength((new Date() - new Date(__LOGS__.user.attribute.password.date)), "毫秒");
                    if (passwordTimelength.unit === "天" && passwordTimelength.value > __LOGS__.user.attribute.password.age) {
                        UI.confirm.show("注意", "用户密码已到期,是否立即修改?", "auto", function () {
                            let name = __LOGS__.user.name;
                            UI.password.show("修改 " + name + " 的登录密码", {
                                "新的密码": "",
                                "确认密码": ""
                            }, "auto", function (args, values) {
                                let name = args["name"];
                                let users = getUserConfig("Users");
                                users = JSON.parse(users.decode());
                                let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                                //必须是8位密码,且必须包含字符和数字
                                let key = values["新的密码"];
                                if (key != values["确认密码"]) {
                                    UI.alert.show("提示", "两次密码输入不一致。", "auto");
                                } else if (pattern.test(key) == false) {
                                    UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字。", "auto");
                                } else {
                                    users[name].password = {
                                        value: values["确认密码"].hex_md5_hash(),
                                        date: new Date(),
                                        age: 180
                                    };
                                    setUserConfig("Users", JSON.stringify(users).encode());
                                    location.reload();
                                }
                            }, {name: name});
                        });
                    }
                }
            }
        });
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

function init() {
    if (initConfigs()) {
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

        let logo = __SYS_IMAGES_SVG__.getImage(__VERSION__.logo.name, __THEMES__.get().color, "48px", "48px", __THEMES__.get().hover, __VERSION__.logo.flip);
        logo.style.cssFloat = "left";
        $("main-title").appendChild(logo);
        $("main-title").ondblclick = function () {
            requestFullScreen(document.documentElement);
        };

        let user = __SYS_IMAGES_SVG__.getImage("user_add",  __THEMES__.get().color, "32px", "32px", __THEMES__.get().hover);
        user.onclick = function () {
            UI.prompt.show("创建用户", {"用户名称": {value: "", type: "input"}}, "auto", function (values) {
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
                            UI.alert.show("提示", "两次密码输入不一致。", "auto");
                        } else if (pattern.test(key) == false) {
                            UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字.", "auto");
                        } else {
                            users[name] = {
                                password: {value: values["确认密码"].hex_md5_hash(), date: new Date(), age: 180},
                                date: new Date(),
                            };
                            setUserConfig("Users", JSON.stringify(users).encode());
                            location.reload();
                        }
                    }, {name: name});
                } else
                    UI.alert.show("注意", "用户名称长度不符合系统要求!", "auto");
            });
        };
        $("user").appendChild(user);

        getQRCode($("page"), 90, 90, __VERSION__.url, __SYS_IMAGES_SVG__.getImage(__VERSION__.logo.name,  __THEMES__.get().color, "48px","48px", __THEMES__.get().hover, __VERSION__.logo.flip));

        try {
            let users = getUserConfig("Users");
            if (users == null) {
                UI.confirm.show("注意", "您没有创建系统用户,是否需要立即创建?", "auto", function () {
                    UI.prompt.show("创建用户", {"用户名称": {value: "", type: "input"}}, "auto", function (values) {
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
                                        password: {value: values["确认密码"].hex_md5_hash(), date: new Date(), age: 180},
                                        date: new Date(),
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
        initMenus();
        //#########################body init end#######################################
    }
}

function initConfigs() {
    let checked = false;
    if (checkStorage()) {
        let message = null;
        try {

            __LOGS__.init();
            __LOGS__.viewMessage(__VERSION__.name + "\n版本代码:" + __VERSION__.version + "\n发布日期:" + __VERSION__.date);
            message = __LOGS__.viewMessage("初始化系统参数...");

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

            let helpurl = $class("help-url");
            for (let i = 0; i < helpurl.length; i++) {
                helpurl[i].href = helpurl[i].innerHTML = __VERSION__.url;
            }

            $("main-version").innerText = __VERSION__.version;
            $("main-version").onmouseenter = function () {
                UI.help($("main-version"), "none", "auto", "发布日期: " + __VERSION__.date + "<br><span style='font-size: 50%'>ECharts " + echarts.version + "<hr>● ...<br> ● " + __VERSION__.comment.splice(__VERSION__.comment.length % 10 + (Math.floor(__VERSION__.comment.length / 10) - 1) * 10).join("<br>● ") + "</span>");
            };
            let copyright = __VERSION__.author + " ☎ " + __VERSION__.tel + " ✉ <a href='mailto:" + __VERSION__.email + "' target='_blank'>" + __VERSION__.email + "</a>";
            setUserConfig("CopyRight", copyright);
            $("copyright").innerHTML = copyright;

            $("footer").style.display = getUserConfig("help");

            let config = getUserConfig("codeMirrorConfig");
            if (config != null) {
                config = JSON.parse(config);
                for (let key in config) {
                    try {
                        __SQLEDITOR__.configs[key].value = config[key];
                    } catch (e) {
                    }
                }
            } else {
                setUserConfig("codeMirrorConfig", JSON.stringify(__SQLEDITOR__.getConfigItems()));
            }
            //#######################################
            //必须先行实体化编辑器,否则不能预埋参数
            //#######################################
            $("sqlContainer").style.height = __SQLEDITOR__.configs.codeMirrorHeight.value;
            $("sqlediter").style.width = (getAbsolutePosition($("sqlContainer")).width - 2) + "px";
            __SQLEDITOR__.init($("sqlediter"));

            $("detail").style.display = getUserConfig("displayLogs");
            resize();

            config = getUserConfig("echartsconfig");
            if (config != null) {
                config = JSON.parse(config);
                for (let key in config) {
                    try {
                        __ECHARTS__.configs[key].value = config[key];
                    } catch (e) {
                    }
                }
            } else {
                setUserConfig("echartsconfig", JSON.stringify(__ECHARTS__.getConfigItems()));
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
            } else {
                setUserConfig("datasetConfig", JSON.stringify(__DATASET__.getConfigItems()));
            }

            let multi_layouts = getUserConfig("MULTI_LAYOUTS");
            if (multi_layouts != null) {
                try {
                    if (multi_layouts != "{}")
                        __ECHARTS__.layouts = JSON.parse(multi_layouts);
                } catch (e) {
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

            message.innerText += "OK.";
            checked = true;
        } catch (e) {
            message.innerText += "fails.";
            __LOGS__.viewError("auto", e);
            checked = false;
        }
    } else {
        UI.alert.show("提示", "当前浏览器不支持Local Storage,建议使用Chrome或Edge浏览器.");
        checked = false;
    }
    return checked;
}

function initMenus() {
    let message = __LOGS__.viewMessage("初始化系统菜单...");
    //#######################################
    //初始化数据库菜单
    //#######################################
    try {
        let dbstools = $("sidebar-dbs-tools");

        let crdb = document.createElement("div");
        crdb.className = "button";
        crdb.innerText = "新增";
        crdb.id = "create_database_connect";
        crdb.appendChild(__SYS_IMAGES_SVG__.getHelp("add", crdb, crdb.id, "auto", "white", "16px", "16px"));
        let help_crdb = $("help-create-database");
        crdb.onclick = help_crdb.onclick = function () {
            SQLite.dbManager("创建数据库", "auto", function (args, values) {
                let storage = window.localStorage;
                let dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                if (typeof dbs[values.name] === "undefined") {
                    dbs[values.name] = values.db;
                    storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                    viewDatabases();
                } else {
                    UI.alert.show("注意", "数据库 " + values.name + " 已经存在,系统不能创建同名称数据库!", "auto");
                }
            }, {});
        };
        dbstools.appendChild(crdb);
        UI.tooltip(crdb, "创建数据库");

        let dbinfo = document.createElement("div");
        dbinfo.className = "button";
        dbinfo.id = "test-button";
        dbinfo.innerText = "调试";
        dbinfo.style.display = "none";
        dbinfo.onclick = function () {

        };
        dbstools.appendChild(dbinfo);
        UI.tooltip(dbinfo, "auto", dbinfo.id, "调试");

        let about = document.createElement("div");
        about.className = "charButton";
        about.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("help", "white", "20px", "20px");
        about.id = "about_and_help";
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
        UI.tooltip(about, "显示或关闭帮助");


        //#######################################
        //初始化数据表菜单
        //#######################################
        let tbstools = $("sidebar-tbs-tools");
        tbstools.innerText = "";
        tbstools.style.cursor = "ns-resize";
        splitControl.hook(tbstools, $("sidebar-dbs"), tbstools.id, function (value) {
            if (value < getAbsolutePosition($("sidebar")).height - getAbsolutePosition(tbstools).height - getAbsolutePosition($("sidebar-dbs-tools")).height) {
                $("sidebar-dbs").style.height = value + "px";
                resize();
            }
        });

        let crtb = document.createElement("div");
        crtb.className = "button";
        crtb.innerText = "新增";
        crtb.id = "create_new_table";
        crtb.appendChild(__SYS_IMAGES_SVG__.getHelp("add", crtb, crtb.id, "auto", "white", "16px", "16px"));
        let help_crtb = $("help-create-table");
        crtb.onclick = help_crtb.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                UI.alert.show("注意", "请选择一个数据库.", "auto");
                return;
            }
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
        UI.tooltip(crtb, "创建数据表");

        let importtb = document.createElement("div");
        importtb.className = "button";
        importtb.innerText = "导入";
        importtb.id = "import_data";
        importtb.appendChild(__SYS_IMAGES_SVG__.getHelp("import", importtb, importtb.id, "auto", "white", "14px", "14px"));
        let help_importtb = $("help-import-data");
        importtb.onclick = help_importtb.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                UI.alert.show("注意", "请选择一个数据库连接.", "auto");
                return;
            }

            SQLite.import.start("auto");
        };
        tbstools.appendChild(importtb);
        UI.tooltip(importtb, "导入数据");

        let exConstr = document.createElement("div");
        exConstr.className = "button";
        exConstr.innerText = "结构";
        exConstr.id = "show_table_construct";
        exConstr.appendChild(__SYS_IMAGES_SVG__.getHelp("construct", exConstr, exConstr.id, "auto", "white", "14px", "14px"));
        exConstr.onclick = function () {
            if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
                UI.alert.show("注意", "请选择一个数据库连接.", "auto");
                return;
            }

            if (__CONFIGS__.CURRENT_TABLE.name == null) {
                UI.alert.show("注意", "请选择一个数据库表.", "auto");
                return;
            }
            let result = __CONFIGS__.CURRENT_TABLE.structure;
            result["eventid"] = getEventIndex();
            result["name"] = __CONFIGS__.CURRENT_TABLE.name,
                result["title"] = [__CONFIGS__.CURRENT_TABLE.name];
            result["sql"] = __CONFIGS__.CURRENT_TABLE.sql;
            result["parameter"] = null;
            result["time"] = getNow();
            __DATASET__.result.push(result);
            __DATASET__.default.sheet = __DATASET__.result.length - 1;
            viewDataset(__DATASET__.default.sheet, 0, false);
            __LOGS__.viewMessage(__CONFIGS__.CURRENT_TABLE.name + ":\n" + __CONFIGS__.CURRENT_TABLE.sql);
        };
        tbstools.appendChild(exConstr);
        UI.tooltip(exConstr, "获取表结构");

        //#######################################
        //初始化SQL菜单
        //#######################################
        let sqltools = $("sql-tools");
        sqltools.ondblclick = function () {
            let style = {
                backgroundImage: getCss(document.body, "background-image"),
                backgroundColor: getCss(document.body, "background-color"),
            };
            requestFullScreen($("main"), style);
        };

        let newsql = document.createElement("div");
        newsql.className = "button";
        newsql.innerText = "新建";
        newsql.id = "create_new_sql";
        newsql.appendChild(__SYS_IMAGES_SVG__.getHelp("add", newsql, newsql.id, "auto", "white", "16px", "16px"));
        let help_createsql = $("help-create-sql");
        newsql.onclick = help_createsql.onclick = function () {
            let openfile = $("open-sql-file");
            openfile.value = "";
            __SQLEDITOR__.title = null;
            $("sql-title").innerText = "";
            $("sql-title").title = "";
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
        UI.tooltip(newsql, "新建脚本");

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
                        __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = file.name.split(".")[0];
                    };
                    reader.readAsText(file, __SQLEDITOR__.configs.codeMirrorCharset.value);
                } catch (e) {
                    UI.alert.show("提示", "请选择需要导入的脚本文件.")
                }
                this.value = null;
            } else {
                UI.alert.show("提示", "本应用适用于Chrome浏览器或IE10及以上版本。")
            }
        };
        sqltools.appendChild(input);

        let opensql = document.createElement("div");
        opensql.className = "button";
        opensql.innerText = "打开";
        opensql.id = "open_sql";
        opensql.appendChild(__SYS_IMAGES_SVG__.getHelp("open", opensql, opensql.id, "auto", "white", "16px", "16px"));
        let help_opensql = $("help-open-sql");
        opensql.onclick = help_opensql.onclick = function () {
            UI.sqlManagerDialog.show("auto", function (args, values) {
                __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = values.title;
                __LOGS__.viewMessage("Open " + __SQLEDITOR__.configs.codeMirrorMode.value + " : " + __SQLEDITOR__.title);
                __SQLEDITOR__.codeMirror.setValue(values.sql);
            }, {type: UI.sqlManagerDialog.type.open, charset: __SQLEDITOR__.configs.codeMirrorCharset.value});
        };
        sqltools.appendChild(opensql);
        UI.tooltip(opensql, "打开脚本");

        let saveto = document.createElement("div");
        saveto.className = "button";
        saveto.innerText = "保存";
        saveto.id = "save_sql";
        saveto.appendChild(__SYS_IMAGES_SVG__.getHelp("save", saveto, saveto.id, "auto", "white", "16px", "16px"));
        let help_savesql = $("help-save-sql");
        saveto.onclick = help_savesql.onclick = function () {
            if (__SQLEDITOR__.title == null) {
                UI.sqlManagerDialog.show("auto", function (args, values) {
                    __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = values.title;
                    __LOGS__.viewMessage("Save " + __SQLEDITOR__.configs.codeMirrorMode.value + " : " + __SQLEDITOR__.title);
                }, {
                    type: UI.sqlManagerDialog.type.save,
                    sql: __SQLEDITOR__.codeMirror.getValue(),
                    charset: __SQLEDITOR__.configs.codeMirrorCharset.value
                });
            } else {
                let title = __SQLEDITOR__.title;
                let sql = __SQLEDITOR__.codeMirror.getValue();
                UI.confirm.show("注意", "您确定覆盖保存脚本 " + title + " 吗?", "auto", function (args) {
                    if (args.title != "" && args.sql != "") {
                        saveStorageSql(args.title, args.sql);
                        __LOGS__.viewMessage("Save " + __SQLEDITOR__.configs.codeMirrorMode.value + " : " + __SQLEDITOR__.title);
                    } else
                        UI.alert.show("提示", "脚本及脚本名称不能为空!");
                }, {title: title, sql: sql});
            }
        };
        sqltools.appendChild(saveto);
        UI.tooltip(saveto, "保存脚本");

        let loadfile = document.createElement("div");
        loadfile.className = "button";
        loadfile.innerText = "导入";
        loadfile.id = "load_sql_from_file";
        loadfile.appendChild(__SYS_IMAGES_SVG__.getHelp("import", loadfile, loadfile.id, "auto", "white", "14px", "14px"));
        let help_loadsql = $("help-load-sql");
        loadfile.onclick = help_loadsql.onclick = function () {
            $("open-sql-file").click();
        };
        sqltools.appendChild(loadfile);
        UI.tooltip(loadfile, "导入脚本");

        let saveas = document.createElement("div");
        saveas.className = "button";
        saveas.innerText = "导出";
        saveas.id = "save_sql_to_file";
        saveas.appendChild(__SYS_IMAGES_SVG__.getHelp("export", saveas, saveas.id, "auto", "white", "13px", "13px"));
        let help_downloadsql = $("help-download-sql");
        saveas.onclick = help_downloadsql.onclick = function () {
            UI.prompt.show("输入", {
                "文件名称": {
                    value: __SQLEDITOR__.title != null ? __SQLEDITOR__.title : "",
                    type: "input"
                }
            }, "auto", function (args, values) {
                let title = values["文件名称"];
                if (title != null && title.trim() != "") {
                    let blob = null;
                    switch (__SQLEDITOR__.configs.codeMirrorMode.value) {
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
        UI.tooltip(saveas, "导出脚本");

        let backup = document.createElement("div");
        backup.className = "button";
        backup.innerText = "备份";
        backup.id = "backup_sql_to_file";
        backup.appendChild(__SYS_IMAGES_SVG__.getHelp("backup", backup, backup.id, "auto", "white", "14px", "14px"));
        backup.onclick = function () {
            UI.sqlManagerDialog.show("auto", function (args, values) {

            }, {type: UI.sqlManagerDialog.type.backup});
        }
        sqltools.appendChild(backup);
        UI.tooltip(backup, "备份脚本");

        let execsql = document.createElement("div");
        execsql.className = "button";
        execsql.innerText = "提交";
        execsql.id = "execute-sql";
        execsql.appendChild(__SYS_IMAGES_SVG__.getHelp("execute", execsql, "execute_sql", "auto", "white", "14px", "14px"));
        let help_execsql = $("help-execute-sql");
        execsql.onclick = help_execsql.onclick = function () {
            if (checkStorage()) {
                if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/html")
                    $("tableContainer").innerHTML = __SQLEDITOR__.codeMirror.getValue();
                else {
                    let selection = "";
                    if (__SQLEDITOR__.codeMirror.somethingSelected())
                        selection = __SQLEDITOR__.codeMirror.getSelection();
                    else
                        selection = __SQLEDITOR__.codeMirror.getValue();
                    let parameter = getSQLParameters(selection, __SQLEDITOR__.parameter);
                    if (parameter != null) {
                        UI.prompt.show("输入脚本参数", parameter, "auto", function (args, values) {
                            for (let key in values) {
                                __SQLEDITOR__.parameter[key] = values[key];
                            }
                            if (__SQLEDITOR__.title != null) {
                                let name = __SQLEDITOR__.title;
                                if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/x-sqlite")
                                    execute(name);
                                else if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/javascript")
                                    executeFunction(name);
                                else
                                    UI.alert.show("注意","请选择正确的脚本模式","auto");
                            } else {
                                UI.prompt.show("输入", {
                                    "集合名称": {
                                        value: "",
                                        type: "input"
                                    }
                                }, "auto", function (args, values) {
                                    let name = __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = values["集合名称"];
                                    if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/x-sqlite")
                                        execute(name);
                                    else if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/javascript")
                                        executeFunction(name);
                                    else
                                    UI.alert.show("注意","请选择正确的脚本模式","auto");
                                }, {})
                            }

                        }, {});
                    } else {
                        if (__SQLEDITOR__.title != null) {
                            let name = __SQLEDITOR__.title;
                            if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/x-sqlite")
                                execute(name);
                            else if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/javascript")
                                executeFunction(name);
                            else
                                UI.alert.show("注意", "请选择正确的脚本模式", "auto");
                        } else {
                            UI.prompt.show("输入", {"集合名称": {value: "", type: "input"}}, "auto", function (args, values) {
                                let name = __SQLEDITOR__.title = values["集合名称"];
                                if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/x-sqlite")
                                    execute(name);
                                else if (__SQLEDITOR__.configs.codeMirrorMode.value == "text/javascript")
                                    executeFunction(name);
                                else
                                    UI.alert.show("注意","请选择正确的脚本模式","auto");
                            }, {})
                        }
                    }
                }
            }
        };
        sqltools.appendChild(execsql);
        UI.tooltip(execsql, "执行脚本");

        let sqltitle = document.createElement("div");
        sqltitle.className = "button";
        sqltitle.id = "sql-title";
        sqltitle.style.cssFloat = "left";
        sqltools.appendChild(sqltitle);

        let tofull = document.createElement("div");
        sqltools.appendChild(tofull);
        tofull.className = "charButton";
        tofull.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("fullscreen", "white", "20px", "20px");
        tofull.style.cssFloat = "right";
        tofull.id = "set-editer-to-full";
        tofull.onclick = function () {
            __SQLEDITOR__.codeMirror.setOption("fullScreen", !__SQLEDITOR__.codeMirror.getOption("fullScreen"));
        };
        UI.tooltip(tofull, "进入全屏编辑");

        let toDisplay = document.createElement("div");
        sqltools.appendChild(toDisplay);
        toDisplay.className = "charButton";
        toDisplay.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(($("detail").style.display == "none"?"display":"hidden"), "white", "21px", "21px");
        toDisplay.style.cssFloat = "right";
        toDisplay.id = "display-log";
        toDisplay.onclick = function () {
            if ($("detail").style.display == "none") {
                $("detail").style.display = "block";
                setUserConfig("displayLogs", "block");
                this.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("hidden", "white", "21px", "21px");
                UI.tooltip(toDisplay, "隐藏日志模块");
            } else {
                $("detail").style.display = "none";
                setUserConfig("displayLogs", "none");
                this.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("display", "white", "21px", "21px");
                UI.tooltip(this, "显示日志模块");
            }
            resize();
        };
        if ($("detail").style.display == "none") {
            UI.tooltip(toDisplay, "显示日志模块");
        } else {
            UI.tooltip(toDisplay, "显示日志模块");
        }

        let editerSetting = document.createElement("div");
        sqltools.appendChild(editerSetting);
        editerSetting.className = "charButton";
        editerSetting.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("more", "white", "24px", "24px");
        editerSetting.style.cssFloat = "right";
        editerSetting.id = "editer-setting";
        editerSetting.onclick = function () {
            __SQLEDITOR__.setConfigs("auto", function () {
                __SQLEDITOR__.reset();
            });
        };
        UI.tooltip(editerSetting, "编辑器设置");

        //#######################################
        //初始化消息菜单
        //#######################################
        let detailtools = $("detail-tools");
        detailtools.ondblclick = function () {
            let style = {
                backgroundImage: getCss(document.body, "background-image"),
                backgroundColor: getCss(document.body, "background-color"),
            };
            requestFullScreen($("detail"), style);
        };

        let clean = document.createElement("div");
        clean.className = "charButton";
        clean.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("clearLogs", "white", "18px", "18px");
        clean.id = "logs-clear";
        clean.onclick = function () {
            let msgbox = $("messageBox");
            msgbox.innerHTML = "";
        };
        detailtools.appendChild(clean);
        UI.tooltip(clean, "清除浏览器缓存日志");

        let savelogs = document.createElement("div");
        savelogs.className = "charButton";
        savelogs.id = "save-logs";
        savelogs.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("download", "white", "20px", "20px");
        savelogs.style.cssFloat = "left";
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
        UI.tooltip(savelogs, "下载(删除)历史日志");

        let logsets = document.createElement("div");
        logsets.id = "logs-records";
        detailtools.appendChild(logsets);
        logsets.className = "charButton";
        logsets.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("more", "white", "24px", "24px");
        logsets.id = "logs-setting";
        logsets.style.cssFloat = "right";
        logsets.onclick = function () {
            __LOGS__.setConfigs("auto", function () {
                let msgbox = $("messageBox");
                let pagelogs = Number(__LOGS__.configs.logsPageSize.value);
                if (pagelogs > 0) {
                    while (msgbox.getElementsByClassName("dt").length > pagelogs) {
                        msgbox.removeChild(msgbox.getElementsByClassName("dt")[msgbox.getElementsByClassName("dt").length - 1])
                    }
                }
            });
        };
        UI.tooltip(logsets, "日志设置");

        //#######################################
        //初始化数据菜单
        //#######################################
        let datatools = $("data-tools");
        datatools.ondblclick = function () {
            let style = {
                backgroundImage: getCss(document.body, "background-image"),
                backgroundColor: getCss(document.body, "background-color"),
            };
            requestFullScreen($("main"), style);
        };
        datatools.style.cursor = "ns-resize";
        splitControl.hook(datatools, $("sqlContainer"), datatools.id, function (value) {
            if (value < getAbsolutePosition($("main")).height - getAbsolutePosition(datatools).height - getAbsolutePosition($("data-page-tools")).height - getAbsolutePosition($("sql-tools")).height) {
                $("sqlContainer").style.height = value + "px";
                resize();
            }
        });

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
                                            echarts.getInstanceByDom(container).clear();
                                            echartsInstance.dispose();
                                        } catch (e) {
                                        }
                                        __DATASET__.result.push(report.dataset);
                                        __DATASET__.default.sheet = __DATASET__.result.length - 1;
                                        $("open-sql-file").value = "";
                                        $("dataset-select-echarts-theme").value = __ECHARTS__.configs.echartsTheme.value = report.configs.echartsTheme.value;
                                        $("dataset-select-echarts-type").value = __ECHARTS__.configs.echartsType.value = report.configs.echartsType.value;
                                        __SQLEDITOR__.title = $("sql-title").innerText = $("sql-title").title = report.dataset.name;
                                        __SQLEDITOR__.codeMirror.setValue(report.dataset.sql);
                                        viewDataset(__DATASET__.default.sheet, 0, false);
                                        let _width = (getAbsolutePosition(container).width * 1) + "px";
                                        let _height = (getAbsolutePosition(container).height * 1) + "px";
                                        container.innerHTML = "";
                                        let echart_target = getEcharts(
                                            container,
                                            __DATASET__.result[__DATASET__.default.sheet],
                                            report.configs,
                                            _width,
                                            _height);
                                        setDragNook(container, echart_target.getAttribute("_echarts_instance_"));
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
        openEchartsFile.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("report", "white", "20px", "20px");
        openEchartsFile.style.cssFloat = "left";
        openEchartsFile.onclick = $("open-html-report").onclick = function () {
            $("open-echarts-file").click();
        };
        UI.tooltip(openEchartsFile, "打开固定报表");

        let getReport = document.createElement("div");
        datatools.appendChild(getReport);
        getReport.className = "charButton";
        getReport.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("report_download", "white", "20px", "20px");
        getReport.style.cssFloat = "left";
        getReport.onclick = $("download-html-report").onclick = function () {
            let container = $("tableContainer");
            let myEcharts = echarts.getInstanceByDom(container);
            if (typeof myEcharts !== "undefined" && typeof  __ECHARTS__.history[myEcharts.id] !== "undefined") {
                if (typeof getEchartsReport === "function")
                    getEchartsReport(container, myEcharts);
                else
                    UI.alert.show("注意", "固定报表组件未载入!", "auto");
            } else
                UI.alert.show("提示", "请生成数据视图后再下载固定报表.", "auto");
        };
        UI.tooltip(getReport, "下载固定报表");

        let dataReader = document.createElement("div");
        datatools.appendChild(dataReader);
        dataReader.className = "charButton";
        dataReader.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("onload", "white", "18px", "18px");
        dataReader.style.cssFloat = "left";
        dataReader.id = "data-reader";
        dataReader.onclick = $("read-xls-file").onclick = function () {
            if (typeof getDataReader === "function") {
                getDataReader("auto", function (values) {
                    __DATASET__.result.push(values);
                    viewDataset(__DATASET__.result.length - 1, 0, false);
                });
            } else
                UI.alert.show("提示", "未加载外部数据读取组件.", "auto");
        };
        UI.tooltip(dataReader, "读取外部数据");

        let datatran = document.createElement("div");
        datatools.appendChild(datatran);
        datatran.className = "charButton";
        datatran.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("datatran", "white", "18px", "18px");
        datatran.id = "dataset-transpose";
        let help_datasettranspose = $("help-dataset-transpose");
        datatran.onclick = help_datasettranspose.onclick = function () {
            if (__DATASET__.result.length > 0) {
                datasetTranspose(__DATASET__.default.sheet);
                viewDataset(__DATASET__.default.sheet, 0, false);
            }
        };
        UI.tooltip(datatran, "转置数据");

        let dataslice = document.createElement("div");
        datatools.appendChild(dataslice);
        dataslice.className = "charButton";
        dataslice.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("slice", "white", "16px", "16px");
        dataslice.id = "dataset-slice";
        let help_datasetslice = $("help-dataset-slice");
        dataslice.onclick = help_datasetslice.onclick = function () {
            if (__DATASET__.result.length > 0) {
                UI.getDataSlice("auto", function (values) {
                    for (let i = 0; i < values.length; i++) {
                        __DATASET__.result.push(values[i]);
                    }
                    viewDataset(__DATASET__.result.length - 1, 0, false);
                })
            }
        };
        UI.tooltip(dataslice, "数据切片");

        let subtotal = document.createElement("div");
        datatools.appendChild(subtotal);
        subtotal.className = "charButton";
        subtotal.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("sum", "white", "20px", "20px");
        subtotal.id = "dataset-subtotal";
        let help_datasetsubtotal = $("help-dataset-subtotal");
        subtotal.onclick = help_datasetsubtotal.onclick = function () {
            if (__DATASET__.result.length > 0) {
                UI.getSubtotal("auto", null, function (values) {
                    __DATASET__.result.push(values);
                    viewDataset(__DATASET__.result.length - 1, 0, false);
                });
            }
        };
        UI.tooltip(subtotal, "分类计算");

        let download = document.createElement("div");
        datatools.appendChild(download);
        download.className = "charButton";
        download.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("multi_download", "white", "18px", "18px");
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
                            UI.prompt.show("输入", {
                                "文件名称": {
                                    value: dataset.title.join("_"),
                                    type: "input"
                                }
                            }, "auto", function (args, values) {
                                let title = fixFileName(values["文件名称"]);
                                if (title.trim() != "") {
                                    openDownloadDialog(workbook2blob(args.sheets, args.sheetNames), title + ".xlsx");
                                }
                            }, {sheets: sheets, sheetNames: sheetNames});
                            break;
                        case "xml":
                            dataset = __DATASET__.result[__DATASET__.default.sheet];
                            UI.prompt.show("输入", {
                                "文件名称": {
                                    value: dataset.title.join("_"),
                                    type: "input"
                                }
                            }, "auto", function (args, values) {
                                let title = fixFileName(values["文件名称"]);
                                if (title.trim() != "") {
                                    let user = (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "");
                                    getXmlFile(title, args.dataset, user);
                                }
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
                                        UI.prompt.show("输入", {
                                            "文件名称": {
                                                value: "",
                                                type: "input"
                                            }
                                        }, "auto", function (args, values) {
                                            let title = fixFileName(values["文件名称"]);
                                            if (title.trim() != "") {
                                                openDownloadDialog(workbook2blob(args.sheets, args.sheetNames), title + ".xlsx");
                                            }
                                        }, {sheets: sheets, sheetNames: sheetNames});
                                        break;
                                    case "xml":
                                        UI.prompt.show("输入", {
                                            "文件名称": {
                                                value: "",
                                                type: "input"
                                            }
                                        }, "auto", function (args, values) {
                                            let title = fixFileName(values["文件名称"]);
                                            if (title.trim() != "") {
                                                let user = (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "");
                                                getXmlFile(title, args["dataset"], user);
                                            }
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
                                            let user = (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "");
                                            getXmlFile(title, [dataset], user);
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
        UI.tooltip(download, "下载数据集");

        let remove = document.createElement("div");
        datatools.appendChild(remove);
        remove.className = "charButton";
        remove.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("remove", "white", "20px", "20px");
        remove.id = "dataset-remove";
        let help_datasetremove = $("help-dataset-remove");
        remove.onclick = help_datasetremove.onclick = function () {
            if (__DATASET__.result.length > 0) {
                __DATASET__.result.splice(__DATASET__.default.sheet, 1);
                if (__DATASET__.default.sheet >= __DATASET__.result.length)
                    __DATASET__.default.sheet = __DATASET__.result.length - 1;

                if (__DATASET__.result.length > 0) {
                    viewDataset(__DATASET__.default.sheet, 0, true);
                } else {
                    $("tableContainer").innerText = "";
                    __DATASET__.default.tab = 0;
                    setDataPageTools(0);
                }
            }
        };
        UI.tooltip(remove, "删除数据集");

        let removeall = document.createElement("div");
        datatools.appendChild(removeall);
        removeall.className = "charButton";
        removeall.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("removeall", "white", "18px", "18px");
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
        UI.tooltip(removeall, "删除缓存(历史)视图数据");

        let fileSecurity = document.createElement("div");
        datatools.appendChild(fileSecurity);
        fileSecurity.className = "charButton";
        fileSecurity.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("encrypt", "white", "20px", "20px");
        fileSecurity.onclick = $("file-security").onclick = function () {
            if (typeof getFileSecurity === "function")
                getFileSecurity("auto");
            else
                UI.alert.show("提示", "未加载文件安全组件.", "auto");
        };
        UI.tooltip(fileSecurity, "文件加密解密");

        let mailto = document.createElement("div");
        datatools.appendChild(mailto);
        mailto.className = "charButton";
        mailto.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("email", "white", "18px", "18px");
        mailto.onclick = function () {
            if (typeof getMailComponent === "function")
                getMailComponent("auto");
            else
                UI.alert.show("提示", "未加载批量邮件组件.", "auto");
        };
        UI.tooltip(mailto, "邮件编辑");

        let blobsplit = document.createElement("div");
        datatools.appendChild(blobsplit);
        blobsplit.className = "charButton";
        blobsplit.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("datasplit", "white", "20px", "20px");
        blobsplit.onclick = function () {
            if (typeof splitFileBlob === "object") {
                splitFileBlob.show("大数据文件分割", "auto", function (args) {
                    let blob = new Blob([str2ab(args.result)], {type: "plain/text"});
                    openDownloadDialog(blob, args.name);
                });
            } else
                UI.alert.show("提示", "未加载外部数据读取组件.", "auto");
        };
        UI.tooltip(blobsplit, "大数据文件拆分");

        let datasetSetting = document.createElement("div");
        datatools.appendChild(datasetSetting);
        datasetSetting.className = "charButton";
        datasetSetting.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("more", "white", "24px", "24px");
        datasetSetting.id = "dataset-setting";
        datasetSetting.onclick = function () {
            __DATASET__.setConfigs("auto", function () {
                if (__DATASET__.result.length > 0) {
                    viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default, false);
                }
            });
        };
        UI.tooltip(datasetSetting, "报表设置");

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
        UI.tooltip(analysis, "Analysis");

        let toecharts = document.createElement("div");
        datatools.appendChild(toecharts);
        toecharts.className = "charButton";
        toecharts.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("fullscreen", "white", "20px", "20px");
        toecharts.style.cssFloat = "right";
        toecharts.id = "dataset-to-echarts";
        toecharts.onclick = function () {
            setTimeout(function () {
                try {
                    let echart_target = echarts.getInstanceByDom($("tableContainer"));
                    let style = {
                        backgroundImage: getCss(document.body, "background-image"),
                        backgroundColor: getCss(document.body, "background-color"),
                    };
                    if (typeof echart_target !== "undefined") {
                        requestFullScreen($("tableContainer"), style);
                        echart_target.resize();
                    } else if ($("multi-echarts") != null) {
                        requestFullScreen($("tableContainer"), style);
                    } else {
                        requestFullScreen($("main"), style);
                    }
                } catch (e) {
                    __LOGS__.viewError("auto", e);
                }
            }, 100);
        };
        UI.tooltip(toecharts, "显示大视图");

        let toconfigs = document.createElement("div");
        datatools.appendChild(toconfigs);
        toconfigs.className = "charButton";
        toconfigs.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("more", "white", "24px", "24px");
        toconfigs.style.cssFloat = "right";
        toconfigs.id = "dataset-to-configs";
        let help_echartsConfigs = $("help-select-echarts-configs");
        toconfigs.onclick = help_echartsConfigs.onclick = function () {
            __ECHARTS__.setConfigs("auto", function (configs) {
                let container = $("tableContainer");
                try {
                    if (__DATASET__.result.length > 0) {
                        try {
                            container.removeAttribute("_echarts_instance_");
                            echarts.getInstanceByDom(container).clear();
                            echartsInstance.dispose();
                        } catch (e) {
                        }
                        let _width = (getAbsolutePosition(container).width * 1) + "px";
                        let _height = (getAbsolutePosition(container).height * 1) + "px";
                        container.innerHTML = "";
                        let echart_target = getEcharts(
                            container,
                            __DATASET__["result"][__DATASET__.default.sheet],
                            configs,
                            _width,
                            _height);
                        setDragNook(container, echart_target.getAttribute("_echarts_instance_"));
                    }
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            });
        };
        UI.tooltip(toconfigs, "更多视图参数");

        let toMultiEcharts = document.createElement("div");
        datatools.appendChild(toMultiEcharts);
        toMultiEcharts.className = "charButton";
        toMultiEcharts.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("multiview", "white", "20px", "20px");
        toMultiEcharts.style.cssFloat = "right";
        toMultiEcharts.id = "dataset-to-multi-echarts";
        toMultiEcharts.onclick = $("help-dataset-to-multi-echarts").onclick = function () {
            getMultiEcharts($("tableContainer"));
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
                event.target.style.border = "0px dotted var(--main-border-color)";
            }
        };
        UI.tooltip(toMultiEcharts, "视图组合<br><span style='color: var(--main-border-color)'>☄</span>");

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
                setUserConfig("echartsconfig", JSON.stringify(__ECHARTS__.getConfigItems()));

                if (__DATASET__.result.length > 0) {
                    let container = $("tableContainer");
                    try {
                        container.removeAttribute("_echarts_instance_");
                        echarts.getInstanceByDom(container).clear();
                        echartsInstance.dispose();
                    } catch (e) {
                    }
                    let _width = (getAbsolutePosition(container).width * 1) + "px";
                    let _height = (getAbsolutePosition(container).height * 1) + "px";
                    container.innerHTML = "";
                    let echart_target = getEcharts(
                        container,
                        __DATASET__.result[__DATASET__.default.sheet],
                        __ECHARTS__.getConfigs(),
                        _width,
                        _height);
                    setDragNook(container, echart_target.getAttribute("_echarts_instance_"));
                }
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        datatools.appendChild(echartsThemes);
        UI.tooltip(echartsThemes, "视图主题");

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
                setUserConfig("echartsconfig", JSON.stringify(__ECHARTS__.getConfigItems()));
                if (__DATASET__.result.length > 0) {
                    let container = $("tableContainer");
                    try {
                        container.removeAttribute("_echarts_instance_");
                        echarts.getInstanceByDom(container).clear()
                        echartsInstance.dispose();
                    } catch (e) {
                    }
                    let _width = (getAbsolutePosition(container).width * 1) + "px";
                    let _height = (getAbsolutePosition(container).height * 1) + "px";
                    container.innerHTML = "";
                    let echart_target = getEcharts(
                        container,
                        __DATASET__.result[__DATASET__.default.sheet],
                        __ECHARTS__.getConfigs(),
                        _width,
                        _height);
                    setDragNook(container, echart_target.getAttribute("_echarts_instance_"));
                }
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        datatools.appendChild(echartsType);
        UI.tooltip(echartsType, "视图类型");

        let getecharts = document.createElement("div");
        datatools.appendChild(getecharts);
        getecharts.className = "charButton";
        getecharts.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, "white", "22px", "22px", __VERSION__.logo.flip);
        getecharts.style.cssFloat = "right";
        getecharts.id = "dataset-to-charts";
        let help_echarts = $("help-dataset-echarts");
        getecharts.onclick = help_echarts.onclick = function () {
            try {
                if (__DATASET__.result.length > 0) {
                    let container = $("tableContainer");
                    try {
                        container.removeAttribute("_echarts_instance_");
                        echarts.getInstanceByDom(container).clear();
                        echartsInstance.dispose();
                    } catch (e) {
                    }
                    let dataset = __DATASET__.result[__DATASET__.default.sheet];
                    let _width = (getAbsolutePosition(container).width * 1) + "px";
                    let _height = (getAbsolutePosition(container).height * 1) + "px";
                    container.innerHTML = "";
                    let echart_target = getEcharts(
                        container,
                        dataset,
                        __ECHARTS__.configs,
                        _width,
                        _height);
                    setDragNook(container, echart_target.getAttribute("_echarts_instance_"));
                }
            } catch (e) {
                __LOGS__.viewError(e);
            }
        };
        UI.tooltip(getecharts, "绘制数据视图");

        //其他工具
        $("image-base64").onclick = function () {
            getImageBase64Code("auto");
        };
        //创建系统用户
        $("create-sys-user").onclick = function () {
            UI.prompt.show("创建用户", {"用户名称": {value: "", type: "input"}}, "auto", function (values) {
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
                                UI.alert.show("提示", "两次密码输入不一致。", "auto");
                            } else if (pattern.test(key) == false) {
                                UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字。", "auto");
                            } else {
                                users[name] = {
                                    password: {value: values["确认密码"].hex_md5_hash(), date: new Date(), age: 180},
                                    date: new Date(),
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

        $("change-sys-user-password").onclick = function () {
            if (typeof __LOGS__.user.name !== "undefined") {
                let name = __LOGS__.user.name;
                UI.password.show("修改 " + name + " 的登录密码", {
                    "旧的密码": "",
                    "新的密码": "",
                    "确认密码": ""
                }, "auto", function (args, values) {
                    if (__LOGS__.user.attribute.password.value === values["旧的密码"].hex_md5_hash()) {
                        let name = args["name"];
                        let users = getUserConfig("Users");
                        users = JSON.parse(users.decode());
                        let pattern = /^.*(?=.{8,})(?=.*\d{1,7})(?=.*[A-Za-z]{1,7}).*$/;
                        //必须是8位密码,且必须包含字符和数字
                        let key = values["新的密码"];
                        if (key != values["确认密码"]) {
                            UI.alert.show("提示", "两次密码输入不一致。", "auto");
                        } else if (pattern.test(key) == false) {
                            UI.alert.show("提示", "请输入8位密码,且必须包含英文字母和数字。", "auto");
                        } else {
                            users[name].password = {
                                value: values["确认密码"].hex_md5_hash(),
                                date: new Date(),
                                age: 180
                            };
                            setUserConfig("Users", JSON.stringify(users).encode());
                            location.reload();
                        }
                    } else
                        UI.alert.show("注意", "原密码校验错误。", "auto");
                }, {name: name});
            } else {
                UI.alert.show("注意", "您尚未创建前端系统用户。", "auto");
            }
        };

        message.innerText += "OK.";
    } catch (e) {
        message.innerText += "fails.";
        __LOGS__.viewError("auto", e);
    }
}

function getEchartsClock() {
    try {
        if (__DATASET__.result.length == 0) {
            let container = $("tableContainer");
            try {
                container.removeAttribute("_echarts_instance_");
                echarts.getInstanceByDom(container).clear();
                echartsInstance.dispose();
            } catch (e) {
            }
            let width = (getAbsolutePosition(container).width * 1) + "px";
            let height = (getAbsolutePosition(container).height * 1) + "px";
            let configs = JSON.stringify(__ECHARTS__.configs);
            configs = JSON.parse(configs);
            //复制configs
            configs.echartsType.value = "Clock";
            configs.titleDisplay.value = "false";
            configs.renderer.value = "canvas";
            configs.toolboxDisplay.value = "false";
            configs.waterGraphEnable.value = "false";
            getEcharts(
                container,
                null,
                configs,
                width,
                height);
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
        qr.style.position = "absolute";
        qr.style.width = width + "px";
        qr.style.height = height + "px";
        qr.style.bottom = "10px";
        qr.style.right = "10px";
        let logo = logoImage;
        logo.id = "qrcode_logo";
        logo.style.backgroundColor = "white";
        logo.style.width = width / 4.0 + "px";
        logo.style.height = width / 4.0 + "px";
        logo.style.marginLeft = (width - width / 4.0) / 2 + "px";
        logo.style.marginTop = (height - width / 4.0) / 2 + "px";
        qr.appendChild(logo);
        qr.ondblclick = function () {
            UI.prompt.show("二维码", {
                内容: {value: this.title, type: "input"},
                颜色: {value: __THEMES__.get().color, type: "color"},
                背景: {value: "#FFFFFF", type: "color"},
                宽度: {value: "300", type: "input"},
                高度: {value: "300", type: "input"}
            }, "auto", function (values) {
                let options = {
                    color: values["颜色"],
                    background: values["背景"],
                    width: Number(values["宽度"]),
                    height: Number(values["高度"])
                };
                UI.QRCode("auto", values["内容"], options);
            });
        };
        new QRCode("qrcode", {
            text: text,
            width: width,
            height: height,
            colorDark: __THEMES__.get().color,
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

function resize() {
    //#######################################
    //由于使用百分比设置节点大小容易造成屏幕跳动，将节点大小调整为绝对值.
    //#######################################
    $("page").style.width = (getBrowserSize().width - 10) + "px";
    $("page").style.height = (getBrowserSize().height - 30) + "px";
    $("header").style.width = $("footer").style.width = (getBrowserSize().width - 15) + "px";
    $("MainContainer").style.height = (getBrowserSize().height - getAbsolutePosition($("header")).height - getAbsolutePosition($("footer")).height - 32) + "px";
    $("main").style.width = (getBrowserSize().width - getAbsolutePosition($("sidebar")).width - getAbsolutePosition($("detail")).width - 15) + "px";
    __SQLEDITOR__.reset();
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

    if ($("qrcode") !== null) {
        $("qrcode").style.bottom = "10px";
        $("qrcode").style.right = "10px";
    }
    setTimeout(function () {
        try {
            let echart_target = echarts.getInstanceByDom($("tableContainer"));
            if (typeof echart_target !== "undefined")
                echart_target.resize();
            let contents = $("tableContainer").getElementsByClassName("multi-echarts-view-contain");
            for (let i = 0; i < contents.length; i++) {
                echart_target = echarts.getInstanceByDom(contents[i]);
                if (typeof echart_target !== "undefined")
                    echart_target.resize();
            }
        } catch (e) {
            __LOGS__.viewError("auto", e);
        }
    }, 100);
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
            UI.getDataFilter("auto", this.getAttribute("colid"),function(values){
                __DATASET__.result.push(values);
                viewDataset(__DATASET__.result.length - 1, 0, false);
            });
        }
    };
    ul.appendChild(li);

    li = document.createElement("li");
    li.id = "table-column-menu-formater";
    li.innerHTML = "&emsp;● 格式";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        UI.setColumnFormat("auto", this.getAttribute("colid"), function(index){
           viewDataset(index, 0, false);
        });
    };
    ul.appendChild(li);

    li = document.createElement("li");
    li.id = "table-column-menu-subtotal";
    li.innerHTML = "&emsp;● 分类计算";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        UI.getSubtotal("auto", Number(this.getAttribute("colid")), function(values) {
            __DATASET__.result.push(values);
            viewDataset(__DATASET__.result.length - 1, 0, false);
        });
    };
    ul.appendChild(li);

    return ul;
}

function setPageThemes() {
    let message = __LOGS__.viewMessage("设置应用页面主题...");
    try {
        let themes = $("help-select-user-themes");
        for(let name in __THEMES__.list){
            themes.options.add(new Option(name));
        }
        try {
            let theme = getUserConfig("pagethemes");
            if (theme != null) {
                __THEMES__.set(theme);
                themes.value = theme;
            } else {
                themes.selectedIndex = 0;
            }
            $("themes").setAttribute("href", __THEMES__.get().href);
        } catch (e) {
            __LOGS__.viewError("auto", e);
        }
        themes.onchange = function () {
            setUserConfig("pagethemes", this.value);
            __THEMES__.set(this.value);
            $("themes").setAttribute("href", __THEMES__.get().href);
            //同步编辑主题
            let theme = getOptionValue(__SQLEDITOR__.configs.codeMirrorTheme.options, this.options[this.selectedIndex].innerText);
            __SQLEDITOR__.configs.codeMirrorTheme.value = theme;
            theme = JSON.parse(theme);
            $("sqlediterTheme").setAttribute("href", theme.href);
            __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
            setUserConfig("codeMirrorConfig", JSON.stringify(__SQLEDITOR__.getConfigItems()));

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

            location.reload();
        };

        let mapconfig = $("help-local-map-config");
        let localmap = $("help-local-map");
        mapconfig.onclick = localmap.onclick = function () {
            geoCoordMap.setMapConfig("auto");
        };
        message.innerText += "OK.";
    } catch (e) {
        message.innerText += "fails.";
        __LOGS__.viewError("auto", e);
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
                echarts.getInstanceByDom(this).clear();
                echartsInstance.dispose();
            } catch (e) {
            }
            event.target.style.border = "0px dotted  sandybrown";
            let id = event.dataTransfer.getData("Text");
            let history = __ECHARTS__.history[id];
            if (history != null) {
                history = JSON.parse(history);
                try {
                    let posi = getAbsolutePosition(this);
                    let _width = posi.width + "px";
                    let _height = posi.height + "px";
                    let echart_target = getEcharts(
                        this,
                        history.dataset,
                        history.configs,
                        _width,
                        _height);
                    setDragNook(echart_target, echart_target.getAttribute("_echarts_instance_"));
                    setEchartDrag(this);
                } catch (e) {
                    __LOGS__.viewError(e);
                }
            } else {
                setMultiEchartsView(this, id);
                this.style.border = "0px dotted  sandybrown";
            }
        }
    };
    ec.ondragleave = function (event) {
        if (event.target.className == "multi-echarts-view-contain") {
            event.target.style.border = "1px dotted sandybrown";
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
        contain.style.left = view[0] + "%";
        contain.style.top = view[1] + "%";
        contain.style.width = view[2] + "%";
        contain.style.height = view[3] + "%";
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
    b.innerHTML = "重新布局";
    b.onclick = function () {
        $("multi-echarts-view").innerHTML = "请从右侧拖入您需要的布局框架。";
    };
    toolbar.appendChild(b);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "新增";
    b.onclick = function () {
        UI.prompt.show("输入", {"布局名称": {value:"", type:"input"}}, "auto", function (args, values) {
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
                    __ECHARTS__.layouts[name] = {data: [[1, 1, 98, 98],], position: "absolute"};
                    setUserConfig("MULTI_LAYOUTS", JSON.stringify(__ECHARTS__.layouts));
                    getLayoutslist($("multi-layouts-list"))
                }
            }
        }, {});
    };
    toolbar.appendChild(b);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "重置";
    b.onclick = function () {
        UI.confirm.show("警告", "您确定初始化所有框架吗?", "auto", function () {
            setUserConfig("MULTI_LAYOUTS", JSON.stringify({}));
            location.reload();
        }, {});
    };
    toolbar.appendChild(b);

    for (let name in __ECHARTS__.layouts) {
        let row = document.createElement("div");
        row.className = "multi-layouts-list-row";
        row.id = name;
        row.draggable = "true";
        row.ondragstart = function (event) {
            event.dataTransfer.setData("Text", event.target.id);
        };
        parent.appendChild(row);

        let title = document.createElement("div");
        title.className = "title";
        let text = document.createElement("span");
        title.appendChild(text);
        text.style.cssFloat = "left";
        text.innerHTML = name;
        row.appendChild(title);

        let del = document.createElement("span");
        del.className = "clickable";
        del.innerText = "✘";
        del.setAttribute("id", name);
        del.onclick = function () {
            let name = this.getAttribute("id");
            delete __ECHARTS__.layouts[name];
            setUserConfig("MULTI_LAYOUTS", JSON.stringify(__ECHARTS__.layouts));
            row.parentElement.removeChild(row);
        };
        title.appendChild(del);

        let save = document.createElement("span");
        save.className = "clickable";
        save.innerText = "✔";
        save.setAttribute("id", name);
        save.onclick = function () {
            try {
                let name = this.getAttribute("id");
                let value = $("multi-layouts-list-row-edit-" + name).value;
                let layouts = JSON.parse(value);
                let checked = true;
                for (let i = 0; i < layouts.length; i++) {
                    let layout = layouts[i];
                    if (layout.length != 4) {
                        checked = false;
                        break;
                    } else if ((layout[0] + layout[2]) > 100 || (layout[1] + layout[3]) > 100 || layout[0] < 0 || layout[1] < 0 || layout[2] < 0 || layout[3] < 0) {
                        checked = false;
                        break;
                    }
                }
                if (checked) {
                    __ECHARTS__.layouts[name].data = layouts;
                    setUserConfig("MULTI_LAYOUTS", JSON.stringify(__ECHARTS__.layouts));
                    UI.alert.show("提示", "布局格式已保存.");
                } else
                    UI.alert.show("提示", "布局格式检查未通过！<li>[ 左边距 , 上边距 , 宽度 , 高度 ].</li><li>采用百分比数值.</li><li>数值在[0-100]之间.</li></li><li>左边距与宽度之和小于100.</li><li>上边距与高度之和小于100.</li>");
            } catch (e) {
                UI.alert.show("提示", "布局格式检查未通过！<li>[ 左边距 , 上边距 , 宽度 , 高度 ].</li><li>采用百分比数值.</li><li>数值在[0-100]之间.</li></li><li>左边距与宽度之和小于100.</li><li>上边距与高度之和小于100.</li>");
            }
        };
        title.appendChild(save);

        let toedit = document.createElement("span");
        toedit.className = "clickable";
        toedit.innerText = "…";
        toedit.setAttribute("id", name);
        toedit.onclick = function () {
            let name = this.getAttribute("id");
            let edit = $("multi-layouts-list-row-edit-" + name);
            if (edit.style.display == "block") {
                this.innerText = "…";
                edit.style.display = "none";
                let container = $("multi-layouts-list-row-view-" + name);
                let contents = container.getElementsByClassName("multi-echarts-view-contain");
                for (let i = 0; i < contents.length; i++) {
                    container.removeChild(contents[i]);
                }
                try {
                    contents = JSON.parse(edit.value);
                    let checked = true;
                    for (let i = 0; i < contents.length; i++) {
                        let layout = contents[i];
                        if (layout.length != 4) {
                            checked = false;
                            break;
                        } else if ((layout[0] + layout[2]) > 100 || (layout[1] + layout[3]) > 100 || layout[0] < 0 || layout[1] < 0 || layout[2] < 0 || layout[3] < 0) {
                            checked = false;
                            break;
                        }
                    }
                    if (checked) {
                        for (let i = 0; i < contents.length; i++) {
                            let view = contents[i];
                            let content = document.createElement("div");
                            content.className = "multi-echarts-view-contain";
                            content.style.position = "absolute";
                            content.style.left = view[0] + "%";
                            content.style.top = view[1] + "%";
                            content.style.width = view[2] + "%";
                            content.style.height = view[3] + "%";
                            content.style.zIndex = "0";
                            container.appendChild(content);
                        }
                    } else {
                        UI.alert.show("提示", "布局格式检查未通过！<li>[ 左边距 , 上边距 , 宽度 , 高度 ].</li><li>采用百分比数值.</li><li>数值在[0-100]之间.</li></li><li>左边距与宽度之和小于100.</li><li>上边距与高度之和小于100.</li>");
                    }
                } catch (e) {
                    UI.alert.show("提示", "布局格式检查未通过！<li>[ 左边距 , 上边距 , 宽度 , 高度 ].</li><li>采用百分比数值.</li><li>数值在[0-100]之间.</li></li><li>左边距与宽度之和小于100.</li><li>上边距与高度之和小于100.</li>");
                }
            } else {
                this.innerText = "❏";
                edit.style.display = "block";
            }
        };
        title.appendChild(toedit);

        let detail = document.createElement("div");
        detail.id = "multi-layouts-list-row-view-" + name;
        detail.style.display = "block";
        detail.style.position = "relative";
        detail.style.height = "100px";
        detail.style.width = "100%";
        detail.style.overflow = "hide";
        row.appendChild(detail);

        for (let i = 0; i < __ECHARTS__.layouts[name].data.length; i++) {
            let view = __ECHARTS__.layouts[name].data[i];
            let contain = document.createElement("div");
            contain.className = "multi-echarts-view-contain";
            contain.style.position = "absolute";
            contain.style.left = view[0] + "%";
            contain.style.top = view[1] + "%";
            contain.style.width = view[2] + "%";
            contain.style.height = view[3] + "%";
            contain.style.zIndex = "0";
            detail.appendChild(contain);
        }

        let edit = document.createElement("textarea");
        edit.className = "multi-layouts-list-row-edit";
        edit.id = ("multi-layouts-list-row-edit-" + name);
        edit.style.position = "absolute";
        edit.style.display = "none";
        edit.style.width = "100%";
        edit.style.height = "100%";
        edit.style.zIndex = "1";
        edit.type = "textarea";
        edit.value = JSON.stringify(__ECHARTS__.layouts[name].data);
        detail.appendChild(edit);
    }
}

function getMultiEcharts(parent) {
    try {
        if (parent.getElementsByClassName("multi-echarts").length == 0) {
            parent.innerHTML = "";

            let multiEcharts = document.createElement("div");
            multiEcharts.className = multiEcharts.id = "multi-echarts";
            parent.appendChild(multiEcharts);

            let echartsList = document.createElement("div");
            echartsList.id = echartsList.className = "multi-echarts-list";
            multiEcharts.appendChild(echartsList);

            for (let i = 0; i < __ECHARTS__.sets.data.length; i++) {
                let history = JSON.parse(__ECHARTS__.history[__ECHARTS__.sets.data[i]]);
                let row = document.createElement("div");
                row.className = "multi-echarts-list-row";
                row.id = history.id;

                let title = document.createElement("div");
                title.style.minHeight = "20px";
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
            multiEchartsViews.style.lineHeight = getAbsolutePosition(parent).height + "px";
            multiEchartsViews.innerHTML = "请从右侧拖入您需要的布局框架。";
            multiEchartsViews.onmousemove = function () {
                let active = 6;
                let posit = getAbsolutePosition($("multi-echarts"));
                if ((event.x - posit.left) < active && ((event.y - posit.top) * 100 / posit.height >= 25 && (event.y - posit.top) * 100 / posit.height <= 75)) {
                    $("multi-echarts-list").style.display = "block";
                } else {
                    $("multi-echarts-list").style.display = "none";
                }

                if ((posit.left + posit.width - event.x) < active
                    && ((event.y - posit.top) * 100 / posit.height >= 25 && (event.y - posit.top) * 100 / posit.height <= 75)) {
                    $("multi-layouts-list").style.display = "block";
                    $("multi-layouts-list").style.left = (posit.width - 305) + "px"
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
                    event.target.style.opacity = 1;
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
                        for (let i = 0; i < mul.length; i++) {
                            setTimeout(function () {
                                try {
                                    echarts.getInstanceByDom(mul[i]).clear();
                                    echartsInstance.dispose();
                                    mul[i].parentNode.removeChild(mul[i]);
                                } catch (e) {
                                }
                            }, 100);
                        }
                        $("multi-echarts").parentNode.removeChild($("multi-echarts"));
                    }
                }
            });
        }
    } catch (e) {
        __LOGS__.viewError("auto", e);
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
                    echarts.getInstanceByDom(parent).clear();
                    echartsInstance.dispose();
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
                            history.dataset,
                            history.configs,
                            _width,
                            _height);
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
                event.target.parentNode.style.border = "0px dotted var(--main-border-color)";
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
                viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default, false);
            }
        } else {
            label.innerText = " ● ";
        }
    };
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
            viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default, false);
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
                viewDataset(__DATASET__.default.sheet, __DATASET__.pages.default, false);
            }
        } else {
            label.innerText = " ● ";
        }
    }
    main.appendChild(toup);
}

function getImageBase64Code(parent, img) {
    function getImage(src) {
        let image = document.createElement("img");
        image.id = "source-image-file-image";
        image.type = "img";
        image.src = src;
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
        return image;
    }

    if (parent == "auto" || parent == null) {
        if (document.fullscreen && typeof __CONFIGS__.FULLSCREEN.element == "object") {
            parent = __CONFIGS__.FULLSCREEN.element;
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
    title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);
    let span = document.createElement("span");
    span.innerHTML = "设置背景";
    title.appendChild(span);
    let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
                UI.alert.show("提示", "请选择图片文件！");
                return false;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $("image-container").innerHTML = "";
                $("source-image-file-code").value = this.result;
                $("image-container").appendChild(getImage(this.result));
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
    if (typeof img !== "undefined") {
        filecontainer.appendChild(getImage(img.src));
    }
    content.appendChild(filecontainer);

    let imagecode = document.createElement("textarea");
    imagecode.id = "source-image-file-code";
    imagecode.style.cssText = "width: 100%;\n" +
        "height: 370.8px;\n" +
        "resize: none;" +
        "display: none;" +
        "font-size: 90%;\n";
    imagecode.type = "textarea";
    if (typeof img !== "undefined") {
        imagecode.value = img.src;
    }
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

    let toimage = document.createElement("div");
    toimage.className = "button";
    toimage.id = "toimage";
    toimage.innerText = "解析";
    toimage.onclick = close.onclick = function () {
        $("image-container").innerHTML = "";
        $("image-container").appendChild(getImage($("source-image-file-code").value));
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
        UI.alert.show("提示", "已复制到粘贴板.");
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

                let theme = getOptionValue(__SQLEDITOR__.configs.codeMirrorTheme.options, "透明");
                __SQLEDITOR__.configs.codeMirrorTheme.value = theme;
                theme = JSON.parse(theme);
                $("sqlediterTheme").setAttribute("href", theme.href);
                __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
                setUserConfig("codeMirrorConfig", JSON.stringify(__SQLEDITOR__.getConfigItems()));
            }
        } else {
            UI.alert.show("提示", "背景图片文件(" + Math.round(file.size / 1024 / 1024 * 100) / 100 + "MB)不能大于 0.5MB.")
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
    dragControl.hook(title, content, container.id, function (left, top) {
        content.style.left = left + "px";
        content.style.top = top + "px"
    });
}

function  setClipboardListener(target) {
    console.log(target);
    function handler(event) {
        if (typeof target.value != "undefined")
            event.clipboardData.setData("text/plain", target.value);
        else if (target.innerText != "undefined")
            event.clipboardData.setData("text/plain", target.innerText);
        else if (target.src != "undefined")
            event.clipboardData.setData("text/plain", target.src);
        console.log(event.clipboardData);
        event.preventDefault();
    }
    document.addEventListener("copy", handler);   // 增加copy监听
}
