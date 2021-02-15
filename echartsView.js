
String.prototype.toBoolean = function(){
    let str = this.toString().toLowerCase().trim();
    if (str == "true" || str == "false")
        return eval(str);
    else
        return false
};

function stringToHex(str){
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "") {
            val = str.charCodeAt(i).toString(16);
        } else {
            val += "," + str.charCodeAt(i).toString(16);
        }
    }
    return val;
}

function getEcharts(container, width, height, dataset, configs) {
    $("copyright").innerHTML = getUserConfig("CopyRight");
    if (echarts.version >= "5.0.2") {
        switch (configs.echartsType.value) {
            case "Bar":
                return getBar(container, width, height, dataset, configs);
                break;
            case "Polar":
                return getPolar(container, width, height, dataset, configs);
                break;
            case "Line":
                return getLine(container, width, height, dataset, configs);
                break;
            case "Line3D":
                return getLine3D(container, width, height, dataset, configs);
                break;
            case "BarAndLine":
                return getBarAndLine(container, width, height, dataset, configs);
                break;
            case "AreaStyle":
                return getAreaStyle(container, width, height, dataset, configs);
                break;
            case "TransversBar":
                return getTransversBar(container, width, height, dataset, configs);
                break;
            case "Pie":
                return getPie(container, width, height, dataset, configs);
                break;
            case "Ring":
                return getRing(container, width, height, dataset, configs);
                break;
            case "Rose":
                return getRose(container, width, height, dataset, configs);
                break;
            case "Gauge":
                //return getGaugeWithOne(container, width, height, dataset,configs);
                return getCategoryLineForGauge(container, width, height, dataset, configs);
                break;
            case "Radar":
                return getRadar(container, width, height, dataset, configs);
                break;
            case "Regression":
                return getRegression(container, width, height, dataset, configs);
                break;
            case "Relation":
                return getRelation(container, width, height, dataset, configs);
                break;
            case "Tree":
                return getTree(container, width, height, dataset, configs);
                break;
            case "WebkitDep":
                return getWebkitDep(container, width, height, dataset, configs);
                break;
            case "Scatter":
                return getScatter(container, width, height, dataset, configs);
                break;
            case "Funnel":
                return getFunnel(container, width, height, dataset, configs);
                break;
            case "WordCloud":
                return getWordCloud(container, width, height, dataset, configs);
                break;
            case "Liqiud":
                return getCategoryLineForLiqiud(container, width, height, dataset, configs);
                break;
            case "Calendar":
                return getCalendar(container, width, height, dataset, configs);
                break;
            case "GeoOfChina":
                //return getGeoOfChina(container, width, height, dataset,configs);
                return getCategoryLineForGeoOfChina(container, width, height, dataset, configs);
                break;
            case "GeoOfLocal":
                //return getGeoOfLocal(container, width, height, dataset,configs);
                return getCategoryLineForGeoOfLocal(container, width, height, dataset, configs);
                break;
            case "Bar3D":
                return getBar3D(container, width, height, dataset, configs);
                break;
            case "Scatter3D":
                return getScatter3D(container, width, height, dataset, configs);
                break;
            case "Pie3D":
                return getPie3D(container, width, height, dataset, configs);
                break;
            case "CategoryLine":
                return getCategoryLine(container, width, height, dataset, configs);
                break;
            case "FunctionLine":
                return getFunctionLine(container, width, height, dataset, configs);
                break;
            case "GeoMigrateLinesOfChinaCity":
                return getGeoMigrateLinesOfChinaCity(container, width, height, dataset, configs);
                break;
            case "ScrollingScreen":
                return getScrollingScreen(container, width, height, dataset, configs);
                break;
            case "WalkingLantern":
                return getWalkingLantern(container, width, height, dataset, configs);
                break;
            case "WindowShades":
                return getWindowShades(container, width, height, dataset, configs);
                break;
            case "Surface":
                return getSurface(container, width, height, dataset, configs);
                break;
            case "Boxplot":
                return getBoxplot(container, width, height, dataset, configs);
                break;
            case "Clock":
                return getClock(container, width, height, dataset, configs);
                break;
            case "Candlestick":
                return getCandlestick(container, width, height, dataset, configs);
                break;
            case "Banners":
                return getBanners(container, width, height, dataset, configs);
                break;
            case "Sunburst":
                return getSunburst(container, width, height, dataset, configs);
                break;
            case "Treemap":
                return getTreemap(container, width, height, dataset, configs);
                break;
            case "ParallelAxis":
                return getParallelAxis(container, width, height, dataset, configs);
                break;
            case "Sankey":
                return getSankey(container, width, height, dataset, configs);
                break;
            case "ThemeRiver":
                return getThemeRiver(container, width, height, dataset, configs);
                break;
        }
    } else {
         alert("本模块支持Echarts5.0.2及以上版本,您目前使用的版本是" + echarts.version + ".");
    }
}

