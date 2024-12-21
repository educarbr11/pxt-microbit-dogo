/*
The MIT License (MIT)

Copyright (c) 2013-2016 The MicroPython-on-micro:bit Developers, as listed
in the accompanying AUTHORS file

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Images from file microbitconstimage.cpp https://github.com/bbcmicrobit/micropython

enum IconNames {
    //% block="coração"
    //% jres=icons.heart
    Heart = 0,
    //% block="coração pequeno"
    //% jres=icons.smallheart
    SmallHeart,
    //% block="errado"
    //% jres=icons.yes
    Yes,
    //% block="incorreto"
    //% jres=icons.no
    No,
    //% block="feliz"
    //% jres=icons.happy
    Happy,
    //% block="triste"
    //% jres=icons.sad
    Sad,
    //% block="confuso"
    //% jres=icons.confused
    Confused,
    //% block="bravo"
    //% jres=icons.angry
    Angry,
    //% block="dormindo"
    //% jres=icons.asleep
    Asleep,
    //% block="surpreso"
    //% jres=icons.surprised
    Surprised,
    //% block="bobo"
    //% jres=icons.silly
    Silly,
    //% block="fabuloso"
    //% jres=icons.fabulous
    Fabulous,
    //% block="nojo"
    //% jres=icons.meh
    Meh,
    //% block="camiseta"
    //% jres=icons.tshirt
    TShirt,
    //% block="patins"
    //% jres=icons.rollerskate
    Rollerskate,
    //% block="pato"
    //% jres=icons.duck
    Duck,
    //% block="casa"
    //% jres=icons.house
    House,
    //% block="tartaruga"
    //% jres=icons.tortoise
    Tortoise,
    //% block="borboleta"
    //% jres=icons.butterfly
    Butterfly,
    //% block="boneco"
    //% jres=icons.stickfigure
    StickFigure,
    //% block="fantasma"
    //% jres=icons.ghost
    Ghost,
    //% block="espada"
    //% jres=icons.sword
    Sword,
    //% block="girafa"
    //% jres=icons.giraffe
    Giraffe,
    //% block="caveira"
    //% jres=icons.skull
    Skull,
    //% block="guarda-chuva"
    //% jres=icons.umbrella
    Umbrella,
    //% block="cobra"
    //% jres=icons.snake
    Snake,
    //% block="coelho"
    //% jres=icons.rabbit
    Rabbit,
    //% block="vaca"
    //% jres=icons.cow
    Cow,
    //% block="quarta nota"
    //% jres=icons.quarternote
    QuarterNote,
    //% block="oitava nota"
    //% jres=icons.eighthnote
    //% deprecated=true blockHidden=true
    EigthNote,
    //% block="nona nota"
    //% jres=icons.eighthnote
    EighthNote,
    //% block="garfo"
    //% jres=icons.pitchfork
    Pitchfork,
    //% block="alvo"
    //% jres=icons.target
    Target,
    //% block="triângulo"
    //% jres=icons.triangle
    Triangle,
    //% block="triângulo à esquerda"
    //% jres=icons.lefttriangle
    LeftTriangle,
    //% block="tabuleiro de xadrez"
    //% jres=icons.chessboard
    Chessboard,
    //% block="diamante"
    //% jres=icons.diamond
    Diamond,
    //% block="diamante pequeno"
    //% jres=icons.smalldiamond
    SmallDiamond,
    //% block="quadrado"
    //% jres=icons.square
    Square,
    //% block="quadrado pequeno"
    //% jres=icons.smallsquare
    SmallSquare,
    //% block="tesoura"
    //% jres=icons.scissors
    Scissors
}

enum ArrowNames {
    //% blockIdentity=images.arrowNumber block="Norte"
    North = 0,
    //% blockIdentity=images.arrowNumber block="Nordeste"
    NorthEast,
    //% blockIdentity=images.arrowNumber block="Leste"
    East,
    //% blockIdentity=images.arrowNumber block="Sudeste"
    SouthEast,
    //% blockIdentity=images.arrowNumber block="Sul"
    South,
    //% blockIdentity=images.arrowNumber block="Sudoeste"
    SouthWest,
    //% blockIdentity=images.arrowNumber block="Oeste"
    West,
    //% blockIdentity=images.arrowNumber block="Noroeste"
    NorthWest,
}

namespace basic {

    /**
     * Desenha o ícone selecionado na tela de LED
     * @param icon the predefined icon id
     * @param interval o tempo (em milissegundos) que o ícone será exibido. O padrão é 600.
     */
    //% weight=90 blockGap=8
    //% blockId=basic_show_icon
    //% block="mostrar ícone %i" icon="\uf00a"
    //% parts="ledmatrix"
    //% help=basic/show-icon
    //% icon.fieldEditor="imagedropdown"
    //% icon.fieldOptions.columns="5"
    //% icon.fieldOptions.width="380"
    //% icon.fieldOptions.maxRows=4
    export function showIcon(icon: IconNames, interval = 600) {
        let res = images.iconImage(icon)
        res.showImage(0, interval)
    }

    /**
     * Draws an arrow on the LED screen
     * @param direction the direction of the arrow
     * @param interval o tempo (em milissegundos) que o ícone será exibido. O padrão é 600.
     */
    //% weight=50 blockGap=8
    //% blockId=basic_show_arrow
    //% block="mostrar a seta %i=device_arrow"
    //% parts="ledmatrix"
    //% help=basic/show-arrow
    export function showArrow(direction: number, interval = 600) {
        let res = images.arrowImage(direction)
        res.showImage(0, interval)
    }
}


