/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/
/*requires selector.js*/
/**
 * nova.ua
 */
nova.ua = {};


nova.ua = function(){
    var i, len,
	ua = nova.WIN.navigator.userAgent,
	numberify, o;

    numberify = function(s) {
	i = 0;
	return parseFloat(s.replace(/\./g, function() {
	    return (i++ == 1) ? "" : ".";
	}));
    };


    o = {
	//IE 版本号
	ie: 0,

	//WebKit 引擎版本号
	webkit: 0,

	//Gecko 引擎版本号
	gecko: 0,

	//Opera 版本号
	opera: 0,

	//移动设备
	mobile: null,

	//操作系统信息
	os: null
    };

    if ((/windows|win32/i).test(ua)) {
	o.os = "win";
    } else if ((/macintosh/i).test(ua)) {
	o.os = "mac";
    } else if ((/rhino/i).test(ua)) {
	o.os = "rhino";
    }

    if ((/KHTML/).test(ua)) {
	o.webkit = 1;
    }

    m = ua.match(/AppleWebKit\/([^\s]*)/);

    if (!o.webkit) { // not webkit
	// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
	m = ua.match(/Opera[\s\/]([^\s]*)/);
	if (m && m[1]) {
	    o.opera = numberify(m[1]);
	    m = ua.match(/Opera Mini[^;]*/);
	    if (m) {
		o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
	    }
	} else { // not opera or webkit
	    m = ua.match(/MSIE\s([^;]*)/);
	    if (m && m[1]) {
		o.ie = numberify(m[1]);
	    } else { // not opera, webkit, or ie
		m = ua.match(/Gecko\/([^\s]*)/);
		if (m) {
		    o.gecko = 1; // Gecko detected, look for revision
		    m = ua.match(/rv:([^\s\)]*)/);
		    if (m && m[1]) {
			o.gecko = numberify(m[1]);
		    }
		}
	    }
	}
    }


    return o;
}();


(function(){
    // 环境标识
    var browser = ["ua-" + nova.ua.os, "ua-jsenable"];

    if (nova.ua.ie !== 0) {
	browser.push("ua-ie" + nova.ua.ie);
    } else if (nova.ua.webkit !== 0) {
	browser.push("ua-webkit" + nova.ua.webkit);
    } else if (nova.ua.gecko !== 0) {
	browser.push("ua-gecko" + nova.ua.gecko, "ua-fx");
    } else if (nova.ua.opera !== 0) {
	browser.push("ua-opera" + nova.ua.opera);
    }

    nova.dom.addClass(nova.dom.selector("html")[0], browser.join(" "));
})();