var __ECHARTS__ = {
    history: {},
    addHistory: function(container, configs, dataset, width, height) {
        let id = container.getAttribute("_echarts_instance_");
        __ECHARTS__.history[id] = JSON.stringify({
            id: id,
            configs: configs,
            dataset: dataset,
            contrainer: container,
            width: width,
            height: height,
        });
    },
    sets: {
        data: [],
        add: function (id) {
            let ex = false;
            for (let i = 0; i < __ECHARTS__.sets.data.length; i++) {
                if (__ECHARTS__.sets.data[i] == id) {
                    ex = true;
                    break;
                }
            }
            if (ex == false)
                __ECHARTS__.sets.data.push(id);
        }
    },
    layouts: {
        单一: {
            data: [
                [0, 0, 99, 99],
            ],
            position: "absolute"
        },
        两行: {
            data: [
                [0, 0, 99, 49],
                [0, 50, 99, 49]
            ],
            position: "absolute"
        },
        三行: {
            data: [
                [0, 0, 99, 32],
                [0, 33, 99, 32],
                [0, 66, 99, 32]
            ],
            position: "absolute"
        },
        两列: {
            data: [
                [0, 0, 49, 99],
                [50, 0, 49, 99]
            ],
            position: "absolute"
        },
        三列: {
            data: [
                [0, 0, 32, 99],
                [33, 0, 32, 99],
                [66, 0, 32, 99]
            ],
            position: "absolute"
        },
        两行两列: {
            data: [
                [0, 0, 49, 49],
                [50, 0, 49, 49],
                [0, 50, 49, 49],
                [50, 50, 49, 49],
            ],
            position: "absolute"
        },
        专业: {
            data: [
                [0, 0, 32, 49],
                [33, 0, 32, 24],
                [33, 25, 32, 24],
                [66, 0, 33, 49],
                [0, 50, 49, 49],
                [50, 50, 49, 49]
            ],
            position: "absolute"
        }
    },
    configs: {
        hr_echarts_basic: {name: "基本参数", value: "", type: "hr"},
        version: {
            name: "Echars版本",
            value: echarts.version,
            options: [
                new Option(echarts.version, echarts.version)
            ],
            type: "select"
        },
        local: {
            name: "语言类型",
            value: "ZH",
            options: [
                new Option("英语", "EN"),
                new Option("中文", "ZH")],
            type: "select"
        },
        loadingTimes: {name: "载入时间(秒)", value: 2, type: "input"},
        echartsType: {
            name: "视图类型",
            value: "Bar",
            options: [
                new Option("柱状图", "Bar"),
                new Option("线型图", "Line"),
                new Option("柱状&线型", "BarAndLine"),
                new Option("条形图", "TransversBar"),
                new Option("面积图", "AreaStyle"),
                new Option("饼图", "Pie"),
                new Option("圆环图", "Ring"),
                new Option("玫瑰图", "Rose"),
                new Option("雷达图", "Radar"),
                new Option("极坐标", "Polar"),
                new Option("回归序列", "Regression"),
                new Option("盒须图", "Boxplot"),
                new Option("K线图", "Candlestick"),
                new Option("散点图", "Scatter"),
                new Option("漏斗/金字塔", "Funnel"),
                new Option("树形结构", "Tree"),
                new Option("关系图", "Relation"),
                new Option("分类集中", "WebkitDep"),
                new Option("词云图", "WordCloud"),
                new Option("水球图", "Liqiud"),
                new Option("仪表盘", "Gauge"),
                new Option("时钟", "Clock"),
                new Option("旭日图", "Sunburst"),
                new Option("矩形树图", "Treemap"),
                new Option("日历图", "Calendar"),
                new Option("类目轴", "CategoryLine"),
                new Option("平行坐标", "ParallelAxis"),
                new Option("桑基图", "Sankey"),
                new Option("主题河流图", "ThemeRiver"),
                new Option("全国地图", "GeoOfChina"),
                new Option("本地地图", "GeoOfLocal"),
                new Option("迁徙地图", "GeoMigrateLinesOfChinaCity"),
                new Option("横幅标语", "Banners"),
                new Option("数据滚屏", "ScrollingScreen"),
                new Option("数据走马灯", "WalkingLantern"),
                new Option("数据百叶窗", "WindowShades"),
                new Option("柱状图(3D)", "Bar3D"),
                new Option("线型图(3D)", "Line3D"),
                new Option("圆环图(3D)", "Pie3D"),
                new Option("散点图(3D)", "Scatter3D"),
                new Option("曲面图(3D)", "Surface"),
            ],
            type: "select"
        },
        echartsTheme: {
            name: "视图主题",
            value: "",
            options: [
                new Option("默认", ""),
                new Option("单色", "monochrome"),
                new Option("粉笔", "Chalk"),
                new Option("黑暗", "Dark"),
                new Option("橙色", "Essos"),
                new Option("信息", "Infographic"),
                new Option("浅色", "light"),
                new Option("甜饼", "Macarons"),
                new Option("紫色", "Purple"),
                new Option("热情", "Roma"),
                new Option("阳光", "Shine"),
                new Option("怀旧", "Vintage"),
                new Option("湖蓝", "Walden"),
                new Option("大陆", "Westeros"),
                new Option("仙境", "Wonderland"),
                new Option("极简", "simple")],
            type: "select"
        },
        backgroundColor: {name: "图像背景", value: "transparent", type: "input"},
        ariaEnable: {
            name: "无障碍访问",
            value: "false",
            options: [new Option("开启", "true"), new Option("关闭", "false")],
            type: "select"
        },

        hr_grid: {name: "整体布局", value: "", type: "hr"},
        grid_top: {name: "上边距(%)", value: "10%", type: "input"},
        grid_bottom: {name: "下边距(%)", value: "10%", type: "input"},
        grid_left: {name: "左边距(%)", value: "10%", type: "input"},
        grid_right: {name: "右边距(%)", value: "10%", type: "input"},
        grid_containLabel: {
            name: "包含轴标签",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_toolbox: {name: "视图工具", value: "", type: "hr"},
        toolboxDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolbox_top: {name: "上边距(%)", value: "5%", type: "input"},
        toolbox_left: {name: "左边距(%)", value: "97%", type: "input"},
        toolbox_orient: {
            name: "布局方向",
            value: "vertical",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },
        toolbox_textPosition: {
            name: "文字位置",
            value: "left",
            options: [new Option("顶部", "top"), new Option("底部", "bottom"), new Option("左边", "left"), new Option("右边", "right")],
            type: "select"
        },
        toolboxFeatureSaveAsImage: {
            name: "保存图像",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureSaveAsImageBackgroundColor: {
            name: "图像背景",
            value: "auto",
            options: [new Option("自动", "auto"), new Option("白色", "#ffffff"), new Option("透明", "transparent")],
            type: "select"
        },
        toolboxFeatureRestore: {
            name: "图像还原",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureDataView: {
            name: "数据视图",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureDataZoom: {
            name: "数据缩放",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureMagicType: {
            name: "图像转换",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureBrush: {
            name: "区域选择",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        toolboxFeatureMultiScreen: {
            name: "视图组合",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_tooltip: {name: "提示组件", value: "", type: "hr"},
        tooltipDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        axisPointerType: {
            name: "指示器类型",
            value: "shadow",
            options: [new Option("阴影", "shadow"), new Option("线型", "line"), new Option("交叉", "cross"), new Option("不设置", "none")],
            type: "select"
        },

        hr_title: {name: "标题", value: "", type: "hr"},
        titleDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        titlePosition: {
            name: "标题位置",
            value: "left",
            options: [new Option("左边", "left"), new Option("居中", "center"), new Option("右边", "right")],
            type: "select"
        },
        titleText: {name: "主标题名称", value: "", type: "input"},
        titleTextColor: {value: "#e6e6e6", name: "主标题颜色", type: "color"},
        titleTextFontSize: {name: "主标题字号", value: 16, type: "input"},
        titleTextLink: {name: "主标题超链接", value: "", type: "input"},
        titleSubText: {name: "副标题名称", value: "", type: "input"},
        titleSubTextColor: {value: "#e6e6e6", name: "副标题颜色", type: "color"},
        titleSubTextFontSize: {name: "副标题字号", value: 12, type: "input"},
        titleSubTextLink: {name: "副标题超链接", value: "", type: "input"},

        hr_legend: {name: "图例", value: "", type: "hr"},
        legendDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        legendIcon: {
            name: "图标",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("空心圆", "emptyCircle"), new Option("三角形", "triangle"), new Option("空心三角形", "emptyTriangle"), new Option("菱形", "diamond"), new Option("空心菱形", "emptyDiamond"), new Option("箭头", "arrow"), new Option("空心箭头", "emptyArrow"), new Option("图钉", "pin"), new Option("空心图钉", "emptyPin")],
            type: "select"
        },
        legendSelectedMode: {
            name: "选择模式",
            value: "multiple",
            options: [new Option("单选", "single"), new Option("多选", "multiple")],
            type: "select"
        },
        legendPositionTop: {name: "上边距(%)", value: "1%", type: "input"},
        legendPositionLeft: {name: "左边距(%)", value: "50%", type: "input"},
        legendType: {
            name: "显示类型",
            value: "plain",
            options: [new Option("简单", "plain"), new Option("滚动", "scroll")],
            type: "select"
        },
        legendOrient: {
            name: "布局方向",
            value: "horizontal",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },
        legendTextColor: {name: "文字颜色", value: "#e6e6e6", type: "color"},

        hr_axis: {name: "坐标轴", value: "", type: "hr"},
        axisLineDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        axisColor: {name: "轴线颜色", value: "#e6e6e6", type: "color"},
        axisTextColor: {name: "标签颜色", value: "#e6e6e6", type: "color"},
        splitXLineDisplay: {
            name: "显示X轴分隔线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        splitYLineDisplay: {
            name: "显示Y轴分隔线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        splitXAreaDisplay: {
            name: "显示X轴分割区",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        splitYAreaDisplay: {
            name: "显示Y轴分割区",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        xAxisLabelRotate: {name: "X轴标签角度", value: 0, type: "input"},
        yAxisLabelRotate: {name: "Y轴标签角度", value: 0, type: "input"},
        xAxisInverse: {
            name: "X轴反向",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        yAxisInverse: {
            name: "Y轴反向",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_bar: {name: "柱状图", value: "", type: "hr"},
        barLabelDisplay: {
            name: "显示标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        barItemStyleBorderRadius: {name: "圆角半径", value: 0, type: "input"},
        barEmphasisLabelDisplay: {
            name: "显示热点标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        labelBarTextColor: {name: "标签颜色", value: "auto", type: "color"},
        labelBarFontSize: {name: "标签字号", value: 12, type: "input"},
        barLabelPosition: {
            name: "标签位置",
            value: "top",
            options: [new Option("顶部", "top"), new Option("左边", "left"), new Option("右边", "right"), new Option("底部", "bottom"),
                new Option("内部顶部", "insideTop"), new Option("内部左边", "insideLeft"), new Option("内部右边", "insideRight"), new Option("内部底部", "insideBottom")],
            type: "select"
        },
        barLabelRotate: {name: "标签旋转度数", value: 0, type: "input"},

        hr_line: {name: "线形图", value: "", type: "hr"},
        lineStyleWidth: {name: "线条宽度", value: 2, type: "input"},
        lineLabelDisplay: {
            name: "显示标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineEmphasisLabelDisplay: {
            name: "显示热点标签",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineLabelTextColor: {name: "标签颜色", value: "auto", type: "color"},
        lineLabelRotate: {name: "标签旋转度数", value: 0, type: "input"},
        lineLabelFontSize: {name: "标签字号", value: 12, type: "input"},
        lineSmooth: {
            name: "使用平滑线",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineSymbol: {
            name: "数据符号",
            value: "emptyCircle",
            options: [new Option("圆形", "circle"), new Option("空心圆", "emptyCircle"), new Option("三角形", "triangle"), new Option("空心三角形", "emptyTriangle"), new Option("菱形", "diamond"), new Option("空心菱形", "emptyDiamond"), new Option("箭头", "arrow"), new Option("空心箭头", "emptyArrow"), new Option("图钉", "pin"), new Option("空心图钉", "emptyPin")],
            type: "select"
        },
        lineSymbolSize: {name: "符号大小", value: 5, type: "input"},
        lineMarkPointMin: {
            name: "最小值点",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineMarkPointMax: {
            name: "最大值点",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineMarkLineMin: {
            name: "最小值线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineMarkLineMax: {
            name: "最大值线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        lineMarkLineAvg: {
            name: "平均值线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_polar:{name: "极坐标", value: "", type: "hr"},
        polarType: {
            name: "图形类别",
            value: "line",
            options: [new Option("线型图", "line"), new Option("柱状图", "bar"), new Option("面积图", "area")],
            type: "select"
        },
        polarRoundCap:{
            name: "圆角",
            value: "false",
            options: [new Option("否", "false"), new Option("是", "true")],
            type: "select"
        },

        hr_regression: {name: "趋势/回归", value: "", type: "hr"},
        regressionType: {name: "趋势/回归类型", value: "直线", options: ["直线", "指数", "对数", "多项式"], type: "select"},
        regressionPolynomialOrder: {name: "多项式阶数", value: 2, type: "input"},
        regressionForwardPeroids: {name: "趋势/回归前推周期", value: 0, type: "input"},
        regressionExpressionDisplay: {
            name: "显示表达式",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        regressionExpressionColor: {name: "表达式颜色", value: "auto", type: "color"},

        hr_Boxplot: {name: "盒须图", value: "", type: "hr"},
        boxplotScatterType: {
            name: "节点类型",
            value: "scatter",
            options: [new Option("静态散点", "scatter"), new Option("效应散点", "effectScatter")],
            type: "select"
        },
        boxplotScatterSymbolSize: {name: "节点大小", value: "[6,18]", type: "input"},
        boxplotScatterSymbolShape: {
            name: "节点形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("四边形", "rect"), new Option("圆角四边形", "roundRect"), new Option("三角形", "triangle"), new Option("菱形", "diamond"), new Option("图钉", "pin"), new Option("箭头", "arrow"), new Option("不设置", "none")],
            type: "select"
        },
        boxplotNormalDisplay: {
            name: "显示正常数据",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        boxplotOutlierDisplay: {
            name: "显示异常数据",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_candlestick: {name: "K线图", value: "", type: "hr"},
        candlestickUpColor: {name: "阳线颜色", value: '#ec0000', type: "color"},
        candlestickUpBorderColor: {name: "阳线边线", value: '#8A0000', type: "color"},
        candlestickDownColor: {name: "阴线颜色", value: '#00da3c', type: "color"},
        candlestickDownBorderColor: {name: "阴线边线", value: '#008F28', type: "color"},

        hr_pie: {name: "饼图/圆环/玫瑰", value: "", type: "hr"},
        outRadius: {name: "外半径(%)", value: "70%", type: "input"},
        inRadius: {name: "内半径(%)", value: "35%", type: "input"},
        pieSelectedMode: {
            name: "选择模式",
            value: "single",
            options: [new Option("单选", "single"), new Option("多选", "multiple")],
            type: "select"
        },
        pieLabelDisplay: {
            name: "显示标签",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        pieLabelPosition: {
            name: "标签位置",
            value: "auto",
            options: [new Option("auto", "auto"), new Option("center", "center")],
            type: "select"
        },
        pieItemStyleBorderRadius: {
            name: "圆角半径", value: 0, type: "input"
        },
        pieLabelFontSize: {name: "标签字号", value: 12, type: "input"},
        pieLabelAlignTo: {
            name: "标签对齐方式",
            value: "none",
            options: [new Option("不对齐", "none"), new Option("标签线", "labelLine"), new Option("边缘", "edge")],
            type: "select"
        },
        richTextLabel: {
            name: "富文本标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        groupWith: {name: "每行序列数", value: 2, type: "input"},
        animationType: {
            name: "初始动画",
            value: "expansion",
            options: [new Option("膨胀", "expansion"), new Option("逐级", "scale")],
            type: "select"
        },
        animationTypeUpdate: {
            name: "更新动画",
            value: "transition",
            options: [new Option("过渡", "transition"), new Option("膨胀", "expansion")],
            type: "select"
        },

        hr_radar: {name: "雷达图", value: "", type: "hr"},
        radarShape: {
            name: "形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("多边形", "polygon")],
            type: "select"
        },
        radarAreaDisplay: {
            name: "显示分区",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        radarNameDisplay: {
            name: "显示名称",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        radarLabelRotate: {name: "标签旋转度数", value: 0, type: "input"},
        radarSplitNumber: {name: "分割段数", value: 5, type: "input"},
        radarSameMax: {
            name: "同基比较",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_scatter: {name: "散点图", value: "", type: "hr"},
        scatterType: {
            name: "节点类型",
            value: "scatter",
            options: [new Option("静态散点", "scatter"), new Option("效应散点", "effectScatter")],
            type: "select"
        },
        scatterSymbolSize: {name: "节点大小", value: "[6,18]", type: "input"},
        scatterSymbolShape: {
            name: "节点形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("四边形", "rect"), new Option("圆角四边形", "roundRect"), new Option("三角形", "triangle"), new Option("菱形", "diamond"), new Option("图钉", "pin"), new Option("箭头", "arrow"), new Option("不设置", "none")],
            type: "select"
        },

        hr_wordCloud: {name: "词云图", value: "", type: "hr"},
        wordCloudShape: {
            name: "形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("心形", "cardioid"), new Option("菱形", "diamond"), new Option("三角形", "triangle"), new Option("右向三角形", "triangle-forward"), new Option("五边形", "pentagon"), new Option("星形", "star")],
            type: "select"
        },
        wordCloudMinFontSize: {name: "最小字号", value: 12, type: "input"},
        wordCloudMaxFontSize: {name: "最大字号", value: 60, type: "input"},
        wordCloudRotationRange: {name: "旋转角度", value: 90, type: "input"},

        hr_liqiud: {name: "水球图", value: "", type: "hr"},
        liqiudShape: {
            name: "形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("四边形", "rect"), new Option("圆角四边形", "roundRect"), new Option("三角形", "triangle"), new Option("菱形", "diamond"), new Option("图钉", "pin"), new Option("箭头", "arrow"), new Option("容器", "container"), new Option("鲸鱼", "whale")],
            type: "select"
        },
        liqiudFontSize: {name: "标题字号", value: 16, type: "input"},
        liqiudIsStack: {
            name: "是否堆积",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        liqiudColor: {
            name: "波浪颜色",
            value: '["#294D99", "#156ACF", "#1598ED", "#45BDFF"]',
            options: [
                new Option("蓝色系", '["#294D99", "#156ACF", "#1598ED", "#45BDFF"]'),
                new Option("绿色系", '["#49d088", "#38b470", "#2aaf66"]'),
                new Option("黄色系", '["#FF6600", "#FF9900", "#FFCC00"]'),
                new Option("红色系", '["#600000", "#800000", "#A00000"]')],
            type: "select"
        },
        liqiudBackgroundStyle:{
            name: "背景颜色",
            value: "#E3F7FF",
            type: "color"
        },

        hr_gauge: {name: "仪表盘", value: "", type: "hr"},
        gaugeAxisLabelFontSize: {name: "刻度字号", value: 10, type: "input"},
        gaugeAxisLabelColor: {value: "#C0911F", name: "刻度颜色", type: "color"},
        gaugeAxisLabelDistance: {name: "刻度位置", value: 15, type: "input"},
        gaugeTitleFontSize: {name: "标题字号", value: 14, type: "input"},
        gaugeLabelFontSize: {name: "数据字号", value: 18, type: "input"},
        gaugeAxisLineWidth: {name: "圆轴宽度", value: 10, type: "input"},
        gaugeStartAngle: {name: "起始角度", value: 225, type: "input"},
        gaugeEndAngle: {name: "结束角度", value: -45, type: "input"},
        gaugeMin: {name: "最小值", value: 0, type: "input"},
        gaugeMax: {name: "最大值", value: 100, type: "input"},

        hr_clock: {name: "时钟", value: "", type: "hr"},
        clockRadius: {name: "表盘半径", value: "75%", type: "input"},
        clockCenter: {name: "表盘位置", value: "['50%','50%']", type: "input"},
        clockLabelColor: {value: "#C0911F", name: "颜色", type: "color"},
        clockFontSize: {
            name: "字号",
            value: "25",
            type: "input"
        },
        clockAxisLabelDistance: {
            name: "标签位置",
            value: "15",
            type: "input"
        },

        hr_sunburst: {name: "旭日图", value: "", type: "hr"},
        sunburstRadius: {name: "内/外半径", value: "['15%', '90%']", type: "input"},
        sunburstSort: {
            name: "排序方式",
            value: "null",
            options: [new Option("不排序", "null"), new Option("顺序", "asc"), new Option("倒序", "desc")],
            type: "select"
        },
        sunburstLabelRotate: {
            name: "标签旋转",
            value: "radial",
            options: [new Option("径向", "radial"), new Option("切向", "tangential")],
            type: "select"
        },
        sunburstLabelAlign: {
            name: "标签位置",
            value: "center",
            options: [new Option("靠内", "left"), new Option("居中", "center"), new Option("靠外", "right")],
            type: "select"
        },
        sunburstItemStyleBorderRadius : {name: "圆角半径", value:0, type:"input"},
        sunburstHighlightPolicy: {
            name: "高亮显示",
            value: "self",
            options: [new Option("向上显示", "ancestor"), new Option("本身", "self"), new Option("向下显示", "descendant"), new Option("不设置", "none")],
            type: "select"
        },

        hr_treemap: {name: "层级数据", value: "", type: "hr"},
        treemapWidth: {name: "组件宽度", value: "80%", type: "input"},
        treemapHeight: {name: "组件高度", value: "80%", type: "input"},
        treemapLabelFontSize: {name: "标签字号", value: "22", type: "input"},
        treemapLabelPosition: {
            name: "位置",
            value: "['5%','5%']",
            type: "input"
        },
        treemapItemStyleBorderRadius:{
            name: "圆角半径", value: 0, type: "input"
        },

        hr_calendar: {name: "日历图", value: "", type: "hr"},
        calendarType: {
            name: "类型",
            value: "heatmap",
            options: [new Option("热图", "heatmap"), new Option("散点", "scatter"), new Option("效应散点", "effectScatter")],
            type: "select"
        },
        calendarOrient: {
            name: "布局方向",
            value: "vertical",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },

        hr_3D: {name: "3D图形", value: "", type: "hr"},
        BoxHeightFor3D:{name: "高度(X轴)", value: 20, type: "input"},
        BoxWidthFor3D: {name: "宽度(X轴)", value: 200, type: "input"},
        BoxDepthFor3D: {name: "深度(Y轴)", value: 80, type: "input"},
        AutoRotateFor3D: {
            name: "自动旋转",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        AutoRotateSpeedFor3D: {name: "旋转速度", value: 10, type: "input"},
        LabelOf3DDisplay: {
            name: "显示标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        label3DTextColor: {name: "标签颜色", value: "auto", type: "color"},
        label3DFontSize: {name: "标签字号", value: 12, type: "input"},
        scatterSymbolSizeFor3D: {name: "节点大小", value: "[6,18]", type: "input"},
        scatterSymbolShapeFor3D: {
            name: "节点形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("四边形", "rect"), new Option("圆角四边形", "roundRect"), new Option("三角形", "triangle"), new Option("菱形", "diamond"), new Option("图钉", "pin"), new Option("箭头", "arrow"), new Option("不设置", "none")],
            type: "select"
        },
        ItemStyleOpacityFor3D: {name: "透明度", value: 1, type: "input"},
        LightShadowFor3D: {
            name: "显示光线阴影",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        axisPointerDisplay: {
            name: "坐标轴指示器",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        ringInRadiusFor3D:{name: "内半径(%)", value: "30%", type: "input"},

        hr_geo: {name: "地图", value: "", type: "hr"},
        geoAreaColor: {value: "#323c48", name: "区域颜色", type: "color"},
        geoBorderColor: {value: "#404a59", name: "边界颜色", type: "color"},
        geoHotAreaColor: {value: "#2a333d", name: "热点区域颜色", type: "color"},
        geoAreaNameDisplay: {
            name: "显示地区名称",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        geoAreaNameColor: {name: "地区名称颜色", value: "auto", type: "color"},
        geoLineSymbol: {
            name: "符号",
            value: "plane",
            options: [new Option("飞机", "plane"), new Option("火箭", "rocket"), new Option("箭头", "arrow"), new Option("图钉", "pin"), new Option("三角型", "triangle"), new Option("菱形", "diamond")],
            type: "select"
        },
        geoLineSymbolSize: {name: "符号大小", value: 10, type: "input"},
        geoScatterSymbolSize: {name: "节点大小", value: "[6,18]", type: "input"},
        geoScatterType: {
            name: "节点类型",
            value: "scatter",
            options: [new Option("静态散点", "scatter"), new Option("效应散点", "effectScatter")],
            type: "select"
        },
        geoLineCurveness: {name: "线路曲率", value: 0.2, type: "input"},
        geoLinePeriod: {name: "周期速度(秒)", value: 5, type: "input"},

        hr_tree: {name: "树形结构", value: "", type: "hr"},
        treeLayout: {
            name: "布局类型",
            value: "orthogonal",
            options: [new Option("正交", "orthogonal"), new Option("径向", "radial")],
            type: "select"
        },
        treeEdgeShape: {
            name: "边线类型",
            value: "curve",
            options: [new Option("曲线", "curve"), new Option("折线", "polyline")],
            type: "select"
        },
        treeOrient: {
            name: "布局方向",
            value: "LR",
            options: [new Option("向右", "LR"), new Option("向左", "RL"), new Option("向下", "TB"), new Option("向上", "BT")],
            type: "select"
        },
        treeLineColor: {value: "#404a59", name: "线条颜色", type: "color"},
        treeLineWidth: {name: "线条宽度", value: 1.5, type: "input"},
        treeLineCurveness: {name: "线条曲率", value: 0.5, type: "input"},
        treeLabelShow: {
            name: "显示标签",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        treeLabelRotate: {name: "标签旋转度数", value: 0, type: "input"},
        treeLabelColor: {value: "#404a59", name: "标签颜色", type: "color"},
        treeSymbolSize: {name: "节点大小", value: 7, type: "input"},
        treeEmphasisColor: {value: "#404a59", name: "节点颜色", type: "color"},

        hr_funnel: {name: "漏斗/金字塔", value: "", type: "hr"},
        funnelAlign: {
            name: "对齐方式",
            value: "auto",
            options: [new Option("自动", "auto"), new Option("左对齐", "left"), new Option("右对齐", "right"), new Option("居中", "center")],
            type: "select"
        },
        funnelSort: {
            name: "排序",
            value: "none",
            options: [new Option("原始", "none"), new Option("顺序", "ascending"), new Option("倒序", "descending")],
            type: "select"
        },
        funnelGap: {name: "间距", value: 2, type: "input"},
        FunnelMinSize: {name: "最小比例", value: "0%", type: "input"},
        funnelLabelFontSize: {name: "标签字号", value: 12, type: "input"},
        funnelLabelPosition: {
            name: "标签位置",
            value: "inside",
            options: [new Option("居中", "inside"), new Option("居左", "left"), new Option("居右", "right")],
            type: "select"
        },

        hr_relation: {name: "关系图", value: "", type: "hr"},
        relationLayout: {
            name: "布局方式",
            value: "none",
            options: [new Option("自由", "none"), new Option("力导向", "force"), new Option("圆形", "circular")],
            type: "select"
        },
        relationColor: {value: "#404a59", name: "节点颜色", type: "color"},
        relationLineWidth: {name: "线条宽度", value: 1.5, type: "input"},
        relationLineColor: {value: "#404a59", name: "线条颜色", type: "color"},
        relationLineCurveness: {name: "线条曲率", value: 0.2, type: "input"},
        relationSymbolSize: {name: "节点大小", value: 40, type: "input"},
        relationRepulsion: {name: "排斥力", value: 100, type: "input"},
        relationGravity: {name: "引力", value: 0.4, type: "input"},
        relationEdgeLength: {name: "节点距离", value: 200, type: "input"},
        relationLabelShow: {
            name: "显示标签",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        relationLabelFontSize: {name: "标签字号", value: 12, type: "input"},
        relationLabelColor: {value: "#404a59", name: "标签颜色", type: "color"},
        relationLineFocusNodeAdjacency: {
            name: "凸显相邻关系",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },

        hr_webkitDep: {name: "分类集中", value: "", type: "hr"},
        webkitDepSymbolSize: {name: "节点大小", value: 10, type: "input"},
        webkitDepRepulsion: {name: "排斥力", value: 100, type: "input"},
        webkitDepGravity: {name: "引力", value: 0.4, type: "input"},
        webkitDepEdgeLength: {name: "节点距离", value: 50, type: "input"},

        hr_banner: {name: "横幅标语", value: "", type: "hr"},
        bannerBackgroundColor: {value: "transparent", name: "背景颜色", type: "color"},
        bannerTextColor: {value: "#FFFFFF", name: "文本颜色", type: "color"},
        bannerFontFamily: {name: "字体", value: "sans-serif", type: "input"},
        bannerFontSize: {name: "字号", value: 100, type: "input"},
        bannerShadesSpeed: {name: "速度(秒)", value: 3, type: "input"},

        hr_scrollingScreen: {name: "数据滚屏", value: "", type: "hr"},
        scrollingScreenLeft: {name: "左边距(%)", value: "20%", type: "input"},
        scrollingScreenWidth: {name: "宽度", value: 800, type: "input"},
        scrollingScreenBackColor: {value: "transparent", name: "背景颜色", type: "color"},
        scrollingScreenBorderColor: {value: "transparent", name: "边框颜色", type: "color"},
        scrollingScreenColumnFontFillColor: {value: "#404a59", name: "表头颜色", type: "color"},
        scrollingScreenOpacity: {value: 0.4, name: "透明度", type: "input"},
        scrollingScreenFontSize: {name: "字号", value: 16, type: "input"},
        scrollingScreenSpeed: {name: "速度(秒)", value: 0.01, type: "input"},

        hr_walkingLantern: {name: "数据走马灯", value: "", type: "hr"},
        walkingLanternDirection: {
            name: "方向", value: "LR",
            options: [new Option("左向右", "LR"), new Option("右向左", "RL")],
            type: "select"
        },
        walkingLanternTop: {name: "上边距(%)", value: "20%", type: "input"},
        walkingLanternWidth: {name: "宽度", value: 800, type: "input"},
        walkingLanternBackColor: {value: "transparent", name: "背景颜色", type: "color"},
        walkingLanternBorderColor: {value: "transparent", name: "边框颜色", type: "color"},
        walkingLanternColumnFontFillColor: {value: "#404a59", name: "表头颜色", type: "color"},
        walkingLanternOpacity: {value: 0.4, name: "透明度", type: "input"},
        walkingLanternFontSize: {name: "字号", value: 16, type: "input"},
        walkingLanternLines: {name: "显示行数", value: 10, type: "input"},
        walkingLanternSpeed: {name: "速度(秒)", value: 0.01, type: "input"},

        hr_windowShades: {name: "数据百叶窗", value: "", type: "hr"},
        windowShadesTop: {name: "上边距(%)", value: "20%", type: "input"},
        windowShadesLeft: {name: "左边距(%)", value: "20%", type: "input"},
        windowShadesWidth: {name: "宽度", value: 800, type: "input"},
        windowShadesBackColor: {value: "transparent", name: "背景颜色", type: "color"},
        windowShadesBorderColor: {value: "transparent", name: "边框颜色", type: "color"},
        windowShadesColumnFontFillColor: {value: "#404a59", name: "表头颜色", type: "color"},
        windowShadesOpacity: {value: 0.4, name: "透明度", type: "input"},
        windowShadesFontSize: {name: "字号", value: 16, type: "input"},
        windowShadesLines: {name: "显示行数", value: 10, type: "input"},
        windowShadesSpeed: {name: "速度(秒)", value: 0.01, type: "input"},

        hr_timeline: {name: "类目轴", value: "", type: "hr"},
        timelineDisplay: {
            name: "是否显示",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        timelineOrient: {
            name: "布局",
            value: "horizontal",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },
        timelineLeft: {name: "左边距(%)", value: "auto", type: "input"},
        timelineRight: {name: "右边距(%)", value: "auto", type: "input"},
        timelineTop: {name: "上边距(%)", value: "auto", type: "input"},
        timelineBottom: {name: "下边距(%)", value: "auto", type: "input"},
        timelineLabelColor: {value: "#304654", name: "标签颜色", type: "color"},
        timelineLabelFontSize: {name: "字号", value: 12, type: "input"},
        timelineStyleColor: {value: "#304654", name: "轴线颜色", type: "color"},
        timelineEmphasisColor: {value: "#304654", name: "热点颜色", type: "color"},
        categoryLineType: {
            name: "序列图形",
            value: "bar",
            options: [new Option("柱状图", "bar"), new Option("线型图", "line"), new Option("面积图", "areaStyle"), new Option("饼图", "pie")],
            type: "select"
        },
        seriesLoopPlayInterval: {name: "间隔(秒)", value: 3, type: "input"},

        hr_parallelAxis: {name: "平行坐标", value: "", type: "hr"},
        parallelAxisLineWidth: {name: "线宽", value: 2, type: "input"},
        parallelSmooth: {
            name: "平滑线",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        parallelAxisLabelInside: {
            name: "标签位置",
            value: "false",
            options: [new Option("朝内", "true"), new Option("朝外", "false")],
            type: "select"
        },

        hr_sankey: {name: "桑基图", value: "", type: "hr"},
        sankeyOrient: {
            name: "布局方向",
            value: "horizontal",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },
        sankeyNodeAlign: {
            name: "节点对齐",
            value: "justify",
            options: [new Option("两端对齐", "justify"), new Option("左对齐", "left"), new Option("右对齐", "right")],
            type: "select"
        },

        hr_themeRiver: {name: "主题河流图", value: "", type: "hr"},
        themeRiverEmphasisFocus: {
            name: "聚焦方式",
            value: "self",
            options: [new Option("不设置", "none"), new Option("淡出其他", "self"), new Option("聚焦系列", "series")],
            type: "select"
        },

        hr_dataZoom: {name: "数据缩放", value: "", type: "hr"},
        dataZoomBarDisplay: {
            name: "是否显示",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        dataZoomBarColor: {value: "#404a59", name: "组件颜色", type: "color"},
        dataZoomBarWidth: {name: "宽度", value: 45, type: "input"},
        dataZoomFilterMode: {
            name: "模式",
            value: "filter",
            options: [new Option("过滤", "filter"), new Option("弱过滤", "weakFilter"), new Option("空", "empty"), new Option("不过滤", "none")],
            type: "select"
        },
        dataZoomHandleIcon: {
            name: "手柄样式",
            value: "rect",
            options: [new Option("长方形", "rect"), new Option("实心圆", "circle"), new Option("空心圆", "emptyCircle")],
            type: "select"
        },
        dataZoomHandleSize: {name: "手柄大小", value: "100%", type: "input"},

        hr_visualMap: {name: "视觉映射", value: "", type: "hr"},
        visualMapDisplay: {
            name: "是否显示",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        visualMap_type: {
            name: "类型",
            value: "continuous",
            options: [new Option("连续", "continuous"), new Option("分段", "piecewise")],
            type: "select"
        },
        visualMap_left: {name: "左边距(%)", value: "1%", type: "input"},
        visualMap_top: {name: "上边距(%)", value: "10%", type: "input"},
        visualMap_orient: {
            name: "布局方向",
            value: "horizontal",
            options: [new Option("横向", "horizontal"), new Option("纵向", "vertical")],
            type: "select"
        },
        visualMap_textColor: {name: "标签颜色", value: "#e6e6e6", type: "color"},
        visualMap_piecewise_splitNumber: {name: "分段", value: "5", type: "input"},

        hr_animation: {name: "动画设置", value: "", type: "hr"},
        animation: {
            name: "启用动画",
            value: "true",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        animationThreshold: {name: "启动动画阈值(毫秒)", value: 2000, type: "input"},
        animationEasing: {
            name: "初始动画",
            value: "linear",
            options: [new Option("线性", "linear"), new Option("二次方", "quadratic"), new Option("三次方", "cubic"), new Option("四次方", "quartic"), new Option("五次方", "quintic"),
                new Option("正弦曲线", "sinusoidal"), new Option("指数", "exponential"), new Option("圆形", "circular"), new Option("弹力", "elastic"),
                new Option("倒退", "back"), new Option("反弹", "bounce")],
            type: "select"
        },
        animationDuration: {name: "初始动画时长(毫秒)", value: 1000, type: "input"},
        animationDelay: {name: "初始动画延时(毫秒)", value: 10, type: "input"},
        animationEasingUpdate: {
            name: "更新动画",
            value: "linear",
            options: [new Option("线性", "linear"), new Option("二次方", "quadratic"), new Option("三次方", "cubic"), new Option("四次方", "quartic"), new Option("五次方", "quintic"),
                new Option("正弦曲线", "sinusoidal"), new Option("指数", "exponential"), new Option("圆形", "circular"), new Option("弹力", "elastic"),
                new Option("倒退", "back"), new Option("反弹", "bounce")],
            type: "select"
        },
        animationDurationUpdate: {name: "更新动画时长(毫秒)", value: 1000, type: "input"},
        animationDelayUpdate: {name: "更新动画延时(毫秒)", value: 10, type: "input"},
        animationFunctionType: {name: "动画附加", value: "In", options: ["In", "Out", "InOut"], type: "select"},

        hr_report: {name: "报表设置", value: "", type: "hr"},
        reportFontSize: {
            name: "字号",
            value: "100%",
            options: ["100%", "110%", "120%", "130%", "140%", "150%"],
            type: "select"
        },
    },

    getEchartsConfigs: function (parent) {
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
        //报表名称取编辑器文档名称
        let title = __SQLEDITOR__.title;
        if (title != null) {
            for (var param in __SQLEDITOR__.parameter) {
                title = title.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
            }
            title = title.split("_");
            __ECHARTS__.configs.titleText.value = title[0];
            if (title.length > 1) {
                __ECHARTS__.configs.titleSubText.value = title[1];
            } else {
                __ECHARTS__.configs.titleSubText.value = "";
            }
        }

        var container = document.createElement("div");
        container.type = "div";
        container.className = "echarts-configs-Content";
        container.id = "echarts-configs-Content";

        var d = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = "报表及图形参数: ";
        d.appendChild(span);
        let toconfig = document.createElement("select");
        toconfig.onchange = function () {
            $(this.value).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            //滚动参数
            //behavior: 定义缓动动画， "auto", "instant", 或 "smooth"。默认为 "auto"。
            //block: "start", "center", "end", 或 "nearest"。默认为 "start"。
            //inline:"start", "center", "end", 或 "nearest"。默认为 "nearest"。
        };
        d.appendChild(toconfig);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        d.appendChild(close);

        container.appendChild(d);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        var itemcontainer = document.createElement("div");
        itemcontainer.className = "echarts-configs-container";
        container.appendChild(itemcontainer);

        for (var name in __ECHARTS__.configs) {
            let d = document.createElement("div");
            d.className = "echarts-configs-item";
            itemcontainer.appendChild(d);
            let s = document.createElement("span");
            s.className = "echarts-config-name";
            s.innerHTML = __ECHARTS__.configs[name].name + ":";
            d.appendChild(s);
            if (__ECHARTS__.configs[name].type == "input") {
                var input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "input";
                input.className = "editinput";
                input.value = __ECHARTS__.configs[name].value;
                input.onchange = function () {
                    __ECHARTS__.configs[this.id].value = this.value;
                };
                d.appendChild(input);
            } else if (__ECHARTS__.configs[name].type == "select") {
                var input = document.createElement("select");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "select";
                input.className = "editinput";
                for (var i = 0; i < __ECHARTS__.configs[name].options.length; i++) {
                    if (typeof __ECHARTS__.configs[name].options[i] === "object")
                        input.options.add(__ECHARTS__.configs[name].options[i]);
                    else
                        input.options.add(new Option(__ECHARTS__.configs[name].options[i]));
                }
                input.value = __ECHARTS__.configs[name].value;
                input.onchange = function () {
                    __ECHARTS__.configs[this.id].value = this.value;
                };
                d.appendChild(input);
            } else if (__ECHARTS__.configs[name].type == "color") {
                var input = document.createElement("input");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "color";
                input.className = "editinput";
                input.value = __ECHARTS__.configs[name].value;
                input.onchange = function () {
                    __ECHARTS__.configs[this.id].value = this.value;
                };
                d.appendChild(input);
            } else if (__ECHARTS__.configs[name].type == "hr") {
                s.innerHTML = "[ " + __ECHARTS__.configs[name].name + " ]";
                s.style.color = "var(--main-title-color)";
                let c = document.createElement("div");
                c.style.width = "70%";
                c.style.cssFloat = "right";
                d.appendChild(c);
                d.id = name;
                toconfig.options.add(new Option(__ECHARTS__.configs[name].name, name));
                //设置锚点
                let h = document.createElement("hr");
                h.style.marginTop = "10px";
                c.appendChild(h)
                //d.innerHTML = "";
                //d.appendChild(h);
            }
        }

        let br = document.createElement("hr");
        br.className = "br";
        container.appendChild(br);

        var c = document.createElement("div");
        c.className = "groupbar";
        container.appendChild(c);
        var b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "确定";
        b.onclick = function () {
            let configs = $("echarts-configs-Content").getElementsByClassName("editinput");
            let config = {};
            for (var i = 0; i < configs.length; i++) {
                __ECHARTS__.configs[configs[i].id].value = configs[i].value;
                config[configs[i].id] = configs[i].value;
            }
            setUserConfig("echartsconfig", JSON.stringify(config));
            try {
                try {
                    parent.removeAttribute("_echarts_instance_");
                    echarts.getInstanceByDom(parent).dispose();
                } catch (e) {
                }
                var _width = (getAbsolutePosition(parent).width * 1) + "px";
                var _height = (getAbsolutePosition(parent).height * 1) + "px";
                parent.innerHTML = "";
                var echart = getEcharts(
                    parent,
                    _width,
                    _height,
                    __DATASET__["result"][__DATASET__.default.sheet],
                    __ECHARTS__.configs);
                setDragNook(parent, echart.getAttribute("_echarts_instance_"));
            } catch (e) {

            }
            var m = $("echarts-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            var m = $("echarts-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);
        return container;
    }
};

var geoCoordMap = {
    LocalMap: "北京",
    Region: {},
    City: {
        北京市: [116.3809433, 39.9236145],
        天津市: [117.2034988, 39.13111877],
        石家庄市: [114.4897766, 38.04512787],
        唐山市: [118.2017288, 39.62533951],
        秦皇岛市: [119.5982971, 39.92430878],
        邯郸市: [114.4729538, 36.60151672],
        邢台市: [114.4950867, 37.06558991],
        保定市: [115.5001831, 38.85707092],
        张家口市: [114.8787766, 40.81744003],
        承德市: [117.9223404, 40.96760178],
        沧州市: [116.8607712, 38.30884171],
        廊坊市: [116.6898575, 39.51511002],
        衡水市: [115.7081909, 37.72782135],
        太原市: [112.5693512, 37.87111282],
        大同市: [113.2963333, 40.0971489],
        阳泉市: [113.5742569, 37.86065674],
        晋城市: [112.84272, 35.50651169],
        长治市: [113.1055679, 36.18191147],
        朔州市: [112.4232712, 39.31313324],
        晋中市: [112.7453613, 37.67613983],
        运城市: [110.9911499, 35.01391602],
        忻州市: [112.7315521, 38.39920807],
        临汾市: [111.5141678, 36.08282471],
        吕梁市: [111.1348114, 37.512043],
        呼和浩特市: [111.6632996, 40.82094193],
        包头市: [109.8517075, 40.6664238],
        乌海市: [106.8148727, 39.67420197],
        赤峰市: [118.9498215, 42.26798248],
        通辽市: [122.2603302, 43.61156082],
        鄂尔多斯市: [109.7808671, 39.60844559],
        呼伦贝尔市: [119.7305603, 49.21152878],
        巴彦淖尔市: [107.3945694, 40.76234055],
        乌兰察布市: [113.0985184, 41.03116608],
        兴安盟: [122.0381598, 46.08207144],
        锡林郭勒盟: [116.0477155, 43.9331762],
        阿拉善盟: [105.7289837, 38.8515317],
        沈阳市: [123.4116821, 41.7966156],
        大连市: [121.6008377, 38.91780472],
        鞍山市: [122.9843826, 41.11525726],
        抚顺市: [123.9295578, 41.84786606],
        本溪市: [123.7645035, 41.28758621],
        丹东市: [124.3814621, 40.13518143],
        锦州市: [121.1333695, 41.11112595],
        营口市: [122.2241516, 40.66835022],
        阜新市: [121.6488037, 42.00795364],
        辽阳市: [123.1617432, 41.26513672],
        盘锦市: [122.0476303, 41.18847656],
        铁岭市: [123.844429, 42.29558182],
        朝阳市: [120.4514694, 41.57785797],
        葫芦岛市: [120.8474808, 40.75334168],
        长春市: [125.3154297, 43.89256287],
        吉林市: [126.5668182, 43.88667679],
        四平市: [124.377449, 43.16560745],
        辽源市: [125.1372833, 42.90859222],
        通化市: [125.9231262, 41.7232933],
        白山市: [126.421608, 41.93033218],
        松原市: [124.82204, 45.172604],
        白城市: [122.8395767, 45.61641693],
        延边朝鲜族自治州: [129.5091262, 42.89120266],
        哈尔滨市: [126.6433411, 45.74149323],
        齐齐哈尔市: [123.9592667, 47.34136963],
        鸡西市: [130.9477539, 45.2970047],
        鹤岗市: [130.2761993, 47.33728409],
        双鸭山市: [131.1521607, 46.6376915],
        大庆市: [125.0248566, 46.59545136],
        伊春市: [128.9043121, 47.72364426],
        佳木斯市: [130.36232, 46.81366348],
        七台河市: [130.8753967, 45.80927277],
        牡丹江市: [129.5984955, 44.58392334],
        黑河市: [127.4869385, 50.24448776],
        绥化市: [126.98349, 46.63701248],
        大兴安岭地区: [124.5921351, 51.9239847],
        上海市: [121.4692688, 31.23817635],
        南京市: [118.7727814, 32.04761505],
        无锡市: [120.2991333, 31.57723045],
        徐州市: [117.1856079, 34.26752853],
        常州市: [119.9502869, 31.78393364],
        苏州市: [120.6187286, 31.31645203],
        南通市: [120.8555679, 32.01506805],
        连云港市: [119.1668015, 34.60517883],
        淮安市: [119.14111, 33.502789],
        盐城市: [120.1351776, 33.38982773],
        扬州市: [119.4368362, 32.39188767],
        镇江市: [119.4442978, 32.20589829],
        泰州市: [119.91124, 32.495872],
        宿迁市: [118.29706, 33.958302],
        杭州市: [120.1592484, 30.26599503],
        宁波市: [121.5412827, 29.87066841],
        温州市: [120.6502914, 28.01647568],
        嘉兴市: [120.7536316, 30.77111435],
        湖州市: [120.0971298, 30.86603928],
        绍兴市: [120.5739288, 30.01093102],
        金华市: [119.6522064, 29.11081696],
        衢州市: [118.8691788, 28.9584446],
        舟山市: [122.1016083, 30.02004242],
        台州市: [121.4205629, 28.6561185037],
        临海市: [121.1184464, 28.84889221],
        丽水市: [119.9165573, 28.44883728],
        合肥市: [117.2757034, 31.86325455],
        芜湖市: [118.3598328, 31.33449554],
        蚌埠市: [117.3613815, 32.93924332],
        淮南市: [117.0207291, 32.6166954],
        马鞍山市: [118.4807129, 31.72492409],
        淮北市: [116.7874985, 33.9704895],
        铜陵市: [117.813179, 30.92524719],
        安庆市: [117.0344315, 30.51264572],
        黄山市: [118.3090668, 29.72084427],
        滁州市: [118.3011627, 32.31653214],
        阜阳市: [115.8097305, 32.90220642],
        宿州市: [116.9701538, 33.6401329],
        六安市: [116.4927902, 31.75352287],
        亳州市: [115.7709, 33.879292],
        池州市: [117.4773331, 30.65686607],
        宣城市: [118.7586551, 30.94078918],
        福州市: [119.2978134, 26.07859039],
        厦门市: [118.0875168, 24.45743561],
        莆田市: [119.0103226, 25.43813705],
        三明市: [117.6012268, 26.22301292],
        泉州市: [118.5896378, 24.91591835],
        漳州市: [117.6530914, 24.51816368],
        南平市: [118.1691208, 26.64484215],
        龙岩市: [117.0303879, 25.10970306],
        宁德市: [119.5183182, 26.6664772],
        南昌市: [115.8999176, 28.67599106],
        景德镇市: [117.1179428, 29.19516754],
        萍乡市: [113.841423, 27.63298988],
        九江市: [115.984581, 29.72321129],
        新余市: [114.9293823, 27.80654717],
        鹰潭市: [117.0302811, 28.2455864],
        赣州市: [114.9336777, 25.85288239],
        吉安市: [114.9704285, 27.1062088],
        宜春市: [114.3746109, 27.79557419],
        抚州市: [116.3010483, 27.93483162],
        上饶市: [117.9634018, 28.45326614],
        济南市: [117.0056, 36.6670723],
        青岛市: [120.3581696, 36.13386154],
        淄博市: [118.0560532, 36.7935791],
        枣庄市: [117.556282, 34.87264633],
        东营市: [118.4959564, 37.46191406],
        烟台市: [121.3799362, 37.53561401],
        潍坊市: [119.1068497, 36.7040863],
        济宁市: [116.576561, 35.40924072],
        泰安市: [117.1241074, 36.1871109],
        威海市: [122.1116867, 37.50076294],
        日照市: [119.4515533, 35.42756271],
        莱芜市: [117.66173, 36.205116],
        临沂市: [118.3379593, 35.06945038],
        德州市: [116.2878723, 37.45369339],
        聊城市: [115.9884262, 36.44943237],
        滨州市: [118.0217667, 37.36781311],
        菏泽市: [115.4457626, 35.24853897],
        郑州市: [113.6500473, 34.7570343],
        开封市: [114.3461685, 34.7851944],
        洛阳市: [112.4247971, 34.66804123],
        平顶山市: [113.3001938, 33.74362946],
        安阳市: [114.3500519, 36.09685135],
        鹤壁市: [114.1546707, 35.94008255],
        新乡市: [113.8685532, 35.30746841],
        焦作市: [113.2217865, 35.24735642],
        濮阳市: [115.0149536, 35.70189667],
        许昌市: [113.8215866, 34.02685928],
        漯河市: [114.0410919, 33.57250977],
        三门峡市: [111.1952591, 34.78076935],
        南阳市: [112.5375137, 32.99901962],
        商丘市: [115.6471863, 34.44358444],
        信阳市: [114.0677185, 32.13063049],
        周口市: [114.6372528, 33.62804031],
        驻马店市: [114.0356903, 32.97904205],
        济源市: [112.6027201, 35.06706997],
        武汉市: [114.2919388, 30.56751442],
        黄石市: [115.0749893, 30.21379852],
        十堰市: [110.7827988, 32.65213013],
        宜昌市: [111.2852707, 30.70395279],
        襄阳市: [112.1411133, 32.04539871],
        鄂州市: [114.8811874, 30.40276718],
        荆门市: [112.2002106, 31.03021622],
        孝感市: [113.9113312, 30.92845535],
        荆州市: [112.2477875, 30.31733513],
        黄冈市: [114.8649292, 30.44901848],
        咸宁市: [114.2687378, 29.89432716],
        随州市: [113.36982, 31.715105],
        恩施土家族苗族自治州: [109.4881804, 30.27218711],
        仙桃市: [113.4545113, 30.36252891],
        潜江市: [112.8993007, 30.40148025],
        天门市: [113.1661477, 30.66340805],
        神农架林区: [110.6759643, 31.74451435],
        长沙市: [112.9812698, 28.20082474],
        株洲市: [113.1520615, 27.85422325],
        湘潭市: [112.9150238, 27.87335014],
        衡阳市: [112.5993576, 26.90055466],
        邵阳市: [111.4773789, 27.25023651],
        岳阳市: [113.0980682, 29.37461853],
        常德市: [111.6876297, 29.03820992],
        张家界市: [110.4814835, 29.13187981],
        益阳市: [112.3340683, 28.60197067],
        郴州市: [113.0286484, 25.80229187],
        永州市: [111.6121979, 26.2112999],
        怀化市: [109.9542313, 27.54740715],
        娄底市: [111.9938965, 27.74133492],
        湘西土家族苗族自治州: [109.7389287, 28.31173554],
        广州市: [113.2614288, 23.11891174],
        韶关市: [113.6053925, 24.80877686],
        深圳市: [114.110672, 22.55639648],
        珠海市: [113.5682602, 22.27258873],
        汕头市: [116.6837997, 23.36269188],
        佛山市: [113.1145172, 23.03487778],
        江门市: [113.0847473, 22.59119034],
        湛江市: [110.3992233, 21.19499779],
        茂名市: [110.8888474, 21.67071724],
        肇庆市: [112.4514084, 23.05788231],
        惠州市: [114.3924027, 23.08795738],
        梅州市: [116.1079407, 24.31450081],
        汕尾市: [115.3640137, 22.77868652],
        河源市: [114.6938171, 23.73484039],
        阳江市: [111.9578934, 21.84523392],
        清远市: [113.0212631, 23.71959686],
        东莞市: [113.7487717, 23.0485363],
        中山市: [113.3714523, 22.52685356],
        潮州市: [116.63666, 23.667706],
        揭阳市: [116.34977, 23.542976],
        云浮市: [112.03999, 22.933193],
        南宁市: [108.3117676, 22.80654335],
        柳州市: [109.4028091, 24.31040573],
        桂林市: [110.2866821, 25.28188324],
        梧州市: [111.3059464, 23.48661995],
        北海市: [109.1191711, 21.47979736],
        防城港市: [108.35658, 21.768936],
        钦州市: [108.6147003, 21.94986916],
        贵港市: [109.60844, 23.099092],
        玉林市: [110.1414719, 22.63189697],
        百色市: [106.6121063, 23.90158272],
        贺州市: [111.53455, 24.417259],
        河池市: [108.0516281, 24.69689179],
        来宾市: [109.23294, 23.73144],
        崇左市: [107.35506, 22.420197],
        海口市: [110.3465118, 20.03179359],
        三亚市: [109.5078201, 18.23404312],
        三沙市: [112.33356, 16.83272],
        儋州市: [109.5806849, 19.52092966],
        五指山市: [109.5169672, 18.77516377],
        琼海市: [110.4746526, 19.25839642],
        文昌市: [110.797742, 19.54330274],
        万宁市: [110.3897474, 18.79532292],
        东方市: [108.6536594, 19.09613826],
        定安县: [110.3590789, 19.68133946],
        屯昌县: [110.1034735, 19.35182579],
        澄迈县: [110.0048522, 19.73847934],
        临高县: [109.690764, 19.91242821],
        白沙黎族自治县: [109.4516753, 19.22543478],
        昌江黎族自治县: [109.0555816, 19.29827945],
        乐东黎族自治县: [109.1736131, 18.7498679],
        陵水黎族自治县: [110.0371871, 18.50595483],
        保亭黎族苗族自治县: [109.7025825, 18.63904542],
        琼中黎族苗族自治县: [109.8382244, 19.03322394],
        重庆市: [106.5103378, 29.55817604],
        成都市: [104.0817566, 30.66105652],
        自贡市: [104.7763519, 29.36772156],
        攀枝花市: [101.6984177, 26.55479813],
        泸州市: [105.4378433, 28.88199425],
        德阳市: [104.3915482, 31.13044548],
        绵阳市: [104.7485504, 31.45634842],
        广元市: [105.8317032, 32.44396973],
        遂宁市: [105.5697098, 30.50339317],
        内江市: [105.0534363, 29.57756805],
        乐山市: [103.7514038, 29.56822395],
        南充市: [106.0816269, 30.79582214],
        眉山市: [103.83146, 30.050497],
        宜宾市: [104.6168671, 28.77025604],
        广安市: [106.63175, 30.474428],
        达州市: [107.5003433, 31.22469711],
        雅安市: [102.9826965, 29.98229408],
        巴中市: [106.75476, 31.849014],
        资阳市: [104.65019, 30.122671],
        阿坝藏族羌族自治州: [102.2247375, 31.89937935],
        甘孜藏族自治州: [101.962514, 30.04930605],
        凉山彝族自治州: [102.2674383, 27.88162244],
        贵阳市: [106.7113724, 26.57687378],
        六盘水市: [104.8732529, 26.5767746],
        遵义市: [106.9293976, 27.69538689],
        安顺市: [105.9260712, 26.24425888],
        毕节市: [105.2824173, 27.3062954],
        铜仁市: [109.1926804, 27.72216606],
        黔西南布依族苗族自治州: [104.9043531, 25.08987278],
        黔东南苗族侗族自治州: [107.9841392, 26.5836279],
        黔南布依族苗族自治州: [107.5222592, 26.25427309],
        昆明市: [102.704567, 25.04384422],
        曲靖市: [103.7947006, 25.49616623],
        玉溪市: [102.5332336, 24.35497284],
        保山市: [99.16872406, 25.11680222],
        昭通市: [103.7149277, 27.34227943],
        丽江市: [100.2342529, 26.87666512],
        普洱市: [100.9752121, 22.79548073],
        临沧市: [100.0878067, 23.8799305],
        楚雄彝族自治州: [101.5276607, 25.04494301],
        红河哈尼族彝族自治州: [103.3755878, 23.36421652],
        文山壮族苗族自治州: [104.2150486, 23.39868766],
        西双版纳傣族自治州: [100.7973892, 22.0074942],
        大理白族自治州: [100.2676255, 25.60646837],
        德宏傣族景颇族自治州: [98.58484387, 24.4323115],
        怒江傈僳族自治州: [98.85671501, 25.81753271],
        迪庆藏族自治州: [99.70302652, 27.81906659],
        拉萨市: [91.11445308, 29.64411352],
        日喀则市: [88.88110958, 29.26701395],
        昌都市: [97.17220509, 31.14069782],
        林芝市: [94.36153102, 29.64893975],
        山南市: [91.77308713, 29.23701982],
        那曲地区: [92.0513207, 31.47611103],
        阿里地区: [81.14540521, 30.40052298],
        西安市: [108.949028, 34.26168442],
        铜川市: [109.0572815, 35.07545853],
        宝鸡市: [107.1383591, 34.38228607],
        咸阳市: [108.7101288, 34.33721542],
        渭南市: [109.5008392, 34.50152588],
        延安市: [109.471283, 36.59387207],
        汉中市: [107.0343933, 33.07814789],
        榆林市: [109.7574463, 38.29727554],
        安康市: [109.0257874, 32.68986511],
        商洛市: [109.9403909, 33.87035105],
        兰州市: [103.7500534, 36.06803894],
        嘉峪关市: [98.27471161, 39.80265427],
        金昌市: [102.1657486, 38.49519348],
        白银市: [104.1837769, 36.53941727],
        天水市: [105.7152405, 34.58426666],
        武威市: [102.633461, 37.9269104],
        张掖市: [100.4502869, 38.93505859],
        平凉市: [106.6830673, 35.53551865],
        酒泉市: [98.51111603, 39.74496841],
        庆阳市: [107.6362305, 35.73855972],
        定西市: [104.6185684, 35.57523727],
        陇南市: [104.92928, 33.39484],
        临夏回族自治州: [103.2108906, 35.60121067],
        甘南藏族自治州: [102.9109863, 34.98324974],
        西宁市: [101.7778162, 36.61728828],
        海东市: [102.4017109, 36.48207227],
        海北藏族自治州: [100.9009262, 36.95451784],
        黄南藏族自治州: [102.0150337, 35.51988388],
        海南藏族自治州: [100.6203395, 36.28660837],
        果洛藏族自治州: [100.2447092, 34.47138225],
        玉树藏族自治州: [97.00645511, 33.00525219],
        海西蒙古族藏族自治州: [97.37119774, 37.37707972],
        银川市: [106.2719421, 38.46800995],
        石嘴山市: [106.3820572, 39.02428055],
        吴忠市: [106.1991119, 37.98549652],
        固原市: [106.2785873, 36.01325989],
        中卫市: [105.18661, 37.513252],
        乌鲁木齐市: [87.60611725, 43.79093933],
        克拉玛依市: [84.86360931, 45.59651184],
        吐鲁番市: [89.1895474, 42.95130195],
        哈密市: [93.51536928, 42.81854115],
        昌吉回族自治州: [87.30817902, 44.01114114],
        博尔塔拉蒙古自治州: [82.06674632, 44.90603596],
        巴音郭楞蒙古自治州: [86.14517515, 41.76404026],
        阿克苏地区: [80.2600596, 41.1684029],
        克孜勒苏柯尔克孜自治州: [76.16660835, 39.71529724],
        喀什地区: [75.98973068, 39.47039628],
        和田地区: [79.92243983, 37.11429217],
        伊犁哈萨克自治州: [81.32412996, 43.91686827],
        塔城地区: [82.98043953, 46.74531234],
        阿勒泰地区: [88.14031038, 47.8456187],
        石河子市: [86.078911, 44.30652036],
        阿拉尔市: [81.28064163, 40.54795812],
        图木舒克市: [79.06901071, 39.8649427],
        五家渠市: [87.54014426, 44.16797119],
        北屯市: [87.80014797, 47.36328619],
        铁门关市: [85.67585289, 41.86869689],
        双河市: [82.35500262, 44.84417562],
        可克达拉市: [81.04474154, 43.94797595],
        昆玉市: [79.29125037, 37.20942446],
        台湾: [120.960515, 23.69781],
        香港: [114.109497, 22.396428],
        澳门: [113.5440083, 22.20167546],
    },
    Custom: {
        "分行营业部": [116.35441650364683, 39.89743763023299],
        "中关村分行": [116.3255934855728, 39.97594607553426],
        "通州分行": [116.64424528096006, 39.90181231860209],
        "宣武支行": [116.35721672985838, 39.88902493290284],
        "西四支行": [116.34299029324339, 39.922846429639215],
        "东四支行": [116.40975047562407, 39.93297851642338],
        "前门支行": [116.41136516545103, 39.89965999037026],
        "城建支行": [116.42684967857359, 39.8654511905414],
        "长安支行": [116.30266309192658, 39.90799712722112],
        "开发区支行": [116.52131140640259, 39.78064173468539],
        "鼎昆支行": [116.38564868717192, 39.96357105725681],
        "保利支行": [116.43232577909852, 39.933033145322206],
        "苏州桥支行": [116.3084999411392, 39.96422985863718],
        "望京支行": [116.46810924404143, 39.98632140037747],
        "地坛支行": [116.40858566158293, 39.95499856601777],
        "丰台支行": [116.28365982983397, 39.86757282213031],
        "铁道支行": [116.32556617462158, 39.89660383931801],
        "月坛支行": [116.35948514335631, 39.915161383272675],
        "阜成路支行": [116.31771781349183, 39.924246581970394],
        "西单支行": [116.37391244907377, 39.917476401295424],
        "安华支行": [116.40693443187716, 39.974640863944025],
        "光华支行": [116.45418315078733, 39.91383052046433],
        "安慧支行": [116.40652317790983, 39.991829318509666],
        "华贸支行": [116.47853436441802, 39.91212326134532],
        "东大街支行": [116.29375030014799, 39.85819699521394],
        "石景山支行": [116.21864308331297, 39.90668464367193],
        "朝阳支行": [116.4471458337097, 39.92249673687234],
        "科创支行": [116.3052827705002, 39.98240552960808],
        "大兴支行": [116.33653153393553, 39.7276962248458],
        "房山支行": [116.14051799007413, 39.74332826725758],
        "门头沟支行": [116.1108721865082, 39.93625766035245],
        "顺义支行": [116.65379431415559, 40.130518903732586],
        "昌平支行": [116.23950781349184, 40.22254601518041],
        "延庆支行": [115.98013717790984, 40.461168229288596],
        "怀柔支行": [116.63073676322934, 40.3111677351932],
        "密云支行": [116.8505806441803, 40.370657044797],
        "平谷支行": [117.11137734722138, 40.13446326684633],
    },
    getMapConfig: function () {
        let container = document.createElement("div");
        container.id = "local-map-config-Content";
        container.className = "local-map-config-Content";
        let d = document.createElement("div");
        let span = document.createElement("span");
        span.innerHTML = "地图设置 : ";
        d.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        d.appendChild(close);
        container.appendChild(d);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        d = document.createElement("div");
        d.className = "toolbar";
        let b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "国内城市";
        b.onclick = function () {
            $("city-coord-table").style.display = "block";
            $("custom-coord-table").style.display = "none";
        };
        d.appendChild(b);
        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "用户定义";
        b.onclick = function () {
            $("city-coord-table").style.display = "none";
            $("custom-coord-table").style.display = "block";
        };
        d.appendChild(b);


        let localmap = document.createElement("select");
        localmap.id = "set-local-map";
        let regions = echarts.getMap("china").geoJson.features;
        let region = [];
        for (var i = 0; i < regions.length; i++) {
            region.push(regions[i].properties.name);
        }
        regions = sortAsc(region);
        for (var i = 0; i < regions.length; i++) {
            localmap.options.add(new Option(regions[i], regions[i]));
        }
        try {
            let map = getUserConfig("localMap");
            if (map != null) {
                geoCoordMap.LocalMap = map;
                localmap.value = map;
            } else
                localmap.selectedIndex = 0;
        } catch (e) {
            console.log(e);
        }
        localmap.onchange = function () {
            geoCoordMap.LocalMap = this.value;
            setUserConfig("localMap", geoCoordMap.LocalMap);
        };
        d.appendChild(localmap);
        container.appendChild(d);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "本地地图:";
        b.style.cssFloat = "right";
        d.appendChild(b);

        let tablecontainer = document.createElement("div");
        tablecontainer.className = "map-config-table-container";
        container.appendChild(tablecontainer);

        let table = document.createElement("table");
        tablecontainer.appendChild(table);
        table.id = "city-coord-table";
        table.style.display = "block";
        table.className = "table";
        table.style.width = "100%";

        table.innerText = "";
        let tr = document.createElement("tr");
        tr.className = "tr";
        table.appendChild(tr);

        let th = document.createElement("th");
        th.className = "th";
        th.style.width = "36px";
        th.innerText = "选择";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.innerText = "名称";
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "经度";
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "纬度";
        tr.appendChild(th);
        let coord = geoCoordMap.City;
        for (city in coord) {
            let tr = document.createElement("tr");
            tr.className = "tr";
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("geocoord-checkbox")[0].checked == true)
                    this.getElementsByClassName("geocoord-checkbox")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("geocoord-checkbox")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "geocoord-checkbox";
            check.style.width = check.style.height = "16px";
            check.setAttribute("value", city);
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);


            td = document.createElement("td");
            td.innerText = city;
            td.setAttribute("value", city);
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = coord[city][0];
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.focus();
                textBox.onblur = function () {
                    geoCoordMap.City[this.parentNode.getAttribute("value")][0] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };

            td = document.createElement("td");
            td.innerText = coord[city][1];
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.focus();
                textBox.onblur = function () {
                    geoCoordMap.City[this.parentNode.getAttribute("value")][1] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };
        }

        table = document.createElement("table");
        tablecontainer.appendChild(table);
        table.id = "custom-coord-table";
        table.style.display = "none";
        table.className = "table";
        table.style.width = "100%";

        table.innerText = "";
        tr = document.createElement("tr");
        tr.className = "tr";
        table.appendChild(tr);

        th = document.createElement("th");
        th.className = "th";
        th.style.width = "36px";
        th.innerText = "选择";
        tr.appendChild(th);

        th = document.createElement("th");
        th.className = "th";
        th.innerText = "名称";
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "经度";
        tr.appendChild(th);
        th = document.createElement("th");
        th.className = "th";
        th.innerText = "纬度";
        tr.appendChild(th);
        coord = geoCoordMap.Custom;
        for (city in coord) {
            let tr = document.createElement("tr");
            tr.className = "tr";
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("geocoord-checkbox")[0].checked == true)
                    this.getElementsByClassName("geocoord-checkbox")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("geocoord-checkbox")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "geocoord-checkbox";
            check.style.width = check.style.height = "16px";
            check.setAttribute("value", city);
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = city;
            td.setAttribute("value", city);
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = coord[city][0];
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.focus();
                textBox.onblur = function () {
                    geoCoordMap.Custom[this.parentNode.getAttribute("value")][0] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };

            td = document.createElement("td");
            td.innerText = coord[city][1];
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.focus();
                textBox.onblur = function () {
                    geoCoordMap.Custom[this.parentNode.getAttribute("value")][1] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };
        }

        let br = document.createElement("p");
        container.appendChild(br);

        d = document.createElement("div");
        d.className = "groupbar";
        container.appendChild(d);
        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "增加";
        b.onclick = function () {
            if ($("city-coord-table").style.display == "block")
                geoCoordMap.addGeoCoord($("city-coord-table"), geoCoordMap.City);
            if ($("custom-coord-table").style.display == "block")
                geoCoordMap.addGeoCoord($("custom-coord-table"), geoCoordMap.Custom);

        };
        d.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "删除";
        b.onclick = function () {
            if ($("city-coord-table").style.display == "block") {
                let trs = $("city-coord-table").getElementsByTagName("tr");
                for (var i = 0; i < trs.length; i++) {
                    try {
                        let check = trs[i].getElementsByClassName("geocoord-checkbox")[0];
                        if (check.checked == true) {
                            delete geoCoordMap.City[check.getAttribute("value")];
                            $("city-coord-table").removeChild(trs[i]);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            if ($("custom-coord-table").style.display == "block") {
                let trs = $("custom-coord-table").getElementsByTagName("tr");
                for (var i = 0; i < trs.length; i++) {
                    try {
                        let check = trs[i].getElementsByClassName("geocoord-checkbox")[0];
                        if (check.checked == true) {
                            delete geoCoordMap.Custom[check.getAttribute("value")];
                            $("custom-coord-table").removeChild(trs[i]);
                            console.log(geoCoordMap.Custom);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        };
        d.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "保存";
        b.onclick = function () {
            setUserConfig("geoCoordMapCity", JSON.stringify(geoCoordMap.City));
            setUserConfig("geoCoordMapCustom", JSON.stringify(geoCoordMap.Custom));
            $("local-map-config-Content").parentNode.removeChild($("local-map-config-Content"));
        };
        d.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            let citychanged = Compare(JSON.parse(getUserConfig("geoCoordMapCity") == null ? "{}" : getUserConfig("geoCoordMapCity")), geoCoordMap.City);
            let customchanged = Compare(JSON.parse(getUserConfig("geoCoordMapCustom") == null ? "{}" : getUserConfig("geoCoordMapCustom")), geoCoordMap.Custom);
            let localmapchanged = getUserConfig("localMap") == geoCoordMap.LocalMap;
            if (!citychanged) {
                let r = confirm("国内城市地图数据已修改,您需要保存吗?");
                if (r == true) {
                    setUserConfig("geoCoordMapCity", JSON.stringify(geoCoordMap.City));
                }
            }
            if (!customchanged) {
                let r = confirm("自定义地图数据已修改,您需要保存吗?");
                if (r == true) {
                    setUserConfig("geoCoordMapCustom", JSON.stringify(geoCoordMap.Custom));
                }
            }
            if (!localmapchanged) {
                let r = confirm("本地地图设置已修改,您需要保存吗?");
                if (r == true) {
                    setUserConfig("localMap", geoCoordMap.LocalMap);
                }
            }
            $("local-map-config-Content").parentNode.removeChild($("local-map-config-Content"));
        };
        d.appendChild(b);

        return container;
    },

    addGeoCoord: function (table, coords) {
        let city = prompt("请输入城市或地区名称: ");
        let ex = false;
        for (coord in coords) {
            if (coord == city) {
                ex = true;
                break;
            }
        }
        if (ex)
            alert(city + "的地理坐标已经设置，同一城市或地区不能重复设置。");
        else if (city.trim() != "") {
            coords[city] = [0, 0];
            let tr = document.createElement("tr");
            tr.className = "tr";
            table.appendChild(tr);

            tr.onclick = function () {
                if (this.getElementsByClassName("geocoord-checkbox")[0].checked == true)
                    this.getElementsByClassName("geocoord-checkbox")[0].removeAttribute("checked");
                else
                    this.getElementsByClassName("geocoord-checkbox")[0].setAttribute("checked", "checked");
            };

            let td = document.createElement("td");
            let check = document.createElement("input");
            check.type = "checkbox";
            check.className = "geocoord-checkbox";
            check.style.width = check.style.height = "16px";
            check.setAttribute("value", city);
            td.style.textAlign = "center";
            td.appendChild(check);
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = city;
            td.setAttribute("value", city);
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerText = "0";
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.onblur = function () {
                    coords[this.parentNode.getAttribute("value")][0] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };
            td = document.createElement("td");
            td.innerText = "0";
            td.setAttribute("value", city);
            tr.appendChild(td);
            td.ondblclick = function () {
                let textBox = document.createElement("input");
                textBox.value = this.innerText;
                this.innerText = "";
                this.appendChild(textBox);
                textBox.style = this.style;
                textBox.onblur = function () {
                    coords[this.parentNode.getAttribute("value")][1] = Number(this.value);
                    this.parentNode.innerText = this.value;
                };
            };
        }
    },
};

function toPoint(percent) {
    return Number(percent.replace("%",""));
}

function getAnimationEasing(configs){
    return configs.animationEasing.value == "linear"?configs.animationEasing.value:configs.animationEasing.value + configs.animationFunctionType.value;
}

function getAnimationEasingUpdate(configs){
    return configs.animationEasingUpdate.value == "linear"?configs.animationEasingUpdate.value:configs.animationEasingUpdate.value + configs.animationFunctionType.value;
}

function getLoading(text){
    return {
        text : text,
        color: '#c23531',
        textColor: '#c23531',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
    };
}

function getWaterGraphic(link) {
    let graphic = [
        {
            type: 'group',
            id:"logoLink",
            rotation: Math.PI / 4,
            bounding: 'raw',
            right: 110,
            bottom: 110,
            z: -100,
            onclick: function (){
                window.open(messageDecode(link.link))},
            children: [
                {
                    type: 'image',
                    z: -10,
                    left: 'center',
                    top: 'center',
                    position: [90,0],
                    style: {
                        image: link.image,
                        width: 36,
                        height: 30.55,
                        opacity: link.opacity,
                    }
                },
                {
                    type: 'rect',
                    left: 'center',
                    top: 'center',
                    z: -100,
                    shape: {
                        width: 400,
                        height: 50
                    },
                    style: {
                        fill: 'rgba(0,0,0,0.3)',
                        opacity: link.opacity,
                    }
                },
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    z: -100,
                    style: {
                        fill: '#fff',
                        text: messageDecode(link.title).trim(),
                        font: 'bold 18px Microsoft YaHei',
                        opacity: link.opacity,
                    }
                }
            ]
        }];
    return graphic;
}

function getBar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var series = {
                name: columns[c],
                type: "bar",
                data: [],
                label: {
                    show: configs.barLabelDisplay.value.toBoolean(),
                    align: "center",
                    verticalAlign: "middle",
                    position: configs.barLabelPosition.value,
                    distance: 15,
                    formatter: "{value|{c}}",
                    rotate: configs.barLabelRotate.value,
                    rich: {
                        value: {
                            color: configs.labelBarTextColor.value,
                            fontSize: configs.labelBarFontSize.value,
                        }
                    }
                },
                itemStyle: {
                    borderRadius: Number(configs.barItemStyleBorderRadius.value),
                },
                emphasis: {
                    label: {
                        show: configs.barEmphasisLabelDisplay.value.toBoolean(),
                        align: "center",
                        verticalAlign: "middle",
                        position: configs.barLabelPosition.value,
                        distance: 15,
                        formatter: "{value|{c}}",
                        rotate: 0,
                        rich: {
                            value: {
                                color: configs.labelBarTextColor.value,
                                fontSize: configs.labelBarFontSize.value,
                            }
                        }
                    }
                },
                smooth: configs.lineSmooth.value.toBoolean(),

                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush: configs.toolboxFeatureBrush.value.toBoolean() ? {
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        } : null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean(),},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["line", "bar", "stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            },
        },

        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            textStyle: {
                color: configs.dataZoomBarColor.value,
            },
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            textStyle: {
                color: configs.dataZoomBarColor.value,
            },
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: yAxis_series,
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getTransversBar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c=0;c<columns.length;c++) {
        if ( c==0 ){
           for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var series = {name: columns[c],
                type: "bar",
                data: [],
                itemStyle: {
                    borderRadius: Number(configs.barItemStyleBorderRadius.value),
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };

            series.label = {
                show: configs.barLabelDisplay.value.toBoolean(),
                rotate: configs.barLabelRotate.value,
                align: "center",
                verticalAlign: "middle",
                position: configs.barLabelPosition.value,
                distance: 15,
                formatter: "{value|{c}}",
                rich: {
                    value: {
                        color: configs.labelBarTextColor.value,
                        fontSize: configs.labelBarFontSize.value,
                    }
                }
            };
            series.emphasis = {
                label: {
                    show: configs.barEmphasisLabelDisplay.value.toBoolean(),
                    align: "center",
                    verticalAlign: "middle",
                    position: configs.barLabelPosition.value,
                    distance: 15,
                    formatter: "{value|{c}}",
                    rotate: 0,
                    rich: {
                        value: {
                            color: configs.labelBarTextColor.value,
                            fontSize: configs.labelBarFontSize.value,
                        }
                    }
                }
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush:  configs.toolboxFeatureBrush.value.toBoolean()?{
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            },
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        xAxis: {
            type: "value",
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            type: "category",
            data: xAxis,
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: yAxis_series,
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getMarkPoint(configs) {
    let markPoint = {data: []};
    if (configs.lineMarkPointMin.value.toBoolean())
        markPoint.data.push({type: "min", name: configs.lineMarkPointMin.name});
    if (configs.lineMarkPointMax.value.toBoolean())
        markPoint.data.push({type: "max", name: configs.lineMarkPointMax.name});
    return markPoint;
}

function getMarkLine(configs) {
    let markLine = {data: []};
    if (configs.lineMarkLineMin.value.toBoolean())
        markLine.data.push({type: "min", name: configs.lineMarkLineMin.name});
    if (configs.lineMarkLineMax.value.toBoolean())
        markLine.data.push({type: "max", name: configs.lineMarkLineMax.name});
    if (configs.lineMarkLineAvg.value.toBoolean())
        markLine.data.push({type: "average", name: configs.lineMarkLineAvg.name});
    return markLine;
}

function getLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var series = {
                name: columns[c],
                type: "line",
                data: [],
                label: {
                    show: configs.lineLabelDisplay.value.toBoolean(),
                    align: "center",
                    verticalAlign: "middle",
                    position: "top",
                    distance: 15,
                    formatter: "{value|{c}}",
                    rotate: configs.lineLabelRotate.value,
                    rich: {
                        value: {
                            color: configs.lineLabelTextColor.value,
                            fontSize: configs.lineLabelFontSize.value,
                        }
                    }
                },
                itemStyle: {},
                lineStyle: {
                    width: Number(configs.lineStyleWidth.value),
                },
                emphasis: {
                    label: {
                        show: configs.lineEmphasisLabelDisplay.value.toBoolean(),
                        position: "bottom",
                        rotate: 0,
                        fontSize: configs.lineLabelFontSize.value,
                    }
                },
                symbol: configs.lineSymbol.value,
                symbolSize: configs.lineSymbolSize.value,
                smooth: configs.lineSmooth.value.toBoolean(),
                markPoint: getMarkPoint(configs),
                markLine: getMarkLine(configs),
                markArea: {},

                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush: configs.toolboxFeatureBrush.value.toBoolean() ? {
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        } : null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["line", "bar", "stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            },
        },

        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: yAxis_series,
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getBarAndLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    var containerWidth = myChart.getWidth();
    var containerHeight = myChart.getHeight();
    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c=0;c<columns.length;c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var serie = {};
            if (c % 2 > 0) {
                serie = {
                    name: columns[c],
                    type: "line",
                    data: [],
                    yAxisIndex: c % 2,
                    lineStyle: {
                        width: Number(configs.lineStyleWidth.value),
                    },
                    label: {
                        show: configs.lineLabelDisplay.value.toBoolean(),
                        align: "center",
                        verticalAlign: "middle",
                        position: "top",
                        distance: 15,
                        formatter: "{value|{c}}",
                        rotate: configs.lineLabelRotate.value,
                        rich: {
                            value: {
                                color: configs.lineLabelTextColor.value,
                                fontSize: configs.lineLabelFontSize.value,
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: configs.lineEmphasisLabelDisplay.value.toBoolean(),
                            position: "bottom",
                            rotate: 0,
                            fontSize: configs.lineLabelFontSize.value,
                        }
                    },
                    itemStyle: {},
                    symbol: configs.lineSymbol.value,
                    symbolSize: configs.lineSymbolSize.value,
                    smooth: configs.lineSmooth.value.toBoolean(),
                    markPoint: getMarkPoint(configs),
                    markLine: getMarkLine(configs),
                    markArea: {},
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };

            }
            else {
                serie = {
                    name: columns[c],
                    type: "bar",
                    yAxisIndex: c % 2,
                    data: [],
                    label: {
                        show: configs.barLabelDisplay.value.toBoolean(),
                        align: "center",
                        verticalAlign: "middle",
                        position: configs.barLabelPosition.value,
                        distance: 15,
                        formatter: "{value|{c}}",
                        rotate: configs.barLabelRotate.value,
                        rich: {
                            value: {
                                color: configs.labelBarTextColor.value,
                                fontSize: configs.labelBarFontSize.value,
                            }
                        }
                    },
                    itemStyle: {
                        borderRadius: Number(configs.barItemStyleBorderRadius.value),
                    },
                    emphasis: {
                        label: {
                            show: configs.barEmphasisLabelDisplay.value.toBoolean(),
                            align: "center",
                            verticalAlign: "middle",
                            position: configs.barLabelPosition.value,
                            distance: 15,
                            formatter: "{value|{c}}",
                            rotate: 0,
                            rich: {
                                value: {
                                    color: configs.labelBarTextColor.value,
                                    fontSize: configs.labelBarFontSize.value,
                                }
                            }
                        }
                    },
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                }
            }

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push(r[columns[c]].value);
            }
            yAxis_series.push(serie);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush: configs.toolboxFeatureBrush.value.toBoolean() ? {
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        } : null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            },
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: [{
            position: "right",
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
            {
                position: "left",
                inverse: configs.yAxisInverse.value.toBoolean(),
                axisLine: {
                    show: configs.axisLineDisplay.value.toBoolean(),
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisTick: {
                    show: configs.axisLineDisplay.value.toBoolean(),
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisLabel: {
                    show: configs.axisLineDisplay.value.toBoolean(),
                    rotate: Number(configs.yAxisLabelRotate.value),
                    textStyle: {
                        color: configs.axisTextColor.value
                    }
                },
                splitLine: {
                    show: configs.splitYLineDisplay.value.toBoolean(),
                    lineStyle: {
                        color: [
                            configs.axisColor.value
                        ]
                    },
                },
                splitArea: {
                    show: configs.splitYAreaDisplay.value.toBoolean(),
                }
            }],
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 1,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 1,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            moveHandleSize: 7
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (toPoint(configs.grid_right.value) - configs.dataZoomBarWidth.value * 100 / containerWidth) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            moveHandleSize: 7
        },
            {
                show: configs.dataZoomBarDisplay.value.toBoolean(),
                type: "slider",
                filterMode: configs.dataZoomFilterMode.value,
                xAxisIndex: 0,
                start: 0,
                end: 100,
                width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
                height: configs.dataZoomBarWidth.value,
                left: configs.grid_left.value,
                top: (100 - toPoint(configs.grid_bottom.value)) + "%",
                handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
                handleSize: configs.dataZoomHandleSize.value,
                borderColor: configs.dataZoomBarColor.value,
                handleStyle: {
                    color: configs.dataZoomBarColor.value,
                },
                moveHandleSize: 7
            }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: yAxis_series,
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getAreaStyle(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c=0;c<columns.length;c++) {
        if ( c==0 ){
           for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var series = {
                name: columns[c],
                type: "line",
                areaStyle: {
                    //可指定渐变颜色
                    //color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //    offset: 0,
                    //    color: "rgb(255, 158, 68)"
                    //}, {
                    //    offset: 1,
                    //   color: "rgb(255, 70, 131)"
                    //}])
                },
                //面积图
                sampling: "average",
                //抽样
                itemStyle: {
                    //可指定系列颜色
                    //color: "#d68262"
                },
                data: [],
                lineStyle: {
                    width: Number(configs.lineStyleWidth.value),
                },
                label: {
                    show: configs.lineLabelDisplay.value.toBoolean(),
                    align: "center",
                    verticalAlign: "middle",
                    position: "top",
                    distance: 15,
                    formatter: "{value|{c}}",
                    rotate: configs.lineLabelRotate.value,
                    rich: {
                        value: {
                            color: configs.lineLabelTextColor.value,
                            fontSize: configs.lineLabelFontSize.value,
                        }
                    }
                },
                emphasis: {
                    label: {
                        show: configs.lineEmphasisLabelDisplay.value.toBoolean(),
                        position: "bottom",
                        rotate:0,
                        fontSize: configs.lineLabelFontSize.value,
                    }
                },
                symbol: configs.lineSymbol.value,
                symbolSize: configs.lineSymbolSize.value,
                smooth: configs.lineSmooth.value.toBoolean(),
                markPoint: getMarkPoint(configs),
                markLine: getMarkLine(configs),
                markArea: {},

                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush:  configs.toolboxFeatureBrush.value.toBoolean()?{
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            //显示活动标尺线.
            trigger: "axis",
             axisPointer: {
                type: configs.axisPointerType.value,
            },
            //position: function (pt) {
            //锁定位置
            //    return [pt[0], "10%"];
            //}
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: yAxis_series,
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getPolar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var yAxis_series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            var series = {
                name: columns[c],
                type: configs.polarType.value=="area"?"bar":configs.polarType.value,
                coordinateSystem: "polar",
                data: [],
                roundCap: configs.polarRoundCap.value.toBoolean(),
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["stack", "tiled"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        angleAxis: {
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value,
                },
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value,
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            },
            type: configs.polarType.value == "area" || configs.polarType.value == "line"?"category":null,
            data: configs.polarType.value == "area" || configs.polarType.value == "line"?xAxis:null,
            z: 10
        },
        radiusAxis: {
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value,
                },
            },
            type: configs.polarType.value == "bar"?"category":null,
            data: configs.polarType.value == "bar"?xAxis:null,
            z: 10,
        },
        polar: {
            center:[(toPoint(configs.grid_left.value) + (100-toPoint(configs.grid_left.value)-toPoint(configs.grid_right.value))/2) + "%",
            (toPoint(configs.grid_top.value) + (100-toPoint(configs.grid_top.value)-toPoint(configs.grid_bottom.value))/2) + "%"],
        },
        series: yAxis_series,
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: 'axis',//"item",
            axisPointer: {
                type: 'cross'
            },
            //formatter: function(param) {
            //    return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            //}
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            angleAxis: 0,
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            radiusAxis: 0
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),

    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getPie(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                legends.push(r[columns[c]].value);
            }
        } else {
            var serie = {
                name: columns[c],
                type: "pie",
                radius: configs.outRadius.value,
                selectedMode: configs.pieSelectedMode.value,
                label: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                    //控制label是否显示
                    position: configs.pieLabelPosition.value,
                    alignTo: configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "30",
                        fontWeight: "bold"
                    }
                },
                itemStyle: {
                    label: {
                        show: true,
                    },
                    borderRadius: configs.pieItemStyleBorderRadius.value,
                    //borderColor: 'transparent',//'#fff',
                    //borderWidth: 2
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap: true,
                hoverAnimation: true,
                data: [],
                animation: configs.animation.value.toBoolean(),
                animationType: configs.animationType.value,
                animationTypeUpdate: configs.animationTypeUpdate.value,
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value, "name": legends[i]});
            }
            series.push(serie);
        }
    }

    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value)- toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value)- toPoint(configs.grid_right.value))/groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["pie", "funnel"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean() && !configs.richTextLabel.value.toBoolean(),
            trigger: "item",
            //formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: function(param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "&ensp;(&ensp;"  + param.percent + "%&ensp;)</span>"].join("<br>");
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },
    };

    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#eee",
            borderColor: "#aaa",
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: "#999",
            padding: [0, 7],
            rich: {
                a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                },
                abg: {
                    backgroundColor: "",
                    width: "100%",
                    align: "right",
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getRing(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                legends.push(r[columns[c]].value);
            }
        } else {
            var serie = {
                name: columns[c],
                type: "pie",
                selectedMode: configs.pieSelectedMode.value,
                radius: [configs.inRadius.value, configs.outRadius.value],
                avoidLabelOverlap: false,
                label: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                    position: configs.pieLabelPosition.value,
                    alignTo: configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "30",
                        fontWeight: "bold"
                    }
                },
                itemStyle: {
                    label: {
                        show: true,
                    },
                    borderRadius: configs.pieItemStyleBorderRadius.value,
                    //borderColor: 'transparent',//'#fff',
                    //borderWidth: 2
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap: true,
                hoverAnimation: true,
                data: [],
                animation: configs.animation.value.toBoolean(),
                animationType: configs.animationType.value,
                animationTypeUpdate: configs.animationTypeUpdate.value,
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value, "name": legends[i]});
            }
            series.push(serie);
        }
    }

    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value)- toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value)- toPoint(configs.grid_right.value))/groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["pie", "funnel"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean() && !configs.richTextLabel.value.toBoolean(),
            trigger: "item",
            //formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: function(param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "&ensp;(&ensp;"  + param.percent + "%&ensp;)</span>"].join("<br>");
            }
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },

    };
    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#eee",
            borderColor: "#aaa",
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: "#999",
            padding: [0, 7],
            rich: {
                a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                },
                abg: {
                    backgroundColor: "",
                    width: "100%",
                    align: "right",
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getRose(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                legends.push(r[columns[c]].value);
            }
        } else {
            var serie = {
                name: columns[c],
                type: "pie",
                selectedMode: configs.pieSelectedMode.value,
                radius: [configs.inRadius.value, configs.outRadius.value],
                center: ["50%", "50%"],
                roseType: "area",
                label: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                    position: configs.pieLabelPosition.value,
                    alignTo: configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: configs.pieLabelDisplay.value.toBoolean(),
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "30",
                        fontWeight: "bold"
                    }
                },
                itemStyle: {
                    label: {
                        show: true,
                    },
                    borderRadius: configs.pieItemStyleBorderRadius.value,
                    //borderColor: 'transparent',//'#fff',
                    //borderWidth: 2
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap: true,
                hoverAnimation: true,
                data: [],
                animation: configs.animation.value.toBoolean(),
                animationType: configs.animationType.value,
                animationTypeUpdate: configs.animationTypeUpdate.value,
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value, "name": legends[i]});
            }
            series.push(serie);
        }
    }
    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["pie", "funnel"]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean() && !configs.richTextLabel.value.toBoolean(),
            trigger: "item",
            //formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: function(param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "&ensp;(&ensp;"  + param.percent + "%&ensp;)</span>"].join("<br>");
            }
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },
    };
    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#eee",
            borderColor: "#aaa",
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: "#999",
            padding: [0, 7],
            rich: {
                a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                },
                abg: {
                    backgroundColor: "",
                    width: "100%",
                    align: "right",
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getRadar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var series = [];
    var xAxis_max = {};
    var all_max = null;
    //每行的最大值
      for (var i = 0; i < dataset["data"].length; i++) {
          let max = null;
          let r = dataset["data"][i];
          for (var c = 1; c < columns.length; c++) {
              if (max == null)
                  max = r[columns[c]].value;
              else if (r[columns[c]].value > max)
                  max = r[columns[c]].value;
              if (all_max == null)
                  all_max = max;
              else if (max > all_max)
                  all_max = max;
          }
          xAxis_max[r[columns[0]].value] = max;
      }

    for (var c=0;c<columns.length;c++) {
        if ( c==0 ){
           for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                xAxis.push({
                    name: r[columns[c]].value,
                    max: configs.radarSameMax.value.toBoolean()?all_max:xAxis_max[r[columns[c]].value],
                });
            }
        } else {
            var serie = {
                name: columns[c],
                type: "radar",
                areaStyle: {
                    show: configs.radarAreaDisplay.value.toBoolean(),
                    normal: {}
                },
                data: [],
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };

            var d = {name:columns[c], value:[]};
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                d.value.push(r[columns[c]].value);
            }
            serie.data.push(d);
            series.push(serie);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        radar: {
            center:[(toPoint(configs.grid_left.value) + (100-toPoint(configs.grid_left.value)-toPoint(configs.grid_right.value))/2) + "%",
            (toPoint(configs.grid_top.value) + (100-toPoint(configs.grid_top.value)-toPoint(configs.grid_bottom.value))/2) + "%"],
            shape: configs.radarShape.value,
            splitNumber:configs.radarSplitNumber.value,
            name: {
                show: configs.radarNameDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value,
                    backgroundColor: "#999",
                    borderRadius: 3,
                    padding: [3, 5],
                },
            },
            indicator: xAxis,

            axisLabel: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value,
                },
                rotate:configs.radarLabelRotate.value,
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine:{
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
                interval:1
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;

}

function getRegression(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var columns_add = [];
    var xAxis = [];
    var series = [];

    var selectType = configs.regressionType.value;
    var forwardPeroids = Number(configs.regressionForwardPeroids.value);
    var regressionPolynomialOrder = Number(configs.regressionPolynomialOrder.value);

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    xAxis.push(r[columns[c]].value);
                }
            } else {
                var serie = {
                    name: columns[c],
                    type: "line",
                    lineStyle: {
                        width: Number(configs.lineStyleWidth.value),
                    },
                    label: {
                        show: configs.lineLabelDisplay.value.toBoolean(),
                        align: "center",
                        verticalAlign: "middle",
                        position: "top",
                        distance: 15,
                        formatter: "{value|{c}}",
                        rotate: configs.lineLabelRotate.value,
                        rich: {
                            value: {
                                color: configs.lineLabelTextColor.value,
                                fontSize: configs.lineLabelFontSize.value,
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: configs.lineEmphasisLabelDisplay.value.toBoolean(),
                            position: "bottom",
                            rotate: 0,
                            fontSize: configs.lineLabelFontSize.value,
                        }
                    },
                    smooth: configs.lineSmooth.value.toBoolean(),
                    symbol: configs.lineSymbol.value,
                    symbolSize: configs.lineSymbolSize.value,
                    data: [],

                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };

                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    serie.data.push([i, r[columns[c]].value]);
                }
                series.push(serie);

                for (var regression in regressionType) {
                    if (regression == selectType) {
                        getRegLine(columns[c], serie, selectType, regressionPolynomialOrder);
                        break;
                    }
                }
            }
        }
    }

    function getRegLine(column, serie, type, order) {
        var myRegression = ecStat.regression(regressionType[type], washData(serie.data), order);
        myRegression.points.sort(function (a, b) {
            return a[0] - b[0];
        });

        columns_add.push(type + "(" + column + ")");
        var data = appendData(myRegression.points, myRegression.parameter, regressionType[type]);
        var regline = {
            name: type + "(" + column + ")",
            type: "line",
            smooth: configs.lineSmooth.value.toBoolean(),
            showSymbol: false,
            symbol: configs.lineSymbol.value,
            symbolSize: configs.lineSymbolSize.value,
            data: data,
            lineStyle: {
                type: "dotted",     //"solid/dashed/dotted"
            },
            markPoint: {
                itemStyle: {
                    color: "transparent"
                },
                label: {
                    show: configs.regressionExpressionDisplay.value.toBoolean(),
                    position: "left",
                    formatter: myRegression.expression.replaceAll("+ -", " - "),
                    color: configs.regressionExpressionColor.value,
                    fontSize: configs.lineLabelFontSize.value,
                },
                data: [{
                    coord: data[data.length - 1]
                }],
            },
            animation: configs.animation.value.toBoolean(),
            animationThreshold: Number(configs.animationThreshold.value),
            animationEasing: getAnimationEasing(configs),
            animationDuration: function (idx) {
                return idx * Number(configs.animationDuration.value);
            },
            animationDelay: function (idx) {
                return idx * Number(configs.animationDelay.value);
            },
            animationEasingUpdate: getAnimationEasingUpdate(configs),
            animationDurationUpdate: function (idx) {
                return idx * Number(configs.animationDurationUpdate.value);
            },
            animationDelayUpdate: function (idx) {
                return idx * Number(configs.animationDelayUpdate.value);
            },
        };
        series.push(regline);
    }

    function checkxAxis(result) {
        //计算X轴标示与初始是否一致,如不一致则添加
        if (xAxis.length < result.length) {
            for (var i = xAxis.length; i < result.length; i++) {
                xAxis.push("P" + result[i][0]);
            }
        }
    }

    function appendData(data, parameter, type) {
        var period = 1;
        var max = data.length - 1;
        //var period = (data[data.length - 1][0] - data[0][0]) / (data.length - 1);
        //var max = data[data.length - 1][0];
        var data_add = [];
        var i = 1;
        switch (type) {
            case "linear":  //直线
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.gradient * x + parameter.intercept]);
                    i += 1;
                }
                break;
            case "exponential": //指数
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.coefficient * Math.pow(Math.E, x * parameter.index)]);
                    i += 1;
                }
                break;
            case "logarithmic"://对数
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.gradient * Math.log(x) + parameter.intercept]);
                    i += 1;
                }
                break;
            case "polynomial"://多项式
                while (i <= forwardPeroids) {
                    var value = 0;
                    var x = max + i * period;
                    for (var s = 0; s < parameter.length; s++) {
                        value += parameter[s] * Math.pow(x, s);
                    }
                    data_add.push([x, value]);
                    i += 1;
                }
                break;
        }

        var result = data.slice().concat(data_add);
        checkxAxis(result);
        return result;
    }

    function washData(source) {
        //对非数值型数据进行清洗
        var target = [];
        for (var i = 0; i < source.length; i++) {
            var row = source[i];
            if (row[1] != "" && row[1] != null && !isNaN(Number(row[1]))) {
                target.push(row);
            }
        }
        return target;
    }

    init();

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush:  configs.toolboxFeatureBrush.value.toBoolean()?{
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean()},
                magicType: {
                    show: configs.toolboxFeatureMagicType.value.toBoolean(),
                    type: ["line", "bar",]
                },
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length).concat(columns_add),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            }
        },
        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitNumber: 20,
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                textStyle: {
                    color: configs.axisTextColor.value
                },
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            type: "value",
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getRelation(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var nodes = [];
    var links = [];
    //############################################
    // 数据转换方法,以每行的每个单元为source节点,次单元为target节点,无论多少单元依次下推n个节点.
    // {S:1,T:2]},{S:2,T:3},....
    // 为每个节点按值建立唯一索引,如有重复将引发报错.
    // 坐标值可以按照图像大小的百分比计算,取100以内随机数.也可以采用window.innerWidth和window.innerHeight限制范围.
    //############################################
    for (var i = 0; i < dataset["data"].length; i++) {
        var r = dataset["data"][i];
        for (var c=0; c<columns.length; c++) {
            var ex = true;
            for (var x = 0;x<nodes.length;x++){
                if (nodes[x].name == r[columns[c]].value || r[columns[c]].value == "") {
                    ex = false;
                    break;
                }
            }
            if (ex) {
                var node = {
                    name: r[columns[c]].value,
                    x: Math.floor(Math.random() * window.innerWidth),
                    y: Math.floor(Math.random() * window.innerHeight),
                    value: nodes.length + 1,
                };
                nodes.push(node);
            }

            if ((c + 1) < (columns.length) ) {
                if (r[columns[c]].value !== r[columns[c + 1]].value && r[columns[c]].value != "" && r[columns[c+1]].value !="") {
                    links.push({
                        source: r[columns[c]].value,
                        target: r[columns[c + 1]].value,
                    });
                }
            }
        }
    }

    var serie = {
        type: "graph",
        layout: configs.relationLayout.value,
        force: {
            repulsion: Number(configs.relationRepulsion.value), //斥力因子
            gravity: Number(configs.relationGravity.value), //引力因子
            edgeLength: Number(configs.relationEdgeLength.value), //距离
            layoutAnimation: true,
        },
        symbolSize: Number(configs.relationSymbolSize.value),
        roam: true,
        label: {
            show: configs.relationLabelShow.value.toBoolean(),
            fontSize: Number(configs.relationLabelFontSize.value),
            color: configs.relationLabelColor.value,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [Number(configs.relationSymbolSize.value)/4, Number(configs.relationSymbolSize.value)/4],
        edgeLabel: {
            fontSize: 9
        },
        data: nodes,
        links: links,
        draggable: configs.relationLayout.value == "force",
        lineStyle: {
            opacity: 0.7,
            width: Number(configs.relationLineWidth.value),
            curveness: Number(configs.relationLineCurveness.value),
            color: configs.relationLineColor.value
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(25, 100, 150, 0.5)",
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: configs.relationColor.value,//"rgb(251, 118, 123)"
            }, {
                offset: 1,
                color: configs.relationColor.value//"rgb(204, 46, 72)"
            }])
        },
        focusNodeAdjacency: configs.relationLineFocusNodeAdjacency.value.toBoolean(),
        emphasis: {
            lineStyle: {
                opacity: 1,
                width: Number(configs.relationLineWidth.value),
            }
        },
        animation: configs.animation.value.toBoolean(),
        animationThreshold: Number(configs.animationThreshold.value),
        animationEasing: getAnimationEasing(configs),
        animationDuration: function (idx) {
            return idx * Number(configs.animationDuration.value);
        },
        animationDelay: function (idx) {
            return idx * Number(configs.animationDelay.value);
        },
        animationEasingUpdate: getAnimationEasingUpdate(configs),
        animationDurationUpdate: function (idx) {
            return idx * Number(configs.animationDurationUpdate.value);
        },
        animationDelayUpdate: function (idx) {
            return idx * Number(configs.animationDelayUpdate.value);
        },
    };

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return params.marker + params.name;
            },
        },
        series: [serie],

        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

     //以下代码是为解决节点拖动
     function initInvisibleGraphic() {
         let graphic = {
             graphic: echarts.util.map(option.series[0].data, function (item, dataIndex) {
                 //使用图形元素组件在节点上划出一个隐形的图形覆盖住节点，小于原节点，留出部分用户显示当前节点与其他节点关系显示。
                 let tmpPos = myChart.convertToPixel({"seriesIndex": 0}, [item.x, item.y]);
                 return {
                     type: "circle",
                     id: dataIndex,
                     position: tmpPos,
                     shape: {
                         cx: 0,
                         cy: 0,
                         r: Number(configs.relationSymbolSize.value)/2.5,
                     },
                     silent:false,
                     invisible: true,
                     draggable: true,
                     ondrag: echarts.util.curry(onPointDragging, dataIndex),
                     z: 100
                 };
             })
         };
         graphic.graphic.concat(getWaterGraphic(__SYS_LOGO_LINK__));
         myChart.setOption(graphic);
     }

    function updatePosition() {
        let graphic = {
            graphic: echarts.util.map(option.series[0].data, function (item, dataIndex) {
                let tmpPos = myChart.convertToPixel({"seriesIndex": 0}, [item.x, item.y]);
                return {
                    id: dataIndex,
                    //务必注意
                    position: tmpPos,
                };
            })
        };
        graphic.graphic.concat(getWaterGraphic(__SYS_LOGO_LINK__));
        myChart.setOption(graphic);
    }

    function onPointDragging(dataIndex) {
        //节点上图层拖拽执行的函数
        let tmpPos = myChart.convertFromPixel({"seriesIndex": 0}, this.position);
        option.series[0].data[dataIndex].x = tmpPos[0];
        option.series[0].data[dataIndex].y = tmpPos[1];
        updatePosition();
        myChart.setOption(option);
    }

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);

        if (configs.relationLayout.value == "none")
            initInvisibleGraphic();
        //window.addEventListener("resize", updatePosition);
        myChart.on("dataZoom", updatePosition);
        myChart.on("graphRoam", updatePosition);

    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getTree(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var nodes = [];

    function createNode(name) {
        //增加一个节点，如果同名节点已存在，则返回已存在节点。
        var node = null;
        var ex = true;
        for (var x = 0;x<nodes.length;x++){
            if (nodes[x].name == name) {
                ex = false;
                node = nodes[x];
                break;
            }
        }
        if (ex) {
            node = {
                name: name,
                parent: null,
                children:[],
            };
            nodes.push(node);
        }
        return node;
    }

    for (var i = 0; i < dataset["data"].length; i++) {
        var r = dataset["data"][i];
        for (var c=0; c<columns.length; c++) {
            if ((c + 1) < columns.length) {
                if (r[columns[c]].value !== r[columns[c + 1]].value && r[columns[c]].value != "" && r[columns[c+1]].value !="") {
                    var node = createNode(r[columns[c]].value);
                    var child = createNode(r[columns[c+1]].value);
                    child.parent = node.name;
                }
            } else {
                if (r[columns[c]].value != "")
                    createNode(r[columns[c]].value);
            }
        }
    }

    function getChildren(parent) {
        //递归获取子节点
        var children = [];
        for(var i=0;i<nodes.length;i++){
            if (nodes[i].parent == parent){
                children.push({name:nodes[i].name,children:getChildren(nodes[i].name)});
            }
        }
        return children;
    }


    var series = [];
    var legends = [];
    for (var i=0; i<nodes.length; i++) {
        if (nodes[i].parent == null) {
            legends.push({name: nodes[i].name, icon: "rectangle"});
            var serie = {
                type: "tree",
                name: nodes[i].name,
                layout: configs.treeLayout.value,
                orient: configs.treeOrient.value,
                edgeShape: configs.treeLayout.value == "radial"?"curve":configs.treeEdgeShape.value,
                roam: true,
                expandAndCollapse: true,
                initialTreeDepth: 2,
                lineStyle: {
                    color: configs.treeLineColor.value,
                    width: Number(configs.treeLineWidth.value),
                    curveness: Number(configs.treeLineCurveness.value)
                },
                label: {
                    show: configs.treeLabelShow.value.toBoolean(),
                    color: configs.treeLabelColor.value,
                    position: "left",
                    verticalAlign: "middle",
                    align: "right",
                    rotate: Number(configs.treeLabelRotate.value),
                },
                leaves: {
                    label: {
                        show: configs.treeLabelShow.value.toBoolean(),
                        position: "right",
                        verticalAlign: "middle",
                        align: "left"
                    }
                },
                emphasis:{
                    itemStyle:{
                        color: configs.treeEmphasisColor.value,
                    }
                },
                symbolSize: Number(configs.treeSymbolSize.value),
                data: [{
                    name: nodes[i].name,
                    children: getChildren(nodes[i].name)
                }],
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            };
            series.push(serie);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            trigger: "item",
            triggerOn: "mousemove"
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        series:series,
        draggable: true,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getWebkitDep(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    var categories = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
        categories.push({name: dataset["columns"][i].name,keyword:{},base:dataset["columns"][i].name});
    }
    var nodes = [];
    var links = [];
    //############################################
    // 数据转换方法:
    // 每行第一单元为source节点,从第二个单元开始,每个单元为target节点,
    // createNode为每个节点按值建立唯一索引,如有重复返回原节点index.
    //############################################

    function createNode(name, category) {
        var index;
        var ex = true;
        for (var x = 0;x<nodes.length;x++){
            if (nodes[x].name == name || name == "") {
                index = x;
                ex = false;
                break;
            }
        }
        if (ex) {
            var node = {
                name: name,
                value: name,
                category: category,
                symbolSize: Number(configs.webkitDepSymbolSize.value),
            };
            nodes.push(node);
            index = nodes.length - 1;
        }
        return index;
    }

    for (var i = 0; i < dataset["data"].length; i++) {
        var r = dataset["data"][i];
        var source;
        for (var c=0; c<columns.length; c++) {
            if (c == 0) {
                source = createNode(r[columns[c]].value, c);
            } else {
                var target;
                target = createNode(r[columns[c]].value, c);
                if (source != target) {
                    links.push({
                        source: source,
                        target: target,
                    });
                }
            }
        }
    }

    var webkitDep = {
        type: "force",
        categories: categories,
        nodes: nodes,
        links: links
    };

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: columns,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        series: [{
            type: "graph",
            layout: "force",
            animation: true,
            //roam: true,
            label: {
                position: "right",
                formatter: "{b}",
            },
            draggable: true,
            data: webkitDep.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
            }),
            categories: webkitDep.categories,
            force: {
                edgeLength: Number(configs.webkitDepEdgeLength.value),
                repulsion: Number(configs.webkitDepRepulsion.value),
                gravity: Number(configs.webkitDepGravity.value),
            },
            edges: webkitDep.links
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getScatter(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    var series = [];
    var columns = [];
    var valueMin = null;
    var valueMax = null;
    var columns_add = [];
    var selectType = configs.regressionType.value;
    var forwardPeroids = Number(configs.regressionForwardPeroids.value);
    var regressionPolynomialOrder = Number(configs.regressionPolynomialOrder.value);

    function init() {
        for (var i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (var c = 1; c < columns.length; c++) {
            var serie = {
                name: columns[c],
                data: [],
                type: configs.scatterType.value,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[1];
                        },
                        position: "top"
                    }
                },
                symbol: configs.scatterSymbolShape.value,
                symbolSize: function (data) {
                    let size = eval(configs.scatterSymbolSize.value);
                    if (size[0] > size[1]){
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return (size[0]==size[1] || valueMax == valueMin)?size[0]:(data[1]-valueMin)*(size[1] - size[0])/(valueMax-valueMin) + size[0];
                },
                itemStyle: {
                    opacity: 0.8,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var d = [];
                var row = dataset["data"][i];
                if (isNaN(Number(row[columns[0]].value)))
                    d.push(i + 1);
                else
                    d.push(row[columns[0]].value);

                d.push(row[columns[c]].value);
                if (row[columns[c]].value != "" && row[columns[c]].value != null && !isNaN(Number(row[columns[c]].value))) {
                    serie.data.push(d);
                    if (valueMin == null || valueMin > d[1])
                        valueMin = d[1];
                    if (valueMax == null || valueMax < d[1])
                        valueMax = d[1];
                }
            }
            series.push(serie);
            for (var regression in regressionType) {
                if (regression == selectType) {
                    getRegLine(columns[c], serie, selectType, regressionPolynomialOrder);
                    break;
                }
            }
        }
    }

    function appendData(data, parameter, type) {
        var period = (data[data.length - 1][0] - data[0][0]) / (data.length - 1);
        var max = data[data.length - 1][0];
        var data_add = [];
        var i = 1;
        switch (type) {
            case "linear":  //直线
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.gradient * x + parameter.intercept]);
                    i += 1;
                }
                break;
            case "exponential": //指数
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.coefficient * Math.pow(Math.E, x * parameter.index)]);
                    i += 1;
                }
                break;
            case "logarithmic"://对数
                while (i <= forwardPeroids) {
                    var x = max + i * period;
                    data_add.push([x, parameter.gradient * Math.log(x) + parameter.intercept]);
                    i += 1;
                }
                break;
            case "polynomial"://多项式
                while (i <= forwardPeroids) {
                    var value = 0;
                    var x = max + i * period;
                    for (var s = 0; s < parameter.length; s++) {
                        value += parameter[s] * Math.pow(x, s);
                    }
                    data_add.push([x, value]);
                    i += 1;
                }
                break;
        }
        return data.slice().concat(data_add);
    }

    function getRegLine(column, serie, type, order) {
        var myRegression = ecStat.regression(regressionType[type], serie.data, order);
        myRegression.points.sort(function (a, b) {
            return a[0] - b[0];
        });
        //console.log(serie.data);
        //console.log(myRegression.parameter);
        columns_add.push(type + "(" + column + ")");
        var data = appendData(myRegression.points, myRegression.parameter, regressionType[type]);
        var regline = {
            name: type + "(" + column + ")",
            type: "line",
            showSymbol: false,
            smooth: configs.lineSmooth.value.toBoolean(),
            data: data,
            lineStyle: {
                type: "dotted",     //"solid/dashed/dotted"
            },
            markPoint: {
                itemStyle: {
                    color: "transparent"
                },
                label: {
                    show: true,
                    position: "left",
                    formatter: myRegression.expression,
                    fontSize: 10
                },
                data: [{
                    coord: data[data.length - 1]
                }],
            },
            animation: configs.animation.value.toBoolean(),
            animationThreshold: Number(configs.animationThreshold.value),
            animationEasing: getAnimationEasing(configs),
            animationDuration: function (idx) {
                return idx * Number(configs.animationDuration.value);
            },
            animationDelay: function (idx) {
                return idx * Number(configs.animationDelay.value);
            },
            animationEasingUpdate: getAnimationEasingUpdate(configs),
            animationDurationUpdate: function (idx) {
                return idx * Number(configs.animationDurationUpdate.value);
            },
            animationDelayUpdate: function (idx) {
                return idx * Number(configs.animationDelayUpdate.value);
            },
        };
        series.push(regline);
    }

    init();

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice().concat(columns_add),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            }
        },
        xAxis: {
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    type: "dashed",
                    color: [
                        configs.axisColor.value
                    ]
                }
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            scale: true,
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick:{
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    type: "dashed",
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getFunnel(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var series = [];
    var columns = [];
    var legends = [];

    function init() {
        for (var i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (var c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    legends.push(row[columns[c]].value);
                }
            } else {
                let min = null;
                let max = null;
                let serie = {
                    name: columns[c],
                    type: "funnel",
                    min: 0,
                    max: 100,
                    minSize: configs.FunnelMinSize.value,
                    maxSize: "100%",
                    sort: configs.funnelSort.value,
                    gap: Number(configs.funnelGap.value),
                    label: {
                        show: true,
                        position: configs.funnelLabelPosition.value,
                        fontSize: Number(configs.funnelLabelFontSize.value),
                        verticalAlign: "middle"
                    },
                    labelLine: {
                        length: 20,
                        lineStyle: {
                            width: 1,
                            type: "solid"
                        }
                    },
                    itemStyle: {
                        borderColor: "#fff",
                        borderWidth: 1,
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: [],
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    serie.data.push({name: row[columns[0]].value, value: row[columns[c]].value});
                    if (min == null || row[columns[c]].value<min)
                        min = row[columns[c]].value
                    if (max == null || row[columns[c]].value>max)
                        max = row[columns[c]].value

                }
                serie.min = min;
                serie.max = max;
                series.push(serie);
            }
        }

        let top = toPoint(configs.grid_top.value);
        let left = toPoint(configs.grid_left.value);
        let lines = parseInt(series.length / 2 + 0.5);
        let height = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
        let width = 100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value);

        if (series.length > 1)
            width = 40;
        for (var i = 0; i < series.length; i++) {
            series[i].top = ((top + parseInt(i / 2) * height) + parseInt(i / 2) * top) + "%";
            series[i].left = (left + (i % 2) * 40) + "%";
            if (configs.funnelAlign.value == "auto") {
                if (series.length == 1) {
                    series[i].funnelAlign = "center";
                    series[i].label.position = "inside";
                }

                if (series.length > 1 && (i % 2) == 0) {
                    series[i].funnelAlign = "right";
                    series[i].label.position = "inside";
                }

                if (series.length > 1 && (i % 2) != 0) {
                    series[i].funnelAlign = "left";
                    series[i].label.position = "inside";
                }
            } else {
                series[i].funnelAlign = configs.funnelAlign.value;
            }
            series[i].width = width + "%";
            series[i].height = height + "%";
        }
    }

    init();

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            trigger: "item",
            formatter: function (params) {
                return [params.seriesName, params.marker + params.name + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value + "</span>"].join("<br>");
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: legends,//columns.slice(1),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getLiqiud(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];

    function init() {
        for (var i = 0; i < dataset["data"].length; i++) {
            var r = dataset["data"][i];
            var serie = {
                name: r[columns[0]].value,
                type: "liquidFill",
                data: [],
                color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
                //center: ["50%", "50%"],
                //radius: "50%",
                amplitude: "8%",
                waveLength: "80%",
                phase: "auto",
                period: "auto",
                direction: "right",
                smooth: configs.lineSmooth.value.toBoolean(),

                shape: configs.liqiudShape.value,

                waveAnimation: true,

                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: "#1598ED",//"none",
                        borderColor: "#294D99",
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.25)"
                    }
                },

                backgroundStyle: {
                    color: "#E3F7FF"
                },

                itemStyle: {
                    opacity: 0.6,
                    shadowBlur: 50,
                    shadowColor: "rgba(0, 0, 0, 0.4)"
                },

                label: {
                    show: true,
                    insideColor: "#fff",
                    fontSize: configs.liqiudFontSize.value,
                    fontWeight: "bold",
                    align: "center",
                    baseline: "middle",
                    position: "inside"
                },

                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            };
            for (var c = 0; c < columns.length; c++) {
                if (c == 0) {
                    legends.push(r[columns[c]].value);
                }
                else {
                    serie.data.push({
                        name: columns[c],
                        value: r[columns[c]].value
                    });
                }
            }
            series.push(serie);
        }

        var groupWith = configs.groupWith.value;
        var lines = parseInt(series.length / groupWith + 0.5);
        var radius = 80 / (lines>groupWith?lines:groupWith);
        for (var i = 0; i < series.length; i++) {
            series[i].radius = radius + "%";
            var x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
            var y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
            series[i].center = [x + "%", y + "%"];
        }
    }

    init();
    var option = {
        backgroundColor: configs.backgroundColor.value,
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: function(param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            }
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        label: {
            formatter: function (param) {
                return param.seriesName + "\n\n"
                    + param.name + "\n\n"
                    + Math.round(param.value * 10000) / 100 + "%";
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    var timer;
    function doing() {
        let option = myChart.getOption();
        for (var i = 0; i < option.series.length; i++) {
            if (option.series[i].data.length > 1) {
                var data = option.series[i].data.slice(1);
                data.push(option.series[i].data[0]);
                option.series[i].data = data;
            }
        }

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  configs.seriesLoopPlayInterval.value * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getGaugeWithAll(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];

    for (var i = 0; i < dataset["data"].length; i++) {
        var r = dataset["data"][i];
        var serie = {
            name: legends[i],
            type: "gauge",
            title: {
                fontWeight: "bolder",
                fontSize: configs.gaugeTitleFontSize.value,
                color: "gray",
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowBlur: 10,
            },
            axisLine: {
                lineStyle: {
                    width: configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowBlur: 10,
                    color: [[0.2, "#3CB371"], [0.8, "#6388ae"], [1, "#DB7093"]]
                    //默认[[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]]
                }
            },
            axisLabel: {
                fontSize: configs.gaugeAxisLabelFontSize.value,
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowBlur: 10,
            },
            splitLine: {
                length: 15,
            },
            pointer: {
                width: 5, //指针宽度
                length: "60%"  //指针长度
            },
            detail: {
                formatter: ["{value}%", ""].join("\n"),
                fontSize: configs.gaugeLabelFontSize.value,
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowBlur: 10,
            },
            data: [],
            animation: configs.animation.value.toBoolean(),
            animationThreshold: Number(configs.animationThreshold.value),
            animationEasing: getAnimationEasing(configs),
            animationDuration: function (idx) {
                return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
            },
            animationDelay: function (idx) {
                return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
            },
            animationEasingUpdate: getAnimationEasingUpdate(configs),
            animationDurationUpdate: function (idx) {
                return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
            },
            animationDelayUpdate: function (idx) {
                return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
            },
        };
        for (var c = 0; c < columns.length; c++) {
            if (c == 0)
                legends.push(r[columns[c]].value);
            else {
                serie.data.push({
                    "name": legends[i] + "\n\n" + columns[c],
                    "value": r[columns[c]].value,
                    itemStyle: {
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 10
                    }
                })
            }
        }

        series.push(serie);
    }

    var groupWith = configs.groupWith.value;
    var lines = parseInt(series.length / groupWith + 0.5);
    var radius = 80 / (lines > groupWith ? lines : groupWith);
    for (var i = 0; i < series.length; i++) {
        series[i].radius = radius + "%";
        var x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
        var y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
        series[i].center = [x + "%", y + "%"];
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: "{b} : {c}%"
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            right: "10",
            orient: "vertical",
            top: "top",
            emphasis: {
                iconStyle: {
                    textPosition: "left"
                }
            },
        },
        series: series,
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);
    var timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });
    function doing() {
        let option = myChart.getOption();
        for (var i = 0; i < option.series.length; i++) {
            if (option.series[i].data.length > 1) {
                var data = option.series[i].data.slice(1);
                data.push(option.series[i].data[0]);
                option.series[i].data = data;
            }
        }

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  configs.seriesLoopPlayInterval.value * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getGaugeWithOne(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var seriesgroup = [];
    var index = 0;

    for (var c = 0; c < columns.length; c++) {
        var series = [];
        for (var i = 0; i < dataset["data"].length; i++) {
            var r = dataset["data"][i];
            if (c == 0) {
                legends.push(r[columns[c]].value);
            } else {
                var serie = {
                    name: legends[i],
                    type: "gauge",
                    title: {
                        fontWeight: "bolder",
                        fontSize: configs.gaugeTitleFontSize.value,
                        color: "gray",
                        textShadowColor: "rgba(0, 0, 0, 0.5)",
                        textShadowBlur: 10,
                    },
                    axisLine: {
                        lineStyle: {
                            width: configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                            shadowBlur: 10,
                            color: [[0.2, "#3CB371"], [0.8, "#6388ae"], [1, "#DB7093"]]
                            //默认[[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]]
                        }
                    },
                    axisLabel: {
                        fontSize: configs.gaugeAxisLabelFontSize.value,
                        textShadowColor: "rgba(0, 0, 0, 0.5)",
                        textShadowBlur: 10,
                    },
                    splitLine: {
                        length: 15,
                    },
                    pointer: {
                        width: 5, //指针宽度
                        length: "60%"  //指针长度
                    },
                    detail: {
                        formatter: ["{value}%", ""].join("\n"),
                        fontSize: configs.gaugeLabelFontSize.value,
                        textShadowColor: "rgba(0, 0, 0, 0.5)",
                        textShadowBlur: 10,
                    },
                    data: [],
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                serie.data.push({
                    "name": legends[i] + "\n\n" + columns[c],
                    "value": r[columns[c]].value,
                    itemStyle: {
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 10
                    }
                });
                series.push(serie);
            }
        }
        seriesgroup.push(series);
    }

    var groupWith = configs.groupWith.value;
    for (var g = 0; g < seriesgroup.length; g++) {
        var lines = parseInt(seriesgroup[g].length / groupWith + 0.5);
        var radius = 80 / (lines > groupWith ? lines : groupWith);
        for (var i = 0; i < seriesgroup[g].length; i++) {
            var x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
            var y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
            seriesgroup[g][i].radius = radius + "%";
            seriesgroup[g][i].center = [x + "%", y + "%"];
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: "{b} : {c}%"
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        series: seriesgroup[index],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    var timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });
    function doing() {
        let option = myChart.getOption();
        if (index < (seriesgroup.length - 1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series = seriesgroup[index];
        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  configs.seriesLoopPlayInterval.value * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCalendar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var series = [];
    var visualMaps = [];
    var calendars = [];
    var rangeMin;
    var rangeMax;

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (i == 0) {
                        rangeMin = echarts.format.formatTime("yyyy-MM-dd", r[columns[0]].value);
                        rangeMax = echarts.format.formatTime("yyyy-MM-dd", r[columns[0]].value);
                    } else {
                        rangeMin = echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) < rangeMin ? echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) : rangeMin;
                        rangeMax = echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) > rangeMax ? echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) : rangeMax;
                    }
                }
            } else {
                var serie = {
                    name: columns[c],
                    type: configs.calendarType.value, //["heatmap","scatter","effectScatter"]
                    coordinateSystem: "calendar",
                    calendarIndex: c - 1,
                    data: [],
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                var visualMap = {
                    //type: "piecewise",
                    show: configs.visualMapDisplay.value.toBoolean(),
                    calculable: true,
                    //orient: "vertical",//"horizontal"
                    //left: 10,
                    //top: 10,
                    seriesIndex: c - 1,//影射数据系列
                    dimension: 1,//影射数据纬度
                    textStyle: {
                        color: "gray"
                    }
                };
                var calendar = {
                    orient: configs.calendarOrient.value, //"vertical",//"horizontal"
                    left: "10%",
                    right: "10%",
                    cellSize: ["auto", "auto"],
                    itemStyle: {
                        borderWidth: 0.5,
                    },
                    yearLabel: {show: true, margin: 20},
                    dayLabel: {nameMap: "cn", color: "gray", margin: 5},
                    monthLabel: {nameMap: "cn", color: "gray"},
                };
                var valueMin = null;
                var valueMax = null;
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        serie.data.push([r[columns[0]].value, r[columns[c]].value]);
                        if (valueMin == null || valueMax == null) {
                            valueMin = Number(r[columns[c]].value);
                            valueMax = Number(r[columns[c]].value);
                        } else {
                            if (Number(r[columns[c]].value) < valueMin)
                                valueMin = Number(r[columns[c]].value);
                            if (Number(r[columns[c]].value) > valueMax)
                                valueMax = Number(r[columns[c]].value);
                        }
                    }
                }
                if (configs.calendarType.value == "effectScatter" || configs.calendarType.value == "scatter") {
                    serie.symbolSize = function (val) {
                        var value = val[1] / (valueMax / configs.scatterSymbolSize.value);
                        return value < 5 ? 5 : value;
                    };
                }
                visualMap.min = valueMin;
                visualMap.max = valueMax;
                visualMap.show = configs.visualMapDisplay.value.toBoolean(),
                calendar.range = [rangeMin, rangeMax];
                calendars.push(calendar);
                series.push(serie);
                visualMaps.push(visualMap);
            }
        }
        if (configs.calendarOrient.value == "vertical") {
            var width = (80 - 15 * calendars.length) / calendars.length;
            for (var i = 0; i < calendars.length; i++) {
                calendars[i].top =  "15%";
                calendars[i].left = (15 * (i + 1) + width * i) + "%";
                visualMaps[i].left = containerWidth * (15 * (i + 1) + width * i)/100 - 40 ;
                calendars[i].width = width + "%";
                visualMaps[i].itemHeight = containerWidth * width / 100;
                calendars[i].bottom = "10%";
                visualMaps[i].top = "90%";
                visualMaps[i].orient = "horizontal";
            }
        } else {
            var height = (95 - 10 * calendars.length) / calendars.length;
            for (var i = 0; i < calendars.length; i++) {
                calendars[i].top = (10 * (i + 1) + height * i) + "%";
                visualMaps[i].top = containerHeight * (10 * (i + 1) + height * i)/100 - 10;
                calendars[i].left = "10%";
                visualMaps[i].left = "1%";
                calendars[i].width = "80%";
                calendars[i].height = (height + "%");
                visualMaps[i].itemHeight = containerHeight * height / 100;
                visualMaps[i].orient = "vertical";
            }
        }
    }

    init();
    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            position: "top",
            formatter: function(param) {
                let date = echarts.format.formatTime("yyyy-MM-dd", param.value[0]);
                return [param.seriesName, param.marker + "&ensp;" + date + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value[1] + "</span>"].join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: visualMaps,
        calendar: calendars,
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;

}

