function getEchartsReport(container, myChart) {
    function getScript(jsPath, echarts, ui, defaultThemes, user) {
        let scripts = [
            "FunctionsComponent.js",
            "StatisticsComponent.js",
            "configs.js",
            "resources.js",
            echarts,
            "echartsThemes.js",
            ui,
            "echarts/echarts-gl.min.js",
            "echarts/echarts-wordcloud.min.js",
            "echarts/ecStat.js",
            "echarts/echarts-liquidfill.min.js",
            "echarts/map/world.js",
            "echarts/map/china-and-region.js",
            "echartsView.js",
        ];

        for (let i = 0; i < scripts.length; i++) {
            scripts[i] = "<script type='text/javascript' src='" + jsPath + "/" + scripts[i] + "'></script>";
        }
        scripts = scripts.concat([
            "<script type='text/javascript'>\n" +
            "function $(id) {\n" +
            "return document.getElementById(id);\n" +
            "}\n" +
            "function $class(name, index) {\n" +
            "if (typeof index !== 'undefined')\n" +
            "return document.getElementsByClassName(name)[index];\n" +
            "else\n" +
            "return document.getElementsByClassName(name)\n" +
            "}\n" +
            "function $tag(name, index) {\n" +
            "if (typeof index !== 'undefined')\n" +
            "return document.getElementsByTagName(name)[index];\n" +
            "else\n" +
            "return document.getElementsByTagName(name)\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function getSVGBase(svg, color, width, height, flip) {\n" +
            "try {\n" +
            "let domparser = new DOMParser();\n" +
            "let xmldoc = domparser.parseFromString(svg, 'text/xml');\n" +
            "if (xmldoc.documentElement.nodeName === 'svg') {\n" +
            "xmldoc.documentElement.setAttribute('width', width);\n" +
            "xmldoc.documentElement.setAttribute('height', height);\n" +
            "let viewBox = xmldoc.documentElement.getAttribute('viewBox').split(' ');\n" +
            "let g = xmldoc.documentElement.childNodes[0];\n" +
            "if (typeof flip !== 'undefined') {\n" +
            "if (Number(flip) == 1)\n" +
            "g.setAttribute('transform', 'scale(1, -1) translate(0, -' + viewBox[3] + ')');\n" +
            "if (Number(flip) == 2)\n" +
            "g.setAttribute('transform', 'scale(-1, 1) translate(-' + viewBox[2] + ', 0)');\n" +
            "}\n" +
            "let pathNodes = g.childNodes;\n" +
            "for (let i = 0; i < pathNodes.length; i++) {\n" +
            "pathNodes[i].setAttribute('fill', color);\n" +
            "}\n" +
            "return 'data:image/svg+xml;base64,' + window.btoa((new XMLSerializer()).serializeToString(xmldoc));\n" +
            "} else {\n" +
            "return '';\n" +
            "}\n" +
            "} catch (e) {\n" +
            "return '';\n" +
            "}\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function setStyleValue(selectorText, name, value){\n" +
            "for(let i=0;i<document.styleSheets[0].cssRules.length;i++){\n" +
            "if (document.styleSheets[0].cssRules[i].selectorText == selectorText){\n" +
            "document.styleSheets[0].cssRules[i].style[name] = value;\n" +
            "break;\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function setThemes(name){\n" +
            "setStyleValue('body', 'backgroundColor', THEMES[name].backgroundColor);\n" +
            "setStyleValue('body', 'backgroundImage', THEMES[name].backgroundImage);\n" +
            "setStyleValue('body', 'color', THEMES[name].color);\n" +
            "setStyleValue('table.table', 'color', THEMES[name].color);\n" +
            "setStyleValue('th', 'backgroundColor', THEMES[name].selected);\n" +
            "setStyleValue('th', 'color', THEMES[name].color);\n" +
            "setStyleValue('th:hover', 'backgroundColor', THEMES[name].hover);\n" +
            "setStyleValue('span.tabButton-selected', 'backgroundColor', THEMES[name].selected);\n" +
            "setStyleValue('span.tabButton-unselected:hover', 'backgroundColor', THEMES[name].hover);\n" +
            "setStyleValue('span.page-tab-selected', 'backgroundColor', THEMES[name].selected);\n" +
            "setStyleValue('span.page-tab:hover', 'backgroundColor', THEMES[name].hover);\n" +
            "setStyleValue('span.page-tab-left:hover', 'backgroundColor', THEMES[name].hover);\n" +
            "setStyleValue('span.tabButton-selected', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('div#_ECHARTS', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('div#_TABLE', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('div#_SCRIPT', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('div#_CONFIGS', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('span.theme-selected', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('span.configs-name', 'backgroundColor', THEMES[name].selected);\n" +
            "setStyleValue('input, select', 'color', __CONFIGS__.colors[0]);\n" +
            "setStyleValue('input[type=\\\"range\\\"]::-webkit-slider-thumb', 'borderColor', __CONFIGS__.colors[0]);\n" +
            "setStyleValue('span.exp-open:hover', 'color', THEMES[name].border);\n" +
            "setStyleValue('span.exp-close:hover', 'color', THEMES[name].border);\n" +
            "setStyleValue('.ui-tooltip', 'backgroundColor', THEMES[name].backgroundColor);\n" +
            "setStyleValue('.ui-tooltip', 'color', THEMES[name].color);\n" +
            "setStyleValue('.ui-tooltip', 'borderColor', THEMES[name].border);\n" +
            "setStyleValue('hr', 'backgroundColor', THEMES[name].border);\n" +
            "$('logo').src = getSVGBase($('logo').getAttribute('svg'), $('logo').getAttribute('color'), '60px', '60px', $('logo').getAttribute('flip'));\n" +
            "$('_FULLSCREEN').src = getSVGBase($('_FULLSCREEN').getAttribute('svg'), THEMES[name].border, '20px', '20px');\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "var USER = '" + user + "';\n" +
            "var DATASET = {title: null, columns: null, data: null, configs: null, sql: null};\n" +
            "var REPORT = null;\n" +
            "var __CONFIGS__ = {themes: '" + defaultThemes + "', colors: ['#FF7F50'], FULLSCREEN: {element: null}};\n" +
            "if (typeof getEcharts !== 'function')\n" +
            "alert('提示:\\n未连接到组件服务器,报表切换至静态模式.\\n" + jsPath + "');\n" +
            "var ECHARTS_TARGET = null;\n" +
            "var THEMES = {\n" +
            "白色: {backgroundColor: '#C0C0C0', color: '#000000', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#008080', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.25) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.25) 50%,rgba(255, 255, 255, 0.25) 75%,transparent 75%,transparent)'},\n" +
            "浅灰: {backgroundColor: '#696969', color: '#F5F5F5', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#FF7F50', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "深灰: {backgroundColor: '#404040', color: '#F8F8F8', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#FF7F50', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "黑色: {backgroundColor: '#000000', color: '#F0FFFF', selected: '#303030', hover: 'rgba(0, 0, 0, 0.3)', border: '#F0FFFF', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "墨绿: {backgroundColor: '#2F4F4F', color: '#F0F8FF', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#FF7F50', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "深蓝: {backgroundColor: '#003355', color: '#F8F8F8', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#008080', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "红色: {backgroundColor: '#8B0000', color: '#FFFF00', selected: 'rgba(0, 0, 0, 0.3)', hover: 'rgba(0, 0, 0, 0.3)', border: '#FAFAD2', " +
            "backgroundImage:'-webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent)'},\n" +
            "};\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function getBrowserSize(){\n" +
            "let width = 0;\n" +
            "let height = 0;\n" +
            "if (window.innerWidth) {\n" +
            "width = window.innerWidth;\n" +
            "} else if ((document.body) && (document.body.clientWidth)) {\n" +
            "width = document.body.clientWidth;\n" +
            "}\n" +
            "if (window.innerHeight) {\n" +
            "height = window.innerHeight;\n" +
            "} else if ((document.body) && (document.body.clientHeight)) {\n" +
            "height = document.body.clientHeight;\n" +
            "}\n" +
            "return {\n" +
            "width: width,\n" +
            "height: height\n" +
            "};\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function requestFullScreen(el) {\n" +
            "if (document.fullscreen){\n" +
            "document.exitFullscreen();\n" +
            "} else {\n" +
            "el.requestFullscreen();\n" +
            "__CONFIGS__.FULLSCREEN.element = el;\n" +
            "if (el == $('_ECHARTS')){\n" +
            "el.style.backgroundImage = THEMES[__CONFIGS__.themes].backgroundImage;\n" +
            "el.style.backgroundColor = THEMES[__CONFIGS__.themes].backgroundColor;\n" +
            "el.style.borderWidth = '0px';\n" +
            "let mo = setInterval(function(){\n" +
            "if (!document.fullscreen){\n" +
            "el.style.backgroundImage = null;\n" +
            "el.style.backgroundColor = 'transparent';\n" +
            "el.style.borderWidth = '1px';\n" +
            "clearInterval(mo);\n" +
            "__CONFIGS__.FULLSCREEN.element = null;\n" +
            "}\n" +
            "},500);" +
            "}\n" +
            "}\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function str2ab(str) {\n" +
            "let codes = [];\n" +
            "for (let i = 0; i != str.length; ++i) {\n" +
            "let code = str.charCodeAt(i);\n" +
            "if (0x00 <= code && code <= 0x7f) {\n" +
            "codes.push(code);\n" +
            "} else if (0x80 <= code && code <= 0x7ff) {\n" +
            "codes.push((192 | (31 & (code >> 6))));\n" +
            "codes.push((128 | (63 & code)))\n" +
            "} else if ((0x800 <= code && code <= 0xd7ff)\n" +
            "|| (0xe000 <= code && code <= 0xffff)) {\n" +
            "codes.push((224 | (15 & (code >> 12))));\n" +
            "codes.push((128 | (63 & (code >> 6))));\n" +
            "codes.push((128 | (63 & code)))\n" +
            "}\n" +
            "}\n" +
            "let buf = new ArrayBuffer(codes.length);\n" +
            "let result = new Uint8Array(buf);\n" +
            "for (let i = 0; i < codes.length; i++) {\n" +
            "result[i] = codes[i] & 0xff;\n" +
            "}\n" +
            "return result;\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function openDownloadDialog(url, saveName) {\n" +
            "if (typeof url == 'object' && url instanceof Blob) {\n" +
            "url = URL.createObjectURL(url);\n" +
            "}\n" +
            "let aLink = document.createElement('a');\n" +
            "aLink.href = url;\n" +
            "aLink.download = saveName || '';\n" +
            "let event;\n" +
            "if (window.MouseEvent) {\n" +
            "event = new MouseEvent('click');\n" +
            "} else {\n" +
            "event = document.createEvent('MouseEvents');\n" +
            "event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);\n" +
            "}\n" +
            "aLink.dispatchEvent(event);\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function reset(type){\n" +
            "if (type === 'echarts'){\n" +
            "try {\n" +
            "echarts.getInstanceByDom($('_ECHARTS')).clear();\n" +
            "$('_ECHARTS').removeAttribute('_echarts_instance_');\n" +
            "}catch (e) {\n" +
            "}\n" +
            "ECHARTS_TARGET = null;\n" +
            "}\n" +
            "if (type === 'table' )\n" +
            "viewDataset(0);\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function getConfigs(container, type, configs, __configs__) {\n" +
            "let dl = document.createElement('dl');\n" +
            "container.appendChild(dl);\n" +
            "let dt = null;\n" +
            "for (let name in configs) {\n" +
            "if (name === 'toolboxFeatureMultiScreen' || name === 'toolboxSaveAsReport' || name === 'toolboxFeatureDataView')\n" +
            "continue;\n" +
            "if (configs[name].type == 'hr') {\n" +
            "dt = document.createElement('dt');\n" +
            "let sp = document.createElement('span');\n" +
            "sp.innerHTML = '<span class=exp-close>+ </span>' + configs[name].name;\n" +
            "dt.appendChild(sp);" +
            "dt.setAttribute('value', configs[name].name);\n" +
            "dt.setAttribute('state','0');\n" +
            "dt.onclick = function(){\n" +
            "if (event.target.className == 'exp-close' || event.target.className == 'exp-open'){\n" +
            "let state = this.getAttribute('state');\n" +
            "let dds = this.getElementsByTagName('dd');\n" +
            "for(let i=0;i<dds.length;i++){\n" +
            "if (state == '0')\n" +
            "dds[i].style.display = 'block';\n" +
            "else\n" +
            "dds[i].style.display = 'none';\n" +
            "}\n" +
            "if (state == '0'){\n" +
            "this.setAttribute('state','1');\n" +
            "this.getElementsByTagName('span')[0].innerHTML = '<span class=exp-open>− </span>' + this.getAttribute('value');\n" +
            "} else {\n" +
            "this.setAttribute('state','0');\n" +
            "this.getElementsByTagName('span')[0].innerHTML = '<span class=exp-close>+ </span>' + this.getAttribute('value');\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "dl.appendChild(dt);\n" +
            "} else {\n" +
            "let dd = document.createElement('dd');\n" +
            "dt.appendChild(dd);\n" +
            "let configsname = document.createElement('span');\n" +
            "configsname.className='configs-name';\n" +
            "configsname.innerText = configs[name].name;\n" +
            "dd.appendChild(configsname);\n" +
            "if (__configs__ === null){\n" +
            "let configsvalue = document.createElement('span');\n" +
            "configsvalue.className='configs-value';\n" +
            "configsvalue.innerText = configs[name].value;\n" +
            "dd.appendChild(configsvalue);\n" +
            "} else {\n" +
            "if (typeof __configs__[name].title !== 'undefined')\n" +
            "dd.title = __configs__[name].title;\n" +
            "if (__configs__[name].type == 'input') {\n" +
            "let input = document.createElement('input');\n" +
            "input.style.cssFloat = 'right';\n" +
            "input.id = name;\n" +
            "input.type = 'input';\n" +
            "input.className = 'ui-container-item-input';\n" +
            "input.value = configs[name].value;\n" +
            "input.onchange = function () {\n" +
            "configs[this.id].value = this.value;\n" +
            "reset(type);\n" +
            "};\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'select') {\n" +
            "let input = document.createElement('select');\n" +
            "input.style.cssFloat = 'right';\n" +
            "input.id = name;\n" +
            "input.type = 'select';\n" +
            "input.className = 'ui-container-item-input';\n" +
            "for (let i = 0; i < __configs__[name].options.length; i++) {\n" +
            "if (typeof __configs__[name].options[i] === 'object')\n" +
            "input.options.add(__configs__[name].options[i]);\n" +
            "else\n" +
            "input.options.add(new Option(__configs__[name].options[i]));\n" +
            "}\n" +
            "input.value = configs[name].value;\n" +
            "input.onchange = function () {\n" +
            "configs[this.id].value = this.value;\n" +
            "reset(type);\n" +
            "};\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'echarts'){\n" +
            "let input = UI.echartsChoice(configs[name].value, function (value) {\n" +
            "configs[name].value = value;\n" +
            "reset(type);\n" +
            "}, __CONFIGS__.colors[0]);\n" +
            "input.id = name;\n" +
            "input.className = 'ui-container-item-echarts-choice';\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'color') {\n" +
            "let input = UI.colorChoice(name, configs[name].value, function (value) {\n" +
            "configs[name].value = value;\n" +
            "reset(type);\n" +
            "}, __CONFIGS__.colors[0]);\n" +
            "input.id = name;\n" +
            "input.className = 'ui-container-item-color';\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'boolean') {\n" +
            "let input = UI.booleanChoice(configs[name].value.toBoolean(), function (value) {\n" +
            "configs[name].value = (value ? 'true' : 'false');\n" +
            "reset(type);\n" +
            "}, __CONFIGS__.colors[0]);\n" +
            "input.id = name;\n" +
            "input.className = 'ui-container-item-boolean';\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'grids') {\n" +
            "let input = UI.gridsChoice(name, configs[name].value, function (value) {\n" +
            "configs[name].value = value;\n" +
            "reset(type);\n" +
            "}, __CONFIGS__.colors[0]);\n" +
            "input.id = name;\n" +
            "input.className = 'ui-container-item-grids';" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'range') {\n" +
            "let input = document.createElement('input');\n" +
            "input.style.cssFloat = 'right';\n" +
            "input.id = name;\n" +
            "input.type = 'range';\n" +
            "input.min = __configs__[name].attribute.min;\n" +
            "input.max = __configs__[name].attribute.max;\n" +
            "input.step = __configs__[name].attribute.step;\n" +
            "input.className = 'ui-container-item-range';\n" +
            "input.title = configs[name].value;\n" +
            "try{\n" +
            "input.value = Number(configs[name].value.replace(new RegExp(__configs__[name].attribute.unit,'g'), ''));\n" +
            "}catch(e){}\n" +
            "input.onchange = function () {\n" +
            "configs[this.id].value = this.title = (this.value + __configs__[this.id].attribute.unit);\n" +
            "reset(type);\n" +
            "};\n" +
            "dd.appendChild(input);\n" +
            "} else if (__configs__[name].type == 'ranges') {\n" +
            "let input = UI.rangesChoice(\n" +
            "__configs__[name].attribute.min,\n" +
            "__configs__[name].attribute.max,\n" +
            "__configs__[name].attribute.unit,\n" +
            "__configs__[name].value,\n" +
            "function (value) {\n" +
            "configs[name].value = value;\n" +
            "reset(type);\n" +
            "});\n" +
            "input.id = name;\n" +
            "input.className = 'ui-container-item-ranges';\n" +
            "dd.appendChild(input);\n" +
            "} else if (configs[name].type == 'number') {\n" +
            "let input = document.createElement('input');\n" +
            "input.style.cssFloat = 'right';\n" +
            "input.id = name;\n" +
            "input.type = 'number';\n" +
            "input.min = __configs__[name].attribute.min;\n" +
            "input.max = __configs__[name].attribute.max;\n" +
            "input.step = __configs__[name].attribute.step;\n" +
            "input.className = 'ui-container-item-number';\n" +
            "input.title = __configs__[name].value;\n" +
            "input.value = __configs__[name].value;\n" +
            "input.onkeypress = function(){\n" +
            "return false;\n" +
            "};\n" +
            "input.onchange = function () {\n" +
            "configs[this.id].value = this.title = this.value;\n" +
            "reset(type);\n" +
            "};\n" +
            "dd.appendChild(input);\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function viewSql(script){\n" +
            "let re = new RegExp(\'\\(\\\\/\\\\*[^\\\\*]\\*\\\\*\\\\/\\)|\\(\\-\\-[^.].\\*\\)\', 'gm');\n" +
            "let comments = script.match(re);\n" +
            "script = script.split(re);\n" +
            "let sqls = [];\n" +
            "for(let t=0;t<script.length;t++){\n" +
            "let sql = script[t];\n" +
            "if (sql !=='' && typeof sql != 'undefined' && (comments == null || comments.indexOf(sql) == -1)){\n" +
            "re = new RegExp('\\(\\\\\\'(.*?)\\\\\\')|(\\\\\\\"(.*?)\\\\\\\")', 'gm');\n" +
            "let constants = sql.match(re);\n" +
            "if (constants != null){\n" +
            "for(let i =0;i<constants.length;i++){\n" +
            "sql = sql.replace(new RegExp(constants[i],'g'), '&#60;span class&#61;SQLWordf&#62;' + constants[i]  + '&#60;&#47;span&#62;');\n" +
            "}\n" +
            "}\n" +

            "let words = [{key:'=',type:'d', value:'＝'},{key:\'\\\'\',type:'d'},{key:'\\\"\',type:'d'},\n" +
            "{key:\'\/\',type:'d', value:'&#47;'},{key:\'\>\',type:'d', value:'❯'},{key:\'\<\',type:'d', value:'❮'},\n" +
            "{key:':',type:'d', value:':'}, {key:',',type:'d'}, {key:\'\\\\+\',type:'d', value:'+'}, {key:'-',type:'d', value:'–'},\n" +
            "{key:\'\\\\*\',type:'d', value:'×'}, {key:\'\\\\(\',type:'d', value:'('}, {key:\'\\\\)\',type:'d', value:')'}, \n" +
            "{key:'ADD',type:'a'},{key:'BEFORE',type:'a'},{key:'GRANT',type:'a'},{key:'FOR',type:'a'},{key:'LOAD',type:'a'},{key:'ELSE',type:'a'},\n" +
            "{key:'WHEN',type:'a'},{key:'CASE',type:'a'},{key:'THEN',type:'a'},{key:'UNIQUE',type:'a'},{key:'DATABASE',type:'a'},{key:'END',type:'a'},\n" +
            "{key:'DECLARE',type:'a'},{key:'DROP',type:'a'},{key:'LIKE',type:'a'},{key:'LIMIT',type:'a'},{key:'DISTINCT',type:'a'},{key:'ELSEIF',type:'a'},\n" +
            "{key:'TABLE',type:'a'},{key:'VIEW',type:'a'},{key:'INDEX',type:'a'},{key:'PROCEDURE',type:'a'},{key:'TRIGGTER',type:'a'},{key:'CURSOR',type:'a'},\n" +
            "{key:'CREATE',type:'a'},{key:'DELETE',type:'a'}, {key:'UPDATE',type:'a'}, {key:'INSERT',type:'a'},{key:'AFTER',type:'a'},{key:'EACH',type:'a'},\n" +
            "{key:'INTO',type:'a'}, {key:'SELECT',type:'a'},{key:'FROM',type:'a'}, {key:'WHERE', type:'a'},{key:'PRIMARY',type:'a'},{key:'KEY',type:'a'},\n" +
            "{key:'GROUP',type:'a'},{key:'ORDER',type:'a'},{key:'BY',type:'a'},{key:'HAVING',type:'a'}, {key:'LEFT',type:'a'}, {key:'ENGINE',type:'a'},\n" +
            "{key:'VALUES',type:'a'},{key:'SET',type:'a'},{key:'RIGHT',type:'a'}, {key:'JOIN',type:'a'},{key:'ON',type:'a'},{key:'UNION',type:'a'}, \n" +
            "{key:'ALL',type:'a'},{key:'AS',type:'a'}, {key:'OUTER',type:'a'}, {key:'INNER',type:'a'},{key:'IS',type:'a'},{key:'NULL',type:'a'},\n" +
            "{key:'ASC',type:'a',value:'⇡'}, {key:'DESC',type:'a', value:'⇣'},{key:'NOT',type:'a'}, {key:'IN',type:'a'},{key:'BETWEEN',type:'a'},\n" +
            "{key:'AND',type:'b'}, {key:'OR',type:'b'},{key:'SUM',type:'c'},{key:'CONCAT',type:'c'}, {key:'REGEXP',type:'c'},\n" +
            "{key:'AVG',type:'c'}, {key:'COUNT',type:'c'},{key:'MIN',type:'c'}, {key:'MAX',type:'c'}, {key:'MONTH',type:'c'},{key:'REPLACE',type:'c'}, \n" +
            "{key:'YEAR',type:'c'},{key:'ROUND',type:'c'},{key:'IFNULL',type:'c'}, {key:'ABS',type:'c'}, {key:'POWER',type:'c'}, {key:'XOR',type:'c'},\n" +
            "{key:'DATE_FORMAT',type:'c'},{key:'STRFTIME',type:'c'},{key:'DATE',type:'c'},{key:'LENGTH',type:'c'},{key:'SUBSTR',type:'c'},{key:'MOD',type:'c'},\n" +
            "{key:'ADDDATE',type:'c'},{key:'ADDTIME',type:'c'},{key:'CURDATE',type:'c'},{key:'ADDTIME',type:'c'},{key:'DATE',type:'c'},{key:'CONVERT',type:'c'},\n" +
            "{key:'DATEDIFF',type:'c'},{key:'DATE_ADD',type:'c'},{key:'DAY',type:'c'},{key:'DAYOFWEEK',type:'c'},{key:'HOUR',type:'c'},{key:'MINUTE',type:'c'},\n" +
            "{key:'SECOND',type:'c'},{key:'TIME',type:'c'},{key:'LOCATE',type:'c'},{key:'LTRIM',type:'c'},{key:'RTRIM',type:'c'},{key:'SOUNDEX',type:'c'},\n" +
            "{key:'SUBSTRING',type:'c'},{key:'LOWER',type:'c'},{key:'UPPER',type:'c'},{key:'GETDATE',type:'c'},{key:'NOW',type:'c'},];\n" +
            "for(let i=0;i<words.length;i++){\n" +
            "re = new RegExp(words[i].key, 'g');\n" +
            "if (words[i].type !== 'd')\n" +
            "re = new RegExp(\'\\\\b\' + words[i].key + \'\\\\b\', 'gi');\n" +
            "sql = sql.replace(re,'&#60;span class&#61;SQLWord' + words[i].type + '&#62;' + (typeof words[i].value !== 'undefined'?words[i].value:words[i].key)  + '&#60;&#47;span&#62;');\n" +
            "}\n" +
            "sql = sql.replace(new RegExp('&#60;','g'), '<');\n" +
            "sql = sql.replace(new RegExp('&#61;','g'), '=');\n" +
            "sql = sql.replace(new RegExp('&#62;','g'), '>');\n" +
            "sql = sql.replace(new RegExp('&#47;','g'), '/');\n" +
            "sql = sql.replace(new RegExp(\'\\\\n\','g'), '<br>');\n" +
            "sql = sql.replace(new RegExp(\'\\\\t\','g'), '&emsp;&emsp;&emsp;&emsp;');\n" +
            "sqls.push(sql);\n" +
            "} else if (sql !=='' && typeof sql != 'undefined' && comments.indexOf(sql) !== -1){\n" +
            "sql = sql.replace(new RegExp(\'\\\\/\\\\*\','g'), '<span class=SQLWordg>•••</span>');\n" +
            "sql = sql.replace(new RegExp(\'\\\\*\\\\/\','g'), '');\n" +
            "sql = sql.replace(new RegExp(\'\\\\n\','g'), '<br>');\n" +
            "sql = sql.replace(new RegExp(\'\\\\t\','g'), '&emsp;&emsp;&emsp;&emsp;');\n" +
            "sql = '<p class=SQLWorde>' + sql + '</p>';\n" +
            "sqls.push(sql);\n" +
            "}\n" +
            "}\n" +
            "return sqls.join('');\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function resize(r){\n" +
            "try{\n" +
            "let size = getBrowserSize();\n" +
            "$('_ECHARTS').style.minHeight = (size.height*0.80) + 'px';\n" +
            "$('_TABLE').style.minHeight = (size.height*0.80) + 'px';\n" +
            "$('_SCRIPT').style.minHeight = (size.height*0.80) + 'px';\n" +
            "$('_CONFIGS').style.minHeight = (size.height*0.80) + 'px';\n" +
            "if (typeof getEcharts === 'function'){\n" +
            "if (typeof r == 'undefined'? true:r){\n" +
            "if (ECHARTS_TARGET == null){\n" +
            "ECHARTS_TARGET = echarts.getInstanceByDom(getEcharts($('_ECHARTS'), DATASET, REPORT.configs));\n" +
            "}\n" +
            "ECHARTS_TARGET.resize();\n" +
            "}\n" +
            "} else {\n" +
            "$('report-system').innerHTML = '组件服务器未连接...';\n" +
            "$('report-system').removeAttribute('href');\n" +
            "$('report-system').removeAttribute('title');\n" +
            "let hw = Number($('echarts-image').getAttribute('height'))/Number($('echarts-image').getAttribute('width'));\n" +
            "$('echarts-image').setAttribute('width',(size.width*0.78));\n" +
            "$('echarts-image').setAttribute('height',(size.width*0.78)*hw);\n" +
            "}\n" +
            "}catch (e) {\n" +
            "ECHARTS_TARGET = null;\n" +
            "}\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function init(){\n" +
            "setThemes(__CONFIGS__.themes);\n" +
            "let codes = $('_CODES').getElementsByTagName('code');\n" +
            "REPORT = codes[0].innerText;\n" +
            "let hash = codes[1].innerText;\n" +
            "let configs = JSON.parse(codes[2].innerText);\n" +
            "REPORT = JSON.parse(REPORT);\n" +
            "REPORT.configs.toolboxSaveAsReport.value = 'false';\n" +
            "REPORT.configs.toolboxFeatureMultiScreen.value = 'false';\n" +
            "REPORT.configs.toolboxFeatureDataView.value = 'false';\n" +
            "DATASET.title = REPORT.dataset.title;\n" +
            "DATASET.columns = REPORT.dataset.columns;\n" +
            "DATASET.data = REPORT.dataset.data;\n" +
            "DATASET.sql = REPORT.dataset.sql;\n" +
            "DATASET.configs = configs;\n" +
            "$('sql').innerHTML = viewSql(DATASET.sql);\n" +
            "getConfigs($('_CONFIGS'), 'echarts', REPORT.configs, typeof getEcharts === 'function'?__ECHARTS__.configs: null);\n" +
            "getConfigs($('_CONFIGS'), 'table', DATASET.configs, typeof getEcharts === 'function'?__DATASET__.configs: null);\n" +
            "getThemes();\n" +

            "$('_FULLSCREEN').onmouseenter = function(){\n" +
            "this.src = getSVGBase(this.getAttribute('svg'), THEMES[__CONFIGS__.themes].color, '20px', '20px');\n" +
            "};\n" +
            "$('_FULLSCREEN').onmouseleave = function(){\n" +
            "this.src = getSVGBase(this.getAttribute('svg'), THEMES[__CONFIGS__.themes].border, '20px', '20px');\n" +
            "};\n" +
            "$('_FULLSCREEN').onclick = function(){\n" +
            "requestFullScreen(document.documentElement);\n" +
            "}\n" +
            "viewDataset(0);\n" +
            "resize();\n" +
            "window.onresize = function(){\n" +
            "resize();\n" +
            "};\n" +
            "if (typeof UI !== 'undefined'){\n" +
            "let args = {position:'bottom', width:250, height:170};\n" +
            "UI.tooltip($('ECHARTS'), '<li>默认情况下,报表展示的是初始数据的「静态图像」；</li><li>如果报表检测到「组件服务器」，将自动切换至「动态视图」；</li><li>在动态视图提供的工具中，您可以尝试导出图像、局部放大、快速切换等功能。</li>', args);\n" +
            "UI.tooltip($('TABLE'), '<li>您可以将数据报表导出为「XML」文件；</li><li>在组件服务器支持下，如果您「转置」数据报表或对报表重新「排序」，数据视图将同步「重绘」。</li>', args);\n" +
            "UI.tooltip($('SCRIPT'), '<li>数据脚本可以帮助您理解报表的「计算方法」和「统计口径」；</li><li>是报表「复用」的重要组成部分。</li>', args);\n" +
            "UI.tooltip($('CONFIGS'), '<li>在组件服务器支持下，您可通过调整「参数」，以呈现丰富的数据视图；</li><li>任何参数的变更都将触发数据视图「重绘」。</li>', args);\n" +
            "UI.tooltip($('report-system'), '<li>您可以进入系统创建属于自己的「数据仓库」和「独特报表」；</li><li>进入系统后，可「打开报表」,并编辑此固定报表。</li>', args);\n" +
            "$('report-system').title = '';\n" +
            "}" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function getThemes(){\n" +
            "let content = $('_THEMES');\n" +
            "content.innerText='';\n" +
            "for (let key in THEMES){\n" +
            "let theme = document.createElement('span');\n" +
            "if (key == __CONFIGS__.themes)\n" +
            "theme.className ='theme-selected';\n" +
            "else\n" +
            "theme.className = 'theme';\n" +
            "theme.title = key;\n" +
            "theme.style.backgroundColor = THEMES[key].backgroundColor;\n" +
            "theme.style.color = THEMES[key].color;\n" +
            "theme.style.borderColor = THEMES[key].borderColor;\n" +
            "theme.innerHTML = '&emsp;&emsp;';" +
            "theme.onclick = function(){\n" +
            "__CONFIGS__.themes = this.title;\n" +
            "$class('theme-selected',0).className = 'theme';\n" +
            "this.className = 'theme-selected';\n" +
            "setThemes(__CONFIGS__.themes);\n" +
            "}\n" +
            "content.appendChild(theme);\n" +
            "}\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function selectTab(id){\n" +
            "let names = ['ECHARTS','TABLE','SCRIPT','CONFIGS'];\n" +
            "for (let i=0;i<names.length;i++){\n" +
            "let tab = $(names[i]);\n" +
            "let div = $('_' + names[i]);\n" +
            "if (names[i] == id){\n" +
            "tab.className = 'tabButton-selected';\n" +
            "if (id == 'ECHARTS'){" +
            "div.style.display = 'table';\n" +
            "} else\n" +
            "div.style.display = 'block';\n" +
            "} else {\n" +
            "tab.className = 'tabButton-unselected';\n" +
            "div.style.display = 'none';\n" +
            "}\n" +
            "}\n" +
            "resize(id == 'ECHARTS');\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "Number.prototype.format = function(pattern) {\n" +
            "let num = this;\n" +
            "let is = false;\n" +
            "if (num < 0)\n" +
            "is = true;\n" +
            "num = Math.abs(num);\n" +
            "let strarr = num ? num.toString().split('.') : ['0'];\n" +
            "let fmtarr = pattern ? pattern.split('.') : [''];\n" +
            "let retstr = '';\n" +
            "let str = strarr[0];\n" +
            "let fmt = fmtarr[0];\n" +
            "let i = str.length - 1;\n" +
            "let comma = false;\n" +
            "for (let f = fmt.length - 1; f >= 0; f--) {\n" +
            "switch (fmt.substr(f, 1)) {\n" +
            "case '#':\n" +
            "if (i >= 0) retstr = str.substr(i--, 1) + retstr;\n" +
            "break;\n" +
            "case '0':\n" +
            "if (i >= 0) retstr = str.substr(i--, 1) + retstr;\n" +
            "else retstr = '0' + retstr;\n" +
            "break;\n" +
            "case ',':\n" +
            "comma = true;\n" +
            "retstr = ',' + retstr;\n" +
            "break;\n" +
            "}\n" +
            "}\n" +
            "if (i >= 0) {\n" +
            "if (comma) {\n" +
            "let l = str.length;\n" +
            "for (; i >= 0; i--) {\n" +
            "retstr = str.substr(i, 1) + retstr;\n" +
            "if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;\n" +
            "}\n" +
            "}\n" +
            "else retstr = str.substr(0, i + 1) + retstr;\n" +
            "}\n" +
            "retstr = retstr + '.';\n" +
            "str = strarr.length > 1 ? strarr[1] : '';\n" +
            "fmt = fmtarr.length > 1 ? fmtarr[1] : '';\n" +
            "i = 0;\n" +
            "for (let f = 0; f < fmt.length; f++) {\n" +
            "switch (fmt.substr(f, 1)) {\n" +
            "case '#':\n" +
            "if (i < str.length) retstr += str.substr(i++, 1);\n" +
            "break;\n" +
            "case '0':\n" +
            "if (i < str.length) retstr += str.substr(i++, 1);\n" +
            "else retstr += '0';\n" +
            "break;\n" +
            "}\n" +
            "}\n" +
            "return is ? '-' + retstr.replace(/^,+/, '').replace(/\\.$/, '') : retstr.replace(/^,+/, '').replace(/\\.$/, '');\n" +
            "};\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "Date.prototype.format = function(fmt) {\n" +
            "let o = {\n" +
            "'M+': this.getMonth() + 1,\n" +
            "'d+': this.getDate(),\n" +
            "'h+': this.getHours(),\n" +
            "'m+': this.getMinutes(),\n" +
            "'s+': this.getSeconds(),\n" +
            "'q+': Math.floor((this.getMonth() + 3) / 3),\n" +
            "'S': this.getMilliseconds()\n" +
            "};\n" +
            "if (/(y+)/.test(fmt))\n" +
            "fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));\n" +
            "for (let k in o)\n" +
            "if (new RegExp('(' + k + ')').test(fmt))\n" +
            "fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));\n" +
            "return fmt;\n" +
            "};\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function selectPageGroup(div, index, pageindex, pages){\n" +
            "div.innerHTML = ''\n" +
            "let transpose = document.createElement('span');\n" +
            "transpose.className = 'page-tab-left';\n" +
            "transpose.innerHTML = '&#9735';\n" +
            "transpose.title = '报表转置';\n" +
            "transpose.onclick = function(){\n" +
            "datasetTranspose();\n" +
            "}\n" +
            "div.appendChild(transpose);\n" +
            "let xml = document.createElement('span');\n" +
            "xml.className = 'page-tab';\n" +
            "xml.style.cssFloat = 'right';\n" +
            "xml.innerHTML = '&#8675';\n" +
            "xml.title = '导出XML';\n" +
            "xml.onclick = function(){\n" +
            "if (typeof getXmlFile === 'function')\n" +
            "getXmlFile(DATASET.title[0], [DATASET], USER);\n" +
            "else\n" +
            "getXMLFile(DATASET.title, DATASET.columns, DATASET.data);\n" +
            "}\n" +
            "div.appendChild(xml);\n" +
            "if (index>0){\n" +
            "let span = document.createElement('span');\n" +
            "span.className = 'page-tab';\n" +
            "span.id = index-1;\n" +
            "span.innerText = '•••';\n" +
            "span.onclick = function(){\n" +
            "selectPageGroup(div, Number(this.id),pageindex, pages);\n" +
            "}\n" +
            "div.appendChild(span);\n" +
            "}\n" +
            "for (let i=index*10;i<pages&&i<(index+1)*10;i++){\n" +
            "let span = document.createElement('span');\n" +
            "span.className = 'page-tab';\n" +
            "span.id = i;\n" +
            "span.innerText = (i+1);\n" +
            "if (pageindex == i)\n" +
            "span.className = 'page-tab-selected';\n" +
            "span.onclick = function(){\n" +
            "viewDataset(Number(this.id));\n" +
            "}\n" +
            "div.appendChild(span);\n" +
            "}\n" +
            "if ((index+1)*10<pages){\n" +
            "let span = document.createElement('span');\n" +
            "span.className = 'page-tab';\n" +
            "span.id = index+1;\n" +
            "span.innerText = '•••';\n" +
            "span.onclick = function(){\n" +
            "selectPageGroup(div, Number(this.id),pageindex, pages);\n" +
            "}\n" +
            "div.appendChild(span);\n" +
            "}\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function viewDataset(pageindex) {\n" +
            "let columns = DATASET.columns;\n" +
            "let data = DATASET.data;\n" +
            "let configs = DATASET.configs;\n" +
            "let pagesize = Number(configs.reportPageSize.value);\n" +
            "let pages = (data.length%pagesize==0?Math.floor(data.length/pagesize):Math.floor(data.length/pagesize) + 1);\n" +
            "let table = document.createElement('table');\n" +
            "table.className = table.id = 'table';\n" +
            "table.style.minWidth = configs.reportMinWidth.value;\n" +
            "table.style.maxWidth = configs.reportMaxWidth.value;\n" +
            "table.style.color = document.body.style.color;\n" +
            "table.style.fontSize = configs.reportFontSize.value;\n" +
            "if (configs.reportFontFamily.value != 'default')\n" +
            "table.style.fontFamily = configs.reportFontFamily.value;\n" +
            "if (configs.reportFontWeight.value != 'default')\n" +
            "table.style.fontWeight = configs.reportFontWeight.value;\n" +
            "if (configs.reportFontStyle.value != 'default')\n" +
            "table.style.fontStyle = configs.reportFontStyle.value;\n" +
            "\n" +
            "let tr = document.createElement('tr');\n" +
            "if (configs.reportRowHeight.value != 'default')\n" +
            "tr.style.height = configs.reportRowHeight.value;\n" +
            "table.appendChild(tr);\n" +
            "\n" +
            "for (let c = 0; c < columns.length; c++) {\n" +
            "let th = document.createElement('th');\n" +
            "th.style.textAlign = columns[c].style.textAlign;\n" +
            "switch (columns[c].order) {\n" +
            "case '':\n" +
            "th.innerText = '● ' + columns[c].name;\n" +
            "break;\n" +
            "case 'asc':\n" +
            "th.innerText = '▲ ' + columns[c].name;\n" +
            "break;\n" +
            "case 'desc':\n" +
            "th.innerText = '▼ ' + columns[c].name;\n" +
            "break;\n" +
            "}\n" +
            "th.title = columns[c].name;\n" +
            "th.setAttribute('colid', c);\n" +
            "th.onclick = function () {\n" +
            "orderDatasetBy(this.getAttribute('colid'));\n" +
            "viewDataset(0);\n" +
            "reset('echarts');\n" +
            "};\n" +
            "tr.appendChild(th);\n" +
            "}\n" +
            "let floatFormat = '#,##0.';\n" +
            "for (let i = 0; i < Number(configs.reportScale.value); i++) {\n" +
            "floatFormat += '0';\n" +
            "}\n" +
            "for (let i = pageindex * pagesize; i < data.length && i < (pageindex+1)* pagesize; i++) {\n" +
            "let tr = document.createElement('tr');\n" +
            "tr.type = 'tr';\n" +
            "if (configs.reportRowHeight.value != 'default')\n" +
            "tr.style.height =configs.reportRowHeight.value;\n" +
            "tr.id = i;\n" +
            "if (i % 2 > 0) {\n" +
            "tr.className = 'alt-line';\n" +
            "}\n" +
            "table.appendChild(tr);\n" +
            "let row = data[i];\n" +
            "for (let c = 0; c < columns.length; c++) {\n" +
            "let item = row[columns[c].name];\n" +
            "let td = document.createElement('td');\n" +
            "try {\n" +
            "if (item.value != null) {\n" +
            "if (item.type == 'number') {\n" +
            "let f = item.format;\n" +
            "if ((item.value + '').indexOf('.') !== -1) {\n" +
            "f = floatFormat;\n" +
            "item.value = Math.round(item.value * Math.pow(10,Number(configs.reportScale.value))) / Math.pow(10,Number(configs.reportScale.value));\n" +
            "} else {\n" +
            "if (columns[c]['format'] !== 'undefined') {\n" +
            "if (item.format != columns[c].format)\n" +
            "f = columns[c].format;\n" +
            "}\n" +
            "}\n" +
            "td.innerText = item.value.format(f);\n" +
            "item.format = columns[c]['format'] = f;\n" +
            "} else if (item.type == 'date' || item.type == 'datetime')\n" +
            "td.innerText = new Date(item.value).format(item.format);\n" +
            "else\n" +
            "td.innerText = item.value;\n" +
            "} else\n" +
            "td.innerText = '';\n" +
            "let style = '';\n" +
            "for (let key in item.style) {\n" +
            "if (key === 'color')" +
            "Number(row[columns[c].name].value) < 0?style += key + ': red': '';\n" +
            "else " +
            "style += key + ': ' + item.style[key] + ';';\n" +
            "}\n" +
            "td.style.cssText = style;\n" +
            "} catch (e) {\n" +
            "td.innerText = row[columns[c].name].value;\n" +
            "}\n" +
            "tr.appendChild(td);\n" +
            "}\n" +
            "}\n" +
            "let container = $('_TABLE');\n" +
            "container.innerHTML='';\n" +
            "container.appendChild(table);\n" +
            "let div = document.createElement('div');\n" +
            "div.id = '_PAGES';\n" +
            "let groupindex = Math.floor(pageindex/10);\n" +
            "container.appendChild(div);\n" +
            "selectPageGroup(div, groupindex,pageindex,pages);\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function orderDatasetBy(colid) {\n" +
            "function exchange(r1, r2) {\n" +
            "for (col in r1) {\n" +
            "for (attr in r1[col]) {\n" +
            "if (attr != 'rowid' && attr != 'colid') {\n" +
            "let tmp = r1[col][attr];\n" +
            "r1[col][attr] = r2[col][attr];\n" +
            "r2[col][attr] = tmp;\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "let columns = DATASET.columns;\n" +
            "let data = DATASET.data;\n" +
            "switch (columns[colid].order) {\n" +
            "case '':\n" +
            "columns[colid].order = 'asc';\n" +
            "break;\n" +
            "case 'asc':\n" +
            "columns[colid].order = 'desc';\n" +
            "break;\n" +
            "case 'desc':\n" +
            "columns[colid].order = 'asc';\n" +
            "break;\n" +
            "}\n" +
            "for (let i = 0; i < data.length; i++) {\n" +
            "for (let x = 0; x < i; x++) {\n" +
            "switch (columns[colid].order) {\n" +
            "case 'asc':\n" +
            "if (data[i][columns[colid].name].type == 'number' && data[x][columns[colid].name].type == 'number') {\n" +
            "if (data[i][columns[colid].name].value < data[x][columns[colid].name].value) {\n" +
            "exchange(data[i], data[x]);\n" +
            "}\n" +
            "} else if (data[i][columns[colid].name].type == 'object' || data[x][columns[colid].name].type == 'object') {\n" +
            "//exchange(data[i], data[x]);\n" +
            "} else {\n" +
            "if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) < 0 && data[i][columns[colid].name].type == data[x][columns[colid].name].type) {\n" +
            "exchange(data[i], data[x]);\n" +
            "}\n" +
            "}\n" +
            "break;\n" +
            "case 'desc':\n" +
            "if (data[i][columns[colid].name].type == 'number' && data[x][columns[colid].name].type == 'number') {\n" +
            "if (data[i][columns[colid].name].value > data[x][columns[colid].name].value) {\n" +
            "exchange(data[i], data[x]);\n" +
            "}\n" +
            "} else if (data[i][columns[colid].name].type == 'object' || data[x][columns[colid].name].type == 'object') {\n" +
            "//exchange(data[i], data[x]);\n" +
            "} else {\n" +
            "if (data[i][columns[colid].name].value.localeCompare(data[x][columns[colid].name].value) > 0 && data[i][columns[colid].name].type == data[x][columns[colid].name].type) {\n" +
            "exchange(data[i], data[x]);\n" +
            "}\n" +
            "}\n" +
            "break;\n" +
            "}\n" +
            "}\n" +
            "}\n" +
            "return DATASET;\n" +
            "}\n" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function datasetTranspose(){\n" +
            "try {\n" +
            "let columns = DATASET.columns;\n" +
            "let data = DATASET.data;\n" +
            "let settmp = {columns: [], data: []};\n" +
            "let col = {\n" +
            "id: 0,\n" +
            "name: columns[0].name,\n" +
            "order: '',\n" +
            "type: 'string',\n" +
            "style: columns[0].style\n" +
            "};\n" +
            "settmp.columns.push(col);\n" +
            "for (let i = 0; i < data.length; i++) {\n" +
            "let row = data[i];\n" +
            "col = {\n" +
            "id: i + 1,\n" +
            "name: row[columns[0].name].value,\n" +
            "order: '',\n" +
            "type: row[columns[0].name].type,\n" +
            "style: row[columns[0].name].style\n" +
            "};\n" +
            "settmp.columns.push(col);\n" +
            "}\n" +
            "\n" +
            "for (let c = 1; c < columns.length; c++) {\n" +
            "let nr = {};\n" +
            "nr[columns[0].name] = {\n" +
            "rowid: c - 1,\n" +
            "colid: 0,\n" +
            "value: columns[c].name,\n" +
            "type: 'string',\n" +
            "style: columns[c].style\n" +
            "};\n" +
            "for (let i = 0; i < data.length; i++) {\n" +
            "let row = data[i];\n" +
            "nr[row[columns[0].name].value] = {\n" +
            "rowid: c - 1,\n" +
            "colid: i + 1,\n" +
            "value: row[columns[c].name].value,\n" +
            "type: row[columns[c].name].type,\n" +
            "style: row[columns[c].name].style\n" +
            "};\n" +
            "}\n" +
            "settmp.data.push(nr);\n" +
            "}\n" +
            "DATASET.data = settmp.data;\n" +
            "DATASET.columns = settmp.columns;\n" +
            "viewDataset(0);\n" +
            "reset('echarts');\n" +
            "} catch (e) {\n" +
            "console.log(e);\n" +
            "}\n" +
            "}" +
            "</script>",

            "<script type='text/javascript'>\n" +
            "function getXMLFile(title, columns, DATASET){\n" +
            "try{\n" +
            "let xml = '<?xml version=\"1.0\"?>" +
            "<?mso-application progid=\"Excel.Sheet\"?>" +
            "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"" +
            " xmlns:o=\"urn:schemas-microsoft-com:office:office\"" +
            " xmlns:x=\"urn:schemas-microsoft-com:office:excel\"" +
            " xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"" +
            " xmlns:html=\"http://www.w3.org/TR/REC-html40\">" +
            "<DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">" +
            "<Author>' + USER + '</Author>" +
            "<LastAuthor></LastAuthor>" +
            "<Created>' + new Date() + '</Created>" +
            "<Version>1.0.0</Version>" +
            "</DocumentProperties>" +
            "<Styles>" +
            "<Style ss:ID=\"Default\" ss:Name=\"Normal\">" +
            "<Alignment ss:Vertical=\"Center\"/>" +
            "<Borders/>" +
            "<Font ss:FontName=\"宋体\" x:CharSet=\"134\" ss:Size=\"11\" ss:Color=\"#000000\"/>" +
            "<Interior/>" +
            "<NumberFormat ss:Format=\"#,##0.00_ \"/>" +
            "<Protection/>" +
            "</Style>" +
            "</Styles>';\n" +
            "xml += '<Worksheet ss:Name=\"' + title[title.length-1].split(\"<\").join(\"&lt;\").split(\">\").join(\"&gt;\").split(\"*\").join(\"#\").split(\"?\").join(\"#\").split(\"[\").join(\"#\").split(\"]\").join(\"#\").split(\"\\\\\").join(\"#\").split(\"/\").join(\"#\") + '\"><Table ss:ExpandedColumnCount=\"' + columns.length + '\" ss:ExpandedRowCount=\"' + (DATASET.length + 1) + '\">';\n" +
            "let r = '<Row>';\n" +
            "for(let c = 0;c < columns.length; c++){\n" +
            "let ce = '<Cell><Data ss:Type=\"String\">'+ columns[c].name.split(\"<\").join(\"&lt;\").split(\">\").join(\"&gt;\") + '</Data></Cell>';\n" +
            "r += ce;\n" +
            "}\n" +
            "r += '</Row>';\n" +
            "xml += r;\n" +
            "for(let i = 0;i < DATASET.length; i++){\n" +
            "let row = DATASET[i];\n" +
            "r = '<Row>';\n" +
            "for(let c = 0;c < columns.length; c++){\n" +
            "let cell = row[columns[c].name];\n" +
            "let ce = '<Cell><Data ss:Type=\"' + (cell.type=='number'?'Number':'String') + '\">'+ (cell.type=='number'?cell.value:(typeof cell.value !== 'undefined'?cell.value.split(\"<\").join(\"&lt;\").split(\">\").join(\"&gt;\"):'')) + '</Data></Cell>';\n" +
            "r += ce;\n" +
            "}\n" +
            "r += '</Row>';\n" +
            "xml += r;\n" +
            "}\n" +
            "xml += '</Table></Worksheet></Workbook>';\n" +
            "let blob = new Blob([str2ab(xml)], {type: 'text/xml'});\n" +
            "openDownloadDialog(blob, title[0] + '.report.xml');\n" +
            "} catch (e) {\n" +
            "alert(e);\n" +
            "}\n" +
            "}" +
            "</script>",
        ]).join("\n");
        return scripts;
    }

    let id = container.getAttribute("_echarts_instance_");
    let report = JSON.parse(__ECHARTS__.history[id]);
    let title = report.dataset.title;
    let link = "<a class='link' id= 'report-system' title='进入系统,使用「打开报表」功能可编辑此报表.' href='" + window.location.href.split("?")[0] + "'>" + __VERSION__.name + "</a>";
    report = JSON.stringify(report);
    report = report.encode();
    let configs = JSON.stringify(__DATASET__.configs).encode();
    let jsPath = __VERSION__.url + "/blob/master";
    if (__DATASET__.configs.reportScopeOfUse.value === "intranet") {
        jsPath = location.href.split("?")[0].split("/");
        jsPath = jsPath.slice(0, jsPath.length - 1).join("/");
    }
    let time = getNow();
    let html = "<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "<meta charset='utf-8'>\n" +
        "<title>" + title[0] + "</title>\n" +
        "<meta name='renderer' content='webkit'>\n" +
        "<meta name='description' content='这是 " + __VERSION__.name + " 的固定报表'>\n" +
        "<meta name='app-version' content='" + __VERSION__.version + "'>\n" +
        "<meta name='app-author' content='" + __VERSION__.author + "'>\n" +
        "<meta name='app-url' content='" + __VERSION__.url + "'>\n" +
        "<meta name='report-author' content='" + (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "") + "'>\n" +
        "<meta name='report-create-time' content='" + time + "'>\n" +
        "<style>\n" +
        "body{margin-top:15px;font-family: Arial, Verdana;" +
        "background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.15) 75%,transparent 75%,transparent);}\n" +
        "::-webkit-scrollbar {width: 5px;height: 4px;background: transparent;}\n" +
        "::-webkit-scrollbar-thumb {border-radius: 3px;background-color: grey;" +
        "background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.2) 50%,rgba(255, 255, 255, 0.2) 75%,transparent 75%,transparent);\n" +
        "}\n" +
        "::-webkit-scrollbar-track {box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);background: transparent;border-radius: 3px;}\n" +
        "div#_TITLE{margin: auto;width: 80%;overflow: hidden;}\n" +
        "img#logo{margin: auto;float:left;width: 60px;height: 60px;}\n" +
        "div#title{margin: auto;width:80%;float:left;}\n" +
        "h1#main-title{margin: auto;width: 100%;cursor: pointer;text-align: left;white-space: normal;word-break: break-all;word-wrap: break-word;}\n" +
        "h3#sub-title{margin: auto;width: 100%;cursor: pointer;text-align: left;white-space: normal;word-break: break-all;word-wrap: break-word;}\n" +
        "h6#footer{margin: auto;width: 80%;cursor: pointer;text-align: center}\n" +
        "div#_TABS{margin: auto;padding-left: 5px;padding-right: 5px;width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;height: 100%}\n" +
        "div#_ECHARTS{margin: auto;padding-left: 5px;padding-right: 5px;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: hidden;height: 100%;display: table; text-align: center}\n" +
        "div#_TABLE{margin: auto;padding-left: 5px;padding-right: 5px;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: scroll;display: none}\n" +
        "div#_SCRIPT{margin: auto;font-size: 90%;padding-left: 5px;padding-right: 5px;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: hidden;height: 100%;line-height: 2;display: none}\n" +
        "div#_CONFIGS{margin: auto;font-size: 80%;padding-left: 5px;padding-right: 5px;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: hidden;height: 100%;display: none;" +
        "-webkit-column-count: 2;column-count: 2;column-fill: auto}\n" +
        "img#echarts-image{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)}\n" +
        "img#_FULLSCREEN{padding:0px;cursor: pointer;margin-left: 20px;outline-style: none;border-bottom-width: 0px;float: right}\n" +
        "div#_PAGES{margin: 5px;border-top:1px solid gray;}\n" +
        "div#_CODES{margin: auto;padding-left: 5px;padding-right: 5px;width: 80%;border: 1px solid coral;border-radius: 5px;overflow: hidden;height: 100%;display: none}\n" +
        "code{cursor: pointer;font-family: Verdana,Arial;font-size: 80%;width: 100%;white-space: normal;word-break: break-all;word-wrap: break-word;display:none}\n" +
        "code#sql{cursor: pointer;font-family: Verdana,Arial;font-size: 80%;height: 100%;width: 100%;white-space: normal;word-break: break-all;word-wrap: break-word;display:block;margin:10px;}\n" +
        "a.link{font-size: 100%;padding-left: 5px;padding-right: 5px;background-color: sandybrown;outline-style: none;border-radius: 4px;text-decoration:none;}\n" +
        "span.tabButton-selected{cursor: pointer;font-size: 100%;padding-left: 5px;padding-right: 5px;background-color: #00A7AA;outline-style: none;border-top-left-radius: 4px;border-top-right-radius: 4px;border: 1px solid coral;border-bottom-width: 0px;}\n" +
        "span.tabButton-unselected{cursor: pointer;font-size: 100%;padding-left: 5px;padding-right: 5px;outline-style: none;border-top-left-radius: 4px;border-top-right-radius: 4px;border: 1px solid gray;border-bottom-width: 0px;}\n" +
        "span.tabButton-unselected:hover{background-color: sandybrown}\n" +
        "span#_THEMES{height: 100%;float: right;cursor: pointer;font-size: 100%;background-color: transparent;outline-style: none;}\n" +
        "span.theme{height: 100%;cursor: pointer;font-size: 80%;width: 50px;outline-style: none;}\n" +
        "span.theme-selected{height: 100%;cursor: pointer;font-size: 90%;width: 50px;outline-style: none;border:1px solid gray;border-radius: 2px}\n" +
        "dl{padding-left: 5px;padding-right: 5px;}\n" +
        "dt{cursor: pointer;outline-style: none;border-radius: 4px}\n" +
        "dt:hover{background-color: rgba(0, 0, 0, 0.1);}\n" +
        "span.exp-open{cursor: pointer;outline-style: none;font-size:110%;font-weight: bolder}\n" +
        "span.exp-open:hover{color:coral}\n" +
        "span.exp-close{cursor: pointer;outline-style: none;font-size:110%;font-weight: bolder}\n" +
        "span.exp-close:hover{color:coral}\n" +
        "dd{display:none;min-height: 24px;cursor: pointer;font-size: 100%;padding-left: 5px;padding-right: 5px;outline-style: none;border-radius: 4px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}\n" +
        "span.configs-name{cursor: pointer;font-size: 100%;padding-left: 5px;padding-right: 5px;background-color: sandybrown;outline-style: none;border-radius: 4px;border: 1px solid gray;}\n" +
        "span.configs-value{cursor: pointer;font-size: 100%;padding-left: 5px;padding-right: 5px;background-color: #00A7AA;outline-style: none;border-radius: 4px;border: 1px solid gray;}\n" +
        "span.SQLWorda{cursor: pointer;padding-left: 3px;padding-right: 3px;background-color: #00A7AA;outline-style: none;border-radius: 4px;}\n" +
        "span.SQLWordb{cursor: pointer;padding-left: 3px;padding-right: 3px;background-color: sandybrown;outline-style: none;border-radius: 4px;}\n" +
        "span.SQLWordc{cursor: pointer;padding-left: 3px;padding-right: 3px;background-color: rosybrown;outline-style: none;border-radius: 4px;}\n" +
        "span.SQLWordd{cursor: pointer;margin-left:0px;margin-right:0px;padding-left: 0px;padding-right: 0px;background-color: transparent;color: coral;outline-style: none;font-weight:bold}\n" +
        "p.SQLWorde{cursor: pointer;margin-right:5px;margin-right:20px;padding-left: 5px;padding-right: 5px;background-color: rgba(0, 0, 0, 0.1);outline-style: none;border-radius: 4px;}\n" +
        "span.SQLWordf{cursor: pointer;margin-left:0px;margin-right:0px;padding-left: 0px;padding-right: 0px;background-color: transparent;color: #008080;outline-style: none;font-weight:bold}\n" +
        "span.SQLWordg{cursor: pointer;outline-style: none;color:mediumvioletred;font-weight: bolder}\n" +
        "span#echarts{margin: auto;display: table-cell; vertical-align: middle;}\n" +
        "table.table{font-size: 100%;margin: 6px;line-height:12px;border-collapse:collapse;cursor: pointer;position:relative;min-width: 33%;border-radius: 5px;background-color: transparent;}\n" +
        "tr{height: 25px;background-color:rgba(0, 0, 0, 0);}\n" +
        "tr:hover{background-color:rosybrown;}\n" +
        "tr.alt-line{background-color:rgba(0, 0, 0, 0.15);}\n" +
        "tr.alt-line:hover{background-color:rosybrown;}\n" +
        "th{border-radius: 4px;margin: 0px;padding: 3px 3px 2px 3px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-weight: bolder;text-align: center;background-color: #00A7AA;color: #DCDCDC}\n" +
        "th:hover{background-color: #008080;}\n" +
        "td{border-bottom:1px solid gray;margin: 2px;padding:3px 3px 2px 3px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap}\n" +
        "td:hover{border-bottom:2px solid #00A7AA}\n" +
        "span.page-tab{float:left;cursor: pointer;width: 50px;font-size: 80%;text-align: center;border-right:1px solid gray;border-bottom-left-radius: 6px;border-bottom-right-radius: 36px;}" +
        "span.page-tab-selected{float:left;cursor: pointer;width: 50px;font-size: 80%;background-color: #00A7AA;text-align: center;border-right:1px solid gray;border-bottom-left-radius: 6px;border-bottom-right-radius: 36px;}" +
        "span.page-tab:hover{background-color: sandybrown;}\n" +
        "span.page-tab-left{float:left;cursor: pointer;width: 50px;font-size: 80%;text-align: center;border-left:1px solid gray;border-bottom-right-radius: 6px;border-bottom-left-radius: 36px;}" +
        "span.page-tab-left:hover{background-color: sandybrown;}\n" +
        ".ui-container-background {position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.1);z-index: 999}\n" +
        ".ui-container-body {line-height: 20px;font-size: 90%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);margin: 10px;padding: 10px;width: 350px;border: 1px solid #00A7AA;;background-color: whitesmoke;border-bottom-left-radius: 20px;border-top-right-radius: 20px;box-shadow: inset 0px 0 12px 0px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0 12px 0px rgba(0,0,0,0.75);-webkit-box-shadow: 0px 0 12px 0px rgba(0,0,0,0.75);z-index: 9999;}\n" +
        ".ui-container-title{width: 100%;cursor: move;line-height: 24px;height: 24px;background-color:transparent;color: #00A7AA;border-radius: 12px;display: table;background-repeat: no-repeat;}\n" +
        ".ui-container-title:hover{background-color: rosybrown;color: whitesmoke;}\n" +
        ".ui-container-title span {height: 100%;display: table-cell;vertical-align: middle;float: left;margin-left: 24px;}\n" +
        "ui-container-logo {float: left;display: table-cell;vertical-align: middle;}\n" +
        ".ui-container-close{display: table-cell;vertical-align: middle;cursor: pointer;float: right;}\n" +
        ".ui-container-hr{height: 1px;border-width: 0;color: gray;background-color: #00A7AA;;width: 100%;}\n" +
        ".ui-container-scroll-div {position: relative;font-size: 100%;width: 100%;float: left;height: 300px;overflow: scroll;}" +
        "input, select {background-color: transparent;;outline-style: none;border: 0px;border-bottom: 1px solid #00A7AA;box-sizing: border-box;}\n" +
        "input[type=range] {-webkit-appearance: none;}\n" +
        "input[type='range']::-webkit-slider-thumb {-webkit-appearance: none;border: 6px solid #00A7AA;height: 16px;width: 16px;border-radius: 8px;cursor: pointer;}\n" +
        ".ui-container-item {color: #00A7AA;}\n" +
        ".ui-container-item-range {float: right;width: 70%;vertical-align: middle;}\n" +
        ".ui-container-item-number {float: left;width: 70%;vertical-align: middle;}\n" +
        ".ui-container-item-input {cursor: pointer;font-size: 100%;padding: 0px;margin: 0px;width: 70%;float: right;height: 100%;vertical-align: bottom;}\n" +
        ".ui-container-item-color,.ui-container-item-echarts-choice,.ui-container-item-ranges,.ui-container-item-grids{cursor: pointer;font-size: 90%;padding: 0px;margin: 0px;width: 70%;float: right;height: 100%;vertical-align: bottom;border-bottom: 1px solid #00A7AA;}\n" +
        ".ui-container-item-select {cursor: pointer;font-size: 100%;padding: 0px;margin: 0px;width: 70%;float: right;height: 100%;vertical-align: bottom;border-bottom: 1px solid #00A7AA;}\n" +
        ".ui-container-item-boolean {cursor: pointer;font-size: 100%;padding: 0px;margin: 0px;width: 70%;float: right;min-height: 16px;height: 100%;vertical-align: bottom;border-bottom: 1px solid #00A7AA;}\n" +
        ".ui-container-item-checkbox {float: left;vertical-align: bottom;}\n" +
        ".ui-container-item-radio {float: left;vertical-align: bottom;}\n" +
        ".ui-tooltip {margin-top:10px; display: block;position: fixed;background-color: transparent;color: brown;border: 1px solid green;text-align: left;padding: 10px;z-index: 999;font-size: 90%;box-shadow: inset 0px 0 12px 0px rgba(0,0,0,0.75);}\n" +
        ".ui-tooltip .message {padding: 10px;};\n" +
        "hr {height:1px;border-width:0;color:gray;background-color: brown;width: 100%;position: static;}\n" +
        "</style>\n" +
        getScript(jsPath, __ECHARTS__.configs.version.value, $("UI").src.split("/")[$("UI").src.split("/").length - 1], __DATASET__.configs.reportThemes.value, (typeof __LOGS__.user.name !== "undefined" ? __LOGS__.user.name : "")) +
        "</head>\n" +
        "<body onload='init()'>\n" +
        "<div id='_TITLE'>\n" +
        "<image id='logo' svg='" + __SYS_IMAGES_SVG__.getSVG(__VERSION__.logo.name) + "' color='" + __THEMES__.get().color + "' flip='" + __VERSION__.logo.flip + "'></image>\n" +
        "<div id='title'>\n" +
        "<h1 id='main-title'>" + title[0] + "</h1>\n" +
        "<h3 id='sub-title'>" + (title.length > 1 ? title.slice(1, title.length).join("&emsp;") : "") + "</h3>\n" +
        "</div>\n" +
        "</div>\n" +
        "<div id='_TABS'>\n" +
        "<span class='tabButton-selected' id='ECHARTS' onclick='selectTab(this.id)'>数据视图</span>\n" +
        "<span class='tabButton-unselected' id='TABLE' onclick='selectTab(this.id)'>数据报表</span>\n" +
        "<span class='tabButton-unselected' id='SCRIPT' onclick='selectTab(this.id)'>数据脚本</span>\n" +
        "<span class='tabButton-unselected' id='CONFIGS' onclick='selectTab(this.id)'>视图参数</span>\n" +
        link + "\n" +
        "<image id='_FULLSCREEN' svg='" + __SYS_IMAGES_SVG__.getSVG("fullscreen") + "'></image>\n" +
        "<span id='_THEMES'></span>\n" +
        "</div>\n" +
        "<div id='_ECHARTS'>\n" +
        "<image id='echarts-image' src = '" + myChart.getDataURL({excludeComponents: ['toolbox']}) + "' width = '" + myChart.getWidth() + "' height='" + myChart.getHeight() + "'></image>\n" +
        "</div>\n" +
        "<div id='_TABLE'>\n" +
        "</div>\n" +
        "<div id='_CONFIGS'>\n" +
        "</div>\n" +
        "<div id='_SCRIPT'><code id='sql'></code></div>\n" +
        "<div id='_CODES'>\n" +
        "<code>" + report + "</code>\n" +
        "<code>" + report.hex_md5_hash() + "</code>\n" +
        "<code>" + configs + "</code>\n" +
        "<code>" + configs.hex_md5_hash() + "</code>\n" +
        "</div>\n" +
        "<h6 id='footer'>适用于<a class='link' href = 'https://www.google.cn/chrome/index.html' target='_blank'>Google Chrome</a>或<a class='link' href = 'https://www.microsoft.com/zh-cn/edge?form=MY01BV&OCID=MY01BV&r=1' target='_blank'>Microsoft Edge</a>浏览器&emsp;技术支持: <a class='link' href = '" + __VERSION__.url + "' target='_blank'>" +
        __VERSION__.author + "</a>&emsp;电话: " + __VERSION__.tel + "&emsp;邮箱: <a class='link' href='mailto:" + __VERSION__.email + "'>" + __VERSION__.email + "</a>&emsp;创建时间:" + time + "</h6>\n" +
        "</body>\n" +
        "</html>";
    let blob = new Blob([str2ab(html)], {type: "text/html"});
    openDownloadDialog(blob, title[0] + ".report.html");
}
