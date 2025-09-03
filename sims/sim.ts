namespace pxsim.Bits4BotsTM1651 {
    let batteryLevel = 0

    export function showBatteryLevel(level: number) {
        batteryLevel = Math.max(0, Math.min(6, level));
        runtime.queueDisplayUpdate();
    }

    export function clear() {
        batteryLevel = 0;
        runtime.queueDisplayUpdate();
    }

    export function setBrightness(brightness: number) {
        // can simulate LED brightness later
    }

    export function getBatteryLevel() {
        return batteryLevel;
    }
}
