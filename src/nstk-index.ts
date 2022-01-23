import program from "commander";

import { subcmdUpdateSessionKey } from "./nodleUpdateSessionKey";

const version = "v2.4.22";

const catchAndQuit = async (fn: any) => {
  try {
    await fn;
  } catch (e) {
    console.error(e.toString());
    process.exit(1);
  }
};

program
  .command("nstk-upskey")
  .description("Update the Session Key")
  .option("--ws <rpc-endpoint>", "Host Web-Socket RPC Endpoint", false)
  .action((cmd: { ws: string }) => catchAndQuit(subcmdUpdateSessionKey(cmd)));

program.version(version);
program.parse(process.argv);
