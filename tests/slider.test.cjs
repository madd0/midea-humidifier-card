const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function compile(file) {
  return ts.transpileModule(readFileSync(require.resolve(file), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2017,
      experimentalDecorators: true,
    },
  }).outputText;
}

const source = compile("../src/midea-humidifier-card.ts");
const sliderSource = compile("../src/midea-humidity-slider.ts");

// Inspect Lit bindings and exercise event handlers without a running HA instance.
const template = (strings, ...values) => ({ strings, values });
const decorator = () => () => {};

function setup() {
  const registry = new Map();
  const window = {};
  const exports = {};
  const modules = {
    "@mdi/js": new Proxy({}, { get: (_, name) => name }),
    "home-assistant-js-websocket": { STATE_NOT_RUNNING: "NOT_RUNNING" },
    "./localize/localize": { localize: (key) => key },
    lit: {
      LitElement: class extends EventTarget {
        connectedCallback() {}
        disconnectedCallback() {}
      },
      html: template,
      svg: template,
      css: template,
      nothing: undefined,
    },
    "lit/decorators": {
      customElement: (name) => (element) => { registry.set(name, element); },
      property: decorator,
      state: decorator,
    },
    "lit/directives/class-map": {
      classMap: (classes) => Object.keys(classes).filter((key) => classes[key]).join(" "),
    },
    "custom-card-helpers": { computeDomain: (id) => id.split(".")[0] },
    "./humidifier": {},
  };
  const context = {
    window,
    CustomEvent,
    customElements: { get: (name) => registry.get(name) },
    console: { info() {} },
    require: (name) => {
      assert.ok(name in modules, `Unexpected import: ${name}`);
      return modules[name];
    },
  };
  const sliderExports = {};
  vm.runInNewContext(sliderSource, { ...context, exports: sliderExports });
  modules["./midea-humidity-slider"] = sliderExports;
  vm.runInNewContext(source, { ...context, exports });
  const card = new exports.MideaHumidifierCard();
  const calls = [];
  card.setConfig({
    entity: "humidifier.demo",
    fan_entity: "fan.demo",
    humidity_entity: "sensor.humidity",
    temperature_entity: "sensor.temperature",
    show_ion_toggle: false,
  });
  card.hass = {
    states: {
      "humidifier.demo": {
        entity_id: "humidifier.demo",
        state: "on",
        attributes: {
          friendly_name: "Demo",
          humidity: 50,
          min_humidity: 35,
          max_humidity: 85,
          device_class: "dehumidifier",
        },
      },
      "fan.demo": { state: "on", attributes: {} },
      "sensor.humidity": { state: "61", attributes: {} },
      "sensor.temperature": { state: "22", attributes: {} },
    },
    localize: (key) => key,
    callService: (...args) => calls.push(args),
  };
  return {
    card, calls, registry, window,
    slider: new sliderExports.MideaHumiditySlider(),
  };
}

function findTemplate(result, text) {
  if (!result || !result.strings) return undefined;
  if (result.strings.join("").includes(text)) return result;
  return result.values.flatMap((value) => Array.isArray(value) ? value : [value])
    .map((value) => findTemplate(value, text)).find(Boolean);
}

function binding(result, name) {
  const index = result.strings.findIndex((part) => part.endsWith(`${name}=`));
  assert.notEqual(index, -1, `Missing binding: ${name}`);
  return result.values[index];
}

test("bundles a namespaced slider without HA components or card helpers", () => {
  const { card, registry, window } = setup();
  Object.defineProperty(window, "loadCardHelpers", {
    get() { assert.fail("Slider must not load HA card helpers"); },
  });
  card.connectedCallback();
  assert.ok(registry.get("midea-humidity-slider"));
  assert.equal(registry.get("ha-control-circular-slider"), undefined);
  assert.ok(findTemplate(card.render(), "<midea-humidity-slider"));
});

test("binds the bundled slider with entity limits, five-percent steps and accessibility", () => {
  const { card } = setup();
  const slider = findTemplate(card.render(), "<midea-humidity-slider");
  assert.ok(slider);
  assert.equal(binding(slider, ".value"), 50);
  assert.equal(binding(slider, ".min"), 35);
  assert.equal(binding(slider, ".max"), 85);
  assert.equal(binding(slider, ".step"), 5);
  assert.equal(binding(slider, ".disabled"), false);
  assert.equal(binding(slider, ".mode"), "end");
  assert.equal(binding(slider, ".label"), "Demo");
  assert.equal(findTemplate(card.render(), "<round-slider"), undefined);
});

