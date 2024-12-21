namespace Math {
    /**
     * Gera um valor `verdadeiro` ou `falso` aleatoriamente, como jogar um moeda
     */
    //% blockId=logic_random block="escolher de forma aleatória verdadeiro ou falso"
    //% help=math/random-boolean weight=0
    export function randomBoolean(): boolean {
        return Math.randomRange(0, 1) === 1;
    }
}