
var __ECHARTS__ = {
     type: {
         "柱状图": "Bar",
         "柱状图(3D)": "Bar3D",
         "线型图": "Line",
         "线型图(3D)": "Line3D",
         "柱状&线型": "BarAndLine",
         "条形图": "TransversBar",
         "面积图": "AreaStyle",
         "饼图": "Pie",
         "圆环图": "Ring",
         "玫瑰图": "Rose",
         "雷达图": "Radar",
         "极坐标柱状图": "PolarBar",
         "极坐标面积图": "PolarArea",
         "回归序列": "Regression",
         "散点图": "Scatter",
         "散点图(3D)": "Scatter3D",
         "金字塔": "Funnel",
         "资金流向": "Relationship",
         "组织结构": "OrganizationStructure",
         "分类集中": "WebkitDep",
         "词云图": "WordCloud",
         "水球图": "Liqiud",
         "仪表盘": "Gauge",
         "日历图": "Calendar",
         "类目轴": "CategoryLine",
         "全国地图": "GeoOfChina",
         "本地地图": "GeoOfLocal",
         "迁徙地图": "GeoMigrateLinesOfChinaCity"
     },
     themes: {
         "Default": "",
         "Chalk": "Chalk",
         "Dark": "Dark",
         "Essos": "Essos",
         "Infographic": "Infographic",
         "Light": "light",
         "Macarons": "Macarons",
         "Purple": "Purple",
         "Roma": "Roma",
         "Shine": "Shine",
         "Vintage": "Vintage",
         "Walden": "Walden",
         "Westeros": "Westeros",
         "Wonderland": "Wonderland"
     },
     configs: {

         hr_grid: {name: "图像位置", value: "", type: "hr"},
         grid_top: {name: "上边距(%)", value: "10%", type: "input"},
         grid_bottom: {name: "下边距(%)", value: "10%", type: "input"},
         grid_left: {name: "左边距(%)", value: "10%", type: "input"},
         grid_right: {name: "右边距(%)", value: "10%", type: "input"},
         grid_containLabel: {name: "包含轴标签", value: "YES", options: ["YES", "NO"], type: "select"},

         hr_toolbox: {name: "图形工具", value: "", type: "hr"},
         toolboxDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},
         toolbox_top: {name: "上边距(%)", value: "1%", type: "input"},
         toolbox_left: {name: "左边距(%)", value: "", type: "input"},
         toolbox_orient: {name: "布局方向", value: "vertical", options: ["horizontal", "vertical"], type: "select"},
         toolbox_textPosition: {
             name: "文字位置",
             value: "left",
             options: ["top", "bottom", "left", "right"],
             type: "select"
         },
         toolboxFeatureSaveAsImage:{name: "保存图像", value: "YES", options: ["YES", "NO"], type: "select"},
         toolboxFeatureRestore:{name: "还原", value: "YES", options: ["YES", "NO"], type: "select"},
         toolboxFeatureDataView:{name: "数据视图", value: "NO", options: ["YES", "NO"], type: "select"},
         toolboxFeatureDataZoom:{name: "数据缩放", value: "YES", options: ["YES", "NO"], type: "select"},
         toolboxFeatureMagicType:{name: "图像转换", value: "YES", options: ["YES", "NO"], type: "select"},
         toolboxFeatureBrush:{name: "区域选择", value: "NO", options: ["YES", "NO"], type: "select"},

         hr_tooltip: {name: "提示组件", value: "", type: "hr"},
         tooltipDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},

         hr_title: {name: "标题", value: "", type: "hr"},
         titleDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},
         titlePosition: {name: "标题位置", value: "left", options: ["left", "center", "right"], type: "select"},
         titleText: {name: "主标题名称", value: "", type: "input"},
         titleTextColor: {value: "#e6e6e6", name: "主标题颜色", type: "color"},
         titleSubText: {name: "副标题名称", value: "", type: "input"},
         titleSubTextColor: {value: "#e6e6e6", name: "副标题颜色", type: "color"},

         hr_legend: {name: "图例", value: "", type: "hr"},
         legendDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},
         legendIcon: {name: "图标",value: "circle", options:["circle", "rect", "roundRect", "triangle", "diamond", "arrow","emptyCircle", "emptyRectangle", "emptyTriangle", "emptyDiamond", "none"], type: "select"},
         legendSelectedMode: {name: "选择模式", value: "multiple", options: ["single","multiple"], type: "select"},
         legendPositionTop: {name: "上边距(%)", value: "1%", type: "input"},
         legendPositionLeft: {name: "左边距(%)", value: "50%", type: "input"},
         legendType: {name: "显示类型", value: "plain", options: ["plain", "scroll"], type: "select"},
         legendOrient: {name: "布局方向", value: "horizontal", options: ["horizontal", "vertical"], type: "select"},
         legendTextColor: {name: "文字颜色", value: "#e6e6e6", type: "color"},

         hr_axis: {name: "坐标轴", value: "", type: "hr"},
         axisLineDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},
         axisColor: {name: "轴线颜色", value: "#e6e6e6", type: "color"},
         axisTextColor: {name: "标签颜色", value: "#e6e6e6", type: "color"},
         splitXLineDisplay: {name: "显示X轴分隔线", value: "NO", options: ["YES", "NO"], type: "select"},
         splitYLineDisplay: {name: "显示Y轴分隔线", value: "NO", options: ["YES", "NO"], type: "select"},
         splitXAreaDisplay: {name: "显示X轴分割区", value: "NO", options: ["YES", "NO"], type: "select"},
         splitYAreaDisplay: {name: "显示Y轴分割区", value: "NO", options: ["YES", "NO"], type: "select"},
         xAxisInverse:{name: "X轴反向", value: "NO", options: ["YES", "NO"], type: "select"},
         yAxisInverse:{name: "Y轴反向", value: "NO", options: ["YES", "NO"], type: "select"},
         axisPointerType: {
             name: "指示器类型",
             value: "shadow",
             options: ["shadow", "line", "cross", "none"],
             type: "select"
         },

         hr_bar: {name: "柱状图", value: "", type: "hr"},
         barLabelDisplay: {name: "显示标签", value: 'NO', options: ["YES", "NO"], type: "select"},
         labelBarTextColor: {name: "标签颜色", value: "auto", type: "color"},
         labelBarFontSize: {name: "标签字号(px)", value: 12, type: "input"},
         barLabelPosition: {
             name: "标签位置",
             value: 'top',
             options: ["top", "left", "right", "bottom", "insideTop", "insideLeft", "insideRight", "insideBottom"],
             type: "select"
         },
         barLabelRotate: {name: "标签旋转度数", value: 0, type: "input"},

         hr_line: {name: "线形图", value: "", type: "hr"},
         lineStyleWidth: {name: "线条宽度(px)", value: 2, type: "input"},
         lineSmooth: {name: "使用平滑线", value: 'YES', options: ["YES", "NO"], type: "select"},
         lineSymbol:{name: "数据符号",value:"emptyCircle", options: ["circle", "emptyCircle", "triangle", "emptyTriangle", "diamond", "emptyDiamond", "arrow", "emptyArrow", "pin", "emptyPin"], type: "select"},
         lineSymbolSize:{name: "符号大小",value: 5, type: "input"},
         lineMarkPointMin:{name: "最小值点", value: 'NO', options: ["YES", "NO"], type: "select"},
         lineMarkPointMax:{name: "最大值点", value: 'NO', options: ["YES", "NO"], type: "select"},
         lineMarkLineMin:{name: "最小值线", value: 'NO', options: ["YES", "NO"], type: "select"},
         lineMarkLineMax:{name: "最大值线", value: 'NO', options: ["YES", "NO"], type: "select"},
         lineMarkLineAvg:{name: "平均值线", value: 'NO', options: ["YES", "NO"], type: "select"},

         hr_3D: {name: "3D图形", value: "", type: "hr"},
         BoxWidthFor3D: {name: "宽度(X轴)", value: 200, type: "input"},
         BoxDepthFor3D: {name: "深度(Y轴)", value: 80, type: "input"},
         AutoRotateFor3D: {name: "自动旋转", value: "YES", options: ["YES", "NO"], type: "select"},
         LabelOf3DDisplay: {name: "显示标签", value: "NO", options: ["YES", "NO"], type: "select"},
         label3DTextColor: {name: "标签颜色", value: "auto", type: "color"},
         label3DFontSize: {name: "标签字号(px)", value: 12, type: "input"},
         ItemStyleOpacityFor3D: {name: "透明度", value: 1, type: "input"},
         axisPointerDisplay: {name: "坐标轴指示器", value: "NO", options: ["YES", "NO"], type: "select"},

         hr_regression: {name: "趋势/回归", value: "", type: "hr"},
         regressionType: {name: "趋势/回归类型", value: '直线', options: ["直线", "指数", "对数", "多项式"], type: "select"},
         regressionPolynomialOrder: {name: "多项式阶数", value: 2, type: "input"},
         regressionForwardPeroids: {name: "趋势/回归前推周期", value: 0, type: "input"},
         regressionExpressionColor:{name: "表达式颜色", value: "auto", type: "color"},

         hr_pie: {name: "饼图/圆环/玫瑰", value: "", type: "hr"},
         outRadius: {name: "外半径(%)", value: "70%", type: "input"},
         inRadius: {name: "内半径(%)", value: "35%", type: "input"},
         pieSelectedMode: {name: "选择模式", value: "single", options: ["single","multiple"], type: "select"},
         pieLabelDisplay: {name: "显示标签", value: 'YES', options: ["YES", "NO"], type: "select"},
         pieLabelFontSize: {name: "标签字号(px)", value: 12, type: "input"},
         pieLabelAlignTo: {name: "标签对齐方式", value: 'none', options: ["none", "labelLine", "edge"], type: "select"},
         richTextLabel: {name: "富文本标签", value: 'NO', options: ["YES", "NO"], type: "select"},
         groupWith: {name: "每行序列数", value: 2, type: "input"},

         hr_radar: {name: "雷达图", value: "", type: "hr"},
         radarShape:{name: "形状", value: 'circle', options: ["circle", "polygon"], type: "select"},
         radarAreaDisplay:{name: "显示分区", value: 'YES', options: ["YES", "NO"], type: "select"},
         radarNameDisplay:{name: "显示名称", value: 'YES', options: ["YES", "NO"], type: "select"},
         radarLabelRotate:{name: "标签旋转度数", value: 0, type: "input"},
         radarSplitNumber:{name: "分割段数", value: 5, type: "input"},
         radarSameMax:{name: "同基比较", value: 'NO', options: ["YES", "NO"], type: "select"},

         hr_scatter: {name: "散点图", value: "", type: "hr"},
         scatterSymbolSize: {name: "数据点大小(px)", value: 6, type: "input"},
         scatterSymbolShape: {
             name: "数据点形状",
             value: "circle",
             options: ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
             type: "select"
         },

         hr_wordCloud: {name: "词云图", value: "", type: "hr"},
         wordCloudShape: {
             name: "形状",
             value: "circle",
             options: ["circle", "cardioid", "diamond", "triangle-forward", "triangle", "pentagon", "star"],
             type: "select"
         },
         wordCloudMinFontSize: {name: "最小字号(px)", value: 12, type: "input"},
         wordCloudMaxFontSize: {name: "最大字号(px)", value: 60, type: "input"},
         wordCloudRotationRange:{name:"旋转角度", value: 90, type: "input"},

         hr_liqiud: {name: "水球图", value: "", type: "hr"},
         liqiudShape: {
             name: "形状",
             value: "circle",
             options: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "container", "path"], type: "select"
         },
         liqiudFontSize: {name: "标题字号(px)", value: 16, type: "input"},

         hr_gauge: {name: "仪表盘", value: "", type: "hr"},
         gaugeAxisLabelFontSize: {name: "刻度字号(px)", value: 10, type: "input"},
         gaugeTitleFontSize: {name: "标题字号(px)", value: 14, type: "input"},
         gaugeLabelFontSize: {name: "标签字号(px)", value: 18, type: "input"},
         gaugeAxisLineWidth: {name: "圆轴宽度(px)", value: 10, type: "input"},

         hr_calendar: {name: "日历图", value: "", type: "hr"},
         calendarType: {
             name: "类型",
             value: "heatmap",
             options: ['heatmap', 'scatter', 'effectScatter'],
             type: "select"
         },
         calendarOrient: {name: "布局方向", value: 'vertical', options: ["horizontal", "vertical"], type: "select"},

         hr_geo: {name: "地图", value: "", type: "hr"},
         //geoBackgroundColor: {value: "#404a59", name: "地图背景颜色", type: "color"},
         geoAreaColor: {value: "#323c48", name: "区域颜色", type: "color"},
         geoBorderColor: {value: "#404a59", name: "边界颜色", type: "color"},
         geoHotAreaColor: {value: "#2a333d", name: "热点区域颜色", type: "color"},
         geoAreaNameDisplay: {name: "显示地区名称", value: "NO", options: ["YES", "NO"], type: "select"},
         geoAreaNameColor: {name: "地区名称颜色", value: "auto", type: "color"},

         hr_timeline: {name: "时间/类目轴", value: "", type: "hr"},
         timelineDisplay: {name: "是否显示", value: "YES", options: ["YES", "NO"], type: "select"},
         categoryLineType: {
             name: "序列图形",
             value: "bar",
             options: ["bar", "line", "areaStyle", "pie"],
             type: "select"
         },
         seriesLoopPlayInterval: {name: "间隔(秒)", value: 3, type: "input"},

         hr_dataZoom: {name: "数据缩放", value: "", type: "hr"},
         dataZoomBarDisplay: {name: "是否显示", value: "NO", options: ["YES", "NO"], type: "select"},
         dataZoomBarColor: {value: "#404a59", name: "组件颜色", type: "color"},
         dataZoomBarWidth: {name: "宽度(px)", value: 45, type: "input"},
         dataZoomFilterMode: {
             name: "模式",
             value: "filter",
             options: ["filter", "weakFilter", "empty", "none"],
             type: "select"
         },
         dataZoomHandleIcon: {name: "手柄样式", value: "rect", options: ["rect", "circle", "emptyCircle"], type: "select"},
         dataZoomHandleSize: {name: "手柄大小", value: "100%", type: "input"},

         hr_visualMap: {name: "视觉映射", value: "", type: "hr"},
         visualMapDisplay: {name: "是否显示", value: "NO", options: ["YES", "NO"], type: "select"},
         visualMap_type: {name: "类型", value: "continuous", options: ["continuous", "piecewise"], type: "select"},
         visualMap_top: {name: "上边距(%)", value: "10%", type: "input"},
         visualMap_left: {name: "左边距(%)", value: "1%", type: "input"},
         visualMap_orient: {name: "布局方向", value: "horizontal", options: ["horizontal", "vertical"], type: "select"},
         visualMap_width: {name: "宽度", value: "15", type: "input"},
         visualMap_height: {name: "高度", value: "30%", type: "input"},
         visualMap_textColor: {name: "标签颜色", value: "#e6e6e6", type: "color"},
         visualMap_piecewise_splitNumber: {name: "分段", value: "5", type: "input"},

         hr_report: {name: "报表设置", value: "", type: "hr"},
         reportFontSize: {
             name: "字号",
             value: "100%",
             options: ["100%", "110%", "120%", "130%", "140%", "150%"],
             type: "select"
         },
     }
 };

