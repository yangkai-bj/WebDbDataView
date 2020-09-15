
var __CONFIGS__ = {
    STORAGE: {
        DATABASES: "__WEB_SQLITE_DATABASES__",
        SCRIPTS: "__WEB_SQLITE_SCRIPTS__",
        DATASET: "__WEB_SQLITE_DATASET__",
        CONFIGS: "__WEB_SQLITE_USER_CONFIGS"
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
     Separator: {value: 0, name: "分隔符", type: "select", options: [",", "|", "\t"]},
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
         options: ["int", "varchar", "nvarchar", "decimal", "float", "date", "datetime", "boolean", "blob"],
         width: "75px"
     },
     length: {value: 0, name: "长度", type: "input", width: "25px"},
     scale: {value: 0, name: "小数位数", type: "input", width: "50px"},
     allowNull: {value: true, name: "允许空值", type: "select", options: ["Y", "N"], width: "50px"},
     index: {value: false, name: "索引", type: "checkbox", width: "50px"},
 };
 var __DATASET__ = {
     sql: "",
     time: "",
     result: [],
     default: {sheet: 0, column: null, cell: []},
     pages: {size: 200, total: 0, default: 1},
     echarts: {
         type: "Bar",
         theme: "",
     },
     table: {
         entity: null,
         tomove: null,
         init: function (tb) {
             this.entity = tb;
             this.entity.style.fontSize = __ECHARTS__.configs.reportFontSize.value;
             let table = this;

             function setEvent(ob) {
                 for (var i = 0; i < ob.length; i++) {
                     if (ob[i].type == "td") {
                         ob[i].ondblclick = function () {
                             var msg = "";
                             var value = JSON.parse(this.getAttribute("value"));
                             for (var key in value) {
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
                                 for (var j = 0; j < table.entity.rows.length; j++) {
                                     table.entity.rows[j].cells[table.tomove.cellIndex].width = table.tomove.width;
                                 }
                                 table.entity.offsetWidth += (event.x - table.tomove.oldX);
                             }
                             if ((table.tomove.oldHeight + (event.y - table.tomove.oldY)) > 0) {
                                 table.tomove.height = table.tomove.oldHeight + (event.y - table.tomove.oldY);
                                 table.tomove.style.height = table.tomove.height;
                                 table.tomove.style.cursor = 'row-resize';
                                 let cell = table.tomove.parentNode.getElementsByTagName("td");
                                 for (var r = 0; r < cell.length; r++) {
                                     cell[r].height = table.tomove.height;
                                 }
                                 table.entity.offsetHeight += (event.y - table.tomove.oldY);
                             }
                         }
                     };
                 }
             }

             let tr = table.entity.getElementsByTagName("tr");
             for (var i = 0; i < tr.length; i++) {
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
         textarea.placeholder= "\n" +
        "F10 自动完成\n" +
        "F11 全屏编辑切换;Esc 取消全屏\n"  +
        "Shift-F 查找\n" +
        "Shift-Ctrl-F 查找替换\n" +
        "Shift-Ctrl-R 查找全部并替换\n";
         this.codeMirror = CodeMirror.fromTextArea(textarea, this.options);
         var colors = ["#fcc", "#ccf", "#fcf", "#aff", "#cfc", "#f5f577"];
         var rulers = [];
         for (var i = 1; i <= 6; i++) {
             rulers.push({color: colors[i], column: i * 40, lineStyle: "dotted"});
             //solid//dashed//dash-dot//dotted
         }
         this.codeMirror.setOption("rulers", rulers);
         this.codeMirror.on("gutterClick", function (cm, n) {
             var info = cm.lineInfo(n);
             cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : marker());
         });
         function marker() {
             var marker = document.createElement("div");
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
    var encodedStr = "" ;
    if (str=="")
        return encodedStr ;
    else {
        for (var i = 0 ; i < str.length ; i ++){
            encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
        }
    }
    return encodedStr;
}

function messageDecode(str){
    var decodeStr = "";
    if (str == "")
        return decodeStr ;
　　var toParse = str.split(";");
　　for (var i=0;i<toParse.length;i++) {
　　　　var s = toParse[i];
　　　　decodeStr += String.fromCharCode(parseInt(s.substring(2)))
　　}
　　return decodeStr;
}

Date.prototype.Format = function(fmt) {
    //#######################################################################
    // 来自网络算法,用于日期格式定义，不支持yyyyMMdd格式
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    //#######################################################################
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                     //日
        "h+": this.getHours(),                    //小时
        "m+": this.getMinutes(),                  //分
        "s+": this.getSeconds(),                  //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
        "S": this.getMilliseconds()              //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.isNumber = function(){
     //用于判断字符串是否是符合数字
    var str = this.toString();
    var reg = new RegExp(/^([-+])?\d+(\.[0-9]{1,19})?$/);
    //var result = reg.exec(str);
    var result = str.match(reg,"g");
    var re = false;
    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isIDnumber = function(){
    //用于简单判断18位身份证号码
    //校验年份范围1900-2099
    var str = this.toString();
    var reg = RegExp(/^\d{6}((19|20)\d{2}(01|02|03|04|05|06|07|08|09|10|11|12)(01|02|03|04|05|06|07|08|09|10|11|12|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\d{3}[0-9xX])/,"g");
    var result = str.match(reg,"g");
    var re = false;
    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isDatetime = function () {
    var str = this.toString();
    try {
        var d = new Date(str);
        if (d.toString() == "Invalid Date")
            return false;
        else
            return true;
    } catch (e) {
        return false;
    }
};

String.prototype.replaceAll = function(search, replacement) {
    // 没有解决search参数中存在正则表达式符号的问题,
    // 不能采用replace(new RegExp(search, 'g'), replacement)方法;
    var target = this;
    try {
        while (target.includes(search)) {
            target = target.replace(search, replacement);
        }
    }catch (e) {
        console.log(e);
    }
    return target;
};


function transferData(structure,row){
    //####################################
    //用于数据导入的行数据转换
    //读取当前数据表结构
    //####################################
    var types = structure["data"];
    var _row = [];
    for(var i=0; i<row.length; i++){
        var type = types[i].Type.value;
        var p = type.indexOf("(");
        if (p > 0){
            type = type.substring(0,p);
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
    return _row;

}
function importData(){
    //#######################################
    //默认行分隔符:\r\n
    //数据分隔符:支持|,\t
    //#######################################
    __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
        try {
            var sep = __IMPORT__.Separator.options[__IMPORT__.Separator.value];
            var lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\r\n");
            if (lines.length == 1)
                lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\n");
            var table = __CONFIGS__.CURRENT_TABLE.name;
            __IMPORT__.SourceFile.total = lines.length - 1;
            //不含表头
            __IMPORT__.SourceFile.count = 0;
            __IMPORT__.SourceFile.imported = 0;
            __IMPORT__.SourceFile.failed = 0;
            var sql = "insert into " + table + " values ({VALUES})";
            //不要加字段列表，否则仅能导入两列数据.
            for (var i = 0; i < lines.length; i++) {
                var data = transferData(__CONFIGS__.CURRENT_TABLE.structure, lines[i].trim().split(sep));
                if (i == 0) {
                    var values = "?";
                    for (var c = 1; c < data.length; c++) {
                        values += ",?"
                    }
                    sql = sql.replace("{VALUES}", values);

                    viewMessage(sql);
                } else {
                    tx.executeSql(sql, data, function (tx, results) {
                            __IMPORT__.SourceFile.count += 1;
                            __IMPORT__.SourceFile.imported += results.rowsAffected;
                            viewMessage("导入第 " + __IMPORT__.SourceFile.count + " 条记录.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]")
                        },
                        function (tx, error) {
                            __IMPORT__.SourceFile.count += 1;
                            __IMPORT__.SourceFile.failed += 1;
                            viewMessage("第 " + __IMPORT__.SourceFile.count + " 条记录错误.[ imported:" + __IMPORT__.SourceFile.imported + " failed:" + __IMPORT__.SourceFile.failed + " ]\n" + error.message)
                        });
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
    var position = {"left":0,"top":0,"width":0,"height":0};
    var w=0,h=0;
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

function getDataType(str){
     //判断字符是否符合数字规则
     try {
         str = str.trim();
         if (str.isDatetime() && str.length == 10)
             return "date";
         else if (str.isDatetime() && str.indexOf(":") != -1)
             return "datetime";
         else if (str.isIDnumber())
             return "nvarchar";
         else if (str.isNumber() && isNaN(Number.parseInt(str)) == false && str.indexOf(".") == -1)
             return "int";
         else if (str.isNumber() && isNaN(Number.parseFloat(str)) == false)
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
     var type = typeof(d);
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
        for(var i=0;i<d.length;i++){
            if (d[i].trim() != "" && d[i] != null)
                row.push(d[i]);
        }
        return row;
    }

    function addUp(row, id){
        let index = null;
        for (var i=0;i<addup.length;i++){
            if (addup[i].columns == row.length) {
                index = i;
                break;
            }
        }
        if (index == null)
            addup.push({columns:row.length,start:id,count:1,lines:[row]});
        else {
            addup[i].count += 1;
            addup[i].lines.push(row);
        }
    }

    function getStart(){
        let index = 0;
        let max = 0;
        for(var i=0;i<addup.length;i++){
            if (addup[i].count > max){
                index = i;
                max = addup[i].count;
            }
        }
        return addup[index];
    }

    for (var i =0;i<data.length;i++){
        addUp(washData(data[i].trim().split(sep)),i);
    }

    return getStart();
}

function getStructFromData() {
    let sep = __IMPORT__.Separator.options[__IMPORT__.Separator.value];
    var lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\r\n");
    if (lines.length == 1)
        lines = __IMPORT__.SourceFile.data[__IMPORT__.SelectedDataSet.value].split("\n");

    let start = structInspect(lines.slice(0,lines.length>1000?1000:lines.length),sep);
    //检测样本为前1000条数据
    var columns = start.lines[0];
    var data = start.lines[1];

    var stru = [];
    for (var i=0;i<columns.length;i++) {
        var col = {};
        for (var index in __COLUMN__) {
            switch (index) {
                case "check":
                    col[index] = true;
                    break;
                case "name":
                    col[index] = columns[i];
                    break;
                case "type":
                    col[index] = getDataType(data[i].toString());
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
                    col[index] = "N";
                    break;
            }
        }
        stru.push(col);
    }
    return stru;
}

function createTable(structure) {
    var container = document.createElement("div");
    container.type = "div";
    container.className = "create-table-Content";
    container.id = "create-table-Content";

    let d = document.createElement("div");
    let span = document.createElement("span");
    span.innerHTML = "创建数据表 : ";
    d.appendChild(span);
    container.appendChild(d);
    container.innerHTML += "<hr>";

    var title = document.createElement("input");
    title.id = "table-Title";
    title.placeholder = "请输入数据表名称.";
    if (structure != null)
        title.value = structure["title"];
    title.style.width = "99.2%";
    container.appendChild(title);

    var tablecontainer = document.createElement("div");
    tablecontainer.className = "table-container";
    container.appendChild(tablecontainer);

    var tb = document.createElement("table");
    tablecontainer.appendChild(tb);
    tb.className = "table";
    tb.style.width = "100%";
    tb.id = "table-Content";
    var tr = document.createElement("tr");
    tb.appendChild(tr);
    for (var index in __COLUMN__) {
        var th = document.createElement("th");
        tr.appendChild(th);
        th.innerText = __COLUMN__[index].name;
    }
    var cols = 3;
    if (structure != null)
        cols = structure["stru"].length;

    for (var rows = 0; rows < cols; rows++) {
        tr = document.createElement("tr");
        if (rows % 2 > 0) {
            tr.className = "alt-line";
            //单数行
        }
        tb.appendChild(tr);
        for (var index in __COLUMN__) {
            var td = document.createElement("td");
            tr.appendChild(td);
            var attri;
            if (__COLUMN__[index].type == "select") {
                attri = document.createElement("select");
                attri.className = index;
                attri.type = __COLUMN__[index].type;
                for (var i = 0; i < __COLUMN__[index].options.length; i++) {
                    attri.options.add(new Option(__COLUMN__[index].options[i], __COLUMN__[index].options[i]));
                }
                if (structure != null)
                    for (var s = 0; s < attri.options.length; s++) {
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
                        attri.value = __COLUMN__[index].value;
                    else
                        attri.value = structure["stru"][rows][index];
                }
            }
            attri.style.width = __COLUMN__[index].width;
            td.appendChild(attri);
        }
    }

    var tool = document.createElement("div");
    tool.className = "tools-container";
    tool.style.cssFloat = "left";
    container.appendChild(tool);

    var add = document.createElement("a");
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
        for (var index in __COLUMN__) {
            var td = document.createElement("td");
            tr.appendChild(td);
            var attri;
            if (__COLUMN__[index].type == "select") {
                attri = document.createElement("select");
                attri.className = index;
                attri.type = __COLUMN__[index].type;
                for (var i = 0; i < __COLUMN__[index].options.length; i++) {
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

    var del = document.createElement("a");
    del.className = "button";
    del.innerHTML = "删除";
    del.onclick = function () {
        let table = $("table-Content");
        let columns = table.getElementsByTagName("tr");
        if (columns.length > 2) {
            for (var i = columns.length - 1; i > 1; i--) {
                var checks = columns[i].getElementsByClassName("check");
                if (checks[0].checked == true) {
                    table.removeChild(columns[i]);
                }
            }
        } else {
            alert("至少保留一个字段.");
        }
    };
    tool.appendChild(del);

    var b = document.createElement("a");
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
                for (var i = 1; i < rows.length; i++) {
                    var col = {};
                    for (var index in __COLUMN__) {
                        var column = rows[i].getElementsByClassName(index)[0];
                        if (column.type == "checkbox") {
                            col[index] = column.checked;
                        } else {
                            col[index] = column.value;
                        }
                    }
                    stru.push(col);
                }
                var title = $("table-Title");
                if (title.value != "") {
                    var sql = getCreateTableSql(title.value, stru);
                    viewMessage(sql);
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            var aff = results.rowsAffected;
                            var len = results.rows.length;
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
    b.onclick = function () {
        var container = $("create-table-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);
    return container;
}

function  getCreateTableSql(title, stru) {
    //根据选项生成建表SQL
    var cols = " (";
    var key = "";
    for (var i=0;i<stru.length;i++) {
        if (stru[i].check == true && stru[i].name != "") {
            cols += stru[i].name + " " + stru[i].type;
            if (stru[i].type =="decimal" || stru[i].type == "float"){
                cols +="(" + stru[i].length + "," + stru[i].scale + ")"
            }
            if (stru[i].type =="nvarchar" || stru[i].type == "varchar"){
                cols +="(" + stru[i].length + ")"
            }
            if (stru[i].allowNull =="N"){
                cols += " NOT NULL,"
            }else {
                cols += ","
            }
            if (stru[i].index == true){
                key += stru[i].name + ","
            }
        }
    }
    var sql = "CREATE TABLE " + title + cols.substring(0,cols.length-1);
    if (key != ""){
        sql += ",PRIMARY KEY (" + key.substring(0, key.lastIndexOf(",")) + "))"
    } else{
        sql += ")"
    }
    return sql;
}

function createDatabase(){
    var container = document.createElement("div");
    container.type = "div";
    container.className = "create-database-Content";
    container.id = "create-database-Content";

    let d = document.createElement("div");
    let span = document.createElement("span");
    span.innerHTML = "创建数据库 : ";
    d.appendChild(span);
    container.appendChild(d);
    container.innerHTML += "<hr>";

    for (var name in __DATABASE__) {
        d = document.createElement("div");
        container.appendChild(d);
        var s = document.createElement("span");
        s.innerHTML = __DATABASE__[name].name + ":";
        d.appendChild(s);
        if (__DATABASE__[name].type == "text"){
            var input = document.createElement("input");
            input.id = name;
            input.type = "text";
            input.value = __DATABASE__[name].value;
            input.onchange = function(){
                __DATABASE__[this.id].value = this.value;
            };
            d.appendChild(input);
        }
    }
    var tool = document.createElement("div");
    tool.className = "tools-container";
    tool.style.cssFloat= "left";
    container.appendChild(tool);

    var b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "创建";
    b.onclick = function(){
        if (checkStorage()) {
            if (__DATABASE__.Name != "") {
                var db = {"name": __DATABASE__.Name.value,"version" : __DATABASE__.Version.value, "description": __DATABASE__.Description.value, "size": __DATABASE__.Size.value};
                var storage = window.localStorage;
                var dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                var index = -1;
                for (var i=0;i<dbs.length;i++){
                    if (dbs[i].name == __DATABASE__.Name.value) {
                        index = i;
                        break;
                    }
                }
                if (index == -1)
                    dbs.push(db);
                else {
                    var isOver = confirm("数据库 " + __DATABASE__.Name.value + " 已经存在,是否修改相关信息?");
                    if (isOver)
                        dbs[index] = db;
                }
                storage.setItem(__CONFIGS__.STORAGE.DATABASES, JSON.stringify(dbs));
                viewDatabases();
                var container =$("create-database-Content");
                container.parentNode.removeChild(container);
            }
        }
    };
    tool.appendChild(b);
    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = function(){
        var container=$("create-database-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);
    return container;
}

function getImportContent() {
    var container = document.createElement("div");
    container.type = "div";
    container.className = "import-Content";
    container.id = "import-Content";

    let d = document.createElement("div");
    let span = document.createElement("span");
    span.innerHTML = "导入数据 :";
    d.appendChild(span);
    container.appendChild(d);
    container.innerHTML += "<hr>";

    for (var name in __IMPORT__) {
        d = document.createElement("div");
        container.appendChild(d);
        var s = document.createElement("span");
        s.innerHTML = __IMPORT__[name].name + " :";
        d.appendChild(s);
        if (__IMPORT__[name].type == "view") {
            var v = document.createElement("span");
            v.id = "table-title";
            v.innerHTML = "[ " + __CONFIGS__.CURRENT_TABLE.name + " ]";
            d.appendChild(v);
        } else if (__IMPORT__[name].type == "select") {
            var input = document.createElement("select");
            input.id = name;
            for (var i = 0; i < __IMPORT__[name].options.length; i++) {
                input.options.add(new Option(__IMPORT__[name].options[i], i));
            }
            input.value = __IMPORT__[name].value;
            input.onchange = function(){
                __IMPORT__[this.id].value = this.value;
            };
            d.appendChild(input);
        } else {
            var input = document.createElement("input");
            input.id = name;
            try {
                input.type = __IMPORT__[name].type;
                if (input.type == "file") {
                    input.accept = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/plain,.csv";
                    input.onchange = function () {
                        if (window.FileReader) {
                            try {
                                var file = this.files[0];
                                var filetype = file.name.split(".")[1];
                                __IMPORT__.SourceFile.value = file.name;
                                __IMPORT__.SourceFile.data = [];
                                let selectDataSet = $("SelectedDataSet");
                                for (var i = selectDataSet.length - 1; i >= 0; i--) {
                                    selectDataSet.remove(i);
                                }
                                if (filetype.toUpperCase() == "TXT" || filetype.toUpperCase() == "CSV") {
                                    var reader = new FileReader();
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
    var tool = document.createElement("div");
    tool.className = "tools-container";
    tool.style.cssFloat= "left";
    tool.style.width = "100%";
    container.appendChild(tool);

    var b = document.createElement("a");
    b.className = "button";
    b.id = "import-button";
    b.innerHTML = "导入";
    b.onclick = function(){
        if (__CONFIGS__.CURRENT_TABLE.name == "" || __CONFIGS__.CURRENT_TABLE.type == "view"){
            var conf = confirm("您没有选择数据表，是否要根据数据结构创建一个名称为 " + __IMPORT__.SourceFile.value.split(".")[0] + " 的新表?");
            if (conf) {
                var title = __IMPORT__.SourceFile.value.split(".")[0];
                var posi = getAbsolutePosition(this);
                var tb = createTable({"title": title, "stru": getStructFromData()});
                var main = $("page");
                tb.style.top = posi.top + "px";
                tb.style.lef = posi.left + "px";
                main.appendChild(tb);
                $("import-Content").parentNode.removeChild($("import-Content"));
            }
        } else {
            if (this.parentNode.firstChild.id == "progress")
                this.parentNode.removeChild(this.parentNode.firstChild);
            this.parentNode.insertBefore(getImportProgress(), this);
            console.log($("SelectedDataSet").length);
            if ($("SelectedDataSet").length > 0)
                importData();
            else
                alert("请选择需要导入的文件及数据集合.");
            //var container =$("import-Content");
            //container.parentNode.removeChild(m);
        }
    };
    tool.appendChild(b);
    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "退出";
    b.onclick = function(){
        let container =$("import-Content");
        container.parentNode.removeChild(container);
    };
    tool.appendChild(b);
    return container;
}

function getImportProgress(){
    var container = document.createElement("div");
    container.id = "progress";
    var v = document.createElement("div");
    container.appendChild(v);
    v.id = "progress-value";
    var progress = setInterval(function(){Timer()},50);
    function Timer(){
        try {
            var value = __IMPORT__.SourceFile.count / __IMPORT__.SourceFile.total;
            var v = $("progress-value");
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
    var storage = window.localStorage;
    if (storage.getItem(__CONFIGS__.STORAGE.DATABASES) == null){
        storage.setItem(__CONFIGS__.STORAGE.DATABASES,"[]")
    }
    var dbslist = $("sidebar-dbs");
    dbslist.innerText = "";
    var ul = document.createElement("ul");
    ul.style.width = "80%";
    ul.style.position = "relative";
    dbslist.appendChild(ul);
    __CONFIGS__.DATABASES = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
    for (var i = 0; i < __CONFIGS__.DATABASES.length; i++){
        if (__CONFIGS__.DATABASES[i].name != null) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.className = "list";
            a.innerText = __CONFIGS__.DATABASES[i].name;
            a.setAttribute("index", i);
            a.id = __CONFIGS__.DATABASES[i].name;
            a.onclick = function () {
                var dbs = $("sidebar-dbs");
                var l = dbs.getElementsByClassName("list");
                for (var i=0; i<l.length; i++ ){
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
                    for(var key in __CONFIGS__.CURRENT_DATABASE.value) {
                        var l = document.createElement("li");
                        $("ul-db-" + this.id).appendChild(l);
                        var inf = document.createElement("a");
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
            var dul = document.createElement("ul");
            dul.id = "ul-db-" + __CONFIGS__.DATABASES[i].name;
            dul.setAttribute("isOpen","false");
            li.appendChild(dul);
            ul.appendChild(li);
        }
    }
}

function getNow() {
    var date = new Date();
	var time = date.toLocaleString("zh", { hour12: false });
	time += " " + date.getMilliseconds();
	return time;
}

function viewMessage(msg){
    var msgbox = $("messageBox");
    var dt = document.createElement("dt");
    dt.type = "dt";
    dt.className = "dt";
    dt.innerText = getNow();
    var first = msgbox.firstChild;
    msgbox.insertBefore(dt, first);

    var message = document.createElement("dd");
    message.type = "dd";
    message.className= "message";
    message.innerText = msg;
    dt.appendChild(message);

    //保留日志设置
    if (__CONFIGS__.MAXLOGS > 0) {
        var dts = msgbox.getElementsByClassName("dt");
        if (dts.length > __CONFIGS__.MAXLOGS) {
            msgbox.removeChild(dts[dts.length - 1]);
        }
    }
}

function viewTables(index) {
    var database = __CONFIGS__.DATABASES[index];
    var db = openDatabase(database.name, database.version, database.description, eval(database.size));
    __CONFIGS__.CURRENT_DATABASE.index = index;
    __CONFIGS__.CURRENT_DATABASE.value = database;
    __CONFIGS__.CURRENT_DATABASE.connect = db;
    __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
        var sql ="SELECT type, name, tbl_name as 'tablename', rootpage, '' AS 'remarks' FROM sqlite_master WHERE type in ('table','view') and tbl_name not like '%_SYSTEM_%' " +
            "UNION ALL " +
            "SELECT type, name, tbl_name as 'tablename', rootpage, 'Temporary' AS 'remarks' FROM sqlite_temp_master WHERE type = 'table' and tbl_name not like '%_SYSTEM_%' " +
            "ORDER BY type, tbl_name";
        tx.executeSql(sql, [], function (tx, results) {
            var tbs = $("sidebar-tbs");
            tbs.innerText = "";
            var ul = document.createElement("ul");
            ul.style.width = "80%";
            ul.style.position = "relative";
            tbs.appendChild(ul);
            var len = results.rows.length;
            var tables = [];
            var hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
            for (var i = 0; i < len; i++){
                if(results.rows.item(i).tablename != "__WebKitDatabaseInfoTable__" && results.rows.item(i).tablename != "") {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    li.appendChild(a)
                    a.className = "list";
                    hintOptions.tables[results.rows.item(i).tablename] = [];
                    __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);
                    a.innerText = results.rows.item(i).tablename;
                    a.id = results.rows.item(i).tablename;
                    a.setAttribute("type",results.rows.item(i).type);
                    tables.push(results.rows.item(i).tablename);
                    a.draggable = "true";
                    a.ondragstart = function (event) {
                        event.dataTransfer.setData("Text", event.target.id);
                    };
                    a.onclick = function(){
                        __CONFIGS__.CURRENT_TABLE.name = this.id;
                        __CONFIGS__.CURRENT_TABLE.type = this.getAttribute("type");
                        __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                            var sql = "select sql from sqlite_master where type in ('table','view') and name='" + __CONFIGS__.CURRENT_TABLE.name + "'";
                            //仅获取表结构，忽略视图.
                            viewMessage(sql);
                            tx.executeSql(sql, [],
                                function (tx, results) {
                                    var len = results.rows.length;
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
                                            var columns = [];
                                            for (var m = 0; m < __CONFIGS__.CURRENT_TABLE.structure.data.length; m++) {
                                                var l = document.createElement("li");
                                                $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).appendChild(l);
                                                var col = document.createElement("a");
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
                                            var hintOptions = __SQLEDITOR__.codeMirror.getOption("hintOptions");
                                            hintOptions.tables[__CONFIGS__.CURRENT_TABLE.name] = columns;
                                            __SQLEDITOR__.codeMirror.setOption("hintOptions", hintOptions);

                                            $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).setAttribute("isOpen","true");
                                        } else {
                                            $("ul-tb-" + __CONFIGS__.CURRENT_TABLE.name).setAttribute("isOpen","false");
                                        }
                                    }
                                },
                                function (tx, err) {
                                    viewMessage(err.message);
                                    __CONFIGS__.CURRENT_TABLE.sql = "";
                                    __CONFIGS__.CURRENT_TABLE.structure = {"columns":[],"data":[]};
                                    __CONFIGS__.CURRENT_TABLE.type = "";
                                });
                        });

                        var tbs = $("sidebar-tbs");
                        var l = tbs.getElementsByClassName("list");
                        for (var i=0; i<l.length; i++ ){
                            l[i].style.fontWeight = "normal";
                        }
                        this.style.fontWeight="bold";
                    };
                    var colul = document.createElement("ul");
                    colul.id = "ul-tb-" + results.rows.item(i).tablename;
                    colul.setAttribute("isOpen","false");
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

function orderDataset(colid){
    // 对数据排序
    // 中文比较大小使用localeCompare
    var index = __DATASET__.default.sheet;
    var columns = __DATASET__["result"][index].columns;
    var data = __DATASET__["result"][index].data;
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
    __DATASET__["result"][index].columns = columns;

    var tmp = [];
    for (var i=0; i<data.length; i++) {
        let row = data[i];
        for (var x = 0; x < tmp.length; x++) {
            switch (columns[colid].order) {
                case "asc":
                    if (row[columns[colid].name].type == "number") {
                        if (row[columns[colid].name].value < tmp[x][columns[colid].name].value) {
                            let t = tmp[x];
                            tmp[x] = row;
                            row = t;
                        }
                    } else {
                        if (row[columns[colid].name].value.toString().localeCompare(tmp[x][columns[colid].name].value.toString()) < 0) {
                            let t = tmp[x];
                            tmp[x] = row;
                            row = t;
                        }
                    }
                    break;
                case "desc":
                    if (row[columns[colid].name].type == "number") {
                        if (row[columns[colid].name].value > tmp[x][columns[colid].name].value) {
                            let t = tmp[x];
                            tmp[x] = row;
                            row = t;
                        }
                    } else {
                        if (row[columns[colid].name].value.toString().localeCompare(tmp[x][columns[colid].name].value.toString()) > 0) {
                            let t = tmp[x];
                            tmp[x] = row;
                            row = t;
                        }
                    }
                    break;
            }
        }
        tmp[tmp.length] = row;
    }
    //Reset rowid
    for(var i=0;i<tmp.length;i++){
        let row = tmp[i];
        for (column in row){
            row[column].rowid = i;
        }
    }
    __DATASET__["result"][index].data = tmp;
    viewDataset(index);
}

function datasetTranspose(index) {
    //数据转置
    try {
        var columns = __DATASET__["result"][index].columns;
        var data = __DATASET__["result"][index].data;
        var dataset = {columns: [], data: []};
        var col = {
            id: 0,
            name: columns[0].name,
            order: "",
            type: "string",
            style: columns[0].style
        };
        dataset.columns.push(col);
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            col = {
                id: i + 1,
                name: row[columns[0].name].value,
                order: "",
                type: row[columns[0].name].type,
                style: row[columns[0].name].style
            };
            dataset.columns.push(col);
        }

        for (var c = 1; c < columns.length; c++) {
            var nr = {};
            nr[columns[0].name] = {
                rowid: c - 1,
                colid: 0,
                value: columns[c].name,
                type: "string",
                style: columns[c].style
            };
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
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
    }catch (e) {
        console.log(e);
    }
}

function viewDataset(index){
    let container = $("tableContainer");
    container.innerText = "";
    let columns = __DATASET__["result"][index].columns;
    let data = __DATASET__["result"][index].data;
    let table = document.createElement("table");
    table.className = "table";
    table.id = "table";
    var tr = document.createElement("tr");
    tr.type = "tr";
    table.appendChild(tr);

    for (var c =0; c < columns.length; c++) {
        var th = document.createElement("th");
        th.type = "th";
        th.innerText = columns[c].name;
        th.style.textAlign = columns[c].style.textAlign;
        var menu = document.createElement("li");
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

        var order = document.createElement("span");
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
            orderDataset(this.getAttribute("colid"));
        };
        th.appendChild(order);
        tr.appendChild(th);
    }

    for (var i = 0; i < data.length; i++) {
        if (i >= (__DATASET__.pages.default - 1) * __DATASET__.pages.size && i < __DATASET__.pages.default * __DATASET__.pages.size) {
            var tr = document.createElement("tr");
            tr.type = "tr";
            tr.id = i;
            if (i % 2 > 0) {
                tr.className = "alt-line";
                //单数行
            }
            table.appendChild(tr);
            var row = data[i];
            for (var c = 0; c < columns.length; c++) {
                var item = row[columns[c].name];
                var td = document.createElement("td");
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
                    var _style = "";
                    for (var key in item.style) {
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
    var is = false;
    if (num <0)
        is = true;
    num = Math.abs(num);
    var strarr = num?num.toString().split('.'):['0'];
    var fmtarr = pattern?pattern.split('.'):[''];
    var retstr='';
    // 整数部分
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length-1;
    var comma = false;
    for(var f=fmt.length-1;f>=0;f--){
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
        var l = str.length;
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
    for(var f=0;f<fmt.length;f++){
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
    var reg = new RegExp(/\{[a-zA-Z0-9\u4e00-\u9fa5]+\}/, "g");
    var params = sql.match(reg);
    if (params != null) {
        //参数去重
        var temp = [];
        for (var i = 0; i < params.length; i++) {
            if (temp.indexOf(params[i]) === -1)
                temp.push(params[i]);
        }
        params = temp.slice(0);
        for (var i = 0; i < params.length; i++) {
            var param = params[i].toString();
            param = param.substring(param.indexOf("{") + 1, param.indexOf("}"));
            var value = prompt(param + " : ");
            if (value != null)
                sql = sql.replaceAll(params[i].toString(), value.toString());
        }
    }
    return sql;
}

function execute() {
    if (__CONFIGS__.CURRENT_DATABASE.connect != null) {
        __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
            var selection = "";
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();
            if (__SQLEDITOR__.parameter == null)
                selection = fillSqlParam(selection);
            else {
                for (param in __SQLEDITOR__.parameter) {
                    selection = selection.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
                }
            }
            var sqls = [];
            if (selection.trim() != "") {
                viewMessage(selection);
                $("tableContainer").innerHTML = "";
                $("page-label").innerText = " ● ";
                $("dataset-label").innerText = " ● ";
                sqls = selection.split(";");
                for (var s = 0; s < sqls.length; s++) {
                    var sql = sqls[s].slice(0).trim();
                    if (sql.trim() == "")
                        continue;
                    __DATASET__["sql"] = sql;
                    __DATASET__["time"] = getNow();
                    __DATASET__["result"] = [];
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            var aff = results.rowsAffected;
                            var len = results.rows.length;
                            if (len > 0) {
                                viewMessage("数据库返回 " + len + " 条记录.");
                                //##################################
                                //取表头
                                //##################################
                                var columns = [];
                                var co = 0;
                                var r = JSON.parse(JSON.stringify(results.rows.item(0)));
                                for (var key in r) {
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
                                var data = [];
                                for (var i = 0; i < len; i++) {
                                    var row = {};
                                    var r = JSON.parse(JSON.stringify(results.rows.item(i)));
                                    for (var c = 0; c < columns.length; c++) {
                                        var _value = r[columns[c].name];
                                        var _type = getTypeOf(_value);
                                        var _format = null;
                                        var _align = "left";
                                        var _color = "black";
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
                                __DATASET__["result"].push({"columns": columns, "data": data});

                                if (__DATASET__["result"].length > 0) {
                                    __DATASET__.default.sheet = 0;
                                    __DATASET__.pages.total = Math.ceil(__DATASET__.result[0].data.length / __DATASET__.pages.size);
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

function getTableStructure(sql){
    //从SQL中解析数据表结构.
    var columns = [];
    columns.push({id: 0, name: "Name", style: {textAlign: "center"}, order: ""});
    columns.push({id: 1, name: "Type", style: {textAlign: "center"}, order: ""});
    columns.push({id: 2, name: "AllowNull", style: {textAlign: "center"}, order: ""});
    columns.push({id: 3, name: "Index", style: {textAlign: "center"}, order: ""});
    var data = [];
    var stru = sql;
    stru = stru.substring(stru.indexOf("(") + 1,stru.lastIndexOf(")"));
    stru = stru.split(",");
    var _stru = [];
    for (var i=0;i<stru.length;i++){
        if (stru[i].trim() !="") {
            if (stru[i].indexOf(")") >= 0 && stru[i].indexOf("(") == -1) {
                _stru[_stru.length - 1] += ("," + stru[i]);
            } else {
                _stru.push(stru[i]);
            }
        }
    }
    stru = _stru;
    var indexkey = [];
    for (var i=0;i<stru.length;i++) {
        var sp = stru[i].split(" ");
        var _sp = [];
        if (stru[i].toUpperCase().indexOf("PRIMARY KEY") > -1) {
            indexkey = stru[i].substring(stru[i].indexOf("(") + 1, stru[i].lastIndexOf(")")).split(",");
        } else {
            for (var s = 0; s < sp.length; s++) {
                if (sp[s].trim() != "") {
                    _sp.push(sp[s]);
                }
            }
        }
        sp = _sp;
        var row = {};
        if (sp.length == 2) {
            row["Name"] = {
                rowid: i,
                colid: 0,
                value: sp[0].replace(/[\r\n]/g,""),
                type: "string",
                format: null,
                style: {"text-align": "left", "color": "black"}
            };
            row["Type"] = {
                rowid: i,
                colid: 1,
                value: sp[1],
                type: "string",
                format: null,
                style: {"text-align": "left", "color": "black"}
            };
            row["AllowNull"] = {
                rowid: i,
                colid: 2,
                value: "Y",
                type: "string",
                format: null,
                style: {"text-align": "center", "color": "black"}
            };
            row["Index"] = {
                rowid: i,
                colid: 3,
                value: "N",
                type: "string",
                format: null,
                style: {"text-align": "center", "color": "black"}
            };
        } else if (sp.length > 2) {
            row["Name"] = {
                rowid: i,
                colid: 0,
                value: sp[0].replace(/[\r\n]/g,""),
                type: "string",
                format: null,
                style: {"text-align": "left", "color": "black"}
            };
            row["Type"] = {
                rowid: i,
                colid: 1,
                value: sp[1],
                type: "string",
                format: null,
                style: {"text-align": "left", "color": "black"}
            };
            row["AllowNull"] = {
                rowid: i,
                colid: 2,
                value: "N",
                type: "string",
                format: null,
                style: {"text-align": "center", "color": "black"}
            };
            row["Index"] = {
                rowid: i,
                colid: 3,
                value: "N",
                type: "string",
                format: null,
                style: {"text-align": "center", "color": "black"}
            };
        }
        if (JSON.stringify(row) !="{}")
            data.push(row);
    }

    if (indexkey.length > 0){
        for(var i=0;i<indexkey.length;i++){
            var key = indexkey[i];
            for(var d=0;d<data.length;d++){
                if (data[d]["Name"].value == key){
                    data[d]["Index"].value = "Y"
                }
            }
        }
    }
    return {"columns":columns,"data":data};
}

function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || '';
	// HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}

function str2ab(str) {
    //使用UTF8编码规则,涉及中文的转换.
    var codes = [];
    for (var i = 0; i != str.length; ++i) {
        var code = str.charCodeAt(i);
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
    var buf = new ArrayBuffer(codes.length);
    var result = new Uint8Array(buf);
    for (i = 0; i < codes.length; i++) {
        result[i] = codes[i] & 0xff;
    }
    return result;
}

function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx',
		bookSST: false,
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

function init() {
    if (checkStorage()) {
        $("footer").style.display = getUserConfig("help");
        $("themes").setAttribute("href", getUserConfig("pagethemes") == null ? "themes/default.css" : getUserConfig("pagethemes"));

        let config = getUserConfig("echartsconfig");
        if (config != null) {
            config = JSON.parse(config);
            for (key in config) {
                try {
                    __ECHARTS__.configs[key].value = config[key];
                }catch (e) {
                    
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
    var dbstools = $("sidebar-dbs-tools");

    var crdb = document.createElement("div");
    crdb.type = "div";
    crdb.className = "button";
    crdb.innerText = "新增";
    crdb.id = "create-database";
    let help_crdb = $("help-create-database");
    crdb.onclick = help_crdb.onclick = function () {
        var db = createDatabase();
        setCenterPosition($("page"),db);
    };
    dbstools.appendChild(crdb);
    setTooltip(crdb, "创建新的<br>数据库");

    var rmdb = document.createElement("div");
    rmdb.type = "div";
    rmdb.className = "button";
    rmdb.innerText = "删除";
    rmdb.id = "delete-database";
    rmdb.onclick = function () {
        if (__CONFIGS__.CURRENT_DATABASE.connect == null) {
            alert("请选择数据库.");
            return;
        }
        var r = confirm("确定要删除数据库 " + __CONFIGS__.CURRENT_DATABASE.value.name + " 吗?");
        if (r == true) {
            if (checkStorage()) {
                if (__CONFIGS__.CURRENT_DATABASE.value != null) {
                    var storage = window.localStorage;
                    var dbs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.DATABASES));
                    var list = [];
                    for (var i = 0; i < dbs.length; i++) {
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
    setTooltip(rmdb, "删除当前<br>数据库");

    var dbinfo = document.createElement("div");
    dbinfo.type = "div";
    dbinfo.className = "button";
    dbinfo.id = "test-button";
    dbinfo.innerText = "测试";
    dbinfo.style.display = "none";
    dbinfo.onclick = function () {
        var oba = {name:"a",value:[1,2.111111111111],par:{x:1}};
        var obb = {name:"a",value:[1,2],par:{x:1}};
        alert(Compare(oba,obb));
    };
    dbstools.appendChild(dbinfo);
    setTooltip(dbinfo, "功能测试");

    var about = document.createElement("div");
    about.type = "div";
    about.className = "button";
    about.id = "about-and-help";
    about.innerText = "帮助";
    about.style.cssFloat = "right";
    about.onclick = function () {
        if ($("footer").style.display) {
            if ($("footer").style.display == "block")
                $("footer").style.display = "none";
            else
                $("footer").style.display = "block";
        } else
            $("footer").style.display = "none";
        setUserConfig("help",$("footer").style.display);
        resize()
    };
    dbstools.appendChild(about);
    setTooltip(about, "显示或关闭帮<br>助和技术说明");


    //#######################################
    //初始化数据表菜单
    //#######################################
    var tbstools = $("sidebar-tbs-tools");
    tbstools.innerText = "";
    var crtb = document.createElement("div");
    crtb.type = "div";
    crtb.className = "button";
    crtb.id = "create-table";
    crtb.innerText = "新增";
    let help_crtb = $("help-create-table");
    crtb.onclick = help_crtb.onclick = function () {
        var tb = createTable(null);
        setCenterPosition($("page"),tb);
    };
    tbstools.appendChild(crtb);
    setTooltip(crtb, "创建一个新<br>的数据表");

    var importtb = document.createElement("div");
    importtb.type = "div";
    importtb.className = "button";
    importtb.innerText = "导入";
    importtb.id = "import-to-table";
    let help_importtb = $("help-import-data");
    importtb.onclick = help_importtb.onclick = function () {
        var im = getImportContent();
        setCenterPosition($("page"),im);
    };
    tbstools.appendChild(importtb);
    setTooltip(importtb, "导入外部数据<br>(CSV/Excel)");

    var exConstr = document.createElement("div");
    exConstr.type = "div";
    exConstr.className = "button";
    exConstr.innerText = "结构";
    exConstr.id = "show-table-construct";
    exConstr.onclick = function () {
        __DATASET__["sql"] = __CONFIGS__.CURRENT_TABLE.sql;
        __DATASET__["time"] = getNow();
        __DATASET__["result"] = [];
        __DATASET__["result"].push(__CONFIGS__.CURRENT_TABLE.structure);
        __DATASET__.default.sheet = 0;
        viewMessage(__CONFIGS__.CURRENT_TABLE.name + ":\n" + __CONFIGS__.CURRENT_TABLE.sql);
        viewDataset(0);
        var label = $("dataset-label");
        label.innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__["result"].length;

    };
    tbstools.appendChild(exConstr);
    setTooltip(exConstr, "显示当前数<br>据表结构");

    var rmtb = document.createElement("div");
    rmtb.type = "div";
    rmtb.className = "button";
    rmtb.innerText = "删除";
    rmtb.id = "drop-table";
    rmtb.onclick = function () {
        var r = confirm("确定要删除数据表(视图) " + __CONFIGS__.CURRENT_TABLE.name + " 吗?");
        if (r == true) {
            if (checkStorage()) {
                __CONFIGS__.CURRENT_DATABASE.connect.transaction(function (tx) {
                    var sql = "drop " + __CONFIGS__.CURRENT_TABLE.type + " " + __CONFIGS__.CURRENT_TABLE.name;
                    viewMessage(sql);
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            var aff = results.rowsAffected;
                            var len = results.rows.length;
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
    setTooltip(rmtb, "从数据库中删<br>除当前数据表");

    //#######################################
    //初始化SQL菜单
    //#######################################
    var sqltools = $("sql-tools");

    var newsql = document.createElement("div");
    newsql.type = "div";
    newsql.className = "button";
    newsql.innerText = "新建";
    newsql.id = "create-new-sql";
    let help_createsql = $("help-create-sql");
    newsql.onclick = help_createsql.onclick = function () {
        var openfile = $("openfile");
        openfile.value = "";
        __SQLEDITOR__.title = null;
        __SQLEDITOR__.codeMirror.setValue("");
        if (this.id == "help-create-sql" )
            __SQLEDITOR__.codeMirror.setValue("/*大括号中是用户参数*/\nSELECT * \nFROM \n{数据表}\nORDER BY 1");
    };
    sqltools.appendChild(newsql);
    setTooltip(newsql, "新建数据<br>库脚本");

    var input = document.createElement("input");
    input.type = "file";
    input.id = "openfile";
    input.style.display = "none";
    input.className = "openfile";
    input.onchange = function () {
        if (window.FileReader) {
            try {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    __SQLEDITOR__.codeMirror.setValue(this.result);
                    __SQLEDITOR__.title = null;
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

    var opensql = document.createElement("div");
    opensql.type = "div";
    opensql.className = "button";
    opensql.innerText = "打开";
    opensql.id = "open-sql";
    let help_opensql = $("help-open-sql");
    opensql.onclick = help_opensql.onclick = function () {
        var tb = storageSqlDialog("", __SQLEDITOR__);
        setCenterPosition($("page"),tb)
    };
    sqltools.appendChild(opensql);
    setTooltip(opensql, "从浏览器存储<br>中打开脚本");

    var saveto = document.createElement("div");
    saveto.type = "div";
    saveto.className = "button";
    saveto.innerText = "保存";
    saveto.id = "sql-save-to";
    let help_savesql = $("help-save-sql");
    saveto.onclick = help_savesql.onclick = function () {
        if (__SQLEDITOR__.title == null) {
            var sql = __SQLEDITOR__.codeMirror.getValue();
            var tb = storageSqlDialog(sql, __SQLEDITOR__, "_TO_SAVE_");
            setCenterPosition($("page"),tb)
        } else {
            var name = __SQLEDITOR__.title;
            var res = confirm("您确定覆盖保存脚本 " + name + " 吗?");
            if (res == true) {
                var sql = __SQLEDITOR__.codeMirror.getValue();
                if (name != "" && sql != "") {
                    var storage = window.localStorage;
                    var sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
                    sqllist[name] = messageEncode(sql);
                    storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                } else
                    alert("脚本及脚本名称不能为空!");
            }
        }
    };
    sqltools.appendChild(saveto);
    setTooltip(saveto, "保存脚本到<br>浏览器存储");

    var loadfile = document.createElement("div");
    loadfile.type = "div";
    loadfile.className = "button";
    loadfile.innerText = "导入";
    loadfile.id = "load-sql-file";
    let help_loadsql = $("help-load-sql");
    loadfile.onclick = help_loadsql.onclick = function () {
        $("openfile").click();
    };
    sqltools.appendChild(loadfile);
    setTooltip(loadfile, "导入外部<br>脚本文件");

    var saveas = document.createElement("div");
    saveas.type = "div";
    saveas.className = "button";
    saveas.innerText = "导出";
    saveas.id = "sql-save-as";
    let help_downloadsql = $("help-download-sql");
    saveas.onclick = help_downloadsql.onclick = function () {
        var blob = new Blob([str2ab(__SQLEDITOR__.codeMirror.getValue())], {type: "application/octet-stream"});
        openDownloadDialog(blob, "WebSQLiteDataView.sql");
    };
    sqltools.appendChild(saveas);
    setTooltip(saveas, "脚本另存为<br>文本文件");

    var execsql = document.createElement("div");
    execsql.type = "div";
    execsql.className = "button";
    execsql.innerText = "提交";
    execsql.id = "exec-sql";
    let help_execsql = $("help-execute-sql");
    execsql.onclick = help_execsql.onclick = function () {
        if (checkStorage()) {
            var selection = "";
            if (__SQLEDITOR__.codeMirror.somethingSelected())
                selection = __SQLEDITOR__.codeMirror.getSelection();
            else
                selection = __SQLEDITOR__.codeMirror.getValue();
            var paramdialog = getParamDialog(__SQLEDITOR__.title, selection);
            if (paramdialog != null) {
                setCenterPosition($("page"),paramdialog)
            } else {
                execute();
            }
        }
    };
    sqltools.appendChild(execsql);
    setTooltip(execsql, "执行脚本并<br>获取数据");

    var tofull = document.createElement("div");
    sqltools.appendChild(tofull);
    tofull.className = "button";
    tofull.innerText = "❏";
    tofull.style.fontSize = "150%";
    tofull.style.cssFloat = "right";
    tofull.id = "set-editer-to-full";
    tofull.onclick = function () {
        __SQLEDITOR__.codeMirror.setOption("fullScreen", !__SQLEDITOR__.codeMirror.getOption("fullScreen"));
    };
    setTooltip(tofull, "全屏幕编<br>辑窗口");

    var editorCharset = document.createElement("select");
    editorCharset.type = "select";
    editorCharset.id = "set-editer-chartset";
    for (var i=0;i<__SQLEDITOR__.charset.options.length;i++) {
        editorCharset.options.add(new Option(__SQLEDITOR__.charset.options[i], i));
    }
    try {
        let charset = getUserConfig("editercharset");
        if (charset != null) {
            __SQLEDITOR__.charset.value = editorCharset.selectedIndex = charset;
        } else
            editorCharset.selectedIndex = 0;
    }catch (e) {
        console.log(e);
    }
    editorCharset.onchange = function () {
        __SQLEDITOR__.charset.value = this.value;
        setUserConfig("editercharset",this.value);
    };
    sqltools.appendChild(editorCharset);
    setTooltip(editorCharset, "导入脚本<br>字符编码");

    //#######################################
    //必须先行实体化编辑器,否则不能预埋参数
    //#######################################
    $("sqlediter").style.width = (getAbsolutePosition($("sqlContainer")).width - 2) + "px";
    __SQLEDITOR__.init($("sqlediter"));

    var setFontSize = document.createElement("select");
    setFontSize.type = "select";
    setFontSize.id = "set-editer-font-size";
    for (var size in __SQLEDITOR__.fontSize.options) {
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
        }else
            setFontSize.selectedIndex = 0;
    }catch (e) {
        console.log(e);
    }
    setFontSize.onchange = function () {
        let editor = document.getElementsByClassName("CodeMirror")[0];
        editor.style.fontSize = this.value;
        setUserConfig("editerfontsize", this.value);
    };
    sqltools.appendChild(setFontSize);
    setTooltip(setFontSize, "调整编辑<br>器字号");

    var editorThemes = document.createElement("select");
    editorThemes.type = "select";
    editorThemes.id = "set-editer-theme";
    for (var theme in __SQLEDITOR__.themes) {
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
    }catch (e) {
        console.log(e);
    }
    editorThemes.onchange = function () {
        let theme = __SQLEDITOR__.themes[this.value];
        $("sqlediterTheme").setAttribute("href", theme.href);
        __SQLEDITOR__.codeMirror.setOption("theme", theme.name);
        setUserConfig("editerthemes",this.value);
    };
    sqltools.appendChild(editorThemes);
    setTooltip(editorThemes, "调整编辑<br>器主题");

    //#######################################
    //初始化消息菜单
    //#######################################
    var detailtools = $("detail-tools");
    var clean = document.createElement("div");
    clean.type = "div";
    clean.className = "button";
    clean.innerText = "清空";
    clean.id = "clean-log";
    clean.onclick = function () {
        var msgbox = $("messageBox");
        msgbox.innerHTML = "";
    };
    detailtools.appendChild(clean);
    setTooltip(clean, "清除所有终<br>端日志记录");

    var logs = document.createElement("select");
    logs.type = "select";
    logs.id = "log-records";
    logs.options.add(new Option("1000条", 1000));
    logs.options.add(new Option("5000条", 5000));
    logs.options.add(new Option("10000条", 10000));
    logs.options.add(new Option("全部", 0));
    try{
        let re = getUserConfig("pagelogs");
        if (re != null)
            logs.value = getUserConfig("pagelogs");
        else
            logs.selectedIndex = 0;
    }catch (e) {
        console.log(e);
    }
    logs.onchange = function () {
        __CONFIGS__.MAXLOGS = this.value;
        setUserConfig("pagelogs", this.value);
        var msgbox = $("messageBox");
        if (__CONFIGS__.MAXLOGS > 0) {
            while (msgbox.getElementsByClassName("dt").length > __CONFIGS__.MAXLOGS) {
                msgbox.removeChild(msgbox.getElementsByClassName("dt")[msgbox.getElementsByClassName("dt").length - 1])
            }
        }
    };
    detailtools.appendChild(logs);
    setTooltip(logs, "日志保留<br>最多条数");

    //#######################################
    //初始化数据菜单
    //#######################################
    var datatools = $("data-tools");

    var toup = document.createElement("div");
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
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
                __DATASET__.pages.default = 1;
            }
            $(this.getAttribute("label")).innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(toup, "显示上一<br>个数据集");

    var to = document.createElement("div");
    datatools.appendChild(to);
    to.className = "button";
    to.id = "dataset-label";
    to.innerText = "●";
    to.style.fontSize = "100%";
    to.setAttribute("pagelabel", "page-label");
    to.onclick = function () {
        if (__DATASET__.result.length > 0) {
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
            __DATASET__.pages.default = 1;
            this.innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(to, "显示当前<br>数据集");

    var todown = document.createElement("div");
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
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
                __DATASET__.pages.default = 1;
            }
            $(this.getAttribute("label")).innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            $(this.getAttribute("pagelabel")).innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(todown, "显示下一<br>个数据集");

    var datatran = document.createElement("div");
    datatools.appendChild(datatran);
    datatran.className = "button";
    datatran.innerText = "☇";
    datatran.style.fontSize = "150%";
    datatran.id = "dataset-transpose";
    let help_datasettranspose = $("help-dataset-transpose");
    datatran.onclick = help_datasettranspose.onclick = function () {
        if (__DATASET__.result.length > 0) {
            datasetTranspose(__DATASET__.default.sheet);
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(datatran, "转置当前<br>数据集");

    var dataslice = document.createElement("div");
    datatools.appendChild(dataslice);
    dataslice.className = "button";
    dataslice.innerText = "♯";
    dataslice.style.fontSize = "150%";
    dataslice.id = "dataset-slice";
    let help_datasetslice = $("help-dataset-slice");
    dataslice.onclick = help_datasetslice.onclick = function () {
        if (__DATASET__.result.length > 0) {
            var dataslice = getDataSlice();
            setCenterPosition($("page"),dataslice);
        }
    };
    setTooltip(dataslice, "对当前数据<br>集进行切片");

    var subtotal = document.createElement("div");
    datatools.appendChild(subtotal);
    subtotal.type = "div";
    subtotal.className = "button";
    subtotal.style.fontSize = "130%";
    subtotal.innerText = "Σ";
    subtotal.id = "dataset-subtotal";
    let help_datasetsubtotal = $("help-dataset-subtotal");
    subtotal.onclick = help_datasetsubtotal.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            var dataset = __DATASET__["result"][__DATASET__.default.sheet];
            var data = [];
            var columns = [];
            for (var i = 0; i < dataset["columns"].length; i++) {
                columns.push(dataset["columns"][i].name);
            }
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                var row = [];
                for (var c = 0; c < columns.length; c++) {
                    row.push(r[columns[c]].value);
                }
                data.push(row);
            }
            var subtotal = getSubtotal(columns, data);
            setCenterPosition($("page"),subtotal);
        }
    };
    setTooltip(subtotal, "对当前数据<br>集分类汇总");

    var download = document.createElement("div");
    datatools.appendChild(download);
    download.type = "div";
    download.className = "button";
    download.style.fontSize = "150%";
    download.innerText = "⇣";
    download.id = "dataset-download";
    let help_datasetdownload = $("help-dataset-download");
    download.onclick = help_datasetdownload.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            var dataset = __DATASET__["result"][__DATASET__.default.sheet];
            var aoa = [];
            var columns = [];
            for (var i = 0; i < dataset["columns"].length; i++) {
                columns.push(dataset["columns"][i].name);
            }
            aoa.push(columns);
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                var row = [];
                for (var c = 0; c < columns.length; c++) {
                    row.push(r[columns[c]].value);
                }
                aoa.push(row);
            }
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet), 'WebSQLiteDataView.xlsx');
        }
    };
    setTooltip(download, "导出当前<br>数据集");

    var remove = document.createElement("div");
    datatools.appendChild(remove);
    remove.type = "div";
    remove.className = "button";
    remove.style.fontSize = "120%";
    remove.innerText = "✗";
    remove.id = "dataset-remove";
    let help_datasetremove = $("help-dataset-remove");
    remove.onclick = help_datasetremove.onclick = function () {
        if (__DATASET__["result"].length > 0) {
            __DATASET__["result"].splice(__DATASET__.default.sheet,1);
            if (__DATASET__.default.sheet >= __DATASET__["result"].length)
                __DATASET__.default.sheet = __DATASET__["result"].length - 1;

            if (__DATASET__["result"].length > 0) {
                __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
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
    setTooltip(remove, "删除当前<br>数据集");

    var pageup = document.createElement("div");
    datatools.appendChild(pageup);
    pageup.className = "button";
    pageup.innerText = "«";
    pageup.style.fontSize = "150%";
    pageup.setAttribute("label", "page-label");
    pageup.id = "dataset-page-up";
    pageup.onclick = function () {
        if (__DATASET__.pages.default > 1) {
            __DATASET__.pages.default -= 1;
            var label = $(this.getAttribute("label"));
            label.innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(pageup, "显示当前数据<br>集的上一页");

    var pagecurrent = document.createElement("div");
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
    setTooltip(pagecurrent, "显示当前数据<br>集的当前页");

    var pagedown = document.createElement("div");
    datatools.appendChild(pagedown);
    pagedown.className = "button";
    pagedown.innerText = "»";
    pagedown.style.fontSize = "150%";
    pagedown.setAttribute("label", "page-label");
    pagedown.id = "dataset-page-down";
    pagedown.onclick = function () {
        if (__DATASET__.pages.default < __DATASET__.pages.total) {
            __DATASET__.pages.default += 1;
            var label = $(this.getAttribute("label"));
            label.innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            viewDataset(__DATASET__.default.sheet);
        }
    };
    setTooltip(pagedown, "显示当前数据<br>集的下一页");

    var analysis = document.createElement("div");
    analysis.style.display = "none";
    datatools.appendChild(analysis);
    analysis.className = "button";
    analysis.innerText = "Analysis";
    analysis.style.cssFloat = "left";
    analysis.id = "Analysis";
    analysis.onclick = function () {
        var dataset = __DATASET__["result"][__DATASET__.default.sheet];
        var columns = [];
        var data = [];
        for (var i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }
        for (var i = 0; i < dataset["data"].length; i++) {
            var r = dataset["data"][i];
            var row = [];
            for (var c = 0; c < columns.length; c++) {
                row.push(r[columns[c]].value);
            }
            data.push(row);
        }
        var storage = window.localStorage;
        storage.setItem(__CONFIGS__.STORAGE.DATASET, JSON.stringify({
            "columns": columns,
            "data": data,
            "title": "Web SQLite DataView",
            "sub": "Developer: Yangkai"
        }));
        window.open("analysis.html");
    };
    setTooltip(analysis, "Analysis");


    var toecharts = document.createElement("div");
    datatools.appendChild(toecharts);
    toecharts.className = "button";
    toecharts.innerText = "❏";
    toecharts.style.fontSize = "150%";
    toecharts.style.cssFloat = "right";
    toecharts.id = "dataset-to-echarts";
    toecharts.onclick = function () {
        try {
            var mecharts = document.createElement("div");
            mecharts.className = "echarts";
            mecharts.id = "echarts-full-screen";
            mecharts.style.width = (getAbsolutePosition($("page")).width - 10) + "px";
            mecharts.style.height = getAbsolutePosition($("page")).height + "px";
            mecharts.style.top = "0px";
            mecharts.style.left = "0px";
            window.addEventListener("keydown", function (e) {
                //keypress无法获取Esc键值,keydown和keyup可以.
                var keycode = e.which || e.keyCode;
                if (keycode == 27) {
                    if ($("echarts-full-screen") != null)
                        $("echarts-full-screen").parentElement.removeChild($("echarts-full-screen"));
                }
            });
            mecharts.appendChild(getEcharts(__DATASET__.echarts.type, (getAbsolutePosition($("page")).width - 30) + "px", (getAbsolutePosition($("page")).height - 20) + "px", __DATASET__.echarts.theme));
            $("page").appendChild(mecharts);
        } catch (e) {
            console.log(e);
        }
    };
    setTooltip(toecharts, "重绘并显<br>示大视图");

    var toconfigs = document.createElement("div");
    datatools.appendChild(toconfigs);
    toconfigs.className = "button";
    toconfigs.innerText = "┅";
    toconfigs.style.fontSize = "150%";
    toconfigs.style.cssFloat = "right";
    toconfigs.id = "dataset-to-configs";
    let help_echartsConfigs = $("help-select-echarts-configs");
    toconfigs.onclick = help_echartsConfigs.onclick = function () {
        var configs = getEchartsConfigs($("tableContainer"));
        setCenterPosition($("page"),configs);
    };
    setTooltip(toconfigs, "更多图<br>形参数");

    var echartsThemes = document.createElement("select");
    echartsThemes.className = "select";
    echartsThemes.type = "select";
    echartsThemes.id = "dataset-select-echarts-theme";
    let help_echartsThemes = $("help-select-echarts-themes");
    for (var theme in __ECHARTS__.themes) {
        echartsThemes.options.add(new Option(theme, __ECHARTS__.themes[theme]));
        help_echartsThemes.options.add(new Option(theme, __ECHARTS__.themes[theme]));
    }
    try{
        let theme = getUserConfig("echartsthemes");
        if (theme != null)
            echartsThemes.value = theme;
        else
            echartsThemes.selectedIndex = 0;
    } catch (e) {
        console.log(e);
    }
    echartsThemes.onchange = help_echartsThemes.onchange = function () {
        try {
            __DATASET__.echarts.theme = this.value;
            var container = $("tableContainer");
            var _width = (getAbsolutePosition(container).width * 1) + "px";
            var _height = (getAbsolutePosition(container).height * 1) + "px";
            container.innerHTML = "";
            container.appendChild(getEcharts(__DATASET__.echarts.type, _width, _height, __DATASET__.echarts.theme));
            setUserConfig("echartsthemes", this.value);
        } catch (e) {
            console.log(e);
        }
    };
    datatools.appendChild(echartsThemes);
    setTooltip(echartsThemes, "选择数据视<br>图主题");

    var echartsType = document.createElement("select");
    echartsType.type = "select";
    echartsType.id = "dataset-select-echarts-type";
    let help_echartsType = $("help-select-echarts-type");
    for (var type in __ECHARTS__.type) {
        echartsType.options.add(new Option(type, __ECHARTS__.type[type]));
        help_echartsType.options.add(new Option(type, __ECHARTS__.type[type]));
    }
    echartsType.onchange = help_echartsType.onchange = function () {
        try {
            __DATASET__.echarts.type = this.value;
            var container = $("tableContainer");
            var _width = (getAbsolutePosition(container).width * 1) + "px";
            var _height = (getAbsolutePosition(container).height * 1) + "px";
            container.innerHTML = "";
            container.appendChild(getEcharts(__DATASET__.echarts.type, _width, _height, __DATASET__.echarts.theme));
        } catch (e) {
            console.log(e);
        }
    };
    datatools.appendChild(echartsType);
    setTooltip(echartsType, "选择数据视<br>图类别");

    var echarts = document.createElement("div");
    datatools.appendChild(echarts);
    echarts.className = "button";
    echarts.innerText = "视图";
    echarts.style.cssFloat = "right";
    echarts.id = "dataset-to-charts";
    let help_echarts = $("help-dataset-echarts");
    echarts.onclick = help_echarts.onclick = function () {
        try {
            var container = $("tableContainer");
            var _width = (getAbsolutePosition(container).width * 1) + "px";
            var _height = (getAbsolutePosition(container).height * 1) + "px";
            container.innerHTML = "";
            container.appendChild(getEcharts(__DATASET__.echarts.type, _width, _height, __DATASET__.echarts.theme));
        } catch (e) {
            console.log(e);
        }
    };
    setTooltip(echarts, "绘制当前数<br>据集的视图");

   setPageThemes();


    window.onresize = function () {
        resize();
    };
    //#########################body init end#######################################
}

function getBrowserSize(){
    var winWidth = 0;
    var winHeight = 0;
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
    $("page").style.height= (getBrowserSize().height - 30) + "px";
    $("header").style.width = $("footer").style.width =(getBrowserSize().width - 15) + "px";
    $("MainContainer").style.height = (getBrowserSize().height - getAbsolutePosition($("header")).height - getAbsolutePosition($("footer")).height - 32) + "px";
    $("main").style.width = (getBrowserSize().width - getAbsolutePosition($("sidebar")).width - getAbsolutePosition($("detail")).width - 15) + "px";
    $("tableContainer").style.height = (getAbsolutePosition($("main")).height -
            getAbsolutePosition($("sql-tools")).height -
            getAbsolutePosition($("sqlContainer")).height-
            getAbsolutePosition($("data-tools")).height) + "px";
    $("sidebar-tbs").style.height = (getAbsolutePosition($("sidebar")).height -
            getAbsolutePosition($("sidebar-dbs-tools")).height -
            getAbsolutePosition($("sidebar-dbs")).height-
            getAbsolutePosition($("sidebar-tbs-tools")).height) + "px";
    $("messageContainer").style.height = (getAbsolutePosition($("detail")).height -
            getAbsolutePosition($("detail-tools")).height) + "px";
}

function isScroll(el) {
     //检查节点是否 出现滚动条
    var elems = el ? [el] : [document.documentElement, document.body];
    var scrollX = false, scrollY = false;
    for (var i = 0; i < elems.length; i++) {
        var o = elems[i];
        // test horizontal
        var sl = o.scrollLeft;
        o.scrollLeft += (sl > 0) ? -1 : 1;
        o.scrollLeft !== sl && (scrollX = scrollX || true);
        o.scrollLeft = sl;
        // test vertical
        var st = o.scrollTop;
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
        var data = [];
        var lines = result.split("\n");
        for (var i = 0; i < lines.length; i++) {
            data.push(lines[i].split(sep));
        }
        return data;
    }

    function fixData(data) {
        //文件流转BinaryString
        var tmp = "";
        var l = 0;
        var w = 10240;
        for (; l < data.byteLength / w; ++l) tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        tmp += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return tmp;
    }

    var reader = new FileReader();
    var rABS = true;
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
        for (var i = 0; i < sheetNames.length; i++) {
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
    var container = document.createElement("div");
    container.id = "subtotal-Content";
    container.className = "subtotal-Content";
    var d = document.createElement("div");
    d.style.height= "22px";
    var span = document.createElement("span");
    span.innerHTML = "分类字段 : ";
    d.appendChild(span);
    var cols = document.createElement("select");
    cols.type = "select";
    cols.id = "subtotal_groupby";
    cols.options.add(new Option("全部", ""));
    for (var c = 0; c < columns.length; c++) {
        cols.options.add(new Option(columns[c], columns[c]));
    }
    d.appendChild(cols);

    span = document.createElement("span");
    span.innerHTML = "合并结果";
    span.style.cssFloat = "right";
    d.appendChild(span);

    var merge = document.createElement("input");
    merge.type = "checkbox";
    merge.id = "subtotal_merge";
    merge.style.marginTop= "4px";
    merge.style.cssFloat = "right";
    merge.style.width = "28px";
    d.appendChild(merge);

    container.appendChild(d);

    container.innerHTML += "<hr>";

    var table = document.createElement("table");
    container.appendChild(table);
    table.id = "subtotal-dialog-table";
    table.className = "table";
    table.style.width = "100%";

    table.innerText = "";
    var tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    var th = document.createElement("th");
    th.className = "th";
    th.style.width = "36px";
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

    var tool = document.createElement("div");
    container.appendChild(tool);
    tool.className = "tools-container";

    var add = document.createElement("div");
    add.className = "button";
    add.innerText = "增加";
    add.onclick = function () {
        var table = $("subtotal-dialog-table");
        table.appendChild(addSubtotal(columns,table.getElementsByTagName("tr").length - 1));
    };
    tool.appendChild(add);

    var del = document.createElement("div");
    del.className = "button";
    del.innerText = "删除";
    del.onclick = function () {
        var table = $("subtotal-dialog-table");
        var columns = table.getElementsByTagName("tr");
        if (columns.length > 2) {
            for (var i = columns.length - 1; i > 1; i--) {
                var checks = columns[i].getElementsByClassName("check");
                if (checks[0].checked == true) {
                    table.removeChild(columns[i]);
                }
            }
        } else {
            alert("至少保留一个统计对象.");
        }
    };
    tool.appendChild(del);

    var confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function () {
        var merge = $("subtotal_merge").checked;
        var column = $("subtotal_groupby").value;
        var obj = document.getElementsByClassName("subtotal_object");
        var typ = document.getElementsByClassName("subtotal_type");
        var columns = [];
        var data = [];
        for (var i=0;i<obj.length;i++) {
            var target = obj[i].value;
            if (merge){
                //横向合并集合
                var result = subtotal(column, target, typ[i].value);
                if (columns.length == 0) {
                    columns = result["columns"];
                    data = result["data"];
                } else {
                    let col = result["columns"][1];
                    col.id = columns.length;
                    columns.push(col);
                    for(var x=0;x<result["data"].length;x++){
                        let r = result["data"][x];
                        for(var c=0;c<data.length;c++){
                            let row = data[c];
                            if (row[column==""?"全部":column].value == r[column==""?"全部":column].value){
                                var cell = r[col.name];
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
             __DATASET__["result"].push({columns:columns,data:data});
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
        }

        $("subtotal-Content").parentNode.removeChild($("subtotal-Content"));
    };
    tool.appendChild(confirm);

    var cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = function () {
        $("subtotal-Content").parentNode.removeChild($("subtotal-Content"));
    };
    tool.appendChild(cancel);

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
    var td = document.createElement("td");
    var check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";
    check.style.width = "36px";
    td.appendChild(check);
    tr.appendChild(td);

    td = document.createElement("td");
    td.style.width = "36px";
    td.style.textAlign = "center";
    var cols = document.createElement("select");
    cols.type = "select";
    cols.className = "subtotal_object";
    for (var c = 0; c < columns.length; c++) {
        cols.options.add(new Option(columns[c], columns[c]));
    }
    td.appendChild(cols);
    tr.appendChild(td);

    td = document.createElement("td");
    var ways = document.createElement("select");
    ways.type = "select";
    ways.className = "subtotal_type";
    var methods = [
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
    for (var c = 0; c < methods.length; c++) {
        ways.options.add(new Option(methods[c].name, methods[c].value));
    }
    tr.appendChild(td);
    td.appendChild(ways);
    return tr;
}

function getParamDialog(title, sql) {
    var reg = new RegExp(/\{[a-zA-Z0-9\u4e00-\u9fa5]+\}/, "g");
    var params = sql.match(reg);
    if (params != null) {
        //参数去重
        var temp = [];
        for (var i = 0; i < params.length; i++) {
            if (temp.indexOf(params[i]) === -1)
                temp.push(params[i]);
        }
        params = temp.slice(0);

        var container = document.createElement("div");
        container.id = "sql-param-dialog";
        container.className = "sql-param-dialog";
        var d = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = (title == null?"[ ]":"[ " + title + " ]");
        d.appendChild(span);
        container.appendChild(d);
        container.innerHTML += "<hr>";

        for (var i = 0; i < params.length; i++) {
            d = document.createElement("div");
            span = document.createElement("span");
            var param = params[i].toString().substring(params[i].indexOf("{") + 1, params[i].indexOf("}"));
            span.innerHTML = param + " : ";
            d.appendChild(span);
            var value = document.createElement("input");
            value.className = "sql-param-value";
            value.setAttribute("param", param.toString());
            value.style.cssFloat = "right";
            try {
                if (__SQLEDITOR__.parameter[param.toString()] != null)
                    value.value = __SQLEDITOR__.parameter[param.toString()];
            }catch(e){}
            d.appendChild(value);
            container.appendChild(d);
        }

        var tool = document.createElement("div");
        container.appendChild(tool);
        tool.className = "tools-container";

        var confirm = document.createElement("div");
        confirm.className = "button";
        confirm.innerText = "确定";
        confirm.onclick = function () {
            let param = {};
            let params = document.getElementsByClassName("sql-param-value");
            for (var i = 0; i < params.length; i++) {
                if (params[i].value != null)
                    param[params[i].getAttribute("param")] = params[i].value;
            }
            __SQLEDITOR__.parameter = param;
            execute();
            $("sql-param-dialog").parentNode.removeChild($("sql-param-dialog"));
        };
        tool.appendChild(confirm);

        var cancel = document.createElement("div");
        cancel.className = "button";
        cancel.innerText = "退出";
        cancel.onclick = function () {
            $("sql-param-dialog").parentNode.removeChild($("sql-param-dialog"));
        };
        tool.appendChild(cancel);
        return container;
    } else {
        return null
    }
}

function getDataSlice() {
    var container = document.createElement("div");
    container.id = "data-slice-Content";
    container.className = "data-slice-Content";
    var d = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = "数据切片 : ";
    d.appendChild(span);
    container.appendChild(d);

    container.innerHTML += "<hr>";

    var table = document.createElement("table");
    container.appendChild(table);
    table.id = "data-slice-table";
    table.className = "table";
    table.style.width = "100%";

    table.innerText = "";
    var tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    var th = document.createElement("th");
    th.className = "th";
    th.style.width = "18px";
    th.innerText = "选择";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className = "th";
    th.innerText = "切片字段";
    tr.appendChild(th);
    let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
    for (var i = 0; i < columns.length; i++) {
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

        var td = document.createElement("td");
        var check = document.createElement("input");
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

    container.innerHTML += "<br>";

    d = document.createElement("div");
    container.appendChild(d);
    span = document.createElement("span");
    span.innerText = "切片范围 : ";
    d.appendChild(span);
    var range_begin = document.createElement("input");
    range_begin.id = "data-slice-range-begin";
    range_begin.style.width = "100px";
    range_begin.style.textAlign = "center";
    range_begin.value = 1;
    d.appendChild(range_begin);
    span = document.createElement("span");
    span.innerText = " - ";
    d.appendChild(span);
    var range_end = document.createElement("input");
    range_end.id = "data-slice-range-end";
    range_end.style.width = "100px";
    range_end.style.textAlign = "center";
    range_end.value = __DATASET__.result[__DATASET__.default.sheet].data.length;
    d.appendChild(range_end);

    var tool = document.createElement("div");
    container.appendChild(tool);
    tool.className = "tools-container";

    var confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function () {
        let cols = $("data-slice-table").getElementsByClassName("data-slice-column-check");
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        let begin = Number($("data-slice-range-begin").value) - 1;
        let end = Number($("data-slice-range-end").value) - 1;
        let col_tmp = [];
        let dataset = [];
        var id = 0;
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].checked == true) {
                for (var c = 0; c < columns.length; c++) {
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
        let data = __DATASET__.result[__DATASET__.default.sheet].data;
        for (var i = 0; i < data.length; i++) {
            let row = data[i];
            if (i >= begin && i <= end) {
                var r = {};
                for (var c = 0; c < col_tmp.length; c++) {
                    let cell = row[col_tmp[c].name];
                    cell.rowid = rowid;
                    cell.colid = col_tmp[c].id;
                    r[col_tmp[c].name] = cell;
                }
                dataset.push(r);
                rowid ++;
            }
        }
        __DATASET__["result"].push({columns: col_tmp, data: dataset});
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
        }

        $("data-slice-Content").parentNode.removeChild($("data-slice-Content"));
    };
    tool.appendChild(confirm);

    var cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = function () {
        $("data-slice-Content").parentNode.removeChild($("data-slice-Content"));
    };
    tool.appendChild(cancel);

    return container;
}

function getDataFilter(colid) {
    let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
    let data = __DATASET__.result[__DATASET__.default.sheet].data;

    var container = document.createElement("div");
    container.id = "data-filter-Content";
    container.className = "data-filter-Content";
    var d = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = "筛选字段 :[ " + columns[Number(colid)].name + " ]";
    d.appendChild(span);
    container.appendChild(d);

    container.innerHTML += "<hr>";

    var tableContent =document.createElement("div");
    tableContent.className = "data_filter_table_Content";
    container.appendChild(tableContent);

    var table = document.createElement("table");
    tableContent.appendChild(table);
    table.id = "data-filter-table";
    table.className = "table";
    table.style.width = "100%";

    table.innerText = "";
    var tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    var th = document.createElement("th");
    th.className = "th";
    th.style.width = "18px";
    th.innerText = "选择";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className = "th";
    th.innerText = "筛选条件";
    tr.appendChild(th);

    let values = [];
    for (var i = 0; i < data.length; i++) {
        let row = data[i];
        let value = row[columns[Number(colid)].name].value;
        let is = false;
        for(var v=0;v<values.length;v++){
            if (value == values[v]) {
                is = true;
                break;
            }
        }
        if (is == false)
            values.push(value);
    }

    values = sortAsc(values);

    for (var i = 0; i < values.length; i++) {
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

        var td = document.createElement("td");
        var check = document.createElement("input");
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

    container.innerHTML += "<br>";

    var tool = document.createElement("div");
    container.appendChild(tool);
    tool.className = "tools-container";

    var checkall = document.createElement("div");
    checkall.className = "button";
    checkall.innerText = "全选";
    checkall.onclick = function(){
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (var i=0;i<filters.length;i++){
            filters[i].checked = true;
            filters[i].setAttribute("checked","checked");
        }
    };
    tool.appendChild(checkall);

    var checknone = document.createElement("div");
    checknone.className = "button";
    checknone.innerText = "反选";
    checknone.onclick = function(){
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (var i=0;i<filters.length;i++){
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

    var confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function() {
        let values = [];
        let filters = $("data-filter-table").getElementsByClassName("data-filter-check");
        for (var i=0;i<filters.length;i++){
            if (filters[i].checked == true)
                values.push(filters[i].getAttribute("value"))
        }
        let columns = __DATASET__.result[__DATASET__.default.sheet].columns;
        let dataset = [];

        let rowid = 0;
        let data = __DATASET__.result[__DATASET__.default.sheet].data;
        let column = columns[Number(colid)].name;
        for (var i=0; i<data.length;i++) {
            let row = data[i];
            for (var v=0;v<values.length;v++){
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

        __DATASET__["result"].push({columns: columns, data: dataset});
        if (__DATASET__["result"].length > 0) {
            __DATASET__.default.sheet = __DATASET__["result"].length - 1;
            __DATASET__.pages.total = Math.ceil(__DATASET__.result[__DATASET__.default.sheet].data.length / __DATASET__.pages.size);
            __DATASET__.pages.default = 1;
            $("page-label").innerText = __DATASET__.pages.default + " ● " + __DATASET__.pages.total;
            $("dataset-label").innerText = (__DATASET__.default.sheet + 1) + " ● " + __DATASET__.result.length;
            viewDataset(__DATASET__["result"].length - 1);
        }

        $("data-filter-Content").parentNode.removeChild($("data-filter-Content"));
    };
    tool.appendChild(confirm);

    var cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = function () {
        $("data-filter-Content").parentNode.removeChild($("data-filter-Content"));
    };
    tool.appendChild(cancel);

    return container;
}

function getColumnMenu(colid) {
    var ul = document.createElement("ul");
    ul.id = "table-column-menu-" + colid;
    ul.className = "table-column-menu";
    ul.onmouseleave = function(){
        this.style.display = "none";
    };

    var li = document.createElement("li");
    li.id = "table-column-menu-filter";
    li.innerHTML = "筛选";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        if (__DATASET__.result.length > 0) {
            var datafilter = getDataFilter(this.getAttribute("colid"));
            setCenterPosition($("page"),datafilter);
        }
    };
    ul.appendChild(li);

    var li = document.createElement("li");
    li.id = "table-column-menu-formater";
    li.innerHTML = "格式";
    li.setAttribute("colid", colid);
    li.onclick = function () {
        var formater = getFormat(this.getAttribute("colid"));
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
    let d = document.createElement("div");
    let span = document.createElement("span");
    span.innerHTML = "格式设置 : [ " + columns[Number(colid)].name + " ]";
    d.appendChild(span);
    container.appendChild(d);
    container.innerHTML += "<hr>";

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
    for (var c = 0; c < methods.length; c++) {
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
    for (var c = 0; c < methods.length; c++) {
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
    for (var c = 0; c < methods.length; c++) {
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
    for (var c = 0; c < methods.length; c++) {
        param.options.add(new Option(methods[c].name, methods[c].value));
    }
    param.value = style[param.id];
    item.appendChild(param);
    items.appendChild(item);


    var tool = document.createElement("div");
    container.appendChild(tool);
    tool.className = "tools-container";

    var confirm = document.createElement("div");
    confirm.className = "button";
    confirm.innerText = "确定";
    confirm.onclick = function() {
        let param = $("table-data-format").getElementsByClassName("format-set");
        let format = {};
        for(var i=0;i<param.length;i++){
            format[param[i].id] = param[i].value;
        }
        let data = __DATASET__.result[__DATASET__.default.sheet].data;
        for(var i =0;i<data.length;i++){
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

    var cancel = document.createElement("div");
    cancel.className = "button";
    cancel.innerText = "退出";
    cancel.onclick = function () {
        $("table-data-format").parentNode.removeChild($("table-data-format"));
    };
    tool.appendChild(cancel);

    return container;
}

function setTooltip(parent, text) {
    parent.onmouseenter = function () {
        var tip = document.createElement("span");
        tip.className = "tooltip";
        tip.id = "tooltip-" + parent.id;
        tip.innerHTML = text;
        let posi = getAbsolutePosition(parent);
        tip.style.top = (posi.top - 41) + "px";
        tip.style.left = (posi.left - 10) + "px";
        tip.style.width = (posi.width + 20) + "px";
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
        let config = getMapConfig();
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
    var count = 0;
    for (var i in object) count++;
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
        for (var key in objA) {
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
                var oA = objA[key], oB = objB[key];
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (var k in oA) {
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = CompareObj(oA[k], oB[k], flag);
                }
            }
        }
    }
    return flag;
}



