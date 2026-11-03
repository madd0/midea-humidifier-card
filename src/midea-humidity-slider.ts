import { css, html, LitElement, nothing, PropertyValues, svg, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";

const RADIUS = 145;
const ARC = "M 57.47 262.53 A 145 145 0 1 1 262.53 262.53";

@customElement("midea-humidity-slider")
export class MideaHumiditySlider extends LitElement {
  @property({ type: Number }) public min = 0;
  @property({ type: Number }) public max = 100;
  @property({ type: Number }) public step = 5;
  @property({ type: Number }) public value = 0;
  @property({ type: Boolean, reflect: true }) public disabled = false;
  @property() public label = "";
  @property({ type: Number }) public current?: number;
  @property() public mode: "start" | "end" = "start";
  @property() public decreaseLabel = "Decrease humidity";
  @property() public increaseLabel = "Increase humidity";

  @state() private _dragValue?: number;

  private _pointerId?: number;

  private get _interactive(): boolean {
    return !this.disabled && this.max > this.min && this.step > 0;
  }

  private _bound(value: number): number {
    return Math.min(this.max, Math.max(this.min, value));
  }

  private _snap(value: number): number {
    const stepped = this.min + Math.round((value - this.min) / this.step) * this.step;
    return this._bound(Number(stepped.toFixed(6)));
  }

  private _emit(type: "value-changing" | "value-changed", value: number): void {
    this.dispatchEvent(new CustomEvent(type, {
      detail: { value },
      bubbles: true,
      composed: true,
    }));
  }

  private _valueFromPointer(event: PointerEvent): number {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    let angle = (Math.atan2(y, x) * 180 / Math.PI - 135 + 360) % 360;
    // The bottom 90 degrees are outside the track; use the nearest endpoint.
    if (angle > 270) {
      angle = angle < 315 ? 270 : 0;
    }
    return this._snap(this.min + angle / 270 * (this.max - this.min));
  }

  private _preview(event: PointerEvent): void {
    const value = this._valueFromPointer(event);
    if (value !== this._dragValue) {
      this._dragValue = value;
      this._emit("value-changing", value);
    }
  }

  private _pointerDown(event: PointerEvent): void {
    if (!this._interactive || this._pointerId !== undefined || event.button !== 0) {
      return;
    }
    event.preventDefault();
    const svg = event.currentTarget as SVGSVGElement;
    svg.focus();
    svg.setPointerCapture(event.pointerId);
    this._pointerId = event.pointerId;
    this._preview(event);
  }

  private _pointerMove(event: PointerEvent): void {
    if (this._interactive && event.pointerId === this._pointerId) {
      this._preview(event);
    }
  }

  private _pointerUp(event: PointerEvent): void {
    if (event.pointerId !== this._pointerId) {
      return;
    }
    const svg = event.currentTarget as SVGSVGElement;
    this._pointerId = undefined;
    if (svg.hasPointerCapture(event.pointerId)) {
      svg.releasePointerCapture(event.pointerId);
    }
    if (this._interactive) {
      this._commit(this._valueFromPointer(event));
    } else {
      this._cancelDrag();
    }
  }

  private _cancelDrag(): void {
    if (this._dragValue !== undefined) {
      this._dragValue = undefined;
      this._emit("value-changing", this.value);
    }
    this._pointerId = undefined;
  }

  private _pointerCancel(event: PointerEvent): void {
    if (event.pointerId === this._pointerId) {
      this._cancelDrag();
    }
  }

  private _commit(value: number): void {
    this.value = value;
    this._dragValue = undefined;
    this._emit("value-changed", value);
  }

  private _adjust(amount: number): void {
    if (!this._interactive || this._pointerId !== undefined) {
      return;
    }
    const value = this._snap(this.value + amount);
    if (value !== this.value) {
      this._commit(value);
    }
  }

  private _decrease(): void {
    this._adjust(-this.step);
  }

  private _increase(): void {
    this._adjust(this.step);
  }

  private _keyDown(event: KeyboardEvent): void {
    if (!this._interactive || this._pointerId !== undefined) {
      return;
    }
    let value = this.value;
    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight":
        value = this._snap(value + this.step);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        value = this._snap(value - this.step);
        break;
      case "PageUp":
        value = this._snap(value + Math.max(this.step, (this.max - this.min) / 10));
        break;
      case "PageDown":
        value = this._snap(value - Math.max(this.step, (this.max - this.min) / 10));
        break;
      case "Home":
        value = this.min;
        break;
      case "End":
        value = this.max;
        break;
      default:
        return;
    }
    event.preventDefault();
    if (value !== this.value) {
      this._commit(value);
    }
  }

  public willUpdate(changed: PropertyValues): void {
    if (changed.has("disabled") || changed.has("min") || changed.has("max") ||
      changed.has("step") || changed.has("value")) {
      this._cancelDrag();
    }
  }

  public disconnectedCallback(): void {
    this._cancelDrag();
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    const value = this._bound(this._dragValue ?? this.value);
    const fraction = this._fraction(value);
    const angle = (135 + fraction * 270) * Math.PI / 180;
    const x = 160 + RADIUS * Math.cos(angle);
    const y = 160 + RADIUS * Math.sin(angle);
    const current = this.current != null && Number.isFinite(this.current)
      ? this.current : undefined;
    const currentFraction = this._fraction(current ?? (this.mode === "end" ? this.max : this.min));
    const start = this.mode === "end" ? fraction : 0;
    const end = this.mode === "end" ? 1 : fraction;
    const activeStart = this.mode === "end" ? fraction : currentFraction;
    const activeEnd = this.mode === "end" ? currentFraction : fraction;
    const currentOnArc = current !== undefined && current >= this.min && current <= this.max;
    const currentAngle = (135 + currentFraction * 270) * Math.PI / 180;

    return html`
      <svg viewBox="0 0 320 320" role="slider"
        tabindex=${this._interactive ? "0" : "-1"}
        aria-label=${this.label}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${value}
        aria-valuetext=${`${value}%`}
        aria-disabled=${!this._interactive}
        @keydown=${this._keyDown}
        @pointerdown=${this._pointerDown}
        @pointermove=${this._pointerMove}
        @pointerup=${this._pointerUp}
        @pointercancel=${this._pointerCancel}
        @lostpointercapture=${this._pointerCancel}>
        <path class="track" d=${ARC} />
        ${this._segment("arc-base", start, end)}
        ${this._segment("tinted", start, end)}
        ${this._segment("active", activeStart, activeEnd)}
        ${currentOnArc ? svg`
          <circle class=${currentFraction >= start && currentFraction <= end && !this.disabled
            ? "current on-color" : "current"}
            cx=${160 + RADIUS * Math.cos(currentAngle)}
            cy=${160 + RADIUS * Math.sin(currentAngle)} r="4" />
        ` : nothing}
        <path class="hit-area" d=${ARC} />
        <circle class="thumb" cx=${x} cy=${y} r="10.5" />
      </svg>
      <div class="buttons">
        <button type="button" class="decrease" aria-label=${this.decreaseLabel}
          title=${this.decreaseLabel}
          ?disabled=${!this._interactive || value <= this.min}
          @click=${this._decrease}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14v2H5z" /></svg>
        </button>
        <button type="button" class="increase" aria-label=${this.increaseLabel}
          title=${this.increaseLabel}
          ?disabled=${!this._interactive || value >= this.max}
          @click=${this._increase}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" /></svg>
        </button>
      </div>
    `;
  }

  private _fraction(value: number): number {
    return this.max > this.min ? (this._bound(value) - this.min) / (this.max - this.min) : 0;
  }

  private _segment(name: string, start: number, end: number): TemplateResult {
    const length = Math.max(0, end - start) * 100;
    return svg`<path class=${name} d=${ARC} pathLength="100"
      stroke-dasharray=${`${length} 100`}
      stroke-dashoffset=${start === 0 ? 0 : -start * 100}
      visibility=${length === 0 || this.disabled ? "hidden" : "visible"} />`;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
      container-type: inline-size;
      --midea-slider-color: var(--primary-color, #03a9f4);
      --midea-slider-track-color: var(--disabled-color, #bdbdbd);
    }
    :host > svg {
      display: block;
      width: 100%;
      overflow: visible;
      outline: none;
      pointer-events: none;
      touch-action: none;
    }
    :host > svg path {
      fill: none;
      stroke-width: 24;
      stroke-linecap: round;
    }
    .track {
      stroke: var(--midea-slider-track-color);
      opacity: 0.3;
    }
    .tinted {
      stroke: var(--midea-slider-color);
      opacity: 0.5;
    }
    .arc-base {
      stroke: var(--clear-background-color, var(--card-background-color, white));
    }
    .active {
      stroke: var(--midea-slider-color);
    }
    :host > svg .hit-area {
      stroke: transparent;
      stroke-width: 48;
    }
    .hit-area, .thumb {
      pointer-events: auto;
      touch-action: none;
      cursor: pointer;
    }
    .thumb {
      fill: white;
      stroke: var(--midea-slider-color);
      stroke-width: 3;
    }
    .current {
      fill: var(--primary-text-color, #212121);
      opacity: 0.5;
    }
    .current.on-color {
      fill: var(--clear-background-color, white);
    }
    svg:focus-visible .thumb {
      stroke: var(--primary-text-color, #212121);
      stroke-width: 4;
    }
    :host([disabled]) .hit-area, :host([disabled]) .thumb {
      cursor: default;
    }
    .buttons {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 24px;
      direction: ltr;
      pointer-events: none;
    }
    button {
      width: 48px;
      height: 48px;
      padding: 11px;
      box-sizing: border-box;
      border: 1px solid currentColor;
      border-radius: 50%;
      color: var(--secondary-text-color, #727272);
      background: transparent;
      cursor: pointer;
      pointer-events: auto;
      display: grid;
      place-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    button svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    button:enabled:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    button:enabled:active {
      background: var(--divider-color, rgba(127, 127, 127, 0.24));
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 3px;
    }
    button:disabled {
      color: var(--disabled-text-color, #9e9e9e);
      opacity: 0.5;
      cursor: default;
    }
    @container (max-width: 249px) {
      .buttons {
        position: static;
        margin-top: 8px;
        padding-bottom: 10px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "midea-humidity-slider": MideaHumiditySlider;
  }
}
