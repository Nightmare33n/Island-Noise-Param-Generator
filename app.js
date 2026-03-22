const SEA_LEVEL = 158;

const controlGroups = {
  archipelago: [
    {
      key: "islandMassScale",
      label: "islandMass scale",
      description: "getArchipelagoBase -> fbm(nContinent, x * scale, z * scale)",
      min: 0.003,
      max: 0.014,
      step: 0.0001,
      value: 0.0078,
    },
    {
      key: "islandShapeScale",
      label: "islandShape scale",
      description: "getArchipelagoBase -> fbm(nTerrain, x * scale, z * scale)",
      min: 0.006,
      max: 0.024,
      step: 0.0001,
      value: 0.014,
    },
    {
      key: "islandShapeAmplitude",
      label: "islandShape amplitude",
      description: "Multiplier final de islandShape",
      min: 0.05,
      max: 0.6,
      step: 0.01,
      value: 0.28,
    },
    {
      key: "channelCutsScale",
      label: "channelCuts scale",
      description: "getArchipelagoBase -> fbm(nExtra, x * scale, z * scale)",
      min: 0.004,
      max: 0.02,
      step: 0.0001,
      value: 0.011,
    },
    {
      key: "channelCutsAmplitude",
      label: "channelCuts amplitude",
      description: "Cuanto corta los archipielagos en canales",
      min: 0.1,
      max: 1.2,
      step: 0.01,
      value: 0.52,
    },
    {
      key: "coastlineNoiseScale",
      label: "coastlineNoise scale",
      description: "nDetail.sample(x * scale, z * scale)",
      min: 0.008,
      max: 0.08,
      step: 0.0005,
      value: 0.032,
    },
    {
      key: "coastlineNoiseAmplitude",
      label: "coastlineNoise amplitude",
      description: "Ruido fino en el contorno costero",
      min: 0.01,
      max: 0.3,
      step: 0.005,
      value: 0.08,
    },
  ],
  surface: [
    {
      key: "erosionScale",
      label: "erosion scale",
      description: "getSurfaceHeight -> fbm(nTerrain, x * scale, z * scale)",
      min: 0.001,
      max: 0.012,
      step: 0.0001,
      value: 0.004,
    },
    {
      key: "detailScale",
      label: "detail scale",
      description: "getSurfaceHeight -> fbm(nDetail, x * scale, z * scale)",
      min: 0.004,
      max: 0.04,
      step: 0.0002,
      value: 0.02,
    },
    {
      key: "detailAmplitude",
      label: "detail amplitude",
      description: "Aporte fino al valor base = archipelago + detail",
      min: 0.01,
      max: 0.25,
      step: 0.005,
      value: 0.08,
    },
    {
      key: "landThreshold",
      label: "land threshold",
      description: "if (base > landThreshold)",
      min: 0.0,
      max: 0.45,
      step: 0.005,
      value: 0.18,
    },
    {
      key: "landThresholdMax",
      label: "landFactor smoothstep max",
      description: "smoothstep(landThreshold, landThresholdMax, base)",
      min: 0.2,
      max: 0.9,
      step: 0.01,
      value: 0.52,
    },
    {
      key: "beachThreshold",
      label: "beach threshold",
      description: "else if (base > beachThreshold)",
      min: -0.2,
      max: 0.2,
      step: 0.005,
      value: 0.04,
    },
    {
      key: "deepOceanThreshold",
      label: "deep ocean smoothstep end",
      description: "smoothstep(beachThreshold, deepOceanThreshold, base)",
      min: -1.4,
      max: -0.1,
      step: 0.01,
      value: -0.75,
    },
    {
      key: "ridgeScale",
      label: "ridge scale",
      description: "fbm(nMountain, x * scale, z * scale)",
      min: 0.001,
      max: 0.012,
      step: 0.0001,
      value: 0.0055,
    },
    {
      key: "ridgeDetailScale",
      label: "ridgeDetail scale",
      description: "nExtra.sample(x * scale, z * scale)",
      min: 0.005,
      max: 0.04,
      step: 0.0002,
      value: 0.017,
    },
    {
      key: "ridgeDetailAmplitude",
      label: "ridgeDetail amplitude",
      description: "Multiplier de ridgeDetail",
      min: 0.02,
      max: 0.6,
      step: 0.01,
      value: 0.22,
    },
    {
      key: "mountainThreshold",
      label: "mountainFactor threshold",
      description: "Math.max(0, ridge + ridgeDetail - threshold)",
      min: -0.1,
      max: 0.45,
      step: 0.01,
      value: 0.15,
    },
    {
      key: "landBaseLift",
      label: "landFactor base lift",
      description: "height = SEA_LEVEL + 1 + landFactor * landBaseLift",
      min: 1,
      max: 20,
      step: 0.5,
      value: 8.0,
    },
    {
      key: "landInteriorThreshold",
      label: "land interior threshold",
      description: "Montanas solo si landFactor > threshold",
      min: 0.0,
      max: 0.8,
      step: 0.01,
      value: 0.38,
    },
    {
      key: "mountainBaseScale",
      label: "mountainScale base",
      description: "mountainScale = base + erosion * mountainErosionScale",
      min: 0,
      max: 42,
      step: 0.5,
      value: 24.0,
    },
    {
      key: "mountainErosionScale",
      label: "mountainScale erosion multiplier",
      description: "Cuanto pesa erosion en la altura de montanas",
      min: 0,
      max: 30,
      step: 0.5,
      value: 18.0,
    },
    {
      key: "microDetailScale",
      label: "land micro-detail scale",
      description: "nDetail.sample(x * scale, z * scale) en tierra",
      min: 0.01,
      max: 0.12,
      step: 0.0005,
      value: 0.06,
    },
    {
      key: "microDetailAmplitude",
      label: "land micro-detail amplitude",
      description: "Micro detalle final sobre tierra",
      min: 0,
      max: 6,
      step: 0.1,
      value: 2.5,
    },
    {
      key: "shallowFloorOffset",
      label: "shallow floor offset",
      description: "shallowFloor = SEA_LEVEL - offset",
      min: 0,
      max: 12,
      step: 0.5,
      value: 3.0,
    },
    {
      key: "deepStartOffset",
      label: "deep start offset",
      description: "deepStart = SEA_LEVEL - offset",
      min: 2,
      max: 22,
      step: 0.5,
      value: 10.0,
    },
    {
      key: "beachNoiseScale",
      label: "beach noise scale",
      description: "nDetail.sample(x * scale, z * scale) en zona shallow",
      min: 0.01,
      max: 0.12,
      step: 0.0005,
      value: 0.05,
    },
    {
      key: "beachNoiseAmplitude",
      label: "beach noise amplitude",
      description: "Ruido de la zona beach/shallow",
      min: 0,
      max: 4,
      step: 0.1,
      value: 2.0,
    },
    {
      key: "oceanDepthScale",
      label: "ocean depth multiplier",
      description: "oceanFloor = SEA_LEVEL - deepStartOffset - depth * multiplier",
      min: 0,
      max: 40,
      step: 0.5,
      value: 22.0,
    },
    {
      key: "oceanNoiseScale",
      label: "ocean noise scale",
      description: "nDetail.sample(x * scale, z * scale) en open ocean",
      min: 0.01,
      max: 0.12,
      step: 0.0005,
      value: 0.04,
    },
    {
      key: "oceanNoiseAmplitude",
      label: "ocean noise amplitude",
      description: "Ruido fino del fondo oceánico",
      min: 0,
      max: 6,
      step: 0.1,
      value: 3.5,
    },
  ],
};

