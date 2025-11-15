import { GET, RouteWorker } from "@adonix.org/cloud-spark";
import { badgen } from "badgen";
import { SVGBadge } from "./response";

export class BadgeWorker extends RouteWorker {
    protected override init(): void {
        this.route(GET, "/", this.generate);

        // Implement getKey that ignores any non-valid settins.
    }

    protected generate(): Promise<Response> {
        const searchParams = new URL(this.request.url).searchParams;
        const label = searchParams.get("label") ?? "label";
        const status = searchParams.get("status") ?? "status";

        const svg = badgen({
            label,
            status,
        });
        return this.response(SVGBadge, svg);
    }
}
