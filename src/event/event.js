/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/*requires ua.js*/
/**
 * nova.Event
 */
nova.Event = {};

/**
 * 添加一个事件模型
 * @param {string} 元素
 * @param {string} 事件种类
 * @param {string} 回调函数
 */
nova.Event.add = function(obj, type, fn) {
    if (obj.addEventListener) {
	obj.addEventListener(type, fn, false);
	return true;
    } else if (obj.attachEvent) {
	obj['e' + type + fn] = fn;
	obj[type + fn] = function() {
	    obj['e' + type + fn](window.event);
	};
	obj.attachEvent('on' + type, obj[type + fn]);
	return true;
    }
    return false;
};


/**
 * 删除一个事件模型
 * @param {string} 元素
 * @param {string} 事件种类
 * @param {string} 回调函数
 */
nova.Event.remove = function() {
    if (window.removeEventListener) {
	return function(elt, type, fn, capture) {
	    elt.removeEventListener(type, fn, !! capture);
	};
    } else if (window.detachEvent) {
	return function(elt, type, fn) {
	    elt.detachEvent("on" + type, fn);
	};
    } else {
	return function() {};
    }
};

