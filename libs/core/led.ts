/**
 * Control of the LED screen.
 */
//% color=#5C2D91 weight=101 icon="\uf205" block="LED"
namespace led {
    /**
     * Obter o estado ligado/desligado do LED especificado utilizar as coordenadas x, y. (0,0) é a parte superior esquerda.
     * @param x a coordenada horizontal do LED começando em 0
     * @param y a coordenada horizontal do LED começando em 0
     */
    //% help=led/point weight=76
    //% blockId=device_point block="led ligado em|x %x|y %y"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function point(x: number, y: number): boolean {
        return led.pointBrightness(x, y) > 0;
    }

    // what's the current high value
    let barGraphHigh = 0;
    // when was the current high value recorded
    let barGraphHighLast = 0;

    /**
     * Controls where plotbargraph prints to the console
     **/
    export let barGraphToConsole = true

    /**
     * Exibe um gráfico de barras vertical com base no valor `value` e`high`.
     * Se `high` for 0, o gráfico é ajustado automaticamente
     * @param value valor atual a plotar gráfico acendendo os LEDs
     * @param high valor máximo do grafico que será plotado. Se for 0, o valor máximo é ajustado automaticamente, por exemplo: 0
     * @param valueToConsole se verdadeiro, imprime o valor na porta serial
     */
    //% help=led/plot-bar-graph weight=20
    //% blockId=device_plot_bar_graph block="gráfico: valor$value valor máximo $high|| mostrar no monitor serial $valueToConsole" icon="\uf080" blockExternalInputs=true
    //% parts="ledmatrix"
    //% valueToConsole.shadow=toggleOnOff
    //% valueToConsole.defl=true
    export function plotBarGraph(value: number, high: number, valueToConsole?: boolean): void {
        if (valueToConsole == undefined) {
            valueToConsole = barGraphToConsole;
        }
        const now = input.runningTime();
        if (valueToConsole)
            console.logValue("", value);
        if (isNaN(value)) {
            basic.clearScreen()
            return
        }
        value = Math.abs(value);

        // auto-scale "high" is not provided
        if (high > 0) {
            barGraphHigh = high;
        } else if (value > barGraphHigh || now - barGraphHighLast > 10000) {
            barGraphHigh = value;
            barGraphHighLast = now;
        }

        // normalize lack of data to 0..1
        if (barGraphHigh < 16 * Number.EPSILON)
            barGraphHigh = 1;

        // normalize value to 0..1
        const v = value / barGraphHigh;
        const dv = 1 / 16;
        let k = 0;
        for (let y = 4; y >= 0; --y) {
            for (let x = 0; x < 3; ++x) {
                if (k > v) {
                    unplot(2 - x, y);
                    unplot(2 + x, y);
                } else {
                    plot(2 - x, y);
                    plot(2 + x, y);
                }
                k += dv;
            }
        }
    }

    /**
     * Alterna um pixel em particular
     * @param x pixel column
     * @param y pixel row
     */
    //% help=led/toggle weight=77
    //% blockId=device_led_toggle block="mudar estado do led em|x %x|y %y" icon="\uf204" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function toggle(x: number, y: number): void {
        if (led.point(x, y)) {
            led.unplot(x, y);
        } else {
            led.plot(x, y);
        }
    }

    /**
     * Turns all LEDS on
     */
    //% help=led/plot-all
    //% parts="ledmatrix"
    export function plotAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.plot(i, j);
            }
        }
    }

    /**
     * Inverts the current LED display
     */
    //% help=led/toggle-all
    //% parts="ledmatrix"
    export function toggleAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.toggle(i, j);
            }
        }
    }

    /**
     * Fades in the screen display.
     * @param ms fade time in milliseconds
     */
    //% help=led/fade-in
    //% parts="ledmatrix"
    export function fadeIn(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(255);
            return;
        }
        let dt = 50;
        let brightness = led.brightness();
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness + ((255 - brightness) * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(255);
    }

    /**
     * Fades out the screen brightness.
     * @param ms fade time in milliseconds
     */
    //% help=led/fade-out
    //% parts="ledmatrix"
    export function fadeOut(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(0);
            return;
        }
        let brightness = led.brightness();
        let dt = 50;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness - (brightness * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(0);
    }
}
