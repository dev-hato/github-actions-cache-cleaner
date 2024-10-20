require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 15:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.r(__webpack_exports__);
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   RequestError: () => (/* binding */ RequestError)
/* harmony export */ });
class RequestError extends Error {
  name;
  /**
   * http status code
   */
  status;
  /**
   * Request options that lead to the error.
   */
  request;
  /**
   * Response object if a response was received
   */
  response;
  constructor(message, statusCode, options) {
    super(message);
    this.name = "HttpError";
    this.status = Number.parseInt(statusCode);
    if (Number.isNaN(this.status)) {
      this.status = 0;
    }
    if ("response" in options) {
      this.response = options.response;
    }
    const requestCopy = Object.assign({}, options.request);
    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(
          / .*$/,
          " [REDACTED]"
        )
      });
    }
    requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy;
  }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.script = script;
const request_error_1 = __nccwpck_require__(15);
async function getActionsGetActionsCacheList(github, context) {
    const actionsGetActionsCacheListParams = {
        owner: context.repo.owner,
        repo: context.repo.repo,
        sort: "last_accessed_at",
        direction: "asc",
    };
    console.log("call actions.getActionsCacheList", actionsGetActionsCacheListParams);
    return await github.paginate(github.rest.actions.getActionsCacheList, actionsGetActionsCacheListParams);
}
function getSumSize(actionsGetActionsCacheList) {
    return actionsGetActionsCacheList.reduce((sum, size) => { var _a; return sum + ((_a = size.size_in_bytes) !== null && _a !== void 0 ? _a : 0); }, 0);
}
async function script(github, context) {
    let actionsGetActionsCacheList = await getActionsGetActionsCacheList(github, context);
    let sumSize = getSumSize(actionsGetActionsCacheList);
    for (let i = 0; i < 40 && 7 * 1024 * 1024 * 1024 < sumSize; i++) {
        const actionCache = actionsGetActionsCacheList.shift();
        if (actionCache === undefined ||
            actionCache.key === undefined ||
            actionCache.size_in_bytes === undefined) {
            continue;
        }
        const actionsDeleteActionsCacheByKey = {
            owner: context.repo.owner,
            repo: context.repo.repo,
            key: actionCache.key,
        };
        console.log("call actions.deleteActionsCacheByKey", actionsDeleteActionsCacheByKey);
        try {
            await github.rest.actions.deleteActionsCacheByKey(actionsDeleteActionsCacheByKey);
        }
        catch (e) {
            if (e instanceof request_error_1.RequestError && e.status === 404) {
                actionsGetActionsCacheList = await getActionsGetActionsCacheList(github, context);
                sumSize = getSumSize(actionsGetActionsCacheList);
                continue;
            }
            throw e;
        }
        sumSize -= actionCache.size_in_bytes;
    }
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map