var geoCoordMap = {
    LocalMap: "北京",
    Region:{},
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
        长治市: [113.1055679, 36.18191147],
        晋城市: [112.84272, 35.50651169],
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
        "科创支行": [116.3052827705002,39.98240552960808],
        "大兴支行": [116.33653153393553, 39.7276962248458],
        "房山支行": [116.14051799007413, 39.74332826725758],
        "门头沟支行": [116.1108721865082, 39.93625766035245],
        "顺义支行": [116.65379431415559, 40.130518903732586],
        "昌平支行": [116.23950781349184, 40.22254601518041],
        "延庆支行": [115.98013717790984, 40.461168229288596],
        "怀柔支行": [116.63073676322934, 40.3111677351932],
        "密云支行": [116.8505806441803, 40.370657044797],
        "平谷支行": [117.11137734722138, 40.13446326684633],
    }
};

function toPoint(percent) {
    return Number(percent.replace("%",""));
}

function getMapConfig() {
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
    regions= sortAsc(region);
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
    };
    d.appendChild(localmap);
    container.appendChild(d);

    b = document.createElement("a");
    b.className = "button";
    b.innerHTML = "本地地图:";
    b.style.cssFloat= "right";
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
            AddGeoCoord($("city-coord-table"), geoCoordMap.City);
        if ($("custom-coord-table").style.display == "block")
            AddGeoCoord($("custom-coord-table"), geoCoordMap.Custom);

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
        let citychanged = Compare(JSON.parse(getUserConfig("geoCoordMapCity") == null ? "{}" : getUserConfig("geoCoordMapCity")),geoCoordMap.City);
        let customchanged = Compare(JSON.parse(getUserConfig("geoCoordMapCustom") == null ? "{}" : getUserConfig("geoCoordMapCustom")),geoCoordMap.Custom);
        let localmapchanged = getUserConfig("localMap") == geoCoordMap.LocalMap;
        if (!citychanged ) {
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
        if (!localmapchanged){
            let r = confirm("本地地图设置已修改,您需要保存吗?");
            if (r == true) {
                setUserConfig("localMap", geoCoordMap.LocalMap);
            }
        }
        $("local-map-config-Content").parentNode.removeChild($("local-map-config-Content"));
    };
    d.appendChild(b);

    return container;

    function AddGeoCoord(table, coords) {
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
    }
}

function getEchartsConfigs(parent) {
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
    toconfig.onchange = function(){
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
            //var container = $("tableContainer");
            var _width = (getAbsolutePosition(parent).width * 0.985) + "px";
            var _height = (getAbsolutePosition(parent).height * 0.965) + "px";
            parent.innerHTML = "";
            parent.appendChild(getEcharts(__DATASET__.echarts.type, _width, _height, __DATASET__.echarts.theme));
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

function getEcharts(type, width, height, themes) {
    $("copyright").innerHTML = getUserConfig("CopyRight");
    var container = document.createElement("div");
    container.className = "echarts-container";
    container.id = "echarts-container";
    container.style.width = width;
    container.style.height = height;
    switch (type) {
        case "Bar":
            return getBar(container, themes);
            break;
        case "PolarBar":
            return getPolarBar(container, themes);
            break;
        case "PolarArea":
            return getPolarArea(container, themes);
            break;
        case "Line":
            return getLine(container, themes);
            break;
        case "Line3D":
            return getLine3D(container, themes);
            break;
        case "BarAndLine":
            return getBarAndLine(container, themes);
            break;
        case "AreaStyle":
            return getAreaStyle(container, themes);
            break;
        case "TransversBar":
            return getTransversBar(container, themes);
            break;
        case "Pie":
            return getPie(container, themes);
            break;
        case "Ring":
            return getRing(container, themes);
            break;
        case "Rose":
            return getRose(container, themes);
            break;
        case "Gauge":
            //return getGaugeWithOne(container, themes);
            return getCategoryLineForGauge(container, themes);
            break;
        case "Radar":
            return getRadar(container, themes);
            break;
        case "Regression":
            return getRegression(container, themes);
            break;
        case "Relationship":
            return getRelationship(container, themes);
            break;
        case "OrganizationStructure":
            return getOrganizationStructure(container, themes);
            break;
        case "WebkitDep":
            return getWebkitDep(container, themes);
            break;
        case "Scatter":
            return getScatter(container, themes);
            break;
        case "Funnel":
            return getFunnel(container, themes);
            break;
        case "WordCloud":
            return getWordCloud(container, themes);
            break;
        case "Liqiud":
            //return getLiqiud(container, themes);
            return getCategoryLineForLiqiud(container, themes);
            break;
        case "Calendar":
            return getCalendar(container, themes);
            break;
        case "GeoOfChina":
            //return getGeoOfChina(container, themes);
            return getCategoryLineForGeoOfChina(container, themes);
            break;
        case "GeoOfLocal":
            //return getGeoOfLocal(container, themes);
            return getCategoryLineForGeoOfLocal(container, themes);
            break;
        case "Bar3D":
            return getBar3D(container, themes);
            break;
        case "Scatter3D":
            return getScatter3D(container, themes);
            break;
        case "CategoryLine":
            return getCategoryLine(container,themes);
            break;
        case "FunctionLine":
            return getFunctionLine(container,themes);
            break;
        case "GeoMigrateLinesOfChinaCity":
            return getGeoMigrateLinesOfChinaCity(container,themes);
            break;
    }
}

function getBar(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                    show: __ECHARTS__.configs.barLabelDisplay.value == "YES",
                    align: 'center',
                    verticalAlign: 'middle',
                    position: __ECHARTS__.configs.barLabelPosition.value,
                    distance: 15,
                    formatter: '{value|{c}}',
                    rotate: __ECHARTS__.configs.barLabelRotate.value,
                    rich: {
                        value: {
                            color: __ECHARTS__.configs.labelBarTextColor.value,
                            fontSize: __ECHARTS__.configs.labelBarFontSize.value,
                        }
                    }
                },
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
            };
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    //主题:dark,light
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['line', 'bar', 'stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },

        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            },
        },

        xAxis: {
            data: xAxis,
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                interval: "auto",
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
                type: 'inside',
                filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
                start: 0,
                xAxisIndex: 0,
                end: 100
            },{
                type: 'inside',
                filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
                start: 0,
                yAxisIndex: 0,
                end: 100
            }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            },
            textStyle:{
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            },
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            },
            textStyle:{
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            },
        }],
        series: yAxis_series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    return container;
}

function getTransversBar(container, themes) {
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
            var series = {name: columns[c], type: "bar", data: []};
            //series.stack = "true";
            series.label = {
                show: __ECHARTS__.configs.barLabelDisplay.value == "YES",
                rotate: __ECHARTS__.configs.barLabelRotate.value,
                align: 'center',
                verticalAlign: 'middle',
                position: __ECHARTS__.configs.barLabelPosition.value,
                distance: 15,
                formatter: '{value|{c}}',
                rich: {
                        value: {
                            color: __ECHARTS__.configs.labelBarTextColor.value,
                            fontSize: __ECHARTS__.configs.labelBarFontSize.value,
                        }
                }
            };
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    //主题:dark,light
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            },
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        xAxis: {
            type: 'value',
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                interval: "auto",
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            type: 'category',
            data: xAxis,
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: yAxis_series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);

    return container;
}

function getMarkPoint() {
    let markPoint = {data: []};
    if (__ECHARTS__.configs.lineMarkPointMin.value == "YES")
        markPoint.data.push({type: 'min', name: __ECHARTS__.configs.lineMarkPointMin.name});
    if (__ECHARTS__.configs.lineMarkPointMax.value == "YES")
        markPoint.data.push({type: 'max', name: __ECHARTS__.configs.lineMarkPointMax.name});
    return markPoint;
}

function getMarkLine() {
    let markLine = {data: []};
    if (__ECHARTS__.configs.lineMarkLineMin.value == "YES")
        markLine.data.push({type: 'min', name: __ECHARTS__.configs.lineMarkLineMin.name});
    if (__ECHARTS__.configs.lineMarkLineMax.value == "YES")
        markLine.data.push({type: 'max', name: __ECHARTS__.configs.lineMarkLineMax.name});
    if (__ECHARTS__.configs.lineMarkLineAvg.value == "YES")
        markLine.data.push({type: 'average', name: __ECHARTS__.configs.lineMarkLineAvg.name});
    return markLine;
}

function getLine(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                itemStyle: {},
                lineStyle: {
                    width: Number(__ECHARTS__.configs.lineStyleWidth.value),
                },
                symbol: __ECHARTS__.configs.lineSymbol.value,
                symbolSize: __ECHARTS__.configs.lineSymbolSize.value,
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
                markPoint: getMarkPoint(),
                markLine: getMarkLine(),
                markArea: {},
            };
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['line', 'bar', 'stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left: __ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            },
        },

        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                interval: "auto",
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: yAxis_series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    // 使用刚指定的配置项和数据显示图表。

    if (option.series.length > 1) {
        option.tooltip = {
            //显示活动标尺线.
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        }
    }
    myChart.setOption(option);

    return container;
}

