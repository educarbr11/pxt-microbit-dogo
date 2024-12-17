// Auto-generated. Do not edit.


    /**
     * Creation, manipulation and display of LED images.
     */
    //% color=#7600A8 weight=31 icon="\uf03e"
    //% advanced=true block="IMAGENS"
declare namespace images {

    /**
     * Cria uma imagem que se ajusta à tela de LEDs.
     */
    //% peso=75 ajuda=imagens/criar-imagem
    //% blockId=dispositivo_criar_imagem block="criar imagem"
    //% partes="matrizled" imageLiteral=1 shim=images::createImage
    function createImage(leds: string): Image;

    /**
     * Cria uma imagem com 2 quadros.
     */
    //% peso=74 ajuda=imagens/criar-imagem-grande
    //% blockId=dispositivo_criar_imagem_grande block="criar imagem grande" imageLiteral=2
    //% partes="matrizled" shim=images::createBigImage
    function createBigImage(leds: string): Image;
}


declare interface Image {
    /**
     * Exibe a imagem em uma coluna dada na tela
     */
    //% ajuda=imagens/exibir-imagem
    //% partes="matrizled" xOffset.defl=0 shim=ImageMethods::plotImage
    plotImage(xOffset?: int32): void;

    /**
     * Exibe um quadro da imagem no deslocamento ``x offset``.
     * @param xOffset índice da coluna para começar a exibir a imagem
     * @param interval tempo em milissegundos para pausar após desenhar
     */
    //% ajuda=imagens/exibir-imagem weight=80 blockNamespace=imagens
    //% blockId=device_show_image_offset block="exibir imagem %sprite(myImage)|no deslocamento %offset ||e intervalo (ms) %interval"
    //%
    //% blockGap=8 partes="matrizled" assíncrono interval.defl=400 shim=ImageMethods::showImage
    showImage(xOffset: int32, interval?: int32): void;

    /**
     * Desenha o quadro ``index``-ésimo da imagem na tela.
     * @param xOffset índice da coluna para começar a exibir a imagem
     */
    //% ajuda=imagens/desenhar-quadro weight=80
    //% partes="matrizled" shim=ImageMethods::plotFrame
    plotFrame(xOffset: int32): void;

    /**
     * Rola uma imagem.
     * @param frameOffset deslocamento x movido em cada passo de animação, ex: 1, 2, 5
     * @param interval tempo entre cada passo de animação em milissegundos, ex: 200
     */
    //% ajuda=imagens/rolar-imagem weight=79 async blockNamespace=imagens
    //% blockId=device_rolar_imagem
    //% block="rolar imagem %sprite(minhaImagem)|com deslocamento %frameoffset|e intervalo (ms) %delay"
    //% blockGap=8 partes="matrizled" shim=ImageMethods::scrollImage
    scrollImage(frameOffset: int32, interval: int32): void;

    /**
     * desligar todos os leds
     */
    //% help=images/clear
    //% parts="ledmatrix" shim=ImageMethods::clear
    clear(): void;

    /**
     * Define o brilho de um pixel específico em uma posição dada
     */
    //%
    //% parts="ledmatrix" shim=ImageMethods::setPixelBrightness
    setPixelBrightness(x: int32, y: int32, value: int32): void;

    /**
     * Obtém o brilho do pixel ([0..255]) em uma posição dada
     */
    //%
    //% parts="ledmatrix" shim=ImageMethods::pixelBrightness
    pixelBrightness(x: int32, y: int32): int32;

    /**
     * Gets the width in columns
     */
    //% help=functions/width shim=ImageMethods::width
    width(): int32;

    /**
     * Gets the height in rows (always 5)
     */
    //% shim=ImageMethods::height
    height(): int32;

    /**
     * Set a pixel state at position ``(x,y)``
     * @param x pixel column
     * @param y pixel row
     * @param value pixel state
     */
    //% help=images/set-pixel
    //% parts="ledmatrix" shim=ImageMethods::setPixel
    setPixel(x: int32, y: int32, value: boolean): void;

    /**
     * Get the pixel state at position ``(x,y)``
     * @param x pixel column
     * @param y pixel row
     */
    //% help=images/pixel
    //% parts="ledmatrix" shim=ImageMethods::pixel
    pixel(x: int32, y: int32): boolean;

    /**
     * Show a particular frame of the image strip.
     * @param frame image frame to show
     */
    //% weight=70 help=images/show-frame
    //% parts="ledmatrix" interval.defl=400 shim=ImageMethods::showFrame
    showFrame(frame: int32, interval?: int32): void;
}


    /**
     * Dá acesso às funções básicas do micro:bit.
     */
    //% color=#1E90FF weight=116 icon="\uf00a"
declare namespace basic {

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
    //% parts="ledmatrix" interval.defl=400 shim=basic::showLeds
    function showLeds(leds: string, interval?: int32): void;

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
    //% text.shadowOptions.toString=true interval.defl=150 shim=basic::showString
    function showString(text: string, interval?: int32): void;

    /**
     * Desligar todos os LEDs
     */
    //% help=basic/clear-screen weight=79
    //% blockId=device_clear_display block="limpar tela"
    //% parts="ledmatrix" shim=basic::clearScreen
    function clearScreen(): void;

    /**
     * Exibe uma sequência de telas de LED como uma animação.
     * @param leds padrão de LEDs para ligar/desligar
     * @param interval tempo em milissegundos entre cada redesenho
     */
    //% help=basic/show-animation imageLiteral=1 async
    //% parts="ledmatrix" interval.defl=400 shim=basic::showAnimation
    function showAnimation(leds: string, interval?: int32): void;

    /**
     * Desenha uma imagem na tela de LED.
     * @param leds padrão de LEDs para ligar/desligar
     */
    //% help=basic/plot-leds weight=80
    //% parts="ledmatrix" imageLiteral=1 shim=basic::plotLeds
    function plotLeds(leds: string): void;

