


## Rep 1 — Score your README before you touch it

Score each of the eleven sections: 2 = present and complete, 1 = present but thin or vague, 0 = missing.

 1. What it is / who it is for     _2__
 2. Demo (screenshot, GIF, session) _0__
 3. Prerequisites with versions     _1__
 4. Install                         _2__
 5. Configure                       __2_
 6. Run (+ the action that proves it works) _2__
 7. Test                            _2__
 8. Project layout                  _1__
 9. Troubleshooting                 _1__
10. License                         _0__
11. Contact / further reading       _1__
                            TOTAL: 14 / 22


## Rep 2 — Pin what you actually have

node --version              v22.16.0
npm --version               10.9.2
git --version               2.51.0.windows.1
npx expo --version          58.1.19
npx supabase --version      2.122.1
eas --version               27.6.0
npm list expo-sqlite        58.0.15

Reflect: Which prerequisite did you almost forget because it has been installed on your machine since freshman year? Those are the ones a stranger cannot guess.
- The prerequisite that I almost forgot because it has been installed on my machine since freshman year is Git because I have just always been using it so I almost forgot that it would need to be installed.


## Rep 3 — Find the invisible accounts and the personal paths

`$ grep -rnE "/Users/|/home/[a-z]|C:\Users|localhost:[0-9]{4}|127.0.0.1" README.md docs/
docs/secrets-checklist.md:51:APP_BASE_URL=http://127.0.0.1:8080`

- This just came back with an example for the .env.example, so my project doesn't expose any personal paths or other information.


## Rep 4 — Every command gets an expected result

Reflect: Which command’s real output surprised you — a warning you had stopped seeing, a prompt you answer automatically, a line that looks like an error but is not?
- The command's real output that suprised me was the smoke test at first because I forgot to update it with the prepare-smoke one so I was confused at first why it failed. 


## Rep 7 — The feature-to-code map and one real first issue

- Table in the Onboarding file

## Rep 9 — Run the linter, then argue with it

Reflect: Name one thing it flagged that you decided was a false positive, and defend the decision in two sentences. A tool you obey blindly is as bad as a tool you ignore.
- It flagged the #3 Prerequisties Table since it thought there were no versions in it though there are version in it. I believe it is getting messed up on how the table is divided by | .


