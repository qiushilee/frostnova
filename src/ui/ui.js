/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/*requires ua.js*/
/*requires event.js*/
/**
 * nova.ui
 */
nova.ui = {};


// tab 切换，若没有给定 id ，则对 class 为 tab 的所有元素执行函数
nova.ui.tab = function(elm) {
    var elt = elm || ".nova-tab",
	hd = nova.dom.selector(elt + ">.hd>li"),
	bd = nova.dom.selector(elt + ">.bd>li"),
	init,
	hidden,
	toggle,
	i,
	len;


    hidden = function() {
	for (i = 0, len = bd.length; i < len; i++) {
	    nova.dom.removeClass(hd[i], "selected");
	    nova.dom.addClass(bd[i], "hidden");
	}
    };


    toggle = function(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;

	// 确保焦点是 <li>
	if (nova.dom.hasClass(target, "anchor")) {
	    target = target.parentNode;
	}

	// 隐藏所有tab内容，并且删除所有选中状态
	hidden();

	// 给当前标题加上选中状态
	nova.dom.addClass(target, "selected");
	// 显示当前tab内容
	nova.dom.removeClass(bd[target.index], "hidden");
    };


    // 添加事件
    for (i = 0, len = hd.length; i < len; i++) {
	hd[i].index = i;
	nova.Event.add(hd[i], "mouseover", toggle);
    }

    // 初始化, 只显示第一个tab
    hidden();
    nova.dom.addClass(hd[0], "selected");
    nova.dom.removeClass(bd[0], "hidden");
};


// 幻灯切换
nova.ui.slide = function() {
};


// 导航
nova.ui.nav = function() {
    var item = nova.dom.selector(".nova-nav .item"),
	i,
	len;

    for (i = 0, len = item.length; i < len; i++) {
	nova.Event.add(item[i], "mouseover", function(e) {
	    nova.dom.addClass(this, "selected");
	});

	nova.Event.add(item[i], "mouseout", function(e) {
	    nova.dom.removeClass(this, "selected");
	});
    }
};


/**
 * 在页面中四处飘浮的广告
 * 遇到边界则改变飘浮方向
 * @param number width element&img's width
 * @param number height element&img's height
 * @param string img's src
 * @param string anchor href
 */
nova.ui.flow = function() {
    var doc = document,
	html = doc.documentElement,
	body = doc.body,
	opt = arguments[0],
	xPos = 300,
	yPos = 200,
	step = 1,
	delay = 30,
	height = 0,
	Hoffset = 0,
	Woffset = 0,
	yon = 0,
	xon = 0,
	pause = true,
	interval;

    //生成广告元素
    var elm = doc.createElement("div");
    nova.dom.addClass(elm, "nova-ui-flow");
    elm.innerHTML = '<a href="'+ opt.href + '"><img src="' + opt.src + '" width="' + opt.width + '" height="' + opt.height + '"></a>';
    nova.dom.setCSS([elm], {
	position: "absolute",
	zIndex: "100",
	top: yPos + "px",
	left: "2px",
	width: opt.width + "px",
	height: opt.height + "px",
	visibility: "visible"
    });

    body.appendChild(elm);

    var changePos = function () {
	width = body.clientWidth;
	height = html.clientHeight;

	Hoffset = elm.offsetHeight;
	Woffset = elm.offsetWidth;

	nova.dom.setCSS([elm], {
	    left: xPos + doc.body.scrollLeft + "px",
	    top: yPos + doc.body.scrollTop + "px"
	});

	if (yon) {
	    yPos = yPos + step;
	} else {
	    yPos = yPos - step;
	}

	if (yPos < 0) {
	    yon = 1;
	    yPos = 0;
	}

	if (yPos >= (height - Hoffset)) {
	    yon = 0;
	    yPos = (height - Hoffset);
	}

	if (xon) {
	    xPos = xPos + step;
	} else {
	    xPos = xPos - step;
	}

	if (xPos < 0) {
	    xon = 1;
	    xPos = 0;
	}

	if (xPos >= (width - Woffset)) {
	    xon = 0;
	    xPos = (width - Woffset);
	}
    };

    var pauseResume = function () {
	if (pause) {
	    clearInterval(interval);
	    pause = false;
	} else {
	    interval = setInterval(changePos, delay);
	    pause = true; 
	}
    };

    nova.Event.add(elm, "mouseover", pauseResume);
    nova.Event.add(elm, "mouseout", pauseResume);

    interval = setInterval(changePos, delay);
};


/**
 * 在页面左右两侧浮动广告
 * 随页面滚动而滚动
 * @param number top value
 * @param array img's src
 * @param array anchor href
 */
nova.ui.flowBox = function() {
    var win = window,
	doc = document,
	opt = arguments[0];

    //滚动函数
    var scroll = function(elm) {
	var scrollTop,
	    topVal = elm.offsetTop;

	win.onscroll = function() {
	    scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;

	    nova.dom.setCSS([elm], {
		top: scrollTop + topVal + "px"
	    });
	};
    };

    //添加元素
    var box = doc.createElement("div"),
	boxFirst = doc.createElement("div"),
	boxSecond = doc.createElement("div");

    box.className = "nova-flow-box";
    boxFirst.className = "nfb-first";
    boxSecond.className = "nfb-second";

    boxFirst.innerHTML = '<a href="' + opt.href[0] + '"><img src="' + opt.src[0] + '"></a>';
    boxSecond.innerHTML = '<a href="' + opt.href[1] + '"><img src="' + opt.src[1] + '"></a>';

    nova.dom.setCSS([box, boxSecond], {
	position: "absolute",
	top: 0
    });

    nova.dom.setCSS([box], {
	top: opt.top + "px"
    });

    box.appendChild(boxFirst);
    box.appendChild(boxSecond);
    doc.body.appendChild(box);

    //在IE下DOM还未onload的时候图片会很小
    //导致left值计算错误
    //所以这里加入了onload
    var handl = function() {
	nova.dom.setCSS([boxSecond], {
	    left: (doc.body.clientWidth - boxSecond.clientWidth) + "px"
	});

	scroll(box);
    };

    nova.Event.add(win, "load", handl);
};