const defaultParams = Object.fromEntries(
  Object.values(controlGroups)
    .flat()
    .map((control) => [control.key, control.value])
);

const quickPresets = {
  Default: { ...defaultParams },
  "Generator current": {
    islandMassScale: 0.0030,
    islandShapeScale: 0.0137,
    islandShapeAmplitude: 0.0700,
    channelCutsScale: 0.0128,
    channelCutsAmplitude: 0.3000,
    coastlineNoiseScale: 0.0145,
    coastlineNoiseAmplitude: 0.3000,
    erosionScale: 0.0040,
    detailScale: 0.0200,
    detailAmplitude: 0.0800,
    landThreshold: 0.1950,
    landThresholdMax: 0.3200,
    beachThreshold: 0.0950,
    deepOceanThreshold: -0.6700,
    ridgeScale: 0.0055,
    ridgeDetailScale: 0.0170,
    ridgeDetailAmplitude: 0.2200,
    mountainThreshold: 0.1500,
    landBaseLift: 14.0,
    landInteriorThreshold: 0.3800,
    mountainBaseScale: 24.0,
    mountainErosionScale: 18.0,
    microDetailScale: 0.0750,
    microDetailAmplitude: 2.5000,
    shallowFloorOffset: 4.0,
    deepStartOffset: 11.5000,
    beachNoiseScale: 0.0500,
    beachNoiseAmplitude: 2.0,
    oceanDepthScale: 24.0,
    oceanNoiseScale: 0.0400,
    oceanNoiseAmplitude: 3.5000,
  },
};