function getGeoOfChina(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var series = [];
    var index = 0;

    var getMapRegions = function(name){
        let Regions = {};
        let features =echarts.getMap(name).geoJson.features;
        for(var i=0;i<features.length;i++){
            Regions[features[i].properties.name] = features[i].properties.cp;
        }
        return Regions;
    };
    geoCoordMap.Region = getMapRegions("china");

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            let geoRegion = geoCoordMap.Region[data[i].name];
            let geoCity = geoCoordMap.City[data[i].name];
            if (geoRegion){
                //默认到地区,不用处理
            } else if (geoCity) {
                //到城市
                res.push({
                    name: data[i].name,
                    value: geoCity.concat(data[i].value)
                });
            } else {
                //模糊查找,可能匹配错误
                for (coord in geoCoordMap.City) {
                    if (coord.includes(data[i].name)) {
                        let geoCoord = geoCoordMap.City[coord];
                        res.push({
                            name: data[i].name + "(" + coord + ")",
                            value: geoCoord.concat(data[i].value)
                        });
                        break;
                    }
                }
            }
        }
        return res;
    };

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c >0 ) {
                var data = [];
                var min = null;
                var max = null;
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (min == null || max == null) {
                            min = Number(r[columns[c]].value);
                            max = Number(r[columns[c]].value);
                        } else {
                            if (Number(r[columns[c]].value) < min)
                                min = Number(r[columns[c]].value);
                            if (Number(r[columns[c]].value) > max)
                                max = Number(r[columns[c]].value);
                        }
                    }
                }
                series.push({name:columns[c],data:data,min:min,max:max});
            }
        }
    }

    init();

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        //backgroundColor: configs.geoBackgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
            },
        },
        visualMap: {
            show: configs.visualMapDisplay.value.toBoolean(),
            min: series[index].min,
            max: series[index].max,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber: configs.visualMap_piecewise_splitNumber.value,
        },
        geo: {
            map: "china",
            roam: true,
            scaleLimit: {
                min: 1,
                max: 10
            },
            label: {
                normal: {
                    show: configs.geoAreaNameDisplay.value.toBoolean(),
                    color: configs.geoAreaNameColor.value,
                },
                emphasis: {
                    show: true,
                    color: configs.geoAreaNameColor.value,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: configs.geoAreaColor.value,
                    borderColor: configs.geoBorderColor.value,
                    shadowBlur: 50,
                    shadowColor: "rgba(0, 0, 0, 0.2)",
                },
                emphasis: {
                    areaColor: configs.geoHotAreaColor.value
                }
            },
        },
        series: [
            {
                name: series[index].name,
                type: "map",
                geoIndex: 0,
                data: series[index].data,
            },
            {
                name: series[index].name,
                type: "effectScatter",//"scatter",//"effectScatter"
                coordinateSystem: "geo",
                data: convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                })),
                //symbolSize: function (val) {
                //    var value = val[2] / (series[index].max / configs.scatterSymbolSize.value);
                //    return value < 5 ? 5 : value;
                //},
                symbolSize: function (data) {
                    let size = eval(configs.geoScatterSymbolSize.value);
                    if (size[0] > size[1]){
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return (size[0]==size[1] || series[index].max == series[index].min)?size[0]:(data[2]-series[index].min)*(size[1] - size[0])/(series[index].max-series[index].min) + size[0];
                },
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke"
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "top",
                        show: true,
                        color: configs.geoAreaNameColor.value,
                    }
                },
                itemStyle: {
                    normal: {
                        color: configs.geoAreaColor.value,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                    }
                },
                zlevel: 1
            }
        ],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        animation: configs.animation.value.toBoolean(),
        animationThreshold: Number(configs.animationThreshold.value),
        animationEasing: getAnimationEasing(configs),
        animationDuration: function (idx) {
            return idx * Number(configs.animationDuration.value);
        },
        animationDelay: function (idx) {
            return idx * Number(configs.animationDelay.value);
        },
        animationEasingUpdate: getAnimationEasingUpdate(configs),
        animationDurationUpdate: function (idx) {
            return idx * Number(configs.animationDurationUpdate.value);
        },
        animationDelayUpdate: function (idx) {
            return idx * Number(configs.animationDelayUpdate.value);
        },
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    var timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    function doing() {
        var option = myChart.getOption();
        if (index < (series.length - 1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = {
            show: configs.visualMapDisplay.value.toBoolean(),
            min: series[index].min,
            max: series[index].max,
            type: configs.visualMap_type.value,
            calculable: true,
            top: configs.visualMap_top.value,
            left: configs.visualMap_left.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber: configs.visualMap_piecewise_splitNumber.value,
        };
        option.series[0].data = series[index].data;
        option.series[1].data = convertData(series[index].data.sort(function (a, b) {
            return b.value - a.value;
        }));

        setTimeout(() => {
            myChart.hideLoading();
            myChart.setOption(option);
        }, Number(configs.loadingTimes.value) * 1000);
    }

    function startTimer() {
        timer = setInterval(doing,  configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer,  configs.seriesLoopPlayInterval.value * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getGeoOfLocal(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var series = [];
    var index = 0;

    var getMapRegions = function(name){
        let Regions = {};
        try {
            let features = echarts.getMap(name).geoJson.features;
            for (var i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
        }catch (e) {
            console.log(e);
        }
        return Regions;
    };

    geoCoordMap.Region = getMapRegions(geoCoordMap.LocalMap);

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            let geoRegion = geoCoordMap.Region[data[i].name];
            let geoCoord = geoCoordMap.Custom[data[i].name];

            if (geoRegion){
                //区域数据,默认
            } else if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c >0 ) {
                var data = [];
                var min = null;
                var max = null;
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (min == null || max == null) {
                            min = Number(r[columns[c]].value);
                            max = Number(r[columns[c]].value);
                        } else {
                            if (Number(r[columns[c]].value) < min)
                                min = Number(r[columns[c]].value);
                            if (Number(r[columns[c]].value) > max)
                                max = Number(r[columns[c]].value);
                        }
                    }
                }
                series.push({name:columns[c],data:data,min:min,max:max});
            }
        }
    }

    init();

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        //backgroundColor: configs.geoBackgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },

        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return params.name + "<br>" +  params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
            },
        },
        visualMap: {
            show:configs.visualMapDisplay.value.toBoolean(),
            min: series[index].min,
            max: series[index].max,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber:configs.visualMap_piecewise_splitNumber.value,
        },
        //backgroundColor: "#013954",
        geo: {
            map: geoCoordMap.LocalMap,
            roam: true,
            scaleLimit: {
                min: 1,
                max: 10
            },
            label: {
                normal: {
                    show: configs.geoAreaNameDisplay.value.toBoolean(),
                    color: configs.geoAreaNameColor.value,
                },
                emphasis: {
                    show: true,
                    color: configs.geoAreaNameColor.value,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: configs.geoAreaColor.value,
                    borderColor: configs.geoBorderColor.value,
                    shadowBlur: 50,
                    shadowColor: "rgba(0, 0, 0, 0.2)",
                },
                emphasis: {
                    areaColor: configs.geoHotAreaColor.value
                }
            },
        },
        series: [
            {
                name: series[index].name,
                type: "map",
                geoIndex: 0,
                data: series[index].data,
            },
            {
                name: series[index].name,
                type: "effectScatter",//"scatter",//"effectScatter"
                coordinateSystem: "geo",
                data: convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                })),
                //symbolSize: function (val) {
                //    var value = val[2] / (series[index].max / configs.scatterSymbolSize.value);
                //    return value<5?5:value;
                //},
                symbolSize: function (data) {
                    let size = eval(configs.geoScatterSymbolSize.value);
                    if (size[0] > size[1]){
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return size[0]==size[1] || series[index].max == series[index].min?size[0]:(data[2]-series[index].min)*(size[1] - size[0])/(series[index].max-series[index].min) + size[0];
                },
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke"
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "top",
                        show: true,
                        color: "gray"
                    }
                },
                itemStyle: {
                    normal: {
                        color: configs.geoAreaColor.value,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                    }
                },
                zlevel: 1
            }
        ],

        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        animation: configs.animation.value.toBoolean(),
        animationThreshold: Number(configs.animationThreshold.value),
        animationEasing: getAnimationEasing(configs),
        animationDuration: function (idx) {
            return idx * Number(configs.animationDuration.value);
        },
        animationDelay: function (idx) {
            return idx * Number(configs.animationDelay.value);
        },
        animationEasingUpdate: getAnimationEasingUpdate(configs),
        animationDurationUpdate: function (idx) {
            return idx * Number(configs.animationDurationUpdate.value);
        },
        animationDelayUpdate: function (idx) {
            return idx * Number(configs.animationDelayUpdate.value);
        },
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    var timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    function doing() {
        var option = myChart.getOption();
        if (index < (series.length - 1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = {
            show: configs.visualMapDisplay.value.toBoolean(),
            min: series[index].min,
            max: series[index].max,
            type: configs.visualMap_type.value,
            calculable: true,
            top: configs.visualMap_top.value,
            left: configs.visualMap_left.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber: configs.visualMap_piecewise_splitNumber.value,
        };
        option.series[0].data = series[index].data;
        option.series[1].data = convertData(series[index].data.sort(function (a, b) {
            return b.value - a.value;
        }));

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing, configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer,  configs.seriesLoopPlayInterval.value * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getBar3D(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var rows = [];
    var valueMin = null;
    var valueMax = null;
    var series = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            var data = [];
            var serie = {
                name: columns[c],
                type: "bar3D",
                data: [],
                bevelSize: 0.1,
                //柱子的倒角尺寸。支持设置为从 0 到 1 的值。默认为 0，即没有倒角。
                bevelSmoothness: 4,
                //柱子倒角的光滑/圆润度，数值越大越光滑/圆润

                shading: "realistic",
                //"color" 只显示颜色，不受光照等其它因素的影响。
                //"lambert" 通过经典的 lambert 着色表现光照带来的明暗。
                //"realistic" 真实感渲染，
                realisticMaterial: {
                    roughness: 0.5,
                    //用于表示材质的粗糙度，0为完全光滑，1完全粗糙，中间的值则是介于这两者之间。
                    metalness: 0,
                    //表示材质是金属还是非金属，0为非金属，1为金属，中间的值则是介于这两者之间。通常设成0和1就能满足大部分场景了。
                },
                postEffect: {
                    enable: true,
                    SSAO: {
                        enable: true,
                        radius: 5
                    }
                },

                itemStyle: {
                    opacity: configs.ItemStyleOpacityFor3D.value,
                    //柱子的透明度,取值范围[0-1]
                },

                label: {
                    show: configs.LabelOf3DDisplay.value.toBoolean(),
                    textStyle: {
                        color: configs.label3DTextColor.value,
                        fontSize: configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return  rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value*1.2,
                        }
                    },
                    //itemStyle: {}
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin == null || valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax == null || valueMax < r[columns[c]].value)
                    valueMax = r[columns[c]].value;
            }
            serie.data = data.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]],
                }
            });
            series.push(serie);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return rows[params.value[0]]+ "<br>" + params.marker + columns[params.value[1] + 1] +  ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show: configs.visualMapDisplay.value.toBoolean(),
            min: valueMin,
            max: valueMax,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber: configs.visualMap_piecewise_splitNumber.value,
        },
        xAxis3D: {
            type: "category",
            data: rows,

        },
        yAxis3D: {
            type: "category",
            data: columns.slice(1),
        },
        zAxis3D: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxHeight: Number(configs.BoxHeightFor3D.value),
            boxWidth: configs.BoxWidthFor3D.value,
            boxDepth: configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: configs.AutoRotateFor3D.value.toBoolean(),
                autoRotateSpeed: configs.AutoRotateSpeedFor3D.value,
                projection: "orthographic",
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean() || configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean() || configs.splitYAreaDisplay.value.toBoolean(),
            },
            axisPointer: {
                show: configs.axisPointerDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: configs.LightShadowFor3D.value.toBoolean(),
                },
                ambient: {
                    intensity: 0.3
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getLine3D(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var rows = [];
    var series = [];
    var valueMin = null;
    var valueMax = null;
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            var serie = {
                name: columns[c],
                type: "line3D",
                data: [],
                smooth: configs.lineSmooth.value.toBoolean(),
                lineStyle: {
                    opacity: configs.ItemStyleOpacityFor3D.value,
                    width: configs.lineStyleWidth.value,
                },
                itemStyle : {},
                label: {
                    show: configs.LabelOf3DDisplay.value.toBoolean(),
                    textStyle: {
                        color: configs.label3DTextColor.value,
                        fontSize: configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return  rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value*1.2,
                        }
                    },
                    //itemStyle: {}
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };
            var data = [];
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin == null || valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax == null || valueMax < r[columns[c]].value)
                    valueMax = r[columns[c]].value;
            }
            serie.data = data.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]],
                }
            });
            series.push(serie);
        }
    }

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return rows[params.value[0]]+ "<br>" + params.marker + columns[params.value[1] + 1] +  ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show:configs.visualMapDisplay.value.toBoolean(),
            min: valueMin,
            max: valueMax,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber:configs.visualMap_piecewise_splitNumber.value,
        },

        xAxis3D: {
            type: "category",
            data: rows,
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        yAxis3D: {
            type: "category",
            data: columns.slice(1),
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        zAxis3D: {
            type: "value",
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxHeight: Number(configs.BoxHeightFor3D.value),
            boxWidth: configs.BoxWidthFor3D.value,
            boxDepth: configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: configs.AutoRotateFor3D.value.toBoolean(),
                autoRotateSpeed: configs.AutoRotateSpeedFor3D.value,
                projection: "orthographic",
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            },
            axisLine: {
                show:configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean() || configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean() || configs.splitYAreaDisplay.value.toBoolean(),
            },
            axisPointer: {
                show: configs.axisPointerDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: configs.LightShadowFor3D.value.toBoolean(),
                },
                ambient: {
                    intensity: 0.3
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getScatter3D(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var rows = [];
    var series = [];
    var valueMin = null;
    var valueMax = null;
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            var serie = {
                name: columns[c],
                type: "scatter3D",
                data: [],
                symbolSize: function (data) {
                    let size = eval(configs.scatterSymbolSizeFor3D.value);
                    if (size[0] > size[1]){
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return size[0]==size[1] || valueMax == valueMin?size[0]:(data[2]-valueMin)*(size[1] - size[0])/(valueMax-valueMin) + size[0];
                },
                symbol: configs.scatterSymbolShapeFor3D.value,
                itemStyle:
                    {
                        opacity: configs.ItemStyleOpacityFor3D.value,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                label: {
                    show: configs.LabelOf3DDisplay.value.toBoolean(),
                    textStyle: {
                        color: configs.label3DTextColor.value,
                        fontSize: configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return  rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value*1.2,
                        }
                    },
                    //itemStyle: {}
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                },
            };
            var data = [];
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin == null || valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax == null || valueMax < r[columns[c]].value)
                    valueMax = r[columns[c]].value;
            }
            serie.data = data.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]],
                }
            });
            series.push(serie);
        }
    }

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return rows[params.value[0]]+ "<br>" + params.marker + columns[params.value[1] + 1] +  ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show:configs.visualMapDisplay.value.toBoolean(),
            min: valueMin,
            max: valueMax,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber:configs.visualMap_piecewise_splitNumber.value,
        },

        xAxis3D: {
            type: "category",
            data: rows,
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        yAxis3D: {
            type: "category",
            data: columns.slice(1),
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        zAxis3D: {
            type: "value",
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxHeight: Number(configs.BoxHeightFor3D.value),
            boxWidth: configs.BoxWidthFor3D.value,
            boxDepth: configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: configs.AutoRotateFor3D.value.toBoolean(),
                autoRotateSpeed: 10,
                projection: "orthographic",
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            },
            axisLine: {
                show:configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean() || configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean() || configs.splitYAreaDisplay.value.toBoolean(),
            },
            axisPointer: {
                show: configs.axisPointerDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: configs.LightShadowFor3D.value.toBoolean(),
                },
                ambient: {
                    intensity: 0.3
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCategoryLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    var columns = [];
    var times = [];
    var options = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var i = 0; i < dataset["data"].length; i++) {
        var opt = {
            series: []
        };
        var row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        var data = [];
        for (var c = 1; c < columns.length; c++) {
            data.push({name: columns[c], value: row[columns[c]].value});
        }
        var serie = {
            name: row[columns[0]].value,
            data: data,
            animation: configs.animation.value.toBoolean(),
            animationThreshold: Number(configs.animationThreshold.value),
            animationEasing: getAnimationEasing(configs),
            animationDuration: function (idx) {
                return idx * Number(configs.animationDuration.value);
            },
            animationDelay: function (idx) {
                return idx * Number(configs.animationDelay.value);
            },
            animationEasingUpdate: getAnimationEasingUpdate(configs),
            animationDurationUpdate: function (idx) {
                return idx * Number(configs.animationDurationUpdate.value);
            },
            animationDelayUpdate: function (idx) {
                return idx * Number(configs.animationDelayUpdate.value);
            },
        };
        if (configs.categoryLineType.value == "bar") {
            serie.label = {
                show: configs.barLabelDisplay.value.toBoolean(),
                rotate: configs.barLabelRotate.value,
                align: "center",
                verticalAlign: "middle",
                position: configs.barLabelPosition.value,
                distance: 15,
                formatter: "{value|{c}}",
                rich: {
                    value: {
                        color: configs.labelBarTextColor.value,
                        fontSize: configs.labelBarFontSize.value,
                    }
                }
            };
            serie.itemStyle = {
                borderRadius: Number(configs.barItemStyleBorderRadius.value),
            };
            serie.emphasis = {
                label: {
                    show: configs.barEmphasisLabelDisplay.value.toBoolean(),
                    align: "center",
                    verticalAlign: "middle",
                    position: configs.barLabelPosition.value,
                    distance: 15,
                    formatter: "{value|{c}}",
                    rotate: 0,
                    rich: {
                        value: {
                            color: configs.labelBarTextColor.value,
                            fontSize: configs.labelBarFontSize.value,
                        }
                    }
                }
            };
        }
        if (configs.categoryLineType.value == "pie") {
            serie.radius = configs.outRadius.value;
            serie.selectedMode = configs.pieSelectedMode.value;
            serie.label = {
                show: true,
                alignTo: configs.pieLabelAlignTo.value,
                bleedMargin: 5,
                margin: 20
            };
            serie.itemStyle = {
                borderRadius: Number(configs.pieItemStyleBorderRadius.value),
            };
            serie.animationType = configs.animationType.value;
            serie.animationTypeUpdate = configs.animationTypeUpdate.value;

            if (configs.richTextLabel.value.toBoolean()) {
                serie.label = {
                    formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                    backgroundColor: "#eee",
                    borderColor: "#aaa",
                    borderWidth: 1,
                    borderRadius: 4,
                    //shadowBlur:3,
                    //shadowOffsetX: 2,
                    //shadowOffsetY: 2,
                    //shadowColor: "#999",
                    padding: [0, 7],
                    rich: {
                        a: {
                            color: "#999",
                            lineHeight: 22,
                            align: "center"
                        },
                        abg: {
                            backgroundColor: "",
                            width: "100%",
                            align: "right",
                            height: 22,
                            borderRadius: [4, 4, 0, 0]
                        },
                        hr: {
                            borderColor: "#aaa",
                            width: "100%",
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: "#eee",
                            backgroundColor: "#334455",
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                };
            }
            serie.labelLine = {
                show: true
            };
        }
        if (configs.categoryLineType.value == "line" || configs.categoryLineType.value == "areaStyle") {
            serie.smooth = configs.lineSmooth.value.toBoolean();
            serie.lineStyle = {
                width: Number(configs.lineStyleWidth.value),
            };
            serie.label = {
                show: configs.lineLabelDisplay.value.toBoolean(),
                align: "center",
                verticalAlign: "middle",
                position: "top",
                distance: 15,
                formatter: "{value|{c}}",
                rotate: configs.lineLabelRotate.value,
                rich: {
                    value: {
                        color: configs.lineLabelTextColor.value,
                        fontSize: configs.lineLabelFontSize.value,
                    }
                }
            };
            serie.emphasis = {
                label: {
                    show: configs.lineEmphasisLabelDisplay.value.toBoolean(),
                    position: "bottom",
                    rotate: 0,
                    fontSize: configs.lineLabelFontSize.value,
                }
            };
            serie.symbol = configs.lineSymbol.value;
            serie.symbolSize = configs.lineSymbolSize.value;
            serie.markPoint = getMarkPoint(configs);
            serie.markLine = getMarkLine(configs);
            serie.markArea = {};
            if (configs.categoryLineType.value == "areaStyle") {
                serie.areaStyle = {};
            }
        }
        opt.series.push(serie);
        options.push(opt);
    }

    var option = {
        baseOption: {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            grid: {
                x: configs.grid_left.value,
                y: configs.grid_top.value,
                x2: configs.grid_right.value,
                y2: configs.grid_bottom.value,
                containLabel: configs.grid_containLabel.value.toBoolean(),
                backgroundColor: "transparent"
            },
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            timeline: {
                show: configs.timelineDisplay.value.toBoolean(),
                axisType: "category",
                //考虑数据通用性，使用类目轴
                //"value" 数值轴，适用于连续数据。
                // "category" 类目轴，适用于离散的类目数据。
                // "time" 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: "left"
                // },
                symbol: "emptyCircle",
                //"circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"
                symbolSize: 2,
                data: times,
                label: {
                    color: configs.timelineLabelColor.value,
                    fontSize: Number(configs.timelineLabelFontSize.value),
                    formatter: function (s) {
                        return s;
                    }
                },
                lineStyle: {
                    color: configs.timelineStyleColor.value,
                },
                controlStyle: {
                    color: configs.timelineStyleColor.value,
                },
                emphasis: {
                    label: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    checkpointStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    controlStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                },
                orient: configs.timelineOrient.value,
                left: configs.timelineLeft.value,
                right: configs.timelineRight.value,
                top: configs.timelineTop.value,
                bottom: configs.timelineBottom.value,
            },
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
                trigger: "axis",
                axisPointer: {
                    type: configs.categoryLineType.value != "pie" ? configs.axisPointerType.value : "none",
                },
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            xAxis: {
                type: "category",
                data: columns.slice(1),
                inverse: configs.xAxisInverse.value.toBoolean(),
                axisLine: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisTick: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisLabel: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    rotate: Number(configs.xAxisLabelRotate.value),
                    textStyle: {
                        color: configs.axisTextColor.value
                    }
                },
                splitLine: {
                    show: configs.splitXLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: [
                            configs.axisColor.value
                        ]
                    },
                },
                splitArea: {
                    show: configs.splitXAreaDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                }
            },
            yAxis: {
                type: "value",
                inverse: configs.yAxisInverse.value.toBoolean(),
                axisLine: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisTick: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: configs.axisColor.value
                    },
                },
                axisLabel: {
                    show: configs.axisLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    rotate: Number(configs.yAxisLabelRotate.value),
                    textStyle: {
                        color: configs.axisTextColor.value
                    }
                },
                splitLine: {
                    show: configs.splitYLineDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: [
                            configs.axisColor.value
                        ]
                    },
                },
                splitArea: {
                    show: configs.splitYAreaDisplay.value.toBoolean() && configs.categoryLineType.value != "pie",
                }
            },
            series: {
                type: configs.categoryLineType.value == "areaStyle" ? "line" : configs.categoryLineType.value,
            },
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        },
        options: options
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getGeoMigrateLinesOfChinaCity(container, width, height, dataset, configs) {
    //数据结构:fromCity|toCity|value or text
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var seriedata = [];

    function getSerie(fromCity) {
        let d = null;
        for (let i = 0; i < seriedata.length; i++) {
            if (seriedata[i][0] == fromCity) {
                d = seriedata[i];
                break;
            }
        }
        return d;
    }

    function getSerieNames() {
        let names = [];
        for (let i = 0; i < seriedata.length; i++) {
            names.push(seriedata[0]);
        }
        return names;
    }

    if (columns.length >= 3) {
        for (var i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            let fromCity = row[columns[0]].value;
            let toCity = row[columns[1]].value;
            let value = row[columns[2]].value;
            let r = [{city: fromCity}, {city: toCity, value: value}];
            let seri = getSerie(fromCity);
            if (seri == null) {
                let det = [];
                det.push(r);
                seriedata.push([fromCity, det]);
            } else {
                seri[1].push(r);
            }
        }

        var getMapRegions = function (name) {
            let Regions = {};
            let features = echarts.getMap(name).geoJson.features;
            for (var i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
            return Regions;
        };
        geoCoordMap.Region = getMapRegions("china");

        var convertToLine = function (data) {
            let res = [];
            for (var i = 0; i < data.length; i++) {
                let dataItem = data[i];
                let fromRegion = geoCoordMap.Region[dataItem[0].city];
                let fromCity = geoCoordMap.City[dataItem[0].city];
                if (!fromCity) {
                    for (coord in geoCoordMap.City) {
                        if (coord.includes(dataItem[0].city)) {
                            fromCity = geoCoordMap.City[coord];
                            break;
                        }
                    }
                }
                let toRegion = geoCoordMap.Region[dataItem[1].city];
                let toCity = geoCoordMap.City[dataItem[1].city];
                if (!toCity) {
                    for (coord in geoCoordMap.City) {
                        if (coord.includes(dataItem[1].city)) {
                            toCity = geoCoordMap.City[coord];
                            break;
                        }
                    }
                }
                if ((fromRegion || fromCity) && (toRegion || toCity)) {
                    res.push({
                        fromName: dataItem[0].city,
                        toName: dataItem[1].city,
                        coords: [fromRegion ? fromRegion : fromCity, toRegion ? toRegion : toCity],
                        details: dataItem[1].value
                    });
                }
            }
            return res;
        };

        var convertToPoint = function (data) {
            let res = [];
            let fromRegion = geoCoordMap.Region[data[0]];
            let fromCity = geoCoordMap.City[data[0]];
            if (fromRegion) {
                res.push({name: data[0], value: fromRegion, details: ""});
            } else if (fromCity) {
                res.push({name: data[0], value: fromCity, details: ""});
            } else {
                for (coord in geoCoordMap.City) {
                    if (coord.includes(data[0])) {
                        fromCity = geoCoordMap.City[coord];
                        res.push({name: data[0] + "(" + coord + ")", value: fromCity, details: ""});
                        break;
                    }
                }
            }

            for (var i = 0; i < data[1].length; i++) {
                let item = data[1][i];
                let toRegion = geoCoordMap.Region[item[1].city];
                let toCity = geoCoordMap.City[item[1].city];
                if (toRegion) {
                    res.push({name: item[1].city, value: toRegion, details: item[1].value});
                } else if (toCity) {
                    res.push({name: item[1].city, value: toCity, details: item[1].value});
                } else {
                    for (coord in geoCoordMap.City) {
                        if (coord.includes(item[1].city)) {
                            toCity = geoCoordMap.City[coord];
                            res.push({name: item[1].city + "(" + coord + ")", value: toCity, details: item[1].value});
                            break;
                        }
                    }
                }
            }
            return res;
        };

        var colors = ["#a6c84c", "#ffa022", "#46bee9", "#9370DB", "#F08080", "#FF4500"];
        var series = [];
        seriedata.forEach(function (item, i) {
            let index = i < colors.length ? i : i % colors.length;
            series.push({
                    name: item[0],
                    type: "lines",
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: configs.geoLinePeriod.value,
                        trailLength: 0.2,
                        //拖尾
                        color: "#fff",
                        symbol: "line",
                        symbolSize: 1
                    },
                    lineStyle: {
                        normal: {
                            color: colors[index],
                            width: 0,
                            opacity: 0.1,
                            curveness: configs.geoLineCurveness.value,
                            //曲率
                        }
                    },
                    data: convertToLine(item[1])
                },
                {
                    name: item[0],
                    type: "lines",
                    zlevel: 2,
                    symbol: ["none", "arrow"],
                    symbolSize: 5,
                    effect: {
                        show: true,
                        period: configs.geoLinePeriod.value,
                        trailLength: 0,
                        //拖尾
                        symbol: (configs.geoLineSymbol.value == "plane" || configs.geoLineSymbol.value == "rocket") ? __SYS_IMAGES_PATH__[configs.geoLineSymbol.value] : configs.geoLineSymbol.value,
                        symbolSize: configs.geoLineSymbolSize.value,
                    },
                    lineStyle: {
                        normal: {
                            color: colors[index],
                            width: 1,
                            opacity: 0.3,
                            curveness: configs.geoLineCurveness.value,
                            //曲率
                        }
                    },
                    data: convertToLine(item[1])
                },
                {
                    //目标
                    name: item[0],
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    zlevel: 2,
                    rippleEffect: {
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: function (val) {
                        //return val[2] / 8;
                        return configs.scatterSymbolSize.value;
                    },
                    itemStyle: {
                        normal: {
                            color: colors[index]
                        }
                    },
                    data: convertToPoint(item)
                });
        });

        var option = {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            grid: {
                x: configs.grid_left.value,
                y: configs.grid_top.value,
                x2: configs.grid_right.value,
                y2: configs.grid_bottom.value,
                containLabel: configs.grid_containLabel.value.toBoolean(),
                backgroundColor: "transparent"
            },
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            tooltip: {
                //trigger: "item"
                show: configs.tooltipDisplay.value.toBoolean(),
                formatter: function (params) {
                    if (params.seriesType == "lines")
                        return params.data.fromName + "<span style='color:" + params.color + "'> ↣ </span>" + params.data.toName + "<br>" + params.marker + "&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.data.details + "</span>";
                    //仅标注线提示;因点会重复,不标注点提示
                    //else
                    //    return params.seriesName + " ↣ " + params.name + ":<br>" + params.data.details;
                },
            },
            legend: {
                show: configs.legendDisplay.value.toBoolean(),
                icon: configs.legendIcon.value,
                type: configs.legendType.value,
                selectedMode: configs.legendSelectedMode.value,
                top: configs.legendPositionTop.value,
                left: configs.legendPositionLeft.value,
                orient: configs.legendOrient.value,
                data: getSerieNames(seriedata),
                textStyle: {
                    color: configs.legendTextColor.value
                },
            },
            geo: {
                map: "china",
                label: {
                    normal: {
                        show: configs.geoAreaNameDisplay.value.toBoolean(),
                        color: configs.geoAreaNameColor.value,
                    },
                    emphasis: {
                        show: true,
                        color: configs.geoAreaNameColor.value,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: configs.geoAreaColor.value,
                        borderColor: configs.geoBorderColor.value,
                        shadowBlur: 50,
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                    },
                    emphasis: {
                        areaColor: configs.geoHotAreaColor.value
                    }
                }
            },
            series: series,
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        };
    } else {
        alert("该视图需要[源城市]、[目标城市]和[详细信息]等三个数据指标.")
    }
    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCategoryLineForGauge(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    var columns = [];
    var times = [];
    var options = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var i = 0; i < dataset["data"].length; i++) {
        var opt = {
            series: []
        };
        var row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        for (var c = 1; c < columns.length; c++) {
            var serie = {
                name: row[columns[0]].value,
                type: "gauge",
                dimensions: [columns[c]],
                title: {
                    fontWeight: "bolder",
                    fontSize: configs.gaugeTitleFontSize.value,
                    color: configs.gaugeAxisLabelColor.value,
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                    offsetCenter: [0, '-35%'],
                },
                startAngle: Number(configs.gaugeStartAngle.value),
                endAngle: Number(configs.gaugeEndAngle.value),
                min: Number(configs.gaugeMin.value),
                max: Number(configs.gaugeMax.value),
                splitNumber: 10,
                clockwise: true,
                progress: {
                    show: true,
                    roundCap: true,
                    width: configs.gaugeAxisLineWidth.value / 10,
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 10,
                        color: [[0.2, "#3CB371"], [0.8, "#6388ae"], [1, "#DB7093"]]
                        //默认[[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]]
                    }
                },
                axisLabel: {
                    fontSize: configs.gaugeAxisLabelFontSize.value,
                    color: configs.gaugeAxisLabelColor.value,
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                    distance: Number(configs.gaugeAxisLabelDistance.value),
                    //标签和刻度的距离
                },
                splitLine: {
                    show: true,
                    length: configs.gaugeAxisLineWidth.value * 1.3,
                    distance: 0.8,
                },
                axisTick: {
                    show: true,
                    splitNumber: 10,
                    //主刻度之间的分隔数
                    length: configs.gaugeAxisLineWidth.value,
                    distance: 0.8,
                    lineStyle: {
                        color: configs.gaugeAxisLabelColor.value,
                    }
                },
                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    width: 5,
                    length: '90%',
                    offsetCenter: [0, '8%'],
                },
                detail: {
                    color: configs.gaugeAxisLabelColor.value,
                    formatter: ["{value}", ""].join("\n"),
                    fontSize: configs.gaugeLabelFontSize.value,
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                },
                data: [],
                animation: configs.animation.value.toBoolean(),
                animationEasing: getAnimationEasing(configs),
                animationEasingUpdate: getAnimationEasingUpdate(configs),
            };
            serie.data.push({
                "name": row[columns[0]].value + "\n\n" + columns[c],
                "value": row[columns[c]].value,
                itemStyle: {
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowBlur: 10
                }
            });

            let left = (toPoint(configs.grid_left.value) + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / 2);
            let top = (toPoint(configs.grid_top.value) + (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / 2);
            serie.center = [(c * left / (columns.length - 1)) + left / (columns.length - 1) * (c - 1) + "%", top + "%"];
            opt.series.push(serie);
        }

        options.push(opt);
    }

    var option = {
        baseOption: {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            timeline: {
                show: configs.timelineDisplay.value.toBoolean(),
                axisType: "category",
                //考虑数据通用性，使用类目轴
                //"value" 数值轴，适用于连续数据。
                // "category" 类目轴，适用于离散的类目数据。
                // "time" 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: "left"
                // },
                symbol: "emptyCircle",
                //"circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"
                symbolSize: 2,
                data: times,
                label: {
                    color: configs.timelineLabelColor.value,
                    fontSize: Number(configs.timelineLabelFontSize.value),
                    formatter: function (s) {
                        return s;
                    }
                },
                lineStyle: {
                    color: configs.timelineStyleColor.value,
                },
                controlStyle: {
                    color: configs.timelineStyleColor.value,
                },
                emphasis: {
                    label: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    checkpointStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    controlStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                },
                orient: configs.timelineOrient.value,
                left: configs.timelineLeft.value,
                right: configs.timelineRight.value,
                top: configs.timelineTop.value,
                bottom: configs.timelineBottom.value,
            },
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
                formatter: function (params) {
                    return [params.seriesName, params.marker + params.dimensionNames[0] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.data.value + "</span>"].join("<br>");
                },
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            series: {
                type: "gauge",
            },
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        },
        options: options
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCategoryLineForLiqiud(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    var columns = [];
    var times = [];
    var options = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    for (var i = 0; i < dataset["data"].length; i++) {
        var opt = {
            series: []
        };
        var row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        if (configs.liqiudIsStack.value.toBoolean()) {
            var serie = {
                name: row[columns[0]].value,
                type: "liquidFill",
                dimensions: [columns[c]],
                data: [],
                color: eval(configs.liqiudColor.value),
                //center: ["50%", "50%"],
                //radius: "50%",
                amplitude: "8%",
                waveLength: "80%",
                phase: "auto",
                period: "auto",
                direction: "right",
                smooth: configs.lineSmooth.value.toBoolean(),

                shape: configs.liqiudShape.value == "whale" ? __SYS_IMAGES_PATH__.whale : configs.liqiudShape.value,

                waveAnimation: true,

                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: "#1598ED",//"none",
                        borderColor: "#294D99",
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.25)"
                    }
                },

                backgroundStyle: {
                    color: configs.liqiudBackgroundStyle.value
                },

                itemStyle: {
                    opacity: 0.6,
                    shadowBlur: 50,
                    shadowColor: "rgba(0, 0, 0, 0.4)"
                },

                label: {
                    show: true,
                    insideColor: "#fff",
                    fontSize: configs.liqiudFontSize.value,
                    fontWeight: "bold",
                    align: "center",
                    baseline: "middle",
                    position: "inside"
                },

                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationEasingUpdate: getAnimationEasingUpdate(configs),
            };
            for (let c = 1; c < columns.length; c++) {
                serie.data.push({
                    name: columns[c],
                    value: row[columns[c]].value
                });
            }
            opt.series = serie;
            options.push(opt);
        } else {
            for (var c = 1; c < columns.length; c++) {
                var serie = {
                    name: row[columns[0]].value,
                    type: "liquidFill",
                    dimensions: [columns[c]],
                    data: [],
                    color: eval(configs.liqiudColor.value),
                    //center: ["50%", "50%"],
                    //radius: "50%",
                    amplitude: "8%",
                    waveLength: "80%",
                    phase: "auto",
                    period: "auto",
                    direction: "right",
                    smooth: configs.lineSmooth.value.toBoolean(),

                    shape: configs.liqiudShape.value == "whale" ? __SYS_IMAGES_PATH__.whale : configs.liqiudShape.value,

                    waveAnimation: true,

                    outline: {
                        show: true,
                        borderDistance: 3,
                        itemStyle: {
                            color: "#1598ED",//"none",
                            borderColor: "#294D99",
                            borderWidth: 2,
                            shadowBlur: 10,
                            shadowColor: "rgba(0, 0, 0, 0.25)"
                        }
                    },

                    backgroundStyle: {
                        color: configs.liqiudBackgroundStyle.value
                    },

                    itemStyle: {
                        opacity: 0.6,
                        shadowBlur: 50,
                        shadowColor: "rgba(0, 0, 0, 0.4)"
                    },

                    label: {
                        show: true,
                        insideColor: "#fff",
                        fontSize: configs.liqiudFontSize.value,
                        fontWeight: "bold",
                        align: "center",
                        baseline: "middle",
                        position: "inside"
                    },

                    emphasis: {
                        itemStyle: {
                            opacity: 0.8
                        }
                    },
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                };
                serie.data.push({
                    name: columns[c],
                    value: row[columns[c]].value
                });

                let left = (toPoint(configs.grid_left.value) + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / 2);
                let top = (toPoint(configs.grid_top.value) + (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / 2);
                serie.center = [(c * left / (columns.length - 1)) + 50 / (columns.length - 1) * (c - 1) + "%", top + "%"];
                opt.series.push(serie);
            }
        }

        options.push(opt);
    }

    var option = {
        baseOption: {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            timeline: {
                show: configs.timelineDisplay.value.toBoolean(),
                axisType: "category",
                //考虑数据通用性，使用类目轴
                //"value" 数值轴，适用于连续数据。
                // "category" 类目轴，适用于离散的类目数据。
                // "time" 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: "left"
                // },
                symbol: "emptyCircle",
                //"circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"
                symbolSize: 2,
                data: times,
                label: {
                    color: configs.timelineLabelColor.value,
                    fontSize: Number(configs.timelineLabelFontSize.value),
                    formatter: function (s) {
                        return s;
                    }
                },
                lineStyle: {
                    color: configs.timelineStyleColor.value,
                },
                controlStyle: {
                    color: configs.timelineStyleColor.value,
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (s) {
                            return s;
                        },
                        color: configs.timelineEmphasisColor.value,
                    },
                    checkpointStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    controlStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                },
                orient: configs.timelineOrient.value,
                left: configs.timelineLeft.value,
                right: configs.timelineRight.value,
                top: configs.timelineTop.value,
                bottom: configs.timelineBottom.value,
            },
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
                formatter: function (params) {
                    return [params.name, params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + Math.round(params.data.value*100,2) + "%</span>"].join("<br>");
                },
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        },
        options: options
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCategoryLineForGeoOfChina(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var times = [];

    var options = [];

    var getMapRegions = function (name) {
        let Regions = {};
        let features = echarts.getMap(name).geoJson.features;
        for (var i = 0; i < features.length; i++) {
            Regions[features[i].properties.name] = features[i].properties.cp;
        }
        return Regions;
    };
    geoCoordMap.Region = getMapRegions("china");

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            let geoRegion = geoCoordMap.Region[data[i].name];
            let geoCity = geoCoordMap.City[data[i].name];
            if (geoRegion) {
                //默认到地区,不用处理
            } else if (geoCity) {
                //到城市
                res.push({
                    name: data[i].name,
                    value: geoCity.concat(data[i].value)
                });
            } else {
                //模糊查找,可能匹配错误
                for (coord in geoCoordMap.City) {
                    if (coord.includes(data[i].name)) {
                        let geoCoord = geoCoordMap.City[coord];
                        res.push({
                            name: data[i].name + "(" + coord + ")",
                            value: geoCoord.concat(data[i].value)
                        });
                        break;
                    }
                }
            }
        }
        return res;
    };

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c > 0) {
                times.push({
                    value: columns[c],
                    tooltip: {
                        formatter: function (params) {
                            return params.name;
                        }
                    }
                });
                let data = [];
                let min = null;
                let max = null;
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (min == null || max == null) {
                            min = Number(r[columns[c]].value);
                            max = Number(r[columns[c]].value);
                        } else {
                            if (Number(r[columns[c]].value) < min)
                                min = Number(r[columns[c]].value);
                            if (Number(r[columns[c]].value) > max)
                                max = Number(r[columns[c]].value);
                        }
                    }
                }
                let opt = {
                    grid: {
                        x: configs.grid_left.value,
                        y: configs.grid_top.value,
                        x2: configs.grid_right.value,
                        y2: configs.grid_bottom.value,
                        containLabel: configs.grid_containLabel.value.toBoolean(),
                        backgroundColor: "transparent"
                    },
                    //backgroundColor: configs.geoBackgroundColor.value,
                    toolbox: {
                        show: configs.toolboxDisplay.value.toBoolean(),
                        feature: {
                            saveAsImage: {
                                show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                                excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                                backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                            },
                            restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                            dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                            myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                                show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                                title: '视图组合',
                                icon: __SYS_IMAGES_PATH__.viewCombination,
                                onclick: function () {
                                    __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                                    alert("视图已提交组合列表.");
                                }
                            } : {},
                        },
                        top: configs.toolbox_top.value,
                        left: configs.toolbox_left.value,
                        orient: configs.toolbox_orient.value,
                        emphasis: {
                            iconStyle: {
                                textPosition: configs.toolbox_textPosition.value,
                            }
                        },
                    },
                    tooltip: {
                        show: configs.tooltipDisplay.value.toBoolean(),
                        formatter: function (params) {
                            return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
                        },
                    },
                    visualMap: {
                        show: configs.visualMapDisplay.value.toBoolean(),
                        min: min,
                        max: max,
                        type: configs.visualMap_type.value,
                        calculable: true,
                        left: configs.visualMap_left.value,
                        top: configs.visualMap_top.value,
                        orient: configs.visualMap_orient.value,
                        textStyle: {
                            color: configs.visualMap_textColor.value,
                        },
                        splitNumber: configs.visualMap_piecewise_splitNumber.value,
                    },
                    geo: {
                        map: "china",
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 10
                        },
                        label: {
                            normal: {
                                show: configs.geoAreaNameDisplay.value.toBoolean(),
                                color: "gray",
                            },
                            emphasis: {
                                show: true,
                                color: "gray",
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: configs.geoAreaColor.value,
                                borderColor: configs.geoBorderColor.value,
                                shadowBlur: 50,
                                shadowColor: "rgba(0, 0, 0, 0.2)",
                            },
                            emphasis: {
                                areaColor: configs.geoHotAreaColor.value
                            }
                        },
                    },
                    series: [
                        {
                            name: columns[c],
                            type: "map",
                            geoIndex: 0,
                            data: data,
                        },
                        {
                            name: columns[c],
                            type: configs.geoScatterType.value,
                            coordinateSystem: "geo",
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            })),
                            //symbolSize: function (val) {
                            //    var value = val[2] / (max / configs.scatterSymbolSize.value);
                            //    return value < 5 ? 5 : value;
                            //},
                            symbolSize: function (data) {
                                let size = eval(configs.geoScatterSymbolSize.value);
                                if (size[0] > size[1]) {
                                    let tmp = size[1];
                                    size[1] = size[0];
                                    size[0] = tmp;
                                }
                                return (size[0] == size[1] || max == min) ? size[0] : (data[2] - min) * (size[1] - size[0]) / (max - min) + size[0];
                            },
                            showEffectOn: "render",
                            rippleEffect: {
                                brushType: "stroke"
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: "top",
                                    show: true,
                                    color: "gray"
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: configs.geoAreaColor.value,
                                    shadowBlur: 10,
                                    shadowColor: "rgba(0, 0, 0, 0.2)",
                                }
                            },
                            zlevel: 1
                        }
                    ],
                    graphic: getWaterGraphic(__SYS_LOGO_LINK__),

                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                options.push(opt);
            }
        }
    }

    init();

    var option = {
        baseOption: {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            grid: {
                x: configs.grid_left.value,
                y: configs.grid_top.value,
                x2: configs.grid_right.value,
                y2: configs.grid_bottom.value,
                containLabel: configs.grid_containLabel.value.toBoolean(),
                backgroundColor: "transparent"
            },
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            timeline: {
                show: configs.timelineDisplay.value.toBoolean(),
                axisType: "category",
                //考虑数据通用性，使用类目轴
                //"value" 数值轴，适用于连续数据。
                // "category" 类目轴，适用于离散的类目数据。
                // "time" 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: "left"
                // },
                symbol: "emptyCircle",
                //"circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"
                symbolSize: 2,
                data: times,
                label: {
                    color: configs.timelineLabelColor.value,
                    fontSize: Number(configs.timelineLabelFontSize.value),
                    formatter: function (s) {
                        return s;
                    }
                },
                lineStyle: {
                    color: configs.timelineStyleColor.value,
                },
                controlStyle: {
                    color: configs.timelineStyleColor.value,
                },
                emphasis: {
                    label: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    checkpointStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    controlStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                },

                orient: configs.timelineOrient.value,
                left: configs.timelineLeft.value,
                right: configs.timelineRight.value,
                top: configs.timelineTop.value,
                bottom: configs.timelineBottom.value,
            },
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        },
        options: options
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCategoryLineForGeoOfLocal(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let times = [];
    let options = []

    var getMapRegions = function (name) {
        let Regions = {};
        try {
            let features = echarts.getMap(name).geoJson.features;
            for (var i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
        } catch (e) {
            console.log(e);
        }
        return Regions;
    };

    geoCoordMap.Region = getMapRegions(geoCoordMap.LocalMap);

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            let geoRegion = geoCoordMap.Region[data[i].name];
            let geoCoord = geoCoordMap.Custom[data[i].name];

            if (geoRegion) {
                //区域数据,默认
            } else if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    function init() {
        for (var c = 0; c < columns.length; c++) {
            if (c > 0) {
                times.push({
                    value: columns[c],
                    tooltip: {
                        formatter: function (params) {
                            return params.name;
                        }
                    }
                });
                var data = [];
                var min = null;
                var max = null;
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (min == null || max == null) {
                            min = Number(r[columns[c]].value);
                            max = Number(r[columns[c]].value);
                        } else {
                            if (Number(r[columns[c]].value) < min)
                                min = Number(r[columns[c]].value);
                            if (Number(r[columns[c]].value) > max)
                                max = Number(r[columns[c]].value);
                        }
                    }
                }

                let opt = {
                    grid: {
                        x: configs.grid_left.value,
                        y: configs.grid_top.value,
                        x2: configs.grid_right.value,
                        y2: configs.grid_bottom.value,
                        containLabel: configs.grid_containLabel.value.toBoolean(),
                        backgroundColor: "transparent"
                    },
                    //backgroundColor: configs.geoBackgroundColor.value,
                    toolbox: {
                        show: configs.toolboxDisplay.value.toBoolean(),
                        feature: {
                            saveAsImage: {
                                show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                                excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                                backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                            },
                            restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                            dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                            myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                                show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                                title: '视图组合',
                                icon: __SYS_IMAGES_PATH__.viewCombination,
                                onclick: function () {
                                    __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                                    alert("视图已提交组合列表.");
                                }
                            } : {},
                        },
                        top: configs.toolbox_top.value,
                        left: configs.toolbox_left.value,
                        orient: configs.toolbox_orient.value,
                        emphasis: {
                            iconStyle: {
                                textPosition: configs.toolbox_textPosition.value,
                            }
                        },
                    },

                    tooltip: {
                        show: configs.tooltipDisplay.value.toBoolean(),
                        formatter: function (params) {
                            return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
                        },
                    },
                    visualMap: {
                        show: configs.visualMapDisplay.value.toBoolean(),
                        min: min,
                        max: max,
                        type: configs.visualMap_type.value,
                        calculable: true,
                        left: configs.visualMap_left.value,
                        top: configs.visualMap_top.value,
                        orient: configs.visualMap_orient.value,
                        textStyle: {
                            color: configs.visualMap_textColor.value,
                        },
                        splitNumber: configs.visualMap_piecewise_splitNumber.value,
                    },
                    //backgroundColor: "#013954",
                    geo: {
                        map: geoCoordMap.LocalMap,
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 10
                        },
                        label: {
                            normal: {
                                show: configs.geoAreaNameDisplay.value.toBoolean(),
                                color: configs.geoAreaNameColor.value,
                            },
                            emphasis: {
                                show: true,
                                color: configs.geoAreaNameColor.value,
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: configs.geoAreaColor.value,
                                borderColor: configs.geoBorderColor.value,
                                shadowBlur: 50,
                                shadowColor: "rgba(0, 0, 0, 0.2)",
                            },
                            emphasis: {
                                areaColor: configs.geoHotAreaColor.value
                            }
                        },
                    },
                    series: [
                        {
                            name: columns[c],
                            type: "map",
                            geoIndex: 0,
                            data: data,
                        },
                        {
                            name: columns[c],
                            type: configs.geoScatterType.value,
                            coordinateSystem: "geo",
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            })),
                            //symbolSize: function (val) {
                            //    var value = val[2] / (max / configs.scatterSymbolSize.value);
                            //    return value < 5 ? 5 : value;
                            //},
                            symbolSize: function (data) {
                                let size = eval(configs.geoScatterSymbolSize.value);
                                if (size[0] > size[1]) {
                                    let tmp = size[1];
                                    size[1] = size[0];
                                    size[0] = tmp;
                                }
                                return (size[0] == size[1] || max == min) ? size[0] : (data[2] - min) * (size[1] - size[0]) / (max - min) + size[0];
                            },
                            showEffectOn: "render",
                            rippleEffect: {
                                brushType: "stroke"
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: "top",
                                    show: true,
                                    color: configs.geoAreaNameColor.value,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: configs.geoAreaColor.value,
                                    shadowBlur: 10,
                                    shadowColor: "rgba(0, 0, 0, 0.2)",
                                }
                            },
                            zlevel: 1
                        }
                    ],
                    graphic: getWaterGraphic(__SYS_LOGO_LINK__),
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                options.push(opt);
            }
        }
    }

    init();
    var option = {
        baseOption: {
            aria: {
                enabled: configs.ariaEnable.value.toBoolean(),
                decal: {
                    show: configs.ariaEnable.value.toBoolean(),
                }
            },
            backgroundColor: configs.backgroundColor.value,
            grid: {
                x: configs.grid_left.value,
                y: configs.grid_top.value,
                x2: configs.grid_right.value,
                y2: configs.grid_bottom.value,
                containLabel: configs.grid_containLabel.value.toBoolean(),
                backgroundColor: "transparent"
            },
            title: {
                show: configs.titleDisplay.value.toBoolean(),
                text: configs.titleText.value,
                link: configs.titleTextLink.value,
                target: "blank",
                subtext: configs.titleSubText.value,
                sublink: configs.titleSubTextLink.value,
                subtarget: "blank",
                top: "top",
                left: configs.titlePosition.value,
                textStyle: {
                    color: configs.titleTextColor.value,
                    fontSize: Number(configs.titleTextFontSize.value),
                },
                subtextStyle: {
                    color: configs.titleSubTextColor.value,
                    fontSize: Number(configs.titleSubTextFontSize.value),
                }
            },
            timeline: {
                show: configs.timelineDisplay.value.toBoolean(),
                axisType: "category",
                //考虑数据通用性，使用类目轴
                //"value" 数值轴，适用于连续数据。
                // "category" 类目轴，适用于离散的类目数据。
                // "time" 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: "left"
                // },
                symbol: "emptyCircle",
                //"circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"
                symbolSize: 2,
                data: times,
                label: {
                    color: configs.timelineLabelColor.value,
                    fontSize: Number(configs.timelineLabelFontSize.value),
                    formatter: function (s) {
                        return s;
                    }
                },
                lineStyle: {
                    color: configs.timelineStyleColor.value,
                },
                controlStyle: {
                    color: configs.timelineStyleColor.value,
                },
                emphasis: {
                    label: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    checkpointStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                    controlStyle: {
                        color: configs.timelineEmphasisColor.value,
                    },
                },
                orient: configs.timelineOrient.value,
                left: configs.timelineLeft.value,
                right: configs.timelineRight.value,
                top: configs.timelineTop.value,
                bottom: configs.timelineBottom.value,
            },
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
            },
            toolbox: {
                show: configs.toolboxDisplay.value.toBoolean(),
                feature: {
                    saveAsImage: {
                        show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                        excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                        backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                    },
                    restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                    dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                    myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                        title: '视图组合',
                        icon: __SYS_IMAGES_PATH__.viewCombination,
                        onclick: function () {
                            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                            alert("视图已提交组合列表.");
                        }
                    } : {},
                },
                top: configs.toolbox_top.value,
                left: configs.toolbox_left.value,
                orient: configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: configs.toolbox_textPosition.value,
                    }
                },
            },
            graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        },
        options: options
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getScrollingScreen(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var cols = [];
    var data = [];
    var txtOffset = 8;
    var scrollingScreenGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    var lineHeight = Number(configs.scrollingScreenFontSize.value) + txtOffset;
    var groupHeight = lineHeight;
    var timeout = false;
    var colWidth = Number(configs.scrollingScreenWidth.value) / dataset["columns"].length;

    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        cols.push({
            type: 'rect',
            left: colWidth * (i + 1),
            top: 0,
            z: 2,
            shape: {
                width: colWidth,
                height: lineHeight,
            },
            style: {
                lineWidth: 0.5,
                fill: configs.scrollingScreenBackColor.value,//'rgba(0,0,0,0.2)',
                stroke: configs.scrollingScreenBorderColor.value,
                opacity: Number(configs.scrollingScreenOpacity.value) + 0.5,
            },
        }, {
            type: 'text',
            id: 'columns' + i,
            left: colWidth * (i + 1) + txtOffset,
            top: txtOffset,
            z: 2,
            bounding: 'raw',
            style: {
                text: dataset["columns"][i].name,
                font: configs.scrollingScreenFontSize.value + 'px "Microsoft YaHei", sans-serif',
                fill: configs.scrollingScreenColumnFontFillColor.value,
            }
        });
    }

    var colorPalette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ];

    for (var i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        for (var c = 0; c < columns.length; c++) {
            data.push({
                type: 'rect',
                left: colWidth * (c + 1),
                top: lineHeight * (i + 1),
                z: 1,
                shape: {
                    width: colWidth,
                    height: lineHeight,
                },
                style: {
                    lineWidth: 0.5,
                    fill: i % 2 > 0 ? configs.scrollingScreenBackColor.value : "transparent",//'rgba(0,0,0,0.2)',
                    stroke: configs.scrollingScreenBorderColor.value,
                    opacity: configs.scrollingScreenOpacity.value,
                },
            }, {
                type: 'text',
                id: i + "-" + c,
                left: colWidth * (c + 1) + txtOffset,
                top: lineHeight * (i + 1) + txtOffset,
                z: 1,
                bounding: 'raw',
                style: {
                    text: r[columns[c]].value,
                    font: configs.scrollingScreenFontSize.value + 'px "Microsoft YaHei", sans-serif',
                    fill: colorPalette[i % colorPalette.length],
                },
            });
        }
        groupHeight += lineHeight;
    }

    scrollingScreenGraphic.push({
            type: 'group',
            id: 'scrollingColumn',
            left: configs.scrollingScreenLeft.value,
            children: cols,
            onmouseover: function () {
                timeout = true;
            },
            onmouseout: function () {
                timeout = false;
            }
        },
        {
            type: 'group',
            id: 'scrollingData',
            left: configs.scrollingScreenLeft.value,
            children: data,
            onmouseover: function () {
                timeout = true;
            },
            onmouseout: function () {
                timeout = false;
            }
        });

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
        graphic: scrollingScreenGraphic
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);

        let top = containerHeight;
        setInterval(function () {
            if (!timeout) {
                if (top > (groupHeight * (-1)))
                    top = top - 2;
                else
                    top = containerHeight;

                try {
                    myChart.setOption(
                        {
                            graphic: [
                                {
                                    id: 'scrollingColumn',
                                    top: (top - lineHeight) <= 0 ? 0 : (top - lineHeight),
                                },
                                {
                                    id: 'scrollingData',
                                    top: top,
                                }]
                        }
                    );
                } catch (e) {
                    //console.log(e);
                }
            }
        }, Number(configs.scrollingScreenSpeed.value) * 1000);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);

    return container;
}

