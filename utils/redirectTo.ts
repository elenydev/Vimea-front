export const RedirectTo = (router: NextRouter, path?: string = "/"): void => {
  return router.replace(path);
};
