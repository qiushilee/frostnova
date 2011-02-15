/**
 * @preserve FrostNova Javascript Library v0.0.1
 * http://frostnova.qslee.com/
 *
 * Copyright 2011, showbei@gmail.com
 * Code licensed under the GPL License:
 * http://frostnova.qslee.com/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 */
var nova = nova || {};

// window 的别名
nova = {
	/**
	 * @const
	 * @type {string}
	 */
	WIN: window,
	version: "0.0.1"
};


// 在命名空间下添加一个新的函数
nova.mod = function(name, value) {
	if(!nova.name) {
		value ? nova[name] = value : nova[name] = {};
	}
};
