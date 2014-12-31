/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.

// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.

// ## Usage

// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.

// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// ### Response Data Types

// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:

//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>

// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.

// ### Handling Server Errors

// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:

//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>

// ### Compatibility

// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)

// ## Annotated Source

(function($, undefined) {
  "use strict";

  // Register a prefilter that checks whether the `iframe` option is set, and
  // switches to the "iframe" data type if it is `true`.
  $.ajaxPrefilter(function(options, origOptions, jqXHR) {
    if (options.iframe) {
      return "iframe";
    }
  });

  // Register a transport for the "iframe" data type. It will only activate
  // when the "files" option has been set to a non-empty list of enabled file
  // inputs.
  $.ajaxTransport("iframe", function(options, origOptions, jqXHR) {
    var form = null,
        iframe = null,
        name = "iframe-" + $.now(),
        files = $(options.files).filter(":file:enabled"),
        markers = null,
        accepts;

    // This function gets called after a successful submission or an abortion
    // and should revert all changes made to the page to enable the
    // submission via this transport.
    function cleanUp() {
      markers.prop('disabled', false);
      form.remove();
      iframe.bind("load", function() { iframe.remove(); });
      iframe.attr("src", "javascript:false;");
    }

    // Remove "iframe" from the data types list so that further processing is
    // based on the content type returned by the server, without attempting an
    // (unsupported) conversion from "iframe" to the actual type.
    options.dataTypes.shift();

    if (files.length) {
      form = $("<form enctype='multipart/form-data' method='post'></form>").
        hide().attr({action: options.url, target: name});

      // If there is any additional data specified via the `data` option,
      // we add it as hidden fields to the form. This (currently) requires
      // the `processData` option to be set to false so that the data doesn't
      // get serialized to a string.
      if (typeof(options.data) === "string" && options.data.length > 0) {
        $.error("data must not be serialized");
      }
      $.each(options.data || {}, function(name, value) {
        if ($.isPlainObject(value)) {
          name = value.name;
          value = value.value;
        }
        $("<input type='hidden' />").attr({name:  name, value: value}).
          appendTo(form);
      });

      // Add a hidden `X-Requested-With` field with the value `IFrame` to the
      // field, to help server-side code to determine that the upload happened
      // through this transport.
      $("<input type='hidden' value='IFrame' name='X-Requested-With' />").
        appendTo(form);

      // Borrowed straight from the JQuery source
      // Provides a way of specifying the accepted data type similar to HTTP_ACCEPTS
      accepts = options.dataTypes[ 0 ] && options.accepts[ options.dataTypes[0] ] ?
        options.accepts[ options.dataTypes[0] ] + ( options.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
        options.accepts[ "*" ]

      $("<input type='hidden' name='X-Http-Accept'>")
        .attr("value", accepts).appendTo(form);

      // Move the file fields into the hidden form, but first remember their
      // original locations in the document by replacing them with disabled
      // clones. This should also avoid introducing unwanted changes to the
      // page layout during submission.
      markers = files.after(function(idx) {
        return $(this).clone().prop("disabled", true);
      }).next();
      files.appendTo(form);

      return {

        // The `send` function is called by jQuery when the request should be
        // sent.
        send: function(headers, completeCallback) {
          iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");

          // The first load event gets fired after the iframe has been injected
          // into the DOM, and is used to prepare the actual submission.
          iframe.bind("load", function() {

            // The second load event gets fired when the response to the form
            // submission is received. The implementation detects whether the
            // actual payload is embedded in a `<textarea>` element, and
            // prepares the required conversions to be made in that case.
            iframe.unbind("load").bind("load", function() {
              var doc = this.contentWindow ? this.contentWindow.document :
                (this.contentDocument ? this.contentDocument : this.document),
                root = doc.documentElement ? doc.documentElement : doc.body,
                textarea = root.getElementsByTagName("textarea")[0],
                type = textarea && textarea.getAttribute("data-type") || null,
                status = textarea && textarea.getAttribute("data-status") || 200,
                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                content = {
                  html: root.innerHTML,
                  text: type ?
                    textarea.value :
                    root ? (root.textContent || root.innerText) : null
                };
              cleanUp();
              if (!jqXHR.responseText) {
                jqXHR.responseText = content.text;
              }
              completeCallback(status, statusText, content, type ?
                ("Content-Type: " + type) :
                null);
            });

            // Now that the load handler has been set up, submit the form.
            form[0].submit();
          });

          // After everything has been set up correctly, the form and iframe
          // get injected into the DOM so that the submission can be
          // initiated.
          $("body").append(form, iframe);
        },

        // The `abort` function is called by jQuery when the request should be
        // aborted.
        abort: function() {
          if (iframe !== null) {
            iframe.unbind("load").attr("src", "javascript:false;");
            cleanUp();
          }
        }

      };
    }
  });

})(jQuery);



(function($) {

  var remotipart;

  $.remotipart = remotipart = {

    setup: function(form) {
      // Preserve form.data('ujs:submit-button') before it gets nulled by $.ajax.handleRemote
      var button = form.data('ujs:submit-button'),
          csrfParam = $('meta[name="csrf-param"]').attr('content'),
          csrfToken = $('meta[name="csrf-token"]').attr('content'),
          csrfInput = form.find('input[name="' + csrfParam + '"]').length;

      form
        // Allow setup part of $.rails.handleRemote to setup remote settings before canceling default remote handler
        // This is required in order to change the remote settings using the form details
        .one('ajax:beforeSend.remotipart', function(e, xhr, settings){
          // Delete the beforeSend bindings, since we're about to re-submit via ajaxSubmit with the beforeSubmit
          // hook that was just setup and triggered via the default `$.rails.handleRemote`
          // delete settings.beforeSend;
          delete settings.beforeSend;

          settings.iframe      = true;
          settings.files       = $($.rails.fileInputSelector, form);
          settings.data        = form.serializeArray();

          // Insert the name/value of the clicked submit button, if any
          if (button)
            settings.data.push(button);

          // jQuery 1.9 serializeArray() contains input:file entries
          // so exclude them from settings.data, otherwise files will not be sent
          settings.files.each(function(i, file){
            for (var j = settings.data.length - 1; j >= 0; j--)
              if (settings.data[j].name == file.name)
                settings.data.splice(j, 1);
          })

          settings.processData = false;

          // Modify some settings to integrate JS request with rails helpers and middleware
          if (settings.dataType === undefined) { settings.dataType = 'script *'; }
          settings.data.push({name: 'remotipart_submitted', value: true});
          if (csrfToken && csrfParam && !csrfInput) {
            settings.data.push({name: csrfParam, value: csrfToken});
          }

          // Allow remotipartSubmit to be cancelled if needed
          if ($.rails.fire(form, 'ajax:remotipartSubmit', [xhr, settings])) {
            // Second verse, same as the first
            $.rails.ajax(settings);
            setTimeout(function(){ $.rails.disableFormElements(form); }, 20);
          }

          //Run cleanup
          remotipart.teardown(form);

          // Cancel the jQuery UJS request
          return false;
        })

        // Keep track that we just set this particular form with Remotipart bindings
        // Note: The `true` value will get over-written with the `settings.dataType` from the `ajax:beforeSend` handler
        .data('remotipartSubmitted', true);
    },

    teardown: function(form) {
      form
        .unbind('ajax:beforeSend.remotipart')
        .removeData('remotipartSubmitted')
    }
  };

  $(document).on('ajax:aborted:file', 'form', function(){
    var form = $(this);

    remotipart.setup(form);

    // Manually call jquery-ujs remote call so that it can setup form and settings as usual,
    // and trigger the `ajax:beforeSend` callback to which remotipart binds functionality.
    $.rails.handleRemote(form);
    return false;
  });

})(jQuery);
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*global jQuery: true */

/*!
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.1.0
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/

// Uses AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, undefined) {
    'use strict';

    $.infinitescroll = function infscr(options, callback, element) {
        this.element = $(element);

        // Flag the object in the event of a failed creation
        if (!this._create(options, callback)) {
            this.failed = true;
        }
    };

    $.infinitescroll.defaults = {
        loading: {
            finished: undefined,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: 'data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7',
            msg: null,
            msgText: '<em>Loading the next set of posts...</em>',
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false, // For when it goes all the way through the archive.
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
        behavior: undefined,
        binder: $(window), // used to cache the selector
        nextSelector: 'div.navigation a:first',
        navSelector: 'div.navigation',
        contentSelector: null, // rename to pageFragment
        extraScrollPx: 150,
        itemSelector: 'div.post',
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () { },
        infid: 0, //Instance ID
        pixelsFromNavToBottom: undefined,
        path: undefined, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
        prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
        maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
    };

    $.infinitescroll.prototype = {

        /*
            ----------------------------
            Private methods
            ----------------------------
            */

        // Bind or unbind from scroll
        _binding: function infscr_binding(binding) {

            var instance = this,
            opts = instance.options;

            opts.v = '2.0b2.120520';

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_binding_'+opts.behavior] !== undefined) {
                this['_binding_'+opts.behavior].call(this);
                return;
            }

            if (binding !== 'bind' && binding !== 'unbind') {
                this._debug('Binding value  ' + binding + ' not valid');
                return false;
            }

            if (binding === 'unbind') {
                (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
            } else {
                (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
                    instance.scroll();
                });
            }

            this._debug('Binding', binding);
        },

        // Fundamental aspects of the plugin are initialized
        _create: function infscr_create(options, callback) {

            // Add custom options to defaults
            var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
            this.options = opts;
            var $window = $(window);
            var instance = this;

            // Validate selectors
            if (!instance._validate(options)) {
                return false;
            }

            // Validate page fragment path
            var path = $(opts.nextSelector).attr('href');
            if (!path) {
                this._debug('Navigation selector not found');
                return false;
            }

            // Set the path to be a relative URL from root.
            opts.path = opts.path || this._determinepath(path);

            // contentSelector is 'page fragment' option for .load() / .ajax() calls
            opts.contentSelector = opts.contentSelector || this.element;

            // loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
            opts.loading.selector = opts.loading.selector || opts.contentSelector;

            // Define loading.msg
            opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

            // Preload loading.img
            (new Image()).src = opts.loading.img;

            // distance from nav links to bottom
            // computed as: height of the document + top offset of container - top offset of nav link
            if(opts.pixelsFromNavToBottom === undefined) {
                opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
                this._debug('pixelsFromNavToBottom: ' + opts.pixelsFromNavToBottom);
            }

            var self = this;

            // determine loading.start actions
            opts.loading.start = opts.loading.start || function() {
                $(opts.navSelector).hide();
                opts.loading.msg
                .appendTo(opts.loading.selector)
                .show(opts.loading.speed, $.proxy(function() {
                    this.beginAjax(opts);
                }, self));
            };

            // determine loading.finished actions
            opts.loading.finished = opts.loading.finished || function() {
                if (!opts.state.isBeyondMaxPage)
                    opts.loading.msg.fadeOut(opts.loading.speed);
            };

            // callback loading
            opts.callback = function(instance, data, url) {
                if (!!opts.behavior && instance['_callback_'+opts.behavior] !== undefined) {
                    instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0], data, url);
                }

                if (callback) {
                    callback.call($(opts.contentSelector)[0], data, opts, url);
                }

                if (opts.prefill) {
                    $window.bind('resize.infinite-scroll', instance._prefill);
                }
            };

            if (options.debug) {
                // Tell IE9 to use its built-in console
                if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === 'object') {
                    ['log','info','warn','error','assert','dir','clear','profile','profileEnd']
                        .forEach(function (method) {
                            console[method] = this.call(console[method], console);
                        }, Function.prototype.bind);
                }
            }

            this._setup();

            // Setups the prefill method for use
            if (opts.prefill) {
                this._prefill();
            }

            // Return true to indicate successful creation
            return true;
        },

        _prefill: function infscr_prefill() {
            var instance = this;
            var $window = $(window);

            function needsPrefill() {
                return ( $(instance.options.contentSelector).height() <= $window.height() );
            }

            this._prefill = function() {
                if (needsPrefill()) {
                    instance.scroll();
                }

                $window.bind('resize.infinite-scroll', function() {
                    if (needsPrefill()) {
                        $window.unbind('resize.infinite-scroll');
                        instance.scroll();
                    }
                });
            };

            // Call self after setting up the new function
            this._prefill();
        },

        // Console log wrapper
        _debug: function infscr_debug() {
            if (true !== this.options.debug) {
                return;
            }

            if (typeof console !== 'undefined' && typeof console.log === 'function') {
                // Modern browsers
                // Single argument, which is a string
                if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                    console.log( (Array.prototype.slice.call(arguments)).toString() );
                } else {
                    console.log( Array.prototype.slice.call(arguments) );
                }
            } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
                // IE8
                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
            }
        },

        // find the number to increment in the path.
        _determinepath: function infscr_determinepath(path) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_determinepath_'+opts.behavior] !== undefined) {
                return this['_determinepath_'+opts.behavior].call(this,path);
            }

            if (!!opts.pathParse) {

                this._debug('pathParse manual');
                return opts.pathParse(path, this.options.state.currPage+1);

            } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
                path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

                // if there is any 2 in the url at all.
            } else if (path.match(/^(.*?)2(.*?$)/)) {

                // page= is used in django:
                // http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
                if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return path;
                }

                path = path.match(/^(.*?)2(.*?$)/).slice(1);

            } else {

                // page= is used in drupal too but second page is page=1 not page=2:
                // thx Jerod Fritz, vladikoff
                if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return path;
                } else {
                    this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                    // Get rid of isInvalidPage to allow permalink to state
                    opts.state.isInvalidPage = true;  //prevent it from running on this page.
                }
            }
            this._debug('determinePath', path);
            return path;

        },

        // Custom error
        _error: function infscr_error(xhr) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_error_'+opts.behavior] !== undefined) {
                this['_error_'+opts.behavior].call(this,xhr);
                return;
            }

            if (xhr !== 'destroy' && xhr !== 'end') {
                xhr = 'unknown';
            }

            this._debug('Error', xhr);

            if (xhr === 'end' || opts.state.isBeyondMaxPage) {
                this._showdonemsg();
            }

            opts.state.isDone = true;
            opts.state.currPage = 1; // if you need to go back to this instance
            opts.state.isPaused = false;
            opts.state.isBeyondMaxPage = false;
            this._binding('unbind');

        },

        // Load Callback
        _loadcallback: function infscr_loadcallback(box, data, url) {
            var opts = this.options,
            callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
            result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
            frag;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_loadcallback_'+opts.behavior] !== undefined) {
                this['_loadcallback_'+opts.behavior].call(this,box,data,url);
                return;
            }

            switch (result) {
                case 'done':
                    this._showdonemsg();
                    return false;

                case 'no-append':
                    if (opts.dataType === 'html') {
                        data = '<div>' + data + '</div>';
                        data = $(data).find(opts.itemSelector);
                    }

                    // if it didn't return anything
                    if (data.length === 0) {
                        return this._error('end');
                    }

                    break;

                case 'append':
                    var children = box.children();
                    // if it didn't return anything
                    if (children.length === 0) {
                        return this._error('end');
                    }

                    // use a documentFragment because it works when content is going into a table or UL
                    frag = document.createDocumentFragment();
                    while (box[0].firstChild) {
                        frag.appendChild(box[0].firstChild);
                    }

                    this._debug('contentSelector', $(opts.contentSelector)[0]);
                    $(opts.contentSelector)[0].appendChild(frag);
                    // previously, we would pass in the new DOM element as context for the callback
                    // however we're now using a documentfragment, which doesn't have parents or children,
                    // so the context is the contentContainer guy, and we pass in an array
                    // of the elements collected as the first argument.

                    data = children.get();
                    break;
            }

            // loadingEnd function
            opts.loading.finished.call($(opts.contentSelector)[0],opts);

            // smooth scroll to ease in the new content
            if (opts.animate) {
                var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
                $('html,body').animate({ scrollTop: scrollTo }, 800, function () { opts.state.isDuringAjax = false; });
            }

            if (!opts.animate) {
                // once the call is done, we can allow it again.
                opts.state.isDuringAjax = false;
            }

            callback(this, data, url);

            if (opts.prefill) {
                this._prefill();
            }
        },

        _nearbottom: function infscr_nearbottom() {

            var opts = this.options,
            pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_nearbottom_'+opts.behavior] !== undefined) {
                return this['_nearbottom_'+opts.behavior].call(this);
            }

            this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

            // if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
            return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

        },

        // Pause / temporarily disable plugin from firing
        _pausing: function infscr_pausing(pause) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_pausing_'+opts.behavior] !== undefined) {
                this['_pausing_'+opts.behavior].call(this,pause);
                return;
            }

            // If pause is not 'pause' or 'resume', toggle it's value
            if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
                this._debug('Invalid argument. Toggling pause value instead');
            }

            pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

            switch (pause) {
                case 'pause':
                    opts.state.isPaused = true;
                break;

                case 'resume':
                    opts.state.isPaused = false;
                break;

                case 'toggle':
                    opts.state.isPaused = !opts.state.isPaused;
                break;
            }

            this._debug('Paused', opts.state.isPaused);
            return false;

        },

        // Behavior is determined
        // If the behavior option is undefined, it will set to default and bind to scroll
        _setup: function infscr_setup() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_setup_'+opts.behavior] !== undefined) {
                this['_setup_'+opts.behavior].call(this);
                return;
            }

            this._binding('bind');

            return false;

        },

        // Show done message
        _showdonemsg: function infscr_showdonemsg() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_showdonemsg_'+opts.behavior] !== undefined) {
                this['_showdonemsg_'+opts.behavior].call(this);
                return;
            }

            opts.loading.msg
            .find('img')
            .hide()
            .parent()
            .find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
                $(this).parent().fadeOut(opts.loading.speed);
            });

            // user provided callback when done
            opts.errorCallback.call($(opts.contentSelector)[0],'done');
        },

        // grab each selector option and see if any fail
        _validate: function infscr_validate(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
                    this._debug('Your ' + key + ' found no elements.');
                    return false;
                }
            }

            return true;
        },

        /*
            ----------------------------
            Public methods
            ----------------------------
            */

        // Bind to scroll
        bind: function infscr_bind() {
            this._binding('bind');
        },

        // Destroy current instance of plugin
        destroy: function infscr_destroy() {
            this.options.state.isDestroyed = true;
            this.options.loading.finished();
            return this._error('destroy');
        },

        // Set pause value to false
        pause: function infscr_pause() {
            this._pausing('pause');
        },

        // Set pause value to false
        resume: function infscr_resume() {
            this._pausing('resume');
        },

        beginAjax: function infscr_ajax(opts) {
            var instance = this,
                path = opts.path,
                box, desturl, method, condition;

            // increment the URL bit. e.g. /page/3/
            opts.state.currPage++;

            // Manually control maximum page
            if ( opts.maxPage !== undefined && opts.state.currPage > opts.maxPage ){
                opts.state.isBeyondMaxPage = true;
                this.destroy();
                return;
            }

            // if we're dealing with a table we can't use DIVs
            box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

            desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
            instance._debug('heading into ajax', desturl);

            method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
            if (opts.appendCallback && opts.dataType === 'html') {
                method += '+callback';
            }

            switch (method) {
                case 'html+callback':
                    instance._debug('Using HTML via .load() method');
                    box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
                        instance._loadcallback(box, responseText, desturl);
                    });

                    break;

                case 'html':
                    instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
                    $.ajax({
                        // params
                        url: desturl,
                        dataType: opts.dataType,
                        complete: function infscr_ajax_callback(jqXHR, textStatus) {
                            condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === 'success' || textStatus === 'notmodified');
                            if (condition) {
                                instance._loadcallback(box, jqXHR.responseText, desturl);
                            } else {
                                instance._error('end');
                            }
                        }
                    });

                    break;
                case 'json':
                    instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
                    $.ajax({
                        dataType: 'json',
                        type: 'GET',
                        url: desturl,
                        success: function (data, textStatus, jqXHR) {
                            condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === 'success' || textStatus === 'notmodified');
                            if (opts.appendCallback) {
                                // if appendCallback is true, you must defined template in options.
                                // note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
                                if (opts.template !== undefined) {
                                    var theData = opts.template(data);
                                    box.append(theData);
                                    if (condition) {
                                        instance._loadcallback(box, theData);
                                    } else {
                                        instance._error('end');
                                    }
                                } else {
                                    instance._debug('template must be defined.');
                                    instance._error('end');
                                }
                            } else {
                                // if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
                                if (condition) {
                                    instance._loadcallback(box, data, desturl);
                                } else {
                                    instance._error('end');
                                }
                            }
                        },
                        error: function() {
                            instance._debug('JSON ajax request failed.');
                            instance._error('end');
                        }
                    });

                    break;
            }
        },

        // Retrieve next set of content items
        retrieve: function infscr_retrieve(pageNum) {
            pageNum = pageNum || null;

            var instance = this,
            opts = instance.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['retrieve_'+opts.behavior] !== undefined) {
                this['retrieve_'+opts.behavior].call(this,pageNum);
                return;
            }

            // for manual triggers, if destroyed, get out of here
            if (opts.state.isDestroyed) {
                this._debug('Instance is destroyed');
                return false;
            }

            // we dont want to fire the ajax multiple times
            opts.state.isDuringAjax = true;

            opts.loading.start.call($(opts.contentSelector)[0],opts);
        },

        // Check to see next page is needed
        scroll: function infscr_scroll() {

            var opts = this.options,
            state = opts.state;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['scroll_'+opts.behavior] !== undefined) {
                this['scroll_'+opts.behavior].call(this);
                return;
            }

            if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
                return;
            }

            if (!this._nearbottom()) {
                return;
            }

            this.retrieve();

        },

        // Toggle pause value
        toggle: function infscr_toggle() {
            this._pausing();
        },

        // Unbind from scroll
        unbind: function infscr_unbind() {
            this._binding('unbind');
        },

        // update options
        update: function infscr_options(key) {
            if ($.isPlainObject(key)) {
                this.options = $.extend(true,this.options,key);
            }
        }
    };


    /*
        ----------------------------
        Infinite Scroll function
        ----------------------------

        Borrowed logic from the following...

        jQuery UI
        - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

        jCarousel
        - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

        Masonry
        - https://github.com/desandro/masonry/blob/master/jquery.masonry.js

*/

    $.fn.infinitescroll = function infscr_init(options, callback) {


        var thisCall = typeof options;

        switch (thisCall) {

            // method
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);

                this.each(function () {
                    var instance = $.data(this, 'infinitescroll');

                    if (!instance) {
                        // not setup yet
                        // return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
                        return false;
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                        // return $.error('No such method ' + options + ' for Infinite Scroll');
                        return false;
                    }

                    // no errors!
                    instance[options].apply(instance, args);
                });

            break;

            // creation
            case 'object':

                this.each(function () {

                var instance = $.data(this, 'infinitescroll');

                if (instance) {

                    // update options of current instance
                    instance.update(options);

                } else {

                    // initialize new instance
                    instance = new $.infinitescroll(options, callback, this);

                    // don't attach if instantiation failed
                    if (!instance.failed) {
                        $.data(this, 'infinitescroll', instance);
                    }

                }

            });

            break;

        }

        return this;
    };



    /*
     * smartscroll: debounced scroll event for jQuery *
     * https://github.com/lukeshumard/smartscroll
     * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
     * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
     */

    var event = $.event,
    scrollTimeout;

    event.special.smartscroll = {
        setup: function () {
            $(this).bind('scroll', event.special.smartscroll.handler);
        },
        teardown: function () {
            $(this).unbind('scroll', event.special.smartscroll.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
            args = arguments;

            // set correct event type
            event.type = 'smartscroll';

            if (scrollTimeout) { clearTimeout(scrollTimeout); }
            scrollTimeout = setTimeout(function () {
                $(context).trigger('smartscroll', args);
            }, execAsap === 'execAsap' ? 0 : 100);
        }
    };

    $.fn.smartscroll = function (fn) {
        return fn ? this.bind('smartscroll', fn) : this.trigger('smartscroll', ['execAsap']);
    };

}));
  $(function() {
    if($("#particles").size()>0){
      (function() {
        var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
        width = $('#canvas-bg').width();
        height= $('#canvas-bg').height();
        target = {x: 0, y: height};
        largeHeader = document.getElementById('canvas-bg');
        largeHeader.style.height = height+'px';
        canvas = document.getElementById('particles');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        circles = [];
        for(var x = 0; x < width*0.5; x++) {
          var c = new Circle();
          circles.push(c);
        }
        animate();
          window.addEventListener('resize',function(){
          width = window.innerWidth;
              canvas.width = width;
          });
          function animate() {
              if(animateHeader) {
                  ctx.clearRect(0,0,width,height);
                  for(var i in circles) {
                      circles[i].draw();
                  }
              }
              requestAnimationFrame(animate);
          }
          function Circle() {
              var _this = this;

              (function() {
                  _this.pos = {};
                  init();
              })();

              function init() {
                  _this.pos.x = Math.random()*width;
                  _this.pos.y = height+Math.random()*100;
                  _this.alpha = 0.1+Math.random()*0.3;
                  _this.scale = 0.1+Math.random()*0.3;
                  _this.velocity = Math.random();
              }

              this.draw = function() {
                  if(_this.alpha <= 0) {
                      init();
                  }
       
                  _this.pos.x -=0.1;
                  _this.pos.y -= _this.velocity;
                  _this.alpha -= 0.0005;
                  ctx.beginPath();
                  ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                  ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                  ctx.fill();
              };
          }
      })();
    }})
;
(function() {


}).call(this);
(function() {


}).call(this);
/**
 * Defines a new instance of the rainyday.js.
 * @param options options element with script parameters
 * @param canvas to be used (if not defined a new one will be created)
 */


function RainyDay(options, canvas) {

    if (this === window) { //if *this* is the window object, start over with a *new* object
        return new RainyDay(options);
    }

    this.img = options.image;
    var defaults = {
        opacity: 1,
        blur: 10,
        crop: [0, 0, this.img.naturalWidth, this.img.naturalHeight],
        enableSizeChange: true,
        parentElement: document.getElementsByTagName('body')[0],
        fps: 30,
        fillStyle: '#8ED6FF',
        enableCollisions: true,
        gravityThreshold: 3,
        gravityAngle: Math.PI / 2,
        gravityAngleVariance: 0,
        reflectionScaledownFactor: 5,
        reflectionDropMappingWidth: 200,
        reflectionDropMappingHeight: 200,
        width: this.img.clientWidth,
        height: this.img.clientHeight,
        position: 'absolute',
        top: 0,
        left: 0
    };

    // add the defaults to options
    for (var option in defaults) {
        if (typeof options[option] === 'undefined') {
            options[option] = defaults[option];
        }
    }
    this.options = options;

    this.drops = [];

    // prepare canvas elements
    this.canvas = canvas || this.prepareCanvas();
    this.prepareBackground(this.canvas.width, this.canvas.height);
    this.prepareGlass();

    // assume defaults
    this.reflection = this.REFLECTION_MINIATURE;
    this.trail = this.TRAIL_DROPS;
    this.gravity = this.GRAVITY_NON_LINEAR;
    this.collision = this.COLLISION_SIMPLE;

    // set polyfill of requestAnimationFrame
    this.setRequestAnimFrame();
}

/**
 * Create the main canvas over a given element
 * @returns HTMLElement the canvas
 */
RainyDay.prototype.prepareCanvas = function() {
    var canvas = document.createElement('canvas');
    canvas.style.position = this.options.position;
    canvas.style.top = this.options.top;
    canvas.style.left = this.options.left;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    this.options.parentElement.appendChild(canvas);
    if (this.enableSizeChange) {
        this.setResizeHandler();
    }
    return canvas;
};

RainyDay.prototype.setResizeHandler = function() {
    // use setInterval if oneresize event already use by other.
    if (window.onresize !== null) {
        window.setInterval(this.checkSize.bind(this), 100);
    } else {
        window.onresize = this.checkSize.bind(this);
        window.onorientationchange = this.checkSize.bind(this);
    }
};

/**
 * Periodically check the size of the underlying element
 */
RainyDay.prototype.checkSize = function() {
    var clientWidth = this.img.clientWidth;
    var clientHeight = this.img.clientHeight;
    var clientOffsetLeft = this.img.offsetLeft;
    var clientOffsetTop = this.img.offsetTop;
    var canvasWidth = this.canvas.width;
    var canvasHeight = this.canvas.height;
    var canvasOffsetLeft = this.canvas.offsetLeft;
    var canvasOffsetTop = this.canvas.offsetTop;

    if (canvasWidth !== clientWidth || canvasHeight !== clientHeight) {
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.prepareBackground(this.canvas.width, this.canvas.height);
        this.glass.width = this.canvas.width;
        this.glass.height = this.canvas.height;
        this.prepareReflections();
    }
    if (canvasOffsetLeft !== clientOffsetLeft || canvasOffsetTop !== clientOffsetTop) {
        this.canvas.offsetLeft = clientOffsetLeft;
        this.canvas.offsetTop = clientOffsetTop;
    }
};

/**
 * Start animation loop
 */
RainyDay.prototype.animateDrops = function() {
    if (this.addDropCallback) {
        this.addDropCallback();
    }
    // |this.drops| array may be changed as we iterate over drops
    var dropsClone = this.drops.slice();
    var newDrops = [];
    for (var i = 0; i < dropsClone.length; ++i) {
        if (dropsClone[i].animate()) {
            newDrops.push(dropsClone[i]);
        }
    }
    this.drops = newDrops;
    window.requestAnimFrame(this.animateDrops.bind(this));
};

/**
 * Polyfill for requestAnimationFrame
 */
RainyDay.prototype.setRequestAnimFrame = function() {
    var fps = this.options.fps;
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / fps);
            };
    })();
};

/**
 * Create the helper canvas for rendering raindrop reflections.
 */
RainyDay.prototype.prepareReflections = function() {
    this.reflected = document.createElement('canvas');
    this.reflected.width = this.canvas.width / this.options.reflectionScaledownFactor;
    this.reflected.height = this.canvas.height / this.options.reflectionScaledownFactor;
    var ctx = this.reflected.getContext('2d');
    ctx.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.reflected.width, this.reflected.height);
};

/**
 * Create the glass canvas.
 */
RainyDay.prototype.prepareGlass = function() {
    this.glass = document.createElement('canvas');
    this.glass.width = this.canvas.width;
    this.glass.height = this.canvas.height;
    this.context = this.glass.getContext('2d');
};

