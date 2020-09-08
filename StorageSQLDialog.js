function storageSqlDialog(sql, editer, type){
    var sqldialog = document.createElement("div");
    sqldialog.id = "sql-dialog";
    sqldialog.className = "sql-dialog";

    let d = document.createElement("div");
    d.style.width = "100%";
    let span = document.createElement("span");
    span.innerHTML = "脚本管理 : ";
    d.appendChild(span);
    sqldialog.appendChild(d);
    sqldialog.innerHTML += "<hr>";

    var input = document.createElement("input");
    input.id = input.className = "sql-dialog-name";
    input.placeholder="请输入检索名称.";
    sqldialog.appendChild(input);

    var div = document.createElement("div");
    div.className ="table-container";
    sqldialog.appendChild(div);

    var table = document.createElement("table");
    div.appendChild(table);
    table.id = "sql-dialog-table";
    table.className = "table";
    table.style.width = "100%";

    getSQLList(table);

    var div  = document.createElement("div");
    div.className ="edit-container";
    sqldialog.appendChild(div);
    var edit = document.createElement("textarea");
    edit.id = "sql-dialog-sql";
    edit.className = "sql-dialog-sql";
    edit.type = "textarea";
    edit.setAttribute("readonly","readonly");
    edit.value = sql;
    div.appendChild(edit);

    var tool = document.createElement("div");
    sqldialog.appendChild(tool);
    tool.className = "tools-container";

    var open = document.createElement("div");
    open.className = "button";
    open.innerText = "打开";
    open.onclick = function(){
        editer.title = $("sql-dialog-name").value;
        editer.codeMirror.setValue($("sql-dialog-sql").value);
        $("sql-dialog").parentNode.removeChild($("sql-dialog"));

    };
    tool.appendChild(open);

    var add = document.createElement("div");
    add.className = "button";
    add.innerText = "保存";
    add.onclick = function(){
        var name = $("sql-dialog-name");
        var sql = $("sql-dialog-sql");
        if (name.value !="" && sql.value != "") {
            var storage = window.localStorage;
            var sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            sqllist[name.value] = messageEncode(sql.value);
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-dialog-table"))
        }
        if (type == "_TO_SAVE_")
            editer.title = $("sql-dialog-name").value;
    };
    tool.appendChild(add);
    var del = document.createElement("div");
    del.className = "button";
    del.innerText = "删除";
    del.onclick = function(){
        var name = $("sql-dialog-name");
        if (name.value !="") {
            var storage = window.localStorage;
            var sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            delete sqllist[name.value];
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-dialog-table"))
        }
    };
    tool.appendChild(del);

    var input = document.createElement("input");
    input.type = "file";
    input.id = "openJson";
    input.style.display = "none";
    input.className = "openJson";
    input.onchange = function () {
        if (window.FileReader) {
            try {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    var isOver = confirm("您确定覆盖当前存储的所有脚本吗?");
                    if (isOver) {
                        var storage = window.localStorage;
                        var sqllist = JSON.parse(this.result);
                        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                        getSQLList($("sql-dialog-table"));
                    }
                };
                reader.readAsText(file, __CONFIGS__.Charset.options[__CONFIGS__.Charset.value]);
            }catch (e) {
                alert("请选择需要导入的文件.")
            }
        } else {
            showMessage("本应用适用于Chrome浏览器或IE10及以上版本。")
        }
    };
    tool.appendChild(input);

    var loadfile = document.createElement("div");
    loadfile.type = "div";
    loadfile.className="button";
    loadfile.innerText = "恢复";
    loadfile.onclick = function () {
        $("openJson").click();
    };
    tool.appendChild(loadfile);

    var saveas = document.createElement("div");
    saveas.type = "div";
    saveas.className="button";
    saveas.innerText = "备份";
    saveas.onclick = function () {
        var storage = window.localStorage;
        var sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        var blob = new Blob([str2ab(JSON.stringify(sqllist))], {type: "application/octet-stream"});
        openDownloadDialog(blob, "WebSQLiteDataView.json");
    };
    tool.appendChild(saveas);

    var exit = document.createElement("div");
    exit.className = "button";
    exit.innerText = "取消";
    exit.onclick = function(){
        $("sql-dialog").parentNode.removeChild($("sql-dialog"));
    };
    tool.appendChild(exit);
    return sqldialog;
}

function getSQLList(table){
    table.innerText = "";
    var tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    var th = document.createElement("th");
    th.className= "th";
    th.style.width = "36px";
    th.innerText = "选择";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.innerText = "序号";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.innerText = "名称";
    tr.appendChild(th);
    var storage = window.localStorage;
    var sqllist = {};
    if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) ==  null)
        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS ,"{}");
    else {
        sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
    }
    var i = 0;
    for (var name in sqllist){
        tr = document.createElement("tr");
        if (i % 2 > 0) {
            tr.className = "alt-line";
            //单数行
        }
        tr.setAttribute("name", name);
        tr.setAttribute("sql", sqllist[name]);
        tr.onclick = function() {
            var name = $("sql-dialog-name");
            var sql = $("sql-dialog-sql");
            name.value = this.getAttribute("name");
            var _sql = messageDecode(this.getAttribute("sql"));
            _sql = _sql.substring(0, _sql.length - 1);
            sql.value = _sql;
            if (this.getElementsByClassName("check")[0].checked == true)
                this.getElementsByClassName("check")[0].removeAttribute("checked");
            else
                this.getElementsByClassName("check")[0].setAttribute("checked", "checked");
        };
        table.appendChild(tr);

        var td = document.createElement("td");
        td.className= "td";
        var check = document.createElement("input");
        check.type = "checkbox";
        check.className = "check";
        check.style.width = "36px";
        td.appendChild(check);
        tr.appendChild(td);

        td = document.createElement("td");
        td.className= "td";
        td.style.width = "36px";
        td.style.textAlign = "center";
        td.innerText = i + 1;
        tr.appendChild(td);

        td = document.createElement("td");
        td.className= "td";
        td.innerText = name;
        tr.appendChild(td);
        i += 1;
    }
}