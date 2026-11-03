"""Simulated Midea fan presets."""

from typing import Any

from homeassistant.components.fan import FanEntity, FanEntityFeature
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Add the demo fan."""
    async_add_entities([DemoFan()])


class DemoFan(FanEntity):
    """An in-memory fan with Midea-compatible presets."""

    _attr_name = "Dehumidifier Demo Fan"
    _attr_unique_id = "midea_card_demo_fan"
    _attr_should_poll = False
    _attr_supported_features = (
        FanEntityFeature.PRESET_MODE
        | FanEntityFeature.TURN_ON
        | FanEntityFeature.TURN_OFF
    )
    _attr_preset_modes = ["silent", "medium", "turbo"]

    def __init__(self) -> None:
        self._attr_is_on = True
        self._attr_preset_mode = "medium"

    @property
    def is_on(self) -> bool:
        return self._attr_is_on

    async def async_turn_on(
        self,
        percentage: int | None = None,
        preset_mode: str | None = None,
        **kwargs: Any,
    ) -> None:
        self._attr_is_on = True
        if preset_mode is not None:
            self._attr_preset_mode = preset_mode
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        self._attr_is_on = False
        self.async_write_ha_state()

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        self._attr_preset_mode = preset_mode
        self.async_write_ha_state()
