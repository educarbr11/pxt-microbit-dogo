#include "pxt.h"


/**
 * Dá acesso às funções básicas do micro:bit.
 */
//% color=#1E90FF weight=116 icon="\uf00a"
namespace basic {
    /**
     * Desenha uma imagem na tela de LED.
     * @param leds the pattern of LED to turn on/off.
     * @param interval time in milliseconds to pause after drawing.
     */
    //% help=basic/show-leds
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="matriz de led" icon="\uf00a"
    //% parts="ledmatrix"
    void showLeds(ImageLiteral_ leds, int interval = 400) {
      uBit.display.print(MicroBitImage(imageBytes(leds)), 0, 0, 0, interval);
    }

    /**
     * Mostrar texto na tela, um caracteres por vez. Se a cadeia de caracteres se ajustar na tela (ou seja, é uma letra), não mover.
     * @param text the text to scroll on the screen, eg: "Olá, Mundo!"
     * @param interval how fast to shift characters; eg: 150, 100, 200, -100
     */
    //% help=basic/show-string
    //% weight=87 blockGap=16
    //% block="mostrar|texto %text"
    //% async
    //% blockId=device_print_message
    //% parts="ledmatrix"
    //% text.shadowOptions.toString=true
    void showString(String text, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      int l = text ? text->getUTF8Size() : 0;
      if (l == 0) {
        uBit.display.clear();
        fiber_sleep(interval * 5);
      } else if (l > 1) {
        uBit.display.scroll(MSTR(text), interval);
      } else {
        uBit.display.printChar(text->getUTF8Data()[0], interval * 5);
      }
    }

    /**
     * Desligar todos os LEDs
     */
    //% help=basic/clear-screen weight=79
    //% blockId=device_clear_display block="limpar tela"
    //% parts="ledmatrix"
    void clearScreen() {
      uBit.display.image.clear();
    }

    /**
     * Exibe uma sequência de telas de LED como uma animação.
     * @param leds padrão de LEDs para ligar/desligar
     * @param interval tempo em milissegundos entre cada redesenho
     */
    //% help=basic/show-animation imageLiteral=1 async
    //% parts="ledmatrix"
    void showAnimation(ImageLiteral_ leds, int interval = 400) {
      uBit.display.animate(MicroBitImage(imageBytes(leds)), interval, 5, 0, 0);
    }

    /**
     * Desenha uma imagem na tela de LED.
     * @param leds padrão de LEDs para ligar/desligar
     */
    //% help=basic/plot-leds weight=80
    //% parts="ledmatrix"
    void plotLeds(ImageLiteral_ leds) {
      MicroBitImage i(imageBytes(leds));
      uBit.display.print(i, 0, 0, 0, 0);
    }

    /**
     * Repete o código em segundo plano sem parar. A cada repetição, permite que outros códigos sejam executados.
     * @param body código para executar
     */
    //% help=basic/forever weight=55 blockGap=16 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="fazer sempre" icon="\uf01e"
    void forever(Action a) {
      runForever(a);
    }

    /**
     * Pausa por um período especificado em milissegundos
     * @param ms a duração da pausa, por exemplo: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="esperar (ms) %pause" blockGap=16
    //% blockId=device_pause icon="\uf110"
    //% pause.shadow=timePicker
    void pause(int ms) {
      fiber_sleep(ms);
    }
}