function getBarAndLine(container, themes) {
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
                    lineStyle: {
                        width: Number(__ECHARTS__.configs.lineStyleWidth.value),
                    },
                    itemStyle: {},
                    symbol: __ECHARTS__.configs.lineSymbol.value,
                    symbolSize: __ECHARTS__.configs.lineSymbolSize.value,
                    smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
                    markPoint: getMarkPoint(),
                    markLine: getMarkLine(),
                    markArea: {},
                    label: {
                        rotate: __ECHARTS__.configs.barLabelRotate.value,
                        fontSize: __ECHARTS__.configs.labelBarFontSize.value,
                    }
                };

            }
            else {
                serie = {
                    name: columns[c],
                    type: "bar",
                    data: [],
                    label: {
                        show: __ECHARTS__.configs.barLabelDisplay.value == "YES",
                        align: 'center',
                        verticalAlign: 'middle',
                        position: __ECHARTS__.configs.barLabelPosition.value,
                        distance: 15,
                        formatter: '{value|{c}}',
                        rotate: __ECHARTS__.configs.barLabelRotate.value,
                        rich: {
                            value: {
                                color: __ECHARTS__.configs.labelBarTextColor.value,
                                fontSize: __ECHARTS__.configs.labelBarFontSize.value,
                            }
                        }
                    }
                }
            }

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push(r[columns[c]].value);
            }
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            yAxis_series.push(serie);
        }
    }
    var myChart = echarts.init(container, themes);
    //主题:dark,light
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            },
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                interval: "auto",
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: yAxis_series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    return container;
}

function getAreaStyle(container, themes) {
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
                    //    color: 'rgb(255, 158, 68)'
                    //}, {
                    //    offset: 1,
                     //   color: 'rgb(255, 70, 131)'
                    //}])
                },
                //面积图
                sampling: 'average',
                //抽样
                itemStyle: {
                    //可指定系列颜色
                    //color: '#d68262'
                },
                data: [],
                lineStyle: {
                    width: Number(__ECHARTS__.configs.lineStyleWidth.value),
                },
                symbol: __ECHARTS__.configs.lineSymbol.value,
                symbolSize: __ECHARTS__.configs.lineSymbolSize.value,
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
                markPoint: getMarkPoint(),
                markLine: getMarkLine(),
                markArea: {},
            };
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    //主题:dark,light
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            //显示活动标尺线.
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        xAxis: {
            data: xAxis,
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                interval: "auto",
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: yAxis_series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    return container;
}

function getPolarBar(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                coordinateSystem: 'polar',
                data: []
            };
            //series.stack = "true";
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        angleAxis: {
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value,
                },
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value,
                },
            },
            z: 10
        },
        radiusAxis: {
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value,
                },
            },
            type: 'category',
            data: xAxis,
            z: 10,
        },
        polar: {
            center:[(toPoint(__ECHARTS__.configs.grid_left.value) + (100-toPoint(__ECHARTS__.configs.grid_left.value)-toPoint(__ECHARTS__.configs.grid_right.value))/2) + "%",
            (toPoint(__ECHARTS__.configs.grid_top.value) + (100-toPoint(__ECHARTS__.configs.grid_top.value)-toPoint(__ECHARTS__.configs.grid_bottom.value))/2) + "%"],
        },
        series: yAxis_series,
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            angleAxis: 0,
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            radiusAxis: 0
        }],

        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    return container;
}

function getPolarArea(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                coordinateSystem: 'polar',
                data: [],
            };
            //series.stack = "true";
            series.animationDelay = function (idx) {
                return idx * 5 + 100;
            };

            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                series.data.push(r[columns[c]].value);
            }
            yAxis_series.push(series);
        }
    }
    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['stack', 'tiled']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        angleAxis: {
            axisLabel:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle:{
                    color: __ECHARTS__.configs.axisTextColor.value,
                }
            },
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value,
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            },
            type: 'category',
            data: xAxis,
            z:10
        },
        radiusAxis: {
            axisLabel:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle:{
                    color: __ECHARTS__.configs.axisTextColor.value,
                }
            },
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value,
                },
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            z:10
        },
        polar: {
            center:[(toPoint(__ECHARTS__.configs.grid_left.value) + (100-toPoint(__ECHARTS__.configs.grid_left.value)-toPoint(__ECHARTS__.configs.grid_right.value))/2) + "%",
            (toPoint(__ECHARTS__.configs.grid_top.value) + (100-toPoint(__ECHARTS__.configs.grid_top.value)-toPoint(__ECHARTS__.configs.grid_bottom.value))/2) + "%"],
        },
        series: yAxis_series,
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            angleAxis: 0,
        },{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            end: 100,
            radiusAxis:0
        }],

        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    return container;
}

function getPie(container,themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                radius: __ECHARTS__.configs.outRadius.value,
                selectedMode: __ECHARTS__.configs.pieSelectedMode.value,
                label: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                    //控制label是否显示
                    // position: 'center'
                    alignTo: __ECHARTS__.configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                itemStyle: {
                    label: {
                        show: true,
                    }
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap:true,
                hoverAnimation:true,
                data: []
            };
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value, "name": legends[i]});
            }
            series.push(serie);
        }
    }

    let top = toPoint(__ECHARTS__.configs.grid_top.value);
    let left = toPoint(__ECHARTS__.configs.grid_left.value);
    let groupWith = __ECHARTS__.configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let height = parseInt((100 - toPoint(__ECHARTS__.configs.grid_top.value)- toPoint(__ECHARTS__.configs.grid_bottom.value)) / lines);
    let width = (100 - toPoint(__ECHARTS__.configs.grid_left.value)- toPoint(__ECHARTS__.configs.grid_right.value))/groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * width) + "%";
        series[i].width = width + "%";
        series[i].height = height + "%";
    }

    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['pie', 'funnel']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left: __ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        series: series,
        label: {
            fontSize: __ECHARTS__.configs.pieLabelFontSize.value,
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };

    if (__ECHARTS__.configs.richTextLabel.value == "YES") {
        //富文本
        option.label = {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: '#999',
            padding: [0, 7],
            rich: {
                a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                },
                abg: {
                    backgroundColor: '',
                    width: '100%',
                    align: 'right',
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }
    myChart.setOption(option);
    return container;
}

function getRing(container,themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                selectedMode: __ECHARTS__.configs.pieSelectedMode.value,
                radius: [__ECHARTS__.configs.inRadius.value, __ECHARTS__.configs.outRadius.value],
                avoidLabelOverlap: false,
                label: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                    //position: 'center'
                    alignTo: __ECHARTS__.configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
               itemStyle: {
                    label: {
                        show: true,
                    }
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap:true,
                hoverAnimation:true,
                data: []
            };
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value, "name": legends[i]});
            }
            series.push(serie);
        }
    }

    let top = toPoint(__ECHARTS__.configs.grid_top.value);
    let left = toPoint(__ECHARTS__.configs.grid_left.value);
    let groupWith = __ECHARTS__.configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let height = parseInt((100 - toPoint(__ECHARTS__.configs.grid_top.value)- toPoint(__ECHARTS__.configs.grid_bottom.value)) / lines);
    let width = (100 - toPoint(__ECHARTS__.configs.grid_left.value)- toPoint(__ECHARTS__.configs.grid_right.value))/groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * width) + "%";
        series[i].width = width + "%";
        series[i].height = height + "%";
    }

    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['pie', 'funnel']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: series,
        label: {
            fontSize: __ECHARTS__.configs.pieLabelFontSize.value,
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }

    };
    if (__ECHARTS__.configs.richTextLabel.value == "YES") {
        //富文本
        option.label = {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: '#999',
            padding: [0, 7],
            rich: {
                a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                },
                abg: {
                    backgroundColor: '',
                    width: '100%',
                    align: 'right',
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }
    myChart.setOption(option);

    return container;
}

function getRose(container,themes) {
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i=0; i<dataset["columns"].length;i++){
        columns.push(dataset["columns"][i].name);
    }
    var legends = [];
    var series = [];
    for (var c=0;c<columns.length;c++) {
        if ( c==0 ){
           for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                legends.push(r[columns[c]].value);
            }
        } else {
            var serie = {
                name: columns[c],
                type: "pie",
                selectedMode: __ECHARTS__.configs.pieSelectedMode.value,
                radius: [__ECHARTS__.configs.inRadius.value, __ECHARTS__.configs.outRadius.value],
                center: ['50%', '50%'],
                roseType: 'area',
                label: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                    //position: 'center'
                    alignTo: __ECHARTS__.configs.pieLabelAlignTo.value,
                    bleedMargin: 5,
                    margin: 20,
                },
                labelLine: {
                    show: __ECHARTS__.configs.pieLabelDisplay.value == "YES",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                itemStyle: {
                    label: {
                        show: true,
                    }
                },
                hoverOffset: 10,
                selectedOffset: 10,
                avoidLabelOverlap:true,
                hoverAnimation:true,
                data: []
            };
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            for (var i = 0; i < dataset["data"].length; i++) {
                var r = dataset["data"][i];
                serie.data.push({"value": r[columns[c]].value,"name": legends[i]});
            }
            series.push(serie);
        }
    }
    let top = toPoint(__ECHARTS__.configs.grid_top.value);
    let left = toPoint(__ECHARTS__.configs.grid_left.value);
    let groupWith = __ECHARTS__.configs.groupWith.value;
    let lines = parseInt(series.length / groupWith + 0.5);
    let height = parseInt((100 - toPoint(__ECHARTS__.configs.grid_top.value)- toPoint(__ECHARTS__.configs.grid_bottom.value)) / lines);
    let width = (100 - toPoint(__ECHARTS__.configs.grid_left.value)- toPoint(__ECHARTS__.configs.grid_right.value))/groupWith;
    for (var i = 0; i < series.length; i++) {
        series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
        series[i].left = (left + (i % groupWith) * width) + "%";
        series[i].width = width + "%";
        series[i].height = height + "%";
    }

    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['pie', 'funnel']
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: series,
        label: {
            fontSize: __ECHARTS__.configs.pieLabelFontSize.value,
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    if (__ECHARTS__.configs.richTextLabel.value == "YES") {
        //富文本
        option.label = {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            //shadowBlur:3,
            //shadowOffsetX: 2,
            //shadowOffsetY: 2,
            //shadowColor: '#999',
            padding: [0, 7],
            rich: {
                a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                },
                abg: {
                    backgroundColor: '',
                    width: '100%',
                    align: 'right',
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                },
                hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 16,
                    lineHeight: 33
                },
                per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
        };
    }
    myChart.setOption(option);
    return container;
}

function getRadar(container, themes) {
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
                    max: __ECHARTS__.configs.radarSameMax.value=="YES"?all_max:xAxis_max[r[columns[c]].value],
                });
            }
        } else {
            var serie = {
                name: columns[c],
                type: "radar",
                areaStyle: {
                    show:__ECHARTS__.configs.radarAreaDisplay.value == "YES",
                    normal: {}
                },
                data: []
            };
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
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

    var myChart = echarts.init(container, themes);
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left: __ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        radar: {
            center:[(toPoint(__ECHARTS__.configs.grid_left.value) + (100-toPoint(__ECHARTS__.configs.grid_left.value)-toPoint(__ECHARTS__.configs.grid_right.value))/2) + "%",
            (toPoint(__ECHARTS__.configs.grid_top.value) + (100-toPoint(__ECHARTS__.configs.grid_top.value)-toPoint(__ECHARTS__.configs.grid_bottom.value))/2) + "%"],
            shape: __ECHARTS__.configs.radarShape.value,
            splitNumber:__ECHARTS__.configs.radarSplitNumber.value,
            name: {
                show: __ECHARTS__.configs.radarNameDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value,
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                },
            },
            indicator: xAxis,

            axisLabel: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value,
                },
                rotate:__ECHARTS__.configs.radarLabelRotate.value,
            },
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitLine:{
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
                interval:1
            },
        },
        series: series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    return container;

}

