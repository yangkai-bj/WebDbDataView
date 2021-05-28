# WebDBDataView

## 页面主题
+ 默认
+ 黑色
+ 粉色
+ 墨绿

## 数据库相关
+ ### 创建数据库
    + 在本地浏览器中创建一个Web SQL(**SQLite**)数据库．
    + Chrome浏览器数据库路径:　...[User]\AppData\Local\Google\Chrome\User Data\Default\databases\
    + 可根据上述路径自行规划数据库备份方案．
+ ### 删除数据库
    从本地浏览器中删除当前数据库.

+ ### 创建表
    在当前数据库中创建数据表.

+ ### 删除表
    从当前数据库中删除(Drop)指定数据表.

+ ### 导入数据
    + 导入外部数据,需要确定数据文件的字符集．
        + .txt
        + .csv
        + .xls
        + .xlsx
    + 如果没有选择既定数据表，系统将根据数据内容解析数据格式并转至创建表．

## 脚本相关
+ ### 新建脚本
+ ### 保存脚本
+ ### 打开脚本
+ ### 导入脚本
+ ### 导出脚本
+ ### 备份所有脚本
+ ### 恢复所有脚本
+ ### 执行脚本
+ ### 编辑器主题

## 报表相关
+ ### 数据转置
+ ### 数据切片
+ ### 分类汇总
+ ### 数据排序
+ ### 数据筛选
+ ### 报表下载
+ ### 删除数据集
    + 删除当前数据集
    + 删除所有数据集
+ ### 报表参数
    + 显示参数
    + 分页
    + 报表下载方式(XLSX)
        + 当前数据集
        + 所有数据集合并下载
        + 所有数据集拆分下载

## 图像相关
+ ### 绘制图像
    对当前数据集转换后绘制Echarts图像.
+ ### 图像类型
    目前支持43中图像：
      `options: [
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
                new Option("函数图像", "MathFunciton")
            ],  `

+ ### 图像主题
+ ### 图像参数
+ ### 组合展示

## 注意事项
+ ### 根据本人工作需要开发，功能不够完善，敬请谅解．
+ ### 重要数据务必做好备份,**务必谨慎操作浏览器数据清理**.


