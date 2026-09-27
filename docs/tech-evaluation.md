## Drivers

| Driver | Requirement id | Why it constrains the stack |
|---|---|---|
| Must be able to communicate with an AI API and properly store its key | FR-AIA-01, FR-AIA-04, NFR-SEC-01, NFR-SEC-02 | Rules out technology stacks that can not implement AI APIs or their keys | 
| Must be able to save and pull the data stored on a phone locally | FR-JOU-01 FR-OVER-01, FR-QUES-01, FR-QUES-03, FR-AIA-01, FR-AIA-04 | Rules out technology that can not pull data that was locally stored on an stressed individuals phone |
| Must be able to not send any unrelated personal information or device information to Gemini when the AI is prompted | NFR-PRIV-02 | Rules out technology that can not choose where data is sent |
| Must be able to measure that the AI Analysis in a p95 under 25 seconds | NFR-PERF-01 | Rules out technology that can not measure specific circumstances |
| Must run where my grader can reach it, specifically on an iOS iPhone through Expo Go and if necessary an simulator for the presentation | CON-02, DEP-02, MNT-01 | Rules out other technology that is not compatible with Expo |


## The job-board test

| Technology | The real reason | Driver or résumé?/(serves me) |
|---|---|---|
| Expo | I want to use this for my app as it is a driver because I need my app to run on an iOS iPhone and I have done more research on it than other technologies though it is a novelty load of 1 so it will take me a bit of extra time understanding it. | Driver |
| React Native | I want to use this for my app as it is a driver because it works with Expo to create the mobile app | Driver |
| React | I purely just want React on my résumé though it is not a driver for this project as it won't create a true native app and React Native definitely works better for mobile devices so, instead I will use it on a side project. | Résumé |
| Expo SQLite | I want to use this for my app as it is a driver because I need to and want to store data locally and it serves me as it is built into expo making it easier for me to store data locally | Driver + Résumé |
| Supabase Edge Function | I want to use this for my app as it is a driver since it can help me store my AI API key safely and I have done more research on it than others though again it is a novelty load of 1 so it will take me a bit of extra time understanding it. | Driver + Résumé |
| Expo API Route | This serves me as it works with Expo though later on it may cost me 7 to 10 more hours as it seems to need a server and I haven't really worked with those | Résumé |


## Generate the option space, then prune it

Data store

Ask an assistant to widen the field:
For a solo developer building a stress management app with check ins, journal entries, weekly and monthly overviews, and ai analysis, there are over about 200 remaining hours, list eight options for data store. Include at least two that are unfashionable. For each: one sentence on what it is best at, and one sentence on its most common failure mode. Do not recommend one. 

Now prune to three, on paper, by hand. Keep at least one option you did not previously want. Delete anything with a novelty load you cannot afford.

The eight it provided me:
1. Supabase (PostgreSQL)
2. SQLite
3. Realm / Atlas Device SDK
4. WatermelonDB
5. AsyncStorage
6. IndexedDB
7. JSON files / file-system storage (unfashionable)
8. CSV files (unfashionable)

5 not keeping (One sentence per deletion)
1. Supabase (PostgreSQL) - It implements cloud, authentication, security, and synchronization complexity that the app may not actually need and it isn't used primarliy for local storage.
2. Realm / Atlas Device SDK - It has started to be depracted so over time it may not hold up as well as others.
3. IndexedDB - It can be inconvenient when the application is native mobile rather than web-based.
4. JSON files / file-system storage (unfashionable) - It may make updating, querying, validating, and safely modifying many independent records harder.
5. CSV files (unfashionable) - It doesn't work well with relationships, concurrent updates, record modification, and querying.

Top 3
1. SQLite - It is a small embedded relational database that is very good at storing structured app data locally on a device without requiring a server.
2. AsyncStorage - It is a simple on device key value store that is good for small amounts of app states and preferences.
3. WatermelonDB - It was designed for React Native and is better for bigger datasets which may be helpful overtime


## The sensitivity pass

- The winner did not change even when the weights were changed


## The seam inventory

List every boundary in your chosen stack where two pieces have to talk. Aim for six to ten rows. For each: what has to work across it, whether you have crossed that exact seam before, a risk rating, and a spike id if the risk is High.

| Seam | What has to work | Crossed before? | Risk | Spike |
|---|---|---|---|---|
| Expo/React Native ↔ SQLite | Expo/React Native must be able to store or retrieve data from SQLite | no | Closed/Low (was completed successfully) | SP-01 |
| Expo/React Native ↔ Supabase Edge Function | Expo/React Native must be able to send an AI prompt to the Supabase Edge Function and receive a response that the Edge Function got the prompt | no | High | SP-02 |
| Supabase Edge Function ↔ Gemini API | Supabase Edge Function must be able to send the prompt it got to the Gemini API and recieve the response back | no | High | SP-03 |
| Supabase Edge Function ↔ Gemini API Key | Supabase Edge Function must be able to safely access the Gemini API Key without it being exposed | no | High | SP-04 |
| EAS ↔ Expo/React Native | EAS must be able to deploy and build the Expo/React Native app | no | Medium | SP-05 |
| EAS Submit ↔ App Store | EAS Submit must be able to submit the app to the Apple App Store | no | Medium | SP-06 |


## Count your novelty load