/**
 * Main function for starting rain rendering.
 * @param presets list of presets to be applied
 * @param speed speed of the animation (if not provided or 0 static image will be generated)
 */
RainyDay.prototype.rain = function(presets, speed) {
    // prepare canvas for drop reflections
    if (this.reflection !== this.REFLECTION_NONE) {
        this.prepareReflections();
    }

    this.animateDrops();

    // animation
    this.presets = presets;

    this.PRIVATE_GRAVITY_FORCE_FACTOR_Y = (this.options.fps * 0.001) / 25;
    this.PRIVATE_GRAVITY_FORCE_FACTOR_X = ((Math.PI / 2) - this.options.gravityAngle) * (this.options.fps * 0.001) / 50;

    // prepare gravity matrix
    if (this.options.enableCollisions) {

        // calculate max radius of a drop to establish gravity matrix resolution
        var maxDropRadius = 0;
        for (var i = 0; i < presets.length; i++) {
            if (presets[i][0] + presets[i][1] > maxDropRadius) {
                maxDropRadius = Math.floor(presets[i][0] + presets[i][1]);
            }
        }

        if (maxDropRadius > 0) {
            // initialize the gravity matrix
            var mwi = Math.ceil(this.canvas.width / maxDropRadius);
            var mhi = Math.ceil(this.canvas.height / maxDropRadius);
            this.matrix = new CollisionMatrix(mwi, mhi, maxDropRadius);
        } else {
            this.options.enableCollisions = false;
        }
    }

    for (var i = 0; i < presets.length; i++) {
        if (!presets[i][3]) {
            presets[i][3] = -1;
        }
    }

    var lastExecutionTime = 0;
    this.addDropCallback = function() {
        var timestamp = new Date().getTime();
        if (timestamp - lastExecutionTime < speed) {
            return;
        }
        lastExecutionTime = timestamp;
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        // select matching preset
        var preset;
        for (var i = 0; i < presets.length; i++) {
            if (presets[i][2] > 1 || presets[i][3] === -1) {
                if (presets[i][3] !== 0) {
                    presets[i][3]--;
                    for (var y = 0; y < presets[i][2]; ++y) {
                        this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, presets[i][0], presets[i][1]));
                    }
                }
            } else if (Math.random() < presets[i][2]) {
                preset = presets[i];
                break;
            }
        }
        if (preset) {
            this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, preset[0], preset[1]));
        }
        context.save();
        context.globalAlpha = this.opacity;
        context.drawImage(this.glass, 0, 0, this.canvas.width, this.canvas.height);
        context.restore();
    }
        .bind(this);
};

/**
 * Adds a new raindrop to the animation.
 * @param drop drop object to be added to the animation
 */
RainyDay.prototype.putDrop = function(drop) {
    drop.draw();
    if (this.gravity && drop.r > this.options.gravityThreshold) {
        if (this.options.enableCollisions) {
            this.matrix.update(drop);
        }
        this.drops.push(drop);
    }
};

/**
 * Clear the drop and remove from the list if applicable.
 * @drop to be cleared
 * @force force removal from the list
 * result if true animation of this drop should be stopped
 */
RainyDay.prototype.clearDrop = function(drop, force) {
    var result = drop.clear(force);
    if (result) {
        var index = this.drops.indexOf(drop);
        if (index >= 0) {
            this.drops.splice(index, 1);
        }
    }
    return result;
};

/**
 * Defines a new raindrop object.
 * @param rainyday reference to the parent object
 * @param centerX x position of the center of this drop
 * @param centerY y position of the center of this drop
 * @param min minimum size of a drop
 * @param base base value for randomizing drop size
 */

function Drop(rainyday, centerX, centerY, min, base) {
    this.x = Math.floor(centerX);
    this.y = Math.floor(centerY);
    this.r = (Math.random() * base) + min;
    this.rainyday = rainyday;
    this.context = rainyday.context;
    this.reflection = rainyday.reflected;
}

/**
 * Draws a raindrop on canvas at the current position.
 */
Drop.prototype.draw = function() {
    this.context.save();
    this.context.beginPath();

    var orgR = this.r;
    this.r = 0.95 * this.r;
    if (this.r < 3) {
        this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.context.closePath();
    } else if (this.colliding || this.yspeed > 2) {
        if (this.colliding) {
            var collider = this.colliding;
            this.r = 1.001 * (this.r > collider.r ? this.r : collider.r);
            this.x += (collider.x - this.x);
            this.colliding = null;
        }

        var yr = 1 + 0.1 * this.yspeed;
        this.context.moveTo(this.x - this.r / yr, this.y);
        this.context.bezierCurveTo(this.x - this.r, this.y - this.r * 2, this.x + this.r, this.y - this.r * 2, this.x + this.r / yr, this.y);
        this.context.bezierCurveTo(this.x + this.r, this.y + yr * this.r, this.x - this.r, this.y + yr * this.r, this.x - this.r / yr, this.y);
    } else {
        this.context.arc(this.x, this.y, this.r * 0.9, 0, Math.PI * 2, true);
        this.context.closePath();
    }

    this.context.clip();

    this.r = orgR;

    if (this.rainyday.reflection) {
        this.rainyday.reflection(this);
    }

    this.context.restore();
};

/**
 * Clears the raindrop region.
 * @param force force stop
 * @returns Boolean true if the animation is stopped
 */
Drop.prototype.clear = function(force) {
    this.context.clearRect(this.x - this.r - 1, this.y - this.r - 2, 2 * this.r + 2, 2 * this.r + 2);
    if (force) {
        this.terminate = true;
        return true;
    }
    if ((this.y - this.r > this.rainyday.h) || (this.x - this.r > this.rainyday.w) || (this.x + this.r < 0)) {
        // over edge so stop this drop
        return true;
    }
    return false;
};

/**
 * Moves the raindrop to a new position according to the gravity.
 */
Drop.prototype.animate = function() {
    if (this.terminate) {
        return false;
    }
    var stopped = this.rainyday.gravity(this);
    if (!stopped && this.rainyday.trail) {
        this.rainyday.trail(this);
    }
    if (this.rainyday.options.enableCollisions) {
        var collisions = this.rainyday.matrix.update(this, stopped);
        if (collisions) {
            this.rainyday.collision(this, collisions);
        }
    }
    return !stopped || this.terminate;
};

/**
 * TRAIL function: no trail at all
 */
RainyDay.prototype.TRAIL_NONE = function() {
    // nothing going on here
};

/**
 * TRAIL function: trail of small drops (default)
 * @param drop raindrop object
 */
RainyDay.prototype.TRAIL_DROPS = function(drop) {
    if (!drop.trailY || drop.y - drop.trailY >= Math.random() * 100 * drop.r) {
        drop.trailY = drop.y;
        this.putDrop(new Drop(this, drop.x + (Math.random() * 2 - 1) * Math.random(), drop.y - drop.r - 5, Math.ceil(drop.r / 5), 0));
    }
};

/**
 * TRAIL function: trail of unblurred image
 * @param drop raindrop object
 */
RainyDay.prototype.TRAIL_SMUDGE = function(drop) {
    var y = drop.y - drop.r - 3;
    var x = drop.x - drop.r / 2 + (Math.random() * 2);
    if (y < 0 || x < 0) {
        return;
    }
    this.context.drawImage(this.clearbackground, x, y, drop.r, 2, x, y, drop.r, 2);
};

/**
 * GRAVITY function: no gravity at all
 * @returns Boolean true if the animation is stopped
 */
RainyDay.prototype.GRAVITY_NONE = function() {
    return true;
};

/**
 * GRAVITY function: linear gravity
 * @param drop raindrop object
 * @returns Boolean true if the animation is stopped
 */
RainyDay.prototype.GRAVITY_LINEAR = function(drop) {
    if (this.clearDrop(drop)) {
        return true;
    }

    if (drop.yspeed) {
        drop.yspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(drop.r);
        drop.xspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(drop.r);
    } else {
        drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y;
        drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X;
    }

    drop.y += drop.yspeed;
    drop.draw();
    return false;
};

/**
 * GRAVITY function: non-linear gravity (default)
 * @param drop raindrop object
 * @returns Boolean true if the animation is stopped
 */
RainyDay.prototype.GRAVITY_NON_LINEAR = function(drop) {
    if (this.clearDrop(drop)) {
        return true;
    }

    if (drop.collided) {
        drop.collided = false;
        drop.seed = Math.floor(drop.r * Math.random() * this.options.fps);
        drop.skipping = false;
        drop.slowing = false;
    } else if (!drop.seed || drop.seed < 0) {
        drop.seed = Math.floor(drop.r * Math.random() * this.options.fps);
        drop.skipping = drop.skipping === false ? true : false;
        drop.slowing = true;
    }

    drop.seed--;

    if (drop.yspeed) {
        if (drop.slowing) {
            drop.yspeed /= 1.1;
            drop.xspeed /= 1.1;
            if (drop.yspeed < this.PRIVATE_GRAVITY_FORCE_FACTOR_Y) {
                drop.slowing = false;
            }

        } else if (drop.skipping) {
            drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y;
            drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X;
        } else {
            drop.yspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(drop.r);
            drop.xspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(drop.r);
        }
    } else {
        drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y;
        drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X;
    }

    if (this.options.gravityAngleVariance !== 0) {
        drop.xspeed += ((Math.random() * 2 - 1) * drop.yspeed * this.options.gravityAngleVariance);
    }

    drop.y += drop.yspeed;
    drop.x += drop.xspeed;

    drop.draw();
    return false;
};

/**
 * Utility function to return positive min value
 * @param val1 first number
 * @param val2 second number
 */
RainyDay.prototype.positiveMin = function(val1, val2) {
    var result = 0;
    if (val1 < val2) {
        if (val1 <= 0) {
            result = val2;
        } else {
            result = val1;
        }
    } else {
        if (val2 <= 0) {
            result = val1;
        } else {
            result = val2;
        }
    }
    return result <= 0 ? 1 : result;
};

/**
 * REFLECTION function: no reflection at all
 */
RainyDay.prototype.REFLECTION_NONE = function() {
    this.context.fillStyle = this.options.fillStyle;
    this.context.fill();
};

/**
 * REFLECTION function: miniature reflection (default)
 * @param drop raindrop object
 */
RainyDay.prototype.REFLECTION_MINIATURE = function(drop) {
    var sx = Math.max((drop.x - this.options.reflectionDropMappingWidth) / this.options.reflectionScaledownFactor, 0);
    var sy = Math.max((drop.y - this.options.reflectionDropMappingHeight) / this.options.reflectionScaledownFactor, 0);
    var sw = this.positiveMin(this.options.reflectionDropMappingWidth * 2 / this.options.reflectionScaledownFactor, this.reflected.width - sx);
    var sh = this.positiveMin(this.options.reflectionDropMappingHeight * 2 / this.options.reflectionScaledownFactor, this.reflected.height - sy);
    var dx = Math.max(drop.x - 1.1 * drop.r, 0);
    var dy = Math.max(drop.y - 1.1 * drop.r, 0);
    this.context.drawImage(this.reflected, sx, sy, sw, sh, dx, dy, drop.r * 2, drop.r * 2);
};

/**
 * COLLISION function: default collision implementation
 * @param drop one of the drops colliding
 * @param collisions list of potential collisions
 */
RainyDay.prototype.COLLISION_SIMPLE = function(drop, collisions) {
    var item = collisions;
    var drop2;
    while (item != null) {
        var p = item.drop;
        if (Math.sqrt(Math.pow(drop.x - p.x, 2) + Math.pow(drop.y - p.y, 2)) < (drop.r + p.r)) {
            drop2 = p;
            break;
        }
        item = item.next;
    }

    if (!drop2) {
        return;
    }

    // rename so that we're dealing with low/high drops
    var higher,
        lower;
    if (drop.y > drop2.y) {
        higher = drop;
        lower = drop2;
    } else {
        higher = drop2;
        lower = drop;
    }

    this.clearDrop(lower);
    // force stopping the second drop
    this.clearDrop(higher, true);
    this.matrix.remove(higher);
    lower.draw();

    lower.colliding = higher;
    lower.collided = true;
};

/**
 * Resizes canvas, draws original image and applies blurring algorithm.
 */
RainyDay.prototype.prepareBackground = function() {
    this.background = document.createElement('canvas');
    this.background.width = this.canvas.width;
    this.background.height = this.canvas.height;

    this.clearbackground = document.createElement('canvas');
    this.clearbackground.width = this.canvas.width;
    this.clearbackground.height = this.canvas.height;

    var context = this.background.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height);

    context = this.clearbackground.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height);

    if (!isNaN(this.options.blur) && this.options.blur >= 1) {
        this.stackBlurCanvasRGB(this.canvas.width, this.canvas.height, this.options.blur);
    }
};

/**
 * Implements the Stack Blur Algorithm (@see http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html).
 * @param width width of the canvas
 * @param height height of the canvas
 * @param radius blur radius
 */
RainyDay.prototype.stackBlurCanvasRGB = function(width, height, radius) {

    var shgTable = [
        [0, 9],
        [1, 11],
        [2, 12],
        [3, 13],
        [5, 14],
        [7, 15],
        [11, 16],
        [15, 17],
        [22, 18],
        [31, 19],
        [45, 20],
        [63, 21],
        [90, 22],
        [127, 23],
        [181, 24]
    ];

    var mulTable = [
        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
    ];

    radius |= 0;

    var context = this.background.getContext('2d');
    var imageData = context.getImageData(0, 0, width, height);
    var pixels = imageData.data;
    var x,
        y,
        i,
        p,
        yp,
        yi,
        yw,
        rSum,
        gSum,
        bSum,
        rOutSum,
        gOutSum,
        bOutSum,
        rInSum,
        gInSum,
        bInSum,
        pr,
        pg,
        pb,
        rbs;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stackEnd = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < 2 * radius + 1; i++) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
            stackEnd = stack;
        }
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mulSum = mulTable[radius];
    var shgSum;
    for (var ssi = 0; ssi < shgTable.length; ++ssi) {
        if (radius <= shgTable[ssi][0]) {
            shgSum = shgTable[ssi - 1][1];
            break;
        }
    }

    for (y = 0; y < height; y++) {
        rInSum = gInSum = bInSum = rSum = gSum = bSum = 0;

        rOutSum = radiusPlus1 * (pr = pixels[yi]);
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);

        rSum += sumFactor * pr;
        gSum += sumFactor * pg;
        bSum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((width - 1 < i ? width - 1 : i) << 2);
            rSum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            gSum += (stack.g = (pg = pixels[p + 1])) * rbs;
            bSum += (stack.b = (pb = pixels[p + 2])) * rbs;

            rInSum += pr;
            gInSum += pg;
            bInSum += pb;

            stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
            pixels[yi] = (rSum * mulSum) >> shgSum;
            pixels[yi + 1] = (gSum * mulSum) >> shgSum;
            pixels[yi + 2] = (bSum * mulSum) >> shgSum;

            rSum -= rOutSum;
            gSum -= gOutSum;
            bSum -= bOutSum;

            rOutSum -= stackIn.r;
            gOutSum -= stackIn.g;
            bOutSum -= stackIn.b;

            p = (yw + ((p = x + radius + 1) < (width - 1) ? p : (width - 1))) << 2;

            rInSum += (stackIn.r = pixels[p]);
            gInSum += (stackIn.g = pixels[p + 1]);
            bInSum += (stackIn.b = pixels[p + 2]);

            rSum += rInSum;
            gSum += gInSum;
            bSum += bInSum;

            stackIn = stackIn.next;

            rOutSum += (pr = stackOut.r);
            gOutSum += (pg = stackOut.g);
            bOutSum += (pb = stackOut.b);

            rInSum -= pr;
            gInSum -= pg;
            bInSum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }

    for (x = 0; x < width; x++) {
        gInSum = bInSum = rInSum = gSum = bSum = rSum = 0;

        yi = x << 2;
        rOutSum = radiusPlus1 * (pr = pixels[yi]);
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);

        rSum += sumFactor * pr;
        gSum += sumFactor * pg;
        bSum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i < radiusPlus1; i++) {
            yi = (yp + x) << 2;

            rSum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            gSum += (stack.g = (pg = pixels[yi + 1])) * rbs;
            bSum += (stack.b = (pb = pixels[yi + 2])) * rbs;

            rInSum += pr;
            gInSum += pg;
            bInSum += pb;

            stack = stack.next;

            if (i < (height - 1)) {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
            p = yi << 2;
            pixels[p] = (rSum * mulSum) >> shgSum;
            pixels[p + 1] = (gSum * mulSum) >> shgSum;
            pixels[p + 2] = (bSum * mulSum) >> shgSum;

            rSum -= rOutSum;
            gSum -= gOutSum;
            bSum -= bOutSum;

            rOutSum -= stackIn.r;
            gOutSum -= stackIn.g;
            bOutSum -= stackIn.b;

            p = (x + (((p = y + radiusPlus1) < (height - 1) ? p : (height - 1)) * width)) << 2;

            rSum += (rInSum += (stackIn.r = pixels[p]));
            gSum += (gInSum += (stackIn.g = pixels[p + 1]));
            bSum += (bInSum += (stackIn.b = pixels[p + 2]));

            stackIn = stackIn.next;

            rOutSum += (pr = stackOut.r);
            gOutSum += (pg = stackOut.g);
            bOutSum += (pb = stackOut.b);

            rInSum -= pr;
            gInSum -= pg;
            bInSum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    context.putImageData(imageData, 0, 0);

};

/**
 * Defines a new helper object for Stack Blur Algorithm.
 */
function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.next = null;
}

/**
 * Defines a gravity matrix object which handles collision detection.
 * @param x number of columns in the matrix
 * @param y number of rows in the matrix
 * @param r grid size
 */
function CollisionMatrix(x, y, r) {
    this.resolution = r;
    this.xc = x;
    this.yc = y;
    this.matrix = new Array(x);
    for (var i = 0; i <= (x + 5); i++) {
        this.matrix[i] = new Array(y);
        for (var j = 0; j <= (y + 5); ++j) {
            this.matrix[i][j] = new DropItem(null);
        }
    }
}

/**
 * Updates position of the given drop on the collision matrix.
 * @param drop raindrop to be positioned/repositioned
 * @param forceDelete if true the raindrop will be removed from the matrix
 * @returns collisions if any
 */
CollisionMatrix.prototype.update = function(drop, forceDelete) {
    if (drop.gid) {
        if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
            return null;
        }
        this.matrix[drop.gmx][drop.gmy].remove(drop);
        if (forceDelete) {
            return null;
        }

        drop.gmx = Math.floor(drop.x / this.resolution);
        drop.gmy = Math.floor(drop.y / this.resolution);
        if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
            return null;
        }
        this.matrix[drop.gmx][drop.gmy].add(drop);

        var collisions = this.collisions(drop);
        if (collisions && collisions.next != null) {
            return collisions.next;
        }
    } else {
        drop.gid = Math.random().toString(36).substr(2, 9);
        drop.gmx = Math.floor(drop.x / this.resolution);
        drop.gmy = Math.floor(drop.y / this.resolution);
        if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
            return null;
        }

        this.matrix[drop.gmx][drop.gmy].add(drop);
    }
    return null;
};

/**
 * Looks for collisions with the given raindrop.
 * @param drop raindrop to be checked
 * @returns DropItem list of drops that collide with it
 */
CollisionMatrix.prototype.collisions = function(drop) {
    var item = new DropItem(null);
    var first = item;

    item = this.addAll(item, drop.gmx - 1, drop.gmy + 1);
    item = this.addAll(item, drop.gmx, drop.gmy + 1);
    item = this.addAll(item, drop.gmx + 1, drop.gmy + 1);

    return first;
};

/**
 * Appends all found drop at a given location to the given item.
 * @param to item to which the results will be appended to
 * @param x x position in the matrix
 * @param y y position in the matrix
 * @returns last discovered item on the list
 */
CollisionMatrix.prototype.addAll = function(to, x, y) {
    if (x > 0 && y > 0 && x < this.xc && y < this.yc) {
        var items = this.matrix[x][y];
        while (items.next != null) {
            items = items.next;
            to.next = new DropItem(items.drop);
            to = to.next;
        }
    }
    return to;
};

/**
 * Removed the drop from its current position
 * @param drop to be removed
 */
CollisionMatrix.prototype.remove = function(drop) {
    this.matrix[drop.gmx][drop.gmy].remove(drop);
};

/**
 * Defines a linked list item.
 */
function DropItem(drop) {
    this.drop = drop;
    this.next = null;
}

/**
 * Adds the raindrop to the end of the list.
 * @param drop raindrop to be added
 */
DropItem.prototype.add = function(drop) {
    var item = this;
    while (item.next != null) {
        item = item.next;
    }
    item.next = new DropItem(drop);
};

/**
 * Removes the raindrop from the list.
 * @param drop raindrop to be removed
 */
