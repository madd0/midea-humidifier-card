"""Development-only simulated Midea device."""

import asyncio

from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.discovery import async_load_platform
from homeassistant.helpers.typing import ConfigType

DOMAIN = "midea_card_demo"
CONFIG_SCHEMA = cv.empty_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Load the simulated entity platforms from YAML."""
    await asyncio.gather(
        *(
            async_load_platform(hass, platform, DOMAIN, {}, config)
            for platform in ("humidifier", "fan", "sensor", "binary_sensor", "switch")
        )
    )
    return True
