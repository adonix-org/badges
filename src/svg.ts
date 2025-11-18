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

import { SuccessResponse } from "@adonix.org/cloud-spark";
import { BADGE_CACHE } from "./cache";

/**
 * A response class for serving SVG content.
 *
 * The following headers are added to the response:
 * - `Content-Type` : `image/svg+xml; charset=utf-8`
 * - `Cache-Control` : Default {@link BADGE_CACHE}
 * - `Last-Modified` : Current DateTime UTC
 */
export class SVGBadge extends SuccessResponse {
    /**
     * Constructs a secure `SVGBadge` response.
     *
     * @param svg - The SVG string.
     * @param cache - Optional cache control headers.
     */
    constructor(svg: string, cache = BADGE_CACHE) {
        super(svg, cache);
        this.mediaType = "image/svg+xml; charset=utf-8";
        this.setHeader("Last-Modified", new Date().toUTCString());
    }
}
