import React from "react";
import { useRouter, NextRouter } from "next/router";

const routerInstance = (): NextRouter => {
  const router = useRouter();
  return router;
};

export default routerInstance;
