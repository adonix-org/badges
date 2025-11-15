import { CacheControl, SuccessResponse, Time } from "@adonix.org/cloud-spark";

export class SVGBadge extends SuccessResponse {
    constructor(svg: string, cache: CacheControl = { "s-maxage": 1 * Time.Year }) {
        super(svg, cache);
        this.mediaType = "image/svg+xml;charset=utf-8";
    }
}