function getRegression(container, themes) {
    var regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }
    var columns_add = [];
    var xAxis = [];
    var series = [];

    var selectType = __ECHARTS__.configs.regressionType.value;
    var forwardPeroids = Number(__ECHARTS__.configs.regressionForwardPeroids.value);
    var regressionPolynomialOrder = Number(__ECHARTS__.configs.regressionPolynomialOrder.value);

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
                        width: Number(__ECHARTS__.configs.lineStyleWidth.value),
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'left',
                            color: 'blue',
                            fontSize: 12
                        }
                    },
                    smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
                    symbol: __ECHARTS__.configs.lineSymbol.value,
                    symbolSize: __ECHARTS__.configs.lineSymbolSize.value,
                    data: []
                };
                serie.animationDelay = function (idx) {
                    return idx * 5 + 100;
                };
                for (var i = 0; i < dataset["data"].length; i++) {
                    var r = dataset["data"][i];
                    serie.data.push([i, r[columns[c]].value]);
                }
                serie.animationDelay = function (idx) {
                    return idx * 5 + 100;
                };
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
            type: 'line',
            smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
            showSymbol: false,
            symbol: __ECHARTS__.configs.lineSymbol.value,
            symbolSize: __ECHARTS__.configs.lineSymbolSize.value,
            data: data,
            lineStyle: {
                type: 'dotted',     //'solid/dashed/dotted'
            },
            markPoint: {
                itemStyle: {
                    color: 'transparent'
                },
                label: {
                    show: true,
                    position: 'left',
                    formatter: myRegression.expression,
                    color:__ECHARTS__.configs.regressionExpressionColor.value,
                    fontSize: 10
                },
                data: [{
                    coord: data[data.length - 1]
                }],
            }
        };
        regline.animationDelay = function (idx) {
            return idx * 5 + 100;
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
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        brush:  __ECHARTS__.configs.toolboxFeatureBrush.value == "YES"?{
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        }:null,
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
                dataZoom: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES"},
                magicType: {
                    show: __ECHARTS__.configs.toolboxFeatureMagicType.value == "YES",
                    type: ['line', 'bar',]
                },
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length).concat(columns_add),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            }
        },
        xAxis: {
            data: xAxis,
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitNumber: 20,
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                interval: "auto",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                },
                margin: 8,
                rotate: xAxis.length > 15 ? -45 : 0,
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            type: 'value',
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    return container;
}

function  getRelationship(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
                    //如果修改为layout= force,则draggable配置生效
                    draggable: true,
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
        type: 'graph',
        layout: 'none',
        //如果修改为force,则force配置生效，暂不需要。
        force: {
            repulsion: 1000
        },
        symbolSize: 50,
        roam: true,
        label: {
            show: true,
            fontSize: 12,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
            fontSize: 9
        },
        data: nodes,
        links: links,
        lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.2
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(251, 118, 123)'
            }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
            }])
        },
        roam: true,
        focusNodeAdjacency: true,
        emphasis: {
            lineStyle: {
                opacity: 1,
                width: 2.5
            }
        }
    };
    serie.animationDelay = function (idx) {
        return idx * 5 + 100;
    };

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        series: [serie],
        lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.2
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
    };

    myChart.setOption(option);

     //以下代码是为解决节点拖动
    initInvisibleGraphic();
    function initInvisibleGraphic() {
        myChart.setOption({
            graphic: echarts.util.map(option.series[0].data, function (item, dataIndex) {
                //使用图形元素组件在节点上划出一个隐形的图形覆盖住节点，小于原节点，留出部分用户显示当前节点与其他节点关系显示。
                var tmpPos = myChart.convertToPixel({'seriesIndex': 0},[item.x,item.y]);
                return {
                    type: 'circle',
                    id: dataIndex,
                    position: tmpPos,
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 20
                    },
                    // silent:true,
                    invisible: true,
                    draggable: true,
                    ondrag: echarts.util.curry(onPointDragging, dataIndex),
                    z: 100
                };
            })
        });
        window.addEventListener('resize', updatePosition);
        myChart.on('dataZoom', updatePosition);
    }
    myChart.on('graphRoam', updatePosition);
    function updatePosition(){
        myChart.setOption({
            graphic: echarts.util.map(option.series[0].data, function (item, dataIndex) {
                var tmpPos = myChart.convertToPixel({'seriesIndex': 0},[item.x,item.y]);
                return {
                    position: tmpPos
                };
            })
        });
    }
    function onPointDragging(dataIndex) {
        //节点上图层拖拽执行的函数
        var tmpPos = myChart.convertFromPixel({'seriesIndex': 0},this.position);
        option.series[0].data[dataIndex].x = tmpPos[0];
        option.series[0].data[dataIndex].y = tmpPos[1];
        myChart.setOption(option);
        updatePosition();
    }
    return container;
}

function  getOrganizationStructure(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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

    function getType() {
        var i = Math.floor(Math.random() * 10);
        if(i >= 7){
            //##################树型结构###########################
            return {
                top: '2%',
                left: '15%',
                bottom: '2%',
                right: '20%',
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            };
        } else if (i >= 4){
            return {
                top: '20%',
                left: '10%',
                bottom: '30%',
                right: '10%',
                orient: 'vertical',
                edgeShape: 'polyline',
                edgeForkPosition: '63%',
                initialTreeDepth: 3,

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
                label: {
                    position: 'top',
                    rotate: -90,
                    verticalAlign: 'middle',
                    align: 'right',
                    //fontSize: 9
                },

                leaves: {
                    label: {
                        position: 'bottom',
                        rotate: -90,
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
            };
        } else {
            //#####################圆型结构#######################
            return {
                top: '18%',
                bottom: '14%',
                layout: 'radial',
                symbol: 'emptyCircle',
                initialTreeDepth: 3,
                animationDurationUpdate: 750
            };
        }

    }

    //转换为JSON系列
    var series = [];
    var legends = [];
    for (var i=0; i<nodes.length; i++) {
        if (nodes[i].parent == null) {
            legends.push({name: nodes[i].name, icon: 'rectangle'});
            var serie = {
                type: 'tree',
                name: nodes[i].name,
                data: [{
                    name: nodes[i].name,
                    children: getChildren(nodes[i].name)
                }],
                symbolSize: 7,
            };
            series.push(Object.assign(serie, getType()));
        }
    }

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        series:series,
        draggable: true,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
    };

    myChart.setOption(option);
    return container;
}

function getWebkitDep(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset =  __DATASET__["result"][__DATASET__.default.sheet];
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
                category: category
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
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: columns,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                position: 'right',
                formatter: '{b}',
            },
            draggable: true,
            data: webkitDep.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
            }),
            categories: webkitDep.categories,
            force: {
                edgeLength: 5,
                repulsion: 40,
                gravity: 0.2
            },
            edges: webkitDep.links
        }]
    };

    myChart.setOption(option);
    return container;
}

function getScatter(container, themes) {
    var regressionType = {"直线": "linear", "指数": "exponential", "对数": "logarithmic", "多项式": "polynomial"};
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];

    var series = [];
    var columns = [];
    var minvalue = 0;
    var maxvalue = 1;
    var columns_add = [];
    var selectType = __ECHARTS__.configs.regressionType.value;
    var forwardPeroids = Number(__ECHARTS__.configs.regressionForwardPeroids.value);
    var regressionPolynomialOrder = Number(__ECHARTS__.configs.regressionPolynomialOrder.value);

    function init() {
        for (var i = 0; i < dataset["columns"].length; i++) {
            columns.push(dataset["columns"][i].name);
        }

        for (var c = 1; c < columns.length; c++) {
            var serie = {
                name: columns[c],
                data: [],
                type: 'scatter',//"scatterGL"
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[1];
                        },
                        position: 'top'
                    }
                },
                //symbolSize: [10, 70],
                symbol: __ECHARTS__.configs.scatterSymbolShape.value,
                symbolSize: function (data) {
                    //if (maxvalue != minvalue) {
                    //    if ((maxvalue - minvalue) >= (30 - 5))
                    //        return ((30 - 5) / (maxvalue - minvalue)) * Math.abs(data[1]) + 5;
                    //    else
                    //        return ((maxvalue - minvalue) / (30 - 5)) * Math.abs(data[1]) + 5;

                    //} else
                        return __ECHARTS__.configs.scatterSymbolSize.value;
                },
                itemStyle: {
                    opacity: 0.8,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                }
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
                    if (Math.abs(d[1]) < minvalue)
                        minvalue = Math.abs(d[1]);
                    if (Math.abs(d[1]) > maxvalue)
                        maxvalue = Math.abs(d[1]);
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
            type: 'line',
            showSymbol: false,
            smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
            data: data,
            lineStyle: {
                type: 'dotted',     //'solid/dashed/dotted'
            },
            markPoint: {
                itemStyle: {
                    color: 'transparent'
                },
                label: {
                    show: true,
                    position: 'left',
                    formatter: myRegression.expression,
                    fontSize: 10
                },
                data: [{
                    coord: data[data.length - 1]
                }],
            }
        };
        regline.animationDelay = function (idx) {
            return idx * 5 + 100;
        };
        series.push(regline);
    }

    init();

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice().concat(columns_add),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'axis',
            axisPointer: {
                type: __ECHARTS__.configs.axisPointerType.value,
            }
        },
        xAxis: {
            inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES",
                lineStyle: {
                    type: 'dashed',
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                }
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES",
            }
        },
        yAxis: {
            inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
            scale: true,
            axisLine: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            axisTick:{
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
            },
            axisLabel: {
                show: __ECHARTS__.configs.axisLineDisplay.value == "YES",
                textStyle: {
                    color: __ECHARTS__.configs.axisTextColor.value
                }
            },
            splitLine: {
                show: __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    type: 'dashed',
                    color: [
                        __ECHARTS__.configs.axisColor.value
                    ]
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            }
        },
        dataZoom: [{
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            xAxisIndex: 0,
            end: 100
        }, {
            type: 'inside',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            start: 0,
            yAxisIndex: 0,
            end: 100
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            yAxisIndex: 0,
            start: 0,
            end: 100,
            width: __ECHARTS__.configs.dataZoomBarWidth.value,
            height: (100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            top: __ECHARTS__.configs.grid_top.value,
            right: (100 - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }, {
            show: __ECHARTS__.configs.dataZoomBarDisplay.value == "YES",
            type: 'slider',
            filterMode: __ECHARTS__.configs.dataZoomFilterMode.value,
            xAxisIndex: 0,
            start: 0,
            end: 100,
            width: (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) + "%",
            height: __ECHARTS__.configs.dataZoomBarWidth.value,
            left: __ECHARTS__.configs.grid_left.value,
            top: (100 - toPoint(__ECHARTS__.configs.grid_bottom.value)) + "%",
            handleIcon: __SYS_IMAGES_PATH__.dataZoomHandleIcon[__ECHARTS__.configs.dataZoomHandleIcon.value],
            handleSize: __ECHARTS__.configs.dataZoomHandleSize.value,
            borderColor: __ECHARTS__.configs.dataZoomBarColor.value,
            handleStyle: {
                color: __ECHARTS__.configs.dataZoomBarColor.value,
            }
        }],
        series: series,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
    };

    myChart.setOption(option);
    return container;
}

function getFunnel(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];

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
                var serie = {
                    name: columns[c],
                    type: 'funnel',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'ascending',//descending/ascending
                    //gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: []
                };
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    serie.data.push({name: row[columns[0]].value, value: row[columns[c]].value});
                }
                series.push(serie);
            }
        }

        let top = toPoint(__ECHARTS__.configs.grid_top.value);
        let left = toPoint(__ECHARTS__.configs.grid_left.value);
        let lines = parseInt(series.length / 2 + 0.5);
        let height = parseInt((100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) / lines);
        let width = 100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value);

        if (series.length > 1)
            width = 40;
        for (var i = 0; i < series.length; i++) {
            series[i].top = ((top + parseInt(i / 2) * height) + parseInt(i / 2) * top) + "%";
            series[i].left = (left + (i % 2) * 40) + "%";
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
            series[i].width = width + "%";
            series[i].height = height + "%";
        }
    }

    init();

    var option = {
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,//columns.slice(1),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        series: series
    };

    myChart.setOption(option);
    return container;
}

