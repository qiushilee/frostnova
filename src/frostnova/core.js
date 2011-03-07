/**
 * @preserve FrostNova Javascript Library v0.0.1
 * http://qslee.com/
 *
 * Copyright 2011, Qiu-Shi Lee
 * Code licensed under the MIT License:
 * https://github.com/qiushilee/frostnova/blob/master/LICENSE.txt
 */

var nova = function() {
};


/**
 * window 的别名
 * @const
 * @type object
 */
nova.WIN = window;


/**
 * The version number
 * @type string
 */
nova.version = "0.0.1";


/**
 * Binds a function to an Object
 */
nova.bind = function(fn, object) {
	var slice = Array.prototype.slice,
	    args  = slice.apply(arguments, [2]);
	return function() {
		return fn.apply(object || {}, args.concat(slice.apply(arguments)));
	};	
};
