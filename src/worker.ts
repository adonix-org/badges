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

import { GET, PathParams, RouteWorker } from "@adonix.org/cloud-spark";
import { badgen, BadgenOptions } from "badgen";
import { SVGBadge } from "./response";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12">
  <polyline points="2,7 5,10 10,2" stroke="white" stroke-width="2" fill="none"/>
</svg>`;

export class BadgeWorker extends RouteWorker {
    protected override init(): void {
        this.route(GET, "/:label/:status", this.generate);

        // Implement getKey that ignores any non-valid settins.
    }

    protected generate(params: PathParams): Promise<Response> {
        const searchParams = new URL(this.request.url).searchParams;

        const options: BadgenOptions = {
            label: params["label"],
            status: params["status"],
        };

        return this.response(SVGBadge, badgen(options));
    }

    protected override get(): Promise<Response> {
        const error = badgen({
            label: "404",
            status: "Not Found",
            color: "red",
        });
        return this.response(SVGBadge, error);
    }
}
