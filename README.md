# :shield: Badges

[![Apache 2.0 License](https://badges.adonix.org/License/Apache%202.0?color=blue)](https://github.com/adonix-org/badges/blob/main/LICENSE)
[![Cloudflare](https://badges.adonix.org/Cloudflare/Worker?color=orange)](https://cloudflare.com)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=adonix-org_badges&metric=alert_status)](https://sonarcloud.io/summary/overall?id=adonix-org_badges&branch=main)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=adonix-org_badges&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=adonix-org_badges)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=adonix-org_badges&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=adonix-org_badges)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=adonix-org_badges&metric=security_rating)](https://sonarcloud.io/summary/overall?id=adonix-org_badges&branch=main)

Generate static SVG badges with [cloud-spark](https://github.com/adonix-org/cloud-spark) and [badge-maker](https://github.com/badges/shields/tree/master/badge-maker).

## Path Parameters:

| Property  | Supported Values / Type | Description                                        |
| --------- | ----------------------- | -------------------------------------------------- |
| `label`   | String                  | Text displayed on the **left side** of the badge.  |
| `message` | String                  | Text displayed on the **right side** of the badge. |

## Query Parameters:

| Property     | Supported Values / Type                                               | Description                                                                                    |
| ------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `style`      | `"flat"`, `"flat-square"`, `"plastic"`, `"for-the-badge"`, `"social"` | Determines the visual style of the badge.                                                      |
| `color`      | String (e.g., `"green"`, `"red"`, `"555"`)                            | Background color of the badge's **message** section. Can be named color, hex, or numeric code. |
| `labelColor` | String (e.g., `"blue"`, `"555"`)                                      | Background color of the **label** section of the badge.                                        |

## Example:

[![Example](https://badges.adonix.org/Project%20%2B/3.0.1?color=1976D2&labelColor=black&style=flat)](https://badges.adonix.org/Project%20%2B/3.0.1?color=1976D2&labelColor=black&style=flat)

```
https://badges.adonix.org/Project%20%2B/3.0.1?color=1976D2&labelColor=black&style=flat
```