    /**
     * Repete o código em segundo plano sem parar. A cada repetição, permite que outros códigos sejam executados.
     * @param body código para executar
     */
    //% help=basic/forever weight=55 blockGap=16 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="fazer sempre" icon="\uf01e" shim=basic::forever
    function forever(a: () => void): void;

    /**
     * Pausa por um período especificado em milissegundos
     * @param ms a duração da pausa, por exemplo: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="esperar (ms) %pause" blockGap=16
    //% blockId=device_pause icon="\uf110"
    //% pause.shadow=timePicker shim=basic::pause
    function pause(ms: int32): void;
}



    //% color=#D400D4 weight=111 icon="\uf192"
declare namespace input {

    /**
     * Fazer algo quando um botão (A, B ou A + B) for pressionado e liberado novamente.
     * @param button o botão que precisa ser pressionado
     * @param body código a ser executado quando o evento for criado
     */
    //% help=input/on-button-pressed weight=85 blockGap=16
    //% blockId=device_button_event block="quando o botão|%NAME|for pressionado"
    //% parts="buttonpair" shim=input::onButtonPressed
    function onButtonPressed(button: Button, body: () => void): void;

    /**
     * Fazer algo quando um gesto for concluído (com agitar o micro:bit)
     * @param gesture o tipo de gesto a monitorar, por exemplo: Gesture.Shake
     * @param body código a ser executado quando o gesto for criado
     */
    //% help=input/on-gesture weight=84 blockGap=16
    //% blockId=device_gesture_event block="quando |%NAME"
    //% parts="accelerometer"
    //% NAME.fieldEditor="gestures" NAME.fieldOptions.columns=4 shim=input::onGesture
    function onGesture(gesture: Gesture, body: () => void): void;

    /**
     * Testa se um gesto foi detectado no momento.
     * @param gesture the type of gesture to detect, eg: Gesture.Shake
     */
    //% help=input/is-gesture weight=10 blockGap=8
    //% blockId=deviceisgesture block="o gesto é %gesture"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gestures" gesture.fieldOptions.columns=4 shim=input::isGesture
    function isGesture(gesture: Gesture): boolean;

    /**
     * Fazer algo quando um pin for tocado e liberado novamente (enquanto também toca no pin GND).
     * @param name o pino que precisa ser pressionado. por exemplo: TouchPin.P0
     * @param body o código a ser executado quando o pino é pressionado
     */
    //% help=input/on-pin-pressed weight=83 blockGap=32
    //% blockId=device_pin_event block="quando pino %name| ativado" shim=input::onPinPressed
    function onPinPressed(name: TouchPin, body: () => void): void;

    /**
     * Fazer algo quando o pino for liberado.
     * @param name o pino que precisa ser desativado, por exemplo: TouchPin.P0
     * @param body o código a ser executado quando o pino é desativado
     */
    //% help=input/on-pin-released weight=6 blockGap=16
    //% blockId=device_pin_released block="quando pino %NAME|desativado" shim=input::onPinReleased
    function onPinReleased(name: TouchPin, body: () => void): void;

    /**
     * Obter o estado do botão (pressionado ou não) para ``A`` e ``B``.
     * @param button o botão para consultar a solicitação, por exemplo: Botão.A
     */
    //% help=input/button-is-pressed weight=60
    //% block="botão|%NAME|pressionado"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8
    //% parts="buttonpair" shim=input::buttonIsPressed
    function buttonIsPressed(button: Button): boolean;

    /**
     * Obter o estado do pino (ativado ou não). Requer manter o chão para fechar o circuito.
     * @param name pino utilizado para detectar o toque, por exemplo: TouchPin.P0
     */
    //% help=input/pin-is-pressed weight=58
    //% blockId="device_pin_is_pressed" block="pino %NAME| ativado"
    //% blockGap=8 shim=input::pinIsPressed
    function pinIsPressed(name: TouchPin): boolean;

    /**
     * Obter o valor de aceleração em mili-gravidade (quando a placa está na posição horizontal com a tela para cima, x=0, y=0 e z=1024)
     * @param dimension x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/acceleration weight=58
    //% blockId=device_acceleration block="força de aceleração (ma)|%NAME" blockGap=8
    //% parts="accelerometer" shim=input::acceleration
    function acceleration(dimension: Dimension): int32;

    /**
     * Lê o nível de luz aplicado à tela de LED em um alcance de ``0`` (escuro) a ``255`` (claro).
     */
    //% help=input/light-level weight=57
    //% blockId=device_get_light_level block="nível de luz" blockGap=8
    //% parts="ledmatrix" shim=input::lightLevel
    function lightLevel(): int32;

    /**
     * Obter a orientação atual em graus.
     */
    //% help=input/compass-heading
    //% weight=56
    //% blockId=device_heading block="direção da bússola (°)" blockGap=8
    //% parts="compass" shim=input::compassHeading
    function compassHeading(): int32;

    /**
     * Obtém a temperatura em graus Celsius (°C).
     */
    //% weight=55
    //% help=input/temperature
    //% blockId=device_temperature block="temperatura (°C)" blockGap=8
    //% parts="thermometer" shim=input::temperature
    function temperature(): int32;

    /**
     * O ajuste ou rotação do dispositivo, girando ao longo do ``eixo-x`` ou ``eixo-y``, em graus.
     * @param kind pitch or roll
     */
    //% help=input/rotation weight=52
    //% blockId=device_get_rotation block="rotação (°)|%NAME" blockGap=8
    //% parts="accelerometer" shim=input::rotation
    function rotation(kind: Rotation): int32;

