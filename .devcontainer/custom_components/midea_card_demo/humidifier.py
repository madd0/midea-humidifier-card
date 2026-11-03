"""Simulated dehumidifier with the modes used by the card."""

from typing import Any

from homeassistant.components.humidifier import (
    HumidifierDeviceClass,
    HumidifierEntity,
    HumidifierEntityFeature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Add the demo dehumidifier."""
    async_add_entities([DemoDehumidifier()])


class DemoDehumidifier(HumidifierEntity):
    """An in-memory dehumidifier; nothing is sent to real hardware."""

    _attr_name = "Dehumidifier Demo"
    _attr_unique_id = "midea_card_demo_dehumidifier"
    _attr_should_poll = False
    _attr_device_class = HumidifierDeviceClass.DEHUMIDIFIER
    _attr_supported_features = HumidifierEntityFeature.MODES
    _attr_available_modes = ["set", "smart", "continuous", "dry"]
    _attr_min_humidity = 35
    _attr_max_humidity = 85

    def __init__(self) -> None:
        self._attr_is_on = True
        self._attr_mode = "set"
        self._attr_target_humidity = 50
        self._attr_current_humidity = 60

    async def async_turn_on(self, **kwargs: Any) -> None:
        self._attr_is_on = True
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        self._attr_is_on = False
        self.async_write_ha_state()

    async def async_set_humidity(self, humidity: int) -> None:
        self._attr_target_humidity = humidity
        self.async_write_ha_state()

    async def async_set_mode(self, mode: str) -> None:
        self._attr_mode = mode
        self.async_write_ha_state()
