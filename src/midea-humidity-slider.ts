import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";

const ARC = "M 49.289 190.711 A 100 100 0 1 1 190.711 190.711";

@customElement("midea-humidity-slider")
export class MideaHumiditySlider extends LitElement {
  @property({ type: Number }) public min = 0;
  @property({ type: Number }) public max = 100;
  @property({ type: Number }) public step = 5;
  @property({ type: Number }) public value = 0;
  @property({ type: Boolean, reflect: true }) public disabled = false;
  @property() public label = "";

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
    const fraction = this.max > this.min ? (value - this.min) / (this.max - this.min) : 0;
    const angle = (135 + fraction * 270) * Math.PI / 180;
    const x = 120 + 100 * Math.cos(angle);
    const y = 120 + 100 * Math.sin(angle);
    const length = fraction * 100;

    return html`
      <svg viewBox="0 0 240 240" role="slider"
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
        <path class="active" d=${ARC} pathLength="100"
          stroke-dasharray=${`${length} 100`}
          visibility=${length === 0 ? "hidden" : "visible"} />
        <path class="hit-area" d=${ARC} />
        <circle class="thumb" cx=${x} cy=${y} r="10" />
      </svg>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      --midea-slider-color: var(--primary-color, #03a9f4);
      --midea-slider-track-color: var(--divider-color, #bdbdbd);
    }
    svg {
      display: block;
      width: 100%;
      overflow: visible;
      outline: none;
      pointer-events: none;
      touch-action: none;
    }
    path {
      fill: none;
      stroke-width: 14;
      stroke-linecap: round;
    }
    .track {
      stroke: var(--midea-slider-track-color);
    }
    .active {
      stroke: var(--midea-slider-color);
    }
    .hit-area {
      stroke: transparent;
      stroke-width: 36;
    }
    .hit-area, .thumb {
      pointer-events: auto;
      touch-action: none;
      cursor: pointer;
    }
    .thumb {
      fill: var(--midea-slider-color);
      stroke: var(--card-background-color, white);
      stroke-width: 3;
    }
    svg:focus-visible .thumb {
      stroke: var(--primary-text-color, #212121);
      stroke-width: 4;
    }
    :host([disabled]) .active {
      stroke: var(--disabled-text-color, #9e9e9e);
    }
    :host([disabled]) .thumb {
      fill: var(--disabled-text-color, #9e9e9e);
    }
    :host([disabled]) .hit-area, :host([disabled]) .thumb {
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "midea-humidity-slider": MideaHumiditySlider;
  }
}
