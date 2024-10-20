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
async function getActionsGetActionsCacheList(github, context) {
  const actionsGetActionsCacheListParams = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    sort: "last_accessed_at",
    direction: "asc"
  };
  console.log(
    "call actions.getActionsCacheList",
    actionsGetActionsCacheListParams
  );
  return await github.paginate(
    github.rest.actions.getActionsCacheList,
    actionsGetActionsCacheListParams
  );
}
function getSumSize(actionsGetActionsCacheList) {
  return actionsGetActionsCacheList.reduce(
    (sum, size) => sum + (size.size_in_bytes ?? 0),
    0
  );
}
async function script(github, context) {
  let actionsGetActionsCacheList = await getActionsGetActionsCacheList(github, context);
  let sumSize = getSumSize(actionsGetActionsCacheList);
  for (let i = 0; i < 40 && 7 * 1024 * 1024 * 1024 < sumSize; i++) {
    const actionCache = actionsGetActionsCacheList.shift();
    if (actionCache === void 0 || actionCache.key === void 0 || actionCache.size_in_bytes === void 0) {
      continue;
    }
    const actionsDeleteActionsCacheByKey = {
      owner: context.repo.owner,
      repo: context.repo.repo,
      key: actionCache.key
    };
    console.log(
      "call actions.deleteActionsCacheByKey",
      actionsDeleteActionsCacheByKey
    );
    try {
      await github.rest.actions.deleteActionsCacheByKey(
        actionsDeleteActionsCacheByKey
      );
    } catch (e) {
      if (e instanceof RequestError && e.status === 404) {
        actionsGetActionsCacheList = await getActionsGetActionsCacheList(
          github,
          context
        );
        sumSize = getSumSize(actionsGetActionsCacheList);
        continue;
      }
      throw e;
    }
    sumSize -= actionCache.size_in_bytes;
  }
}
export {
  script
};
