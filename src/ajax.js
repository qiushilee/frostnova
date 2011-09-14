/*requires core.js*/
/*requires load.js*/
/*
 * nova.ajax
 */

// 命名空间
nova.ajax = {};

nova.ajax.XMLHttpFactories = [
    function () {return new XMLHttpRequest();},
    function () {return new ActiveXObject("Msxml2.XMLHTTP");},
    function () {return new ActiveXObject("Msxml3.XMLHTTP");},
    function () {return new ActiveXObject("Microsoft.XMLHTTP");}
];

nova.ajax.createXMLHTTPObject = function() {
    var xmlhttp = false;
    for (var i = 0; i < nova.ajax.XMLHttpFactories.length; i++) {
	try {
	    xmlhttp = nova.ajax.XMLHttpFactories[i]();
	}
	catch (e) {
	    continue;
	}
	break;
    }
    return xmlhttp;
};

nova.ajax.sendRequest = function(url, callback, postData) {
    var req = nova.ajax.createXMLHTTPObject();

    if (!req) {
	return;
    }

    var method = (postData) ? "POST" : "GET";
    req.open(method, url, true);
    req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');

    if (postData) {
	req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    req.onreadystatechange = function () {
	if (req.readyState != 4) return;
	if (req.status != 200 && req.status != 304) {
	    return;
	}
	callback(req);
    };

    if (req.readyState == 4) {
	return;
    }

    req.send(postData);
};

nova.ajax.get = function(url, callback) {
    return nova.ajax.sendRequest(url, callback, "GET");
};

nova.ajax.post = function(url, callback) {
    return nova.ajax.sendRequest(url, callback, "POST");
};
