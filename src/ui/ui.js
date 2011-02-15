/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/*requires ua.js*/
/*requires event.js*/
/*
 * nova.ui
 */

// 命名空间
nova.mod("ui");


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
	var item = nova.dom.selector(".nova-slide .bd .item"),
	    bdCon = nova.dom.selector(".nova-slide .bd-con")[0],
	    i,
	    len,
	    setWidth,
	    clearItemClass,
	    showImg,
	    left,
	    right;


	/*
	 * 设定小图列表容器的宽度
	 */
	setWidth = function() {
		for (i = 0, len = item.length; i < len; i++) {
			var width = nova.dom.getWidth(item[i]);
		}
		bdCon.style.width = width * item.length + "px";
	};


	/*
	 * 清除小图列表的选中class
	 */
	clearItemClass = function() {
		for (i = 0, len = item.length; i < len; i++) {
			nova.dom.removeClass(item[i], "selected");
		}
	};


	/*
	 * 点击小图，显示大图
	 */
	showImg = function() {
		for (i = 0, len = item.length; i < len; i++) {
			nova.Event.add(nova.dom.selector(".nova-slide .bd .img")[i], "click", function(e) {
				clearItemClass();
				nova.dom.addClass(this.parentNode, "selected");
				nova.dom.selector(".nova-slide-bigimg")[0].src = this.getAttribute("rel");
			});
		}
	};


	/*
	 * 控制小图列表滚动方向
	 */
	left = function() {
		nova.Event.add(nova.dom.selector(".nova-slide-btn-left")[0], "click", function() {
			var mr = parseInt(nova.dom.getStyle(bdCon, "margin-right", "marginRight"), 10),
			    left = nova.dom.getWidth(item[0]) * 3;

			mr < 0 ? mr = Math.abs(mr) : mr;

			// 比较 margin-left 与 .nova-slide .bd-con 的宽度
			if (mr < nova.dom.getWidth(bdCon)) {
				bdCon.style.marginLeft = "-" + left + "px";
				left *= 2;
			}
		});
	};


	/*
	 * 控制小图列表滚动方向
	 */
	right = function() {
		nova.Event.add(nova.dom.selector(".nova-slide-btn-right")[0], "click", function() {
			var ml = parseInt(nova.dom.getStyle(bdCon, "margin-left", "marginLeft"), 10),
			    mlNum;
			    right = nova.dom.getWidth(item[0]) * 3;

			ml < 0 ? mlNum = Math.abs(ml) : mlNum = ml;

			// 比较 margin-right 与 .nova-slide .bd-con 的宽度
			if (mlNum > 0) {
				ml += 348;
				bdCon.style.marginLeft = ml + "px";
				//ml *= 2;
			}
		});
	};


	return function() {
		setWidth();
		showImg();
		left();
		right();
	}();
	/*
	for (i = 0, len = item.length; i < len; i++) {
		nova.log(item[i].offsetWidth);
	}
	*/
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


// 设定元素最小高度
// Example: <div minHeight="100"></div>
nova.ui.minHeight = function() {
	var e = nova.dom.selector("*"),
	    i,
	    len;

	for (i = 0, len = e.length; i < len; i++) {
		
		if (e[i].getAttribute("minHeight") && e[i].offsetHeight < parseFloat(e[i].getAttribute("minHeight"))) {
			e[i].style.height = e[i].getAttribute("minHeight");
		}
	}
};


// @name: pageScroll()
// @detail: 将元素位置固定在页面中, 类似 position:fixed
// @date: 09:27 2009/09/07 周一
// @update: 15:54 2010-08-09 星期一
nova.ui.fixed = function() {
	var e = nova.dom.selector(".nova-fixed"),
	    scrollTop,
	    topVal = e[0].offsetTop,
	    i,
	    len;

	window.onscroll = function() {
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		for (i = 0, len = e.length; i < len; i++) {
			e[i].style.top = scrollTop + topVal + "px";
		}
	};
};
