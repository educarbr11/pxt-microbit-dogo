//% block="BÁSICO"
namespace basic {
    /**
     * Mover um número na tela. Se o número se ajustar na tela (ou seja, é um único dígito), não mover.
     * @param interval speed of scroll; eg: 150, 100, 200, -100
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=device_show_number block="mostrar|número %number" blockGap=8
    //% async
    //% parts="ledmatrix" interval.defl=150
    export function showNumber(value: number, interval?: number) {
        if (isNaN(value))
            showString("?")
        else
            showString(Math.roundWithPrecision(value, 2).toString(), interval);
    }
}

/**
 * Pausa por um período especificado em milissegundos
 * @param ms a duração da pausa, por exemplo: 100, 200, 500, 1000, 2000
 */
function pause(ms: number): void {
    if (isNaN(ms)) ms = 20
    basic.pause(ms);
}

/**
 * Repeats the code forever in the background. On each iteration, allows other codes to run.
 * @param body code to execute
 */
function forever(a: () => void): void {
    basic.forever(a);
}
