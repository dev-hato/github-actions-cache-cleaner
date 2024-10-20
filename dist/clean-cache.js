"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/clean-cache.ts
var clean_cache_exports = {};
__export(clean_cache_exports, {
  script: () => script
});
module.exports = __toCommonJS(clean_cache_exports);

// node_modules/@octokit/request-error/dist-src/index.js
var RequestError = class extends Error {
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
};

// src/clean-cache.ts
async function script() {
  try {
    throw new Error("aaa");
  } catch (e) {
    if (e instanceof RequestError && e.status === 404) {
      console.log(e);
    }
    throw e;
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsZWFuLWNhY2hlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9Ab2N0b2tpdC9yZXF1ZXN0LWVycm9yL2Rpc3Qtc3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiQG9jdG9raXQvcmVxdWVzdC1lcnJvclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2NyaXB0KCkge1xuICB0cnkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImFhYVwiKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgUmVxdWVzdEVycm9yICYmIGUuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cblxuICAgIHRocm93IGU7XG4gIH1cbn1cbiIsICJjbGFzcyBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIG5hbWU7XG4gIC8qKlxuICAgKiBodHRwIHN0YXR1cyBjb2RlXG4gICAqL1xuICBzdGF0dXM7XG4gIC8qKlxuICAgKiBSZXF1ZXN0IG9wdGlvbnMgdGhhdCBsZWFkIHRvIHRoZSBlcnJvci5cbiAgICovXG4gIHJlcXVlc3Q7XG4gIC8qKlxuICAgKiBSZXNwb25zZSBvYmplY3QgaWYgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWRcbiAgICovXG4gIHJlc3BvbnNlO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXNDb2RlLCBvcHRpb25zKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJIdHRwRXJyb3JcIjtcbiAgICB0aGlzLnN0YXR1cyA9IE51bWJlci5wYXJzZUludChzdGF0dXNDb2RlKTtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMuc3RhdHVzKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgIH1cbiAgICBpZiAoXCJyZXNwb25zZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0Q29weSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMucmVxdWVzdCk7XG4gICAgaWYgKG9wdGlvbnMucmVxdWVzdC5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcbiAgICAgIHJlcXVlc3RDb3B5LmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnJlcXVlc3QuaGVhZGVycywge1xuICAgICAgICBhdXRob3JpemF0aW9uOiBvcHRpb25zLnJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uLnJlcGxhY2UoXG4gICAgICAgICAgLyAuKiQvLFxuICAgICAgICAgIFwiIFtSRURBQ1RFRF1cIlxuICAgICAgICApXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdENvcHkudXJsID0gcmVxdWVzdENvcHkudXJsLnJlcGxhY2UoL1xcYmNsaWVudF9zZWNyZXQ9XFx3Ky9nLCBcImNsaWVudF9zZWNyZXQ9W1JFREFDVEVEXVwiKS5yZXBsYWNlKC9cXGJhY2Nlc3NfdG9rZW49XFx3Ky9nLCBcImFjY2Vzc190b2tlbj1bUkVEQUNURURdXCIpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RDb3B5O1xuICB9XG59XG5leHBvcnQge1xuICBSZXF1ZXN0RXJyb3Jcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLElBQU0sZUFBTixjQUEyQixNQUFNO0FBQUEsRUFDL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSUE7QUFBQSxFQUNBLFlBQVksU0FBUyxZQUFZLFNBQVM7QUFDeEMsVUFBTSxPQUFPO0FBQ2IsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTLE9BQU8sU0FBUyxVQUFVO0FBQ3hDLFFBQUksT0FBTyxNQUFNLEtBQUssTUFBTSxHQUFHO0FBQzdCLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBQ0EsUUFBSSxjQUFjLFNBQVM7QUFDekIsV0FBSyxXQUFXLFFBQVE7QUFBQSxJQUMxQjtBQUNBLFVBQU0sY0FBYyxPQUFPLE9BQU8sQ0FBQyxHQUFHLFFBQVEsT0FBTztBQUNyRCxRQUFJLFFBQVEsUUFBUSxRQUFRLGVBQWU7QUFDekMsa0JBQVksVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHLFFBQVEsUUFBUSxTQUFTO0FBQUEsUUFDL0QsZUFBZSxRQUFRLFFBQVEsUUFBUSxjQUFjO0FBQUEsVUFDbkQ7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFDQSxnQkFBWSxNQUFNLFlBQVksSUFBSSxRQUFRLHdCQUF3QiwwQkFBMEIsRUFBRSxRQUFRLHVCQUF1Qix5QkFBeUI7QUFDdEosU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFDRjs7O0FEbENBLGVBQXNCLFNBQVM7QUFDN0IsTUFBSTtBQUNGLFVBQU0sSUFBSSxNQUFNLEtBQUs7QUFBQSxFQUN2QixTQUFTLEdBQUc7QUFDVixRQUFJLGFBQWEsZ0JBQWdCLEVBQUUsV0FBVyxLQUFLO0FBQ2pELGNBQVEsSUFBSSxDQUFDO0FBQUEsSUFDZjtBQUVBLFVBQU07QUFBQSxFQUNSO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
