import { Type } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { homedir } from "node:os";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

const CONFIG_PATH = join(homedir(), ".pi", "kagi-search.json");

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "kagi_search",
    label: "Kagi Search",
    description: "Search the web using Kagi Search",
    parameters: Type.Object({
      query: Type.String({ description: "The search query" }),
    }),

    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const { query } = params as { name: string };
      // equivalent of curl -v \ -H "Authorization: Bot $TOKEN" \ https://kagi.com/api/v0/search\?q=steve+jobs
      let token;
      try {
        const configData = await readFile(CONFIG_PATH, 'utf8');
        const config = JSON.parse(configData);
        token = config.kagiSearchApiKey;
      } catch (error) {
        throw new Error(`Failed to read API key from ${CONFIG_PATH}: ${error.message}`);
      }
      const result = await fetch(
        `https://kagi.com/api/v0/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bot ${token}`,
          },
        },
      );
      const data = await result.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }],
        details: { query, results: data.results },
      };
    },
  });
}
