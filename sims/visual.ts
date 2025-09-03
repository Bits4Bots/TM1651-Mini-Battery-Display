namespace pxsim.visuals {
    export class BatteryView implements BoardPart<BatteryState> {
        private element: SVGGElement;
        private rects: SVGRectElement[] = [];
        private clkWire: SVGLineElement;
        private dioWire: SVGLineElement;

        constructor() {}

        public init(bus: EventBus, state: BatteryState) {
            this.element = svg.elt("g") as SVGGElement;

            // Battery module body
            let body = svg.child(this.element, "rect", {
                x: "200", y: "60", width: "150", height: "40",
                fill: "black", stroke: "white", "stroke-width": "2"
            });

            // 6 LED bars
            for (let i = 0; i < 6; i++) {
                let r = svg.child(this.element, "rect", {
                    x: `${210 + i * 22}`,
                    y: "68",
                    width: "18",
                    height: "24",
                    fill: "gray"
                }) as SVGRectElement;
                this.rects.push(r);
            }

            // Wires (Pin 18 → CLK, Pin 20 → DIO)
            this.clkWire = svg.child(this.element, "line", {
                x1: "150", y1: "160",   // Pin 18 position
                x2: "200", y2: "70",    // CLK pad
                stroke: "yellow", "stroke-width": "3"
            }) as SVGLineElement;

            this.dioWire = svg.child(this.element, "line", {
                x1: "150", y1: "180",   // Pin 20 position
                x2: "200", y2: "90",    // DIO pad
                stroke: "red", "stroke-width": "3"
            }) as SVGLineElement;
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
