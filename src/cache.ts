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

import { CacheControl, sortSearchParams, Time } from "@adonix.org/cloud-spark";
import { normalize } from "./utils";

/**
 * Default caching for generated badges is 1 year.
 */
export const BADGE_CACHE: CacheControl = {
    "max-age": 1 * Time.Year,
    "s-maxage": 1 * Time.Year,
    immutable: true,
};

/**
 * Generate a deterministic cache key URL for a request.
 *
 * Normalizes query parameters by:
 * - Lowercasing all keys
 * - Filtering out invalid keys
 * - Sorting keys alphabetically
 *
 * @param request - The incoming Request object
 * @returns A URL object with normalized search parameters suitable for caching
 */
export function getKey(request: Request): URL {
    const url = new URL(request.url);
    url.search = normalize(url.searchParams).toString();
    return url;
}
