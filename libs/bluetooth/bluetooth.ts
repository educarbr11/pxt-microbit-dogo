/// <reference no-default-lib="true"/>
/**
 * Support for additional Bluetooth services.
 */
//% color=#007EF4 weight=96 icon="\uf294" block="BLUETOOTH"
namespace bluetooth {
    export let NEW_LINE = "\r\n";

    /**
     * Internal use
     */
    //% shim=bluetooth::__log
    export function __log(priority: number, msg: string) {
        return;
    }
    console.addListener(function (_pri, msg) { __log(_pri, msg) });

    /**
    *  O micro:bit envia um texto para outro dispositivo (como um celular ou outro micro:bit) usando Bluetooth.
    *  O micro:bit manda a frase “Olá” para quem está conectado com ele pelo Bluetooth.
    */
    //% help=bluetooth/uart-write-string weight=80
    //% blockId=bluetooth_uart_write block="bluetooth: |enviar mensagem %data" blockGap=8
    //% parts="bluetooth" shim=bluetooth::uartWriteString advanced=false
    export function uartWriteString(data: string): void {
        console.log(data)
    }

    /**
    *  O micro:bit manda "Olá" para o celular (ou outro micro:bit) e depois pula para a linha de baixo, se for mandar outra mensagem depois.
    */
    //% help=bluetooth/uart-write-line weight=79
    //% blockId=bluetooth_uart_line block="bluetooth: |envia linha %data" blockGap=8
    //% parts="bluetooth" advanced=false
    export function uartWriteLine(data: string): void {
        uartWriteString(data + serial.NEW_LINE);
    }

    /**
     * O micro:bit manda uma mensagem dizendo “pontos vale 100” para o celular ou outro micro:bit.
     */
    //% help=bluetooth/uart-write-number weight=79
    //% weight=89 blockGap=8 advanced=false
    //% blockId=bluetooth_uart_writenumber block="bluetooth: |enviar valor %value"
    export function uartWriteNumber(value: number): void {
        uartWriteString(value.toString());
    }

    /**
     * O micro:bit manda uma informação com nome e número para outro aparelho.
        É como dizer:
        👉 “temperatura = 30”
        👉 “pontos = 10”
     * @param name name of the value stream, eg: x
     * @param value to write
     */
    //% weight=88 weight=78
    //% help=bluetooth/uart-write-value advanced=false
    //% blockId=bluetooth_uart_writevalue block="bluetooth: |enviar nome e número %name|= %value"
    export function uartWriteValue(name: string, value: number): void {
        uartWriteString((name ? name + ":" : "") + value + NEW_LINE);
    }

    /**
     *  Lê uma mensagem enviada por outro aparelho via Bluetooth
     */
    //% help=bluetooth/uart-read-until weight=75
    //% blockId=bluetooth_uart_read block="bluetooth: |ler até encontrar %del=serial_delimiter_conv"
    //% parts="bluetooth" shim=bluetooth::uartReadUntil advanced=false
    export function uartReadUntil(del: string): string {
        // dummy implementation for simulator
        return ""
    }

    /**
    * Advertise an Eddystone UID
    * @param ns 4 last bytes of the namespace uid
    * @param instance 4 last bytes of the instance uid
    * @param power power level between 0 and 7, eg: 7
    * @param connectable true to keep bluetooth connectable for other services, false otherwise.
    */
    //% blockId=eddystone_advertise_uid block="bluetooth advertise UID|namespace (bytes 6-9)%ns|instance (bytes 2-6)%instance|with power %power|connectable %connectable"
    //% parts=bluetooth weight=12 blockGap=8
    //% help=bluetooth/advertise-uid blockExternalInputs=1
    //% hidden=1 deprecated=1
    export function advertiseUid(ns: number, instance: number, power: number, connectable: boolean) {
        const buf = pins.createBuffer(16);
        buf.setNumber(NumberFormat.Int32BE, 6, ns);
        buf.setNumber(NumberFormat.Int32BE, 12, instance);
        bluetooth.advertiseUidBuffer(buf, power, connectable);
    }
}