let params = { ...defaultParams };
let scheduled = false;

const profileCanvas = document.getElementById("profileCanvas");
const mapCanvas = document.getElementById("mapCanvas");
const mapTooltip = document.getElementById("mapTooltip");
const exportBox = document.getElementById("exportBox");
const codePreview = document.getElementById("codePreview");
const statsGrid = document.getElementById("statsGrid");
const sampleLineZInput = document.getElementById("sampleLineZ");
const sampleLineZLabel = document.getElementById("sampleLineZLabel");
const mapSpanInput = document.getElementById("mapSpan");
const mapCenterReadout = document.getElementById("mapCenterReadout");
const mapZoomReadout = document.getElementById("mapZoomReadout");
const mapSpanReadout = document.getElementById("mapSpanReadout");
const seedInput = document.getElementById("seedInput");
const copyValuesButton = document.getElementById("copyValuesButton");
const randomSeedButton = document.getElementById("randomSeedButton");
const resetButton = document.getElementById("resetButton");
const presetButtons = document.getElementById("presetButtons");
const presetInput = document.getElementById("presetInput");
const applyPresetButton = document.getElementById("applyPresetButton");
const clearPresetButton = document.getElementById("clearPresetButton");
const presetStatus = document.getElementById("presetStatus");
const mapView = {
  centerX: 0,
  centerZ: 0,
  zoom: 1,
  dragging: false,
  lastMouseX: 0,
  lastMouseY: 0,
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPermutation(seed) {
  const random = mulberry32(seed);
  const p = Array.from({ length: 256 }, (_, index) => index);
  for (let i = p.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return p.concat(p);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

class PerlinNoise {
  constructor(seed) {
    this.permutation = buildPermutation(seed);
  }

  sample(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const zf = z - Math.floor(z);

    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);

    const p = this.permutation;
    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;

    return lerp(
      lerp(
        lerp(grad(p[AA], xf, yf, zf), grad(p[BA], xf - 1, yf, zf), u),
        lerp(grad(p[AB], xf, yf - 1, zf), grad(p[BB], xf - 1, yf - 1, zf), u),
        v
      ),
      lerp(
        lerp(grad(p[AA + 1], xf, yf, zf - 1), grad(p[BA + 1], xf - 1, yf, zf - 1), u),
        lerp(grad(p[AB + 1], xf, yf - 1, zf - 1), grad(p[BB + 1], xf - 1, yf - 1, zf - 1), u),
        v
      ),
      w
    );
  }
}

function createNoiseSet(seed) {
  return {
    nContinent: new PerlinNoise(seed + 10001),
    nTerrain: new PerlinNoise(seed + 20002),
    nDetail: new PerlinNoise(seed + 30003),
    nMountain: new PerlinNoise(seed + 40004),
    nCave: new PerlinNoise(seed + 50005),
    nPillar: new PerlinNoise(seed + 60006),
    nVent: new PerlinNoise(seed + 70007),
    nAbyss: new PerlinNoise(seed + 80008),
    nExtra: new PerlinNoise(seed + 90009),
    nMushroom: new PerlinNoise(seed + 11011),
  };
}

let noiseSet = createNoiseSet(Number(seedInput.value));

function fbm(noise, x, y, z, octaves, lacunarity, persistence) {
  let sum = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxAmplitude = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    sum += noise.sample(x * frequency, y * frequency, z * frequency) * amplitude;
    maxAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return sum / maxAmplitude;
}

function getArchipelagoBase(x, z) {
  const islandMass = fbm(noiseSet.nContinent, x * params.islandMassScale, 0.0, z * params.islandMassScale, 4, 2.0, 0.5);
  const islandShape = fbm(noiseSet.nTerrain, x * params.islandShapeScale, 0.15, z * params.islandShapeScale, 3, 2.0, 0.45) * params.islandShapeAmplitude;
  const channelCuts = Math.abs(fbm(noiseSet.nExtra, x * params.channelCutsScale, 0.63, z * params.channelCutsScale, 3, 2.0, 0.5)) * params.channelCutsAmplitude;
  const coastlineNoise = noiseSet.nDetail.sample(x * params.coastlineNoiseScale, 0.2, z * params.coastlineNoiseScale) * params.coastlineNoiseAmplitude;
  return {
    islandMass,
    islandShape,
    channelCuts,
    coastlineNoise,
    archipelago: islandMass + islandShape + coastlineNoise - channelCuts,
  };
}

function getSurfaceHeightData(x, z) {
  const archipelagoData = getArchipelagoBase(x, z);
  const erosion = fbm(noiseSet.nTerrain, x * params.erosionScale, 0.0, z * params.erosionScale, 3, 2.0, 0.45);
  const detail = fbm(noiseSet.nDetail, x * params.detailScale, 0.0, z * params.detailScale, 2, 2.0, 0.4) * params.detailAmplitude;
  const base = archipelagoData.archipelago + detail;

  let surfaceHeight = 0;
  let mode = "open_ocean";
  let ridge = 0;
  let ridgeDetail = 0;
  let mountainFactor = 0;
  let landFactor = 0;

  if (base > params.landThreshold) {
    mode = "land";
    landFactor = smoothstep(params.landThreshold, params.landThresholdMax, base);
    ridge = fbm(noiseSet.nMountain, x * params.ridgeScale, 0.0, z * params.ridgeScale, 4, 2.2, 0.5);
    ridgeDetail = noiseSet.nExtra.sample(x * params.ridgeDetailScale, 0.0, z * params.ridgeDetailScale) * params.ridgeDetailAmplitude;
    mountainFactor = Math.max(0, ridge + ridgeDetail - params.mountainThreshold);
    mountainFactor *= mountainFactor;

    surfaceHeight = SEA_LEVEL + 1 + landFactor * params.landBaseLift;
    if (mountainFactor > 0 && landFactor > params.landInteriorThreshold) {
      const mountainScale = params.mountainBaseScale + erosion * params.mountainErosionScale;
      surfaceHeight += mountainFactor * mountainScale;
    }

    surfaceHeight += noiseSet.nDetail.sample(x * params.microDetailScale, 0.3, z * params.microDetailScale) * params.microDetailAmplitude;
  } else if (base > params.beachThreshold) {
    mode = "beach";
    const t = smoothstep(params.beachThreshold, params.landThreshold, base);
    const shallowFloor = SEA_LEVEL - params.shallowFloorOffset;
    const deepStart = SEA_LEVEL - params.deepStartOffset;
    surfaceHeight = lerp(deepStart, shallowFloor, t)
      + noiseSet.nDetail.sample(x * params.beachNoiseScale, 0.1, z * params.beachNoiseScale) * params.beachNoiseAmplitude;
  } else {
    mode = "open_ocean";
    const depth = smoothstep(params.beachThreshold, params.deepOceanThreshold, base);
    surfaceHeight = SEA_LEVEL - params.deepStartOffset - depth * params.oceanDepthScale;
    surfaceHeight += noiseSet.nDetail.sample(x * params.oceanNoiseScale, 0.2, z * params.oceanNoiseScale) * params.oceanNoiseAmplitude;
  }

  return {
    ...archipelagoData,
    erosion,
    detail,
    base,
    ridge,
    ridgeDetail,
    mountainFactor,
    landFactor,
    mode,
    surfaceHeight,
  };
}

function createControl(control, target) {
  const wrapper = document.createElement("div");
  wrapper.className = "control";
  wrapper.dataset.key = control.key;

  const head = document.createElement("div");
  head.className = "control-head";

  const headLeft = document.createElement("div");
  headLeft.className = "control-head-left";

  const headRight = document.createElement("div");
  headRight.className = "control-head-right";

  const title = document.createElement("strong");
  title.textContent = control.label;

  const value = document.createElement("span");
  value.id = `${control.key}-value`;
  value.textContent = Number(control.value).toFixed(control.step >= 1 ? 1 : 4);

  const defaultButton = document.createElement("button");
  defaultButton.type = "button";
  defaultButton.className = "mini-button";
  defaultButton.textContent = "Default";

  const description = document.createElement("small");
  description.textContent = control.description;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = control.min;
  slider.max = control.max;
  slider.step = control.step;
  slider.value = control.value;
  slider.addEventListener("input", () => {
    params[control.key] = Number(slider.value);
    value.textContent = Number(slider.value).toFixed(control.step >= 1 ? 1 : 4);
    scheduleRender();
  });

  defaultButton.addEventListener("click", () => {
    slider.value = control.value;
    params[control.key] = control.value;
    value.textContent = Number(control.value).toFixed(control.step >= 1 ? 1 : 4);
    scheduleRender();
  });

  headLeft.append(title, value);
  headRight.append(defaultButton);
  head.append(headLeft, headRight);
  wrapper.append(head, slider, description);
  target.append(wrapper);
}

function rebuildControls() {
  document.getElementById("controls-archipelago").innerHTML = "";
  document.getElementById("controls-surface").innerHTML = "";
  initializeControls();
}

function setPresetStatus(message, kind = "ok") {
  presetStatus.textContent = message;
  presetStatus.classList.remove("preset-status-ok", "preset-status-warn", "preset-status-error");
  presetStatus.classList.add(`preset-status-${kind}`);
}

function applyParams(nextParams) {
  params = { ...params, ...nextParams };
  rebuildControls();
  scheduleRender();
}

function renderPresetButtons() {
  presetButtons.innerHTML = "";
  Object.entries(quickPresets).forEach(([name, preset]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset-chip";
    button.textContent = name;
    button.addEventListener("click", () => {
      applyParams(preset);
      presetInput.value = [
        "Technical values to send back:",
        ...Object.entries(preset).map(([key, value]) => `${key} = ${value}`),
      ].join("\n");
      setPresetStatus(`Preset aplicado: ${name}`, "ok");
    });
    presetButtons.append(button);
  });
}

function parsePresetText(input) {
  const parsed = {};
  const unknownKeys = [];
  const lines = input.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.endsWith(":")) continue;
    const match = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*=\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (!(key in defaultParams)) {
      unknownKeys.push(key);
      continue;
    }
    parsed[key] = Number(value);
  }

  return { parsed, unknownKeys };
}