DropItem.prototype.remove = function(drop) {
    var item = this;
    var prevItem = null;
    while (item.next != null) {
        prevItem = item;
        item = item.next;
        if (item.drop.gid === drop.gid) {
            prevItem.next = item.next;
        }
    }
};
 /*
 * # Semantic UI
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

!function(e,t,n,i){"use strict";e.fn.accordion=function(n){{var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var d,m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),g=f.className,p=f.namespace,v=f.selector,b=(f.error,"."+p),h="module-"+p,y=a.selector||"",x=e(this),w=x.find(v.title),C=x.find(v.content),T=this,k=x.data(h);m={initialize:function(){m.debug("Initializing accordion with bound events",x),x.on("click"+b,v.title,m.event.click),m.observeChanges(),m.instantiate()},instantiate:function(){k=m,x.data(h,m)},destroy:function(){m.debug("Destroying previous accordion for",x),x.removeData(h),w.off(b)},refresh:function(){w=x.find(v.title),C=x.find(v.content)},observeChanges:function(){"MutationObserver"in t&&(d=new MutationObserver(function(){m.debug("DOM tree modified, updating selector cache"),m.refresh()}),d.observe(T,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",d))},event:{click:function(){e.proxy(m.toggle,this)()}},toggle:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t):e(this),o=n.next(C),a=o.is(":visible");m.debug("Toggling visibility of content",n),a?f.collapsible?e.proxy(m.close,n)():m.debug("Cannot close accordion content collapsing is disabled"):e.proxy(m.open,n)()},open:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t):e(this),o=n.next(C),a=o.is(":animated"),r=o.hasClass(g.active);a||r||(m.debug("Opening accordion content",n),f.exclusive&&e.proxy(m.closeOthers,n)(),n.addClass(g.active),o.stop().children().stop().animate({opacity:1},f.duration,m.reset.display).end().slideDown(f.duration,f.easing,function(){o.addClass(g.active),e.proxy(m.reset.display,this)(),e.proxy(f.onOpen,this)(),e.proxy(f.onChange,this)()}))},close:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t):e(this),o=n.next(C),a=o.hasClass(g.active);a&&(m.debug("Closing accordion content",o),n.removeClass(g.active),o.removeClass(g.active).show().stop().children().stop().animate({opacity:0},f.duration,m.reset.opacity).end().slideUp(f.duration,f.easing,function(){e.proxy(m.reset.display,this)(),e.proxy(f.onClose,this)(),e.proxy(f.onChange,this)()}))},closeOthers:function(t){var n,o,a,r=t!==i?w.eq(t):e(this),s=r.parents(v.content).prev(v.title),c=r.closest(v.accordion),l=v.title+"."+g.active+":visible",u=v.content+"."+g.active+":visible";f.closeNested?(n=c.find(l).not(s),a=n.next(C)):(n=c.find(l).not(s),o=c.find(u).find(l).not(s),n=n.not(o),a=n.next(C)),n.size()>0&&(m.debug("Exclusive enabled, closing other content",n),n.removeClass(g.active),a.stop().children().stop().animate({opacity:0},f.duration,m.resetOpacity).end().slideUp(f.duration,f.easing,function(){e(this).removeClass(g.active),e.proxy(m.reset.display,this)()}))},reset:{display:function(){m.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){m.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){return m.debug("Changing internal",t,n),n===i?m[t]:void(e.isPlainObject(t)?e.extend(!0,m,t):m[t]=n)},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",y&&(t+=" '"+y+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=k;return n=n||u,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},l?(k===i&&m.initialize(),m.invoke(c)):(k!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",debug:!1,verbose:!0,performance:!0,exclusive:!0,collapsible:!0,closeNested:!1,duration:500,easing:"easeInOutQuint",onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active"},selector:{accordion:".accordion",title:".title",content:".content"}},e.extend(e.easing,{easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n}})}(jQuery,window,document),function(e,t,n,i){e.api=e.fn.api=function(n){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var t,a,m,f,g,p=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),v=p.namespace,b=(p.metadata,p.selector),h=p.error,y=p.className,x="."+v,w="module-"+v,C=e(this),T=C.closest(b.form),k=p.stateContext?e(p.stateContext):C,S=this,A=k.get(),z=C.data(w);g={initialize:function(){var e=g.get.event();u||(e?(g.debug("Attaching API events to element",e),C.on(e+x,g.event.trigger)):g.query()),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),z=g,C.data(w,z)},destroy:function(){g.verbose("Destroying previous module for",S),C.removeData(w).off(x)},query:function(){if(g.is.disabled())return void g.debug("Element is disabled API request aborted");if(g.is.loading()&&0===p.throttle)return void g.debug("Cancelling request, previous request is still pending");if(p.defaultData&&e.extend(!0,p.urlData,g.get.defaultData()),(p.serializeForm!==!1||k.is("form"))&&("json"==p.serializeForm?e.extend(!0,p.data,g.get.formData()):p.data=g.get.formData()),a=g.get.settings(),a===!1)return void g.error(h.beforeSend);if(p.url?(g.debug("Using specified url",m),m=g.add.urlData(p.url)):(m=g.add.urlData(g.get.templateURL()),g.debug("Added URL Data to url",m)),!m){if(!C.is("form"))return void g.error(h.missingURL,p.action);g.debug("No url or action specified, defaulting to form action"),m=C.attr("action")}g.set.loading(),t=e.extend(!0,{},p,{type:p.method||p.type,data:f,url:p.base+m,beforeSend:p.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),g.verbose("Creating AJAX request with settings",t),g.is.loading()?g.timer=setTimeout(function(){g.request=g.create.request(),g.xhr=g.create.xhr()},p.throttle):(g.request=g.create.request(),g.xhr=g.create.xhr())},is:{disabled:function(){return C.filter(p.filter).size()>0},loading:function(){return g.request&&"pending"==g.request.state()}},was:{succesful:function(){return g.request&&"resolved"==g.request.state()},failure:function(){return g.request&&"rejected"==g.request.state()},complete:function(){return g.request&&("resolved"==g.request.state()||"rejected"==g.request.state())}},add:{urlData:function(t,n){var o,a;return t&&(o=t.match(p.regExp.required),a=t.match(p.regExp.optional),n=n||p.urlData,o&&(g.debug("Looking for required URL variables",o),e.each(o,function(o,a){var r=-1!==a.indexOf("$")?a.substr(2,a.length-3):a.substr(1,a.length-2),s=e.isPlainObject(n)&&n[r]!==i?n[r]:C.data(r)!==i?C.data(r):k.data(r)!==i?k.data(r):n[r];return s===i?(g.error(h.requiredParameter,r,t),t=!1,!1):(g.verbose("Found required variable",r,s),void(t=t.replace(a,s)))})),a&&(g.debug("Looking for optional URL variables",o),e.each(a,function(o,a){var r=-1!==a.indexOf("$")?a.substr(3,a.length-4):a.substr(2,a.length-3),s=e.isPlainObject(n)&&n[r]!==i?n[r]:C.data(r)!==i?C.data(r):k.data(r)!==i?k.data(r):n[r];s!==i?(g.verbose("Optional variable Found",r,s),t=t.replace(a,s)):(g.verbose("Optional variable not found",r),t=-1!==t.indexOf("/"+a)?t.replace("/"+a,""):t.replace(a,""))}))),t}},event:{trigger:function(e){g.query(),("submit"==e.type||"click"==e.type)&&e.preventDefault()},xhr:{always:function(){},done:function(e){var t=this,n=(new Date).getTime()-s,i=p.loadingDuration-n;i=i>0?i:0,setTimeout(function(){g.request.resolveWith(t,[e])},i)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-s,a=p.loadingDuration-o;a=a>0?a:0,setTimeout(function(){"abort"!==t?g.request.rejectWith(i,[e,t,n]):g.reset()},a)}},request:{complete:function(t){g.remove.loading(),e.proxy(p.onComplete,A)(t,C)},done:function(t){g.debug("API Response Received",t),"json"==p.dataType&&e.isFunction(p.successTest)?(g.debug("Checking JSON returned success",p.successTest,t),p.successTest(t)?e.proxy(p.onSuccess,A)(t,C):(g.debug("JSON test specified by user and response failed",t),e.proxy(p.onFailure,A)(t,C))):e.proxy(p.onSuccess,A)(t,C)},error:function(t,n,o){var a,r=p.error[n]!==i?p.error[n]:o;if(t!==i)if(t.readyState!==i&&4==t.readyState){if(200!=t.status&&o!==i&&""!==o)g.error(h.statusMessage+o);else if("error"==n&&"json"==p.dataType)try{a=e.parseJSON(t.responseText),a&&a.error!==i&&(r=a.error)}catch(s){g.error(h.JSONParse)}g.remove.loading(),g.set.error(),p.errorDuration&&setTimeout(g.remove.error,p.errorDuration),g.debug("API Request error:",r),e.proxy(p.onError,A)(r,A)}else e.proxy(p.onAbort,A)(r,A),g.debug("Request Aborted (Most likely caused by page change or CORS Policy)",n,o)}}},create:{request:function(){return e.Deferred().always(g.event.request.complete).done(g.event.request.done).fail(g.event.request.error)},xhr:function(){e.ajax(t).always(g.event.xhr.always).done(g.event.xhr.done).fail(g.event.xhr.fail)}},set:{error:function(){g.verbose("Adding error state to element",k),k.addClass(y.error)},loading:function(){g.verbose("Adding loading state to element",k),k.addClass(y.loading)}},remove:{error:function(){g.verbose("Removing error state from element",k),k.removeClass(y.error)},loading:function(){g.verbose("Removing loading state from element",k),k.removeClass(y.loading)}},get:{request:function(){return g.request||!1},xhr:function(){return g.xhr||!1},settings:function(){var t;return t=e.proxy(p.beforeSend,C)(p),t&&(t.success!==i&&(g.debug("Legacy success callback detected",t),g.error(h.legacyParameters,t.success),t.onSuccess=t.success),t.failure!==i&&(g.debug("Legacy failure callback detected",t),g.error(h.legacyParameters,t.failure),t.onFailure=t.failure),t.complete!==i&&(g.debug("Legacy complete callback detected",t),g.error(h.legacyParameters,t.complete),t.onComplete=t.complete)),t===i&&g.error(h.noReturnedValue),t!==i?t:p},defaultData:function(){var t={};return e.isWindow(S)||(C.is("input")?t.value=C.val():C.is("form")||(t.text=C.text())),t},event:function(){return e.isWindow(S)||"now"==p.on?(g.debug("API called without element, no events attached"),!1):"auto"==p.on?C.is("input")?S.oninput!==i?"input":S.onpropertychange!==i?"propertychange":"keyup":C.is("form")?"submit":"click":p.on},formData:function(){var t;return e(this).serializeObject()!==i?t=T.serializeObject():(g.error(h.missingSerialize),t=T.serialize()),g.debug("Retrieved form data",t),t},templateURL:function(e){var t;return e=e||C.data(p.metadata.action)||p.action||!1,e&&(g.debug("Looking up url for action",e,p.api),p.api[e]!==i?(t=p.api[e],g.debug("Found template url",t)):g.error(h.missingAction,p.action,p.api)),t}},reset:function(){g.remove.error(),g.remove.loading()},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=z;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(g.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(z===i&&g.initialize(),g.invoke(l)):(z!==i&&g.destroy(),g.initialize())}),o!==i?o:this},e.api.settings={name:"API",namespace:"api",debug:!1,verbose:!0,performance:!0,on:"auto",filter:".disabled",stateContext:!1,loadingDuration:0,errorDuration:2e3,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,method:"get",data:{},dataType:"json",beforeSend:function(e){return e},beforeXHR:function(){},onSuccess:function(){},onComplete:function(){},onFailure:function(){},onError:function(){},onAbort:function(){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",missingAction:"API action used but no url was defined",missingSerialize:"Required dependency jquery-serialize-object missing, using basic serialize",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{form:"form"},metadata:{action:"action",request:"request",xhr:"xhr"}},e.api.settings.api={}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.chatroom=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return e(this).each(function(){var n,o,d,m,f,g,p,v=e.extend(!0,{},e.fn.chatroom.settings,t),b=v.className,h=v.namespace,y=v.selector,x=v.error,w=e(this),C=w.find(y.expandButton),T=w.find(y.userListButton),k=w.find(y.userList),S=(w.find(y.room),w.find(y.userCount)),A=w.find(y.log),z=(w.find(y.message),w.find(y.messageInput)),P=w.find(y.messageButton),E=w.data("module"),F=this,O="",D={};p={width:{log:A.width(),userList:k.outerWidth()},initialize:function(){return Pusher===i&&p.error(x.pusher),v.key===i||v.channelName===i?(p.error(x.key),!1):v.endpoint.message||v.endpoint.authentication?(g=new Pusher(v.key),Pusher.channel_auth_endpoint=v.endpoint.authentication,n=g.subscribe(v.channelName),n.bind("pusher:subscription_succeeded",p.user.list.create),n.bind("pusher:subscription_error",p.error),n.bind("pusher:member_added",p.user.joined),n.bind("pusher:member_removed",p.user.left),n.bind("update_messages",p.message.receive),e.each(v.customEvents,function(e,t){n.bind(e,t)}),T.on("click."+h,p.event.toggleUserList),C.on("click."+h,p.event.toggleExpand),z.on("keydown."+h,p.event.input.keydown).on("keyup."+h,p.event.input.keyup),P.on("mouseenter."+h,p.event.hover).on("mouseleave."+h,p.event.hover).on("click."+h,p.event.submit),A.animate({scrollTop:A.prop("scrollHeight")},400),void w.data("module",p).addClass(b.loading)):(p.error(x.endpoint),!1)},refresh:function(){T.removeClass(b.active),p.width={log:A.width(),userList:k.outerWidth()},T.hasClass(b.active)&&p.user.list.hide(),w.data("module",p)},user:{updateCount:function(){v.userCount&&(D=w.data("users"),m=0,e.each(D,function(){m++}),S.html(v.templates.userCount(m)))},joined:function(t){D=w.data("users"),"anonymous"!=t.id&&D[t.id]===i&&(D[t.id]=t.info,v.randomColor&&t.info.color===i&&(t.info.color=v.templates.color(t.id)),O=v.templates.userList(t.info),t.info.isAdmin?e(O).prependTo(k):e(O).appendTo(k),v.partingMessages&&(A.append(v.templates.joined(t.info)),p.message.scroll.test()),p.user.updateCount())},left:function(e){D=w.data("users"),e!==i&&"anonymous"!==e.id&&(delete D[e.id],w.data("users",D),k.find("[data-id="+e.id+"]").remove(),v.partingMessages&&(A.append(v.templates.left(e.info)),p.message.scroll.test()),p.user.updateCount())},list:{create:function(t){D={},t.each(function(e){"anonymous"!==e.id&&"undefined"!==e.id&&(v.randomColor&&e.info.color===i&&(e.info.color=v.templates.color(e.id)),O=e.info.isAdmin?v.templates.userList(e.info)+O:O+v.templates.userList(e.info),D[e.id]=e.info)}),w.data("users",D).data("user",D[t.me.id]).removeClass(b.loading),k.html(O),p.user.updateCount(),e.proxy(v.onJoin,k.children())()},show:function(){A.animate({width:p.width.log-p.width.userList},{duration:v.speed,easing:v.easing,complete:p.message.scroll.move})},hide:function(){A.stop().animate({width:p.width.log},{duration:v.speed,easing:v.easing,complete:p.message.scroll.move})}}},message:{scroll:{test:function(){f=A.prop("scrollHeight")-A.height(),Math.abs(A.scrollTop()-f)<v.scrollArea&&p.message.scroll.move()},move:function(){f=A.prop("scrollHeight")-A.height(),A.scrollTop(f)}},send:function(t){p.utils.emptyString(t)||e.api({url:v.endpoint.message,method:"POST",data:{message:{content:t,timestamp:(new Date).getTime()}}})},receive:function(e){d=e.data,D=w.data("users"),o=w.data("user"),D[d.userID]!==i&&(o===i||o.id!=d.userID)&&(d.user=D[d.userID],p.message.display(d))},display:function(t){A.append(v.templates.message(t)),p.message.scroll.test(),e.proxy(v.onMessage,A.children().last())()}},expand:function(){w.addClass(b.expand),e.proxy(v.onExpand,w)(),p.refresh()},contract:function(){w.removeClass(b.expand),e.proxy(v.onContract,w)(),p.refresh()},event:{input:{keydown:function(e){13==e.which&&P.addClass(b.down)},keyup:function(e){13==e.which&&(P.removeClass(b.down),p.event.submit())}},submit:function(){var e=z.val(),t=w.data("user");t===i||p.utils.emptyString(e)||(p.message.send(e),p.message.display({user:t,text:e}),p.message.scroll.move(),z.val(""))},toggleExpand:function(){w.hasClass(b.expand)?(C.removeClass(b.active),p.contract()):(C.addClass(b.active),p.expand())},toggleUserList:function(){A.is(":animated")||(T.hasClass(b.active)?(T.removeClass("active"),p.user.list.hide()):(T.addClass(b.active),p.user.list.show()))}},utils:{emptyString:function(e){return"string"==typeof e?-1==e.search(/\S/):!1}},setting:function(t,n){return n===i?v[t]:void(e.isPlainObject(t)?e.extend(!0,v,t):v[t]=n)},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},debug:function(){v.debug&&(v.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,v.name+":"),p.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),p.verbose.apply(console,arguments)))},error:function(){p.error=Function.prototype.bind.call(console.error,console,v.name+":"),p.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Element:F,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,100)},display:function(){var t=v.name+":",n=0;r=!1,clearTimeout(p.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r;return n=n||u,o=F||o,"string"==typeof t&&E!==i&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,o){e.isPlainObject(E[o])&&n!=a?E=E[o]:E[o]!==i?r=E[o]:p.error(x.method,t)})),e.isFunction(r)?r.apply(o,n):r||!1}},l?(E===i&&p.initialize(),p.invoke(c)):(E!==i&&p.destroy(),p.initialize())}),n!==i?n:this},e.fn.chatroom.settings={name:"Chat",namespace:"chat",debug:!1,channel:"present-chat",onJoin:function(){},onMessage:function(){},onExpand:function(){},onContract:function(){},customEvents:{},partingMessages:!1,userCount:!0,randomColor:!0,speed:300,easing:"easeOutQuint",scrollArea:9999,endpoint:{message:!1,authentication:!1},error:{method:"The method you called is not defined",endpoint:"Please define a message and authentication endpoint.",key:"You must specify a pusher key and channel.",pusher:"You must include the Pusher library."},className:{expand:"expand",active:"active",hover:"hover",down:"down",loading:"loading"},selector:{userCount:".actions .message",userListButton:".actions .list.button",expandButton:".actions .expand.button",room:".room",userList:".room .list",log:".room .log",message:".room .log .message",author:".room log .message .author",messageInput:".talk input",messageButton:".talk .send.button"},templates:{userCount:function(e){return e+" users in chat"},color:function(){var e=["#000000","#333333","#666666","#999999","#CC9999","#CC6666","#CC3333","#993333","#663333","#CC6633","#CC9966","#CC9933","#999966","#CCCC66","#99CC66","#669933","#669966","#33A3CC","#336633","#33CCCC","#339999","#336666","#336699","#6666CC","#9966CC","#333399","#663366","#996699","#993366","#CC6699"];return e[Math.floor(Math.random()*e.length)]},message:function(e){var t="";return e.user.isAdmin?(e.user.color="#55356A",t+='<div class="admin message">',t+='<span class="quirky ui flag team"></span>'):t+='<div class="message">',t+="<p>",t+=e.user.color!==i?'<span class="author" style="color: '+e.user.color+';">'+e.user.name+"</span>: ":'<span class="author">'+e.user.name+"</span>: ",t+=""+e.text+" </p></div>"},joined:function(e){return typeof e.name!==i?'<div class="status">'+e.name+" has joined the chat.</div>":!1},left:function(e){return typeof e.name!==i?'<div class="status">'+e.name+" has left the chat.</div>":!1},userList:function(e){var t="";return e.isAdmin&&(e.color="#55356A"),t+='<div class="user" data-id="'+e.id+'"> <div class="image">   <img src="'+e.avatarURL+'"> </div>',t+=e.color!==i?' <p><a href="/users/'+e.id+'" target="_blank" style="color: '+e.color+';">'+e.name+"</a></p>":' <p><a href="/users/'+e.id+'" target="_blank">'+e.name+"</a></p>",t+="</div>"}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.checkbox=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f=e.extend(!0,{},e.fn.checkbox.settings,n),g=f.className,p=f.namespace,v=f.selector,b=f.error,h="."+p,y="module-"+p,x=e(this),w=e(this).next(v.label).first(),C=e(this).find(v.input),T=x.data(y),k=this;m={initialize:function(){m.verbose("Initializing checkbox",f),x.on("click"+h,m.toggle).on("keydown"+h,v.input,m.event.keydown),m.is.checked()?(m.set.checked(),f.fireOnInit&&e.proxy(f.onChecked,C.get())()):(m.remove.checked(),f.fireOnInit&&e.proxy(f.onUnchecked,C.get())()),m.observeChanges(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),T=m,x.data(y,m)},destroy:function(){m.verbose("Destroying previous module"),x.off(h).removeData(y),C.off(h,m.event.keydown),w.off(h)},refresh:function(){x=e(this),w=e(this).next(v.label).first(),C=e(this).find(v.input)},observeChanges:function(){"MutationObserver"in t&&(a=new MutationObserver(function(){m.debug("DOM tree modified, updating selector cache"),m.refresh()}),a.observe(k,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",a))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(m[n])?m[n]:m.toggle,i.size()>0?(m.debug("Attaching checkbox events to element",t,n),i.on("click"+h,n)):m.error(b.notFound)},event:{keydown:function(t){var n=t.which,i={enter:13,escape:27};n==i.escape&&(m.verbose("Escape key pressed blurring field"),x.blur()),t.ctrlKey||n!=i.enter||(m.verbose("Enter key pressed, toggling checkbox"),e.proxy(m.toggle,this)(),t.preventDefault())}},is:{radio:function(){return x.hasClass(g.radio)},checked:function(){return C.prop("checked")!==i&&C.prop("checked")},unchecked:function(){return!m.is.checked()}},can:{change:function(){return!(x.hasClass(g.disabled)||x.hasClass(g.readOnly)||C.prop("disabled"))},uncheck:function(){return"boolean"==typeof f.uncheckable?f.uncheckable:!m.is.radio()}},set:{checked:function(){x.addClass(g.checked)},tab:function(){C.attr("tabindex")===i&&C.attr("tabindex",0)}},remove:{checked:function(){x.removeClass(g.checked)}},enable:function(){m.debug("Enabling checkbox functionality"),x.removeClass(g.disabled),C.prop("disabled",!1),e.proxy(f.onEnabled,C.get())()},disable:function(){m.debug("Disabling checkbox functionality"),x.addClass(g.disabled),C.prop("disabled","disabled"),e.proxy(f.onDisabled,C.get())()},check:function(){m.debug("Enabling checkbox",C),C.prop("checked",!0).trigger("change"),m.set.checked(),e.proxy(f.onChange,C.get())(),e.proxy(f.onChecked,C.get())()},uncheck:function(){m.debug("Disabling checkbox"),C.prop("checked",!1).trigger("change"),m.remove.checked(),e.proxy(f.onChange,C.get())(),e.proxy(f.onUnchecked,C.get())()},toggle:function(){return m.can.change()?(m.verbose("Determining new checkbox state"),void(m.is.unchecked()?m.check():m.is.checked()&&m.can.uncheck()&&m.uncheck())):(console.log(m.can.change()),void m.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||d,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(T===i&&m.initialize(),m.invoke(l)):(T!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!0,onChange:function(){},onChecked:function(){},onUnchecked:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",disabled:"disabled",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined."},selector:{input:"input[type=checkbox], input[type=radio]",label:"label"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.colorize=function(t){var n=e.extend(!0,{},e.fn.colorize.settings,t),o=arguments||!1;return e(this).each(function(t){var a,r,s,c,l,u,d,m,f=e(this),g=e("<canvas />")[0],p=e("<canvas />")[0],v=e("<canvas />")[0],b=new Image,h=n.colors,y=(n.paths,n.namespace),x=n.error,w=f.data("module-"+y);return m={checkPreconditions:function(){return m.debug("Checking pre-conditions"),!e.isPlainObject(h)||e.isEmptyObject(h)?(m.error(x.undefinedColors),!1):!0},async:function(e){n.async?setTimeout(e,0):e()},getMetadata:function(){m.debug("Grabbing metadata"),c=f.data("image")||n.image||i,l=f.data("name")||n.name||t,u=n.width||f.width(),d=n.height||f.height(),(0===u||0===d)&&m.error(x.undefinedSize)},initialize:function(){m.debug("Initializing with colors",h),m.checkPreconditions()&&m.async(function(){m.getMetadata(),m.canvas.create(),m.draw.image(function(){m.draw.colors(),m.canvas.merge()}),f.data("module-"+y,m)})},redraw:function(){m.debug("Redrawing image"),m.async(function(){m.canvas.clear(),m.draw.colors(),m.canvas.merge()})},change:{color:function(e,t){return m.debug("Changing color",e),h[e]===i?(m.error(x.missingColor),!1):(h[e]=t,void m.redraw())}},canvas:{create:function(){m.debug("Creating canvases"),g.width=u,g.height=d,p.width=u,p.height=d,v.width=u,v.height=d,a=g.getContext("2d"),r=p.getContext("2d"),s=v.getContext("2d"),f.append(g),a=f.children("canvas")[0].getContext("2d")},clear:function(){m.debug("Clearing canvas"),s.fillStyle="#FFFFFF",s.fillRect(0,0,u,d)},merge:function(){return e.isFunction(a.blendOnto)?(a.putImageData(r.getImageData(0,0,u,d),0,0),void s.blendOnto(a,"multiply")):void m.error(x.missingPlugin)}},draw:{image:function(e){m.debug("Drawing image"),e=e||function(){},c?(b.src=c,b.onload=function(){r.drawImage(b,0,0),e()}):(m.error(x.noImage),e())},colors:function(){m.debug("Drawing color overlays",h),e.each(h,function(e,t){n.onDraw(s,l,e,t)})}},debug:function(e,t){n.debug&&(t!==i?console.info(n.name+": "+e,t):console.info(n.name+": "+e))},error:function(e){console.warn(n.name+": "+e)},invoke:function(t,o,a){var r;return a=a||Array.prototype.slice.call(arguments,2),"string"==typeof t&&w!==i&&(t=t.split("."),e.each(t,function(t,i){return e.isPlainObject(w[i])?(w=w[i],!0):e.isFunction(w[i])?(r=w[i],!0):(m.error(n.error.method),!1)})),e.isFunction(r)?r.apply(o,a):!1
}},w!==i&&o?("invoke"==o[0]&&(o=Array.prototype.slice.call(o,1)),m.invoke(o[0],this,Array.prototype.slice.call(o,1))):void m.initialize()}),this},e.fn.colorize.settings={name:"Image Colorizer",debug:!0,namespace:"colorize",onDraw:function(){},async:!0,colors:{},metadata:{image:"image",name:"name"},error:{noImage:"No tracing image specified",undefinedColors:"No default colors specified.",missingColor:"Attempted to change color that does not exist",missingPlugin:"Blend onto plug-in must be included",undefinedHeight:"The width or height of image canvas could not be automatically determined. Please specify a height."}}}(jQuery,window,document),function(e,t,n,i){e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return a.each(function(){var d,m,f,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,v=g.namespace,b=g.className,h=(g.error,"."+v),y="module-"+v,x=a.selector||"",w="ontouchstart"in n.documentElement?"touchstart":"click",C=e(this),T=this,k=C.data(y);f={preinitialize:function(){f.is.dimmer()?(m=C.parent(),d=C):(m=C,d=f.has.dimmer()?g.dimmerName?m.children(p.dimmer).filter("."+g.dimmerName):m.children(p.dimmer):f.create())},initialize:function(){f.debug("Initializing dimmer",g),"hover"==g.on?m.on("mouseenter"+h,f.show).on("mouseleave"+h,f.hide):"click"==g.on&&m.on(w+h,f.toggle),f.is.page()&&(f.debug("Setting as a page dimmer",m),f.set.pageDimmer()),f.is.closable()&&(f.verbose("Adding dimmer close event",d),d.on(w+h,f.event.click)),f.set.dimmable(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),k=f,C.data(y,k)},destroy:function(){f.verbose("Destroying previous module",d),C.removeData(y),m.off(h),d.off(h)},event:{click:function(t){f.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).size()||e(t.target).is(p.content))&&(f.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);f.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.variation&&(f.debug("Creating dimmer with variation",g.variation),t.addClass(b.variation)),g.dimmerName&&(f.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(m),t},show:function(t){t=e.isFunction(t)?t:function(){},f.debug("Showing dimmer",d,g),f.is.dimmed()&&!f.is.animating()||!f.is.enabled()?f.debug("Dimmer is already shown or disabled"):(f.animate.show(t),e.proxy(g.onShow,T)(),e.proxy(g.onChange,T)())},hide:function(t){t=e.isFunction(t)?t:function(){},f.is.dimmed()||f.is.animating()?(f.debug("Hiding dimmer",d),f.animate.hide(t),e.proxy(g.onHide,T)(),e.proxy(g.onChange,T)()):f.debug("Dimmer is not visible")},toggle:function(){f.verbose("Toggling dimmer visibility",d),f.is.dimmed()?f.hide():f.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?d.transition({animation:g.transition+" in",queue:!1,duration:f.get.duration(),onStart:function(){f.set.dimmed()},onComplete:function(){f.set.active(),t()}}):(f.verbose("Showing dimmer animation with javascript"),f.set.dimmed(),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(f.get.duration(),1,function(){d.removeAttr("style"),f.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(f.verbose("Hiding dimmer with css"),d.transition({animation:g.transition+" out",queue:!1,duration:f.get.duration(),onStart:function(){f.remove.dimmed()},onComplete:function(){f.remove.active(),t()}})):(f.verbose("Hiding dimmer with javascript"),f.remove.dimmed(),d.stop().fadeOut(f.get.duration(),function(){f.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?f.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?C.children(p.dimmer).filter("."+g.dimmerName).size()>0:C.children(p.dimmer).size()>0}},is:{active:function(){return d.hasClass(b.active)},animating:function(){return d.is(":animated")||d.hasClass(b.animating)},closable:function(){return"auto"==g.closable?"hover"==g.on?!1:!0:g.closable},dimmer:function(){return C.is(p.dimmer)},dimmable:function(){return C.is(p.dimmable)},dimmed:function(){return m.hasClass(b.dimmed)},disabled:function(){return m.hasClass(b.disabled)},enabled:function(){return!f.is.disabled()},page:function(){return m.is("body")},pageDimmer:function(){return d.hasClass(b.pageDimmer)}},can:{show:function(){return!d.hasClass(b.disabled)}},set:{active:function(){d.addClass(b.active)},dimmable:function(){m.addClass(b.dimmable)},dimmed:function(){m.addClass(b.dimmed)},pageDimmer:function(){d.addClass(b.pageDimmer)},disabled:function(){d.addClass(b.disabled)}},remove:{active:function(){d.removeClass(b.active)},dimmed:function(){m.removeClass(b.dimmed)},disabled:function(){d.removeClass(b.disabled)}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),a.size()>1&&(t+=" ("+a.size()+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=k;return n=n||u,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},f.preinitialize(),l?(k===i&&f.initialize(),f.invoke(c)):(k!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",debug:!1,verbose:!0,performance:!0,dimmerName:!1,variation:!1,closable:"auto",transition:"fade",useCSS:!0,on:!1,duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},selector:{dimmable:".dimmable",dimmer:".ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],m=arguments[0],f="string"==typeof m,g=[].slice.call(arguments,1);return r.each(function(){var n,p,v=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),b=v.className,h=v.metadata,y=v.namespace,x=v.selector,w=v.error,C="."+y,T="module-"+y,k=e(this),S=k.find(x.text),A=k.find(x.search),z=k.find(x.input),P=k.prev().find(x.text).size()>0?k.prev().find(x.text):k.prev(),E=k.children(x.menu),F=E.find(x.item),O=!1,D=!1,R=this,j=k.data(T);p={initialize:function(){p.debug("Initializing dropdown",v),p.setup.layout(),p.save.defaults(),p.set.selected(),l&&p.bind.touchEvents(),p.bind.mouseEvents(),p.bind.keyboardEvents(),p.observeChanges(),p.instantiate()},instantiate:function(){p.verbose("Storing instance of dropdown",p),j=p,k.data(T,p)},destroy:function(){p.verbose("Destroying previous dropdown for",k),p.remove.tabbable(),k.off(C).removeData(T)},observeChanges:function(){"MutationObserver"in t&&(n=new MutationObserver(function(){p.debug("DOM tree modified, updating selector cache"),p.refresh()}),n.observe(R,{childList:!0,subtree:!0}),p.debug("Setting up mutation observer",n))},setup:{layout:function(){k.is("select")&&p.setup.select(),p.is.search()&&!p.is.searchable()&&(A=e("<input />").addClass(b.search).insertBefore(S)),v.allowTab&&p.set.tabbable()},select:function(){var t=p.get.selectValues();p.debug("Dropdown initialized on a select",t),z=k,z.parents(x.dropdown).size()>0?(p.debug("Creating dropdown menu only from template"),k=z.closest(x.dropdown),0===k.find("."+b.dropdown).size()&&e("<div />").addClass(b.menu).html(v.templates.menu(t)).appendTo(k)):(p.debug("Creating entire dropdown from template"),k=e("<div />").attr("class",z.attr("class")).addClass(b.selection).addClass(b.dropdown).html(v.templates.dropdown(t)).insertBefore(z),z.removeAttr("class").prependTo(k)),p.refresh()}},refresh:function(){S=k.find(x.text),A=k.find(x.search),z=k.find(x.input),E=k.children(x.menu),F=E.find(x.item)},toggle:function(){p.verbose("Toggling menu visibility"),p.is.active()?p.hide():p.show()},show:function(){p.debug("Checking if dropdown can show"),p.is.active()||(p.animate.show(function(){p.can.click()&&p.bind.intent(),p.set.visible()}),e.proxy(v.onShow,R)())},hide:function(){p.is.active()&&(p.debug("Hiding dropdown"),p.animate.hide(function(){p.remove.visible()}),e.proxy(v.onHide,R)())},hideOthers:function(){p.verbose("Finding other dropdowns to hide"),r.not(k).has(x.menu+":visible:not(."+b.animating+")").dropdown("hide")},hideSubMenus:function(){var e=E.find(x.menu),t=e.has(x.item+"."+b.active);e.not(t).removeClass(b.visible).removeAttr("style")},bind:{keyboardEvents:function(){p.debug("Binding keyboard events"),k.on("keydown"+C,p.event.keydown),p.is.searchable()&&k.on(p.get.inputEvent(),x.search,p.event.input)},touchEvents:function(){p.debug("Touch device detected binding additional touch events"),p.is.searchSelection()||k.on("touchstart"+C,p.event.test.toggle),E.on("touchstart"+C,x.item,p.event.item.mouseenter)},mouseEvents:function(){p.verbose("Mouse detected binding mouse events"),p.is.searchSelection()?k.on("mousedown"+C,x.menu,p.event.menu.activate).on("mouseup"+C,x.menu,p.event.menu.deactivate).on("focus"+C,x.search,p.event.searchFocus).on("click"+C,x.search,p.show).on("blur"+C,x.search,p.event.searchBlur):("click"==v.on?k.on("click"+C,p.event.test.toggle):"hover"==v.on?k.on("mouseenter"+C,p.delay.show).on("mouseleave"+C,p.delay.hide):k.on(v.on+C,p.toggle),k.on("mousedown"+C,p.event.mousedown).on("mouseup"+C,p.event.mouseup).on("focus"+C,p.event.focus).on("blur"+C,p.event.blur)),E.on("mouseenter"+C,x.item,p.event.item.mouseenter).on("mouseleave"+C,x.item,p.event.item.mouseleave).on("click"+C,x.item,p.event.item.click)},intent:function(){p.verbose("Binding hide intent event to document"),l&&s.on("touchstart"+C,p.event.test.touch).on("touchmove"+C,p.event.test.touch),s.on("click"+C,p.event.test.hide)}},unbind:{intent:function(){p.verbose("Removing hide intent event from document"),l&&s.off("touchstart"+C).off("touchmove"+C),s.off("click"+C)}},filter:function(t){var n,o,a=e(),r=new RegExp("(?:s|^)"+t,"i"),s=new RegExp(t,"i");F.each(function(){var t=e(this),n=t.data(h.text)!==i?t.data(h.text):v.preserveHTML?t.html():t.text(),o=t.data(h.value)!==i?t.data(h.value):"string"==typeof n?n.toLowerCase():n;r.test(n)||r.test(o)?a=a.add(t):v.fullTextSearch&&(s.test(n)||s.test(o))&&(a=a.add(t))}),o=F.not(a),n=o.size()==F.size(),p.remove.filteredItem(),p.remove.selectedItem(),o.addClass(b.filtered),F.not("."+b.filtered).eq(0).addClass(b.selected),n&&p.hide()},focusSearch:function(){p.is.search()&&A.focus()},event:{mousedown:function(){O=!0},mouseup:function(){O=!1},focus:function(){!O&&p.is.hidden()&&p.show()},blur:function(){O||p.hide()},searchFocus:function(){O=!0,p.show()},searchBlur:function(){D||p.hide()},input:function(){var e=A.val();p.is.searchSelection()&&(p.can.show()&&p.show(),p.set.filtered()),p.filter(e)},keydown:function(t){var n,i=F.not(b.filtered).filter("."+b.selected).eq(0),o=F.not("."+b.filtered),a=t.which,r={enter:13,escape:27,upArrow:38,downArrow:40},s=b.selected,c=o.index(i),l=i.size()>0;if(l||(i=F.filter("."+b.active).eq(0),l=i.size()>0),a==r.escape&&(p.verbose("Escape key pressed, closing dropdown"),p.hide()),p.is.visible()){if(a==r.enter&&l)return p.verbose("Enter key pressed, choosing selected item"),e.proxy(p.event.item.click,i)(t),t.preventDefault(),!1;a==r.upArrow?(n=l?i.prevAll(x.item+":not(."+b.filtered+")").eq(0):o.eq(0),0!==c&&(p.verbose("Up key pressed, changing active item"),F.removeClass(s),n.addClass(s),p.set.scrollPosition(n)),t.preventDefault()):a==r.downArrow&&(n=l?i.nextAll(x.item+":not(."+b.filtered+")").eq(0):o.eq(0),c+1<o.size()&&(p.verbose("Down key pressed, changing active item"),F.removeClass(s),n.addClass(s),p.set.scrollPosition(n)),t.preventDefault())}else a==r.enter&&p.show()},test:{toggle:function(e){p.determine.eventInMenu(e,p.toggle)&&e.preventDefault()},touch:function(e){p.determine.eventInMenu(e,function(){"touchstart"==e.type?p.timer=setTimeout(p.hide,v.delay.touch):"touchmove"==e.type&&clearTimeout(p.timer)}),e.stopPropagation()},hide:function(e){p.determine.eventInModule(e,p.hide)}},menu:{activate:function(){D=!0},deactivate:function(){D=!1}},item:{mouseenter:function(t){var n=e(this).find(x.menu),i=e(this).siblings(x.item).children(x.menu);n.size()>0&&(clearTimeout(p.itemTimer),p.itemTimer=setTimeout(function(){p.animate.hide(!1,i),p.verbose("Showing sub-menu",n),p.animate.show(!1,n)},2*v.delay.show),t.preventDefault())},mouseleave:function(){var t=e(this).find(x.menu);t.size()>0&&(clearTimeout(p.itemTimer),p.itemTimer=setTimeout(function(){p.verbose("Hiding sub-menu",t),p.animate.hide(!1,t)},v.delay.hide))},click:function(){var t=e(this),n=t.data(h.text)!==i?t.data(h.text):v.preserveHTML?t.html():t.text(),o=t.data(h.value)!==i?t.data(h.value):"string"==typeof n?n.toLowerCase():n,a=function(){p.remove.searchTerm(),p.remove.filteredItem(),p.determine.selectAction(n,o),e.proxy(v.onChange,R)(o,n,t)},r=t.find(x.menu).size()>0;r||a()}},resetStyle:function(){e(this).removeAttr("style")}},determine:{selectAction:function(t,n){p.verbose("Determining action",v.action),e.isFunction(p.action[v.action])?(p.verbose("Triggering preset action",v.action,t,n),p.action[v.action](t,n)):e.isFunction(v.action)?(p.verbose("Triggering user action",v.action,t,n),v.action(t,n)):p.error(w.action,v.action)},eventInModule:function(t,n){return n=n||function(){},0===e(t.target).closest(k).size()?(p.verbose("Triggering event",n),n(),!0):(p.verbose("Event occurred in dropdown, canceling callback"),!1)},eventInMenu:function(t,n){return n=n||function(){},0===e(t.target).closest(E).size()?(p.verbose("Triggering event",n),n(),!0):(p.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},hide:function(){p.hide()},select:function(e,t){t=t!==i?t:e,p.set.selected(t),p.set.value(t),p.hide()},activate:function(e,t){t=t!==i?t:e,p.set.selected(t),p.set.value(t),p.hide()},combo:function(e,t){t=t!==i?t:e,p.set.selected(t),p.set.value(t),p.hide()}},get:{text:function(){return S.text()},value:function(){return z.size()>0?z.val():k.data(h.value)},inputEvent:function(){var e=A[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={values:{}};return k.find("option").each(function(){var n=e(this).html(),o=e(this).attr("value")!==i?e(this).attr("value"):n;""===o?t.placeholder=n:t.values[o]=n}),p.debug("Retrieved values from select",t),t},item:function(t,n){var o=!1;return t=t!==i?t:p.get.value()!==i?p.get.value():p.get.text(),n=""===t||0===t?!0:n||!1,t!==i?F.each(function(){var a=e(this),r=a.data(h.text)!==i?a.data(h.text):v.preserveHTML?a.html():a.text(),s=a.data(h.value)!==i?a.data(h.value):"string"==typeof r?r.toLowerCase():r;n?(p.verbose("Ambiguous dropdown value using strict type check",a,t),s===t?o=e(this):o||r!==t||(o=e(this))):s==t?(p.verbose("Found select item by value",s,t),o=e(this)):o||r!=t||(p.verbose("Found select item by text",r,t),o=e(this))}):t=p.get.text(),o||!1}},restore:{defaults:function(){p.restore.defaultText(),p.restore.defaultValue()},defaultText:function(){var e=k.data(h.defaultText);p.debug("Restoring default text",e),p.set.text(e)},defaultValue:function(){var e=k.data(h.defaultValue);e!==i&&(p.debug("Restoring default value",e),p.set.selected(e),p.set.value(e))}},save:{defaults:function(){p.save.defaultText(),p.save.defaultValue()},defaultValue:function(){k.data(h.defaultValue,p.get.value())},defaultText:function(){k.data(h.defaultText,S.text())}},set:{filtered:function(){S.addClass(b.filtered)},tabbable:function(){p.is.searchable()?(p.debug("Searchable dropdown initialized"),A.val("").attr("tabindex",0),E.attr("tabindex","-1")):(p.debug("Simple selection dropdown initialized"),k.attr("tabindex")||(k.attr("tabindex",0),E.attr("tabindex","-1")))},scrollPosition:function(e){var t,n,i,o,a,r,s,c,e=e||p.get.item(),l=e&&e.size()>0,u=5;e&&l&&(r=E.height(),n=e.height(),a=E.scrollTop(),o=E.offset().top,i=e.offset().top,t=a-o+i,c=t+u>a+r,s=a>t-u,(s||c)&&(p.debug("Scrolling to active item"),E.scrollTop(t)))},text:function(e){"combo"==v.action?(p.debug("Changing combo button text",e,P),v.preserveHTML?P.html(e):P.text(e)):"select"!==v.action&&(p.debug("Changing text",e,S),S.removeClass(b.filtered).removeClass(b.placeholder),v.preserveHTML?S.html(e):S.text(e))},value:function(e){p.debug("Adding selected value to hidden input",e,z),z.size()>0?z.val(e).trigger("change"):k.data(h.value,e)},active:function(){k.addClass(b.active)},visible:function(){k.addClass(b.visible)},selected:function(e){var t,n=p.get.item(e);n&&(p.debug("Setting selected menu item to",n),t=n.data(h.text)!==i?n.data(h.text):v.preserveHTML?n.html():n.text(),p.remove.activeItem(),p.remove.selectedItem(),n.addClass(b.active).addClass(b.selected),p.set.text(t))}},remove:{active:function(){k.removeClass(b.active)},visible:function(){k.removeClass(b.visible)},activeItem:function(){F.removeClass(b.active)},filteredItem:function(){F.removeClass(b.filtered)},searchTerm:function(){A.val("")},selectedItem:function(){F.removeClass(b.selected)},tabbable:function(){p.is.searchable()?(p.debug("Searchable dropdown initialized"),A.attr("tabindex","-1"),E.attr("tabindex","-1")):(p.debug("Simple selection dropdown initialized"),k.attr("tabindex","-1"),E.attr("tabindex","-1"))}},is:{search:function(){return k.hasClass(b.search)},searchable:function(){return A.size()>0},searchSelection:function(){return p.is.searchable()&&A.parent().is(k)},selection:function(){return k.hasClass(b.selection)},animated:function(e){return e?e.is(":animated")||e.transition&&e.transition("is animating"):E.is(":animated")||E.transition&&E.transition("is animating")},active:function(){return k.hasClass(b.active)},visible:function(e){return e?e.is(":visible"):E.is(":visible")},hidden:function(e){return e?e.is(":hidden"):E.is(":hidden")}},can:{click:function(){return l||"click"==v.on},show:function(){return!k.hasClass(b.disabled)}},animate:{show:function(t,n){var o=n||E,a=n?function(){}:function(){p.hideOthers(),p.set.active(),p.set.scrollPosition()};t=t||function(){},p.verbose("Doing menu show animation",o),p.is.hidden(o)&&("none"==v.transition?e.proxy(t,R)():e.fn.transition!==i&&k.transition("is supported")?o.transition({animation:v.transition+" in",debug:v.debug,verbose:v.verbose,duration:v.duration,queue:!0,onStart:a,onComplete:function(){e.proxy(t,R)()}}):"slide down"==v.transition?(a(),o.hide().clearQueue().children().clearQueue().css("opacity",0).delay(50).animate({opacity:1},v.duration,"easeOutQuad",p.event.resetStyle).end().slideDown(100,"easeOutQuad",function(){e.proxy(p.event.resetStyle,this)(),e.proxy(t,R)()})):"fade"==v.transition?(a(),o.hide().clearQueue().fadeIn(v.duration,function(){e.proxy(p.event.resetStyle,this)(),e.proxy(t,R)()})):p.error(w.transition,v.transition))},hide:function(t,n){var o=n||E,a=n?function(){}:function(){p.can.click()&&p.unbind.intent(),p.focusSearch(),p.hideSubMenus(),p.remove.active()};t=t||function(){},p.is.visible(o)&&(p.verbose("Doing menu hide animation",o),"none"==v.transition?e.proxy(t,R)():e.fn.transition!==i&&k.transition("is supported")?o.transition({animation:v.transition+" out",duration:v.duration,debug:v.debug,verbose:v.verbose,queue:!0,onStart:a,onComplete:function(){e.proxy(t,R)()}}):"slide down"==v.transition?(a(),o.show().clearQueue().children().clearQueue().css("opacity",1).animate({opacity:0},100,"easeOutQuad",p.event.resetStyle).end().delay(50).slideUp(100,"easeOutQuad",function(){e.proxy(p.event.resetStyle,this)(),e.proxy(t,R)()})):"fade"==v.transition?(a(),o.show().clearQueue().fadeOut(150,function(){e.proxy(p.event.resetStyle,this)(),e.proxy(t,R)()})):p.error(w.transition))}},delay:{show:function(){p.verbose("Delaying show event to ensure user intent"),clearTimeout(p.timer),p.timer=setTimeout(p.show,v.delay.show)},hide:function(){p.verbose("Delaying hide event to ensure user intent"),clearTimeout(p.timer),p.timer=setTimeout(p.hide,v.delay.hide)}},setting:function(t,n){if(p.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},debug:function(){v.debug&&(v.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,v.name+":"),p.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),p.verbose.apply(console,arguments)))},error:function(){p.error=Function.prototype.bind.call(console.error,console,v.name+":"),p.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=u||t,n=t-i,u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,100)},display:function(){var t=v.name+":",n=0;u=!1,clearTimeout(p.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,c,l=j;return n=n||g,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(p.error(w.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},f?(j===i&&p.initialize(),p.invoke(m)):(j!==i&&p.destroy(),p.initialize())}),a!==i?a:this},e.fn.dropdown.settings={debug:!1,verbose:!0,performance:!0,on:"click",action:"activate",allowTab:!0,fullTextSearch:!0,preserveHTML:!0,delay:{show:200,hide:300,touch:50},transition:"slide down",duration:250,onChange:function(){},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",error:{action:"You called a dropdown action that was not defined",method:"The method you called is not defined.",transition:"The requested transition was not found"},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",text:"text",value:"value"},selector:{dropdown:".ui.dropdown",text:"> .text:not(.icon)",input:'> input[type="hidden"], > select',search:"> input.search, .menu > .search > input, .menu > input.search",menu:".menu",item:".item"},className:{active:"active",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",menu:"menu",placeholder:"default",search:"search",selected:"selected",selection:"selection",visible:"visible"}},e.fn.dropdown.settings.templates={menu:function(t){var n=(t.placeholder||!1,t.values||{},"");return e.each(t.values,function(e,t){n+=e===t?'<div class="item">'+t+"</div>":'<div class="item" data-value="'+e+'">'+t+"</div>"}),n},dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+=e===t?'<div class="item">'+t+"</div>":'<div class="item" data-value="'+e+'">'+t+"</div>"}),i+="</div>"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,m=s.className,f=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),b=[],h=arguments[0],y="string"==typeof h,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),T=(e(this).find(d.prompt),e(this).find(d.submit)),k=[],S=this,A=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),A=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",A),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+f,t.event.field.keydown),o.on("submit"+f,t.validate.form),l.on("blur"+f,t.event.field.blur),t.attachEvents(T,"submit"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+f,t.event.field.change)})},removeEvents:function(){o.off(f),l.off(f),T.off(f),l.off(f)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).size()>0&&(t.debug("Enter key pressed, submitting form"),T.addClass(m.down),i.one("keyup"+f,t.event.field.keyup))},keyup:function(){t.verbose("Doing keyboard shortcut form submit"),T.removeClass(m.down),t.submit()},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(m.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(m.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e?"change":n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).size()>0?l.filter("#"+n):l.filter('[name="'+n+'"]').size()>0?l.filter('[name="'+n+'"]'):l.filter("[data-"+u.validate+'="'+n+'"]').size()>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).size()>0?!0:l.filter('[name="'+e+'"]').size()>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').size()>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.find(d.prompt),u=0!==l.size();a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(m.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.find(d.prompt);r.removeClass(m.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(m.error).addClass(m.success)},error:function(){o.removeClass(m.success).addClass(m.error)}},validate:{form:function(n){var a=!0;return k=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),e.proxy(s.onSuccess,this)(n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(k),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),e.proxy(s.onFailure,this)(k))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),e.proxy(s.onValid,o)(),!0):(k=k.concat(r),t.add.prompt(n.identifier,r),e.proxy(s.onInvalid,o)(r),!1)},rule:function(n,a){var r,c,l=t.get.field(n.identifier),u=a.type,d=e.trim(l.val()+""),m=/\[(.*)\]/i,f=m.exec(u),g=!0;return f!==i&&null!==f?(r=""+f[1],c=u.replace(f[0],""),g=e.proxy(s.rules[c],o)(d,r)):g=e.proxy(s.rules[u],l)(d),g}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,b.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(b,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.size()>1&&(n+=" ("+r.size()+")"),(console.group!==i||console.table!==i)&&b.length>0&&(console.groupCollapsed(n),console.table?console.table(b):e.each(b,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")
}),console.groupEnd()),b=[]}},invoke:function(t,n,o){var r,s,c,l=A;return n=n||x,o=S||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(A===i&&t.initialize(),t.invoke(h)):(A!==i&&t.destroy(),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:150,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{validate:"validate"},selector:{message:".error.message",field:"input, textarea, select",group:".field",checkbox:'input[type="checkbox"], input[type="radio"]',input:"input",prompt:".prompt",submit:".submit"},className:{error:"error",success:"success",down:"down",label:"ui label prompt"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").size()>0},empty:function(e){return!(e===i||""===e)},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},length:function(e,t){return e!==i?e.length>=t:!1},not:function(e,t){return e!=t},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(t)},is:function(e,t){return e==t},maxLength:function(e,t){return e!==i?e.length<=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).size()>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').size()>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').size()>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.modal=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("body"),u=r.selector||"",d=(new Date).getTime(),m=[],f=arguments[0],g="string"==typeof f,p=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,h,y,x,w,C,T=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),k=T.selector,S=T.className,A=T.namespace,z=T.error,P="."+A,E="module-"+A,F=e(this),O=e(T.context),D=F.find(k.close),R=this,j=F.data(E);C={initialize:function(){return C.verbose("Initializing dimmer",O),e.fn.dimmer===i?void C.error(z.dimmer):(y=O.dimmer({debug:T.debug,dimmerName:"modals",closable:!1,useCSS:!0,duration:{show:.9*T.duration,hide:1.1*T.duration}}),T.detachable&&y.dimmer("add content",F),x=y.dimmer("get dimmer"),b=F.siblings(k.modal),r=b.add(F),C.verbose("Attaching close events",D),C.bind.events(),C.observeChanges(),void C.instantiate())},instantiate:function(){C.verbose("Storing instance of modal"),j=C,F.data(E,j)},destroy:function(){C.verbose("Destroying previous modal"),F.removeData(E).off(P),D.off(P),O.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&(w=new MutationObserver(function(){C.debug("DOM tree modified, refreshing"),C.refresh()}),w.observe(R,{childList:!0,subtree:!0}),C.debug("Setting up mutation observer",w))},refresh:function(){C.remove.scrolling(),C.cacheSizes(),C.set.screenHeight(),C.set.type(),C.set.position()},attachEvents:function(t,n){var i=e(t);n=e.isFunction(C[n])?C[n]:C.toggle,i.size()>0?(C.debug("Attaching modal events to element",t,n),i.off(P).on("click"+P,n)):C.error(z.notFound,t)},bind:{events:function(){D.on("click"+P,C.event.close),s.on("resize"+P,C.event.resize)}},event:{close:function(){C.verbose("Closing element pressed"),e(this).is(k.approve)?e.proxy(T.onApprove,R)()!==!1?C.hide():C.verbose("Approve callback returned false cancelling hide"):e(this).is(k.deny)?e.proxy(T.onDeny,R)()!==!1?C.hide():C.verbose("Deny callback returned false cancelling hide"):C.hide()},click:function(t){0===e(t.target).closest(k.modal).size()&&(C.debug("Dimmer clicked, hiding all modals"),T.allowMultiple?C.hide():C.hideAll(),t.stopImmediatePropagation())},debounce:function(e,t){clearTimeout(C.timer),C.timer=setTimeout(e,t)},keyboard:function(e){var t=e.which,n=27;t==n&&(T.closable?(C.debug("Escape key pressed hiding modal"),C.hide()):C.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&v(C.refresh)}},toggle:function(){C.is.active()||C.is.animating()?C.hide():C.show()},show:function(t){t=e.isFunction(t)?t:function(){},C.showDimmer(),C.showModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},C.is.active()?C.debug("Modal is already visible"):b.filter(":visible").size()>0&&!T.allowMultiple?(C.debug("Other modals visible, queueing show animation"),C.hideOthers(C.showModal)):(e.proxy(T.onShow,R)(),T.transition&&e.fn.transition!==i&&F.transition("is supported")?(C.debug("Showing modal with css animations"),C.cacheSizes(),C.set.position(),C.set.screenHeight(),C.set.type(),F.transition({debug:T.debug,animation:T.transition+" in",queue:!1,duration:T.duration,onStart:function(){C.set.clickaway()},onComplete:function(){e.proxy(T.onVisible,R)(),C.add.keyboardShortcuts(),C.save.focus(),C.set.active(),C.set.autofocus(),t()}})):(C.debug("Showing modal with javascript"),F.fadeIn(T.duration,T.easing,function(){e.proxy(T.onVisible,R)(),C.add.keyboardShortcuts(),C.save.focus(),C.set.active(),t()})))},showDimmer:function(){y.dimmer("is active")?C.debug("Dimmer already visible"):(C.debug("Showing dimmer"),y.dimmer("show"))},hide:function(t){t=e.isFunction(t)?t:function(){},r.filter(":visible").size()<=1&&C.hideDimmer(),C.hideModal(t)},hideDimmer:function(){return y.dimmer("is active")||y.dimmer("is animating")?(C.debug("Hiding dimmer"),C.remove.clickaway(),void y.dimmer("hide",function(){T.transition&&e.fn.transition!==i&&F.transition("is supported")&&C.remove.screenHeight(),C.remove.active()})):void C.debug("Dimmer is not visible cannot hide")},hideModal:function(t){t=e.isFunction(t)?t:function(){},C.debug("Hiding modal"),e.proxy(T.onHide,R)(),T.transition&&e.fn.transition!==i&&F.transition("is supported")?F.transition({debug:T.debug,animation:T.transition+" out",queue:!1,duration:T.duration,onStart:function(){C.remove.keyboardShortcuts()},onComplete:function(){e.proxy(T.onHidden,R)(),C.remove.active(),C.restore.focus(),t()}}):(C.remove.keyboardShortcuts(),F.fadeOut(T.duration,T.easing,function(){e.proxy(T.onHidden,R)(),C.remove.active(),C.restore.focus(),t()}))},hideAll:function(t){t=e.isFunction(t)?t:function(){},r.is(":visible")&&(C.debug("Hiding all visible modals"),C.hideDimmer(),r.filter(":visible").modal("hide modal",t))},hideOthers:function(t){t=e.isFunction(t)?t:function(){},b.is(":visible")&&(C.debug("Hiding other modals",b),b.filter(":visible").modal("hide modal",t))},add:{keyboardShortcuts:function(){C.verbose("Adding keyboard shortcuts"),c.on("keyup"+P,C.event.keyboard)}},save:{focus:function(){h=e(n.activeElement).blur()}},restore:{focus:function(){h&&h.size()>0&&h.focus()}},remove:{active:function(){F.removeClass(S.active)},clickaway:function(){T.closable&&x.off("click"+P)},screenHeight:function(){C.cache.height>C.cache.pageHeight&&(C.debug("Removing page height"),l.css("height",""))},keyboardShortcuts:function(){C.verbose("Removing keyboard shortcuts"),c.off("keyup"+P)},scrolling:function(){y.removeClass(S.scrolling),F.removeClass(S.scrolling)}},cacheSizes:function(){var o=F.outerHeight();(C.cache===i||0!==o)&&(C.cache={pageHeight:e(n).outerHeight(),height:o+T.offset,contextHeight:"body"==T.context?e(t).height():y.height()}),C.debug("Caching modal and container sizes",C.cache)},can:{fit:function(){return C.cache.height<C.cache.contextHeight}},is:{active:function(){return F.hasClass(S.active)},animating:function(){return F.transition("is supported")?F.transition("is animating"):F.is(":visible")},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){if(T.autofocus){var e=F.find(":input:visible"),t=e.filter("[autofocus]"),n=t.size()>0?t:e;n.first().focus()}},clickaway:function(){T.closable&&x.off("click"+P).on("click"+P,C.event.click)},screenHeight:function(){C.cache.height>C.cache.pageHeight?(C.debug("Modal is taller than page content, resizing page height"),l.css("height",C.cache.height+T.padding)):l.css("height","")},active:function(){F.addClass(S.active)},scrolling:function(){y.addClass(S.scrolling),F.addClass(S.scrolling)},type:function(){C.can.fit()?(C.verbose("Modal fits on screen"),C.remove.scrolling()):(C.verbose("Modal cannot fit on screen setting to scrolling"),C.set.scrolling())},position:function(){C.verbose("Centering modal on page",C.cache),F.css(C.can.fit()?{top:"",marginTop:-(C.cache.height/2)}:{marginTop:"",top:c.scrollTop()})}},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){T.debug&&(T.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,T.name+":"),C.debug.apply(console,arguments)))},verbose:function(){T.verbose&&T.debug&&(T.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,T.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,T.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;T.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,100)},display:function(){var t=T.name+":",n=0;d=!1,clearTimeout(C.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,c,l=j;return n=n||p,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},g?(j===i&&C.initialize(),C.invoke(f)):(j!==i&&C.destroy(),C.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",debug:!1,verbose:!0,performance:!0,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,context:"body",duration:500,easing:"easeOutExpo",offset:0,transition:"scale",padding:30,onShow:function(){},onHide:function(){},onVisible:function(){},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:".close, .actions .button",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",scrolling:"scrolling"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.nag=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){{var a,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),f=(m.className,m.selector),g=m.error,p=m.namespace,v="."+p,b=p+"-module",h=e(this),y=h.find(f.close),x=e(m.context?m.context:"body"),w=this,C=h.data(b);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}a={initialize:function(){a.verbose("Initializing element"),h.data(b,a),y.on("click"+v,a.dismiss),m.detachable&&h.parent()[0]!==x[0]&&h.detach().prependTo(x),m.displayTime>0&&setTimeout(a.hide,m.displayTime),a.show()},destroy:function(){a.verbose("Destroying instance"),h.removeData(b).off(v)},show:function(){a.should.show()&&!h.is(":visible")&&(a.debug("Showing nag",m.animation.show),"fade"==m.animation.show?h.fadeIn(m.duration,m.easing):h.slideDown(m.duration,m.easing))},hide:function(){a.debug("Showing nag",m.animation.hide),"fade"==m.animation.show?h.fadeIn(m.duration,m.easing):h.slideUp(m.duration,m.easing)},onHide:function(){a.debug("Removing nag",m.animation.hide),h.remove(),m.onHide&&m.onHide()},dismiss:function(e){m.storageMethod&&a.storage.set(m.key,m.value),a.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return m.persist?(a.debug("Persistent nag is set, can show nag"),!0):a.storage.get(m.key)!=m.value.toString()?(a.debug("Stored value is not set, can show nag",a.storage.get(m.key)),!0):(a.debug("Stored value is set, cannot show nag",a.storage.get(m.key)),!1)}},get:{storageOptions:function(){var e={};return m.expires&&(e.expires=m.expires),m.domain&&(e.domain=m.domain),m.path&&(e.path=m.path),e}},clear:function(){a.storage.remove(m.key)},storage:{set:function(n,o){var r=a.get.storageOptions();if("localstorage"==m.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),a.debug("Value stored using local storage",n,o);else{if(e.cookie===i)return void a.error(g.noCookieStorage);e.cookie(n,o,r),a.debug("Value stored using cookie",n,o,r)}},get:function(n){var o;return"localstorage"==m.storageMethod&&t.localStorage!==i?o=t.localStorage.getItem(n):e.cookie!==i?o=e.cookie(n):a.error(g.noCookieStorage),("undefined"==o||"null"==o||o===i||null===o)&&(o=i),o},remove:function(n){var o=a.get.storageOptions();"local"==m.storageMethod&&t.store!==i?t.localStorage.removeItem(n):e.cookie!==i?e.removeCookie(n,o):a.error(g.noStorage)}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:w,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,r){var s,c,l,u=C;return n=n||d,r=w||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(C===i&&a.initialize(),a.invoke(l)):(C!==i&&a.destroy(),a.initialize())}),o!==i?o:this},e.fn.nag.settings={name:"Nag",debug:!1,verbose:!0,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}}}(jQuery,window,document),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function t(e){return s.raw?e:encodeURIComponent(e)}function n(e){return s.raw?e:decodeURIComponent(e)}function i(e){return t(s.json?JSON.stringify(e):String(e))}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(r," ")),s.json?JSON.parse(e):e}catch(t){}}function a(t,n){var i=s.raw?t:o(t);return e.isFunction(n)?n(i):i}var r=/\+/g,s=e.cookie=function(o,r,c){if(void 0!==r&&!e.isFunction(r)){if(c=e.extend({},s.defaults,c),"number"==typeof c.expires){var l=c.expires,u=c.expires=new Date;u.setTime(+u+864e5*l)}return document.cookie=[t(o),"=",i(r),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var d=o?void 0:{},m=document.cookie?document.cookie.split("; "):[],f=0,g=m.length;g>f;f++){var p=m[f].split("="),v=n(p.shift()),b=p.join("=");if(o&&o===v){d=a(b,r);break}o||void 0===(b=a(b))||(d[v]=b)}return d};s.defaults={},e.removeCookie=function(t,n){return void 0===e.cookie(t)?!1:(e.cookie(t,"",e.extend({},n,{expires:-1})),!e.cookie(t))}}),function(e,t,n,i){"use strict";e.fn.popup=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l=("ontouchstart"in n.documentElement,(new Date).getTime()),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1);return r.each(function(){var n,r,g,p=e.isPlainObject(o)?e.extend(!0,{},e.fn.popup.settings,o):e.extend({},e.fn.popup.settings),v=p.selector,b=p.className,h=p.error,y=p.metadata,x=p.namespace,w="."+p.namespace,C="module-"+x,T=e(this),k=e(p.context),S=p.target?e(p.target):T,A=e(t),z=e("body"),P=0,E=this,F=T.data(C);g={initialize:function(){g.debug("Initializing module",T),g.refresh(),"click"==p.on?T.on("click"+w,g.toggle):g.get.startEvent()&&T.on(g.get.startEvent()+w,g.event.start).on(g.get.endEvent()+w,g.event.end),p.target&&g.debug("Target set to element",S),A.on("resize"+w,g.event.resize),g.exists()?p.hoverable&&g.bind.popup():g.create(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),F=g,T.data(C,F)},refresh:function(){p.popup?n=e(p.popup):p.inline&&(n=S.next(p.selector.popup)),p.popup?(n.addClass(b.loading),r=n.offsetParent(),n.removeClass(b.loading)):r=p.inline?S.offsetParent():z,r.is("html")&&(g.debug("Page is popups offset parent"),r=z)},reposition:function(){g.refresh(),g.set.position()},destroy:function(){g.debug("Destroying previous module"),n&&!p.preserve&&g.removePopup(),T.off(w).removeData(C)},event:{start:function(){var t=e.isPlainObject(p.delay)?p.delay.show:p.delay;clearTimeout(g.hideTimer),g.showTimer=setTimeout(function(){!g.is.hidden()||g.is.active()&&g.is.dropdown()||g.show()},t)},end:function(){var t=e.isPlainObject(p.delay)?p.delay.hide:p.delay;clearTimeout(g.showTimer),g.hideTimer=setTimeout(function(){g.is.visible()&&g.hide()},t)},resize:function(){g.is.visible()&&g.set.position()}},create:function(){var t=T.data(y.html)||p.html,i=T.data(y.variation)||p.variation,o=T.data(y.title)||p.title,a=T.data(y.content)||T.attr("title")||p.content;t||a||o?(g.debug("Creating pop-up html"),t||(t=p.templates.popup({title:o,content:a})),n=e("<div/>").addClass(b.popup).addClass(i).html(t),i&&n.addClass(i),p.inline?(g.verbose("Inserting popup element inline",n),n.insertAfter(T)):(g.verbose("Appending popup element to body",n),n.appendTo(k)),p.hoverable&&g.bind.popup(),e.proxy(p.onCreate,n)(E)):0!==S.next(p.selector.popup).size()?(g.verbose("Pre-existing popup found, reverting to inline"),p.inline=!0,g.refresh(),p.hoverable&&g.bind.popup()):g.debug("No content specified skipping display",E)},toggle:function(){g.debug("Toggling pop-up"),g.is.hidden()?(g.debug("Popup is hidden, showing pop-up"),g.unbind.close(),g.hideAll(),g.show()):(g.debug("Popup is visible, hiding pop-up"),g.hide())},show:function(t){t=e.isFunction(t)?t:function(){},g.debug("Showing pop-up",p.transition),p.preserve||p.popup||g.refresh(),g.exists()||g.create(),n&&g.set.position()&&(g.save.conditions(),g.animate.show(t))},hide:function(t){t=e.isFunction(t)?t:function(){},g.remove.visible(),g.unbind.close(),g.is.visible()&&(g.restore.conditions(),g.animate.hide(t))},hideAll:function(){e(v.popup).filter(":visible").popup("hide")},hideGracefully:function(t){t&&0===e(t.target).closest(v.popup).size()?(g.debug("Click occurred outside popup hiding popup"),g.hide()):g.debug("Click was inside popup, keeping popup open")},exists:function(){return n?p.inline||p.popup?0!==n.size():n.closest(k).size():!1},removePopup:function(){g.debug("Removing popup"),e.proxy(p.onRemove,n)(E),n.removePopup()},save:{conditions:function(){g.cache={title:T.attr("title")},g.cache.title&&T.removeAttr("title"),g.verbose("Saving original attributes",g.cache.title)}},restore:{conditions:function(){return E.blur(),g.cache&&g.cache.title&&(T.attr("title",g.cache.title),g.verbose("Restoring original attributes",g.cache.title)),!0}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},p.transition&&e.fn.transition!==i&&T.transition("is supported")?(g.set.visible(),n.transition({animation:p.transition+" in",queue:!1,debug:p.debug,verbose:p.verbose,duration:p.duration,onComplete:function(){g.bind.close(),e.proxy(t,n)(E),e.proxy(p.onVisible,n)(E)}})):(g.set.visible(),n.stop().fadeIn(p.duration,p.easing,function(){g.bind.close(),e.proxy(t,E)()})),e.proxy(p.onShow,n)(E)},hide:function(t){t=e.isFunction(t)?t:function(){},g.debug("Hiding pop-up"),p.transition&&e.fn.transition!==i&&T.transition("is supported")?n.transition({animation:p.transition+" out",queue:!1,duration:p.duration,debug:p.debug,verbose:p.verbose,onComplete:function(){g.reset(),e.proxy(t,n)(E),e.proxy(p.onHidden,n)(E)}}):n.stop().fadeOut(p.duration,p.easing,function(){g.reset(),t()}),e.proxy(p.onHide,n)(E)}},get:{startEvent:function(){return"hover"==p.on?"mouseenter":"focus"==p.on?"focus":!1},endEvent:function(){return"hover"==p.on?"mouseleave":"focus"==p.on?"blur":!1},offstagePosition:function(i){var i=i||!1,o={top:e(t).scrollTop(),bottom:e(t).scrollTop()+e(t).height(),left:0,right:e(t).width()},a={width:n.width(),height:n.height(),offset:n.offset()},r={},s=[];return a.offset&&i&&(g.verbose("Checking if outside viewable area",a.offset),r={top:a.offset.top<o.top,bottom:a.offset.top+a.height>o.bottom,right:a.offset.left+a.width>o.right,left:!1}),e.each(r,function(e,t){t&&s.push(e)}),s.length>0?s.join(" "):!1},nextPosition:function(e){switch(e){case"top left":e="bottom left";break;case"bottom left":e="top right";break;case"top right":e="bottom right";break;case"bottom right":e="top center";break;case"top center":e="bottom center";break;case"bottom center":e="right center";break;case"right center":e="left center";break;case"left center":e="top center"}return e}},set:{position:function(o,a){var s,c,l=(e(t).width(),e(t).height(),S.outerWidth()),u=S.outerHeight(),d=n.outerWidth(),m=n.outerHeight(),f=r.outerWidth(),v=r.outerHeight(),x=p.distanceAway,w=S[0],C=p.inline?parseInt(t.getComputedStyle(w).getPropertyValue("margin-top"),10):0,k=p.inline?parseInt(t.getComputedStyle(w).getPropertyValue("margin-left"),10):0,A=p.inline||p.popup?S.position():S.offset();switch(o=o||T.data(y.position)||p.position,a=a||T.data(y.offset)||p.offset,p.inline&&(g.debug("Adding targets margin to calculation"),"left center"==o||"right center"==o?(a+=C,x+=-k):"top left"==o||"top center"==o||"top right"==o?(a+=k,x-=C):(a+=k,x+=C)),g.debug("Calculating popup positioning",o),o){case"top left":s={top:"auto",bottom:v-A.top+x,left:A.left+a,right:"auto"};break;case"top center":s={bottom:v-A.top+x,left:A.left+l/2-d/2+a,top:"auto",right:"auto"};break;case"top right":s={bottom:v-A.top+x,right:f-A.left-l-a,top:"auto",left:"auto"};break;case"left center":s={top:A.top+u/2-m/2+a,right:f-A.left+x,left:"auto",bottom:"auto"};break;case"right center":s={top:A.top+u/2-m/2+a,left:A.left+l+x,bottom:"auto",right:"auto"};break;case"bottom left":s={top:A.top+u+x,left:A.left+a,bottom:"auto",right:"auto"};break;case"bottom center":s={top:A.top+u+x,left:A.left+l/2-d/2+a,bottom:"auto",right:"auto"};break;case"bottom right":s={top:A.top+u+x,right:f-A.left-l-a,left:"auto",bottom:"auto"}}return s===i&&g.error(h.invalidPosition),n.css(s).removeClass(b.position).addClass(o).addClass(b.loading),c=g.get.offstagePosition(o),c?(g.debug("Element is outside boundaries",c),P<p.maxSearchDepth?(o=g.get.nextPosition(o),P++,g.debug("Trying new position",o),n?g.set.position(o):!1):(g.debug("Popup could not find a position onstage",n),P=0,g.reset(),n.removeClass(b.loading),!1)):(g.debug("Position is on stage",o),P=0,p.setFluidWidth&&n.hasClass(b.fluid)&&n.css("width",r.width()),n.removeClass(b.loading),!0)},visible:function(){T.addClass(b.visible)}},remove:{visible:function(){T.removeClass(b.visible)}},bind:{popup:function(){g.verbose("Allowing hover events on popup to prevent closing"),n&&n.size()>0&&n.on("mouseenter"+w,g.event.start).on("mouseleave"+w,g.event.end)},close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully),k.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully)),"click"==p.on&&p.closable&&(g.verbose("Binding popup close event to document"),s.on("click"+w,function(t){g.verbose("Pop-up clickaway intent detected"),e.proxy(g.hideGracefully,E)(t)}))}},unbind:{close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.off("scroll"+w,g.hide),k.off("scroll"+w,g.hide)),"click"==p.on&&p.closable&&(g.verbose("Removing close event from document"),s.off("click"+w))}},is:{active:function(){return T.hasClass(b.active)},animating:function(){return n&&n.is(":animated")||n.hasClass(b.animating)},visible:function(){return n&&n.is(":visible")},dropdown:function(){return T.hasClass(b.dropdown)},hidden:function(){return!g.is.visible()}},reset:function(){g.remove.visible(),p.preserve||p.popup?e.fn.transition!==i&&n.transition("remove transition"):g.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;l=!1,clearTimeout(g.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||f,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},m?(F===i&&g.initialize(),g.invoke(d)):(F!==i&&g.destroy(),g.initialize())}),a!==i?a:this},e.fn.popup.settings={name:"Popup",debug:!1,verbose:!0,performance:!0,namespace:"popup",onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onHidden:function(){},variation:"",content:!1,html:!1,title:!1,on:"hover",closable:!0,hideOnScroll:"auto",context:"body",position:"top left",delay:{show:30,hide:0},setFluidWidth:!0,target:!1,popup:!1,inline:!1,preserve:!0,hoverable:!1,duration:200,easing:"easeOutQuint",transition:"scale",distanceAway:0,offset:0,maxSearchDepth:10,error:{invalidPosition:"The position you specified is not a valid position",method:"The method you called is not defined."},metadata:{content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},popup:function(t){var n="",o=e.fn.popup.settings.templates.escape;return typeof t!==i&&(typeof t.title!==i&&t.title&&(t.title=o(t.title),n+='<div class="header">'+t.title+"</div>"),typeof t.content!==i&&t.content&&(t.content=o(t.content),n+='<div class="content">'+t.content+"</div>")),n}}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=("ontouchstart"in n.documentElement,(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var n,a=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),m=a.className,f=a.metadata,g=a.namespace,p=a.selector,v=a.error,b="module-"+g,h=e(this),y=e(this).find(p.bar),x=e(this).find(p.progress),w=e(this).find(p.label),C=this,T=h.data(b);n={initialize:function(){n.debug("Initializing progress",a),n.read.metadata(),n.set.initials(),n.instantiate()},instantiate:function(){n.verbose("Storing instance of progress",n),T=n,h.data(b,n)},destroy:function(){n.verbose("Destroying previous dropdown for",h),h.removeData(b),T=i},reset:function(){n.set.percent(0)},complete:function(){(n.percent===i||n.percent<100)&&n.set.percent(100)},read:{metadata:function(){h.data(f.percent)&&(n.verbose("Current percent value set from metadata"),n.percent=h.data(f.percent)),h.data(f.total)&&(n.verbose("Total value set from metadata"),n.total=h.data(f.total)),h.data(f.value)&&(n.verbose("Current value set from metadata"),n.value=h.data(f.value))
},currentValue:function(){return n.value!==i?n.value:!1}},increment:function(e){var t,i,o,a=n.total||!1;a?(i=n.value||0,e=e||1,o=i+e,t=n.total,n.debug("Incrementing value by",e,i,t),o>t&&(n.debug("Value cannot increment above total",t),o=t),n.set.progress(o)):(i=n.percent||0,e=e||n.get.randomValue(),o=i+e,t=100,n.debug("Incrementing percentage by",e,i),o>t&&(n.debug("Value cannot increment above 100 percent"),o=t),n.set.progress(o))},decrement:function(e){var t,i,o=n.total||!1,a=0;o?(t=n.value||0,e=e||1,i=t-e,n.debug("Decrementing value by",e,t)):(t=n.percent||0,e=e||n.get.randomValue(),i=t-e,n.debug("Decrementing percentage by",e,t)),a>i&&(n.debug("Value cannot decrement below 0"),i=0),n.set.progress(i)},get:{text:function(e){var t=n.value||0,i=n.total||0,o=n.percent||0;return e=e||"",e=e.replace("{value}",t).replace("{total}",i).replace("{percent}",o),n.debug("Adding variables to progress bar text",e),e},randomValue:function(){return n.debug("Generating random increment percentage"),Math.floor(Math.random()*a.random.max+a.random.min)},percent:function(){return n.percent||0},value:function(){return n.value||!1},total:function(){return n.total||!1}},is:{success:function(){return h.hasClass(m.success)},warning:function(){return h.hasClass(m.warning)},error:function(){return h.hasClass(m.error)}},remove:{active:function(){n.verbose("Removing active state"),h.removeClass(m.active)},success:function(){n.verbose("Removing success state"),h.removeClass(m.success)},warning:function(){n.verbose("Removing warning state"),h.removeClass(m.warning)},error:function(){n.verbose("Removing error state"),h.removeClass(m.error)}},set:{barWidth:function(e){e>100&&n.error(v.tooHigh,e),y.css("width",e+"%")},initials:function(){a.value&&(n.verbose("Current value set in settings",a.value),n.value=a.value),a.total&&(n.verbose("Current total set in settings",a.total),n.total=a.total),a.percent&&(n.verbose("Current percent set in settings",a.percent),n.percent=a.percent),n.percent?n.set.percent(n.percent):n.value&&n.set.progress(n.value)},percent:function(t){t="string"==typeof t?+t.replace("%",""):t,t>0&&1>t&&(n.verbose("Module percentage passed as decimal, converting"),t=100*t),t=Math.round(0===a.precision?t:10*t*a.precision/(10*a.precision)),n.percent=t,n.total&&(n.value=Math.round(t/100*n.total)),n.set.barWidth(t),n.set.barLabel(),100===t?!a.autoSuccess||n.is.warning()||n.is.error()?n.remove.active():(n.set.success(),n.debug("Automatically triggering success at 100%")):n.set.active(),e.proxy(a.onChange,C)(t,n.value,n.total)},label:function(e){e=e||"",e&&(e=n.get.text(e),n.debug("Setting label to text",e),w.text(e))},barLabel:function(e){e!==i?x.text(n.get.text(e)):"ratio"==a.label&&n.total?(n.debug("Adding ratio to bar label"),x.text(n.get.text(a.text.ratio))):"percent"==a.label&&(n.debug("Adding percentage to bar label"),x.text(n.get.text(a.text.percent)))},active:function(t){t=t||a.text.active,n.debug("Setting active state"),a.showActivity&&h.addClass(m.active),n.remove.warning(),n.remove.error(),n.remove.success(),t&&n.set.label(t),e.proxy(a.onActive,C)(n.value,n.total)},success:function(t){t=t||a.text.success,n.debug("Setting success state"),h.addClass(m.success),n.remove.active(),n.remove.warning(),n.remove.error(),n.complete(),t&&n.set.label(t),e.proxy(a.onSuccess,C)(n.total)},warning:function(t){t=t||a.text.warning,n.debug("Setting warning state"),h.addClass(m.warning),n.remove.active(),n.remove.success(),n.remove.error(),n.complete(),t&&n.set.label(t),e.proxy(a.onWarning,C)(n.value,n.total)},error:function(t){t=t||a.text.error,n.debug("Setting error state"),h.addClass(m.error),n.remove.active(),n.remove.success(),n.remove.warning(),n.complete(),t&&n.set.label(t),e.proxy(a.onError,C)(n.value,n.total)},total:function(e){n.total=e},progress:function(e){var t,i="string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e;i||n.error(v.nonNumeric),n.total?(n.value=i,t=i/n.total*100,n.debug("Calculating percent complete from total",t),n.set.percent(t)):(t=i,n.debug("Setting value to exact percentage value",t),n.set.percent(t))}},setting:function(t,o){if(n.debug("Changing setting",t,o),e.isPlainObject(t))e.extend(!0,a,t);else{if(o===i)return a[t];a[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(o===i)return n[t];n[t]=o}},debug:function(){a.debug&&(a.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,a.name+":"),n.debug.apply(console,arguments)))},verbose:function(){a.verbose&&a.debug&&(a.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,a.name+":"),n.verbose.apply(console,arguments)))},error:function(){n.error=Function.prototype.bind.call(console.error,console,a.name+":"),n.error.apply(console,arguments)},performance:{log:function(e){var t,i,o;a.performance&&(t=(new Date).getTime(),o=s||t,i=t-o,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,100)},display:function(){var t=a.name+":",o=0;s=!1,clearTimeout(n.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,a,r){var s,c,l,u=T;return a=a||d,r=C||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(o,a){var r=o!=s?a+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(u[r])&&o!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||o==s)return u[a]!==i?(c=u[a],!1):(n.error(v.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,a):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(T===i&&n.initialize(),n.invoke(l)):(T!==i&&n.destroy(),n.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!0,performance:!0,random:{min:2,max:5},autoSuccess:!0,showActivity:!0,label:"percent",precision:1,percent:!1,total:!1,value:!1,onChange:function(){},onSuccess:function(){},onActive:function(){},onError:function(){},onWarning:function(){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return o.each(function(){var d,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),f=m.namespace,g=m.className,p=m.metadata,v=m.selector,b=(m.error,"."+f),h="module-"+f,y=this,x=e(this).data(h),w=e(this),C=w.find(v.icon);d={initialize:function(){d.verbose("Initializing rating module",m),0===C.size()&&d.setup.layout(),m.interactive?d.enable():d.disable(),m.initialRating&&(d.debug("Setting initial rating"),d.setRating(m.initialRating)),w.data(p.rating)&&(d.debug("Rating found in metadata"),d.setRating(w.data(p.rating))),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",m),x=d,w.data(h,d)},destroy:function(){d.verbose("Destroying previous instance",x),w.removeData(h),C.off(b)},refresh:function(){C=w.find(v.icon)},setup:{layout:function(){var t=w.data(p.maxRating)||m.maxRating;d.debug("Generating icon html dynamically"),w.html(e.fn.rating.settings.templates.icon(t)),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),w.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){w.removeClass(g.selected),C.removeClass(g.selected)},click:function(){var t=e(this),n=d.getRating(),i=C.index(t)+1,o="auto"==m.clearable?1===C.size():m.clearable;o&&n==i?d.clearRating():d.setRating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.setRating(0)},getRating:function(){var e=C.filter("."+g.active).size();return d.verbose("Current rating retrieved",e),e},enable:function(){d.debug("Setting rating to interactive mode"),C.on("mouseenter"+b,d.event.mouseenter).on("mouseleave"+b,d.event.mouseleave).on("click"+b,d.event.click),w.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),C.off(b),w.addClass(g.disabled)},setRating:function(t){var n=t-1>=0?t-1:0,i=C.eq(n);w.removeClass(g.selected),C.removeClass(g.selected).removeClass(g.active),t>0&&(d.verbose("Setting current rating to",t),i.prevAll().andSelf().addClass(g.active)),e.proxy(m.onRate,y)(t)},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(n===i)return d[t];d[t]=n}},debug:function(){m.debug&&(m.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,m.name+":"),d.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,m.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,100)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.size()>1&&(t+=" ("+o.size()+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,c,l=x;return o=o||u,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,o):s!==i&&(c=s),e.isArray(n)?n.push(c):n!==i?n=[n,c]:c!==i&&(n=c),s}},l?(x===i&&d.initialize(),d.invoke(c)):(x!==i&&d.destroy(),d.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",debug:!1,verbose:!0,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",onRate:function(){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";e>=t;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.search=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return e(this).each(function(){var m,f=e.extend(!0,{},e.fn.search.settings,n),g=f.className,p=f.selector,v=f.error,b=f.namespace,h="."+b,y=b+"-module",x=e(this),w=x.find(p.prompt),C=x.find(p.searchButton),T=x.find(p.results),k=(x.find(p.result),x.find(p.category),this),S=x.data(y);m={initialize:function(){m.verbose("Initializing module");var e=w[0],t=e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup";f.automatic&&w.on(t+h,m.search.throttle),w.on("focus"+h,m.event.focus).on("blur"+h,m.event.blur).on("keydown"+h,m.handleKeyboard),C.on("click"+h,m.search.query),T.on("mousedown"+h,m.event.mousedown).on("mouseup"+h,m.event.mouseup).on("click"+h,p.result,m.results.select),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),S=m,x.data(y,m)},destroy:function(){m.verbose("Destroying instance"),x.removeData(y),w.off(h),C.off(h),T.off(h)},event:{focus:function(){x.addClass(g.focus),clearTimeout(m.timer),m.search.throttle(),m.has.minimum()&&m.results.show()},mousedown:function(){m.resultsClicked=!0},mouseup:function(){m.resultsClicked=!1},blur:function(){m.search.cancel(),x.removeClass(g.focus),m.resultsClicked||(m.timer=setTimeout(m.results.hide,f.hideDelay))}},handleKeyboard:function(t){var n,i=x.find(p.result),o=x.find(p.category),a=t.which,r={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40},s=g.active,c=i.index(i.filter("."+s)),l=i.size();if(a==r.escape&&(m.verbose("Escape key pressed, blurring search field"),w.trigger("blur")),T.filter(":visible").size()>0)if(a==r.enter){if(m.verbose("Enter key pressed, selecting active result"),i.filter("."+s).size()>0)return e.proxy(m.results.select,i.filter("."+s))(t),t.preventDefault(),!1}else a==r.upArrow?(m.verbose("Up key pressed, changing active result"),n=0>c-1?c:c-1,o.removeClass(s),i.removeClass(s).eq(n).addClass(s).closest(o).addClass(s),t.preventDefault()):a==r.downArrow&&(m.verbose("Down key pressed, changing active result"),n=c+1>=l?c:c+1,o.removeClass(s),i.removeClass(s).eq(n).addClass(s).closest(o).addClass(s),t.preventDefault());else a==r.enter&&(m.verbose("Enter key pressed, executing query"),m.search.query(),C.addClass(g.down),w.one("keyup",function(){C.removeClass(g.down)}))},has:{minimum:function(){var e=w.val(),t=e.length;return t>=f.minCharacters}},search:{cancel:function(){var e=x.data("xhr")||!1;e&&"resolved"!=e.state()&&(m.debug("Cancelling last search"),e.abort())},throttle:function(){clearTimeout(m.timer),m.has.minimum()?m.timer=setTimeout(m.search.query,f.searchDelay):m.results.hide()},query:function(){var t=w.val(),n=m.search.cache.read(t);n?(m.debug("Reading result for '"+t+"' from cache"),m.results.add(n)):(m.debug("Querying for '"+t+"'"),e.isPlainObject(f.source)||e.isArray(f.source)?m.search.local(t):f.apiSettings?m.search.remote(t):e.fn.api!==i&&e.api.settings.api.search!==i?(m.debug("Searching with default search API endpoint"),f.apiSettings={action:"search"},m.search.remote(t)):m.error(v.source),e.proxy(f.onSearchQuery,x)(t))},local:function(t){var n,i=[],o=[],a=e.isArray(f.searchFields)?f.searchFields:[f.searchFields],r=new RegExp("(?:s|^)"+t,"i"),s=new RegExp(t,"i");x.addClass(g.loading),e.each(a,function(t,n){e.each(f.source,function(t,a){var c="string"==typeof a[n],l=-1==e.inArray(a,i)&&-1==e.inArray(a,o);c&&l&&(r.test(a[n])?i.push(a):f.searchFullText&&s.test(a[n])&&o.push(a))})}),n=m.results.generate({results:e.merge(i,o)}),x.removeClass(g.loading),m.search.cache.write(t,n),m.results.add(n)},remote:function(t){var n,i={stateContext:x,urlData:{query:t},onSuccess:function(e){n=m.results.generate(e),m.search.cache.write(t,n),m.results.add(n)},onFailure:m.error};m.search.cancel(),m.debug("Executing search"),e.extend(!0,i,f.apiSettings),e.api(i)},cache:{read:function(e){var t=x.data("cache");return f.cache&&"object"==typeof t&&t[e]!==i?t[e]:!1},write:function(e,t){var n=x.data("cache")!==i?x.data("cache"):{};n[e]=t,x.data("cache",n)}}},results:{generate:function(t){m.debug("Generating html from response",t);var n=f.templates[f.type],i="";return e.isPlainObject(t.results)&&!e.isEmptyObject(t.results)||e.isArray(t.results)&&t.results.length>0?(f.maxResults>0&&(t.results=e.isArray(t.results)?t.results.slice(0,f.maxResults):t.results),e.isFunction(n)?i=n(t):m.error(v.noTemplate,!1)):i=m.message(v.noResults,"empty"),e.proxy(f.onResults,x)(t),i},add:function(t){("default"==f.onResultsAdd||"default"==e.proxy(f.onResultsAdd,T)(t))&&T.html(t),m.results.show()},show:function(){0===T.filter(":visible").size()&&w.filter(":focus").size()>0&&""!==T.html()&&(f.transition&&e.fn.transition!==i&&x.transition("is supported")&&!T.transition("is inward")?(m.debug("Showing results with css animations"),T.transition({animation:f.transition+" in",duration:f.duration,queue:!0})):(m.debug("Showing results with javascript"),T.stop().fadeIn(f.duration,f.easing)),e.proxy(f.onResultsOpen,T)())},hide:function(){T.filter(":visible").size()>0&&(f.transition&&e.fn.transition!==i&&x.transition("is supported")&&!T.transition("is outward")?(m.debug("Hiding results with css animations"),T.transition({animation:f.transition+" out",duration:f.duration,queue:!0})):(m.debug("Hiding results with javascript"),T.stop().fadeIn(f.duration,f.easing)),e.proxy(f.onResultsClose,T)())},select:function(n){m.debug("Search result selected");{var i=e(this),o=i.find(".title");o.html()}if("default"==f.onSelect||"default"==e.proxy(f.onSelect,this)(n)){var a=i.find("a[href]").eq(0),o=i.find(p.title).eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,c=o.size()>0?o.text():!1;m.results.hide(),c&&w.val(c),r&&("_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)}}},message:function(e,t){return t=t||"standard",m.results.add(f.templates.message(e,t)),f.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.size()>1&&(t+=" ("+a.size()+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||d,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(S===i&&m.initialize(),m.invoke(l)):(S!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.search.settings={name:"Search Module",namespace:"search",debug:!1,verbose:!0,performance:!0,apiSettings:!1,type:"standard",minCharacters:1,source:!1,searchFields:["title","description"],searchFullText:!0,automatic:"true",hideDelay:0,searchDelay:300,maxResults:7,cache:!0,transition:"scale",duration:300,easing:"easeOutExpo",onSelect:"default",onResultsAdd:"default",onSearchQuery:function(){},onResults:function(){},onResultsOpen:function(){},onResultsClose:function(){},className:{active:"active",down:"down",focus:"focus",empty:"empty",loading:"loading"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noTemplate:"A valid template name was not specified.",serverError:"There was an issue with querying the server.",method:"The method you called is not defined."},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t){var n="",o=e.fn.search.settings.templates.escape;return t.results!==i?(e.each(t.results,function(t,a){a.results!==i&&a.results.length>0&&(n+='<div class="category"><div class="name">'+a.name+"</div>",e.each(a.results,function(e,t){n+='<div class="result">',t.url&&(n+='<a href="'+t.url+'"></a>'),t.image!==i&&(t.image=o(t.image),n+='<div class="image"> <img src="'+t.image+'" alt=""></div>'),n+='<div class="content">',t.price!==i&&(t.price=o(t.price),n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(t.title=o(t.title),n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div></div>"}),n+="</div>")}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1},standard:function(t){var n="";return t.results!==i?(e.each(t.results,function(e,t){n+=t.url?'<a class="result" href="'+t.url+'">':'<a class="result">',t.image!==i&&(n+='<div class="image"> <img src="'+t.image+'"></div>'),n+='<div class="content">',t.price!==i&&(n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div>",n+="</a>"}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,f,g,p=r.selector||"",v=e.extend(!0,{},e.fn.shape.settings,o),b=v.namespace,h=v.selector,y=v.error,x=v.className,w="."+b,C="module-"+b,T=e(this),k=T.find(h.sides),S=T.find(h.side),A=!1,z=this,P=T.data(C);g={initialize:function(){g.verbose("Initializing module for",z),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,T.data(C,P)},destroy:function(){g.verbose("Destroying previous module for",z),T.removeData(C).off(w)},refresh:function(){g.verbose("Refreshing selector cache for",z),T=e(z),k=e(this).find(h.shape),S=e(this).find(h.side)},repaint:function(){g.verbose("Forcing repaint event");{var e=k.get(0)||n.createElement("div");e.offsetWidth}},animate:function(n,o){g.verbose("Animating box with properties",n),o=o||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},e.proxy(v.beforeChange,f[0])(),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),T.addClass(x.animating),k.css(n).one(g.get.transitionEvent(),o),g.set.duration(v.duration),m(function(){T.addClass(x.animating),t.addClass(x.hidden)})):o()},queue:function(e){g.debug("Queueing animation of",e),k.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){T.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),T.removeClass(x.animating).attr("style","").removeAttr("style"),k.attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style").removeClass(x.hidden),f.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return S.filter("."+x.active)[0]==f[0]},animating:function(){return T.hasClass(x.animating)}},set:{defaultSide:function(){t=T.find("."+v.className.active),f=t.next(h.side).size()>0?t.next(h.side):T.find(h.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",f)},duration:function(e){e=e||v.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting animation duration",e),k.add(S).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},stageSize:function(){var e=T.clone().addClass(x.loading),t=e.find("."+v.className.active),n=A?e.find(h.side).eq(A):t.next(h.side).size()>0?t.next(h.side):e.find(h.side).first(),i={};t.removeClass(x.active),n.addClass(x.active),e.insertAfter(T),i={width:n.outerWidth(),height:n.outerHeight()},e.remove(),T.css(i),g.verbose("Resizing stage to fit new content",i)},nextSide:function(e){A=e,f=S.filter(e),A=S.index(f),0===f.size()&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",f)},active:function(){g.verbose("Setting new side to active",f),S.removeClass(x.active),f.addClass(x.active),e.proxy(v.onChange,f[0])(),g.set.defaultSide()}},flip:{up:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip up"):(g.debug("Flipping up",f),g.set.stageSize(),g.stage.above(),g.animate(g.get.transform.up()))):void g.debug("Side already visible",f)},down:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip down"):(g.debug("Flipping down",f),g.set.stageSize(),g.stage.below(),g.animate(g.get.transform.down()))):void g.debug("Side already visible",f)},left:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip left"):(g.debug("Flipping left",f),g.set.stageSize(),g.stage.left(),g.animate(g.get.transform.left()))):void g.debug("Side already visible",f)},right:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip right"):(g.debug("Flipping right",f),g.set.stageSize(),g.stage.right(),g.animate(g.get.transform.right()))):void g.debug("Side already visible",f)},over:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over()))):void g.debug("Side already visible",f)},back:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back()))):void g.debug("Side already visible",f)}},get:{transform:{up:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(-90deg)"}},down:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(90deg)"}},left:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(90deg)"}},right:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(-90deg)"}},over:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(180deg)"}},back:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(h.side).size()>0?t.next(h.side):T.find(h.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as above",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as below",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-90deg) translateZ("+e.depth.next+"px)"})},right:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(90deg) translateZ("+e.depth.next+"px)"})},behind:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as behind",f,e),t.css({transform:"rotateY(0deg)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.size()>1&&(t+=" ("+r.size()+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||d,o=z||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},u?(P===i&&g.initialize(),g.invoke(l)):(P!==i&&g.destroy(),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",debug:!1,verbose:!0,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:700,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}
}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sidebar=function(o){var a,r=e(this),s=e("head"),c=r.selector||"",l=(new Date).getTime(),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1),g=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,p,v,b,h=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),y=h.selector,x=h.className,w=h.namespace,C=h.error,T="."+w,k="module-"+w,S=e(this),A=e(h.context),z=S.children(y.sidebar),P=A.children(y.pusher),E=this,F=S.data(k);b={initialize:function(){b.debug("Initializing sidebar",o),v=b.get.transitionEvent(),(b.is.legacy()||h.legacy)&&(h.transition="overlay",h.useLegacy=!0),g(b.setup.layout),b.instantiate()},instantiate:function(){b.verbose("Storing instance of module",b),F=b,S.data(k,b)},destroy:function(){b.verbose("Destroying previous module for",S),b.remove.direction(),S.off(T).removeData(k)},event:{clickaway:function(t){0===e(t.target).closest(y.sidebar).size()&&(b.verbose("User clicked on dimmed page"),b.hide())},touch:function(){},containScroll:function(){E.scrollTop<=0&&(E.scrollTop=1),E.scrollTop+E.offsetHeight>=E.scrollHeight&&(E.scrollTop=E.scrollHeight-E.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(y.sidebar).size()&&t.preventDefault()}},bind:{clickaway:function(){h.scrollLock&&e(t).on("DOMMouseScroll"+T,b.event.scroll),e(n).on("touchmove"+T,b.event.touch),S.on("scroll"+T,b.event.containScroll),h.closable&&A.on("click"+T,b.event.clickaway).on("touchend"+T,b.event.clickaway)}},unbind:{clickaway:function(){A.off(T),P.off(T),e(n).off(T),e(t).off(T)}},add:{bodyCSS:function(){var t,n=S.outerWidth(),i=S.outerHeight();t='<style title="'+w+'"> .ui.visible.left.sidebar ~ .fixed, .ui.visible.left.sidebar ~ .pusher {   -webkit-transform: translate3d('+n+"px, 0, 0);           transform: translate3d("+n+"px, 0, 0); } .ui.visible.right.sidebar ~ .fixed, .ui.visible.right.sidebar ~ .pusher {   -webkit-transform: translate3d(-"+n+"px, 0, 0);           transform: translate3d(-"+n+"px, 0, 0); } .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .fixed, .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher, .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .fixed, .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); } .ui.visible.top.sidebar ~ .fixed, .ui.visible.top.sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+i+"px, 0);           transform: translate3d(0, "+i+"px, 0); } .ui.visible.bottom.sidebar ~ .fixed, .ui.visible.bottom.sidebar ~ .pusher {   -webkit-transform: translate3d(0, -"+i+"px, 0);           transform: translate3d(0, -"+i+"px, 0); }",b.is.ie()&&(t+=" .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d("+n+"px, 0, 0);           transform: translate3d("+n+"px, 0, 0); } .ui.visible.right.sidebar ~ .pusher:after {   -webkit-transform: translate3d(-"+n+"px, 0, 0);           transform: translate3d(-"+n+"px, 0, 0); } .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); } .ui.visible.top.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+i+"px, 0);           transform: translate3d(0, "+i+"px, 0); } .ui.visible.bottom.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, -"+i+"px, 0);           transform: translate3d(0, -"+i+"px, 0); }"),t+="</style>",s.append(t),r=e("style[title="+w+"]"),b.debug("Adding sizing css to head",r)}},refresh:function(){b.verbose("Refreshing selector cache"),A=e(h.context),z=A.children(y.sidebar),P=A.children(y.pusher)},repaint:function(){b.verbose("Forcing repaint event"),E.style.display="none",E.offsetHeight,E.scrollTop=E.scrollTop,E.style.display=""},setup:{layout:function(){0===A.children(y.pusher).size()&&(b.debug("Adding wrapper element for sidebar"),b.error(C.pusher),P=e('<div class="pusher" />'),A.children().not(y.omitted).not(z).wrapAll(P),b.refresh()),(0==S.nextAll(y.pusher).size()||S.nextAll(y.pusher)[0]!==P[0])&&(b.debug("Moved sidebar to correct parent element"),b.error(C.movedSidebar,E),S.detach().prependTo(A),b.refresh()),b.set.pushable(),b.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(b[n])?b[n]:b.toggle,i.size()>0?(b.debug("Attaching sidebar events to element",t,n),i.on("click"+T,n)):b.error(C.notFound,t)},show:function(t){var n=h.useLegacy?b.legacyPushPage:b.pushPage;t=e.isFunction(t)?t:function(){},b.is.closed()?(h.overlay&&(b.error(C.overlay),h.transition="overlay"),b.refresh(),b.othersVisible()&&"overlay"!=b.get.transition()&&(b.debug("Other sidebars currently open"),h.exclusive&&b.hideOthers()),n(function(){e.proxy(t,E)(),e.proxy(h.onShow,E)()}),e.proxy(h.onChange,E)(),e.proxy(h.onVisible,E)()):b.debug("Sidebar is already visible")},hide:function(t){var n=h.useLegacy?b.legacyPullPage:b.pullPage;t=e.isFunction(t)?t:function(){},(b.is.visible()||b.is.animating())&&(b.debug("Hiding sidebar",t),n(function(){e.proxy(t,E)(),e.proxy(h.onHidden,E)()}),e.proxy(h.onChange,E)(),e.proxy(h.onHide,E)())},othersVisible:function(){return z.not(S).filter("."+x.visible).size()>0},othersActive:function(){return z.not(S).filter("."+x.active).size()>0},hideOthers:function(e){var t=z.not(S).filter("."+x.visible),e=e||function(){},n=t.size(),i=0;t.sidebar("hide",function(){i++,i==n&&e()})},toggle:function(){b.verbose("Determining toggled direction"),b.is.closed()?b.show():b.hide()},pushPage:function(t){var n,i,o=b.get.transition(),a="safe"==o?A:"overlay"==o||b.othersActive()?S:P;t=e.isFunction(t)?t:function(){},("scale down"==h.transition||b.is.mobile()&&"overlay"!==o)&&b.scrollToTop(),b.set.transition(),b.repaint(),n=function(){b.add.bodyCSS(),b.set.animating(),b.set.visible(),b.othersActive()||h.dimPage&&P.addClass(x.dimmed)},i=function(n){n.target==a[0]&&(a.off(v+T,i),b.remove.animating(),b.bind.clickaway(),e.proxy(t,E)())},a.on(v+T,i),g(n)},pullPage:function(t){var n,i,o=b.get.transition(),a="safe"==o?A:"overlay"==o||b.othersActive()?S:P;t=e.isFunction(t)?t:function(){},b.verbose("Removing context push state",b.get.direction()),b.othersActive()||b.unbind.clickaway(),n=function(){b.set.animating(),b.remove.visible(),h.dimPage&&!b.othersActive()&&P.removeClass(x.dimmed)},i=function(n){n.target==a[0]&&(a.off(v+T,i),b.remove.animating(),b.remove.transition(),b.remove.bodyCSS(),("scale down"==o||h.returnScroll&&b.is.mobile())&&b.scrollBack(),e.proxy(t,E)())},a.on(v+T,i),g(n)},legacyPushPage:function(t){var n=S.width(),i=b.get.direction(),o={};n=n||S.width(),t=e.isFunction(t)?t:function(){},o[i]=n,b.debug("Using javascript to push context",o),b.set.visible(),b.set.transition(),b.set.animating(),h.dimPage&&P.addClass(x.dimmed),A.css("position","relative").animate(o,h.duration,h.easing,function(){b.remove.animating(),b.bind.clickaway(),e.proxy(t,b)()})},legacyPullPage:function(t){var n=0,i=b.get.direction(),o={};n=n||S.width(),t=e.isFunction(t)?t:function(){},o[i]="0px",b.debug("Using javascript to pull context",o),b.unbind.clickaway(),b.set.animating(),b.remove.visible(),h.dimPage&&!b.othersVisible()&&P.removeClass(x.dimmed),A.css("position","relative").animate(o,h.duration,h.easing,function(){b.remove.animating(),e.proxy(t,b)()})},scrollToTop:function(){b.verbose("Scrolling to top of page to avoid animation issues"),p=e(t).scrollTop(),S.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){b.verbose("Scrolling back to original page position"),t.scrollTo(0,p)},set:{pushed:function(){A.addClass(x.pushed)},pushable:function(){A.addClass(x.pushable)},active:function(){S.addClass(x.active)},animating:function(){S.addClass(x.animating)},transition:function(e){e=e||b.get.transition(),S.addClass(e)},direction:function(e){e=e||b.get.direction(),S.addClass(x[e])},visible:function(){S.addClass(x.visible)},overlay:function(){S.addClass(x.overlay)}},remove:{bodyCSS:function(){b.debug("Removing body css styles",r),r.size()>0&&r.remove()},pushed:function(){A.removeClass(x.pushed)},pushable:function(){A.removeClass(x.pushable)},active:function(){S.removeClass(x.active)},animating:function(){S.removeClass(x.animating)},transition:function(e){e=e||b.get.transition(),S.removeClass(e)},direction:function(e){e=e||b.get.direction(),S.removeClass(x[e])},visible:function(){S.removeClass(x.visible)},overlay:function(){S.removeClass(x.overlay)}},get:{direction:function(){return S.hasClass(x.top)?x.top:S.hasClass(x.right)?x.right:S.hasClass(x.bottom)?x.bottom:x.left},transition:function(){var e=b.get.direction();return b.is.mobile()?"auto"==h.mobileTransition?h.defaultTransition.mobile[e]:h.mobileTransition:"auto"==h.transition?h.defaultTransition.computer[e]:h.transition},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]}},is:{ie:function(){var e=!t.ActiveXObject&&"ActiveXObject"in t,n="ActiveXObject"in t;return e||n},legacy:function(){var e,o=n.createElement("div"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};n.body.insertBefore(o,null);for(var r in a)o.style[r]!==i&&(o.style[r]="translate3d(1px,1px,1px)",e=t.getComputedStyle(o).getPropertyValue(a[r]));return n.body.removeChild(o),!(e!==i&&e.length>0&&"none"!==e)},mobile:function(){var e=navigator.userAgent,t=/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/,n=t.test(e);return n?(b.verbose("Browser was found to be mobile",e),!0):(b.verbose("Browser is not mobile, using regular transition",e),!1)},closed:function(){return!b.is.visible()},visible:function(){return S.hasClass(x.visible)},vertical:function(){return S.hasClass(x.top)},animating:function(){return A.hasClass(x.animating)}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];h[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){h.debug&&(h.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,h.name+":"),b.debug.apply(console,arguments)))},verbose:function(){h.verbose&&h.debug&&(h.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,h.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;h.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,100)},display:function(){var t=h.name+":",n=0;l=!1,clearTimeout(b.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||f,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(b.error(C.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},m?(F===i&&b.initialize(),b.invoke(d)):(F!==i&&b.invoke("destroy"),b.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",debug:!1,verbose:!0,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,useLegacy:!1,duration:500,easing:"easeInOutQuint",onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}},e.extend(e.easing,{easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n}})}(jQuery,window,document),function(e,t,n,i){e.site=e.fn.site=function(o){var a,r,s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=e.isPlainObject(o)?e.extend(!0,{},e.site.settings,o):e.extend({},e.site.settings),f=m.namespace,g=m.error,p="module-"+f,v=e(n),b=v,h=this,y=b.data(p);return a={initialize:function(){a.instantiate()},instantiate:function(){a.verbose("Storing instance of site",a),y=a,b.data(p,a)},normalize:function(){a.fix.console(),a.fix.requestAnimationFrame()},fix:{console:function(){a.debug("Normalizing window.console"),(console===i||console.log===i)&&(a.verbose("Console not available, normalizing events"),a.disable.console()),("undefined"==typeof console.group||"undefined"==typeof console.groupEnd||"undefined"==typeof console.groupCollapsed)&&(a.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),"undefined"==typeof console.markTimeline&&(a.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){a.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){a.debug("Normalizing requestAnimationFrame"),t.requestAnimationFrame===i&&(a.debug("RequestAnimationFrame not available, normailizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return e.fn[t]!==i&&e.fn[t].settings!==i},enabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,o,r){o="string"==typeof o?"all"===o?m.modules:[o]:o||m.modules,r=r!==i?r:!0,e.each(o,function(i,o){var s,c=a.moduleExists(o)?e.fn[o].settings.namespace||!1:!0;a.moduleExists(o)&&(a.verbose("Changing default setting",t,n,o),e.fn[o].settings[t]=n,r&&c&&(s=e(":data(module-"+c+")"),s.size()>0&&(a.verbose("Modifying existing settings",s),s[o]("setting",t,n))))})},settings:function(t,n,o){n="string"==typeof n?[n]:n||m.modules,o=o!==i?o:!0,e.each(n,function(n,i){var r;a.moduleExists(i)&&(a.verbose("Changing default setting",t,i),e.extend(!0,e.fn[i].settings,t),o&&f&&(r=e(":data(module-"+f+")"),r.size()>0&&(a.verbose("Modifying existing settings",r),r[i]("setting",t))))})}},enable:{console:function(){a.console(!0)},debug:function(e,t){e=e||m.modules,a.debug("Enabling debug for modules",e),a.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Enabling verbose debug for modules",e),a.change.setting("verbose",!0,e,t)}},disable:{console:function(){a.console(!1)},debug:function(e,t){e=e||m.modules,a.debug("Disabling debug for modules",e),a.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Disabling verbose debug for modules",e),a.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(y.cache.console===i)return void a.error(g.console);a.debug("Restoring console function"),t.console=y.cache.console}else a.debug("Disabling console function"),y.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){a.verbose("Destroying previous site for",b),b.removeData(p)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Element:h,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var s,c,l,u=y;return n=n||d,o=h||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(r)?r.push(l):r!==i?r=[r,l]:l!==i&&(r=l),c}},u?(y===i&&a.initialize(),a.invoke(l)):(y!==i&&a.destroy(),a.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!0,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","video","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){e.fn.state=function(t){var o,a=e(this),r=a.selector||"",s=("ontouchstart"in n.documentElement,(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var n,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.state.settings,t):e.extend({},e.fn.state.settings),f=m.error,g=m.metadata,p=m.className,v=m.namespace,b=m.states,h=m.text,y="."+v,x=v+"-module",w=e(this),C=this,T=w.data(x);n={initialize:function(){n.verbose("Initializing module"),m.automatic&&n.add.defaults(),m.context&&""!==r?e(m.context).on(r,"mouseenter"+y,n.change.text).on(r,"mouseleave"+y,n.reset.text).on(r,"click"+y,n.toggle.state):w.on("mouseenter"+y,n.change.text).on("mouseleave"+y,n.reset.text).on("click"+y,n.toggle.state),n.instantiate()},instantiate:function(){n.verbose("Storing instance of module",n),T=n,w.data(x,n)},destroy:function(){n.verbose("Destroying previous module",T),w.off(y).removeData(x)},refresh:function(){n.verbose("Refreshing selector cache"),w=e(C)},add:{defaults:function(){var o=t&&e.isPlainObject(t.states)?t.states:{};e.each(m.defaults,function(t,a){n.is[t]!==i&&n.is[t]()&&(n.verbose("Adding default states",t,C),e.extend(m.states,a,o))})}},is:{active:function(){return w.hasClass(p.active)},loading:function(){return w.hasClass(p.loading)},inactive:function(){return!w.hasClass(p.active)},state:function(e){return p[e]===i?!1:w.hasClass(p[e])},enabled:function(){return!w.is(m.filter.active)},disabled:function(){return w.is(m.filter.active)},textEnabled:function(){return!w.is(m.filter.text)},button:function(){return w.is(".button:not(a, .submit)")},input:function(){return w.is("input")},progress:function(){return w.is(".ui.progress")}},allow:function(e){n.debug("Now allowing state",e),b[e]=!0},disallow:function(e){n.debug("No longer allowing",e),b[e]=!1},allows:function(e){return b[e]||!1},enable:function(){w.removeClass(p.disabled)},disable:function(){w.addClass(p.disabled)},setState:function(e){n.allows(e)&&w.addClass(p[e])},removeState:function(e){n.allows(e)&&w.removeClass(p[e])},toggle:{state:function(){var t;if(n.allows("active")&&n.is.enabled()){if(n.refresh(),e.fn.api!==i&&(t=w.api("get request")))return void n.listenTo(t);n.change.state()}}},listenTo:function(t){n.debug("API request detected, waiting for state signal",t),t?(h.loading&&n.update.text(h.loading),e.when(t).then(function(){"resolved"==t.state()?(n.debug("API request succeeded"),m.activateTest=function(){return!0},m.deactivateTest=function(){return!0}):(n.debug("API request failed"),m.activateTest=function(){return!1},m.deactivateTest=function(){return!1}),n.change.state()})):(m.activateTest=function(){return!1},m.deactivateTest=function(){return!1})},change:{state:function(){n.debug("Determining state change direction"),n.is.inactive()?n.activate():n.deactivate(),m.sync&&n.sync(),e.proxy(m.onChange,C)()},text:function(){n.is.textEnabled()&&(n.is.disabled()?(n.verbose("Changing text to disabled text",h.hover),n.update.text(h.disabled)):n.is.active()?h.hover?(n.verbose("Changing text to hover text",h.hover),n.update.text(h.hover)):h.deactivate&&(n.verbose("Changing text to deactivating text",h.deactivate),n.update.text(h.deactivate)):h.hover?(n.verbose("Changing text to hover text",h.hover),n.update.text(h.hover)):h.activate&&(n.verbose("Changing text to activating text",h.activate),n.update.text(h.activate)))}},activate:function(){e.proxy(m.activateTest,C)()&&(n.debug("Setting state to active"),w.addClass(p.active),n.update.text(h.active),e.proxy(m.onActivate,C)())},deactivate:function(){e.proxy(m.deactivateTest,C)()&&(n.debug("Setting state to inactive"),w.removeClass(p.active),n.update.text(h.inactive),e.proxy(m.onDeactivate,C)())},sync:function(){n.verbose("Syncing other buttons to current state"),a.not(w).state(n.is.active()?"activate":"deactivate")},get:{text:function(){return m.selector.text?w.find(m.selector.text).text():w.html()},textFor:function(e){return h[e]||!1}},flash:{text:function(t,i,o){var a=n.get.text();n.debug("Flashing text message",t,i),t=t||m.text.flash,i=i||m.flashDuration,o=o||function(){},n.update.text(t),setTimeout(function(){n.update.text(a),e.proxy(o,C)()},i)}},reset:{text:function(){var e=h.active||w.data(g.storedText),t=h.inactive||w.data(g.storedText);n.is.textEnabled()&&(n.is.active()&&e?(n.verbose("Resetting active text",e),n.update.text(e)):t&&(n.verbose("Resetting inactive text",e),n.update.text(t)))}},update:{text:function(e){var t=n.get.text();e&&e!==t?(n.debug("Updating text",e),m.selector.text?w.data(g.storedText,e).find(m.selector.text).text(e):w.data(g.storedText,e).html(e)):n.debug("Text is already sane, ignoring update",e)}},setting:function(t,o){if(n.debug("Changing setting",t,o),e.isPlainObject(t))e.extend(!0,m,t);else{if(o===i)return m[t];m[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(o===i)return n[t];n[t]=o}},debug:function(){m.debug&&(m.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,m.name+":"),n.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),n.verbose.apply(console,arguments)))},error:function(){n.error=Function.prototype.bind.call(console.error,console,m.name+":"),n.error.apply(console,arguments)},performance:{log:function(e){var t,i,o;m.performance&&(t=(new Date).getTime(),o=s||t,i=t-o,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,100)},display:function(){var t=m.name+":",o=0;s=!1,clearTimeout(n.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,a,r){var s,c,l,u=T;return a=a||d,r=C||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(o,a){var r=o!=s?a+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(u[r])&&o!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||o==s)return u[a]!==i?(c=u[a],!1):(n.error(f.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,a):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(T===i&&n.initialize(),n.invoke(l)):(T!==i&&n.destroy(),n.initialize())}),o!==i?o:this},e.fn.state.settings={name:"State",debug:!1,verbose:!0,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sticky=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f,g=e.extend(!0,{},e.fn.sticky.settings,n),p=g.className,v=g.namespace,b=g.error,h="."+v,y="module-"+v,x=e(this),w=e(t),C=x.offsetParent(),T=e(g.scrollContext),k=(x.selector||"",x.data(y)),S=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},A=this;f={initialize:function(){return a=g.context?e(g.context):C,0===a.size()?void f.error(b.invalidContext,g.context,x):(f.verbose("Initializing sticky",g,C),f.save.positions(),f.is.hidden()&&f.error(b.visible,x),f.cache.element.height>f.cache.context.height?(f.reset(),void f.error(b.elementSize,x)):(w.on("resize"+h,f.event.resize),T.on("scroll"+h,f.event.scroll),f.observeChanges(),void f.instantiate()))},instantiate:function(){f.verbose("Storing instance of module",f),k=f,x.data(y,f)},destroy:function(){f.verbose("Destroying previous module"),f.reset(),w.off("resize"+h,f.event.resize),T.off("scroll"+h,f.event.scroll),x.removeData(y)},observeChanges:function(){var e=a[0];"MutationObserver"in t&&(m=new MutationObserver(function(){clearTimeout(f.timer),f.timer=setTimeout(function(){f.verbose("DOM tree modified, updating sticky menu"),f.refresh()},200)}),m.observe(A,{childList:!0,subtree:!0}),m.observe(e,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",m))},event:{resize:function(){S(function(){f.refresh(),f.stick()})},scroll:function(){S(function(){f.stick(),e.proxy(g.onScroll,A)()})}},refresh:function(t){f.reset(),t&&(C=x.offsetParent()),f.save.positions(),f.stick(),e.proxy(g.onReposition,A)()},supports:{sticky:function(){{var t=e("<div/>");t.get()}return t.addClass(p.supported),t.css("position").match("sticky")}},save:{scroll:function(e){f.lastScroll=e},positions:function(){var e={height:w.height()},t={margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()},n={offset:a.offset(),height:a.outerHeight()};f.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},f.set.containerSize(),f.set.size(),f.stick(),f.debug("Caching element positions",f.cache)}},get:{direction:function(e){var t="down";return e=e||T.scrollTop(),f.lastScroll!==i&&(f.lastScroll<e?t="down":f.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||T.scrollTop(),f.lastScroll?e-f.lastScroll:0},currentElementScroll:function(){return f.is.top()?Math.abs(parseInt(x.css("top"),10))||0:Math.abs(parseInt(x.css("bottom"),10))||0},elementScroll:function(e){e=e||T.scrollTop();var t,n=f.cache.element,i=f.cache.window,o=f.get.scrollChange(e),a=n.height-i.height+g.offset,r=f.get.currentElementScroll(),s=r+o;return t=f.cache.fits||0>s?0:s>a?a:s}},remove:{offset:function(){x.css("margin-top","")}},set:{offset:function(){f.verbose("Setting offset on element",g.offset),x.css("margin-top",g.offset)},containerSize:function(){var e=C.get(0).tagName;"HTML"===e||"body"==e?C=x.offsetParent():(f.debug("Settings container size",f.cache.context.height),C.height(f.cache.context.height))},scroll:function(e){f.debug("Setting scroll on element",e),f.is.top()&&x.css("bottom","").css("top",-e),f.is.bottom()&&x.css("top","").css("bottom",e)},size:function(){0!==f.cache.element.height&&0!==f.cache.element.width&&x.css({width:f.cache.element.width,height:f.cache.element.height})}},is:{top:function(){return x.hasClass(p.top)},bottom:function(){return x.hasClass(p.bottom)},initialPosition:function(){return!f.is.fixed()&&!f.is.bound()},hidden:function(){return!x.is(":visible")},bound:function(){return x.hasClass(p.bound)},fixed:function(){return x.hasClass(p.fixed)}},stick:function(){var e=f.cache,t=e.fits,n=e.element,i=e.window,o=e.context,a=f.is.bottom()&&g.pushing?g.bottomOffset:g.offset,r={top:T.scrollTop()+a,bottom:T.scrollTop()+a+i.height},s=(f.get.direction(r.top),f.get.elementScroll(r.top)),c=!t,l=0!==n.height;f.save.scroll(r.top),l&&(f.is.initialPosition()?r.top>=n.top&&(f.debug("Element passed, fixing element to page"),f.fixTop()):f.is.fixed()?f.is.top()?r.top<n.top?(f.debug("Fixed element reached top of container"),f.setInitialPosition()):n.height+r.top-s>o.bottom?(f.debug("Fixed element reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s):f.is.bottom()&&(r.bottom-n.height<n.top?(f.debug("Bottom fixed rail has reached top of container"),f.setInitialPosition()):r.bottom>o.bottom?(f.debug("Bottom fixed rail has reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s)):f.is.bottom()&&(g.pushing?f.is.bound()&&r.bottom<o.bottom&&(f.debug("Fixing bottom attached element to bottom of browser."),f.fixBottom()):f.is.bound()&&r.top<o.bottom-n.height&&(f.debug("Fixing bottom attached element to top of browser."),f.fixTop())))
},bindTop:function(){f.debug("Binding element to top of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.bottom).addClass(p.bound).addClass(p.top),e.proxy(g.onTop,A)(),e.proxy(g.onUnstick,A)()},bindBottom:function(){f.debug("Binding element to bottom of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.top).addClass(p.bound).addClass(p.bottom),e.proxy(g.onBottom,A)(),e.proxy(g.onUnstick,A)()},setInitialPosition:function(){f.unfix(),f.unbind()},fixTop:function(){f.debug("Fixing element to top of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.bottom).addClass(p.fixed).addClass(p.top),e.proxy(g.onStick,A)()},fixBottom:function(){f.debug("Sticking element to bottom of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.top).addClass(p.fixed).addClass(p.bottom),e.proxy(g.onStick,A)()},unbind:function(){f.debug("Removing absolute position on element"),f.remove.offset(),x.removeClass(p.bound).removeClass(p.top).removeClass(p.bottom)},unfix:function(){f.debug("Removing fixed position on element"),f.remove.offset(),x.removeClass(p.fixed).removeClass(p.top).removeClass(p.bottom),e.proxy(g.onUnstick,this)()},reset:function(){f.debug("Reseting elements position"),f.unbind(),f.unfix(),f.resetCSS()},resetCSS:function(){x.css({top:"",bottom:"",width:"",height:""}),C.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,0)},display:function(){var t=g.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=k;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(k===i&&f.initialize(),f.invoke(l)):(k!==i&&f.destroy(),f.initialize())}),o!==i?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!1,performance:!1,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.tab=e.fn.tab=function(n){var o,a,r=e(e.isFunction(this)?t:this),s=e.isPlainObject(n)?e.extend(!0,{},e.fn.tab.settings,n):e.extend({},e.fn.tab.settings),c=r.selector||"",l=(new Date).getTime(),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1);return r.each(function(){var n,g,p,v,b,h=s.className,y=s.metadata,x=s.selector,w=s.error,C="."+s.namespace,T="module-"+s.namespace,k=e(this),S={},A=!0,z=0,P=this,E=k.data(T);o={initialize:function(){o.debug("Initializing tab menu item",k),o.determineTabs(),o.debug("Determining tabs",s.context,g),s.auto&&(o.verbose("Setting up automatic tab retrieval from server"),s.apiSettings={url:s.path+"/{$tab}"}),e.isWindow(P)||(o.debug("Attaching tab activation events to element",k),k.on("click"+C,o.event.click)),o.instantiate()},determineTabs:function(){var t;"parent"===s.context?(k.closest(x.ui).size()>0?(t=k.closest(x.ui),o.verbose("Using closest UI element for determining parent",t)):t=k,n=t.parent(),o.verbose("Determined parent element for creating context",n)):s.context?(n=e(s.context),o.verbose("Using selector for tab context",s.context,n)):n=e("body"),s.childrenOnly?(g=n.children(x.tabs),o.debug("Searching tab context children for tabs",n,g)):(g=n.find(x.tabs),o.debug("Searching tab context for tabs",n,g))},initializeHistory:function(){if(s.history){if(o.debug("Initializing page state"),e.address===i)return o.error(w.state),!1;if("state"==s.historyType){if(o.debug("Using HTML5 to manage state"),s.path===!1)return o.error(w.path),!1;e.address.history(!0).state(s.path)}e.address.bind("change",o.event.history.change)}},instantiate:function(){o.verbose("Storing instance of module",o),k.data(T,o)},destroy:function(){o.debug("Destroying tabs",k),k.removeData(T).off(C)},event:{click:function(t){var n=e(this).data(y.tab);n!==i?(s.history?(o.verbose("Updating page state",t),e.address.value(n)):(o.verbose("Changing tab",t),o.changeTab(n)),t.preventDefault()):o.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||o.get.initialPath(),a=s.templates.determineTitle(n)||!1;o.performance.display(),o.debug("History change event",n,t),b=t,n!==i&&o.changeTab(n),a&&e.address.title(a)}}},refresh:function(){p&&(o.debug("Refreshing tab",p),o.changeTab(p))},cache:{read:function(e){return e!==i?S[e]:!1},add:function(e,t){e=e||p,o.debug("Adding cached content for",e),S[e]=t},remove:function(e){e=e||p,o.debug("Removing cached content for",e),delete S[e]}},set:{state:function(t){e.address.value(t)}},changeTab:function(i){var a=t.history&&t.history.pushState,r=a&&s.ignoreFirstLoad&&A,c=s.auto||e.isPlainObject(s.apiSettings),l=c&&!r?o.utilities.pathToArray(i):o.get.defaultPathArray(i);i=o.utilities.arrayToPath(l),e.each(l,function(t,a){var u,d,m,f,g=l.slice(0,t+1),h=o.utilities.arrayToPath(g),y=o.is.tab(h),x=t+1==l.length,C=o.get.tabElement(h);if(o.verbose("Looking for tab",a),y){if(o.verbose("Tab was found",a),p=h,v=o.utilities.filterArray(l,g),x?f=!0:(d=l.slice(0,t+2),m=o.utilities.arrayToPath(d),f=!o.is.tab(m),f&&o.verbose("Tab parameters found",d)),f&&c)return r?(o.debug("Ignoring remote content on first tab load",h),A=!1,o.cache.add(i,C.html()),o.activate.all(h),e.proxy(s.onTabInit,C)(h,v,b),e.proxy(s.onTabLoad,C)(h,v,b)):(o.activate.navigation(h),o.content.fetch(h,i)),!1;o.debug("Opened local tab",h),o.activate.all(h),o.cache.read(h)||(o.cache.add(h,!0),o.debug("First time tab loaded calling tab init"),e.proxy(s.onTabInit,C)(h,v,b)),e.proxy(s.onTabLoad,C)(h,v,b)}else{if(-1!=i.search("/"))return o.error(w.missingTab,k,n,h),!1;if(u=e("#"+i+', a[name="'+i+'"]'),h=u.closest("[data-tab]").data("tab"),C=o.get.tabElement(h),u&&u.size()>0&&h)return o.debug("No tab found, but deep anchor link present, opening parent tab"),o.activate.all(h),o.cache.read(h)||(o.cache.add(h,!0),o.debug("First time tab loaded calling tab init"),e.proxy(s.onTabInit,C)(h,v,b)),!1}})},content:{fetch:function(t,n){var a,r,c=o.get.tabElement(t),l={dataType:"html",stateContext:c,onSuccess:function(i){o.cache.add(n,i),o.content.update(t,i),t==p?(o.debug("Content loaded",t),o.activate.tab(t)):o.debug("Content loaded in background",t),e.proxy(s.onTabInit,c)(t,v,b),e.proxy(s.onTabLoad,c)(t,v,b)},urlData:{tab:n}},u=c.data(y.promise)||!1,d=u&&"pending"===u.state();n=n||t,r=o.cache.read(n),s.cache&&r?(o.debug("Showing existing content",n),o.content.update(t,r),o.activate.tab(t),e.proxy(s.onTabLoad,c)(t,v,b)):d?(o.debug("Content is already loading",n),c.addClass(h.loading)):e.api!==i?(a=e.extend(!0,{headers:{"X-Remote":!0}},s.apiSettings,l),o.debug("Retrieving remote content",n,a),e.api(a)):o.error(w.api)},update:function(e,t){o.debug("Updating html for",e);var n=o.get.tabElement(e);n.html(t)}},activate:{all:function(e){o.activate.tab(e),o.activate.navigation(e)},tab:function(e){var t=o.get.tabElement(e);o.verbose("Showing tab content for",t),t.addClass(h.active).siblings(g).removeClass(h.active+" "+h.loading)},navigation:function(e){var t=o.get.navElement(e);o.verbose("Activating tab navigation for",t,e),t.addClass(h.active).siblings(r).removeClass(h.active+" "+h.loading)}},deactivate:{all:function(){o.deactivate.navigation(),o.deactivate.tabs()},navigation:function(){r.removeClass(h.active)},tabs:function(){g.removeClass(h.active+" "+h.loading)}},is:{tab:function(e){return e!==i?o.get.tabElement(e).size()>0:!1}},get:{initialPath:function(){return r.eq(0).data(y.tab)||g.eq(0).data(y.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return o.utilities.pathToArray(o.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+y.tab+'^="'+e+'/"]').eq(0),n=t.data(y.tab)||!1;if(n){if(o.debug("Found default tab",n),z<s.maxDepth)return z++,o.get.defaultPath(n);o.error(w.recursion)}else o.debug("No default tabs found for",e,g);return z=0,e},navElement:function(e){return e=e||p,r.filter("[data-"+y.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,a;return e=e||p,i=o.utilities.pathToArray(e),a=o.utilities.last(i),t=g.filter("[data-"+y.tab+'="'+a+'"]'),n=g.filter("[data-"+y.tab+'="'+e+'"]'),t.size()>0?t:n},tab:function(){return p}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return e.isArray(t)?t[t.length-1]:!1},pathToArray:function(e){return e===i&&(e=p),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return e.isArray(t)?t.join("/"):!1}},setting:function(t,n){if(o.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(n===i)return o[t];o[t]=n}},debug:function(){s.debug&&(s.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,s.name+":"),o.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),o.verbose.apply(console,arguments)))},error:function(){o.error=Function.prototype.bind.call(console.error,console,s.name+":"),o.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;s.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,100)},display:function(){var t=s.name+":",n=0;l=!1,clearTimeout(o.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,r){var s,c,l,u=E;return n=n||f,r=P||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,a){var r=n!=s?a+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||n==s)return u[a]!==i?(c=u[a],!1):(o.error(w.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},m?(E===i&&o.initialize(),o.invoke(d)):(E!==i&&o.destroy(),o.initialize())}),o&&!m&&o.initializeHistory(),a!==i?a:this},e.tab=function(n){e(t).tab(n)},e.fn.tab.settings={name:"Tab",namespace:"tab",debug:!1,verbose:!0,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,ignoreFirstLoad:!1,alwaysRefresh:!1,cache:!0,apiSettings:!1,onTabInit:function(){},onTabLoad:function(){},templates:{determineTitle:function(){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found for this context.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.transition=function(){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments,u=l[0],d=[].slice.call(arguments,1),m="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var t,f,g,p,v,b,h,y,x,w,C,T=e(this),k=this;C={initialize:function(){x="module-"+y,t=C.get.settings.apply(k,l),p=t.className,v=t.metadata,b=C.get.animationEvent(),h=C.get.animationName(),g=t.error,y=t.namespace,w="."+t.namespace,f=T.data(x)||C,m&&(m=C.invoke(u)),m===!1&&(C.verbose("Converted arguments into settings object",t),C.animate(),C.instantiate())},instantiate:function(){C.verbose("Storing instance of module",C),T.data(x,f)},destroy:function(){C.verbose("Destroying previous module for",k),T.removeData(x)},refresh:function(){C.verbose("Refreshing display type on next animation"),delete C.displayType},forceRepaint:function(){C.verbose("Forcing element repaint");var e=T.parent(),t=T.next();0===t.size()?T.detach().appendTo(e):T.detach().insertBefore(t)},repaint:function(){C.verbose("Repainting element");k.offsetWidth},animate:function(e){return t=e||t,C.is.supported()?(C.debug("Preparing animation",t.animation),C.is.animating()&&t.queue?(!t.allowRepeats&&C.has.direction()&&C.is.occuring()&&C.queuing!==!0?C.error(g.repeated,t.animation,T):C.queue(t.animation),!1):void(C.can.animate?C.set.animating(t.animation):C.error(g.noAnimation,t.animation))):(C.error(g.support),!1)},reset:function(){C.debug("Resetting animation to beginning conditions"),C.remove.animationEndCallback(),C.restore.conditions(),C.remove.animating()},queue:function(e){C.debug("Queueing animation of",e),C.queuing=!0,T.one(b+w,function(){C.queuing=!1,C.repaint(),C.animate.apply(this,t)})},complete:function(){C.verbose("CSS animation complete",t.animation),C.is.looping()||(C.is.outward()?(C.verbose("Animation is outward, hiding element"),C.restore.conditions(),C.hide(),e.proxy(t.onHide,this)()):C.is.inward()?(C.verbose("Animation is outward, showing element"),C.restore.conditions(),C.show(),C.set.display(),e.proxy(t.onShow,this)()):C.restore.conditions(),C.remove.animation(),C.remove.animating()),e.proxy(t.onComplete,this)()},has:{direction:function(e){return e=e||t.animation,-1!==e.search(p.inward)||-1!==e.search(p.outward)?(C.debug("Direction already set in animation"),!0):!1}},set:{animating:function(n){n=n||t.animation,C.is.animating()||C.save.conditions(),C.remove.direction(),C.remove.animationEndCallback(),C.can.transition()&&!C.has.direction()&&C.set.direction(),C.remove.hidden(),C.set.display(),T.addClass(p.animating).addClass(p.transition).addClass(n).one(b+".complete"+w,C.complete),C.set.duration(t.duration),e.proxy(t.onStart,this)(),C.debug("Starting tween",n,T.attr("class"))},duration:function(e,n){n=n||t.duration,n="number"==typeof n?n+"ms":n,C.verbose("Setting animation duration",n),T.css({"-webkit-animation-duration":n,"-moz-animation-duration":n,"-ms-animation-duration":n,"-o-animation-duration":n,"animation-duration":n})},display:function(){var e=C.get.style(),t=C.get.displayType(),n=e+"display: "+t+" !important;";C.refresh(),T.css("display")!==t&&(C.verbose("Setting inline visibility to",t),T.attr("style",n))},direction:function(){T.is(":visible")&&!C.is.hidden()?(C.debug("Automatically determining the direction of animation","Outward"),T.removeClass(p.inward).addClass(p.outward)):(C.debug("Automatically determining the direction of animation","Inward"),T.removeClass(p.outward).addClass(p.inward))},looping:function(){C.debug("Transition set to loop"),T.addClass(p.looping)},hidden:function(){C.is.hidden()||(T.addClass(p.transition).addClass(p.hidden),"none"!==T.css("display")&&(C.verbose("Overriding default display to hide element"),T.css("display","none")))},visible:function(){T.addClass(p.transition).addClass(p.visible)}},save:{displayType:function(e){T.data(v.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,C.verbose("Saving existence of transition",t,n)},conditions:function(){T.attr("class")||!1,T.attr("style")||"";T.removeClass(t.animation),C.remove.direction(),C.cache={className:T.attr("class"),style:C.get.style()},C.verbose("Saving original attributes",C.cache)}},restore:{conditions:function(){return C.cache===i?!1:(C.cache.className?T.attr("class",C.cache.className):T.removeAttr("class"),C.cache.style&&(C.verbose("Restoring original style attribute",C.cache.style),T.attr("style",C.cache.style)),C.is.looping()&&C.remove.looping(),void C.verbose("Restoring original attributes",C.cache))}},remove:{animating:function(){T.removeClass(p.animating)},animation:function(){T.css({"-webkit-animation":"","-moz-animation":"","-ms-animation":"","-o-animation":"",animation:""})},animationEndCallback:function(){T.off(".complete")},display:function(){T.css("display","")},direction:function(){T.removeClass(p.inward).removeClass(p.outward)},hidden:function(){T.removeClass(p.hidden)},visible:function(){T.removeClass(p.visible)},looping:function(){C.debug("Transitions are no longer looping"),T.removeClass(p.looping),C.forceRepaint()},transition:function(){T.removeClass(p.visible).removeClass(p.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},displayType:function(){return t.displayType?t.displayType:(T.data(v.displayType)===i&&C.can.transition(!0),T.data(v.displayType))},style:function(){var e=T.attr("style")||"";return e.replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationName:function(){var e,t=n.createElement("div"),o={animation:"animationName",OAnimation:"oAnimationName",MozAnimation:"mozAnimationName",WebkitAnimation:"webkitAnimationName"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{animate:function(){return"none"!==T.css(t.animation)?(C.debug("CSS definition found",T.css(t.animation)),!0):(C.debug("Unable to find css definition",T.attr("class")),!1)},transition:function(n){var o,a,r,s,c,l=T.attr("class"),u=T.prop("tagName"),d=t.animation,m=C.get.transitionExists(t.animation);return(m===i||n)&&(C.verbose("Determining whether animation exists"),o=e("<"+u+" />").addClass(l).insertAfter(T),a=o.addClass(d).removeClass(p.inward).removeClass(p.outward).addClass(p.animating).addClass(p.transition).css(h),r=o.addClass(p.inward).css(h),c=o.attr("class",l).removeAttr("style").removeClass(p.hidden).removeClass(p.visible).show().css("display"),C.verbose("Determining final display state",c),a!=r?(C.debug("Transition exists for animation",d),s=!0):(C.debug("Static animation found",d,c),s=!1),o.remove(),C.save.displayType(c),m===i&&C.save.transitionExists(d,s)),m||s}},is:{animating:function(){return T.hasClass(p.animating)},inward:function(){return T.hasClass(p.inward)},outward:function(){return T.hasClass(p.outward)},looping:function(){return T.hasClass(p.looping)},occuring:function(e){return e=e||t.animation,e=e.replace(" ","."),T.filter(e).size()>0},visible:function(){return T.is(":visible")},hidden:function(){return"hidden"===T.css("visibility")},supported:function(){return h!==!1&&b!==!1}},hide:function(){C.verbose("Hiding element"),C.is.animating()&&C.reset(),C.remove.display(),C.remove.visible(),C.set.hidden(),C.repaint()},show:function(e){C.verbose("Showing element",e),C.remove.hidden(),C.set.visible(),C.repaint()},start:function(){C.verbose("Starting animation"),T.removeClass(p.disabled)},stop:function(){C.debug("Stopping animation"),T.addClass(p.disabled)},toggle:function(){C.debug("Toggling play status"),T.toggleClass(p.disabled)},setting:function(n,o){if(C.debug("Changing setting",n,o),e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){t.debug&&(t.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,t.name+":"),C.debug.apply(console,arguments)))},verbose:function(){t.verbose&&t.debug&&(t.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,t.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,t.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;t.performance&&(n=(new Date).getTime(),o=s||n,i=n-o,s=n,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":i})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,600)},display:function(){var n=t.name+":",o=0;s=!1,clearTimeout(C.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",r&&(n+=" '"+r+"'"),a.size()>1&&(n+=" ("+a.size()+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(n),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=f;return n=n||d,a=k||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s!==i?s:!1}},C.initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",debug:!1,verbose:!0,performance:!0,namespace:"transition",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},allowRepeats:!1,displayType:!1,animation:"fade",duration:"500ms",queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"There is no css animation matching the one you specified.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.video=function(n){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.video.settings,n):e.extend({},e.fn.video.settings),g=f.selector,p=f.className,v=f.error,b=f.metadata,h=f.namespace,y=f.templates,x="."+h,w="module-"+h,C=(e(t),e(this)),T=C.find(g.placeholder),k=C.find(g.playButton),S=C.find(g.embed),A=this,z=C.data(w);m={initialize:function(){m.debug("Initializing video"),m.create(),T.on("click"+x,m.play),k.on("click"+x,m.play),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),z=m,C.data(w,m)},create:function(){var e=C.data(b.image),t=y.video(e);C.html(t),m.refresh(),e||m.play(),m.debug("Creating html for video element",t)},destroy:function(){m.verbose("Destroying previous instance of video"),m.reset(),C.removeData(w).off(x),T.off(x),k.off(x)},refresh:function(){m.verbose("Refreshing selector cache"),T=C.find(g.placeholder),k=C.find(g.playButton),S=C.find(g.embed)},change:function(e,t,n){m.debug("Changing video to ",e,t,n),C.data(b.source,e).data(b.id,t).data(b.url,n),f.onChange()},reset:function(){m.debug("Clearing video embed and showing placeholder"),C.removeClass(p.active),S.html(" "),T.show(),f.onReset()},play:function(){m.debug("Playing video");var e=C.data(b.source)||!1,t=C.data(b.url)||!1,n=C.data(b.id)||!1;S.html(m.generate.html(e,n,t)),C.addClass(p.active),f.onPlay()},get:{source:function(e){return"string"!=typeof e?!1:-1!==e.search("youtube.com")?"youtube":-1!==e.search("vimeo.com")?"vimeo":!1},id:function(e){return f.regExp.youtube.test(e)?e.match(f.regExp.youtube)[1]:f.regExp.vimeo.test(e)?e.match(f.regExp.vimeo)[2]:!1}},generate:{html:function(e,t,n){m.debug("Generating embed html");var i;return e=e||f.source,t=t||f.id,e&&t||n?(e&&t||(e=m.get.source(n),t=m.get.id(n)),"vimeo"==e?i='<iframe src="http://player.vimeo.com/video/'+t+"?="+m.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>':"youtube"==e&&(i='<iframe src="http://www.youtube.com/embed/'+t+"?="+m.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')):m.error(v.noVideo),i},url:function(e){var t=f.api?1:0,n="auto"===f.autoplay?C.data("image")!==i:f.autoplay,o=f.hd?1:0,a=f.showUI?1:0,r=f.showUI?0:1,s="";return"vimeo"==e&&(s="api="+t+"&amp;title="+a+"&amp;byline="+a+"&amp;portrait="+a+"&amp;autoplay="+n,f.color&&(s+="&amp;color="+f.color)),"ustream"==e?(s="autoplay="+n,f.color&&(s+="&amp;color="+f.color)):"youtube"==e&&(s="enablejsapi="+t+"&amp;autoplay="+n+"&amp;autohide="+r+"&amp;hq="+o+"&amp;modestbranding=1",f.color&&(s+="&amp;color="+f.color)),s}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.size()>1&&(t+=" ("+a.size()+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=z;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(z===i&&m.initialize(),m.invoke(l)):(z!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.video.settings={name:"Video",namespace:"video",debug:!1,verbose:!0,performance:!0,metadata:{id:"id",image:"image",source:"source",url:"url"},source:!1,url:!1,id:!1,aspectRatio:16/9,onPlay:function(){},onReset:function(){},onChange:function(){},onPause:function(){},onStop:function(){},width:"auto",height:"auto",autoplay:"auto",color:"#442359",hd:!0,showUI:!1,api:!0,regExp:{youtube:/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,vimeo:/http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/},error:{noVideo:"No video specified",method:"The method you called is not defined"},className:{active:"active"},selector:{embed:".embed",placeholder:".placeholder",playButton:".play"}},e.fn.video.settings.templates={video:function(e){var t="";return e&&(t+='<i class="video play icon"></i><img class="placeholder" src="'+e+'">'),t+='<div class="embed"></div>'}}}(jQuery,window,document),function(e,t,n,i){e.fn.visibility=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return r.each(function(){var r,f=e.extend(!0,{},e.fn.visibility.settings,o),g=f.className,p=f.namespace,v=(f.error,"."+p),b="module-"+p,h=e(t),y=e(this),x=e(f.context),w=(y.offsetParent(),y.selector||"",y.data(b)),C=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},T=this;r={initialize:function(){r.verbose("Initializing visibility",f),r.setup.cache(),r.save.position(),r.bindEvents(),r.instantiate(),"image"==f.type&&r.setup.image(),"fixed"==f.type&&r.setup.fixed(),C(r.checkVisibility)},instantiate:function(){r.verbose("Storing instance of module",r),w=r,y.data(b,r)},destroy:function(){r.verbose("Destroying previous module"),y.off(v).removeData(b)},bindEvents:function(){r.verbose("Binding visibility events to scroll and resize"),h.on("resize"+v,r.event.refresh),x.on("scroll"+v,r.event.scroll)},event:{refresh:function(){C(r.refresh)},scroll:function(){r.verbose("Scroll position changed"),f.throttle?(clearTimeout(r.timer),r.timer=setTimeout(r.checkVisibility,f.throttle)):C(r.checkVisibility)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),c=function(){a++,a>=t.length&&e.isFunction(i)&&i()};o--;)s=n.createElement("img"),s.onload=c,s.onerror=c,s.src=t[o],r.push(s)},setup:{cache:function(){r.cache={occurred:{},screen:{},element:{}}},image:function(){var e=y.data("src");e&&(r.verbose("Lazy loading image",e),r.topVisible(function(){r.precache(e,function(){r.set.image(e),f.onTopVisible=!1})}))},fixed:function(){r.verbose("Setting up fixed on element pass"),y.visibility({once:!1,continuous:!1,onTopPassed:function(){y.addClass(g.fixed).css({position:"fixed",top:f.offset+"px"}),f.animation&&e.fn.transition!==i&&y.transition(f.transition,f.duration)
},onTopPassedReverse:function(){y.removeClass(g.fixed).css({position:"",top:""})}})}},set:{image:function(t){var n=r.cache.screen.bottom<r.cache.element.top;y.attr("src",t),n?(r.verbose("Image outside browser, avoiding animation"),y.show()):f.transition&&e.fn.transition!==i?y.transition(f.transition,f.duration):y.fadeIn(f.duration)}},refresh:function(){r.debug("Refreshing constants (element width/height)"),r.reset(),r.save.position(),r.checkVisibility(),e.proxy(f.onRefresh,T)()},reset:function(){r.verbose("Reseting all cached values"),e.isPlainObject(r.cache)&&(r.cache.screen={},r.cache.element={})},checkVisibility:function(){r.verbose("Checking visibility of element",r.cache.element),r.save.scroll(),r.save.direction(),r.save.screenCalculations(),r.save.elementCalculations(),r.passed(),r.passingReverse(),r.topVisibleReverse(),r.bottomVisibleReverse(),r.topPassedReverse(),r.bottomPassedReverse(),r.passing(),r.topVisible(),r.bottomVisible(),r.topPassed(),r.bottomPassed()},passed:function(t,n){var o=r.get.elementCalculations();if(t!==i&&n!==i)f.onPassed[t]=n;else{if(t!==i)return r.get.pixelsPassed(t)>o.pixelsPassed;o.passing&&e.each(f.onPassed,function(e,t){o.bottomVisible||o.pixelsPassed>r.get.pixelsPassed(e)?r.execute(t,e):f.once||r.remove.occurred(t)})}},passing:function(e){var t=r.get.elementCalculations(),n=e||f.onPassing,o="passing";return e&&(r.debug("Adding callback for passing",e),f.onPassing=e),t.passing?r.execute(n,o):f.once||r.remove.occurred(o),e!==i?t.passing:void 0},topVisible:function(e){var t=r.get.elementCalculations(),n=e||f.onTopVisible,o="topVisible";return e&&(r.debug("Adding callback for top visible",e),f.onTopVisible=e),t.topVisible?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.topVisible:void 0},bottomVisible:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomVisible,o="bottomVisible";return e&&(r.debug("Adding callback for bottom visible",e),f.onBottomVisible=e),t.bottomVisible?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.bottomVisible:void 0},topPassed:function(e){var t=r.get.elementCalculations(),n=e||f.onTopPassed,o="topPassed";return e&&(r.debug("Adding callback for top passed",e),f.onTopPassed=e),t.topPassed?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.onTopPassed:void 0},bottomPassed:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomPassed,o="bottomPassed";return e&&(r.debug("Adding callback for bottom passed",e),f.onBottomPassed=e),t.bottomPassed?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.bottomPassed:void 0},passingReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onPassingReverse,o="passingReverse";return e&&(r.debug("Adding callback for passing reverse",e),f.onPassingReverse=e),t.passing?f.once||r.remove.occurred(o):r.get.occurred("passing")&&r.execute(n,o),e!==i?!t.passing:void 0},topVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onTopVisibleReverse,o="topVisibleReverse";return e&&(r.debug("Adding callback for top visible reverse",e),f.onTopVisibleReverse=e),t.topVisible?f.once||r.remove.occurred(o):r.get.occurred("topVisible")&&r.execute(n,o),e===i?!t.topVisible:void 0},bottomVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomVisibleReverse,o="bottomVisibleReverse";return e&&(r.debug("Adding callback for bottom visible reverse",e),f.onBottomVisibleReverse=e),t.bottomVisible?f.once||r.remove.occurred(o):r.get.occurred("bottomVisible")&&r.execute(n,o),e===i?!t.bottomVisible:void 0},topPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onTopPassedReverse,o="topPassedReverse";return e&&(r.debug("Adding callback for top passed reverse",e),f.onTopPassedReverse=e),t.topPassed?f.once||r.remove.occurred(o):r.get.occurred("topPassed")&&r.execute(n,o),e===i?!t.onTopPassed:void 0},bottomPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomPassedReverse,o="bottomPassedReverse";return e&&(r.debug("Adding callback for bottom passed reverse",e),f.onBottomPassedReverse=e),t.bottomPassed?f.once||r.remove.occurred(o):r.get.occurred("bottomPassed")&&r.execute(n,o),e===i?!t.bottomPassed:void 0},execute:function(t,n){var i=r.get.elementCalculations(),o=r.get.screenCalculations();t=t||!1,t&&(f.continuous?(r.debug("Callback being called continuously",n,i),e.proxy(t,T)(i,o)):r.get.occurred(n)||(r.debug("Conditions met",n,i),e.proxy(t,T)(i,o))),r.save.occurred(n)},remove:{occurred:function(e){e?r.cache.occurred[e]!==i&&r.cache.occurred[e]===!0&&(r.debug("Callback can now be called again",e),r.cache.occurred[e]=!1):r.cache.occurred={}}},save:{occurred:function(e){e&&(r.cache.occurred[e]===i||r.cache.occurred[e]!==!0)&&(r.verbose("Saving callback occurred",e),r.cache.occurred[e]=!0)},scroll:function(){r.cache.scroll=x.scrollTop()+f.offset},direction:function(){var e,t=r.get.scroll(),n=r.get.lastScroll();return e=t>n&&n?"down":n>t&&n?"up":"static",r.cache.direction=e,r.cache.direction},elementPosition:function(){var t=r.get.screenSize();return r.verbose("Saving element position"),e.extend(r.cache.element,{margin:{top:parseInt(y.css("margin-top"),10),bottom:parseInt(y.css("margin-bottom"),10)},fits:T.height<t.height,offset:y.offset(),width:y.outerWidth(),height:y.outerHeight()}),r.cache.element},elementCalculations:function(){var t=r.get.screenCalculations(),n=r.get.elementPosition();f.includeMargin?e.extend(r.cache.element,{top:n.offset.top-n.margin.top,bottom:n.offset.top+n.height+n.margin.bottom}):e.extend(r.cache.element,{top:n.offset.top,bottom:n.offset.top+n.height}),e.extend(r.cache.element,{topVisible:t.bottom>=n.top,topPassed:t.top>=n.top,bottomVisible:t.bottom>=n.bottom,bottomPassed:t.top>=n.bottom,pixelsPassed:0,percentagePassed:0}),e.extend(r.cache.element,{visible:r.cache.element.topVisible||r.cache.element.bottomVisible,passing:r.cache.element.topPassed&&!r.cache.element.bottomPassed,hidden:!r.cache.element.topVisible&&!r.cache.element.bottomVisible}),r.cache.element.passing&&(r.cache.element.pixelsPassed=t.top-n.top,r.cache.element.percentagePassed=(t.top-n.top)/n.height),r.verbose("Updated element calculations",r.cache.element)},screenCalculations:function(){var t=x.scrollTop()+f.offset;return r.cache.scroll===i&&(r.cache.scroll=x.scrollTop()+f.offset),r.save.direction(),e.extend(r.cache.screen,{top:t,bottom:t+r.cache.screen.height}),r.cache.screen},screenSize:function(){r.verbose("Saving window position"),r.cache.screen={height:x.height()}},position:function(){r.save.screenSize(),r.save.elementPosition()}},get:{pixelsPassed:function(e){var t=r.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return r.cache.occurred!==i?r.cache.occurred[e]||!1:!1},direction:function(){return r.cache.direction===i&&r.save.direction(),r.cache.direction},elementPosition:function(){return r.cache.element===i&&r.save.elementPosition(),r.cache.element},elementCalculations:function(){return r.cache.element===i&&r.save.elementCalculations(),r.cache.element},screenCalculations:function(){return r.cache.screen===i&&r.save.screenCalculations(),r.cache.screen},screenSize:function(){return r.cache.screen===i&&r.save.screenSize(),r.cache.screen},scroll:function(){return r.cache.scroll===i&&r.save.scroll(),r.cache.scroll},lastScroll:function(){return r.cache.screen===i?(r.debug("First scroll event, no last scroll could be found"),!1):r.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,r,t);else{if(n===i)return r[t];r[t]=n}},debug:function(){f.debug&&(f.performance?r.performance.log(arguments):(r.debug=Function.prototype.bind.call(console.info,console,f.name+":"),r.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?r.performance.log(arguments):(r.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),r.verbose.apply(console,arguments)))},error:function(){r.error=Function.prototype.bind.call(console.error,console,f.name+":"),r.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(r.performance.timer),r.performance.timer=setTimeout(r.performance.display,100)},display:function(){var t=f.name+":",n=0;c=!1,clearTimeout(r.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=w;return n=n||m,o=T||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(w===i&&r.initialize(),r.invoke(u)):(w!==i&&r.destroy(),r.initialize())}),a!==i?a:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",className:{fixed:"fixed"},debug:!1,verbose:!1,performance:!0,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,transition:!1,duration:500,onPassed:{},onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,once:!0,continuous:!1,onRefresh:function(){},onScroll:function(){},error:{method:"The method you called is not defined."}}}(jQuery,window,document),function(e,t,n,i){e.visit=e.fn.visit=function(n){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var m,f=e.extend(!0,{},e.fn.visit.settings,n),g=f.error,p=f.namespace,v=p+"-module",b=e(this),h=e(),y=this,x=b.data(v);m={initialize:function(){f.count?m.store(f.key.count,f.count):f.id?m.add.id(f.id):f.increment&&"increment"!==u&&m.increment(),m.add.display(b),m.instantiate()},instantiate:function(){m.verbose("Storing instance of visit module",m),x=m,b.data(v,m)},destroy:function(){m.verbose("Destroying instance"),b.removeData(v)},increment:function(e){var t=m.get.count(),n=+t+1;e?m.add.id(e):(n>f.limit&&!f.surpass&&(n=f.limit),m.debug("Incrementing visits",n),m.store(f.key.count,n))},decrement:function(e){var t=m.get.count(),n=+t-1;e?m.remove.id(e):(m.debug("Removing visit"),m.store(f.key.count,n))},get:{count:function(){return+m.retrieve(f.key.count)||0},idCount:function(e){return e=e||m.get.ids(),e.length},ids:function(e){var t=[];return e=e||m.retrieve(f.key.ids),"string"==typeof e&&(t=e.split(f.delimiter)),m.verbose("Found visited ID list",t),t},storageOptions:function(){var e={};return f.expires&&(e.expires=f.expires),f.domain&&(e.domain=f.domain),f.path&&(e.path=f.path),e}},has:{visited:function(t,n){var o=!1;return n=n||m.get.ids(),t!==i&&n&&e.each(n,function(e,n){n==t&&(o=!0)}),o}},set:{count:function(e){m.store(f.key.count,e)},ids:function(e){m.store(f.key.ids,e)}},reset:function(){m.store(f.key.count,0),m.store(f.key.ids,null)},add:{id:function(e){var t=m.retrieve(f.key.ids),n=t===i||""===t?e:t+f.delimiter+e;m.has.visited(e)?m.debug("Unique content already visited, not adding visit",e,t):e===i?m.debug("ID is not defined"):(m.debug("Adding visit to unique content",e),m.store(f.key.ids,n)),m.set.count(m.get.idCount())},display:function(t){var n=e(t);n.size()>0&&!e.isWindow(n[0])&&(m.debug("Updating visit count for element",n),h=h.size()>0?h.add(n):n)}},remove:{id:function(t){var n=m.get.ids(),o=[];t!==i&&n!==i&&(m.debug("Removing visit to unique content",t,n),e.each(n,function(e,n){n!==t&&o.push(n)}),o=o.join(f.delimiter),m.store(f.key.ids,o)),m.set.count(m.get.idCount())}},check:{limit:function(t){t=t||m.get.count(),f.limit&&(t>=f.limit&&(m.debug("Pages viewed exceeded limit, firing callback",t,f.limit),e.proxy(f.onLimit,this)(t)),m.debug("Limit not reached",t,f.limit),e.proxy(f.onChange,this)(t)),m.update.display(t)}},update:{display:function(e){e=e||m.get.count(),h.size()>0&&(m.debug("Updating displayed view count",h),h.html(e))}},store:function(n,o){var a=m.get.storageOptions(o);if("localstorage"==f.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),m.debug("Value stored using local storage",n,o);else{if(e.cookie===i)return void m.error(g.noCookieStorage);e.cookie(n,o,a),m.debug("Value stored using cookie",n,o,a)}n==f.key.count&&m.check.limit(o)},retrieve:function(n){var o;return"localstorage"==f.storageMethod&&t.localStorage!==i?o=t.localStorage.getItem(n):e.cookie!==i?o=e.cookie(n):m.error(g.noCookieStorage),("undefined"==o||"null"==o||o===i||null===o)&&(o=i),o},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){return m.debug("Changing internal",t,n),n===i?m[t]:void(e.isPlainObject(t)?e.extend(!0,m,t):m[t]=n)},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.size()>1&&(t+=" ("+a.size()+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=x;return n=n||d,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(x===i&&m.initialize(),m.invoke(l)):(x!==i&&m.destroy(),m.initialize())}),o!==i?o:this},e.fn.visit.settings={name:"Visit",debug:!1,verbose:!0,performance:!0,namespace:"visit",increment:!1,surpass:!1,count:!1,limit:!1,delimiter:"&",storageMethod:"localstorage",key:{count:"visit-count",ids:"visit-ids"},expires:30,domain:!1,path:"/",onLimit:function(){},onChange:function(){},error:{method:"The method you called is not defined",missingPersist:"Using the persist setting requires the inclusion of PersistJS",noCookieStorage:"The default storage cookie requires $.cookie to be included."}}}(jQuery,window,document),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function t(e){return s.raw?e:encodeURIComponent(e)}function n(e){return s.raw?e:decodeURIComponent(e)}function i(e){return t(s.json?JSON.stringify(e):String(e))}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(r," ")),s.json?JSON.parse(e):e}catch(t){}}function a(t,n){var i=s.raw?t:o(t);return e.isFunction(n)?n(i):i}var r=/\+/g,s=e.cookie=function(o,r,c){if(void 0!==r&&!e.isFunction(r)){if(c=e.extend({},s.defaults,c),"number"==typeof c.expires){var l=c.expires,u=c.expires=new Date;u.setTime(+u+864e5*l)}return document.cookie=[t(o),"=",i(r),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var d=o?void 0:{},m=document.cookie?document.cookie.split("; "):[],f=0,g=m.length;g>f;f++){var p=m[f].split("="),v=n(p.shift()),b=p.join("=");if(o&&o===v){d=a(b,r);break}o||void 0===(b=a(b))||(d[v]=b)}return d};s.defaults={},e.removeCookie=function(t,n){return void 0===e.cookie(t)?!1:(e.cookie(t,"",e.extend({},n,{expires:-1})),!e.cookie(t))}});
(function() {


}).call(this);

/*!
 * jQuery.textcomplete.js
 *
 * Repositiory: https://github.com/yuku-t/jquery-textcomplete
 * License:     MIT
 * Author:      Yuku Takahashi
 */

 
