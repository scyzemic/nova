import { Application, Context, Router, Status } from "jsr:@oak/oak";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "npm:discord-interactions";
import { getRandomEmoji } from "./utils.ts";

const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY");
if (!PUBLIC_KEY) {
  throw new Error("PUBLIC_KEY is not set");
}

const router = new Router();

// /**
//  * Interactions endpoint URL where Discord will send HTTP requests
//  * Parse request body and verifies incoming requests using discord-interactions package
//  */
router.post(
  "/interactions",
  async (ctx: Context) => {
    const signature = ctx.request.headers.get("X-Signature-Ed25519");
    const timestamp = ctx.request.headers.get("X-Signature-Timestamp");
    ctx.assert(
      signature && timestamp,
      Status.Unauthorized,
      "Missing signature or timestamp",
    );

    // Verify request signature
    const rawBody = await ctx.request.body.text();
    const isValidRequest = await verifyKey(
      rawBody,
      signature,
      timestamp,
      PUBLIC_KEY,
    );
    ctx.assert(
      isValidRequest,
      Status.Unauthorized,
      "Invalid request signature",
    );

    // Parse request body
    const { type, data } = JSON.parse(rawBody);
    ctx.assert(
      type === InteractionType.PING ||
        type === InteractionType.APPLICATION_COMMAND,
      Status.BadRequest,
      "Unknown interaction type",
    );

    if (type === InteractionType.PING) {
      ctx.response.body = { type: InteractionResponseType.PONG };
      return;
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    const { name } = data;
    ctx.assert(
      name === "test",
      Status.BadRequest,
      `Unknown command: ${name}`,
    );

    // Send a message into the channel where command was triggered from
    ctx.response.body = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: `hello world ${getRandomEmoji()}`,
      },
    };
  },
);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
