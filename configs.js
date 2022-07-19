
var __SYS_LOGO_LINK__ = {
    link: {
        getee: "&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#103;&#105;&#116;&#101;&#101;&#46;&#99;&#111;&#109;&#47;&#121;&#97;&#110;&#103;&#107;&#97;&#105;&#45;&#98;&#106;&#47;&#87;&#101;&#98;&#68;&#98;&#68;&#97;&#116;&#97;&#86;&#105;&#101;&#119;",
        gethub: "&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#103;&#105;&#116;&#104;&#117;&#98;&#46;&#99;&#111;&#109;&#47;&#121;&#97;&#110;&#103;&#107;&#97;&#105;&#45;&#98;&#106;&#47;&#87;&#101;&#98;&#77;&#121;&#83;&#81;&#76;&#68;&#97;&#116;&#97;&#86;&#105;&#101;&#119;&#46;&#103;&#105;&#116;"
    },
    author: "&#26472;&#20975;",
    tel: "&#40;&#48;&#49;&#48;&#41;&#54;&#51;&#54;&#48;&#51;&#51;&#50;&#57;",
    email: "&#121;&#97;&#110;&#103;&#107;&#97;&#105;&#46;&#98;&#106;&#64;&#99;&#99;&#98;&#46;&#99;&#111;&#109;",
    opacity: 0.4
};

const __VERSION__ = {
    name: "Web DataView for SQLite Database of browser",
    main: "WebDBDataView.js",
    version: "3.3.7",
    date: "2022/07/18",
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
        "-- 2021/11/11",
        "优化UI组件.",
        "-- 2021/11/15",
        "调整固定报表为双模式.",
        "-- 2021/11/17",
        "Echarts 5.2.2.",
        "-- 2021/12/08",
        "增加邮件编辑组件.",
        "-- 2021/12/15",
        "增加文件上传组件.",
        "-- 2022/02/25",
        "Echarts 5.3.0.",
        "-- 2022/03/01",
        "增加大数据文件分割功能.",
        "-- 2022/03/30",
        "修改固定报表.",
        "-- 2022/04/02",
        "增设日志上限,防止浏览器内存溢出.",
        "-- 2022/04/07",
        "优化前端日志模块.",
        "-- 2022/04/08",
        "优化系统资源库.",
        "-- 2022/04/14",
        "优化主题.",
        "ECharts 5.3.2.",
        "-- 2022/05/08",
        "优化固定报表.",
        "-- 2022/05/16",
        "ECharts 5.3.3.",
        "-- 2022/06/22",
        "优化固定报表.",
    ],
    author: __SYS_LOGO_LINK__.author.decode(),
    url: __SYS_LOGO_LINK__.link.getee.decode(),
    tel: __SYS_LOGO_LINK__.tel.decode(),
    email: __SYS_LOGO_LINK__.email.decode(),
    logo: {name: "tiger", flip: 0},
    notes: "",
    helps: {
        create_database_connect: "在浏览器中创建一个数据库(SQLite)。",
        edit_database_connect: "修改当前数据库信息。",
        delete_database_connect: "删除当前数据库。",
        create_new_table: "在当前数据库中创建一个数据表。",
        import_data: "协助您将如下格式数据导入当前数据库.<span style='font-size:50%'><li>.TXT</li><li>.CSV</li><li>.XLS</li><li>.XLSX</li></span>",
        show_table_construct: "解析当前数据表结构。",
        drop_table: "删除当前数据库中的数据表。",
        create_new_sql: "新建数据库脚本。",
        open_sql: "打开浏览器中保存的脚本。<br><span style='font-size:50%'>您还可以<li>删除脚本</li><li>重新命名</li></span>",
        save_sql: "将脚本保存至浏览器中。<br><span style='font-size:50%'>浏览器中的脚本是以名称为索引存储,因此在保存时要确保脚本名称的唯一性，当然，系统会提示您是否覆盖保存。</span>",
        load_sql_from_file: "导入本地脚本文件(.SQL)。",
        save_sql_to_file: "将正在编辑脚本导出为本地文件。",
        backup_sql_to_file: "备份或恢复浏览器中所有脚本。<br><span style='font-size:50%'>备份文件中包含MD5校验码，用于在恢复时进行完整性校验。</span>",
        execute_sql: "执行当前脚本或函数并获取数据。",
        other: "帮助信息未定义。",
    }
};

