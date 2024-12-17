/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#B22222 weight=30 icon="\uf140"
//% advanced=true block="PINOS"
//% groups='["Pins", "Pulse", "I2C", "SPI", "micro:bit (V2)"]'
namespace pins {
    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/digital-pin
    //% shim=TD_ID
    //% blockId=digital_pin
    //% block="digital pin $pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Pins"
    //% weight=17
    //% blockGap=8
    //% advanced=true
    //% decompilerShadowAlias=digital_pin_shadow
    export function _digitalPin(pin: DigitalPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_pin
    //% block="analog pin $pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Pins"
    //% weight=16
    //% blockGap=8
    //% advanced=true
    //% decompilerShadowAlias=analog_pin_shadow
    export function _analogPin(pin: AnalogPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/digital-pin
    //% shim=TD_ID
    //% blockId=digital_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _digitalPinShadow(pin: DigitalPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogPinShadow(pin: AnalogPin): number {
        return pin;
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% help=pins/analog-pin
    //% shim=TD_ID
    //% blockId=analog_read_write_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogReadWritePinShadow(pin: AnalogReadWritePin): number {
        return pin;
    }

    /**
     * Mapeia um número de um intervalo para outro. Ou seja, um valor de ``from low`` será mapeado para ``to low``, um valor de ``from high`` será mapeado para ``to high``, e valores intermediários para valores intermediários, etc.
     * @param value valor a ser mapeado nos intervalos
     * @param fromLow o limite inferior do intervalo atual do valor
     * @param fromHigh o limite superior do intervalo atual do valor, por exemplo: 1023
     * @param toLow o limite inferior do intervalo de destino do valor
     * @param toHigh o limite superior do intervalo de destino do valor, por exemplo: 4
     */
    //% help=pins/map weight=23
    //% blockId=pin_map block="tranformar %value|de mínimo A %fromLow|máximo A %fromHigh|para mínimo B %toLow|máximo B %toHigh"
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }

    /**
     * Read one number from 7-bit I2C address.
     */
    //% help=pins/i2c-read-number blockGap=8 advanced=true
    //% blockId=pins_i2c_readnumber block="i2c read number|at address %address|of format %format|repeated %repeat" weight=7
    //% group="I2C"
    //% weight=45
    export function i2cReadNumber(address: number, format: NumberFormat, repeated?: boolean): number {
        let buf = pins.i2cReadBuffer(address, pins.sizeOf(format), repeated)
        return buf.getNumber(format, 0)
    }

    /**
     * Write one number to a 7-bit I2C address.
     */
    //% help=pins/i2c-write-number blockGap=8 advanced=true
    //% blockId=i2c_writenumber block="i2c write number|at address %address|with value %value|of format %format|repeated %repeat" weight=6
    //% group="I2C"
    //% weight=44
    export function i2cWriteNumber(address: number, value: number, format: NumberFormat, repeated?: boolean): void {
        let buf = createBuffer(pins.sizeOf(format))
        buf.setNumber(format, 0, value)
        pins.i2cWriteBuffer(address, buf, repeated)
    }
}
