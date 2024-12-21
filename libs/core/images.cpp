#include "pxt.h"

PXT_VTABLE(RefMImage, ValType::Object)

RefMImage::RefMImage(ImageData *d) : PXT_VTABLE_INIT(RefMImage), img(d) {
    img->incr();
}

void RefMImage::destroy(RefMImage *t) {
    t->img->decr();
}

void RefMImage::print(RefMImage *t) {
    DMESG("RefMImage %p size=%d x %d", t, t->img->width, t->img->height);
}

void RefMImage::makeWritable() {
    if (img->isReadOnly()) {
        MicroBitImage i(img);
        img = i.clone().leakData();
    }
}

void RefMImage::scan(RefMImage *t) {}

unsigned RefMImage::gcsize(RefMImage *t) {
    return (sizeof(*t) + 3) >> 2;
}

/**
 * Creation, manipulation and display of LED images.
 */
//% color=#7600A8 weight=31 icon="\uf03e"
//% advanced=false block="IMAGENS"
namespace images {
/**
 * Cria uma imagem que se ajusta à tela de LEDs.
 */
//% weight=75 help=images/create-image
//% blockId=device_build_image block="criar imagem"
//% parts="ledmatrix"
Image createImage(ImageLiteral_ leds) {
    return NEW_GC(RefMImage, imageBytes(leds));
}

/**
 * Cria uma imagem com 2 quadros.
 */
//% weight=74 help=images/create-big-image
//% blockId=device_build_big_image block="criar imagem grande" imageLiteral=2
//% parts="ledmatrix"
Image createBigImage(ImageLiteral_ leds) {
    return createImage(leds);
}

//%
Buffer charCodeBuffer(int charCode) {
    if(charCode < MICROBIT_FONT_ASCII_START || charCode > MICROBIT_FONT_ASCII_END)
        return NULL;
#if MICROBIT_CODAL
    auto font = codal::BitmapFont::getSystemFont();
#else
    auto font = MicroBitFont::getSystemFont();
#endif
    const int offset = (charCode - MICROBIT_FONT_ASCII_START) * 5;;
    const uint8_t* charBuffer = font.characters + offset;
    
    return PXT_CREATE_BUFFER(charBuffer, 5);
}

} // namespace images

namespace ImageMethods {
/**
 * Plots the image at a given column to the screen
 */
//% help=images/plot-image
//% parts="ledmatrix"
void plotImage(Image i, int xOffset = 0) {
    uBit.display.print(MicroBitImage(i->img), -xOffset, 0, 0, 0);
}

/**
 * Mostra um quadro da imagem no deslocamento ``x offset``.
 * @param xOffset índice da coluna para começar a exibir a imagem
 * @param interval tempo em milissegundos para pausar após desenhar
 */
//% help=images/show-image weight=80 blockNamespace=images
//% blockId=device_show_image_offset block="mostrar imagem %sprite(myImage)|no deslocamento %offset ||e intervalo (ms) %interval"
//% interval.defl=400
//% blockGap=8 parts="ledmatrix" async
void showImage(Image sprite, int xOffset, int interval = 400) {
    uBit.display.print(MicroBitImage(sprite->img), -xOffset, 0, 0, interval);
}

/**
 * Desenha o ``índice``-ésimo quadro da imagem na tela.
 * @param xOffset índice da coluna para começar a exibir a imagem
 */
//% help=images/plot-frame weight=80
//% parts="ledmatrix"
void plotFrame(Image i, int xOffset) {
    // TODO showImage() used in original implementation
    plotImage(i, xOffset * i->img->height);
}

/**
 * Rola uma imagem.
 * @param frameOffset deslocamento x movido a cada passo da animação, por exemplo: 1, 2, 5
 * @param interval tempo entre cada passo da animação em milissegundos, por exemplo: 200
 */
//% help=images/scroll-image weight=79 async blockNamespace=images
//% blockId=device_scroll_image
//% block="rolar imagem %sprite(minhaImagem)|com deslocamento %frameoffset|e intervalo (ms) %delay"
//% blockGap=8 parts="ledmatrix"
void scrollImage(Image id, int frameOffset, int interval) {
    MicroBitImage i(id->img);
    uBit.display.animate(i, interval, frameOffset, MICROBIT_DISPLAY_ANIMATE_DEFAULT_POS, 0);
}

/**
 * Desliga todos os leds
 */
//% help=images/clear
//% parts="ledmatrix"
void clear(Image i) {
    i->makeWritable();
    MicroBitImage(i->img).clear();
}

/**
 * Define um brilho de pixel específico em uma determinada posição
 */
//%
//% parts="ledmatrix"
void setPixelBrightness(Image i, int x, int y, int value) {
    i->makeWritable();
    MicroBitImage(i->img).setPixelValue(x, y, value);
}

/**
 * Obtém o brilho do pixel ([0..255]) em uma determinada posição
 */
//%
//% parts="ledmatrix"
int pixelBrightness(Image i, int x, int y) {
    int pix = MicroBitImage(i->img).getPixelValue(x, y);
    if (pix < 0)
        return 0;
    return pix;
}

/**
 * Largura da coluna
 */
//% help=functions/width
int width(Image i) {
    return i->img->width;
}

/**
 * Altura da coluna (5)
 */
//%
int height(Image i) {
    return i->img->height;
}

/**
 * Define o estado de um pixel na posição ``(x, y)``
 * @param x coluna do pixel
 * @param y linha do pixel
 * @param value estado do pixel
 */
//% help=images/set-pixel
//% parts="ledmatrix"
void setPixel(Image i, int x, int y, bool value) {
    setPixelBrightness(i, x, y, value ? 255 : 0);
}

/**
 * Obtém o estado do pixel na posição ``(x, y)``
 * @param x coluna do pixel
 * @param y linha do pixel
 */
//% help=images/pixel
//% parts="ledmatrix"
bool pixel(Image i, int x, int y) {
    return pixelBrightness(i, x, y) > 0;
}

/**
 * Exibe um quadro específico da tira de imagens.
 * @param frame quadro da imagem a ser exibido
 */
//% weight=70 help=images/show-frame
//% parts="ledmatrix"
void showFrame(Image i, int frame, int interval = 400) {
    showImage(i, frame * i->img->height, interval);
}
} // namespace ImageMethods