function initializeControls() {
  const archipelagoTarget = document.getElementById("controls-archipelago");
  const surfaceTarget = document.getElementById("controls-surface");

  controlGroups.archipelago.forEach((control) => createControl(control, archipelagoTarget));
  controlGroups.surface.forEach((control) => createControl(control, surfaceTarget));
}

function getProfileSamples() {
  const width = 420;
  const z = Number(sampleLineZInput.value);
  const samples = [];
  for (let index = 0; index < width; index += 1) {
    const x = lerp(-700, 700, index / (width - 1));
    samples.push({ x, ...getSurfaceHeightData(x, z) });
  }
  return samples;
}

function drawProfile(samples) {
  const ctx = profileCanvas.getContext("2d");
  const width = profileCanvas.width;
  const height = profileCanvas.height;
  ctx.clearRect(0, 0, width, height);

  const minHeight = Math.min(...samples.map((sample) => Math.min(sample.surfaceHeight, SEA_LEVEL - 30, sample.base * 60 + SEA_LEVEL)));
  const maxHeight = Math.max(...samples.map((sample) => Math.max(sample.surfaceHeight, SEA_LEVEL + 40, sample.base * 60 + SEA_LEVEL)));
  const toY = (value) => height - 28 - ((value - minHeight) / (maxHeight - minHeight)) * (height - 56);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 6; i += 1) {
    const y = 20 + ((height - 48) / 6) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(58, 139, 179, 0.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, toY(SEA_LEVEL));
  ctx.lineTo(width, toY(SEA_LEVEL));
  ctx.stroke();

  const drawLine = (color, accessor) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    samples.forEach((sample, index) => {
      const x = (index / (samples.length - 1)) * width;
      const y = toY(accessor(sample));
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  drawLine("#e9b44c", (sample) => SEA_LEVEL + sample.base * 60);
  drawLine("#d5c498", (sample) => sample.surfaceHeight);

  ctx.fillStyle = "rgba(235, 246, 242, 0.7)";
  ctx.font = "12px Segoe UI";
  ctx.fillText(`SEA_LEVEL = ${SEA_LEVEL}`, 12, toY(SEA_LEVEL) - 8);
}

function lerpColor(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function colorFromSample(sample) {
  if (sample.mode === "land") {
    if (sample.surfaceHeight > SEA_LEVEL + 30) return [114, 128, 104];
    if (sample.surfaceHeight > SEA_LEVEL + 12) return [102, 152, 82];
    return [126, 176, 92];
  }
  if (sample.mode === "beach") {
    const beachMix = smoothstep(SEA_LEVEL - 10, SEA_LEVEL + 2, sample.surfaceHeight);
    return lerpColor([176, 173, 132], [222, 201, 142], beachMix);
  }
  if (sample.surfaceHeight > SEA_LEVEL - 10) {
    const shelfMix = smoothstep(SEA_LEVEL - 12, SEA_LEVEL, sample.surfaceHeight);
    return lerpColor([54, 112, 150], [92, 168, 189], shelfMix);
  }
  if (sample.surfaceHeight > SEA_LEVEL - 24) {
    const oceanMix = smoothstep(SEA_LEVEL - 26, SEA_LEVEL - 8, sample.surfaceHeight);
    return lerpColor([24, 69, 101], [63, 132, 167], oceanMix);
  }
  return [14, 39, 63];
}

function getMapWorldPosition(px, py) {
  const width = mapCanvas.width;
  const height = mapCanvas.height;
  const baseSpan = Number(mapSpanInput.value);
  const span = baseSpan / mapView.zoom;
  const x = lerp(mapView.centerX - span, mapView.centerX + span, px / (width - 1));
  const z = lerp(mapView.centerZ - span, mapView.centerZ + span, py / (height - 1));
  return { x, z, span };
}

function updateMapReadout(span) {
  mapCenterReadout.textContent = `center: (${mapView.centerX.toFixed(1)}, ${mapView.centerZ.toFixed(1)})`;
  mapZoomReadout.textContent = `zoom: ${mapView.zoom.toFixed(2)}x`;
  mapSpanReadout.textContent = `span: ${span.toFixed(1)}`;
}

function drawMap() {
  const ctx = mapCanvas.getContext("2d");
  const width = mapCanvas.width;
  const height = mapCanvas.height;
  const span = Number(mapSpanInput.value) / mapView.zoom;
  const image = ctx.createImageData(width, height);
  let landCells = 0;
  let totalHeight = 0;
  let highestPoint = -Infinity;

  for (let py = 0; py < height; py += 1) {
    for (let px = 0; px < width; px += 1) {
      const x = lerp(mapView.centerX - span, mapView.centerX + span, px / (width - 1));
      const z = lerp(mapView.centerZ - span, mapView.centerZ + span, py / (height - 1));
      const data = getSurfaceHeightData(x, z);
      const [r, g, b] = colorFromSample(data);
      const index = (py * width + px) * 4;
      image.data[index] = r;
      image.data[index + 1] = g;
      image.data[index + 2] = b;
      image.data[index + 3] = 255;
      if (data.surfaceHeight > SEA_LEVEL) landCells += 1;
      totalHeight += data.surfaceHeight;
      highestPoint = Math.max(highestPoint, data.surfaceHeight);
    }
  }

  ctx.putImageData(image, 0, 0);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width * 0.5, 0);
  ctx.lineTo(width * 0.5, height);
  ctx.moveTo(0, height * 0.5);
  ctx.lineTo(width, height * 0.5);
  ctx.stroke();
  updateMapReadout(span);
  return {
    landCoverage: (landCells / (width * height)) * 100,
    averageHeight: totalHeight / (width * height),
    highestPoint,
  };
}

function updateMapTooltip(clientX, clientY) {
  const rect = mapCanvas.getBoundingClientRect();
  const px = ((clientX - rect.left) / rect.width) * mapCanvas.width;
  const py = ((clientY - rect.top) / rect.height) * mapCanvas.height;
  if (px < 0 || py < 0 || px > mapCanvas.width || py > mapCanvas.height) {
    mapTooltip.classList.remove("visible");
    return;
  }

  const world = getMapWorldPosition(px, py);
  const sample = getSurfaceHeightData(world.x, world.z);
  mapTooltip.innerHTML = [
    `<strong>x=${world.x.toFixed(1)} z=${world.z.toFixed(1)}</strong>`,
    `<div><code>mode</code>: ${sample.mode}</div>`,
    `<div><code>surfaceHeight</code>: ${sample.surfaceHeight.toFixed(2)}</div>`,
    `<div><code>base</code>: ${sample.base.toFixed(4)}</div>`,
    `<div><code>archipelago</code>: ${sample.archipelago.toFixed(4)}</div>`,
    `<div><code>islandMass</code>: ${sample.islandMass.toFixed(4)}</div>`,
    `<div><code>channelCuts</code>: ${sample.channelCuts.toFixed(4)}</div>`,
    `<div><code>erosion</code>: ${sample.erosion.toFixed(4)}</div>`,
    `<div><code>landFactor</code>: ${sample.landFactor.toFixed(4)}</div>`,
  ].join("");
  mapTooltip.style.left = `${clientX - rect.left}px`;
  mapTooltip.style.top = `${clientY - rect.top}px`;
  mapTooltip.classList.add("visible");
}

function detectIslandSegments(samples) {
  const segments = [];
  let start = null;
  samples.forEach((sample, index) => {
    const isLand = sample.surfaceHeight > SEA_LEVEL;
    if (isLand && start === null) start = index;
    if (!isLand && start !== null) {
      segments.push([start, index - 1]);
      start = null;
    }
  });
  if (start !== null) segments.push([start, samples.length - 1]);
  return segments;
}

function updateStats(samples, mapStats) {
  const segments = detectIslandSegments(samples);
  let averageGap = 0;
  if (segments.length > 1) {
    const gaps = [];
    for (let i = 1; i < segments.length; i += 1) {
      const previous = samples[segments[i - 1][1]].x;
      const current = samples[segments[i][0]].x;
      gaps.push(current - previous);
    }
    averageGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
  }

  const stats = [
    ["visible islands on line", String(segments.length)],
    ["average island gap", averageGap ? `${averageGap.toFixed(1)} blocks` : "n/a"],
    ["land coverage on map", `${mapStats.landCoverage.toFixed(1)}%`],
    ["highest sampled point", mapStats.highestPoint.toFixed(1)],
    ["average sampled height", mapStats.averageHeight.toFixed(1)],
    ["SEA_LEVEL", String(SEA_LEVEL)],
  ];

  statsGrid.innerHTML = "";
  stats.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    const span = document.createElement("span");
    span.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = value;
    card.append(span, strong);
    statsGrid.append(card);
  });
}

