# Spike SP-04 — Will the Supabase Edge Function be able to safely access the Gemini API key

- **Unknown:** Will the Supabase Edge Function be able to safely access the Gemini API key without it being exposed
- **Feeds:** ADR 0004 - AI Suggestions: Prompting AI and receiving a response back for a suggestion based explanation for stress or a suggestion or a destressing activity
- **Requirements at risk:** NFR-SEC-01, NFR-SEC-02

## The question

Will the Supabase Edge Function be able to safely access the Gemini API key without it ever being exposed to Expo/React Native?

## The smallest thing that answers it

A Supabase Edge Function that will use the Gemini API key and test that it is kept secure by sending a prompt to the Gemini API and checking that the Gemini API key was never exposed to Expo/React Native.

## Success criterion

The Supabase Edge Function is able to access the key without it ever being exposed to Expo/React Native.

## Failure criterion

The Supabase Edge Function exposed the key to Expo/React Native when trying to access it or use it.

## Plan B if it fails

If the Supabase Edge Function fails to properly keep the Gemini API key safe when trying to access or use it then I will switch to Vercel Serverless Functions as it is able to work with React Native and is able to store Gemini AI's API key.

---