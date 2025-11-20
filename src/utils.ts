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

/** Supported badge styles */
const VALID_STYLES = ["plastic", "flat", "flat-square", "for-the-badge", "social"] as const;

/** Type generated from valid styles */
type BadgeStyle = (typeof VALID_STYLES)[number];

/** Set for quick lookup of styles */
const VALID_STYLES_SET = new Set<BadgeStyle>(VALID_STYLES);

/** Whitelisted query parameters allowed for badge generation */
const VALID_PARAMS = new Set(["color", "labelcolor", "style"]);

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
 * - Converts all keys to lowercase.
 * - Removes any parameters with unsupported keys.
 * - Removes duplicate keys keeping the first.
 * - Escapes user-provided values.
 *
 * @param searchParams - The original URLSearchParams
 * @returns A normalized URLSearchParams instance.
 */
export function normalize(searchParams: URLSearchParams): URLSearchParams {
    const normalized = new URLSearchParams();

    for (const [rawKey, rawValue] of searchParams.entries()) {
        const key = rawKey.toLowerCase();
        if (VALID_PARAMS.has(key) && !normalized.has(key)) {
            normalized.set(key, escapeSVGText(rawValue));
        }
    }

    return normalized;
}

/**
 * Type guard to check if a value is a valid badge style.
 *
 * @param value - The value to check.
 * @returns `true` if `value` is a valid BadgeStyle, otherwise `false`.
 */
function isStyle(value: unknown): value is BadgeStyle {
    return typeof value === "string" && VALID_STYLES_SET.has(value as BadgeStyle);
}

/**
 * Get the badge style from URL query parameters. Fallback to default
 * `flat` if not present or invalid.
 *
 * @param searchParams - The URLSearchParams object containing query parameters
 * @returns The badge style as a `BadgeStyle`
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
    };
}
