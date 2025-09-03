namespace pxsim.visuals {
    export class BatteryView implements BoardPart<BatteryState> {
        private element: SVGGElement;
        private rects: SVGRectElement[] = [];
        private clkWire: SVGLineElement;
        private dioWire: SVGLineElement;
        private vccWire: SVGLineElement;
        private gndWire: SVGLineElement;

        public init(bus: EventBus, state: BatteryState) {
            this.element = svg.elt("g") as SVGGElement;

            // Battery module body
            let body = svg.child(this.element, "rect", {
                x: "200", y: "60", width: "150", height: "60",
                fill: "black", stroke: "white", "stroke-width": "2"
            });

            // 6 LED bars
            for (let i = 0; i < 6; i++) {
                let r = svg.child(this.element, "rect", {
                    x: `${210 + i * 22}`,
                    y: "70",
                    width: "18",
                    height: "35",
                    fill: "gray"
                }) as SVGRectElement;
                this.rects.push(r);
            }

            // === Pin Labels on Module ===
            svg.child(this.element, "text", { x: "195", y: "72", fill: "white", "font-size": "10" }).textContent = "VCC";
            svg.child(this.element, "text", { x: "195", y: "85", fill: "white", "font-size": "10" }).textContent = "GND";
            svg.child(this.element, "text", { x: "195", y: "98", fill: "white", "font-size": "10" }).textContent = "CLK";
            svg.child(this.element, "text", { x: "195", y: "111", fill: "white", "font-size": "10" }).textContent = "DIO";

            // === Wires ===
            // CLK (yellow) → Pin 19
            this.clkWire = svg.child(this.element, "line", {
                x1: "150", y1: "160",   // micro:bit Pin18
                x2: "200", y2: "100",   // CLK pad
                stroke: "yellow", "stroke-width": "3"
            }) as SVGLineElement;

            // DIO (red) → Pin 20
            this.dioWire = svg.child(this.element, "line", {
                x1: "150", y1: "180",   // micro:bit Pin20
                x2: "200", y2: "115",   // DIO pad
                stroke: "red", "stroke-width": "3"
            }) as SVGLineElement;

            // VCC (orange) → 3.3V
            this.vccWire = svg.child(this.element, "line", {
                x1: "120", y1: "60",    // micro:bit 3.3V pad
                x2: "200", y2: "70",    // VCC pad
                stroke: "orange", "stroke-width": "3"
            }) as SVGLineElement;

            // GND (black) → GND
            this.gndWire = svg.child(this.element, "line", {
                x1: "120", y1: "100",   // micro:bit GND pad
                x2: "200", y2: "85",    // GND pad
                stroke: "black", "stroke-width": "3"
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
