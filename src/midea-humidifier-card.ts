/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// process.traceDeprecation = true;
const CARD_NAME = "midea-humidifier-card";
const version  = "1.0.7";

console.info(
  `%c ${CARD_NAME} %c ${version}`,
  'color: cyan; background: black; font-weight: bold;',
  'color: darkblue; background: white; font-weight: bold;',
);
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: 'Midea (De)humidifier Card',
  description: 'Midea/Inventor (De)humidifier lovelace UI card',
});


import {  
  mdiAutorenew,
  mdiAirHumidifier,
  mdiAirHumidifierOff,
  mdiAirPurifier,
  mdiHeadLightbulbOutline,
  mdiTshirtCrew,
  mdiDotsVertical,
  mdiFanSpeed1,
  mdiFanSpeed2,
  mdiFanSpeed3,
  mdiPower,
  mdiPowerCycle,
  mdiSnowflakeMelt
} from "@mdi/js";
import { HassEntity, STATE_NOT_RUNNING } from "home-assistant-js-websocket";
import { localize } from "./localize/localize";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators";
import { classMap } from "lit/directives/class-map";
import { 
  HomeAssistant, 
  LovelaceCard, 
  // LovelaceCardEditor,
  applyThemesOnElement,
  fireEvent, 
  EntityConfig, 
  computeDomain,  
} from 'custom-card-helpers';

import {
  HumidifierEntity,
  HumidifierFanEntity,
  BinaryEntity,
  compareClimateHumidifierModes,
  compareClimateFanHumidifierModes,
  HumidifierMode,
  HumidifierFanMode,
  PowerStatus
} from "./humidifier";

import { LovelaceRowConfig, HumidifierCardConfig, ProblemConfig } from "./types"
import "./midea-humidity-slider";