function getWalkingLantern(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var top = containerHeight * Number(configs.walkingLanternTop.value.replaceAll("%", "")) / 100;
    var columns = [];
    var lines = configs.walkingLanternLines.value;
    var groups = 0;
    var index = 0;
    var walkingLanterGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    var txtOffset = 8;
    var lineHeight = Number(configs.walkingLanternFontSize.value) + txtOffset;
    var timeout = false;
    var colWidth = Number(configs.walkingLanternWidth.value) / dataset["columns"].length;
    var dire = configs.walkingLanternDirection.value;

    var title = {
        type: 'group',
        id: 'scrollingColumn',
        left: dire == "LR" ? 0 : containerWidth,
        top: top,
        children: [],
        onmouseover: function () {
            timeout = true;
        },
        onmouseout: function () {
            timeout = false;
        }
    };

    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        title.children.push({
            type: 'rect',
            left: colWidth * (i + 1),
            top: 0,
            //z: 100,
            shape: {
                width: colWidth,
                height: lineHeight,
            },
            style: {
                lineWidth: 0.5,
                fill: configs.walkingLanternBackColor.value,//'rgba(0,0,0,0.2)',
                stroke: configs.walkingLanternBorderColor.value,
                opacity: Number(configs.walkingLanternOpacity.value) + 0.5,
            },
        });
        title.children.push({
            type: 'text',
            id: 'columns' + i,
            left: colWidth * (i + 1) + txtOffset,
            top: txtOffset,
            //z: 100,
            bounding: 'raw',
            style: {
                text: dataset["columns"][i].name,
                font: configs.walkingLanternFontSize.value + 'px "Microsoft YaHei", sans-serif',
                fill: configs.walkingLanternColumnFontFillColor.value,
            }
        });
    }
    title = [title];

    var colorPalette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ];

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
    };

    var pool = [];
    var children = [];
    var count = 0;
    for (var i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let row = {
            type: 'group',
            id: 'scrollingData-' + count,
            left: dire == "LR" ? 0 : containerWidth,
            top: top + lineHeight * (count + 1),
            children: [],
            onmouseover: function () {
                timeout = true;
            },
            onmouseout: function () {
                timeout = false;
            }
        };
        for (var c = 0; c < columns.length; c++) {
            row.children.push({
                type: 'rect',
                left: colWidth * (c + 1),
                //z: 99,
                shape: {
                    width: colWidth,
                    height: lineHeight,
                },
                style: {
                    lineWidth: 0.5,
                    fill: i % 2 > 0 ? configs.walkingLanternBackColor.value : "transparent",//'rgba(0,0,0,0.2)',
                    stroke: configs.walkingLanternBorderColor.value,
                    opacity: configs.walkingLanternOpacity.value,
                },
            });
            row.children.push({
                type: 'text',
                left: colWidth * (c + 1) + txtOffset,
                top: txtOffset,
                //z: 99,
                bounding: 'raw',
                style: {
                    text: r[columns[c]].value,
                    font: configs.walkingLanternFontSize.value + 'px "Microsoft YaHei", sans-serif',
                    fill: colorPalette[i % colorPalette.length],
                },
            });
        }
        children.push(row);
        count++;
        if (count == lines) {
            pool.push(children);
            children = [];
            count = 0;
        }
    }
    if (children.length>0)
        pool.push(children);
    groups = pool.length;
    option.graphic = walkingLanterGraphic.concat(title).concat(pool[index]);

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);

        var left = dire == "LR" ? 0 : containerWidth;
        setInterval(function () {
            if (!timeout) {
                if ((dire == "LR" && left <= containerWidth) || (dire == "RL" && left >= (Number(configs.walkingLanternWidth.value) * (-1)))) {
                    left = left + (dire == "LR" ? 2 : -2);
                } else {
                    index += 1;
                    left = dire == "LR" ? Number(configs.walkingLanternWidth.value) * (-1) : containerWidth;
                    if (index == groups) {
                        index = 0;
                    }
                }
                title[0].left = left;
                for (let i = 0; i < pool[index].length; i++) {
                    pool[index][i].left = left;
                }
                myChart.setOption({
                    graphic:walkingLanterGraphic.concat(title).concat(pool[index])
                },{ replaceMerge: "graphic"});
            }
        }, Number(configs.walkingLanternSpeed.value) * 1000);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);

    return container;
}