var __DATASET__ = {
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
             options: ["70%", "80%", "90%", "100%", "110%", "120%", "130%", "140%", "150%"],
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
         reportScale: {
             name: "小数位数",
             value: 6,
             type: "number", attribute: {min: 0, max: 6, step: 1}
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
         hr_FixedReport: {name: "固定报表设置", value: "", type: "hr"},
         reportScopeOfUse: {
             name: "应用环境",
             value: "intranet",
             options: [new Option("局域网", "intranet"), new Option("互联网", "internet")],
             type: "select"
         },
         reportThemes: {
             name: "报表默认主题",
             value: "深蓝",
             options: ["白色", "浅灰", "深灰", "黑色", "墨绿", "深蓝", "红色"],
             type: "select"
         },
         hr_download: {name: "数据下载设置", value: "", type: "hr"},
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
             type: "number", attribute: {min: 1000, max: 5000, step: 1000}
         },
     },
     result: [
         //{eventid:null, title:[],sql: null,columns:[],data:[],parameter:null,time:null}
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
                 for (var i = 0; i < ob.length; i++) {
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

     setConfigs: function (parent, callback) {
         let config = getUserConfig("datasetConfig");
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
         container.id = "ui_datasetConfigs";
         container.className = "ui-container-background";
         parent.appendChild(container);

         let content = document.createElement("div");
         content.className = "ui-container-body";
         content.id = "dataset-configs-Content";
         container.appendChild(content);

         let title = document.createElement("div");
         title.className = "ui-container-title";
         title.style.backgroundImage = __SYS_IMAGES_SVG__.getUrl(__VERSION__.logo.name, __THEMES__.get().color, "24px", "24px", __VERSION__.logo.flip);

         let span = document.createElement("span");
         span.innerHTML = "报表设置 ";
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
                     __DATASET__.configs[this.id].value = this.value;
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
                     __DATASET__.configs[this.id].value = this.value;
                 };
                 if (typeof this.configs[name].title != "undefined")
                     input.title = this.configs[name].title;
                 else
                     input.title = this.configs[name].name;
                 item.appendChild(input);
             } else if (this.configs[name].type == "color") {
                 let input = UI.colorChoice(name, this.configs[name].value, function (value) {
                     __DATASET__.configs[name].value = value;
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
                     __DATASET__.configs[name].value = (value ? "true" : "false");
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
                 input.min = __DATASET__.configs[name].attribute.min;
                 input.max = __DATASET__.configs[name].attribute.max;
                 input.step = __DATASET__.configs[name].attribute.step;
                 input.className = "ui-container-item-range";
                 input.title = __DATASET__.configs[name].value;
                 input.value = Number(__DATASET__.configs[name].value.replace(new RegExp(__DATASET__.configs[name].attribute.unit, "g"), ""));
                 input.onchange = function () {
                     __DATASET__.configs[this.id].value = this.title = (this.value + __DATASET__.configs[this.id].attribute.unit);
                 };
                 item.appendChild(input);
             } else if (this.configs[name].type == "ranges") {
                 let input = UI.rangesChoice(
                     __DATASET__.configs[name].attribute.min,
                     __DATASET__.configs[name].attribute.max,
                     __DATASET__.configs[name].attribute.unit,
                     __DATASET__.configs[name].value,
                     function (value) {
                         __DATASET__.configs[name].value = value;
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
                 input.min = __DATASET__.configs[name].attribute.min;
                 input.max = __DATASET__.configs[name].attribute.max;
                 input.step = __DATASET__.configs[name].attribute.step;
                 input.className = "ui-container-item-number";
                 input.title = __DATASET__.configs[name].value;
                 input.value = __DATASET__.configs[name].value;
                 input.onkeypress = function () {
                     return false;
                 };
                 input.onchange = function () {
                     __DATASET__.configs[this.id].value = this.title = this.value;
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
             setUserConfig("datasetConfig", JSON.stringify(__DATASET__.getConfigItems()));
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
                 UI.alert.show("提示", "报表参数已恢复为系统初始值,系统将重新载入页面...");
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

         dragControl.hook(title, content, function (left, top) {
             content.style.left = left + "px";
             content.style.top = top + "px"
         });
     },
     getResultIndex: function (eventid) {
         let index = null;
         for (let i = 0; i < this.result.length; i++) {
             if (this.result[i].eventid == eventid) {
                 index = i;
                 break;
             }
         }
         return index;
     },
     getResult: function (eventid) {
         let result = null;
         for (let i = 0; i < this.result.length; i++) {
             if (this.result[i].eventid == eventid) {
                 result = this.result[i];
                 break;
             }
         }
         return result;
     },
     removeResult: function (eventid) {
         let result = false;
         for (let i = 0; i < this.result.length; i++) {
             if (this.result[i].eventid == eventid) {
                 this.result.splice(i, 1);
                 result = true;
                 break;
             }
         }
         return result;
     }
 };