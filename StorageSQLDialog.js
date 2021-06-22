function getStorageSql(key) {
    try {
        let storage = window.localStorage;
        let sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        return sqllist[key].sql.binary2str();
    } catch (e) {
        console.log(e);
        return null;
    }
}

function saveStorageSql(key, sql) {
    try {
        let storage = window.localStorage;
        let sqllist = {};
        if (storage.getItem(__CONFIGS__.STORAGE.SCRIPTS) == null)
            storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, "{}");
        else {
            sqllist = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.SCRIPTS));
        }
        sqllist[key] = {sql:sql.str2binary(),time:getNow()};
        storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
    } catch (e) {
        console.log(e);
    }
}

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
    container.appendChild(d);

    let contentContainer = document.createElement("div");
    contentContainer.className = contentContainer.id = "content-container";
    container.appendChild(contentContainer);

    let tablecontainer = document.createElement("div");
    tablecontainer.className = tablecontainer.id = "table-container";
    if (type == "_TO_SAVE_") {
        tablecontainer.style.display = "none";
    } else
        tablecontainer.style.display = "block";
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
     if (type == "_TO_SAVE_") {
         editcontainer.style.display = "block";
    } else
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
        viewMessage("Open " + __SQLEDITOR__.options.mode + " : " + editer.title);
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
            saveStorageSql(name.value, sql.value);
            getSQLList($("sql-Manager-Content-table"))
        }
        if (type == "_TO_SAVE_")
            editer.title = $("sql-Manager-Content-name").value;
        $("sql-Manager-Content").parentNode.removeChild($("sql-Manager-Content"));
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
        let hash = JSON.stringify(sqllist).hex_md5_hash();
        let wr = {
            appName: __VERSION__.name,
            backup: sqllist,
            hash: hash,
            date:getNow()
        };
        let blob = new Blob([str2ab(JSON.stringify(wr))], {type: "application/octet-stream"});
        openDownloadDialog(blob, __VERSION__.name + " SQL backup.json");
    };
    tool.appendChild(saveas);

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
                            if (confirm("文件名称:" + file.name + "\n"
                                + "文件大小:" + file.size + " bytes\n"
                                + "文件类型:" + file.type + "\n"
                                + "数据来源:" + js.appName + "\n"
                                + "校验代码:" + hash + "\n"
                                + "备份时间:" + ((typeof js.date) == "undefined"? file.lastModified.Format("yyyy-MM-dd hh:mm:ss.S"): js.date) + "\n\n"
                                + "您确定使用上述备份文件覆盖当前存储的所有脚本吗?")) {
                                let storage = window.localStorage;
                                storage.setItem(__CONFIGS__.STORAGE.SCRIPTS, JSON.stringify(sqllist));
                                getSQLList($("sql-Manager-Content-table"));
                                $("table-container").style.display = "block";
                                $("edit-container").style.display = "none";
                            }
                        } else {
                            alert("文件名称:" + file.name + "\n"
                                + "文件大小:" + file.size + " bytes\n"
                                + "文件类型:" + file.type + "\n"
                                + "数据来源:" + js.appName + "\n"
                                + "校验代码:" + hash + "\n"
                                + "备份时间:" + ((typeof js.date) == "undefined"? file.lastModified.Format("yyyy-MM-dd hh:mm:ss.S"): js.date) + "\n\n"
                                + "备份文件校验错误!")
                        }
                    }catch (e) {
                        alert("文件名称:" + file.name + "\n"
                            + "文件大小:" + file.size + " bytes\n"
                            + "文件类型:" + file.type + "\n\n"
                            + "该文件不是标准化的备份文件,请重新选择!")
                    }
                };
                reader.readAsText(file, __SQLEDITOR__.charset.options[__SQLEDITOR__.charset.value]);
            } catch (e) {
                alert("请选择需要导入的文件.")
            }
        } else {
            showMessage("本应用适用于Chrome或Edge浏览器。")
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
    th.style.width = "40px";
    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "sqls-checkall";
    check.style.width = "18px";
    check.onclick = function(){
        let sqls = $("sql-Manager-Content-table").getElementsByClassName("check");
        for (let i=0;i<sqls.length;i++){
            sqls[i].checked = this.checked;
            this.checked?sqls[i].setAttribute("checked", "checked"):sqls[i].removeAttribute("checked");
        }
    };
    th.style.textAlign = "center";
    th.appendChild(check);
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.style.width = "50px";
    th.innerText = "序号";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.innerText = "脚本名称";
    tr.appendChild(th);
    th = document.createElement("th");
    th.className= "th";
    th.style.width = "120px";
    th.innerText = "编辑时间";
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
        tr.onclick = function() {
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
        td.className= "td";
        let check = document.createElement("input");
        check.type = "checkbox";
        check.className = "check";
        check.style.width = "40px";
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
        td.innerText = td.title = name;
        tr.appendChild(td);

        td = document.createElement("td");
        td.className= "td";
        td.style.width = "120px";
        td.innerText = td.title = sqllist[name].time;
        tr.appendChild(td);
        i += 1;
    }
}