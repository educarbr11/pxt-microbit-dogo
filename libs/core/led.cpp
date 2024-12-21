#include "pxt.h"

enum class DisplayMode_ {
    //% block="preto e branco"
    BlackAndWhite = DISPLAY_MODE_BLACK_AND_WHITE,
    //% blockHidden=true
    BackAndWhite = DISPLAY_MODE_BLACK_AND_WHITE,
    //% block="cinza"
    Greyscale = DISPLAY_MODE_GREYSCALE,
    // TODO DISPLAY_MODE_BLACK_AND_WHITE_LIGHT_SENSE
};

//% color=#7600A8 weight=101 icon="\uf205"
namespace led {

    /**
     * Ligar o LED especificado ao utilizar coordenadas x, y (x é horizontal, y é vertical). (0,0) é é a parte superior esquerda.
     * @param x a coordenada horizontal do LED começando em 0
     * @param y a coordenada vertical do LED começando em 0
     */
    //% help=led/plot weight=78
    //% blockId=device_plot block="ligar led em|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    void plot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 0xff);
    }

    /**
     * Ligar o LED especificado com brilho específico ao utilizar coordenadas x, y (x é horizontal, y é vertical). (0,0) é a parte superior esquerdo.
     * @param x a coordenada horizontal do LED começando em 0
     * @param y a coordenada vertical do LED começando em 0
     * @param brightness o brilho de 0 (desligado) to 255 (brilho total), eg:255
     */
    //% help=led/plot-brightness weight=78
    //% blockId=device_plot_brightness block="ligar led em|x %x|y %y|brilho %brightness" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4 brightness.min=0 brightness.max=255
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    //% advanced=false
    void plotBrightness(int x, int y, int brightness) {
        brightness = max(0, min(0xff, brightness));
        // enable greyscale as needed
        if (brightness != 0 && brightness != 0xff && uBit.display.getDisplayMode() != DISPLAY_MODE_GREYSCALE)
            uBit.display.setDisplayMode(DISPLAY_MODE_GREYSCALE);
        uBit.display.image.setPixelValue(x, y, brightness);
    }

    /**
     * Desligar o LED especificado ao utilizar coordenadas x, y (x é horizontal, y é vertical). (0,0) é é a parte superior esquerda.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/unplot weight=77
    //% blockId=device_unplot block="apagar led em|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    void unplot(int x, int y) {
      uBit.display.image.setPixelValue(x, y, 0);
    }

    /**
     * Obter o estado ligado/desligado do LED especificado utilizar as coordenadas x, y. (0,0) é a parte superior esquerda.
     * @param x a coordenada horizontal do LED começando em 0
     * @param y a coordenada vertical do LED começando em 0
     */
    //% help=led/point-brightness weight=76
    //% blockId=device_point_brightness block="brilho do led em|x %x|y %y"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    //% advanced=false
    int pointBrightness(int x, int y) {
      return uBit.display.image.getPixelValue(x, y);
    }

    /**
     * Obtém o brilho da tela de 0 (desligado) a 255 (brilho total).
     */
    //% help=led/brightness weight=60
    //% blockId=device_get_brightness block="brilho do led" blockGap=8
    //% parts="ledmatrix"
    //% advanced=false
    int brightness() {
      return uBit.display.getBrightness();
    }

    /**
     * Define o brilho de tela de 0 (desligada) até 255 (brilho total).
     * @param value intensidade do brilho, eg:255, 127, 0
     */
    //% help=led/set-brightness weight=59
    //% blockId=device_set_brightness block="definir brilho do led %value"
    //% parts="ledmatrix"
    //% advanced=false
    //% value.min=0 value.max=255
    void setBrightness(int value) {
       uBit.display.setBrightness(value);
    }

    /**
     * Cancela a animação atual e limpa outras animações pendentes.
     */
    //% weight=50 help=led/stop-animation
    //% blockId=device_stop_animation block="parar animação de led"
    //% parts="ledmatrix"
    //% advanced=false
    void stopAnimation() {
       uBit.display.stopAnimation();
    }

    /**
     * Define o modo de exibição entre preto e branco e tons de cinza para a renderização de LEDs.
     * @param mode modo de exibição no qual a tela opera
     */
    //% weight=1 help=led/set-display-mode
    //% parts="ledmatrix" advanced=false weight=1
    //% blockId="led_set_display_mode" block="definir modo de exibição $mode"
    void setDisplayMode(DisplayMode_ mode) {
        uBit.display.setDisplayMode((DisplayMode)mode);
    }

    /**
    * Obtém o modo de exibição atual
    */
    //% weight=1 parts="ledmatrix" advanced=false
    DisplayMode_ displayMode() {
        return (DisplayMode_)uBit.display.getDisplayMode();
    }

    /**
    * Liga ou desliga a tela
    */
    //% help=led/enable blockId=device_led_enable block="led ativado? %on"
    //% advanced=false parts="ledmatrix"
    void enable(bool on) {
        if (on) uBit.display.enable();
        else uBit.display.disable();
    }

    /**
     * Faz uma captura de tela da tela de LED e retorna uma imagem.
     */
    //% help=led/screenshot
    //% parts="ledmatrix"
    Image screenshot() {
        auto d = uBit.display.screenShot().leakData();
        auto r = NEW_GC(RefMImage, d);
        d->decr();
        return r;
        /*
        let Image img;
        img = image.createImage("");
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (led.point(i, j)) {
                    img.setPixel(i, j, true);
                }
            }
        }
        return img;
        */
    }
}
