# ADR 0001 — Primary Framework

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Katherine Spencer
- **Requirements affected:** FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-ACT-01, FR-AIA-01, FR-AIA-04, NFR-PORT-01, CON-01, CON-02
- **Related ADRs:** ADR 0002 (Local Data Storage), ADR 0003 (Hosting), ADR 0004 (AI Suggestions)

## Context

What about my requirements makes this a real decision to use Expo/React Native is because the requirements highlight that I am making an app that will need to be able to complete the core features (FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-ACT-01, FR-AIA-01, FR-AIA-04) on an iOS and Android phone (NFR-PORT-01) through Expo Go (CON-02). These features push on this framework Expo/React Native as they are made possible through it as it provides a place for the features to be created and brought to life on the operating systems I wish to provide for. 

I already know how to work with some of the Expo components after testing and researching, and I have also worked with many React Native components. Though it would be new using it with the Gemini API and also deploying an app with Expo would be new to me too. Though I expect that because of this choice of using Expo/React Native and based on what I've done with it so far that I will be able to complete the app within the deadline of 240 hours in 16 weeks (CON-01). It also allows me to work within my budget as a student and with a coding languague I know, Typescript.

## Options considered

I did not weigh other options, I've been pretty set on Expo/React Native and done a lot of other research on other frameworks and it would keep the novely load at its minimum. Though for a fallback I have considered Flutter because when researching it worked with both iOS and Android and seemed to provide the most similar output Expo/React Native would.

## Decision

I will use Expo SDK 57 with React Native 0.86.3 as the primary framework. I chose this because it works with Expo Go which is for development, works with both iOS and Android operating systems, and Typescript. Even though Expo is adds a novelty load I have done the most research on it than others and I already know how to use many React Native components.

## Consequences

**Positive**

- Devlopment becomes easier because it works with Expo Go (CON-02)
- I don't need to switch features to fit for both iOS and Android as it works with both (NFR-PORT-01)
- It allows me to intergate every feature that I  wanted easily because it works with the features technologies necessary for it such as SQLite, Supabase Edge Functions, and Gemini API, which are used for these features FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-ACT-01, FR-AIA-01, FR-AIA-04.

**Negative**

- What becomes slower the starting procress as I'll have to learn how to exaclty work with all asepects of Expo as it is adds a novelty load to my project and will cost 5 hours more to continue to fully learn.
- What is new to my that I will have to learn is how to use Expo and Supabase Edge Functions together which I have budgeted 4 hours to learn.
- I will continue to research and test how Expo works with each feature which will likely cost 6 more hours.

## Revisit trigger

I will write a superseding ADR if Expo/React Native can no longer work with either iOS and Android phones (NFR-PORT-01) or if the free tier ends for Expo and its monthly price exceeds over 50 dollars a month or if React Native no longer becomes open source.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| Expo Version SDK 57 | https://docs.expo.dev/versions/latest/ | 2026-09-27 |
| React Native Version 0.86.3 | https://reactnative.dev/versions | 2026-09-27 |
| Expo Free Tier | https://expo.dev/pricing | 2026-09-27 |
| React Native is Open Source | https://reactnative.dev/contributing/overview | 2026-09-27 |
| Expo/React Native works with iOS and Android | https://docs.expo.dev & https://reactnative.dev/docs/intro-react-native-components | 2026-09-27 |
| Expo/React Native works with Typescript | https://docs.expo.dev/guides/typescript/ & https://reactnative.dev/docs/typescript | 2026-09-27 |
| Expo/React Native works with SQLite | https://docs.expo.dev/versions/latest/sdk/sqlite/ | 2026-09-27 |
| Expo/React Native works with Supabase Edge Functions | https://supabase.com/docs/guides/functions & https://docs.expo.dev/guides/using-supabase/ | 2026-09-27 |
| Expo/React Native works with Gemini API | https://ai.google.dev/gemini-api/docs?authuser=1 & https://docs.expo.dev/router/web/api-routes/ | 2026-09-27 |
