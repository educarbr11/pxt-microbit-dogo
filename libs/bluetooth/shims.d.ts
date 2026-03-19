// Auto-generated. Do not edit.


    /**
     * Support for additional Bluetooth services.
     */
    //% color=#0082FB weight=96 icon="\uf294"
declare namespace bluetooth {

    /**
     *  Liga o sensor de movimento via Bluetooth para o outro aparelho saber se você balançou o Micro:bit.
     */
    //% help=bluetooth/start-accelerometer-service
    //% blockId=bluetooth_start_accelerometer_service block="bluetooth: ligar sensor de movimento"
    //% parts="bluetooth" weight=90 blockGap=8 shim=bluetooth::startAccelerometerService
    function startAccelerometerService(): void;

    /**
     *  Liga o sensor de botões via Bluetooth para avisar quando você apertar A ou B.
     */
    //% help=bluetooth/start-button-service
    //% blockId=bluetooth_start_button_service block="bluetooth: ligar sensor de botões" blockGap=8
    //% parts="bluetooth" weight=89 shim=bluetooth::startButtonService
    function startButtonService(): void;

    /**
     *  Liga o controle dos pinos (os furinhos de baixo) via Bluetooth.
     */
    //% help=bluetooth/start-io-pin-service
    //% blockId=bluetooth_start_io_pin_service block="bluetooth: ligar controle dos pinos" blockGap=8
    //% parts="bluetooth" weight=88 shim=bluetooth::startIOPinService
    function startIOPinService(): void;

    /**
     *  Liga a telinha de LED via Bluetooth para você desenhar nela pelo celular.
     */
    //% help=bluetooth/start-led-service
    //% blockId=bluetooth_start_led_service block="bluetooth: ligar controle da tela LED" blockGap=8
    //% parts="bluetooth" weight=87 shim=bluetooth::startLEDService
    function startLEDService(): void;

    /**
     *  Liga o termômetro via Bluetooth para o outro aparelho saber o calor que está fazendo.
     */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="bluetooth: ligar sensor de temperatura" blockGap=8
    //% parts="bluetooth" weight=86 shim=bluetooth::startTemperatureService
    function startTemperatureService(): void;

    /**
     *  Liga a bússola via Bluetooth para mostrar para que lado o Micro:bit está olhando.
     */
    //% help=bluetooth/start-magnetometer-service
    //% blockId=bluetooth_start_magnetometer_service block="bluetooth: ligar bússola mágica"
    //% parts="bluetooth" weight=85 shim=bluetooth::startMagnetometerService
    function startMagnetometerService(): void;

    /**
     *  Prepara o Micro:bit para começar a conversar e trocar mensagens via Bluetooth.
     */
    //% help=bluetooth/start-uart-service
    //% blockId=bluetooth_start_uart_service block="inicia serviço bluetooth"
    //% parts="bluetooth" advanced=false shim=bluetooth::startUartService
    function startUartService(): void;

    /**
     * Envia um pacote de dados (um bauzinho cheio de informações) via Bluetooth.
     */
    //% shim=bluetooth::uartWriteBuffer
    function uartWriteBuffer(buffer: Buffer): void;

    /**
     * Lê os dados que estão guardados na memória de conversa do Bluetooth.
     */
    //% shim=bluetooth::uartReadBuffer
    function uartReadBuffer(): Buffer;

    /**
     * Avisa quando chegar uma mensagem que termina com um sinal especial (como um ponto final).
     * @param delimiters o sinal que marca o fim da mensagem.
     */
    //% help=bluetooth/on-uart-data-received
    //% weight=18 blockId=bluetooth_on_data_received block="bluetooth:|ao receber mensagem com %delimiters=serial_delimiter_conv" shim=bluetooth::onUartDataReceived
    function onUartDataReceived(delimiters: string, body: () => void): void;

    /**
     * O que fazer quando um amigo se conectar ao seu Micro:bit via Bluetooth.
     * @param body Code to run when a Bluetooth connection is established
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="bluetooth:|quando conectar" blockGap=8
    //% parts="bluetooth" shim=bluetooth::onBluetoothConnected
    function onBluetoothConnected(body: () => void): void;

    /**
     * O que fazer quando a conexão Bluetooth cair ou o amigo for embora.
     * @param body Code to run when a Bluetooth connection is lost
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="bluetooth:|quando desconectar"
    //% parts="bluetooth" shim=bluetooth::onBluetoothDisconnected
    function onBluetoothDisconnected(body: () => void): void;

    /**
     * Advertise an Eddystone URL
     * @param url the url to transmit. Must be no longer than the supported eddystone url length, eg: "https://makecode.com"
     * @param power power level between 0 and 7, eg: 7
     * @param connectable true to keep bluetooth connectable for other services, false otherwise.
     */
    //% blockId=eddystone_advertise_url block="bluetooth advertise url %url|with power %power|connectable %connectable"
    //% parts=bluetooth weight=11 blockGap=8
    //% help=bluetooth/advertise-url blockExternalInputs=1
    //% hidden=1 deprecated=1 shim=bluetooth::advertiseUrl
    function advertiseUrl(url: string, power: int32, connectable: boolean): void;

    /**
     * Advertise an Eddystone UID
     * @param nsAndInstance 16 bytes buffer of namespace (bytes 0-9) and instance (bytes 10-15)
     * @param power power level between 0 and 7, eg: 7
     * @param connectable true to keep bluetooth connectable for other services, false otherwise.
     */
    //% parts=bluetooth weight=12 advanced=false deprecated=1 shim=bluetooth::advertiseUidBuffer
    function advertiseUidBuffer(nsAndInstance: Buffer, power: int32, connectable: boolean): void;

    /**
     * Ajusta a força do sinal do Bluetooth (volume da conversa).
     * @param power nível de força entre 0 (fraquinho) e 7 (super forte).
     */
    //% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=false
    //% blockId=bluetooth_settransmitpower block="bluetooth: ajustar força do sinal para %power" shim=bluetooth::setTransmitPower
    function setTransmitPower(power: int32): void;

    /**
     * Stops advertising Eddystone end points
     */
    //% blockId=eddystone_stop_advertising block="bluetooth stop advertising"
    //% parts=bluetooth weight=10
    //% help=bluetooth/stop-advertising advanced=false
    //% hidden=1 deprecated=1 shim=bluetooth::stopAdvertising
    function stopAdvertising(): void;
}

// Auto-generated. Do not edit. Really.
