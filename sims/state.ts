namespace pxsim {
    export class BatteryState {
        level = 0;
        clk = 18;
        dio = 20;
    }

    export interface MicrobitBoard extends core.Board {
        batteryState: BatteryState;
    }

    export function board(): MicrobitBoard {
        return runtime.board as MicrobitBoard;
    }
}
