/*
通用模块
*/
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
    gridsChoice: function(index, value, callback, color) {
        let data = {
            "自动": "auto",
            "R(1 + 2)": "[[5,10,85,40],[5,55,40,40],[50,55,40,40]]",
            "R(1 + 3)": "[[5,10,90,40],[5,55,26.67,40],[36.66,55,26.66,40],[68.33,55,26.67,40]]",
            "R(2 + 1)": "[[5,10,40,40],[50,10,40,40],[5,55,85,40]]",
            "R(2 + 3)": "[[5,10,42.5,40],[52.5,10,42.5,40],[5,55,26.67,40],[36.67,55,26.66,40],[68.33,55,26.67,40]]",
            "R(3 + 1)": "[[5,10,26.67,40],[36.67,10,26.67,40],[68.33,10,26.67,40],[5,55,90,40]]",
            "R(3 + 2)": "[[5,10,26.67,40],[36.67,10,26.67,40],[68.33,10,26.67,40],[5,55,42.5,40],[52.5,55,42.5,40]]",
            "C(1 + 2)": "[[5,10,40,80],[50,10,40,37.5],[50,52.5,40,37.5]]",
            "C(1 + 3)": "[[5,10,40,80],[50,10,40,23.33],[50,38.33,40,23.33],[50,66.34,40,23.34]]",
            "C(2 + 3)": "[[5,10,40,37.5],[5,52.5,40,37.5],[50,10,40,23.33],[50,38.33,40,23.33],[50,66.34,40,23.34]]",
            "C(2 + 1)": "[[5,10,40,37.5],[5,52.5,40,37.5],[50,10,40,80]]",
            "C(3 + 1)": "[[5,10,40,23.33],[5,38.33,40,23.33],[5,66.34,40,23.34],[50,10,40,80]]",
            "C(3 + 2)": "[[5,10,40,23.33],[5,38.33,40,23.33],[5,66.34,40,23.34],[50,10,40,37.5],[50,52.5,40,37.5]]",
            "C(1/1 + 2/1)": "[[5,10,40,40],[50,10,40,55],[5,55,40,40],[50,70,40,25]]",
            "C(1/2 + 1/2)": "[[5,10,40,25],[50,10,40,25],[5,40,40,50],[50,40,40,50]]",
            "C(1/2 + 2/1)": "[[5,10,40,25],[50,10,40,50],[5,40,40,50],[50,65,40,25]]",
            "C(2/1 + 1/1)": "[[5,10,40,55],[50,10,40,40],[5,70,40,25],[50,55,40,40]]",
            "C(2/1 + 2/1)": "[[5,10,40,50],[50,10,40,50],[5,65,40,25],[50,65,40,25]]",
            "C(2/1 + 1/2)": "[[5,10,40,50],[50,10,40,25],[5,65,40,25],[50,40,40,50]]",
            "C(2/1/1 + 2/1/1)": "[[5,10,40,35],[50,10,40,35],[5,50,40,17.5],[50,50,40,17.5],[5,72.5,40,17.5],[50,72.5,40,17.5]]",
            "C(1/1/2 + 1/1/2)": "[[5,10,40,17.5],[50,10,40,17.5],[5,32.5,40,17.5],[50,32.5,40,17.5],[5,55,40,35],[50,55,40,35]]",
        };

        function getGrid(parent, index, value, callback) {
            function showGrid(content, grid) {
                content.innerHTML = "";
                if (grid.length == 1 && grid[0] === "auto") {
                    content.innerHTML = "<span style = 'max-width: 100%; cursor: pointer;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size: 4px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: red;'>auto</span>";
                } else {
                    for (let i = 0; i < grid.length; i++) {
                        let g = document.createElement("div");
                        g.style.position = "absolute";
                        g.style.border = "1px dotted red";
                        g.style.textAlign = "center";
                        if (grid[i].length == 4) {
                            g.style.left = grid[i][0] + "%";
                            g.style.top = grid[i][1] + "%";
                            g.style.width = grid[i][2] + "%";
                            g.style.height = grid[i][3] + "%";
                            g.innerHTML = "<span style = 'max-width: 100%; cursor: pointer;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size: 4px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'>" + grid[i].join("%,") + "%</span>";
                        } else {
                            g.style.border = "0px dotted red";
                            g.style.left = "0%";
                            g.style.top = "0%";
                            g.style.width = "100%";
                            g.style.height = "100%";
                            g.style.backgroundColor = "rgba(0,0,0,0.4)";
                            g.style.zIndex = grid.length + 1;
                            g.innerHTML = "<span style = ';max-width: 100%; cursor: pointer;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size: 4px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: red;'>[" + grid[i].join("%,") + "%]<br>框架定义错误<br>[left,top,width,height]</span>";
                        }
                        content.appendChild(g);
                    }
                }
            }

            let container = document.createElement("div");
            container.id = "ui_grids_choice";
            container.className = "ui-container-background";
            if (parent == "auto") {
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
            title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

            let span = document.createElement("span");
            span.innerHTML = "选择布局";
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
            let list = document.createElement("select");
            list.style.width = "100%";
            for (let key in data) {
                list.add(new Option(key, data[key]));
            }
            list.value = value;
            list.onchange = function () {
                showGrid($("grids-content-" + index), this.value.toArray([], ",").wash());
            };
            item.appendChild(list);
            content.appendChild(item);

            item = document.createElement("div");
            item.className = "ui-container-item";
            let gds = document.createElement("div");
            gds.id = "grids-content-" + index;
            gds.style.position = "relative";
            gds.style.width = "100%";
            gds.style.height = "150px";
            gds.style.marginTop = "5px";
            gds.style.padding = "0px";
            gds.style.border = "1px dotted gray";
            item.appendChild(gds);
            content.appendChild(item);
            showGrid(gds, value.toArray([], ",").wash());

            hr = document.createElement("hr");
            hr.className = "ui-container-hr";
            content.appendChild(hr);

            let tools = document.createElement("div");
            tools.className = "groupbar";
            tools.style.width = "90%";
            content.appendChild(tools);

            let button = document.createElement("button");
            button.className = "button";
            button.id = "ui-ui_grids_choice-no";
            button.innerText = "取消";
            button.style.cssText = "float: right;margin-left:10px";
            button.onclick = close.onclick = function () {
                parent.removeChild($("ui_grids_choice"));
            };
            tools.appendChild(button);

            button = document.createElement("button");
            button.className = "button";
            button.id = "ui-ui_grids_choice-ok";
            button.innerText = "确定";
            button.style.cssFloat = "right";
            button.onclick = function () {
                if (typeof callback === "function") {
                    callback(list.value);
                }
                parent.removeChild($("ui_grids_choice"));
            };
            tools.appendChild(button);

            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
            $("ui-ui_grids_choice-ok").focus();
        }

        let container = document.createElement("div");
        container.className = "ui-container-item";
        container.setAttribute("value", value);
        let choice = __SYS_IMAGES_SVG__.getImage("grids", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px", __THEMES__.get().hover);
        container.appendChild(choice);
        choice.style.cssFloat = "left";
        choice.title = "选择";
        choice.onclick = function () {
            getGrid("auto", index, $("choice-grid-list-" + index).value, function (value) {
                $("choice-grid-list-" + index).value = value;
                container.setAttribute("value", value);
                if (typeof callback === "function") {
                    callback(value);
                }
            });
        };

        let list = document.createElement("select");
        list.id = "choice-grid-list-" + index;
        list.style.cssFloat = "right";
        list.style.width = "90%";
        list.style.textAlign = "left";
        list.style.borderWidth = "0px";
        for (let key in data) {
            list.add(new Option(key, data[key]));
        }
        list.value = value;
        list.onchange = function () {
            container.setAttribute("value", this.value);
            if (typeof callback === "function") {
                callback(this.value);
            }
        };
        container.appendChild(list);

        return container;
    },

    echartsChoice: function(values, callback, color) {
        try {
            values = values.split(",");
        } catch (e) {
            values = [];
        }

        let items = {
            "线形图": {value: "line", checked: false},
            "柱状图": {value: "bar", checked: false},
            "象形柱": {value: "pictorialBar", checked: false},
            "条形图": {value: "tranbar", checked: false},
            "散点图": {value: "scatter", checked: false},
            "面积图": {value: "area", checked: false},
            "饼图": {value: "pie", checked: false},
            "日历图": {value: "calendar", checked: false},
            "漏斗图": {value: "funnel", checked: false},
            "词云图": {value: "wordCloud", checked: false}
        };
        let container = document.createElement("div");
        container.setAttribute("value", values.join(","));
        let add = __SYS_IMAGES_SVG__.getImage("add", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px", __THEMES__.get().hover);
        container.appendChild(add);
        add.style.cssFloat = "left";
        add.style.width = "16px";
        add.title = "增加";
        add.onclick = function () {
            if (event.target == this) {
                UI.choise.show("请选择图形",
                    items,
                    "radio",
                    "auto",
                    function (args, items) {
                        for (let key in items) {
                            if (items[key].checked)
                                args.values.splice(args.index + 1, 0, items[key].value);
                        }
                        container.setAttribute("value", args.values);
                        $("echarts_choise_list").innerHTML = "";
                        for (let i = 0; i < args.values.length; i++) {
                            for (let key in items) {
                                if (args.values[i] == items[key].value)
                                    $("echarts_choise_list").options.add(new Option(key, args.values[i]));
                            }
                        }
                        $("echarts_choise_list").selectedIndex = args.index + 1;
                        if (typeof callback !== "undefined")
                            callback(args.values.wash().join(","));
                    },
                    {
                        values: values,
                        index: $("echarts_choise_list").selectedIndex
                    }
                );
            }
        };
        let toup = __SYS_IMAGES_SVG__.getImage("toup", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px", __THEMES__.get().hover);
        container.appendChild(toup);
        toup.style.cssFloat = "left";
        toup.style.width = "16px";
        toup.title = "上移";
        toup.onclick = function () {
            let index = $("echarts_choise_list").selectedIndex;
            let tmp;
            if (index > 0) {
                tmp = values[index - 1];
                values[index - 1] = values[index];
                values[index] = tmp;

                $("echarts_choise_list").innerHTML = "";
                for (let i = 0; i < values.length; i++) {
                    for (let key in items) {
                        if (values[i] == items[key].value)
                            $("echarts_choise_list").options.add(new Option(key, values[i]));
                    }
                }

                $("echarts_choise_list").selectedIndex = index - 1;
                if (typeof callback !== "undefined")
                    callback(values.wash().join(","));
            }
        };
        let todown = __SYS_IMAGES_SVG__.getImage("todown", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px", __THEMES__.get().hover);
        container.appendChild(todown);
        todown.style.cssFloat = "left";
        todown.style.width = "16px";
        todown.title = "下移";
        todown.onclick = function () {
            let index = $("echarts_choise_list").selectedIndex;
            let tmp;
            if (index < values.length - 1) {
                tmp = values[index + 1];
                values[index + 1] = values[index];
                values[index] = tmp;

                $("echarts_choise_list").innerHTML = "";
                for (let i = 0; i < values.length; i++) {
                    for (let key in items) {
                        if (values[i] == items[key].value)
                            $("echarts_choise_list").options.add(new Option(key, values[i]));
                    }
                }
                $("echarts_choise_list").size = values.length;
                $("echarts_choise_list").selectedIndex = index + 1;
                if (typeof callback !== "undefined")
                    callback(values.wash().join(","));
            }
        };

        let remove = __SYS_IMAGES_SVG__.getImage("subtract", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px", __THEMES__.get().hover);
        container.appendChild(remove);
        remove.style.cssFloat = "left";
        remove.style.width = "16px";
        remove.title = "删除";
        remove.onclick = function () {
            let index = $("echarts_choise_list").selectedIndex;
            let tmp = [];
            for (let i = 0; i < values.length; i++) {
                if (i !== index)
                    tmp.push(values[i]);
            }
            values = tmp;
            container.setAttribute("value", values.join(","));
            $("echarts_choise_list").innerHTML = "";
            for (let i = 0; i < values.length; i++) {
                for (let key in items) {
                    if (values[i] == items[key].value)
                        $("echarts_choise_list").options.add(new Option(key, values[i]));
                }
            }
            $("echarts_choise_list").selectedIndex = (index == 0 ? 0 : index - 1);
            if (typeof callback !== "undefined")
                callback(values.wash().join(","));
        };
        let list = document.createElement("select");
        list.id = "echarts_choise_list";
        for (let i = 0; i < values.length; i++) {
            for (let key in items) {
                if (values[i] == items[key].value)
                    list.options.add(new Option(key, values[i]));
            }
        }
        container.appendChild(list);
        list.style.cssFloat = "right";
        list.style.borderWidth = "0px";
        list.style.minWidth = "70%";

        container.onmouseenter = function(){
            $("echarts_choise_list").size = values.length;
        };
        container.onmouseleave = function(){
            $("echarts_choise_list").size = 1;
        };

        return container;
    },

    MinMaxChoice: function(min, max, unit, range, callback) {
        let rmin, rmax;
        try {
            range = range.replace(new RegExp(unit, "g"), "").toArray([min, max], ",");
        } catch (e) {
            range = [min, max];
        }

        function getString(range, unit) {
            return range.reduce(function (tmp, item) {
                tmp.push(item + unit);
                return tmp;
            }, []).join(",");
        }

        let container = document.createElement("div");
        container.className = "ui-container-item-ranges";
        container.setAttribute("value", getString(range, unit));
        rmin = document.createElement("input");
        rmin.type = "range";
        container.appendChild(rmin);
        rmin.style.cssFloat = "left";
        rmin.style.width = "45%";
        rmin.style.borderWidth = "0px";
        rmin.style.borderRadius = "10px";
        rmin.style.borderLeft = rmin.style.borderRight = "1px solid gray";
        rmin.min = min;
        rmin.max = range[1];
        rmin.value = range[0];
        rmin.title = (range[0] + unit);
        rmin.onchange = function () {
            rmax.min = range[0] = this.value;
            this.title = (this.value + unit);
            container.setAttribute("value", getString(range, unit));
            if (rmax.value < this.value) {
                rmax.value = range[1] = this.value;
                rmax.title = (this.value + unit);
            }
            if (typeof callback !== "undefined")
                callback(getString(range, unit));
        };
        rmax = document.createElement("input");
        rmax.type = "range";
        container.appendChild(rmax);
        rmax.style.cssFloat = "right";
        rmax.style.width = "45%";
        rmax.style.borderWidth = "0px";
        rmax.style.borderRadius = "10px";
        rmax.style.borderLeft = rmax.style.borderRight = "1px solid gray";
        rmax.min = range[0];
        rmax.max = max;
        rmax.value = range[1];
        rmax.title = (range[1] + unit);
        rmax.onchange = function () {
            rmin.max = range[1] = this.value;
            this.title = (this.value + unit);
            container.setAttribute("value", getString(range, unit));
            if (rmin.value > this.value) {
                rmin.value = range[0] = this.value;
                rmin.title = (this.value + unit);
            }
            if (typeof callback !== "undefined")
                callback(getString(range, unit));
        };
        return container;
    },

    rangesChoice: function(min, max, unit, range, callback) {
        let rmin, rmax;
        try {
            range = range.replace(new RegExp(unit, "g"), "").toArray([min, max], ",");
        } catch (e) {
            range = [min, max];
        }

        function getString(range, unit) {
            return range.reduce(function (tmp, item) {
                tmp.push(item + unit);
                return tmp;
            }, []).join(",");
        }

        let container = document.createElement("div");
        container.className = "ui-container-item-ranges";
        container.setAttribute("value", getString(range, unit));
        rmin = document.createElement("input");
        rmin.type = "range";
        container.appendChild(rmin);
        rmin.style.cssFloat = "left";
        rmin.style.width = "45%";
        rmin.style.borderWidth = "0px";
        rmin.style.borderRadius = "10px";
        rmin.style.borderLeft = rmin.style.borderRight = "1px solid gray";
        rmin.min = min;
        rmin.max = max;
        rmin.value = range[0];
        rmin.title = (range[0] + unit);
        rmin.onchange = function () {
            range[0] = this.value;
            this.title = (this.value + unit);
            container.setAttribute("value", getString(range, unit));
            if (typeof callback !== "undefined")
                callback(getString(range, unit));
        };
        rmax = document.createElement("input");
        rmax.type = "range";
        container.appendChild(rmax);
        rmax.style.cssFloat = "right";
        rmax.style.width = "45%";
        rmax.style.borderWidth = "0px";
        rmax.style.borderRadius = "10px";
        rmax.style.borderLeft = rmax.style.borderRight = "1px solid gray";
        rmax.min = min;
        rmax.max = max;
        rmax.value = range[1];
        rmax.title = (range[1] + unit);
        rmax.onchange = function () {
            range[1] = this.value;
            this.title = (this.value + unit);
            container.setAttribute("value", getString(range, unit));
            if (typeof callback !== "undefined")
                callback(getString(range, unit));
        };
        return container;
    },

    booleanChoice: function(value, callback, color) {
        let container = document.createElement("div");
        container.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(value ? "booleanTrue" : "booleanFalse", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px");
        container.style.backgroundRepeat = "no-repeat";
        container.style.backgroundPosition = "left bottom";
        container.style.backgroundSize = "16px 16px";
        container.setAttribute("value", value ? "true" : "false");
        container.onclick = function () {
            if (event.target == this) {
                value = (value ? false : true);
                container.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(value ? "booleanTrue" : "booleanFalse", (typeof color === 'undefined' ? __THEMES__.get().color : color), "16px", "16px");
                container.setAttribute("value", value ? "true" : "false");
                if (typeof callback !== "undefined")
                    callback(value);
            }
        };
        return container;
    },

    colorChoice: function(id, value, callback, color) {
        let container = document.createElement("div");
        container.setAttribute("value", value);
        let choise = __SYS_IMAGES_SVG__.getImage("opencolor", (typeof color === 'undefined' ? __THEMES__.get().color : color), "18px", "18px", __THEMES__.get().hover);
        choise.style.cssFloat = "left";
        choise.onclick = function () {
            $("colorChoice-" + id).click();
        };
        container.appendChild(choise);

        let colors = document.createElement("input");
        colors.type = "color";
        colors.id = "colorChoice-" + id;
        colors.style.cssFloat = "left";
        colors.style.visibility = "hidden";
        colors.style.width = "0px";
        colors.style.height = "0px";
        colors.value = sRGBitem(value).hex;
        colors.onchange = function () {
            let color = colorTosRGB(this.value, $("colorChoice-opacity-" + id).value);
            container.setAttribute("value", color);
            $("colorChoice-span-color-" + id).style.backgroundColor = $("colorChoice-span-color-" + id).innerText = this.value;
            $("colorChoice-opacity-" + id).style.backgroundColor = color;
            if (typeof callback !== "undefined")
                callback(color);
        };
        container.appendChild(colors);

        let span = document.createElement("span");
        span.id = "colorChoice-span-color-" + id;
        span.style.width = "60%";
        span.style.height = "18px";
        span.style.cssFloat = "left";
        span.title = "HEX";
        span.style.color = (typeof color === 'undefined' ? __THEMES__.get().color : color);
        span.style.backgroundColor = span.innerText = sRGBitem(value).hex;
        span.style.textAlign = "center";
        span.style.outlineStyle = "none";
        span.style.overflow = "hidden";
        span.style.textShadow = "-1px 1px 0 gray, 1px 1px 0 gray";
        span.style.borderRadius = "10px";
        span.style.borderLeft = span.style.borderRight = "1px solid gray";
        container.appendChild(span);

        let opacity = document.createElement("input");
        opacity.id = "colorChoice-opacity-" + id;
        opacity.type = "number";
        container.appendChild(opacity);
        opacity.style.cssFloat = "left";
        opacity.style.width = "18%";
        opacity.style.borderWidth = "0px";
        opacity.style.borderRadius = "10px";
        opacity.style.textAlign = "center";
        opacity.style.textShadow = "-1px 1px 0 gray, 1px 1px 0 gray";
        opacity.style.backgroundColor = value;
        opacity.style.borderLeft = opacity.style.borderRight = "1px solid gray";
        opacity.min = 0;
        opacity.max = 1;
        opacity.step = 0.1;
        opacity.value = sRGBitem(value).opacity;
        opacity.title = "Opacity";
        opacity.onkeypress = function () {
            return false;
        };
        opacity.onchange = function () {
            let color = colorTosRGB($("colorChoice-" + id).value, this.value);
            container.setAttribute("value", color);
            this.style.backgroundColor = color;
            if (typeof callback !== "undefined")
                callback(color);
        };

        let restore = __SYS_IMAGES_SVG__.getImage("restore", (typeof color === 'undefined' ? __THEMES__.get().color : color), "18px", "18px", __THEMES__.get().hover);
        restore.style.cssFloat = "right";
        restore.onclick = function () {
            container.setAttribute("value", "transparent");
            $("colorChoice-span-color-" + id).style.backgroundColor = $("colorChoice-span-color-" + id).innerText = $("colorChoice-" + id).value = "transparent";
            $("colorChoice-opacity-" + id).style.backgroundColor = "transparent";
            if (typeof callback !== "undefined")
                callback("transparent");
        };
        container.appendChild(restore);
        return container;
    },

    fileChoice: function(id, width, cssfloat, accept, multiple, callback, color) {
        let container = document.createElement("div");
        container.style.width = width;
        container.className = "ui-container-item-files";

        let choise = __SYS_IMAGES_SVG__.getImage("openfile", (typeof color === 'undefined' ? __THEMES__.get().color : color), "18px", "18px", __THEMES__.get().hover);
        choise.style.cssFloat = "left";
        choise.onclick = function () {
            $(id).click();
        };
        container.appendChild(choise);
        let files = document.createElement("input");
        files.type = "file";
        files.id = id;
        files.style.display = "none";
        files.accept = accept;
        if (multiple)
            files.multiple = "multiple";
        files.onchange = function () {
            $(files.id + "-list").innerText = "";
            for (let i = 0; i < this.files.length; i++) {
                $(this.id + "-list").options.add(new Option(this.files[i].name));
            }
            if (typeof callback !== "undefined")
                callback(this.files);
        };
        container.appendChild(files);

        let list = document.createElement("select");
        list.id = id + "-list";
        list.type = "select";
        list.style.cssText = "display:inline-block;" +
            "overflow: hidden;" +
            "text-overflow: ellipsis;" +
            "white-space: nowrap;";
        list.style.cssFloat = "right";
        list.style.borderWidth = "0px";
        list.style.width = "90%";
        container.appendChild(list);
        return container;
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = message;
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "二维码";
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
        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
        setTimeout(function () {
            let img = $("qrcode-image").getElementsByTagName("img")[0];
            $("ui_qrcode_code").value = img.src;
            if (typeof callback !== "undefined") {
                callback($("ui_qrcode_code").value);
            }
        }, 1000);
    },

    tooltip: function(dom, text, args) {
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
                if (typeof args === "undefined") {
                    tip.style.width = "100px";
                    tip.style.height = "40px";
                    if ((posi.top - 52) < 0)
                        tip.style.top = (posi.top + posi.height) + "px";
                    else
                        tip.style.top = (posi.top - 52) + "px";
                    if ((posi.left + 100) < parentposi.width)
                        tip.style.left = (posi.left + posi.width) + "px";
                    else
                        tip.style.left = (posi.left - 100) + "px";
                } else {
                    tip.style.width = args.width + "px";
                    tip.style.height = args.height + "px";
                    if (args.position == "bottom") {
                        tip.style.top = (posi.top + posi.height) + "px";
                    } else {
                        tip.style.top = (posi.top - args.height) + "px";
                    }
                    if (posi.left + args.width < parentposi.width)
                        tip.style.left = (posi.left + posi.width) + "px";
                    else
                        tip.style.left = (posi.left - args.width) + "px";
                }
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
        content.style.backgroundSize = "46px 46px";
        container.appendChild(content);

        let msg = document.createElement("div");
        msg.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().hover, "28px", "28px", __VERSION__.logo.flip);
        msg.style.backgroundRepeat = "no-repeat";
        msg.style.backgroundPosition = "left top";
        msg.style.backgroundSize = "28px 28px";
        msg.className = "message";
        let ms = document.createElement("div");
        ms.innerHTML = (typeof __VERSION__.helps[key] !== "undefined" ? __VERSION__.helps[key] : (typeof message == "undefined" ? __VERSION__.helps["other"] : message)) +
            "<hr><span style='font-size: 30%'>" + getUserConfig("CopyRight") + "</span>";
        ms.style.marginLeft = '30px';
        ms.style.marginRight = '30px';
        msg.appendChild(ms);
        msg.onclick = function () {
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
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("alert", __THEMES__.get().color, "100px", "100px");
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
                "width:75%;" +
                "float: left;" +
                //"white-space: auto;" +
                "white-space: normal;word-break: break-all;word-wrap: break-word;" +
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "line-height: 1.5;" +
                "display: inline-block;" +
                "vertical-align: middle;" +
                "text-align: left;" +
                "font-size: 100%;" +
                "background-color: transparent;" +
                "color: " + __THEMES__.get().color + ";" +
                "min-height: 100px;" +
                "overflow:none;";
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
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
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
            item.style.cssText = "width:100%;";
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("confirm", __THEMES__.get().color, "100px", "100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "font-size: 90%;" +
                "background-color: transparent;" +
                "color: " + __THEMES__.get().color + ";";
            item.appendChild(image);
            let msg = document.createElement("span");
            msg.style.cssText = "cursor: pointer;" +
                "width:70%;" +
                "float: left;" +
                "white-space: auto;" +
                "text-overflow: ellipsis;" +
                "-o-text-overflow: ellipsis;" +
                "line-height: 1.5;" +
                "display: inline-block;" +
                "vertical-align: middle;" +
                "text-align: left;" +
                "font-size: 100%;" +
                "background-color: transparent;" +
                "color: " + __THEMES__.get().color + ";" +
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
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
            $("ui-confirm-no").focus();
        },
    },

    prompt: {
        title: null,
        items: {},
        show: function (message, items, parent, callback, args) {
            //items:{item:{value:default,type:'input'},item:{value:default,type:'color'},item:{value:default,type:'select'}...}
            //return: items:{item:value,item:value,....}
            function setFocus(domid) {
                let inputs = $class("ui-container-item-input");
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
            content.style.width = "450px";
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

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("prompt", __THEMES__.get().color, "100px", "100px");
            image.size = "25% auto";
            image.attachment = "fixed";
            image.style.cssText = "width:25%;float: left;" +
                "text-align: center;" +
                "background-color: transparent;" +
                "color: " + __THEMES__.get().color + ";";
            itemcontent.appendChild(image);

            for (let key in this.items) {
                let it = this.items[key];
                let item = document.createElement("div");
                item.className = "ui-container-item";
                item.style.width = "70%";
                item.style.cssFloat = "right";
                span = document.createElement("span");
                span.className = "ui-container-item-name ";
                span.title = key;
                span.innerText = key + " : ";
                item.appendChild(span);
                let input = null;
                if (it.type === "color") {
                    input = UI.colorChoice("ui_prompt_value_" + key, it.value);
                    input.className = "ui-container-item-color";
                    input.id = "ui_prompt_value_" + key;
                } else if (it.type === "select") {
                    input = document.createElement("select");
                    input.className = "ui-container-item-input";
                    input.id = "ui_prompt_value_" + key;
                    for (let i = 0; i < it.options.length; i++) {
                        input.options.add(new Option(it.options[i]));
                    }
                    input.value = it.value;
                } else if (it.type === "date") {
                    input = document.createElement("input");
                    input.type = "date";
                    input.className = "ui-container-item-input";
                    input.id = "ui_prompt_value_" + key;
                    input.value = it.value;
                } else {
                    input = document.createElement("input");
                    input.className = "ui-container-item-input";
                    input.id = "ui_prompt_value_" + key;
                    input.value = it.value;
                }
                if (typeof it.notes !== "undefined")
                    input.title = it.notes;
                else if (typeof it.title !== "undefined")
                    input.title = it.title;
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
                    if (UI.prompt.items[key].type === "color")
                        UI.prompt.items[key] = document.getElementById("ui_prompt_value_" + key).getAttribute("value");
                    else {
                        UI.prompt.items[key] = document.getElementById("ui_prompt_value_" + key).value;
                    }
                }
                if (typeof callback === "function") {
                    if (typeof args === "undefined")
                        callback(UI.prompt.items);
                    else
                        callback(args, UI.prompt.items);
                }
                parent.removeChild($("ui_prompt"));
            };
            tools.appendChild(button);
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
            if (typeof $class("ui-container-item-input", 0) !== "undefined")
                $class("ui-container-item-input", 0).focus();
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

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);

            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("choice", __THEMES__.get().color, "100px", "100px");
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
                else {
                    input.className = "ui-container-item-radio";
                    input.style.cssText = "vertical-align:-3px;";
                }
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
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
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

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;font-size:120%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("user", __THEMES__.get().color, "100px", "100px");
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
            input.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("user", __THEMES__.get().color, "16px", "16px");
            input.style.backgroundRepeat = "no-repeat";
            input.style.backgroundPosition = "right";
            input.style.backgroundSize = "16px 16px";
            item.appendChild(input);
            input.onkeypress = function (event) {
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
            input.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("key", __THEMES__.get().color, "16px", "16px");
            input.style.backgroundRepeat = "no-repeat";
            input.style.backgroundPosition = "right";
            input.style.backgroundSize = "16px 16px";
            input.onkeypress = function (event) {
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
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
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
                let inputs = $class("ui-container-item-input");
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

            let itemcontent = document.createElement("div");
            itemcontent.style.cssText = "min-height: 100px;width:100%;";
            content.appendChild(itemcontent);
            let image = document.createElement("img");
            image.src = __SYS_IMAGES_SVG__.getSrc("password", __THEMES__.get().color, "100px", "100px");
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
                input.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl("key", __THEMES__.get().color, "16px", "16px");
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
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
            $class("ui-container-item-input", 0).focus();
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
            title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

            let span = document.createElement("span");
            span.innerHTML = "脚本管理 ";
            title.appendChild(span);
            let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
                        UI.confirm.show("警告", "您确定要删除脚本吗?", "auto", function (args) {
                            let storage = window.localStorage;
                            let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                            delete sqllist[args.title];
                            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                            getSQLList($("sql-Manager-Content-table"));
                            $("table-container").style.display = "block";
                            $("edit-container").style.display = "none";
                        }, {title: title});
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
                    UI.prompt.show("输入", {"新的脚本名称": {value: title, type: "input"}}, "auto", function (args, values) {
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
                    //使用UTF8编码规则备份.
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

            let exit = document.createElement("div");
            exit.className = "button";
            exit.innerText = "取消";
            exit.onclick = close.onclick = function () {
                parent.removeChild($("ui_sqlManagerDialog"));
            };
            tool.appendChild(exit);
            dragControl.hook(title, content, container.id, function (left, top) {
                content.style.left = left + "px";
                content.style.top = top + "px"
            });
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "分类计算";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
            let obj = $class("subtotal_object");
            let typ = $class("subtotal_type");
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
        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "数据切片";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });

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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "筛选字段 [ " + columns[Number(colid)].name + " ]";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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

        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
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
        title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

        let span = document.createElement("span");
        span.innerHTML = "格式设置 [ " + columns[Number(colid)].name + " ]";
        title.appendChild(span);
        let close = __SYS_IMAGES_SVG__.getImage("close", __THEMES__.get().color, "24px", "24px", __THEMES__.get().hover);
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
        param = UI.colorChoice(param.id, style["color"]);
        param.className = "ui-container-item-select";
        param.id = "color";
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
                if (typeof param[i].value !== "undefined")
                    format[param[i].id] = param[i].value;
                else
                    format[param[i].id] = param[i].getAttribute("value");
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
        dragControl.hook(title, content, container.id, function (left, top) {
            content.style.left = left + "px";
            content.style.top = top + "px"
        });
    },
};
