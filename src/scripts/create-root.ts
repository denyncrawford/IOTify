import userEntity from "@/entities/user.entity.ts";
import { UserType } from "@/interfaces/users.interface.ts";
import { connect } from 'mongoose'
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";
import { ENV } from "@/constants/env/mod.ts";

load();

const name = Deno.args[0];
const password = Deno.args[1];
const email = Deno.args[2];
const username = Deno.args[3];

await connect(`mongodb://${ENV.db.host}:${ENV.db.port}/${ENV.db.name}`);

const createRootUser = async () => {
  console.log({ name, password, email, username} );
  if (!name || !password || !email || !username) {
    console.log("Missing arguments to create root user");
    return;
  }
  try {
    await userEntity.create({
      name,
      password,
      email,
      username,
      type: UserType.ADMIN,
    });
    console.log("User created successfully");
    Deno.exit(0);
  } catch (error) {
    throw new Error(error);
  }
}

createRootUser();