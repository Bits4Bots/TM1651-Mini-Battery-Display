namespace pxsim.visuals {
    export class BatteryView implements BoardPart<BatteryState> {
        private element: SVGElement;
        private levelRects: SVGRectElement[] = [];

        public init(bus: EventBus, state: BatteryState) {
            this.element = svg.elt("svg") as SVGElement;
            this.element.setAttribute("width", "120");
            this.element.setAttribute("height", "30");
            this.element.style.border = "1px solid white";

            for (let i = 0; i < 6; i++) {
                let r = svg.elt("rect") as SVGRectElement;
                r.setAttribute("x", `${5 + i * 20}`);
                r.setAttribute("y", "5");
                r.setAttribute("width", "15");
                r.setAttribute("height", "20");
                r.setAttribute("fill", "gray");
                this.element.appendChild(r);
                this.levelRects.push(r);
            }
        }

        public updateState(state: BatteryState) {
            let level = state.level;
            for (let i = 0; i < 6; i++) {
                this.levelRects[i].setAttribute("fill", i < level ? "limegreen" : "gray");
            }
        }

        public getView() {
            return this.element;
        }
    }
}
