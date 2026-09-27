# Spike SP-01 — Will Expo/React Native be able to store and retrieve data from SQLite

- **Unknown:** Will Expo/React Native be able to properly store and retrieve check ins and journal entries from SQLite
- **Feeds:** ADR 0002 - data storage: storing data locally using SQLite 
- **Requirements at risk:** FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-AIA-01, FR-AIA-04
- **Time box:** 90 minutes
- **Run on:** 2026-09-25

## The question

Will Expo/React be able to input and retrieve check ins and journal entries 5 times within 5 seconds, where it is showen in the proper place?

## The smallest thing that answers it

A single script for SQLite database that has both a check in and journal entry table with 5 of the check ins and journal entries inputted in and then the retrieved check ins and journal entries printed to the console in Expo Go. No error handling or UI beyond the inputting button, printing of the check ins and journal entries amount inserted, and time passed.

## Success criterion

5 out of 5 check ins and journal entries inputted are visible in the database checking this by printing the retrieved to the console in under 5 seconds of them being inputted and retrieved.

## Failure criterion

Less than 5 of the check ins and journal entries are inputted and visible in the console, OR if the input and retrieval time are over 5 seconds

## Plan B if it fails

If SQLite fails to properly store and retrieve data sent by Expo/React Native then I will switch to AsyncStorage as it ranked the second highest and also has the ability to work very well with Expo/React Native and it is necessary to have local storage as it is the core of the entire app.

## Result

All 5 of the check ins and journal entries were successfully inputted and retrieved and this was able to happen in 3ms which is under 5 seconds. What suprised me was that the inserting and retrieval happened a lot faster than I thought it would. For now I am going to keep the code for reference for the future. Code kept in App.tsx.

## Decision

I will proceed with SQLite as the local data store for my Expo/React Native app as it successfully accomplished the 'Success criterion' of inputting and retrieving the 5 check ins and journal entries in under 5 seconds. 

---