function getWordCloud(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];

    var series = [];
    var columns = [];
    var legends = [];
    //var maskImage = new Image();
    //maskImage.src = 'logo.png';

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
                    type: 'wordCloud',
                    gridSize: 2,
                    sizeRange: [__ECHARTS__.configs.wordCloudMinFontSize.value, __ECHARTS__.configs.wordCloudMaxFontSize.value],//[最小字号,最大字号],
                    rotationRange: [-1 * __ECHARTS__.configs.wordCloudRotationRange.value , __ECHARTS__.configs.wordCloudRotationRange.value],//[旋转角度,旋转角度]
                    shape: __ECHARTS__.configs.wordCloudShape.value,
                    //'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
                    //maskImage: maskImage,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: [
                        {
                            name: 'wordCloud',
                            value: 10000,
                            textStyle: {
                                normal: {
                                    color: 'black'
                                },
                                emphasis: {
                                    color: 'red'
                                }
                            }
                        }
                    ]
                };
                serie.data = [];
                for (var i = 0; i < dataset["data"].length; i++) {
                    var row = dataset["data"][i];
                    serie.data.push({name: row[columns[0]].value, value: row[columns[c]].value});
                }
                series.push(serie);
            }
        }

        let top = toPoint(__ECHARTS__.configs.grid_top.value);
        let left = toPoint(__ECHARTS__.configs.grid_left.value);
        let groupWith = __ECHARTS__.configs.groupWith.value;
        let lines = parseInt(series.length / groupWith + 0.5);
        let height = parseInt((100 - toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value)) / lines);
        let width = (100 - toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value)) / groupWith;

        for (var i = 0; i < series.length; i++) {
            series[i].top = ((top + parseInt(i / groupWith) * height) + parseInt(i / groupWith) * top) + "%";
            series[i].left = (left + (i % groupWith) * width) + "%";
            series[i].width = width + "%";
            series[i].height = height + "%";
        }
    }

    init();

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            formatter: function (param) {
                return param.name + '<br>' + param.seriesName + ':'
                    + param.value;
            }
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        series: series
    };

    myChart.setOption(option);
    return container;
}

function getLiqiud(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                type: 'liquidFill',
                data: [],
                color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
                //center: ['50%', '50%'],
                //radius: '50%',
                amplitude: '8%',
                waveLength: '80%',
                phase: 'auto',
                period: 'auto',
                direction: 'right',
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",

                shape: __ECHARTS__.configs.liqiudShape.value,

                waveAnimation: true,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                animationDuration: 2000,
                animationDurationUpdate: 1000,

                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: '#1598ED',//'none',
                        borderColor: '#294D99',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.25)'
                    }
                },

                backgroundStyle: {
                    color: '#E3F7FF'
                },

                itemStyle: {
                    opacity: 0.6,
                    shadowBlur: 50,
                    shadowColor: 'rgba(0, 0, 0, 0.4)'
                },

                label: {
                    show: true,
                    insideColor: '#fff',
                    fontSize: __ECHARTS__.configs.liqiudFontSize.value,
                    fontWeight: 'bold',
                    align: 'center',
                    baseline: 'middle',
                    position: 'inside'
                },

                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                }
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
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            series.push(serie);
        }

        var groupWith = __ECHARTS__.configs.groupWith.value;
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
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        label: {
            formatter: function (param) {
                return param.seriesName + '\n\n'
                    + param.name + '\n\n'
                    + Math.round(param.value * 10000) / 100 + "%";
            },
        },
        series: series
    };

    myChart.setOption(option);

    myChart.on('mouseover', function (params) {
        stopTimer();
    });
    myChart.on('mouseout', function (params) {
        startTimer();
    });

    var timer;
    function doing() {
        let option = myChart.getOption();
        for (var i=0;i<option.series.length;i++){
            if (option.series[i].data.length > 1) {
                var data = option.series[i].data.slice(1);
                data.push(option.series[i].data[0]);
                option.series[i].data = data;
            }
        }
        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    return container;
}

function getGaugeWithAll(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                fontWeight: 'bolder',
                fontSize: __ECHARTS__.configs.gaugeTitleFontSize.value,
                color: 'gray',
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 10,
            },
            axisLine: {
                lineStyle: {
                    width: __ECHARTS__.configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10,
                    color:[[0.2, '#3CB371'], [0.8, '#6388ae'], [1, '#DB7093']]
                        //默认[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                }
            },
            axisLabel: {
                fontSize: __ECHARTS__.configs.gaugeAxisLabelFontSize.value,
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 10,
            },
            splitLine:{
                length: 15,
            },
            pointer: {
                width: 5, //指针宽度
                length: '60%'  //指针长度
            },
            detail: {
                formatter: ['{value}%', ''].join("\n"),
                fontSize:  __ECHARTS__.configs.gaugeLabelFontSize.value,
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 10,
            },
            data: []
        };
        for (var c = 0; c < columns.length; c++) {
            if (c == 0)
                legends.push(r[columns[c]].value);
            else {
                serie.data.push({
                    "name": legends[i] + "\n\n" + columns[c],
                    "value": r[columns[c]].value,
                    itemStyle: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                })
            }
        }
        serie.animationDelay = function (idx) {
            return idx * 5 + 100;
        };
        series.push(serie);
    }

    var groupWith = __ECHARTS__.configs.groupWith.value;
    var lines = parseInt(series.length / groupWith + 0.5);
    var radius = 80 / (lines > groupWith ? lines : groupWith);
    for (var i = 0; i < series.length; i++) {
        series[i].radius = radius + "%";
        var x = radius * 2 / 3 + (i % groupWith) * (radius + 5);
        var y = radius * 2 / 3 + parseInt(i / groupWith) * (radius + 5);
        series[i].center = [x + "%", y + "%"];
    }

    var myChart = echarts.init(container, themes);
    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show:__ECHARTS__.configs.legendDisplay.value =="YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient:__ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            formatter: '{b} : {c}%'
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            right: "10",
            orient: "vertical",
            top: "top",
            emphasis: {
                iconStyle: {
                    textPosition: 'left'
                }
            },
        },
        series: series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);
    var timer;
    myChart.on('mouseover', function (params) {
        stopTimer();
    });
    myChart.on('mouseout', function (params) {
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
        timer = setInterval(doing,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    return container;
}

function getGaugeWithOne(container, themes) {
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                        fontWeight: 'bolder',
                        fontSize: __ECHARTS__.configs.gaugeTitleFontSize.value,
                        color: 'gray',
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowBlur: 10,
                    },
                    axisLine: {
                        lineStyle: {
                            width: __ECHARTS__.configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10,
                            color: [[0.2, '#3CB371'], [0.8, '#6388ae'], [1, '#DB7093']]
                            //默认[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                        }
                    },
                    axisLabel: {
                        fontSize: __ECHARTS__.configs.gaugeAxisLabelFontSize.value,
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowBlur: 10,
                    },
                    splitLine: {
                        length: 15,
                    },
                    pointer: {
                        width: 5, //指针宽度
                        length: '60%'  //指针长度
                    },
                    detail: {
                        formatter: ['{value}%', ''].join("\n"),
                        fontSize: __ECHARTS__.configs.gaugeLabelFontSize.value,
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowBlur: 10,
                    },
                    data: []
                };
                serie.data.push({
                    "name": legends[i] + "\n\n" + columns[c],
                    "value": r[columns[c]].value,
                    itemStyle: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                });
                serie.animationDelay = function (idx) {
                    return idx * 5 + 100;
                };
                series.push(serie);
            }
        }
        seriesgroup.push(series);
    }

    var groupWith = __ECHARTS__.configs.groupWith.value;
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

    var myChart = echarts.init(container, themes);
    var option = {
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: legends,
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            formatter: '{b} : {c}%'
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        series: seriesgroup[index],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 3;
        }
    };
    myChart.setOption(option);

    var timer;
    myChart.on('mouseover', function (params) {
        stopTimer();
    });
    myChart.on('mouseout', function (params) {
        startTimer();
    });
    function doing() {
        let option = myChart.getOption();
        if (index < (seriesgroup.length-1)){
            index+=1;
        } else {
            index=0;
        }
        option.series = seriesgroup[index];
        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer=null;
    }

    setTimeout(startTimer,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    return container;
}

function getCalendar(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));
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
                        rangeMin = echarts.format.formatTime('yyyy-MM-dd', r[columns[0]].value);
                        rangeMax = echarts.format.formatTime('yyyy-MM-dd', r[columns[0]].value);
                    } else {
                        rangeMin = echarts.format.formatTime('yyyy-MM-dd', r[columns[c]].value) < rangeMin ? echarts.format.formatTime('yyyy-MM-dd', r[columns[c]].value) : rangeMin;
                        rangeMax = echarts.format.formatTime('yyyy-MM-dd', r[columns[c]].value) > rangeMax ? echarts.format.formatTime('yyyy-MM-dd', r[columns[c]].value) : rangeMax;
                    }
                }
            } else {
                var serie = {
                    name: columns[c],
                    type: __ECHARTS__.configs.calendarType.value, //['heatmap','scatter','effectScatter']
                    coordinateSystem: 'calendar',
                    calendarIndex: c - 1,
                    data: []
                };
                var visualMap = {
                    //type: 'piecewise',
                    show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
                    calculable: true,
                    //orient: 'vertical',//'horizontal'
                    //left: 10,
                    //top: 10,
                    seriesIndex: c - 1,//影射数据系列
                    dimension: 1,//影射数据纬度
                    textStyle: {
                        color: 'gray'
                    }
                };
                var calendar = {
                    orient: __ECHARTS__.configs.calendarOrient.value, //'vertical',//'horizontal'
                    left: "10%",
                    right: "10%",
                    cellSize: ['auto', 'auto'],
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
                if (__ECHARTS__.configs.calendarType.value == 'effectScatter' || __ECHARTS__.configs.calendarType.value == 'scatter') {
                    serie.symbolSize = function (val) {
                        var value = val[1] / (valueMax / __ECHARTS__.configs.scatterSymbolSize.value);
                        return value < 5 ? 5 : value;
                    };
                }
                visualMap.min = valueMin;
                visualMap.max = valueMax;
                visualMap.show = __ECHARTS__.configs.visualMapDisplay.value == "YES",
                calendar.range = [rangeMin, rangeMax];
                serie.animationDelay = function (idx) {
                    return idx * 5 + 100;
                };
                calendars.push(calendar);
                series.push(serie);
                visualMaps.push(visualMap);
            }
        }
        if (__ECHARTS__.configs.calendarOrient.value == "vertical") {
            var width = (80 - 15 * calendars.length) / calendars.length;
            for (var i = 0; i < calendars.length; i++) {
                calendars[i].top =  "15%";
                calendars[i].left = (15 * (i + 1) + width * i) + "%";
                visualMaps[i].left = containerWidth * (15 * (i + 1) + width * i)/100 - 40 ;
                calendars[i].width = width + "%";
                visualMaps[i].itemHeight = containerWidth * width / 100;
                calendars[i].bottom = "10%";
                visualMaps[i].top = "90%";
                visualMaps[i].orient = 'horizontal';
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
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            position: 'top',
            formatter: function (p) {
                var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
                return format + '<br> ' + p.seriesName + ": " + p.data[1];
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: visualMaps,
        calendar: calendars,
        series: series
    };
    myChart.setOption(option);
    return container;

}

function getGeoOfChina(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));
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
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        //backgroundColor: __ECHARTS__.configs.geoBackgroundColor.value,
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            formatter: function (params) {
                var value = "";
                try {
                    value = params.name + '<br>' +  params.seriesName + ': ' + ((params['value'].length == 3) ? params.data['value'][2] : params.data['value'])
                }catch (e) {
                }
                return value
            },
        },
        visualMap: {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: series[index].min,
            max: series[index].max,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
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
                    show: __ECHARTS__.configs.geoAreaNameDisplay.value == "YES",
                    color: __ECHARTS__.configs.geoAreaNameColor.value,
                },
                emphasis: {
                    show: true,
                    color: __ECHARTS__.configs.geoAreaNameColor.value,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: __ECHARTS__.configs.geoAreaColor.value,
                    borderColor: __ECHARTS__.configs.geoBorderColor.value,
                    shadowBlur: 50,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: __ECHARTS__.configs.geoHotAreaColor.value
                }
            },
        },
        series: [
            {
                name:series[index].name,
                type: "map",
                geoIndex: 0,
                data: series[index].data,
            },
            {
                name:series[index].name,
                type: 'effectScatter',//'scatter',//'effectScatter'
                coordinateSystem: 'geo',
                data: convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                })),
                symbolSize: function (val) {
                    var value = val[2] / (series[index].max / __ECHARTS__.configs.scatterSymbolSize.value);
                    return value<5?5:value;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'top',
                        show: true,
                        color: __ECHARTS__.configs.geoAreaNameColor.value,
                    }
                },
                itemStyle: {
                    normal: {
                        color: __ECHARTS__.configs.geoAreaColor.value,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                    }
                },
                zlevel: 1
            }
        ],

        animationDurationUpdate: 3000,
        animationEasingUpdate: 'quinticInOut',
    };
    myChart.setOption(option);

    var timer;
    myChart.on('mouseover', function (params) {
        stopTimer();
    });
    myChart.on('mouseout', function (params) {
        startTimer();
    });

    function doing() {
        var option = myChart.getOption();
        if (index < (series.length-1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: series[index].min,
            max: series[index].max,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        };
        option.series[0].data = series[index].data;
        option.series[1].data = convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                }));

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);

    return container;
}