    /**
     * Obter o valor da força magnética em ``micro-Teslas`` (``µT``). Esta função não é suportada no simulador.
     * @param dimension the x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/magnetic-force weight=54
    //% blockId=device_get_magnetic_force block="força magnética (µT)|%NAME" blockGap=8
    //% parts="compass" shim=input::magneticForce
    function magneticForce(dimension: Dimension): number;

    /**
     * Obsoleto, a calibração da bússola é automática.
     */
    //% help=input/calibrate-compass
    //% blockId="input_compass_calibrate" block="calibrar bússola"
    //% weight=55 shim=input::calibrateCompass
    function calibrateCompass(): void;

    /**
     * Define o intervalo da amostra do acelerómetro em gravidades.
     * @param range um valor descreve a força máxima da aceleração medida
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="definir o acelerômetro|alcance %range"
    //% weight=5
    //% parts="accelerometer" shim=input::setAccelerometerRange
    function setAccelerometerRange(range: AcceleratorRange): void;
}



    //% weight=1 color="#333333"
    //% advanced=true
declare namespace control {

    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=control/millis weight=50
    //% blockId=control_running_time block="millis (ms)" shim=control::millis
    function millis(): int32;

    /**
     * Gets current time in microseconds. Overflows every ~18 minutes.
     */
    //% shim=control::micros
    function micros(): int32;

    /**
     * Agenda o código para ser executado em segundo plano.
     */
    //% help=control/in-background blockAllowMultiple=1 afterOnStart=true
    //% blockId="control_in_background" block="executar em segundo plano" blockGap=8 shim=control::inBackground
    function inBackground(a: () => void): void;

    /**
     * Bloqueia o thread chamador até que o evento especificado seja gerado.
     */
    //% ajuda=controle/aguardar-por-evento assíncrono
    //% blockId=controle_aguardar_por_evento bloco="aguardar por evento|de %src|com valor %value" shim=control::waitForEvent
    function waitForEvent(src: int32, value: int32): void;

    /**
     * Reiniciar BBC micro:bit.
     */
    //% weight=30 async help=control/reset blockGap=8
    //% blockId="control_reset" block="reiniciar" shim=control::reset
    function reset(): void;

    /**
     * Bloqueia a fibra atual pelos microsegundos especificados
     * @param micros número de microsegundos a aguardar. Ex: 4
     */
    //% ajuda=controle/aguardar-micros peso=29 assíncrono
    //% blockId="controle_aguardar_us" bloco="aguardar (µs)%micros"
    //% micros.min=0 micros.max=6000 shim=control::waitMicros
    function waitMicros(micros: int32): void;

    /**
     * Dispara um evento no barramento de eventos.
     * @param src ID do componente MicroBit que gerou o evento, por exemplo, MICROBIT_ID_BUTTON_A.
     * @param value Código específico do componente que indica a causa do evento.
     * @param mode definição opcional de como o evento deve ser processado após a criação (o padrão é CREATE_AND_FIRE).
     */
    //% peso=21 espaçoEntreBlocos=12 blockId="controle_disparar_evento" bloco="disparar evento|de origem %src=controle_evento_origem_id|com valor %value=controle_evento_valor_id" entradasExternasBloco=1
    //% ajuda=controle/disparar-evento
    //% mode.defl=1 shim=control::raiseEvent
    function raiseEvent(src: int32, value: int32, mode?: EventCreationMode): void;

    /**
     * Registra um manipulador de eventos.
     */
    //% peso=20 espaçoEntreBlocos=8 blockId="controle_on_evento" bloco="quando evento|de origem %src=controle_evento_origem_id|com valor %value=controle_evento_valor_id"
    //% ajuda=controle/quando-evento
    //% entradasExternasBloco=1 flags.defl=0 shim=control::onEvent
    function onEvent(src: int32, value: int32, handler: () => void, flags?: int32): void;

    /**
     * Obtém o valor do último evento executado no barramento
     */
    //% blockId=controle_valor_evento" bloco="valor do evento"
    //% ajuda=controle/valor-evento
    //% peso=18 shim=control::eventValue
    function eventValue(): int32;

    /**
     * Obtém o carimbo de data e hora do último evento executado no barramento
     */
    //% blockId=controle_carimbo_evento" bloco="carimbo do evento"
    //% ajuda=controle/carimbo-evento
    //% peso=19 blocoGap=8 shim=control::eventTimestamp
    function eventTimestamp(): int32;

    /**
     * Cria um nome amigável para o dispositivo com base no seu número de série
     */
    //% blockId="controle_nome_dispositivo" block="nome do dispositivo" peso=10 blocoGap=8
    //% ajuda=controle/nome-dispositivo
    //% avançado=true shim=control::deviceName
    function deviceName(): string;

    /**
     * Returns the major version of the microbit
     */
    //% help=control/hardware-version shim=control::_hardwareVersion
    function _hardwareVersion(): string;

    /**
     * Deriva um número de série único e consistente para este dispositivo a partir de dados internos.
     */
    //% blockId="controle_numero_serie_dispositivo" block="número de série do dispositivo" peso=9
    //% ajuda=controle/numeros-de-serie-dispositivo
    //% avançado=true shim=control::deviceSerialNumber
    function deviceSerialNumber(): int32;

    /**
     * Deriva um número de série único e consistente de 64 bits para este dispositivo a partir de dados internos.
     */
    //% ajuda=controle/dispositivo-numero-serial-longo
    //% avançado=true shim=control::deviceLongSerialNumber
    function deviceLongSerialNumber(): Buffer;

    /**
     * Informs simulator/runtime of a MIDI message
     * Internal function to support the simulator.
     */
    //% part=midioutput blockHidden=1 shim=control::__midiSend
    function __midiSend(buffer: Buffer): void;

    /**
     *
     */
    //% shim=control::__log
    function __log(priority: int32, text: string): void;

    /**
     * Allocates the next user notification event
     */
    //% help=control/allocate-notify-event shim=control::allocateNotifyEvent
    function allocateNotifyEvent(): int32;

