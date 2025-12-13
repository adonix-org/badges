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

import { CacheControl, GET, PathParams, RouteWorker, StatusCodes } from "@adonix.org/cloud-spark";
import { cache } from "@adonix.org/cloud-spark/cache";
import { SVGBadge } from "./svg";
import { getFormat } from "./utils";
import { getKey } from "./cache";
import { SVG_404 } from "./constant";

/**
 * Worker responsible for generating SVG badges.
 *
 * Registers the route:
 *   GET /badge/:label/:message
 * which produces a badge using the `badge-maker` library.
 */
export class BadgeWorker extends RouteWorker {
    /**
     * Initialize routes and middleware.
     */
    protected override init(): void {
        this.route(GET, "/badge/:label/:message", this.generate);

        this.use(cache({ getKey }));
    }

    /**
     * Generate an SVG badge for the given label, message,
     * and optional search parameters.
     *
     * @param params - URL path parameters containing `label` and `message`.
     * @returns A Response containing an SVG badge.
     */
    protected async generate(params: PathParams): Promise<Response> {
        const searchParams = new URL(this.request.url).searchParams;

        const format = getFormat(params["label"], params["message"], searchParams);

        const { makeBadge } = await import("badge-maker");
        return this.response(SVGBadge, makeBadge(format));
    }

    /**
     * Default handler for unmatched GET routes.
     */
    protected override get(): Promise<Response> {
        return this.response(SVGBadge, SVG_404, CacheControl.DISABLE, StatusCodes.NOT_FOUND);
    }
}
