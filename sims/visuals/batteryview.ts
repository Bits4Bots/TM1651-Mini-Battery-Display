namespace pxsim.visuals {
    export class BatteryView implements BoardPart<BatteryState> {
        private element: SVGGElement;
        private rects: SVGRectElement[] = [];

        public init(bus: EventBus, state: BatteryState) {
            this.element = svg.elt("g") as SVGGElement;

            // === Module Body ===
            let body = svg.child(this.element, "rect", {
                x: "200", y: "60", width: "160", height: "80",
                fill: "black", stroke: "white", "stroke-width": "2", rx: "8", ry: "8"
            });

            // Branding
            svg.child(this.element, "text", {
                x: "230", y: "75", fill: "white", "font-size": "12", "font-weight": "bold"
            }).textContent = "Bits4Bots";

            // === Pin Labels ===
            let labels = ["VCC", "GND", "CLK", "DIO"];
            labels.forEach((label, i) => {
                svg.child(this.element, "text", {
                    x: "195", y: `${95 + i * 15}`, fill: "white", "font-size": "10"
                }).textContent = label;
            });

            // === LED Bars ===
            for (let i = 0; i < 6; i++) {
                let r = svg.child(this.element, "rect", {
                    x: `${220 + i * 22}`,
                    y: "95",
                    width: "18",
                    height: "35",
                    fill: "gray",
                    rx: "3", ry: "3"
                }) as SVGRectElement;
                this.rects.push(r);
            }
        }

        public updateState(state: BatteryState) {
            let level = pxsim.Bits4BotsTM1651.getBatteryLevel();
            for (let i = 0; i < 6; i++) {
                this.rects[i].setAttribute("fill", i < level ? "limegreen" : "gray");
            }
        }

        public getView() {
            return this.element;
        }
    }
}
