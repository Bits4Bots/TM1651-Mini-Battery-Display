//% color=#3af0e7 icon="\uf240" block="Bits4Bots Battery"
namespace Bits4BotsTM1651 {
    let CLK: DigitalPin;
    let DIO: DigitalPin;

    // ===== Micro:bit side control (real hardware) =====

    function start() {
        pins.digitalWritePin(CLK, 1);
        pins.digitalWritePin(DIO, 1);
        pins.digitalWritePin(DIO, 0);
        pins.digitalWritePin(CLK, 0);
    }

    function stop() {
        pins.digitalWritePin(CLK, 0);
        pins.digitalWritePin(DIO, 0);
        pins.digitalWritePin(CLK, 1);
        pins.digitalWritePin(DIO, 1);
    }

    function writeByte(d: number) {
        for (let i = 0; i < 8; i++) {
            pins.digitalWritePin(CLK, 0);
            pins.digitalWritePin(DIO, (d & 0x01) ? 1 : 0);
            d >>= 1;
            pins.digitalWritePin(CLK, 1);
        }
        pins.digitalWritePin(CLK, 0);
        pins.digitalWritePin(DIO, 1);
        pins.digitalWritePin(CLK, 1);
    }

    /**
     * Initialize TM1651 with CLK and DIO pins
     */
    //% block="initialize TM1651 with CLK %clk| DIO %dio"
    export function init(clk: DigitalPin, dio: DigitalPin): void {
        CLK = clk;
        DIO = dio;
        clear();
    }

    /**
     * Clear battery display (all LEDs off)
     */
    //% block="clear battery display"
    export function clear(): void {
        // hardware clear
        start(); writeByte(0x48); stop();
        start(); writeByte(0x68); writeByte(0x00); stop();

        // simulator state
        pxsim.Bits4BotsTM1651.showBatteryLevel(0);
    }

    /**
     * Show battery level (0–6 LEDs)
     */
    //% block="set battery level to %level"
    //% level.min=0 level.max=6
    export function showBatteryLevel(level: number): void {
        if (level < 0) level = 0;
        if (level > 6) level = 6;

        let data = 0;
        for (let i = 0; i < level; i++) {
            data = (data << 1) | 0x01;
        }

        // hardware update
        start(); writeByte(0x48); stop();
        start(); writeByte(0x68); writeByte(data); stop();

        // simulator update
        pxsim.Bits4BotsTM1651.showBatteryLevel(level);
    }

    /**
     * Set brightness (0–7)
     */
    //% block="set brightness %brightness"
    //% brightness.min=0 brightness.max=7
    export function setBrightness(brightness: number): void {
        if (brightness < 0) brightness = 0;
        if (brightness > 7) brightness = 7;

        // hardware update
        start(); writeByte(0x88 | brightness); stop();

        // optional: update sim (not required now)
    }
}
