/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/**
 * @module nova.dom
 */
nova.dom = {};


/**
 * 检测元素是否拥有给定的 className
 * @param {string} 元素
 * @param {string} class 名称
 */
nova.dom.hasClass = function(elt, cls) {
    if (typeof elt !== 'object') {
	if (console.error) {
	    console.error('no first argument.', 'type must use nodeList.');
	}
	return false;
    } else if (typeof cls !== 'string') {
	if (console.error) {
	    console.error('no second argument.', 'type must use string.');
	}
	return false;
    } else {
	//检查elements是否已经包含classname
	if (elt.className.match(cls)) {
	    return true;
	} else {
	    return false;
	}
    }    
};


/**
 * 添加一个 classname
 * @param string
 * @param string
 */
nova.dom.addClass = function(elt, cls) {
    if (!nova.dom.hasClass(elt, cls)) {
	elt.className === "" ? elt.className = cls : elt.className += " " +cls;
    }
};


/**
 * 删除一个 classname
 * @param string} 元素
 * @param string} class 名称
 */
nova.dom.removeClass = function(elt, cls) {
    if (elt.className.length > cls.length) {
	cls = " " + cls;
    }
    elt.className = elt.className.replace(cls, "");
};


/**
 * 获取元素的样式
 * @param string
 * @param string
 */
nova.dom.getStyle = function(elt, styleProp, stylePropIE) {
    if (elt.currentStyle) {
	// IE
	return elt.currentStyle[stylePropIE];
    } else if (window.getComputedStyle) {
	// gecko
	return document.defaultView.getComputedStyle(elt,null).getPropertyValue(styleProp);
    }
};


/**
 * 获取元素的宽度
 * @param {string} 元素
 */
nova.dom.getWidth = function(elt) {
    var left,
	right;

    left = parseInt(nova.dom.getStyle(elt, "margin-left", "marginLeft"), 10);
    right = parseInt(nova.dom.getStyle(elt, "margin-right", "marginRight"), 10);

    return elt.offsetWidth + left + right;
};


/**
 * Batch set element's css
 * nova.dom.setStyle({
 * 	elm: "",
 * 	css: {
 * 		"width": "10px",
 * 		"height": "20px"
 * 	}
 * })
 */
nova.dom.setCSS = function(elm, styles) {
    var setStyle = function(prop, val) {
	for (var i = 0, len = elm.length; i < len; i++) {
	    elm[i].style[prop] = val;
	}
    };

    for (var prop in styles) {
	if (!styles.hasOwnProperty(prop)) continue;
	setStyle(prop, styles[prop]);
    }
};