function getGeoOfLocal(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));
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
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        //backgroundColor: __ECHARTS__.configs.geoBackgroundColor.value,
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },

        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
            formatter: function (params) {
                var value = "";
                try {
                    value = params.name + '<br>' +  params.seriesName + ': ' + ((params['value'].length == 3) ? params.data['value'][2] : params.data['value'])
                }catch (e) {
                }
                return value
            },
        },
        visualMap: {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: series[index].min,
            max: series[index].max,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        },
        //backgroundColor: '#013954',
        geo: {
            map: geoCoordMap.LocalMap,
            roam: true,
            scaleLimit: {
                min: 1,
                max: 10
            },
            label: {
                normal: {
                    show: __ECHARTS__.configs.geoAreaNameDisplay.value == "YES",
                    color: __ECHARTS__.configs.geoAreaNameColor.value,
                },
                emphasis: {
                    show: true,
                    color: __ECHARTS__.configs.geoAreaNameColor.value,
                }
            },
            itemStyle: {
                normal: {
                    areaColor: __ECHARTS__.configs.geoAreaColor.value,
                    borderColor: __ECHARTS__.configs.geoBorderColor.value,
                    shadowBlur: 50,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: __ECHARTS__.configs.geoHotAreaColor.value
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
                type: 'effectScatter',//'scatter',//'effectScatter'
                coordinateSystem: 'geo',
                data: convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                })),
                symbolSize: function (val) {
                    var value = val[2] / (series[index].max / __ECHARTS__.configs.scatterSymbolSize.value);
                    return value<5?5:value;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'top',
                        show: true,
                        color: "gray"
                    }
                },
                itemStyle: {
                    normal: {
                        color: __ECHARTS__.configs.geoAreaColor.value,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                    }
                },
                zlevel: 1
            }
        ],

        animationDurationUpdate: 3000,
        animationEasingUpdate: 'quinticInOut',
    };

    myChart.setOption(option);

    var timer;
    myChart.on('mouseover', function (params) {
        stopTimer();
    });
    myChart.on('mouseout', function (params) {
        startTimer();
    });

    function doing() {
        var option = myChart.getOption();
        if (index < (series.length-1)) {
            index += 1;
        } else {
            index = 0;
        }
        option.series[0].name = series[index].name;
        option.series[1].name = series[index].name;
        option.visualMap = {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: series[index].min,
            max: series[index].max,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        };
        option.series[0].data = series[index].data;
        option.series[1].data = convertData(series[index].data.sort(function (a, b) {
                    return b.value - a.value;
                }));

        myChart.setOption(option);
    }

    function startTimer() {
        timer = setInterval(doing, __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    setTimeout(startTimer,  __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000);

    return container;
}

function getBar3D(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                type: 'bar3D',
                data: [],
                bevelSize: 0.1,
                //柱子的倒角尺寸。支持设置为从 0 到 1 的值。默认为 0，即没有倒角。
                bevelSmoothness: 4,
                //柱子倒角的光滑/圆润度，数值越大越光滑/圆润

                shading: 'realistic',
                //'color' 只显示颜色，不受光照等其它因素的影响。
                //'lambert' 通过经典的 lambert 着色表现光照带来的明暗。
                //'realistic' 真实感渲染，
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
                    opacity: __ECHARTS__.configs.ItemStyleOpacityFor3D.value,
                    //柱子的透明度,取值范围[0-1]
                    color: "red"
                },

                label: {
                    show: __ECHARTS__.configs.LabelOf3DDisplay.value == "YES",
                    textStyle: {
                        color: __ECHARTS__.configs.label3DTextColor.value,
                        fontSize: __ECHARTS__.configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: __ECHARTS__.configs.label3DFontSize.value,
                        }
                    },
                    itemStyle: {
                    }
                },
                animation: true,
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicOut"
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
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            series.push(serie);
        }
    }

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show: __ECHARTS__.configs.titleDisplay.value == "YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top: "top",
            left: __ECHARTS__.configs.titlePosition.value,
            textStyle: {
                color: __ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle: {
                color: __ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show: __ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: valueMin,
            max: valueMax,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        },
        xAxis3D: {
            type: 'category',
            data: rows,
        },
        yAxis3D: {
            type: 'category',
            data: columns.slice(1),
        },
        zAxis3D: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxWidth: __ECHARTS__.configs.BoxWidthFor3D.value,
            boxDepth: __ECHARTS__.configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: __ECHARTS__.configs.AutoRotateFor3D.value == "YES",
                autoRotateSpeed: 10,
                projection: 'orthographic',
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicInOut",
                animationDelay: function (idx) {
                    return idx * 5 + 100;
                },
            },
            axisLine: {
                show:__ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES" || __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES" || __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            },
            axisPointer: {
                show: __ECHARTS__.configs.axisPointerDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            light: {
                main: {
                    intensity: 1.2,
                    //shadow: true
                },
                ambient: {
                    intensity: 0.3
                }
            },
        },
        series: series,
    };
    myChart.setOption(option);
    return container;
}

function getLine3D(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",
                lineStyle: {
                    opacity: __ECHARTS__.configs.ItemStyleOpacityFor3D.value,
                    width: __ECHARTS__.configs.lineStyleWidth.value,
                },
                itemStyle : {},
                label: {
                    show: __ECHARTS__.configs.LabelOf3DDisplay.value == "YES",
                    textStyle: {
                        color: __ECHARTS__.configs.label3DTextColor.value,
                        fontSize: __ECHARTS__.configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: __ECHARTS__.configs.label3DFontSize.value,
                            //color: '#900'
                        }
                    },
                    itemStyle: {

                    }
                },
                animation: true,
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicOut"
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
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            series.push(serie);
        }
    }

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
            show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: valueMin,
            max: valueMax,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        },

        xAxis3D: {
            type: 'category',
            data: rows,
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        yAxis3D: {
            type: 'category',
            data: columns.slice(1),
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        zAxis3D: {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxWidth: __ECHARTS__.configs.BoxWidthFor3D.value,
            boxDepth: __ECHARTS__.configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: __ECHARTS__.configs.AutoRotateFor3D.value == "YES",
                autoRotateSpeed: 10,
                projection: 'orthographic',
                //animationDurationUpdate: 1000,
                //animationEasingUpdate: "cubicInOut"
            },
            axisLine: {
                show:__ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES" || __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES" || __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            },
            axisPointer: {
                show: __ECHARTS__.configs.axisPointerDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        series: series,
    };
    myChart.setOption(option);
    return container;
}

function getScatter3D(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
                symbolSize: __ECHARTS__.configs.scatterSymbolSize.value,
                symbol: __ECHARTS__.configs.scatterSymbolShape.value,
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                itemStyle: {
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.8)',
                    opacity: __ECHARTS__.configs.ItemStyleOpacityFor3D.value,
                },
                label: {
                    show: __ECHARTS__.configs.LabelOf3DDisplay.value == "YES",
                    textStyle: {
                        color: __ECHARTS__.configs.label3DTextColor.value,
                        fontSize: __ECHARTS__.configs.label3DFontSize.value,
                        borderWidth: 1
                    },
                    formatter: function (params) {
                        return rows[params.value[0]] + "\n" + columns[params.value[1] + 1] + ": " + params.value[2];
                    },
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: __ECHARTS__.configs.label3DFontSize.value,
                            //color: '#900'
                        }
                    },
                    itemStyle: {
                        //color: '#900'
                    }
                },
                animation: true,
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicOut"
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
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            series.push(serie);
        }
    }

    var option = {
        grid: {
            x: __ECHARTS__.configs.grid_left.value,
            y: __ECHARTS__.configs.grid_top.value,
            x2: __ECHARTS__.configs.grid_right.value,
            y2: __ECHARTS__.configs.grid_bottom.value,
            containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
            backgroundColor: 'transparent'
        },
        title: {
            show:__ECHARTS__.configs.titleDisplay.value =="YES",
            text: __ECHARTS__.configs.titleText.value,
            subtext: __ECHARTS__.configs.titleSubText.value,
            top:"top",
            left:__ECHARTS__.configs.titlePosition.value,
            textStyle:{
                color:__ECHARTS__.configs.titleTextColor.value,
            },
            subtextStyle:{
                color:__ECHARTS__.configs.titleSubTextColor.value,
            }
        },
        legend: {
            show: __ECHARTS__.configs.legendDisplay.value == "YES",
            icon: __ECHARTS__.configs.legendIcon.value,
            type: __ECHARTS__.configs.legendType.value,
            selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
            top: __ECHARTS__.configs.legendPositionTop.value,
            left: __ECHARTS__.configs.legendPositionLeft.value,
            orient: __ECHARTS__.configs.legendOrient.value,
            data: columns.slice(1, columns.length),
            textStyle: {
                color: __ECHARTS__.configs.legendTextColor.value
            },
        },
        tooltip: {
           show:__ECHARTS__.configs.tooltipDisplay.value == "YES",
        },
        toolbox: {
            show: __ECHARTS__.configs.toolboxDisplay.value =="YES",
            feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
            top: __ECHARTS__.configs.toolbox_top.value,
            left:__ECHARTS__.configs.toolbox_left.value,
            orient: __ECHARTS__.configs.toolbox_orient.value,
            emphasis: {
                iconStyle: {
                    textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                }
            },
        },
        visualMap: {
            show:__ECHARTS__.configs.visualMapDisplay.value == "YES",
            min: valueMin,
            max: valueMax,
            type: __ECHARTS__.configs.visualMap_type.value,
            calculable: true,
            top: __ECHARTS__.configs.visualMap_top.value,
            left: __ECHARTS__.configs.visualMap_left.value,
            itemWidth: __ECHARTS__.configs.visualMap_width.value,
            orient:__ECHARTS__.configs.visualMap_orient.value,
            itemHeight: __ECHARTS__.configs.visualMap_height.value,
            textStyle: {
                color: __ECHARTS__.configs.visualMap_textColor.value,
            },
            splitNumber:__ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
        },

        xAxis3D: {
            type: 'category',
            data: rows,
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        yAxis3D: {
            type: 'category',
            data: columns.slice(1),
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        zAxis3D: {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        grid3D: {
            boxWidth: __ECHARTS__.configs.BoxWidthFor3D.value,
            boxDepth: __ECHARTS__.configs.BoxDepthFor3D.value,
            viewControl: {
                autoRotate: __ECHARTS__.configs.AutoRotateFor3D.value == "YES",
                autoRotateSpeed: 10,
                projection: 'orthographic',
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicInOut",
                animationDelay: function (idx) {
                    return idx * 5 + 100;
                },
            },
            axisLine: {
                show:__ECHARTS__.configs.axisLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitLine: {
                show: __ECHARTS__.configs.splitXLineDisplay.value == "YES" || __ECHARTS__.configs.splitYLineDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
            splitArea: {
                show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES" || __ECHARTS__.configs.splitYAreaDisplay.value == "YES",
            },
            axisPointer: {
                show: __ECHARTS__.configs.axisPointerDisplay.value == "YES",
                lineStyle: {
                    color: __ECHARTS__.configs.axisColor.value
                },
            },
        },
        series: series,
    };
    myChart.setOption(option);
    return container;
}

function getCategoryLine(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
        times.push(row[columns[0]].value);
        var data = [];
        for (var c = 1; c < columns.length; c++) {
            data.push({name: columns[c], value: row[columns[c]].value});
        }
        var serie = {
            name: row[columns[0]].value,
            data: data ,
        };
        if (__ECHARTS__.configs.categoryLineType.value == "bar") {
            serie.label = {
                show: __ECHARTS__.configs.barLabelDisplay.value == "YES",
                rotate: __ECHARTS__.configs.barLabelRotate.value,
                align: 'center',
                verticalAlign: 'middle',
                position: __ECHARTS__.configs.barLabelPosition.value,
                distance: 15,
                formatter: '{value|{c}}',
                rich: {
                    value: {
                        color: __ECHARTS__.configs.labelBarTextColor.value,
                        fontSize: __ECHARTS__.configs.labelBarFontSize.value,
                    }
                }
            };
        }
        if (__ECHARTS__.configs.categoryLineType.value == "pie") {
            serie.radius = __ECHARTS__.configs.outRadius.value;
            serie.selectedMode = __ECHARTS__.configs.pieSelectedMode.value;
            serie.label = {
                show: true,
                alignTo: __ECHARTS__.configs.pieLabelAlignTo.value,
                bleedMargin: 5,
                margin: 20
            };
            if (__ECHARTS__.configs.richTextLabel.value == "YES") {
                serie.label = {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    //shadowBlur:3,
                    //shadowOffsetX: 2,
                    //shadowOffsetY: 2,
                    //shadowColor: '#999',
                    padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: '',
                            width: '100%',
                            align: 'right',
                            height: 22,
                            borderRadius: [4, 4, 0, 0]
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
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
        if (__ECHARTS__.configs.categoryLineType.value == "line" || __ECHARTS__.configs.categoryLineType.value == "areaStyle") {
            serie.smooth = __ECHARTS__.configs.lineSmooth.value == "YES";
            serie.lineStyle = {
                width: Number(__ECHARTS__.configs.lineStyleWidth.value),
            };
            serie.symbol = __ECHARTS__.configs.lineSymbol.value;
            serie.symbolSize= __ECHARTS__.configs.lineSymbolSize.value;
            serie.markPoint= getMarkPoint();
            serie.markLine= getMarkLine();
            serie.markArea= {};
            if (__ECHARTS__.configs.categoryLineType.value == "areaStyle") {
                serie.areaStyle = {};
            }
        }
        serie.animationDelay = function (idx) {
            return idx * 5 + 100;
        };
        opt.series.push(serie);
        options.push(opt);
    }

    var option = {
        baseOption: {
            grid: {
                x: __ECHARTS__.configs.grid_left.value,
                y: __ECHARTS__.configs.grid_top.value,
                x2: __ECHARTS__.configs.grid_right.value,
                y2: __ECHARTS__.configs.grid_bottom.value,
                containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                backgroundColor: 'transparent'
            },
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            timeline: {
                show: __ECHARTS__.configs.timelineDisplay.value == "YES",
                axisType: 'category',
                //考虑数据通用性，使用类目轴
                //'value' 数值轴，适用于连续数据。
                // 'category' 类目轴，适用于离散的类目数据。
                // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: 'left'
                // },
                symbol: 'emptyCircle',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: 2,
                data: times,
                label: {
                    formatter: function (s) {
                        return s;
                    }
                },
                //bottom: 10
            },
            tooltip: {
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                trigger: 'axis',
                axisPointer: {
                    type: __ECHARTS__.configs.categoryLineType.value != "pie" ? __ECHARTS__.configs.axisPointerType.value : "none",
                },
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            xAxis: {
                type: 'category',
                data: columns.slice(1),
                inverse: __ECHARTS__.configs.xAxisInverse.value == "YES",
                axisLine: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: __ECHARTS__.configs.axisColor.value
                    },
                },
                axisTick: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                },
                axisLabel: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    textStyle: {
                        color: __ECHARTS__.configs.axisTextColor.value
                    }
                },
                splitLine: {
                    show: __ECHARTS__.configs.splitXLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: [
                            __ECHARTS__.configs.axisColor.value
                        ]
                    },
                },
                splitArea: {
                    show: __ECHARTS__.configs.splitXAreaDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                }
            },
            yAxis: {
                type: 'value',
                inverse: __ECHARTS__.configs.yAxisInverse.value == "YES",
                axisLine: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: __ECHARTS__.configs.axisColor.value
                    },
                },
                axisTick: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                },
                axisLabel: {
                    show: __ECHARTS__.configs.axisLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    textStyle: {
                        color: __ECHARTS__.configs.axisTextColor.value
                    }
                },
                splitLine: {
                    show: __ECHARTS__.configs.splitYLineDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                    lineStyle: {
                        color: [
                            __ECHARTS__.configs.axisColor.value
                        ]
                    },
                },
                splitArea: {
                    show: __ECHARTS__.configs.splitYAreaDisplay.value == "YES" && __ECHARTS__.configs.categoryLineType.value != "pie",
                }
            },
            series: {
                type: __ECHARTS__.configs.categoryLineType.value == "areaStyle" ? "line" : __ECHARTS__.configs.categoryLineType.value,
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 3;
            }
        },
        options: options
    };
    myChart.setOption(option);
    return container;
}

