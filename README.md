# Bits4Bots TM1651 Battery Level Extension

This extension lets you control a TM1651 battery level indicator with MakeCode.

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
