/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/

(function() {
    var find = {
	byID: function(root, id) {
	  if (root === null) {
	      return [];
	  }

	  return [root.getElementById(id)];
	},

	byNodeName: function(root, tag) {
	  if (root === null) {
	      return [];
	  }

	  var i,
	      len,
	      results = [],
	      nodes = root.getElementsByTagName(tag);

	  for (i = 0, len = nodes.length; i < len; i++) {
	      var _item = nodes[i];
	      results.push(_item);
	  }

	  return results;
      },

	byClassName: function(root, className) {
	 if (root === null) {
	     return [];
	 }

	 var i,
	     len,
	     results = [],
	     nodes = root.getElementsByTagName("*");

	 for (i = 0, len = nodes.length; i < len; i++) {
	     var _item = nodes[i];

	     if (_item.className.match("\\b" + className + "\\b")) {
		 results.push(_item);
	     }
	 }

	 return results;
     }
    };

    var findMap = {
	"id": function(root, selector) {
	    selector = selector.split("#")[1];
	    return find.byID(root, selector);
	},

	"tag": function(root, selector) {
	    return find.byNodeName(root, selector);
	},

	"class": function(root, selector) {
	    selector = selector.split("\.")[1];
	    return find.byClassName(root, selector);
	}
    };

    var tokenizer = function(selector) {
	this.selector = selector;
	this.tokens = [];
	this.tokenize();
    };

    tokenizer.prototype.tokenize = function() {
	var finder;

	if (this.selector[0] === "#") {
	    finder = "id";
	} else if (this.selector[0] === ".") {
	    finder = "class";
	} else {
	    finder = "tag";
	}

	this.tokens.push(finder);

	return this.tokens;
    };

    var get = function(selector, root) {
	var tokenize = new tokenizer(selector).tokens;

	return findMap[tokenize](root, selector);
    };


    /**
     * 基于CSS选择器找到DOM元素
     * @param string
     * @return array
     */
    nova.dom.selector = function(selector) {
	var root;

	if (arguments[1] === undefined) {
	    root = document;
	} else {
	    root = arguments[1];
	}

	if (root.querySelectorAll) {
	    return root.querySelectorAll(selector);
	} else {
	    return get(selector, root);
	}
    };


    /**
     * Chained APIs support
     */
    nova.domChain = {
	find: function(selector) {
		  this.selector = selector;
	      }
    };
})();