function getWindowShades(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value);

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var top = containerHeight * Number(configs.windowShadesTop.value.replaceAll("%", "")) / 100;
    var left = containerWidth * Number(configs.windowShadesLeft.value.replaceAll("%", "")) / 100;
    var columns = [];
    var lines = configs.windowShadesLines.value;
    var pageIndex = 0;
    var lineIndex = 0;
    var dire = 0;
    var windowShadesGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    var txtOffset = 8;
    var lineHeight = Number(configs.windowShadesFontSize.value) + txtOffset;
    var timeout = false;
    var colWidth = Number(configs.windowShadesWidth.value) / dataset["columns"].length;

    var title = {
        type: 'group',
        id: 'scrollingColumn',
        left: left,
        top: top,
        children: [],
        onmouseover: function () {
            timeout = true;
        },
        onmouseout: function () {
            timeout = false;
        }
    };

    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        title.children.push({
            type: 'rect',
            left: colWidth * (i + 1),
            top: 0,
            //z: 100,
            shape: {
                width: colWidth,
                height: lineHeight,
            },
            style: {
                lineWidth: 0.5,
                fill: configs.windowShadesBackColor.value,//'rgba(0,0,0,0.2)',
                stroke: configs.windowShadesBorderColor.value,
                opacity: Number(configs.windowShadesOpacity.value) + 0.5,
            },
        });
        title.children.push({
            type: 'text',
            id: 'columns' + i,
            left: colWidth * (i + 1) + txtOffset,
            top: txtOffset,
            //z: 100,
            bounding: 'raw',
            style: {
                text: dataset["columns"][i].name,
                font: configs.windowShadesFontSize.value + 'px "Microsoft YaHei", sans-serif',
                fill: configs.windowShadesColumnFontFillColor.value,
            }
        });
    }
    title = [title];

    var colorPalette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ];

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
    };

    var pool = [];
    var children = [];
    var count = 0;
    for (var i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let row = {
            invisible: false,
            ignore: true,
            type: 'group',
            id: 'scrollingData-' + count,
            left: left,
            top: top + lineHeight * (count + 1),
            children: [],
            onmouseover: function () {
                timeout = true;
            },
            onmouseout: function () {
                timeout = false;
            }
        };
        for (var c = 0; c < columns.length; c++) {
            row.children.push({
                type: 'rect',
                left: colWidth * (c + 1),
                //z: 99,
                shape: {
                    width: colWidth,
                    height: lineHeight,
                },
                style: {
                    lineWidth: 0.5,
                    fill: i % 2 > 0 ? configs.windowShadesBackColor.value : "transparent",//'rgba(0,0,0,0.2)',
                    stroke: configs.windowShadesBorderColor.value,
                    opacity: configs.windowShadesOpacity.value,
                },
            });
            row.children.push({
                type: 'text',
                left: colWidth * (c + 1) + txtOffset,
                top: txtOffset,
                //z: 99,
                bounding: 'raw',
                style: {
                    text: r[columns[c]].value,
                    font: configs.windowShadesFontSize.value + 'px "Microsoft YaHei", sans-serif',
                    fill: colorPalette[i % colorPalette.length],
                },
            });
        }
        children.push(row);
        count++;
        if (count == lines) {
            pool.push(children);
            children = [];
            count = 0;
        }
    }
    if (children.length > 0)
        pool.push(children);
    option.graphic = windowShadesGraphic.concat(title).concat(pool[pageIndex]);

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);

        setInterval(function () {
            if (!timeout) {
                if (dire == 0 && lineIndex < pool[pageIndex].length) {
                    lineIndex += 1;
                } else if (dire == 1 && lineIndex > 0) {
                    lineIndex -= 1;
                } else {
                    dire +=1;
                    if (dire == 2) {
                        dire = 0;
                        lineIndex = 0;
                        pageIndex += 1;
                        if (pageIndex == pool.length)
                            pageIndex = 0;
                    }
                }

                try {
                    for (let i = 0; i < pool[pageIndex].length; i++) {
                        if (i <= lineIndex){
                            pool[pageIndex][i].ignore = false;
                        }
                        else {
                            pool[pageIndex][i].ignore = true;
                        }
                    }
                    myChart.setOption({
                        graphic: windowShadesGraphic.concat(title).concat(pool[pageIndex])
                    },{ replaceMerge: "graphic"});
                } catch (e) {
                    console.log(e);
                }
            }
        }, Number(configs.windowShadesSpeed.value) * 1000);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getSurface(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var rows = [];
    var series = [];
    var valueMin = null;
    var valueMax = null;
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var serie = {
        name: configs.titleText.value,
        type: "surface",
        data: [],
        animation: configs.animation.value.toBoolean(),
        animationThreshold: Number(configs.animationThreshold.value),
        animationEasing: getAnimationEasing(configs),
        animationDuration: function (idx) {
            return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
        },
        animationDelay: function (idx) {
            return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
        },
        animationEasingUpdate: getAnimationEasingUpdate(configs),
        animationDurationUpdate: function (idx) {
            return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
        },
        animationDelayUpdate: function (idx) {
            return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
        },
    };

    var data = [];
    for (var c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin == null || valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax == null || valueMax < r[columns[c]].value)
                    valueMax = r[columns[c]].value;
            }
        }
    }

    serie.data = data.map(function (item) {
        return {
            value: [item[0], item[1], item[2]],
        }
    });
    series.push(serie);

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (params) {
                return rows[params.value[0]]+ "<br>" + params.marker + columns[params.value[1] + 1] +  ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
        visualMap: {
            show: configs.visualMapDisplay.value.toBoolean(),
            min: valueMin,
            max: valueMax,
            type: configs.visualMap_type.value,
            calculable: true,
            left: configs.visualMap_left.value,
            top: configs.visualMap_top.value,
            orient: configs.visualMap_orient.value,
            textStyle: {
                color: configs.visualMap_textColor.value,
            },
            splitNumber: configs.visualMap_piecewise_splitNumber.value,
        },

        xAxis3D: {
            type: "category",
            data: rows,
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        yAxis3D: {
            type: "category",
            data: columns.slice(1),
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        zAxis3D: {
            type: "value",
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxHeight: Number(configs.BoxHeightFor3D.value),
            boxWidth: configs.BoxWidthFor3D.value,
            boxDepth: configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: configs.AutoRotateFor3D.value.toBoolean(),
                autoRotateSpeed: 10,
                projection: "orthographic",
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value);
                },
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean() || configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean() || configs.splitYAreaDisplay.value.toBoolean(),
            },
            axisPointer: {
                show: configs.axisPointerDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: configs.LightShadowFor3D.value.toBoolean(),
                },
                ambient: {
                    intensity: 0.3
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getBoxplot(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var data = [];
    var normal = [];
    //正常数
    var outlier = [];
    //异常数据
    var valueMin = null;
    var valueMax = null;
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    for (var c = 1; c < columns.length; c++) {
        let d = [];
        for (var i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            d.push(row[columns[c]].value)
            if (valueMin == null || valueMin > row[columns[c]].value)
                valueMin = row[columns[c]].value;
            if (valueMax == null || valueMax < row[columns[c]].value)
                valueMax = row[columns[c]].value;
        }
        let q1= getQuartile(d,1);
        let q3= getQuartile(d,3);
        let iqr = q3-q1;
        let lower = q1 - 1.5*iqr;
        let upper = q3 + 1.5*iqr;

        data.push([lower, q1, getMedian(d), q3, upper]);
        //盒须图数据结构:
        //[下边界，Q1,MEDIAN/Q2,Q3,上边界]
        //下边界=Q1-1.5*iqr;上边界=Q3+1.5*IQR
        for (var e=0;e<d.length;e++){
            if (d[e]< lower || d[e]> upper)
                outlier.push([c-1,d[e]]);
            else
                normal.push([c-1,d[e]]);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: 'item',
            axisPointer: {
                type: configs.axisPointerType.value,
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
        xAxis: {
            type: 'category',
            data: columns.slice(1,columns.length),
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            }
        }],
        series: [
            {
                name: '盒须图',
                type: 'boxplot',
                data: data,
                tooltip: {
                    formatter: function (param) {
                        return [
                            param.marker + param.name,
                            "<span style='color:" + param.color + " '>•</span>" + "&ensp;上&ensp;边&ensp;界:&emsp;<span style='display:inline-block;min-width:80px;text-align:right;font-weight:bold'>" + param.data[5] + "</span>",
                            "<span style='color:" + param.color + " '>•</span>" + "&ensp;上四分位:&emsp;<span style='display:inline-block;min-width:80px;text-align:right;font-weight:bold'>" + param.data[4] + "</span>",
                            "<span style='color:" + param.color + " '>•</span>" + "&ensp;中&ensp;&ensp;&ensp;&ensp;值:&emsp;<span style='display:inline-block;min-width:80px;text-align:right;font-weight:bold'>" + param.data[3] + "</span>",
                            "<span style='color:" + param.color + " '>•</span>" + "&ensp;下四分位:&emsp;<span style='display:inline-block;min-width:80px;text-align:right;font-weight:bold'>" + param.data[2] + "</span>",
                            "<span style='color:" + param.color + " '>•</span>" + "&ensp;下&ensp;边&ensp;界:&emsp;<span style='display:inline-block;min-width:80px;text-align:right;font-weight:bold'>" + param.data[1] + "</span>"
                        ].join("<br/>");
                    }
                }
            },
        ],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    if (configs.boxplotNormalDisplay.value.toBoolean()){
        option.series.push(
            {
                name: '正常值',
                type: configs.boxplotScatterType.value,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[1];
                        },
                        position: "top"
                    }
                },
                symbol: configs.boxplotScatterSymbolShape.value,
                symbolSize: function (data) {
                    let size = eval(configs.boxplotScatterSymbolSize.value);
                    if (size[0] > size[1]){
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return (size[0]==size[1] || valueMax == valueMin)?size[0]:(data[1]-valueMin)*(size[1] - size[0])/(valueMax-valueMin) + size[0];
                },
                itemStyle: {
                    opacity: 0.8,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                },
                data: normal
            }
        )
    }

    if (configs.boxplotOutlierDisplay.value.toBoolean()) {
        option.series.push(
            {
                name: '异常值',
                type: configs.boxplotScatterType.value,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[1];
                        },
                        position: "top"
                    }
                },
                symbol: configs.boxplotScatterSymbolShape.value,
                symbolSize: function (data) {
                    let size = eval(configs.boxplotScatterSymbolSize.value);
                    if (size[0] > size[1]) {
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return (size[0] == size[1] || valueMax == valueMin) ? size[0] : (data[1] - valueMin) * (size[1] - size[0]) / (valueMax - valueMin) + size[0];
                },
                itemStyle: {
                    opacity: 0.8,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                },
                data: outlier
            }
        )
    }


    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getClock(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var title = dataset["data"][0][columns[0]].value;

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var option = {
        colors: [configs.clockLabelColor.value],
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: [
            {
                //表盘
                name: 'clock',
                type: 'gauge',
                radius: configs.clockRadius.value,
                center: eval(configs.clockCenter.value),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0"?-269.99:-270,
                min: 0,
                max: 12,
                splitNumber: 12,
                itemStyle: {
                    color: configs.clockLabelColor.value,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                axisLine: {
                    lineStyle: {
                        width: 12,
                        //表盘宽度
                        color: [
                            [1, 'transparent']
                        ],
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 15
                    }
                },
                splitLine: {
                    length: 15,
                    //主刻度长度
                    lineStyle: {
                        width: 5,
                        //主刻度宽度
                        color: configs.clockLabelColor.value,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 3,
                        shadowOffsetX: 1,
                        shadowOffsetY: 2
                    }
                },
                axisTick: {
                    splitNumber: 5,
                    //主刻度之间的分隔数
                    lineStyle: {
                        color: configs.clockLabelColor.value,
                    }
                },
                axisLabel: {
                    color: configs.clockLabelColor.value,
                    fontSize: Number(configs.clockFontSize.value),
                    distance: Number(configs.clockAxisLabelDistance.value),
                    //标签和刻度的距离
                    formatter: function (value) {
                        if (value === 0) {
                            return '';
                        }
                        return value;
                    }
                },
                anchor: {
                    show: true,
                    icon: __SYS_IMAGES_PATH__.whale,
                    //icon: 'path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z',
                    showAbove: false,
                    offsetCenter: [0, '-45%'],
                    size: 30,
                    keepAspect: true,
                    itemStyle: {
                        color: configs.clockLabelColor.value,
                    }
                },
                pointer: {
                    show: false
                },
                detail: {
                    show: echarts.version == "5.0.0",
                    color: configs.clockLabelColor.value,
                    fontSize: Number(configs.clockFontSize.value) * 0.6,
                    borderColor: configs.clockLabelColor.value,
                    fontWeight: "bolder",
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                    formatter: function (param) {
                        return param;
                    },
                    valueAnimation: true,
                },
                title: {
                    show: true,
                    color: configs.clockLabelColor.value,
                    fontSize: Number(configs.clockFontSize.value) * 0.8,
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                    offsetCenter: [0, '-25%'],
                    //位置
                },
                data: [{
                    name: title,
                    value: "0/0/0"
                }]
            },
            {
                //时针
                name: 'hour',
                type: 'gauge',
                radius: configs.clockRadius.value,
                center: eval(configs.clockCenter.value),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0"?-269.99:-270,
                min: 0,
                max: 12,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                itemStyle: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                emphasis: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },

                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    //5.0支持
                    width: 10,
                    length: '55%',
                    offsetCenter: [0, '8%'],
                    itemStyle: {
                        color: configs.clockLabelColor.value,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 8,
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    }
                },
                detail: {
                    show: false,
                },
                title: {
                    show: false,
                },
                data: [{
                    value: 0,
                }]
            },
            {
                //分针
                name: 'minute',
                type: 'gauge',
                radius: configs.clockRadius.value,
                center: eval(configs.clockCenter.value),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0"?-269.99:-270,
                min: 0,
                max: 60,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                itemStyle: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                emphasis: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    width: 7,
                    length: '70%',
                    offsetCenter: [0, '8%'],
                    itemStyle: {
                        color: configs.clockLabelColor.value,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 8,
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    }
                },
                detail: {
                    show: false
                },
                title: {
                    show: false,
                },
                data: [{
                    value: 0
                }]
            },
            {
                //秒针
                name: 'second',
                type: 'gauge',
                radius: configs.clockRadius.value,
                center: eval(configs.clockCenter.value),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0"?-269.99:-270,
                min: 0,
                max: 60,
                animationEasingUpdate: 'bounceOut',
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                itemStyle: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                emphasis: {
                    color: echarts.version == "4.9.0" ? configs.clockLabelColor.value : null,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 4
                },
                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    width: 4,
                    length: '85%',
                    offsetCenter: [0, '8%'],
                    itemStyle: {
                        color: configs.clockLabelColor.value,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 8,
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    }
                },
                anchor: {
                    //指针固定点
                    show: true,
                    icon: 'circle',
                    showAbove: true,
                    size: 20,
                    itemStyle: {
                        color: configs.clockLabelColor.value,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 8,
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    }
                },
                detail: {
                    show: false
                },
                title: {
                    show: false,
                },
                data: [{
                    value: 0
                }]
            }]
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);


    var timeUpdatedStatus = {
        second: false,
        minute: false,
        hour: false
    };

    function updateSeries(time, series, type) {
        var isCritical = (Math.floor(time) === 0) || (type === 'second' && time === 1);
        if (isCritical && timeUpdatedStatus[type] === true) {
            timeUpdatedStatus[type] = false;
            series.clockwise = true;
            option.animationDurationUpdate = 0;
            myChart.setOption(option, true);
        }
        series.data[0].value = time;
        series.clockwise = true;
        if (time === 0) {
            timeUpdatedStatus[type] = true;
            series.clockwise = false;
        }
    }

    function updateClockSeries(date, series,type,title){
        series.data[0].name = title;
        series.data[0].value = date;
    }

    setInterval(function () {
        let date = new Date();
        let fullday = date.toLocaleString("zh", { hour12: false }).split(" ")[0];
        let second = date.getSeconds();
        let minute = date.getMinutes() + second / 60;
        let hour = date.getHours() % 12 + minute / 60;

        updateSeries(second, option.series[3], 'second');
        updateSeries(minute, option.series[2], 'minute');
        updateSeries(hour, option.series[1], 'hour');
        updateClockSeries(fullday,option.series[0],"date",title);

        option.animationDurationUpdate = 300;
        myChart.setOption(option, true);
        date = null;
    }, 1000);

     __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getCandlestick(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var xAxis = [];
    var data = [];
    var upColor = configs.candlestickUpColor.value;
    var upBorderColor = configs.candlestickUpBorderColor.value;
    var downColor = configs.candlestickDownColor.value;
    var downBorderColor = configs.candlestickDownBorderColor.value;

    if (columns.length>=5) {
        for (var i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            let d = [];
            for (var c = 0; c < columns.length; c++) {
                if (c == 0) {
                    xAxis.push(r[columns[c]].value);
                } else {
                    d.push(r[columns[c]].value)
                }
            }
            data.push(d);
        }
    } else {
        alert("K线图数据结构:[ 期间标识,开盘价,收盘价,最低价,最高价 ].")
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush: configs.toolboxFeatureBrush.value.toBoolean() ? {
            toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
            xAxisIndex: 0
        } : null,
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean(),},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            },
            formatter: function (params) {
                let param = params[0];
                return [param.name,
                    param.marker + "&ensp;" + param.seriesName,
                    "<span style='color:" + param.color + " '>•</span>" + "&ensp;开盘价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[1] + "</span>",
                    "<span style='color:" + param.color + " '>•</span>" + "&ensp;最低价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[3] + "</span>",
                    "<span style='color:" + param.color + " '>•</span>" + "&ensp;最高价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[4] + "</span>",
                    "<span style='color:" + param.color + " '>•</span>" + "&ensp;收盘价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[2] + "</span>"
                ].join("<br>");
            },
        },

        xAxis: {
            data: xAxis,
            inverse: configs.xAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                interval: "auto",
                margin: 8,
                rotate: Number(configs.xAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitXLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitXAreaDisplay.value.toBoolean(),
            }
        },
        yAxis: {
            inverse: configs.yAxisInverse.value.toBoolean(),
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            axisLabel: {
                show: configs.axisLineDisplay.value.toBoolean(),
                rotate: Number(configs.yAxisLabelRotate.value),
                textStyle: {
                    color: configs.axisTextColor.value
                }
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: [
                        configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            }
        },
        dataZoom: [{
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: "inside",
            filterMode: configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: configs.dataZoomBarWidth.value,
            height: (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) + "%",
            top: configs.grid_top.value,
            right: (100 - toPoint(configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            textStyle: {
                color: configs.dataZoomBarColor.value,
            },
        }, {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: "slider",
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%",
            height: configs.dataZoomBarWidth.value,
            left: configs.grid_left.value,
            top: (100 - toPoint(configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[configs.dataZoomHandleIcon.value],
            handleSize: configs.dataZoomHandleSize.value,
            borderColor: configs.dataZoomBarColor.value,
            handleStyle: {
                color: configs.dataZoomBarColor.value,
            },
            textStyle: {
                color: configs.dataZoomBarColor.value,
            },
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: [
            {
                name: 'K线图',
                type: 'candlestick',
                data: data,
                //dimensions: ['日期', '开盘价', '收盘价', '最低价', '最高价'],
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
            }
        ]
    };


    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getBanners(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    var columns = [];
    var banners = [];
    var index = 0;

    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var lineHeight = containerHeight/columns.length;

    for (var i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let group = {
            type: 'group',
            id: 'banner',
            top: "center",
            left: "center",
            children: [],
        };

        for (var c = 0; c < columns.length; c++) {
            group.children.push(
                {
                    id: "data " + c,
                    type: 'text',
                    top: c * lineHeight,
                    left: "center",
                    //z: 100,
                    style: {
                        fill: configs.bannerTextColor.value,
                        text: r[columns[c]].value ,
                        font: "bolder " + configs.bannerFontSize.value + "px '" + configs.bannerFontFamily.value + "'",
                        textVerticalAlign: "bottom",//"middle",
                        opacity: 1,
                    }
                });
        }
        banners.push(group);
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.bannerBackgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                },
            },
        },

        graphic: [banners[index]].concat(getWaterGraphic(__SYS_LOGO_LINK__))
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
        setInterval(function () {
            try {
                myChart.setOption(
                    {
                        graphic: [banners[index]].concat(getWaterGraphic(__SYS_LOGO_LINK__)),
                    },{ replaceMerge: "graphic"}
                );
            } catch (e) {
                console.log(e);
            }
            index += 1;
            if (index == banners.length)
                index = 0;

        }, Number(configs.bannerShadesSpeed.value) * 1000);

    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);

    return container;
}

function getWordCloud(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var series = [];
    var columns = [];
    var legends = [];
    //var maskImage = new Image();
    //maskImage.src = "logo.png";

    function init() {
        for (var i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (var c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    legends.push(row[columns[c]].value);
                }
            } else {
                var serie = {
                    name: columns[c],
                    type: "wordCloud",
                    gridSize: 2,
                    sizeRange: [configs.wordCloudMinFontSize.value, configs.wordCloudMaxFontSize.value],//[最小字号,最大字号],
                    rotationRange: [-1 * configs.wordCloudRotationRange.value, configs.wordCloudRotationRange.value],//[旋转角度,旋转角度]
                    shape: configs.wordCloudShape.value,
                    //"circle", "cardioid", "diamond", "triangle-forward", "triangle", "pentagon", "star"
                    //maskImage: maskImage,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            color: function () {
                                return "rgb(" + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(",") + ")";
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: "#333"
                        }
                    },
                    data: [
                        {
                            name: "wordCloud",
                            value: 10000,
                            textStyle: {
                                normal: {
                                    color: "black"
                                },
                                emphasis: {
                                    color: "red"
                                }
                            }
                        }
                    ],
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
                    },
                };
                serie.data = [];
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    serie.data.push({name: row[columns[0]].value, value: row[columns[c]].value});
                }
                series.push(serie);
            }
        }

        let top = toPoint(configs.grid_top.value);
        let left = toPoint(configs.grid_left.value);
        let groupWith = configs.groupWith.value;
        let lines = parseInt(series.length / groupWith + 0.5);
        let height = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
        let width = (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / groupWith;

        for (var i = 0; i < series.length; i++) {
            series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
            series[i].left = (left + (i % groupWith) * width) + "%";
            series[i].width = width + "%";
            series[i].height = height + "%";
        }
    }

    init();

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target : "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top:"top",
            left:configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        tooltip: {
            show:configs.tooltipDisplay.value.toBoolean(),
            formatter: function(param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            }
        },
        legend: {
            show:configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient:configs.legendOrient.value,
            data: columns.slice(1),
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox","dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor:configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left:configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
      myChart.hideLoading();
      myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getSunburst(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    //var colors = ["#a6c84c", "#ffa022", "#46bee9", "#9370DB", "#F08080", "#FF4500"];
    var columns = [];
    var series = [];
    var parent = "";
    var child = "";
    if (dataset["columns"].length >= 3) {
        parent = dataset["columns"][0].name;
        child = dataset["columns"][1].name;

        for (let i = 2; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (let c = 0; c < columns.length; c++) {
            var data = [];
            var children = {};
            for (let i = 0; i < dataset["data"].length; i++) {
                let row = dataset["data"][i];
                children[row[child].value] = {
                    parent: row[parent].value,
                    value: row[columns[c]].value,
                    children: [],
                    itemStyle: {
                        //color: colors[i % colors.length]
                    }
                };
            }

            for (let name in children) {
                try {
                    children[children[name].parent].children.push({
                        name: name,
                        value: children[name].value,
                        children: children[name].children,
                        itemStyle: children[name].itemStyle
                    });
                } catch (e) {
                    data.push({
                        name: name,
                        value: children[name].value,
                        children: children[name].children,
                        itemStyle: children[name].itemStyle
                    });
                }
            }
            series.push({
                name: columns[c],
                center: [100/(columns.length + 1)  * (c + 1) + "%", "50%"],
                radius: eval(configs.sunburstRadius.value),//['15%', '90%'],
                type: 'sunburst',
                sort: configs.sunburstSort.value == "null"?null:configs.sunburstSort.value,
                //扇形块根据数据 value 的排序方式，如果未指定 value，则其值为子元素 value 之和。默认值 'desc' 表示降序排序；还可以设置为 'asc' 表示升序排序；null 表示不排序，使用原始数据的顺序；或者用回调函数进行排列：
                highlightPolicy: configs.sunburstHighlightPolicy.value,
                //如果其值为 'descendant'，则会高亮该扇形块和后代元素，其他元素将被淡化；如果其值为 'ancestor'，则会高亮该扇形块和祖先元素；如果其值为 'self' 则只高亮自身；'none' 则不会淡化其他元素。
                data: data,
                label: {
                    rotate: configs.sunburstLabelRotate.value,
                    //'radial' 表示径向旋转、'tangential' 表示切向旋转
                    align: configs.sunburstLabelAlign.value,
                    //可取值为：'left'、 'center'、 'right'。注意，'left' 是指靠近内圈，而 'right' 是指靠近外圈。
                    //formatter
                },
                levels: [],
                itemStyle: {
                    //color: '#ddd',
                    //borderWidth: 2,
                    borderRadius: Number(configs.sunburstItemStyleBorderRadius.value),
                },
                animation: configs.animation.value.toBoolean(),
                animationThreshold: Number(configs.animationThreshold.value),
                animationEasing: getAnimationEasing(configs),
                animationDuration: function (idx) {
                    return idx * Number(configs.animationDuration.value) + Number(configs.animationDuration.value);
                },
                animationDelay: function (idx) {
                    return idx * Number(configs.animationDelay.value) + Number(configs.animationDelay.value);
                },
                animationEasingUpdate: getAnimationEasingUpdate(configs),
                animationDurationUpdate: function (idx) {
                    return idx * Number(configs.animationDurationUpdate.value) + Number(configs.animationDurationUpdate.value);
                },
                animationDelayUpdate: function (idx) {
                    return idx * Number(configs.animationDelayUpdate.value) + Number(configs.animationDelayUpdate.value);
                },
            });
        }
    } else
        alert("旭日图数据结构[父级名称(根级等于空),子级名称,子级数值a,子级数值b,...].");

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__)
    };


    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}


