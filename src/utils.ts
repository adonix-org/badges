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

import { Format } from "badge-maker";

const VALID_STYLES = ["plastic", "flat", "flat-square", "for-the-badge", "social"] as const;

type BadgeStyle = (typeof VALID_STYLES)[number];

const VALID_STYLES_SET = new Set<BadgeStyle>(VALID_STYLES);

/** Maximum allowed badge scale to prevent rendering issues */
const MAX_SCALE = 10;

/** Default badge scale when none is provided or invalid */
const DEFAULT_SCALE = 1;

/** Maximum base icon width (in internal units) for visual balance */
const MAX_ICON_WIDTH = 30;

/** Default base icon width (in internal units) */
const DEFAULT_ICON_WIDTH = 13;

/** Whitelisted query parameters allowed for badge generation */
const VALID_PARAMS = new Set(["style", "color", "labelcolor", "logo"]);

/**
 * Escape text for safe SVG injection
 */
function escapeSVGText(str: string): string {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

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
        .map(([key, value]) => [key.toLowerCase(), escapeSVGText(value)])
        .filter(([key]) => VALID_PARAMS.has(key));

    entries.sort(([a], [b]) => a.localeCompare(b));

    return new URLSearchParams(entries);
}

/**
 * Type guard to check if a value is a valid badge style:
 * "plastic" | "flat" | "flat-square" | "for-the-badge" | "social".
 * ```
 *
 * @param value - The value to check.
 * @returns `true` if `value` is a valid BadgeStyle, otherwise `false`.
 */
function isStyle(value: unknown): value is BadgeStyle {
    return typeof value === "string" && VALID_STYLES_SET.has(value as BadgeStyle);
}

/**
 * Get the badge style from URL query parameters. Fallback to default
 * "classic" if not present or invalid.
 *
 * @param searchParams - The URLSearchParams object containing query parameters
 * @returns The badge style as a `Style` ("classic" | "flat")
 */
function getStyle(searchParams: URLSearchParams): BadgeStyle | undefined {
    const style = searchParams.get("style");
    if (!style) return "flat";
    if (!isStyle(style)) return "flat";
    return style;
}

/**
 * Build a `Format` object from label, message, and URL query parameters.
 *
 * Handles default values and parsing for optional parameters like style,
 * colors, icon, and numeric settings.
 *
 * @param label - The badge label text
 * @param message - The badge message text
 * @param searchParams - URL query parameters containing optional settings
 * @returns A `Format` object ready for generating a badge
 */
export function getFormat(label: string, message: string, search: URLSearchParams): Format {
    const searchParams = normalize(search);
    return {
        label,
        labelColor: searchParams.get("labelcolor") ?? "#555",
        message,
        color: searchParams.get("color") ?? "#4C1",
        style: getStyle(searchParams),
        //logoBase64: searchParams.get("logo") ?? undefined,
    };
}
