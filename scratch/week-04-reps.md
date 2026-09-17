# Week 4 Reps

## Rep 1 - Five adjectives, four fields

| Adjective | Metric | Threshold | Condition | Measurement method |
|---|---|---|---|---|
| Quick | The AI analysis prompt response time on the AI Analysis page | p95 under 25 seconds | 1 check in response and 1 journal entry recorded with throttled "Fast 3G" connection in Expo Go on an iPhone | 20 prompt responses sent and loaded in the mobile app; record the response time and the p95 in the measurements log |
| Clean | The app clones and runs on an empty machine | 0 errors/issues recorded | An empty iPhone running on throttled "Fast 3G" connection in Expo Go without any pre existing data that would interfer with the app | Cloning the repository while following the README to get the app running to test it |
| Personalized | AI Anaylsis response matches what an with stress individual responses to the check ins and journal entries | 7 out of 10 test individual responses | 10 test individual check ins and journal entries provide varying AI responses that align with the test entries on an iPhone with throttled "Fast 3G" connection in Expo Go | minimum of 7 AI responses that match the test individual responses |
| Random | A different activity is choosen everytime and appears on the screen | 10 out of 10 activities vary and choosen p95 under 15 seconds | 10 random activity tests return on an iPhone with throttled "Fast 3G" connection in Expo Go | 10 activities selected differently 10 times and the results of each loaded in the mobile app; record the response time and the p95 in the measurements log |
| Automatic | A activity is choosen without user input to aid the choosing of the activity | 10 out of 10 activities are choosen with only a user pushing a random button, no other user input needed | 10 random activity tests return on an iPhone with throttled "Fast 3G" connection in Expo Go | 10 activities selected differently 10 times and the results of each loaded in the mobile app without any other user input needed other than clicking the random button |

- The hardest adjective to convert was automatic because it was similar to random but it means a different thing. Though it is still important to the function of the system so trying to differ it but show its relevance was harder. The difficulty told me that I needed to ensure I fully understand how automation in my app works.


## Rep 2 - The percentile drill

0.38  0.41  0.39  0.44  0.40  0.42  0.37  0.45  0.41  0.39  0.43  0.40  0.38  0.46  0.42  0.41  0.39  0.44  2.90  9.20

0.38 + 0.41 + 0.39 + 0.44 + 0.40 + 0.42 + 0.37 + 0.45 + 0.41 + 0.39 + 0.43 + 0.40 + 0.38 + 0.46 + 0.42 + 0.41 + 0.39 + 0.44 + 2.90 + 9.20 = 19.49 

19.49 / 20 = 0.9745
Mean = 0.97 seconds

0.37, 0.38, 0.38, 0.39, 0.39, 0.39, 0.40, 0.40, 0.41, 0.41, 0.41, 0.42, 0.42, 0.43, 0.44, 0.44, 0.45, 0.46, 2.90, 9.20

0.95 x 20 = 19

19th number is 2.90 => p95 = 2.90 seconds

Max = 9.20 seconds

Summary
Mean = 0.97 seconds
p95 = 2.90 seconds
Max = 9.20 seconds


Which of the three numbers you would put in a requirement, and why. 
- Out of the three numbers I would put p95 = 2.90 seconds because it shows that 95% of measurements are at or below 2.90 which helps to show both the context and speed averages because some loading speeds can be slower than others so 95% of measurements ran at or below 2.90.

Then answer this: if your requirement said “average page load under 1.5 seconds,” would this system pass? Would your users agree?
- Yes this system would pass because it's average load was 0.97 and that is below 1.5 seconds on average. I believe the majority would agree because it states on average and even if some cases are above 1.5 the mean loading time for this system is 0.97 which is still lower.

One more thing to notice, and it matters for your document: percentile has more than one definition — nearest-rank and interpolated methods give different answers on small samples. That is exactly why the method field exists. Write down which one you used.
- Nearest rank because the 19th number was 2.90 because it was considered the 95th percentile because the 19th number from the 20 numbers was revealed through multipling 0.95 by 20 it equals 19 meaning the closest number to 19 was the 19th number.


## Rep 3 - Diagnose and rewrite

NFR-1  The application should have good performance.
- unmeasurable, missing condition, aspirational - not verifiable, no measurement method
- NFR-PERF-01 (Must): Stressed individuals shall be able to get a response from the AI Analysis in a p95 under 25 seconds when there is at least 1 check in and journal entry recorded on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 20 prompts to the AI Analysis and checking the p95 result.

NFR-2  The system must be highly available and scalable.
- unmeasurable, missing condition, compound (two or more requirements in one), aspirational - not verifiable, no measurement method 
- NFR-REL-01 (Must): Stressed individuals shall be able to run the app 9 out of 10 times when entering it with 0 unhandled exceptions and errors on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 10 opening and closings of the app and the times it succeeded vs failed.
- NFR-SCAL-01 (Should): Stressed individuals shall be able to run the app when there are over 50 journal entries in it in p95 under 50 seconds on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 10 opening and closings of the app and checking the p95 result.

NFR-3  The UI shall be intuitive.
- unmeasurable, missing condition, aspirational - not verifiable
-  NFR-USE-01 (Should): Stressed individuals first time on the app 7 out of 10 of them shall be able to complete 1 check in, journal entry, and AI Anylsis prompt request when they go through the app, without help on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 10 first time stressed individuals app usage results.

