import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "npm:@google/genai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const promptInstructions: Record<string, string> = {
  explanation1: "Explain what the reported stress and mood may suggest.",
  explanation2: "Explain how each check in response may relate to the reported stress.",
  activities1: "Suggest one simple activity.",
  activities2: "Suggest one simple physical activity.",
  activities3: "Suggest one short creative activity.",
  both1: "Pair a brief explanation with one simple activity.",
  both2: "Pair a brief explanation with one simple physical activity.",
  both3: "Pair a brief explanation with one short creative activity.",
};

const analysisTypes: Record<string, string> = {
  explanation: "Provide short suggestion based explanation of the stress check-in.",
  activities: "Suggest one destressing activity.",
  both: "Provide a short suggestion based explanation and one destressing activity.",
};

const jsonResponse = (body: Record<string, string | number>, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  if (!apiKey) {
    console.error("GOOGLE_API_KEY is not configured for sendAnalysis.");
    return jsonResponse({ error: "Analysis service is not configured." }, 500);
  }

  let requestBody: unknown;
  try {
    requestBody = await req.json();
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON." }, 400);
  }

  if (!requestBody || typeof requestBody !== "object") {
    return jsonResponse({ error: "Request body must be a JSON object." }, 400);
  }

  const { analysisType, promptId, checkIns, journalEntries } = requestBody as {
    analysisType?: unknown;
    promptId?: unknown;
    checkIns?: unknown;
    journalEntries?: unknown;
  };

  if (typeof analysisType !== "string" || !analysisTypes[analysisType]) {
    return jsonResponse({ error: "Choose a valid analysis type." }, 400);
  }

  if (
    typeof promptId !== "string" ||
    !promptInstructions[promptId] ||
    !promptId.startsWith(analysisType)
  ) {
    return jsonResponse({ error: "Choose a valid prompt for the selected analysis type." }, 400);
  }

  try {
    const client = new GoogleGenAI({ apiKey });
    const interaction = await client.interactions.create({
      model: "gemini-3.8-flash",
      input: `Use this prompt and follow the instruction to provide a response that is based on the data from the check-ins and journal entries. DO NOT DIAGNOSE!

      ${analysisTypes[analysisType]}
      ${promptInstructions[promptId]}
      ${JSON.stringify(checkIns, null, 2)}
      ${JSON.stringify(journalEntries, null, 2)}

      `,
            generation_config: {
              max_output_tokens: 1500,
              thinking_level: "medium",
            },
            store: false,
          });

          const output = interaction.output_text?.trim();
          if (!output) {
            console.error("Gemini returned no analysis text.");
            return jsonResponse({ error: "The analysis service returned an empty response." }, 502);
          }

          return jsonResponse({ output });
        } catch (error) {
          console.error("Gemini analysis request failed.", error);

          const upstreamStatus =
            typeof error === "object" &&
            error !== null &&
            "status" in error &&
            typeof error.status === "number"
              ? error.status
              : undefined;
          const message = upstreamStatus === 429
            ? "Gemini rate limit or quota exceeded."
            : upstreamStatus === 401 || upstreamStatus === 403
              ? "Gemini rejected the server API key."
              : "Gemini could not complete the analysis. Please retry.";

          return jsonResponse({
            error: message,
            ...(upstreamStatus === undefined ? {} : { upstreamStatus }),
          }, 502);
        }
      });