function getGeoMigrateLinesOfChinaCity(container, themes) {
    //数据结构:fromCity|toCity|value or text
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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

        var getMapRegions = function(name) {
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
                        coords: [fromRegion?fromRegion:fromCity, toRegion?toRegion:toCity],
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
            if (fromRegion){
                res.push({name: data[0], value: fromRegion, details: ""});
            } else if(fromCity) {
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

            for (var i=0;i<data[1].length;i++) {
                let item = data[1][i];
                let toRegion = geoCoordMap.Region[item[1].city];
                let toCity = geoCoordMap.City[item[1].city];
                if (toRegion){
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

        var colors = ['#a6c84c', '#ffa022', '#46bee9', "#9370DB","#F08080","#FF4500"];
        var series = [];
        seriedata.forEach(function (item, i) {
            let index = i<colors.length?i:i%colors.length;
            series.push({
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: __ECHARTS__.configs.seriesLoopPlayInterval.value,
                        trailLength: 0.2,
                        //拖尾
                        color: '#fff',
                        symbol: 'line',
                        symbolSize: 1
                    },
                    lineStyle: {
                        normal: {
                            color: colors[index],
                            width: 0,
                            opacity: 0.1,
                            curveness: 0.2,
                            //曲率
                        }
                    },
                    data: convertToLine(item[1])
                },
                {
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 5,
                    effect: {
                        show: true,
                        period: __ECHARTS__.configs.seriesLoopPlayInterval.value,
                        trailLength: 0,
                        //拖尾
                        symbol: __SYS_IMAGES_PATH__.planePath,
                        symbolSize: 10
                    },
                    lineStyle: {
                        normal: {
                            color: colors[index],
                            width: 1,
                            opacity: 0.3,
                            curveness: 0.2
                            //曲率
                        }
                    },
                    data: convertToLine(item[1])
                },
                {
                    //目标
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function (val) {
                        //return val[2] / 8;
                        return __ECHARTS__.configs.scatterSymbolSize.value;
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
            grid: {
                x: __ECHARTS__.configs.grid_left.value,
                y: __ECHARTS__.configs.grid_top.value,
                x2: __ECHARTS__.configs.grid_right.value,
                y2: __ECHARTS__.configs.grid_bottom.value,
                containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                backgroundColor: 'transparent'
            },
            //backgroundColor: __ECHARTS__.configs.geoBackgroundColor.value,
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            tooltip: {
                //trigger: 'item'
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                formatter: function (params) {
                    var value = "";
                    if (params.seriesType == "lines")
                        value = params.data.fromName + " ↣ " + params.data.toName + ':<br>' + params.data.details;
                    //仅标注线提示;因点会重复,不标注点提示
                    //else
                    //    value = params.seriesName + " ↣ " + params.name + ':<br>' + params.data.details;
                    return value
                },
            },
            legend: {
                show: __ECHARTS__.configs.legendDisplay.value == "YES",
                icon: __ECHARTS__.configs.legendIcon.value,
                type: __ECHARTS__.configs.legendType.value,
                selectedMode: __ECHARTS__.configs.legendSelectedMode.value,
                top: __ECHARTS__.configs.legendPositionTop.value,
                left: __ECHARTS__.configs.legendPositionLeft.value,
                orient: __ECHARTS__.configs.legendOrient.value,
                data: getSerieNames(seriedata),
                textStyle: {
                    color: __ECHARTS__.configs.legendTextColor.value
                },
            },
            geo: {
                map: 'china',
                label: {
                    normal: {
                        show: __ECHARTS__.configs.geoAreaNameDisplay.value == "YES",
                        color: __ECHARTS__.configs.geoAreaNameColor.value,
                    },
                    emphasis: {
                        show: true,
                        color: __ECHARTS__.configs.geoAreaNameColor.value,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: __ECHARTS__.configs.geoAreaColor.value,
                        borderColor: __ECHARTS__.configs.geoBorderColor.value,
                        shadowBlur: 50,
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                    },
                    emphasis: {
                        areaColor: __ECHARTS__.configs.geoHotAreaColor.value
                    }
                }
            },
            series: series
        };
    } else {
        alert("该视图需要[源城市]、[目标城市]和[详细信息]等三个数据指标.")
    }
    myChart.setOption(option);
    return container;
}

function getCategoryLineForGauge(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
        times.push(row[columns[0]].value);
        for (var c = 1; c < columns.length; c++) {
            var serie = {
                name: row[columns[0]].value,
                type: "gauge",
                title: {
                    fontWeight: 'bolder',
                    fontSize: __ECHARTS__.configs.gaugeTitleFontSize.value,
                    color: 'gray',
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowBlur: 10,
                },
                axisLine: {
                    lineStyle: {
                        width: __ECHARTS__.configs.gaugeAxisLineWidth.value,//10, //圆X轴宽度
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        color: [[0.2, '#3CB371'], [0.8, '#6388ae'], [1, '#DB7093']]
                        //默认[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                    }
                },
                axisLabel: {
                    fontSize: __ECHARTS__.configs.gaugeAxisLabelFontSize.value,
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowBlur: 10,
                },
                splitLine: {
                    length: 15,
                },
                pointer: {
                    width: 5, //指针宽度
                    length: '60%'  //指针长度
                },
                detail: {
                    formatter: ['{value}%', ''].join("\n"),
                    fontSize: __ECHARTS__.configs.gaugeLabelFontSize.value,
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowBlur: 10,
                },
                data: []
            };
            serie.data.push({
                "name": row[columns[0]].value + "\r\n" + columns[c],
                "value": row[columns[c]].value,
                itemStyle: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                }
            });
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            let left = (toPoint(__ECHARTS__.configs.grid_left.value) + (100-toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value))/2);
            let top = (toPoint(__ECHARTS__.configs.grid_top.value) + (100-toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value))/2);
            serie.center = [(c*left/(columns.length-1)) + left/(columns.length-1)*(c-1) + "%",top + "%"];
            opt.series.push(serie);
        }

        options.push(opt);
    }

    var option = {
        baseOption: {
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            timeline: {
                show: __ECHARTS__.configs.timelineDisplay.value == "YES",
                axisType: 'category',
                //考虑数据通用性，使用类目轴
                //'value' 数值轴，适用于连续数据。
                // 'category' 类目轴，适用于离散的类目数据。
                // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: 'left'
                // },
                symbol: 'emptyCircle',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: 2,
                data: times,
                label: {
                    formatter: function (s) {
                        return s;
                    }
                },
                bottom: 15
            },
            tooltip: {
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                formatter: function (params) {
                    var value = params.data.name.replace("\r\n", "<br>") + ":" + params.data.value;
                    return value
                },
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},
            },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            series: {
                type: "gauge",
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 3;
            }
        },
        options: options
    };
    myChart.setOption(option);
    return container;
}

function getCategoryLineForLiqiud(container, themes) {
    var myChart = echarts.init(container, themes);
    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));

    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
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
        times.push(row[columns[0]].value);
        for (var c = 1; c < columns.length; c++) {
            var serie = {
                name: row[columns[0]].value,
                type: 'liquidFill',
                data: [],
                color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
                //center: ['50%', '50%'],
                //radius: '50%',
                amplitude: '8%',
                waveLength: '80%',
                phase: 'auto',
                period: 'auto',
                direction: 'right',
                smooth: __ECHARTS__.configs.lineSmooth.value == "YES",

                shape: __ECHARTS__.configs.liqiudShape.value=="path"?__SYS_IMAGES_PATH__.echartsPath:__ECHARTS__.configs.liqiudShape.value,

                waveAnimation: true,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                animationDuration: 2000,
                animationDurationUpdate: 1000,

                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: '#1598ED',//'none',
                        borderColor: '#294D99',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.25)'
                    }
                },

                backgroundStyle: {
                    color: '#E3F7FF'
                },

                itemStyle: {
                    opacity: 0.6,
                    shadowBlur: 50,
                    shadowColor: 'rgba(0, 0, 0, 0.4)'
                },

                label: {
                    show: true,
                    insideColor: '#fff',
                    fontSize: __ECHARTS__.configs.liqiudFontSize.value,
                    fontWeight: 'bold',
                    align: 'center',
                    baseline: 'middle',
                    position: 'inside'
                },

                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                }
            };
            serie.data.push({
                name: columns[c],
                value: row[columns[c]].value
            });
            serie.animationDelay = function (idx) {
                return idx * 5 + 100;
            };
            let left = (toPoint(__ECHARTS__.configs.grid_left.value) + (100-toPoint(__ECHARTS__.configs.grid_left.value) - toPoint(__ECHARTS__.configs.grid_right.value))/2);
            let top = (toPoint(__ECHARTS__.configs.grid_top.value) + (100-toPoint(__ECHARTS__.configs.grid_top.value) - toPoint(__ECHARTS__.configs.grid_bottom.value))/2);
            serie.center = [(c*left/(columns.length-1)) + 50/(columns.length-1)*(c-1) + "%", top + "%"];
            opt.series.push(serie);
        }

        options.push(opt);
    }

    var option = {
        baseOption: {
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            timeline: {
                show: __ECHARTS__.configs.timelineDisplay.value == "YES",
                axisType: 'category',
                //考虑数据通用性，使用类目轴
                //'value' 数值轴，适用于连续数据。
                // 'category' 类目轴，适用于离散的类目数据。
                // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: 'left'
                // },
                symbol: 'emptyCircle',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: 2,
                data: times,
                label: {
                    formatter: function (s) {
                        return s;
                    }
                },
                bottom: 15
            },
            tooltip: {
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                formatter: function (params) {
                    var value = params.seriesName + "<br>" + params.data.name + ":" + params.data.value * 100 + "%";
                    return value
                },
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                    saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                    restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                    dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

                },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 3;
            }
        },
        options: options
    };
    myChart.setOption(option);
    return container;
}

