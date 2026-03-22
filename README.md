# Island Noise Tuner

Visual tool for tuning noise parameters for a custom Minecraft dimension's island terrain generation — before committing any values to Java code.

## What it does

Iterating on terrain generation directly in Java is slow: compile, launch the game, enter the dimension, check the terrain... repeat. This tool visually replicates `getArchipelagoBase` and `getSurfaceHeight` in the browser so you can tweak parameters in real time and copy the exact values to your code when satisfied.

## What it replicates

| Java function | Exposed parameters |
|---|---|
| `getArchipelagoBase` | `islandMass`, `islandShape`, `channelCuts`, `coastlineNoise` |
| `getSurfaceHeight` | `erosion`, `detail`, `landFactor`, `ridge`, `ridgeDetail`, `mountainFactor` |
| Thresholds | `landThreshold`, `beachThreshold`, smoothstep `(0.18 → 0.52, base)` |

Variable names match the Java code exactly.

## Views

- **Cross Section** — horizontal slice along the X axis at a given Z. Shows the archipelago density curve and surface height.
- **Plan View (2D map)** — top-down view with biome colors: grass, beach, shallow ocean, deep ocean. Supports drag to pan and scroll to zoom.
- **Readout** — quick metrics: land coverage %, average height, etc.
- **Java Preview** — ready-to-paste block of values for the Java source.

## Usage

1. Open `index.html` directly in a browser — no server required.
2. Adjust the sliders under `getArchipelagoBase` and `getSurfaceHeight` in the sidebar.
3. Change the `seed` to test different noise realizations.
4. Use **Presets** to load saved configurations or paste a `key = value` block from Claude or any other source.
5. Once the visual result looks right, click **Copy values** and paste the numbers into Java.

## Importing a preset

The **Presets / Import** textarea accepts blocks in this format:

```
islandMassScale = 0.0030
landThreshold = 0.1950
channelCutsAmplitude = 0.60
```

Click **Apply preset** to load only the keys present — everything else keeps its current value.

## File structure

```
index.html   — Layout and controls
app.js       — Noise logic, canvas rendering, parameter state
styles.css   — Dark-mode UI
```

## Technical notes

- The visualization uses a **local noise approximation** (not the exact Java algorithm) to keep iteration fast. Final values may need slight fine-tuning in-engine.
- `SEA_LEVEL = 158` is hardcoded to match the target dimension.
- No dependencies or build step required.
