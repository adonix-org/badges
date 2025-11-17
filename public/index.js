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

const ROOT = "https://badges.adonix.org";

document.getElementById("generate").onclick = () => {
    const label = document.getElementById("label").value.trim();
    const message = document.getElementById("message").value.trim();
    const labelColor = document.getElementById("label-color").value.trim();
    const color = document.getElementById("color").value.trim();
    const style = document.getElementById("style").value;

    if (!label || !message) {
        alert("Label and Message are required");
        return;
    }

    const params = new URLSearchParams();
    if (color) params.set("color", color);
    if (labelColor) params.set("labelColor", labelColor);
    if (style) params.set("style", style);

    const query = params.toString();
    const path = `/${encodeURIComponent(label)}/${encodeURIComponent(message)}`;

    document.getElementById("url-output").innerText = query
        ? `${ROOT}${path}?${query}`
        : `${ROOT}${path}`;
    document.getElementById("badge-preview").src = `.${path}?${params.toString()}`;
};
