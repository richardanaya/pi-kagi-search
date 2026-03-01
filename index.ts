import { Type } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

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
      const token = process.env.KAGI_API_KEY;
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