function getTreemap(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    var colors = ["#a6c84c", "#ffa022", "#46bee9", "#9370DB", "#F08080", "#FF4500"];
    var columns = [];
    var datas = [];
    var parent = "";
    var child = "";
    if (dataset["columns"].length >= 3) {
        parent = dataset["columns"][0].name;
        child = dataset["columns"][1].name;

        for (let i = 2; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (let c = 0; c < columns.length; c++) {
            var data = [];
            var children = {};
            for (let i = 0; i < dataset["data"].length; i++) {
                let row = dataset["data"][i];
                children[row[child].value] = {
                    parent: row[parent].value,
                    title: columns[c],
                    value: row[columns[c]].value,
                    children: [],
                    itemStyle: {
                        //color: colors[i % colors.length]
                    }
                };
            }

            for (let name in children) {
                try {
                    children[children[name].parent].children.push({
                        name: name,
                        title: children[name].title,
                        value: children[name].value,
                        children: children[name].children,
                        //itemStyle: children[name].itemStyle,
                    });
                } catch (e) {
                    data.push({
                        name: name,
                        title: children[name].title,
                        value: children[name].value,
                        children: children[name].children,
                        //itemStyle: children[name].itemStyle,
                        //采用父级颜色系列
                    });
                }
            }
            datas.push({
                name: columns[c],
                title: "总计",
                children: data,
                itemStyle: {
                    //color: colors[c % colors.length]
                    //采用序列默认颜色
                }
            });
        }
    } else
        alert("层级数据结构[父级名称(根级等于空),子级名称,子级数值a,子级数值b,...].");

    var series = {
        type: 'treemap',
        width: configs.treemapWidth.value,
        height: configs.treemapHeight.value,
        visibleMin: 100,
        leafDepth: 1,
        levels: [
            {
                itemStyle: {
                    //borderColor: 'transparent',
                    gapWidth: 2,
                    borderWidth: 1,
                }
            },
            {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                    //borderColor: 'transparent',
                    gapWidth: 2,
                    borderWidth: 1
                }
            },
            {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                    //borderColor: 'transparent',
                    gapWidth: 2,
                    borderWidth: 1
                }
            },
            {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                    //borderColor: 'transparent',
                    gapWidth: 2,
                    borderWidth: 1
                }
            }
        ],

        name: configs.titleText.value,
        data: datas,
        itemStyle: {
            borderRadius: Number(configs.treemapItemStyleBorderRadius.value),
        },
        label: {
            normal: {
                position: eval(configs.treemapLabelPosition.value),
                formatter: function (params) {
                    var arr = [
                        '{name|' + params.data.name + '}',
                        '{hr|}',
                        '{label|' + params.data.title + '}  {value| ' + params.data.value + '}'
                    ];
                    return arr.join("\n");
                },
                rich: {
                    name: {
                        fontSize: configs.treemapLabelFontSize.value * 0.6,
                        color: '#fff'
                    },
                    hr: {
                        width: '50%',
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderWidth: 1,
                        height: 0,
                        lineHeight: 10
                    },
                    label: {
                        fontSize: configs.treemapLabelFontSize.value * 0.5,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        color: '#fff',
                        borderRadius: 2,
                        padding: [4, 4],
                        //内边距[上右下左]=[2,4,2,4]
                        lineHeight: 20,
                        align: 'left',
                        verticalAlign: "middle",
                    },
                    value: {
                        fontSize: configs.treemapLabelFontSize.value,
                        lineHeight: 30,
                        color: 'yellow',
                        align: "left",
                        verticalAlign: "middle",
                        fontWeight: "bolder"
                    },
                }
            }
        },
    };

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                //暂不设置.需要思考
                //console.log(param);
                //return [param.data.name, param.marker + "&ensp;" + param.data.title + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.data.value + "</span>"].join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__)
    };


    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getParallelAxis(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var colors = ["#a6c84c", "#ffa022", "#46bee9", "#9370DB", "#F08080", "#FF4500"];

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    function getJSONNames(json) {
        let tmp = [];
        for (let name in json) {
            tmp.push(name);
        }
        return tmp;
    }

    var parallelAxis = [];
    var data = [];

    for (let c = 0; c < columns.length; c++) {
        let axis = {};
        axis = {
            dim: c,
            name: columns[c],
            axisLine: {
                show:true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisTick: {
                show:true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisLabel:{
                show:true,
                color: configs.axisTextColor.value,
                inside: configs.parallelAxisLabelInside.value.toBoolean()
            }
        };
        if (c == 0) {
            let category = {};
            for (let i = 0; i < dataset["data"].length; i++) {
                let row = dataset["data"][i];
                category[row[columns[c]].value] = i;
            }
            axis["type"] = "category";
            axis["data"] = getJSONNames(category);
        }
        parallelAxis.push(axis);
    }

    for (let i = 0; i < dataset["data"].length; i++) {
        let row = dataset["data"][i];
        let d = {
            value: [],
            lineStyle: {
                width: configs.parallelAxisLineWidth.value,
                color: colors[i % colors.length]
            }
        };
        for (let c = 0; c < columns.length; c++) {
            d.value.push(row[columns[c]].value);
        }
        data.push(d);
    }

    var series = {
        name: configs.titleText.value,
        type: 'parallel',
        smooth: configs.parallelSmooth.value.toBoolean(),
        data: data,
    };

    var option = {
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                let value = [param.marker + param.seriesName];
                for(let i=0;i<param.value.length;i++) {
                    value.push("<span style='color:" + param.color + "'>•&ensp;</span>" + columns[i] + ":&emsp;" + param.value[i]);
                }
                return value.join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        parallelAxis: parallelAxis,
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__)
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getSankey(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var nodes = {};
    var links = {};

    var series = [];
    var legends = [];

    function getSankeyData(json) {
        let tmp = [];
        for (let name in json) {
            tmp.push({name: name});
        }
        return tmp;
    }

    if (columns.length >= 3) {
        for (let c = 2; c < columns.length; c++) {
            links[columns[c]] = [];
        }

        for (let i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            for (let c = 0; c < columns.length; c++) {
                if (c <= 1) {
                    nodes[row[columns[c]].value] = row[columns[c]].value;
                } else
                    break;
            }
            for (let c = 2; c < columns.length; c++) {
                links[columns[c]].push({
                    source: row[columns[0]].value,
                    target: row[columns[1]].value,
                    value: row[columns[c]].value,
                })
            }
        }
        for (let name in links) {
            legends.push(name);
            series.push({
                type: 'sankey',
                layout: 'none',
                name: name,
                orient: configs.sankeyOrient.value,
                //horizontal, vertical。
                draggable: true,
                nodeAlign: configs.sankeyNodeAlign.value,
                //justify节点双端对齐。left: 节点左对齐。right: 节点右对齐。
                emphasis: {
                    focus: 'adjacency'
                    //'none' 不淡出其它图形，默认使用该配置。'self' 只聚焦（不淡出）当前高亮的数据的图形。'series' 聚焦当前高亮的数据所在的系列的所有图形。'ancestor' 聚焦所有祖先节点'descendant' 聚焦所有子孙节点
                },
                nodes: getSankeyData(nodes),
                links: links[name],
                lineStyle: {
                    color: 'gradient',
                    curveness: 0.5
                },
            });
        }
    } else
        alert("桑基图数据结构:[source,target,value0,value1,...].");

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                let value = [param.seriesName, param.marker + "&ensp;" + param.name + ":&ensp;" + param.value];
                return value.join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),

    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getThemeRiver(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var data = [];
    for (var i = 0; i < dataset["data"].length; i++) {
        let row = dataset["data"][i];
        for (var j = 0; j < columns.length; j++) {
            data.push([
                i, row[columns[j]].value, columns[j]
            ]);
        }
    }

    var option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal:{
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },

        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                let value = [param.seriesName, param.marker + "&ensp;" + param.value[2]];
                return value.join("<br>");
            }
        },
        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },
        emphasis: {
            focus: configs.themeRiverEmphasisFocus.value,
        },
        singleAxis: {
            max: 'dataMax',
            min: "dataMin",
            axisLine: {
                show:true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisTick: {
                show:true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisLabel:{
                show:true,
                color: configs.axisTextColor.value,
            }
        },
        series: [{
            name: configs.titleText.value,
            coordinateSystem: 'singleAxis',
            type: 'themeRiver',
            data: data,
            label: {
                show: false
            }
        }],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),

    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getPie3D(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    var containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    var containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = [];
    let legends = [];
    let grid3Ds = [];
    let xAxis3Ds = [];
    let yAxis3Ds = [];
    let zAxis3Ds = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        if (i>0) {
            grid3Ds.push({
                show: false,
                //top: '30%',
                left: (100 / (dataset["columns"].length - 1) * (i - 1)) + "%",
                width: containerWidth / (dataset["columns"].length - 1),
                bottom: '50%',
                boxHeight: Number(configs.BoxHeightFor3D.value),
                boxWidth: Math.min(configs.BoxWidthFor3D.value, configs.BoxDepthFor3D.value),
                boxDepth: Math.min(configs.BoxWidthFor3D.value, configs.BoxDepthFor3D.value),
                viewControl: {
                    autoRotate: configs.AutoRotateFor3D.value.toBoolean(),
                    autoRotateSpeed: configs.AutoRotateSpeedFor3D.value,
                    projection: "orthographic",
                    animation: configs.animation.value.toBoolean(),
                    animationThreshold: Number(configs.animationThreshold.value),
                    animationEasing: getAnimationEasing(configs),
                    animationDuration: function (idx) {
                        return idx * Number(configs.animationDuration.value);
                    },
                    animationDelay: function (idx) {
                        return idx * Number(configs.animationDelay.value);
                    },
                    animationEasingUpdate: getAnimationEasingUpdate(configs),
                    animationDurationUpdate: function (idx) {
                        return idx * Number(configs.animationDurationUpdate.value);
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * Number(configs.animationDelayUpdate.value);
                    },
                },
            });
            xAxis3Ds.push({
                min: -1,
                max: 1,
                grid3DIndex: i - 1
            });
            yAxis3Ds.push({
                min: -1,
                max: 1,
                grid3DIndex: i - 1
            });
            zAxis3Ds.push({
                min: -1,
                max: 1,
                grid3DIndex: i - 1
            });
        }
    }

      // 传入数据生成 option
    let series = [];
    for (let c =0;c<columns.length;c++) {
        let da = [];
        for (let i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            if (c==0){
                legends.push(row[columns[0]].value);
            } else {
                let d = {
                    series: columns[c],
                    name: row[columns[0]].value,
                    value: row[columns[c]].value,
                    itemStyle: {
                        opacity: Number(configs.ItemStyleOpacityFor3D.value),
                    }
                };
                da.push(d);
            }
        }
        if (c>0) {
            series = series.concat(getSeries(da, toPoint(configs.ringInRadiusFor3D.value) / 100, c - 1));
        }
    }

    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20
            },

            x: function (u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y: function (u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u);
                }
                return Math.sin(v) > 0 ? 1 : -1;
            }
        };
    }

