import { NextRouter } from "next/dist/next-server/lib/router/router";

export const RedirectTo = (router: NextRouter, path: string = "/"): void => {
  router.replace(path);
};
