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
//% advanced=true block="IMAGENS"
namespace images {
/**
 * Cria uma imagem que se ajusta à tela de LEDs.
 */
    //% peso=75 ajuda=imagens/criar-imagem
    //% blockId=dispositivo_criar_imagem block="criar imagem"
    //% partes="matrizled"
Image createImage(ImageLiteral_ leds) {
    return NEW_GC(RefMImage, imageBytes(leds));
}

/**
 * Cria uma imagem com 2 quadros.
 */
    //% peso=74 ajuda=imagens/criar-imagem-grande
    //% blockId=dispositivo_criar_imagem_grande block="criar imagem grande" imageLiteral=2
    //% partes="matrizled"
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
 * Exibe a imagem em uma coluna dada na tela
 */
    //% ajuda=imagens/exibir-imagem
    //% partes="matrizled"
void plotImage(Image i, int xOffset = 0) {
    uBit.display.print(MicroBitImage(i->img), -xOffset, 0, 0, 0);
}

/**
 * Exibe um quadro da imagem no deslocamento ``x offset``.
 * @param xOffset índice da coluna para começar a exibir a imagem
 * @param interval tempo em milissegundos para pausar após desenhar
 */
//% ajuda=imagens/exibir-imagem weight=80 blockNamespace=imagens
//% blockId=device_show_image_offset block="exibir imagem %sprite(myImage)|no deslocamento %offset ||e intervalo (ms) %interval"
//% interval.defl=400
//% blockGap=8 partes="matrizled" assíncrono
void showImage(Image sprite, int xOffset, int interval = 400) {
    uBit.display.print(MicroBitImage(sprite->img), -xOffset, 0, 0, interval);
}

/**
 * Desenha o quadro ``index``-ésimo da imagem na tela.
 * @param xOffset índice da coluna para começar a exibir a imagem
 */
//% ajuda=imagens/desenhar-quadro weight=80
//% partes="matrizled"
void plotFrame(Image i, int xOffset) {
    // TODO showImage() used in original implementation
    plotImage(i, xOffset * i->img->height);
}

/**
 * Rola uma imagem.
 * @param frameOffset deslocamento x movido em cada passo de animação, ex: 1, 2, 5
 * @param interval tempo entre cada passo de animação em milissegundos, ex: 200
 */
//% ajuda=imagens/rolar-imagem weight=79 async blockNamespace=imagens
//% blockId=device_rolar_imagem
//% block="rolar imagem %sprite(minhaImagem)|com deslocamento %frameoffset|e intervalo (ms) %delay"
//% blockGap=8 partes="matrizled"
void scrollImage(Image id, int frameOffset, int interval) {
    MicroBitImage i(id->img);
    uBit.display.animate(i, interval, frameOffset, MICROBIT_DISPLAY_ANIMATE_DEFAULT_POS, 0);
}

/**
 * desligar todos os leds
 */
//% help=images/clear
//% parts="ledmatrix"
void clear(Image i) {
    i->makeWritable();
    MicroBitImage(i->img).clear();
}

/**
 * Define o brilho de um pixel específico em uma posição dada
 */
//%
//% parts="ledmatrix"
void setPixelBrightness(Image i, int x, int y, int value) {
    i->makeWritable();
    MicroBitImage(i->img).setPixelValue(x, y, value);
}

/**
 * Obtém o brilho do pixel ([0..255]) em uma posição dada
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
 * Gets the width in columns
 */
//% help=functions/width
int width(Image i) {
    return i->img->width;
}

/**
 * Gets the height in rows (always 5)
 */
//%
int height(Image i) {
    return i->img->height;
}

/**
 * Set a pixel state at position ``(x,y)``
 * @param x pixel column
 * @param y pixel row
 * @param value pixel state
 */
//% help=images/set-pixel
//% parts="ledmatrix"
void setPixel(Image i, int x, int y, bool value) {
    setPixelBrightness(i, x, y, value ? 255 : 0);
}

/**
 * Get the pixel state at position ``(x,y)``
 * @param x pixel column
 * @param y pixel row
 */
//% help=images/pixel
//% parts="ledmatrix"
bool pixel(Image i, int x, int y) {
    return pixelBrightness(i, x, y) > 0;
}

/**
 * Show a particular frame of the image strip.
 * @param frame image frame to show
 */
//% weight=70 help=images/show-frame
//% parts="ledmatrix"
void showFrame(Image i, int frame, int interval = 400) {
    showImage(i, frame * i->img->height, interval);
}
} // namespace ImageMethods