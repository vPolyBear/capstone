# Runbook

Where each credential comes from
    - The Supabase URL + the anon key is from the Supabase's projects API setting. 
    - Then the Google API key is from the Google AI Studio.
How to rotate it
    - I'll rotate it by getting a replacement anon key and then update the .env with it and test to make sure that the app still works
    - I'll rotate it by getting a new Google API key then update the Supabase Edge Function secrets with it, then I will test that the app still works with it
Who to tell 
    - If a key was exposed I will tell the project maintainer me, Katherine Spencer and also Dr. Litman.
How long rotation takes
    - How long rotation will take is as long as it takes to update the key with a new one and checking that everything still works, this would likely take around 30 minutes and I will rotate it right away if a key is exposed.