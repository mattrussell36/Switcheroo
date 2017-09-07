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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _RuleMatcher = __webpack_require__(4);

var _RuleMatcher2 = _interopRequireDefault(_RuleMatcher);

var _RulesService = __webpack_require__(2);

var _RulesService2 = _interopRequireDefault(_RulesService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = _RulesService2.default.getRulesService();
var rules = service.get();
window.rules = rules;
var ruleMatcher = new _RuleMatcher2.default(rules);

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return ruleMatcher.redirectOnMatch(details);
}, {
    urls: ['<all_urls>']
}, ['blocking']);

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var LocalRulesService = function LocalRulesService() {
    this.get = function () {
        return JSON.parse(localStorage.getItem('data') || '{}');
    };

    this.set = function (data) {
        localStorage.setItem('data', JSON.stringify(data));
    };
};

exports.default = {
    getRulesService: function getRulesService() {
        return new LocalRulesService();
    }
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RuleMatcher;
function RuleMatcher(rules) {
    var lastRequestId = void 0;

    /// Combine all rules from all groups
    rules = Object.keys(rules).reduce(function (arr, group) {
        return arr.concat(rules[group].paths);
    }, []);

    this.rules = rules;

    this.redirectOnMatch = function (request) {
        var rule = rules.find(function (rule) {
            return rule.active && request.url.indexOf(rule.from) > -1 && request.requestId !== lastRequestId;
        });

        if (rule) {
            lastRequestId = request.requestId;
            return {
                redirectUrl: request.url.replace(rule.from, rule.to)
            };
        }
    };
};

/***/ })

/******/ });
//# sourceMappingURL=background.bundle.js.map