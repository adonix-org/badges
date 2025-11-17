# :shield: Badges
[![Apache 2.0 License](https://badges.adonix.org/License/Apache%202.0)](https://github.com/adonix-org/cloud-spark/blob/main/LICENSE)
[![Cloudflare](https://badges.adonix.org/Cloudflare/Worker?color=f6821e)](https://cloudflare.com)

Generate static SVG badges with [cloud-spark](https://github.com/adonix-org/cloud-spark) and [badgen](https://github.com/badgen/badgen).

## Query Parameters:

| Property     | Supported Values / Type                    | Description                                                                                   |
| ------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `style`      | `"flat"`, `"classic`                       | Determines the visual style of the badge.                                                     |
| `color`      | String (e.g., `"green"`, `"red"`, `"555"`) | Background color of the badge's **status** section. Can be named color, hex, or numeric code. |
| `labelColor` | String (e.g., `"blue"`, `"555"`)           | Background color of the **label** section of the badge.                                       |
| `scale`      | Number (e.g., `1.0`, `1.5`)                | Scales the badge proportionally.                                                              |

## Example:

```
https://badges.adonix.org/Project%20%2B/v1.0.1?color=1976D2
```

[![Example](https://badges.adonix.org/Project%20%2B/v1.0.1?color=1976D2&scale=3.5)](https://badges.adonix.org/Project%20%2B/v1.0.1?color=1976D2)
