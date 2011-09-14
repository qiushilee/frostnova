/*requires core.js*/
/*requires load.js*/
/*requires ajax.js*/
/*requires dom.js*/

(function() {
    var rules,
	find,
	findMap,
	tokenizer,
	get;

    rules = {
	'id': /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
	'class': /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
	'tag': /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
	'>': /(?:(>))+/
    };

    find = {
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
       },

	//返回一个父级元素下的指定子级元素
	//现仅支持一个 '>'
       '>': function(root, part) {
	   if (root === null) {
	       return [];
	   }

	   var results = [];
	   //分割选择器
	   var selector = part.split('>');
	   //获取父级元素
	   var partRoot = get(selector[0], root)[0];

	   //通过循环，获取右侧子级元素
	   for (var i = 1, len = selector.length; i < len; i++) {
	       if (rules['id'].test(results[i])) {
		   results = findMap['id'](partRoot, selector[i]);

	       } else if (rules['class'].test(selector[i])) {
		   results = findMap['class'](partRoot, selector[i]);

	       } else if (rules['tag'].test(selector[i])){
		   results = findMap['tag'](partRoot, selector[i]);
	       }
	   }

	   return results;
       }
    };

    findMap = {
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
	},

	">": function(root, selector) {
	    return find['>'](root, selector);
	}
    };

    tokenizer = function(selector) {
	this.selector = selector;
	this.tokens = [];
	this.tokenize();
    };

    tokenizer.prototype.tokenize = function() {
	var finder;

	if (rules['>'].test(this.selector)){
	    finder = ">";
	} else if (rules['id'].test(this.selector)) {
	    finder = "id";
	} else if (rules['class'].test(this.selector)) {
	    finder = "class";
	} else if (rules['tag'].test(this.selector)){
	    finder = "tag";
	}

	this.tokens.push(finder);

	return this.tokens;
    };

    get = function(selector, root) {
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
