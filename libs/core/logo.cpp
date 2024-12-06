#include "pxt.h"

/**
 * Uma ação para o toque do botão
 */
enum TouchButtonEvent {
    //% block=pressionado
    Pressed = MICROBIT_BUTTON_EVT_CLICK,
    //% block=clicado
    Touched = MICROBIT_BUTTON_EVT_DOWN,
    //% block=soltado
    Released = MICROBIT_BUTTON_EVT_UP,
    //% block="pressionado por longo tempo"
    LongPressed = MICROBIT_BUTTON_EVT_LONG_CLICK
};

namespace input {
    /**
     * Faça algo quando o logotipo for tocado e liberado novamente.
     * @param body o código a ser executado quando o logotipo é pressionado
     */
    //% weight=83 blockGap=32
    //% blockId=input_logo_event block="quando o logo ser $action"
    //% group="micro:bit (V2)"
    //% parts="logotouch"
    //% help="input/on-logo-event"
    void onLogoEvent(TouchButtonEvent action, Action body) {
#if MICROBIT_CODAL
        registerWithDal(uBit.io.logo.id, action, body);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    /**
     * Obtenha o estado do logotipo (pressionado ou não).
     */
    //% weight=58
    //% blockId="input_logo_is_pressed" block="logo foi pressionado"
    //% blockGap=8
    //% group="micro:bit (V2)"
    //% parts="logotouch"
    //% help="input/logo-is-pressed"
    bool logoIsPressed() {
#if MICROBIT_CODAL
        return uBit.io.logo.isTouched();
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
        return false;
#endif
    }
}