function updateTextPanels() {
  exportBox.value = [
    "Technical values to send back:",
    ...Object.entries(params).map(([key, value]) => `${key} = ${typeof value === "number" ? value.toFixed(4).replace(/\.0+$/, "") : value}`),
  ].join("\n");

  codePreview.textContent = [
    "private double getArchipelagoBase(int x, int z) {",
    `    double islandMass = fbm(nContinent, x * ${params.islandMassScale.toFixed(4)}, 0.0, z * ${params.islandMassScale.toFixed(4)}, 4, 2.0, 0.5);`,
    `    double islandShape = fbm(nTerrain, x * ${params.islandShapeScale.toFixed(4)}, 0.15, z * ${params.islandShapeScale.toFixed(4)}, 3, 2.0, 0.45) * ${params.islandShapeAmplitude.toFixed(2)};`,
    `    double channelCuts = Math.abs(fbm(nExtra, x * ${params.channelCutsScale.toFixed(4)}, 0.63, z * ${params.channelCutsScale.toFixed(4)}, 3, 2.0, 0.5)) * ${params.channelCutsAmplitude.toFixed(2)};`,
    `    double coastlineNoise = nDetail.sample(x * ${params.coastlineNoiseScale.toFixed(4)}, 0.2, z * ${params.coastlineNoiseScale.toFixed(4)}) * ${params.coastlineNoiseAmplitude.toFixed(2)};`,
    "}",
    "",
    "private double getSurfaceHeight(int x, int z) {",
    `    double erosion = fbm(nTerrain, x * ${params.erosionScale.toFixed(4)}, 0, z * ${params.erosionScale.toFixed(4)}, 3, 2.0, 0.45);`,
    `    double detail = fbm(nDetail, x * ${params.detailScale.toFixed(4)}, 0, z * ${params.detailScale.toFixed(4)}, 2, 2.0, 0.4) * ${params.detailAmplitude.toFixed(2)};`,
    `    if (base > ${params.landThreshold.toFixed(2)}) {`,
    `        double landFactor = smoothstep(${params.landThreshold.toFixed(2)}, ${params.landThresholdMax.toFixed(2)}, base);`,
    `        double ridge = fbm(nMountain, x * ${params.ridgeScale.toFixed(4)}, 0, z * ${params.ridgeScale.toFixed(4)}, 4, 2.2, 0.5);`,
    `        double ridgeDetail = nExtra.sample(x * ${params.ridgeDetailScale.toFixed(4)}, 0, z * ${params.ridgeDetailScale.toFixed(4)}) * ${params.ridgeDetailAmplitude.toFixed(2)};`,
    `        double mountainFactor = Math.max(0, ridge + ridgeDetail - ${params.mountainThreshold.toFixed(2)});`,
    `        double mountainScale = ${params.mountainBaseScale.toFixed(1)} + erosion * ${params.mountainErosionScale.toFixed(1)};`,
    `        double height = SEA_LEVEL + 1 + landFactor * ${params.landBaseLift.toFixed(1)};`,
    `        if (mountainFactor > 0 && landFactor > ${params.landInteriorThreshold.toFixed(2)}) { ... }`,
    `    } else if (base > ${params.beachThreshold.toFixed(2)}) { ... }`,
    "}",
  ].join("\n");
}