// 生成模拟 3D 饼图的配置项
    function getSeries(pieData, internalDiameterRatio,index) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
            sumValue += pieData[i].value;
            let seriesItem = {
                name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                grid3DIndex: index,
                parametric: true,
                wireframe: {
                    show: false
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: k
                },
            };

            if (typeof pieData[i].itemStyle != 'undefined') {
                let itemStyle = {};
                typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
                typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;
                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value;
            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k);
            startValue = endValue;
        }

        // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',
            grid3DIndex: index,
            parametric: true,
            wireframe: {
                show: false
            },
            itemStyle: {
                opacity: 0
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 20
                },
                x: function (u, v) {
                    return Math.sin(v) * Math.sin(u) + Math.sin(u);
                },
                y: function (u, v) {
                    return Math.sin(v) * Math.cos(u) + Math.cos(u);
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? 0.1 : -0.1;
                }
            }
        });
        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        return series;
    }

// 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    let selectedIndex = '';
    let hoveredIndex = '';

// 监听点击事件，实现选中效果（单选）
    myChart.on('click', function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
        let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
        let k = option.series[params.seriesIndex].pieStatus.k;
        let startRatio = option.series[params.seriesIndex].pieData.startRatio;
        let endRatio = option.series[params.seriesIndex].pieData.endRatio;


        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
            option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[selectedIndex].pieData.startRatio, option.series[selectedIndex].pieData.endRatio, false, false, k);
            option.series[selectedIndex].pieStatus.selected = false;
        }

        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k);
        option.series[params.seriesIndex].pieStatus.selected = isSelected;

        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? selectedIndex = params.seriesIndex : null;

        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });

