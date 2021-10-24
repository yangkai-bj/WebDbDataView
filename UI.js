var UI = {
    alert: {
        title: null,
        message: null,
        show: function (title, message, parent) {
            this.title = title;
            this.message = message;
            let container = document.createElement("div");
            container.id = container.className = "ui_alert";
            container.style.cssText = "position:fixed;left:0px;top:0px;width:100%;height:100%;background：rgba(0,0,0,0.5);z-index:9999";
            if (parent == "auto" || parent == null || typeof parent == "undefined") {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.style.cssText = "margin: 0;position: absolute;top: 50%;left: 50%;" +
                "-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);" +
                "width:400px;background-color:white;" +
                "border: 2px solid var(--main-border-color);border-radius: 5px;padding:10px";
            container.appendChild(content);
            let t = document.createElement("div");
            t.style.cssText = "color: var(--toolbar-color);" +
                "background-color: var(--toolbar-background-color);" +
                "cursor: pointer;" +
                "border-bottom: 1px solid var(--main-border-color);" +
                "border-radius: 10px;";
            let span = document.createElement("span");
            span.innerHTML = this.title;
            span.style.cssText = "padding:10px;";
            t.appendChild(span);
            content.appendChild(t);
            let br = document.createElement("hr");
            br.style.cssText = "height:1px;" +
                "border-width:0;" +
                "color:gray;" +
                "background-color:#00A7AA;" +
                "width: 100%;";
            content.appendChild(br);
            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES__.logo_mysql.image;
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
                "white-space: auto;"+
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "color: var(--main-title-color);" +
                "line-height: 1.1;" +
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

            br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);

            let tools = document.createElement("div");
            tools.style.width = "90%";
            content.appendChild(tools);
            let button = document.createElement("button");
            button.innerText = "确定";
            button.style.cssFloat = "right";
            button.onclick = function () {
                parent.removeChild($("ui_alert"));
            };
            tools.appendChild(button);
        },
    },
    confirm:{
        title: null,
        message: null,
        show: function (title, message, parent, callback, args) {
            //callback:回调函数,
            //args:回调函数参数,根据实际需要可以不传递\可以是单一参数\可以是数组\可以是对象.
            this.title = title;
            this.message = message;
            let container = document.createElement("div");
            container.id = container.className = "ui_confirm";
            container.style.cssText = "position:fixed;left:0px;top:0px;width:100%;height:100%;background：rgba(0,0,0,0.5);z-index:9999";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.style.cssText = "margin: 0;position: absolute;top: 50%;left: 50%;" +
                "-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);" +
                "width:400px;background-color:white;opacity:1.5;" +
                "border: 2px solid var(--main-border-color);border-radius: 5px;padding:10px";
            container.appendChild(content);
            let t = document.createElement("div");
            t.style.cssText = "color: var(--toolbar-color);" +
                "background-color: var(--toolbar-background-color);" +
                "cursor: pointer;" +
                "border-bottom: 1px solid var(--main-border-color);" +
                "border-radius: 10px;";
            let span = document.createElement("span");
            span.innerHTML = this.title;
            span.style.cssText = "padding:10px;";
            t.appendChild(span);
            content.appendChild(t);
            let br = document.createElement("hr");
            br.style.cssText = "height:1px;" +
                "border-width:0;" +
                "color:gray;" +
                "background-color:#00A7AA;" +
                "width: 100%;";
            content.appendChild(br);
            let item = document.createElement("div");
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES__.logo_mysql.image;
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
                "white-space: auto;"+
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "color: var(--main-title-color);" +
                "line-height: 1.1;" +
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

            br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);

            let tools = document.createElement("div");
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                parent.removeChild($("ui_confirm"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
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
        },
    },
    prompt: {
        title: null,
        items: {},
        show: function (title, items, parent, callback, args) {
            //items:{item:default,...}
            //return: items:{item:value,item:value,....}
            this.title = title;
            this.items = items;
            let container = document.createElement("div");
            container.id = container.className = "ui_prompt";
            container.style.cssText = "position:fixed;left:0px;top:0px;width:100%;height:100%;background：rgba(0,0,0,0.5);z-index:9999";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.style.cssText = "margin: 0;position: absolute;top: 50%;left: 50%;" +
                "-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);" +
                "width:400px;background-color:white;" +
                "border: 2px solid var(--main-border-color);border-radius: 5px;padding:10px";
            container.appendChild(content);
            let t = document.createElement("div");
            t.style.cssText = "color: var(--toolbar-color);" +
                "background-color: var(--toolbar-background-color);" +
                "cursor: pointer;" +
                "border-bottom: 1px solid var(--main-border-color);" +
                "border-radius: 10px;";
            let span = document.createElement("span");
            span.innerHTML = this.title;
            span.style.cssText = "padding:10px;";
            t.appendChild(span);
            content.appendChild(t);
            let br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);
            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            for (let key in this.items) {
                let it = items[key];
                let item = document.createElement("div");
                item.style.cssText = "width:100%;" +
                    "min-height: 23px;" +
                    "vertical-align: middle;";
                span = document.createElement("span");
                span.style.cssText = "width:20%;" +
                    "text-align: left;float: left;" +
                    "overflow: hidden;" +
                    "white-space: nowrap;" +
                    "word-break: keep-all;" +
                    "text-overflow: ellipsis;" +
                    "-o-text-overflow: ellipsis;" +
                    "font-size: 100%;" +
                    "height:100%;" +
                    "background-color: transparent;" +
                    "color: var(--main-title-color);" +
                    "cursor: pointer;";
                span.title = key;
                span.innerText = key + " : ";
                item.appendChild(span);
                let input = document.createElement("input");
                input.className = "ui_prompt_value";
                input.id = "ui_prompt_value_" + key;
                input.style.cssText = "width:80%;" +
                    "height:100%;" +
                    "float: right;" +
                    "font-size: 100%;" +
                    "padding: 0px;" +
                    "margin: 0px;" +
                    "background-color: transparent;" +
                    "color: var(--toolbar-background-color);" +
                    "outline-style: none;" +
                    "border:0px;" +
                    "border-bottom:1px solid var(--main-border-color);";
                input.value = it;
                item.appendChild(input);
                itemcontent.appendChild(item);
            }
            br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);

            let tools = document.createElement("div");
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                parent.removeChild($("ui_prompt"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
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
        },
    },
    choise: {
        title: null,
        items: {},
        show: function (title, items, type, parent, callback, args) {
            //type: radio;checkbox
            //items: {title:{value:value,checked:true},title:{value:value,checked:false}...}
            //return: items
            this.title = title;
            this.items = items;
            let container = document.createElement("div");
            container.id = container.className = "ui_choise";
            container.style.cssText = "position:fixed;left:0px;top:0px;width:100%;height:100%;background：rgba(0,0,0,0.5);z-index:9999";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.style.cssText = "margin: 0;position: absolute;top: 50%;left: 50%;" +
                "-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);" +
                "width:400px;background-color:white;" +
                "border: 2px solid var(--main-border-color);border-radius: 5px;padding:10px";
            container.appendChild(content);
            let t = document.createElement("div");
            t.style.cssText = "color: var(--toolbar-color);" +
                "background-color: var(--toolbar-background-color);" +
                "cursor: pointer;" +
                "border-bottom: 1px solid var(--main-border-color);" +
                "border-radius: 10px;";
            let span = document.createElement("span");
            span.innerHTML = this.title;
            span.style.cssText = "padding:10px;";
            t.appendChild(span);
            content.appendChild(t);
            let br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);
            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            for (let key in this.items) {
                let it = items[key];
                let item = document.createElement("div");
                item.style.cssText = "width:100%;" +
                    "min-height: 23px;" +
                    "vertical-align: middle;";
                let input = document.createElement("input");
                input.className = "ui_choise_value";
                input.type = type;
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

                span = document.createElement("span");
                span.style.cssText = "text-align: left;" +
                    "font-size: 100%;" +
                    "height:100%;" +
                    "background-color: transparent;" +
                    "color: var(--main-title-color);" +
                    "cursor: pointer;";
                span.title = span.innerText = key;
                item.appendChild(span);

                itemcontent.appendChild(item);
            }
            br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);

            let tools = document.createElement("div");
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                parent.removeChild($("ui_choise"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
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
        },
    },
    password: {
        title: null,
        items: {},
        show: function (title, items, parent, callback, args) {
            //items:{item:null,...}
            //return: items:{item:password,item:password,....}
            this.title = title;
            this.items = items;
            let container = document.createElement("div");
            container.id = container.className = "ui_password";
            container.style.cssText = "position:fixed;left:0px;top:0px;width:100%;height:100%;background：rgba(0,0,0,0.5);z-index:9999";
            if (parent == "auto" || parent == null) {
                if (document.fullscreen && typeof __CONFIGS__.fullScreen.element == "object") {
                    parent = __CONFIGS__.fullScreen.element;
                } else {
                    parent = document.body;
                }
            }
            parent.appendChild(container);
            let content = document.createElement("div");
            content.style.cssText = "margin: 0;position: absolute;top: 50%;left: 50%;" +
                "-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);" +
                "width:400px;background-color:white;" +
                "border: 2px solid var(--main-border-color);border-radius: 5px;padding:10px";
            container.appendChild(content);
            let t = document.createElement("div");
            t.style.cssText = "color: var(--toolbar-color);" +
                "background-color: var(--toolbar-background-color);" +
                "cursor: pointer;" +
                "border-bottom: 1px solid var(--main-border-color);" +
                "border-radius: 10px;";
            let span = document.createElement("span");
            span.innerHTML = this.title;
            span.style.cssText = "padding:10px;";
            t.appendChild(span);
            content.appendChild(t);
            let br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);
            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            for (let key in this.items) {
                let placeholder = items[key];
                let item = document.createElement("div");
                item.style.cssText = "width:100%;" +
                    "min-height: 23px;" +
                    "vertical-align: middle;";
                span = document.createElement("span");
                span.style.cssText = "width:20%;" +
                    "text-align: left;float: left;" +
                    "overflow: hidden;" +
                    "white-space: nowrap;" +
                    "word-break: keep-all;" +
                    "text-overflow: ellipsis;" +
                    "-o-text-overflow: ellipsis;" +
                    "font-size: 100%;" +
                    "height:100%;" +
                    "background-color: transparent;" +
                    "color: var(--main-title-color);" +
                    "cursor: pointer;";
                span.title = key;
                span.innerText = key + " : ";
                item.appendChild(span);
                let input = document.createElement("input");
                input.type = "password";
                input.className = "ui_password_value";
                input.id = "ui_password_value_" + key;
                input.style.cssText = "width:80%;" +
                    "height:100%;" +
                    "float: right;" +
                    "font-size: 100%;" +
                    "padding: 0px;" +
                    "margin: 0px;" +
                    "background-color: transparent;" +
                    "color: var(--toolbar-background-color);" +
                    "outline-style: none;" +
                    "border:0px;" +
                    "border-bottom:1px solid var(--main-border-color);";
                input.placeholder = placeholder;
                item.appendChild(input);
                itemcontent.appendChild(item);
            }
            br = document.createElement("hr");
            br.style.cssText = "height:1px;\n" +
                "border-width:0;\n" +
                "color:gray;\n" +
                "background-color:#00A7AA;\n" +
                "width: 100%;";
            content.appendChild(br);

            let tools = document.createElement("div");
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = function () {
                parent.removeChild($("ui_password"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
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
        },
    },
};