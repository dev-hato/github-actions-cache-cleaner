import type { Context } from "@actions/github/lib/context";
import type { GitHub } from "@actions/github/lib/utils";
import type { PaginatingEndpoints } from "@octokit/plugin-paginate-rest";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { RequestError } from "@octokit/request-error";

async function getActionsGetActionsCacheList(
  github: InstanceType<typeof GitHub>,
  context: Context,
): Promise<
  PaginatingEndpoints["GET /repos/{owner}/{repo}/actions/caches"]["response"]["data"]["actions_caches"]
> {
  const actionsGetActionsCacheListParams: RestEndpointMethodTypes["actions"]["getActionsCacheList"]["parameters"] =
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      sort: "last_accessed_at",
      direction: "asc",
    };
  console.log(
    "call actions.getActionsCacheList",
    actionsGetActionsCacheListParams,
  );
  return await github.paginate(
    github.rest.actions.getActionsCacheList,
    actionsGetActionsCacheListParams,
  );
}

function getSumSize(
  actionsGetActionsCacheList: PaginatingEndpoints["GET /repos/{owner}/{repo}/actions/caches"]["response"]["data"]["actions_caches"],
): number {
  return actionsGetActionsCacheList.reduce(
    (sum: number, size): number => sum + (size.size_in_bytes ?? 0),
    0,
  );
}

export async function script(
  github: InstanceType<typeof GitHub>,
  context: Context,
) {
  let actionsGetActionsCacheList: PaginatingEndpoints["GET /repos/{owner}/{repo}/actions/caches"]["response"]["data"]["actions_caches"] =
    await getActionsGetActionsCacheList(github, context);
  let sumSize = getSumSize(actionsGetActionsCacheList);
  const deletedActionCacheKeys:string[]=[];

  for (let i = 0; i < 40 && 7 * 1024 * 1024 * 1024 < sumSize; i++) {
    const actionCache = actionsGetActionsCacheList.shift();

    if (
      actionCache === undefined ||
      actionCache.key === undefined ||
      actionCache.size_in_bytes === undefined ||
      deletedActionCacheKeys.includes(actionCache.key)
    ) {
      continue;
    }

    const actionsDeleteActionsCacheByKey: RestEndpointMethodTypes["actions"]["deleteActionsCacheByKey"]["parameters"] =
      {
        owner: context.repo.owner,
        repo: context.repo.repo,
        key: actionCache.key,
      };
    console.log(
      "call actions.deleteActionsCacheByKey",
      actionsDeleteActionsCacheByKey,
    );

    try {
      await github.rest.actions.deleteActionsCacheByKey(
        actionsDeleteActionsCacheByKey,
      );
    } catch (e) {
      if (e instanceof RequestError && e.status === 404) {
        actionsGetActionsCacheList = await getActionsGetActionsCacheList(
          github,
          context,
        );
        sumSize = getSumSize(actionsGetActionsCacheList);
        continue;
      }

      throw e;
    }

    deletedActionCacheKeys.push(actionCache.key);
    sumSize -= actionCache.size_in_bytes;
  }
}
