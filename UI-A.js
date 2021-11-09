
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES__.alert.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES__.confirm.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            image.src = __SYS_IMAGES__.prompt.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            image.src = __SYS_IMAGES__.choice.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            image.src = __SYS_IMAGES__.login.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
            input.style.backgroundImage = "url(" + __SYS_IMAGES__.user.image + ")";
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
            input.style.backgroundImage = "url(" + __SYS_IMAGES__.key.image + ")";
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
            this.title = message;
            this.items = items;
            let container = document.createElement("div");
            container.id = "ui_password";
            container.className = "ui-container-background";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            image.src = __SYS_IMAGES__.password.image;
            image.size = "30% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:30%;float: left;" +
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
                input.style.backgroundImage = "url(" + __SYS_IMAGES__.key.image + ")";
                input.style.backgroundRepeat = "no-repeat";
                input.style.backgroundPosition = "right";
                input.style.backgroundSize = "16px 16px";
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }

            function getSQLList(table) {
                table.innerText = "";
                let tr = document.createElement("tr");
                tr.className = "tr";
                table.appendChild(tr);
                let th = document.createElement("th");
                th.className = "th";
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
                th.className = "th";
                th.style.width = "40px";
                th.innerText = "序号";
                tr.appendChild(th);
                th = document.createElement("th");
                th.className = "th";
                th.innerText = "脚本名称";
                tr.appendChild(th);
                th = document.createElement("th");
                th.className = "th";
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
                    td.className = "td";
                    let check = document.createElement("input");
                    check.type = "checkbox";
                    check.className = "check";
                    check.style.width = "35px";
                    td.appendChild(check);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.className = "td";
                    td.style.width = "36px";
                    td.style.textAlign = "center";
                    td.innerText = i + 1;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.className = "td";
                    td.innerText = td.title = name;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.className = "td";
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
                        reader.readAsText(file, __SQLEDITOR__.charset.options[__SQLEDITOR__.charset.value]);
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
    createDatabase:function(parent) {
        let __DATABASE__ = {
            Name: {value: "", name: "库名称", type: "text", image: "url(" + __SYS_IMAGES__.database.image + ")"},
            Version: {value: 1.0, name: "版本号", type: "text"},
            Description: {value: "", name: "库描述", type: "text"},
            Size: {value: "1024*1024*1024", name: "库容量", type: "text"}
        };
        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        span.innerHTML = "● 创建数据库 ";
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        close.className = "ui-container-close";
        title.appendChild(close);
        content.appendChild(title);

        let hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        for (let name in __DATABASE__) {
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

        hr = document.createElement("hr");
        hr.className = "ui-container-hr";
        content.appendChild(hr);

        let tool = document.createElement("div");
        tool.className = "groupbar";
        tool.style.cssFloat = "left";
        content.appendChild(tool);

        let b = document.createElement("button");
        b.className = "button";
        b.innerHTML = "创建";
        b.onclick = function () {
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
                    for (let i = 0; i < dbs.length; i++) {
                        if (dbs[i].name == __DATABASE__.Name.value) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1)
                        dbs.push(db);
                    else {
                        UI.confirm.show("注意", "数据库 " + __DATABASE__.Name.value + " 已经存在,是否修改相关信息?", "auto", function (args) {
                            args.dbs[args.index] = args.db;
                        }, {dbs: dbs, index: index, db: db});
                    }
                    storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                    viewDatabases();
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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
                let first = container.firstChild;
                container.insertBefore(item, first);

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

            function scrollto() {
                let items = $("ui-progress-detail").getElementsByClassName("ui-progress-detail-item");
                items[items.length - 1].scrollIntoView({
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
                                                viewPacket(packet);
                                                scrollto();
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
                                        viewPacket(packet);
                                        scrollto();
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
                                viewPacket(packet);
                                scrollto();
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
                            viewPacket(packet);
                            scrollto();
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
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