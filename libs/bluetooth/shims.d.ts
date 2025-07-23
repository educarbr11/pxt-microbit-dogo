// Auto-generated. Do not edit.


    /**
     * Support for additional Bluetooth services.
     */
    //% color=#0082FB weight=96 icon="\uf294"
declare namespace bluetooth {

    /**
     *  Inicia o serviço de acelerômetro Bluetooth
     */
    //% help=bluetooth/start-accelerometer-service
    //% blockId=bluetooth_start_accelerometer_service block="serviço de acelerômetro bluetooth"
    //% parts="bluetooth" weight=90 blockGap=8 shim=bluetooth::startAccelerometerService
    function startAccelerometerService(): void;

    /**
     *  Inicia o serviço de botão Bluetooth
     */
    //% help=bluetooth/start-button-service
    //% blockId=bluetooth_start_button_service block="serviço de botão bluetooth" blockGap=8
    //% parts="bluetooth" weight=89 shim=bluetooth::startButtonService
    function startButtonService(): void;

    /**
     *  Inicia o serviço de pino IO Bluetooth.
     */
    //% help=bluetooth/start-io-pin-service
    //% blockId=bluetooth_start_io_pin_service block="serviço de pino bluetooth entrada/saida" blockGap=8
    //% parts="bluetooth" weight=88 shim=bluetooth::startIOPinService
    function startIOPinService(): void;

    /**
     *  Inicia o serviço LED Bluetooth
     */
    //% help=bluetooth/start-led-service
    //% blockId=bluetooth_start_led_service block="serviço de led bluetooth" blockGap=8
    //% parts="bluetooth" weight=87 shim=bluetooth::startLEDService
    function startLEDService(): void;

    /**
     *  Inicia o serviço de temperatura Bluetooth
     */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="serviço de temperatura bluetooth" blockGap=8
    //% parts="bluetooth" weight=86 shim=bluetooth::startTemperatureService
    function startTemperatureService(): void;

    /**
     *  Inicia o serviço de magnetômetro Bluetooth
     */
    //% help=bluetooth/start-magnetometer-service
    //% blockId=bluetooth_start_magnetometer_service block="serviço de magnetômetro bluetooth" blockGap=8
    //% parts="bluetooth" weight=85 shim=bluetooth::startMagnetometerService
    function startMagnetometerService(): void;

    /**
     *  Inicia o serviço de UART Bluetooth
     */
    //% help=bluetooth/start-uart-service
    //% blockId=bluetooth_start_uart_service block="serviço de UART bluetooth"
    //% parts="bluetooth" advanced=false shim=bluetooth::startUartService
    function startUartService(): void;

    /**
     * Envia um buffer de dados via Bluetooth UART
     */
    //% shim=bluetooth::uartWriteBuffer
    function uartWriteBuffer(buffer: Buffer): void;

    /**
     * Recebe um buffer de dados via Bluetooth UART
     */
    //% shim=bluetooth::uartReadBuffer
    function uartReadBuffer(): Buffer;

    /**
     * Registers an event to be fired when one of the delimiter is matched.
     * @param delimiters the characters to match received characters against.
     */
    //% help=bluetooth/on-uart-data-received
    //% weight=18 blockId=bluetooth_on_data_received block="bluetooth|ao receber dados %delimiters=serial_delimiter_conv" shim=bluetooth::onUartDataReceived
    function onUartDataReceived(delimiters: string, body: () => void): void;

    /**
     * registra o codigo a ser executado quando uma conexao bluetooth for estabelecida
     * @param body codigo roda quando uma conexao bluetooth for estabelecida
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="ao conectar bluetooth" blockGap=8
    //% parts="bluetooth" shim=bluetooth::onBluetoothConnected
    function onBluetoothConnected(body: () => void): void;

    /**
     * registra o codigo a ser executado quando uma conexao bluetooth for perdida
     * @param body codigo roda quando uma conexao bluetooth for perdida
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="ao desconectar bluetooth"
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
    //% parts=bluetooth weight=12 advanced=true deprecated=1 shim=bluetooth::advertiseUidBuffer
    function advertiseUidBuffer(nsAndInstance: Buffer, power: int32, connectable: boolean): void;

    /**
     * Define a potência de transmissão bluetooth entre 0 (minimal) e 7 (maximal).
     * @param power nivel de potência entre 0 (mínimo) e 7 (máximo), exemplo: 7.
     */
    //% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=false
    //% blockId=bluetooth_settransmitpower block="definir energia de transmissão bluetooth %power" shim=bluetooth::setTransmitPower
    function setTransmitPower(power: int32): void;

    /**
     * O micro:bit para de dizer "Estou aqui!" para outros aparelhos.
     */
    //% blockId=eddystone_stop_advertising block="para de emitir sinais bluetooth"
    //% parts=bluetooth weight=10
    //% help=bluetooth/stop-advertising advanced=false
    //% hidden=1 deprecated=1 shim=bluetooth::stopAdvertising
    function stopAdvertising(): void;
}

// Auto-generated. Do not edit. Really.