function render() {
  scheduled = false;
  sampleLineZLabel.textContent = `z = ${sampleLineZInput.value}`;
  const samples = getProfileSamples();
  drawProfile(samples);
  const mapStats = drawMap();
  updateStats(samples, mapStats);
  updateTextPanels();
}

function scheduleRender() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(render);
}

mapCanvas.addEventListener("mousedown", (event) => {
  mapView.dragging = true;
  mapView.lastMouseX = event.clientX;
  mapView.lastMouseY = event.clientY;
  mapCanvas.classList.add("dragging");
});

window.addEventListener("mouseup", () => {
  mapView.dragging = false;
  mapCanvas.classList.remove("dragging");
});

window.addEventListener("mousemove", (event) => {
  if (mapView.dragging) {
    const rect = mapCanvas.getBoundingClientRect();
    const span = Number(mapSpanInput.value) / mapView.zoom;
    const blocksPerPixelX = (span * 2) / rect.width;
    const blocksPerPixelZ = (span * 2) / rect.height;
    mapView.centerX -= (event.clientX - mapView.lastMouseX) * blocksPerPixelX;
    mapView.centerZ -= (event.clientY - mapView.lastMouseY) * blocksPerPixelZ;
    mapView.lastMouseX = event.clientX;
    mapView.lastMouseY = event.clientY;
    scheduleRender();
  }
  if (event.target === mapCanvas) {
    updateMapTooltip(event.clientX, event.clientY);
  }
});

