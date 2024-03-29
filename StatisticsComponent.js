
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
                        dt = tmp;
                    }
                } else if (dt.toString().isNumber() && _data[d].toString().isNumber()) {
                    if (dt < _data[d]) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                } else if (dt.toString().isDatetime() && _data[d].toString().isDatetime()){
                    if ((new Date(dt)) < (new Date(_data[d]))) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                } else {
                    if (dt.toString().localeCompare(_data[d].toString()) < 0) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                }
            }
            _data.push(dt);
        }
    }
    return _data;
}

function sortDesc(data) {
    let _data = [];
    if (data.length>0) {
        for (let i = 0; i < data.length; i++) {
            let dt = data[i];
            for (let d = 0; d < _data.length; d++) {
                if (dt == null || _data[d] == null){
                    if (dt != null && _data[d] == null){
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                } else if (dt.toString().isNumber() && _data[d].toString().isNumber()) {
                    if (dt > _data[d]) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                } else if (dt.toString().isDatetime() && _data[d].toString().isDatetime()){
                    if ((new Date(dt)) > (new Date(_data[d]))) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
                    }
                } else {
                    if (dt.toString().localeCompare(_data[d].toString()) >= 0) {
                        let tmp = _data[d];
                        _data[d] = dt;
                        dt = tmp;
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
        if (data[i] != null && data[i].toString().isNumber())
            count += 1;
    }
    return count;
}

function getMin(data) {
    let min = data[0];
    for(let i=1;i<data.length;i++) {
        if (data[i] != null && min != null &&data[i].toString().isNumber() && min.toString().isNumber()) {
            if (min > data[i]) {
                min = data[i];
            }
        } else {
            if (data[i] != null && min != null && min.toString().localeCompare(data[i].toString()) > 0) {
                min = data[i];
            }
        }
    }
    return min;
}

function getMax(data) {
    let max = data[0];
    for(let i=1;i<data.length;i++) {
        if (data[i] != null && max != null && data[i].toString().isNumber()  && max.toString().isNumber()) {
            if (max < data[i]) {
                max = data[i];
            }
        } else {
            if (data[i] != null && data[i] != null && max.toString().localeCompare(data[i].toString()) < 0) {
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
        if (data[i] != null && data[i].toString().isNumber()) {
            sum += Number(data[i]);
        }
    }
    return sum;
}

function getAverage(data) {
    let sum = 0;
    let count = 0;
    for(let i=0;i<data.length;i++) {
        if (data[i] != null && data[i].toString().isNumber()) {
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
            if (data[i] != null && data[i].toString().isNumber()) {
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
        let title = dataset.title;
        title.push(calculation);
        return {
            columns: columns,
            data: data,
            title: title,
            sql: dataset.sql,
            type: dataset.type,
            parameter: dataset.parameter,
            time: getNow()
        };
    }
}