    /** Write a message to DMESG debugging buffer. */
    //% shim=control::dmesg
    function dmesg(s: string): void;

    /** Write a message and value (pointer) to DMESG debugging buffer. */
    //% shim=control::dmesgPtr
    function dmesgPtr(str: string, ptr: Object): void;
}
declare namespace control {

    /**
     * Force GC and dump basic information about heap.
     */
    //% shim=control::gc
    function gc(): void;

    /**
     * Force GC and halt waiting for debugger to do a full heap dump.
     */
    //% shim=control::heapDump
    function heapDump(): void;

    /**
     * Set flags used when connecting an external debugger.
     */
    //% shim=control::setDebugFlags
    function setDebugFlags(flags: int32): void;

    /**
     * Record a heap snapshot to debug memory leaks.
     */
    //% shim=control::heapSnapshot
    function heapSnapshot(): void;

    /**
     * Return true if profiling is enabled in the current build.
     */
    //% shim=control::profilingEnabled
    function profilingEnabled(): boolean;
}



    //% color=#7600A8 weight=101 icon="\uf205"
declare namespace led {

    /**
     * Ligar o LED especificado ao utilizar coordenadas x, y (x é horizontal, y é vertical). (0,0) é é a parte superior esquerda.
     * @param x a coordenada horizontal do LED começando em 0
     * @param y a coordenada vertical do LED começando em 0
     */
    //% help=led/plot weight=78
    //% blockId=device_plot block="ligar led em|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1 shim=led::plot
    function plot(x: int32, y: int32): void;

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
    //% advanced=false shim=led::plotBrightness
    function plotBrightness(x: int32, y: int32, brightness: int32): void;

    /**
     * Desligar o LED especificado ao utilizar coordenadas x, y (x é horizontal, y é vertical). (0,0) é é a parte superior esquerda.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/unplot weight=77
    //% blockId=device_unplot block="apagar led em|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1 shim=led::unplot
    function unplot(x: int32, y: int32): void;

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
    //% advanced=false shim=led::pointBrightness
    function pointBrightness(x: int32, y: int32): int32;

    /**
     * Obtém o brilho da tela de 0 (desligado) a 255 (brilho total).
     */
    //% help=led/brightness weight=60
    //% blockId=device_get_brightness block="brilho do led" blockGap=8
    //% parts="ledmatrix"
    //% advanced=false shim=led::brightness
    function brightness(): int32;

    /**
     * Define o brilho de tela de 0 (desligada) até 255 (brilho total).
     * @param value intensidade do brilho, eg:255, 127, 0
     */
    //% help=led/set-brightness weight=59
    //% blockId=device_set_brightness block="definir brilho do led %value"
    //% parts="ledmatrix"
    //% advanced=false
    //% value.min=0 value.max=255 shim=led::setBrightness
    function setBrightness(value: int32): void;

    /**
     * Cancela a animação atual e limpa outras animações pendentes.
     */
    //% weight=50 help=led/stop-animation
    //% blockId=device_stop_animation block="parar animação de led"
    //% parts="ledmatrix"
    //% advanced=false shim=led::stopAnimation
    function stopAnimation(): void;

    /**
     * Define o modo de exibição entre preto e branco e tons de cinza para a renderização de LEDs.
     * @param mode modo de exibição no qual a tela opera
     */
    //% weight=1 help=led/set-display-mode
    //% parts="ledmatrix" advanced=false weight=1
    //% blockId="led_set_display_mode" block="definir modo de exibição $mode" shim=led::setDisplayMode
    function setDisplayMode(mode: DisplayMode): void;

    /**
     * Obtém o modo de exibição atual
     */
    //% weight=1 parts="ledmatrix" advanced=false shim=led::displayMode
    function displayMode(): DisplayMode;

    /**
     * Liga ou desliga a tela
     */
    //% help=led/enable blockId=device_led_enable block="led ativado? %on"
    //% advanced=false parts="ledmatrix" shim=led::enable
    function enable(on: boolean): void;

    /**
     * Faz uma captura de tela da tela de LED e retorna uma imagem.
     */
    //% help=led/screenshot
    //% parts="ledmatrix" shim=led::screenshot
    function screenshot(): Image;
}
declare namespace music {

    /**
     * Define a intensidade do volume de 0 até 255
     * @param volume o volume de 0 até 255
     */
    //% blockId=synth_set_volume block="definir volume %volume"
    //% volume.min=0 volume.max=255
    //%
    //% help=music/set-volume
    //% weight=70
    //% group="Volume"
    //% blockGap=8 volume.defl=127 shim=music::setVolume
    function setVolume(volume?: int32): void;

    /**
     * Retorna o volume de saída atual do sintetizador de som.
     */
    //% blockId=synth_get_volume block="volume"
    //% help=music/volume
    //% weight=69
    //% group="Volume"
    //% blockGap=8 shim=music::volume
    function volume(): int32;

    /**
     * Ligue ou desligue o alto-falante integrado.
     * Desativar o alto-falante redefine o pino de som para o padrão P0.
     * @param enabled se o alto-falante embutido está habilitado além do pino de som
     */
    //% blockId=music_set_built_in_speaker_enable block="definir alto-falante embutido $enabled"
    //% group="micro:bit (V2)"
    //% parts=builtinspeaker
    //% help=music/set-built-in-speaker-enabled
    //% enabled.shadow=toggleOnOff
    //% weight=0 shim=music::setBuiltInSpeakerEnabled
    function setBuiltInSpeakerEnabled(enabled: boolean): void;

    /**
     * Verifique se algum som está sendo reproduzido, independentemente da fonte
     */
    //% blockId=music_sound_is_playing block="som tocando"
    //% group="micro:bit (V2)"
    //% help=music/is-sound-playing
    //% weight=0 shim=music::isSoundPlaying
    function isSoundPlaying(): boolean;

