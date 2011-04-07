/**
 * @preserve FrostNova Javascript Library v0.3.2
 * http://qslee.com/
 *
 * Copyright 2011, Qiu-Shi Lee
 * Code licensed under the MIT License:
 * https://github.com/qiushilee/frostnova/blob/master/LICENSE.txt
 */

var nova = function() {
    return nova.init.apply(nova, arguments);
};


/**
 * This can be overriden by libraries that extend nova()
 */
nova.init = function() {
    return new nova.domChain.init(selector);
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
nova.version = "0.3.2";


/**
 * Binds a function to an Object
 * @param function
 * @param object
 * @return function
 */
nova.bind = function(fn, object) {
    var slice = Array.prototype.slice,
	args  = slice.apply(arguments, [2]);

    return function() {
	return fn.apply(object || {}, args.concat(slice.apply(arguments)));
    };	
};


/**
 * Determines if an Object is a "Array"
 * @param object
 * @returns boolean
 */
nova.isArray = function(obj) {
};


/**
 * Determines if an Object is a "String"
 * @param object
 * @returns boolean
 */
nova.isString = function(obj) {
};


/**
 * Determines if an Object is a "Nubmer"
 * @param object
 * @returns boolean
 */
nova.isNubmer = function(obj) {
};