NFR-4  User data will be kept safe.
- unmeasurable, missing condition, aspirational - not verifiable
- NFR-SEC-01 (Must): Stressed individuals data shall not be breached 0 times when the repository has 0 AI API key's in any commit in an iPhone with throttled "Fast 3G" connection in Expo Go. Measured by scanning over the full history and recording the results of the AI API key presence after checking every file.

NFR-5  The code should follow best practices.
- unmeasurable, aspirational - not verifiable
- NFR-MNT-01 (Must): New stressed individuals shall be able to use only the README when creating a clean clone of the repository to reach a running app in under 10 minutes with 0 errors. Measured through testing this on a clean computer and that the app works on an iPhone with throttled "Fast 3G" connection in Expo Go, recording how long it took. 

NFR-6  The app should work on mobile.
- unmeasurable, missing condition, solution-biased
- NFR-PORT-01 (Should): Stressed individuals shall be able to run the app and complete the a least 1 check in, journal entry, and AI Anaylsis when on 2 different operting systems, both iOS and Android with throttled "Fast 3G" connection in Expo Go. Measured through testing and recording that each feature works on an iPhone and Android.

 whether the difficulty was in the metric, the threshold, the condition, or the method.
- The one that I found the hardest to rewrite was NFR-2 because it was hard to think about how both availability and scalability aspects fit in my app. The difficulty was in the condition because I wanted to ensure that it would be possible for my app to realistically handle the data amount while also being testable.


## Rep 4 — The data inventory

Build the table from section 4.4 for your project. 
One row per data element you touch — including things you would not have called data: email addresses, uploaded files, session logs, error reports, anything you send to a third party.

| Data element | Why you need it | Where it lives | How long you keep it | How a user gets rid of it |
|---|---|---|---|---|
| Check in responses | To help stressed individuals to take a minute to calm and think about their stress, to show the overview of an individual stress throughout time, and it is used in the AI's analysis to provide some insight of current condition | It lives locally on the stressed individuals phone | Until they delete the app | There is no way to delete a check in currently unless a delete function is implemented |
| Journal Entries | To help stressed individuals express and reflected on their stress and feelings and it is used in the AI's analysis to provide more context | It lives locally on the stressed individuals phone | Until they delete the app | If they clear out an entry through editted unless a delete function is implemented |
| Check in response and Journal Entries sent to the AI, Gemini | Need the responses and entries to create a suggestion based explanation and to provide an destressing suggestion | It lives in Gemini as that is were the information is being sent, it stores it if you don't pay for a premium version | N/A | N/A |
| Google Gemini AI API Key | This is necessary in order to connect the stress management app to Gemini | Supabase Edge Function | N/A | N/A |

- The two rows that I do not know the answer to are the 'Check in response and Journal Entries sent to the AI, Gemini' & 'Gemini AI API Key' rows in the columns 'How long you key it' and 'How a user gets rid of it'. The primary source I would read to find out is on Google Gemini's terms page for the 'Check in response and Journal Entries sent to the AI, Gemini' row and the Supabase terms page for the 'Gemini AI API Key' row.


## Rep 5


Did on email

shift tabing to get to searching the mail

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-USE-01 | The visibility precentage of the composition buttons hovering feature shall be above 50% opacity when an individual hovers over the composition button this higher visiblitiy of black must be visible on a Windows computer in Chrome | Must | Hovering over the composition button 5 times to see if it is visible in different brightnesses and background colors |
| NFR-USE-02 | The minimal tabbing amount to get to the X out button shall be less than 7 tabs when tabbing over to the X button in the email draft recorded on a Windows computer in Chrome | Must | Tabbing over to the X out button 5 times to see if the tabbing gets to the X in less than 7 tabs |
| NFR-USE-03 | The minimal shift tabbing amount get to the a section on the page shall be less than 7 shift tabs when shift tabbing over to the search email section on the page with minimal button switches on a Windows computer in Chrome | Must | Shift tabbing over to the search email section 5 times to see if the shift tabbing gets to the search section in less than 7 shift tabs |


## Rep 6

This does not make sense for the current state of my project because there are no true UI elements inplace that could test the color nor three core tasks implemented.

## Rep 7 — The prohibitions, and the history check

- Stressed individuals shall not be able to see committed or have access to the Gemini AI API keys, tokens, or other keys when looking into the repository. This is measured by going over every commit made to GitHub and checking that there the .env is in the gitignore and that there are 0 secrets found when this is done. 
- Stressed individuals responses and entries shall not be put into a query or command line when the user enters a response into the check in or journal entries. This is measured by testing for injectioin attacks and checking that there are 0 injection attack opportunities present.
- Stressed individuals shall not be able to request for multiple AI analysis' when prompting over 5 times for either an analysis or an activity suggestion all at once or in less than 5 seconds. This is measured by sending 6 analysis' or activities' and on the 6th one the app should not accept it and throw an error message and this should check for how many times this happens and the amount of sent requests both should be 0.
- Stressed individuals shall not be able to see system errors or messagse when running into trouble on a feature, instead in less than 15 seconds a user error should appear stating something went wrong. This is measured by checking what error message appeared and where, and the recording must show 0 times an error or message appeared.
- Stressed individuals responses to the check ins and journal entries shall not be provided to Gemini AI unless the stressed individual prompts the AI Analysis with a request when they want a suggestion based explanation for their stress or an activity suggestion. This is measured by checking the AI request page after doing 7 check ins and 7 journal entries, where the recording must show that the check ins and jounray entries were sent 0 times to Gemini AI.

- It found promptTokens, candidateTokenCount, and js-tokens, though these are found to be false posititives so they are not secrets.
