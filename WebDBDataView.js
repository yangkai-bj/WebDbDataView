var __VERSION__ = {
    version: "2.1.9",
    date: "2021/04/09",
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
        "修改报表下载方式."
    ]
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
     Separator: {value: ",", name: "分隔符", type: "select", options: [["逗号",","], ["竖线","|"], ["Tab","\t"]]},
     SourceFile: {value: "", name: "源文件", type: "file", data: [], total: 0, count: 0, imported: 0, failed: 0},
     SelectedDataSet: {value: -1, name: "数据集", type: "select", options: []}
 };

 var __DATABASE__ = {
     Name: {value: "", name: "库名称", type: "text"},
     Version: {value: 1.0, name: "版本号", type: "text"},
     Description: {value: "", name: "库描述", type: "text"},
     Size: {value: "1024*1024*1024", name: "库容量", type: "text"}
 };

 var __COLUMN__ = {
     check: {value: true, name: "选择", type: "checkbox", width: "50px"},
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
     sql: null,
     time: null,
     result: [],
     default: {sheet: 0, column: null, cell: []},
     pages: {total: 0, default: 1},
     //页数计算根据__ECHARTS__.configs.reportPageSize.value计算.
     table: {
         entity: null,
         tomove: null,
         init: function (tb) {
             this.entity = tb;
             this.entity.style.fontSize = __ECHARTS__.configs.reportFontSize.value;
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
                             viewMessage(msg);
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
 };

 var __SQLEDITOR__ = {
     title: null,
     codeMirror: null,
     parameter: null,
     charset: {value: 1, name: "字符集", type: "select", options: ["GBK", "UTF-8"]},
     modes: {SQL: "text/x-sqlite",函数: "text/javascript"},
     themes: {
         默认: {name: "default", href: "codemirror/theme/default.css"},
         黑色: {name: "black", href: "codemirror/theme/black.css"},
         粉色: {name: "pink", href: "codemirror/theme/pink.css"},
         墨绿: {name: "blackish-green", href: "codemirror/theme/blackish-green.css"},
         Cobalt: {name: "cobalt", href: "codemirror/theme/cobalt.css"},
         Darcula: {name: "darcula", href: "codemirror/theme/darcula.css"},
         Eclipse: {name: "eclipse", href: "codemirror/theme/eclipse.css"},
         Elegant: {name: "elegant", href: "codemirror/theme/elegant.css"},
         LightDuotone: {name: "duotone-light", href: "codemirror/theme/duotone-light.css"},
         LightSolarized: {name: "solarized light", href: "codemirror/theme/solarized.css"},
         Matrix: {name: "the-matrix", href: "codemirror/theme/the-matrix.css"},
         Rubyblue: {name: "rubyblue", href: "codemirror/theme/rubyblue.css"},
         Yonce: {name: "yonce", href: "codemirror/theme/yonce.css"},
         Zenburn: {name: "zenburn", href: "codemirror/theme/zenburn.css"}
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
     }
 };

 function $(id){
     try{
         return document.getElementById(id);
     } catch (e) {
         return null;
     }
 }

 function messageEncode(str){
    let encodedStr = "" ;
    if (str=="")
        return encodedStr ;
    else {
        for (let i = 0 ; i < str.length ; i ++){
            encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
        }
    }
    return encodedStr;
}

function messageDecode(str){
    let decodeStr = "";
    if (str == "")
        return decodeStr ;
　　let toParse = str.split(";");
　　for (let i=0;i<toParse.length;i++) {
　　　　let s = toParse[i];
　　　　decodeStr += String.fromCharCode(parseInt(s.substring(2)))
　　}
　　return decodeStr;
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
                        _row.push(new Date(row[i]).Format("yyyy-MM-dd"));
                        break;
                    case "DATETIME":
                        _row.push(new Date(row[i]).Format("yyyy-MM-dd hh:mm:ss.S"));
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

function importData(){
    //#######################################
    //默认行分隔符:\r\n
    //数据分隔符:支持|,\t
    //#######################################
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
            let sql = "insert into " + table + " values ({VALUES})";
            //不要加字段列表，否则仅能导入两列数据.
            for (let i = 0; i < lines.length; i++) {
                try {
                    let data = transferData(__CONFIGS__.CURRENT_TABLE.structure, lines[i].trim().split(sep));
                    if (i == 0) {
                        let values = "?";
                        for (let c = 1; c < data.length; c++) {
                            values += ",?"
                        }
                        sql = sql.replace("{VALUES}", values);
                        viewMessage(sql);
                    } else if (data.length >= __CONFIGS__.CURRENT_TABLE.structure.data.length) {
                        tx.executeSql(sql, data.slice(0,__CONFIGS__.CURRENT_TABLE.structure.data.length), function (tx, results) {
                                __IMPORT__.SourceFile.count += 1;
                                __IMPORT__.SourceFile.imported += results.rowsAffected;
                                viewMessage("导入第 " + __IMPORT__.SourceFile.count + " 条记录.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]")
                            },
                            function (tx, error) {
                                __IMPORT__.SourceFile.count += 1;
                                __IMPORT__.SourceFile.failed += 1;
                                viewMessage("第 " + __IMPORT__.SourceFile.count + " 条记录错误.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]\n" + error.message)
                            });
                    } else {
                        __IMPORT__.SourceFile.count += 1;
                        __IMPORT__.SourceFile.failed += 1;
                        viewMessage("第 " + __IMPORT__.SourceFile.count + " 条记录错误.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]\n" + "数据解析后长度小于数据库结构,\n[ " + lines[i] + " ]")
                    }
                }catch (e) {
                    __IMPORT__.SourceFile.count += 1;
                    __IMPORT__.SourceFile.failed += 1;
                    viewMessage("第 " + __IMPORT__.SourceFile.count + " 条记录错误.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]\n" + e + "\n[ " + lines[i] + " ]")
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

function getStringDataType(str){
      //判断字符是否符合数字规则
     try {
         str = str.trim();
         if (str.isDatetime() && str.length == 10)
             return "date";
         else if (str.isDatetime() && str.indexOf(":") != -1)
             return "datetime";
         else if (str.isIDnumber() || str.isPhoneNumber())
             return "nvarchar";
         else if (str.isNumber() && isNaN(Number.parseInt(str)) == false && str.length < 18 && str.indexOf(".") == -1)
             return "int";
         else if (str.isNumber() && isNaN(Number.parseFloat(str)) == false && ((str.length < 18 && str.indexOf(".") == -1) || (str.indexOf(".") < 18 && str.indexOf(".")>=0)))
             return "float";
         else
             return "nvarchar"
     }
     catch (e){
         return "nvarchar"
     }
}

function getTypeOf(d) {
    //判断数据类型,可能是非字符类型
    //由于数据库在本地,数据没有经过通讯字符转换,数据全部为元类型.
    //通过元类型判断
     let type = typeof(d);
     if (type == "string") {
         if (d.isDatetime()) {
             if (d.length == 10)
                 type = "date";
             else if (d.length > 10)
                 type = "datetime";
             else
                 type = "string";
         }
     }
     return type;
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
                    col[index] = getStringDataType(data[i].toString());
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
        th.innerText = __COLUMN__[index].name;
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
                    viewMessage(sql);
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            let aff = results.rowsAffected;
                            let len = results.rows.length;
                            if (aff > 0) {
                                viewMessage(aff + " 条记录被修改.")
                            }
                            if (aff == 0 && len == 0) {
                                viewMessage("数据库没有返回数据和消息.")
                            }
                            viewTables(__CONFIGS__.CURRENT_DATABASE.index);
                        },
                        function (tx, error) {
                            viewMessage(error.message);
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
                let db = {"name": __DATABASE__.Name.value,"version" : __DATABASE__.Version.value, "description": __DATABASE__.Description.value, "size": __DATABASE__.Size.value};
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
    let container = document.createElement("div");
    container.type = "div";
    container.className = "import-Content";
    container.id = "import-Content";

    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 导入数据";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    for (let name in __IMPORT__) {
        let d = document.createElement("div");
        container.appendChild(d);
        let s = document.createElement("span");
        s.innerHTML = __IMPORT__[name].name + " :";
        d.appendChild(s);
        if (__IMPORT__[name].type == "view") {
            let v = document.createElement("span");
            v.id = "table-title";
            v.innerHTML = "[ " + __CONFIGS__.CURRENT_TABLE.name + " ]";
            d.appendChild(v);
        } else if (__IMPORT__[name].type == "select") {
            let input = document.createElement("select");
            input.id = name;
            for (let i = 0; i < __IMPORT__[name].options.length; i++) {
                if (isArray(__IMPORT__[name].options[i]))
                    input.options.add(new Option(__IMPORT__[name].options[i][0], __IMPORT__[name].options[i][1]));
                else
                    input.options.add(new Option(__IMPORT__[name].options[i], i));
            }
            input.value = __IMPORT__[name].value;
            input.onchange = function(){
                __IMPORT__[this.id].value = this.value;
            };
            d.appendChild(input);
        } else {
            let input = document.createElement("input");
            input.id = name;
            try {
                input.type = __IMPORT__[name].type;
                if (input.type == "file") {
                    input.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                    input.onchange = function () {
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
                                    readWorkbookFromLocalFile(file);
                                } else {
                                    showMessage("仅适用于XLSX、XLS、TXT和CSV文件。");
                                    return;
                                }
                            } catch (e) {
                                alert("请选择需要导入的文件.")
                            }
                        } else {
                            showMessage("本应用适用于Chrome浏览器或IE10及以上版本。")
                        }
                    };
                }
            } catch (e) {
                input.type = "text";
            }
            d.appendChild(input);
        }
    }

    let d = document.createElement("div");
    d.id = "progress-container";
    d.appendChild(getImportProgress());
    container.appendChild(d);

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
                $("import-Content").parentNode.removeChild($("import-Content"));
            }
        } else {
            let progressContainer = $("progress-container");
            progressContainer.innerHTML = "";
            progressContainer.appendChild(getImportProgress());
            if ($("SelectedDataSet").length > 0)
                importData();
            else
                alert("请选择需要导入的文件及数据集合.");
            //let container =$("import-Content");
            //container.parentNode.removeChild(m);
        }
    };
    tool.appendChild(b);
    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = close.onclick = function(){
        let container =$("import-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);

    setDialogDrag(title);

    return container;
}

function getImportProgress(){
    let container = document.createElement("div");
    container.id = "progress";
    let v = document.createElement("div");
    container.appendChild(v);
    v.id = "progress-value";
    let progress = setInterval(function(){Timer()},50);
    function Timer(){
        try {
            let value = __IMPORT__.SourceFile.count / __IMPORT__.SourceFile.total;
            let v = $("progress-value");
            v.style.width = (value * 100) + "%";
            v.innerText = __IMPORT__.SourceFile.count + " / " + __IMPORT__.SourceFile.total;
            if (value == 1)
                Stop();
        }catch (e) {
        }
    }
    function Stop(){
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
        console.log(e);
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
        console.log(e);
    }
}

function viewDatabases(){
    //#######################################
    //初始化localStorage
    //#######################################
    let storage = window.localStorage;
    if (storage.getItem(__CONFIGS__.STORAGE.DATABASES) == null){
        storage.setItem(__CONFIGS__.STORAGE.DATABASES,"[]")
    }
    let dbslist = $("sidebar-dbs");
    dbslist.innerText = "";
    let ul = document.createElement("ul");
    ul.style.width = "80%";
    ul.style.position = "relative";
    dbslist.appendChild(ul);
    __CONFIGS__.DATABASES = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
    for (let i = 0; i < __CONFIGS__.DATABASES.length; i++){
        if (__CONFIGS__.DATABASES[i].name != null) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.className = "list";
            a.innerText = __CONFIGS__.DATABASES[i].name;
            a.setAttribute("index", i);
            a.id = __CONFIGS__.DATABASES[i].name;
            a.onclick = function () {
                let dbs = $("sidebar-dbs");
                let l = dbs.getElementsByClassName("list");
                for (let i=0; i<l.length; i++ ){
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
                    for(let key in __CONFIGS__.CURRENT_DATABASE.value) {
                        let l = document.createElement("li");
                        $("ul-db-" + this.id).appendChild(l);
                        let inf = document.createElement("a");
                        inf.className = "list";
                        inf.innerText = key + ": " + __CONFIGS__.CURRENT_DATABASE.value[key];
                        l.appendChild(inf);
                    }
                    $("ul-db-" + this.id).setAttribute("isOpen","true");
                } else {
                    $("ul-db-" + this.id).setAttribute("isOpen","false");
                }
            };
            li.appendChild(a);
            let dul = document.createElement("ul");
            dul.id = "ul-db-" + __CONFIGS__.DATABASES[i].name;
            dul.setAttribute("isOpen","false");
            li.appendChild(dul);
            ul.appendChild(li);
        }
    }
}

