import { RequestError } from "@octokit/request-error";

export async function script() {
    try {
      throw new Error("aaa");
    } catch (e) {
      if (e instanceof RequestError && e.status === 404) {
        console.log(e);
      }

      throw e;
    }
}
