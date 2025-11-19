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

import { CopyResponse, GET, HEAD, Middleware, Worker } from "@adonix.org/cloud-spark";

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

/**
 * Base class for middleware that can modify a response.
 */
abstract class ResponseTransform implements Middleware {
    /**
     * HTTP methods for which this middleware should apply.
     * Defaults to GET and HEAD.
     */
    protected getAllowedMethods(): string[] {
        return [GET, HEAD];
    }

    /**
     * Subclasses implement this to modify the response as needed.
     *
     * @param worker - The current worker instance.
     * @param copy - A mutable copy of the response to modify.
     */
    protected abstract apply(copy: CopyResponse): void;

    public async handle(worker: Worker, next: () => Promise<Response>): Promise<Response> {
        if (!this.getAllowedMethods().includes(worker.request.method)) return next();

        const copy = new CopyResponse(await next());
        this.apply(copy);
        return copy.response();
    }
}

/**
 * Adds an X-Generator header to the response.
 */
export class GeneratedBy extends ResponseTransform {
    protected apply(copy: CopyResponse): void {
        copy.setHeader("X-Generator", "badge-maker");
    }
}

/**
 * Applies strict security headers to the response.
 */
export class SecurePolicy extends ResponseTransform {
    protected apply(copy: CopyResponse): void {
        copy.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        copy.setHeader(
            "Content-Security-Policy",
            "default-src 'none'; script-src 'none'; style-src 'none'; img-src data:"
        );
        copy.setHeader("X-Content-Type-Options", "nosniff");
    }
}
