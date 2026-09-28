# ADR 0004 — AI Suggestions

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Katherine Spencer
- **Requirements affected:** FR-AIA-01, FR-AIA-04, CON-01, FR-QUES-01, FR-JOU-01, NFR-PRIV-01, NFR-PRIV-02
- **Related ADRs:** ADR 0001 (Framework), ADR 0002 (Local Data Storage)

## Context

What about my requirements makes this a real decision to use the Gemini API for AI suggestions because the requirements highlight that I am making an app that will need to be able to have an AI agent response properly to a prompt and provide a suggestion based explanation for stress or a suggestion for a destressing activity (FR-AIA-01, FR-AIA-04) based on the check ins and journal entries (ASM-02, FR-QUES-01, FR-JOU-01). These requirements for this AI Anaylsis push on Gemini API which provides the AI suggestions, as the core feature of AI Anaylsis requires suggestions to be provided to individuals (FR-AIA-01, FR-AIA-04) only when prompted without sending unrelated personal information (NFR-PRIV-01, NFR-PRIV-02). This AI Suggestion service Gemini API makes it possible to provide these things and abilities to have an agent provide the suggestions required by my app.

I already know how to call APIs, however, what is new to me is calling the Gemini API through Supabase Edge Functions for a Expo/React Native app to get a response back based on the data provided. Though I expect that because of this choice of using Gemini API, that it will not cause me to go over my hour budget because I have budgeted for it and I will have a fallback to search for key words to base the suggestions on so that I will be able to complete the app within the deadline of 240 hours in 16 weeks (CON-01). Then Gemini also provides a tier that provides good limits that will work with what I need so it will allow me to work within my budget as a student.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| Gemini API | 5.00 | Fits in my budget the best as it provides a free tier  |
| Open AI API | 4.50 | Does not provide a free tier |
| Anthropic API | 4.20 | Does not provide a free tier |

## Decision

I will write a superseding ADR if Gemini API (Gemini 3.6 Flash) can't provide suggestions based on data inputted 4 out of 5 times or if the free tier ends and its monthly price exceeds over 50 dollars a month.

## Consequences

**Positive**

- What becomes easier is being able to easily provide a response for suggestion based explanations or suggestions for destressing activities (FR-AIA-01, FR-AIA-04)

**Negative**

- What becomes harder is learning how to send a request to Gemini API through Supabase Edge Function as I have never done this before.
- What is new to me is using the Gemini APi as I'll have to learn how to have it provide me useful suggestions thouhg I have budgeted 5 hours for this.
- I will continue to research how to use Gemini AI API with the Supabase Edge Function so that I can get the suggestions required for my app which will likely cost 4 hours.

## Revisit trigger

I will write a superseding ADR if Gemini AI can no longer provide me with suggestions 4 out of the 5 times it is requested for in less than 25 seconds or if it no longer is provides a free tier and the other tiers monthly price exceeds over 50 dollars a month.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| Gemini API has a free tier | https://ai.google.dev/gemini-api/docs/rate-limits?authuser=1 | 2026-09-27 |
| Gemini API has version Gemini 3.6 Flash | https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash & https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-6-flash | 2026-09-27 |
| Gemini API can provide me with suggestions I require | https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash & https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-6-flash | 2026-09-27 |
| Gemini API works with the Supabase Edge Function | https://supabase.com/partners/catalog/google-gemini | 2026-09-27 |
