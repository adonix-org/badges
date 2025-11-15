/*
 * Copyright (C) 2025 Ty Busby
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const redCircleIcon = `
data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="transparent" stroke="red" stroke-width="4"/>
</svg>
`.trim();

import { BadgenOptions, StyleOption } from "badgen";

const VALID_PARAMS = ["style", "color", "labelcolor", "icon", "iconwidth", "scale"];

/**
 * Normalize URLSearchParams for consistent processing and caching.
 *
 * - Converts all parameter keys to lowercase.
 * - Removes any parameters that are not recognized/valid.
 * - Sorts the remaining entries alphabetically for deterministic ordering.
 *
 * @param searchParams - The original URLSearchParams
 * @returns A new URLSearchParams instance with lowercase, valid, and sorted keys
 */
export function normalize(searchParams: URLSearchParams): URLSearchParams {
    const entries = Array.from(searchParams.entries())
        .map(([key, value]) => [key.toLowerCase(), value] as [string, string])
        .filter(([key]) => VALID_PARAMS.includes(key));

    entries.sort(([a], [b]) => a.localeCompare(b));

    return new URLSearchParams(entries);
}

/**
 * Get the badge style from URL query parameters. Fallback to default
 * "classic" if not present or invalid.
 *
 * @param searchParams - The URLSearchParams object containing query parameters
 * @returns The badge style as a `StyleOption` ("classic" | "flat")
 */
function getStyle(searchParams: URLSearchParams): StyleOption {
    return searchParams.get("style") === "flat" ? "flat" : "classic";
}

/**
 * Safely parse a numeric query parameter.
 *
 * @param searchParams - The URLSearchParams object
 * @param key - The parameter name
 * @param fallback - The default value if missing or invalid
 */
function getNumber(searchParams: URLSearchParams, key: string, fallback: number): number {
    const n = Number(searchParams.get(key));
    return n > 0 && Number.isFinite(n) ? n : fallback;
}

/**
 * Build a `BadgenOptions` object from label, status, and URL query parameters.
 *
 * Handles default values and parsing for optional parameters like style,
 * colors, icon, and numeric settings.
 *
 * @param label - The badge label
 * @param status - The badge status
 * @param searchParams - URL query parameters containing optional settings
 * @returns A `BadgenOptions` object ready for generating a badge
 */
export function getOptions(label: string, status: string, search: URLSearchParams): BadgenOptions {
    const searchParams = normalize(search);
    return {
        label,
        status,
        style: getStyle(searchParams),
        color: searchParams.get("color") ?? undefined,
        labelColor: searchParams.get("labelcolor") ?? undefined,
        icon: searchParams.get("icon") ?? undefined,
        iconWidth: getNumber(searchParams, "iconwidth", 13),
        scale: getNumber(searchParams, "scale", 1),
    };
}
