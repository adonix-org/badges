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

/**
 * Pre-rendered SVG for a 404 Not Found badge.
 *
 * Returned when a requested badge path does not exist.
 */
export const SVG_404 = `
<svg xmlns="http://www.w3.org/2000/svg" width="98" height="20" role="img" aria-label="404: Not Found">
  <title>404: Not Found</title>
  <g shape-rendering="crispEdges">
    <rect width="31" height="20" fill="#555"/>
    <rect x="31" width="67" height="20" fill="#e05d44"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text x="165" y="140" transform="scale(.1)" fill="#fff" textLength="210">404</text>
    <text x="635" y="140" transform="scale(.1)" fill="#fff" textLength="570">Not Found</text>
  </g>
</svg>
`;