    /**
     * Defines an optional sample level to generate during periods of silence.
     **/
    //% group="micro:bit (V2)"
    //% help=music/set-silence-level
    //% level.min=0
    //% level.max=1024
    //%
    //% weight=1 level.defl=0 shim=music::setSilenceLevel
    function setSilenceLevel(level?: int32): void;
}
declare namespace pins {

    /**
     * Leia o pino ou conector especificado como 0 ou 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="ler pino digital %name" blockGap=8
    //% name.shadow=digital_pin_shadow shim=pins::digitalReadPin
    function digitalReadPin(name: int32): int32;

    /**
     * Define o valor de um pino ou conector como 0 ou 1.
     * @param name pino para escrever o valor, ex: DigitalPin.P0
     * @param value valor a ser definido no pino, 1 ex, 0
     */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="mudar pino digital %name|para %value"
    //% value.min=0 value.max=1
    //% name.shadow=digital_pin_shadow shim=pins::digitalWritePin
    function digitalWritePin(name: int32, value: int32): void;

    /**
     * Lê o valor do conector como analógico, ou seja, como um valor entre 0 e 1023.
     * @param name pino para ler, ex: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="ler pino analógico %name" blockGap="8"
    //% name.shadow=analog_read_write_pin_shadow shim=pins::analogReadPin
    function analogReadPin(name: int32): int32;

    /**
     * Define o valor do conector como analógico. O valor deve estar entre 0 e 1023.
     * @param name nome do pino para escrever, ex: AnalogPin.P0
     * @param value valor para escrever no pino entre ``0`` e ``1023``. ex: 1023, 0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="mudar pino analógico %name|para %value" blockGap=8
    //% value.min=0 value.max=1023
    //% name.shadow=analog_pin_shadow shim=pins::analogWritePin
    function analogWritePin(name: int32, value: int32): void;

    /**
     * Configura o período de modulação por largura de pulso (PWM) da saída analógica em microssegundos.
     * Se este pino não estiver configurado como saída analógica (usando `escrita analógica pino`), a operação não terá efeito.
     * @param name pino analógico para definir o período, ex: AnalogPin.P0
     * @param micros período em microssegundos. ex: 20000
     */
    //% help=pins/analog-set-period weight=23 blockGap=8
    //% blockId=device_set_analog_period block="definir período analógico no pino %pin|para (ms)%micros"
    //% pin.shadow=analog_pin_shadow shim=pins::analogSetPeriod
    function analogSetPeriod(name: int32, micros: int32): void;

    /**
     * Configura o pino como uma entrada digital e gera um evento quando o pino recebe um pulso, seja em nível alto ou baixo.
     * @param name pino digital para registrar, ex: DigitalPin.P0
     * @param pulse o valor do pulso, ex: PulseValue.High
     */
    //% help=pins/on-pulsed advanced=true
    //% blockId=pins_on_pulsed block="no|pino %pin|receber pulso %pulse"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Pulso"
    //% weight=25
    //% blockGap=8 shim=pins::onPulsed
    function onPulsed(name: DigitalPin, pulse: PulseValue, body: () => void): void;

    /**
     * Obtém a duração do último pulso em microssegundos. Esta função deve ser chamada a partir de um manipulador ``onPulsed``.
     */
    //% help=pins/pulse-duration advanced=true
    //% blockId=pins_pulse_duration block="duração do pulso (ms)"
    //% group="Pulso"
    //% weight=24
    //% blockGap=8 shim=pins::pulseDuration
    function pulseDuration(): int32;

    /**
     * Retorna a duração de um pulso em um pino em microssegundos.
     * @param name o pino que mede o pulso, por exemplo: DigitalPin.P0
     * @param value o valor do pulso, por exemplo: PulseValue.High
     * @param maximum duração máxima em microssegundos
     */
    //% blockId="pins_pulse_in" block="pulso no (µs)|pino %name|pulso %value"
    //% advanced=true
    //% help=pins/pulse-in
    //% name.shadow=digital_pin_shadow
    //% group="Pulso"
    //% weight=23
    //% blockGap=8 maxDuration.defl=2000000 shim=pins::pulseIn
    function pulseIn(name: int32, value: PulseValue, maxDuration?: int32): int32;

    /**
     * Escreve um valor no servo, controlando o eixo de acordo. Em um servo padrão, isso ajustará o ângulo do eixo (em graus), movendo-o para essa orientação. Em um servo de rotação contínua, isso ajustará a velocidade do servo (com ``0`` sendo a velocidade máxima em uma direção, ``180`` sendo a velocidade máxima na outra direção, e um valor próximo a ``90`` representando nenhuma movimentação).
     * @param name pino para escrever, por exemplo: AnalogPin.P0
     * @param value ângulo ou velocidade de rotação, por exemplo: 180, 90, 0
     */
    //% help=pins/servo-write-pin weight=20
    //% blockId=device_set_servo_pin block="ajustar servo motor no|pino %name|para %value" blockGap=8
    //% parts=microservo trackArgs=0
    //% value.min=0 value.max=180
    //% name.shadow=analog_pin_shadow
    //% group="Servo" shim=pins::servoWritePin
    function servoWritePin(name: int32, value: int32): void;

    /**
     * Especifica que um servo contínuo está conectado.
     */
    //% shim=pins::servoSetContinuous
    function servoSetContinuous(name: int32, value: boolean): void;

    /**
     * Configura o pino de E/S como uma saída analógica/PWM e ajusta uma largura de pulso. O período é de 20 ms, e a largura do pulso é definida com base no valor fornecido em **microsegundos** ou `1/1000` milissegundos.
     * @param name nome do pino
     * @param micros duração do pulso em microsegundos, por exemplo: 1500
     */
    //% help=pins/servo-set-pulse weight=19
    //% blockId=device_set_servo_pulse block="configurar pulso do servo no|pino %value|para (µs) %micros"
    //% value.shadow=analog_pin_shadow
    //% group="Servo" shim=pins::servoSetPulse
    function servoSetPulse(name: int32, micros: int32): void;

