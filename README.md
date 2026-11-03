# Midea Humidifier Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![maintenance-shield](https://img.shields.io/maintenance/yes/2022.svg?style=for-the-badge)]()

A companion card to the Midea Humidifier Lan integration that added tons of options comparing to previous integrations, so much that the classic
humidifier card was kinda lacking alot, so i made this card specifically for that (Midea/Inventor EVA Pro (De)Humifidier Appliances)

## Changelogs

*v1.0.7* - Latest current version - Fixed fan mode name change in homeassistant-midea-air-appliances-lan v0.6.0

*v1.0.6* - Updated readme.md

*v1.0.5* - Changed the ion icon color to match all others (current mode color)

*v1.0.3* - Added missing ion_entity from card editor and autoconfig

*v1.0.2* - Added card editor, single file output and handling of all warning (defrost, tank_full, filter)

*v1.0.1* - Added power buttons, all fan preset modes and ion toggle

# Installation

## Install

### HACS Install

1. Go to the section frontend.
2. Click on the 3 dots in the top right corner.
3. Select "Custom repositories"
4. Add the [URL](https://github.com/sicknesz/midea-humidifier-card/) to the repository.
5. Select the correct category (lovelace)
6. Click the "ADD" button.
7. Install

### Manual install

1. Download and copy `midea-humidifier-card.js` from the [my repo](https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card.js) into your `config/www` directory.

2. Add the resource reference as decribed below.

### CLI install

1. Move into your `config/www` directory.

2. Grab `midea-humidifier-card.js`:

  ```
  wget https://raw.githubusercontent.com/sicknesz/midea-inventor-card/master/dist/midea-humidifier-card.js
  ```

3. Add the resource reference as decribed below.

### Add resource reference

If you configure Lovelace via YAML, add a reference to `midea-humidifier-card.js` inside your `configuration.yaml`:

  ```yaml
  resources:
    - url: /hacsfiles/midea-humidifier-card.js?v=1.0.7
      type: module
  ```

Else, if you prefer the graphical editor, use the menu to add the resource:

1. Make sure, advanced mode is enabled in your user profile (click on your user name to get there)
2. Navigate to Configuration -> Lovelace Dashboards -> Resources Tab. Hit orange (+) icon
3. Enter URL `/hacsfiles/midea-humidifier-card.js` and select type "JavaScript Module".
4. Restart Home Assistant.

## Usage

Click to add an element to your lovelace view, select the midea-humidifier-card, it will open the visual card editor
but everything should be autoconfigured properly unless you have more than one humidifier, in that case just manually click and set all fields in the editor.

### Home Assistant compatibility

The card bundles its own `midea-humidity-slider`, built with Lit, SVG, and standard
pointer events. It does not depend on Home Assistant's internal slider elements,
lazy-loaded controls, or a separate slider resource. Mouse, touch, pen, and keyboard
input are supported (arrow keys, Page Up/Down, Home/End). The dial does not intercept
mouse-wheel scrolling. Existing configuration, five-percent steps, and the disabled
dial when the appliance is off or unavailable are unchanged.
The dial follows the native humidifier control's appearance: a white target
handle, a dot for the measured humidity, and tinted/solid arc segments showing
the target and the gap to the current reading. Humidifiers fill from the left;
dehumidifiers fill from the right, matching Home Assistant's device-class behavior.
An unavailable or out-of-range humidity sensor has no dot.

Outlined minus/plus buttons in the arc's bottom opening adjust the target by five
percentage points and stop at the entity's limits. Mode, fan, ion, and power
buttons use matching outlined styles. All controls remain bundled with the card.
On narrow cards, minus/plus move below the arc so their touch targets do not overlap
the dial or its labels.

Mode colors accept both lowercase and title-case mode names. They follow theme
colors with built-in fallbacks; older overrides such as
`--state-climate-manual-color` and `--state-climate-eco-color` remain supported.

### Troubleshooting

PS : If you do not see the filter and defrost entities, it's because they're disabled by default on the integration, to enable them
navigate to /config/integrations choose the midea humidifier lan integration, click on "11 entities",
search for defrost and enable the defrost and filter entities (if they're not visible look at the entity filter and disable it)
then you'll be able to add them to the card.

```
type: 'custom:midea-humidifier-card'
entity: humidifier.dehumidifier_<deviceID>
humidity_entity: sensor.dehumidifier_<deviceID>_humidity
temperature_entity: sensor.dehumidifier_<deviceID>_temperature
fan_entity: fan.dehumidifier_<deviceID>_fan
filter_entity: binary_sensor.dehumidifier_<deviceID>_replace_filter
defrost_entity: binary_sensor.dehumidifier_<deviceID>_defrosting
tank_entity: binary_sensor.dehumidifier_<deviceID>_tank_full
ion_entity: switch.dehumidifier_<deviceID>_ion_mode
show_ion_toggle: true
swap_target_and_current_humidity: true
```

## Options

| Name                             | Type    | Requirement  | Description                                 | Default              |
| -------------------------------- | ------- | ------------ | ------------------------------------------- | -------------------- |
| type                             | string  | **Required** | `custom:midea-humidifier-card`                    |
| name                             | string  | **Optional** | Card name                                   | `Midea Humidifier`   |
| entity                           | string  | **Required** | Humidifier entity ID.                       | `humidifier.<id>`    |
| fan_entity                       | string  | **Required** | Humidifiers fan entity ID.                  | `fan.<id>`           |
| humidity_entity                  | string  | **Required** | Humidifiers humidity sensor entity ID.      | `sensor.<id>`        |
| temperature_entity               | string  | **Required** | Humidifiers temperature sensor entity ID.   | `sensor.<id>`        |
| tank_entity                      | string  | **Optional** | Humidifiers tank binary sensor entity       | `binary_sensor.<id>` |
| filter_entity                    | string  | **Optional** | Humidifiers filter binary sensor entity     | `binary_sensor.<id>` |
| defrost_entity                   | string  | **Optional** | Humidifiers defrost binary sensor entity    | `binary_sensor.<id>` |
| ion_entity                       | string  | **Optional** | Humidifiers ion switch entity               | `switch.<id>`        |
| show_ion_toggle                  | boolean | **Optional** | Display the ion switch toggle icon.         | true                 |
| swap_target_and_current_humidity | boolean | **Optional** | Swap current and target humidity display    | true                 |

## Development with GitHub Codespaces

1. On GitHub, select **Code > Codespaces > Create codespace on master** (or the
   branch you are developing). Wait for the container setup to finish installing
   the card dependencies and Home Assistant.
2. In VS Code, select **Terminal > Run Task > Start Home Assistant**. This starts
   the **Watch card** task, waits for its first build, then starts Home Assistant.
3. Open the **Ports** tab and open the forwarded **Home Assistant** port **8123**
   in your browser. Keep its visibility **Private**.
4. On the first run, create a local Home Assistant user and finish onboarding.
   The default **Overview** dashboard shows the custom card with simulated Midea
   entities. No physical device, Midea integration or cloud account is required.

The demo supports power, operating modes, target humidity, fan presets and ion
mode. Temperature and current humidity are fixed sample readings; the warning
sensors start clear. This is a development fixture, not a device simulator.

Edit files in `src/`, wait for **Watch card** to rebuild, then refresh Home
Assistant. Use a hard refresh if the browser cached the JavaScript. The card is
served at `/local/midea-humidifier-card.js` through Home Assistant itself, so no
second forwarded port, localhost URL or cross-origin configuration is needed.
The existing standalone Rollup server is still available on port 5000 when
running `npm start`, but is not used by the demo dashboard.

Home Assistant is pinned in `.devcontainer/requirements.txt` and runs with Python
3.14; the card uses Node.js 22 and the checked-in Yarn lockfile. The same setup
works locally with VS Code's **Dev Containers: Reopen in Container** command.
After changing the container or requirements, rebuild the container.

The tracked `.devcontainer/configuration.yaml` and
`.devcontainer/ui-lovelace.yaml` files are copied into the ignored
`.devcontainer/homeassistant/` runtime directory on each start. Edit the tracked
files to customize the demo. Home Assistant's local user, onboarding state and
other runtime data persist there across task restarts; they are not committed.
The development-only integration lives in `.devcontainer/custom_components/`
and is never included in the published card bundle.

Use **Terminal > Terminate Task** to stop **Start Home Assistant** and
**Watch card** when finished. To check the Home Assistant configuration without
starting the server, run `bash .devcontainer/develop.sh --script check_config`
inside the container.

To exercise all demo entity references and the card's service calls, run
`.venv/bin/python .devcontainer/test_demo.py` inside the container.

Run `npm test` for bundled-slider registration, pointer/keyboard behavior, card
bindings, and mode-class regression tests (no running Home Assistant required).
Run `npm run build` to lint and build the card.

## Screenshots

![Screenshot #1](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_1.png?raw=true>)
![Screenshot #2](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_2.png?raw=true>)
![Screenshot #3](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_3.png?raw=true>)
![Screenshot #4](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_4.png?raw=true>)
![Screenshot #5](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_5.png?raw=true>)
![Screenshot #6](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_6.png?raw=true>)
![Screenshot #7](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_7.png?raw=true>)
![Screenshot #8](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_8.png?raw=true>)
![Screenshot #9](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_9.png?raw=true>)
![Screenshot #10](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_10.png?raw=true>)
![Screenshot #11](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_11.png?raw=true>)
![Screenshot #12](<https://github.com/sicknesz/midea-inventor-card/blob/master/docs/Screenshot_12.png?raw=true>)

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee: !

Salut Mec! Tu peu me soutenir en m'offrant quelques :beers: ou un :coffee: !

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/sicknesz)
