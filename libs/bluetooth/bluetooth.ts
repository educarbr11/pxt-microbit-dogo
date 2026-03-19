/// <reference no-default-lib="true"/>
/**
 * Suporte para conectar aparelhos usando Bluetooth.
 */
//% color=#007EF4 weight=96 icon="\uf294" block="BLUETOOTH"
namespace bluetooth {
    export let NEW_LINE = "\r\n";

    /**
     * Uso interno do sistema.
     */
    //% shim=bluetooth::__log
    export function __log(priority: number, msg: string) {
        return;
    }
    console.addListener(function (_pri, msg) { __log(_pri, msg) });

    /**
    * Manda um recadinho de texto para o outro aparelho conectado.
    */
    //% help=bluetooth/uart-write-string weight=80
    //% blockId=bluetooth_uart_write block="bluetooth:|enviar mensagem %data" blockGap=8
    //% parts="bluetooth" shim=bluetooth::uartWriteString advanced=false 
    export function uartWriteString(data: string): void {
        console.log(data)
    }

    /**
    * Manda uma frase inteira e pula para a linha de baixo, como se desse um 'Enter'.
    */
    //% help=bluetooth/uart-write-line weight=79
    //% blockId=bluetooth_uart_line block="bluetooth:|enviar frase %data e pular linha" blockGap=8
    //% parts="bluetooth" advanced=false
    export function uartWriteLine(data: string): void {
        uartWriteString(data + serial.NEW_LINE);
    }

    /**
     * Manda um número (como sua idade ou pontos no jogo) para o outro aparelho.
     */
    //% help=bluetooth/uart-write-number weight=79
    //% weight=89 blockGap=8 advanced=false
    //% blockId=bluetooth_uart_writenumber block="bluetooth:|enviar número %value"
    export function uartWriteNumber(value: number): void {
        uartWriteString(value.toString());
    }

    /**
     * Manda um nome e um número juntos, como uma etiqueta. Exemplo: "Pontos: 10".
     * @param name o nome da etiqueta, ex: pontos
     * @param value o número que vai nela
     */
    //% weight=88 weight=78
    //% help=bluetooth/uart-write-value advanced=false
    //% blockId=bluetooth_uart_writevalue block="bluetooth:|enviar etiqueta %name|com valor %value"
    export function uartWriteValue(name: string, value: number): void {
        uartWriteString((name ? name + ":" : "") + value + NEW_LINE);
    }

    /**
     * Fica esperando e ouvindo o que o outro aparelho diz até encontrar um sinal de parada.
     */
    //% help=bluetooth/uart-read-until weight=75
    //% blockId=bluetooth_uart_read block="bluetooth:|ler mensagem até encontrar %del=serial_delimiter_conv"
    //% parts="bluetooth" shim=bluetooth::uartReadUntil advanced=false
    export function uartReadUntil(del: string): string {
        // dummy implementation for simulator
        return ""
    }

    /**
    * Faz o seu aparelho gritar um nome secreto para que outros possam te achar no mapa.
    * @param ns a primeira parte do nome secreto
    * @param instance a segunda parte do nome secreto
    * @param power a força do grito (volume do sinal)
    * @param connectable se você aceita que outros aparelhos falem com você
    */
    //% blockId=eddystone_advertise_uid block="bluetooth: gritar nome secreto|parte A %ns|parte B %instance|com força %power|aceitar conversas %connectable"
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