    /**
     * Set the pin used when using analog pitch or music.
     * @param name pin to modulate pitch from
     */
    //% blockId=device_analog_set_pitch_pin block="analog set pitch pin %name"
    //% help=pins/analog-set-pitch-pin advanced=true
    //% name.shadow=analog_pin_shadow
    //% group="Pins"
    //% weight=12
    //% blockGap=8 shim=pins::analogSetPitchPin
    function analogSetPitchPin(name: int32): void;

    /**
     * Define o pino usado ao utilizar pitch analógico ou música.
     * @param name pino para modular o pitch
     */
    //% blockId=device_analog_set_pitch_pin block="analógico definir pino de pitch %name"
    //% help=pins/analog-set-pitch-pin advanced=true
    //% name.shadow=analog_pin_shadow
    //% group="Pinos"
    //% weight=12
    //% blockGap=8 shim=pins::analogSetPitchVolume
    function analogSetPitchVolume(volume: int32): void;

    /**
     * Gets the volume the pitch pin from 0..255
     */
    //% blockId=device_analog_pitch_volume block="analog pitch volume"
    //% help=pins/analog-pitch-volume weight=3 advanced=true
    //% deprecated shim=pins::analogPitchVolume
    function analogPitchVolume(): int32;

    /**
     * Send a pulse-width modulation (PWM) signal to the current pitch pin. Use `analog set pitch pin` to define the pitch pin.
     * @param frequency frequency to modulate in Hz.
     * @param ms duration of the pitch in milliseconds.
     */
    //% blockId=device_analog_pitch block="analog pitch %frequency|for (ms) %ms"
    //% help=pins/analog-pitch async advanced=true
    //% group="Pins"
    //% weight=14
    //% blockGap=8 shim=pins::analogPitch
    function analogPitch(frequency: int32, ms: int32): void;

    /**
     * Configure the pull direction of of a pin.
     * @param name pin to set the pull mode on, eg: DigitalPin.P0
     * @param pull one of the mbed pull configurations, eg: PinPullMode.PullUp
     */
    //% help=pins/set-pull advanced=true
    //% blockId=device_set_pull block="set pull|pin %pin|to %pull"
    //% pin.shadow=digital_pin_shadow
    //% group="Pins"
    //% weight=15
    //% blockGap=8 shim=pins::setPull
    function setPull(name: int32, pull: PinPullMode): void;

    /**
     * Configure the events emitted by this pin. Events can be subscribed to
     * using ``control.onEvent()``.
     * @param name pin to set the event mode on, eg: DigitalPin.P0
     * @param type the type of events for this pin to emit, eg: PinEventType.Edge
     */
    //% help=pins/set-events advanced=true
    //% blockId=device_set_pin_events block="set pin %pin|to emit %type|events"
    //% pin.shadow=digital_pin_shadow
    //% group="Pins"
    //% weight=13
    //% blockGap=8 shim=pins::setEvents
    function setEvents(name: int32, type: PinEventType): void;

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% shim=pins::createBuffer
    function createBuffer(size: int32): Buffer;

    /**
     * Set the matrix width for Neopixel strip (already assigned to a pin).
     * Should be used in conjunction with `set matrix width` from Neopixel package.
     * @param name pin of Neopixel strip, eg: DigitalPin.P1
     * @param value width of matrix (at least ``2``)
     */
    //% help=pins/neopixel-matrix-width advanced=true
    //% blockId=pin_neopixel_matrix_width block="neopixel matrix width|pin %pin %width"
    //% pin.shadow=digital_pin_shadow
    //% width.min=2
    //% group="Pins"
    //% weight=11
    //% blockGap=8 width.defl=5 shim=pins::setMatrixWidth
    function setMatrixWidth(pin: int32, width?: int32): void;

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //% repeat.defl=0 shim=pins::i2cReadBuffer
    function i2cReadBuffer(address: int32, size: int32, repeat?: boolean): Buffer;

    /**
     * Write bytes to a 7-bit I2C `address`.
     */
    //% repeat.defl=0 shim=pins::i2cWriteBuffer
    function i2cWriteBuffer(address: int32, buf: Buffer, repeat?: boolean): int32;

    /**
     * Write to the SPI slave and return the response
     * @param value Data to be sent to the SPI slave
     */
    //% help=pins/spi-write advanced=true
    //% blockId=spi_write block="spi write %value"
    //% group="SPI"
    //% blockGap=8
    //% weight=53 shim=pins::spiWrite
    function spiWrite(value: int32): int32;

    /**
     * Write to and read from the SPI slave at the same time
     * @param command Data to be sent to the SPI slave (can be null)
     * @param response Data received from the SPI slave (can be null)
     */
    //% help=pins/spi-transfer argsNullable shim=pins::spiTransfer
    function spiTransfer(command: Buffer, response: Buffer): void;

    /**
     * Set the SPI frequency
     * @param frequency the clock frequency, eg: 1000000
     */
    //% help=pins/spi-frequency advanced=true
    //% blockId=spi_frequency block="spi frequency %frequency"
    //% group="SPI"
    //% blockGap=8
    //% weight=55 shim=pins::spiFrequency
    function spiFrequency(frequency: int32): void;

    /**
     * Set the SPI bits and mode
     * @param bits the number of bits, eg: 8
     * @param mode the mode, eg: 3
     */
    //% help=pins/spi-format advanced=true
    //% blockId=spi_format block="spi format|bits %bits|mode %mode"
    //% group="SPI"
    //% blockGap=8
    //% weight=54 shim=pins::spiFormat
    function spiFormat(bits: int32, mode: int32): void;

