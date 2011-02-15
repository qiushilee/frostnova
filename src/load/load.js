/*requires core.js*/
/*
 * nova.load
 */

// 命名空间
nova.mod("load");

nova.load = function(url, callback) {
	var script = document.createElement("script");
	script.src = url;
	script.onloadDone = false;

	// 标准浏览器 加载状态判断
	script.onload = function() {
		script.onloadDone = true;
		callback();
	};

	// IE 加载状态判断
	script.onreadystatechange = function() {
		if (script.readyState === "loaded" || script.readyState === "complete" && !script.onloadDone) {
			script.onloadDone = true;
			callback();
		}
	};

	document.body.appendChild(script);
};
