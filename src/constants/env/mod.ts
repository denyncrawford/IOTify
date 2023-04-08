import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";
import { CONFIG as PROD_CONFIG } from "./prod.env.ts";
import { CONFIG as DEV_CONFIG } from "./dev.env.ts";
import { CONFIG as STAGING_CONFIG } from "./staging.env.ts";

load();

export enum CONFIG {
  DEV = "development",
  PROD = "production",
  TEST = "test",
}

const getConfig = (env: CONFIG) => {
  switch (env) {
    case CONFIG.DEV:
      return DEV_CONFIG;
    case CONFIG.PROD:
      return PROD_CONFIG;
    case CONFIG.TEST:
      return STAGING_CONFIG;
    default:
      return DEV_CONFIG;
  }
};

export const ENV = getConfig(Deno.env.get("ENV") as CONFIG || CONFIG.DEV);