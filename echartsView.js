
function getOptionName(options, value) {
    let name = "";
    try {
        options.forEach(function (option) {
            if (option.value === value) {
                name = option.text;
                throw new Error("break");
            }
        });
    }catch (e) {
    }
    return name;
}

function getLinearColor(x,y,x2,y2,colors) {
    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
    try {
        colors = JSON.parse(colors);
    } catch (e) {
    }
    let color = {
        type: 'linear',
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        colorStops: [],
        global: false // 缺省为 false
    };

    if (Array.isArray(colors)) {
        if (colors.length > 1) {
            color.colorStops = colors.reduce(function (stops, item, index, arr) {
                stops.push({
                    offset: index / (arr.length - 1),
                    color: item
                });
                return stops;
            }, []);
            return color;
        } else {
            return colors[0]
        }
    } else
        return colors;
}

function getRadialColor(x,y,r,colors) {
    try {
        colors = JSON.parse(colors);
    } catch (e) {
    }
    let color = {
        type: 'radial',
        x: x,
        y: y,
        r: r,
        colorStops: [],
        global: false // 缺省为 false
    };
    if (Array.isArray(colors)) {
        if (colors.length > 1) {
            color.colorStops = colors.reduce(function (stops, item, index, arr) {
                stops.push({
                    offset: index / (arr.length - 1),
                    color: item
                });
                return stops;
            }, []);
            return color;
        } else {
            return colors[0]
        }
    } else
        return colors;
}

function getBackgroundColor(configs) {
    switch (configs.gradientType.value) {
        case "line":
            if (configs.gradientReverse.value.toBoolean())
                return getLinearColor(0, 0, 0, 1, configs.backgroundColor.value.toArray(["transparent"], ",").reverse());
            else
                return getLinearColor(0, 0, 0, 1, configs.backgroundColor.value.toArray(["transparent"], ","));
            break;
        case "radial":
            if (configs.gradientReverse.value.toBoolean())
                return getRadialColor(0.5, 0.75, 1.25, configs.backgroundColor.value.toArray(["transparent"], ",").reverse());
            else
                return getRadialColor(0.5, 0.75, 1.25, configs.backgroundColor.value.toArray(["transparent"], ","));
            break;
        case "single":
            if (configs.gradientReverse.value.toBoolean()) {
                return configs.backgroundColor.value.toArray(["transparent"], ",").reverse()[0];
            }
            else
                return configs.backgroundColor.value.toArray(["transparent"], ",")[0];
            break;
        default:
            return "transparent";
            break;
    }
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
            case "SingeAxis":
                return getSingeAxis(container, width, height, dataset, configs);
                break;
            case "DatasetImage":
                return getDatasetImage(container, width, height, dataset, configs);
                break;
            case "MathFunciton":
                return getFunctionLine(container, width, height, dataset, configs);
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
        renderer: {
            name: "渲染方式",
            value: "canvas",
            options: [
                new Option("canvas", "canvas"),
                new Option("svg", "svg")],
            type: "select"
        },
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
                new Option("单轴散点图", "SingeAxis"),
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
                new Option("函数图像", "MathFunciton"),
                //new Option("测试", "DatasetImage")
            ],
            type: "select"
        },
        echartsTheme: {
            name: "视图主题",
            value: null,
            options: [
                new Option("默认", null),
                new Option("浅色", "light"),
                new Option("暗黑", "dark"),
                new Option("粉笔", "Chalk"),
                new Option("夕阳", "SettingSun"),
                new Option("橙色", "Essos"),
                new Option("信息", "Infographic"),
                new Option("甜饼", "Macarons"),
                new Option("紫色", "Purple"),
                new Option("热情", "Roma"),
                new Option("阳光", "Shine"),
                new Option("怀旧", "Vintage"),
                new Option("湖光", "Walden"),
                new Option("大陆", "Westeros"),
                new Option("仙境", "Wonderland"),
                new Option("单色", "monochrome"),
                new Option("极简", "simple")],
            type: "select"
        },
        ariaEnable: {
            name: "无障碍访问",
            value: "false",
            options: [new Option("开启", "true"), new Option("关闭", "false")],
            type: "select"
        },

        hr_grid: {name: "整体布局", value: "", type: "hr"},
        gradientType: {name: "背景模式", value: "transparent", options: [new Option("透明", "transparent"), new Option("单色", "single"), new Option("线性", "line"), new Option("径向", "radial")], type: "select"},
        backgroundColor: {name: "背景颜色", value: '["transparent"]', type: "input"},
        gradientReverse: {name: "渐变反转", value: "false", options: [new Option("否", "false"), new Option("是", "true")], type: "select"},
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
            options: [new Option("圆形", "circle"),
                new Option("四边形", "roundRect"),
                new Option("空心圆", "emptyCircle"),
                new Option("三角形", "triangle"),
                new Option("空心三角形", "emptyTriangle"),
                new Option("菱形", "diamond"),
                new Option("空心菱形", "emptyDiamond"),
                new Option("箭头", "arrow"),
                new Option("空心箭头", "emptyArrow"),
                new Option("图钉", "pin"),
                new Option("空心图钉", "emptyPin")],
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

        hr_polar: {name: "极坐标", value: "", type: "hr"},
        polarType: {
            name: "图形类别",
            value: "line",
            options: [new Option("线型图", "line"), new Option("柱状图", "bar"), new Option("面积图", "area"), new Option("热力图", "heatmap")],
            type: "select"
        },
        polarRoundCap: {
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
            value: "outside",
            options: [new Option("outside", "outside"),new Option("inner", "inner"), new Option("center", "center")],
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
        wordCloudSizeRange: {name: "字号区间", value: "[16, 60]", type: "input"},
        wordCloudRotationRange:{name: "角度区间", value: "[-45, 45]", type: "input"},

        hr_liqiud: {name: "水球图", value: "", type: "hr"},
        liqiudShape: {
            name: "形状",
            value: "circle",
            options: [new Option("圆形", "circle"), new Option("四边形", "rect"), new Option("圆角四边形", "roundRect"), new Option("三角形", "triangle"), new Option("菱形", "diamond"), new Option("图钉", "pin"), new Option("箭头", "arrow"), new Option("容器", "container"), new Option("鲸鱼", "whale")],
            type: "select"
        },
        liqiudFontSize: {name: "标题字号", value: 16, type: "input"},
        liqiudLabeColor: {
            name: "标签颜色",
            value: "#E3F7FF",
            type: "color"
        },
        liqiudIsStack: {
            name: "是否堆积",
            value: "false",
            options: [new Option("是", "true"), new Option("否", "false")],
            type: "select"
        },
        liqiudDirection: {
            name: "波浪方向",
            value: "auto",
            options: [new Option("自动", "auto"), new Option("向右", "right"), new Option("向左", "left")],
            type: "select"
        },
        liqiudOpacity: {name: "透明度", value: 0.6, type: "input"},

        hr_gauge: {name: "仪表盘", value: "", type: "hr"},
        gaugeAxisLabelFontSize: {name: "刻度字号", value: 10, type: "input"},
        gaugeAxisLabelDistance: {name: "刻度位置", value: 15, type: "input"},
        gaugeTitleFontSize: {name: "标题字号", value: 14, type: "input"},
        gaugeTitleColor: {value: "#C0911F", name: "标题颜色", type: "color"},
        gaugeLabelFontSize: {name: "数据字号", value: 18, type: "input"},
        gaugeAxisLineWidth: {name: "圆轴宽度", value: 10, type: "input"},
        gaugeStartAngle: {name: "起始角度", value: 225, type: "input"},
        gaugeEndAngle: {name: "结束角度", value: -45, type: "input"},
        gaugeMin: {name: "最小值", value: 0, type: "input"},
        gaugeMax: {name: "最大值", value: 100, type: "input"},

        hr_clock: {name: "时钟", value: "", type: "hr"},
        clockRadius: {name: "表盘半径", value: "75%", type: "input"},
        clockCenter: {name: "表盘位置", value: '["50%","50%"]', type: "input"},
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
        sunburstRadius: {name: "内/外半径", value: '["15%", "90%"]', type: "input"},
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
        sunburstItemStyleBorderRadius: {name: "圆角半径", value: 0, type: "input"},
        sunburstHighlightPolicy: {
            name: "高亮显示",
            value: "self",
            options: [new Option("向上显示", "ancestor"), new Option("本身", "self"), new Option("向下显示", "descendant"), new Option("不设置", "none")],
            type: "select"
        },

        hr_treemap: {name: "矩形树图", value: "", type: "hr"},
        treemapWidth: {name: "组件宽度", value: "80%", type: "input"},
        treemapHeight: {name: "组件高度", value: "80%", type: "input"},
        treemapLabelFontSize: {name: "标签字号", value: "22", type: "input"},
        treemapLabelPosition: {
            name: "位置",
            value: '["5%","5%"]',
            type: "input"
        },
        treemapItemStyleBorderRadius: {
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
        BoxHeightFor3D: {name: "高度(X轴)", value: 20, type: "input"},
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
        ringInRadiusFor3D: {name: "内半径(%)", value: "30%", type: "input"},

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
        timelineLeft: {name: "左边距(%)", value: "15%", type: "input"},
        timelineRight: {name: "右边距(%)", value: "15%", type: "input"},
        timelineTop: {name: "上边距(%)", value: "90%", type: "input"},
        timelineBottom: {name: "下边距(%)", value: "10%", type: "input"},
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

        hr_singeAxis: {name: "单轴散点图", value: "", type: "hr"},
        singeAxisType: {
            name: "类别",
            value: "scatter",
            options: [new Option("一般散点", "scatter"), new Option("效应散点", "effectScatter")],
            type: "select"
        },
        singeAxisSymbolSize: {name: "散点最大值", value: 45, type: "input"},

        hr_mathFunction: {name: "函数图像", value: "", type: "hr"},
        mathFunctionXRange: {
            name: "X区间",
            value: "[-100, 100]",
            type: "input"
        },
        mathFunctionXGrainSize: {
            name: "X粒度",
            value : 1,
            type: "input",
        },
        mathFunctionYRange: {
            name: "Y区间",
            value: "[-100, 100]",
            type: "input"
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
        reportPageSize: {
            name: "每页", value: 100,
            options: [
                new Option("50行", 50),
                new Option("100行", 100),
                new Option("150行", 150),
                new Option("200行", 200),
            ],
            type: "select"
        },
        reportDownload: {
            name: "下载方式",
            value: "current",
            options: [new Option("当前数据集", "current"), new Option("所有数据集-合并为单一工作簿", "all-single"), new Option("所有数据集-拆分为多个工作簿", "all-multi")],
            type: "select"
        },
        reportDownloadDelay: {
            name: "单位延时(毫秒)",
            value: 1000,
            type: "input"
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
        let sqltitle = __SQLEDITOR__.title;
        if (sqltitle != null) {
            for (let param in __SQLEDITOR__.parameter) {
                sqltitle = sqltitle.replaceAll("{" + param.toString() + "}", __SQLEDITOR__.parameter[param].toString());
            }
            sqltitle = sqltitle.split("_");
            __ECHARTS__.configs.titleText.value = sqltitle[0];
            if (sqltitle.length > 1) {
                __ECHARTS__.configs.titleSubText.value = sqltitle[1];
            } else {
                __ECHARTS__.configs.titleSubText.value = "";
            }
        }

        let container = document.createElement("div");
        container.type = "div";
        container.className = "echarts-configs-Content";
        container.id = "echarts-configs-Content";

        let title = document.createElement("div");
        title.className = "container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 报表及图形参数 ";
        title.appendChild(span);
        let toconfig = document.createElement("select");
        toconfig.onchange = function () {
            $(this.value).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            //滚动参数
            //behavior: 定义缓动动画， "auto", "instant", 或 "smooth"。默认为 "auto"。
            //block: "start", "center", "end", 或 "nearest"。默认为 "start"。
            //inline:"start", "center", "end", 或 "nearest"。默认为 "nearest"。
        };
        title.appendChild(toconfig);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        title.appendChild(close);

        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        let itemcontainer = document.createElement("div");
        itemcontainer.className = "echarts-configs-container";
        container.appendChild(itemcontainer);

        for (let name in __ECHARTS__.configs) {
            let d = document.createElement("div");
            d.className = "echarts-configs-item";
            itemcontainer.appendChild(d);
            let s = document.createElement("span");
            s.className = "echarts-config-name";
            s.innerHTML = __ECHARTS__.configs[name].name + ":";
            d.appendChild(s);
            if (__ECHARTS__.configs[name].type == "input") {
                let input = document.createElement("input");
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
                let input = document.createElement("select");
                input.style.cssFloat = "right";
                input.id = name;
                input.type = "select";
                input.className = "editinput";
                for (let i = 0; i < __ECHARTS__.configs[name].options.length; i++) {
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
                let input = document.createElement("input");
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

        let c = document.createElement("div");
        c.className = "groupbar";
        container.appendChild(c);

        let b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "确定";
        b.onclick = function () {
            let configs = $("echarts-configs-Content").getElementsByClassName("editinput");
            let config = {};
            for (let i = 0; i < configs.length; i++) {
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
                let _width = (getAbsolutePosition(parent).width * 1) + "px";
                let _height = (getAbsolutePosition(parent).height * 1) + "px";
                parent.innerHTML = "";
                let echart = getEcharts(
                    parent,
                    _width,
                    _height,
                    __DATASET__["result"][__DATASET__.default.sheet],
                    __ECHARTS__.configs);
                setDragNook(parent, echart.getAttribute("_echarts_instance_"));
            } catch (e) {

            }
            let m = $("echarts-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "重置";
        b.onclick = close.onclick = function () {
            let r = confirm("您确定要重置全部图形参数吗?");
            if (r) {
                setUserConfig("echartsconfig", JSON.stringify({}));
                let m = $("echarts-configs-Content");
                m.parentNode.removeChild(m);
                alert("所有参数已恢复为系统初始值,系统将重新载入页面...");
                location.reload();
            }
        };
        c.appendChild(b);

        b = document.createElement("a");
        b.className = "button";
        b.innerHTML = "退出";
        b.onclick = close.onclick = function () {
            let m = $("echarts-configs-Content");
            m.parentNode.removeChild(m);
        };
        c.appendChild(b);

        setDialogDrag(title);

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
        let title = document.createElement("div");
        title.className = "container-title";
        let span = document.createElement("span");
        span.innerHTML = "● 地图设置 ";
        title.appendChild(span);
        let close = __SYS_IMAGES__.getButtonImage(__SYS_IMAGES__.close);
        title.appendChild(close);
        container.appendChild(title);

        let hr = document.createElement("hr");
        container.appendChild(hr);

        let d = document.createElement("div");
        d.className = "toolbar";
        let b = document.createElement("a");
        b.className = "tabButton";
        b.innerHTML = "国内城市";
        b.onclick = function () {
            $("city-coord-table").style.display = "block";
            $("custom-coord-table").style.display = "none";
        };
        d.appendChild(b);
        b = document.createElement("a");
        b.className = "tabButton";
        b.innerHTML = "用户定义";
        b.onclick = function () {
            $("city-coord-table").style.display = "none";
            $("custom-coord-table").style.display = "block";
        };
        d.appendChild(b);


        let localmap = document.createElement("select");
        localmap.className = "tabButton";
        localmap.id = "set-local-map";
        localmap.style.cssFloat = "right";
        let regions = echarts.getMap("china").geoJson.features;
        let region = [];
        for (let i = 0; i < regions.length; i++) {
            region.push(regions[i].properties.name);
        }
        regions = sortAsc(region);
        for (let i = 0; i < regions.length; i++) {
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
        b.className = "tabButton";
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
                for (let i = 0; i < trs.length; i++) {
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
                for (let i = 0; i < trs.length; i++) {
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

        setDialogDrag(title);

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

function getAria(configs) {
    return {
        enabled: configs.ariaEnable.value.toBoolean(),
        decal: {
            show: configs.ariaEnable.value.toBoolean(),
        }
    };
}

function getTitle(configs) {
    return {
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
    };
}

function getLegend(configs, data) {
    return {
        show: configs.legendDisplay.value.toBoolean(),
        icon: configs.legendIcon.value,
        type: configs.legendType.value,
        selectedMode: configs.legendSelectedMode.value,
        top: configs.legendPositionTop.value,
        left: configs.legendPositionLeft.value,
        orient: configs.legendOrient.value,
        data: data,
        textStyle: {
            color: configs.legendTextColor.value
        },
    };
}

function getGrid(configs) {
    return {
        x: configs.grid_left.value,
        y: configs.grid_top.value,
        x2: configs.grid_right.value,
        y2: configs.grid_bottom.value,
        containLabel: configs.grid_containLabel.value.toBoolean(),
        backgroundColor: "transparent"
    }
}

function getBrush(configs) {
    return configs.toolboxFeatureBrush.value.toBoolean() ? {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0
    } : null;
}

function getMultiScreen(configs, container) {
    return configs.toolboxFeatureMultiScreen.value.toBoolean() ? {
        show: configs.toolboxFeatureMultiScreen.value.toBoolean(),
        title: '视图组合',
        icon: __SYS_IMAGES_PATH__.viewCombination,
        onclick: function () {
            __ECHARTS__.sets.add(container.getAttribute("_echarts_instance_"));
            alert("视图已提交组合列表.");
        }
    } : {};
}

function getXAxis(configs, type, data, name) {
    return {
        name: typeof name != "undefined"? name: null,
        type: type,
        data: data,
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
    };
}

function getYAxis(configs,type,data,position, name) {
    return {
        name: typeof name != "undefined"? name: null,
        type: type,
        data: data,
        position: position,
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
    };
}

function getDataZoomXAxis(configs, xAxisIndex, type,start ,end) {
    if (type == "inside") {
        return {
            type: type,
            filterMode: configs.dataZoomFilterMode.value,
            start: start,
            xAxisIndex: xAxisIndex,
            end: end
        };
    } else if (type == "slider") {
        return {
            show: configs.dataZoomBarDisplay.value.toBoolean(),
            type: type,
            filterMode: configs.dataZoomFilterMode.value,
            xAxisIndex: xAxisIndex,
            start: start,
            end: end,
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
            }
        };
    } else {
        return {};
    }
}

function getDataZoomYAxis(configs, yAxisIndex, type,start ,end, containerWidth) {
    if (type == "inside") {
        return {
            type: type,
            filterMode: configs.dataZoomFilterMode.value,
            start: start,
            yAxisIndex: yAxisIndex,
            end: end
        };
    } else if (type == "slider") {
        if (yAxisIndex == 0) {
            return {
                show: configs.dataZoomBarDisplay.value.toBoolean(),
                type: "slider",
                filterMode: configs.dataZoomFilterMode.value,
                yAxisIndex: yAxisIndex,
                start: start,
                end: end,
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
                }
            };
        } else if (yAxisIndex == 1) {
            return {
                show: configs.dataZoomBarDisplay.value.toBoolean(),
                type: "slider",
                filterMode: configs.dataZoomFilterMode.value,
                yAxisIndex: yAxisIndex,
                start: start,
                end: end,
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
                textStyle: {
                    color: configs.dataZoomBarColor.value,
                }
            };
        }
    } else {
        return {};
    }
}

function getOptionToContent(dataset, configs, _echarts_instance_id) {
    function getTable(table, dataset, configs, _echarts_instance_id) {
        let columns = dataset.columns;
        let data = dataset.data;
        if (table == null) {
            table = document.createElement("table");
            table.className = "table";
            table.id = "optionToContentTable_" + _echarts_instance_id;
            table.style.cssText = "width:" + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) + "%;margin: auto";
            table.style.fontSize = configs.reportFontSize.value;
        } else {
            table.innerHTML = "";
        }
        let tr = document.createElement("tr");
        tr.type = "tr";
        table.appendChild(tr);

        for (let c = 0; c < columns.length; c++) {
            let th = document.createElement("th");
            th.type = "th";
            th.innerText = columns[c].name;
            th.style.textAlign = columns[c].style.textAlign;
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
                getTable($("optionToContentTable_" + _echarts_instance_id), orderDatasetBy(dataset, this.getAttribute("colid")), configs, _echarts_instance_id);
            };
            th.appendChild(order);
            tr.appendChild(th);
        }

        for (let i = 0; i < data.length; i++) {
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
        return table;
    }
    return getTable(null, dataset, configs, _echarts_instance_id);
}

function getToolbox(configs, container, dataset, magic) {
    return {
        show: configs.toolboxDisplay.value.toBoolean(),
        feature: {
            saveAsImage: {
                show: configs.toolboxFeatureSaveAsImage.value.toBoolean(),
                excludeComponents: ["toolbox", "dataZoom", "timeline", "visualMap", "brush"],
                backgroundColor: configs.toolboxFeatureSaveAsImageBackgroundColor.value,
                pixelRatio: 5,
                type: "png",
            },
            restore: {show: configs.toolboxFeatureRestore.value.toBoolean()},
            dataView: {
                show: configs.toolboxFeatureDataView.value.toBoolean(),
                readOnly: true,
                backgroundColor: "transparent",
                lang: [' ', '关闭', ' '],
                optionToContent: function() {
                    return getOptionToContent(dataset, configs, container.getAttribute("_echarts_instance_"));
                }
            },
            dataZoom: {show: configs.toolboxFeatureDataZoom.value.toBoolean(),},
            magicType: magic ? {
                show: configs.toolboxFeatureMagicType.value.toBoolean(),
                type: ["line", "bar", "stack", "tiled"]
            } : {},
            myMultiScreen: getMultiScreen(configs, container),
        },
        top: configs.toolbox_top.value,
        left: configs.toolbox_left.value,
        orient: configs.toolbox_orient.value,
        emphasis: {
            iconStyle: {
                textPosition: configs.toolbox_textPosition.value,
            }
        },
    };
}

function getTooltip(configs, trigger, formatter) {
    let tip = {
        show: configs.tooltipDisplay.value.toBoolean(),
        trigger: trigger,
    };
    if (trigger == "axis") {
        tip.axisPointer = {
            type: configs.axisPointerType.value,
        };
    }
    if (formatter != null) {
        tip.formatter = formatter;
    }
    return tip;
}

function getTimeline(configs, times) {
    return {
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
    };
}

function getVisualMap(configs, min, max) {
    return {
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
    }
}

function setSeriesAnimation(series, configs, c) {
    series.animation = configs.animation.value.toBoolean();
    if (c >= 0) {
        series.animationThreshold = Number(configs.animationThreshold.value);
        series.animationEasing = getAnimationEasing(configs);
        series.animationDuration = function (idx) {
            return idx * Number(configs.animationDuration.value) + c * Number(configs.animationDuration.value);
        };
        series.animationDelay = function (idx) {
            return idx * Number(configs.animationDelay.value) + c * Number(configs.animationDelay.value);
        };
        series.animationEasingUpdate = getAnimationEasingUpdate(configs);
        series.animationDurationUpdate = function (idx) {
            return idx * Number(configs.animationDurationUpdate.value) + c * Number(configs.animationDurationUpdate.value);
        };
        series.animationDelayUpdate = function (idx) {
            return idx * Number(configs.animationDelayUpdate.value) + c * Number(configs.animationDelayUpdate.value);
        };
    } else {
        series.animationType = configs.animationType.value;
        series.animationTypeUpdate = configs.animationTypeUpdate.value;
        //gauge
        series.animationThreshold = Number(configs.animationThreshold.value);
        series.animationEasing = getAnimationEasing(configs);
        series.animationEasingUpdate = getAnimationEasingUpdate(configs);
    }
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

function getBar(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let yAxis_series = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            xAxis = dataset["data"].reduce(function (tmp, row) {
                tmp.push(row[columns[c]].value);
                return tmp;
            }, []);
        } else {
            let series = {
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
            };
            setSeriesAnimation(series, configs, c);

            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "axis", null),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: getYAxis(configs, "value", null, "left"),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let yAxis_series = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            let series = {
                name: columns[c],
                type: "bar",
                data: [],
                itemStyle: {
                    borderRadius: Number(configs.barItemStyleBorderRadius.value),
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

            setSeriesAnimation(series, configs, c);

            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "axis", null),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        xAxis: getXAxis(configs, "value", null),
        yAxis: getYAxis(configs, "category", xAxis, "bottom"),

        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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

function getLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let yAxis_series = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            let series = {
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
            };

            setSeriesAnimation(series, configs, c);
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "axis", null),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: getYAxis(configs, "value", null, "left"),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let containerWidth = myChart.getWidth();
    let containerHeight = myChart.getHeight();

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let yAxis_series = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            let serie = {};
            if ((c - 1) % 2 == 0) {
                serie = {
                    name: columns[c],
                    type: "line",
                    data: [],
                    yAxisIndex: (c - 1) % 2,
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
                };
            }
            else {
                serie = {
                    name: columns[c],
                    type: "bar",
                    yAxisIndex: (c - 1) % 2,
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
                }
            }

            setSeriesAnimation(serie, configs, (c - 1));
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                serie.data.push(r[columns[c]].value);
            }
            yAxis_series.push(serie);
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "axis", null),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: [
            getYAxis(configs, "value", null, "left"),
            getYAxis(configs, "value", null, "right")
        ],
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 1, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 1, "slider", 0, 100, myChart.getWidth())
        ],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let yAxis_series = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            let series = {
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
            };
            setSeriesAnimation(series, configs, c);
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }

    let option = {
        aria: getAria(configs),
        grid: getGrid(configs),
        backgroundColor: getBackgroundColor(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "axis", null),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: getYAxis(configs, "value", null, "left"),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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
    if (configs.polarType.value == "heatmap") {
        return getPolarHeatmap(container, width, height, dataset, configs);
    } else {
        if (container == null) {
            container = document.createElement("div");
            container.className = "echarts-container";
            container.id = "echarts-container";
            container.style.width = width;
            container.style.height = height;
        }
        let myChart = echarts.init(container, configs.echartsTheme.value, {
            locale: configs.local.value,
            renderer: configs.renderer.value
        });
        myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

        let columns = dataset["columns"].reduce(function (tmp, column) {
            tmp.push(column.name);
            return tmp;
        }, []);
        let xAxis = [];
        let yAxis_series = [];
        for (let c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    xAxis.push(r[columns[c]].value);
                }
            } else {
                let series = {
                    name: columns[c],
                    type: configs.polarType.value == "area" ? "bar" : configs.polarType.value,
                    coordinateSystem: "polar",
                    data: [],
                    roundCap: configs.polarRoundCap.value.toBoolean(),
                };
                setSeriesAnimation(series, configs, -1);

                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    series.data.push(r[columns[c]].value);
                }
                yAxis_series.push(series);
            }
        }

        let option = {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            title: getTitle(configs),
            toolbox: getToolbox(configs, container, dataset, true),
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
                axisTick: {
                    show: configs.axisLineDisplay.value.toBoolean(),
                    lineStyle: {
                        color: configs.axisColor.value,
                    },
                },
                splitArea: {
                    show: configs.splitYAreaDisplay.value.toBoolean(),
                },
                type: configs.polarType.value == "area" || configs.polarType.value == "line" ? "category" : null,
                data: configs.polarType.value == "area" || configs.polarType.value == "line" ? xAxis : null,
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
                axisTick: {
                    show: configs.axisLineDisplay.value.toBoolean(),
                    lineStyle: {
                        color: configs.axisColor.value,
                    },
                },
                type: configs.polarType.value == "bar" ? "category" : null,
                data: configs.polarType.value == "bar" ? xAxis : null,
                z: 10,
            },
            polar: {
                center: [(toPoint(configs.grid_left.value) + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / 2) + "%",
                    (toPoint(configs.grid_top.value) + (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / 2) + "%"],
            },
            series: yAxis_series,
            legend: getLegend(configs, columns.slice(1, columns.length)),
            tooltip: getTooltip(configs, "axis", null),
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
}

function getPolarHeatmap(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let data = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push(r[columns[c]].value);
            }
        } else {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                data.push([c - 1, i, r[columns[c]].value]);
            }
        }
    }

    let maxValue = data.reduce(function (max, item) {
        return Math.max(max, item[2]);
    }, -Infinity); //默认-Infinity:无穷小

    let minValue = data.reduce(function (min, item) {
        return Math.min(min, item[2]);
    }, +Infinity);//默认+Infinity:无穷大

    function renderItem(params, api) {
        let values = [api.value(0), api.value(1)];
        let coord = api.coord(values);
        let size = api.size([1, 1], values);
        return {
            type: 'sector',
            shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r0: coord[2] - size[0] / 2,
                r: coord[2] + size[0] / 2,
                startAngle: -(coord[3] + size[1] / 2),
                endAngle: -(coord[3] - size[1] / 2)
            },
            style: api.style({
                fill: api.visual('color')
            })
        };
    }

    function getAngleAxis(configs, xAxis) {
        let angleAxis = {
            type: 'category',
            data: xAxis,
            boundaryGap: false,
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
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value,
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
            },
        };
        return angleAxis;
    }

    function getRadiusAxis(configs, data) {
        let radiusAxis = {
            type: 'category',
            data: data,
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
            axisTick: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value,
                },
            },
            z: 100
        };
        return radiusAxis;
    };

    let serie = {
        name: null,
        //不能显示图例
        type: 'custom',
        coordinateSystem: 'polar',
        itemStyle: {
            //color: '#d14a61'
        },
        renderItem: renderItem,
        data: data
    };
    setSeriesAnimation(serie, configs, -1);

    let option = {
        aria: getAria(configs),
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, null),
        polar: {},
        tooltip: getTooltip(configs, "item", function (param) {
            return [xAxis[param.value[1]], param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value[2] + "</span>"].join("<br>");
        }),
        visualMap: getVisualMap(configs, minValue, maxValue),
        angleAxis: getAngleAxis(configs, xAxis),
        radiusAxis: getRadiusAxis(configs, columns.slice(1)),
        series: serie,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getPieRichText(colors) {
    return {
        formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ",
        backgroundColor: "transparent",//"#eee",
        borderColor: "#aaa",
        borderWidth: 1,
        borderRadius: 4,
        //shadowBlur:3,
        //shadowOffsetX: 2,
        //shadowOffsetY: 2,
        //shadowColor: "#999",
        padding: [0, 7],
        z: 9,
        rich: {
            a: {
                color: colors[0],//"#999",
                lineHeight: 22,
                align: "center"
            },
            abg: {
                backgroundColor: "transparent",
                width: "100%",
                align: "right",
                height: 22,
                borderRadius: [4, 4, 0, 0]
            },
            hr: {
                borderColor: colors[1],//"#aaa",
                width: "100%",
                borderWidth: 0.5,
                height: 0
            },
            b: {
                color: colors[2],//"#eee",
                fontSize: 16,
                lineHeight: 33
            },
            c: {
                color: colors[3],//"#eee",
                fontSize: 16,
                lineHeight: 33
            },
            per: {
                color: colors[1],//"#eee",
                backgroundColor: "#334455",
                padding: [2, 4],
                borderRadius: 2
            }
        }
    }
}

