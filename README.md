# Bits4Bots TM1651 Battery Level Extension

This extension lets you control a TM1651 battery level indicator with MakeCode.

<img width="250" height="250" alt="TM1651 Mini Display" src="https://github.com/user-attachments/assets/737cf978-5861-4d35-ab06-cee06a23224e" />


### Blocks
- Initialize with CLK/DIO pins
- Clear battery display
- Show battery level (0-6 LEDs)
- Set brightness (0-7)

### Example
```blocks
Bits4BotsTM1651.init(DigitalPin.P1, DigitalPin.P2)
Bits4BotsTM1651.setBrightness(3)
Bits4BotsTM1651.showBatteryLevel(4) // Show 4 LEDs
```

    //% block="battery empty" blockImage="sim/battery0.svg"
    export function battery0() { showBatteryLevel(0) }

    //% block="battery 1" blockImage="sim/battery1.svg"
    export function battery1() { showBatteryLevel(1) }

    //% block="battery 2" blockImage="sim/battery2.svg"
    export function battery2() { showBatteryLevel(2) }

    //% block="battery 3" blockImage="sim/battery3.svg"
    export function battery3() { showBatteryLevel(3) }

    //% block="battery 4" blockImage="sim/battery4.svg"
    export function battery4() { showBatteryLevel(4) }

    //% block="battery 5" blockImage="sim/battery5.svg"
    export function battery5() { showBatteryLevel(5) }

    //% block="battery 6" blockImage="sim/battery6.svg"
    export function battery6() { showBatteryLevel(6) }