test("preserves disabled states and default humidity limits", () => {
  const { card } = setup();
  const entity = card.hass.states["humidifier.demo"];
  for (const state of ["off", "unknown", "unavailable"]) {
    entity.state = state;
    const slider = findTemplate(card.render(), "<midea-humidity-slider");
    assert.equal(binding(slider, ".disabled"), true, state);
  }
  entity.state = "on";
  entity.attributes = { friendly_name: "Demo", humidity: null };
  const slider = findTemplate(card.render(), "<midea-humidity-slider");
  assert.equal(binding(slider, ".value"), 0);
  assert.equal(binding(slider, ".min"), 0);
  assert.equal(binding(slider, ".max"), 100);
  assert.equal(binding(slider, ".mode"), "start");
  entity.attributes.humidity = NaN;
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".value"), 0);
});

test("dragging previews without service calls and committing calls the right service", () => {
  const { card, calls } = setup();
  const slider = findTemplate(card.render(), "<midea-humidity-slider");
  binding(slider, "@value-changing").call(card, { detail: { value: 65 } });
  assert.equal(card._previewHumidity, 65);
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".value"), 50);
  assert.equal(calls.length, 0);
  assert.equal(card.shouldUpdate(new Map([["_previewHumidity", 50]])), true);
  binding(slider, "@value-changing").call(card, { detail: { value: undefined } });
  assert.equal(card._previewHumidity, undefined);
  binding(slider, "@value-changed").call(card, { detail: { value: 65 } });
  assert.equal(card._targetHumidity, 65);
  assert.equal(card._previewHumidity, undefined);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "humidifier");
  assert.equal(calls[0][1], "set_humidity");
  assert.equal(calls[0][2].entity_id, "humidifier.demo");
  assert.equal(calls[0][2].humidity, 65);
});

test("committed keyboard or tap values update the preview and external HA updates still sync", () => {
  const { card, calls } = setup();
  card._setTargetHumidity({ detail: { value: 70 } });
  assert.equal(card._targetHumidity, 70);
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".value"), 70);
  assert.equal(calls.length, 1);
  card.willUpdate(new Map([["hass", undefined]]));
  assert.equal(card._targetHumidity, 50);
  assert.equal(card._currentHumidity, 61);
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".value"), 50);
});

test("mode classes are case-insensitive, off is neutral, and warnings take priority", () => {
  const { card } = setup();
  const entity = card.hass.states["humidifier.demo"];
  for (const mode of ["set", "Set", "SMART", "Continuous", "dry"]) {
    entity.attributes.mode = mode;
    assert.equal(binding(findTemplate(card.render(), "<ha-card"), "class"), mode.toLowerCase());
  }
  entity.state = "off";
  assert.equal(binding(findTemplate(card.render(), "<ha-card"), "class"), "off");
  card._config.tank_entity = "binary_sensor.tank";
  card.hass.states["binary_sensor.tank"] = { state: "on" };
  assert.equal(binding(findTemplate(card.render(), "<ha-card"), "class"), "error");
});

function pointer(slider, fraction, overrides = {}) {
  const angle = (135 + fraction * 270) * Math.PI / 180;
  const captured = new Set();
  const svg = {
    focus() {},
    setPointerCapture: (id) => captured.add(id),
    hasPointerCapture: (id) => captured.has(id),
    releasePointerCapture: (id) => captured.delete(id),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 240, height: 240 }),
  };
  return {
    currentTarget: svg,
    pointerId: 1, button: 0,
    clientX: 120 + 100 * Math.cos(angle),
    clientY: 120 + 100 * Math.sin(angle),
    preventDefault() {},
    ...overrides,
  };
}

function segment(slider, name) {
  return slider.render().values.find((value) =>
    value?.strings && value.strings.join("").includes("stroke-dasharray") &&
    binding(value, "class") === name);
}

