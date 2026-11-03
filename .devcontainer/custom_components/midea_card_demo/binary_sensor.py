"""Simulated device warnings, initially clear."""

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
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
    """Add the device warning sensors."""
    entities = []
    for kind in ("tank_full", "replace_filter", "defrosting"):
        entity = BinarySensorEntity()
        entity.entity_id = f"binary_sensor.dehumidifier_demo_{kind}"
        entity._attr_name = f"Dehumidifier Demo {kind.replace('_', ' ').title()}"
        entity._attr_unique_id = f"midea_card_demo_{kind}"
        entity._attr_should_poll = False
        entity._attr_device_class = BinarySensorDeviceClass.PROBLEM
        entity._attr_is_on = False
        entities.append(entity)
    async_add_entities(entities)
