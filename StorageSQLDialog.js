function storageSqlDialog(sql, editer, type){
    let container = document.createElement("div");
    container.id = "sql-Manager-Content";
    container.className = "sql-Manager-Content";

    let title = document.createElement("div");
    title.className = "container-title";
    let span = document.createElement("span");
    span.innerHTML = "● 脚本管理 ";
    title.appendChild(span);
    let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
    close.className = "container-close";
    title.appendChild(close);
    container.appendChild(title);

    let hr = document.createElement("hr");
    container.appendChild(hr);

    let d = document.createElement("div");
    d.className = "toolbar";
    let b = document.createElement("a");
    b.className = "tabButton";
    b.innerHTML = "列表";
    b.onclick = function () {
        $("table-container").style.display = "block";
        $("edit-container").style.display = "none";
    };
    d.appendChild(b);
    b = document.createElement("a");
    b.className = "tabButton";
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
    let sqlname = document.createElement("input");
    sqlname.id = sqlname.className = "sql-Manager-Content-name";
    sqlname.placeholder="请输入脚本名称.";
    editcontainer.appendChild(sqlname);

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
        viewMessage("Open SQL/Function : " + editer.title);
        editer.codeMirror.setValue($("sql-Manager-Content-sql").value);
        $("sql-Manager-Content").parentNode.removeChild($("sql-Manager-Content"));
    };
    tool.appendChild(open);

    let add = document.createElement("div");
    add.className = "button";
    add.innerText = "保存";
    add.onclick = function(){
        let name = $("sql-Manager-Content-name");
        let sql = $("sql-Manager-Content-sql");
        if (name.value !="" && sql.value != "") {
            let storage = window.localStorage;
            let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            sqllist[name.value] = messageEncode(sql.value);
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-Manager-Content-table"))
        }
        if (type == "_TO_SAVE_")
            editer.title = $("sql-Manager-Content-name").value;
    };
    tool.appendChild(add);

    let del = document.createElement("div");
    del.className = "button";
    del.innerText = "删除";
    del.onclick = function(){
        let name = $("sql-Manager-Content-name");
        if (name.value !="") {
            let storage = window.localStorage;
            let sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
            delete sqllist[name.value];
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
            getSQLList($("sql-Manager-Content-table"));
            $("table-container").style.display = "block";
            $("edit-container").style.display = "none";
        }
    };
    tool.appendChild(del);

    let rename = document.createElement("div");
    rename.className = "button";
    rename.innerText = "重命名";
    rename.onclick = function(){
        let name = $("sql-Manager-Content-name");
        let newname = prompt("请输入新的脚本名称:");
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
            if (name.value != "" && newname.trim() != "") {
                let tmp = {};
                for (sqlname in sqllist) {
                    if (sqlname == name.value) {
                        tmp[newname] = sqllist[sqlname];
                    } else {
                        tmp[sqlname] = sqllist[sqlname];
                    }
                }
                storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(tmp));
                getSQLList($("sql-Manager-Content-table"));
                $("table-container").style.display = "block";
                $("edit-container").style.display = "none";
                name.value = newname;
            }
        } else
            alert("名称 " + newname + " 已经存在，请重新命名.")
    };
    tool.appendChild(rename);

    let saveas = document.createElement("div");
    saveas.type = "div";
    saveas.className="button";
    saveas.innerText = "备份";
    saveas.onclick = function () {
        let storage = window.localStorage;
        let sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        let blob = new Blob([str2ab(JSON.stringify(sqllist))], {type: "application/octet-stream"});
        openDownloadDialog(blob, "WebDataView-SQL-backup.json");
    };
    tool.appendChild(saveas);

    let input = document.createElement("input");
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

    let loadfile = document.createElement("div");
    loadfile.type = "div";
    loadfile.className="button";
    loadfile.innerText = "恢复";
    loadfile.onclick = function () {
        $("openJson").click();
    };
    tool.appendChild(loadfile);

    let exit = document.createElement("div");
    exit.className = "button";
    exit.innerText = "取消";
    exit.onclick = close.onclick = function(){
        $("sql-Manager-Content").parentNode.removeChild($("sql-Manager-Content"));
    };
    tool.appendChild(exit);

    setDialogDrag(title);

    return container;
}

function getSQLList(table){
    table.innerText = "";
    let tr = document.createElement("tr");
    tr.className = "tr";
    table.appendChild(tr);
    let th = document.createElement("th");
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
    let storage = window.localStorage;
    let sqllist = {};
    if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) ==  null)
        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS ,"{}");
    else {
        sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
    }
    let i = 0;
    for (let name in sqllist){
        tr = document.createElement("tr");
        if (i % 2 > 0) {
            tr.className = "alt-line";
            //单数行
        }
        tr.setAttribute("name", name);
        tr.setAttribute("sql", sqllist[name]);
        tr.onclick = function() {
            let name = $("sql-Manager-Content-name");
            let sql = $("sql-Manager-Content-sql");
            name.value = this.getAttribute("name");
            let _sql = messageDecode(this.getAttribute("sql"));
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

        let td = document.createElement("td");
        td.className= "td";
        let check = document.createElement("input");
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