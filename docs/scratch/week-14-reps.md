
## Rep 1 — The hostile inventory
Put every hit into a table with three columns: what it is, why it works on my machine, what a stranger would have to do.

| What it is | Why it works on my machine | What a stranger would have to do |
|---|---|---|
| COPILOT_DEBUG_NONCE | When my computer runs it Github Copilot create it | Install Github Copilot |
| IGCCSVC_DB | Intel graphics software creates it | Install Intel graphic software |
| VSCODE_DEBUGPY_ADAPTER_ENDPOINTS | VS Code uses it to help debug Python programs | InstallVS Code and Python debugging tools |

Reflect: Which row surprised you? Almost everyone has one — a tool, a variable, or a running service they had genuinely forgotten was not part of the project. Name yours and say how long it has been invisible.
- The row that suprised me was VSCODE_DEBUGPY_ADAPTER_ENDPOINTS because I forgot that VS Code uses Python debugging tools in the background and it has been invisible briefly.

## Rep 2 — Pin what floats
For each direct dependency, answer: is the version pinned, floating within a range, or unspecified?

The package-lock files are commited
        @expo/ui: ~58.0.29                          Floating
        @expo/vector-icons: ^15.0.2                 Floating
        @react-native-community/slider: 5.2.1       Pinned     
        @react-native-picker/picker: ^2.11.4       Floating
        @supabase/supabase-js: ^2.115.0            Floating
        expo: ~58.0.26                             Floating
        expo-router: ~58.0.32                      Floating
        expo-sqlite: ~58.0.18                      Floating
        react: 19.3.0                              Pinned
        react-dom: 19.3.0                          Pinned
        react-native: 0.88.1                       Pinned
        react-native-input-spinner: ^1.8.1         Floating
        react-native-reanimated: 4.7.1             Pinned
        react-native-toast-message: ^2.5.2         Floating
        typescript: ~6.0.3                         Floating

Reflect: If someone installed your project six months from now with floating versions, what is the single most likely thing to break? Name the dependency and the failure.
- If someone installed my project six months from now with floating versions the single most likely thing to break is probably Expo and React Native working with each other as each have a lot of floating verision and are the biggest components that could break first as they depend on each other more and if one version changes that could break the app.

## Rep 3 — Rewrite .env.example as a contract
Every variable your code reads gets an entry, and every entry answers four questions: what it does, required or optional, where to get it, and a safe local value.
- Added this into the .env.example (as comments) and README.md (Extra Variable Documentation)

Reflect: How many variables did you find that your code reads but the contract never listed? Each one would have been a silent failure for your successor. Write down the number.
- 2, but only because one of them I put in the TEST_DATA_SET key in the README not in the .env.example (I also put the GOOGLE_API_KEY in the README because the key is only supposed to be filled in in Supabase) and then the other two fail (EXPO_PUBLIC_SUPABASE_ANON_KEY & EXPO_PUBLIC_SUPABASE_URL) for the first command but that is because they are supposed to because the example shouldn't have the actual keys in them as they have placeholder values in them and I don't want to export them unless necessary, though the second command confirmed that they are in the actual .env file as required.