test("native arc direction and split colors reflect target and current humidity", () => {
  const { slider } = setup();
  slider.min = 35; slider.max = 85;
  slider.current = 65;
  slider.mode = "end";
  slider.value = 50;
  assert.equal(binding(segment(slider, "tinted"), "stroke-dasharray"), "70 100");
  assert.equal(binding(segment(slider, "tinted"), "stroke-dashoffset"), -30);
  assert.equal(binding(segment(slider, "active"), "stroke-dasharray"), "30 100");
  assert.equal(binding(segment(slider, "active"), "stroke-dashoffset"), -30);
  slider.current = 40;
  assert.equal(binding(segment(slider, "active"), "visibility"), "hidden");
  slider.current = undefined;
  assert.equal(binding(segment(slider, "active"), "stroke-dasharray"), "70 100");
  slider.mode = "start";
  slider.current = 35;
  for (const [value, length] of [[35, 0], [50, 30], [60, 50], [85, 100]]) {
    slider.value = value;
    const rendered = segment(slider, "tinted");
    assert.equal(binding(rendered, "stroke-dasharray"), `${length} 100`);
    assert.equal(binding(rendered, "visibility"), length === 0 ? "hidden" : "visible");
    assert.equal(binding(rendered, "stroke-dashoffset"), 0);
  }
});

test("current indicator only appears for finite sensor values within the arc range", () => {
  const { slider } = setup();
  slider.min = 35; slider.max = 85; slider.value = 50;
  for (const current of [35, 61, 85]) {
    slider.current = current;
    assert.ok(findTemplate(slider.render(), 'r="4"'));
  }
  for (const current of [undefined, NaN, Infinity, 20, 90]) {
    slider.current = current;
    assert.equal(findTemplate(slider.render(), 'r="4"'), undefined);
  }
  slider.min = 0;
  slider.current = 0;
  assert.ok(findTemplate(slider.render(), 'r="4"'));
});

test("plus/minus buttons commit bounded five-percent steps without duplicate calls", () => {
  const { slider, card, calls } = setup();
  slider.min = 35; slider.max = 85; slider.value = 50;
  slider.addEventListener("value-changed", (event) => card._setTargetHumidity(event));
  binding(slider.render(), "@click").call(slider);
  assert.equal(slider.value, 45);
  slider._increase();
  assert.equal(slider.value, 50);
  assert.equal(calls.length, 2);
  assert.equal(calls[0][2].humidity, 45);
  assert.equal(calls[1][2].humidity, 50);
  slider.value = 85;
  slider._increase();
  assert.equal(calls.length, 2);
  slider.value = 35;
  slider._decrease();
  assert.equal(calls.length, 2);
  slider.disabled = true;
  slider._increase();
  assert.equal(slider.value, 35);
  assert.equal(binding(slider.render(), "?disabled"), true);
  slider.disabled = false;
  slider._pointerDown(pointer(slider, 0.5));
  slider._increase();
  assert.equal(slider.value, 35);
});

test("current sensor updates reach the dial and unavailable readings remove the marker", () => {
  const { card } = setup();
  card.willUpdate(new Map([["hass", undefined]]));
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".current"), 61);
  const oldHass = card.hass;
  card.hass = { ...oldHass, states: {
    ...oldHass.states, "sensor.humidity": { state: "unavailable", attributes: {} },
  }};
  card.willUpdate(new Map([["hass", oldHass]]));
  assert.equal(binding(findTemplate(card.render(), "<midea-humidity-slider"), ".current"), undefined);
});

test("outlined mode, fan and power buttons keep their service bindings and pressed state", () => {
  const { card, calls } = setup();
  const mode = card._renderIcon("smart", "smart", false);
  assert.equal(binding(mode, "aria-pressed"), true);
  assert.match(mode.strings.join(""), /<button type="button"/);
  binding(mode, "@click").call(card, { currentTarget: { mode: "smart" } });
  const fan = card._renderFanIcon("low", "low", false);
  assert.equal(binding(fan, "aria-pressed"), true);
  binding(fan, "@click").call(card, { currentTarget: { mode: "low" } });
  const power = card._renderPowerIcon("off", "on");
  binding(power, "@click").call(card, { currentTarget: { status: "off" } });
  assert.equal(calls[0][1], "set_mode");
  assert.equal(calls[0][2].mode, "smart");
  assert.equal(calls[1][1], "set_preset_mode");
  assert.equal(calls[1][2].preset_mode, "low");
  assert.equal(calls[2][1], "turn_off");
});