1. Expo - this is innvolation token as it is the base for the mobile apps environment, requirements: DEP-02, NFR-MNT-01, CON-02. It will be spiked in SP-01.
2. Gemini API - this provides the suggestion based explanation for stress and the activity suggestion based on the check ins and journal entries. It will be spiked in SP-02.
Novelty Load: 2

The two do not touch the same seam. The Supabase Edge Function is the middle man between Expo and Gemini API. 


## The cost sheet and the free-tier watch list

### Cost Sheet:
| Service | Total |
|---|---|
| Expo | Free for solo developers - 0 dollars |
| React Native | Free and open source - 0 dollars |
| Expo SQLite | Free and open source - 0 dollars |
| EAS (Expo Application Services) | Free tier 15 iOS and Android builds - 0 dollars |
| Supabase Edge Function | Free tier with 500,000 invocations - 0 dollars |
| Gemini API | Free tier rate limits - 0 dollars |

### Watch List:
| Service | What is free | Where I read it | Date I read it | The risk | What I'll do if it ends |
|---|---|---|---|---|---|
| Expo | 15 Android and 15 iOS builds, Low-priority queue, 60 min. on CI/CD Workflows, Submit to app stores, Send updates to 1K MAUs, Access to Launch, Access to Observe | Expo Pricing Page (https://expo.dev/pricing) | 2026-09-25 | Free tier is removed or free tier access is shrunken | I'll check if the tiers that cost money are reasonable and if not try to find another development setup like React Native CLI |
| React Native | Everything is free because it is open source under MIT License | React Native's License | 2026-09-25 | It is no longer open source and costs too much or the development environment changes too much and doesn't work with core features | Stay on an earlier version that is open source or update only when necessary |
| Expo SQLite | Everything is free as it is open source because it is built from SQLite which is open source | Expo Pricing Page (https://expo.dev/pricing) | 2026-09-25 | It is no longer open source and costs too much | I would switch to AsyncStorage |
| EAS | 15 iOS and Android builds, low-priority builds on EAS Build, and free updates with EAS Update | Expo Pricing Page (https://expo.dev/pricing & https://docs.expo.dev/billing/plans/) | 2026-09-25 | I need more builds, or free tiers abilities lessen or change | Pay for a tier or switch to Codemagic or Bitrise |
| Supabase Edge Function | 500,000 invocations per month (function calls to Edge Function that calls AI API) | Supabase Edge Functions Pricing Page (https://supabase.com/docs/guides/functions/pricing) | 2026-09-25 | Going over the 500,000 quota charges you for usage exceeding your subscription plan's quota | I go over 500,000 or it can no longer keep the AI API key safe because of changes | Pay 2 dollars or switch to Vercel Serverless Functions |
| Gemini API | 5 Request per minute, 250K tokens per minute, 20 requests per day (Gemini 3.6 Flash) | Google's limits page (https://ai.google.dev/gemini-api/docs/rate-limits) | 2026-09-25 | Free tier limits change and are too low causing me to need to pay for a tier | Pay for a tier or try switching to OpenAI or Anthropic if too costly |

- Monthly Total: 0 dollars
- The single line most likely to surprise you: the Gemini AI API provides a lot even with being free, 
- If this service ended in Week 12, how many hours would it cost me to move? If the answer is more than eight, that dependency needs a Plan B written now, not discovered then.

| Service | Hours it would cost to move if service ended in Week 12 | Plan B |
|---|---|---|
| Expo | 8 hours | Move to React Native CLI |
| React Native | 13 hours | Switch to Flutter |
| Expo SQLite | 7 hours | Switch to AsyncStorage |
| EAS | 5 hours | Switch to Codemagic or Bitrise |
| Supabase Edge Function | 6 hours | Switch to Vercel Serverless Functions |
| Gemini API | 7 hours | Switch to OpenAI or Anthropic |


## The license inventory

| Dependency | SPDX id | Type | Obligation on me | Ship? |
|---|---|---|---|---|
| Expo	| MIT | Permissive | Keep the copyright and license notices | Yes | 
| React Native | MIT | Permissive | Keep the copyright and license notices | Yes |
| Expo SQLite | MIT | Permissive | Keep the copyright and license notices | Yes | 
| EAS (Expo Application Services) | BSL-1.1 | Source-Available | May make use of the Licensed Work, provided that I follow the Additional Use Grant and the terms it provided | No | 
| Supabase Edge Function | MIT | Permissive | Keep the copyright and license notices | No | 
| Gemini API | none | API Service | Follow Gemini API terms for use and data | No | 
| Expo UI Components | MIT | Permissive | Keep the copyright and license notices | Decide deliberately | 
| Expo Vector-Icons | MIT | Permissive | Keep the copyright and license notices. | Decide deliberately |
| Unsplash Images | None | Free to use images license | Free to download, copy, modify, distribute, perform, and use images from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. The license also does not include the right to compile images from Unsplash to replicate a similar or competing service. | Decide deliberately |

- I would have been wrong about EAS because though it is part of Expo it still holds a different license because it is for deployment. Then also Supabase Edge Function because I thought it would have been like Supabase which is under Apache 2.0 but the Edge Functions are MIT because it's not apart of the main evironment that needs more to be protected as much. 


## Verify five claims, and record your hit rate

| Claim as stated | Verdict | Source (vendor URL) | Checked |
|---|---|---|---|
| Note to remind Dr. Litman: I decided not to use AI on anything this week so the table did not need to be filled out | 