// 监听 mouseover，近似实现高亮（放大）效果
    myChart.on('mouseover', function (params) {

        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
            return;
            // 否则进行高亮及必要的取消高亮操作
        } else {
            // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
            if (hoveredIndex !== '') {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                isSelected = option.series[hoveredIndex].pieStatus.selected;
                isHovered = false;
                startRatio = option.series[hoveredIndex].pieData.startRatio;
                endRatio = option.series[hoveredIndex].pieData.endRatio;
                k = option.series[hoveredIndex].pieStatus.k;

                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k);
                option.series[hoveredIndex].pieStatus.hovered = isHovered;

                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = '';
            }

            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (params.seriesName !== 'mouseoutSeries') {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                isSelected = option.series[params.seriesIndex].pieStatus.selected;
                isHovered = true;
                startRatio = option.series[params.seriesIndex].pieData.startRatio;
                endRatio = option.series[params.seriesIndex].pieData.endRatio;
                k = option.series[params.seriesIndex].pieStatus.k;

                // 对当前点击的扇形，执行高亮操作（对 option 更新）
                option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k);
                option.series[params.seriesIndex].pieStatus.hovered = isHovered;

                // 记录上次高亮的扇形对应的系列号 seriesIndex
                hoveredIndex = params.seriesIndex;
            }

            // 使用更新后的 option，渲染图表
            myChart.setOption(option);
        }
    });

// 修正取消高亮失败的 bug
    myChart.on('globalout', function () {
        if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            k = option.series[hoveredIndex].pieStatus.k;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;

            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k);
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
        }

        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });

    let option = {
        aria: {
            enabled: configs.ariaEnable.value.toBoolean(),
            decal: {
                show: configs.ariaEnable.value.toBoolean(),
            }
        },
        backgroundColor: configs.backgroundColor.value,
        title: {
            show: configs.titleDisplay.value.toBoolean(),
            text: configs.titleText.value,
            link: configs.titleTextLink.value,
            target: "blank",
            subtext: configs.titleSubText.value,
            sublink: configs.titleSubTextLink.value,
            subtarget: "blank",
            top: "top",
            left: configs.titlePosition.value,
            textStyle: {
                color: configs.titleTextColor.value,
                fontSize: Number(configs.titleTextFontSize.value),
            },
            subtextStyle: {
                color: configs.titleSubTextColor.value,
                fontSize: Number(configs.titleSubTextFontSize.value),
            }
        },
        legend: {
            show: configs.legendDisplay.value.toBoolean(),
            icon: configs.legendIcon.value,
            type: configs.legendType.value,
            selectedMode: configs.legendSelectedMode.value,
            top: configs.legendPositionTop.value,
            left: configs.legendPositionLeft.value,
            orient: configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: configs.legendTextColor.value
            },
        },

        toolbox: {
            show: configs.toolboxDisplay.value.toBoolean(),
            feature: {
                saveAsImage: {
                    show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                    excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                    backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                },
                restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
                dataView: {show: configs.toolboxFeatureDataView.value.toBoolean(), readOnly: true},
                myMultiScreen: configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
                    show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
                    title: '视图组合',
                    icon: __SYS_IMAGES_PATH__.viewCombination,
                    onclick: function () {
                        __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
                        alert("视图已提交组合列表.");
                    }
                } : {},
            },
            top: configs.toolbox_top.value,
            left: configs.toolbox_left.value,
            orient: configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: configs.toolbox_textPosition.value,
                }
            },
        },

        tooltip: {
            formatter: params => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
                }
            }
        },
        xAxis3D: xAxis3Ds,
        yAxis3D: yAxis3Ds,
        zAxis3D: zAxis3Ds,
        grid3D: grid3Ds,
        light: {
            main: {
                intensity: 1.2,
                shadow: configs.LightShadowFor3D.value.toBoolean(),
            },
            ambient: {
                intensity: 0.3
            }
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}