    /**
     * Set the MOSI, MISO, SCK pins used by the SPI connection
     *
     */
    //% help=pins/spi-pins advanced=true
    //% blockId=spi_pins block="spi set pins|MOSI %mosi|MISO %miso|SCK %sck"
    //% mosi.shadow=digital_pin_shadow
    //% miso.shadow=digital_pin_shadow
    //% sck.shadow=digital_pin_shadow
    //% group="SPI"
    //% blockGap=8
    //% weight=51 shim=pins::spiPins
    function spiPins(mosi: int32, miso: int32, sck: int32): void;

    /**
     * Mounts a push button on the given pin
     */
    //% help=pins/push-button advanced=true shim=pins::pushButton
    function pushButton(pin: int32): void;

    /**
     * Define o pino usado para produzir sons e melodias. O padrão é P0.
     * @param name pino para modular o pitch
     */
    //% blockId=pin_set_audio_pin block="definir pino de áudio $name"
    //% help=pins/set-audio-pin
    //% name.shadow=digital_pin_shadow
    //% weight=1
    //% blockGap=8 shim=pins::setAudioPin
    function setAudioPin(name: int32): void;

    /**
     * Define se o áudio será ou não gerado usando um pino no conector de borda.
     */
    //% blockId=pin_set_audio_pin_enabled
    //% block="definir áudio no pino habilitado $enabled"
    //% weight=0 help=pins/set-audio-pin-enabled shim=pins::setAudioPinEnabled
    function setAudioPinEnabled(enabled: boolean): void;
}



    //% weight=2 color=#002050 icon="\uf287"
    //% advanced=true
declare namespace serial {

    /**
     * Lê uma linha de texto da porta serial e retorna o buffer quando o delimitador for encontrado.
     * @param delimiter delimitador de texto que separa cada parte do texto
     */
    //% help=serial/read-until
    //% blockId=serial_read_until block="serial com|ler até %delimiter=serial_delimiter_conv"
    //% weight=19 shim=serial::readUntil
    function readUntil(delimiter: string): string;

    /**
     * Lê os dados recebidos no buffer como uma string
     */
    //% help=serial/read-string
    //% blockId=serial_read_buffer block="serial com:|ler string"
    //% weight=18 shim=serial::readString
    function readString(): string;

    /**
     * Registra um evento a ser disparado quando um dos delimitadores for correspondido.
     * @param delimitadores os caracteres para comparar os caracteres recebidos.
     */
    //% help=serial/on-data-received
    //% weight=18 blockId=serial_on_data_received block="serial com:|ao receber dados %delimitadores=serial_delimiter_conv" shim=serial::onDataReceived
    function onDataReceived(delimiters: string, body: () => void): void;

    /**
     * Envia um pedaço de texto através da conexão serial.
     */
    //% help=serial/write-string
    //% weight=87 blockGap=8
    //% blockId=serial_writestring block="serial com:|escrever string %texto"
    //% texto.shadowOptions.toString=true shim=serial::writeString
    function writeString(text: string): void;

    /**
     * Envia um buffer através da conexão serial.
     */
    //% blockId=serial_writebuffer block="serial com:|escrever buffer %buffer=serial_readbuffer"
    //% help=serial/write-buffer advanced=true weight=6 shim=serial::writeBuffer
    function writeBuffer(buffer: Buffer): void;

    /**
     * Lê múltiplos caracteres do buffer de recepção.
     * Se o comprimento for positivo, pausa até que haja caracteres suficientes.
     * @param length comprimento do buffer padrão
     */
    //% blockId=serial_readbuffer block="serial com:|ler buffer %length"
    //% help=serial/read-buffer advanced=true weight=5 shim=serial::readBuffer
    function readBuffer(length: int32): Buffer;

    /**
     * Define a entrada e saída serial para usar pinos em vez da conexão USB.
     * @param tx o novo pino de transmissão, ex: SerialPin.P0
     * @param rx o novo pino de recepção, ex: SerialPin.P1
     * @param rate a nova taxa de transmissão. ex: 115200
     */
    //% weight=10
    //% help=serial/redirect
    //% blockId=serial_redirect block="serial com:|redirecionar para|TX %tx|RX %rx|com taxa de transmissão %rate"
    //% blockExternalInputs=1
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% tx.fieldOptions.tooltips="false"
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% rx.fieldOptions.tooltips="false"
    //% blockGap=8 shim=serial::redirect
    function redirect(tx: SerialPin, rx: SerialPin, rate: BaudRate): void;

    /**
     * Define a taxa de transmissão (baud rate) da porta serial
     */
    //% weight=10
    //% blockId=serial_setbaudrate block="serial com:|definir taxa de transmissão %rate"
    //% blockGap=8 inlineInputMode=inline
    //% help=serial/set-baud-rate
    //% group="Configuração" advanced=true shim=serial::setBaudRate
    function setBaudRate(rate: BaudRate): void;

    /**
     * Direciona a entrada e saída serial para usar a conexão USB.
     */
    //% weight=9 help=serial/redirect-to-usb
    //% blockId=serial_redirect_to_usb block="serial com:|direcionar para USB" shim=serial::redirectToUSB
    function redirectToUSB(): void;

    /**
     * Define o tamanho do buffer RX em bytes
     * @param size comprimento do buffer RX em bytes, ex: 32
     */
    //% help=serial/set-rx-buffer-size
    //% blockId=serialSetRxBufferSize block="serial com: definir tamanho do buffer RX para $size"
    //% advanced=true shim=serial::setRxBufferSize
    function setRxBufferSize(size: uint8): void;