mapCanvas.addEventListener("mouseleave", () => {
  mapTooltip.classList.remove("visible");
});

mapCanvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const nextZoom = event.deltaY < 0 ? mapView.zoom * 1.15 : mapView.zoom / 1.15;
  mapView.zoom = clamp(nextZoom, 0.5, 6);
  scheduleRender();
}, { passive: false });

copyValuesButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(exportBox.value);
    copyValuesButton.textContent = "Copiado";
    setTimeout(() => {
      copyValuesButton.textContent = "Copiar valores";
    }, 1200);
  } catch {
    copyValuesButton.textContent = "No se pudo copiar";
    setTimeout(() => {
      copyValuesButton.textContent = "Copiar valores";
    }, 1200);
  }
});

randomSeedButton.addEventListener("click", () => {
  seedInput.value = String(Math.floor(Math.random() * 1000000));
  noiseSet = createNoiseSet(Number(seedInput.value));
  scheduleRender();
});

resetButton.addEventListener("click", () => {
  params = { ...defaultParams };
  rebuildControls();
  setPresetStatus("Valores restaurados a Default.", "ok");
  scheduleRender();
});

applyPresetButton.addEventListener("click", () => {
  const { parsed, unknownKeys } = parsePresetText(presetInput.value);
  const parsedCount = Object.keys(parsed).length;
  if (parsedCount === 0) {
    setPresetStatus("No encontré parámetros válidos en el texto pegado.", "error");
    return;
  }
  applyParams(parsed);
  if (unknownKeys.length > 0) {
    setPresetStatus(`Preset aplicado con ${parsedCount} valores. Ignoradas: ${unknownKeys.join(", ")}`, "warn");
    return;
  }
  setPresetStatus(`Preset aplicado con ${parsedCount} valores.`, "ok");
});

clearPresetButton.addEventListener("click", () => {
  presetInput.value = "";
  setPresetStatus("Caja de preset limpia.", "ok");
});

sampleLineZInput.addEventListener("input", scheduleRender);
mapSpanInput.addEventListener("input", scheduleRender);
seedInput.addEventListener("change", () => {
  noiseSet = createNoiseSet(Number(seedInput.value));
  scheduleRender();
});

initializeControls();
renderPresetButtons();
render();