function getNow() {
    let date = new Date();
    return date.Format("yyyy-MM-dd hh:mm:ss.S")
}

function viewMessage(msg){
    let msgbox = $("messageBox");
    let dt = document.createElement("dt");
    dt.type = "dt";
    dt.className = "dt";
    dt.innerText = getNow();
    let first = msgbox.firstChild;
    msgbox.insertBefore(dt, first);

    let message = document.createElement("dd");
    message.type = "dd";
    message.className= "message";
    message.innerText = msg;
    dt.appendChild(message);

    //保留日志设置
    if (__CONFIGS__.MAXLOGS > 0) {
        let dts = msgbox.getElementsByClassName("dt");
        if (dts.length > __CONFIGS__.MAXLOGS) {
            msgbox.removeChild(dts[dts.length - 1]);
        }
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
                        let a = document.createElement("a");
                        li.appendChild(a)
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
                                viewMessage(sql);
                                tx.executeSql(sql, [],
                                    function (tx, results) {
                                        let len = results.rows.length;
                                        if (len > 0) {
                                            viewMessage("数据库返回 " + len + " 条记录.");
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
                                                    let col = document.createElement("a");
                                                    col.className = "list";
                                                    col.id = __CONFIGS__.CURRENT_TABLE.name + "." + __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value;
                                                    columns.push(__CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value);

                                                    col.innerText = __CONFIGS__.CURRENT_TABLE.structure.data[m]["Name"].value + "\t" + __CONFIGS__.CURRENT_TABLE.structure.data[m]["Type"].value;
                                                    col.draggable = "true";
                                                    col.ondragstart = function (event) {
                                                        event.dataTransfer.setData("Text", event.target.id);
                                                    };
                                                    l.appendChild(col);
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
                                        viewMessage(err.message);
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
                viewMessage(err.message);
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
                    } else {
                        if (data[i][columns[colid].name].value.toString().localeCompare(data[x][columns[colid].name].value.toString()) < 0) {
                            exchange(data[i], data[x]);
                        }
                    }
                    break;
                case "desc":
                    if (data[i][columns[colid].name].type == "number") {
                        if (data[i][columns[colid].name].value > data[x][columns[colid].name].value) {
                            exchange(data[i], data[x]);
                        }
                    } else {
                        if (data[i][columns[colid].name].value.toString().localeCompare(data[x][columns[colid].name].value.toString()) > 0) {
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
        let columns = __DATASET__["result"][index].columns;
        let data = __DATASET__["result"][index].data;
        let title = (typeof __DATASET__["result"][index].title == "undefined")? null:__DATASET__["result"][index].title;
        let dataset = {columns: [], data: [], title: title};
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
        __DATASET__["result"][index] = dataset;
    } catch (e) {
        console.log(e);
    }
}

function viewDataset(index){
    let container = $("tableContainer");
    try {
        container.removeAttribute("_echarts_instance_");
        echarts.getInstanceByDom(container).dispose();
    }catch (e) {
    }
    container.innerText = "";
    let columns = __DATASET__["result"][index].columns;
    let data = __DATASET__["result"][index].data;
    let table = document.createElement("table");
    table.className = "table";
    table.id = "table";
    let tr = document.createElement("tr");
    tr.type = "tr";
    table.appendChild(tr);

    for (let c =0; c < columns.length; c++) {
        let th = document.createElement("th");
        th.type = "th";
        th.innerText = columns[c].name;
        th.style.textAlign = columns[c].style.textAlign;
        let menu = document.createElement("li");
        menu.className = "menu";
        menu.setAttribute("colid", c);
        menu.innerText = "︙";
        menu.appendChild(getColumnMenu(c));
        menu.onmouseenter = function(){
            let menu = document.getElementById("table-column-menu-" + this.getAttribute("colid"));
            menu.style.display = "block";
        };
        menu.onmouseleave = function(){
            let menu = document.getElementById("table-column-menu-" + this.getAttribute("colid"));
            menu.style.display = "none";
        };
        th.appendChild(menu);

        let order = document.createElement("span");
        order.className = "order";
        order.setAttribute("colid", c);
        switch (columns[c].order) {
            case "":
                order.innerText = "●";
                break;
            case "asc":
                order.innerText = "▲";
                break;
            case "desc":
                order.innerText = "▼";
                break;
        }
        order.onclick = function () {
            let index = __DATASET__.default.sheet;
            orderDatasetBy(__DATASET__["result"][index],this.getAttribute("colid"));
            viewDataset(index);
        };
        th.appendChild(order);
        tr.appendChild(th);
    }

    for (let i = 0; i < data.length; i++) {
        if (i >= (__DATASET__.pages.default - 1) * Number(__ECHARTS__.configs.reportPageSize.value) && i < __DATASET__.pages.default * Number(__ECHARTS__.configs.reportPageSize.value)) {
            let tr = document.createElement("tr");
            tr.type = "tr";
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
                        if (item.type == "number")
                            td.innerText = formatNumber(item.value, item.format);
                        else if (item.type == "date" || item.type == "datetime")
                            td.innerText = new Date(item.value).Format(item.format);
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

function formatNumber(num,pattern){
    // 用法
    // formatNumber(12345.999,'#,##0.00');
    // formatNumber(12345.999,'#,##0.##');
    // formatNumber(123,'000000');
    let is = false;
    if (num <0)
        is = true;
    num = Math.abs(num);
    let strarr = num?num.toString().split('.'):['0'];
    let fmtarr = pattern?pattern.split('.'):[''];
    let retstr='';
    // 整数部分
    let str = strarr[0];
    let fmt = fmtarr[0];
    let i = str.length-1;
    let comma = false;
    for(let f=fmt.length-1;f>=0;f--){
        switch(fmt.substr(f,1)){
            case '#':
                if(i>=0 ) retstr = str.substr(i--,1) + retstr;
                break;
            case '0':
                if(i>=0) retstr = str.substr(i--,1) + retstr;
                else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr=','+ retstr;
            break;
        }
    }
    if(i>=0){
    if(comma){
        let l = str.length;
        for(;i>=0;i--){
            retstr = str.substr(i,1) + retstr;
            if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;
        }
    }
        else retstr = str.substr(0,i+1) + retstr;
    }
    retstr = retstr+'.';
    // 处理小数部分
    str=strarr.length>1?strarr[1]:'';
    fmt=fmtarr.length>1?fmtarr[1]:'';
    i=0;
    for(let f=0;f<fmt.length;f++){
        switch(fmt.substr(f,1)){
            case '#':
                if(i<str.length) retstr+=str.substr(i++,1);
                break;
            case '0':
                if(i<str.length) retstr+= str.substr(i++,1);
                else retstr+='0';
            break;
        }
    }
    return is?"-" + retstr.replace(/^,+/,'').replace(/\.$/,''): retstr.replace(/^,+/,'').replace(/\.$/,'');
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
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();
            if (__SQLEDITOR__.parameter == null)
                selection = fillSqlParam(selection);
            else {
                let title = __SQLEDITOR__.title;
                for (let param in __SQLEDITOR__.parameter) {
                    selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
                    if (title != null)
                        title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
                }
                if (title != null) {
                    title = title.split("_");
                    __ECHARTS__.configs.titleText.value = title[0];
                    if (title.length > 1) {
                        __ECHARTS__.configs.titleSubText.value = title[1];
                    } else {
                        __ECHARTS__.configs.titleSubText.value = "";
                    }
                }
            }
            let sqls = [];
            if (selection.trim() != "") {
                viewMessage(selection);
                $("tableContainer").innerHTML = "";
                $("page-label").innerText = " ● ";
                $("dataset-label").innerText = " ● ";
                sqls = selection.split(";");
                __DATASET__.sql = selection;
                __DATASET__.time = getNow();
                __DATASET__.result = [];
                for (let s = 0; s < sqls.length; s++) {
                    let sql = sqls[s].slice(0).trim();
                    if (sql.trim() == "")
                        continue;
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            let aff = results.rowsAffected;
                            let len = results.rows.length;
                            if (len > 0) {
                                viewMessage("数据库返回 " + len + " 条记录.");
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
                                for (let i = 0; i < len; i++) {
                                    let row = {};
                                    let r = JSON.parse(JSON.stringify(results.rows.item(i)));
                                    for (let c = 0; c < columns.length; c++) {
                                        let _value = r[columns[c].name];
                                        let _type = getTypeOf(_value);
                                        let _format = null;
                                        let _align = "left";
                                        let _color = "black";
                                        if (_type == "number" && _value < 0)
                                            _color = "red";
                                        switch (_type) {
                                            case "number":
                                                _format = "#,##0.######";
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
                                __DATASET__["result"].push({"columns": columns, "data": data, title: null});

                                if (__DATASET__["result"].length > 0) {
                                    __DATASET__.default.sheet = 0;
                                    __DATASET__.pages.total = Math.ceil(__DATASET__.result[0].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
                                    __DATASET__.pages.default = 1;
                                    $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
                                    $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
                                    viewDataset(0);
                                }
                            }
                            if (aff > 0) {
                                viewMessage(aff + " 条记录被修改.")
                            }
                            if (aff == 0 && len == 0) {
                                viewMessage("数据库没有返回数据和消息.")
                            }
                        },
                        function (tx, err) {
                            viewMessage(err.message);
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
    if (__SQLEDITOR__.codeMirror.somethingSelected())
        selection = __SQLEDITOR__.codeMirror.getSelection();
    else
        selection = __SQLEDITOR__.codeMirror.getValue();
    if (__SQLEDITOR__.parameter == null)
        selection = fillSqlParam(selection);
    else {
        let title = __SQLEDITOR__.title;
        for (let param in __SQLEDITOR__.parameter) {
            selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString())
            if (title != null)
                title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
        }
        if (title != null) {
            title = title.split("_");
            __ECHARTS__.configs.titleText.value = title[0];
            if (title.length > 1) {
                __ECHARTS__.configs.titleSubText.value = title[1];
            } else {
                __ECHARTS__.configs.titleSubText.value = "";
            }
        }
    }
    let funs = [];
    if (selection.trim() != "") {
        funs = selection.split(";");
        viewMessage(selection);
        $("tableContainer").innerHTML = "";
        $("page-label").innerText = " ● ";
        $("dataset-label").innerText = " ● ";
        __DATASET__.sql = selection;
        __DATASET__.time = getNow();
        __DATASET__.result = [];
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
                    viewMessage(e + "\n" + funs[s].toString() + " -> " + f);
                }
            }
            data.push(row);
        }
        __DATASET__["result"].push(transferResultDataset(funs, data));
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = 0;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[0].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(0);
        }
    }
}

function transferResultDataset(funs, dataset) {
        let col = ["X"].concat(funs);
        let columns = [];
        for (let i = 0; i < col.length; i++) {
            columns.push({id: i, name: col[i], type: "string", style: {textAlign: "center"}, order: ""});
        }
        let data = [];
        for (let i = 0; i < dataset.length; i++) {
            let row = {};
            let r = dataset[i];
            for (let c = 0; c < columns.length; c++) {
                let _value = r[c];
                let _type = getStringDataType(_value != null?_value.toString():null);
                let _format = null;
                let _align = "left";
                let _color = "black";

                switch (_type) {
                    case "float":
                        _type = "number";
                        _value = Number.parseFloat(r[c]);
                        _format = "#,##0.######";
                        _align = "right";
                        break;
                    case "int":
                        _type = "number";
                        _value = Number.parseInt(r[c]);
                        _format = "#,##0.######";
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
            columns: columns,
            total: data.length,
            data: data,
            title: null
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
    return {columns: columns,data: data, title: null};
}

function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) {
        event = new MouseEvent('click');
    } else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

function str2ab(str) {
    //使用UTF8编码规则,涉及中文的转换.
    let codes = [];
    for (let i = 0; i != str.length; ++i) {
        let code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            codes.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            codes.push((192 | (31 & (code >> 6))));
            codes.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            codes.push((224 | (15 & (code >> 12))));
            codes.push((128 | (63 & (code >> 6))));
            codes.push((128 | (63 & code)))
        }
    }
    let buf = new ArrayBuffer(codes.length);
    let result = new Uint8Array(buf);
    for (i = 0; i < codes.length; i++) {
        result[i] = codes[i] & 0xff;
    }
    return result;
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

function init() {
    try {
        getQRCode($("page"), 90, 90, "https://gitee.com/yangkai-bj/", __SYS_IMAGES__.echo);
        $("main-title").appendChild(__SYS_IMAGES__.getLogoImage(__SYS_IMAGES__.logo_echarts));
        $("main-version").innerText = __VERSION__.version;
        $("main-version").title = "发布日期: " + __VERSION__.date + "\n ● " + __VERSION__.comment.join("\n ● ");
    } catch (e) {
    }

    if (checkStorage()) {
        setUserConfig("CopyRight", "杨凯 ☎ (010)63603329 ✉ <a href='mailto:yangkai.bj@ccb.com'>yangkai.bj@ccb.com</a>");
        $("copyright").innerHTML = getUserConfig("CopyRight");
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

        resize();
        viewDatabases();
    } else {
        alert("当前浏览器不支持Local Storage ！")
    }

    //#######################################
    //初始化数据库菜单
    //#######################################
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
    dbinfo.innerText = "测试";
    dbinfo.style.display = "none";
    dbinfo.onclick = function () {
        //##########################################
        //字符串可传输编码转化
        //let a = "";
        //console.log(messageEncode(a));
        //##########################################
        //图片转base64代码
        //getBase64Image(null);
        //##########################################
    };
    dbstools.appendChild(dbinfo);
    setTooltip(dbinfo, "功能测试");

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
        __DATASET__["sql"] = __CONFIGS__.CURRENT_TABLE.sql;
        __DATASET__["time"] = getNow();
        __DATASET__["result"] = [];
        __DATASET__["result"].push(__CONFIGS__.CURRENT_TABLE.structure);
        __DATASET__.default.sheet = 0;
        viewMessage(__CONFIGS__.CURRENT_TABLE.name + ":\n" + __CONFIGS__.CURRENT_TABLE.sql);
        viewDataset(0);
        let label = $("dataset-label");
        label.innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__["result"].length;

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
                    viewMessage(sql);
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            let aff = results.rowsAffected;
                            let len = results.rows.length;
                            if (aff > 0) {
                                viewMessage(aff + " 条记录被修改.")
                            }
                            if (aff == 0 && len == 0) {
                                viewMessage("数据库没有返回数据和消息.")
                            }
                            viewTables(__CONFIGS__.CURRENT_DATABASE.index);
                            __CONFIGS__.CURRENT_TABLE.name = "";
                            __CONFIGS__.CURRENT_TABLE.sql = "";
                            __CONFIGS__.CURRENT_TABLE.structure = [];
                            __CONFIGS__.CURRENT_TABLE.type = "";
                        },
                        function (tx, error) {
                            viewMessage(error.message);
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

    let newsql = document.createElement("div");
    newsql.type = "div";
    newsql.className = "button";
    newsql.innerText = "新建";
    newsql.id = "create-new-sql";
    newsql.appendChild(__SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.create_sql));
    let help_createsql = $("help-create-sql");
    newsql.onclick = help_createsql.onclick = function () {
        let openfile = $("openfile");
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
    input.id = "openfile";
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
        setCenterPosition($("page"), tb)
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
            setCenterPosition($("page"), tb)
        } else {
            let name = __SQLEDITOR__.title;
            let res = confirm("您确定覆盖保存脚本 " + name + " 吗?");
            if (res == true) {
                let sql = __SQLEDITOR__.codeMirror.getValue();
                if (name != "" && sql != "") {
                    let storage = window.localStorage;
                    let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                    sqllist[name] = messageEncode(sql);
                    storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
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
        $("openfile").click();
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
        let blob = new Blob([str2ab(__SQLEDITOR__.codeMirror.getValue())], {type: "application/octet-stream"});
        let title = __SQLEDITOR__.title != null ? __SQLEDITOR__.title.split("_")[0] : prompt("请输入文件名称:");
        if (title != null && title.trim() != "")
            openDownloadDialog(blob, title + ".sql");
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
                setCenterPosition($("page"), paramdialog)
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
        console.log(e);
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
    tofull.className = "button";
    tofull.innerText = "❏";
    tofull.style.fontSize = "150%";
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
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
    toDisplay.className = "button";
    toDisplay.innerText = "»";
    toDisplay.style.fontSize = "150%";
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
        console.log(e);
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
    setTooltip(logs, "保留日志<br>记录数");

    //#######################################
    //初始化数据菜单
    //#######################################
    let datatools = $("data-tools");

    let toup = document.createElement("div");
    datatools.appendChild(toup);
    toup.className = "button";
    toup.innerText = "«";
    toup.style.fontSize = "150%";
    toup.setAttribute("label", "dataset-label");
    toup.setAttribute("pagelabel", "page-label");
    toup.id = "dataset-up";
    toup.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            if (__DATASET__.default.sheet > 0) {
                __DATASET__.default.sheet -= 1;
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
                __DATASET__.pages.default = 1;
            }
            $(this.getAttribute("label")).innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(toup, "上一个<br>数据集");

    let to = document.createElement("div");
    datatools.appendChild(to);
    to.className = "button";
    to.id = "dataset-label";
    to.innerText = "●";
    to.style.fontSize = "100%";
    to.setAttribute("pagelabel", "page-label");
    to.onclick = function () {
        if (__DATASET__.result.length > 0) {
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            this.innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(to, "当前<br>数据集");

    let todown = document.createElement("div");
    datatools.appendChild(todown);
    todown.className = "button";
    todown.innerText = "»";
    todown.style.fontSize = "150%";
    todown.setAttribute("label", "dataset-label");
    todown.setAttribute("pagelabel", "page-label");
    todown.id = "dataset-down";
    todown.onclick = function () {
        if (__DATASET__.result.length > 0) {
            if (__DATASET__.default.sheet < (__DATASET__.result.length - 1)) {
                __DATASET__.default.sheet += 1;
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
                __DATASET__.pages.default = 1;
            }
            $(this.getAttribute("label")).innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(todown, "下一个<br>数据集");

    let datatran = document.createElement("div");
    datatools.appendChild(datatran);
    datatran.className = "button";
    datatran.innerText = "☇";
    datatran.style.fontSize = "150%";
    datatran.id = "dataset-transpose";
    let help_datasettranspose = $("help-dataset-transpose");
    datatran.onclick = help_datasettranspose.onclick = function () {
        if (__DATASET__.result.length > 0) {
            datasetTranspose(__DATASET__.default.sheet);
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(datatran, "转置<br>数据");

    let dataslice = document.createElement("div");
    datatools.appendChild(dataslice);
    dataslice.className = "button";
    dataslice.innerText = "♯";
    dataslice.style.fontSize = "150%";
    dataslice.id = "dataset-slice";
    let help_datasetslice = $("help-dataset-slice");
    dataslice.onclick = help_datasetslice.onclick = function () {
        if (__DATASET__.result.length > 0) {
            let dataslice = getDataSlice();
            setCenterPosition($("page"), dataslice);
        }
    };
    setTooltip(dataslice, "数据<br>切片");

    let subtotal = document.createElement("div");
    datatools.appendChild(subtotal);
    subtotal.type = "div";
    subtotal.className = "button";
    subtotal.style.fontSize = "130%";
    subtotal.innerText = "Σ";
    subtotal.id = "dataset-subtotal";
    let help_datasetsubtotal = $("help-dataset-subtotal");
    subtotal.onclick = help_datasetsubtotal.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            let dataset = __DATASET__["result"][__DATASET__.default.sheet];
            let data = [];
            let columns = [];
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
            let subtotal = getSubtotal(columns, data);
            setCenterPosition($("page"), subtotal);
        }
    };
    setTooltip(subtotal, "分类<br>计算");

    let download = document.createElement("div");
    datatools.appendChild(download);
    download.type = "div";
    download.className = "button";
    download.style.fontSize = "150%";
    download.innerText = "⇣";
    download.id = "dataset-download";
    let help_datasetdownload = $("help-dataset-download");
    download.onclick = help_datasetdownload.onclick = function () {
        function fixFileName(str){
            let sts = ['\\','/',':','*','?','"','<','>','|'];
            for(let i =0;i < sts.length;i++){
                str.replaceAll(sts[i],"");
            }
            return str;
        }
        function sleep(delay) {
            let endTime = new Date().getTime() + parseInt(delay);
            while (new Date().getTime() < endTime) ;
            //用时间来控制延时,突破浏览器同时下载任务限制.
        }
        if (__DATASET__["result"].length > 0) {
            let sheets = [];
            let sheetNames = [];
            let comment = [
                    ['Application:', 'Web DataView for SQLite Database of browser'],
                    ['Version:', __VERSION__.version + " (" + __VERSION__.date + ")"],
                    ['SQL/Function:', __DATASET__.sql],
                    ['Creation time:', getNow()],
                    ['Get help from:', 'https://github.com/yangkai-bj'],
                ];
            if (__ECHARTS__.configs.reportDownload.value == "current") {
                let dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                    (dataset.title == null ? "Current" :
                        (dataset.title.trim() == "" ? "Current" : dataset.title));
                sheetNames.push(sheetname);
                sheets.push(comment);
                sheetNames.push("Comment");
                let title = __SQLEDITOR__.title != null ? __SQLEDITOR__.title.split("_")[0] : prompt("请输入文件名称:");
                if (title != null && title.trim() != "")
                    openDownloadDialog(workbook2blob(sheets, sheetNames), title + ".xlsx");
            } else if (__ECHARTS__.configs.reportDownload.value == "all-single") {
                if (__DATASET__["result"].length <= 255) {
                    let res = true;
                    if (__DATASET__["result"].length > 3)
                        res = confirm("您确定下载 " + __DATASET__["result"].length + " 个工作表吗?");
                    if (res == true) {
                        for (let d = 0; d < __DATASET__["result"].length; d++) {
                            let dataset = __DATASET__["result"][d];
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
                            let sheetname = typeof __DATASET__["result"][d].title == "undefined" ? "Sheet" + (d + 1) :
                                (__DATASET__["result"][d].title == null ? "Sheet" + (d + 1) :
                                    (__DATASET__["result"][d].title.trim() == "" ? "Sheet" + (d + 1) : fixFileName(__DATASET__["result"][d].title)));
                            sheetNames.push(sheetname);
                        }
                        sheets.push(comment);
                        sheetNames.push("Comment");
                        let title = __SQLEDITOR__.title != null ? __SQLEDITOR__.title.split("_")[0] : prompt("请输入文件名称:");
                        if (title != null && title.trim() != "")
                            openDownloadDialog(workbook2blob(sheets, sheetNames), fixFileName(title) + ".xlsx");
                    }
                } else
                    alert("一个工作簿最多允许有255个数据表!");
            } else if (__ECHARTS__.configs.reportDownload.value == "all-multi") {
                if (__DATASET__["result"].length <= 255) {
                    let res = true;
                    if (__DATASET__["result"].length > 3)
                        res = confirm("您确定下载 " + __DATASET__["result"].length + " 个工作簿吗?");
                    if (res == true) {
                        for (let d = 0; d < __DATASET__["result"].length; d++) {
                            sheets = [];
                            sheetNames = [];
                            let dataset = __DATASET__["result"][d];
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
                            let sheetname = typeof __DATASET__["result"][d].title == "undefined" ? "Sheet" + (d + 1) :
                                (__DATASET__["result"][d].title == null ? "Sheet" + (d + 1) :
                                    (__DATASET__["result"][d].title.trim() == "" ? "Sheet" + (d + 1) : fixFileName(__DATASET__["result"][d].title)));
                            sheetNames.push(sheetname);
                            sheets.push(comment);
                            sheetNames.push("Comment");
                            openDownloadDialog(workbook2blob(sheets, sheetNames), sheetname + ".xlsx");
                            if (d < (__DATASET__["result"].length - 1)) {
                                let delay = (aoa.length * columns.length) >= 10000 ? (aoa.length * columns.length / 10000) : 1;
                                sleep(__ECHARTS__.configs.reportDownloadDelay.value * delay);
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
    remove.className = "button";
    remove.style.fontSize = "120%";
    remove.innerText = "✗";
    remove.id = "dataset-remove";
    let help_datasetremove = $("help-dataset-remove");
    remove.onclick = help_datasetremove.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            __DATASET__["result"].splice(__DATASET__.default.sheet, 1);
            if (__DATASET__.default.sheet >= __DATASET__["result"].length)
                __DATASET__.default.sheet = __DATASET__["result"].length - 1;

            if (__DATASET__["result"].length > 0) {
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
                __DATASET__.pages.default = 1;
                $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
                $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
                viewDataset(__DATASET__.default.sheet);
            } else {
                $("page-label").innerText = " ● ";
                $("dataset-label").innerText = " ● ";
                $("tableContainer").innerText = "";
            }
        }
    };
    setTooltip(remove, "删除<br>数据集");

    let pageup = document.createElement("div");
    datatools.appendChild(pageup);
    pageup.className = "button";
    pageup.innerText = "«";
    pageup.style.fontSize = "150%";
    pageup.setAttribute("label", "page-label");
    pageup.id = "dataset-page-up";
    pageup.onclick = function () {
        if (__DATASET__.pages.default > 1) {
            __DATASET__.pages.default -= 1;
            let label = $(this.getAttribute("label"));
            label.innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(pageup, "数据集<br>上一页");

    let pagecurrent = document.createElement("div");
    datatools.appendChild(pagecurrent);
    pagecurrent.className = "button";
    pagecurrent.style.fontSize = "100%";
    pagecurrent.id = "page-label";
    pagecurrent.innerText = "●";
    pagecurrent.onclick = function () {
        if (__DATASET__.result.length > 0) {
            this.innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(pagecurrent, "数据集<br>当前页");

    let pagedown = document.createElement("div");
    datatools.appendChild(pagedown);
    pagedown.className = "button";
    pagedown.innerText = "»";
    pagedown.style.fontSize = "150%";
    pagedown.setAttribute("label", "page-label");
    pagedown.id = "dataset-page-down";
    pagedown.onclick = function () {
        if (__DATASET__.pages.default < __DATASET__.pages.total) {
            __DATASET__.pages.default += 1;
            let label = $(this.getAttribute("label"));
            label.innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(pagedown, "数据集<br>下一页");

    let analysis = document.createElement("div");
    analysis.style.display = "none";
    datatools.appendChild(analysis);
    analysis.className = "button";
    analysis.innerText = "Analysis";
    analysis.style.cssFloat = "left";
    analysis.id = "Analysis";
    analysis.onclick = function () {
        let dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
    toMultiEcharts.className = "button";
    toMultiEcharts.innerText = "☶";
    toMultiEcharts.style.fontSize = "150%";
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
    toecharts.className = "button";
    toecharts.innerText = "❏";
    toecharts.style.fontSize = "150%";
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
                __DATASET__["result"][__DATASET__.default.sheet],
                __ECHARTS__.configs);
            setDragNook(mecharts, echart.getAttribute("_echarts_instance_"));
            $("page").appendChild(mecharts);
        } catch (e) {
            console.log(e);
        }
    };
    setTooltip(toecharts, "显示<br>大视图");

    let toconfigs = document.createElement("div");
    datatools.appendChild(toconfigs);
    toconfigs.className = "button";
    toconfigs.innerText = "┅";
    toconfigs.style.fontSize = "150%";
    toconfigs.style.cssFloat = "right";
    toconfigs.id = "dataset-to-configs";
    let help_echartsConfigs = $("help-select-echarts-configs");
    toconfigs.onclick = help_echartsConfigs.onclick = function () {
        let configs = __ECHARTS__.getEchartsConfigs($("tableContainer"));
        setCenterPosition($("page"), configs);
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
                __DATASET__["result"][__DATASET__.default.sheet],
                __ECHARTS__.configs);
            setDragNook(container, echart.getAttribute("_echarts_instance_"));
        } catch (e) {
            console.log(e);
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
                __DATASET__["result"][__DATASET__.default.sheet],
                __ECHARTS__.configs);
            setDragNook(container, echart.getAttribute("_echarts_instance_"));
        } catch (e) {
            console.log(e);
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
            let _width = (getAbsolutePosition(container).width * 1) + "px";
            let _height = (getAbsolutePosition(container).height * 1) + "px";
            container.innerHTML = "";
            let echart = getEcharts(
                container,
                _width,
                _height,
                __DATASET__["result"][__DATASET__.default.sheet],
                __ECHARTS__.configs);
            setDragNook(container, echart.getAttribute("_echarts_instance_"));
        } catch (e) {
            console.log(e);
        }
    };
    setTooltip(echarts, "绘制<br>视图");

    setPageThemes();

    window.onresize = function () {
        resize();
    };

    //#########################body init end#######################################
}

function getQRCode(parent,width,height,text,logoImage){
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
        logo.style.width = width/4.0 + "px";
        logo.style.height = width/4.0 * (logoImage.width/logoImage.height) + "px";
        logo.style.marginLeft = (width-width/4.0)/2 + "px";
        logo.style.marginTop = (height-width/4.0 * (logoImage.width/logoImage.height))/2 + "px";
        qr.appendChild(logo);

        new QRCode("qrcode", {
            text: text,
            width: width,
            height: height,
            colorDark: "#000000",
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });
    }catch (e) {
        console.log(e);
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
        getAbsolutePosition($("data-tools")).height) + "px";
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

function readWorkbookFromLocalFile(file) {
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

function getSubtotal(columns) {
    let container = document.createElement("div");
    container.id = "subtotal-Content";
    container.className = "subtotal-Content";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 分类计算";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let table = document.createElement("table");
    container.appendChild(table);
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
    th.innerText = "选择";
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

    let d = document.createElement("div");
    container.appendChild(d);
    d.style.height= "22px";
    span = document.createElement("span");
    span.innerHTML = "分类字段 : ";
    d.appendChild(span);
    let cols = document.createElement("select");
    cols.type = "select";
    cols.id = "subtotal_groupby";
    cols.options.add(new Option("全部", ""));
    for (let c = 0; c < columns.length; c++) {
        cols.options.add(new Option(columns[c], columns[c]));
    }
    d.appendChild(cols);
    span = document.createElement("span");
    span.innerHTML = "合并结果";
    span.style.cssFloat = "right";
    d.appendChild(span);
     let merge = document.createElement("input");
    merge.type = "checkbox";
    merge.id = "subtotal_merge";
    merge.style.marginTop= "4px";
    merge.style.cssFloat = "right";
    merge.style.width = "28px";
    d.appendChild(merge);

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
        table.appendChild(addSubtotal(columns,table.getElementsByTagName("tr").length - 1));
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
        for (let i=0;i<obj.length;i++) {
            let target = obj[i].value;
            if (merge){
                //横向合并集合
                let result = subtotal(column, target, typ[i].value);
                if (columns.length == 0) {
                    columns = result["columns"];
                    data = result["data"];
                } else {
                    let col = result["columns"][1];
                    col.id = columns.length;
                    columns.push(col);
                    for(let x=0;x<result["data"].length;x++){
                        let r = result["data"][x];
                        for(let c=0;c<data.length;c++){
                            let row = data[c];
                            if (row[column==""?"全部":column].value == r[column==""?"全部":column].value){
                                let cell = r[col.name];
                                cell.colid = col.id;
                                row[col.name] = cell;
                                break;
                            }
                        }
                    }
                }
            } else
                __DATASET__["result"].push(subtotal(column, target, typ[i].value));
        }
        if (merge)
             __DATASET__["result"].push({columns: columns,data: data, title: null});
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
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
    check.style.width = "36px";
    td.appendChild(check);
    tr.appendChild(td);

    td = document.createElement("td");
    td.style.width = "36px";
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

        let container = document.createElement("div");
        container.id = "sql-param-dialog";
        container.className = "sql-param-dialog";

        let title = document.createElement("div");
        title.className = "container-title";
        //title.className = title.id = "sql-param-title-container";
        let span = document.createElement("span");
        span.className = span.id = "sql-param-title";
        span.innerHTML = (titles == null ? "●" : "● " + titles.split("_")[0]);
        if (titles.split("_").length > 1)
            span.title = titles.split("_").join("\n● ");
        title.appendChild(span);
        let close = document.createElement("img");
        close.className = "title_close_button";
        close.src = __SYS_IMAGES__.close.image;
        close.width = __SYS_IMAGES__.close.width;
        close.height = __SYS_IMAGES__.close.height;
        title.appendChild(close);
        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        for (let i = 0; i < params.length; i++) {
            let d = document.createElement("div");
            span = document.createElement("span");
            let param = params[i].toString().substring(params[i].indexOf("{") + 1, params[i].indexOf("}"));
            span.innerHTML = param + " : ";
            d.appendChild(span);
            let value = document.createElement("input");
            value.className = "sql-param-value";
            value.setAttribute("param", param.toString());
            value.style.cssFloat = "right";
            try {
                if (__SQLEDITOR__.parameter[param.toString()] != null)
                    value.value = __SQLEDITOR__.parameter[param.toString()];
            } catch (e) {
            }
            d.appendChild(value);
            container.appendChild(d);
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
            let params = document.getElementsByClassName("sql-param-value");
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
        for (let i = 0;i <= data.length; i++) {
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
        __DATASET__["result"].push({columns: col_tmp, data: dataset, title: groupvalue});
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
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let table = document.createElement("table");
    container.appendChild(table);
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
    th.innerText = "选择";
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

        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
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
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let tableContent =document.createElement("div");
    tableContent.className = "data_filter_table_Content";
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
    th.innerText = "选择";
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

    let checkall = document.createElement("div");
    checkall.className = "button";
    checkall.innerText = "全选";
    checkall.onclick = function(){
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (let i=0;i<filters.length;i++){
            filters[i].checked = true;
            filters[i].setAttribute("checked","checked");
        }
    };
    tool.appendChild(checkall);

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
        let column = columns[Number(colid)].name;
        for (let i=0; i<data.length;i++) {
            let row = data[i];
            for (let v=0;v<values.length;v++){
                if (row[column].value == values[v]){
                    let r ={};
                    for(col in row){
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
        __DATASET__["result"].push({columns: columns, data: dataset, title: null});
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / Number(__ECHARTS__.configs.reportPageSize.value));
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
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
    li.innerHTML = "● 筛选";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        if (__DATASET__.result.length > 0) {
            let datafilter = getDataFilter(this.getAttribute("colid"));
            setCenterPosition($("page"),datafilter);
        }
    };
    ul.appendChild(li);

    li = document.createElement("li");
    li.id = "table-column-menu-formater";
    li.innerHTML = "● 格式";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        let formater = getFormat(this.getAttribute("colid"));
        setCenterPosition($("page"),formater);
    };
    ul.appendChild(li);

    return ul;
}

function getFormat(colid) {
    let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
    let style = __DATASET__.result[__DATASET__.default.sheet].data[0][columns[Number(colid)].name].style;

    let container = document.createElement("div");
    container.id = "table-data-format";
    container.className = "table-data-format";
    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 格式设置 [ " + columns[Number(colid)].name + " ]";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let items = document.createElement("div");
    items.className = "table-data-format-items";
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
            for (col in row){
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
    let themes = $("help-select-user-themes");
    themes.options.add(new Option("默认", "themes/default.css"));
    themes.options.add(new Option("黑色", "themes/black.css"));
    themes.options.add(new Option("粉色", "themes/pink.css"));
    themes.options.add(new Option("墨绿", "themes/blackish-green.css"));
    try {
        let theme = getUserConfig("pagethemes");
        if (theme != null)
            themes.value = getUserConfig("pagethemes");
        else
            themes.selectedIndex = 0;
    } catch (e) {
        console.log(e);
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
    };

    let mapconfig = $("help-local-map-config");
    let localmap = $("help-local-map");
    mapconfig.onclick = localmap.onclick = function () {
        let config = geoCoordMap.getMapConfig();
        setCenterPosition($("page"),config);
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

function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    let count = 0;
    for (let i in object) count++;
    return count;
}

function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true);//默认为true
}

function CompareObj(objA, objB, flag) {
    if (!isObj(objA)&&!isObj(objB)){
        flag = objA==objB;
    }
    else {
        for (let key in objA) {
            if (!flag) //跳出整个循环
                break;
            if (!objB.hasOwnProperty(key)) {
                flag = false;
                break;
            }
            if (!isArray(objA[key])) { //子级不是数组时,比较属性值
                if (objB[key] != objA[key]) {
                    flag = false;
                    break;
                }
            } else {
                if (!isArray(objB[key])) {
                    flag = false;
                    break;
                }
                let oA = objA[key], oB = objB[key];
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (let k in oA) {
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = CompareObj(oA[k], oB[k], flag);
                }
            }
        }
    }
    return flag;
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
                } catch (err) {
                    console.log(err);
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
        console.log(e);
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
                    } catch (err) {
                        console.log(err);
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
//拖拽的实现
var dragParams = {
    target: null,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

function setDialogDrag(bar, callback) {
    //获取相关CSS属性
    function getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    };

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
};