// Re-imported stuff from original humidifier card into custom card
const arrayFilter = (
  array: any[],
  conditions: Array<(value: any) => boolean>,
  maxSize: number
) => {
  if (!maxSize || maxSize > array.length) {
    maxSize = array.length;
  }

  const filteredArray: any[] = [];

  for (let i = 0; i < array.length && filteredArray.length < maxSize; i++) {
    let meetsConditions = true;

    for (const condition of conditions) {
      if (!condition(array[i])) {
        meetsConditions = false;
        break;
      }
    }

    if (meetsConditions) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};

export const findEntities = (
  hass: HomeAssistant,
  maxEntities: number,
  entities: string[],
  entitiesFallback: string[],
  includeDomains?: string[],
  entityFilter?: (stateObj: HassEntity) => boolean
) => {
  const conditions: Array<(value: string) => boolean> = [];

  if (includeDomains?.length) {
    conditions.push((eid) => includeDomains!.includes(computeDomain(eid)));
  }

  if (entityFilter) {
    conditions.push(
      (eid) => hass.states[eid] && entityFilter(hass.states[eid])
    );
  }

  const entityIds = arrayFilter(entities, conditions, maxEntities);

  if (entityIds.length < maxEntities && entitiesFallback.length) {
    const fallbackEntityIds = findEntities(
      hass,
      maxEntities - entityIds.length,
      entitiesFallback,
      [],
      includeDomains,
      entityFilter
    );

    entityIds.push(...fallbackEntityIds);
  }

  return entityIds;
};


export const computeStateName = (stateObj: HassEntity): string =>
  stateObj.attributes.friendly_name === undefined
    ? computeObjectId(stateObj.entity_id).replace(/_/g, " ")
    : stateObj.attributes.friendly_name || "";

/** Compute the object ID of a state. */
export const computeObjectId = (entityId: string): string => entityId.substr(entityId.indexOf(".") + 1);

const validEntityId = /^(\w+)\.(\w+)$/;

export const isValidEntityId = (entityId: string) => validEntityId.test(entityId);
  

export const processConfigEntities = <
  T extends EntityConfig | LovelaceRowConfig
>(
  entities: Array<T | string>,
  checkEntityId = true
): T[] => {
  if (!entities || !Array.isArray(entities)) {
    throw new Error("Entities need to be an array");
  }

  return entities.map((entityConf, index): T => {
    if (
      typeof entityConf === "object" &&
      !Array.isArray(entityConf) &&
      entityConf.type
    ) {
      return entityConf;
    }

    let config: T;

    if (typeof entityConf === "string") {
      config = { entity: entityConf } as T;
    } else if (typeof entityConf === "object" && !Array.isArray(entityConf)) {
      if (!("entity" in entityConf)) {
        throw new Error(
          `Entity object at position ${index} is missing entity field.`
        );
      }
      config = entityConf as T;
    } else {
      throw new Error(`Invalid entity specified at position ${index}.`);
    }

    if (checkEntityId && !isValidEntityId((config as EntityConfig).entity!)) {
      throw new Error(
        `Invalid entity ID at position ${index}: ${
          (config as EntityConfig).entity
        }`
      );
    }

    return config;
  });
};


function hasConfigChanged(element: any, changedProps: PropertyValues): boolean {
  if (changedProps.has("_config")) {
    return true;
  }

  const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
  if (!oldHass) {
    return true;
  }

  if (
    oldHass.connected !== element.hass!.connected ||
    oldHass.themes !== element.hass!.themes ||
    oldHass.locale !== element.hass!.locale ||
    oldHass.localize !== element.hass.localize ||
    oldHass.config.state !== element.hass.config.state
  ) {
    return true;
  }
  return false;
}

function hasConfigOrEntitiesChanged(
  element: any,
  changedProps: PropertyValues
): boolean {
  if (hasConfigChanged(element, changedProps)) {
    return true;
  }

  const oldHass = changedProps.get("hass") as HomeAssistant;

  const entities = processConfigEntities(element._config!.entities, false);

  return entities.some(
    (entity) =>
      "entity" in entity &&
      oldHass.states[entity.entity] !== element.hass!.states[entity.entity]
  );
}

const createEntityNotFoundWarning = (
  hass: HomeAssistant,
  entityId: string
) =>
  hass.config.state !== STATE_NOT_RUNNING
    ? hass.localize(
        "ui.panel.lovelace.warning.entity_not_found",
        "entity",
        entityId || "[empty]"
      )
    : hass.localize("ui.panel.lovelace.warning.starting");

const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];

const modeIcons: { [mode in HumidifierMode]: string } = {
  off: mdiAirHumidifierOff,
  set: mdiAirHumidifier,
  continuous: mdiAutorenew,
  smart: mdiHeadLightbulbOutline,
  dry: mdiTshirtCrew
};

const powerIcons: { [status in PowerStatus]: string } = {
  off: mdiPower,
  on:  mdiPowerCycle /* mdiPower*/, // colored version
};

const fanModeIcons: { [fanMode in HumidifierFanMode]: string } = {
  silent: mdiFanSpeed1,
  low: mdiFanSpeed1,
  medium: mdiFanSpeed2,
  turbo: mdiFanSpeed3,
  high: mdiFanSpeed3
}

// const debug = (input: any) => JSON.stringify(input, null ,2)

