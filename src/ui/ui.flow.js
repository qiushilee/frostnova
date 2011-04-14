/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/*requires ua.js*/
/*requires event.js*/
/*requires ui.js*/
/*requires ui.tab.js*/
/*requires ui.slide.js*/
/*requires ui.nav.js*/
/**
 * nova.ui.flow
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

