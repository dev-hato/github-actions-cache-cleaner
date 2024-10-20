"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.script = script;
const request_error_1 = require("@octokit/request-error");
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