function getCategoryLineForGeoOfChina(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));
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
                times.push(columns[c]);
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
                        x: __ECHARTS__.configs.grid_left.value,
                        y: __ECHARTS__.configs.grid_top.value,
                        x2: __ECHARTS__.configs.grid_right.value,
                        y2: __ECHARTS__.configs.grid_bottom.value,
                        containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                        backgroundColor: 'transparent'
                    },
                    //backgroundColor: __ECHARTS__.configs.geoBackgroundColor.value,
                    toolbox: {
                        show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                        feature: {
                            saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                            restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                            dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

                        },
                        top: __ECHARTS__.configs.toolbox_top.value,
                        left: __ECHARTS__.configs.toolbox_left.value,
                        orient: __ECHARTS__.configs.toolbox_orient.value,
                        emphasis: {
                            iconStyle: {
                                textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                            }
                        },
                    },
                    tooltip: {
                        show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                        formatter: function (params) {
                            var value = "";
                            try {
                                value = params.name + '<br>' + params.seriesName + ': ' + ((params['value'].length == 3) ? params.data['value'][2] : params.data['value'])
                            } catch (e) {
                            }
                            return value
                        },
                    },
                    visualMap: {
                        show: __ECHARTS__.configs.visualMapDisplay.value == "YES",
                        min: min,
                        max: max,
                        type: __ECHARTS__.configs.visualMap_type.value,
                        calculable: true,
                        top: __ECHARTS__.configs.visualMap_top.value,
                        left: __ECHARTS__.configs.visualMap_left.value,
                        itemWidth: __ECHARTS__.configs.visualMap_width.value,
                        orient: __ECHARTS__.configs.visualMap_orient.value,
                        itemHeight: __ECHARTS__.configs.visualMap_height.value,
                        textStyle: {
                            color: __ECHARTS__.configs.visualMap_textColor.value,
                        },
                        splitNumber: __ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
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
                                show: __ECHARTS__.configs.geoAreaNameDisplay.value == "YES",
                                color: "gray",
                            },
                            emphasis: {
                                show: true,
                                color: "gray",
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: __ECHARTS__.configs.geoAreaColor.value,
                                borderColor: __ECHARTS__.configs.geoBorderColor.value,
                                shadowBlur: 50,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                            },
                            emphasis: {
                                areaColor: __ECHARTS__.configs.geoHotAreaColor.value
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
                            type: 'effectScatter',//'scatter',//'effectScatter'
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            })),
                            symbolSize: function (val) {
                                var value = val[2] / (max / __ECHARTS__.configs.scatterSymbolSize.value);
                                return value < 5 ? 5 : value;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'top',
                                    show: true,
                                    color: "gray"
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: __ECHARTS__.configs.geoAreaColor.value,
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                                }
                            },
                            zlevel: 1
                        }
                    ],

                    animationDurationUpdate: 3000,
                    animationEasingUpdate: 'quinticInOut',
                };
                options.push(opt);
            }
        }
    }

    init();

    var option = {
        baseOption: {
            grid: {
                x: __ECHARTS__.configs.grid_left.value,
                y: __ECHARTS__.configs.grid_top.value,
                x2: __ECHARTS__.configs.grid_right.value,
                y2: __ECHARTS__.configs.grid_bottom.value,
                containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                backgroundColor: 'transparent'
            },
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            timeline: {
                show: __ECHARTS__.configs.timelineDisplay.value == "YES",
                axisType: 'category',
                //考虑数据通用性，使用类目轴
                //'value' 数值轴，适用于连续数据。
                // 'category' 类目轴，适用于离散的类目数据。
                // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: 'left'
                // },
                symbol: 'emptyCircle',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: 2,
                data: times,
                label: {
                    formatter: function (s) {
                        return s;
                    }
                },
                bottom: 15
            },
            tooltip: {
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

            },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 3;
            }
        },
        options: options
    };
    myChart.setOption(option);
    return container;
}

function getCategoryLineForGeoOfLocal(container, themes) {
    var myChart = echarts.init(container, themes);
    var dataset = __DATASET__["result"][__DATASET__.default.sheet];
    var columns = [];
    for (var i = 0; i < dataset["columns"].length; i++) {
        columns.push(dataset["columns"][i].name);
    }

    var containerWidth = Number(container.style.width.slice(0).replace(/px/i, ""));
    var containerHeight = Number(container.style.height.slice(0).replace(/px/i, ""));
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
                times.push(columns[c]);
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
                        x: __ECHARTS__.configs.grid_left.value,
                        y: __ECHARTS__.configs.grid_top.value,
                        x2: __ECHARTS__.configs.grid_right.value,
                        y2: __ECHARTS__.configs.grid_bottom.value,
                        containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                        backgroundColor: 'transparent'
                    },
                    //backgroundColor: __ECHARTS__.configs.geoBackgroundColor.value,
                    toolbox: {
                        show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                        feature: {
                            saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                            restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                            dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

                        },
                        top: __ECHARTS__.configs.toolbox_top.value,
                        left: __ECHARTS__.configs.toolbox_left.value,
                        orient: __ECHARTS__.configs.toolbox_orient.value,
                        emphasis: {
                            iconStyle: {
                                textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                            }
                        },
                    },

                    tooltip: {
                        show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
                        formatter: function (params) {
                            var value = "";
                            try {
                                value = params.name + '<br>' + params.seriesName + ': ' + ((params['value'].length == 3) ? params.data['value'][2] : params.data['value'])
                            } catch (e) {
                            }
                            return value
                        },
                    },
                    visualMap: {
                        show: __ECHARTS__.configs.visualMapDisplay.value == "YES",
                        min: min,
                        max: max,
                        type: __ECHARTS__.configs.visualMap_type.value,
                        calculable: true,
                        top: __ECHARTS__.configs.visualMap_top.value,
                        left: __ECHARTS__.configs.visualMap_left.value,
                        itemWidth: __ECHARTS__.configs.visualMap_width.value,
                        orient: __ECHARTS__.configs.visualMap_orient.value,
                        itemHeight: __ECHARTS__.configs.visualMap_height.value,
                        textStyle: {
                            color: __ECHARTS__.configs.visualMap_textColor.value,
                        },
                        splitNumber: __ECHARTS__.configs.visualMap_piecewise_splitNumber.value,
                    },
                    //backgroundColor: '#013954',
                    geo: {
                        map: geoCoordMap.LocalMap,
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 10
                        },
                        label: {
                            normal: {
                                show: __ECHARTS__.configs.geoAreaNameDisplay.value == "YES",
                                color: __ECHARTS__.configs.geoAreaNameColor.value,
                            },
                            emphasis: {
                                show: true,
                                color: __ECHARTS__.configs.geoAreaNameColor.value,
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: __ECHARTS__.configs.geoAreaColor.value,
                                borderColor: __ECHARTS__.configs.geoBorderColor.value,
                                shadowBlur: 50,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                            },
                            emphasis: {
                                areaColor: __ECHARTS__.configs.geoHotAreaColor.value
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
                            type: 'effectScatter',//'scatter',//'effectScatter'
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            })),
                            symbolSize: function (val) {
                                var value = val[2] / (max / __ECHARTS__.configs.scatterSymbolSize.value);
                                return value < 5 ? 5 : value;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'top',
                                    show: true,
                                    color: __ECHARTS__.configs.geoAreaNameColor.value,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: __ECHARTS__.configs.geoAreaColor.value,
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                                }
                            },
                            zlevel: 1
                        }
                    ],

                    animationDurationUpdate: 3000,
                    animationEasingUpdate: 'quinticInOut',
                };
                options.push(opt);
            }
        }
    }

    init();
    var option = {
        baseOption: {
            grid: {
                x: __ECHARTS__.configs.grid_left.value,
                y: __ECHARTS__.configs.grid_top.value,
                x2: __ECHARTS__.configs.grid_right.value,
                y2: __ECHARTS__.configs.grid_bottom.value,
                containLabel: __ECHARTS__.configs.grid_containLabel.value == "YES",
                backgroundColor: 'transparent'
            },
            title: {
                show: __ECHARTS__.configs.titleDisplay.value == "YES",
                text: __ECHARTS__.configs.titleText.value,
                subtext: __ECHARTS__.configs.titleSubText.value,
                top: "top",
                left: __ECHARTS__.configs.titlePosition.value,
                textStyle: {
                    color: __ECHARTS__.configs.titleTextColor.value,
                },
                subtextStyle: {
                    color: __ECHARTS__.configs.titleSubTextColor.value,
                }
            },
            timeline: {
                show: __ECHARTS__.configs.timelineDisplay.value == "YES",
                axisType: 'category',
                //考虑数据通用性，使用类目轴
                //'value' 数值轴，适用于连续数据。
                // 'category' 类目轴，适用于离散的类目数据。
                // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                realtime: true,
                //事实时更新数据
                loop: true,
                //循环播放
                autoPlay: true,
                //自动播放
                // currentIndex: 2,
                playInterval: __ECHARTS__.configs.seriesLoopPlayInterval.value * 1000,
                // controlStyle: {
                //     position: 'left'
                // },
                symbol: 'emptyCircle',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: 2,
                data: times,
                label: {
                    formatter: function (s) {
                        return s;
                    }
                },
                bottom: 15
            },
            tooltip: {
                show: __ECHARTS__.configs.tooltipDisplay.value == "YES",
            },
            toolbox: {
                show: __ECHARTS__.configs.toolboxDisplay.value == "YES",
                feature: {
                    saveAsImage: {show: __ECHARTS__.configs.toolboxFeatureSaveAsImage.value == "YES"},
                    restore: {show: __ECHARTS__.configs.toolboxFeatureRestore.value == "YES"},
                    dataView: {show: __ECHARTS__.configs.toolboxFeatureDataView.value == "YES", readOnly: true},

                },
                top: __ECHARTS__.configs.toolbox_top.value,
                left: __ECHARTS__.configs.toolbox_left.value,
                orient: __ECHARTS__.configs.toolbox_orient.value,
                emphasis: {
                    iconStyle: {
                        textPosition: __ECHARTS__.configs.toolbox_textPosition.value,
                    }
                },
            },
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 3;
            }
        },
        options: options
    };
    myChart.setOption(option);
    return container;
}







