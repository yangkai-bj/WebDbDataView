
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
    QRCode: function(parent, text, options, callback) {
        if (parent == "auto" || parent == null) {
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
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
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
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
                tip.style.backgroundImage = "url(" + __SYS_IMAGES__.mouse.image + ")";
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
            if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                parent = __CONFIGS__.fullScreen.element;
            } else {
                parent = document.body;
            }
        }
        let parentposi = getAbsolutePosition(parent);
        parent.appendChild(container);
        let content = document.createElement("div");
        content.className = "ui-container-help";
        content.style.backgroundImage = "url(" + __SYS_IMAGES__.mouse.image + ")";
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
            let charset = typeof args.charset != "undefined" ? args.charset : "GBK";
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
                        reader.readAsText(file, charset);
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

            let exit = document.createElement("div");
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

        let checknone = document.createElement("div");
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

var MySQL = {
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
    createDatabase: function (parent, callback, args) {
        let __DATABASE__ = {
            Name: {value: "", name: "名称", type: "text", placeholder: "", image: "url(" + __SYS_IMAGES__.server.image + ")"},
            Hosts: {value: "", name: "地址", type: "text", placeholder: "WS服务地址", image: "url(" + __SYS_IMAGES__.IP.image + ")"},
            User: {value: "", name: "用户", type: "text", placeholder: "", image: "url(" + __SYS_IMAGES__.user.image + ")"},
            Password: {value: "", name: "密码", type: "password", placeholder: "☀☀☀☀☀☀☀☀", image: "url(" + __SYS_IMAGES__.key.image + ")"},
            Description: {value: "", name: "描述", type: "text", placeholder: ""}
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
        span.innerHTML = "● 创建数据库连接 ";
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
            span.className = "ui-container-item-name ";
            span.innerHTML = __DATABASE__[name].name + ":";
            item.appendChild(span);
            if (__DATABASE__[name].type == "text" || __DATABASE__[name].type == "password") {
                let input = document.createElement("input");
                input.id = name;
                input.className = "ui-container-item-input";
                input.type = __DATABASE__[name].type;
                input.placeholder = __DATABASE__[name].placeholder;
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
                    let values = {
                        name: __DATABASE__.Name.value,
                        db: {
                            Serverhost: __DATABASE__.Hosts.value,
                            User: __DATABASE__.User.value,
                            Password: __DATABASE__.Password.value.encode(),
                            Description: __DATABASE__.Description.value
                        }
                    };
                    if (typeof callback == "function") {
                        if (typeof args == "undefined")
                            callback(values);
                        else
                            callback(args, values);
                    }
                    parent.removeChild($("ui_createDatabase"));
                } else
                    UI.alert.show("提示", "请输入数据库连接名称.")
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

    createTable: function (parent, structure, callback) {
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
        for (let index in MySQL.columnStruct) {
            let th = document.createElement("th");
            tr.appendChild(th);
            if (index != "check")
                th.innerText = MySQL.columnStruct[index].name;
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
            for (let index in MySQL.columnStruct) {
                let td = document.createElement("td");
                tr.appendChild(td);
                let attri;
                if (MySQL.columnStruct[index].type == "select") {
                    attri = document.createElement("select");
                    attri.className = index;
                    attri.type = MySQL.columnStruct[index].type;
                    for (let i = 0; i < MySQL.columnStruct[index].options.length; i++) {
                        attri.options.add(new Option(MySQL.columnStruct[index].options[i], MySQL.columnStruct[index].options[i]));
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
                    attri.type = MySQL.columnStruct[index].type;

                    if (attri.type == "checkbox") {
                        if (structure == null) {
                            if (MySQL.columnStruct[index].value == true) {
                                attri.setAttribute("checked", "checked");
                            }
                        } else if (structure["stru"][rows][index] == true)
                            attri.setAttribute("checked", "checked");
                        attri.onclick = function () {
                            if (this.checked == false) {
                                this.removeAttribute("checked");
                            } else {
                                this.setAttribute("checked", "checked");
                            }
                        }
                    } else {
                        if (structure == null)
                            attri.value = MySQL.columnStruct[index].value;
                        else
                            attri.value = structure["stru"][rows][index];
                    }
                }
                attri.style.width = MySQL.columnStruct[index].width;
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
            for (let index in MySQL.columnStruct) {
                let td = document.createElement("td");
                tr.appendChild(td);
                let attri;
                if (MySQL.columnStruct[index].type == "select") {
                    attri = document.createElement("select");
                    attri.className = index;
                    attri.type = MySQL.columnStruct[index].type;
                    for (let i = 0; i < MySQL.columnStruct[index].options.length; i++) {
                        attri.options.add(new Option(MySQL.columnStruct[index].options[i], MySQL.columnStruct[index].options[i]));
                    }
                } else {
                    attri = document.createElement("input");
                    attri.className = index;
                    attri.type = MySQL.columnStruct[index].type;

                    if (attri.type == "checkbox") {
                        if (MySQL.columnStruct[index].value == true) {
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
                        attri.value = MySQL.columnStruct[index].value;
                    }
                }
                attri.style.width = MySQL.columnStruct[index].width;
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
            if (__CONFIGS__.CURRENT_DATABASE.state != 1) {
                UI.alert.show("提示", "请选择数据库.");
                return;
            }
            if (checkStorage()) {
                let table = $("table-Content");
                let rows = table.getElementsByTagName("tr");
                let stru = [];
                for (let i = 1; i < rows.length; i++) {
                    let col = {};
                    for (let index in MySQL.columnStruct) {
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
                    let sql = MySQL.getTableSQL(title.value, stru);
                    __LOGS__.viewMessage(sql);
                    callback({title:title.value, sql:sql});
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
            timeout: {value: 5, name: "包延时", type: "select", options: [50, 100, 200, 300, 400, 500, 1000, 1500, 2000]},
            linex: {
                value: 0,
                name: "包行数",
                type: "select",
                options: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300]
            },
            SourceFile: {
                value: "",
                name: "源文件",
                type: "file",
                data: [],
                total: 0,
                count: 0,
                imported: 0,
                failed: 0,
                state: 0, //0:未启动;1已启动;2中止;9结束,
                progress: null
            },
            SelectedDataSet: {value: -1, name: "数据集", type: "select", options: []},
        },
        run: function () {
            //#######################################
            //默认行分隔符:\r\n
            //数据分隔符:支持|,\t
            //#######################################

            function viewPacket(packet) {
                let container = $("ui-progress-detail");
                let item = document.createElement("div");
                item.className = "ui-progress-detail-item";
                item.id = packet.eventid + "-" + packet.index;
                container.appendChild(item);
                let d_index = document.createElement("span");
                d_index.className = "ui-progress-detail-item-index";
                d_index.innerText = packet.index + 1;
                d_index.setAttribute("eventid", packet.eventid);
                d_index.setAttribute("index", packet.index);
                d_index.title = "数据包序号,点击可触发.";
                item.appendChild(d_index);
                d_index.onclick = function () {
                    let eventid = this.getAttribute("eventid");
                    let index = Number(this.getAttribute("index"));
                    let result = __DATASET__.getResult(eventid);
                    result.blocking = 0;
                    if (result.packets[index].imported < result.packets[index].data.length)
                        if (result.packets[index].imported == 0)
                            insertData(eventid, index);
                        else {
                            UI.confirm.show("注意", "该数据包已部分导入,再次触发将可能导致数据重复!<br>(如已建立唯一索引可避免数据重复)<br>是否继续?", "auto", function (args) {
                                insertData(args.eventid, args.index);
                            }, {eventid: eventid, index: index});
                        }
                    else {
                        UI.alert.show("提示", "该数据包已全部导入！");
                    }
                }

                let d_sent = document.createElement("span");
                d_sent.className = "ui-progress-detail-item-lines";
                d_sent.innerText = packet.lines;
                d_sent.title = "数据包行数";
                item.appendChild(d_sent);

                let d_size = document.createElement("span");
                d_size.className = "ui-progress-detail-item-size";
                d_size.innerHTML = "&ensp;";
                d_size.title = "数据包长度";
                item.appendChild(d_size);

                let d_queue = document.createElement("span");
                d_queue.className = "ui-progress-detail-item-queue";
                d_queue.innerHTML = "&ensp;";
                d_queue.title = "队列等候时长";
                item.appendChild(d_queue);

                let d_imported = document.createElement("span");
                d_imported.className = "ui-progress-detail-item-imported";
                d_imported.innerText = packet.imported;
                d_imported.title = "导入数据行数";
                item.appendChild(d_imported);
                let d_commit = document.createElement("span");
                d_commit.className = "ui-progress-detail-item-commit";
                d_commit.title = "数据处理时长";
                d_commit.innerHTML = "&ensp;";
                item.appendChild(d_commit);
            }

            function _insertData(eventid, sql, rows) {
                //未采用
                return function () {
                    try {
                        let insert = {sql: sql, rows: rows};
                        let msg = {
                            eventid: eventid,
                            type: messageType.importData,
                            message: JSON.stringify(insert).encode(),
                        };
                        __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msg));
                    } catch (e) {
                        UI.alert.show("警告", "function: insertData;\n" + e);
                    }
                }
            }

            function insertData(eventid, index) {
                if (MySQL.import.configs.SourceFile.state == 1) {
                    try {
                        let result = __DATASET__.getResult(eventid);
                        let insert = {index: index, sql: result.sql, rows: result.packets[index].data};
                        let msg = {
                            eventid: eventid,
                            type: messageType.importData,
                            message: JSON.stringify(insert).encode(),
                        };
                        let size = Math.round(getByteLength(result.packets[index].data.toString()) * 100 / 1024) / 100 + "Kb";
                        result.packets[index].commitTime = new Date().getTime();
                        if ($(eventid + "-" + index) != null) {
                            $(eventid + "-" + index).getElementsByClassName("ui-progress-detail-item-size")[0].innerText = size;
                            $(eventid + "-" + index).getElementsByClassName("ui-progress-detail-item-queue")[0].innerText =
                                (index > 0 ? (result.packets[index].commitTime - result.packets[index - 1].commitTime) : 0) + "ms/" +
                                Math.round((result.packets[index].commitTime - result.packets[index].beginTime) / 10) / 100 + "s";
                        }
                        if (result.blocking == 0 && result.commit < 2) {
                            result.commit += 1;
                            __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msg));
                        } else {
                            result.blocking -= 1;
                            if ($(eventid + "-" + index) != null) {
                                $(eventid + "-" + index).getElementsByClassName("ui-progress-detail-item-commit")[0].innerText = "Discarded";
                                $(eventid + "-" + index).style.color = "brown";
                            }
                        }
                    } catch (e) {
                        __LOGS__.viewError("auto", e);
                    }
                }
            }

            try {
                let timeout = MySQL.import.configs.timeout.options[MySQL.import.configs.timeout.value];
                let linex = MySQL.import.configs.linex.options[MySQL.import.configs.linex.value];
                //需要采用闭包方式,设定每行发起间隔的毫秒数,至少50毫秒,为增加可靠性，建议根据服务器性能、网速进行调整测试.
                let sep = MySQL.import.configs.Separator.value;
                let lines = MySQL.import.configs.SourceFile.data[MySQL.import.configs.SelectedDataSet.value].split("\r\n");
                if (lines.length == 1)
                    lines = MySQL.import.configs.SourceFile.data[MySQL.import.configs.SelectedDataSet.value].split("\n");
                let table = __CONFIGS__.CURRENT_TABLE.name;
                MySQL.import.configs.SourceFile.total = lines.length - 1;
                //不含表头
                MySQL.import.configs.SourceFile.count = 0;
                MySQL.import.configs.SourceFile.imported = 0;
                MySQL.import.configs.SourceFile.failed = 0;
                MySQL.import.configs.SourceFile.state = 1;
                let sql = "INSERT INTO " + table + " ({COLUMNS}) VALUES ({VALUES})";

                let eventid = getEventIndex();
                let result = {
                    eventid: eventid,
                    title: [table],
                    columns: [],
                    data: [],
                    total: MySQL.import.configs.SourceFile.total,
                    count: 0,
                    packets: [],
                    sql: null,
                    type: "text/x-mysql",
                    parameter: null,
                    time: getNow(),
                    blocking: 0,
                    commit: 0,
                    timeout: timeout,
                };
                __DATASET__.result.push(result);

                let rows = [];
                let delay = timeout;
                let index = 0;
                let cols = __CONFIGS__.CURRENT_TABLE.structure.data;
                for (let i = 0; i < lines.length; i++) {
                    let row = transferData(__CONFIGS__.CURRENT_TABLE.structure, lines[i].trim().split(sep));

                    if (i == 0) {
                        let columns = [];
                        for (let c = 0; c < cols.length; c++) {
                            columns.push({id: c, name: cols[c].name, style: {textAlign: "center"}, order: ""});
                        }
                        result.columns = columns.slice();
                        let values = "%s";
                        columns = cols[0].name;
                        for (let c = 1; c < cols.length; c++) {
                            columns += "," + cols[c].name;
                            values += ",%s";
                        }
                        sql = sql.replace("{COLUMNS}", columns);
                        sql = sql.replace("{VALUES}", values);
                        result.sql = sql;
                        __LOGS__.viewMessage(sql);
                    } else {
                        if (row.length >= cols.length) {
                            rows.push(row.slice(0, cols.length));
                            result.data.push(transferDataToDatasetRow(__CONFIGS__.CURRENT_TABLE.structure, row.slice(0, cols.length), i));
                        } else {
                            result.total = MySQL.import.configs.SourceFile.total = MySQL.import.configs.SourceFile.total - 1;
                            __LOGS__.viewMessage("Line " + (i + 1) + " 数据解析后的长度小于数据库结构.\n" + JSON.stringify(row));
                        }
                        if (rows.length == linex) {
                            let packet = {
                                eventid: eventid,
                                index: index,
                                beginTime: new Date().getTime(),
                                commitTime: null,
                                lines: rows.length,
                                imported: 0,
                                endTime: null,
                                data: rows,
                            };
                            viewPacket(packet);
                            result.packets.push(packet);
                            setTimeout(insertData, delay, eventid, index);
                            delay += timeout * (1 + Math.floor(getByteLength(rows.toString()) / 10000));
                            //setTimeout(_insertData(eventid, sql,rows,i,lines.length),delay);
                            rows = [];
                            index += 1;
                        }
                    }
                    if (MySQL.import.configs.SourceFile.state == 2)
                        break;
                }
                if (rows.length > 0 && MySQL.import.configs.SourceFile.state == 1) {
                    let packet = {
                        eventid: eventid,
                        index: index,
                        beginTime: new Date().getTime(),
                        commitTime: null,
                        lines: rows.length,
                        imported: 0,
                        endTime: null,
                        data: rows
                    };
                    viewPacket(packet);
                    result.packets.push(packet);
                    setTimeout(insertData, delay, eventid, index);
                    //setTimeout(_insertData(eventid, sql,rows,i,lines.length), delay);
                }
            } catch (e) {
                UI.alert.show("警告", "function: importData;\n" + e);
            }
        },
        update: function (msg) {
            try {
                let eventid = msg["eventid"];
                MySQL.import.configs.SourceFile.count += msg["count"];
                MySQL.import.configs.SourceFile.failed += (msg["count"] - msg["imported"]);
                MySQL.import.configs.SourceFile.imported += msg["imported"];
                let message = msg["message"].decode();
                let index = Number(msg["index"]);
                let result = __DATASET__.getResult(eventid);
                if (result != null) {
                    result.count += msg["count"];
                    result.commit -= 1;
                    result.packets[index].endTime = new Date().getTime();
                    if ($(eventid + "-" + index) != null) {
                        $(eventid + "-" + index).scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                        $(eventid + "-" + index).getElementsByClassName("ui-progress-detail-item-imported")[0].innerText = result.packets[index].imported = msg["imported"];
                        if (msg["count"] > msg["imported"])
                            $(eventid + "-" + index).style.color = "brown";
                        $(eventid + "-" + index).getElementsByClassName("ui-progress-detail-item-commit")[0].innerText = (result.packets[index].endTime - result.packets[index].commitTime) + "ms";
                        if (index > 0) {
                            if ((result.packets[index].endTime - result.packets[index].commitTime) > (result.packets[index].commitTime - result.packets[index - 1].commitTime)) {
                                result.blocking += 1;
                                $(eventid + "-" + index).style.color = "SandyBrown";
                            }
                        }
                    }
                    if (result.total == result.count) {
                        viewDataset(__DATASET__.getResultIndex(eventid), 0);
                    }
                }
                __LOGS__.viewMessage(
                    "Event:" + eventid + " Packet:" + index + "\n" +
                    message.substring(0, message.length - 2) +
                    "\nImported=" + MySQL.import.configs.SourceFile.imported + "/" + MySQL.import.configs.SourceFile.count);
            } catch (e) {
                __LOGS__.viewMessage(msg["type"] + "\n" + "Error:" + e.toString() + "\n" + JSON.stringify(msg), true);
            }
        },
        progress: function () {
            let container = document.createElement("div");
            let progressBar = document.createElement("div");
            progressBar.id = "ui-progress";
            let v = document.createElement("div");
            progressBar.appendChild(v);
            v.id = "ui-progress-value";
            container.appendChild(progressBar);
            let detail = document.createElement("div");
            detail.id = "ui-progress-detail";
            container.appendChild(detail);

            MySQL.import.configs.SourceFile.progress = setInterval(function () {
                Timer()
            }, 50);

            function Timer() {
                try {
                    let value = MySQL.import.configs.SourceFile.count / MySQL.import.configs.SourceFile.total;
                    let v = $("ui-progress-value");
                    v.style.width = (value * 100) + "%";
                    v.innerText = MySQL.import.configs.SourceFile.count + " / " + MySQL.import.configs.SourceFile.total;
                    if (value == 1 || MySQL.import.configs.SourceFile.state == 2)
                        Stop(MySQL.import.configs.SourceFile.progress);
                } catch (e) {
                }
            }

            function Stop(progress) {
                clearInterval(progress);
            }

            return container;
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
                    MySQL.import.configs.SourceFile.data.push(csv);
                    sheets.options.add(new Option(sheetNames[i], i));
                    //return csv;
                }
                MySQL.import.configs.SelectedDataSet.value = sheets.selectedIndex = 0;
            };
            try {
                reader.readAsBinaryString(file);
            } catch (e) {
                reader.readAsArrayBuffer(file);
                rABS = false;
            }
        },

        dataStruct: function () {
            let sep = MySQL.import.configs.Separator.value;
            let lines = MySQL.import.configs.SourceFile.data[MySQL.import.configs.SelectedDataSet.value].split("\r\n");
            if (lines.length == 1)
                lines = MySQL.import.configs.SourceFile.data[MySQL.import.configs.SelectedDataSet.value].split("\n");

            let start = MySQL.structInspect(lines.slice(0, lines.length > 1000 ? 1000 : lines.length), sep);
            //检测样本为前1000条数据
            let columns = start.lines[0];
            let data = start.lines[1];

            let stru = [];
            for (let i = 0; i < columns.length; i++) {
                let col = {};
                for (let index in MySQL.columnStruct) {
                    switch (index) {
                        case "check":
                            col[index] = true;
                            break;
                        case "name":
                            col[index] = columns[i];
                            break;
                        case "type":
                            col[index] = data[i].getStringDataType();
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
                        case  "allowNull":
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
                        case "comment":
                            col[index] = "";
                            break;
                    }
                }
                stru.push(col);
            }
            return stru;
        },

        start: function (parent) {
            MySQL.import.configs.SourceFile.count = 0;
            MySQL.import.configs.SourceFile.total = 0;
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
            span.innerHTML = "● 导入数据 ";
            title.appendChild(span);
            let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
            close.className = "ui-container-close";
            title.appendChild(close);
            content.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            for (let name in MySQL.import.configs) {
                let item = document.createElement("div");
                item.className = "ui-container-item";
                content.appendChild(item);
                let itemname = document.createElement("span");
                itemname.className = "ui-container-item-name";
                itemname.innerHTML = MySQL.import.configs[name].name + " : ";
                item.appendChild(itemname);
                let itemvalue = null;
                if (name == "Table") {
                    itemvalue = document.createElement("input");
                    itemvalue.className = "ui-container-item-input";
                    itemvalue.id = name;
                    itemvalue.readOnly = true;
                    itemvalue.value = __CONFIGS__.CURRENT_TABLE.name;
                } else if (name == "Charset" || name == "Separator" || name == "timeout" || name == "linex" || name == "SelectedDataSet") {
                    itemvalue = document.createElement("select");
                    itemvalue.className = "ui-container-item-select";
                    itemvalue.id = name;
                    for (let i = 0; i < MySQL.import.configs[name].options.length; i++) {
                        if (isArray(MySQL.import.configs[name].options[i]))
                            itemvalue.options.add(new Option(MySQL.import.configs[name].options[i][0], MySQL.import.configs[name].options[i][1]));
                        else
                            itemvalue.options.add(new Option(MySQL.import.configs[name].options[i], i));
                    }
                    itemvalue.value = MySQL.import.configs[name].value;
                    itemvalue.onchange = function () {
                        MySQL.import.configs[this.id].value = this.value;
                    };
                } else if (name == "SourceFile") {
                    itemvalue = document.createElement("input");
                    itemvalue.id = name;
                    itemvalue.className = "ui-container-item-input";
                    itemvalue.type = MySQL.import.configs[name].type;
                    if (itemvalue.type == "file") {
                        itemvalue.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                        itemvalue.onchange = function () {
                            if (window.FileReader) {
                                try {
                                    let file = this.files[0];
                                    let filetype = file.name.split(".")[1];
                                    MySQL.import.configs.SourceFile.value = file.name;
                                    MySQL.import.configs.SourceFile.data = [];
                                    let selectDataSet = $("SelectedDataSet");
                                    for (let i = selectDataSet.length - 1; i >= 0; i--) {
                                        selectDataSet.remove(i);
                                    }
                                    if (filetype.toUpperCase() == "TXT" || filetype.toUpperCase() == "CSV") {
                                        let reader = new FileReader();
                                        reader.onload = function () {
                                            MySQL.import.configs.SourceFile.data.push(this.result);
                                            selectDataSet.options.add(new Option("默认", 0));
                                            MySQL.import.configs.SelectedDataSet.value = selectDataSet.selectedIndex = 0;
                                        };
                                        reader.readAsText(file, MySQL.import.configs.Charset.options[MySQL.import.configs.Charset.value]);
                                    } else if (filetype.toUpperCase() == "XLS" || filetype.toUpperCase() == "XLSX") {
                                        MySQL.import.readExcelFile(file, selectDataSet);
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
                if (__CONFIGS__.CURRENT_TABLE.name == "" || __CONFIGS__.CURRENT_TABLE.type == "VIEW") {
                    UI.confirm.show("注意", "您没有选择数据表，是否要创建一个名称为 " + MySQL.import.configs.SourceFile.value.split(".")[0] + " 的新表?", "auto", function () {
                        let title = MySQL.import.configs.SourceFile.value.split(".")[0];
                        MySQL.createTable("auto", {"title": title, "stru": MySQL.import.dataStruct()}, function(values) {
                            try {
                                let eventid = getEventIndex();
                                let result = {
                                    eventid: eventid,
                                    title: [values.title],
                                    columns: [],
                                    data: [],
                                    total: 0,
                                    sql: values.sql,
                                    type: "text/x-mysql",
                                    time: getNow()
                                };
                                __DATASET__.result.push(result);
                                let msgs = {
                                    type: messageType.createTable,
                                    eventid: eventid,
                                    message: values.sql.encode(),
                                };
                                __CONFIGS__.CURRENT_DATABASE.service.send(JSON.stringify(msgs))
                            } catch (e) {
                                __LOGS__.viewError("auto", e);
                            }
                        });
                        parent.removeChild($("ui_importData"));
                    });
                } else {
                    $("ui-progress-container").appendChild(MySQL.import.progress());
                    if ($("SelectedDataSet").length > 0)
                        MySQL.import.run();
                    else
                        UI.alert.show("提示", "请选择需要导入的文件及数据集合.");
                }
            };
            tool.appendChild(b);
            b = document.createElement("button");
            b.className = "button";
            b.innerHTML = "中止";
            b.onclick = close.onclick = function () {
                MySQL.import.configs.SourceFile.state = 2;
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
        }
    },
    structInspect: function (data, sep) {
        // 数据结构检测
        // 获取可导入数据
        // 即数据分割后相同宽度最多的行
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
        let auto_increment = false;
        for (let i = 0; i < stru.length; i++) {
            if (stru[i].check == true && stru[i].name != "") {
                cols += stru[i].name + " " + stru[i].type;
                if (stru[i].type == "decimal" || stru[i].type == "float") {
                    cols += "(" + stru[i].length + "," + stru[i].scale + ")";
                }
                if (stru[i].type == "nvarchar" || stru[i].type == "varchar") {
                    cols += "(" + stru[i].length + ")";
                }
                if (stru[i].allowNull == "N" || stru[i].index == true) {
                    //选择不能为NULL或者是索引字段
                    cols += " NOT NULL";
                } else
                    cols += " DEFAULT NULL";
                if (stru[i].auto_increment == true && stru[i].type == "int" && stru[i].index == true && auto_increment == false) {
                    // 类型:int;必须是索引;第一个自增选择;
                    cols += " AUTO_INCREMENT";
                    auto_increment == true;
                }
                if (stru[i].column_default != null && (stru[i].allowNull == "N" || stru[i].index == true)) {
                    //输入不能为NULL且(不允许为NULL或是索引字段)
                    cols += " DEFAULT '" + stru[i].column_default + "'"
                }
                if (stru[i].comment != "") {
                    cols += " COMMENT '" + stru[i].comment + "',"
                } else {
                    cols += ","
                }
                if (stru[i].index == true) {
                    key += stru[i].name + ","
                }
            }
        }
        let sql = "CREATE TABLE " + title + cols.substring(0, cols.length - 1);
        if (key != "") {
            sql += ",PRIMARY KEY (" + key.substring(0, key.lastIndexOf(",")) + ")) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        } else {
            sql += ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        }
        return sql;
    },
};
