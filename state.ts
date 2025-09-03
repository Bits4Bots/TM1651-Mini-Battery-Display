namespace pxsim {
    export class BatteryState {
        level = 0;
        clk = 19;
        dio = 20;
        vcc = 3;   // 3.3V pin
        gnd = 0;   // GND pin
    }

    export interface MicrobitBoard extends core.Board {
        batteryState: BatteryState;
    }

    export function board(): MicrobitBoard {
        return runtime.board as MicrobitBoard;
    }
}
