/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/*requires ua.js*/
/*requires event.js*/
/*requires ui.js*/
/**
 * nova.ui.tab
 * tab 切换，若没有给定 id ，则对 class 为 tab 的所有元素执行函数
 */
nova.ui.tab = function(elm) {
    var elt = elm || ".nova-tab",
	hd = nova.dom.selector(".item", nova.dom.selector(elt + ">.hd")[0]),
	bd = nova.dom.selector(".item", nova.dom.selector(elt + ">.bd")[0]),
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
	if (target.nodeName === "A") {
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

