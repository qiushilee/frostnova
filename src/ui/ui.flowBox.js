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
/*requires ui.flow.js*/
/**
 * nova.ui.flowBox
 * 对联广告
 * 在页面左右两侧浮动
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
	boxSecond = doc.createElement("div"),
	boxFirstBtn = "",
	boxSecondBtn = "";

    //关闭按钮
    if (opt.close) {
	boxFirstBtn = doc.createElement("span");
	boxSecondBtn = doc.createElement("span");

	nova.dom.setCSS([boxFirstBtn, boxSecondBtn], {
	    display: "inline-block",
	    width: "32px",
	    cursor: "pointer"
	});

	boxFirstBtn.innerHTML = '关闭';
	boxSecondBtn.innerHTML = '关闭';
    }

    box.className = "nova-flow-box";
    boxFirst.className = "nfb-first";
    boxSecond.className = "nfb-second";

    boxFirst.innerHTML = '<a href="' + opt.href[0] + '" style="display:block;"><img src="' + opt.src[0] + '"></a>';
    boxSecond.innerHTML = '<a href="' + opt.href[1] + '" style="display:block;"><img src="' + opt.src[1] + '"></a>';

    nova.dom.setCSS([boxFirst, boxSecond], {
	    textAlign: "center"
    });

    boxFirst.appendChild(boxFirstBtn);
    boxSecond.appendChild(boxSecondBtn);

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

    //关闭广告事件
    var closeHandl = function(e) {
	e = e || win.event;
	var target = e.target || e.srcElement;

	target.parentNode.innerHTML = "";
    };

    nova.Event.add(boxFirstBtn, "click", closeHandl);
    nova.Event.add(boxSecondBtn, "click", closeHandl);

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