@customElement(CARD_NAME)
export class MideaHumidifierCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import(`./midea-humidifier-card-editor`);
    return document.createElement(`midea-humidifier-card-editor`);    
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): HumidifierCardConfig {
    const includeDomains = ["humidifier"];
    const maxEntities = 1;
    const foundEntities = findEntities(
      hass,
      maxEntities,
      entities,
      entitiesFallback,
      includeDomains
    ) || [];

    
    if(!foundEntities || !foundEntities[0].includes(".")) {
      return {
        type: "'custom:midea-humidifier-card'",
        entity: ``,
        fan_entity: ``,
        tank_entity: ``,
        defrost_entity: ``,
        filter_entity: ``,
        humidity_entity: ``,
        temperature_entity: ``,
        ion_entity: ``,
        swap_target_and_current_humidity: true,
        show_ion_toggle: true
      }
    }
    
    const humidifierEntity = foundEntities[0].split(".")[1]
    // console.info(`[${CARD_NAME}::getStubConfig]: trying to prefill config automatically, found entity: ${humidifierEntity}`)
      
    // zeroconf editor entities autofill
    return { 
      type: "custom:midea-humidifier-card",
      entity: `humidifier.${humidifierEntity}`,
      fan_entity: `fan.${humidifierEntity}_fan`,
      tank_entity: `binary_sensor.${humidifierEntity}_tank_full`,
      defrost_entity: `binary_sensor.${humidifierEntity}_defrosting`,
      filter_entity: `binary_sensor.${humidifierEntity}_replace_filter`,
      humidity_entity: `sensor.${humidifierEntity}_humidity`,
      temperature_entity: `sensor.${humidifierEntity}_temperature`,
      ion_entity: `switch.${humidifierEntity}_ion_mode`,
      swap_target_and_current_humidity: true,
      show_ion_toggle: true
    };
  }
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HumidifierCardConfig;

  @state() private _targetHumidity?: number;

  @state() private _previewHumidity?: number;

  @state() private _currentHumidity?: number;

  public getCardSize(): number {
    return 6;
  }

  public setConfig(config: HumidifierCardConfig): void {
    if (!config.entity || config.entity.split(".")[0] !== "humidifier") {
      throw new Error("Specify an entity from within the humidifier domain");
    }
    if (!config.fan_entity || config.fan_entity.split(".")[0] !== "fan") {
      throw new Error("Specify a fan_entity from within the fan domain");
    }
    if (!config.humidity_entity || !config.temperature_entity) {
      throw new Error("Humidity and temperature sensors entity are required for this card to function properly");
    }     
    // console.info(`[${CARD_NAME}::setConfig]: Got new config : ${debug(config)}`)
    this._config = this.autoWatchEntities(config);
  }


  private autoWatchEntities(config: HumidifierCardConfig) : HumidifierCardConfig {
    // console.info(`[${CARD_NAME}::autoWatchEntities]: dumping original config ${debug(config)}`)
    const { entities = [] } = config
    Object.keys(config).map(key => {
      if(key.includes("entity")) {
        // console.info(`[${CARD_NAME}::autoWatchEntities]: found entity to add to entities[] ${config[key]}`)
        if(!entities.includes(config[key])) {
          entities.push(config[key])
        }        
      }
    })
    const newConfig = {
      ...config,
      entities
    }    
    // console.info(`[${CARD_NAME}::autoWatchEntities]: dumping modified newConfig ${debug(newConfig)}`)
    return newConfig
  }

  private _lower(string: string) {
    return string?.toLowerCase()
  }

  private _renderPowerIcon(currentPowerStatus: string, currentStatus: string): TemplateResult {

    if (!powerIcons[this._lower(currentPowerStatus)]) {
      return html``;
    }

    const isSelected  = !!(currentPowerStatus === currentStatus)

    // //// console.info(`[Humidifier-card]: fan icon : _renderPowerIcon : ${currentPowerStatus} current : ${currentStatus} isSelected: ${isSelected}`)
    
    return html`
      <button type="button"
        class=${classMap({ "selected-icon": isSelected })}
        .status=${currentPowerStatus}
        @click=${this._handlePowerAction}
        tabindex="0"
        aria-label=${this._lower(currentPowerStatus)}
        title=${this._lower(currentPowerStatus)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${powerIcons[this._lower(currentPowerStatus)]} /></svg>
      </button>
    `;
  }


  private _renderFanIcon(fanMode: string, currentFanMode: string | undefined, poweredOff: boolean): TemplateResult {

    const isSelected = !!(currentFanMode === fanMode)
    // //// console.info(`[Humidifier-card]: fan icon : render : ${fanMode} current : ${currentFanMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)

    if (!fanModeIcons[this._lower(fanMode)]) {
      return html``;
    }
    return html`
      <button type="button"
        class=${classMap({ "selected-icon": (isSelected && !poweredOff) })}
        .mode=${fanMode}
        @click=${this._handleFanAction}
        tabindex="0"
        aria-label=${this._lower(fanMode)}
        aria-pressed=${isSelected && !poweredOff}
        title=${fanMode}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${fanModeIcons[this._lower(fanMode)]} /></svg>
      </button>
    `;
  }  

  private _renderIcon(mode: string, currentMode: string, poweredOff: boolean): TemplateResult {

    const isSelected = !!(this._lower(currentMode) === this._lower(mode))

    if (!modeIcons[this._lower(mode)]) {
      return html``;
    }
    // //// console.info(`[Humidifier-card]: mode icon : render : ${mode} current : ${currentMode} poweredOff: ${poweredOff} isSelected: ${isSelected}`)
    return html`
      <button type="button"
        class=${classMap({ "selected-icon": (isSelected && !poweredOff) })}
        .mode=${mode}
        @click=${this._handleAction}
        tabindex="0"
        aria-label=${this._lower(mode)}
        aria-pressed=${isSelected && !poweredOff}
        title=${mode}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${modeIcons[this._lower(mode)]} /></svg>
      </button>
    `;
  }

  private _handlePowerAction(e: MouseEvent): void {
    const callService = ((e.currentTarget as any).status === "on") ? "turn_on" : "turn_off"
    //// console.info(`[Humidifier-card]: calling service humidifier.${callService} with value ${(e.currentTarget as any).status}`)
    this.hass!.callService("humidifier", callService, {
      entity_id: this._config!.entity
    });
  }

  private _handleFanAction(e: MouseEvent): void {
    //// console.info(`[Humidifier-card]: calling service fan.set_preset_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("fan", "set_preset_mode", {
      entity_id: this._config!.fan_entity,
      preset_mode: (e.currentTarget as any).mode,
    });
  }

  private _handleToggleIonModeAction(): void {
    //// console.info(`[Humidifier-card]: calling service switch.toggle with value ${(e.currentTarget as any).status}`)
    this.hass!.callService("switch", "toggle", {
      entity_id: this._config!.ion_entity
    });
  }  

  private _handleAction(e: MouseEvent): void {
    //// console.info(`[Humidifier-card]: calling service humidifier.set_mode with value ${(e.currentTarget as any).mode}`)
    this.hass!.callService("humidifier", "set_mode", {
      entity_id: this._config!.entity,
      mode: (e.currentTarget as any).mode,
    });
  }


  private _getWarningText(problems: ProblemConfig): TemplateResult {    
    return html`<div>
      ${problems.tank ? html`<hui-warning>${localize("common.tank_is_full")}</hui-warning>` : html``}
      ${problems.defrost ? html`<hui-warning>${localize("common.defrosting")}</hui-warning>` : html``}
      ${problems.filter ? html`<hui-warning>${localize("common.change_airfilter")}</hui-warning>` : html``}
    </div>`    
  }


  private _get(nestedObj, pathArr) {
    return pathArr.reduce((obj, key) => ((obj && obj[key] !== 'undefined')
      ? obj[key]
      : undefined
    ), nestedObj)
  }

  private _readHassState(configEntry: string) : HassEntity | undefined {
    const stateEntry : boolean | undefined = this._get(this,["_config", configEntry])
    // console.log(`[${CARD_NAME}::this._readHassState]: canRead : ${stateEntry} - configEntry: ${configEntry}`, this.hass)
    if(stateEntry) {
      const value = this._get(this, ["hass","states",stateEntry])
      // console.log(`[${CARD_NAME}::this._readHassState]: read value : ${debug(value)}`, this.hass)
      return value
    }
    return undefined
  }   

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    // reading the global hass states 
    const stateObj = this._readHassState("entity") as HumidifierEntity
    const fanStateObj = this._readHassState("fan_entity") as HumidifierFanEntity;
    const tankStateObj = this._readHassState("tank_entity") as BinaryEntity;
    const filterStateObj = this._readHassState("filter_entity") as BinaryEntity;
    const defrostStateObj = this._readHassState("defrost_entity") as BinaryEntity;
    const ionStateObj = this._readHassState("ion_entity") as BinaryEntity;
    const currentMode = this._lower(stateObj?.attributes?.mode) in modeIcons ? stateObj?.attributes?.mode : "unknown-mode" as string;
    const currentFanMode = this._lower(fanStateObj?.attributes?.preset_mode) in fanModeIcons ? fanStateObj?.attributes?.preset_mode : "unknown-fan-mode" as string;
    const currentHumidityString = this.hass.states[this._config.humidity_entity].state;
    const currentPowerStatus = stateObj.state
    const isPoweredOff  = !!(currentPowerStatus === "off")
    const currentTemperatureString = this.hass.states[this._config.temperature_entity].state;
    const currentTemperature = parseFloat(currentTemperatureString) as number;
    const unitOfMeasurement = this.hass.states[this._config.temperature_entity].attributes?.unit_of_measurement ?? '°C';

    if (!stateObj) {
      return html`
        <hui-warning>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
    }


    const swapTargetAndCurrent = (this._config.swap_target_and_current_humidity === true)

    const name =
      this._config!.name ||
      computeStateName(this.hass!.states[this._config!.entity]);

    const targetHumidity =
      stateObj.attributes.humidity != null &&
      Number.isFinite(stateObj.attributes.humidity)
        ? stateObj.attributes.humidity
        : stateObj.attributes.min_humidity ?? 0;

    const sliderDisabled = (UNAVAILABLE_STATES.includes(stateObj.state) || isPoweredOff)
    const displayedTargetHumidity = this._previewHumidity ?? this._targetHumidity;

    const slider = html`
          <midea-humidity-slider
            .value=${this._targetHumidity ?? targetHumidity}
            .min=${stateObj.attributes.min_humidity ?? 0}
            .max=${stateObj.attributes.max_humidity ?? 100}
            .step=${5}
            .disabled=${sliderDisabled}
            .mode=${stateObj.attributes.device_class === "dehumidifier" ? "end" : "start"}
            .current=${this._currentHumidity}
            .label=${name}
            .decreaseLabel=${this.hass.localize("ui.components.climate-control.humidity_down") || localize("common.humidity_down")}
            .increaseLabel=${this.hass.localize("ui.components.climate-control.humidity_up") || localize("common.humidity_up")}
            @value-changing=${this._dragEvent}
            @value-changed=${this._setTargetHumidity}>
          </midea-humidity-slider>
        `;   

    const primaryHumidity = swapTargetAndCurrent ? this._currentHumidity : displayedTargetHumidity;
    const secondaryHumidity = swapTargetAndCurrent ? displayedTargetHumidity : this._currentHumidity;

  const problems = {
    tank: (tankStateObj?.state === 'on'),
    defrost: (defrostStateObj?.state === 'on'), // not sure how to report this
    filter: (filterStateObj?.state === 'on')
  }

  const hasIssues : boolean = ((tankStateObj?.state === 'on')||(defrostStateObj?.state === 'on')||(filterStateObj?.state === 'on')) || false
  
    return html`
      <ha-card
        class=${classMap({
      [hasIssues ? 'error' : isPoweredOff ? 'off' : this._lower(currentMode)]: true,
    })}
      >
        <ha-icon-button
          class="more-info"
          .label=${this.hass!.localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${mdiDotsVertical}
          @click=${this._handleMoreInfo}
          tabindex="0"
        ></ha-icon-button>
        <div class="content">
          <div id="controls">
            <div id="slider">
              ${slider}
              <div id="slider-center">
                <div id="humidity">
                  <div class="state-label">
                    ${this.hass.localize(`state.default.${stateObj.state}`) || stateObj.state}
                    ${stateObj.attributes.mode && !UNAVAILABLE_STATES.includes(stateObj.state)
                      ? html` - ${this.hass.localize(`state_attributes.humidifier.mode.${stateObj.attributes.mode}`) || stateObj.attributes.mode}`
                      : ""}
                  </div>
                  <div class="primary-humidity">
                    ${primaryHumidity?.toFixed() ?? "--"}<span>%</span>
                  </div>
                  <div class="secondary-values">
                    ${!UNAVAILABLE_STATES.includes(currentHumidityString) && secondaryHumidity !== undefined
                      ? html`${secondaryHumidity.toFixed()}%` : ""}
                    ${Number.isFinite(currentTemperature)
                      ? html` · ${currentTemperature}${unitOfMeasurement}` : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="info" .title=${name}>
            <div class="modes">
              ${(stateObj.attributes.available_modes || [])
                .concat()
                .sort(compareClimateHumidifierModes)
                .map((modeItem) => this._renderIcon(modeItem, currentMode, isPoweredOff))}
              ${problems?.defrost 
                ? html`<span
                  class=${classMap({ "defrost-icon": (problems!.defrost&& !isPoweredOff) })}
                  role="img" aria-label=${localize("common.defrost")} title=${localize("common.defrost")}
                  ><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiSnowflakeMelt} /></svg></span>` : html``}
            </div>
            <div class="modes">
              ${(this._config?.show_ion_toggle === true)
                ? html`<button type="button"
                  class=${classMap({ "ion-icon": (ionStateObj!.state === 'on'&& !isPoweredOff) })}
                  tabindex="0"  
                  @click=${this._handleToggleIonModeAction}                
                  aria-label="Ion" title="Ion"
                  aria-pressed=${ionStateObj!.state === 'on' && !isPoweredOff}
                  ><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${(ionStateObj!.state === 'on') ? mdiAirPurifier : mdiAirHumidifierOff} /></svg></button>` : html``}
              ${(fanStateObj?.attributes?.preset_modes || [])
                .concat()
                .sort(compareClimateFanHumidifierModes)
                .map((modeItem) => this._renderFanIcon(modeItem, currentFanMode, isPoweredOff))}
              ${this._renderPowerIcon(currentPowerStatus === 'off' ? "on" : "off", currentPowerStatus)}             
            </div>          
            ${name}
          </div>
        </div>
        <div id="warnings">
          ${hasIssues ? this._getWarningText(problems) : html``}
        </div> 
      </ha-card>
    `;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return changedProps.has("_targetHumidity") ||
      changedProps.has("_previewHumidity") ||
      changedProps.has("_currentHumidity") ||
      hasConfigOrEntitiesChanged(this, changedProps);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    

    if (
      !this._config ||
      !this.hass ||
      (!changedProps.has("hass") && !changedProps.has("_config"))
    ) {
      return;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | HumidifierCardConfig
      | undefined;


    if (
      !oldHass ||
      !oldConfig ||
      oldHass.themes !== this.hass.themes ||
      oldConfig.theme !== this._config.theme
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  public willUpdate(changedProps: PropertyValues) {
    if (!this.hass || !this._config || !changedProps.has("hass")) {
      return;
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return;
    }

    const humidityStateObj = this.hass.states[this._config.humidity_entity];
    if (!humidityStateObj) {
      return;
    }    

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (!oldHass || oldHass.states[this._config.entity] !== stateObj) {
      this._targetHumidity = this._getTargetHumidity(stateObj);
      this._previewHumidity = undefined;
    }

    if (!oldHass || oldHass.states[this._config.humidity_entity] !== humidityStateObj) {
      this._currentHumidity = this._getCurrentHumidity(humidityStateObj);
    }    
  }



  private _getTargetHumidity(stateObj: HassEntity): undefined | number {
    
    if (UNAVAILABLE_STATES.includes(stateObj.state)) {
      //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning undefined ${stateObj.state}`)
      return undefined;
    }
    //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning ${stateObj.attributes.humidity}`)
    return stateObj.attributes.humidity;
  }

  private _dragEvent(e: CustomEvent<{ value?: number }>): void {
    this._previewHumidity = e.detail.value;
  }

  private _setTargetHumidity(e: CustomEvent<{ value: number }>): void {
    this._previewHumidity = undefined;
    this._targetHumidity = e.detail.value;
    this.hass!.callService("humidifier", "set_humidity", {
      entity_id: this._config!.entity,
      humidity: e.detail.value,
    });
  }

  private _getCurrentHumidity(stateObj: HassEntity): undefined | number {
    if (UNAVAILABLE_STATES.includes(stateObj.state) || isNaN(parseFloat(stateObj.state))) {
      //// console.warn(`[${CARD_NAME}::_getTargetHumidity]: returning undefined ${stateObj.state}`)
      return undefined;
    }
    return parseFloat(stateObj.state);
  }


  private _handleMoreInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity,
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        height: 100%;
        position: relative;
        overflow: hidden;
        --name-font-size: 1.2rem;
        --brightness-font-size: 1.2rem;
        --rail-border-color: transparent;
      }     
      .off {
        --mode-color: var(--state-climate-idle-color, var(--disabled-text-color, #9e9e9e));
      }
      .dry {
        --mode-color: var(--state-climate-heat-color, var(--orange-color, #ff9800));
      }
      .smart {
        --mode-color: var(--state-climate-cool-color, var(--blue-color, #2196f3));
      }
      .continuous {
        --mode-color: var(--state-climate-eco-color, var(--green-color, #4caf50));
      }
      .set {
        --mode-color: var(--state-climate-manual-color, var(--state-humidifier-on-color, var(--primary-color, #03a9f4)));
      }
      .unknown-mode {
        --mode-color: var(--state-unknown-color, var(--disabled-text-color, #9e9e9e));
      }
      .error {
        --mode-color: var(--error-color, #db4437);
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #controls {
        display: flex;
        justify-content: center;
        padding: 16px;
        position: relative;
      }

      #slider {
        height: 100%;
        width: 100%;
        position: relative;
        max-width: 320px;
        min-width: 100px;
        container-type: inline-size;
      }

      midea-humidity-slider {
        --midea-slider-track-color: var(--slider-track-color, var(--divider-color, #bdbdbd));
        --midea-slider-color: var(--mode-color);
        width: 100%;
      }

      #slider-center {
        position: absolute;
        width: 64%;
        height: 66cqi;
        box-sizing: border-box;
        border-radius: 100%;
        left: 18%;
        top: 15cqi;
        text-align: center;
        overflow-wrap: break-word;
        pointer-events: none;
      }

      #humidity {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--primary-text-color);
      }

      .primary-humidity {
        font-size: clamp(32px, 20cqi, 64px);
        line-height: 1;
        font-weight: 400;
        white-space: nowrap;
      }
      .primary-humidity span {
        font-size: 0.4em;
        margin-inline-start: 4px;
      }
      .state-label, .secondary-values {
        font-size: clamp(10px, 4.5cqi, 16px);
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      #warnings {
        padding: 16px;
      }

      #info {
        text-align: center;
        padding: 0 16px 16px;
        font-size: var(--name-font-size);
      }

      .modes {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }

      .modes button, .modes > span {
        width: 40px;
        height: 40px;
        padding: 7px;
        border: 1px solid currentColor;
        border-radius: 50%;
        box-sizing: border-box;
        display: inline-grid;
        place-items: center;
        color: var(--secondary-text-color, #727272);
        background: transparent;
      }
      .modes button {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .modes svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      .modes button:hover {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      }
      .modes button:active {
        background: var(--divider-color, rgba(127, 127, 127, 0.24));
      }
      .modes button:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 3px;
      }
      .modes .selected-icon {
        color: var(--mode-color);
      }

      .modes .defrost-icon {
        color: var(--state-climate-cool-color);
      }      

      .modes .ion-icon {
        color: var(--mode-color);
      }        

    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: MideaHumidifierCard;
  }
}
