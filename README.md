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

---

## Getting started

```bash
git clone https://github.com/your-username/island-noise-param-generator.git
cd island-noise-param-generator
```

Then open `index.html` in your browser — that's it. No npm, no server, no build step.

> On Windows you can just double-click `index.html`. On macOS/Linux: `open index.html` or `xdg-open index.html`.

---

## Usage

### 1. Open the tool

Open `index.html` directly in a browser. No server, no install, no build step.

---

### 2. Runtime controls

At the top of the sidebar:

| Field | What it does |
|---|---|
| **seed** | Controls the noise realization. Change it to test how robust your parameters are across different worlds. |
| **Random seed** | Picks a random seed instantly. |
| **sampleLineZ** | The Z coordinate used for the Cross Section chart. Slide it to sample different rows of the map. |
| **mapSpan** | World units visible in the 2D map and cross section. Smaller = zoomed in, larger = wider view. |

---

### 3. Adjust parameters

The sidebar has two parameter groups, each with sliders:

**`getArchipelagoBase`** — controls island shape and distribution:
- `islandMass scale/amplitude` — size and density of land masses.
- `islandShape scale/amplitude` — local shape variation of each island.
- `channelCuts scale/amplitude` — how aggressively the terrain is cut into channels and archipelagos.
- `coastlineNoise scale/amplitude` — fine noise along the coastline edge.

**`getSurfaceHeight`** — controls elevation and terrain detail:
- `erosion scale` — large-scale erosion pattern that modulates mountain height.
- `detail scale/amplitude` — fine noise added on top of the base density.
- `land threshold` — minimum base value to be considered land (`base > landThreshold`).
- `landFactor smoothstep max` — upper bound of the smoothstep that drives land elevation.
- `beach threshold` — base value below which terrain is treated as beach/shallow water.
- `deep ocean smoothstep end` — controls the depth gradient of the ocean floor.
- `ridge scale/amplitude` and `ridgeDetail scale/amplitude` — mountain ridges and their surface detail.
- `mountainFactor threshold` — minimum ridge value before mountains start forming.
- `landFactor base lift` — flat height bonus applied to all land (`SEA_LEVEL + 1 + landFactor * lift`).
- `land interior threshold` — mountains only appear where `landFactor` exceeds this value (prevents mountains on thin coastal strips).
- `mountainScale base` and `mountainScale erosion multiplier` — total mountain height formula.
- `land micro-detail scale/amplitude` — tiny surface noise on land.
- `shallow floor offset` / `deep start offset` — ocean floor depth relative to `SEA_LEVEL`.
- `beach noise` / `ocean noise scale/amplitude` — noise on shallow and deep ocean floors.

Every slider updates both canvases live.

Each parameter has a **Reset** button next to it to restore its default value individually.

---

### 4. Read the views

**Cross Section** (left chart)
- Orange curve — `base` value (archipelago density + detail noise).
- Sand curve — `surfaceHeight` in world blocks.
- Blue horizontal line — `SEA_LEVEL = 158`.
- The horizontal axis is the X coordinate; Z is fixed to `sampleLineZ`.

**Plan View** (2D map)
- Color legend: green = land, tan = beach/transition, medium blue = shallow ocean, dark blue = deep ocean.
- **Drag** to pan the camera.
- **Scroll wheel** to zoom in/out.
- **Hover** over any pixel to see a tooltip with the exact `base`, `surfaceHeight`, and biome values at that coordinate.
- The readout below the map shows current center coordinates, zoom level, and span.

**Readout** — quick stats:
- Land coverage percentage.
- Average surface height.
- Mountain peak height.

**Java Preview** — shows the current parameter values formatted as Java constants, ready to copy directly into the source.

---

### 5. Presets

**Quick preset chips** — buttons for built-in presets:
- **Default** — tool defaults.
- **Generator current** — the last known state of the actual Java generator.

Click any chip to load it instantly.

**Import a custom preset** — paste a `key = value` block into the textarea:

```
islandMassScale = 0.0030
landThreshold = 0.1950
channelCutsAmplitude = 0.60
```

Then click **Apply preset**. Only the keys present in the block are updated; everything else keeps its current value. This is the format Claude outputs when suggesting parameter tweaks.

Click **Clear** to empty the textarea.

---

### 6. Export

When the terrain looks right:

- Click **Copy values** — copies the full parameter block to the clipboard in `key = value` format.
- The **Export** box shows the same block as readable text.
- Click **Reset** to restore all parameters to their defaults at once.

Paste the copied block into Java or back into the Import textarea in a future session.

---

## File structure

```
index.html   — Layout and controls
app.js       — Noise logic, canvas rendering, parameter state, presets
styles.css   — Dark-mode UI
```

## Technical notes

- The visualization uses a **local noise approximation** (not the exact Java algorithm) to keep iteration fast. Final values may need slight fine-tuning in-engine.
- `SEA_LEVEL = 158` is hardcoded to match the target dimension.
- No dependencies or build step required.
