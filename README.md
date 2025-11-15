# :shield: Badges

Generate dynamic SVG badges.

| Property     | Supported Values / Type                    | Description                                                                                   |
| ------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `style`      | `"flat"`, `"classic`                       | Determines the visual style of the badge.                                                     |
| `color`      | String (e.g., `"green"`, `"red"`, `"555"`) | Background color of the badge's **status** section. Can be named color, hex, or numeric code. |
| `labelColor` | String (e.g., `"blue"`, `"555"`)           | Background color of the **label/subject** section of the badge.                               |
| `icon`       | String (icon name or URL)                  | Optional icon to display on the left side of the badge.                                       |
| `iconWidth`  | Number (pixels)                            | Width of the icon in pixels.                                                                  |
| `scale`      | Number (e.g., `1.0`, `1.5`)                | Scales the entire badge proportionally. Useful for adjusting size for high-DPI screens.       |

# Example:

```text
https://badges.adonix.org/Hello%20World/v1.0.1?scale=4
```

![Default](https://badges.adonix.org/Hello%20World/v1.0.1?color=orange&scale=4)
