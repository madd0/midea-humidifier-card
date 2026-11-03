"""Fixed environmental readings for the demo card."""

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.const import PERCENTAGE, UnitOfTemperature
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Add the humidity and temperature readings."""
    entities = []
    for kind, value, unit, device_class in (
        ("humidity", 60, PERCENTAGE, SensorDeviceClass.HUMIDITY),
        ("temperature", 22.5, UnitOfTemperature.CELSIUS, SensorDeviceClass.TEMPERATURE),
    ):
        entity = SensorEntity()
        entity.entity_id = f"sensor.dehumidifier_demo_{kind}"
        entity._attr_name = f"Dehumidifier Demo {kind.title()}"
        entity._attr_unique_id = f"midea_card_demo_{kind}"
        entity._attr_should_poll = False
        entity._attr_native_value = value
        entity._attr_native_unit_of_measurement = unit
        entity._attr_device_class = device_class
        entities.append(entity)
    async_add_entities(entities)
