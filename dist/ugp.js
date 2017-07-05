/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by vpotseluyko on 7/5/17.
 */
__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["urlGetParser"] = __webpack_require__(3);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlGetParser = {
    /**
     * Returns url get params in object
     * @returns {{}}
     */
    get_url_params: function get_url_params(search) {
        if (typeof search === "undefined") {
            search = location.search;
        }
        var paramsObj = {};
        var url = search.substr(1, search.length - 1).split('&');
        if (url.length > 0) {
            // check if url had params before
            url.forEach(function (item) {
                paramsObj[item.split("=")[0]] = item.split("=")[1];
                // translate all params to object
                // {name: value}
            });
        }
        return paramsObj;
    },


    /**
     * @param change - object or array of object
     *      {name: value}
     * @param options
     * @returns {string}
     */
    replace_url_value: function replace_url_value(change, options) {
        if (typeof options === "undefined") {
            options = {};
        }
        if (typeof options.change === "undefined") {
            options.change = true;
        }
        var pathname = void 0;
        var search = void 0;
        if (typeof options.url !== "undefined") {
            var urlParts = options.url.split('?');
            pathname = urlParts[0];
            options.change = false;
            search = urlParts.length > 1 ? "?" + urlParts[1] : '';
        } else {
            pathname = location.pathname;
            search = location.search;
        }
        if (!Array.isArray(change)) {
            change = [change];
        }
        var paramsObj = this.get_url_params(search);
        change.forEach(function (item) {
            Object.keys(item).map(function (key) {
                paramsObj[key] = item[key];
            });
        });
        var params = [];
        Object.keys(paramsObj).map(function (key) {
            if (typeof paramsObj[key] === "undefined" || paramsObj[key] === null) {
                delete paramsObj[key];
            } else {
                params.push(key + "=" + encodeURIComponent(paramsObj[key]));
            }
        });
        var url = pathname + "?" + params.join("&");
        if (options.change) {
            if (typeof window.history !== "undefined" && typeof window.history.replaceState !== "undefined") {
                window.history.replaceState(null, document.title, url);
            } else {
                location.href = url;
            }
        }
        return url;
    }
};

module.exports = urlGetParser;

/***/ })
/******/ ]);