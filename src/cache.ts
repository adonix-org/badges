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

import { CacheControl, Time } from "@adonix.org/cloud-spark";
import { normalize } from "./utils";

const CACHE_VERSION = "1";

/**
 * Default caching for generated badges.
 */
export const BADGE_CACHE: CacheControl = {
    "max-age": 5 * Time.Day,
    "s-maxage": 5 * Time.Day,
};

/**
 * Generate stable cache keys from requests.
 *
 * @see {@link normalize}
 *
 * @param request - The incoming Request object
 * @returns A URL key for response caching
 */
export function getKey(request: Request): URL {
    const url = new URL(request.url);

    /**
     * Valid and sorted user-provided query parameters.
     */
    const params = normalize(url.searchParams);

    /**
     * Append a cache version to the key.
     */
    params.set("_v", CACHE_VERSION);

    /**
     * Sort params again with internal version.
     */
    params.sort();

    url.search = params.toString();
    url.hash = "";

    return url;
}
