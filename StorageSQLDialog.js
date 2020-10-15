function storageSqlDialog(sql, editer, type){
    let container = document.createElement("div");
    container.id = "sql-Manager-Content";
    container.className = "sql-Manager-Content";

    let d = document.createElement("div");
    d.style.width = "100%";
    let span = document.createElement("span");
    span.innerHTML = "脚本管理 : ";
    d.appendChild(span);
    let sqlname = document.createElement("input");
    sqlname.id = sqlname.className = "sql-Manager-Content-name";
    sqlname.placeholder="请输入脚本名称.";
    d.appendChild(sqlname);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    d.appendChild(close);
    container.appendChild(d);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    d = document.createElement("div");
    d.className = "toolbar";
    let b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "列表";
    b.onclick = function () {
        $("table-container").style.display = "block";
        $("edit-container").style.display = "none";
    };
    d.appendChild(b);
    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "详细";
    b.onclick = function () {
        $("table-container").style.display = "none";
        $("edit-container").style.display = "block";
    };
    d.appendChild(b);
    container.appendChild(d);

    let contentContainer = document.createElement("div");
    contentContainer.className = contentContainer.id = "content-container";
    container.appendChild(contentContainer);

    let tablecontainer = document.createElement("div");
    tablecontainer.className = tablecontainer.id = "table-container";
    contentContainer.appendChild(tablecontainer);
    let sqltable = document.createElement("table");
    sqltable.style.tableLayout = "fixed";
    tablecontainer.appendChild(sqltable);
    sqltable.id = "sql-Manager-Content-table";
    sqltable.className = "table";
    sqltable.style.width = "100%";
    getSQLList(sqltable);

    let editcontainer = document.createElement("div");
    editcontainer.className = editcontainer.id = "edit-container";
    editcontainer.style.display = "none";
    contentContainer.appendChild(editcontainer);

    let edit = document.createElement("textarea");
    edit.className = edit.id = "sql-Manager-Content-sql";
    edit.type = "textarea";
    edit.setAttribute("readonly","readonly");
    edit.value = sql;
    editcontainer.appendChild(edit);

    let br = document.createElement("hr");
    br.className = "br";
    container.appendChild(br);

    let tool = document.createElement("div");
    tool.className = "groupbar";
    container.appendChild(tool);

    let open = document.createElement("div");
    open.className = "button";
    open.innerText = "打开";
    open.onclick = function(){
        editer.title = $("sql-Manager-Content-name").value;
        editer.codeMirror.setValue($("sql-Manager-Content-sql").value);
        $("sql-Manager-Content").parentNode.removeChild($("sql-Manager-Content"));
    };
    tool.appendChild(open);

    var add = document.createElement("div");
    add.className = "button";
    add.innerText = "保存";
    add.onclick = function(){
        var name = $("sql-Manager-Content-name");
        var sql = $("sql-Manager-Content-sql");
        if (name.value !="" && sql.value != "") {
            var storage = window.localStorage;
            var sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            sqllist[name.value] = messageEncode(sql.value);
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-Manager-Content-table"))
        }
        if (type == "_TO_SAVE_")
            editer.title = $("sql-Manager-Content-name").value;
    };
    tool.appendChild(add);
    var del = document.createElement("div");
    del.className = "button";
    del.innerText = "删除";
    del.onclick = function(){
        var name = $("sql-Manager-Content-name");
        if (name.value !="") {
            var storage = window.localStorage;
            var sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            delete sqllist[name.value];
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-Manager-Content-table"));
            $("table-container").style.display = "block";
            $("edit-container").style.display = "none";
        }
    };
    tool.appendChild(del);

    var input = document.createElement("input");
    input.type = "file";
    input.id = "openJson";
    input.style.display = "none";
    input.className = "openJson";
    input.accept = "text/plain,.json";
    input.onchange = function () {
        if (window.FileReader) {
            try {
                let file = this.files[0];
                let reader = new FileReader();
                reader.onload = function () {
                    let isOver = confirm("您确定覆盖当前存储的所有脚本吗?");
                    if (isOver) {
                        console.log(this.result);
                        let storage = window.localStorage;
                        let sqllist = JSON.parse(this.result);
                        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                        getSQLList($("sql-Manager-Content-table"));
                        $("table-container").style.display = "block";
                        $("edit-container").style.display = "none";
                    }
                };
                reader.readAsText(file, __SQLEDITOR__.charset.options[__SQLEDITOR__.charset.value]);
            } catch (e) {
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
        openDownloadDialog(blob, "WebDataView-SQL-backup.json");
    };
    tool.appendChild(saveas);

    var exit = document.createElement("div");
    exit.className = "button";
    exit.innerText = "取消";
    exit.onclick = close.onclick = function(){
        $("sql-Manager-Content").parentNode.removeChild($("sql-Manager-Content"));
    };
    tool.appendChild(exit);
    return container;
}

function getSQLList(table){
    table.innerText = "";
    var tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    var th = document.createElement("th");
    th.className= "th";
    th.style.width = "32px";
    th.innerText = "选择";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.style.width = "50px";
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
            var name = $("sql-Manager-Content-name");
            var sql = $("sql-Manager-Content-sql");
            name.value = this.getAttribute("name");
            var _sql = messageDecode(this.getAttribute("sql"));
            _sql = _sql.substring(0, _sql.length - 1);
            sql.value = _sql;
            if (this.getElementsByClassName("check")[0].checked == true)
                this.getElementsByClassName("check")[0].removeAttribute("checked");
            else
                this.getElementsByClassName("check")[0].setAttribute("checked", "checked");
            $("table-container").style.display = "none";
            $("edit-container").style.display = "block";
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