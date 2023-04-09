import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";

load();

export const CONFIG = {
  port: Deno.env.get('PORT') || 3000,
  db: {
    host: "localhost",
    port: 27017,
    name: "deno",
    password: Deno.env.get('DB_PASSWORD') || '',
    username: Deno.env.get('DB_USERNAME') || '',
  },
  jwt: {
    secret: Deno.env.get('JWT_SECRET') || 'secret',
    expiresIn: Deno.env.get('JWT_EXPIRES_IN') || '1h',
  },
};