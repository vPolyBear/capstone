# Spike SP-02 — Will Expo/React Native be able to sent a prompt and receive a response from Supabase Edge Function

- **Unknown:** Will Expo/React Native be able to send a prompt to Supabase Edge Function and receive the Edge Functions response back
- **Feeds:** ADR 0004 - AI Suggestions: Prompting AI and receiving a response back for a suggestion based explanation for stress or a suggestion or a destressing activity
- **Requirements at risk:** FR-AIA-01, FR-AIA-04

## The question

Will Expo/React be able to prompt the Supabase Edge Function 4 out of 5 times and receive a response that it got the prompt within 15 seconds?

## The smallest thing that answers it

A single script in Expo/React that prompts Supabase Edge Function with an AI prompt, checking for a response from the Edge Function that got the prompt, printing on screen the time that passed and whether Edge Function got the prompt or not. No error handling or UI beyond the prompting button, printing of the time passed and the response from Supabase Edge Function.

## Success criterion

4 out of 5 prompts sent provide a visible Supabase Edge Function response that states that the Supabase Edge Function got the prompt, shown by printing the response on screen in under 15 seconds.

## Failure criterion

Fewer that 4 prompts that were sent to Supabase Edge Function receive a response that it got it on screen, OR if the time passed from prompting to response printing is over 15 seconds.

## Plan B if it fails

If Supabase Edge Function fails to properly send a response back that it got the prompt send by Expo/React Native then I will switch to Vercel Serverless Functions as it is able to work with React Native and is able to receive prompts and send them to the Gemini AI API.

---