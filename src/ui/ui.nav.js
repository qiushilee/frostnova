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
/**
 * nova.ui.nav
 * 导航
 */
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

