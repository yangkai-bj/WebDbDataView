String.prototype.toBoolean = function(){
    let str = this.toString().toLowerCase().trim();
    if (str == "true" || str == "false")
        return eval(str);
    else
        return false
};

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
    let o = {
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
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.isNumber = function(){
     //用于判断字符串是否是符合数字
    let str = this.toString();
    let reg = new RegExp(/^([-+])?\d+(\.[0-9]{1,19})?$/);
    //let result = reg.exec(str);
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
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
    let str = this.toString();
    let reg = RegExp(/^\d{6}((19|20)\d{2}(01|02|03|04|05|06|07|08|09|10|11|12)(01|02|03|04|05|06|07|08|09|10|11|12|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\d{3}[0-9xX])/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isPhoneNumber = function(){
    //用于简单判断是否是手机号码
    let str = this.toString();
    let reg = RegExp(/^1[3|4|5|7|8]\d{9}/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isDatetime = function () {
    let str = this.toString();
    try {
        let d = new Date(str);
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
    let target = this;
    try {
        while (target.includes(search)) {
            target = target.replace(search, replacement);
        }
    }catch (e) {
        console.log(e);
    }
    return target;
};

String.prototype.DataType = function(){
      //判断字符是否符合数字规则
     let str = this.trim();
     try {
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

String.prototype.toArray = function(def,sep) {
    //def:默认值,所有转换尝试失败后返回值,如果没有设置返回[];
    //sep:如果JSON和eval转换尝试失败后,采用分隔符进行分隔;
    let str = this;
    let tmp = [];
    try {
        tmp = JSON.parse(str);
        if (Array.isArray(tmp)) {
            return tmp;
        } else {
            throw new Error("err");
        }
    } catch (e) {
        try {
            tmp = eval(str.replaceAll("'",'"'));
            if (Array.isArray(tmp)) {
                return tmp;
            } else {
                throw new Error("err");
            }
        } catch (e) {
            try {
                if (typeof sep != "undefined") {
                    tmp = str.split(sep);
                    for(let i=0;i<tmp.length;i++) {
                        let t = tmp[i].slice();
                        if (t.DataType() == "int" || t.DataType() == "float") {
                            tmp[i] = Number(t);
                        }
                    }
                    return tmp;
                } else {
                    throw new Error("err");
                }
            }catch (e) {
                if (typeof def != "undefined")
                    return def;
                else
                    return [];
            }
        }
    }
}

function stringToHex(str){
    let val = "";
    for (let i = 0; i < str.length; i++) {
        if (val == "") {
            val = str.charCodeAt(i).toString(16);
        } else {
            val += "," + str.charCodeAt(i).toString(16);
        }
    }
    return val;
}

function checkGroupIndex(data, column, value){
    let index = null;
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        if (row[column].value == value) {
            index = i;
            break;
        }
    }
    return index;
}

function sortAsc(data) {
    let _data = [];
    if (data.length>0) {
        for (let i = 0; i < data.length; i++) {
            let dt = data[i];
            for (let d = 0; d < _data.length; d++) {
                if (dt == null || _data[d] == null){
                    if (dt != null && _data[d] == null){
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp
                    }
                } else if (dt.toString().isNumber() && _data[d].toString().isNumber()) {
                    if (dt < _data[d]) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp
                    }
                } else {
                    if (dt.toString().localeCompare(_data[d].toString()) < 0) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp
                    }
                }
            }
            _data.push(dt);
        }
    }
    return _data;
}

function getCount(data) {
    return data.length;
}

function getCountNumber(data) {
    let count = 0;
    for(let i=0;i<data.length;i++) {
        if (data[i].toString().isNumber())
            count += 1;
    }
    return count;
}

function getMin(data) {
    let min = data[0];
    for(let i=1;i<data.length;i++) {
        if (data[i].toString().isNumber() && min.toString().isNumber()) {
            if (min > data[i]) {
                min = data[i];
            }
        } else {
            if (min.toString().localeCompare(data[i].toString()) > 0) {
                min = data[i];
            }
        }
    }
    return min;
}

function getMax(data) {
    let max = data[0];
    for(let i=1;i<data.length;i++) {
        if (data[i].toString().isNumber() && max.toString().isNumber()) {
            if (max < data[i]) {
                max = data[i];
            }
        } else {
            if (max.toString().localeCompare(data[i].toString()) < 0) {
                max = data[i];
            }
        }
    }
    return max;
}

function getMedian(data){
    let _data = sortAsc(data);
    if (_data.length%2 == 1) {
        return _data[Math.floor(_data.length / 2)];
    } else{
        return (_data[_data.length / 2 - 1] + _data[_data.length / 2])/2;
    }
}

function getQuartile(data,quart) {
    //数组四分位计算
    let _data = sortAsc(data);
    if (quart == 1) {
        if (_data.length % 2 == 1) {
            let p = (_data.length + 1) * 0.25 - Math.floor((_data.length + 1) * 0.25);
            if (p > 0)
                return _data[Math.floor((_data.length + 1) * 0.25) - 1] + (_data[Math.floor((_data.length + 1) * 0.25)] - _data[Math.floor((_data.length + 1) * 0.25) - 1]) * p;
            else
                return _data[Math.floor((_data.length + 1) * 0.25) - 1];
        } else {
            let p = (_data.length + 1) / 4.0 - Math.floor((_data.length + 1) / 4.0);
            if (p > 0)
                return _data[Math.floor((_data.length + 1) / 4.0) - 1] + (_data[Math.floor((_data.length + 1) / 4.0)] - _data[Math.floor((_data.length + 1) / 4.0) - 1]) * p;
            else
                return _data[Math.floor((_data.length + 1) / 4.0) - 1];
        }
    }
    else if (quart == 3) {
        if (_data.length % 2 == 1) {
            let p = (_data.length + 1) * 0.75 - Math.floor((_data.length + 1) * 0.75);
            if (p > 0)
                return _data[Math.floor((_data.length + 1) * 0.75) - 1] + (_data[Math.floor((_data.length + 1) * 0.75)] - _data[Math.floor((_data.length + 1) * 0.75) - 1]) * p;
            else
                return _data[Math.floor((_data.length + 1) * 0.75) - 1];
        } else {
            let p = 3 * (_data.length + 1) / 4.0 - Math.floor(3 * (_data.length + 1) / 4.0);
            if (p > 0)
                return _data[Math.floor(3 * (_data.length + 1) / 4.0) - 1] + (_data[Math.floor(3 * (_data.length + 1) / 4.0)] - _data[Math.floor(3 * (_data.length + 1) / 4.0) - 1]) * p;
            else
                return _data[Math.floor(3 * (_data.length + 1) / 4.0) - 1];
        }
    } else if (quart == 2)
        return getMedian(data);
    else
        return null
}

function getIQR(data){
    return getQuartile(data,3) - getQuartile(data,1);
}

function getSum(data) {
    let sum = 0;
    for(let i=0;i<data.length;i++) {
        if (data[i].toString().isNumber()) {
            sum += Number(data[i]);
        }
    }
    return sum;
}

function getAverage(data) {
    let sum = 0;
    let count = 0;
    for(let i=0;i<data.length;i++) {
        if (data[i].toString().isNumber()) {
            sum += Number(data[i]);
            count += 1;
        }
    }
    try {
        return sum / count;
    }catch (e) {
        return e;
    }
}

function getVariance(data){
    //总体方差
    try {
        let avg = getAverage(data);
        let sum = 0;
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].toString().isNumber()) {
                sum += Math.pow((Number(data[i]) - avg), 2);
                count += 1;
            }
        }
        try {
            return sum / count;
        } catch (e) {
            return e;
        }
    }catch (e) {
        return e;
    }
}

function getStdev(data) {
    //总体标准差
    let variance = getletiance(data);
    try {
        return Math.pow(variance, 1 / 2);
    }catch (e) {
        return e;
    }
}

function getSterr(data) {
    //标准误差
    let stdev = getStdev(data);
    let n = getCountNumber(data);
    try {
        return stdev / Math.pow(n, 1 / 2);
    } catch (e) {
        return e;
    }
}

function getRange(data){
    //全距
    try {
        return Number(getMax(data)) - Number(getMin(data));
    }catch (e) {
        return e;
    }
}

function subtotal(column, target, calculation) {
    //当没有选择分组字段，即column=""时，需要特殊处理。
    if (__DATASET__.result.length > 0) {
        let dataset = __DATASET__.result[__DATASET__.default.sheet];
        let data = [];
        let columns = [];
        if (column != "") {
            for (let i = 0; i < dataset.columns.length; i++) {
                if (dataset.columns[i].name == column)
                    columns.push({id: 0, name: column, style: {textAlign: "center"}, order: "", type: "string"});
            }
        } else {
            columns.push({
                id: 0,
                name: "全部",
                style: {"text-align": "center"},
                order: "",
                type: "string"
            });
        }
        columns.push({
            id: 1,
            name: target + "-" + calculation,
            style: {"text-align": "center"},
            order: "",
            type: "string"
        });
        for (let i = 0; i < dataset.data.length; i++) {
            let r = dataset.data[i];
            let index = null;
            if (column != "")
                index = checkGroupIndex(data, column, r[column].value);
            else
                index = checkGroupIndex(data, "全部", "全部");

            if (index == null) {
                let row = {};
                if (column != "") {
                    row[column] = {
                        rowid: data.length,
                        colid: 0,
                        value: r[column].value,
                        type: r[column].type,
                        format: r[column].format,
                        style: r[column].style,
                    };
                } else {
                    row["全部"] = {
                        rowid: data.length,
                        colid: 0,
                        value: "全部",
                        type: "string",
                        format: null,
                        style: {"text-align": "center", "color": "black"},
                    };
                }
                row[target + "-" + calculation] = {
                    rowid: data.length,
                    colid: 1,
                    value: "",
                    type: "string",
                    format: "#,##0.######",
                    style: {"text-align": "center", "color": "black"},
                    data: [r[target].value],
                    calculation: calculation
                };
                data.push(row);
                index = data.length - 1;
            } else {
                data[index][target + "-" + calculation].data.push(r[target].value);
            }
            switch (calculation) {
                case "COUNT":
                    data[index][target + "-" + calculation].value = getCount(data[index][target + "-" + calculation].data);
                    break;
                case "NUMCOUNT":
                    data[index][target + "-" + calculation].value = getCountNumber(data[index][target + "-" + calculation].data);
                    break;
                case "MIN":
                    data[index][target + "-" + calculation].value = getMin(data[index][target + "-" + calculation].data);
                    break;
                case "MAX":
                    data[index][target + "-" + calculation].value = getMax(data[index][target + "-" + calculation].data);
                    break;
                case "SUM":
                    data[index][target + "-" + calculation].value = getSum(data[index][target + "-" + calculation].data);
                    break;
                case "AVERAGE":
                    data[index][target + "-" + calculation].value = getAverage(data[index][target + "-" + calculation].data);
                    break;
                case "MEDIAN":
                    data[index][target + "-" + calculation].value = getMedian(data[index][target + "-" + calculation].data);
                    break;
                case "VARIANCE":
                    data[index][target + "-" + calculation].value = getVariance(data[index][target + "-" + calculation].data);
                    break;
                case "STDEV":
                    data[index][target + "-" + calculation].value = getStdev(data[index][target + "-" + calculation].data);
                    break;
                case "STERR":
                    data[index][target + "-" + calculation].value = getSterr(data[index][target + "-" + calculation].data);
                    break;
                case "RANGE":
                    data[index][target + "-" + calculation].value = getRange(data[index][target + "-" + calculation].data);
                    break;
            }
            data[index][target + "-" + calculation].type = typeof data[index][target + "-" + calculation].value
        }
        return {columns: columns, data: data};
    }
}

