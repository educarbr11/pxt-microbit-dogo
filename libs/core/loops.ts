namespace loops {
    /**
     * Repeats the code forever in the background.
     * Após cada iteração, permite que outros códigos sejam executados por um período definido, para que funcione como um temporizador.
     * @param interval tempo (em ms) de espera entre cada iteração da ação.
     * @param body code a executar
     */
    //% weight=45 blockAllowMultiple=1
    //% interval.shadow=longTimePicker
    //% afterOnStart=true help=loops/every-interval
    //% blockId=every_interval block="a cada $interval ms"
    export function everyInterval(interval: number, a: () => void): void {
        control.runInParallel(() => {
            let start = 0;
            while (true) {
                start = control.millis();
                a();
                pause(Math.max(0, interval - (control.millis() - start)));
            }
        });
    }

    /**
      * Get the time field editor
      * @param ms time duration in milliseconds, eg: 500, 1000
      */
    //% blockId=longTimePicker block="%ms"
    //% blockHidden=true shim=TD_ID
    //% colorSecondary="#FFFFFF"
    //% ms.fieldEditor="numberdropdown" ms.fieldOptions.decompileLiterals=true
    //% ms.fieldOptions.data='[["100 ms", 100], ["200 ms", 200], ["500 ms", 500], ["1 segundo", 1000], ["1 minuto", 60000], ["1 hora", 3600000]]'
    export function __timePicker(ms: number): number {
        return ms;
    }
}