;(function ($) {
 
  'use strict';
 
  /**
   * Exclusive execution control utility.
   */
  var lock = function (func) {
    var free, locked, queuedArgsToReplay;
    free = function () { locked = false; };
    return function () {
      var args = toArray(arguments);
      if (locked) {
        // Keep a copy of this argument list to replay later.
        // OK to overwrite a previous value because we only replay the last one.
        queuedArgsToReplay = args;
        return;
      }
      locked = true;
      var that = this;
      args.unshift(function replayOrFree() {
        if (queuedArgsToReplay) {
          // Other request(s) arrived while we were locked.
          // Now that the lock is becoming available, replay
          // the latest such request, then call back here to
          // unlock (or replay another request that arrived
          // while this one was in flight).
          var replayArgs = queuedArgsToReplay;
          queuedArgsToReplay = undefined;
          replayArgs.unshift(replayOrFree);
          func.apply(that, replayArgs);
        } else {
          locked = false;
        }
      });
      func.apply(this, args);
    };
  };
 
  /**
   * Convert arguments into a real array.
   */
  var toArray = function (args) {
    var result;
    result = Array.prototype.slice.call(args);
    return result;
  };
 
  /**
   * Get the styles of any element from property names.
   */
  var getStyles = (function () {
    var color;
    color = $('<div></div>').css(['color']).color;
    if (typeof color !== 'undefined') {
      return function ($el, properties) {
        return $el.css(properties);
      };
    } else {  // for jQuery 1.8 or below
      return function ($el, properties) {
        var styles;
        styles = {};
        $.each(properties, function (i, property) {
          styles[property] = $el.css(property);
        });
        return styles;
      };
    }
  })();
 
  /**
   * Default template function.
   */
  var identity = function (obj) { return obj; };
 
  /**
   * Memoize a search function.
   */
  var memoize = function (func) {
    var memo = {};
    return function (term, callback) {
      if (memo[term]) {
        callback(memo[term]);
      } else {
        func.call(this, term, function (data) {
          memo[term] = (memo[term] || []).concat(data);
          callback.apply(null, arguments);
        });
      }
    };
  };
 
  /**
   * Determine if the array contains a given value.
   */
  var include = function (array, value) {
    var i, l;
    if (array.indexOf) return array.indexOf(value) != -1;
    for (i = 0, l = array.length; i < l; i++) {
      if (array[i] === value) return true;
    }
    return false;
  };
 
  /**
   * Textarea manager class.
   */
  var Completer = (function () {
    var html, css, $baseList, _id;
 
    html = {
      list: '<ul class="dropdown-menu"></ul>'
    };
    css = {
      // Removed the 'top' property to support the placement: 'top' option
      list: {
        position: 'absolute',
        left: 0,
        zIndex: '100',
        display: 'none'
      }
    };
    $baseList = $(html.list).css(css.list);
    _id = 0;
 
    function Completer($el, option) {
      var focus;
      this.el = $el.get(0);  // textarea element
      focus = this.el === document.activeElement;
      this.$el = $el;
      this.id = 'textComplete' + _id++;
      this.strategies = [];
      this.option = option;
      if (focus) {
        this.initialize();
        this.$el.focus();
      } else {
        this.$el.one('focus.textComplete', $.proxy(this.initialize, this));
      }
    }
 
    /**
     * Completer's public methods
     */
    $.extend(Completer.prototype, {
 
      /**
       * Prepare ListView and bind events.
       */
      initialize: function () {
        var $list, globalEvents, appendTo, height;
        $list = $baseList.clone();
        this.listView = new ListView($list, this);
        this.$el.on({
          'keyup.textComplete': $.proxy(this.onKeyup, this),
          'keydown.textComplete': $.proxy(this.listView.onKeydown, this.listView)
        });
        appendTo = this.option.appendTo;
        if (appendTo) {
          // Append ListView to specified element.
          this.listView.appendTo(appendTo instanceof $ ? appendTo : $(appendTo));
        } else {
          this.listView.appendTo($('body'));
        }
        height = this.option.height;
        if (height) {
          $list.css("overflow-y", "auto");
          $list.height(height);
        }
        globalEvents = {};
        globalEvents['click.' + this.id] = $.proxy(this.onClickDocument, this);
        globalEvents['keyup.' + this.id] = $.proxy(this.onKeyupDocument, this);
        $(document).on(globalEvents);
      },
 
      /**
       * Register strategies to the completer.
       */
      register: function (strategies) {
        this.strategies = this.strategies.concat(strategies);
      },
 
      /**
       * Show autocomplete list next to the caret.
       */
      renderList: function (data) {
        if (this.clearAtNext) {
          this.listView.clear();
          this.clearAtNext = false;
        }
        if (data.length) {
          this.listView.strategy = this.strategy;
          if (!this.listView.shown) {
            this.listView
                .setPosition(this.getCaretPosition())
                .clear()
                .activate();
          }
          data = data.slice(0, this.strategy.maxCount);
          this.listView.render(data);
        }
 
        if (!this.listView.data.length && this.listView.shown) {
          this.listView.deactivate();
        }
      },
 
      searchCallbackFactory: function (free) {
        var self = this;
        return function (data, keep) {
          self.renderList(data);
          if (!keep) {
            // This is the last callback for this search.
            free();
            self.clearAtNext = true;
          }
        };
      },
 
      /**
       * Keyup event handler.
       */
      onKeyup: function (e) {
        if (this.skipSearch(e)) { return; }
        this.trigger(null, true);
      },
 
      /**
       * Public interface for invoking textcomplete.
       */
      trigger: function (text, suppress) {
        var searchQuery, term;
        text || (text = this.getTextFromHeadToCaret());
        searchQuery = this.extractSearchQuery(text);
        if (searchQuery.length) {
          term = searchQuery[1];
          if (suppress && this.term === term) {
            return; // Ignore shift-key or something.
          }
          this.term = term;
          this.search(searchQuery);
        } else {
          this.term = null;
          this.listView.deactivate();
        }
      },
 
      /**
       * Suppress searching if it returns true.
       */
      skipSearch: function (e) {
        switch (e.keyCode) {
          case 40: // DOWN
          case 38: // UP
            return true;
        }
        if (e.ctrlKey) switch (e.keyCode) {
          case 78: // Ctrl-N
          case 80: // Ctrl-P
            return true;
        }
      },
 
      onSelect: function (value) {
        var pre, post, newSubStr, sel, range, selection, remainder;
        pre = this.getTextFromHeadToCaret();
        remainder = pre.length;
 
        if (this.el.isContentEditable) {
          sel = window.getSelection();
          range = sel.getRangeAt(0);
          selection = range.cloneRange();
          selection.selectNodeContents(range.startContainer);
          var content = selection.toString();
          post = content.substring(range.startOffset);
        } else {
          post = this.el.value.substring(this.el.selectionEnd);
        }
 
        newSubStr = this.strategy.replace(value);
 
        if ($.isArray(newSubStr)) {
          post = newSubStr[1] + post;
          newSubStr = newSubStr[0];
        }
 
        pre = pre.replace(this.strategy.match, newSubStr);
 
        if (this.el.isContentEditable) {
          range.selectNodeContents(range.startContainer);
          range.deleteContents();
          var node = document.createTextNode(pre + post);
          range.insertNode(node);
          range.setStart(node, pre.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          this.$el.val(pre + post);
          this.el.selectionStart = this.el.selectionEnd = pre.length;
        }
 
        this.$el.trigger('change')
                .trigger('textComplete:select', value);
        this.el.focus();
      },
 
      /**
       * Global click event handler.
       */
      onClickDocument: function (e) {
        if (e.originalEvent && !e.originalEvent.keepTextCompleteDropdown) {
          this.listView.deactivate();
        }
      },
 
      /**
       * Global keyup event handler.
       */
      onKeyupDocument: function (e) {
        if (this.listView.shown && e.keyCode === 27) { // ESC
          this.listView.deactivate();
          this.$el.focus();
        }
      },
 
      /**
       * Remove all event handlers.
       */
      destroy: function () {
        this.$el.off('.textComplete');
        $(document).off('.' + this.id);
        if (this.listView) { this.listView.destroy(); }
        this.$el.removeData('textComplete');
        this.$el = null;
      },
 
      // Helper methods
      // ==============
 
      getCaretPosition: function () {
        var caretPosition, textareaOffset;
        caretPosition = this.getCaretRelativePosition();
        textareaOffset = this.$el.offset();
        caretPosition.top += textareaOffset.top;
        caretPosition.left += textareaOffset.left;
        return caretPosition;
      },
 
      /**
       * Returns caret's relative coordinates from textarea's left top corner.
       */
      getCaretRelativePosition: function () {
        var properties, css, $div, $span, position, dir, scrollbar, range, node, $node;
        if (!this.el.isContentEditable) {
          // Browser native API does not provide the way to know the position of
          // caret in pixels, so that here we use a kind of hack to accomplish
          // the aim. First of all it puts a div element and completely copies
          // the textarea's style to the element, then it inserts the text and a
          // span element into the textarea.
          // Consequently, the span element's position is the thing what we want.
          properties = ['border-width', 'font-family', 'font-size', 'font-style',
            'font-variant', 'font-weight', 'height', 'letter-spacing',
            'word-spacing', 'line-height', 'text-decoration', 'text-align',
            'width', 'padding-top', 'padding-right', 'padding-bottom',
            'padding-left', 'margin-top', 'margin-right', 'margin-bottom',
            'margin-left', 'border-style', 'box-sizing'
          ];
          scrollbar = this.$el[0].scrollHeight > this.$el[0].offsetHeight;
          css = $.extend({
            position: 'absolute',
            overflow: scrollbar ? 'scroll' : 'auto',
            'white-space': 'pre-wrap',
            top: 0,
            left: -9999,
            direction: dir
          }, getStyles(this.$el, properties));
 
          $div = $('<div></div>').css(css).text(this.getTextFromHeadToCaret());
          $span = $('<span></span>').text('.').appendTo($div);
          this.$el.before($div);
          position = $span.position();
          position.top += $span.height() - this.$el.scrollTop();
          $div.remove();
        } else {
          range = window.getSelection().getRangeAt(0).cloneRange();
          node = document.createElement('span');
          range.insertNode(node);
          range.selectNodeContents(node);
          range.deleteContents();
          $node = $(node);
          position = $node.offset();
          position.left -= this.$el.offset().left;
          position.top += $node.height() - this.$el.offset().top;
        }
        dir = this.$el.attr('dir') || this.$el.css('direction');
        if (dir === 'rtl') { position.left -= this.listView.$el.width(); }
        return position;
      },
 
      getTextFromHeadToCaret: function () {
        var text, selectionEnd, range;
        if (this.el.isContentEditable) {
          if (window.getSelection) {
            // IE9+ and non-IE
            var range = window.getSelection().getRangeAt(0);
            var selection = range.cloneRange();
            selection.selectNodeContents(range.startContainer);
            text = selection.toString().substring(0, range.startOffset);
          }
        } else {
          selectionEnd = this.el.selectionEnd;
          if (typeof selectionEnd === 'number') {
            text = this.el.value.substring(0, selectionEnd);
          } else if (document.selection) {
            range = this.el.createTextRange();
            range.moveStart('character', 0);
            range.moveEnd('textedit');
            text = range.text;
          }
        }
        return text;
      },
 
      /**
       * Parse the value of textarea and extract search query.
       */
      extractSearchQuery: function (text) {
        var i, l, strategy, match;
        for (i = 0, l = this.strategies.length; i < l; i++) {
          strategy = this.strategies[i];
          match = text.match(strategy.match);
          if (match) { return [strategy, match[strategy.index]]; }
        }
        return [];
      },
 
      search: lock(function (free, searchQuery) {
        var term;
        this.strategy = searchQuery[0];
        term = searchQuery[1];
        this.strategy.search(term, this.searchCallbackFactory(free));
      })
    });
 
    return Completer;
  })();
 
  /**
   * Dropdown menu manager class.
   */
  var ListView = (function () {
 
    function ListView($el, completer) {
      this.data = [];
      this.$el = $el;
      this.index = 0;
      this.completer = completer;
      if (completer.option.listPosition) {
        this.setPosition = completer.option.listPosition;
      }
 
      this.$el.on('mousedown.textComplete', 'li.textcomplete-item',
                  $.proxy(this.onClick, this));
      this.$el.on('mouseover.textComplete', 'li.textcomplete-item',
                  $.proxy(this.onMouseover, this));
    }
 
    $.extend(ListView.prototype, {
      shown: false,
 
      render: function (data) {
        var html, i, l, index, val, str;
 
        html = '';
 
        if(this.strategy.header) {
          if ($.isFunction(this.strategy.header)) {
            str = this.strategy.header(data);
          } else {
            str = this.strategy.header;
          }
          html += '<li class="textcomplete-header">' + str + '</li>';
        }
 
        for (i = 0, l = data.length; i < l; i++) {
          val = data[i];
          if (include(this.data, val)) continue;
          index = this.data.length;
          this.data.push(val);
          html += '<li class="textcomplete-item" data-index="' + index + '"><a>';
          html +=   this.strategy.template(val);
          html += '</a></li>';
          if (this.data.length === this.strategy.maxCount) break;
        }
 
        if(this.strategy.footer) {
          if ($.isFunction(this.strategy.footer)) {
            str = this.strategy.footer(data);
          } else {
            str = this.strategy.footer;
          }
          html += '<li class="textcomplete-footer">' + str + '</li>';
        }
 
        this.$el.append(html);
        if (!this.data.length) {
          this.deactivate();
        } else {
          this.activateIndexedItem();
          this.setScroll();
        }
      },
 
      clear: function () {
        this.data = [];
        this.$el.html('');
        this.index = 0;
        return this;
      },
 
      activateIndexedItem: function () {
        this.$el.find('.active').removeClass('active');
        this.getActiveItem().addClass('active');
      },
 
      getActiveItem: function () {
        return $(this.$el.children('.textcomplete-item').get(this.index));
      },
 
      activate: function () {
        if (!this.shown) {
          this.$el.show();
          this.completer.$el.trigger('textComplete:show');
          this.shown = true;
        }
        return this;
      },
 
      deactivate: function () {
        if (this.shown) {
          this.$el.hide();
          this.completer.$el.trigger('textComplete:hide');
          this.shown = false;
          this.data = [];
          this.index = null;
        }
        return this;
      },
 
      setPosition: function (position) {
        var fontSize;
        // If the strategy has the 'placement' option set to 'top', move the
        // position above the element
        if(this.strategy.placement.indexOf('top') > -1) {
          // Move it to be in line with the match character
          fontSize = parseInt(this.$el.css('font-size'));
          // Overwrite the position object to set the 'bottom' property instead of the top.
          position = {
            top: 'auto',
            bottom: this.$el.parent().height() - position.top + fontSize,
            left: position.left
          };
        } else {
          // Overwrite 'bottom' property because once `placement: 'top'`
          // strategy is shown, $el keeps the property.
          position.bottom = 'auto';
        }
 
        if (this.strategy.placement.indexOf('absleft') > -1) {
          position.left = 0;
        }
 
        if (this.strategy.placement.indexOf('absright') > -1) {
          position.right = 0;
          position.left = 'auto';
        }
 
        this.$el.css(position);
        return this;
      },
 
      setScroll: function (e) {
        var $activeItem = this.getActiveItem();
        var itemTop = $activeItem.position().top;
        var itemHeight = $activeItem.outerHeight();
        var visibleHeight = this.$el.innerHeight();
        var visibleTop = this.$el.scrollTop();
        if (this.index === 0 || this.index === this.data.length - 1 || itemTop < 0) {
          this.$el.scrollTop(itemTop + visibleTop);
        } else if (itemTop + itemHeight > visibleHeight) {
          this.$el.scrollTop(itemTop + itemHeight + visibleTop - visibleHeight);
        }
      },
 
      select: function (index) {
        var self = this;
        this.completer.onSelect(this.data[index]);
        // Deactive at next tick to allow other event handlers to know whether
        // the dropdown has been shown or not.
        setTimeout(function () { self.deactivate(); }, 0);
      },
 
      onKeydown: function (e) {
        if (!this.shown) return;
        var modifiers = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
        if (e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80)) {         // UP, or Ctrl-P
          e.preventDefault();
          if (this.index === 0) {
            this.index = this.data.length-1;
          } else {
            this.index -= 1;
          }
          this.activateIndexedItem();
          this.setScroll();
        } else if (e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78)) {  // DOWN, or Ctrl-N
          e.preventDefault();
          if (this.index === this.data.length - 1) {
            this.index = 0;
          } else {
            this.index += 1;
          }
          this.activateIndexedItem();
          this.setScroll();
        } else if (!modifiers && (e.keyCode === 13 || e.keyCode === 9)) {  // ENTER or TAB
          e.preventDefault();
          this.select(parseInt(this.getActiveItem().data('index'), 10));
        }
        else if (e.keyCode === 33) {                                       // PAGEUP
          e.preventDefault();
          var target = 0;
          var threshold = this.getActiveItem().position().top - this.$el.innerHeight();
          this.$el.children().each(function (i) {
            if ($(this).position().top + $(this).outerHeight() > threshold) {
              target = i;
              return false;
            }
          });
          this.index = target;
          this.activateIndexedItem();
          this.setScroll();
        }
        else if (e.keyCode === 34) {                                       // PAGEDOWN
          e.preventDefault();
          var target = this.data.length - 1;
          var threshold = this.getActiveItem().position().top + this.$el.innerHeight();
          this.$el.children().each(function (i) {
            if ($(this).position().top > threshold) {
              target = i;
              return false;
            }
          });
          this.index = target;
          this.activateIndexedItem();
          this.setScroll();
        }
      },
 
      onClick: function (e) {
        var $e = $(e.target);
        e.preventDefault();
        e.originalEvent.keepTextCompleteDropdown = true;
        if (!$e.hasClass('textcomplete-item')) {
          $e = $e.parents('li.textcomplete-item');
        }
        this.select(parseInt($e.data('index'), 10));
      },
 
      onMouseover: function (e){
        var $e = $(e.target);
        e.preventDefault();
        if(!$e.hasClass('textcomplete-item')) {
          $e = $e.parents('li.textcomplete-item');
        }
        this.index = parseInt($e.data('index'), 10)
        this.activateIndexedItem();
      },
 
      destroy: function () {
        this.deactivate();
        this.$el.off('click.textComplete').remove();
        this.$el = null;
      },
 
      appendTo: function ($el) {
        $el.css({ position: 'relative' }).append(this.$el)
      }
    });
 
    return ListView;
  })();
 
  $.fn.textcomplete = function (strategies, option) {
    var i, l, strategy, dataKey;
 
    dataKey = 'textComplete';
    option || (option = {});
 
    if (strategies === 'destroy') {
      return this.each(function () {
        var completer = $(this).data(dataKey);
        if (completer) { completer.destroy(); }
      });
    }
 
    for (i = 0, l = strategies.length; i < l; i++) {
      strategy = strategies[i];
      if (!strategy.template) {
        strategy.template = identity;
      }
      if (strategy.index == null) {
        strategy.index = 2;
      }
      if (strategy.placement == null) {
        strategy.placement = '';
      }
      if (strategy.cache) {
        strategy.search = memoize(strategy.search);
      }
      strategy.maxCount || (strategy.maxCount = 10);
    }
 
    return this.each(function () {
      var $this, completer;
      $this = $(this);
      completer = $this.data(dataKey);
      if (!completer) {
        completer = new Completer($this, option);
        $this.data(dataKey, completer);
      }
      completer.register(strategies);
    });
  };
 
})(window.jQuery || window.Zepto);
(function() {
  (function($) {
    var Boker;
    Boker = {
      init: function() {
        var Bootup, PageRestore, PageUpdate, self;
        self = this;
        Bootup = function() {
          self.siteBootUp();
        };
        PageUpdate = function() {
          self.sitePageUpdate();
        };
        PageRestore = function() {
          return self.sitePageRestore();
        };
        $(document).on("page:load", Bootup);
        $(document).on("page:update", PageUpdate);
        $(document).on("page:restore", PageRestore);
      },
      siteBootUp: function() {
        var self;
        self = this;
        self.initSemanticUiTools();
        self.initAvatarPreview();
        self.initUploadAvatar();
        self.initCheckXiamiInfo();
        self.initLoadingForm();
        self.initCustomDataConfirm();
        self.initInfiniteScrolling();
        self.initReplyUser();
        self.initRainyDay();
        self.initAutocompleteAtUser();
      },
      sitePageUpdate: function() {
        var self;
        self = this;
        self.initCloseMessage();
        self.initPlayer();
      },
      sitePageRestore: function() {
        var self;
        self = this;
        self.initRemoveLoading();
        $('.ui.sticky').sticky('refresh');
      },
      initSemanticUiTools: function() {
        $(".run-popup").popup();
        $(".ui.selection.dropdown").dropdown();
        $('.ui.sticky').sticky({
          offset: 100,
          bottomOffset: 50,
          context: '#main'
        });
        $('.modal-toggle').click(function() {
          return $('.song-form').modal('show');
        });
        $('.forget-password').click(function() {
          $('.reset-pwd-form').modal('show');
          return false;
        });
        $('#song-loading').progress('increment');
        $('.dimmer-image').dimmer({
          on: 'hover'
        });
        $('.ui.radio.checkbox').checkbox();
        $('.secondary.menu').find('.item').click(function() {
          $('.item.active').removeClass('active');
          $(this).addClass('active');
          return $('.status-panel').html('<div class="ui center aligned basic segment"><i class="spinner loading icon"></i>' + $('.secondary').data('loading') + '</div>');
        });
      },
      initAvatarPreview: function() {
        $(document).ready(function() {
          var AvatarPreview;
          AvatarPreview = function(avatar) {
            var reader;
            if (avatar.files && avatar.files[0]) {
              reader = new FileReader();
              reader.onload = function(e) {
                $(".user-avatar").attr("src", e.target.result);
              };
              reader.readAsDataURL(avatar.files[0]);
            }
          };
          $(".upload-avatar").change(function() {
            AvatarPreview(this);
          });
        });
      },
      initUploadAvatar: function() {
        $("input#user_avatar").css("display", "none");
        $(".user-avatar-upload").click(function() {
          $(".upload-avatar").click();
        });
      },
      initCloseMessage: function() {
        $(".message .close").on("click", function() {
          $(this).closest(".message").fadeOut();
        });
      },
      initPlayer: function() {
        $('.playBtn').unbind('click');
        $('.playBtn').click(function() {
          var $audio, $player, pause_icon, playMusic, play_icon, self;
          self = $(this);
          play_icon = self.find('i.play');
          pause_icon = self.find('i.pause');
          $player = $('#player').get(0);
          $audio = $('audio');
          if ($audio.attr('data-xiami_id') === $(this).attr('data-xiami_id')) {
            if ($player.paused) {
              $player.play();
              $('.rotating').removeClass('stop-rotate');
              play_icon.removeClass('play').addClass('pause');
            } else {
              $player.pause();
              $('.rotating').addClass('stop-rotate');
              $('.pause').removeClass('pause').addClass('play');
            }
          } else {
            play_icon.addClass('spinner loading');
            playMusic = function(music) {
              return $.get('http://inmusic.sinaapp.com/xiami_api/' + music, function(data) {
                if (data) {
                  $('.stop-rotate').removeClass('stop-rotate');
                  play_icon.removeClass('spinner loading');
                  $('.rotating').removeClass('rotating');
                  self.siblings('.image').addClass('rotating');
                  self.parents('.image').addClass('rotating');
                  $audio.attr({
                    "src": data.songurl,
                    "data-xiami_id": data.id
                  });
                  $('.pause').removeClass('pause').addClass('play');
                  play_icon.removeClass('play').addClass('pause');
                  $player.play();
                }
              });
            };
            playMusic($(this).data('xiami_id'));
          }
          $audio.on('ended', function() {
            var next_song;
            $('.rotating').removeClass('rotating');
            $('.pause').removeClass('pause').addClass('play');
            next_song = $(self).parents('.songs-list').next('.songs-list');
            $audio.attr({
              "src": '',
              "data-xiami_id": -1
            });
            return next_song.find('.playBtn').click();
          });
        });
      },
      initGetNotificationsCount: function() {
        var interval;
        interval = null;
        clearTimeout(interval);
        if ($('#unread-count').length > 0) {
          interval = setTimeout((function() {
            $.post("/notifications/count", function(data) {
              if (data > 0) {
                if (data > 99) {
                  '99';
                } else {
                  data;
                }
                $('#unread-count').addClass('red').text(data);
              }
            });
          }), 30000);
        }
      },
      initCheckXiamiInfo: function() {
        $('input#song_s_id').blur(function() {
          var $btn, s_id;
          $('#song-errors').removeClass().html("");
          s_id = $('input#song_s_id').val();
          $btn = $(this);
          $btn.addClass('loading');
          if (s_id.length > 0) {
            $.get("http://inmusic.sinaapp.com/xiami_api/" + s_id, function(data) {
              var title;
              title = data.title.replace(/&#39;/, "'");
              $('input#song_title').val(title);
              $('input#song_artist').val(data.singer);
              $('#song-errors').addClass("animated zoomIn").html('<div id="error_explanation"><div class="ui success message center aligned segment">' + $('#xiami-errors').data('passed') + '</div></div>');
            }).fail(function() {
              $('input#song_title').val("");
              $('input#song_artist').val('');
              $('#song-errors').addClass("animated bounceIn").html('<div id="error_explanation"><div class="ui error message center aligned segment">' + $('#xiami-errors').data('cant_fetch') + '</div></div>');
            }).always(function() {
              $btn.removeClass('loading');
            });
          } else {
            $('#song-errors').addClass("animated flash").html('<div id="error_explanation"><div class="ui error message center aligned segment">' + $('#xiami-errors').data('blank') + '</div></div>');
            $(this).removeClass('loading');
          }
        });
      },
      initLoadingForm: function() {
        return $(':submit').click(function() {
          return $('.ui.form').addClass("loading");
        });
      },
      initCustomDataConfirm: function() {
        $.rails.allowAction = function(link) {
          if (!link.attr("data-confirm")) {
            return true;
          }
          $.rails.showConfirmDialog(link);
          return false;
        };
        $.rails.confirmed = function(link) {
          link.removeAttr("data-confirm");
          return link.trigger("click.rails");
        };
        return $.rails.showConfirmDialog = function(link) {
          var html, message;
          html = void 0;
          message = void 0;
          $(".confirm-modal").remove();
          message = link.attr("data-confirm");
          html = "<div class=\"ui modal small confirm-modal\"><div class=\"content\"><p>" + message + "</p></div><div class=\"actions\"><div class=\"ui negative button\">No</div><div class=\"ui positive right labeled icon button\">Yes<i class=\"checkmark icon\"></i></div></div></div>";
          $("body").append(html);
          $(".confirm-modal").modal("show");
          return $(".confirm-modal .actions .positive").on("click", function() {
            return $.rails.confirmed(link);
          });
        };
      },
      initRemoveLoading: function() {
        return $('.ui.form').removeClass("loading");
      },
      initInfiniteScrolling: function() {
        $('#pagination').css('display', 'none');
        return $("#songs").infinitescroll({
          loading: {
            finishedMsg: '<div class="ui green inverted center aligned segment">' + $('#pagination').data('loaded') + '</div>',
            img: '/assets/loading.gif',
            msgText: ""
          },
          navSelector: "nav.pagination",
          nextSelector: "nav.pagination a[rel=next]",
          itemSelector: "#songs .songs-list",
          animate: false
        });
      },
      initReplyUser: function() {
        return $('.reply-user').click('.reply', function() {
          var name, value;
          value = $('textarea').val();
          name = "@" + $(this).find('.reply').attr('data-name');
          $('textarea').val(value + " " + name + " ");
          return $('textarea').focus();
        });
      },
      initAutocompleteAtUser: function() {
        var $users, at_users, i, user;
        at_users = [];
        user = void 0;
        $users = $(".author");
        i = 0;
        while (i < $users.length) {
          user = $users.eq(i).html();
          if ($.inArray(user, at_users) === -1) {
            at_users.push(user);
          }
          i++;
        }
        return $("textarea").textcomplete([
          {
            mentions: at_users,
            match: /\B@(\w*)$/,
            search: function(term, callback) {
              callback($.map(this.mentions, function(mention) {
                if (mention.indexOf(term) === 0) {
                  return mention;
                } else {
                  return null;
                }
              }));
            },
            index: 1,
            replace: function(mention) {
              return "@" + mention + " ";
            }
          }
        ], {
          appendTo: "body"
        });
      },
      initRainyDay: function() {
        var image;
        image = document.getElementById("rainyday");
        if (typeof image !== 'undefined' && image !== null) {
          image.onload = function() {
            var engine;
            engine = new RainyDay({
              image: this
            });
            engine.rain([[3, 2, 2]], 100);
          };
          image.crossOrigin = "anonymous";
          return image.src = "/assets/night.jpg";
        }
      }
    };
    window.Boker = Boker;
  })(jQuery);

  $(document).ready(function() {
    Boker.init();
    Boker.siteBootUp();
  });

}).call(this);







Turbolinks.enableProgressBar();
