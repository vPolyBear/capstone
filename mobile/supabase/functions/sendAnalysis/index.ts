import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "npm:@google/genai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const promptInstructions: Record<string, string> = {
  explanation1: "Explain briefly and simply what the reported stress and mood may suggest.",
  explanation2: "Explain how the physical feelings and daily patterns may suggest and relate to the reported stress and mood.",
  explanation3: "Explain what the progression and patterns of stress and mood may suggest and how to help it.",
  activities1: "Suggest one simple and quick activity based on the reported stress.",
  activities2: "Suggest one activity based on the reported physical feelings.",
  activities3: "Suggest a longer activity to do that will make the most impact on the reported stress.",
  both1: "Pair a brief explanation on the reported stress with one simple activity.",
  both2: "Pair a moderate length explanation on the reported stress with an average length activity.",
  both3: "Pair a longer explanation on the reported stress with one longer activity.",
};

const analysisTypes: Record<string, string> = {
  explanation: "Provide a short suggestion based explanation of the stress.",
  activities: "Suggest one destressing activity.",
  both: "Provide a short suggestion based explanation to explain the why and one activity to help destress.",
};

const jsonResponse = (body: Record<string, string | number>, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

const countRequests: number[] = [];

function checkRequestAmount(): boolean {
  const checkTime = Date.now();

  while (countRequests.length > 0 && checkTime - countRequests[0] >= 5000){
    countRequests.shift();
  }

  if(countRequests.length >= 5) {
    return false;
  }
  countRequests.push(checkTime);

  return true;
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log("Invalid request method, ", req.method);
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  if(!checkRequestAmount()) {
    console.log("Too many request, AI Analysis requests exceeded the limit of 5 requests in the time limit of 5 seconds");
    return jsonResponse({ error: "To many AI Analysis requests were sent in too short of a time period. Please wait a few seconds between each request before trying again."}, 429);
  }

  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  if (!apiKey) {
    console.log("GOOGLE_API_KEY is not configured for sendAnalysis.");
    return jsonResponse({ error: "Analysis service is not configured." }, 500);
  }

  let requestBody: unknown;
  try {
    requestBody = await req.json();
  } catch {
    console.log("Invalid request: Request body must be valid JSON.");
    return jsonResponse({ error: "Request body must be valid JSON." }, 400);
  }

  if (!requestBody || typeof requestBody !== "object") {
    console.log("Invalid request: Request body must be valid JSON object.");
    return jsonResponse({ error: "Request body must be a JSON object." }, 400);
  }

  const { analysisType, promptId, checkIns, journalEntries } = requestBody as {
    analysisType?: unknown;
    promptId?: unknown;
    checkIns?: unknown;
    journalEntries?: unknown;
  };
  
  if(!Array.isArray(checkIns)){
    console.log("Invalid request, Check-ins must be an array.");
    return jsonResponse({ error: "Check-ins must be an array."}, 400);
  }
  if(!Array.isArray(journalEntries)){
    console.log("Invalid request, Journal Entries must be an array.");
    return jsonResponse({ error: "Journal Entries must be an array."}, 400);
  }

  for(let i = 0; i < checkIns.length; i++ ){
    if (typeof checkIns[i] !== "object" || Array.isArray(checkIns[i]) || checkIns[i] === null) {
    console.log("Invalid request, Check-in response is malformed.");
      return jsonResponse({ error: "There was an invaid check in response." }, 400);
    }
  }
  for(let i = 0; i < journalEntries.length; i++ ){
    if (typeof journalEntries[i] !== "object" || Array.isArray(journalEntries[i]) || journalEntries[i] === null) {
      console.log("Invalid request, Journal Entry response is malformed.");
      return jsonResponse({ error: "There was an invaid journal entry response." }, 400);
    }
  }

  if (typeof analysisType !== "string" || !analysisTypes[analysisType]) {
    console.log("Invalid request, Analysis type is malformed.");
    return jsonResponse({ error: "Choose a valid analysis type." }, 400);
  }

  if (typeof promptId !== "string" || !promptInstructions[promptId] || !promptId.startsWith(analysisType)) {
    console.log("Invalid request, Prompt is malformed.");
    return jsonResponse({ error: "Choose a valid prompt for the selected analysis type." }, 400);
  }

  for (let i = 0; i < checkIns.length; i++){
     if ((checkIns[i].stress_level == null || checkIns[i].stress_level === '') || (checkIns[i].mood === null || checkIns[i].mood === '') || (checkIns[i].eaten_recently === null || checkIns[i].eaten_recently === '') || (checkIns[i].concentration_level === null || checkIns[i].concentration_level === '')){
      console.log("Invalid request, Check-in response is missing.");
      return jsonResponse({ error: "A required check-in response is missing" }, 400);
     }
  }

  for (let i = 0; i < journalEntries.length; i++){
     if ((journalEntries[i].entry == null || journalEntries[i].entry === '')){
      console.log("Invalid request, Journal Entry response is missing.");
      return jsonResponse({ error: "A required journal entry response is missing" }, 400);
     }
  }


  try {
    const client = new GoogleGenAI({ apiKey });
    const interaction = await client.interactions.create({
      model: "gemini-3.8-flash",
      input: `Use this prompt and follow the instruction to provide a response that is based on the data from the check-ins and journal entries to help their stress. DO NOT DIAGNOSE!

      ${analysisTypes[analysisType]}
      ${promptInstructions[promptId]}
      ${JSON.stringify(checkIns, null, 2)}
      ${JSON.stringify(journalEntries, null, 2)}

      No matter what, return your response using these exact labels:
        Explanation: [Your explanation, or leave this empty if it was not requested]
        Activity: [Your suggested activity, or leave this empty if it was not requested]
      `,
            generation_config: {
              max_output_tokens: 600,
              thinking_level: "low",
            },
            store: false,
          });

          const output = interaction.output_text?.trim();
          if (!output) {
            console.log("Gemini returned no analysis text.");
            return jsonResponse({ error: "The analysis service returned an empty response." }, 500);
          }

          const parts = output.split("Activity:");

          const analysis_explanation = parts[0].replace("Explanation:", "").trim();
          const activity_suggestion = parts.length > 1 ? parts[1].trim() : "";

          if ((analysisType === "explanation" && analysis_explanation === "") || (analysisType === "activities" && activity_suggestion === "") || (analysisType === "both" && (analysis_explanation === "" || activity_suggestion === ""))) {
            return jsonResponse({ error: "Gemini returned an incomplete response." }, 500);
          }

          return jsonResponse({
              analysis_explanation,
              activity_suggestion
          }, 200);
        } catch (error) {
          console.log("Gemini analysis request failed.", error);

          let message = "Gemini was not able to complete the analysis. Please try again.";
          if (typeof error === "object" && error !== null && "status" in error) {
             if(error.status  === 429){
                message = "Gemini rate limit or quota exceeded."
             }
              else if (error.status === 401 || error.status  === 403){
                message = "Gemini rejected the server API key."
              }
            }
          return jsonResponse({ error: message}, 500);
        }
      });
