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

import { CopyResponse, Middleware, Worker } from "@adonix.org/cloud-spark";

/**
 * Middleware factory that adds the X-Generator header
 * to the outgoing response.
 *
 * @returns A middleware instance.
 */
export function generatedBy(): Middleware {
    return new GeneratedBy();
}

/**
 * Middleware factory that applies strict security headers
 * to lock down the outgoing response.
 *
 * @returns A middleware instance.
 */
export function securePolicy(): Middleware {
    return new SecurePolicy();
}

class GeneratedBy implements Middleware {
    /**
     * Apply an X-Generator header to the response.
     *
     * @param _worker - The current worker instance (unused).
     * @param next - The next response provider in the chain.
     * @returns The updated response.
     */
    public async handle(_worker: Worker, next: () => Promise<Response>): Promise<Response> {
        const copy = new CopyResponse(await next());
        copy.setHeader("X-Generator", "badge-maker");
        return copy.response();
    }
}

class SecurePolicy implements Middleware {
    /**
     * Apply security-related headers (CSP, CORP, no-sniff)
     * to the outgoing response.
     *
     * @param _worker - The current worker instance (unused).
     * @param next - The next response provider in the chain.
     * @returns The updated response.
     */
    public async handle(_worker: Worker, next: () => Promise<Response>): Promise<Response> {
        const copy = new CopyResponse(await next());
        copy.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        copy.setHeader(
            "Content-Security-Policy",
            "default-src 'none'; script-src 'none'; style-src 'none'; img-src 'data:';"
        );
        copy.setHeader("X-Content-Type-Options", "nosniff");
        return copy.response();
    }
}