test("pointer geometry clamps and snaps values within the entity's range", () => {
  const { slider } = setup();
  slider.min = 35; slider.max = 85;
  for (const [fraction, expected] of [[0, 35], [0.31, 50], [0.5, 60], [1, 85]]) {
    assert.equal(slider._valueFromPointer(pointer(slider, fraction)), expected);
  }
  assert.equal(slider._valueFromPointer(pointer(slider, 1.1)), 85);
  assert.equal(slider._valueFromPointer(pointer(slider, -0.1)), 35);
  slider.min = 37;
  assert.equal(slider._snap(44), 42);
  slider.min = 0.1; slider.max = 1; slider.step = 0.1;
  assert.equal(slider._snap(0.31), 0.3);
});

test("pointer dragging previews, ignores other pointers, and commits once on release", () => {
  const { slider } = setup();
  const changes = [];
  slider.addEventListener("value-changing", (event) => changes.push(["preview", event.detail.value]));
  slider.addEventListener("value-changed", (event) => changes.push(["commit", event.detail.value]));
  slider._pointerDown(pointer(slider, 0.5));
  slider._pointerMove(pointer(slider, 0.8, { pointerId: 2 }));
  slider._pointerUp(pointer(slider, 0.8, { pointerId: 2 }));
  assert.deepEqual(changes, [["preview", 50]]);
  slider._pointerMove(pointer(slider, 0.75));
  slider._pointerUp(pointer(slider, 0.75));
  slider._pointerUp(pointer(slider, 0.75));
  assert.deepEqual(changes, [["preview", 50], ["preview", 75], ["commit", 75]]);
  assert.equal(slider.value, 75);
});

test("pointer cancellation, capture loss, disabling and disconnect never commit", () => {
  for (const reason of ["cancel", "lost-capture", "disabled", "disconnect", "external-value"]) {
    const { slider } = setup();
    slider.value = 40;
    const commits = [];
    slider.addEventListener("value-changed", (event) => commits.push(event.detail.value));
    slider._pointerDown(pointer(slider, 0.5));
    if (reason === "disabled") {
      slider.disabled = true;
      slider.willUpdate(new Map([["disabled", false]]));
    } else if (reason === "disconnect") {
      slider.disconnectedCallback();
    } else if (reason === "external-value") {
      slider.value = 65;
      slider.willUpdate(new Map([["value", 40]]));
    } else {
      const eventName = reason === "cancel" ? "@pointercancel" : "@lostpointercapture";
      binding(slider.render(), eventName).call(slider, pointer(slider, 0.5));
    }
    slider._pointerUp(pointer(slider, 0.5));
    assert.deepEqual(commits, [], reason);
    assert.equal(slider._dragValue, undefined);
    assert.equal(slider.value, reason === "external-value" ? 65 : 40);
  }
});

test("keyboard access supports arrows, page steps and endpoints without exceeding limits", () => {
  const { slider } = setup();
  slider.min = 35; slider.max = 85; slider.value = 50;
  for (const [key, expected] of [
    ["ArrowUp", 55], ["ArrowRight", 60], ["ArrowDown", 55], ["ArrowLeft", 50],
    ["PageUp", 55], ["PageDown", 50], ["Home", 35], ["ArrowLeft", 35],
    ["End", 85], ["ArrowRight", 85], ["Tab", 85],
  ]) {
    slider._keyDown({ key, preventDefault() {} });
    assert.equal(slider.value, expected, key);
  }
});

test("disabled slider blocks pointers and keyboard and exposes accessible state", () => {
  const { slider } = setup();
  slider.disabled = true;
  slider.value = 50;
  slider._pointerDown(pointer(slider, 0.75));
  slider._keyDown({ key: "End" });
  assert.equal(slider.value, 50);
  const rendered = slider.render();
  assert.equal(binding(rendered, "aria-disabled"), true);
  assert.equal(binding(rendered, "tabindex"), "-1");
  slider.disabled = false;
  slider.label = "Humidity";
  assert.equal(binding(slider.render(), "aria-label"), "Humidity");
  assert.equal(binding(slider.render(), "aria-valuetext"), "50%");
  slider._pointerDown(pointer(slider, 0.75, { button: 2 }));
  assert.equal(slider._dragValue, undefined);
});