    /**
     * Define o tamanho do buffer TX em bytes
     * @param size comprimento do buffer TX em bytes, ex: 32
     */
    //% help=serial/set-tx-buffer-size
    //% blockId=serialSetTxBufferSize block="serial com: definir tamanho do buffer TX para $size"
    //% advanced=true shim=serial::setTxBufferSize
    function setTxBufferSize(size: uint8): void;

    /** Send DMESG debug buffer over serial. */
    //% shim=serial::writeDmesg
    function writeDmesg(): void;
}



    //% indexerGet=BufferMethods::getByte indexerSet=BufferMethods::setByte
declare interface Buffer {
    /**
     * Reads an unsigned byte at a particular location
     */
    //% shim=BufferMethods::getUint8
    getUint8(off: int32): int32;

    /**
     * Returns false when the buffer can be written to.
     */
    //% shim=BufferMethods::isReadOnly
    isReadOnly(): boolean;

    /**
     * Writes an unsigned byte at a particular location
     */
    //% shim=BufferMethods::setUint8
    setUint8(off: int32, v: int32): void;

    /**
     * Write a number in specified format in the buffer.
     */
    //% shim=BufferMethods::setNumber
    setNumber(format: NumberFormat, offset: int32, value: number): void;

    /**
     * Read a number in specified format from the buffer.
     */
    //% shim=BufferMethods::getNumber
    getNumber(format: NumberFormat, offset: int32): number;

    /** Returns the length of a Buffer object. */
    //% property shim=BufferMethods::length
    length: int32;

    /**
     * Fill (a fragment) of the buffer with given value.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::fill
    fill(value: int32, offset?: int32, length?: int32): void;

    /**
     * Return a copy of a fragment of a buffer.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::slice
    slice(offset?: int32, length?: int32): Buffer;

    /**
     * Shift buffer left in place, with zero padding.
     * @param offset number of bytes to shift; use negative value to shift right
     * @param start start offset in buffer. Default is 0.
     * @param length number of elements in buffer. If negative, length is set as the buffer length minus
     * start. eg: -1
     */
    //% start.defl=0 length.defl=-1 shim=BufferMethods::shift
    shift(offset: int32, start?: int32, length?: int32): void;

    /**
     * Convert a buffer to string assuming UTF8 encoding
     */
    //% shim=BufferMethods::toString
    toString(): string;

    /**
     * Convert a buffer to its hexadecimal representation.
     */
    //% shim=BufferMethods::toHex
    toHex(): string;

    /**
     * Rotate buffer left in place.
     * @param offset number of bytes to shift; use negative value to shift right
     * @param start start offset in buffer. Default is 0.
     * @param length number of elements in buffer. If negative, length is set as the buffer length minus
     * start. eg: -1
     */
    //% start.defl=0 length.defl=-1 shim=BufferMethods::rotate
    rotate(offset: int32, start?: int32, length?: int32): void;

    /**
     * Write contents of `src` at `dstOffset` in current buffer.
     */
    //% shim=BufferMethods::write
    write(dstOffset: int32, src: Buffer): void;

    /**
     * Compute k-bit FNV-1 non-cryptographic hash of the buffer.
     */
    //% shim=BufferMethods::hash
    hash(bits: int32): uint32;
}
declare namespace control {

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% deprecated=1 shim=control::createBuffer
    function createBuffer(size: int32): Buffer;

    /**
     * Create a new buffer with UTF8-encoded string
     * @param str the string to put in the buffer
     */
    //% deprecated=1 shim=control::createBufferFromUTF8
    function createBufferFromUTF8(str: string): Buffer;
}
declare namespace light {

    /**
     * Sends a color buffer to a light strip
     **/
    //% advanced=true shim=light::sendWS2812Buffer
    function sendWS2812Buffer(buf: Buffer, pin: int32): void;

    /**
     * Sends a color buffer to a light strip
     **/
    //% advanced=true shim=light::sendWS2812BufferWithBrightness
    function sendWS2812BufferWithBrightness(buf: Buffer, pin: int32, brightness: int32): void;

    /**
     * Sets the light mode of a pin
     **/
    //% advanced=true
    //% shim=light::setMode
    function setMode(pin: int32, mode: int32): void;
}
declare namespace input {

    /**
     * Faça algo quando o logotipo for tocado e liberado novamente.
     * @param body o código a ser executado quando o logotipo é pressionado
     */
    //% weight=83 blockGap=32
    //% blockId=input_logo_event block="logotipo for $action"
    //% group="micro:bit (V2)"
    //% parts="logotouch"
    //% help="input/on-logo-event" shim=input::onLogoEvent
    function onLogoEvent(action: TouchButtonEvent, body: () => void): void;

    /**
     * Obtenha o estado do logotipo (pressionado ou não).
     */
    //% weight=58
    //% blockId="input_logo_is_pressed" block="logotipo pressionado"
    //% blockGap=8
    //% group="micro:bit (V2)"
    //% parts="logotouch"
    //% help="input/logo-is-pressed" shim=input::logoIsPressed
    function logoIsPressed(): boolean;
}
declare namespace pins {

    /**
     * Configure the touch detection for the pins and logo.
     * P0, P1, P2 use resistive touch by default.
     * The logo uses capacitative touch by default.
     * @param name target to change the touch mode for
     * @param mode the touch mode to use
     */
    //% weight=60
    //% blockId=device_touch_set_type block="set %name to touch mode %mode"
    //% advanced=true
    //% group="micro:bit (V2)"
    //% help=pins/touch-set-mode shim=pins::touchSetMode
    function touchSetMode(name: TouchTarget, mode: TouchTargetMode): void;
}
declare namespace music {

    /**
     * Internal use only
     **/
    //% async shim=music::__playSoundExpression
    function __playSoundExpression(nodes: string, waitTillDone: boolean): void;

    /**
     * Internal use only
     */
    //% shim=music::__stopSoundExpressions
    function __stopSoundExpressions(): void;
}

// Auto-generated. Do not edit. Really.
