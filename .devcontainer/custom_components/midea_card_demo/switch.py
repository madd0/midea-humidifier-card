"""Simulated ion mode switch."""

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Add the ion mode switch."""
    async_add_entities([DemoIonSwitch()])


class DemoIonSwitch(SwitchEntity):
    """An in-memory ion mode toggle."""

    _attr_name = "Dehumidifier Demo Ion Mode"
    _attr_unique_id = "midea_card_demo_ion_mode"
    _attr_should_poll = False

    def __init__(self) -> None:
        self._attr_is_on = False

    async def async_turn_on(self, **kwargs: Any) -> None:
        self._attr_is_on = True
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        self._attr_is_on = False
        self.async_write_ha_state()
