"""Exercise the development fixture with the installed Home Assistant."""

from pathlib import Path
import shutil
import tempfile
import unittest

import yaml

from homeassistant import loader
from homeassistant.bootstrap import async_from_config_dict
from homeassistant.core import HomeAssistant

DEVCONTAINER = Path(__file__).resolve().parent


class DemoTest(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        self.config_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.config_dir.cleanup)
        shutil.copytree(
            DEVCONTAINER / "custom_components",
            Path(self.config_dir.name) / "custom_components",
        )
        self.hass = HomeAssistant(self.config_dir.name)
        self.addAsyncCleanup(self.hass.async_stop)
        loader.async_setup(self.hass)
        self.assertIs(
            await async_from_config_dict({"midea_card_demo": {}}, self.hass),
            self.hass,
        )
        await self.hass.async_block_till_done()

    async def test_dashboard_entities_and_controls(self) -> None:
        dashboard = yaml.safe_load((DEVCONTAINER / "ui-lovelace.yaml").read_text())
        card = dashboard["views"][0]["cards"][0]
        self.assertEqual(card["type"], "custom:midea-humidifier-card")
        for key, entity_id in card.items():
            if key == "entity" or key.endswith("_entity"):
                entity = self.hass.states.get(entity_id)
                self.assertIsNotNone(entity, entity_id)
                self.assertNotIn(entity.state, ("unavailable", "unknown"), entity_id)

        calls = [
            ("humidifier", "turn_off", {"entity_id": card["entity"]}, "off", None),
            ("humidifier", "turn_on", {"entity_id": card["entity"]}, "on", None),
            (
                "humidifier",
                "set_humidity",
                {"entity_id": card["entity"], "humidity": 65},
                None,
                ("humidity", 65),
            ),
            (
                "humidifier",
                "set_mode",
                {"entity_id": card["entity"], "mode": "continuous"},
                None,
                ("mode", "continuous"),
            ),
            (
                "fan",
                "set_preset_mode",
                {"entity_id": card["fan_entity"], "preset_mode": "turbo"},
                "on",
                ("preset_mode", "turbo"),
            ),
            ("fan", "turn_off", {"entity_id": card["fan_entity"]}, "off", None),
            ("fan", "turn_on", {"entity_id": card["fan_entity"]}, "on", None),
            ("switch", "toggle", {"entity_id": card["ion_entity"]}, "on", None),
            ("switch", "toggle", {"entity_id": card["ion_entity"]}, "off", None),
        ]
        for domain, service, data, expected_state, attribute in calls:
            with self.subTest(service=f"{domain}.{service}"):
                await self.hass.services.async_call(
                    domain, service, data, blocking=True
                )
                entity = self.hass.states.get(data["entity_id"])
                if expected_state is not None:
                    self.assertEqual(entity.state, expected_state)
                if attribute is not None:
                    self.assertEqual(entity.attributes[attribute[0]], attribute[1])

        for key in ("tank_entity", "filter_entity", "defrost_entity"):
            self.assertEqual(self.hass.states.get(card[key]).state, "off")


if __name__ == "__main__":
    unittest.main()
