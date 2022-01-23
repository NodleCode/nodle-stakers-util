import ApiHandler from "./ApiHandler";
import { Keyring } from "@polkadot/keyring";
import { sleep } from "./util";

export const subcmdUpdateSessionKey = async (cmd: { ws: string }) => {
  if (!process.env.STAKER_SECRET) {
    console.log(`Set Environment STAKER_SECRET`);
    process.exit(0);
  }

  const keyring = new Keyring({ type: "sr25519" });

  console.log(`Connecting to endpoint :: ${cmd.ws}`);

  const handler = await ApiHandler.create([cmd.ws]);
  const api = await handler.getApi();

  console.log(
    `UpdateSessionKey > endpoint ${
      cmd.ws
    } handler is connected: ${handler.isConnected()}`
  );

  const session_key = await api.rpc.author.rotateKeys();

  console.log(`UpdateSessionKey > ${session_key}`);

  const session_set_key = api.tx.session.setKeys(
    // @ts-ignore
    session_key.toHex(),
    "0x"
  );

  try {
    const validKeyPair = keyring.addFromUri(process.env.STAKER_SECRET);

    await session_set_key.signAndSend(validKeyPair);

    await sleep(2000);

    console.log(`UpdateSessionKey > tx Done`);
  } catch {
    console.log(`UpdateSessionKey > tx Failed`);
  }

  console.log(`UpdateSessionKey > Done | Press CTRL+C to exit`);
};
