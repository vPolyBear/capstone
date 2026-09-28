# ADR 0003 — Hosting (Building and Deploying)

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Katherine Spencer
- **Requirements affected:** NFR-PORT-01, CON-01
- **Related ADRs:** ADR 0001 (Framework)

## Context

What about my requirements makes this a real decision to use EAS for hosting is because the requirements highlight that I am making an app that will need to be able to be built for both iOS and Android (NFR-PORT-01). These push on this EAS hosting as deploying through a git push and being able to install, set up, run, and maintain are all made possible through it as it provides a place for the app to be built for the operating systems I wish to provide for.

I already know how to work with Expo/React Native so I'll only generally need to learn how to exactly build my app for both operating systems. Though I expect that it won't be that hard to do because of this choice of using EAS as it won't involve too many new aspects so I won't go over my hour budget which allows me to complete the app within the deadline of 240 hours in 16 weeks (CON-01). Then because it allows for 15 free builds for both operating system, it perfectly allows me to deploy and build my app within my budget as a student.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| EAS | 4.75 | It is built into Expo and is designed for Expo/React Native so there is minimal work needed to setup and learn |
| Codemagic | 3.75 | It supports Expo/React but requires a bit more extra work overall to setup |
| Bitrise | 3.70 | It supports Expo/React but requires the  more work overall to setup |

## Decision

I will use EAS for hosting (building and deploying my app). I chose this because it works with Expo/React Native and is able to easily build and deploy my Expo/React Native app. It works to build for both iOS and Android without needing to do extra work.

## Consequences

**Positive**

- What becomes easier is building my app for both iOS and Android as it does not require me to do extra work to do so (NFR-PORT-01)

**Negative**

- What becomes slower is learning more on what needs to exactly be done to build and deploy my Expo/React Native app with EAS.
- I new thing that I will have to learn is how EAS builds for both iOS and Android which I have budgeted 3 hours for.
- I will continue to research how to get the build for both operating systems and what needs to be done for deployment which will likely cost 3 hours.

## Revisit trigger

I will write a superseding ADR if EAS can not properly build or deploy my app for either iOS or Android or if I run out of 15 builds for both operating systems and it starts to cost money because of it or the free tier is removed and its monthly price exceeds over 50 dollars a month.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| EAS is able to build and deploy my Expo/React Native app | https://docs.expo.dev/build/introduction/ & https://docs.expo.dev/deploy/submit-to-app-stores/ | 2026-09-27 |
| EAS is able to build for both iOS and Android | https://expo.dev/pricing & https://docs.expo.dev/build/introduction/ & https://docs.expo.dev/deploy/submit-to-app-stores/ | 2026-09-27 |
| EAS is able to build for 15 free builds both iOS and Android | https://expo.dev/pricing | 2026-09-27 |


