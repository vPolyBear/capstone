# Spike SP-03 — Will the Supabase Edge Function be able to send a prompt and receive back from Gemini API

- **Unknown:** Will the Supabase Edge Function be able to send the prompt it received to the Gemini API and receive a response back?
- **Feeds:** ADR 0004 - AI Suggestions: Prompting AI and receiving a response back for a suggestion based explanation for stress or a suggestion or a destressing activity
- **Requirements at risk:** FR-AIA-01, FR-AIA-04

## The question

Will the Supabase Edge Function be able to send the prompt it received 4 out of 5 times to the Gemini API and receive a response back within 25 seconds?

## The smallest thing that answers it

A Supabase Edge Function prompt it received is sent to Gemini API for a response, this response is then printed on screen with the time passed from the prompting to the response printed. No error handling or UI beyond the prompting button, printing of the time passed and the response from Gemini API.

## Success criterion

4 out of 5 prompts that Supabase Edge Function received are sent to the Gemini API and provide a visible response of the prompted answered back from the Gemini API, shown by printing the response on screen in under 25 seconds.

## Failure criterion

Fewer that 4 prompts that were sent to the Gemini API from the Supabase Edge Function receive a response where the responses are shown on screen, OR if the time passed from prompt sending to response printing is over 25 seconds.

## Plan B if it fails

If Gemini API fails to properly send a response back based on the Supabase Edge Functions prompt then I will switch to Open AI API as it ranked the second highest and works with Supabase Edge Function.

---