namespace images {

    //% weight=50 blockGap=8
    //% help=images/arrow-image
    //% blockId=builtin_arrow_image block="arrow image %i"
    export function arrowImage(i: ArrowNames): Image {
        switch (i) {
            // compass directions
            case ArrowNames.North: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # . # . #
                                        . . # . .
                                        . . # . .`);
            case ArrowNames.NorthEast: return images.createImage(`
                                        . . # # #
                                        . . . # #
                                        . . # . #
                                        . # . . .
                                        # . . . .`);
            case ArrowNames.East: return images.createImage(`
                                        . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .`);
            case ArrowNames.SouthEast: return images.createImage(`
                                        # . . . .
                                        . # . . .
                                        . . # . #
                                        . . . # #
                                        . . # # #`);
            case ArrowNames.South: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        # . # . #
                                        . # # # .
                                        . . # . .`);
            case ArrowNames.SouthWest: return images.createImage(`
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        # # . . .
                                        # # # . .`);
            case ArrowNames.West: return images.createImage(`
                                        . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .`);
            case ArrowNames.NorthWest: return images.createImage(`
                                        # # # . .
                                        # # . . .
                                        # . # . .
                                        . . . # .
                                        . . . . #`);
            default: return images.createImage(`
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `);
        }
    }

    //% weight=50 blockGap=8
    //% help=images/icon-image
    //% blockId=builtin_image block="imagem de ícone %i"
    //% i.fieldEditor="imagedropdown"
    //% i.fieldOptions.columns="5"
    //% i.fieldOptions.width="380"
    //% i.fieldOptions.maxRows=4
    export function iconImage(i: IconNames): Image {
        switch (i) {
            case IconNames.Heart: return images.createImage(`
                                        . # . # .
                                        # # # # #
                                        # # # # #
                                        . # # # .
                                        . . # . .`);

            case IconNames.SmallHeart: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . # # # .
                                        . . # . .
                                        . . . . .`);
            //faces
            case IconNames.Happy: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        # . . . #
                                        . # # # .`);
            case IconNames.Sad: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # # # .
                                        # . . . #`);
            case IconNames.Confused: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # . # .
                                        # . # . #`);
            case IconNames.Angry: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . . . .
                                        # # # # #
                                        # . # . #`);
            case IconNames.Asleep: return images.createImage(`
                                        . . . . .
                                        # # . # #
                                        . . . . .
                                        . # # # .
                                        . . . . .`);
            case IconNames.Surprised: return images.createImage(`
                                        . # . # .
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .`);
            case IconNames.Silly: return images.createImage(`
                                        # . . . #
                                        . . . . .
                                        # # # # #
                                        . . . # #
                                        . . . # #`);
            case IconNames.Fabulous: return images.createImage(`
                                        # # # # #
                                        # # . # #
                                        . . . . .
                                        . # . # .
                                        . # # # .`);
            case IconNames.Meh: return images.createImage(`
                                        # # . # #
                                        . . . . .
                                        . . . # .
                                        . . # . .
                                        . # . . .`);
            case IconNames.Yes: return images.createImage(`
                                        . . . . .
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        . # . . .`);
            case IconNames.No: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #`);
            case IconNames.Triangle: return images.createImage(`
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        # # # # #
                                        . . . . .`);
            case IconNames.LeftTriangle: return images.createImage(`
                                        # . . . .
                                        # # . . .
                                        # . # . .
                                        # . . # .
                                        # # # # #`);
            case IconNames.Chessboard: return images.createImage(`
                                        . # . # .
                                        # . # . #
                                        . # . # .
                                        # . # . #
                                        . # . # .`);
            case IconNames.Diamond: return images.createImage(`
                                        . . # . .
                                        . # . # .
                                        # . . . #
                                        . # . # .
                                        . . # . .`);
            case IconNames.SmallDiamond: return images.createImage(`
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .
                                        . . . . .`);
            case IconNames.Square: return images.createImage(`
                                        # # # # #
                                        # . . . #
                                        # . . . #
                                        # . . . #
                                        # # # # #`);
            case IconNames.SmallSquare: return images.createImage(`
                                        . . . . .
                                        . # # # .
                                        . # . # .
                                        . # # # .
                                        . . . . .`);

            case IconNames.Scissors: return images.createImage(`
                                        # # . . #
                                        # # . # .
                                        . . # . .
                                        # # . # .
                                        # # . . #`);
            // The following images were designed by Abbie Brooks.
            case IconNames.TShirt: return images.createImage(`
                                        # # . # #
                                        # # # # #
                                        . # # # .
                                        . # # # .
                                        . # # # .`);
            case IconNames.Rollerskate: return images.createImage(`
                                        . . . # #
                                        . . . # #
                                        # # # # #
                                        # # # # #
                                        . # . # .`);
            case IconNames.Duck: return images.createImage(`
                                        . # # . .
                                        # # # . .
                                        . # # # #
                                        . # # # .
                                        . . . . .`);
            case IconNames.House: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # # # # #
                                        . # # # .
                                        . # . # .`);
            case IconNames.Tortoise: return images.createImage(`
                                        . . . . .
                                        . # # # .
                                        # # # # #
                                        . # . # .
                                        . . . . .`);
            case IconNames.Butterfly: return images.createImage(`
                                        # # . # #
                                        # # # # #
                                        . . # . .
                                        # # # # #
                                        # # . # #`);
            case IconNames.StickFigure: return images.createImage(`
                                        . . # . .
                                        # # # # #
                                        . . # . .
                                        . # . # .
                                        # . . . #`);
            case IconNames.Ghost: return images.createImage(`
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        # # # # #
                                        # . # . #`);
            case IconNames.Sword: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        . # # # .
                                        . . # . .`);
            case IconNames.Giraffe: return images.createImage(`
                                        # # . . .
                                        . # . . .
                                        . # . . .
                                        . # # # .
                                        . # . # .`);
            case IconNames.Skull: return images.createImage(`
                                        . # # # .
                                        # . # . #
                                        # # # # #
                                        . # # # .
                                        . # # # .`);
            case IconNames.Umbrella: return images.createImage(`
                                        . # # # .
                                        # # # # #
                                        . . # . .
                                        # . # . .
                                        # # # . .`);
            case IconNames.Snake: return images.createImage(`
                                        # # . . .
                                        # # . # #
                                        . # . # .
                                        . # # # .
                                        . . . . .`);
            // animals
            case IconNames.Rabbit: return images.createImage(`
                                        # . # . .
                                        # . # . .
                                        # # # # .
                                        # # . # .
                                        # # # # .`);
            case IconNames.Cow: return images.createImage(`
                                        # . . . #
                                        # . . . #
                                        # # # # #
                                        . # # # .
                                        . . # . .`);
            // musical notes
            case IconNames.QuarterNote: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        . . # . .
                                        # # # . .
                                        # # # . .`);
            case IconNames.EighthNote: return images.createImage(`
                                        . . # . .
                                        . . # # .
                                        . . # . #
                                        # # # . .
                                        # # # . .`);
            case IconNames.EigthNote: return images.createImage(`
                                        . . # . .
                                        . . # # .
                                        . . # . #
                                        # # # . .
                                        # # # . .`);
            // other icons
            case IconNames.Pitchfork: return images.createImage(`
                                        # . # . #
                                        # . # . #
                                        # # # # #
                                        . . # . .
                                        . . # . .`);
            case IconNames.Target: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # # . # #
                                        . # # # .
                                        . . # . .`);
            default: return images.createImage(`
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `);
        }
    }

    //% weight=50 blockGap=8
    //% help=images/arrow-number
    //% blockId=device_arrow block="%arrow"
    //% shim=TD_ID
    export function arrowNumber(arrow: ArrowNames): number {
        return arrow;
    }
}