function getPie(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let series = [];
    for (let c = 1; c < columns.length; c++) {
        let serie = {
            name: columns[c],
            type: "pie",
            radius: configs.outRadius.value,
            selectedMode: configs.pieSelectedMode.value,
            label: {
                show: configs.pieLabelDisplay.value.toBoolean(),
                //控制label是否显示
                position: configs.pieLabelPosition.value,
                alignTo: configs.pieLabelAlignTo.value,
                bleedMargin: 25,
                //出血线
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
            avoidLabelOverlap: configs.richTextLabel.value.toBoolean() ? false : true,
            hoverAnimation: true,
            data: [],
        };
        setSeriesAnimation(serie, configs, -1);
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            serie.data.push({"value": r[columns[c]].value, "name": r[columns[0]].value});
        }
        series.push(serie);
    }

    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / groupWith;
    for (let i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        toolbox: getToolbox(configs, container, dataset, false),
        tooltip: getTooltip(configs, "item", function (param) {
            console.log(param);
            return [param.seriesName,
                param.marker + "&ensp;" + param.name +
                ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" +
                param.value + "&ensp;(&ensp;" +
                param.percent + "%&ensp;)</span>"].join("<br>");
        }),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = getPieRichText(colors);
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let series = [];
    for (let c = 1; c < columns.length; c++) {
        let serie = {
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
            avoidLabelOverlap: configs.richTextLabel.value.toBoolean() ? false : true,
            hoverAnimation: true,
            data: [],
        };
        setSeriesAnimation(serie, configs, -1);
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            serie.data.push({"value": r[columns[c]].value, "name": r[columns[0]].value});
        }
        series.push(serie);
    }

    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / groupWith;
    for (let i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, columns.slice(1,columns.length)),
        tooltip: getTooltip(configs, "item", function (param) {
            return [param.seriesName,
                param.marker + "&ensp;" +
                param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" +
                param.value + "&ensp;(&ensp;" +
                param.percent + "%&ensp;)</span>"].join("<br>");
        }),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = getPieRichText(colors);
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let series = [];
    for (let c = 1; c < columns.length; c++) {
        let serie = {
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
            avoidLabelOverlap: configs.richTextLabel.value.toBoolean() ? false : true,
            hoverAnimation: true,
            data: [],
        };
        setSeriesAnimation(serie, configs, -1);
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            serie.data.push({"value": r[columns[c]].value, "name": r[columns[0]].value});
        }
        series.push(serie);
    }
    let top = toPoint(configs.grid_top.value);
    let left = toPoint(configs.grid_left.value);
    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let h = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
    let w = (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / groupWith;
    for (let i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * h) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * w) + "%";
        series[i].width = w + "%";
        series[i].height = h + "%";
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, columns.slice(1,columns.length)),
        tooltip: getTooltip(configs, "item", function (param) {
            return [param.seriesName,
                param.marker + "&ensp;" +
                param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" +
                param.value + "&ensp;(&ensp;" +
                param.percent + "%&ensp;)</span>"].join("<br>");
        }),
        label: {
            fontSize: configs.pieLabelFontSize.value,
        },
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    if (configs.richTextLabel.value.toBoolean()) {
        //富文本
        option.label = getPieRichText(colors);
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let series = [];
    let xAxis_max = {};
    let all_max = null;
    //每行的最大值
    for (let i = 0; i < dataset["data"].length; i++) {
        let max = null;
        let r = dataset["data"][i];
        for (let c = 1; c < columns.length; c++) {
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

    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                xAxis.push({
                    name: r[columns[c]].value,
                    max: configs.radarSameMax.value.toBoolean() ? all_max : xAxis_max[r[columns[c]].value],
                });
            }
        } else {
            let serie = {
                name: columns[c],
                type: "radar",
                areaStyle: {
                    show: configs.radarAreaDisplay.value.toBoolean(),
                    normal: {}
                },
                data: [],
            };

            setSeriesAnimation(serie, configs, c);
            let d = {name: columns[c], value: []};
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                d.value.push(r[columns[c]].value);
            }
            serie.data.push(d);
            series.push(serie);
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", null),
        toolbox: getToolbox(configs, container, dataset, false),
        radar: {
            center: [(toPoint(configs.grid_left.value) + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / 2) + "%",
                (toPoint(configs.grid_top.value) + (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / 2) + "%"],
            shape: configs.radarShape.value,
            splitNumber: configs.radarSplitNumber.value,
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
                rotate: configs.radarLabelRotate.value,
            },
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                show: configs.splitYLineDisplay.value.toBoolean(),
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitArea: {
                show: configs.splitYAreaDisplay.value.toBoolean(),
                interval: 1
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let columns_add = [];
    let xAxis = [];
    let series = [];

    let selectType = configs.regressionType.value;
    let forwardPeroids = Number(configs.regressionForwardPeroids.value);
    let regressionPolynomialOrder = Number(configs.regressionPolynomialOrder.value);

    function init() {
        for (let c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    xAxis.push(r[columns[c]].value);
                }
            } else {
                let serie = {
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

                };

                setSeriesAnimation(serie, configs, c);
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    serie.data.push([i, r[columns[c]].value]);
                }
                series.push(serie);

                for (let regression in regressionType) {
                    if (regression == selectType) {
                        getRegLine(columns[c], serie, selectType, regressionPolynomialOrder);
                        break;
                    }
                }
            }
        }
    }

    function getRegLine(column, serie, type, order) {
        let myRegression = ecStat.regression(regressionType[type], washData(serie.data), order);
        myRegression.points.sort(function (a, b) {
            return a[0] - b[0];
        });

        columns_add.push(type + "(" + column + ")");
        let data = appendData(myRegression.points, myRegression.parameter, regressionType[type]);
        let regline = {
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
        };
        setSeriesAnimation(regline, configs, 0);
        series.push(regline);
    }

    function checkxAxis(result) {
        //计算X轴标示与初始是否一致,如不一致则添加
        if (xAxis.length < result.length) {
            for (let i = xAxis.length; i < result.length; i++) {
                xAxis.push("P" + result[i][0]);
            }
        }
    }

    function appendData(data, parameter, type) {
        let period = 1;
        let max = data.length - 1;
        //let period = (data[data.length - 1][0] - data[0][0]) / (data.length - 1);
        //let max = data[data.length - 1][0];
        let data_add = [];
        let i = 1;
        switch (type) {
            case "linear":  //直线
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.gradient * x + parameter.intercept]);
                    i += 1;
                }
                break;
            case "exponential": //指数
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.coefficient * Math.pow(Math.E, x * parameter.index)]);
                    i += 1;
                }
                break;
            case "logarithmic"://对数
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.gradient * Math.log(x) + parameter.intercept]);
                    i += 1;
                }
                break;
            case "polynomial"://多项式
                while (i <= forwardPeroids) {
                    let value = 0;
                    let x = max + i * period;
                    for (let s = 0; s < parameter.length; s++) {
                        value += parameter[s] * Math.pow(x, s);
                    }
                    data_add.push([x, value]);
                    i += 1;
                }
                break;
        }

        let result = data.slice().concat(data_add);
        checkxAxis(result);
        return result;
    }

    function washData(source) {
        //对非数值型数据进行清洗
        let target = [];
        for (let i = 0; i < source.length; i++) {
            let row = source[i];
            if (row[1] != "" && row[1] != null && !isNaN(Number(row[1]))) {
                target.push(row);
            }
        }
        return target;
    }

    init();

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length).concat(columns_add)),
        tooltip: getTooltip(configs, "axis", null),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: getYAxis(configs, "value", null, "left"),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    if (columns.length != 2)
        alert("关系数据结构:[父级名称,子级名称].");

    let nodes = [];
    let links = [];
    //############################################
    // 数据转换方法,以每行的每个单元为source节点,次单元为target节点,无论多少单元依次下推n个节点.
    // {S:1,T:2]},{S:2,T:3},....
    // 为每个节点按值建立唯一索引,如有重复将引发报错.
    // 坐标值可以按照图像大小的百分比计算,取100以内随机数.也可以采用window.innerWidth和window.innerHeight限制范围.
    //############################################
    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        for (let c = 0; c < columns.length; c++) {
            let ex = true;
            for (let x = 0; x < nodes.length; x++) {
                if (nodes[x].name == r[columns[c]].value || r[columns[c]].value == "") {
                    ex = false;
                    break;
                }
            }
            if (ex) {
                let node = {
                    name: r[columns[c]].value,
                    x: Math.floor(Math.random() * window.innerWidth),
                    y: Math.floor(Math.random() * window.innerHeight),
                    value: nodes.length + 1,
                };
                nodes.push(node);
            }

            if ((c + 1) < (columns.length)) {
                if (r[columns[c]].value !== r[columns[c + 1]].value && r[columns[c]].value != "" && r[columns[c + 1]].value != "") {
                    links.push({
                        source: r[columns[c]].value,
                        target: r[columns[c + 1]].value,
                    });
                }
            }
        }
    }

    let serie = {
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
        edgeSymbolSize: [Number(configs.relationSymbolSize.value) / 4, Number(configs.relationSymbolSize.value) / 4],
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
    };
    setSeriesAnimation(serie, configs, 0);

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (params) {
            return params.marker + params.name;
        }),
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
                        r: Number(configs.relationSymbolSize.value) / 2.5,
                    },
                    silent: false,
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    if (columns.length != 2)
        alert("树形数据结构:[父级名称,子级名称].");

    let nodes = [];

    function createNode(name) {
        //增加一个节点，如果同名节点已存在，则返回已存在节点。
        let node = null;
        let ex = true;
        for (let x = 0; x < nodes.length; x++) {
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
                children: [],
            };
            nodes.push(node);
        }
        return node;
    }

    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        for (let c = 0; c < columns.length; c++) {
            if ((c + 1) < columns.length) {
                if (r[columns[c]].value !== r[columns[c + 1]].value && r[columns[c]].value != "" && r[columns[c + 1]].value != "") {
                    let node = createNode(r[columns[c]].value);
                    let child = createNode(r[columns[c + 1]].value);
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
        let children = [];
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].parent == parent) {
                children.push({name: nodes[i].name, children: getChildren(nodes[i].name)});
            }
        }
        return children;
    }

    let series = [];
    let legends = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].parent == null) {
            legends.push({name: nodes[i].name, icon: configs.legendIcon.value});
            let serie = {
                type: "tree",
                name: nodes[i].name,
                layout: configs.treeLayout.value,
                orient: configs.treeOrient.value,
                edgeShape: configs.treeLayout.value == "radial" ? "curve" : configs.treeEdgeShape.value,
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
                emphasis: {
                    itemStyle: {
                        color: configs.treeEmphasisColor.value,
                    }
                },
                symbolSize: Number(configs.treeSymbolSize.value),
                data: [{
                    name: nodes[i].name,
                    children: getChildren(nodes[i].name)
                }],
            };
            setSeriesAnimation(serie, configs, 0);
            series.push(serie);
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "item",
            triggerOn: "mousemove"
        },
        legend: getLegend(configs, legends),
        series: series,
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = [];
    let categories = [];
    for (let i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        categories.push({name: dataset["columns"][i].name, keyword: {}, base: dataset["columns"][i].name});
    }

    if (columns.length != 2)
        alert("关系数据结构:[父级名称,子级名称].");

    let nodes = [];
    let links = [];
    //############################################
    // 数据转换方法:
    // 每行第一单元为source节点,从第二个单元开始,每个单元为target节点,
    // createNode为每个节点按值建立唯一索引,如有重复返回原节点index.
    //############################################

    function createNode(name, category) {
        let index;
        let ex = true;
        for (let x = 0; x < nodes.length; x++) {
            if (nodes[x].name == name || name == "") {
                index = x;
                ex = false;
                break;
            }
        }
        if (ex) {
            let node = {
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

    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let source;
        for (let c = 0; c < columns.length; c++) {
            if (c == 0) {
                source = createNode(r[columns[c]].value, c);
            } else {
                let target;
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

    let webkitDep = {
        type: "force",
        categories: categories,
        nodes: nodes,
        links: links
    };

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns),
        toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    let series = [];
    let columns = [];
    let valueMin = +Infinity;
    let valueMax = -Infinity;
    let columns_add = [];
    let selectType = configs.regressionType.value;
    let forwardPeroids = Number(configs.regressionForwardPeroids.value);
    let regressionPolynomialOrder = Number(configs.regressionPolynomialOrder.value);

    function init() {
        columns = dataset["columns"].reduce(function (tmp, column) {
            tmp.push(column.name);
            return tmp;
        }, []);

        for (let c = 1; c < columns.length; c++) {
            let serie = {
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
                    let size = configs.scatterSymbolSize.value.toArray([6, 18], ",");
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
            };
            setSeriesAnimation(serie, configs, c);
            for (let i = 0; i < dataset["data"].length; i++) {
                let d = [];
                let row = dataset["data"][i];
                if (isNaN(Number(row[columns[0]].value)))
                    d.push(i);
                else
                    d.push(row[columns[0]].value);

                d.push(row[columns[c]].value);
                if (row[columns[c]].value != "" && row[columns[c]].value != null && !isNaN(Number(row[columns[c]].value))) {
                    serie.data.push(d);
                    if (valueMin > d[1])
                        valueMin = d[1];
                    if (valueMax < d[1])
                        valueMax = d[1];
                }
            }
            series.push(serie);
            for (let regression in regressionType) {
                if (regression == selectType) {
                    getRegLine(columns[c], serie, selectType, regressionPolynomialOrder);
                    break;
                }
            }
        }
    }

    function appendData(data, parameter, type) {
        let period = (data[data.length - 1][0] - data[0][0]) / (data.length - 1);
        let max = data[data.length - 1][0];
        let data_add = [];
        let i = 1;
        switch (type) {
            case "linear":  //直线
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.gradient * x + parameter.intercept]);
                    i += 1;
                }
                break;
            case "exponential": //指数
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.coefficient * Math.pow(Math.E, x * parameter.index)]);
                    i += 1;
                }
                break;
            case "logarithmic"://对数
                while (i <= forwardPeroids) {
                    let x = max + i * period;
                    data_add.push([x, parameter.gradient * Math.log(x) + parameter.intercept]);
                    i += 1;
                }
                break;
            case "polynomial"://多项式
                while (i <= forwardPeroids) {
                    let value = 0;
                    let x = max + i * period;
                    for (let s = 0; s < parameter.length; s++) {
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
        let myRegression = ecStat.regression(regressionType[type], serie.data, order);
        myRegression.points.sort(function (a, b) {
            return a[0] - b[0];
        });
        //console.log(serie.data);
        //console.log(myRegression.parameter);
        columns_add.push(type + "(" + column + ")");
        let data = appendData(myRegression.points, myRegression.parameter, regressionType[type]);
        let regline = {
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
        };
        setSeriesAnimation(regline, configs, 0);
        series.push(regline);
    }

    init();

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice().concat(columns_add)),
        toolbox: getToolbox(configs, container, dataset, false),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "axis",
            axisPointer: {
                type: configs.axisPointerType.value,
            }
        },
        xAxis: getXAxis(configs, "value", null),
        yAxis: getYAxis(configs, "value", null, "left"),

        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let series = [];
    let columns = [];

    function init() {
        columns = dataset["columns"].reduce(function (tmp, column) {
            tmp.push(column.name);
            return tmp;
        }, []);

        for (let c = 1; c < columns.length; c++) {
            let min = +Infinity;
            let max = -Infinity;
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
            };
            setSeriesAnimation(serie, configs, c);
            for (let i = 0; i < dataset["data"].length; i++) {
                let row = dataset["data"][i];
                serie.data.push({name: row[columns[0]].value, value: row[columns[c]].value});
                if (row[columns[c]].value < min)
                    min = row[columns[c]].value;
                if (row[columns[c]].value > max)
                    max = row[columns[c]].value;

            }
            serie.min = min;
            serie.max = max;
            series.push(serie);
        }

        let top = toPoint(configs.grid_top.value);
        let left = toPoint(configs.grid_left.value);
        let lines = parseInt(series.length / 2 + 0.5);
        let height = parseInt((100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / lines);
        let width = 100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value);

        if (series.length > 1)
            width = 40;
        for (let i = 0; i < series.length; i++) {
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

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            trigger: "item",
            formatter: function (params) {
                return [params.seriesName, params.marker + params.name + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value + "</span>"].join("<br>");
            },
        },
        toolbox: getToolbox(configs, container, dataset, true),
        legend: getLegend(configs, columns.slice(1,columns.length)),

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let legends = [];
    let series = [];

    function init() {
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            let serie = {
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

            };
            setSeriesAnimation(serie, configs, 0);
            for (let c = 0; c < columns.length; c++) {
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

        let groupWith = configs.groupWith.value;
        let lines = parseInt(series.length / groupWith + 0.5);
        let radius = 80 / (lines > groupWith ? lines : groupWith);
        for (let i = 0; i < series.length; i++) {
            series[i].radius = radius + "%";
            let x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
            let y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
            series[i].center = [x + "%", y + "%"];
        }
    }

    init();
    let option = {
        backgroundColor: getBackgroundColor(configs),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: function (param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            }
        },
        title: getTitle(configs),
        legend: getLegend(configs, legends),
        toolbox: getToolbox(configs, container, dataset, true),
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

    let timer;

    function doing() {
        let option = myChart.getOption();
        for (let i = 0; i < option.series.length; i++) {
            if (option.series[i].data.length > 1) {
                let data = option.series[i].data.slice(1);
                data.push(option.series[i].data[0]);
                option.series[i].data = data;
            }
        }

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing, configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer, configs.seriesLoopPlayInterval.value * 1000);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let legends = [];
    let series = [];

    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let serie = {
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
        };
        setSeriesAnimation(serie, configs, c);
        for (let c = 0; c < columns.length; c++) {
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

    let groupWith = configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let radius = 80 / (lines > groupWith ? lines : groupWith);
    for (let i = 0; i < series.length; i++) {
        series[i].radius = radius + "%";
        let x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
        let y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
        series[i].center = [x + "%", y + "%"];
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        title: getTitle(configs),
        legend: getLegend(configs, legends),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: "{b} : {c}%"
        },
        toolbox: getToolbox(configs, container, dataset, true),
        series: series,
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);
    let timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    function doing() {
        let option = myChart.getOption();
        for (let i = 0; i < option.series.length; i++) {
            if (option.series[i].data.length > 1) {
                let data = option.series[i].data.slice(1);
                data.push(option.series[i].data[0]);
                option.series[i].data = data;
            }
        }

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing, configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer, configs.seriesLoopPlayInterval.value * 1000);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let legends = [];
    let seriesgroup = [];
    let index = 0;

    for (let c = 0; c < columns.length; c++) {
        let series = [];
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            if (c == 0) {
                legends.push(r[columns[c]].value);
            } else {
                let serie = {
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
                };
                setSeriesAnimation(serie, configs, c);
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

    let groupWith = configs.groupWith.value;
    for (let g = 0; g < seriesgroup.length; g++) {
        let lines = parseInt(seriesgroup[g].length / groupWith + 0.5);
        let radius = 80 / (lines > groupWith ? lines : groupWith);
        for (let i = 0; i < seriesgroup[g].length; i++) {
            let x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
            let y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
            seriesgroup[g][i].radius = radius + "%";
            seriesgroup[g][i].center = [x + "%", y + "%"];
        }
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        legend: getLegend(configs, legends),
        tooltip: {
            show: configs.tooltipDisplay.value.toBoolean(),
            formatter: "{b} : {c}%"
        },
        toolbox: getToolbox(configs, container, dataset, true),
        series: seriesgroup[index],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    let timer;
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
        timer = setInterval(doing, configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer, configs.seriesLoopPlayInterval.value * 1000);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let series = [];
    let visualMaps = [];
    let calendars = [];
    let rangeMin;
    let rangeMax;

    function init() {
        for (let c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (i == 0) {
                        rangeMin = echarts.format.formatTime("yyyy-MM-dd", r[columns[0]].value);
                        rangeMax = echarts.format.formatTime("yyyy-MM-dd", r[columns[0]].value);
                    } else {
                        rangeMin = echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) < rangeMin ? echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) : rangeMin;
                        rangeMax = echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) > rangeMax ? echarts.format.formatTime("yyyy-MM-dd", r[columns[c]].value) : rangeMax;
                    }
                }
            } else {
                let serie = {
                    name: columns[c],
                    type: configs.calendarType.value, //["heatmap","scatter","effectScatter"]
                    coordinateSystem: "calendar",
                    calendarIndex: c - 1,
                    data: [],
                };
                setSeriesAnimation(serie, configs, c);
                let visualMap = {
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
                let calendar = {
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
                let valueMin = +Infinity;
                let valueMax = -Infinity;
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        serie.data.push([r[columns[0]].value, r[columns[c]].value]);
                        if (Number(r[columns[c]].value) < valueMin)
                            valueMin = Number(r[columns[c]].value);
                        if (Number(r[columns[c]].value) > valueMax)
                            valueMax = Number(r[columns[c]].value);
                    }
                }
                if (configs.calendarType.value == "effectScatter" || configs.calendarType.value == "scatter") {
                    serie.symbolSize = function (val) {
                        let value = val[1] / (valueMax / configs.scatterSymbolSize.value);
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
            let width = (80 - 15 * calendars.length) / calendars.length;
            for (let i = 0; i < calendars.length; i++) {
                calendars[i].top = "15%";
                calendars[i].left = (15 * (i + 1) + width * i) + "%";
                visualMaps[i].left = containerWidth * (15 * (i + 1) + width * i) / 100 - 40;
                calendars[i].width = width + "%";
                visualMaps[i].itemHeight = containerWidth * width / 100;
                calendars[i].bottom = "10%";
                visualMaps[i].top = "90%";
                visualMaps[i].orient = "horizontal";
            }
        } else {
            let height = (95 - 10 * calendars.length) / calendars.length;
            for (let i = 0; i < calendars.length; i++) {
                calendars[i].top = (10 * (i + 1) + height * i) + "%";
                visualMaps[i].top = containerHeight * (10 * (i + 1) + height * i) / 100 - 10;
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
    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (param) {
            let date = echarts.format.formatTime("yyyy-MM-dd", param.value[0]);
            return [param.seriesName, param.marker + "&ensp;" + date + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value[1] + "</span>"].join("<br>");
        }),
        toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let series = [];
    let index = 0;

    let getMapRegions = function (name) {
        let Regions = {};
        let features = echarts.getMap(name).geoJson.features;
        for (let i = 0; i < features.length; i++) {
            Regions[features[i].properties.name] = features[i].properties.cp;
        }
        return Regions;
    };
    geoCoordMap.Region = getMapRegions("china");

    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
            if (c > 0) {
                let data = [];
                let min = +Infinity;
                let max = -Infinity;
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (Number(r[columns[c]].value) < min)
                            min = Number(r[columns[c]].value);
                        if (Number(r[columns[c]].value) > max)
                            max = Number(r[columns[c]].value);
                    }
                }
                series.push({name: columns[c], data: data, min: min, max: max});
            }
        }
    }

    init();

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        tooltip: getTooltip(configs, "item", function (params) {
            return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
        }),
        visualMap: getVisualMap(configs, series[index].min, series[index].max),
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
                //    let value = val[2] / (series[index].max / configs.scatterSymbolSize.value);
                //    return value < 5 ? 5 : value;
                //},
                symbolSize: function (data) {
                    let size = configs.geoScatterSymbolSize.value.value.toArray([6, 18], ",");
                    if (size[0] > size[1]) {
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return (size[0] == size[1] || series[index].max == series[index].min) ? size[0] : (data[2] - series[index].min) * (size[1] - size[0]) / (series[index].max - series[index].min) + size[0];
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
    };
    setSeriesAnimation(option, configs, 0);

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    let timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    function doing() {
        let option = myChart.getOption();
        if (index < (series.length - 1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = getVisualMap(configs, series[index].min, series[index].max);
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
        timer = setInterval(doing, configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer, configs.seriesLoopPlayInterval.value * 1000);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let series = [];
    let index = 0;

    let getMapRegions = function (name) {
        let Regions = {};
        try {
            let features = echarts.getMap(name).geoJson.features;
            for (let i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
        } catch (e) {
            console.log(e);
        }
        return Regions;
    };

    geoCoordMap.Region = getMapRegions(geoCoordMap.LocalMap);

    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
            if (c > 0) {
                let data = [];
                let min = +Infinity;
                let max = -Infinity;
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (Number(r[columns[c]].value) < min)
                            min = Number(r[columns[c]].value);
                        if (Number(r[columns[c]].value) > max)
                            max = Number(r[columns[c]].value);
                    }
                }
                series.push({name: columns[c], data: data, min: min, max: max});
            }
        }
    }

    init();

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        tooltip: getTooltip(configs, "item", function (params) {
            return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
        }),
        visualMap: getVisualMap(configs, series[index].min, series[index].max),
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
                //    let value = val[2] / (series[index].max / configs.scatterSymbolSize.value);
                //    return value<5?5:value;
                //},
                symbolSize: function (data) {
                    let size = configs.geoScatterSymbolSize.value.toArray([6, 18], ",");
                    if (size[0] > size[1]) {
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return size[0] == size[1] || series[index].max == series[index].min ? size[0] : (data[2] - series[index].min) * (size[1] - size[0]) / (series[index].max - series[index].min) + size[0];
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
    };
    setSeriesAnimation(option, configs, 0);

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    let timer;
    myChart.on("mouseover", function (params) {
        stopTimer();
    });
    myChart.on("mouseout", function (params) {
        startTimer();
    });

    function doing() {
        let option = myChart.getOption();
        if (index < (series.length - 1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = getVisualMap(configs, series[index].min, series[index].max);
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

    setTimeout(startTimer, configs.seriesLoopPlayInterval.value * 1000);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let rows = [];
    let valueMin = +Infinity;
    let valueMax = -Infinity;
    let series = [];
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            let data = [];
            let serie = {
                name: columns[c],
                type: "bar3D",
                //stack: 'stack',
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
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value * 1.2,
                        }
                    },
                    //itemStyle: {}
                },
            };
            setSeriesAnimation(serie, configs, c);
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax < r[columns[c]].value)
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

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", function (params) {
            return rows[params.value[0]] + "<br>" + params.marker + columns[params.value[1] + 1] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
        }),
        //toolbox: getToolbox(configs, container, dataset, true),
        visualMap: getVisualMap(configs, valueMin, valueMax),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let rows = [];
    let series = [];
    let valueMin = +Infinity;
    let valueMax = -Infinity;

    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            let serie = {
                name: columns[c],
                type: "line3D",
                data: [],
                smooth: configs.lineSmooth.value.toBoolean(),
                lineStyle: {
                    opacity: configs.ItemStyleOpacityFor3D.value,
                    width: configs.lineStyleWidth.value,
                },
                itemStyle: {},
                label: {
                    show: configs.LabelOf3DDisplay.value.toBoolean(),
                    textStyle: {
                        color: configs.label3DTextColor.value,
                        fontSize: configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value * 1.2,
                        }
                    },
                    //itemStyle: {}
                },
            };
            setSeriesAnimation(serie, configs, c);
            let data = [];
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax < r[columns[c]].value)
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

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", function (params) {
            return rows[params.value[0]] + "<br>" + params.marker + columns[params.value[1] + 1] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
        }),
        //toolbox: getToolbox(configs, container, dataset, true),
        visualMap: getVisualMap(configs, valueMin, valueMax),

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

function getScatter3D(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let rows = [];
    let series = [];
    let valueMin = +Infinity;
    let valueMax = -Infinity;

    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            let serie = {
                name: columns[c],
                type: "scatter3D",
                data: [],
                symbolSize: function (data) {
                    let size = configs.scatterSymbolSizeFor3D.value.toArray([6, 18], ",");
                    if (size[0] > size[1]) {
                        let tmp = size[1];
                        size[1] = size[0];
                        size[0] = tmp;
                    }
                    return size[0] == size[1] || valueMax == valueMin ? size[0] : (data[2] - valueMin) * (size[1] - size[0]) / (valueMax - valueMin) + size[0];
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
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        show: configs.LabelOf3DDisplay.value.toBoolean(),
                        textStyle: {
                            fontSize: configs.label3DFontSize.value * 1.2,
                        }
                    },
                    //itemStyle: {}
                },
            };
            setSeriesAnimation(serie, configs, c);
            let data = [];
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax < r[columns[c]].value)
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

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", function (params) {
            return rows[params.value[0]] + "<br>" + params.marker + columns[params.value[1] + 1] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
        }),
        //toolbox: getToolbox(configs, container, dataset, true),
        visualMap: getVisualMap(configs, valueMin, valueMax),

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

function getCategoryLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let times = [];
    let options = [];

    for (let i = 0; i < dataset["data"].length; i++) {
        let opt = {
            series: []
        };
        let row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        let data = [];
        for (let c = 1; c < columns.length; c++) {
            data.push({name: columns[c], value: row[columns[c]].value});
        }
        let serie = {
            name: row[columns[0]].value,
            data: data,
        };
        setSeriesAnimation(serie, configs, 0);
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
                serie.label = getPieRichText(colors);
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

    let option = {
        baseOption: {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            grid: getGrid(configs),
            title: getTitle(configs),
            timeline: getTimeline(configs, times),
            tooltip: getTooltip(configs, "item", null),
            toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    if (columns.length != 3)
        alert("迁徙数据结构:[源城市,目标城市,相关信息].");

    let seriedata = [];
    let option = {};

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
        for (let i = 0; i < dataset["data"].length; i++) {
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

        let getMapRegions = function (name) {
            let Regions = {};
            let features = echarts.getMap(name).geoJson.features;
            for (let i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
            return Regions;
        };
        geoCoordMap.Region = getMapRegions("china");

        let convertToLine = function (data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
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

        let convertToPoint = function (data) {
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

            for (let i = 0; i < data[1].length; i++) {
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
                            res.push({
                                name: item[1].city + "(" + coord + ")",
                                value: toCity,
                                details: item[1].value
                            });
                            break;
                        }
                    }
                }
            }
            return res;
        };

        let series = [];
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

        option = {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            grid: getGrid(configs),
            title: getTitle(configs),
            toolbox: getToolbox(configs, container, dataset, true),
            tooltip: getTooltip(configs, "axis", function (params) {
                if (params.seriesType == "lines")
                    return params.data.fromName + "<span style='color:" + params.color + "'> ↣ </span>" + params.data.toName + "<br>" + params.marker + "&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.data.details + "</span>";
                //仅标注线提示;因点会重复,不标注点提示
                //else
                //return params.seriesName + " ↣ " + params.name + ":<br>" + params.data.details;
            }),
            legend: getLegend(configs, getSerieNames(seriedata)),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let times = [];
    let options = [];

    for (let i = 0; i < dataset["data"].length; i++) {
        let opt = {
            series: []
        };
        let row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        for (let c = 1; c < columns.length; c++) {
            let serie = {
                name: row[columns[0]].value,
                type: "gauge",
                dimensions: [columns[c]],
                title: {
                    fontWeight: "bolder",
                    fontSize: configs.gaugeTitleFontSize.value,
                    color: configs.gaugeTitleColor.value,
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
                    width: configs.gaugeAxisLineWidth.value / 1,
                    itemStyle: {
                        opacity: 0.5
                    }
                },
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 10,
                        color: [[0.2, colors[2]], [0.8, colors[1]], [1, colors[0]]]
                        //color: [[0.2, "#3CB371"], [0.8, "#6388ae"], [1, "#DB7093"]]
                        //默认[[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]]
                    }
                },
                axisLabel: {
                    fontSize: configs.gaugeAxisLabelFontSize.value,
                    color: colors[3],
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
                        color: colors[3],
                    }
                },
                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    width: 5,
                    length: '90%',
                    offsetCenter: [0, '8%'],
                },
                detail: {
                    color: configs.gaugeTitleColor.value,
                    formatter: ["{value}", ""].join("\n"),
                    fontSize: configs.gaugeLabelFontSize.value,
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowBlur: 10,
                },
                data: [],
                //animation: configs.animation.value.toBoolean(),
                //animationThreshold: Number(configs.animationThreshold.value),
                //animationEasing: getAnimationEasing(configs),
                //animationEasingUpdate: getAnimationEasingUpdate(configs),
            };
            setSeriesAnimation(serie, configs, -1);
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

    let option = {
        baseOption: {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            title: getTitle(configs),
            timeline: getTimeline(configs, times),
            tooltip: getTooltip(configs, "item", function (params) {
                return [params.seriesName, params.marker + params.dimensionNames[0] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.data.value + "</span>"].join("<br>");
            }),

            toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    //const backImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAIAAABBat1dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTcxRURGQkNGRjA0MTFFQUE4MEJBNzBFN0ZBRUI3Q0QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTcxRURGQkJGRjA0MTFFQUE4MEJBNzBFN0ZBRUI3Q0QiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVENERFN0QwRkJFNjExRUE5MDBGQzgxQTNBMTVBQUY5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVENERFN0QxRkJFNjExRUE5MDBGQzgxQTNBMTVBQUY5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jVM/GQAAwNtJREFUeNqcvYuWI7luLEpmSqrq8Wy/tu3l//+os+4X3HP92H6d7emqkjJ5SQIMBEBKNT61vdo91VVSKpMEgUAgIv+v//X/lFT+8z//87Jffv3DrymlUkrO+TzPbdv+5V/+5Q9/+MP723v9mfpP9fvyr6n9d/vL//k/fy7l/Ms//GXK6Z//+Z//9m//eNn39k8pf35+/vbbb3/zt38jLyW/+O///u/Xy/XXX3+tP/+v//qv9cXf3t70Teu32nskvHj9r//+7//++Pnxx7/7Y/2B1L/0GlL73//+f//3P/zDP+yXvf7CWc76gn//939vF0mfpb7vr7/+4Xa71p+s3/nTv/2pXsPb7a2+CH74v/7rv3Lefv31L+Rd/uWf/+UPf9k+u15V+BoX2a7w4+Nv//Zv5X3/+Z/+uV5S/fnjOP/93/7t7//h7/GT4araHc3pn/6/f/q7v/+7en/+6Z/+6R//8R9xK9qfW//hU/9Sf/63n/Xrtz/+8Y/ncW779q//+qdffvnxyy+/yEvh9etX/YH6GevdsBdM5fF4/Md//Ef9prwmbmm9OX/xF39xu97qMrher3/x61/IP8mrfX191d+qH4pfH5/iP/7jP/d9q89RLsl+EZfU31o+fl1O9UbVlSb/VBfM3/3d3+11wfTf+tOf/vTXf/3Xl8tFXly+8zd//Tf1+bYX37b/+M//vN1u9SPXB5r7V33if/VXfyW/omuDblf9X734ukT/+Mf2dP785z/XNVnvHn+Q+/1e30Xu/NZ/JdULqj/X/jp+Th/bWfDx9Pt+XdSdMN53fEP+ltP9ccctK+Pb9QUfx0OutX7Vx9P+0hdoe+F+j1K2d6k7p71O/4H6TXxfXk4fZ7/v9Qbpr5aEf8LP15uif8v6w/omRV+ufudxf5T2Iu1b7dXqxR5nevbVf7/+8L7t9VNgrdc9OW5g+vz67LfPrSF39/qTq/+rr9De8bRr1idK+7C+0nke9YfxzfqqegPDy/Y3xT2nn9/kLfCa8lg/Pz7b/9ta/GqRhV6n3oG6XLBtVh/hPI6D3mK67B4Z5SnLItanXNqOLSXhI9vTTPoc688f5yF3o96dn7/9Jv9cN4b9Sn/oujZKsk3eH2597qU/kfZ8+2OSK8EbSZiWdb7JB6gb7vPri9e5hn/54vud6XJ7BNId2faFRnf5s95E3CBeDY/HISuyLYJ72xhnOXH33a0s6Xq7Ho+jfhL3CNPY+n35y+W1RzL+E7dGXrO+UX2R+rHxtOoPa9xNFrrqfa9LoS3O/lXjzXE+3wxJt+7lemkrcnzVX28fp+gDw1EQ91HSPdl+t/2lbSrEAnsQJbydPhd5hRrFv77ueDpTnIoreOtLCg8Xt6iGp23bJTa1KCvLq3/VYF+/Xw+NFzehrYES3x1rDpFN3lQ3c//PHpJcaLDFNhYAbmBbtSnVy9P9nPzilEhK96utmX6H5RPVX6/X2T5I1kAjvy1X1Tb8WTa51hqAZXe4reNCvn8244HVBYSF3v6+WarTw8CWkwsV9ebi89eVJ0uBH56+Wl/oEmXrx8AhU/gG+5tf1/c4fezW6PXn9r6yGZBF4KmMlZnrN+vywj2qP//o7/v0qz8qude4M/UTy06rX3K+xzVNu7r+pATLGl/r4YzPjj/57vd/LfKh5Cff3t7v9y+JRHGJjkSF313Wn9xniajy9/rW9fbUi6l3qX2ccUTLv9Y48uxkS211XuWl7J4g3eUzvC319t6Wd+TkDsCUwhEqP6N7pn+cmoHXhRo/WpmiJGVx9XfbM+2fpp4S20jJ9Kf7U64B96vexrogUAy0Z9/jdF3T2AM553WUGv+pFzoeLRac/H69ybjj8sM1/rXP36+uhV45YZM/QIpeqISuWlTUpHwOSCGV5yvhxSp/qXmqLFC+U+EF68W0C8YBWs+T43y5F8ajrbfu0CMYiaV8xnaXU+ZHzmv9cRwSdO+PBz8kPR/GbZBzXF6cc8VaAvVMoyyTOJy3fIfldexw6MtFDiU8Pr5+F2XWm2EP53bIJBH1+/lZwo/pU8jx3MA3jx626l/qHdabnCkly5aq4Bqww+ufmgH2H+2nxB43bZIF9pk1chf5VJdWNuABhHdYFpBJk299WvST8rIXWlt6GtT4h2d5vdmpTce6nft9Hby/v9uFzRdTLGtqz5JjxrhlvL31jbL7WPoRUukJvK7dXpeX9PJLwmeNq/ev+zgeT4SrdrKfRQ5ry4xHpKz/O2p+0vOQmhsrclAMqOBbgUCO8NQ2Ro9hLR31ewzRQY9StxMt6UUiIXmdBCYcCIgdfc9vT7Oktl6POUnjR6BJ/3HKApW3kHePr7ZlVz+MB8x5F9KkcEvjBhs7up4M+qNbrn/Hh0IRUGuER6+LNoTY6/VWw1g4uWIwznH/9ZJlk7z/0lEd/PBjPGl5QTl8ZGlKzKjZ9tm/7OpLzJLrP9VTrJUZvpagnWOhtEY4LdemQ7M9MDriUIFhidTVLLVUGod6PZG5GFjmSHLB+35RVKCdJ7nnA2eP3Df5fljZeFMJxhJQWlDM6+MXZybDUPKfb2+3Gimk7JnrGRxfhsX5GCBZkPy9ZhE1IHKBp6u2HY/l+WbYzrM8K+IND+jPveFIFH0k5ON356NMbrLsnLbArpeQurs3Lu65yKvVt6gboBXitfLstc3Zo1WmLykk+mYYt7vuWrkv7UJHKaxRLJRlbr3mvS/x+v2rpI+MFKUR4Ua8EYCPU7rzLG6zZd3ZOHzbIZ5GqeQz6eyXj1Us408BhZB34hqsfigo6x+yFHBtbRMejxc5EpZaQ5PP8cr7htOy3tKPnx/1nzT7mr7qT9YN01OagnwVUX8+leWIQ+TuUe2tHUrZTo+nR+gUTWQfSnJY366+Tr0Ydzj0Y6j+GLDL+Wtvd7Jgc/KpjrAtXw2s85chsRI/MJ6wgwEFIdz6AShgXa+kC6JnKYuzSB5xfcFabTZkP2tQ1uMuuypfFsb9/ti0WjrLjx/veuCiMM+WWbptkO1p5Z5OSCYKVBG457bZO8tL1ZXdYR8EtrfPzw8XaEccVcyrPzN5VJKCtvJ0hGTrTqR1YSOLvn1Oqp4bstTDsGLS/VdqfG2bYTOAvx9l+zmybF3uAVrrn7c+1M+vT8QUnGk1EAqoAJwXoV2eiV5Y/wRymgek3J2ZwBi2LOGt/m5dvjWicxlQBtzo2jLjnxrYdVpq2orGXry1xXo85OIRsCVbPvsjmPEifPZ6MIbzHOtS3lo2Z3199JQs2NFFygfXUGiQfZGIJzFUMk+Jbi3Ha1d3aqqfY87SioS6Onvjqy4b29LILLLerno4fHz83HDdbc1tlmDkgVTp4y/+5m7Ws9AolWImt3UEJ8Cy9YLk8ctnbnvjcbRPlMocCHH36+epKZxukrwx1IBYaEvnSWobzjdLvsfR4W5WEkypPYM8XVbIN1D2KYx7nPKv9VgHEK6oADUWpUtTV5LrZE0lJieo8vp8GfVRnz5NedYRktulaeR4tbqYuFOh6fX85i9ubCtMD2yw5YkkCXp90FJDKih/FiulZM8BLA24kNRdRztF5/aibX5GifQtTpwzvVtizx2tD9l+9Um1wMRIYv3pdpYNKKPfOJ/8TZ/0tK6qdUCKdkYyp+byr3oynvoWNRWpB5lVS8UXQOPt6l2QU9ISCbmuTCkyPeb5i2EKgfm4X9HxnHtN88I+rJtQkhBccECKB25LGMWWGyDbH1gHarVOtd1O+W59WAPf8OhWiWg9rjtUdO1YTi0DmXe7JVR0U1oKt2UGsuvZtXVUQ4gCVhNS7f5qM/Rzz6X7lMoaXaBDZ/VxG8mgnBaek6IXM/psYfdxlxMM6FBopwRgXbtJIwydLe4YXKT7R06Gs50MNUPRBtO4NSlkyRbys1usclT1o2cfEMHJZeIy60X9IJlS/YG321t7kFueUVGOdj0ZuPfVc/JlGDbP+EOZsSZaQ9LBIERiADuH1GcciVtXq4MKtiDyIkPdmYaQsgCyUqXUaHD3zQoDc3ph2u5ecVmig/JyPB/0YBzRVC7yY6SaRAQoIU4PlIbeqIfyjsRfZOfoZijJZ+3rAiZgcW6fl4Jlh7y6lJNrD3vZkYC1HtRq1+l+63vVHvdoRVu6VfyWkG7SyE3qQ5EWSmidSev9/cd7+/jaxO1hu4bG81TwQQLtYrMWV57i85we8EJzB7cGiU37ACMRr+vPWg1Pmk3yvEuvSsf5VgyFJOwI7WQ+LhQo2DbfQTd8U6Kjts98eHsKKBVHNNAUVsv9jbdjfc2W06++aqSU21vSKkssi8WHlkW2NDb9+PGjlunzTeO8FyVH9sG+lQqPR02sZd0wtoPFLfXJeicUrYPl4zvMOrsFUyPC5vHZ+rPSr5RnZOeS34pIwKS2Aayst3e/KNgzIcitvDzPenIOPsSXRG1LsMenkwOkLZI///nPaHa01HxUY3JF/fpi6omor01F3U6nRaJx+iyea+dBYYX1QjZ/DZCe4X9OSKQGagX6lrHulcyDgJQbkr18ZqC+ObYMoX71erjCxnJpZJBxiC3ajkjP+ltrr2e0deT5tTPt84ubIXhyj/udiUCvW93+iVgLRfow934/Ayq6Tc2BxjhA4lrsnNwvl7ZYtz1Sb1LizHsdETpoJjjkghgy4vDn5+e1sySNxHG6FqemNGkRua1jO1A7PPT21h2pD88UvClp+8p1MgWQQ4YUsfU2bp12WsZxv9cN5KD6LdtnDOBuabFt3zbKUiwZPYXc4Tvz+ABSAMhPNlrUx0c4Z0OdKhjIA23avia0QTaSik06GOvWmHs1BgDkdwVi5/YFnUilnRur58Q3FEnzvu2oCwXDvvcSAmxcRPS7EIF86TKX+6MAd5Arn4oNBPOtKPTaHNer5c1FFkfoS1z6E9n3/fRcLKCCT0ux8fElFeT4FVorNSK8de4zsqMQgJiLwHmvAFl2PgCAHuCsHd30eeUOKFdorF49+UsManI9v/766waksnPOrrK+Qo/GFkFOuL4OVz3qdte0So7ggsLAsV/4DJVDGZ/27abNvkVooUBy2Uc/SJP+xmc8wPwpemS9Cq0UC8FCl2uodQvWJXdAQUB8sRgkmcQvyimBVWX0pOR6RT2jPRiHXey0kkLSwiRwkFbkiQjNifNYRvqxvtCK0YSTCEjXXv+96k48gelanjk6d4ETiqVWa9HbWCoAuBOT9hmimBhAZ8v4r9Jw4Ha+MMqWkVpJx+O2tmK4eGiO+hv168f7j60lLcdDgqVSgqkjJlWyNDuYL6A0z0YF3UGY2TtNRSrCVi3tF+4w4CnWo0AKPvnOe+9vLOFLY550GKrTcZWmpkyHwcOTsyJU/65EoxQubmx5VNKGHOk78Ox6ONQj3iJxQJZK5Hds/X4iX+9pbpYzTdfnOKY+vz4FyjT65NhL/Mxs9XdWfO6dAXQntEzft58/f6IC6WuOCE6B3FEsjrYLE+Cy93cdG2DcQAU0n381CKXveUcWygnk6rZRj7M1GQj+7vDOjohTf0JoWtif3EXtvbNDAFYlCgzKMLeGQvu1AXodv+rdCE2TcD8NmBroVI3xpa3FLdsRX2z5Sj7NuAS/VidO0ZmVqVPBtO3i4+i+MY9rG2yObxsFepJa9976JlL2hL6yg0HLKs7187feJkkSAn9LASUZqPCc2RlEp+uUlrnGs7adeg0dYr88bzuOxqcro8O1Pir7688k37qpWkSTJCRQVQNHerR0NNKdh6Tynx+fOPPDIbYsJGKa1CFB/kGU+LLlZILHuCH9PgusbIFgI9Jef6xgfPXbsofkGeWKARgToLINekSrpEcKM48V6Adp9/ExHgOueFOKf0fNHzNLVMl8JxX4abQPi9udmp7SZ0B2jhhc1/G99epf3fF6nXJG2TlYTq4R5XVeMUwjA6znN5sWHppQhgq+pNvbW813HUaZaXwkL1YGjnLZrnW11bAdEhjJ6AQ4l6ggYx4G7s2JSoklMjbDrSPUfOKFXYdgrLXN+J5Ggf7QFCIP3etUvi3u+3jTnbPzcFs+Pj60w0CASutvyAhHvxXoI4E5K5RqbUgfSjg1GDcpfz50st2gxSBiaNU3EWZjMd0Bk8fYZxuHJVzZgpuU0yDnXQzqKq7qWoYn5QU1LOWB4my/XD47SfvFRFWN0A6E7YtDBj7lmWHmMJbsfc1IDW1zPxgNORWVUrx/StXe3m4SdB1sX55Q1wRmLTr8tXWuh3QMwxkiKSz3Flxh8/zWLQ7P9hZKo/IbPocXQfMBEdpqm32fCwZlUuT8upDAnQ/tc5BH6maoOZK+NRXQOTmYHicqYg2qRFBFwvyZXKDwHV2YS2OEq/+6FFTIi4xj6vfHBtaHTjYNRpAir41TsXNJRI2F0wYYqCIB/GpIf4rQdX1NIfprDf32VqsIB3Kvbr0Gv5FtKGdr3NzGg1iiSTlpz3q6DOAYOJfnFp48A4MsSgqfi2cOcQck75eOTw3bAkDrwVU0JIOmJhMRiZA3g01ocStNa+Lklt650zZw5vNnkSYBasQrtL57XS6Ph7XzVkT99aPJOAx3Bzr5Gro+OKUA+jwTCTPCPGqzsYhPOR/qsSlbxeXe2qxMi17QKMoH6TNCIMuwu3EGL2HypDUhUZzBVjvoJahTOAkzyniReZUrvWyAIe9vbzxH+ywxHetG36WRmjgNzzRYk2JSFwZWNNKPPFDw/jLzc0dnp/UKkmMZLGqGsRDbQ012JXK+g0Mu368fX9bH4H1siScZlt2Ss7i1Gtg4qDpCicY8diJRa2H6dW8JDPHtY+OvX5SCRU/2gxbu82VnJQW1vbLvvBhkY+uQ4AhJdu6NvGMDbw9DlMVFAelB9ZVQwjLTukSiR6dUc6+Ju5auZkB/QIr6ROTkPvr4sL4v45hFc27ErTB2FGYsGAx+e3+TRpuEwMaDKN+MF0r4wf5pnI4+QQsQpndnN4eUT81ULWyou1m/WkmQPS3ML/dbnxngQuJZBJXLM8C+YHvseIUQLIU2K5gev+88tiIMTTdNAcZ/asUbKHc83snhoEH7PaXBUXYfpa0g17y7sJ7qinzWwEGAP3DxxY5NubCPnx/1BrYN407jSFnV85lS8d4mu6LalAKaOXloayrbOjzrvt/QpmjxLi9YC3GNjTZy4ZWNX+MxZaNVtat/YJZKc8HkmN68EUOW1avhB95LYavnwwMji7OEwRgHhCSAIxQH8HNe8p4Et05+4J05Z/JzvXH2cOT25EQr3KfsHx/MOX2F203x2WKz4xwXpVHgrnbChJjmOR9iLUAe1ipuhzzPrPYlchxnOHn2TgdqfNLrBX1Pt4tyFpr360ejwhOztkNpvWeMSaD8FaKroLqCJtfdCBKnBN+em1nLcSN+IaiWjVh1uXLKzSCY9H+MR1imYz8HNmfOAvNjHkVuGUr71iMjfgjOqfrw2mBKJrBo/IoNvozxm+wQyyyHNcRRhKSksbOsxudzcmFDu0WnpDfytGShtbEHVivJGAFx9G+ti/r9/fz6VB7/tqFIYPTt/cf7sVJkkZCzMRmpGGquB33WzXYXwACVaxcf0Ick/Pm8uakJbsNrsXswx47hLDk2dTJk3KIGCZ7FjbP3AU7DSLLuopBM4qnJTd1bhztz428u8Tsm+WDERdH5Wj1/fvzyyy9yJmOH18UjE5jyeU1KImliw3id0HKlZrA4mDeZI9WTIbsOhqP3b9YTxNm17Klv3I0aOYADH+fB+cCPdTlcaFa/7NS0ecWRtLTl8vVKikJ6N5gUEfhSsayEgyIzN9vaN30kyB0a6HpKCNm37w6lenAdDiKjg+48jI8pHBh0o5FoHV0ZCT8vKaiuy8ENW4LlfAeAt8xfmnQB3hAJn0FXwWlw7cxcWS4yDCmHErRIcPQpp7qVBH0YILmed4BurUFBSaYUvnWXQtvBVtnoG2qO9DAahJbFvYJ1Q1E9n2TCpXQ29NkVAqDHMAPupwi1LLKDMm8GSnlX4a/w61rW+3hEMK54/ObljpDOLtKG3jY6XqBJnEhog/3+cGxk2SHHGYc8svGFkNNrh3gcHcuhFpcqdArjPMqsKkyNc2YdAxm6teWCbszAUltCONR0qEWTJCN1NC2quQU1eh5cjKVjUwS+fmu1bF8T2ugcz7RNkxJqYoy3cXS07irnZiWiqMJTnukknx8fdfs5LvnofGeiU2P0lKf15aq4ALD2HGa5ip7kFuwGXV9E5WwoalsNPIU1liBFFlQlmPA0Wr+2v2WY4XrBeuo3Kz2DL+ev96b5cwdO1WH+bxLTUtyeFhoWZ/CXPphvNRYYDaOHODKZjTPL3v3ZXjNGb9frF9fQvuPWV1VhYumdOIWDR9hlLIqOc6BZybsdynzLEDNP9jwLFgoAbrkkS2vlfa0bI1ORvVSwQZ8J0xPKwzfDDH3VyQ63yaF+/3/+/FkftFM6GtiRMJHRddn3S+ghdI7tbljOqqMKRSKlt5VAVZ7Yvr4RMdcMsWLLFEs6e8LTTohz63DVHJf/M44nModHPxzBfLb+6LMWMndhe7wPaQMLMVmj+rRbOQ5xxsRKlOtZfb29vX3dv2zUzicJUtoyn/QkMQ4BUkSpCjkbc+uHzs8loiIeswZ59llTMo8+xhCw2QMkVdeWpHPaIB8N2n6Ltmc9taY5ElqB2eXG7cgCjudx3fqR397fHC2q6DEC1RYRtNv3WKb3UcHL4EZsMcLSSatZxsQepww/u83wZDxjy0M8KfSPNWC0qeXdqLAAzkbtCA3gyNd43UFTncBTufL9sJPc8UWEhuQZZY1O8YU3Q/Y9LJYuRdGP6fsXEVdeoSX9YEbl2OEu0FfV4e+NxV3kjrU670vrPElXQoVwu12lyJ64tgVFWnpZVFnpTEgGzt6AZrY9+TjOoUPaGx2JdY0gRSrDKgiIXHRht2u/bAi06Ot3FIFTUPssNQ4O6FJSfy20iFmsLV1thm4zgULRiFTq4aMTVNkhswh2v2dBSprkIO25/Y5ZHB4pXJM1SpT7e11FNwTp4xNLvM05vJBzpBZJA6HO0tuTLlY6Rn52okOsFqM6PD3HfY3nEuP/YtPMxQ8t9UoUj1xpTjk+gIYACuu2Q0n1s7seU1G4+RUJ6Hw1iyxzlTYiQ7JOvJdYGgMnwwj/a81WWe64UY6TT0nIjDJ9faoQExJslAR9obsD1vLGDCD4oDcqz1ZUfWXJMmaOIHPBOaM2HbfwMSOJKKchvJsJRT4Yl5U9tw2OW2w8PbmhM8dJdSPHowI89+1qGNPup4qU0ShS4KVZMTqWsqMrZrcgnl2n9USFH3/GiTktkZ2kaQn5t2QLWA2crsjD68faGSKfOyL6An8aKzZpQmuq2dtzJnUrN+wiyMGICFIPiERAlu+fhXmjaGvUJHYxfEPBEYAVTg+R1pTZNDfZUuzzKtjVedMYknGrmckXni/DK7a/yxnItcWDVy/iSESTAMFG9LCkt9tbzjbiLcloP8V0dAG3TLh3CMkH2OB5MdguRPmvXlNKUHcl4Fw+yvueeoYgoeLVs/ecGP/Eqio9HTciwBCKs+GEZ9w7NPXe2hjG51mGC8Hg5KWhl8MKkBbjCexS9af+52W/ACiU129ni2gHZSeaJDDO4N97uteMb47OqUbTYrpJIjfPPH7RjdTecPFqI0V1ByWC6Dyw16hl/LdWI2Cs4CN//Pz48eMHVJ4sVBVVv0VThQWE0H3S2RiqPm3kK1snQC6pIfVfn44zlpMja03H2pw49XHKDkuxiFoas5ECSoj0ojGOiuq/Q28jRjJNHl4J1koj/RAIYsgWPe6PZ2Vc67BcVLRY7o6qbpFAvRwFdWkykCr/1rm+ByoiGzk4zxdycdhUjeJ22VXyegozM+hp1GJPYeQLMymXEYbqW+jkw1kiVK00yv31XIENe4w3UrS+g2/oW435/ZSzNbYcLTe79eeEEVYavHkWvOrz+MICVOXM8f36Ug+RZ9Vmop9lzRknBqaW1yMV2UY9m+bQ191+bJpL+T3ZytbpzScgGsQM2vTKBuUkTMspX6oyQM4siRc1NHL3Ds/fTiY4TVL4TCVo8uJ5M9XKERr3/QI2KysA1JvFMt0tuus0oKNFPINWpRKQzsbcyRdSAGuroJS3u7RlqEjIbNos5QKIsJDabkkWdPaXzUHL+4s9IOnuqVNBh/wx+HHCTsA7XbjsIGtHT+LUPK5twGX2a7QRqbTLbnhrptiRQYk9wObgvqE0BJ3w5CplkL/UIyiwv2Kb2SvXrzvQgb2j+3LM7sgRaeVRtrsmIhzPimlZqd9K3In0t9yvrWdjz3DVRDZCEl3G9nUne71WJ/BBQjXg6sAVptcqj29HWBRV2y8Ilo78mDSohzGAmV5ft+oDhK7ksDudDr9cRV8Q9jxOVPR8NZgvJ7kdCIMxblj+ozuSUK/mHMp/Ime25KUCuzwgGLMaaZofdHtAm9fCHZUPpNM0kJ12UAODkaabUNbl9zgFmHOHWn/eZcAor8NZnFJcQqvnack313PMVtf+YnJNEwsG2W+GbBS61ysMlEM8+3lqm+nHSiUkOtNciih5M8VCWYZU0QzC/A1mPl5DlgmSssnZZOAADDsKiS9viQZSH051PLA23tHN8BOFoDR/d86ng3VU9y3QqBraVk6XSkFT9bTZ+cCnkcEpaY092wBz11IFR5Jn1/ZbfadoJU1PRRf8x9Y5XvAIJn44z/rpRAclLNznsszzeZNB0STku/wI2YvNdF8KWVQlaoENkXdwV+WjvISTNPeAfmNjEaf81HpjJFSa3jwOnnjGwSfWO84NCGnbYfZz2m0t66g2AzW6kob3Aq9XMM+zZ7PghxGWOj6rU3XsYQd4p64J4ZyxxjM/+2+Ar46uutSFfHRkGlvSdxwI25Akc7ZJOTLwe4W6LdTQyqqtVHQz9KmmU+pmowX06kUGjFVeG7k+wQNDoSK7NtFMni928S3L+Pq0oWDHRzfrlhl+oM0A1YCUTQCYNm7vL+4ym8I+F2FcQZ8ueTxuYbpgFXFbID9UeLh+YOlDz4g19Hbo0L/LCJ6tKjGV25p9mzJVSPj1dr1J69DU88eH/T01Qxp6Z+zzIPtKDNE455Z6XWcAsktj6q/fx0wZjyIBhpfF4XIGn629oqsQf5tPeKFz8w10whmKwXsdrmKfEHesXZjXA2ciU2Af1NvSWEmzsJdy2q0T58R2x7ur5q+nD4dUx+hSZSi6f3yGtj1HisWVBDoGCy0Vj18g4na7kIdj+Yr2Ok1LxGGUfhNebAYMNuCcFRmyQErH3Rc+D9c2t7c35rFJ/GjBr/E0dvTF1UNI4J1i40S4VE0entNAgIGKflugY/ROfOaiU1//LMwrFjTo7MOyieBsqKsLTaNpo8sEbFoRAkr6viUSnE4zcLY0d0gpTyNoddWWmrf39LjdG6g06hblx+WIDuZr7+/vPDOcxgj/uNV5UbhPvd26luCp6TLt8kTAc1FAE8mixlRhAoc4JDEsWHdhQBt1dkN4tg3P7Hg8XuD3Kpp76VM+duAcXMPokMcgO0heqETRx2hhFtelb4jNcaqhKOv49lYDLEmz23X5NUHQWBXlhJKIovWb0mzYxBI7E7Uyrl+8QC+XnTePtYH3vWZKLbwV8sfgMWvqsHo6WXbQap/nZIMLVZegnmkhT8/rEI+jweLMIbn+qYqueSEqMWiCJ9/tGj2bTRmkKcGZ71KT3edST2lmr3BVDZ+ejfywS5ilouGwVn92BoMJv461bUWvXy2xzwBmMquwhGRGhqG4iDHkLjl9Vc6nXcKTnuIPMqiAR/OMFKATSAilKbbz1M23R0AQevFedddpTT948PdBvDNz5VfEH7XfK9zB6FXpZ5dSVU6O8YQXp2IH9bM4aBiE7es5UUCKknKZANaXJ4NcAGbTMEjQgnrx/BSvYGBRP68d4FsNnd0YY3JjQG7dSImlVPlkekoQ/OK0hwc+GS9Jo0aV5uaSLsS0PNEFVj1ZNZopUKGUwDT5ToWaIQ1YsKgxxzz+v19U3hVBqCXKeQsXFMQ6931/bSqudR6I+DkxyX52tsUYx4lZPDKFUFC4Z0qJJ3iS+kIU6u/KAZKejP89Y0ahhjZDxFYXHU2zdqj9DFbCYqS7/9YpUkXF8dGJzHu7ITSEzus3qJdvxbCGvnCBciD0kzh7zi+rO6IINAW+gXL6GsYFbEFi5syESyPEWcNC2BDwMWR8YUf2JLASGNB2gTZqGtiQASdYTpEnxYNAx7h0kw5BG4NOhLb3rtqxwgbFzeVP29Hog/i3t+PlLQYI4N2gn54hUDCHlEMQ88JaFM8/PG2Vqi86jdnMKW43nLn79vuksKVLWE4HefYIIvJNzBlWWU4vnSJ6BQrAl7RcKDL/qZiSZ6eV8g3wpRYCg0nBchJyHFkOfbriUCirZSm2XdzH//j4WJgpBpCw658W7w3nCn0CMOX5zMDjIarMngeUgiqXp+vKHvvqVX72VuE9ZsWRrBmu3TpHajB+B7KUkoPAwRriJqvTciwAswtBYOkb61gNORenUE/nUoiLMg4iJCj1EVsNs3aEymi23FznkTErHr6j9iKCakQnGrOkgnJh/DpSG4RLE8p+YXrCON9QtjVU5HZb+F73W/ANCkwEu717iJn7gZBZhAPinYVHwpmfqU4tiZWWfJc43jBovBfEe6fMSYbTcvP1UtM0/QPR7ImC+cyiSUpQACeoYPsCfsQ0aVZDfJD5H19lwI8lC+dgExwiRN6CU+omY1ZepkmiirdvkOXZRNZuaq9IAMYtqxtYzGYMz6UWlcgUrIQf9yF01wy7JPqu2YFPV5pVAuAaITN23IppdnxoOTeynVrUMHBMqGiroTGqQnOt32zarEeHYurZga0P0pwDbG+zmr1zr+dzebof6mYQNRq+mCVK0zG3LTCrDIwhVydE9OSFnA9xbxjNhza4G8Q+PNqmXabb1TDZbBZYSJPYz27RZxCiQUo0TjE1gJmqPTsOoezGahs/sz8e368zIJs9Y9m4iDcq1AjAYPzerrfZXg0lu7SHAkDRrMvHKNnGSv/fnQt4cqKxxt8U6odq0PupxYVAXQezJFAxmhSEXGt66bQi3Wp7dbWqtJVNEMBVXNP1iHyGHpWXTgQuTwi82dLUBztq+xKW304+aYrqLX0kkJIi/Q4ElywpSnBDlDREBTm904o9IzUCvunsTae0YJNc9sucsJUUgalN92UxarilExh36siAg3pCLZLVoFtRi+HXfTwe38ZbnEvMep+1ibZsglAYvzYAPqm0GxQyg3YTa3s1CLz3Ioj5/P25wIwVRgAbLrlvTvMnzNZRU4zV5516O+UDO13/lI6/+uobIGM5xk1ItoBSHvDE3z5cQ1+cP5Ld8SvbCeydylVBJ3uPZysYNkbYOaeFmUtOil+hUpe+oVdgmYq6/QLkAJOiMOcG6Bd6eZQmgVAFhiObBysuoa0GTjotZUxOjx+VX9s/3hLXRuEo6dRJuqKzwjYY5Vhfh/pWCT0pFTnNLFsb1yCUbMzcMDO59VCJIi4N7NIpZS8gYDaB5k6WXPzH54fYF2CCkWfceKPi5eCLxdxHM6UVEpQwqfg+p7RW56ZjvJuxJ5aEQnpdH+xNiCr0K4ocqObfVZp9y0l5bOb6YVVRPHT6qJCQeCG7CxQ1lqOFdpsicjAOPrUQ7ZiV1fp9rPQKn1Ku2VjLHqQHQXdkivgxRGjgNELIXmEZqBZwZa5CSE69MN0DiicnPoRAaP3lTFW7pg33LxjOqWYgn2ur5iXosfU7jXi4NNg9D20UJOt4LJWfVRFekubNtXI6G+KBA7JzFI4xQPbK5zjSdejAkUPm6W9Nq+pk57vnaEwLEEOlfPGaT6m1GdI1loVnK77DKygIJrMl3aX3tXKesFq0bMh59tXlQOC6eMkpiURjebJsxBG37xufn5tWpCMhf94XyllBc5n/4ATkASdcCxJWqLRW4C8/fhmryqTxmVgKphpQRa2cJ8hWbI+hztI9LO5BUyPosYYxfzaM4gcjIqGyjFufGwUoe9uAXtFVko4xsYRxxOsIjVAiU7z4PF6rfxNm6rSDJNhcux5oYOktxmXGjAfKrbA07VPkbrn79RV7vd9VN2q8rQP+O2stHwirxWDcNFAEcQVwWPCTr04l/FpeVSnuDIFWg7Wt0DHgfFj428Ul8vWqtI5NxRDCzipgBcfl13XQRkQqRhyZJQ+8d63rwPvAu/z222/bj19+6KTi0KAlTkhiYlZxZ8o5R6ZLH1wE1OAEn6fcA+2hlnDTbl7SCQXy0uL4/iXu5WEUUBthpfCRzYReawLmMTjbp3C+DYdxTJzlvc5nskJZYfscSShscRnh/GwBeBYCSil9iwLjmNrIeFLq1nlsQ4iDWiu2eqy8FhhOYx7L3fmwKawOTtFGfkju8SPTSSwMivSd0wy+bk7Wrc9mHU89Vz0xxJB6Gv1zHsScro+r+/j46GlSP3TqFRRusKfCYoPRGbaUUNfLqfh1vwOzq9+BgshTR9pR66iBbDmXGUunQF6HrdYwmudFOaIFauKA6gqenchpoWtHn0rg+35YXF/G9Ff6lTCzKKwMo+WUqQxN33hDmTaCX2+vaptiHlYO582mHxMduuot3VTFUSjDn59fr5tCW5+Z1lSH2BmlxPO5kN2e/bcwzbZMHQlVOWCaYEMLbzdeY11YqPyeE7Ik8xvBuuotYCObGleczkkR7NiwjK6AaCihB5aaipu6mq+przZLS5p7iOQqTxjkxDLYQL+b4fnkxUy1N1nSLJSAq+3yyUc0/8z6fQsh97uw0785HMgZkX2UJWELUpBuCc4EerKafCaM3rP5CxALdxXPL1PqcmcXP+jZEETCp0AaLTvWSNr3r29uQg+xjfI4kWChG5tWevrEaXCDFqWcaRbiP3XAHUWPPFjpIbzO5a7XC2OhUIdorMGhlhIruqwkWWNf1fti0uFIMIotgg5W5EU/fDz7vUmR7JCREvXj5YZmFR1mtvThzy26XMrYfm85d1fmU9IkJMGWdA27A/YXZWUUsSZRDmkfwlSS0uu9QFizeETIm9alAwp6FMGfKV6jeqam70RFHkuk91uGNE75XWmSgi0lBfQzQQy8LKALACxijLkQZJi2hEzqBtAvit5lb6iVXX8AeVGigSSkzUevDZzAwpB8/brfvz27RYIAXHqcBiKk+YyCJcy3DQ+m0U5U4HKzOoGMS2bjAsb1kLKD792qlsvuAejFFpI3lZNXDu6ARSYaIZcMwFwVzzI7F0oAOLrfagCVhQelqVQnR+xigLLl1wUDYLgtGz6okqlpxf3KiwMdDtmLZl+eAJnhdfC9xSBXIzkZBdW6WmOYzr8UK4fXhw5f02/LEvO0JxCFE2kjxk7ZbB4jeEYnO91MUqjjEXxrNPydA+vQUUZoLuPggtJzyFNUF13CrcQ84XIF8jMjMLwrJNgEJ4FzWLAMUtPOOnZO442XezYFoTyoZnKbOqf1gCK5NtuzDzkZPgloz+2AF83VrzOvUEV1cdKWVh4v2+Tg3CeI1IzAXwOkeBvPfNIIBBUN3n3/7Ky9Hs/88c3rRaVX0aBtaNjplzS1eOXc5lMC826n8GKyO8HkZZWcLxY4bzexmp9NCnmK4Jcfv8TOTGDRpRIoetyrHU1oI7YoobioRWWDkobEKpD3PsvVDV/O8q1QJIpAmZoAAXHb1T9p1vupq+L97X0jO4wTE9yvtPGKk5PJJAzUrnjAl/IktiHsHDxJw2qAAiSkw/k+okhg9tRcLfBK2gEjlOTpmXsiHw25NcJwfk3HUN9rKJqMelQn1pN79xB18O99culEW+bb+QThRzDcXkgkItwEtVCYe8MUCDN1oTG5DtKAtnGo1opFi6yhbQuJeyAIITwHDCMQ0en0c6NLMPbEAtChyEbCO1943mFrEeFq1yggAp6CzxbnniMpSWtwcb+ZZYUm1Cxbai4dRC9DYmnolpX/M/aIpICR15Cij7JSrJHCUmpVd60UCeIUrxvDu26iYlPsS2CESTZHGplDHnOXt+Oq+lkHWifZjwdDlieouzked6hcOfYLkBIImE9BzOtFgvQs+r28yvrictYxQztikdl1TrT9Tw7cTSjt624KGsQVoKmVzcBGh2VFLSkOBpZyk4rwOMkzpJZEldnk4Qhl6h7NR/kubVT9lOxGZeSlpEkSsEdpDtarfXu7bVq1jERt7XLHrKZipimc7MLi90GOTzI0PG8wzCtxuo+5mZBMt81wVaM7vVN5wrCzOyK0KTG15ESXcpDYBtKy7fcXlRmmw5TovpvuqlAJynPUeBLpqBfPEr+vEf2DZOfSysQ7LD7teCSzu0b2orDEtCuakalM/BXlpX58flgbdKVTBOtlzqjVf40KBneq5IDPuu2NqDF0Tx4m3F3c6Fjq4TJ9T600DMpy4Kys2xAl9WToE1cbtGGMbTZ5uYJ5y2kJH4vSPVEBajo3BS12KHJxyCNz10o3OS98hmVlhhOueihcEFKQEgPYwge2E5XTWNadqrcLcPECRfFGGxnaKjbwHohqxU02M9LQc7zdFKW+g7Du7Hs9hmYiq3TEhftd5UJUE3rINQwYbVMksLj0bx+ViUyH/3j/0TrfG4m9lsjxFKad/tZgZIReDVRxnWwpjW4HawG0bhRX9Y8Y90rlN7/bDZmbYzlxF7jwdhLju6Fd3fg+5vlzFpTVc+dramJb6sbYrdCzODaYrcGU6IPXNU6nh6H4RIKQLi+k5HXDTExjExzvB3Ycg06qG7ttWkxjHcv5+wJMJIzcJLtrwmbLvUxahsUhVHIlXQOmmMbzy93QD7cTL61T9izjVSKaJP7TYCPzyUndEZfZXq8XsO4hwumcOpLLuKBsIBEXMy3n6Q7JPu3kC8Wy/jPQVTRxvezY58wua2Iwn59PCYv+bsjpChrboPGbgjIWs6ozSrdLXULy1CGaE/38FPJGfiLwHPg/Tpm9zGwfkw8yEW96U5kQUmZHGRjZVOXPfkTc9g9EsXqFIpYoQ5hdDPzrJbY+xNSOcxtERngqx2XNtIQUWXpGGfrOPmPfLxgjsdzvfF475iR22jxZpv6RMxOxWKtbfCeAYdTjRaJvnhz+0L2BRx4JMZ3af8QUpKfxlVQcUp9yzD6KrcvlOqy/8nZT+/DfQ7lX69rz4FTZPIgpPaknsFz8hnxdEjV5Wq9ULdIkskSqUh0MPgCfdcrDkbzgSvKTrMAcYNNkF1CG/ONmwK6ZDqSnw91KHV9tbzOqGRo+mAh5zgbV99JfHDUAhPHc/JQlu3E7NSy/o20gYr24zxscYIsd+rEJQyma6QVmB/HxkmZ5K5zkOZlzhTQrWmjIaz8EkDXFL4ZvO48BN/LBQhzEd3LJuBF7w8HcxVl2C3/xeOmCmbz7qFSwUpdDFMfhwsqtVnULg8mYvE0Nk0EtrIFqM60ADJ7bAbopXqmTBkNXWNXmirsF6qMz9HAglS7pEO+cj48PLTz6WVwDg+j/OBub4pPLMZXKgu+4pNaWHwjdNpoyzV6grwBWuWN1TjXuvlywrBscfrlwucAGm0evKNBjkVvaG7fqG7ambJFSC+eZeJYBGpKrFcjOjZLmIHt1wlHAQIXhRdIpSZ/4mO/v7x9dlw66l6a4MRSRpcriYRXzUoBT8OMO+gLzAPIYtkbuwMG0BWVJ1VaRrk96NAeF9aGaHTaD6Tz2aa+frpE+BUE6TnkaNX0V7oVqu35+fbKUKosXWTVLCYzIZLh5tGLhwcCirmjrxO0CBDYoQ1DGDdBTfcw0ZNfZU8X6UGva1lL8h9YQKoR9V9GEfbdJ6PDKsKIxa4UhloMMZNVOLo50mLWfuG3KG5fj7bX0i4RJRFwotcDyHh5Lj+PBM/VDm7B8D1v1Xh7PTnT1xLujNnlxvpRM0AD7GdpqA+zf2WPJgXJ5c+cDvaZa+Ihmvu/W4XNJ2/T1MBZX7Ra1x6BI6fWeQY6EX200MLAv1pB9xwNSMFwqseyzyQeyflnNBuhHler+bGJ1D9OcGr9Sr/t6veEimXD2Qm0gi16XV9mwJTW0vjupu+VmjTL99cX+VIF7LNWF7ooxaa3kWZaDzkyCOIPSaN1yxhgvdA+fNY8KGd4U88ZN02i1RDsi2KuTw2vgRdH3WpV+fSZTQb1JarEMurbWvWTSKc3QMUraNRIUzN3IaJhDasSLe3Cohwbaz4UGkqBp/f72/vnx8UqqpkTLWdFvx4SJKShn40Tf3lr2saFpz5L5s/rVM6BtRl2OPh4PePvUs7w8cxRXKqKk8tsesIImP9rXnLRjeGr52ZO2nCKvURren/J3afU7hhL3krM6VonYK+wXzPKH+PGsjsoXUD8mtzXDIN7yOp1O8JhTRVFkGGC2Q9XWa95mr8rYWe+nk7gCYNXK+6oiQdDWHjdk29zoiDrPD2aUXMN5FqfgT0NdUCGI7K92aCsLMyhi4ZR+e++q/dsro0cTKu5o3IMdz0r7vOo0eRa4Zsnd21CcgVjLxltu6RPIaF4kebEp1z6QZV2YnpC9wKAMpSuKGA6KBxPOX9yRFxGR6ZA4xHRBzMwistxz51Jf3Cj7ZFVxgGAsC7JrnFN9a7nHpCC5z932elv23SSgsnAOZwsvOutw6HuQyrq49LIlUvKkrJ73n8lPhGtuY5XhGQxCxwdXHqFr8o5n2qh4m9kH8zUMW8Tra2kfWIrJAgO9oIyxs7fbW3PWG8/ucdchypHAFTEJ9mwZ3xmxh8dyWs9WG7sSbrsWu5nAqMIULiWvw3QMAUkAC42I5OOGMnceEaZ5jTyzg5K3+GZpf2lpLSqzEfXrHZTPwsSKeCKRto3VrIMuoTZ+xIGN2UiI3F69CjaTKDqRW0sDlZgg6RUIu+p23wf63oSbJHEqaUHwtBPVIeay+Q3STUpyMQMrqkH5xDDFgPEFWZdlySdNz1eusMUWZ4OPZEQumcarQlJZQSAZMR1UOvWcuwvn5FWLm4r0ZqQwFITCpXcdpGKPDX03jknZqnOJuCfqbCoqOkkksS2IwvyBGDO7fS2x/zGcTQX0DtGUpp34+YHTHBFLK91N0tkre+9pb5EAKBuGHvM0aEvVo1lkLxSh3/IsJ7NMO4GRmy5bdvC8yuITvifZ6TfKAxQpGvreywbJrGR8h1scbmKkv72Z1/RcDkq4gJ7EksvB8YM8xwdFJkkuFRTbzbyCrwE/sO+XhW0KTyaQXqieDBQOpaMHv5HGC7woQrPhEFctzvIs2ShMLVQsaGU71zOo08juhTihJfYIZcZP+5qXncc+Atmrrac2iq7scZicp//hl1CaLYQMTKw5tA8du+A8YqPro8mAkxdJQsj9Cun2AHK4duEzyHu9OhYgGlIido7OOuO5DYEZKkNQw//2PgA0u11vUo9Bh1PXytJFjkg4du71eo8z9SxE2rMw4cIwnEL1NLySm7LLaAtseeYrpKF/9eJk6JLYGdg6HpZA/6rRvVn/AQNbPQnXOHdFz8t5lxRD2ZkTL2hxEAvhW2ngBsM+TFPdMnTyZOZGycMEa4LabjHseguF6SL5zsYucVnvadM/vIgBqtjDoyQKp1A7GQbFXSX0RrkWRLLkrvFV1R+uO/l2uwq32QLea1QkJ6ev3LN59hPTwknIvPvF2OZnYXYQ742luMH7+/v9bn6bYJShHYELBjTCOXPXdLuGLuPt7SaSXCYxMRbAftmHOfLZu2BaQtRPIdKgcBbnphui5FtHOyxWEn0Og3J6pBdN2mV6DK9X31TxktIUYq5D0gEYdoYEmmGgyWGF7twcAoZzDS2jVVHdtkxUotMKU2FovokTT3bJtDxjJcwMjbNvvdjYujfig9m7fowPa2Zwg1bE46/9xB/SV2eR8oZ5ioH3LyUaxjxE3dVRSJ41STzUBsuLwf4vSmPOKUhqox2xas8/2XXjRfoQjClSQsnr9APKTjKnuP53JtIKajMg7HxhEMRGknmeh2t4Z6ea46Ygiu5VzXxynvk7MjmMKV8ZinTAXVaeBAp3jE9sbGCxzOytIiQZiJ040jH/SYWFZDZWxfHBQ2Wi+8kl5pB49qj0VR5w20xykPsAZS3XVVacR9vMk0u2lObdY+pcsrOacG82LxXxSJ+HmBHCG41vAO3D2M8Jr/+eYc5SbJZaMyXPkEeXg/mzZm+XEZVXb1fcAs3D2UDOAdFj5nEXPhBYgEmYIEgTQO9HVWkLKQPaPtxBOgIfK96FdhunKrIZrDU+fagdbRDSB+JzWPWJB7sCB/4mso1MlprnFdPQ7kOoE6nTzG1Oc0XaWOf00nt+YY4HMUYXTTF5D4fNP/zQk2qXecmT/GQdeb5qiLi8kvD9uiI+SVqHm6DHYQbdYgeo2oz5Fe0Ux47B9ivC6fJLtCLZSWwMOcQBTuRd5h7uJ987xbqwJypTNmDBITr4qE9UwZe96gJOMO7ScZ4xxBQFJ5YDseyDyqu/frSNFs/c80FTXIQVQwBWZsBDWXdjPjmjx4rN3IfmtChQ4aYy0KRyalcVQyHGy6ARNoY+ZLh5uRRCHOpx4lzgJMWE5odN4D4zcG7XG8rE/oALq60sOOHjE6YVX6MEQ1RqpYs8xGfXGzVWIxi1jzvEGIVtjmx4nvNkUp1sxW6CsaXfI/rNzaMt7vkebg/XhC6GMzrsoZzse1uCE8mkVFDLhiaaNIbR67MQ01GduKJyFu1w/n1RtZLnOKjyG1P92INY7gmzD8ceJn5+drWrmxbqMkpMNGZaUBgMFsZ+cMPQqetxDGAHblrgMjofuD00bs+XiAldtktKPnfUhJtHC8htAIa2QsK70hi4BNQOVJurhQM3SprZFl6cJwcaaVwx2Yppeam6IIQhzOxaPcG+7jJUCVzfDXwmdiTMoYvf6qL7Q5AA58qRvxOHowkBDBII6RLiVCJPnYdmsw1Yn4WZRd8qcNWCje0ErteLtcYmq1lY1cgTRJeDjRgF8ZsbZMpTHI9S9BSR1AUVxoV0X1EyXxhORGlRLwxdWm0F+jlbnQLoq1rZoqP8gLqbc9UNoQ7sS95wjhqUHX2atbit/J1KW5nKE5RXsF1jevUayCRPMslc/47qM0Fapjy/raQfLH/vZcPBjY5tzHs0Sb/blVpOxSnpTzmb8Avxrx1KusWA+vIjqFqExyHqLVJneE9CFioNnuD8LjOl0j5mgVRCwZBxQ+1Ou+Fay+m0cjJB7IECDa0AJSCOvbq5CodIXDLebaGwA5Xysk7dNDlncQ1Pm0r+LDvxDGZww8rl/CIL0r9Yt2Yrk4skS+ADObaBWulyDyxl7vnLXrTBmmz0nrmGw7D/eRJRuViH/zIaImOKf0vf2YODI7gaQaIG0KqgFx5eHubJbMugKmZKE9qeCkH3ZQCJB2SDUqU9m5leNI9o4IY4zJde2mQuEkBAgOyIPRp9tG5tMd8piClJJi2xs34EdjxxU9GT8DAsus3xtSfMmoUWr7g6oEjH3xEaREk0i1HmBg7ivfnb0ipvhTy3gAqN1+P0Bkys+HiGV84mdQZT32xghfRwDvJBkiDR8lfWQivc1TrZLhoV3jwbJGOcgpeFuCX/Ey4G5khnc06eKIemky5osrIDeu1ZeuT5W7QmFmFqlQQlLv6VoHTzb/VeMqrOnNoUr82vZpudysKZRU/tWbefuCbq2dpznoYmDTVbzsHAM5cwtIn53ahqmwUOoLBsoLb1T/v+ud3evnrZYNyZLYdyVgUsHndG28XLnb8j4aNNVI85IWt0pDHSABBF+Je9EkN7JHkzAA09I8ZhRkcvfohESQal3ydCio6IUXZzVZ2UJN5zioBzv2wmZrl2lWf96MZaUIEWYxnuAMlmxSf3UaYopVEPEL3JWIzu2DeTdxN5YamhQJAAPKwilNwQaIYphp1cmDLl7T2/i5qqDBK1ILaD1Fl+p4BuU+aEUGd2lTQ+ndx2dzHKWXLiFHlTME4DBI3Lcd1V98zjeABNshmvMtP7lBWryNVxzvwlbfTeTb8Qe6mNcJ0WuW2INAVnvNiQQQtOVWJPO3OUAf14RFmt4sQrrBDo9+14PPg5bgabrujggCZmFs0pd8Fb1Y/tTkj0lp9lyZ002piq0MlzvmDn8Uyad+kjxmkiLMyWm3Pbnir+3t4W89D37uHCN33BBOHVeRx8ComL2UZKngubj0WaRB6BVFI36aeRY9jpOlIyKOL4xGCDpzp3r8Ldq+EWmhfMdVvqHWyesL3x+ARU4HuFY3bdw7Sz+buO1qHuDVPazRN4W+aSehcG725tYgGB6rOzJkPm7Dc5nmhSx8SweTANmEOED6MqEtiMtNxoiV6oq6TgCMbk8FmWDyLgY4LnGjrWOgUqodQr1y7QTK+4eA7F2LkDrRn2Ss1AGjoCKdojbOypr+AIXEpZO8HlBenoLqOqRW8j2tjf9d10wsTlTj10Wg+heF66ZdVOM7PrGp7z3gta633G7TGl1LF/r/xiT8ubvWsFAFWtZSYE9GB0kMyHFgBFgaZFjCgTK6rhNwUFiYbgjkm6J5VVvsAW5tghguGKRIPbDFpllXWGo7FnDECjkrbws1Ja5gokLyQqC5NezMKDerpSpSz64jO7s5D8sO7VIfU8wZcOh84R7a2ppLpKjkJCWL6NrAF9h5KC6mPyDtl9vxmQ+vHxIcZ7VoH8Dn51A933i0NUkmr54AqdXRr9ZUNjy4qWAxSb+RBGIEc3IvSGw5nMrrDQKnYaczqAocmMTXF0LEjyIrpj1iqZl4o9iJScmfep8xKsD3FAYqtYdi0SmpZFZyIsjwEBvW/J22yyaCmPe7sGUFHvDxnJDXqmxEjED8cojmYhK5kGEpSZETKpIZwDLKTnOSrwsAn7R0myxCFnsALtGN5+fdru5nZ4z4gXbk6DuMb2PF/3+9vbGx4quHqv1TH6CZ4jMbao/SGeAis6h3n/MMEcsYccfWBlVZkCYm+0uxs+Vpj0nbQ3/ziUrzo18npKMGQyisupDMYoY+s+b82zhR+gJ7kPDGFJ9aLi2X7eMGpLq37H0ZWtDYib2DJlMa2iiJuni+SuEBGaMjyzkr1KyVwPqW5kErYCuVFpCDy8Vcf3KnQI2NYlnH6laR+R3Vg4DOWf8GxkkXX29RUFZUce83IMSA6o5hM52uoS42spYn2AYooEL8qGnrFE7b2m/HO9mcROGdXFltmFBK6tTE2zD8Xg8kRSMuvurNSB0NyUlQBsve38y54WjtcjKot0EGEhSioZV8MUyZSeOLykKOSlfjRkOyhZljN2GA9R60//CmJasFO/aAvtiSgJTDYIycuuiNBDYCjxtCGKtrxKrIWH9/b+Jg8eZCmWm1d3WlY9mROlksKAJQrc9VKTl80G0gcElt2Z1Ah9QM/4eGzwtabU71vgnJmXVCaVyFdNNyv0uTPYJ7Ee3Dw6UQ8wEp83zqeNNjdGNUxClyJCT2AMp1c2So4NGVVlzPphjbhe4rGjk5zDIh4Mq0LyLWY6Gu5oifQC3/bdQCvWxmgfh2DAJkyWFtcg1aLIo0lDg83aCH4GQD6ntJzA2JGsa1gpF4jUi4ReO8LOEnjIs5mxOLVRB1QvVw2hk9IBwchtEPJZmGQWSJGAknR6EE0WUkFt3IGLkf/gsGbUjKxC4nqL7w+TtMiJNa7nGhpmEe/v78gtMfgin0LpriXSpUL7MveQySQldBtkM8g4OKZVGCaqK7Vp/5DjiQJcmXSl5iGyfvHiMioqEsa+oUJCRzuGxmG9V+/vP1JyPUpG5+wQoIaXGMMpfWN8IhNAGN6QDBDreT6EC/KkXnyXNn+cMs2Bqamvtm+dJLqz3NMWvWjnEn54ENq97uX/PoS34lDVqrkbO9AjxO5DH5dd483imyXBtxw7psVNZvNiMlp89qfcUB1k8gjnkWkYWqKowAlrvdX8TY+gta6Khi6pHyCj0lC4DurNB4vjk6YCLWTufAk2EqZeVI2LyP0CSGhbKmM67wzlpusNq2S/KdksxveGSQWnPe0Doinha9zRZjm4fYSLh/NqF+M4eAbIirr8ylEJZx0HQdeqUHB/mxv/Yx/6HTJy2fQii209I0ktaPQH03fsZGqGGqHwmnH0wxSyjp7Hh5TqOCazw7M4gXt+qCuRjuU1NP46Tjm2iB0oQgMG+kKULaHVsGdtqnV0Wc/KiK6mBO+HuNpROdtMAw5jRxvy6M2kQbIIZcMe8NYxQhAiorKUxw3sUgZrLhnD+eJfgT5xaFQBUK51C5yW2tq47Gk1uCf0qsPriwH7h3ZGz5ALgChF0vN3LhYlgUYhf7YzXEaXo1wdwQl5wd730GpOoVQK9+txPIKmUDsoNm1gBwQG2k+OITMVQKa8UoY7RI5dJzUKYP7sccb+QEkzK4sF4llNWnrD4AmXqaJRE0RpxA4pXKESMugZLmNGUdSqtV3wwW7EcvxDNmYBE4/r7Kryu3P9GppcmL9FemO7CKeFDJSNR37xHpixsQV+5ObmBJas7yY6ZO7S7WOYMIdn5Yi2QChex667yCRdGUJBIr74yjJqrjxLYpGUJozXuRhWjMFt8CyzFBjPBtPJMGbPuWvGSBxei0OFtgtXsZ+FlHPOy4axQknFquDIAZnmQhpX4jye6rmXVSeBSZopG9VR0/STxUAhMZ3InaRv2svM/ngxlNNc0pJO5dcLFigJn2gftVlOeTlHZSxLFctxfSXkpXKk8GOy7/ToJjPl5tLCkr2TnRwScZy951nC/A0mYEGX7GwiFWdgrUh2GME/2fv2fpzmgSTV1T3vzmAz+4qGM3gfQLQhvhiWY1zVI9pGjmkw9gzcZuRwMMJI5u2VGWXiMsUS0/BndptBwfs8JMx8r2RWUgFxt6ws0zQ964xxtQMtsWBoei37BQfGeZb4CkOqJJF/6ZUccRh9Wm+GQy3vJV+fvc3ZfGAiTUGZ/UB9byTngpC22EJh1EmmK5FvCLuOU4WZz8v0Qcn1+XEjNolFMqSUxVXMOZJQQsni9Xz6yaNUhnwq+JnzPNYW2ossqfD0kmRN+9B45STWgXLFnmOZGPWbUTuW+65o5sDc+kQSzVFHUdxQ8ram6HkcHQ62fQXuQalc0APu7NZlxKiiw6GLbST0vOYZhvvX/W20z3hWG9HX2AGkxRJm7e0gXhl16uQDxBomCfUepM+UJiEWAh5qxIWNXcSRu4nJ7J4RZsHbbMZxMhQzi8dEL1yI7A88ghuL4Kc0n6th4iozTzM/X514erZmZTpNuklJYxN8HVQQfwkG7l5kSpk07wTnEGq9ayOS/emMXMcCDAU0l9gOvUnRR9qpnW6+7R8wZqTpZ5nzAcUER/exPa1yBo0Jjp0NaUXniM21fGOEL5hbH/JvklbGpixK8Gxy+daveRyGrvyOmU0BW8DJbdTokSaRyrxNqzGD3yEWlx1m9YmEr7fNe3n4ihB6QcoPGAux3jq0DHm8hPOH3kzc3WlMVSyAXXEnA/ua5zTwoNGx2TZrjeu5WkbL7DwRKKW0UA80msd4dcPHASIaDpJf5S27UZxRV5zU4xvPvelLhA6d2QUUHvOhWar6RB8Q1SmJSYgKWWx2toJVP+xbHHGI13EnHYIWUmDbbK2309u8dmea6NSWHdgidWddvkKvN0HYpKMOTW+5T5zBv2gfckM41jLZ9aos8fW2TCq4gEMzS6yAQN/qPanNzw/smqBvGacZbpestvsoVFQZhJoqMlnBMzTJcyvVjrUHFyZU4/m6/noKxCqbA1FRLaI/IbO/EKIg7tHzqDBWS31qyuE9TggxBVFdQVrFYwqHGDDlZ0AF0Lb69fX1CSc43gbap/IDg6r9sW8W4IrQMYoHqvkSh14VTpM5h7PrtkQ8KnNANMVkxc6zfezRxcQQLfMxg78Bt/AW2QU91CXhnDMBJiZtC58E3l06L2shoKxYnz4TQydR2qJKWT0xlZuZ783qTGxAvBPV13KMlLm4GkXnYflqMbYCsyQ3cGdADZqyYh3gTmWWDFUn2bzxBFmTfeshDGz5uIryGOegRWLnTI1N9wduiwQgHfrZ8rfzgKrDMladzA+n3/PlG4gzmqSDmgaBkXOhKOaGkS5IiEaMgvoDSJPciTwk92xQkNIY57IMdmBhxEMd7bmzMXcwgDBwySG9em45qycs5+s5ZZrWPyeRv8CTsSHVIT9aV4il0f1NtBdOuA0E3sJsBqbn7l2YdSECrc/F6umemZzAsnEIbx3GsYx/y4yRLEUjQ6MjKOabRXKv8Po/tY+mkS6wS2iwFptBU6nRXGuzZqVAoVXSJHP7TeU1XYUrhKY/8ri3dOAbMDbPcTxuhs170MdAe9hqDr7w9bao6hY17YwkVxJvBg4b3SvlJna6OkpyukcF+fxQstfP/9XHMlOQOctuWE/B0OyC98fPj8vlynBkGUFoKRcADtzkPZOtZA8YdFfAzmQ8AxCdVZhQ2LjmbnKKjrvXifBnYFnDQZkBxyHcUuC/Ycr+r/wNkgUmHrYG5xfnwBdpTJVSFtdTHDLJnS/54F+fn3IytMSvyaOMqrqkJYfCL2X9FDJz13Lj2+13nQyjW6BqzfFk2BaEUNXxJIplqFN7WbZD9p6TmdBnYMkgWf1tpnEI7ECFweSlMjsduKdec00xeXfpikc8YLwSavGfHz9/vL9zTljkdsxChdTjE75qOMEYTeL9poFzUK9PCDD7w5ZrdMbysaLqwjV+SpnTAyIdZFfFsYFG6Ejy7X2RQSi9ahQP4dgHs0vsgtQOM5U5QUpkRB8aozqZfbm0WYiBJjW37/3CNo2vO9DHsBEbdkpG+EtPiKEsCCB91RAUNuyzZ65QT+d9s6pY43gFDRiMQqsZqBM83A03JEXHcYYum4TY+QuuIuGYMoSe5NPC3q7HkZBkyRrjeOYJy11wc1zPThBkmkNpBUPf+xtKRnkL1p1ONBeVpnEz6c3rgFhoO2YHC6IhPet0YMsdwwuw//0kOP+cQWF5PspaNxDQcUbqBlAoqU8+XG9Xdv0LAP9ASnbuE6NIaNK6hdog9wf4wjxh+3wzHLiq3uSe3JDTq41xdvW+8BYwwjlDK4f8rs+Q9TIJMUwGSo7EApKwiOTUqy7ZNwEc1drZtXWYNmdE3H7+3G5vJsWTHRffRgVycgoLg1XRBoj3C2ibvUYvGRldWeAV8JtzvbaeCHELEk/6s7XVL1zKG/ebMrEaCKEWCoMiPCq4dc3GX2OolVqnWbXrgn+cjD6LD50UGI1yf5zr5TLNIc67RR6HdIckx1Altfwk0cKMBHW1DWs5VU5KDiuQujsX5kheafjZV9dL1qb49zW3pwkrfXjBTdKfKKGVAxXleADRIXgCLc4jk/MRc+maIbO2mJcX45zI4Qn1vurzuOqCrbYtWDJYPg4BcSti+r6gBvtQMo7FpS47s9vBI2x2zpfLfPL0z3UX3FP5Wme5XW+xbTKAhyAXwiWd4r/LhD5PCTqbFCc2EFNFFrlNrQ1X1Ap+BhjmiREdvhiBRobRhbydh3iTksxTmXU7mSB0rjyh9XV6ZSIVuawBoZZx3/MZmgQFS0leIhVvunWh/pnHgDSb73Y70anbyRtukT4uDby2rD3fy2aIT6VP8b9qwUrNzm1lci60LauSCwroXaRLzV+ZJoBTsVn1oMv737/993stGFJm4cA8YEETVgpm3d0nBnsDKS9QAWgNgrCtNUZxPB/TnOxKhCINza6s/KWfbiBdwczB+XfZ6LrlGyZOcblYPdbFTwVPcxGXJjQE7BeDZ0mHEol5obIXZcHWDPm6w/PbicpMKRMwIsRHdWkI4GSnzX5+fARN+JnEIOkG7s+9Dda+Y2oKFAGh6MFmSdWTxthGvXirZwQ7Hh3lnRMPJvasDXJKdJ/W5kAPRdwVZqsLxk82aPKlspwaC0qD5I/kpAVLcg0piJ1sHelKw36u/krdDFjiorX8eNyZncKWTZRzpwC18YMPyQn0zeF3H/zS5cIu42AJWgrwyXzG2eRo7dYKKQhxDX0MfpE2s2G2m9NS56rldfvGzF8ukxpFL1OXZDVjuQY0/ZSp3HPpkSvquuuBUE/+Y8w2zLeXe8+Y8R9d/1PI1CGF4VE4/vsxKaZamrRls1cK721F5MTcdEE96RAc1D6MurjtyQ8xn+203Zc1K82JbwFClUtvBmSfn+7kJVke62AEgaZOL3NjCWdk5tAxqru3JVdbletiNDbMUZxQHEJHPG9uw4OMMPbJIuf2+iVPU3KmlC57IFvmqJG7SMTrhXsOAeBuBrUZC3P4B0j3g53pniYyFDuW2Y6OARZX0zeA5HFnT711+du15pn/Zoa5NAJsUtueECkfaL9EJ0UzGG2sRjNi47L9jKo4+Jyba5GakLLz+9kwBZpY5Gt3VXUA8pzKi7+TzYvy8zN5nwesbAg5InEXRHzfbLpP1mhrJl4vzFmwtjzZjXIl46jwYUSWrYwYcKNheeF1yzWLwopzDKNNZQ7Ty9w3Rer1kmQZpBpbuVWc+skM2pbR9RfRKhcCQMsbIygppaUP75zdO4Sc4A1WG5KHBVeeZcuLoSRJs6UKkh4Fq7MFz3bjt5/WX3fDle5kaOfUmdd+R2XhNodmqpczwDlLMmwl2BbiwHJ2XSsGaIgosiffbm86Ap9992PQjeAqghvx22+/vb2/ubITukxpQbcERbdn2luadDTE0CJ55YiukLkFPFRaXaAhGQ22RKocXl9I4AtWbDblC2O4JNXSQhsEp+LlcmUXw77yjsBFDytGYpnEC8nl8Mr16+v+JcRSSSBFuy4+pWk/bMEikOme2YghsjH6uTpMIUIlSVFD0lfVPWjt54fNNgSOia+4hIkn+tvztarorI7eZefMPvY9pak5zR5KM0zENCRRemQavQqPckA6o6mze+XsnpYM2enk5FgB8NDuK2kPnb7Pj88fP37YmMHwLDMbjpJYY2sb8/uOy8VDS9w2GVG/uQwiog8yORs9Mo4RnAvNSKGnKN8NeWU+8aUhEI7WDhmp8vvQsdtYoib6ZI/fQomFG4hraxzEq46giOb+N7h+sZFUz0LPLGitNlxSoXWlRhE1nJntdjI8xo0dDdM9uKV5wBPPF4IDezeGiMEdVMoZzBrrLAcWRpwBotoImuaOYpQdgoFOkNGZyIeBmYzc8eBraMYtn1/LLs+iqhvA4sy11lTNS4h0+olGaCa9svq5878YJ5t4k/LVCo2K+VFc1UUyD932bd9e4uXOP9KWnde5sdGicYwHK+GZOtGtMr3GoecRi+Cn1g/b7yLGLTURsT+RcML1p+63Zsid1uOMWDDKe9URok2EVBbjBgwbjNXSIMfW4o+bGU24wmeT1yzZnsap7NtJxMF0Ar3+x44hl8AgTIpa+9R/zV4rroxOPmxgkrWEO0E6m3TCqRZSiNCsTS+mhnYlHuw/urDO5HNdzJ5nEq4USqxAh7DkCFWmtXhJ3InFJwWDf9lDjcMYEXzsNFXXHQoRerJr0CbjqelHMwQhTFknnssJQeJlkvl7NgOUwOurSU+GPUCEcdNYT3mh3svMaDFSGvaKJwaznMk0O1EVhZjr+9aTBwY908nQcSF4pgdIq0zuDcCz5YyGULMqCu6aN0uxgnLWRm0w1jNGkKWhG2zCXCAZqZecjDXnYTc+bvA1tHQoU8jd+e3nbxI2cJThltWsOkweCug2E7Scun8eHpLZpTdqU1BsKlfawIk0mKHPLi56oU2m8jnbvuBK8Mf0PpzSTcP+5BFFcIcgU2DsmQGWYIhXfkuel/SqtehMQpe4c3tbHnRKr2aeoObkjG9GooLMdlyA6mX88uMXWaz26xgXKcqob7QXcHlabD2hlBGLSdJ2EYRDpFcbGYS5ngKcmHx+WaOc2lQuz3v4xcpiadcjoqPPqtzpYUQJCzDXOSrf4BKIMSqRyyjNOIhMkn/gmDXM1M2TSJZZ1cQahFcA7YHaXUaDtvCyThPVjPB7Jgjwbekn0gp7KCnlFfG00xYbrLltL24FrBOBK8zNbJTa4COpFhuNSs40R9mKaqVXXEUn2SmqWPXpyt+NDbD49KoFgXykn+fj0w3EyVqiU2vlsu+jxkvCYFhDb5KDUOxod/iuyizrPoO2gbL1tijpPxyMPR15wnBUfLaN6VyQ6z9kHoBUDeVAAMXaLpF1DsvCJZYXjmi9PB5H2JBKNGB6PUu+EaghA6uqAeNzGPGE7r8bcbDAwgr3vExOz86e2a8SW5q+Qqs3R5k2TyBL4whmj0CUFRWHfDp4tGBOzOT6BQNQFZ/syFEyjIU0WH26vrXkym6mmRsjYwJWoe1+zqiBPBTQnJREcRsYsDgLWwUCNTqbiqJmKxf7xp4c2AyTdpOENFdQyjdz2cWmbDqYkxGBWpQdli0gfqKti0ZBiBw2c7PMcYWXse9fvdvggMIxlIf72EuLzAQNXjXIO5me2SbTxzCudhWDYLUM8cis83hAQEWYluP6jzl5ql92Mo+zYlV5KpQSHEC0QFra8g0OOcap13xVOt7bQryrAAy3MhRfoigZdcifnRBniVwBNJhFDoOZQv1nmyl1raGfJCNqjDQg7+OhqtXOxyO5fS6mUIpc9LJBdBMXukkIz4rqeHvGhWS+f79CAAvmWgYtVBcW9/IE0zRexsSkxSkfR8JJkPl2u0nZwMfx4zjcrDaMQjjDQXFPxnNMz27DQxAY9lIiLjM5C2MjNgLl9dR45D+w6kGGDSqlLPi3PPoPf+Wuzik2lKAf4jQjQyxf1k7G9Yj0ZbdceGAAkLN2SYApbuQXQ0J2XJczMNitCbA5IUrcutZX/fh0CtAMA94fiTjeKPqd5j6tCjxom2hVLbb46pubSDpLKAYWMF/xQhgeo+iyohtudBec2hFdkE5YGMBwrZ9PYD4JcENDHlJ5f3u3wYYBKT4edxZgrR+nruzhJuoYVqrLmfNKj6SYp2gqaWXthb6yOQCQl5TB9t4vJ8gBgf9itIVxc2YUxb+Ie0ybiMeEgyWTPzx0WglfQrWNU1kpCA1gfTh6c38paIcpvXL7bieYOuATESQ/U2Um84VMqbOza6JUfAdN05ZTjoUZph1SMtSuw8cLAwZDk0RkHNUkp8KaGubYFSZ1I+sOCkrAOtv7voUAv3WCRiQ1kZ0MXLU5+oYqViCUkMJ1ZtTGUflRN8PtGpStwAcJVl1Q1FNranAuSsTjeTpn7K5H8JJKs3NCcQxnda8hh3otKF+uMZ6RQL3nGgh+tZ0U4JSbXBZMsH6vHuOpHdFVLCduw32rpObXWQnTPws8ZpR8kBhLY+TLScnLtF2bGXb2POZnwPE6gzzaGhFoPt4HO3PLOQy0bTgrnINOecl+WSE8ECsPTCHM8sbKz9W+2bVF8ij+VtuXhZtYakWiC/tGC7olz3XLzhbabN69TCBnLAWTGHnqGfUKUkvkfrxApmBwUMbmXHEuIl2XOG0waX3OpTsxOTgA4sustUwwKwcvFUE04xWpJQZBS4D/swlrG9hyDvluRZN6nsY+VN8VDenpAJAP5OdxQl1FhkPCWTqOGscE6TdkR+I3I6IZNk6Z5s+yS9KIqKdqezonYCx20flg2bmcwoREKfZ91Q8eLRX5ycugresYbgfYYcsucHINq3oLmAZS4rwVQ4od2TBDsTGQoKWSpF5yNKnVTTZdBvmkqouY3Cxi17C5y2HI9FVOtWUuyOaThCBUTky6ALpBh3spG8XCIjB6a+G5rHwcqVyWAM85RrBpQosA+Qp4ePqLbLkwEtSapgf/G3lMwCSuQ05hhw9VeUnd7m/0kK1VnMIk0adJp1WFzLrT8+3arodnX8e0nVjs4d27oURywi7ZPGV6nr9byzXlpmvaSSWr4Z5ik0cpcINfYcRTd6yHVRxYslDkbA30HoVivTboaQO3luw6m7nkAFNhHcZFcJ6sFacGuFPxqjAoF+7Z+vz7vuFdlL4yPfLOlDO/Gd2HoW1c0qw1aIk++FqBmZu/l+5jvlBS76nHAuPXIqGwlAEUpmc7vDbT3E8G0yWBVtpZZEhLNg+i3u+ZOd7y8yXEhilFL0V++na7YZw9sa+DUkUujrk4kSRM80FO+I1qBvhu5Zmol0pIPb3MY3n6PKw+y240pDhhLNdPHYTHUHvlYR/mAHCcmNl1G5BzN1JGR34cmZHuyuNxYJ7QivLxkxAmsi7pkMPA4ghFC+bCO8srI4zJmb53iCnyuMqqUZAn158cxyqeB58SxhgWhLnseL6MpAWHAM5ONaXs/xzsIYMt2LeFjbvUUGoTuip/haw6Aze1hm596PkG9sn1CxPjAWpR+WeVLSRhsinXyxDfPGO9IXNgP3cmOTmmx0xMKiZjISLmiOgONi0OeHa0lpwADjAC6wZNuYQav1c/kmgoYXsc5EraC4Y1maxe1deXOk8HoxdBqOTZb72SDsmAXIlIm/C0dCezTLXFc5aOY8uGZPrlIDyj45LH7uTFxJvWph8RDjY9lrNXaZeDulYCkgjl4BXS2VaijAZ5h5y317UNT008+zG2aXMeVqK++sS1I3Wn2UQ+567XSZiKOc1R0/0QlbfBy5ig1UHIE7M6fn+lfBBpeaZYIl0T1YZtaKV0yZOFAM48uN19ZaIeRJfkCDWnm1tv92sIvoMdwXvvLnNqhUS2h37wAzbs2Yl4H10KZFTnxWlG8fW3IbLDqroskw8BbSyveAo5lyWKTr6Gyy/IbM2MaJ5eSM7cy5oJwYkQ+jSoxHSo3Xf9Gka8BanP31M5t/c6Jq0u7uJbF3J0b7m+V6MTupeicsIQU2jRMulGqWhouWZFqMhX6bFquvU2LQvysPJZpHZ7bpkt0NM5Q0ojc45/TjCrKIfnIH6oCrzu6rzEb+HmZpp3yRn2GP9AQ0UgY0HUV4FH2mYrsTl6ghusRYurBe0uQymswPNun/0O11Bjjm2HeWTqlRnKoQb1UC+vP490MXlr0KgLtC16xkF6qHPgTGER0j4Kc22Z3Rhed6BHJPajszMyhrvt+8GiQ8w7X8rfy/C4GR32whMBTjlF6sbNeHf3+xfYuBCw85thDObmieBussRB67e4HBfSYIDkxLRrniJwOVK2NaoT6P4FYfvFj5kNzHNyMo/b6H8jhbsGBDrJHbnDGoIxotZ+7l6Xss7qZ/nx/j6To2B/JkF6ILnnRE94QtGjhuucP2ia9HJPGc0x23SEnvg5vgv+TwoV/N38aIRy+zgACc6ko2OArSmtE4QXgJKN+OaVv97lYqflljnJuV1vomDJgfjr8+utz7I7lCW7c4EJ7ZId4BWaX9TtitCwUNSjIdHow74cWl/3R4uphMuGY6DW09d204MAoZ+smXgmjrefG68RyZ2BCyMRNzWXYgyW8OuNjkbIDwvDCBdAYkkLh+V8BphsvcRCtBZU4KmoW1mRWUpKKa3YLq+hpAExb6Y2okwbP/ZpnpzMhKcWtbNHOQ0gulBrCFw3dWApBQpXuGPPdu0Q+7A0KYg7YWOXQdHjGQGVXvUFdFOhvFxeMbhMdDMD7gdwdzwO/HrPbPfYdJPb2k+lzyDoEsvW4jAKCGWP2leTZhE9r08HlQqKOWMT0BaSug1BWh2CxcmvOBIo9MoH5/HQtH6MZODsbsnD113QJGwM1Qf4/ILhX5D+ZgtX6ewERzP8Bep0kkzZOMHoGPBwvfVPsmmImC05ZR0Skl7XDCK5wBr0KvPqe5fmE8BuEl7DCm/98fPDDOr7OBsIlDJMy7I9wWPp2bEg668JSW3ZfOjoPDwhnkfi+6YttHVD7uysslv5e7taBuHlMLgsHK2GhG1cv/nx+QknwX5VB3c/N/Aflw9+1mlb8vvhF8g8ufN8KZmfrRjdh4Ax/+vlsrsf8+bHcANxw2iF2iLZ6RHx5L7RB/0HqTe6ZVC7qVXPUnAMB2kwzopmhyrfHlVef/b/uy9902LBD1MiXI8t1GDzCvdM5HPeu5CdfhsJrVq1kx/KWm12glZhhwXmn81pnaqEh7UriC00TXqO7WyhBfQ3iYai6IvjPQ92vey6z0FtVqB/38V6xrnMgGeHpSaNpHmvz/oRiWygDLzvXXrW4RJ5uZgMrFDa3jY6gsCjKp2UVwuobjbHSfTdmRmBBrhW74jz7SRJYGAOkB1YfomKusME/fWbil6ASsv6xv7OLxtIzO7MZOw/U+fnxaPk4kruiUz8wSkL76I0xDL5x/2OVsPJsEqgCZeEIRvWNMEdFkYGIuwQOd8ABytYVBYrFs8avi2i/S4KrcNs1zlcbU5er9fX4aMCEZ/DTIE88IBWmaqkUgtxhtUxEAGoHR3RwwLVEvzxYHfu5MW80jC5IGXiuGeC9w9mD5yP9+g3i8SyVLDnSnEtYB3H4OeIPFT4ed4DoWqS+axv6AzPxwMkFibyWWObZ9OMKNSFnPgdLgvogUzUDNp0qBjA0Q9ktS5PmItEwfbdOUYukoR/QPiejug4WS48ecbcVXuF8jQ5KzSdLp4Am0VzYEdEbsPS5eQKSvJ59AY27ukac5Co4Q788VuilDMI12EFyHXHtfjki2WCEAmcmkNKgblkvk8Hk2TK3KkNMiqSVnFJh9SrFsRnZ++IQNXspB2J9Y/HeMDJQGSPTa8Dcx5czv/5l5IsfFEebZ59t/t1h1i6K62TNebFoou2BsotcEm+b7oNB4z5k0pQF4Y/yr+9w9Om79LFAZT9NZiz+7ZP8HTm52goy8gfLSKznWnPgdUyc6QSGyKxoFSzAmGUHc8OGgtrHXenT9VcgtXFvDI0sIkErJeA7vPEUTwikMCEaB3INuhUmAkv5VFQiGHNEpRgug2Kjqe+3sAcCxbs1BnXZzGs11aWKX331maqCZY/wzs4H/JrbxKNXHeA8RwNSevKK9PIBOlxfttXEVGWRXamMs953/FZjDmHy4ZOhaaID+0CmYFDX/+y34BWszWR6sMqZfDBamKjzXo41ipzGJV/4RvMDFvw0rQhpvEZ0DD6+vp6u709KZszZ0rYYK4E7Hmw+TakyM5FAV2GLAIzNJFVO5mWQXJEk4FxHkFy6zWzG++LNEmFFgF3riIlYLSZBuPGsv6HBfTsMyQ1w0LeauWrm0iKQR6lNF5IrC5zL7J3kQ/mOLi5yJcASWdq7vxb+OyQiAT2xXnmMKFL0iSWmKWdK8ow3chrjuWl/BPkDMWDCwQNZ0xV0GdISh1TzbnlCT4R5q3XT6pydjI87iLQ8oreSFB0/Zz6GJjINeTiYolMpCa/LArTXabeVxE62oKfK/Di5wfmmb41y9CndRJpqqTJntRZFk1k3/+rAvo8PCWziF9bhChytkGFF+xXZSUdlrsXY5RZqnmWGad6ZnfPG15oxSFi4ijLyQyOhXPl7La6haFiGEOhUH1zig37S/hmSSGMhejg/0i6xHKXh0ackTko3Eg9tXCcVf8nfizfRBsYGMK6IvA/02+4f6lYe0f6MaGi4jaioXm/c6CalZnDxLPlRWOa5/QiSKKLeL1dDWg/lbEM6jLbMZZEk1ne4bMGPDEtHhOnDzuFbPS0IHWJTYA0DMPH7cXCleFVvt0sf8aTx+bt2aIY5rbN6AhlKLwgnCfQeGqtL9ttJaQehbkOl+k88yk4noKHT4QLwAU2UXQQBXQsoTU0hNMqywSqFMjMm1NMdiS8XXJvCrIz/1fEakXriU9gBUiSWTn3VZdczZBTngGQ1wQsWo5uKgCLo4XtbX9SYHkiIUQ+hi/OIPRmEEuJd1xcK7A4R5wyqV8yY0fu2nHS6ZxS4Mm29t+Yd4uzxZH6mvdhLwuhwrjzwd8t8RB/BWGXmNMb0N4fJ7Rh8P2GvN3vyZtgSNbqmE4YliCpDkmxlDjTLQ7Q88J64Ds2tt9+PB6B2zNvhi59d4FyqQPiVa9Fw03wGADJwMZalAv5PZgrGm1J9cyvmuqfxWYHijFEpe+mt4KXpLAYfifeJ28ARRoWlZE8b1bg4ro5lOOijZxom/Zy9hJJmump8rF6IhYayE5OqELWEKcENvumcKf6fCGmvvr4m9oILSlfRPVb2DFJFs4cEH4KLL0TfpFtiBMJDSoIUyj5NNHpzayoSmE6K3JuYMrqxRG0K096/fECV/LqfJaDaS60Zc7rcGo1X7+bydqpAkCi5mrRVaHEipZHH0Io+laiBvXPZZwkqhUbhpC33nzAxIFjquTktEdfcE4GVpCznS3yu4YH5xT7ysVxa7kYF2IfZkgZvkzBCMJ3cBjoCHLFx3GWEqmyIFC5pptAqwMOBiCbl9xjiIlMqolME8RKWq6S+P1C8zfke+SOi2JIOauaS16BmUxUvaojlMOwlBt5h1sFMpOSot3tOR4iR5beEXu8gFbzULztWookdAKz2kMdsYBi8eGDCW9gViLRO2sBL28vBi3bmTYYQw00H7QGUz4uXDNQdWnunfmbPSdBt42SbRmHstmojbbfPE0fWsIBKTcBVuVQpG/wu+mlpN+pY2tdhZNTpp4Tb6APhaO/L9DsW8jnC9FlFc+csXkqoJ+VsGc5t7zNjAlLkb2j6fhEp3UY/Uys6UAW7v6ebE0bRTSKO23AiuZN2AuhYq3PAWr3muF4nUTIgSCWDoEN5XKHaS7PJiyGDC6oe2yu9S0A3aeliXRYbPJBmh87POlSps3AzKfvPiFxqo44ZJQ1TULbbxEwUgncLPERPI4z9HowjeBU2bwIHNPs+oHvCm7rLyocce77lmY/2ZFr7oP3oq4Wj+NVRChmL6ASvyUw8jfOHmcSynwCwziYh1e4YyhAezBeEYgwBNfox5dJ4mA0/nu34ABH+LRBILuC3p46+YKSToN8MwPd13HLTETehm9O81K67A437/1gQyiz+G6aq0sjY+fttal7ODSad9lwW0WU51u3j+pC6yVPx9jmV1wT7BSIUGon3kwdwcQtOJUljYKtcpHWd8GFI9CMxe4urext5pzNgX1DpdAxdvogqBm2B5/fU11OuIB7QdRLOppon/ogyTC5GJsfyom1pwABzYaz275FAQRfM5jsQHac4kLPm0gfJbxapuoZOKYAPs8AA2gI2Bxit+fKKb2+P30LFcYPcT1fn1+329vcLZmiwwC4chvrWTg8vcCgu+qZ6sP2+nYb5q6IZVqgj/JyY3rZ7zl9wr4QQUJpUqIhKt48c6eMD6wAmCQySkMobRNwj4NTZJfo62zQooElTw7er4yrcmoecLfQC4uzphPrsyMwBcvUFJrBZNm3dYsG/m7z93NmfmgIATKPxo41uJmXrh9j1DKagS4EtLEUkGxLEahTT+6DlJtJZySozbLSxMtzoZjkDDnkitbGrYu7IfqUcmZznkIPpxBsmIB8vK5V5DD5/Po0rbesGbLLAGX/D7alKIGbSCX0S8htpLjZzoFVqxPU8cioGdqwuRZzrVN4uS743poyZi7nx8TzzjRPlIkw0lus+HG/AOa0E7nbtEh/XvgnrNVXv3G73QLvCITt43hAHTrRqBDPuEQk5/TWPsWEt9SX+nG4zmu2QWQV4i7OoKhlul93cwFkLlZ/NTk6nP9VHgTePl6it65TbtVCYUA0WxcCg5eS/GTbDEMZaXbv7PdQU22rZ0YTwKJ1caaJcvEwbeGzT1lGR3Mi5u0qF+8ETvnYHMp5mWxp8UxTdgOP2vbtmxwFd5d6KLySNYhc2/GusP4z7tB4BpM6Pok0uWmYopolFstTdNcCWjF7S8tjgIHFsBoxKGBW2RB0ZclR1SeUVe3CGB/HmfO2rOBR0bpT+3XjJZs+aaOUHadxq8YYWoPIhvAHV6W9SbfhgwP+N05Ujo3FZ6KOoPGcpy+pU56980J3Wa4KGggYloiGeozbwiWjS/WgJHP+nFmMY1z7GVHjPloiNmc/bB15csvwOtE468ZlRvYG85S7gcVQPjNBHrs6FFQUUlXFLGIgpnZBimtLopX0dDDneXRrZzQdReN2UXvkOEiOjOhkrq8qArmJEObrGUDp+0clWT0AlyQsx350bsvFZHYNyYEboq2y6LF0H0Sdrev5QN0Yrlmeh2cZ6yec5uO9jxT5LFFVOz2xQkNdt5jaGegWlsVJOs2D1HiAAoSJAjtAZNh9c6qey2kWucL3t/cvOcTSwpmyf3btbzp93tKWdTMD8JLMmF9HqemaUQGiJMTPICk/5lEL7uv1hh8WuvhS2h2qP1sAiLjt5Y4I5mmhYqa0EuZITftpoBKOJIhw5QdPmbCtVfgIR24x5SVAWdjbNA+jGrmSesdP5CfwH2CH9jAnsO+hcj3PMgtm4fL2MVZSupKPnkIsLn+9pCcqEsp6mGZlMLxiuXIKrd/t6d1ABi+Kl0MELTnH2ByQPec32dFGi8rD9sy1d8bX2/vbcTwWdAzydwzmdPK5Pj5+/vLLLxhJUz1C4fWcTlY+j3pfXQwvF0txKQgG23Pg+zfoUbT3KjySYSFvNxPU6WSYesNoDNsMuCz6+0MWPUIyvGeCzEFYYf1he7q8b4rxbK6zavRKr8JW3wbBXWZYAYbKarvfv1Kybn/jupCJS1CI4pb5CIHnAjAZEyQYzmo9rz69XvzeEzSJcy08PNcF35yVqFmFp0WZZN2J2ZObm/HJbh0SXWa2Egl8Exqv9sg2EjKaan9HE+qzb4+ZIjB+uLFE9y2w9MRYTOatCXc6smdbuWmo8U+zOmrO25oZ1YtJ0sxt7I8lDbk1K08te7a5a8ib23CHSTn5HBIgygM5jatci1TFsM4SxCEV3j6OwH4dunou+qIZ7HEnN2KyUxzNm1qJopGnWMFYuCx5ssABp/4DPNEWC6I4H1TlOEKaZaQi6jbt2axyGUv8Wn/39IrlEEo9TtNs9rdDxgaU4iVkglJmRkkwChIOC1IvG9wjZTHz+wwymz2sioiEazlk02JyVjUkM84ok8CPrfwrxG0zaFtXgkARVmdrYM3WyaUHJNCOpXxp5ELez1auRDst9XbNyH2i+dc5vzdnjURWLvqB21V2Qx0VpDCBhuSFSWZITlfegaxO+w8y5eylCNm9wrxUIFOZLPpClwGIngvDrOB5nvOQO/Rn565ZD9LGuumbwXmQSf69kIstBScqGp0MYi7MpnCkFMcp9iC9sxcRyFkTg9HMYaUggOClkN9PkFhPZb2LxtN5e3v7+PnxFHcf1oMMfvz87acCevQ044RwYfl4dQpeKtOwZxLvuiZgt+0BVsmh1IYN50N7WdGmaZKwnfPljOarG+8SXcQsVfwkL0deerpVYCBASbZsEob81V+DASWyT2VJNtPczIYFleKcYyQh/qZzGXQvS1mORkglCjZ8Jx0URyvMskCzYxOOBI9xsMBTUj21Eo/iRfHnu2lsD5CgA02vICMrHjY9w5AKaBeUSpHDb3JK6XUzfN2/wtqwrEyE1Sy+tr/89vO39/d3R9zKCnmDwG+bp6hwtUwysC4wPLjkSHEt+Z688XGnLAGeLiZozhxf6VJtbcJLppRzPdVQVPUSozBo/kPdP/ojZuAGgyWRzfXRWHfDcFb+PEUMnQK5pgrDkoh3CMzPkZr3fvuJToJLOj2MfQY55LF2RSmMzdfAb0s4xE45xDruTkh29r59yIJqMt3kOVAFbiY1Uv+sy4JnHQHk6/xd3hazHEoZKmDCjwLA2CXC1wBYJ/YRHaLZzDNlTHc4KMnbfto1lwYoCR/ODBdNHWtM2ProWr/59vYO+EjWTIvNJblRjXGrcfJjfJRR1EzGC2ieSq1YN+p50LFMZmgQyxKOtxMEWFZIA6XZ5sYiujMyN4QbB2KSG2bNPsx0nyjOMhktOXx6IBlt4Pw4Snp23YC6+WuSFgATiMuy6PkyujofpCE9H1lAbjqiaIkygGDdOYNvIlOpj4eZWSEgyS2Ks0fj/szQsx19OT3zVH70piFSNRhJyv45ug0x+rvIiMjArgsPdx3ByOcrTxIh7xLCII/GcjLklkXf01eDsKUqq8eLHVk80T5eU3p/gbqWxsDtnOqrTdlm4eYg0hqf1dtm3NAt5ki+R5ZXqmE6tve4w4Cex+dlM6xnAkfVJScDGz8nNeOxBH3gVDubTRWiE8u6YQuCbYtiLQ3+F8SzpPINCdFECPFjmqRNekQcGNA8vl6vItXK3RJtbCenQteAuGTxKaheg4Qyn2B6duUFaVcaeYlUXG2WxehkHsjvPUHfic/aO89Mu4jCU5y5iWezK42KVmjSZGBdqc+vLxXQp8cxlJu3ef9DmrIzTc412uCNb9QC9DE6buNENYNG+ggSX/QAKcMHGusg5OURKPDnHSMzCiwWvUEh72SoTqP1ZEHiMOnxMC5jHDmoB4AloYkBTBvebmAyC+kXvbDzOF9MZuXQ58qIW2XZcDT1vtHuqeeyDOziBxgw4QevMJ+vg8mxIVtmGODC5/pdW8h49e5duIV6kVUIv+RiSkTjoDjh4Eq4YkTD2FC9eRB/fjjqOLiuxcaaR7vt4/3He6B1yg8ENWXdq7JOaFQmhAB2IeGpwK73c+G7cU6W9XgF8Ha3AHREBbGVrIM15K+XOKoCNlVOMzMUJyMEUjkDWeCYWY4Ry8tZzr/eqWBjKtU551rXy1VIAXKDXnEeve68DTcej9BzNPeqzXHXVCg3OTYRN3d5TlXqRZ5AQAMH6inTqMb5SnUsO8+7NESyOFrxf+r1l3TZL0xiXcAJOc04GxbT23vzbGYDUoz1yApmwYt6cr53YXMiv53SkQjS3zp/csZ0buVfmHn5DaXNvI27AW/PwONAfoHn4sj90eqL5L34FuP3h4lLZj4WT77zm3FTyVoZ2XW+H49jlsQ7RrhlRrEexLAzGoSWWjmdJM4uBjDwgvjOuTRG673t23OplANpZCxc+VySmnMrwDliDGSZGTUBpIeBgCsnsncwWHHJct74AbE9V6NRfd21d7AZ170hbBfLabn5bU9n2UEf90LL/RKPdEFL0ZfE6JkM6DDCK9W8yl74HAwIBMAP9qdb9ojkrTcSntHv7At/e4G/82DxuN1WzjKDocuWE86vQKTpwyJnaHrH9hAKaE4xB4MvTUP9rKfEKYcY8hGXu7iEuwwIQiwteg32jYR6XpQ3KS00Y8xWFjVMv3X1IGpKt9klEvduDmb1WDv9D+cHznIkXT3NBoKT42PSvE9ZCYxSRtp1jTgxaP9JszJgnrNqv9PbzKxKmOZNy3RGJ0o7QpVIS+HuiWwRa9ph+xnmm6MUpzqzlDNahnIv0nvCW+43ymCWxQ9TADJCZKzV4HPuBqzSwoZZdVSFUurYeH1IgOetAtU0W+9ixQvIS8FqI1+M2ydhpguB+OVb0o/3H0gBR4Uad9GL4TUkM7q18gZ0klnTQe4Kwel6u0nOAFPTHs8sbx5y+ZrNmwyRT8o11vj5J6PQr5Q43AmcMQm084gSRIckeZAC2vdwHAfJiMl+VcSRvV1VcbmfYKycUY62Y+F2hdyWWS6MiXmOvzpwcxbQaaWdnElk0b0jQV4GP2Qv6Vn8iqIHKmQ63ZfSf5XhaP7Ahrtl1zj7uuvYHliQglW0q4eFFozBN7c3LpddjRxH5iqRe9927kzbyHZPK+1+ZaXj1od92c3DFDianNqq9NGxs58/fzp7gWdJ92TOIsCXY6r7/bMNNzr51Oq5SJS4Fh2HZDypx22MPoMPL7dL0qQgwYvZkpTNj2eur4wRXU5deac9X6Hl6myX+nxbm6g/go1z9019oUXq0+NpVKy/3d4Y0Za+u/K0idNZn8Ktm+7gfgLngUeWSyhEs94KocxsVhTl9WO6kc6RMliPslgeziRoUyhtAhmnMScBPy8ZbM7RfsihIbYFDMoKicEXCm6288fWc2Fzto3s0eTm4okHvnfpMVDwIU/L7iSS1L6gvhqInBcgvsxzBo9q+8i+JXyrNXRXIwYhuaVJHc5CIdj90Q4MvkCuBsd3gx7ZnIZGvWam2jzLgfwHQ1cJZm2ihUFmX1v2Ls2TTiNGC0KcZafNvTlNHoH3oSNB2exgOjXhOl+qgH7R0Ghw4KlJvNITAe6SXQ6PuhTbY6mzGHIit+MNKWIP8+AF3x+MemMNWXBm+QdFt0BMV8WEwfkJ9asjwAxo0mmcUdJ1b5PWO/IruXEywwD+ad0UdTNgBOcbSagydR6TGKmcOU/W6gFbAymDjgXZkPf7I0zY8N4g516uCMpskQpuwgs8yVIFotBCR/kysVF6ANrnaYrAGXsdSm5dNmYitmjJq6Vab4TdbtfZ0as+naB0hkNS1XtJMMbB8Rme8Ae/YHfW3Dl0lkJGR8tU3E26jaTcyindAHEoPg8CkugOUO4xbFq2LaZrM2uSh/d8PeJyYvJ/QPKGUffjeLiMogz4iDpWsvF0+C7lb9Uc0iQ+AMnNRWnhJ2www/D1+QXlaqngPTh2WGz2/mA4Kxp1YjhwuxZ+frmT6QxGyWgD5W3Zb8jKDLLMTqYkciizjpo4lmR2f2l3+DwMMGUddd+GUhg3uU6wCI3BPgrbyVRWU0HtEae7eqPwGD+J6IyuxdDpSi9RxJFRu+4VNNmpA13KOoLKLBsFjBy6EMGmxUQWOgEmlgfjc/Mukt1fPFOVd5kQ8bkWb4WH2IaPTlY9mh+8/tI36ykIE43x2eTc6ifBZ9Sv9SD6+fET+s37vu9U2DRh0049cHXzRE1Hy4V35nLmLnZKkrV75QEJON4xfxuEcmIC2W1Fq9DonvNmmA98AbiNepgdqq6CKQNN5rFh5eAcXdBl+mToGaelpurAfzeafhl/2djGoeVIzBYpK0i90MmAOTU+iKUAyJM2hJxrmCYZo2ruuTqJlNDYysoVif3mvBIVzuiCzh2o7Catsxp5sKl4N1fdy2iFfpNjhLy5jA7lcURC61A1YIxI8sPb7a0e05jNRaWESNGUj0eKHBQ6sDo1jQyqrN+JZxU//8Ri472PXph6IDdnNmpC3htMYZ6qB41sttnUMqQjA7ED/3k87hcUeI5L0YyiMRIY2LtsvTdDlFLEOns+paPPEw7Pnz650G8MPIG+EqgHQdlFJpgCX0UkNaPjd/EBlQqmRc2Q8rIvEZzR1B2vsdjtnEENrXwHLxRQl0Wbfr68SrhhFBtCoAo1+7wc7jJWWY7PqNrjp9npHl2di4s5nc0NMpXUr0ghXSmL27IgUA7gy+oWIaK22U6XRuOTziYvJq9CRL0wiToXM+34RTslqcms4lQD+8c8XfL+vDbc7LPQx2GMz1jOBen4w9i48oI8D7ixUtjqviFsba55QVqcFMvdPKF8MJ4cACQfBhTjhsbDLqRJXKaow9z0kmbSC7djBINSTZfsSItjKjoL+qYeJc/TjFMHt0u449IoAHHAwfDQqMy2vNpB1FV1jZtUdMco9b2dG2bHxvUAcZhNVoOUhV75IRSaT1LXAkJm2tIchlGG5wYYqtAIR3GLHb4+cwNKPkA7ynpjAeRlJO7yakfIVEtiQFlgj4Bys8LiZCBtk2dGLhp1xf9P2reut47jypKSc+me93/Sc/buFdsSj0gAhQIoy+k5+dHfTFYS25JIAoW6uMrFZAXS0sx6lfSILjwHfdwf68gY5uiN1VpqfM7jZPj6/Eq6M4AGKsoZ80L+DP7f0ZOpKKROEFYtgOQETMA27x7DRalswdnXGjhxwtH9rynBwfmkWIQ75bcODScMhXh0oGnEbIAXS8E0IBfMRwKM5U/197O7xbQSGac0RP6/x0brIRpNIUukbr9eDm2xTyHQbTPBz2B3+0ezT914p8NRxh4IclvFb7zZSxSYLIG30kPE73zN4UwDom4/M6kqk0t9bA0O/bXgILENb6VCcQWzsSwITnwkalA0Ifsu0I2gqNuDM5qkzuMdbTCJ+jTu91nBNlxVysvwwkSHOuGELO6fxxzsQOOZ/iZIb5JjEnp9a83lz97vP2yk/vfff98HM+f4Plpw7yM1UoSgghqYi3lyTZyqZc6gqB1QkpoBBiIsjjn+KyySpS6vWO7iIqObS1GE8W1SjnCr4G7mjOWqIlhlc5HjxhLH/rKKeEsG70sZIinhM+jXqUBonhgNcaRiuDWAb92oRkQaMb8PfDtnFNfKFAEAUMuqFI9gklBP4JZX+KFDF6HwMGZVxnR3rlRGSvswzDsxFLL3NOei8g+v0dXUA5Xb2yjVHWR93wDIKvh4/19fX+yB10uX7vC1af4IPArqRIxv7VR9cWF2u54ZjR3H5tGiFI4/s8fLlZYtKmNibdnpSXs2mX2Trgk9jDlnMvzy7Pz+1YM0awDKmXQkafYMJSkT7LnxXCzNyG5Dqg5sKoA/BlKt65I4ZmU4ECMdj5O8rfpa7aAopwyAYm6/aE5O3ExeQavTdxeMGCG2pFjlNhOhpNH0DIgSHUnryTR0drxahm8F70pvlwGzZYqJYt1kHPDIUMELJ0zHFOa+KMlaMoyc55HYp92tZNwAYDL8obDSguOBvcNjlT4eTy73ZVsV4013PJjmBtheRhLPk52b4Ulz3fNwTInbcpktSPBcquU0iANmyYk7qM9AK6cOX6KC8gs4EcIbq2rp2h+VuW5qLYyf5eXgEpDBlWiGuw0+LJY69/oe7d7KNQUhoklyZtUlRyi04OuvJfJSk8PSYhtk0GG8eMKPTUKmwoxEzZ6TZ7+4YixVoooK+xvyfpzyMBiUfbe2nPDEFpbNePaMUnpS22febonGBTw7HwCUp02P66m9jXCBgtt5DO5RFcRpsEN7e+Q3rkyIHz9EmOZl7xnYe0tPlfCXeHOVf9Kuuno+ajrcEiGS5x7YQE8Gl1Lig3pMn0MDdVogQeVod6rT8fDs0TfNnXt+EUjlo9DuXHOWDAK6aCZ+pDNncY/LPDoleWewhSPxuPzrNfcmSUw4h1wZGQNXut0CB07qSxE2qPa8xridUtHxz5QLWP3M+Kb2uNMgRXwJkPKkY1e1PNlKcejzxCXSyIvq7lF8vxjb/y8gQuMyMj/8uIUdsdlboMnYScJlUkcs2C3XmILzENDJDtLVLCEbgB9WX4Exj1QurHtrU5GhvQT7DLWXmbEAzcfrNmcx0gDqN+FsfjJI8l94RfiF0T0Qil6yZHXD+76lNUCNeRpinZPw2vEzAGSuY9S4u5B8E22keDhv9ZJMvoCpS+xSL2BSliZzGU5dveyezfZyuxnWhmwlA2S7mbadZpsB4UPJ8LJsdfuzaIJEg7mrQEGuXfVh0szzp+cS1EAFDxsWtPz7FsqhAdUHWTbniudJaIZ6VFa1LvMqkp/3cUT8U7f19rb/xeUCu6edjWgDgeH1VVzYRvzj45Z0amnqA1f0kM3MAPGyhF6nlbnU86YKJjlh0PG6QTSrak1urCV7kVewPleBbsGW6ZSh+13Csk7MyEpLHCfWefGJH3GUVktNQ36zmVgdGRtDVr39gj1EC5kTHGKhPM/i4ZEXSj0pwLC/6ODJyD/LuiZysZlWTDNWTSMnBKI4lp9cxhILHblePBDQ2vWMYsjidR7DlxSuVbIjAVdiKifsXOA9rM9J5/D+ZAAx28M2W+O5o9w8bI3Hq6rfUwzFkTHFsqjTieM2JdKwyd9vnwdzVL3YrLSJJIB/QAK0vaYyhQNKqc5UvT/4ODpOBqGQ9NZ2cXiON+PexjD0YFdT2u7AjHesaeVcV7TUHyO4CF0vA+Gs90h7BKdZI2AKG4FYGM6bHz6Cz0lk5ayKjtx/7l9fn2lHr0Ed4FWoHC9ywzC9kj+Fp016vJR1sCwr7Kw93rJGm9cWmhbZnnwvM/5LX8DPx7IGWRXT+JI5/DJMevAUSYQahleo4sLxXoOwwXKgfcahpP+UWJG2RuAS7vtgALOUrTJ8bYkfclrkxpr7hRDNoy+5lUe+Rt5Vm5CKP+HnhRJWE4KTKZDP2U/kMripoFcwYibi/bm0kzb0/nP3gtsSroIP9rvLw0GmJ6dwftF93lYyr6GWty/trk10wksDw4L6ZKlUK3JuTpCGxOEH9+d4Y8LRCCQo21ZAcAwd8HREdBMQAfpJzXOO+J+Z/QREm7G5JZ1llrvBGMK27UzyCaMrO+CecCp/fUIt68IZYTJBnRK9SmIOg96TghWTh9TX11fvDegG6Ohebufe5heCP9eJW31rJ9hOdV2/b7d2bhz3WFBUNw6yUp592S4KYk0KbcwDvfpK1Gvd0UxE2jfLGjNCW6ZUYFNXTwM6Lpyw1M6HVhI4fdKQzDeIDjRxFjxhho+nSI5BJhGHZGRqdUBPSgVz2NBnrSKVxyCbuuzwA0mSkXQEWq+Y0vUGem8JMsKqkAybSkZlp1+KZ4eH+CQVMyUMaHzWUJP5eJjv7viEHonpUHlFNRXM1dytbJlt1FAx4kRi1NgbU1rV6gF1u3F9D6gKs6e3heyN4tkxObqAnpPdvFPFRp+qg616OYK1EQfLi4vJ2cSfj21QEuKU/Oa8Va1T50qMKdGmhlBt2zXcDqM0DjngxFeZJlWLaDLMbU94dC21vjoSiRDkvklCM0wrz7ZAgn2qq40zSFd8U3x7v5XFzaRfVpBEOnHq1QJ0UALu4e5ddXH+kj3uI17oJiyadHBdxf7WQIsijkM7tfxXLaLt65zqidb5rQxVb3Opv+z/pDYjVMCK9W2YCK1LYkNm1npzMo83u5XIKyVkbsxO4OECQrSgj/jiDia+vav47lS0hPwH1Gk8a/PlWgn5bRHynkzjLyBKWww2OlHnuVqmlLuKHEtAMYFu2QBmq9nT0c3MgTfzprSZvRfs3NpUGTeCdQOVbY1u+EnINrBneejxPHXe+NbdnrubC+nK3czwtByydoithCDA8ARBPpGbLMVN1gOTomvi2FwQT0ZoATMU3uwvze3bWlOkovPtnw9hOmXznlqYlsKzy75PAXOzY78f+MLMpXjMdBT40x+xZtffRG298qtTYKRVa4Bc3V+d616iYPRR7OKWkOwphpW5n221acP1w5TxmZiH61M9sdnhbZIhSDGUPapAqR+uhwZzHTVOq5MdIl1u2VHQt/h1j1XpMKq4e/M9FsPxZHx9f93vj/Bgua+mPkVzexN7Gx+qnIdKmdNEqOWie+fbh5t9vl4Ry0LPMPooe29eNUn8+Isu5SSbR54MLYoK+Vd3pvA2+xqV5ERKFxywj8cIkWccmH/htKkluCeSjWTwd5laAnx2NsGfh0Wn1w8omZe8dWRmlUm6ySh6rz6HCQe3KWg5BIg4thAZvmb7/9OJMvHaWzuRKXuCcfGdDOBM8LLngq3qlM1jQVSN9YAJJE83Z8P9E757O8HIndrQsiCpA9DNQl1rHKaW8qvI7UQEqtcN9E5SVd8FVTpTTxnE5/dFqg7gIrKFd34CWRuepDAmdC56UYaNuWoKUYtjCvzBkeOzhwF5DfqHycvL+bNual/yNvqG/yZpn3KyCOoXCELRyFa2GZg3ONnBbHzGw7+r36CFR+XLX11FLu/eeqDaRB0Sa3fEdAPFh3e009/Z0tTughxQHiw7XtEim0awg6SNbDsfHUJqArrHZIQwCBtZmiEHiMlko5c4WqAOlo+QjKeFvWro8qylnub0cJFKDSs+dXgs+kb7FLzbvXPGvemIzViWjF9z7omb/dh4Aa4WXCWeGJqwB6sZIMAHmgU3oaa3jb8HNdjAimXZ8h0+jeEbjZmgV0QKdi0wQMEzgHmLpgvUxcM0agbiNFbLy4/xoGR4RLlx7vAsDguhxqhBeeSW15drkbXeKDQVTeOZbnUjM59V79GGtp4V0D1KRy3M0EAjgfhpNTH/nRGM8mA5fB6l15OPcAKP6pt/54F//WXSHOZuneY2MCfKFw8ZfmYPWafk1qCHJMdI1dxQdXAb5JfzM5PZyiQDbDRgXbsUzgNfhp2U4kUsywTHJxk4KEmEa4qYh3S8PZA7To6/Vjw2ZVKWoyDSn/Bhez15aispe4JGexphyPIFknOBo/eVupOxZPO8zUQS5o+HsXRfk+U8o5oW6hCptbz8PjCSi+TcZfHJY8ZJpm/ubPfwouzwPLj6r9cC8xdqoseH4YN3nJhtD3iEKOUfFKxGoL6izEGboOQLndLQ8qt9nLolMj+PAlPmmkHv+n8+jMmLy/F43P1crV7fSk0VNrtW3MpgIsZiCEtBurue4QSXMb6HQ1juLKjQC2TNoXQr2Q7VU7pe5BDLZEperxOBjo96/RDYSapHSml5bKTmSNusjlhwFL4gZMn49vPomB8PTBXEQ+n4H9/fXz8/fwKxQnKjzbQCDzF0wrP+obv9sONqrfMM65cijRcAw/KqtTgf1I+G3n1Oi5OahPE2NyE6QZpaeW/ESfBQizGsXjDeYB/PTAfuE3aKMMUujmiVFOGMZRZozhMrglsU+EGZSm5yVNn2051rNy6PvoYOGQg9KEmUpN6xm+PfE4cRF7ojOT/3kM/5mg3KfrFzv4i8MPWiUz7zkochZ2gVJ5XgnYxMsS+VRJt5hPxvSUFN06Ki5lEtPQHs6ZALpGrOp2cZtb9dDDX4dJxXXM3NTEc/ak6VZiwg00mU6UxNLcmrmBvo1aLxSoW4ZVnXEJJQnTfp5BpaHov59SNCbiftnry0zMXxgKFalv1LJRDVwsoWh6Q5ElY6SQavdTHXCHm1ljxTUIo/O/q8uiW9OOS5aVmbZocSKDjidbk4SaYGIuz5+iQ2xEWZFKFDKX7SRtUb6LoE6K2Q2cTZgVPINfl46Nmx6zjnH/eHcNHS5iFBJx0hMGoGj0tbECxpqSa5rshJPpma/X981bPjKOnOMfMWmIEV4bIq9PsvjmjvR+NpE1KFrMPuqlEg7GfTmPHNysVtM2mBPKCc2igWtFIqZy+iWiCLY3KU/+tZVDtTnpUgN23WQbREGz2ORx3HdMnObT0FwpnBFsYfZ4k+4kffBzTE07x6aiMn3rOM6MfWWw70Zbv9k/2S/PbUEJdi0gWJOvo5kSnzay1LnbFguFnmez/3DIVsOYUSa8Dff9E0BJyKCGCvhgywaJCzDueqYxKJktSKS9h4uTVHGnj+GfyUXqDJlXaiahAcmKTaRkYzPz4omCyMGAftGar3DFwjsVBWNYwy9jXCDm6QopdT8A/7cC7su5SzkFsIw9MDNBll01ITQxHV3aul1cVU6YTKEh4vs4qRVtIhxdk05cV6+Pr+arF1/vr6NKLysMWPJOSjtkYaALnNOrDjb7upE6hrLCP53LpJ+0b9b06G3Ke2nBiNJxuBkVLYAIrpnVute9vnQ8YYystsgyIPUyDAare9AyrNLOPqLCDCGHbcr07SeW4+UhqG0FDAJptqVe1Vj+QR8o57M+8t+JG1gpNHRtd5U5O0rha4Xh6IfNNwIBXpPrftqKTDlNTrwnp/PITdnq1UWxwTCpoxzrhuYofcuxeEH/b5ksrMXVWsENQ4yhrOHzQS52h9IO4mOqd+Conl8ybPjFnVZhhJ5ursQBNW4tgc1SAbVGHY7Lb1eo8r40vstnbik562oUYA+Rjj8OKXSyTuQ8wFwqPcP+nHp6PY+2xB4PMBAAlCI9CJk+dyHDv9lkJ3cJ2PB30Yey4esNJ2uEUh1rEEx5DNcXxiFuMocLcbilNAgDnYMfKpVUgtp9BNY1fT3ExQJjNQ811eX0VzRQ2TCoZnzsjwZ7cmO/+4+LhxUXnNZc+wYo4z/vj9/vAIj0XN0oQA+98U3c2J1phDVUOBjueYjZvkDh1HkObu0KhuPsrkGgDmCnUjmTLxgsQWPgyr999QuE/HuqFhoDBwgcL0+tOE29NvJw4I4JfdJgKoWELP4LIq02e2wn8TYy8v7SgZCIdkR+qWyrmG44X3U4iMO10nII26I5SL9WzgPWhpYHRzhIrYogJ0klfx8UWxuOyKOTaj195GE23h9R2U6aNc5e/v75+fn6ubXYPTsLCClnriJhJmW/T536I0476uKr0flwtjVIl78cO0RSLt2Z9KLN2OMq/LyXCGclVa7EH7HLez3/fQYPxuJbz8YRCelyAykfOEYzsCvdfeZwhNTEyZyFgZxdeaUC3WM/hOP1aDOEZiyR1vr4fImJjzgt6vtvg1qFmk/AvmttOJih8WJ99EGDmuPIbi3CD1U9QohioPuHBsh1JM2BbXpBp8SIkIeUen2aC2kb0Nd1fANcnkO3/Fd1uqMUYXhKLL2SUPjSB2vn9wn7c9k2CqQvpj70TeOXZK5qviWB1/vOVGvLR/MXxo+YED8y90kCnOGXix+NZM6dqpUk3QEDL72B9IqvYRXrlzr1Io6BYMFzTcMCIRd/QCoNYY2mwPzJudTM2jLSz5x5zffYquG9Nu1ITq+XdbTcGjGh4hzG7bjnpkEVdtT/0oca7OzKd2ruDmewcZkKyuYKlw0SlWGXwsSbOnjgE8fyWTrN80oSm7ZFlWoM4fAihR3N14zwuz9rMNut3IzeI6s6yWqWlt9z2dfHDD6OZtA908hdYRjpo3RelQiXnqbb3aUtTzGQUA0PnVZ98gUcCxW2ayx2M0GRGgIVx034m+tTLFehog1rlS2mDJ1c52DQsAkToAwfJeDO/k9eC14i5x5lVYK2IKe+42Ts9irS+Na/ADyMGWnkaz418zDuBGuh3P1/NZyDNQph9ad4KUFjkIVz3JeP68RtfZTZVQqd4jfn3++fOTKumnjEemQMgSMwowm1tsA0P2M9Na7eFoK7mGnYL0Lw6GlmBoWHHNBvHO07b6U5vUF0R6FUzaLfADx7h6bd/TnBGZkUm1LNm4/Q1QreJ5P8h3HP55fgFr9hXn2Ng5DnxgG9sriLlKTrZxW7uEaxD4WYyA4YMedGO1i6bfBGEjBUhiGGeII4eExmTi+fmTolB+/vvr+8+fP29uNoXSuRuzAZQdPp8sRn7DZy7kx7iJQYGRVfZdTUC+vr6ejwfGmWgfPQ0Nw8eW+SlDCH5LdLGsVbfobwGCrdteQzxZe9P/J/u64NFfOT+7ZRvj5gYzLABMD5roeDyNGwOZ280Xrb20NFo2UGpzxZvmJOlRPnYfVO2pW5sGHQHLAelYA1Bay56INdZaomYx+hnCYD1TPFA/dvjfLSrrua2vnrBWSmtXrJiMJtlu0duGx+OiDDjeh3IWxp07em7QVNRXfd+Tu/C/oTNUp9lQYpAQksVyi9kg8vNjhTxxA1TBV4h9oOkH2yfSd2LCDQ+P2MHByJUr4s9+B4fxZ68zFVYNi2ToBofPkeR1fFK3lpmFmrbINekj2jiu68JmNnImfH584jlGHgVgU2cZSZJBh1pXP0yaZh6giKzkpuFFo545HkLLQYY6Qt3bCchWfUjSwavPD2kw4J0zUklXiCuVJT4Aa8A2/QUU5bAVP6VrNnEOHJ820CICkEcVqvCXjgdLqFEp0xubzUKoBSQQrBftZjilcoX3csr24ksYEyByyxWRlSbyBmwVci9FBwODMGvgdm9Pxw/fwbhsGWiCHEJSVJTnVxzokLYSeoPzQeTQnTNzU4Ls5zgY3TIG9qCzyKZBIaKmmHdNnlH0qzEOTZ/5lEJutv4+5bkchgar/LdQzDNTLYyEtyCkQv5VMRWzqwqe3iyFlZtBl5fdpsM0vfjMBwaY8l95LR2hbnu0iiIJgNyUT3UGU1/ok7kPXW5sq7AIzwduOwHCbRzzPElyqOR4NS4xxkap39I5Tj1n6LzdW5V7h+ELQmURKjWKBM+TLFUGEYVs51QwDoe2qq1nXS69D806VqB8f8rBV2vXPU+F2Sg76sFHCLPR4w2fyhLafglcGc6R1rPTXfeW2ABt6LITZwezOUggHfsaMRpSIyUteNgIfgWFVDgs/eZLqmvpoVEddAUbbGQbZc3A+qlrr16nC/tBtjcm9+brbu5jWOLKy1gXob7Nxr0OWBmNR7Y313MOqSGb54QS6DeHg+mNQGS3vL2CuT1m+MZqruLNFspKe3zROQxf2tt5yesreZNHjTFvdQVt75e0iobjMFQ+CItaxizpyU6muDEnQeKJczXeD0+deE4ir5U0yq57aWGv1AyAOKbgcCrhMrtc5N/ytfrI7/YaV53Y3WMrURsUDNGXBaoBj6qwkIp+vHRc9SPy3dtJCh3BdjtbDmfiJ7MbSpXBeHmxE8LPSxh+SgKtLiQPiGHCLtsbQAlcJnnisQVCma2OiI8n5yLXOQC8ekIcetbB315OPlQUvAODh8GWRlrV90v6CTNzrlo57LnB40cNP1l7UMgB5ZIOOGWZzsj1pMpPW0MpBcNdZoaDBcgatA0tyuyndLEji/Rqsgc/XQwythKivsf7FiLeGqtXYButpo7moS+G28fJZu/bT8Gur/1VPYdfvVuyI6W7Xp+SMpoQ3F0s+hj0pzRzdS+gCU3af4fTy+xT+hDBJRnc7LEmRjUnu8g1+5q07H2UmDkzOsQpXpJ6KE8n1IknAezTNRKUw01I+RWp3Tw+QvAIs6NXMiDfAQw1icIAuc50QJw/rERF5dMlAGTfIhWUbIUY6Y459OPfsWrMdyJYDF6Wf0rT/PruDCVasVoIUIWCeZFe4RFLfEu1eFx8wcXoxFuukG/FvjM4AHMADhsvLUAhTpYk4gDwioV9JcJW0d4erO5QW7IxTNEE3pvKzBNvfqqtRfxhYpWGFJwTy2QbACGMFB48ojDEMPHNBF16qkhC0el4C7wJBJHkp9dS8K5qa3Q+sQTwXyTK7DoF2DF8LOAMq/zW28rQvOATWimUEFHwm4ppWWI2zWvmgdzQTwGUij0DTczBnszdYC1AlYGrTuzrya6G/YclS3nmwLN9M1uWfzp2rB2B5JXEGcmQbzw6t3VlAkho4JgxNl4p2D9eEvWwgD2WxSpv0WoTjU98FB+BzWZUcj+UbA6a2Wy1JBWvizBrEOMCtLg48f2ieeaI8hFCemprSGaIrr9vYq+K5Zu46mWCRrjNFXbQfMEV7dnzVFTcy1VhZ64iRxdxt0ohhEWU3ywG1d+9r6mMjNRKA/9geFmsLU48O6fLhgqqdHu1f4DpCbrqAAQCXJ32XSWa292SMcJZ4IPufPLEPLv73O41WI3NSaLl1fI7zyF33WGlL0Kj2bTdY4F6L/i08UIcIFiz2KnJT2fCtni+yatsMtbdQ3Y6mpMn8PLL4pfj6mRrFFIGO5jIwkT22Uy4eFOB6L1w26I6pVFxcibo1rxoEblZaKg8to/65+ePx64OENOF1L8ZXk2uSvJWLzYRX5zqwfFA0TtM7hYGxDuR0dQy/QrLSZEjjZvT8VlTImll+mzB+bU41puUorLSZAzu7v4gt+zObljNgUbNHZauwDyunYbkgrurBskfb5V0qFt0AbfQrvhmA1GoDSKWpTI4ODrgDbD6wEPMot14ZonS3BGe+x3mP8+H2zeJVEB9L5eKDdVzn+wokBeQ1StvWKH0qlRT2fWPF5IdR2/WTnqA32y50rxtm5vFVeuRGF7HTB1igOojNh6twkRLXDmEDw9+J6hiEqIunxrMA/bhS57W2ECPtcRFgQehG/WBGVPf38qBsEli71gYFpIwJ6RYLN9/fedWoYUwrMrvsnhUc/OpaHmlcZCvo4dmX1gsX2X5jqGMm/FbJMJzkIhkCHgiLfg9wJqq5NsKOblazZEWh40K7fDsIAYiyYa315Pn4q9Oa4nMUOM9smsfc9Bnic6Fgedilu4sAwq4oa2T4aemhnnQJxUKybw6GOxpU+5tLSHcrZZTRHvnmSwdvPOoSuoIuYn47L1wKg3JMmwzw5Bjig0DcqghsWmGSB2UW9mO/x4vJ2Mu6HCUIs1haAYVHIfY8p///Ceg+3PlQ2BRD5AdPqrem7aroZswlMRgBh5pOikcOQ/ymbtOapClMPySQnYMiWvg5DRjHbd/TdDgFhlMRmEuNPcGdHNF9pVgR83+zl+jNJ7Me/vA3+RpidwhxqC9fy3+CPgT1lzY5S5x9kKPh+UoU9Vhhln1fRlZdC45NWAnFdEoEbcUI2sZz2saUwDHwweRAkGcAvXnawBPCRvdYSnJ5KjbmJezJQUHNM9xED2mw2zjcBQjmVeo77Cr+eeff3qEeCCBJRYdS3jBiK5nZDuTLM8Pn8O9AcLrd1624W6NuC7JNG6wDD55IsYn6XaWnfFbqI4ebomFzrtdNMpXrMbucQrGzp9XUpgez6V69oeKKMZ3OiODCr9XY7uNHjuwXdI0sB/Uj6cMK7l4kG77+uqQuKKqToAFenOQ0ii9ktuK3P1uOzC61XwpRiPhkkBBaz46c341qY1bLRHPYE9ejOAd1SWZazEKj4wlZ4Ldbox/yvwe561Wm0Zyud+HFyjbkZeU+UXD49Go3YDUclUD/QeTW7xneG7eaHoOaRMjna7Afm46Nlrcc3NYHmWDWy8fDbH9LxYDY6nOh7G9cFy7Rl2Kq5bVUnbb3yj4OhtqhyxJ48Ya3Ll19sR1Qpj313iIYXCwVPfysRWCIX0hJ9ZTd975fcLINKBtJOf3GqGWsFXTGz4eKB2Bt3xi2M1VvE4uSFef//NnHSlssw0P+NiMLihJ1lJETrgnNaLbFHu5rOoOqPYziw5zpRoQJYOv3nA8kUMBFgCjCn2GVwLOkyG5mtG3IUg3y4bFQWi4po0no89Qw3Pf5NxYc6qAjcCCVeC/+fKkor2hvGYytha1heKxjY6hVr6WvXdx8nQ5h40ytW6phTq5xeH2aYBteYFLmnzN/pADRVAlQ7J1q7/oqSwD6nYSYk/hxUHWwhFS5ht9bGofI1UtQKWtoNrkaYN4aul8tsbhTzQgm9+qxM24OicW58uypJNTnB9+fn4g8t4HvUqaLllXiHRZBHOYgzO4FOPdYrjZlH0P9RwnbeEhS26B4YoYk1FaN/nXkPqorepyM/OctCSEY/sbic/pcmgtBDSlyYnfJ3POc3i7nT2XJ49YGx3RTX79eFASg23A7T/sxBOmLqMMS92znFQJQxPxul666uCeCzUv5zCK8IxAtDl55MRruanPXyjwTAIQPkjTicqxFXb4YXFpuxpCU+bnTN1d1jxPQELaDCGySptJK9o2fH5hDi37HOxGuyabfBZrNbs1IGgp6ZGbEjdU436rhsPdyQ6eYhKQeDea3Ycj3VigXFIHK5oXmeHIy/kvGmhZXDBgZOdwADI6KrIwxY7wFi8a10jdndg+VZh8ElcjMADWkrUNnz3cKEaPhbaEJmsMm3jKQXW7JN+R7HyDtKC97m2CTmDcUN4CTtCkemotXHDIJxsl8JGOxtRPCTJEqgC1S3h8M/GE0jOQ5cOGV/Ooh3e3TgYzzrz5JChTVbiDmL4VJPfAGiMvu3E7RZ+gcqe+q9191N8igEBGaHJtpIlJH4/t3Ho7dfNAAIwgOCTYeHULrktrvxB/mvTxKEuUmFTMLs20qXN+OzT1LoCytYqK3LVQNc7IXRyzwo/sbpxw/ORf3993o3ki5syZs0PFwja6ibuKTacHbyNHi6iWgtwfn5QR7VbOhEdjU38KSYH2IP74AapqOW8FzQCmpWiXlbiq78k3HbF6GDnXMYjNhrZAe5n5B8ss7AUhjIuKN3afl4RB+TiCd+/m4nHsR+vqaQdHC7Bc0RkMbKxkDtXJbYNUNw/GRf3DEZs6aYohccqRMkMkKST0mIOTbjP40rY6Zn8IaeL6ZMB1lMkaDxZRBHs1SPSYlKU3ivuWdsoLmsPxMz9/ftCSKr81mZl2P30VUp/YibfM4CDIxLdhoXVoPlCUGUmNNFhxG5NlCiu5KyRWixcYJdpDzUYBkYJlq3SRiL3AR5ZwjyGl0jso0rFRJYogqe/HNSSSnGiPaQgWAnjoovUppzlMe+6WHSbrQuJsYgOxZ5fwx96Z444XXChTeqhLH4lf1ZLvfTxqpR8KRu11JM2Me3AsrT4FNA9d8H+8L2wBiRducNjM3jFV5GjOHrfljPU0xYf16h9uK7W8shnml1SExxSYx1Jnr3+bc6vS4/TNBOQ+4ra8/I+T4QN54JEuJRewiUY+3hGm0qg4kToBdImJDJKmhNwQdp1+DI/i6NfWCnRwYFKJikYdXWkl87D5pDw26R9X4Fb0b3qAL35IysF4rEWCK8wfaHhtIOhIfDiXK+htMogV8Z5me7FsL5Ara2D5ooxL62fXwJHHQMpzeba3mSvmiPtS36Yf4C15wgPt/YhPZbQ3xHNRg6jx2LunaVy/9PGTarY+LFnda4zu3/EDP+LN0QpLjXG5dK4cH0Twf6SZ3ownkjz8rAZYoe69OEJDxpQzSf0QSHTmNDXXBHXrZ9xLBREqC/E1dATZ48KOyyK/4qaUNPhnsDFx9VhgyPvFumSGuTBljvpn2yDcNaHIAM1VT2azoPe26UlGAxJymsCT51IY4Rm9Zw+D6ub5VGD+sPx6t0ABd3agBlTn2ZdENN4jA92aLQfLWT5fDZGS7nRG4QbXaJIofeUzwnra89vHx++Og8MGPDc5WkO6D3SYzkb/RqlD5rgwcVRIMQVcbPA2z4YgqflIWGIDYlNCMgOTt5OXh4Cb9597KY4g3XqXsg2m0PP8cF4X934mso/LyluIIR3T7ildtnkO25NUK7sFCuvxWxG0dY2XV7cncJOcIf/VGzlzIloGvMokxgUTWIgAANSZ0zvAB6+aUg0QxivXQDq5RidHunSUzcQn98ddlnQFriszoejBFUJLphqe+M+vr23bUQEmpo14pIaYV1Anm6UG2+3ktDsHx2pBuzlnNgdnBhv6cqTqCxJkm3uGDpeZBGCeqavi7HHnOlNMX47fEsOH2YgNwAm/bdSu2XvqFIOaRRRNGSLOm96C3GCpy69OhiAVL93YuQ8ySpsfR7ifO89Rd8SAS4hTpeQAoL/BriM09IXx1riJS89w/VDK33HnTBoRnAj5zyaPJipYGPn9zXBXc2+NzSEOK4nX2Ucohujxe8Cm1VvSUrO2tprysKmVAVNg8N44Lp63WHBjU5zpQPz2YAofFwPI6gkqlGNQwGi820b8HWkyNUDIToxFrAtXP/pCLFVTj+EMFtnaQ73qdJXBH016AdjGfH5+eYzDunD1kc6c5e1KUGU6BfncPm46S295gkMQuR8v/MtAb6SPeQi9uRSnhVunvy4LN9yJ9KINdHtDNwCt0PtCi5hw7D9OQFsLi1YK78aM/0tX8AEKP/ppV8W6854imAAV6M7dkue5n9oKbjb2LFTvaCn00TB4S2b3VcrMzpTe9llHD2qwioPX294C59LDFnhDbHnGLONFN+ufZibS5zhjyr7AzHeXO5rhei3ETXlVPGpPa3K8q8fzmTYyVCW1eiwBy3dHR2FJwcVC0V/urILsCi5LpiDfHSa/w4ZVsOE9mkuzMgZtOgfRCfttG7kQ0GTxx9YIicnQUx6Or15mbFfQ6oCWpY/0Asn4sIU0kzxjaWYSVcxTdYD1aoknV6B/qwVJfqAu9wexLyEZJHc2yuopBLyAxd+ywSqjOpX/2bW5CwoeYO1S3MujLy4sPDSUTANtr62OEosnHnsFbMr0JO6SpDf9GU4zuW5tD8IGG4pD4gyTFCK6OQ1es7SbD/u0gKlE0bVJhdgYsymg2/6RXy2iWEYkbXVmOOaPYzVK6KtSyyTYZdcnUH7rPoZdb9AkZ7qwJGCUdD7nW2rgFJUpO75YEqvtK1K9DHbnnWnonuxyNeMtzk+8EPeMSylWc45zN40/490R6idUg0C++/j5dkuIngACr153HyxX9V3eNnVhaoHgIO9nzKEfKJrxHkZtWZSKwl1ZLTwQ0GXcYsgVXK/Hr7M5u/e+vKniPCT7oHikFy6yPSuE1kmInEqEDpuu3g1QggfusU+BYs29Pla437XiBzvSoTjIXZ5JFgmxfHz0pAtUFs5vbYUznUspv0OTauWZpZz7Kr4xLPIqfjNR+ujYYjc4HlQnbmmiZMmGtO/723d+XOtjb8YbEzgSfKRwFCSVkmRVmSWRjqsXkJeuhn2eFGzc1SQmlpf7ls6SU2As01dR1BJ4X6p6MzOB43/Mvlo+FhxF2u32MRS1u6NkNVJkLUvTD65q9o/TvQQkyI0yxqMppBBTIzF7/Bk5SaBIypkgLDop5HizOJeLVHWFCyYDcjpte7hxgQOsdmy4CGynKQaYWD+/SqRUmjeJnj9GDx1Kl9ewYyDDim/Api5JSNNwKMAy0udYiiRHFinCS/vegQ/0xfD5iRYNpb8HTy11FpRZ+rOKP/JSXC45PyNGQI0Itl076ZaydDX41VsyQj+OEkVoQglNktIWW8DxY0pY5PRuQjZHhtWHNC3X91eouzRDUTMBtA3su5OQn+dT68xTpbv8ovgAOLQtcWGjhtQoGRrgyE05bczGfrR4jC/iKXo5uwfkLYEiI6K8mAGcPQk7s2k0uec3i8Gvy/hIfwlM3so8z5qb8uCj0exGjl0NW2Dips/qGZcmNmsNL08GWXjbyBpj4pDqS60elXXOichjl/KTRN8nWeSmhMxp+9yQ1ySlqreYNA+Sx73bczCg5FzUGhzEGmL/KqqIjqfNZVJD4VrFdh/+BoFgzy7DyAaYOCNcKelP3vIhsJHTx0Qjr+Cz7fsWwdPe2cOQ4RSdx9yayThVUODiBY9xC042X7eEMXNBXIG+OrbdS3LR2V5RfO0d+MlgsN3X95fgZbxC/Ma09BBH20mT28mDNaIAgkBJesRWSnltQC+LIV/H+OY7PmtVCqzHXGxdqiakJJIsmbMP9eaNiRgCpl10NFr4NeVl6JRjulUgJoTQHRgJ3z54a8CjHDZmSeWpk+ChuXJyHB3n5u8JnQMl2ShbSk9kbB2+TyclGSrMdlIOIHjbwdN1QRchBhboEKAn89jiMKIppQTfPrmtKvc726SCmU09x9DflUk1c335OZMgUUkjTfRsCn6FZqBy3SxSI4GfNU11Uew/BNucrkyrhjtN7fF8STEcL/zPn39U1NowDtuYNtuHkS0GZUOJb4xdPgeCxOTF19jXtSOXj8mekzAVh1uEzIOkzZV7xrGz/PFrNE/zzrVlvYdCXmM99OaVhESp7MQmhWROK1f2GZuQOg0fwfv1JTTlYeMD4kLD+E4mXTWd+vPz68+fP0nTZ47RexyfapowB73KrxylYLAhjUop7uUgDffTjFLO388Z0piJOy0d6ETmxZw7zWySSj5MgxxeYUgqDzrVY7nmSWefD/NfvPM/f360ZK9EpKERpiXKULna3EHZzJVONCgXLz1eYpchcW+NLB8epZFOGMcOkYLPLNFr5xxbB9CK2lgV9iI0hmZGfppa7SuwSDTVbBFrDhc+TCBzIH1rhgcUDMIInw3BVlSDp4dByh5c4XWAP1+fn13wkBCqZRy/E/8ztY6YrD9GQwKz9ERBSEPbmnKP/C9flklqw9RfSQdPhqP3p+mv77/6x8C0gWYFzMI3kK5wzONjpNweN0l2bv1dq4zlfOeQFeYzy0kiUaqlnEf0WW/3UMKcPcpajldHJ91VpYXGADzq2y2zRz9kolxdDRNr6G1EejZxsEIJAT0Gb1pHTc/BZ5jEHZelkokY9tqjnhEgrmMD93tfaRQFwhWFoBQ2zfjDmip2x+Gs67ogHqH+iJjEJjb6JJhhu8Ru0B5RkxSEJ1yIcWJjScldP27x3//5Wwa4wS6pFQ+IKGT9VtSCP6kvJNbV50VsjG02p1KHi2CYOaCumb6CVqn5WDArIbMGd8VpE+mtBDOiQe+hCm/TMQ2EGqzeYKgrHZ38QhIZlraK9KgNa6bPVHd1f1zST4objRiQqHxscxkQZ0gX969dGOHmq6/qnHVxsHRdziOkDIBHgST78eiMt9fzE6JI2ZjpvA2wM1/akrAOG5nkOQ+icaF4Y+uXmpVbPFD3c7Sc5w5ixAYIVa2WlorEewD0PKpj6wnUHdD04ag3POYM1ZieIibhZqbp3pbrSgPrmEs0eY2Pzw/N0C3R7ykqAzvA+NzwF6TgFn0wcNWZPRoa8VmrNd7StoU5UboToy0rt2jiHULnBRacPE/7IEKOfjMPdsDOb1vBBhPkAeMarcua6OIzAADtS2teucoeAWrxKSvdd6i6sKlHQu2gU/v6/HqaZ1loHNtkxtycGbl0Q+Il7Wsdr18X3gWGLcNEWKontq1dT7c9cZX683P7wPRawwiJBCmqoFe0fFbL+MilvWbyF7LyP9s+xoZ4jSZVJGwts9Li2GI1q7NEXK8GYx+P47WyvKtGzUfsJrZzpAzMvNSSZyjKuOp4854kUUz2/vnz83FzHYI8NJAE6dFk4hIk9iFHS/qK5G7NL+dYR8SFt30D/SGn6E7nw9iwdz9/qg4fT9pBosTiZDifbBqXUb4jH2GW/LNhmYQOx+SefV2XxBiVdKzknLKxj22p5TQlvnQLarY8EpBNvnN82D6zas5JgdvinNgk6UqsOFWTDirJGBicHPHanDIql6t7Al3g9LDwxxybmVsymtWuiNTrQY1V9QpyN+a/u2+vpHYaxFZe2FbWAvMVlCiB113LUSj/9fdf6ZB1qLQBBv10PwU63GR6XSi6hZ+V1dx45sdRLP9hHHgurKnuvdBjBwB42/WcG0HmRBjPagmnZY1b5uJeLMdH/vPzB7Q/t0nFNrwuyPBVb08gWsR4lW/inSsl2cbSJ1w9On8kHJWdNcRwqVgyZ3rusVRmcW9NYgHLlEqU73xxWhDnpBnAUFC092gSRsKJsy7PNLoij/yp2W2bwWlmOI+P4SuN25KOxJFAdl7l6gNp9ztMPcdfO07e7+/vQhmssnnIfEM1NF2fSXRA+su4GZk+bo+XpvdRZQL2NVCOUMlMyiF5Fx9jYAKuGwwPX/PS55DkMpNWpCdWRcHn159//rxcmRMJReyYEoiXvQUIh52B4ECDV4WNCLm8AxuQifbWkMK5Eb+dvYHtG5sHRM/4k1PDxI3J4WyIVjXmauEiqHe275hJznbM5rIjfsEhgqodYEJ5OaJ4eCLsIneUYdwSayquKWcjwcqXxT7ACY2qKNbm5hokh+eeAenF7F7qHExL3AmDrXFkdTH7yL8KQ7FiaWJC8u1N+XJlydyU5aqWb+PVxRPkJU+xAr5ysuDM5zPrA1VOdj7cGGzleSgMZkjfW9Si4ZZWS//mKF18DkOyBx5U+6MSB4LqYW5UXAB9/c/u2b1Y+663jrqNYlHrCUShn2gA6KwURxKVrBOFecpr2AK+oiwEcfl27fWo4Hc0PN7TAEgma7zj7k1ntKtIC5rvBxgTAhkMrV4NfXkpTrpKySn3MYXx3C2PP9sCq6xFC8daeGKvMS4pX6KqwzYy15L+RtULJtZjPjzvvvxxUA9oHxWdJlLhYXPNtseZ1FxQAdEX13WG2k6K++b7qAzR0yy13zWLiOWq4yVxoeQJ+igd1aZFDkNhW0rFK+0ccMUeXXO2KficSiQGvccbHs8Qr9eSJCISKnC6JXnTO5jhPmpV6mgLiTgekxxN1KzqWjoO0EL3zH1Fp+JtIyYrmsiDbgmmUIKTgeKp6KcG+Yu8ilxNrQKr07aPH+wNw/dfAfxGZAlp54X3y70Qh0dprHL1AAGcGN08eHvq1DxPOUrqGXguW8i+AaN0C0Hs7/Ln/vP1/ZWrTdjZdyh2ky4fEqVgYpCWX1GzthHCkNnXs4eXGZdsQiThm35UMvIXmFLpJXipr1zn8B1x10OWwhg0PcHoRjIncqgC8k6DBaRjyRvQsAtTmyQxt37TyT7eXQi3T56Ko27vAB2TpZ3cQhb4lUidHlcxXvLz4yMqEqesyPEnZECmNmbi6rWYImIizcvTDBKOnsj7CX6nid/Y/mmbvP/cj0cqcaolXxDv67i7z2FXk3hskPu4rUYJS2gZQlAlUNksmZ+/apvfvBJOGKNLBpdP5QHzACelMM42R64MGbJjgS/f8953z7/i0QTwq0Zq6euwmGTMU80mQ/mF0nw3rZSgneT8NOWithO4v5DlphR1YfiTYq2Nfn/cK9XTGuUWU9H+v11IvlOgEz2jy0SmxX4gXINw9UvmY3BCsJI4RpEnbIW565Iaro9an9urHhFbUZDXFcrubqo8xiLvAd1H3UzTcVFdp7R6dxAcNmcnslgr9I8nXp3caewtpbyoriAMfMMIJqdUjoj9BWdseiJr0Dbxr4hy4Ey59UKftN5yqzZohbMVw7XDJy+Gjq7uqtuWpxM34nh7mCuT5415rc9lWA3wHTRrJ4MOHsnvAg00iOOEmSb6CjHyqq8uN3tLcV+PezzAfm999ICLKdE6ZYwuUVobnIrrawGpGDMKZtex8lB3Grs68jAdlYYEOyQ7e6wuDYOiSsNZFTGgAxq3OAUVRUfPGUAEqCvTtyeeHhXoXJosLZBTtphof3ky6FnezoJ3ySUA2PSx9fYMYrMtvNIRcpASwTg8Ic1C3BcnjN8swc2IWCoNJCrGUXZuabdFzzDv8eDUiPyDZdYnQJmMC22gKRcHCa6ytQ14k6LysFJZWzMer9Ce5+Wx1H2PstqIdfai4rZaaoEnhHt/WSfbtkHCqVAapItOT+oWUxrkx/73f/73++urxGw8HMew4ThKqUYDPnDjsDEvkY8ZsPyBjv/8+VEqR+XixRvlZVnfi0Wqcx/9FG2XOo0RZv7KzIGFyHjDnSMsaWixATt9P6qUYCbyGDJIcXjarJ9spjVjHm7jYEUdVqxofVLwwrKcDKE5LQCVOVzhUluLagouvdC7aTk9AtbkkevN/XF6sntMOvsGqXOSvVtlqd4HVKsEwZq5psInXWEEIAZcD8znk5F+s7mDUVP8KKfRyTgZRsNA/DbZ3sYWcsOnO47sz8+PVHopuNECw3niBlWJJwvBftFzwMqwf5c6dxRy88z7pE5rGoqcH8FIJuURm6KiZKV+8SVcQ6bByUcO0R6veqGzKHEYTwV2Og0PpE3yYba9BpPf4EbX0iijKg47ewfqwUJnlPj/aZh3pww/8d6OInD5P//n/6atgrfhOc7epxuU1ckNC0OQx88olm+EmW3bDSZvaoBlazpL5muF386MW3uIejQXG++qSZAeQ0nDAeGuz5BVO1/jAHHWqpgyGNvKJ3F1KkMNf2Dddur/tCx+ZxXOoPCzB9R/lst8aJ5znbCMGu0lEf3s6I1lML9pZVpBche/0A19ajm1fThZtGGriqZ3uk9bNTsiqp7pymTdyDBOrZF4pw7bpZwGCxWYdJmWHeousWWB8ODvv/5e/vd//id3G9biMMQeAlHIP30fNiN2dWJQubGg1XFe0dsNNDLlz7zw88Klz25wlW43c5nGu72b20LI+m7FEhM/bPZZHtGvQYbZYpECvWJKM4qJXuuAO7YAa9boO2QShbcNsU2vtzzm+93XCR4f2SWinuuxHUa+ump5LQAFqLEYKXhE70StP6WcJKzP6gif8GhOtr2Kp2vbOR8WHoUHsaJdrV8mNRhv6MhmZ8N69eywsu3v//y93D4+jrqC7by9UNZQiRq0I3bySgWpgJJRfQDi7pYKjlwZdKsycdP5cQ1sRIAMcmz987//qCStZWfcYjkGafB5v/98f38D9NQWXN/JTZAxyO1HRPROnDm7WKSwYUNfR4eUfHaTmOEASVffv1t7bRfSJohimHFIsslFMYMxuTyd3u20LGs8VrtuW+P46qr8x/3EN7JakgOCrq0S0Vs2ttaOSC4hTpPH9nBOyb0ESbR1ytZ2HlNgq5bcR4bRxe4gcxxrASwhSTcC3M+h7rgyTJoGFC7q9p1CFm/j8RhWrDRXDqiFGdzOxBPQ8myEV7EERd0mQSTFPCdDek0tp7s+1wwyKuJqp0yO57JI2PziaIvHp1o8vcYg458/f2RlQmyASBHdYCyNU/4UUjpffX18fjCTYva7r7/e4M2sSSGOC9M+JJcNasuOvPT5AErGJT3DBlYDlwcLDA3w66rmaSf0mGRkf7WG28miRXLhMsBN1ldJOCKfM+NRXlmwgaY7mU5w5TyMuG9YY2DLK0uN7Si7V+TzKfm4QTZaXYCSJ45sgL64nkEuGavy5GTgTjRbxtbM08bNG973WyCTZ/B4cp6snYgBn1OmfAtvSlPQzXYpmWEJqUk+r463L2Gdbqk7FMxu9iZQVXvJrD4vcSwIol7GoIRHvJbg65EOnNRKcf709P2gQhEoqQaurhjsLSR/5S0TxLP8ui+WnB96MnRCrMm66FHmXNqhic3nTGgg+/ImbSOaVWYojbG3ge80O1LWDM31lq/Prw4oLROfxMAHrprm1V+r27VjXOWE5N3j/Qir9X0i9RhcEerJ0NqrSmPUPAF4laccwaHoNeXR//z8wKOz7zEkypi5faf3XK83WJDoZtAou8yglvQZr9eC/MJTisZa3oY/6LMy5C/wV4REgat5pzaKoSopaZk0wB5eKouLcfeS9Mz5Omge3MfutC9PgoRY3OusRB/92743HiRD0MuWxshC0MfT8p9OjlrKUMa5LZ8OIu+O9m6+QSxf31/q2kncfWzGe2u89MNATTsBd89U8SSRxY+iReQX6D1B/hEc4ARXNQxE2BYpPI9NLCVNN41Oq9k7Z5aHeUiZaLg5uNF8PtCnIutqVdMlWlI0lJLNAdRmlDVl7zposDifz8f6i7kEg1fSMk1Z6YEGxqz4ZUzNOVUMaxh/9rjg3XathvqnDxlu66sp3amf4gsVR0DA2PFy2GmG1VsoCAKL87k92XhF1DLJrynFhIKvIQwgdq7vVHxD2Pr7UV+3M5qQxkUm5vaUYcFMd3BC9axojQf7yJIyJ9M9VHs1ihZa38yUv9VeVs/8To4jbs4lkTvdLXiHgkTx5v2cd1REFR3zrK7ahtuH0hyaFrKkzF5ySuwLUB96mpcPXIJW7RqqP/vc4hsOlgZknhBeJs9tO9Aeo4lPm70SNFrOBZetfT87vecHNPHH3G07sqTD/WXYugRzaxjnpIgjnsBCPKiZuYsSp/HS/QF73JkN0KdXkq0ypXj4hlpPa4amhHLMd9xx2v5Mt1anvQvRfaJ4TNhieg+fX58iCMyB2zVvw8rcvt+FHF+p4+aUNPwWxnl85iCaROXIy5ukrONfuyH5zz2wmk0JrYHZ7wg8CJrQUVd702ngHX90H9VnORMxChCUdgTNwotmU8RA00OyH1DGbkAjpKhgPQmmkWqFL/VLZVKtUxEYcjP0jKWNtfJSGTXSh+mErQPZzyfxFCLMHLNaKaKhDQhkEAR1+xPuuDCxOVoLYoYyzfCD8NdilZNIQC6u5MbxLXQUmWOaXgzz5X7zjCkXP9FeSBuG6C6oPUPb//r+C6ZJ+94wegQQPswLNtdDlzdRDMnrRXp0ppHBU/Eqbqs5P1J5K/XNiwoKLERUwGWp9QJixoYoHYuEQW1+Un0PVoI9qWqFTFFSlI4LWNrp3Zmn41iW6YgoFl3FOkoNoyCbWmlB0eGIAjtH7LXgRj5Qnx2x2c6eHH/z6+trt1atiFXMQEUeMKaeCSFSCIFxoD1T83spW6OkEjGdfVlWAc6D8ZPdOd0IbZitM4HmgrK//vrrjhlISkazy8pi1i4TW1YmulUTcAtSQRVU+2BaK4x119UrjaVeEZ7FImRY554iJ5rH0U7yjRIJVw7xnno6IoBT28ZTP8kFxBxGcEn9TqklCs0anXiyN8E+KFhd9aSPhzBHRIoIzAMbUx+ACOpfC7eFWq1te/50LWK7jR+JBWLGCreR8Y+39QbRhXah285JC4ArjDhct+czXLQSXAFRH/AswjvVpo7LEE7oYnjc7z6ZY8qQrbGXi74FOidvpePdXHWfLAhOTp3YTsaU/mwzg7WJgcLim+CBuezGbD5lWEsbaIJkKRsaifIm4tbst4ogj6VwaKgffReeBrknHi4mM2CfKTemNuloUtvnyKkLYLfTzvdoYGr7JRqYOS4IHUVuA5gExb3fL+hY8+PkJNb6Ank3RaSOJlpgT4YgrNTQGoqg3XMNKSLiU6rD6ZGa8SFbQi6ETNLBXWB+vRomYsJaJevjc88gmeVBYZenhpTfI7lvrwH6SKOkZKd0xUec8+ocpE0ZWpw/PdiaC1ecb6Uwkk4mV5Mtqwbxdn2JC9MFHHdI3/Nq7mMXhFAQwNSHPPr5BaIX16UKg1ad2bepVJMj4vFA94xWxKmW55TBJc+kL+KU4kKPrXjNupwoB5CiHXFvIRmo1JKnbbplyCWS4wjU9ACBdNd+I+Zou80YE29IhIecuhiBHQ5NKves15vErmqLq5we5f1Or8+MPfcy2Z4nEJB53MsVgfqbV7hs4XD+a640vhq62dZSYSvPN29NJnYvHu7xTgrGTBcNd6WJE8SoPsSs2ZGW62dkc7hnIz+GnUS9OJTEaKYJEl8JlSqrL8ht7SRFZVzUGhqPaBrSgrev1zulcdRdJG6GEN4ZsMLJYPd3SV1cXwxjuHT8yP8TYAA8xTlZ5deRGAAAAABJRU5ErkJggg=="
    //myChart._dom.style.backgroundImage = "url('" + backImg + "')";

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let times = [];
    let options = [];
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);//["#294D99", "#156ACF", "#1598ED", "#45BDFF"]


    for (let i = 0; i < dataset["data"].length; i++) {
        let opt = {
            series: []
        };
        let row = dataset["data"][i];
        times.push({
            value: row[columns[0]].value,
            tooltip: {
                formatter: function (params) {
                    return params.name;
                }
            }
        });
        if (configs.liqiudIsStack.value.toBoolean()) {
            let serie = {
                name: row[columns[0]].value,
                z: 6,
                type: "liquidFill",
                dimensions: [columns[c]],
                data: [],
                color: colors,
                //center: ["50%", "50%"],
                //radius: "50%",
                amplitude: "8%",
                waveLength: "80%",
                phase: "auto",
                period: "auto",
                //direction: i%2==0?"right":"left",
                smooth: configs.lineSmooth.value.toBoolean(),
                shape: configs.liqiudShape.value == "whale" ? __SYS_IMAGES_PATH__.whale : configs.liqiudShape.value,
                waveAnimation: true,
                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: colors[0],//"#1598ED",//"none",
                        borderColor: colors[1],//"#294D99",
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.25)"
                    }
                },

                backgroundStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops:
                            [{
                                offset: 0, color: colors[Math.floor(colors.length / 2) + 1] // 0% 处的颜色
                            }, {
                                offset: 1, color: colors[colors.length - 1] // 100% 处的颜色
                            }],
                        global: false // 缺省为 false
                    },
                },

                itemStyle: {
                    opacity: Number(configs.liqiudOpacity.value),
                    shadowBlur: 50,
                    shadowColor: "rgba(0, 0, 0, 0.4)"
                },

                label: {
                    show: true,
                    color: configs.liqiudLabeColor.value,
                    insideColor: "#fff",
                    fontSize: configs.liqiudFontSize.value,
                    fontWeight: "bold",
                    align: "center",
                    baseline: "middle",
                    position: "inside",
                    formatter: function (param) {
                        return param.seriesName;
                    },
                },

                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                //animation: configs.animation.value.toBoolean(),
                //animationThreshold: Number(configs.animationThreshold.value),
                //animationEasing: getAnimationEasing(configs),
                //animationEasingUpdate: getAnimationEasingUpdate(configs),
            };
            setSeriesAnimation(serie, configs, -1);
            for (let c = 1; c < columns.length; c++) {
                serie.data.push({
                    name: columns[c],
                    value: row[columns[c]].value,
                    direction: configs.liqiudDirection.value == "auto" ? (c % 2 == 0 ? "left" : "right") : configs.liqiudDirection.value
                });
            }
            opt.series = serie;
            options.push(opt);
        } else {
            for (let c = 1; c < columns.length; c++) {
                let serie = {
                    name: row[columns[0]].value,
                    type: "liquidFill",
                    dimensions: [columns[c]],
                    data: [],
                    color: colors,
                    //center: ["50%", "50%"],
                    //radius: "50%",
                    amplitude: "8%",
                    waveLength: "80%",
                    phase: "auto",
                    period: "auto",
                    //direction: i%2==0?"right":"left",
                    smooth: configs.lineSmooth.value.toBoolean(),
                    shape: configs.liqiudShape.value == "whale" ? __SYS_IMAGES_PATH__.whale : configs.liqiudShape.value,
                    waveAnimation: true,
                    outline: {
                        show: true,
                        borderDistance: 3,
                        itemStyle: {
                            color: colors[0],//"#1598ED",//"none",
                            borderColor: colors[1],//"#294D99",
                            borderWidth: 2,
                            shadowBlur: 10,
                            shadowColor: "rgba(0, 0, 0, 0.25)"
                        }
                    },

                    backgroundStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops:
                                [{
                                    offset: 0, color: colors[Math.floor(colors.length / 2) + 1] // 0% 处的颜色
                                }, {
                                    offset: 1, color: colors[colors.length - 1] //configs.liqiudBackgroundStyle.value // 100% 处的颜色
                                }],
                            global: false // 缺省为 false
                        },
                    },

                    itemStyle: {
                        opacity: Number(configs.liqiudOpacity.value),
                        shadowBlur: 50,
                        shadowColor: "rgba(0, 0, 0, 0.4)"
                    },

                    label: {
                        show: true,
                        color: configs.liqiudLabeColor.value,
                        insideColor: "#fff",
                        fontSize: configs.liqiudFontSize.value,
                        fontWeight: "bold",
                        align: "center",
                        baseline: "middle",
                        position: "inside",
                        formatter: function (param) {
                            return param.name + "\n\n" + Math.round(param.value * 100) + "%";
                        },
                    },

                    emphasis: {
                        itemStyle: {
                            opacity: 0.8
                        }
                    },
                    //animation: configs.animation.value.toBoolean(),
                    //animationThreshold: Number(configs.animationThreshold.value),
                    //animationEasing: getAnimationEasing(configs),
                    //animationEasingUpdate: getAnimationEasingUpdate(configs),
                };
                setSeriesAnimation(serie, configs, c);
                for (let t = 0; t < 3; t++) {
                    serie.data.push({
                        name: columns[c],
                        value: row[columns[c]].value,
                        direction: configs.liqiudDirection.value == "auto" ? (t % 2 == 0 ? "left" : "right") : configs.liqiudDirection.value
                    });
                }

                let left = (toPoint(configs.grid_left.value) + (100 - toPoint(configs.grid_left.value) - toPoint(configs.grid_right.value)) / 2);
                let top = (toPoint(configs.grid_top.value) + (100 - toPoint(configs.grid_top.value) - toPoint(configs.grid_bottom.value)) / 2);
                serie.center = [(c * left / (columns.length - 1)) + 50 / (columns.length - 1) * (c - 1) + "%", top + "%"];
                opt.series.push(serie);
            }
        }

        options.push(opt);
    }

    let option = {
        baseOption: {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            title: getTitle(configs),
            timeline: getTimeline(configs, times),
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
                formatter: function (params) {
                    return [params.name, params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + Math.round(params.data.value * 100, 2) + "%</span>"].join("<br>");
                },
            },
            toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let times = [];

    let options = [];

    let getMapRegions = function (name) {
        let Regions = {};
        let features = echarts.getMap(name).geoJson.features;
        for (let i = 0; i < features.length; i++) {
            Regions[features[i].properties.name] = features[i].properties.cp;
        }
        return Regions;
    };
    geoCoordMap.Region = getMapRegions("china");

    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
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
                let min = +Infinity;
                let max = -Infinity;
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (Number(r[columns[c]].value) < min)
                            min = Number(r[columns[c]].value);
                        if (Number(r[columns[c]].value) > max)
                            max = Number(r[columns[c]].value);
                    }
                }
                let opt = {
                    grid: getGrid(configs),
                    //backgroundColor: configs.geoBackgroundColor.value,
                    toolbox: getToolbox(configs, container, dataset, true),
                    tooltip: getTooltip(configs, "item", function (params) {
                        return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
                    }),
                    visualMap: getVisualMap(configs, min, max),
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
                            //    let value = val[2] / (max / configs.scatterSymbolSize.value);
                            //    return value < 5 ? 5 : value;
                            //},
                            symbolSize: function (data) {
                                let size = configs.geoScatterSymbolSize.toArray([5,25],",");
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
                };
                setSeriesAnimation(opt, configs, c);
                options.push(opt);
            }
        }
    }

    init();

    let option = {
        baseOption: {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            grid: getGrid(configs),
            title: getTitle(configs),
            timeline: getTimeline(configs, times),
            tooltip: {
                show: configs.tooltipDisplay.value.toBoolean(),
            },
            toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let times = [];
    let options = []

    let getMapRegions = function (name) {
        let Regions = {};
        try {
            let features = echarts.getMap(name).geoJson.features;
            for (let i = 0; i < features.length; i++) {
                Regions[features[i].properties.name] = features[i].properties.cp;
            }
        } catch (e) {
            console.log(e);
        }
        return Regions;
    };

    geoCoordMap.Region = getMapRegions(geoCoordMap.LocalMap);

    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
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
                let min = +Infinity;
                let max = -Infinity;
                for (let i = 0; i < dataset["data"].length; i++) {
                    let r = dataset["data"][i];
                    if (r[columns[c]].value != "" && r[columns[c]].value != null && !isNaN(Number(r[columns[c]].value))) {
                        data.push({name: r[columns[0]].value, value: r[columns[c]].value});
                        if (Number(r[columns[c]].value) < min)
                            min = Number(r[columns[c]].value);
                        if (Number(r[columns[c]].value) > max)
                            max = Number(r[columns[c]].value);
                    }
                }

                let opt = {
                    grid: getGrid(configs),
                    //backgroundColor: configs.geoBackgroundColor.value,
                    toolbox: getToolbox(configs, container, dataset, true),
                    tooltip: getTooltip(configs, "item", function (params) {
                        return params.name + "<br>" + params.marker + params.seriesName + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + ((params["value"].length == 3) ? params.data["value"][2] : params.data["value"] + "</span>")
                    }),
                    visualMap: getVisualMap(configs, min, max),
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
                            //    let value = val[2] / (max / configs.scatterSymbolSize.value);
                            //    return value < 5 ? 5 : value;
                            //},
                            symbolSize: function (data) {
                                let size = configs.geoScatterSymbolSize.value.toArray([6, 18], ",");
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
                };
                setSeriesAnimation(opt, configs, c);
                options.push(opt);
            }
        }
    }

    init();
    let option = {
        baseOption: {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            grid: {
                x: configs.grid_left.value,
                y: configs.grid_top.value,
                x2: configs.grid_right.value,
                y2: configs.grid_bottom.value,
                containLabel: configs.grid_containLabel.value.toBoolean(),
                backgroundColor: "transparent"
            },
            title: getTitle(configs),
            timeline: getTimeline(configs, times),
            tooltip: getTooltip(configs, "item", null),
            toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colorPalette = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let columns = [];
    let cols = [];
    let data = [];
    let txtOffset = 8;
    let scrollingScreenGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    let lineHeight = Number(configs.scrollingScreenFontSize.value) + txtOffset;
    let groupHeight = lineHeight;
    let timeout = false;
    let colWidth = Number(configs.scrollingScreenWidth.value) / dataset["columns"].length;

    for (let i = 0; i < dataset["columns"].length; i++) {
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

    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        for (let c = 0; c < columns.length; c++) {
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

    let option = {
        aria: getAria(configs),
        grid: getGrid(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        //toolbox: getToolbox(configs, container, dataset, true),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colorPalette = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let top = containerHeight * Number(configs.walkingLanternTop.value.replaceAll("%", "")) / 100;
    let columns = [];
    let lines = configs.walkingLanternLines.value;
    let groups = 0;
    let index = 0;
    let walkingLanterGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    let txtOffset = 8;
    let lineHeight = Number(configs.walkingLanternFontSize.value) + txtOffset;
    let timeout = false;
    let colWidth = Number(configs.walkingLanternWidth.value) / dataset["columns"].length;
    let dire = configs.walkingLanternDirection.value;

    let title = {
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

    for (let i = 0; i < dataset["columns"].length; i++) {
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

    let option = {
        aria: getAria(configs),
        grid: getGrid(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        //toolbox: getToolbox(configs, container, dataset, true),
    };

    let pool = [];
    let children = [];
    let count = 0;
    for (let i = 0; i < dataset["data"].length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
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
    if (children.length > 0)
        pool.push(children);
    groups = pool.length;
    option.graphic = walkingLanterGraphic.concat(title).concat(pool[index]);

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);

        let left = dire == "LR" ? 0 : containerWidth;
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
                    graphic: walkingLanterGraphic.concat(title).concat(pool[index])
                }, {replaceMerge: "graphic"});
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

    let myChart = echarts.init(container, configs.echartsTheme.value);
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colorPalette = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let top = containerHeight * Number(configs.windowShadesTop.value.replaceAll("%", "")) / 100;
    let left = containerWidth * Number(configs.windowShadesLeft.value.replaceAll("%", "")) / 100;
    let columns = [];
    let lines = configs.windowShadesLines.value;
    let pageIndex = 0;
    let lineIndex = 0;
    let dire = 0;
    let windowShadesGraphic = getWaterGraphic(__SYS_LOGO_LINK__);
    let txtOffset = 8;
    let lineHeight = Number(configs.windowShadesFontSize.value) + txtOffset;
    let timeout = false;
    let colWidth = Number(configs.windowShadesWidth.value) / dataset["columns"].length;

    let title = {
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

    for (let i = 0; i < dataset["columns"].length; i++) {
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

    let option = {
        aria: getAria(configs),
        grid: getGrid(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        //toolbox: getToolbox(configs, container, dataset, true),
    };

    let pool = [];
    let children = [];
    let count = 0;
    for (let i = 0; i < dataset["data"].length; i++) {
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
        for (let c = 0; c < columns.length; c++) {
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
                    dire += 1;
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
                        if (i <= lineIndex) {
                            pool[pageIndex][i].ignore = false;
                        }
                        else {
                            pool[pageIndex][i].ignore = true;
                        }
                    }
                    myChart.setOption({
                        graphic: windowShadesGraphic.concat(title).concat(pool[pageIndex])
                    }, {replaceMerge: "graphic"});
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let rows = [];
    let series = [];
    let valueMin = +Infinity;
    let valueMax = -Infinity;

    let serie = {
        name: configs.titleText.value,
        type: "surface",
        data: [],
    };
    setSeriesAnimation(serie, configs, -1);

    let data = [];
    for (let c = 0; c < columns.length; c++) {
        if (c == 0) {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                rows.push(r[columns[c]].value)
            }
        } else {
            for (let i = 0; i < dataset["data"].length; i++) {
                let r = dataset["data"][i];
                data.push([i, c - 1, r[columns[c]].value]);
                if (valueMin > r[columns[c]].value)
                    valueMin = r[columns[c]].value;
                if (valueMax < r[columns[c]].value)
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

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", function (params) {
            return rows[params.value[0]] + "<br>" + params.marker + columns[params.value[1] + 1] + ":&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + params.value[2] + "</span>";
        }),
        //toolbox: getToolbox(configs, container, dataset, true),
        visualMap: getVisualMap(configs, valueMin, valueMax),

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let data = [];
    let normal = [];
    //正常数
    let outlier = [];
    //异常数据
    let valueMin = +Infinity;
    let valueMax = -Infinity;
    for (let c = 1; c < columns.length; c++) {
        let d = [];
        for (let i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            d.push(row[columns[c]].value)
            if (valueMin > row[columns[c]].value)
                valueMin = row[columns[c]].value;
            if (valueMax < row[columns[c]].value)
                valueMax = row[columns[c]].value;
        }
        let q1 = getQuartile(d, 1);
        let q3 = getQuartile(d, 3);
        let iqr = q3 - q1;
        let lower = q1 - 1.5 * iqr;
        let upper = q3 + 1.5 * iqr;

        data.push([lower, q1, getMedian(d), q3, upper]);
        //盒须图数据结构:
        //[下边界，Q1,MEDIAN/Q2,Q3,上边界]
        //下边界=Q1-1.5*iqr;上边界=Q3+1.5*IQR
        for (let e = 0; e < d.length; e++) {
            if (d[e] < lower || d[e] > upper)
                outlier.push([c - 1, d[e]]);
            else
                normal.push([c - 1, d[e]]);
        }
    }

    let serie = {
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
    };

    setSeriesAnimation(serie, configs, 0);

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        tooltip: getTooltip(configs, "item", null),
        toolbox: getToolbox(configs, container, dataset, true),
        xAxis: getXAxis(configs, "category", columns.slice(1, columns.length)),
        yAxis: getYAxis(configs, "value", null, "left"),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
        series: [serie],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    if (configs.boxplotNormalDisplay.value.toBoolean()) {
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
                    let size = configs.boxplotScatterSymbolSize.value.toArray([6, 18], ",");
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
                    let size = configs.boxplotScatterSymbolSize.value.toArray([6, 18], ",");
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let title = dataset["data"][0][columns[0]].value;

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let option = {
        colors: [configs.clockLabelColor.value],
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        //toolbox: getToolbox(configs, container, dataset, true),
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: [
            {
                //表盘
                name: 'clock',
                type: 'gauge',
                radius: configs.clockRadius.value,
                center: configs.clockCenter.value.toArray(["50%","50%"],","),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0" ? -269.99 : -270,
                min: 0,
                max: 12,
                splitNumber: 12,
                itemStyle: {
                    color: colors[0],//configs.clockLabelColor.value,
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
                        color: colors[1],//configs.clockLabelColor.value,
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
                        color: colors[1],//configs.clockLabelColor.value,
                    }
                },
                axisLabel: {
                    color: colors[1],//configs.clockLabelColor.value,
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
                center: configs.clockCenter.value.toArray(["50%","50%"],","),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0" ? -269.99 : -270,
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
                        color: colors[2],//configs.clockLabelColor.value,
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
                center: configs.clockCenter.value.toArray(["50%","50%"],","),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0" ? -269.99 : -270,
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
                        color: colors[2],//configs.clockLabelColor.value,
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
                center: configs.clockCenter.value.toArray(["50%","50%"],","),
                startAngle: 90,
                endAngle: echarts.version == "4.9.0" ? -269.99 : -270,
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
                        color: colors[3],//configs.clockLabelColor.value,
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
                        color: colors[2],//configs.clockLabelColor.value,
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


    let timeUpdatedStatus = {
        second: false,
        minute: false,
        hour: false
    };

    function updateSeries(time, series, type) {
        let isCritical = (Math.floor(time) === 0) || (type === 'second' && time === 1);
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

    function updateClockSeries(date, series, type, title) {
        series.data[0].name = title;
        series.data[0].value = date;
    }

    setInterval(function () {
        let date = new Date();
        let fullday = date.toLocaleString("zh", {hour12: false}).split(" ")[0];
        let second = date.getSeconds();
        let minute = date.getMinutes() + second / 60;
        let hour = date.getHours() % 12 + minute / 60;

        updateSeries(second, option.series[3], 'second');
        updateSeries(minute, option.series[2], 'minute');
        updateSeries(hour, option.series[1], 'hour');
        updateClockSeries(fullday, option.series[0], "date", title);

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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});

    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let xAxis = [];
    let data = [];
    let upColor = configs.candlestickUpColor.value;
    let upBorderColor = configs.candlestickUpBorderColor.value;
    let downColor = configs.candlestickDownColor.value;
    let downBorderColor = configs.candlestickDownBorderColor.value;

    if (columns.length >= 5) {
        for (let i = 0; i < dataset["data"].length; i++) {
            let r = dataset["data"][i];
            let d = [];
            for (let c = 0; c < columns.length; c++) {
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

    let serie = {
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
    };
    setSeriesAnimation(serie, configs, 0);

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: {
            x: configs.grid_left.value,
            y: configs.grid_top.value,
            x2: configs.grid_right.value,
            y2: configs.grid_bottom.value,
            containLabel: configs.grid_containLabel.value.toBoolean(),
            backgroundColor: "transparent"
        },
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, true),
        title: getTitle(configs),
        legend: getLegend(configs, columns.slice(1, columns.length)),

        tooltip: getTooltip(configs, "axis", function (params) {
            let param = params[0];
            return [param.name,
                param.marker + "&ensp;" + param.seriesName,
                "<span style='color:" + param.color + " '>•</span>" + "&ensp;开盘价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[1] + "</span>",
                "<span style='color:" + param.color + " '>•</span>" + "&ensp;最低价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[3] + "</span>",
                "<span style='color:" + param.color + " '>•</span>" + "&ensp;最高价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[4] + "</span>",
                "<span style='color:" + param.color + " '>•</span>" + "&ensp;收盘价:&emsp;<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>" + param.data[2] + "</span>"
            ].join("<br>");
        }),
        xAxis: getXAxis(configs, "category", xAxis),
        yAxis: getYAxis(configs, "value", null),
        dataZoom: [
            getDataZoomXAxis(configs, 0, "inside", 0, 100),
            getDataZoomXAxis(configs, 0, "slider", 0, 100),
            getDataZoomYAxis(configs, 0, "inside", 0, 100, myChart.getWidth()),
            getDataZoomYAxis(configs, 0, "slider", 0, 100, myChart.getWidth())
        ],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
        series: [serie]
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));
    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let banners = [];
    let index = 0;

    let lineHeight = containerHeight / columns.length;

    for (let i = 0; i < dataset["data"].length; i++) {
        let r = dataset["data"][i];
        let group = {
            type: 'group',
            id: 'banner',
            top: "center",
            left: "center",
            children: [],
        };

        for (let c = 0; c < columns.length; c++) {
            group.children.push(
                {
                    id: "data " + c,
                    type: 'text',
                    top: c * lineHeight,
                    left: "center",
                    //z: 100,
                    style: {
                        fill: configs.bannerTextColor.value,
                        text: r[columns[c]].value,
                        font: "bolder " + configs.bannerFontSize.value + "px '" + configs.bannerFontFamily.value + "'",
                        textVerticalAlign: "bottom",//"middle",
                        opacity: 1,
                    }
                });
        }
        banners.push(group);
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        toolbox: getToolbox(configs, container, dataset, true),
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
                    }, {replaceMerge: "graphic"}
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);//["#294D99", "#156ACF", "#1598ED", "#45BDFF"]

    let series = [];
    let columns = [];
    let legends = [];
    //let maskImage = new Image();
    //maskImage.src = "logo.png";

    function init() {
        columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

        for (let c = 0; c < columns.length; c++) {
            if (c == 0) {
                for (let i = 0; i < dataset["data"].length; i++) {
                    let row = dataset["data"][i];
                    legends.push(row[columns[c]].value);
                }
            } else {
                let serie = {
                    name: columns[c],
                    type: "wordCloud",
                    gridSize: 2,
                    sizeRange: configs.wordCloudSizeRange.value.toArray([16, 60],","),//[最小字号,最大字号],
                    rotationRange: configs.wordCloudRotationRange.value.toArray([-45, 45], ","),//[旋转角度,旋转角度]
                    shape: configs.wordCloudShape.value,
                    //"circle", "cardioid", "diamond", "triangle-forward", "triangle", "pentagon", "star"
                    //maskImage: maskImage,
                    drawOutOfBound: false,
                    textStyle: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: [],
                };
                setSeriesAnimation(serie, configs, c);
                for (let i = 0; i < dataset["data"].length; i++) {
                    let row = dataset["data"][i];
                    serie.data.push({
                        name: row[columns[0]].value,
                        value: row[columns[c]].value,
                        textStyle: {
                            color: colors[i % colors.length]
                        },
                        emphasis: {
                            color: colors[i % colors.length]
                        }
                    });
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

        for (let i = 0; i < series.length; i++) {
            series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
            series[i].left = (left + (i % groupWith) * width) + "%";
            series[i].width = width + "%";
            series[i].height = height + "%";
        }
    }

    init();

    let option = {
        backgroundColor: getLinearColor(0, 0, 0, 1, configs.backgroundColor.value.toArray(["transparent"],",")),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (param) {
            return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
        }),
        legend: getLegend(configs, columns.slice(1, columns.length)),
        toolbox: getToolbox(configs, container, dataset, true),
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

        let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
        myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
        let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

        let columns = [];
        let series = [];
        let parent = "";
        let child = "";
        if (dataset["columns"].length >= 3) {
            parent = dataset["columns"][0].name;
            child = dataset["columns"][1].name;

            for (let i = 2; i < dataset["columns"].length; i++) {
                columns.push(dataset["columns"][i].name);
            }

            for (let c = 0; c < columns.length; c++) {
                let data = [];
                let children = {};
                for (let i = 0; i < dataset["data"].length; i++) {
                    let row = dataset["data"][i];
                    children[row[child].value] = {
                        parent: row[parent].value,
                        value: row[columns[c]].value,
                        children: [],
                        itemStyle: {
                            color: colors[i % colors.length]
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
                let serie = {
                    name: columns[c],
                    center: [100 / (columns.length + 1) * (c + 1) + "%", "50%"],
                    radius: configs.sunburstRadius.value.toArray(['15%', '90%'],","),//['15%', '90%'],
                    type: 'sunburst',
                    sort: configs.sunburstSort.value == "null" ? null : configs.sunburstSort.value,
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
                };
                setSeriesAnimation(serie, configs, c);
                series.push(serie);
            }
        } else
            alert("旭日图数据结构[父级名称(根级等于空),子级名称,子级数值a,子级数值b,...].");

        let option = {
            aria: getAria(configs),
            backgroundColor: getBackgroundColor(configs),
            grid: getGrid(configs),
            title: getTitle(configs),
            tooltip: getTooltip(configs, "item", function (param) {
                return [param.seriesName, param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value + "</span>"].join("<br>");
            }),
            toolbox: getToolbox(configs, container, dataset, false),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);
    let columns = [];
    let datas = [];
    let parent = "";
    let child = "";
    if (dataset["columns"].length >= 3) {
        parent = dataset["columns"][0].name;
        child = dataset["columns"][1].name;

        for (let i = 2; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (let c = 0; c < columns.length; c++) {
            let data = [];
            let children = {};
            for (let i = 0; i < dataset["data"].length; i++) {
                let row = dataset["data"][i];
                children[row[child].value] = {
                    parent: row[parent].value,
                    title: columns[c],
                    value: row[columns[c]].value,
                    children: [],
                    itemStyle: {
                        color: colors[i % colors.length]
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

    let series = {
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
                position: configs.treemapLabelPosition.value.toArray(['5%','5%'],","),
                formatter: function (params) {
                    let arr = [
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
    setSeriesAnimation(series, configs, -1);

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (param) {
            //暂不设置.需要思考
            //console.log(param);
            //return [param.data.name, param.marker + "&ensp;" + param.data.title + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.data.value + "</span>"].join("<br>");
        }),
        toolbox: getToolbox(configs, container, dataset, false),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));
    let colors = (typeof myChart._theme !== "undefined" ? myChart._theme.color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']);

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);

    function getJSONNames(json) {
        let tmp = [];
        for (let name in json) {
            tmp.push(name);
        }
        return tmp;
    }

    let parallelAxis = [];
    let data = [];

    for (let c = 0; c < columns.length; c++) {
        let axis = {};
        axis = {
            dim: c,
            name: columns[c],
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisLabel: {
                show: true,
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

    let series = {
        name: configs.titleText.value,
        type: 'parallel',
        smooth: configs.parallelSmooth.value.toBoolean(),
        data: data,
    };
    setSeriesAnimation(series, configs, -1);

    let option = {
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (param) {
            let value = [param.marker + param.seriesName];
            for (let i = 0; i < param.value.length; i++) {
                value.push("<span style='color:" + param.color + "'>•&ensp;</span>" + columns[i] + ":&emsp;" + param.value[i]);
            }
            return value.join("<br>");
        }),
        toolbox: getToolbox(configs, container, dataset, false),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let nodes = {};
    let links = {};

    let series = [];
    let legends = [];

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
            setSeriesAnimation(series, configs, -1);
        }
    } else
        alert("桑基图数据结构:[父级,子级,数据1,数据2,...].");

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "item", function (param) {
            let value = [param.seriesName, param.marker + "&ensp;" + param.name + ":&ensp;" + param.value];
            return value.join("<br>");
        }),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, legends),
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = dataset["columns"].reduce(function (tmp, column) {
        tmp.push(column.name);
        return tmp;
    }, []);
    let data = [];
    for (let i = 0; i < dataset["data"].length; i++) {
        let row = dataset["data"][i];
        for (let j = 0; j < columns.length; j++) {
            data.push([
                i, row[columns[j]].value, columns[j]
            ]);
        }
    }

    let serie = {
        name: configs.titleText.value,
        coordinateSystem: 'singleAxis',
        type: 'themeRiver',
        data: data,
        label: {
            show: false
        }
    };
    setSeriesAnimation(serie, configs, -1);

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: getTitle(configs),
        tooltip: getTooltip(configs, "axis", function (param) {
            let value = [param.seriesName, param.marker + "&ensp;" + param.value[2]];
            return value.join("<br>");
        }),
        toolbox: getToolbox(configs, container, dataset, false),
        emphasis: {
            focus: configs.themeRiverEmphasisFocus.value,
        },
        singleAxis: {
            max: 'dataMax',
            min: "dataMin",
            axisLine: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value,
                }
            },
            axisLabel: {
                show: true,
                color: configs.axisTextColor.value,
            }
        },
        series: [serie],
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

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let containerWidth = myChart.getWidth();//Number(width.replace(/px/i, ""));
    let containerHeight = myChart.getHeight();//Number(height.replace(/px/i, ""));

    let columns = [];
    let legends = [];
    let grid3Ds = [];
    let xAxis3Ds = [];
    let yAxis3Ds = [];
    let zAxis3Ds = [];
    for (let i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        if (i > 0) {
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
    for (let c = 0; c < columns.length; c++) {
        let da = [];
        for (let i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            if (c == 0) {
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
        if (c > 0) {
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
    function getSeries(pieData, internalDiameterRatio, index) {
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
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        title: getTitle(configs),
        legend: getLegend(configs, legends),
        //toolbox: getToolbox(configs, container, dataset, true),
        tooltip: getTooltip(configs, "item", function (params) {
            if (params.seriesName !== 'mouseoutSeries') {
                return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
            }
        }),
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

function getSingeAxis(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    let myChart = echarts.init(container, configs.echartsTheme.value, {locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let columns = [];
    let headers = [];
    let data = [];
    let section = [];

    for (let i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
        if (i > 0) {
            section.push({min: +Infinity, max: -Infinity});
        }
    }

    for (let i = 0; i < dataset["data"].length; i++) {
        let row = dataset["data"][i];
        headers.push(row[columns[0]].value);
        for (let c = 1; c < columns.length; c++) {
            data.push([c - 1, i, row[columns[c]].value]);
            if (section[c - 1].min > row[columns[c]].value) {
                section[c - 1].min = row[columns[c]].value;
            }
            if (section[c - 1].max < row[columns[c]].value) {
                section[c - 1].max = row[columns[c]].value;
            }
        }
    }

    columns = columns.splice(1);

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: [
            getTitle(configs)
        ],
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, columns),
        tooltip: getTooltip(configs, "item", function (param) {
            return [param.marker + "&ensp;" + param.name + ":<span style='display:inline-block;min-width:30px;text-align:right;font-weight:bold'>&ensp;" + param.value[1] + "</span>"].join("<br>");
        }),
        singleAxis: [],
        series: [],
        graphic: getWaterGraphic(__SYS_LOGO_LINK__)
    };

    columns.forEach(function (column, idx) {
        option.title.push({
            textBaseline: 'middle',
            top: (idx + 0.5) * 100 / columns.length + '%',
            text: column
        });
        option.singleAxis.push({
            left: 150,
            type: 'category',
            boundaryGap: false,
            data: headers,
            top: (idx * 100 / columns.length + 5) + '%',
            height: (100 / columns.length - 10) + '%',

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
        });
        let serie = {
            singleAxisIndex: idx,
            coordinateSystem: 'singleAxis',
            type: configs.singeAxisType.value,
            data: [],
            symbolSize: function (dataItem) {
                return (dataItem[1] - section[dataItem[2]].min) * (Number(configs.singeAxisSymbolSize.value) + 3) / (section[dataItem[2]].max - section[dataItem[2]].min) + 3;
            },
        };
        setSeriesAnimation(serie, configs, 0);
        option.series.push(serie);
    });

    data.forEach(function (dataItem) {
        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2], dataItem[0]]);
    });

    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getFunctionLine(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }
    let myChart = echarts.init(container, configs.echartsTheme.value, {
        locale: configs.local.value,
        renderer: configs.renderer.value
    });
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let xRange = configs.mathFunctionXRange.value.toArray([-100,100],",");
    let yRange = configs.mathFunctionYRange.value.toArray([-100,100],",");

    let columns = [];
    for (let i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    let series = [];
    for (let c = 1; c < columns.length; c++) {
        let serie = {
            name: columns[c],
            type: 'line',
            showSymbol: true,
            clip: true,
            smooth: true,
            //平滑线
            data: [],
            lineStyle: {
                width: Number(__ECHARTS__.configs.lineStyleWidth.value),
            },
            itemStyle: {},

        };
        for (let i = 0; i < dataset["data"].length; i++) {
            let row = dataset["data"][i];
            let type = getStringDataType(row[columns[0]].value.toString());
            let x = row[columns[0]].value;
            if (type != "float" && type != "int")
                x = i;
            if (Math.abs(row[columns[c]].value) != Infinity && (row[columns[c]].value >= yRange[0] && row[columns[c]].value <= yRange[1]))
                serie.data.push([x , row[columns[c]].value]);
            else
                serie.data.push([x, null]);
        }
        setSeriesAnimation(serie, configs, c);
        series.push(serie);
    }

    let option = {
        aria: getAria(configs),
        backgroundColor: getBackgroundColor(configs),
        grid: getGrid(configs),
        title: [
            getTitle(configs)
        ],
        brush: getBrush(configs),
        toolbox: getToolbox(configs, container, dataset, false),
        legend: getLegend(configs, columns),
        tooltip: getTooltip(configs, "axis", null),
        animation: true,
        xAxis: {
            name: 'X',
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                symbol: ["none", "arrow"],
                symbolOffset: [-10, 10],
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            min: Number(xRange[0]),
            max: Number(xRange[1]),
            minorTick: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            minorSplitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd'
                }
            }
        },

        yAxis: {
            name: 'Y',
            axisLine: {
                show: configs.axisLineDisplay.value.toBoolean(),
                symbol: ["none", "arrow"],
                symbolOffset: [-10, 10],
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            min: Number(yRange[0]),
            max: Number(yRange[1]),
            minorTick: {
                show: true,
                lineStyle: {
                    color: configs.axisColor.value
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            minorSplitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd'
                }
            }
        },

        dataZoom: [{
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20,
            endValue: 20
        }, {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20,
            endValue: 20
        }],
        series: series,
        graphic: getWaterGraphic(__SYS_LOGO_LINK__),
    };

    setTimeout(function () {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

function getDatasetImage(container, width, height, dataset, configs) {
    if (container == null) {
        container = document.createElement("div");
        container.className = "echarts-container";
        container.id = "echarts-container";
        container.style.width = width;
        container.style.height = height;
    }

    var myChart = echarts.init(container, configs.echartsTheme.value,{locale: configs.local.value,renderer:configs.renderer.value});
    myChart.showLoading(getLoading("正在加载数据 ( " + dataset["data"].length + " ) ... "));

    let source = [];
    let dimensions = [];
    let series = [];
    for (let i = 0; i < dataset["columns"].length; i++) {
        dimensions.push(dataset["columns"][i].name);
        if (i > 0) {
            series.push({type: 'line'});
        }
    }

    for (let i = 0; i < dataset["data"].length; i++) {
        let row = dataset["data"][i];
        let d = [];
        for (let c = 1; c < dimensions.length; c++) {
            d.push(row[dimensions[c]].value);
        }
        source.push(d.slice());
    }

    var option = {
        toolbox: {
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save as image",
                    type: "png",
                },
            },
            show: true,
            itemGap: 1,
            top: 20,
            right: 35
        },
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: dimensions,
            source: source,
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: series
    };

    setTimeout(function() {
        myChart.hideLoading();
        myChart.setOption(option);
    }, Number(configs.loadingTimes.value) * 1000);

    __ECHARTS__.addHistory(container, configs, dataset, width, height);
    return container;
}

